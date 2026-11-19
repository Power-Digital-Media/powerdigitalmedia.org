import dns from "node:dns";
import net from "node:net";

const MAX_URL_LENGTH = 512;
const DNS_LOOKUP_TIMEOUT_MS = 4000;
const DEFAULT_FETCH_TIMEOUT_MS = 8000;
const DEFAULT_MAX_BYTES = 2 * 1024 * 1024; // 2 MB cap
const DEFAULT_MAX_REDIRECTS = 5;

export const SCANNER_PRIMARY_UA =
  "Mozilla/5.0 (compatible; PDMSiteIntelligenceScanner/2.0; +https://powerdigitalmedia.org/scanner)";

export const SCANNER_BROWSER_FALLBACK_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const BLOCKED_HOST_SUFFIXES = [
  ".local",
  ".internal",
  ".localhost",
  ".arpa",
  ".lan",
  ".home",
  ".corp",
  ".intranet",
];

const BLOCKED_EXACT_HOSTS = new Set([
  "localhost",
  "metadata.google.internal",
  "metadata",
  "169.254.169.254",
  "0.0.0.0",
]);

export type NormalizedTargetResult =
  | {
      ok: true;
      url: URL;
      normalizedUrl: string;
      hostname: string;
    }
  | {
      ok: false;
      error: string;
    };

/**
 * Normalizes user-entered domain/URL input (`example.com` -> `https://example.com`),
 * strips hashes, blocks credentials and non-HTTP(S) protocols, and enforces length bounds.
 */
export function normalizeScannerTargetUrl(rawInput: string): NormalizedTargetResult {
  const trimmed = String(rawInput || "")
    .trim()
    .replace(/^['"]+|['"]+$/g, "");

  if (!trimmed) {
    return { ok: false, error: "Please enter a website domain (e.g., yourbusiness.com)." };
  }

  if (trimmed.length > MAX_URL_LENGTH) {
    return { ok: false, error: "URL exceeds maximum length of 512 characters." };
  }

  if (/\s/.test(trimmed)) {
    return {
      ok: false,
      error: "Please enter a valid domain name without spaces (e.g., yourbusiness.com).",
    };
  }

  const withProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  let parsed: URL;
  try {
    parsed = new URL(withProtocol);
  } catch {
    return { ok: false, error: "Invalid website URL format." };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, error: "Only public http:// and https:// URLs are supported." };
  }

  if (parsed.username || parsed.password) {
    return { ok: false, error: "URLs containing embedded credentials are not allowed." };
  }

  parsed.hash = "";

  const hostname = parsed.hostname.toLowerCase().replace(/\.$/, "");
  if (!hostname || !hostname.includes(".")) {
    return {
      ok: false,
      error: "Please enter a full public domain name (e.g., yourbusiness.com).",
    };
  }

  if (
    BLOCKED_EXACT_HOSTS.has(hostname) ||
    BLOCKED_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix))
  ) {
    return { ok: false, error: "Private, loopback, and internal hostnames cannot be scanned." };
  }

  if (net.isIP(hostname) !== 0 && isBlockedIpAddress(hostname)) {
    return { ok: false, error: "Private, loopback, and reserved IP ranges cannot be scanned." };
  }

  return {
    ok: true,
    url: parsed,
    normalizedUrl: parsed.toString(),
    hostname,
  };
}

function isBlockedIpv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return true;
  const octets = parts.map((p) => Number(p));
  if (octets.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
    return true;
  }

  const [a, b, c] = octets;

  // 0.0.0.0/8 ("this" network)
  if (a === 0) return true;
  // 10.0.0.0/8 RFC1918 private
  if (a === 10) return true;
  // 100.64.0.0/10 Carrier-Grade NAT
  if (a === 100 && b >= 64 && b <= 127) return true;
  // 127.0.0.0/8 Loopback
  if (a === 127) return true;
  // 169.254.0.0/16 Link-local & AWS/GCP/Azure Cloud Metadata
  if (a === 169 && b === 254) return true;
  // 172.16.0.0/12 RFC1918 private
  if (a === 172 && b >= 16 && b <= 31) return true;
  // 192.0.0.0/24 IETF protocol assignments
  if (a === 192 && b === 0 && c === 0) return true;
  // TEST-NET ranges (192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24)
  if (a === 192 && b === 0 && c === 2) return true;
  if (a === 198 && b === 51 && c === 100) return true;
  if (a === 203 && b === 0 && c === 113) return true;
  // 192.168.0.0/16 RFC1918 private
  if (a === 192 && b === 168) return true;
  // 198.18.0.0/15 Benchmarking
  if (a === 198 && (b === 18 || b === 19)) return true;
  // 224.0.0.0/4 Multicast & 240.0.0.0/4 Reserved/Broadcast
  if (a >= 224) return true;

  return false;
}

function expandIpv6Hextets(rawIpv6: string): number[] | null {
  const clean = rawIpv6.toLowerCase().split("%")[0].replace(/^\[|\]$/g, "");

  // Handle dotted-quad tail (e.g. ::ffff:127.0.0.1)
  let working = clean;
  const lastColon = working.lastIndexOf(":");
  if (lastColon !== -1 && working.slice(lastColon + 1).includes(".")) {
    const ipv4Tail = working.slice(lastColon + 1);
    const parts = ipv4Tail.split(".").map(Number);
    if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
      return null;
    }
    const hHigh = ((parts[0] << 8) | parts[1]).toString(16);
    const hLow = ((parts[2] << 8) | parts[3]).toString(16);
    working = `${working.slice(0, lastColon)}:${hHigh}:${hLow}`;
  }

  const doubleColonParts = working.split("::");
  if (doubleColonParts.length > 2) return null;

  const parseSide = (side: string): number[] | null => {
    if (!side) return [];
    const tokens = side.split(":");
    const nums: number[] = [];
    for (const tok of tokens) {
      if (!/^[0-9a-f]{1,4}$/i.test(tok)) return null;
      nums.push(parseInt(tok, 16));
    }
    return nums;
  };

  if (doubleColonParts.length === 2) {
    const left = parseSide(doubleColonParts[0]);
    const right = parseSide(doubleColonParts[1]);
    if (!left || !right) return null;
    const missing = 8 - (left.length + right.length);
    if (missing < 1) return null;
    return [...left, ...new Array(missing).fill(0), ...right];
  }

  const full = parseSide(working);
  if (!full || full.length !== 8) return null;
  return full;
}

export function isBlockedIpAddress(rawIp: string): boolean {
  const cleaned = String(rawIp || "")
    .trim()
    .replace(/^\[|\]$/g, "")
    .split("%")[0];

  const version = net.isIP(cleaned);
  if (version === 4) {
    return isBlockedIpv4(cleaned);
  }

  if (version === 6) {
    const hextets = expandIpv6Hextets(cleaned);
    if (!hextets) return true;

    const [h0, h1, h2, h3, h4, h5, h6, h7] = hextets;

    // Unspecified ::/128 or Loopback ::1/128
    const allZeroPrefix =
      h0 === 0 && h1 === 0 && h2 === 0 && h3 === 0 && h4 === 0;
    if (allZeroPrefix && h5 === 0 && h6 === 0 && (h7 === 0 || h7 === 1)) {
      return true;
    }

    // IPv4-mapped ::ffff:0:0/96 or IPv4-compatible ::/96
    if (allZeroPrefix && (h5 === 0xffff || h5 === 0)) {
      const a = (h6 >> 8) & 0xff;
      const b = h6 & 0xff;
      const c = (h7 >> 8) & 0xff;
      const d = h7 & 0xff;
      return isBlockedIpv4(`${a}.${b}.${c}.${d}`);
    }

    // fc00::/7 Unique Local (ULA)
    if ((h0 & 0xfe00) === 0xfc00) return true;
    // fe80::/10 Link-Local
    if ((h0 & 0xffc0) === 0xfe80) return true;
    // ff00::/8 Multicast
    if ((h0 & 0xff00) === 0xff00) return true;
    // 2001:db8::/32 Documentation
    if (h0 === 0x2001 && h1 === 0x0db8) return true;
    // 64:ff9b::/96 NAT64 embedded IPv4
    if (h0 === 0x0064 && h1 === 0xff9b && h2 === 0 && h3 === 0 && h4 === 0 && h5 === 0) {
      const a = (h6 >> 8) & 0xff;
      const b = h6 & 0xff;
      const c = (h7 >> 8) & 0xff;
      const d = h7 & 0xff;
      return isBlockedIpv4(`${a}.${b}.${c}.${d}`);
    }

    return false;
  }

  return true;
}

export async function assertSafePublicHostname(
  rawHostname: string
): Promise<{ safe: true; resolvedIps: string[] } | { safe: false; reason: string }> {
  const hostname = String(rawHostname || "")
    .trim()
    .toLowerCase()
    .replace(/^\[|\]$/g, "")
    .replace(/\.$/, "");

  if (!hostname || !hostname.includes(".")) {
    return { safe: false, reason: "Invalid public hostname." };
  }

  if (
    BLOCKED_EXACT_HOSTS.has(hostname) ||
    BLOCKED_HOST_SUFFIXES.some((s) => hostname.endsWith(s))
  ) {
    return { safe: false, reason: "Blocked internal or loopback hostname." };
  }

  if (net.isIP(hostname) !== 0) {
    if (isBlockedIpAddress(hostname)) {
      return { safe: false, reason: "Blocked private, loopback, or metadata IP." };
    }
    return { safe: true, resolvedIps: [hostname] };
  }

  try {
    const lookupPromise = dns.promises.lookup(hostname, {
      all: true,
      verbatim: true,
    });
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("DNS lookup timed out")), DNS_LOOKUP_TIMEOUT_MS)
    );

    const records = await Promise.race([lookupPromise, timeoutPromise]);
    if (!Array.isArray(records) || records.length === 0) {
      return { safe: false, reason: `Could not resolve DNS records for ${hostname}.` };
    }

    const ips: string[] = [];
    for (const rec of records) {
      if (!rec?.address || isBlockedIpAddress(rec.address)) {
        return {
          safe: false,
          reason: `Hostname ${hostname} resolved to a restricted network address.`,
        };
      }
      ips.push(rec.address);
    }

    return { safe: true, resolvedIps: ips };
  } catch {
    return {
      safe: false,
      reason: `Domain ${hostname} could not be resolved in public DNS. Check the spelling and try again.`,
    };
  }
}

export interface SafeFetchOptions {
  timeoutMs?: number;
  maxBytes?: number;
  maxRedirects?: number;
  followRedirects?: boolean;
  acceptHeader?: string;
}

export interface SafeFetchRedirectHop {
  fromUrl: string;
  toUrl: string;
  status: number;
}

export interface SafeFetchResult {
  ok: boolean;
  status: number | null;
  finalUrl: string;
  redirectChain: SafeFetchRedirectHop[];
  ttfbMs: number;
  totalMs: number;
  headers: Record<string, string>;
  bodyText: string;
  byteLength: number;
  truncated: boolean;
  error?: string;
}

async function readBoundedResponseText(
  res: Response,
  maxBytes: number
): Promise<{ text: string; byteLength: number; truncated: boolean }> {
  if (!res.body) {
    return { text: "", byteLength: 0, truncated: false };
  }

  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  let truncated = false;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        if (totalBytes + value.byteLength > maxBytes) {
          const allowedSlice = value.subarray(0, Math.max(0, maxBytes - totalBytes));
          if (allowedSlice.byteLength > 0) {
            chunks.push(allowedSlice);
            totalBytes += allowedSlice.byteLength;
          }
          truncated = true;
          await reader.cancel().catch(() => undefined);
          break;
        }
        chunks.push(value);
        totalBytes += value.byteLength;
      }
    }
  } catch {
    // Return partial bytes collected prior to stream abort
  }

  const merged = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const decoder = new TextDecoder("utf-8", { fatal: false });
  return {
    text: decoder.decode(merged),
    byteLength: totalBytes,
    truncated,
  };
}

/**
 * Performs an SSRF-safe HTTP GET request that validates DNS on every hop (manual redirects),
 * enforces bounded timeouts and byte limits, and falls back to a standard Chrome UA if a WAF
 * returns 403/406 on our custom scanner bot UA.
 */
export async function safeScannerFetch(
  initialUrl: string,
  options?: SafeFetchOptions
): Promise<SafeFetchResult> {
  const timeoutMs = options?.timeoutMs ?? DEFAULT_FETCH_TIMEOUT_MS;
  const maxBytes = options?.maxBytes ?? DEFAULT_MAX_BYTES;
  const maxRedirects = options?.maxRedirects ?? DEFAULT_MAX_REDIRECTS;
  const followRedirects = options?.followRedirects ?? true;
  const acceptHeader =
    options?.acceptHeader ??
    "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.7";

  const redirectChain: SafeFetchRedirectHop[] = [];
  let currentUrlStr = initialUrl;
  const overallStart = performance.now();

  for (let hop = 0; hop <= maxRedirects; hop++) {
    const normalized = normalizeScannerTargetUrl(currentUrlStr);
    if (!normalized.ok) {
      return {
        ok: false,
        status: null,
        finalUrl: currentUrlStr,
        redirectChain,
        ttfbMs: 0,
        totalMs: Math.round(performance.now() - overallStart),
        headers: {},
        bodyText: "",
        byteLength: 0,
        truncated: false,
        error: normalized.error,
      };
    }

    const dnsCheck = await assertSafePublicHostname(normalized.hostname);
    if (!dnsCheck.safe) {
      return {
        ok: false,
        status: null,
        finalUrl: normalized.normalizedUrl,
        redirectChain,
        ttfbMs: 0,
        totalMs: Math.round(performance.now() - overallStart),
        headers: {},
        bodyText: "",
        byteLength: 0,
        truncated: false,
        error: dnsCheck.reason,
      };
    }

    const executeSingleAttempt = async (userAgent: string) => {
      const hopStart = performance.now();
      const res = await fetch(normalized.normalizedUrl, {
        method: "GET",
        redirect: "manual",
        headers: {
          "User-Agent": userAgent,
          Accept: acceptHeader,
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
        },
        signal: AbortSignal.timeout(timeoutMs),
      });
      const ttfbMs = Math.round(performance.now() - hopStart);
      return { res, ttfbMs };
    };

    let res: Response;
    let ttfbMs = 0;

    try {
      const firstTry = await executeSingleAttempt(SCANNER_PRIMARY_UA);
      res = firstTry.res;
      ttfbMs = firstTry.ttfbMs;

      // Retry once with standard browser UA if target WAF blocks custom bot UAs
      if (res.status === 403 || res.status === 406) {
        await res.body?.cancel().catch(() => undefined);
        const fallbackTry = await executeSingleAttempt(SCANNER_BROWSER_FALLBACK_UA);
        res = fallbackTry.res;
        ttfbMs = fallbackTry.ttfbMs;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network request failed";
      return {
        ok: false,
        status: null,
        finalUrl: normalized.normalizedUrl,
        redirectChain,
        ttfbMs: 0,
        totalMs: Math.round(performance.now() - overallStart),
        headers: {},
        bodyText: "",
        byteLength: 0,
        truncated: false,
        error: msg.includes("aborted") || msg.includes("timeout")
          ? `Target server timed out after ${Math.round(timeoutMs / 1000)}s.`
          : `Could not connect to ${normalized.hostname} (${msg.slice(0, 120)}).`,
      };
    }

    const isRedirect =
      res.status === 301 ||
      res.status === 302 ||
      res.status === 303 ||
      res.status === 307 ||
      res.status === 308;

    const locationHeader = res.headers.get("location");

    if (isRedirect && locationHeader && followRedirects) {
      await res.body?.cancel().catch(() => undefined);
      if (hop === maxRedirects) {
        return {
          ok: false,
          status: res.status,
          finalUrl: normalized.normalizedUrl,
          redirectChain,
          ttfbMs,
          totalMs: Math.round(performance.now() - overallStart),
          headers: {},
          bodyText: "",
          byteLength: 0,
          truncated: false,
          error: `Target URL exceeded maximum redirect limit (${maxRedirects} hops).`,
        };
      }

      let nextUrl: string;
      try {
        nextUrl = new URL(locationHeader, normalized.normalizedUrl).toString();
      } catch {
        return {
          ok: false,
          status: res.status,
          finalUrl: normalized.normalizedUrl,
          redirectChain,
          ttfbMs,
          totalMs: Math.round(performance.now() - overallStart),
          headers: {},
          bodyText: "",
          byteLength: 0,
          truncated: false,
          error: "Target server returned a malformed redirect Location header.",
        };
      }

      redirectChain.push({
        fromUrl: normalized.normalizedUrl,
        toUrl: nextUrl,
        status: res.status,
      });
      currentUrlStr = nextUrl;
      continue;
    }

    const headersObj: Record<string, string> = {};
    res.headers.forEach((v, k) => {
      headersObj[k.toLowerCase()] = v;
    });

    const { text, byteLength, truncated } = followRedirects
      ? await readBoundedResponseText(res, maxBytes)
      : { text: "", byteLength: 0, truncated: false };

    if (!followRedirects) {
      await res.body?.cancel().catch(() => undefined);
    }

    return {
      ok: res.status >= 200 && res.status < 400,
      status: res.status,
      finalUrl: normalized.normalizedUrl,
      redirectChain,
      ttfbMs,
      totalMs: Math.round(performance.now() - overallStart),
      headers: headersObj,
      bodyText: text,
      byteLength,
      truncated,
    };
  }

  return {
    ok: false,
    status: null,
    finalUrl: currentUrlStr,
    redirectChain,
    ttfbMs: 0,
    totalMs: Math.round(performance.now() - overallStart),
    headers: {},
    bodyText: "",
    byteLength: 0,
    truncated: false,
    error: "Redirect limit reached.",
  };
}

// ============================================================================
// PER-IP IN-MEMORY RATE LIMITER (15 scans / 10 minutes / IP per bucket)
// ============================================================================

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 15;

interface RateBucketEntry {
  timestamps: number[];
}

const scannerRateMap = new Map<string, RateBucketEntry>();

export function extractScannerClientIp(req: Request): string {
  const nfIp = req.headers.get("x-nf-client-connection-ip")?.trim();
  if (nfIp) return nfIp;

  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "local-client";
}

export function checkScannerRateLimit(
  req: Request,
  bucketPrefix = "scanner"
): {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
} {
  const now = Date.now();
  const ip = extractScannerClientIp(req);
  const key = `${bucketPrefix}:${ip}`;

  // Periodic lightweight cleanup
  if (scannerRateMap.size > 500) {
    for (const [k, entry] of scannerRateMap.entries()) {
      const fresh = entry.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (fresh.length === 0) {
        scannerRateMap.delete(k);
      } else {
        entry.timestamps = fresh;
      }
    }
  }

  const existing = scannerRateMap.get(key) ?? { timestamps: [] };
  const recent = existing.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = recent[0] ?? now;
    const retryAfterSec = Math.max(
      1,
      Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldest)) / 1000)
    );
    scannerRateMap.set(key, { timestamps: recent });
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec,
    };
  }

  recent.push(now);
  scannerRateMap.set(key, { timestamps: recent });
  return {
    allowed: true,
    remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - recent.length),
    retryAfterSec: 0,
  };
}
