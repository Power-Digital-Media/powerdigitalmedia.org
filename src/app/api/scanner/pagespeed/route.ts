import { NextResponse } from "next/server";
import {
  assertSafePublicHostname,
  checkScannerRateLimit,
  normalizeScannerTargetUrl,
} from "@/lib/scanner-ssrf-guard";
import type { ScannerPageSpeedResponse } from "@/lib/scanner-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAGESPEED_TIMEOUT_MS = 25_500;

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
        categories?: Record<string, { score?: number | null }>;
        audits?: Record<
          string,
          { numericValue?: number; displayValue?: string }
        >;
      };
    };

    const categories = data?.lighthouseResult?.categories ?? {};
    const audits = data?.lighthouseResult?.audits ?? {};

    const toScore = (raw: number | null | undefined): number =>
      typeof raw === "number" && Number.isFinite(raw)
        ? Math.round(raw * 100)
        : 0;

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
