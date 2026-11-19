import { NextResponse } from "next/server";
import {
  assertSafePublicHostname,
  checkScannerRateLimit,
  normalizeScannerTargetUrl,
} from "@/lib/scanner-ssrf-guard";
import type { ScannerPageSpeedResponse } from "@/lib/scanner-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SI_ENGINE_BASE_URL = (
  process.env.SI_ENGINE_URL || "https://intelligence.powerdigitalmedia.org"
).replace(/\/$/, "");

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

  const workerSecret = (process.env.SI_WORKER_SECRET || "").trim();
  if (!workerSecret) {
    return NextResponse.json(
      {
        ok: false,
        status: "quota_or_error",
        message: "PDM Site Intelligence™ worker secret is not configured.",
      } satisfies ScannerPageSpeedResponse,
      { status: 503 }
    );
  }

  try {
    const upstreamRes = await fetch(
      `${SI_ENGINE_BASE_URL}/api/public-scanner/pagespeed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-SI-Worker-Secret": workerSecret,
        },
        body: JSON.stringify({ url: normalized.normalizedUrl }),
        signal: AbortSignal.timeout(27_500),
      }
    );

    const data = (await upstreamRes
      .json()
      .catch(() => null)) as ScannerPageSpeedResponse | null;

    if (!data) {
      return NextResponse.json({
        ok: false,
        status: "timeout_or_unreachable",
        message: `Google Mobile Lighthouse could not finish loading ${normalized.hostname}.`,
      } satisfies ScannerPageSpeedResponse);
    }

    return NextResponse.json(data, {
      status: upstreamRes.status >= 400 ? upstreamRes.status : 200,
    });
  } catch {
    return NextResponse.json({
      ok: false,
      status: "timeout_or_unreachable",
      message: `Target site took longer than 25s to finish Google's mobile Lighthouse crawl—often caused by heavy scripts or slow shared hosting.`,
    } satisfies ScannerPageSpeedResponse);
  }
}
