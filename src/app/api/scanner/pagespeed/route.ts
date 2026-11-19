import { NextResponse } from "next/server";
import {
  assertSafePublicHostname,
  checkScannerRateLimit,
  normalizeScannerTargetUrl,
} from "@/lib/scanner-ssrf-guard";
import type {
  AgenticBrowsingAuditItem,
  AgenticBrowsingSummary,
  ScannerPageSpeedResponse,
} from "@/lib/scanner-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAGESPEED_TIMEOUT_MS = 25_500;

interface LighthouseAuditNodeDetail {
  snippet?: string;
  nodeLabel?: string;
  explanation?: string;
}

interface LighthouseAuditItemDetail {
  reason?: string;
  message?: string;
  error?: string;
  issue?: string;
  node?: LighthouseAuditNodeDetail;
}

interface LighthouseRawAudit {
  id?: string;
  title?: string;
  score?: number | null;
  scoreDisplayMode?: string;
  numericValue?: number;
  displayValue?: string;
  explanation?: string;
  warnings?: string[];
  details?: {
    items?: LighthouseAuditItemDetail[];
  };
}

interface LighthouseCategoryRef {
  id: string;
  weight?: number;
}

interface LighthouseRawCategory {
  score?: number | null;
  auditRefs?: LighthouseCategoryRef[];
}

function extractAgenticFailureReason(
  id: string,
  audit: LighthouseRawAudit
): string {
  if (typeof audit.explanation === "string" && audit.explanation.trim()) {
    return audit.explanation.trim();
  }
  if (Array.isArray(audit.warnings) && audit.warnings[0]?.trim()) {
    return audit.warnings[0].trim();
  }

  const items = audit.details?.items ?? [];
  if (items.length > 0) {
    const first = items[0];
    const directMsg =
      first.reason || first.message || first.error || first.issue || first.node?.explanation;
    if (typeof directMsg === "string" && directMsg.trim()) {
      const cleanMsg = directMsg.replace(/\s+/g, " ").trim();
      return items.length > 1 ? `${cleanMsg} (+${items.length - 1} more)` : cleanMsg;
    }
    if (id === "agent-accessibility-tree") {
      const snippet = first.node?.snippet || first.node?.nodeLabel || "";
      return `${items.length} interactive control(s) lack an accessible label${
        snippet ? ` (e.g. ${snippet.slice(0, 72)})` : ""
      }.`;
    }
  }

  if (id === "agent-accessibility-tree") {
    return "One or more form inputs, selects, or buttons lack an accessible label.";
  }
  if (id === "llms-txt") {
    return "Missing /llms.txt, HTML soft-404, or file contains zero Markdown [Title](https://...) links.";
  }
  if (id === "ard-schema") {
    return "/.well-known/ard.json returned SPA HTML or failed Agentic Resource Discovery (ARD) schema validation.";
  }
  if (id === "cumulative-layout-shift") {
    return audit.displayValue
      ? `Layout shift (${audit.displayValue}) exceeded the <= 0.10 stability threshold for AI agents.`
      : "Cumulative Layout Shift exceeded the 0.10 threshold.";
  }

  return audit.displayValue || "Failed Google Lighthouse Agentic Browsing check.";
}

function parseAgenticBrowsingCategory(
  category: LighthouseRawCategory | undefined,
  audits: Record<string, LighthouseRawAudit>
): AgenticBrowsingSummary {
  const refs = category?.auditRefs ?? [];
  const parsedAudits: AgenticBrowsingAuditItem[] = [];
  let passedCount = 0;
  let totalCount = 0;

  for (const ref of refs) {
    if (!ref.id || (ref.weight ?? 0) <= 0) continue;
    const audit = audits[ref.id];
    if (!audit || audit.scoreDisplayMode === "notApplicable") continue;

    const passed = typeof audit.score === "number" && audit.score >= 0.9;
    totalCount += 1;
    if (passed) passedCount += 1;

    parsedAudits.push({
      id: ref.id,
      title: audit.title || ref.id,
      passed,
      displayValue: audit.displayValue || (passed ? "Passed" : "Failed"),
      failureReason: passed ? null : extractAgenticFailureReason(ref.id, audit),
    });
  }

  const rawScore = category?.score;
  const scorePct =
    typeof rawScore === "number" && Number.isFinite(rawScore)
      ? Math.round(rawScore * 100)
      : totalCount > 0
      ? Math.round((passedCount / totalCount) * 100)
      : null;

  return {
    scorePct,
    passedCount,
    totalCount,
    displayFraction: totalCount > 0 ? `${passedCount}/${totalCount}` : "N/A",
    audits: parsedAudits,
  };
}

export async function POST(req: Request) {
  const rate = checkScannerRateLimit(req, "scanner-pagespeed");
  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        status: "quota_or_error",
        message: `Rate limit reached. Please wait ${rate.retryAfterSec}s before running another Lighthouse scan.`,
      } satisfies ScannerPageSpeedResponse,
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      }
    );
  }

  let body: { url?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        status: "quota_or_error",
        message: "Invalid JSON request body.",
      } satisfies ScannerPageSpeedResponse,
      { status: 400 }
    );
  }

  const normalized = normalizeScannerTargetUrl(body.url || "");
  if (!normalized.ok) {
    return NextResponse.json(
      {
        ok: false,
        status: "quota_or_error",
        message: normalized.error,
      } satisfies ScannerPageSpeedResponse,
      { status: 400 }
    );
  }

  const dnsCheck = await assertSafePublicHostname(normalized.hostname);
  if (!dnsCheck.safe) {
    return NextResponse.json(
      {
        ok: false,
        status: "quota_or_error",
        message: dnsCheck.reason,
      } satisfies ScannerPageSpeedResponse,
      { status: 400 }
    );
  }

  const psiParams = new URLSearchParams();
  psiParams.set("url", normalized.normalizedUrl);
  psiParams.set("strategy", "mobile");
  psiParams.append("category", "PERFORMANCE");
  psiParams.append("category", "SEO");
  psiParams.append("category", "ACCESSIBILITY");
  psiParams.append("category", "BEST_PRACTICES");
  psiParams.append("category", "AGENTIC_BROWSING");

  const psiKey = (process.env.PAGESPEED_API_KEY || "").trim();
  if (psiKey) {
    psiParams.set("key", psiKey);
  }

  const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${psiParams.toString()}`;

  try {
    const res = await fetch(psiUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(PAGESPEED_TIMEOUT_MS),
    });

    if (!res.ok) {
      return NextResponse.json({
        ok: false,
        status: res.status === 429 ? "quota_or_error" : "timeout_or_unreachable",
        message:
          res.status === 429
            ? "Google Lighthouse API is momentarily busy—core scan metrics above remain 100% live."
            : `Google Mobile Lighthouse could not finish loading ${normalized.hostname} (HTTP ${res.status}).`,
      } satisfies ScannerPageSpeedResponse);
    }

    const data = (await res.json()) as {
      lighthouseResult?: {
        categories?: Record<string, LighthouseRawCategory>;
        audits?: Record<string, LighthouseRawAudit>;
      };
    };

    const categories = data?.lighthouseResult?.categories ?? {};
    const audits = data?.lighthouseResult?.audits ?? {};

    const toScore = (raw: number | null | undefined): number =>
      typeof raw === "number" && Number.isFinite(raw)
        ? Math.round(raw * 100)
        : 0;

    const agenticBrowsing = parseAgenticBrowsingCategory(
      categories["agentic-browsing"],
      audits
    );

    const lcpMs = audits["largest-contentful-paint"]?.numericValue;
    const fcpMs = audits["first-contentful-paint"]?.numericValue;
    const tbtRaw = audits["total-blocking-time"]?.numericValue;
    const clsRaw = audits["cumulative-layout-shift"]?.numericValue;
    const siMs = audits["speed-index"]?.numericValue;

    const lcpSeconds =
      typeof lcpMs === "number" ? Math.round((lcpMs / 1000) * 10) / 10 : null;
    const fcpSeconds =
      typeof fcpMs === "number" ? Math.round((fcpMs / 1000) * 10) / 10 : null;
    const tbtMs = typeof tbtRaw === "number" ? Math.round(tbtRaw) : null;
    const cls =
      typeof clsRaw === "number" ? Math.round(clsRaw * 1000) / 1000 : null;
    const speedIndexSeconds =
      typeof siMs === "number" ? Math.round((siMs / 1000) * 10) / 10 : null;

    return NextResponse.json({
      ok: true,
      status: "completed",
      mobile: {
        performanceScore: toScore(categories.performance?.score),
        seoScore: toScore(categories.seo?.score),
        accessibilityScore: toScore(categories.accessibility?.score),
        bestPracticesScore: toScore(categories["best-practices"]?.score),
        agenticBrowsing,
        lcpSeconds,
        fcpSeconds,
        tbtMs,
        cls,
        speedIndexSeconds,
        displayLcp:
          audits["largest-contentful-paint"]?.displayValue ||
          (lcpSeconds !== null ? `${lcpSeconds} s` : "—"),
        displayTbt:
          audits["total-blocking-time"]?.displayValue ||
          (tbtMs !== null ? `${tbtMs} ms` : "—"),
        displayCls:
          audits["cumulative-layout-shift"]?.displayValue ||
          (cls !== null ? String(cls) : "—"),
      },
    } satisfies ScannerPageSpeedResponse);
  } catch {
    return NextResponse.json({
      ok: false,
      status: "timeout_or_unreachable",
      message: `Target site took longer than 25s to finish Google's mobile Lighthouse crawl—often caused by heavy scripts or slow shared hosting.`,
    } satisfies ScannerPageSpeedResponse);
  }
}
