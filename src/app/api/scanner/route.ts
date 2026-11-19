import { NextResponse } from "next/server";
import {
  assertSafePublicHostname,
  checkScannerRateLimit,
  normalizeScannerTargetUrl,
} from "@/lib/scanner-ssrf-guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SI_ENGINE_BASE_URL = (
  process.env.SI_ENGINE_URL || "https://intelligence.powerdigitalmedia.org"
).replace(/\/$/, "");

export async function POST(req: Request) {
  const rate = checkScannerRateLimit(req, "scanner-core");
  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: `Scan rate limit reached (15 scans per 10 minutes). Please wait ${rate.retryAfterSec}s or call Damein at (601) 446-2393.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      }
    );
  }

  let body: { url?: string; targetService?: string; targetCity?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  const normalized = normalizeScannerTargetUrl(body.url || "");
  if (!normalized.ok) {
    return NextResponse.json(
      { ok: false, error: normalized.error },
      { status: 400 }
    );
  }

  const dnsCheck = await assertSafePublicHostname(normalized.hostname);
  if (!dnsCheck.safe) {
    return NextResponse.json(
      { ok: false, error: dnsCheck.reason },
      { status: 400 }
    );
  }

  const workerSecret = (process.env.SI_WORKER_SECRET || "").trim();
  if (!workerSecret) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "PDM Site Intelligence™ engine worker secret is not configured on this edge node.",
      },
      { status: 503 }
    );
  }

  try {
    const upstreamRes = await fetch(`${SI_ENGINE_BASE_URL}/api/public-scanner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-SI-Worker-Secret": workerSecret,
      },
      body: JSON.stringify({
        url: normalized.normalizedUrl,
        targetCity: body.targetCity,
        targetService: body.targetService,
      }),
      signal: AbortSignal.timeout(22_000),
    });

    const data = await upstreamRes.json().catch(() => null);
    if (!upstreamRes.ok || !data) {
      return NextResponse.json(
        {
          ok: false,
          error:
            (data && typeof data.error === "string" && data.error) ||
            `PDM Site Intelligence™ engine could not complete the scan for ${normalized.hostname} (HTTP ${upstreamRes.status}).`,
        },
        { status: upstreamRes.status >= 400 ? upstreamRes.status : 502 }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: `Timed out reaching PDM Site Intelligence™ unified scanner engine while auditing ${normalized.hostname}.`,
      },
      { status: 504 }
    );
  }
}
