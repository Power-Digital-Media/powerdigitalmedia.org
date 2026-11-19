import { NextResponse } from "next/server";
import { checkScannerRateLimit } from "@/lib/scanner-ssrf-guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SI_ENGINE_BASE_URL = (
  process.env.SI_ENGINE_URL || "https://intelligence.powerdigitalmedia.org"
).replace(/\/$/, "");

export async function GET(req: Request) {
  const rate = checkScannerRateLimit(req, "scanner-fleet");
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: "Rate limit exceeded." },
      { status: 429 }
    );
  }

  const workerSecret = (process.env.SI_WORKER_SECRET || "").trim();
  if (!workerSecret) {
    return NextResponse.json(
      { ok: false, error: "Worker secret unconfigured." },
      { status: 503 }
    );
  }

  try {
    const upstreamRes = await fetch(
      `${SI_ENGINE_BASE_URL}/api/public-scanner/fleet`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-SI-Worker-Secret": workerSecret,
        },
        signal: AbortSignal.timeout(10_000),
      }
    );

    const data = await upstreamRes.json().catch(() => null);
    if (!upstreamRes.ok || !data) {
      return NextResponse.json(
        { ok: false, error: "Watchtower fleet telemetry temporarily unavailable." },
        { status: 502 }
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Watchtower fleet telemetry timeout." },
      { status: 504 }
    );
  }
}
