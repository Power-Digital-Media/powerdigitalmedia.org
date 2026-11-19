import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import {
  assertSafePublicHostname,
  checkScannerRateLimit,
  normalizeScannerTargetUrl,
  safeScannerFetch,
} from "@/lib/scanner-ssrf-guard";
import type {
  AiCrawlerRuleStatus,
  ArdManifestCheck,
  ConversionAuditSummary,
  CruxSummary,
  CwvRating,
  LlmsFileCheck,
  LocalSignalsSummary,
  LocalSignalZoneCheck,
  ScannerIssue,
  ScannerStage1Response,
  SchemaAuditSummary,
  TechnicalSeoSummary,
} from "@/lib/scanner-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AI_CRAWLERS_TO_AUDIT: Array<{ bot: string; platform: string }> = [
  { bot: "GPTBot", platform: "ChatGPT Knowledge & Citations" },
  { bot: "OAI-SearchBot", platform: "ChatGPT Live Search" },
  { bot: "Google-Extended", platform: "Google Gemini & AI Overviews" },
  { bot: "PerplexityBot", platform: "Perplexity Answer Engine" },
  { bot: "ClaudeBot", platform: "Anthropic Claude Search" },
  { bot: "Applebot-Extended", platform: "Apple Intelligence & Siri" },
];

const LOCAL_BUSINESS_SUBTYPES = new Set([
  "localbusiness",
  "homeandconstructionbusiness",
  "roofingcontractor",
  "hvacbusiness",
  "generalcontractor",
  "plumber",
  "electrician",
  "locksmith",
  "movingcompany",
  "housepainter",
  "autorepair",
  "professionalservice",
  "legalservice",
  "medicalbusiness",
  "dentist",
  "pharmacy",
  "medicalclinic",
  "physician",
  "restaurant",
  "foodestablishment",
  "bakery",
  "cafeorcoffeeshop",
  "fastfoodrestaurant",
  "barorpub",
  "store",
  "autodealer",
  "church",
  "placeofworship",
  "realestateagent",
  "financialservice",
  "insuranceagency",
  "healthandbeautybusiness",
  "hairsalon",
  "dayspa",
  "childcare",
  "selfstorage",
]);

interface RobotsRule {
  directive: "allow" | "disallow";
  pattern: string;
}

interface ParsedRobotsTxt {
  groups: Map<string, RobotsRule[]>;
  sitemaps: string[];
}

function parseRobotsTxt(rawText: string): ParsedRobotsTxt {
  const groups = new Map<string, RobotsRule[]>();
  const sitemaps: string[] = [];

  const lines = rawText.split(/\r?\n/);
  let currentAgents: string[] = [];
  let sawRuleSinceAgent = false;

  for (const rawLine of lines) {
    const withoutComment = rawLine.replace(/#.*$/, "").trim();
    if (!withoutComment) continue;

    const colonIdx = withoutComment.indexOf(":");
    if (colonIdx === -1) continue;

    const field = withoutComment.slice(0, colonIdx).trim().toLowerCase();
    const value = withoutComment.slice(colonIdx + 1).trim();

    if (field === "sitemap") {
      if (value) sitemaps.push(value);
      continue;
    }

    if (field === "user-agent") {
      const ua = value.toLowerCase();
      if (!ua) continue;
      if (sawRuleSinceAgent) {
        currentAgents = [ua];
        sawRuleSinceAgent = false;
      } else {
        currentAgents.push(ua);
      }
      if (!groups.has(ua)) {
        groups.set(ua, []);
      }
      continue;
    }

    if (field === "allow" || field === "disallow") {
      sawRuleSinceAgent = true;
      if (currentAgents.length === 0) continue;
      for (const agent of currentAgents) {
        const list = groups.get(agent) ?? [];
        list.push({ directive: field, pattern: value });
        groups.set(agent, list);
      }
    }
  }

  return { groups, sitemaps };
}

function doesRobotsPatternMatchRoot(pattern: string): boolean {
  if (!pattern) return false;
  if (pattern === "/" || pattern === "/*") return true;
  if (pattern === "*") return true;
  // Patterns like /admin or /api do NOT block root "/"
  return false;
}

function evaluateAiCrawlers(
  robotsPresent: boolean,
  parsed: ParsedRobotsTxt | null
): AiCrawlerRuleStatus[] {
  return AI_CRAWLERS_TO_AUDIT.map(({ bot, platform }) => {
    if (!robotsPresent || !parsed) {
      return {
        bot,
        platform,
        status: "allowed",
        matchedGroup: "no robots.txt (open)",
      };
    }

    const botKey = bot.toLowerCase();
    let matchedKey: string | null = null;

    if (parsed.groups.has(botKey)) {
      matchedKey = botKey;
    } else {
      // Check prefix match per robots spec (e.g., google-extended)
      for (const groupUa of parsed.groups.keys()) {
        if (groupUa !== "*" && botKey.startsWith(groupUa)) {
          matchedKey = groupUa;
          break;
        }
      }
    }

    const effectiveGroup = matchedKey ?? (parsed.groups.has("*") ? "*" : null);
    if (!effectiveGroup) {
      return {
        bot,
        platform,
        status: "allowed",
        matchedGroup: "unrestricted",
      };
    }

    const rules = parsed.groups.get(effectiveGroup) ?? [];
    let bestMatchLen = -1;
    let bestDirective: "allow" | "disallow" = "allow";

    for (const rule of rules) {
      if (!rule.pattern) continue; // Empty Disallow means allow all
      if (doesRobotsPatternMatchRoot(rule.pattern)) {
        const len = rule.pattern.length;
        if (
          len > bestMatchLen ||
          (len === bestMatchLen && rule.directive === "allow")
        ) {
          bestMatchLen = len;
          bestDirective = rule.directive;
        }
      }
    }

    return {
      bot,
      platform,
      status: bestDirective === "disallow" ? "blocked" : "allowed",
      matchedGroup: effectiveGroup === "*" ? "User-agent: *" : `User-agent: ${bot}`,
    };
  });
}

function evaluateLlmsFile(
  url: string,
  status: number | null,
  headers: Record<string, string>,
  bodyText: string,
  byteLength: number
): LlmsFileCheck {
  const trimmed = (bodyText || "").trim();
  const contentType = (headers["content-type"] || "").toLowerCase();

  const looksLikeHtml =
    /^\s*(?:<!doctype\s+html|<html[\s>]|<head[\s>]|<body[\s>]|<meta[\s>]|<script[\s>])/i.test(
      trimmed
    ) ||
    (contentType.includes("text/html") && /<\/html>|<\/body>|<div[\s>]/i.test(trimmed));

  const isSoft404Html = status === 200 && looksLikeHtml;
  const validPlaintext = status === 200 && !looksLikeHtml && trimmed.length >= 24;

  if (!validPlaintext) {
    return {
      url,
      httpStatus: status,
      validPlaintext: false,
      isSoft404Html,
      byteLength: status === 200 ? byteLength : 0,
      wordCount: 0,
      headingCount: 0,
      markdownLinkCount: 0,
      followsLlmsSpec: false,
      previewSnippet: "",
    };
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  const headings = trimmed.match(/^#{1,6}\s+\S+/gm) || [];
  const mdLinks =
    trimmed.match(/(?<!!)\[[^\]]+\]\(\s*(?:https?:\/\/|\/|mailto:)[^)\s]+[^)]*\)/gi) ||
    [];
  const markdownLinkCount = mdLinks.length;
  const followsLlmsSpec = markdownLinkCount > 0;
  const cleanPreview = trimmed
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .slice(0, 280);

  return {
    url,
    httpStatus: status,
    validPlaintext: true,
    isSoft404Html: false,
    byteLength,
    wordCount: words.length,
    headingCount: headings.length,
    markdownLinkCount,
    followsLlmsSpec,
    previewSnippet: cleanPreview + (trimmed.length > 280 ? "…" : ""),
  };
}

const OFFICIAL_ARD_MEDIA_TYPES = new Set([
  "application/ai-catalog+json",
  "application/agent-card+json",
  "application/a2a-agent-card+json",
  "application/mcp-server-card+json",
  "application/agent-skills+json",
  "application/agent-skills+md",
  "application/agent-skills+zip",
  "application/agent-skills+gzip",
  'text/markdown; profile="urn:air:agent-skills"',
  "application/agent-plugins+zip",
  "application/agent-plugins+gzip",
  "application/ai-registry",
  "application/ai-registry+json",
]);

function isOfficialArdMediaType(rawType: string): boolean {
  const normalized = rawType
    .trim()
    .toLowerCase()
    .replace(/\s*;\s*/g, "; ")
    .replace(/\s*=\s*/g, "=");
  return OFFICIAL_ARD_MEDIA_TYPES.has(normalized);
}

function evaluateArdManifest(
  url: string,
  status: number | null,
  headers: Record<string, string>,
  bodyText: string
): ArdManifestCheck {
  if (status !== 200) {
    return {
      url,
      httpStatus: status,
      status: "missing",
      entryCount: 0,
      specVersion: null,
      errorDetail: status ? `HTTP ${status}` : "Unreachable",
    };
  }

  const trimmed = (bodyText || "").trim();
  const contentType = (headers["content-type"] || "").toLowerCase();
  const looksLikeHtml =
    /^\s*(?:<!doctype\s+html|<html[\s>]|<head[\s>]|<body[\s>]|<meta[\s>]|<script[\s>])/i.test(
      trimmed
    ) ||
    (contentType.includes("text/html") && /<\/html>|<\/body>|<div[\s>]/i.test(trimmed));

  if (looksLikeHtml) {
    return {
      url,
      httpStatus: status,
      status: "invalid_html_soft404",
      entryCount: 0,
      specVersion: null,
      errorDetail:
        "Endpoint returned HTML markup (SPA catch-all soft-200) instead of Agentic Resource Discovery JSON.",
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return {
      url,
      httpStatus: status,
      status: "invalid_schema",
      entryCount: 0,
      specVersion: null,
      errorDetail: "Malformed JSON syntax in /.well-known/ard.json.",
    };
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {
      url,
      httpStatus: status,
      status: "invalid_schema",
      entryCount: 0,
      specVersion: null,
      errorDetail: "Root ARD payload must be a JSON object.",
    };
  }

  const root = parsed as Record<string, unknown>;
  const specVersion =
    typeof root.specVersion === "string" && root.specVersion.trim()
      ? root.specVersion.trim()
      : null;
  const entries = root.entries;

  if (!Array.isArray(entries) || entries.length === 0) {
    return {
      url,
      httpStatus: status,
      status: "invalid_schema",
      entryCount: 0,
      specVersion,
      errorDetail: "ARD manifest is missing a non-empty entries[] array.",
    };
  }

  const allEntriesHaveRequiredFields = entries.every((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return false;
    const entry = item as Record<string, unknown>;
    const hasUrn =
      typeof entry.identifier === "string" &&
      entry.identifier.trim().startsWith("urn:air:");
    const hasDisplayName =
      typeof entry.displayName === "string" && entry.displayName.trim().length > 0;
    const hasType =
      typeof entry.type === "string" && entry.type.trim().length > 0;
    const hasTarget =
      (typeof entry.url === "string" && entry.url.trim().length > 0) ||
      entry.data !== undefined;
    return hasUrn && hasDisplayName && hasType && hasTarget;
  });

  if (!allEntriesHaveRequiredFields) {
    return {
      url,
      httpStatus: status,
      status: "invalid_schema",
      entryCount: entries.length,
      specVersion,
      errorDetail:
        "Every ARD entry must define a urn:air: identifier, displayName, type, and url or data.",
    };
  }

  const nonStandardTypeEntry = entries.find((item) => {
    const entry = item as Record<string, unknown>;
    return !isOfficialArdMediaType(String(entry.type));
  }) as Record<string, unknown> | undefined;

  if (nonStandardTypeEntry) {
    return {
      url,
      httpStatus: status,
      status: "invalid_schema",
      entryCount: entries.length,
      specVersion,
      errorDetail: `ARD entry "${String(
        nonStandardTypeEntry.type
      )}" uses a non-standard media type; Lighthouse 13.6 ard-schema expects official ARD media types such as text/markdown; profile="urn:air:agent-skills" for a 1.0 score.`,
    };
  }

  return {
    url,
    httpStatus: status,
    status: "valid",
    entryCount: entries.length,
    specVersion: specVersion || "1.0",
    errorDetail: null,
  };
}

function analyzeJsonLdBlocks(
  $: cheerio.CheerioAPI,
  hostname: string
): SchemaAuditSummary & { sameAsCount: number; flatSchemaText: string } {
  const scripts = $('script[type="application/ld+json"]');
  const totalScriptBlocks = scripts.length;
  let validBlocks = 0;
  let malformedBlocks = 0;

  const parsedObjects: unknown[] = [];
  const typeMap = new Map<string, string>(); // lower -> original
  const localTypesMap = new Map<string, string>();
  const sameAsSet = new Set<string>();

  const fields = {
    name: false,
    telephone: false,
    address: false,
    geo: false,
    areaServed: false,
    aggregateRating: false,
    openingHoursSpecification: false,
    image: false,
    sameAs: false,
    speakable: false,
  };

  const walkNode = (node: unknown, depth = 0) => {
    if (!node || depth > 14) return;
    if (Array.isArray(node)) {
      for (const item of node) walkNode(item, depth + 1);
      return;
    }
    if (typeof node !== "object") return;

    const obj = node as Record<string, unknown>;
    const rawType = obj["@type"];
    const types = Array.isArray(rawType)
      ? rawType.filter((t): t is string => typeof t === "string")
      : typeof rawType === "string"
      ? [rawType]
      : [];

    for (const t of types) {
      const cleanType = t.replace(/^https?:\/\/schema\.org\//i, "").trim();
      if (!cleanType) continue;
      const lower = cleanType.toLowerCase();
      if (!typeMap.has(lower)) typeMap.set(lower, cleanType);
      if (LOCAL_BUSINESS_SUBTYPES.has(lower)) {
        localTypesMap.set(lower, cleanType);
      }
      if (lower === "speakablespecification") {
        fields.speakable = true;
      }
    }

    const hasNonEmpty = (val: unknown): boolean => {
      if (typeof val === "string") return val.trim().length > 0;
      if (typeof val === "number") return Number.isFinite(val);
      if (Array.isArray(val)) return val.length > 0;
      if (val && typeof val === "object") return Object.keys(val).length > 0;
      return false;
    };

    if (hasNonEmpty(obj.name) || hasNonEmpty(obj.legalName)) fields.name = true;
    if (hasNonEmpty(obj.telephone)) fields.telephone = true;
    if (hasNonEmpty(obj.address) || hasNonEmpty(obj.location)) fields.address = true;
    if (hasNonEmpty(obj.geo)) fields.geo = true;
    if (hasNonEmpty(obj.areaServed) || hasNonEmpty(obj.serviceArea)) {
      fields.areaServed = true;
    }
    if (hasNonEmpty(obj.aggregateRating)) fields.aggregateRating = true;
    if (
      hasNonEmpty(obj.openingHoursSpecification) ||
      hasNonEmpty(obj.openingHours)
    ) {
      fields.openingHoursSpecification = true;
    }
    if (hasNonEmpty(obj.image) || hasNonEmpty(obj.logo)) fields.image = true;
    if (hasNonEmpty(obj.speakable)) fields.speakable = true;

    if (typeof obj.sameAs === "string" && obj.sameAs.trim()) {
      fields.sameAs = true;
      sameAsSet.add(obj.sameAs.trim());
    } else if (Array.isArray(obj.sameAs)) {
      for (const s of obj.sameAs) {
        if (typeof s === "string" && s.trim()) {
          fields.sameAs = true;
          sameAsSet.add(s.trim());
        }
      }
    }

    for (const [key, val] of Object.entries(obj)) {
      if (key === "@context") continue;
      if (val && typeof val === "object") {
        walkNode(val, depth + 1);
      }
    }
  };

  scripts.each((_, el) => {
    const raw = $(el)
      .html()
      ?.trim()
      .replace(/^<!--|-->$/g, "")
      .trim();
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      validBlocks += 1;
      parsedObjects.push(parsed);
      walkNode(parsed, 0);
    } catch {
      malformedBlocks += 1;
    }
  });

  const detectedTypes = Array.from(typeMap.values());
  const localBusinessTypes = Array.from(localTypesMap.values());
  const richResultWarnings: string[] = [];

  if (malformedBlocks > 0) {
    richResultWarnings.push(
      `${malformedBlocks} JSON-LD script block(s) contain invalid JSON syntax and are ignored by Google & AI parsers.`
    );
  }

  const isGovOrEdu = /\.(gov|mil|edu)$/i.test(hostname);
  const hasMedicalSchema = detectedTypes.some((t) =>
    /medical|pharmacy|physician|hospital|dentist|health/i.test(t)
  );

  if (typeMap.has("faqpage") && !isGovOrEdu && !hasMedicalSchema) {
    richResultWarnings.push(
      "FAQPage JSON-LD detected: Google restricts expandable FAQ Rich Results in SERPs to authoritative government & health domains (Q&A pairs still aid AI answer engines)."
    );
  }

  if (typeMap.has("howto")) {
    richResultWarnings.push(
      "HowTo JSON-LD detected: Google deprecated HowTo Rich Results across desktop and mobile search."
    );
  }

  if (validBlocks > 0 && localBusinessTypes.length === 0 && !typeMap.has("organization")) {
    richResultWarnings.push(
      "JSON-LD exists, but no LocalBusiness subtype (e.g., RoofingContractor, HVACBusiness, Restaurant) or Organization entity was found."
    );
  }

  let jsonPreview = "";
  let flatSchemaText = "";
  if (parsedObjects.length > 0) {
    const pretty = JSON.stringify(
      parsedObjects.length === 1 ? parsedObjects[0] : parsedObjects,
      null,
      2
    );
    flatSchemaText = pretty;
    jsonPreview =
      pretty.length > 4096
        ? `${pretty.slice(0, 4096)}\n... [truncated at 4 KB for live preview]`
        : pretty;
  }

  return {
    totalScriptBlocks,
    validBlocks,
    malformedBlocks,
    detectedTypes,
    localBusinessTypes,
    fields,
    richResultWarnings,
    jsonPreview,
    sameAsCount: sameAsSet.size,
    flatSchemaText,
  };
}

function buildServiceTerms(rawService: string): string[] {
  const clean = rawService.trim().toLowerCase();
  if (!clean) return [];

  const synonymMap: Record<string, string[]> = {
    roofing: ["roofing", "roofer", "roof repair", "roof replacement", "shingle", "roof"],
    hvac: ["hvac", "air conditioning", "ac repair", "heating", "heat pump", "furnace"],
    "dirt work": [
      "dirt work",
      "excavation",
      "land clearing",
      "mulching",
      "grading",
      "pad",
      "pond",
    ],
    restaurant: [
      "restaurant",
      "catering",
      "menu",
      "order online",
      "seafood",
      "crawfish",
      "dining",
      "food",
    ],
    plumbing: ["plumbing", "plumber", "water heater", "drain", "pipe"],
    "medical/retail": [
      "pharmacy",
      "medical",
      "clinic",
      "health",
      "retail",
      "store",
      "shop",
      "dental",
    ],
    "web design": [
      "web design",
      "website",
      "websites",
      "next.js",
      "web studio",
      "digital",
    ],
    seo: ["seo", "map pack", "google maps", "search", "rankings"],
    electrical: ["electrical", "electrician", "panel", "generator", "wiring"],
    "lawn care": ["lawn", "landscaping", "turf", "mowing", "pine straw"],
  };

  if (synonymMap[clean]) {
    return synonymMap[clean];
  }
  return [clean];
}

function inferPrimaryServiceFromHeadings(title: string, firstH1: string): string {
  const combined = `${title} ${firstH1}`.toLowerCase();
  const presets: Array<[RegExp, string]> = [
    [/\broof(ing|er|s)?\b/i, "Roofing"],
    [/\b(hvac|air conditioning|ac repair|heating)\b/i, "HVAC"],
    [/\b(dirt work|excavat|land clearing|forestry mulching|lawn)\b/i, "Dirt Work & Exterior"],
    [/\b(plumb(ing|er))\b/i, "Plumbing"],
    [/\b(electric(ian|al))\b/i, "Electrical"],
    [/\b(restaurant|catering|crawfish|seafood|bakery|cafe)\b/i, "Restaurant & Catering"],
    [/\b(pharmacy|clinic|medical|dental|dentist)\b/i, "Healthcare / Pharmacy"],
    [/\b(church|ministry|worship)\b/i, "Ministry"],
    [/\b(web design|websites?|seo|field apps|marketing)\b/i, "Web Design & Local SEO"],
  ];

  for (const [rx, label] of presets) {
    if (rx.test(combined)) return label;
  }
  return "";
}

function textMatchesAnyTerm(haystack: string, terms: string[]): boolean {
  if (!haystack || terms.length === 0) return false;
  const lower = haystack.toLowerCase();
  return terms.some((t) => lower.includes(t.toLowerCase()));
}

function rateCwv(
  metric: "lcp" | "inp" | "cls",
  val: number | null
): CwvRating | null {
  if (val === null || !Number.isFinite(val)) return null;
  if (metric === "lcp") {
    return val <= 2500 ? "good" : val <= 4000 ? "needs_improvement" : "poor";
  }
  if (metric === "inp") {
    return val <= 200 ? "good" : val <= 500 ? "needs_improvement" : "poor";
  }
  return val <= 0.1 ? "good" : val <= 0.25 ? "needs_improvement" : "poor";
}

async function queryCruxFieldVitals(
  finalUrl: string,
  origin: string
): Promise<CruxSummary> {
  const apiKey = (
    process.env.CRUX_API_KEY ||
    process.env.PAGESPEED_API_KEY ||
    ""
  ).trim();

  if (!apiKey) {
    return {
      status: "not_configured",
      sourceLevel: null,
      lcpMs: null,
      inpMs: null,
      cls: null,
      lcpRating: null,
      inpRating: null,
      clsRating: null,
    };
  }

  const endpoint = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${encodeURIComponent(
    apiKey
  )}`;

  const attempts: Array<{ body: Record<string, string>; level: "url" | "origin" }> = [
    { body: { url: finalUrl, formFactor: "PHONE" }, level: "url" },
    { body: { origin, formFactor: "PHONE" }, level: "origin" },
    { body: { origin }, level: "origin" },
  ];

  let saw404 = false;

  for (const attempt of attempts) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(attempt.body),
        signal: AbortSignal.timeout(4500),
      });

      if (res.status === 404) {
        saw404 = true;
        continue;
      }

      if (!res.ok) {
        continue;
      }

      const data = (await res.json()) as {
        record?: {
          metrics?: Record<
            string,
            { percentiles?: { p75?: number | string } }
          >;
        };
      };

      const metrics = data?.record?.metrics;
      if (!metrics) continue;

      const rawLcp = metrics.largest_contentful_paint?.percentiles?.p75;
      const rawInp =
        metrics.interaction_to_next_paint?.percentiles?.p75 ??
        metrics.first_input_delay?.percentiles?.p75;
      const rawCls = metrics.cumulative_layout_shift?.percentiles?.p75;

      const lcpMs = rawLcp !== undefined ? Math.round(Number(rawLcp)) : null;
      const inpMs = rawInp !== undefined ? Math.round(Number(rawInp)) : null;
      const cls =
        rawCls !== undefined ? Math.round(Number(rawCls) * 1000) / 1000 : null;

      return {
        status: "available",
        sourceLevel: attempt.level,
        lcpMs: Number.isFinite(lcpMs) ? lcpMs : null,
        inpMs: Number.isFinite(inpMs) ? inpMs : null,
        cls: Number.isFinite(cls) ? cls : null,
        lcpRating: rateCwv("lcp", lcpMs),
        inpRating: rateCwv("inp", inpMs),
        clsRating: rateCwv("cls", cls),
      };
    } catch {
      // Try next fallback
    }
  }

  return {
    status: saw404 ? "insufficient_traffic" : "error",
    sourceLevel: null,
    lcpMs: null,
    inpMs: null,
    cls: null,
    lcpRating: null,
    inpRating: null,
    clsRating: null,
  };
}

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
    return NextResponse.json({ ok: false, error: normalized.error }, { status: 400 });
  }

  const dnsCheck = await assertSafePublicHostname(normalized.hostname);
  if (!dnsCheck.safe) {
    return NextResponse.json({ ok: false, error: dnsCheck.reason }, { status: 400 });
  }

  // Run primary HTTPS/URL fetch + plain HTTP->HTTPS redirect check in parallel
  const plainHttpProbeUrl = `http://${normalized.hostname}/`;
  const [mainFetch, httpProbe] = await Promise.all([
    safeScannerFetch(normalized.normalizedUrl, {
      timeoutMs: 8000,
      maxBytes: 2 * 1024 * 1024,
      followRedirects: true,
    }),
    safeScannerFetch(plainHttpProbeUrl, {
      timeoutMs: 4500,
      maxBytes: 16_384,
      followRedirects: false,
    }),
  ]);

  if (!mainFetch.status || !mainFetch.bodyText) {
    return NextResponse.json(
      {
        ok: false,
        error:
          mainFetch.error ||
          `Unable to reach ${normalized.hostname}. Make sure the website is live and publicly accessible.`,
      },
      { status: 422 }
    );
  }

  const finalUrlObj = new URL(mainFetch.finalUrl);
  const finalOrigin = finalUrlObj.origin;
  const finalHostname = finalUrlObj.hostname.toLowerCase();

  const httpLocation = (httpProbe.headers["location"] || "").trim();
  const httpRedirectsToHttps =
    Boolean(
      httpProbe.status &&
        [301, 302, 307, 308].includes(httpProbe.status) &&
        /^https:\/\//i.test(httpLocation)
    ) ||
    (normalized.url.protocol === "http:" && finalUrlObj.protocol === "https:");

  // Run robots.txt, llms.txt, llms-full.txt, ard.json, default sitemap.xml & CrUX in parallel
  const [
    robotsFetch,
    llmsFetch,
    llmsFullFetch,
    ardFetch,
    defaultSitemapFetch,
    crux,
  ] = await Promise.all([
    safeScannerFetch(`${finalOrigin}/robots.txt`, {
      timeoutMs: 5500,
      maxBytes: 256 * 1024,
      acceptHeader: "text/plain,*/*;q=0.8",
    }),
    safeScannerFetch(`${finalOrigin}/llms.txt`, {
      timeoutMs: 5500,
      maxBytes: 512 * 1024,
      acceptHeader: "text/plain,text/markdown,*/*;q=0.8",
    }),
    safeScannerFetch(`${finalOrigin}/llms-full.txt`, {
      timeoutMs: 5500,
      maxBytes: 768 * 1024,
      acceptHeader: "text/plain,text/markdown,*/*;q=0.8",
    }),
    safeScannerFetch(`${finalOrigin}/.well-known/ard.json`, {
      timeoutMs: 5500,
      maxBytes: 256 * 1024,
      acceptHeader: "application/json,*/*;q=0.8",
    }),
    safeScannerFetch(`${finalOrigin}/sitemap.xml`, {
      timeoutMs: 5500,
      maxBytes: 1024 * 1024,
      acceptHeader: "application/xml,text/xml,*/*;q=0.8",
    }),
    queryCruxFieldVitals(mainFetch.finalUrl, finalOrigin),
  ]);

  // Parse robots.txt
  const robotsIsPlain =
    robotsFetch.status === 200 &&
    !/^\s*(?:<!doctype\s+html|<html[\s>])/i.test(robotsFetch.bodyText);
  const parsedRobots = robotsIsPlain ? parseRobotsTxt(robotsFetch.bodyText) : null;

  // Resolve sitemap (use declared Sitemap in robots.txt if /sitemap.xml wasn't valid XML)
  let sitemapCheckedUrl = `${finalOrigin}/sitemap.xml`;
  let sitemapFetch = defaultSitemapFetch;

  const isXmlSitemap = (txt: string, status: number | null) =>
    status === 200 && /<(?:urlset|sitemapindex)[\s>]/i.test(txt);

  if (
    !isXmlSitemap(sitemapFetch.bodyText, sitemapFetch.status) &&
    parsedRobots &&
    parsedRobots.sitemaps.length > 0
  ) {
    const declared = parsedRobots.sitemaps[0];
    const altFetch = await safeScannerFetch(declared, {
      timeoutMs: 5000,
      maxBytes: 1024 * 1024,
      acceptHeader: "application/xml,text/xml,*/*;q=0.8",
    });
    sitemapCheckedUrl = declared;
    sitemapFetch = altFetch;
  }

  const sitemapPresent = isXmlSitemap(sitemapFetch.bodyText, sitemapFetch.status);
  const sitemapLocMatches = sitemapPresent
    ? sitemapFetch.bodyText.match(/<loc>\s*https?:\/\/[^<\s]+/gi) || []
    : [];
  const isSitemapIndex =
    sitemapPresent && /<sitemapindex[\s>]/i.test(sitemapFetch.bodyText);

  // Parse HTML with Cheerio
  const $ = cheerio.load(mainFetch.bodyText);

  const title = $("head title").first().text().replace(/\s+/g, " ").trim() ||
    $("title").first().text().replace(/\s+/g, " ").trim();
  const metaDescription = (
    $('meta[name="description"]').attr("content") ||
    $('meta[name="Description"]').attr("content") ||
    ""
  )
    .replace(/\s+/g, " ")
    .trim();

  const canonicalUrl = ($('link[rel="canonical"]').attr("href") || "").trim();
  const robotsMeta = (
    $('meta[name="robots"]').attr("content") ||
    mainFetch.headers["x-robots-tag"] ||
    ""
  ).trim();
  const isNoindex = /\bnoindex\b/i.test(robotsMeta);
  const hasViewport = Boolean($('meta[name="viewport"]').attr("content"));
  const ogTitle = Boolean($('meta[property="og:title"]').attr("content"));
  const ogDescription = Boolean(
    $('meta[property="og:description"]').attr("content")
  );
  const ogImage = Boolean($('meta[property="og:image"]').attr("content"));

  const h1Elements = $("h1");
  const h1Count = h1Elements.length;
  const firstH1 = h1Elements.first().text().replace(/\s+/g, " ").trim();
  const h2Count = $("h2").length;

  const subheadingsList: string[] = [];
  const questionHeadings: string[] = [];
  $("h2, h3").each((_, el) => {
    const txt = $(el).text().replace(/\s+/g, " ").trim();
    if (!txt) return;
    subheadingsList.push(txt);
    if (
      txt.includes("?") ||
      /^(?:how|what|why|when|where|who|can|does|do|is|are|should)\b/i.test(txt)
    ) {
      questionHeadings.push(txt);
    }
  });

  // Image alt coverage (excluding tracking pixels)
  let totalImages = 0;
  let imagesWithAlt = 0;
  $("img").each((_, el) => {
    const src = ($(el).attr("src") || "").trim();
    if (
      src.startsWith("data:image/gif") ||
      src.includes("facebook.com/tr") ||
      $(el).attr("aria-hidden") === "true"
    ) {
      return;
    }
    totalImages += 1;
    const alt = ($(el).attr("alt") || "").trim();
    if (alt.length > 0) imagesWithAlt += 1;
  });
  const imagesMissingAlt = Math.max(0, totalImages - imagesWithAlt);
  const imageAltCoveragePct =
    totalImages === 0 ? 100 : Math.round((imagesWithAlt / totalImages) * 100);

  // Schema / JSON-LD analysis (must run BEFORE removing script tags!)
  const schemaAnalysis = analyzeJsonLdBlocks($, finalHostname);

  // Conversion & Analytics checks (inspect raw HTML + anchors before stripping scripts)
  const rawHtml = mainFetch.bodyText;
  const hasGa4OrGtm =
    /googletagmanager\.com\/(?:gtag\/js|gtm\.js)|G-[A-Z0-9]{6,12}|GTM-[A-Z0-9]{4,10}/i.test(
      rawHtml
    );
  const hasMetaPixel =
    /connect\.facebook\.net|fbq\s*\(|facebook\.com\/tr\?id=/i.test(rawHtml);

  const phoneSet = new Set<string>();
  let hasSmsLink = false;
  const quoteLinkSet = new Set<string>();
  const localHubLinkSet = new Set<string>();

  $("a[href]").each((_, el) => {
    const href = ($(el).attr("href") || "").trim();
    if (!href) return;

    if (/^tel:/i.test(href)) {
      const cleaned = href.replace(/^tel:/i, "").split("?")[0].trim();
      if (cleaned) phoneSet.add(cleaned);
      return;
    }

    if (/^sms:/i.test(href)) {
      hasSmsLink = true;
      return;
    }

    const linkText = $(el).text().replace(/\s+/g, " ").trim();
    const combined = `${href} ${linkText}`.toLowerCase();

    if (
      /(?:\/estimate|\/quote|\/free-audit|\/book|\/order|\/schedule|\/appointment|calendly\.com|square\.site|#estimator|#quote)/i.test(
        href
      ) ||
      /\b(?:free estimate|instant estimate|get a quote|book online|order online|schedule service|free audit)\b/i.test(
        combined
      )
    ) {
      quoteLinkSet.add(linkText ? `${linkText} (${href})` : href);
    }

    if (
      /(?:\/locations?\/|\/service-areas?\/|\/areas-we-serv|\/cities\/|\/(?:jackson|madison|flora|brandon|ridgeland|flowood|pearl|clinton|canton|byram)(?:-ms)?\b)/i.test(
        href
      )
    ) {
      localHubLinkSet.add(href);
    }
  });

  const formCount = $("form").length;

  // Extract visible body copy after removing non-visible nodes
  const $clean = cheerio.load(mainFetch.bodyText);
  $clean("script, style, noscript, svg, template").remove();
  const visibleBodyText = $clean("body").text().replace(/\s+/g, " ").trim();
  const visibleWords = visibleBodyText ? visibleBodyText.split(" ").filter(Boolean) : [];
  const visibleWordCount = visibleWords.length;

  const hasUnlinkedPhoneInText =
    phoneSet.size === 0 &&
    /(?:\+?1[-.\s]?)?\(\d{3}\)\s*\d{3}[-.\s]\d{4}|\b\d{3}[-.]\d{3}[-.]\d{4}\b/.test(
      visibleBodyText
    );

  // GEO / AEO, llms.txt & Agentic Resource Discovery (ARD) evaluation
  const llmsTxt = evaluateLlmsFile(
    `${finalOrigin}/llms.txt`,
    llmsFetch.status,
    llmsFetch.headers,
    llmsFetch.bodyText,
    llmsFetch.byteLength
  );
  const llmsFullTxt = evaluateLlmsFile(
    `${finalOrigin}/llms-full.txt`,
    llmsFullFetch.status,
    llmsFullFetch.headers,
    llmsFullFetch.bodyText,
    llmsFullFetch.byteLength
  );
  const ardManifest = evaluateArdManifest(
    `${finalOrigin}/.well-known/ard.json`,
    ardFetch.status,
    ardFetch.headers,
    ardFetch.bodyText
  );
  const aiCrawlers = evaluateAiCrawlers(robotsIsPlain, parsedRobots);

  // Local Ranking Signal & Keyword/City Alignment Check
  const rawCityInput = (body.targetCity || "Jackson, MS").trim();
  const normalizedCityCore = rawCityInput
    .replace(/,\s*(?:ms|mississippi)\b/i, "")
    .replace(/\b(?:ms|mississippi)\s*$/i, "")
    .trim();
  const cityMatchTerms = normalizedCityCore ? [normalizedCityCore.toLowerCase()] : [];

  const rawServiceInput = (body.targetService || "").trim();
  const inferredService = !rawServiceInput
    ? inferPrimaryServiceFromHeadings(title, firstH1)
    : "";
  const effectiveServiceLabel = rawServiceInput || inferredService;
  const serviceMatchTerms = buildServiceTerms(effectiveServiceLabel);

  const subheadingsCombined = subheadingsList.join(" | ");
  const zoneDefinitions: Array<{ zone: string; content: string; preview: string }> = [
    {
      zone: "<title> Tag",
      content: title,
      preview: title || "(Missing <title> tag)",
    },
    {
      zone: "<h1> Main Heading",
      content: firstH1,
      preview: firstH1 || "(Missing <h1> heading)",
    },
    {
      zone: "<h2> / <h3> Subheadings",
      content: subheadingsCombined,
      preview:
        subheadingsList.slice(0, 3).join(" • ").slice(0, 140) ||
        "(No H2/H3 subheadings found)",
    },
    {
      zone: "<meta description>",
      content: metaDescription,
      preview: metaDescription.slice(0, 140) || "(Missing meta description)",
    },
    {
      zone: "Visible Page Copy",
      content: visibleBodyText,
      preview: `${visibleWordCount.toLocaleString()} visible words scanned`,
    },
    {
      zone: "JSON-LD Schema (areaServed / address)",
      content: schemaAnalysis.flatSchemaText,
      preview:
        schemaAnalysis.detectedTypes.length > 0
          ? `Entities: ${schemaAnalysis.detectedTypes.slice(0, 4).join(", ")}`
          : "(No JSON-LD schema found)",
    },
  ];

  const zones: LocalSignalZoneCheck[] = zoneDefinitions.map((z) => ({
    zone: z.zone,
    cityMatched:
      cityMatchTerms.length > 0
        ? textMatchesAnyTerm(z.content, cityMatchTerms)
        : null,
    serviceMatched:
      serviceMatchTerms.length > 0
        ? textMatchesAnyTerm(z.content, serviceMatchTerms)
        : null,
    snippet: z.preview,
  }));

  const cityZoneHits = zones.filter((z) => z.cityMatched === true).length;
  const serviceZoneHits = zones.filter((z) => z.serviceMatched === true).length;

  // =========================================================================
  // TRANSPARENT DETERMINISTIC SCORING (0-100 PER PILLAR)
  // =========================================================================

  const isHttps = finalUrlObj.protocol === "https:";
  const hasHsts = Boolean(mainFetch.headers["strict-transport-security"]);
  const hasXContentTypeOptions = Boolean(mainFetch.headers["x-content-type-options"]);
  const compressionEncoding = mainFetch.headers["content-encoding"] || "none";

  // 1. Technical SEO Score (0-100)
  let seoScore = 0;
  if (isHttps) seoScore += 12;
  if (httpRedirectsToHttps) seoScore += 4;
  if (!isNoindex) seoScore += 14;
  if (title.length > 0) seoScore += 10;
  if (title.length >= 30 && title.length <= 65) seoScore += 6;
  else if (title.length >= 18 && title.length <= 75) seoScore += 3;
  if (metaDescription.length > 0) seoScore += 10;
  if (metaDescription.length >= 70 && metaDescription.length <= 165) seoScore += 6;
  else if (metaDescription.length >= 45 && metaDescription.length <= 200) seoScore += 3;
  if (canonicalUrl) seoScore += 8;
  if (h1Count === 1) seoScore += 10;
  else if (h1Count > 1) seoScore += 5;
  if (robotsIsPlain) seoScore += 5;
  if (sitemapPresent) seoScore += 8;
  if (imageAltCoveragePct >= 80) seoScore += 4;
  else if (imageAltCoveragePct >= 50) seoScore += 2;
  if (ogTitle && ogImage) seoScore += 3;
  if (isNoindex) seoScore = Math.min(seoScore, 30);
  seoScore = Math.max(0, Math.min(100, Math.round(seoScore)));

  // 2. GEO / AEO, llms.txt & Agentic Discovery Score (0-100)
  const allowedAiBots = aiCrawlers.filter((b) => b.status === "allowed").length;
  const hasClearNap =
    (schemaAnalysis.fields.telephone && schemaAnalysis.fields.address) ||
    (phoneSet.size > 0 && cityZoneHits >= 2);
  let geoAeoScore = 0;
  if (llmsTxt.followsLlmsSpec) geoAeoScore += 28;
  else if (llmsTxt.validPlaintext) geoAeoScore += 16;
  if (llmsFullTxt.validPlaintext) geoAeoScore += 10;
  geoAeoScore += allowedAiBots * 4; // up to +24
  if (hasClearNap) geoAeoScore += 12;
  if (schemaAnalysis.fields.sameAs) geoAeoScore += 8;
  if (schemaAnalysis.fields.areaServed || schemaAnalysis.fields.speakable) {
    geoAeoScore += 8;
  }
  if (questionHeadings.length >= 2) geoAeoScore += 6;
  else if (questionHeadings.length === 1) geoAeoScore += 3;
  if (visibleWordCount >= 350) geoAeoScore += 4;
  if (ardManifest.status === "valid") geoAeoScore += 8;
  else if (
    ardManifest.status === "invalid_html_soft404" ||
    ardManifest.status === "invalid_schema"
  ) {
    geoAeoScore -= 10;
  }
  geoAeoScore = Math.max(0, Math.min(100, Math.round(geoAeoScore)));

  // 3. Schema / JSON-LD Score (0-100)
  let schemaScore = 0;
  if (schemaAnalysis.validBlocks > 0) {
    schemaScore += 24;
    if (schemaAnalysis.malformedBlocks === 0) schemaScore += 8;
    if (schemaAnalysis.localBusinessTypes.length > 0) schemaScore += 20;
    else if (schemaAnalysis.detectedTypes.some((t) => /organization/i.test(t))) {
      schemaScore += 12;
    }
    if (schemaAnalysis.fields.name) schemaScore += 6;
    if (schemaAnalysis.fields.telephone) schemaScore += 9;
    if (schemaAnalysis.fields.address) schemaScore += 9;
    if (schemaAnalysis.fields.geo) schemaScore += 8;
    if (schemaAnalysis.fields.areaServed) schemaScore += 8;
    if (
      schemaAnalysis.fields.openingHoursSpecification ||
      schemaAnalysis.fields.aggregateRating ||
      schemaAnalysis.fields.sameAs
    ) {
      schemaScore += 8;
    }
  }
  if (schemaAnalysis.malformedBlocks > 0) schemaScore -= 12;
  schemaScore = Math.max(0, Math.min(100, Math.round(schemaScore)));

  // 4. Local Map Pack & Keyword Signal Score (0-100)
  let localSignalsScore = 0;
  if (cityMatchTerms.length > 0 && serviceMatchTerms.length > 0) {
    localSignalsScore += Math.min(42, cityZoneHits * 7);
    localSignalsScore += Math.min(36, serviceZoneHits * 6);
  } else if (cityMatchTerms.length > 0) {
    localSignalsScore += Math.min(72, cityZoneHits * 12);
  } else {
    localSignalsScore += 50;
  }
  if (localHubLinkSet.size >= 3) localSignalsScore += 14;
  else if (localHubLinkSet.size >= 1) localSignalsScore += 8;
  if (schemaAnalysis.fields.geo || schemaAnalysis.fields.areaServed) {
    localSignalsScore += 8;
  }
  localSignalsScore = Math.max(0, Math.min(100, Math.round(localSignalsScore)));

  // 5. Conversion & Lead-Leak Score (0-100)
  let conversionScore = 0;
  if (phoneSet.size > 0) conversionScore += 30;
  if (hasSmsLink) conversionScore += 12;
  if (formCount > 0 || quoteLinkSet.size > 0) conversionScore += 28;
  if (mainFetch.ttfbMs <= 800) conversionScore += 10;
  else if (mainFetch.ttfbMs <= 1600) conversionScore += 5;
  if (hasGa4OrGtm) conversionScore += 10;
  if (hasMetaPixel) conversionScore += 10;
  conversionScore = Math.max(0, Math.min(100, Math.round(conversionScore)));

  const overallStage1 = Math.round(
    seoScore * 0.24 +
      geoAeoScore * 0.2 +
      schemaScore * 0.18 +
      localSignalsScore * 0.18 +
      conversionScore * 0.2
  );

  // =========================================================================
  // PRIORITIZED PLAIN-ENGLISH ACTION ITEMS (CRITICAL / WARNING / PASSED)
  // =========================================================================
  const issues: ScannerIssue[] = [];

  if (isNoindex) {
    issues.push({
      id: "noindex-active",
      pillar: "seo",
      severity: "critical",
      title: "Page Is Blocked From Google Search (noindex)",
      detail: `Detected "${robotsMeta}" preventing search engines from indexing this page.`,
      businessImpact:
        "Your website is invisible on Google Search until the noindex directive is removed.",
    });
  }

  if (!isHttps) {
    issues.push({
      id: "missing-https",
      pillar: "seo",
      severity: "critical",
      title: "Insecure HTTP Connection (No Active SSL)",
      detail: `Final URL resolved over plain HTTP (${mainFetch.finalUrl}).`,
      businessImpact:
        "Mobile browsers show a 'Not Secure' warning that scares off callers and suppresses Google rankings.",
    });
  }

  if (!llmsTxt.validPlaintext) {
    issues.push({
      id: "missing-llms-txt",
      pillar: "geoAeo",
      severity: "critical",
      title: llmsTxt.isSoft404Html
        ? "/llms.txt Returns an HTML Soft-404 Instead of AI Markdown"
        : "Missing /llms.txt AI Search & Entity Directory",
      detail: llmsTxt.isSoft404Html
        ? `${finalOrigin}/llms.txt returned HTML markup instead of a clean Markdown index.`
        : `${finalOrigin}/llms.txt returned HTTP ${llmsTxt.httpStatus ?? "error"}.`,
      businessImpact:
        "Fails Google Lighthouse 13.6's Agentic Browsing (llms-txt) audit and leaves ChatGPT, Gemini, Perplexity, and Claude without a verified summary of your services, locations, and contact info.",
    });
  } else if (!llmsTxt.followsLlmsSpec) {
    issues.push({
      id: "llms-txt-no-links",
      pillar: "geoAeo",
      severity: "warning",
      title: "/llms.txt Lacks Markdown [Title](https://...) Links (Fails Google Agentic Browsing)",
      detail: `${finalOrigin}/llms.txt is live plaintext (${llmsTxt.wordCount.toLocaleString()} words), but contains 0 Markdown [Label](https://...) links — Google Lighthouse 13.6's Agentic Browsing (llms-txt) audit fails with "File does not appear to contain any links."`,
      businessImpact:
        "Adding Markdown links to your core service, city, and booking URLs passes Google's Agentic Browsing audit and lets AI agents navigate directly to conversion pages.",
    });
  } else {
    issues.push({
      id: "passed-llms-txt",
      pillar: "geoAeo",
      severity: "passed",
      title: "Verified /llms.txt AI Visibility Index Live",
      detail: `Found spec-compliant Markdown index (${llmsTxt.wordCount.toLocaleString()} words, ${llmsTxt.headingCount} sections, ${llmsTxt.markdownLinkCount} Markdown link${
        llmsTxt.markdownLinkCount === 1 ? "" : "s"
      })${
        llmsFullTxt.validPlaintext
          ? ` plus /llms-full.txt (${llmsFullTxt.wordCount.toLocaleString()} words).`
          : "."
      }`,
      businessImpact:
        "Passes Google Agentic Browsing's llms-txt check and feeds verified services, locations, and phone numbers to AI answer engines.",
    });
  }

  if (ardManifest.status === "invalid_html_soft404") {
    issues.push({
      id: "ard-manifest-html-soft404",
      pillar: "geoAeo",
      severity: "critical",
      title: "Broken /.well-known/ard.json (SPA HTML Soft-200 Breaks Google Agentic Browsing)",
      detail: `${finalOrigin}/.well-known/ard.json returned HTTP 200 with HTML markup instead of ARD JSON — causing Google Lighthouse's ard-schema audit to score 0 instead of notApplicable.`,
      businessImpact:
        "Catch-all SPA rewrites on /.well-known/ard.json actively drag down your Google Agentic Browsing score; serve a valid ARD 1.0 JSON manifest or return a clean HTTP 404.",
    });
  } else if (ardManifest.status === "invalid_schema") {
    issues.push({
      id: "ard-manifest-invalid-schema",
      pillar: "geoAeo",
      severity: "critical",
      title: "Invalid /.well-known/ard.json Schema (Fails Google Agentic Browsing)",
      detail:
        ardManifest.errorDetail ||
        `${finalOrigin}/.well-known/ard.json is missing valid ARD 1.0 entries or urn:air: identifiers.`,
      businessImpact:
        "Malformed ARD manifests fail Google Lighthouse 13.6's ard-schema check and block AI agents from discovering your official tools and endpoints.",
    });
  } else if (ardManifest.status === "valid") {
    issues.push({
      id: "passed-ard-manifest",
      pillar: "geoAeo",
      severity: "passed",
      title: "Verified /.well-known/ard.json Agentic Resource Discovery Manifest",
      detail: `ARD v${ardManifest.specVersion || "1.0"} manifest verified with ${ardManifest.entryCount} urn:air: resource ${
        ardManifest.entryCount === 1 ? "entry" : "entries"
      } — unlocks 4/4 in Google Lighthouse Agentic Browsing.`,
      businessImpact:
        "Autonomous AI browsers and Google Agentic Browsing can discover your calculators, scanners, and entity docs directly.",
    });
  }

  const blockedBots = aiCrawlers.filter((b) => b.status === "blocked");
  if (blockedBots.length > 0) {
    issues.push({
      id: "blocked-ai-crawlers",
      pillar: "geoAeo",
      severity: "critical",
      title: `robots.txt Blocks ${blockedBots.length} Major AI Search Crawler(s)`,
      detail: `Blocked bots: ${blockedBots.map((b) => b.bot).join(", ")}.`,
      businessImpact:
        "When local buyers ask ChatGPT, Perplexity, or Gemini who to hire in your city, blocked sites are excluded from AI recommendations.",
    });
  } else {
    issues.push({
      id: "passed-ai-crawlers",
      pillar: "geoAeo",
      severity: "passed",
      title: "All 6 AI Search Crawlers Permitted in robots.txt",
      detail:
        "GPTBot, OAI-SearchBot, Google-Extended, PerplexityBot, ClaudeBot & Applebot-Extended are allowed.",
      businessImpact:
        "Your domain is open for AI Overviews and conversational local recommendations.",
    });
  }

  if (schemaAnalysis.validBlocks === 0) {
    issues.push({
      id: "missing-json-ld",
      pillar: "schema",
      severity: "critical",
      title: "Zero Valid Schema.org JSON-LD Markup Found",
      detail: "No <script type=\"application/ld+json\"> blocks were detected on the page.",
      businessImpact:
        "Google Maps and AI engines have to guess your business category, phone number, coordinates, and service radius.",
    });
  } else if (
    schemaAnalysis.localBusinessTypes.length === 0 &&
    !schemaAnalysis.fields.geo
  ) {
    issues.push({
      id: "weak-local-schema",
      pillar: "schema",
      severity: "warning",
      title: "JSON-LD Missing Specific LocalBusiness Subtype & Geo Coordinates",
      detail: `Detected [${schemaAnalysis.detectedTypes.join(", ")}], but missing LocalBusiness/trade subtype or exact lat/lng geo coordinates.`,
      businessImpact:
        "Adding explicit trade schema (e.g., RoofingContractor, HVACBusiness, Restaurant) + geo coordinates strengthens Google 3-Pack entity matching.",
    });
  } else {
    issues.push({
      id: "passed-schema",
      pillar: "schema",
      severity: "passed",
      title: `Valid Structured Schema (${schemaAnalysis.validBlocks} JSON-LD Block${
        schemaAnalysis.validBlocks === 1 ? "" : "s"
      })`,
      detail: `Entities verified: ${schemaAnalysis.detectedTypes.slice(0, 6).join(", ")}.`,
      businessImpact:
        "Machine-readable entity signals reinforce Google Map Pack and AI citation trust.",
    });
  }

  if (phoneSet.size === 0) {
    issues.push({
      id: "missing-tel-link",
      pillar: "conversion",
      severity: "critical",
      title: hasUnlinkedPhoneInText
        ? "Phone Number Is Plain Text (Not Tap-to-Call on Mobile)"
        : "No Clickable Tap-to-Call (tel:) Button Detected",
      detail: hasUnlinkedPhoneInText
        ? "Found a phone number in page text, but zero <a href=\"tel:...\"> links."
        : "Zero <a href=\"tel:...\"> links were found anywhere on this page.",
      businessImpact:
        "Over 75% of local emergency & home-service searches happen on phones—forcing buyers to copy-paste your number leaks immediate calls.",
    });
  } else {
    issues.push({
      id: "passed-tel-link",
      pillar: "conversion",
      severity: "passed",
      title: "1-Tap Mobile Call Trigger Active",
      detail: `Verified clickable tel: link (${Array.from(phoneSet).slice(0, 2).join(", ")}).`,
      businessImpact: "Mobile visitors can dial your team with a single thumb tap.",
    });
  }

  if (formCount === 0 && quoteLinkSet.size === 0) {
    issues.push({
      id: "missing-quote-flow",
      pillar: "conversion",
      severity: "warning",
      title: "No Instant Quote Form, Calculator, or Booking Flow Found",
      detail: "Detected 0 <form> elements and 0 quote/estimate/booking CTAs on this page.",
      businessImpact:
        "After-hours buyers who aren't ready to call bounce to a competitor with an instant estimate or booking form.",
    });
  }

  if (!hasSmsLink) {
    issues.push({
      id: "missing-sms-link",
      pillar: "conversion",
      severity: "warning",
      title: "No 1-Tap Text Message (sms:) Option for Mobile Buyers",
      detail: "Zero <a href=\"sms:...\"> links found.",
      businessImpact:
        "Adding a thumb-zone 'Text Us' button captures homeowners at work who can text a quick question before calling.",
    });
  }

  if (!title || title.length < 25 || title.length > 70) {
    issues.push({
      id: "title-optimization",
      pillar: "seo",
      severity: !title ? "critical" : "warning",
      title: !title
        ? "Missing HTML <title> Tag"
        : `<title> Length (${title.length} chars) Outside 30–65 Optimal Window`,
      detail: title ? `Current title: "${title}"` : "No <title> element found.",
      businessImpact:
        "Your <title> tag is the single strongest on-page Google ranking headline and controls click-through rate.",
    });
  }

  if (!metaDescription) {
    issues.push({
      id: "missing-meta-desc",
      pillar: "seo",
      severity: "warning",
      title: "Missing <meta name=\"description\"> Snippet",
      detail: "Google has to auto-scrape random page sentences for your search snippet.",
      businessImpact:
        "A persuasive 120–160 char meta description with your city, proof, and phone number lifts organic clicks.",
    });
  }

  if (h1Count === 0 || h1Count > 1) {
    issues.push({
      id: "h1-structure",
      pillar: "seo",
      severity: h1Count === 0 ? "critical" : "warning",
      title:
        h1Count === 0
          ? "Missing Primary <h1> Headline"
          : `Multiple <h1> Tags Detected (${h1Count} found)`,
      detail:
        h1Count === 0
          ? "Zero <h1> headings exist on this page."
          : `First <h1>: "${firstH1.slice(0, 90)}" — consolidate to 1 clear primary <h1>.`,
      businessImpact:
        "A single clear <h1> stating what you do and where you serve anchors topical authority.",
    });
  }

  if (!sitemapPresent) {
    issues.push({
      id: "missing-sitemap",
      pillar: "seo",
      severity: "warning",
      title: "No Valid XML Sitemap Found (/sitemap.xml)",
      detail: `Checked ${sitemapCheckedUrl} (HTTP ${sitemapFetch.status ?? "unreachable"}).`,
      businessImpact:
        "Without a clean XML sitemap, new service pages and neighborhood job proof take weeks longer for Google to discover.",
    });
  } else {
    issues.push({
      id: "passed-sitemap",
      pillar: "seo",
      severity: "passed",
      title: `Live XML Sitemap Verified (${sitemapLocMatches.length} ${
        isSitemapIndex ? "child sitemaps" : "URLs"
      })`,
      detail: `${sitemapCheckedUrl} returned valid XML.`,
      businessImpact: "Google and Bing can crawl and index your pages cleanly.",
    });
  }

  if (cityMatchTerms.length > 0 && cityZoneHits < 3) {
    issues.push({
      id: "weak-city-signals",
      pillar: "localSignals",
      severity: cityZoneHits === 0 ? "critical" : "warning",
      title: `Weak "${normalizedCityCore}" Local Signal Alignment (${cityZoneHits}/6 Zones)`,
      detail: `"${normalizedCityCore}" appeared in only ${cityZoneHits} of 6 core ranking zones (<title>, <h1>, <h2>/<h3>, meta description, body copy, JSON-LD).`,
      businessImpact:
        `If Google doesn't see ${normalizedCityCore} reinforced across headings, schema, and dedicated city hubs (plus real GPS job proof), competitors in ${normalizedCityCore} win the Map Pack.`,
    });
  } else if (cityMatchTerms.length > 0) {
    issues.push({
      id: "passed-city-signals",
      pillar: "localSignals",
      severity: "passed",
      title: `Strong "${normalizedCityCore}" Local Signal Alignment (${cityZoneHits}/6 Zones)`,
      detail: `"${normalizedCityCore}" is reinforced across ${cityZoneHits} of 6 on-page & schema zones.`,
      businessImpact: `Clear geographic relevance signals for ${rawCityInput} searches.`,
    });
  }

  if (!hasGa4OrGtm || !hasMetaPixel) {
    const missingList = [
      !hasGa4OrGtm ? "GA4 / Google Tag" : "",
      !hasMetaPixel ? "Meta Pixel" : "",
    ].filter(Boolean);
    issues.push({
      id: "missing-analytics-pixels",
      pillar: "conversion",
      severity: "warning",
      title: `Missing Attribution Tracking (${missingList.join(" & ")})`,
      detail: `Not detected in page HTML: ${missingList.join(", ")}.`,
      businessImpact:
        "Without conversion tracking, you can't see which cities, ads, or Google searches produce real phone calls.",
    });
  }

  // Sort issues: critical first, then warning, then passed
  const severityOrder: Record<ScannerIssue["severity"], number> = {
    critical: 0,
    warning: 1,
    passed: 2,
  };
  issues.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  const seoSummary: TechnicalSeoSummary = {
    title,
    titleLength: title.length,
    titleOptimal: title.length >= 30 && title.length <= 65,
    metaDescription,
    metaDescriptionLength: metaDescription.length,
    metaDescriptionOptimal:
      metaDescription.length >= 70 && metaDescription.length <= 165,
    canonicalUrl,
    robotsMeta,
    isNoindex,
    hasViewport,
    ogTitle,
    ogDescription,
    ogImage,
    h1Count,
    firstH1,
    h2Count,
    visibleWordCount,
    totalImages,
    imagesWithAlt,
    imagesMissingAlt,
    imageAltCoveragePct,
    robotsTxt: {
      status: robotsFetch.status,
      present: robotsIsPlain,
      declaresSitemap: Boolean(parsedRobots && parsedRobots.sitemaps.length > 0),
    },
    sitemapXml: {
      checkedUrl: sitemapCheckedUrl,
      status: sitemapFetch.status,
      present: sitemapPresent,
      urlCount: sitemapLocMatches.length,
      isSitemapIndex,
    },
  };

  const localSignalsSummary: LocalSignalsSummary = {
    targetCityLabel: rawCityInput,
    targetCityNormalized: normalizedCityCore,
    targetServiceLabel: effectiveServiceLabel || "General Local Business",
    targetServiceNormalized: effectiveServiceLabel.toLowerCase(),
    serviceWasInferred: !rawServiceInput && Boolean(inferredService),
    zones,
    cityZoneHits,
    serviceZoneHits,
    localHubLinksCount: localHubLinkSet.size,
    sampleLocalHubLinks: Array.from(localHubLinkSet).slice(0, 6),
  };

  const conversionSummary: ConversionAuditSummary = {
    hasTelLink: phoneSet.size > 0,
    phoneNumbers: Array.from(phoneSet).slice(0, 4),
    hasUnlinkedPhoneInText,
    hasSmsLink,
    formCount,
    hasInteractiveQuoteOrBookingLink: quoteLinkSet.size > 0,
    quoteLinkExamples: Array.from(quoteLinkSet).slice(0, 4),
    hasGa4OrGtm,
    hasMetaPixel,
  };

  const payload: ScannerStage1Response = {
    ok: true,
    scannedAt: new Date().toISOString(),
    http: {
      requestedUrl: normalized.normalizedUrl,
      finalUrl: mainFetch.finalUrl,
      origin: finalOrigin,
      hostname: finalHostname,
      httpStatus: mainFetch.status,
      isHttps,
      httpRedirectsToHttps,
      httpProbeStatus: httpProbe.status,
      redirectHops: mainFetch.redirectChain.length,
      ttfbMs: mainFetch.ttfbMs,
      totalFetchMs: mainFetch.totalMs,
      hasHsts,
      hasXContentTypeOptions,
      compressionEncoding,
    },
    scores: {
      overallStage1,
      seoScore,
      geoAeoScore,
      schemaScore,
      localSignalsScore,
      conversionScore,
    },
    geoAeo: {
      llmsTxt,
      llmsFullTxt,
      ardManifest,
      aiCrawlers,
      questionHeadingCount: questionHeadings.length,
      sampleQuestionHeadings: questionHeadings.slice(0, 5),
      hasSpeakableSchema: schemaAnalysis.fields.speakable,
      hasSameAsLinks: schemaAnalysis.fields.sameAs,
      sameAsCount: schemaAnalysis.sameAsCount,
      hasAreaServed: schemaAnalysis.fields.areaServed,
      hasClearNap,
    },
    schema: {
      totalScriptBlocks: schemaAnalysis.totalScriptBlocks,
      validBlocks: schemaAnalysis.validBlocks,
      malformedBlocks: schemaAnalysis.malformedBlocks,
      detectedTypes: schemaAnalysis.detectedTypes,
      localBusinessTypes: schemaAnalysis.localBusinessTypes,
      fields: schemaAnalysis.fields,
      richResultWarnings: schemaAnalysis.richResultWarnings,
      jsonPreview: schemaAnalysis.jsonPreview,
    },
    seo: seoSummary,
    localSignals: localSignalsSummary,
    conversion: conversionSummary,
    crux,
    issues,
  };

  return NextResponse.json(payload);
}
