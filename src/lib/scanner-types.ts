export type ScannerSeverity = "critical" | "warning" | "passed";

export type ScannerPillarKey =
  | "seo"
  | "geoAeo"
  | "schema"
  | "localSignals"
  | "conversion"
  | "speed";

export interface ScannerIssue {
  id: string;
  pillar: ScannerPillarKey;
  severity: ScannerSeverity;
  title: string;
  detail: string;
  businessImpact: string;
}

export interface AiCrawlerRuleStatus {
  bot: string;
  platform: string;
  status: "allowed" | "blocked";
  matchedGroup: string;
}

export interface LlmsFileCheck {
  url: string;
  httpStatus: number | null;
  validPlaintext: boolean;
  isSoft404Html: boolean;
  byteLength: number;
  wordCount: number;
  headingCount: number;
  previewSnippet: string;
}

export interface SchemaAuditSummary {
  totalScriptBlocks: number;
  validBlocks: number;
  malformedBlocks: number;
  detectedTypes: string[];
  localBusinessTypes: string[];
  fields: {
    name: boolean;
    telephone: boolean;
    address: boolean;
    geo: boolean;
    areaServed: boolean;
    aggregateRating: boolean;
    openingHoursSpecification: boolean;
    image: boolean;
    sameAs: boolean;
    speakable: boolean;
  };
  richResultWarnings: string[];
  jsonPreview: string;
}

export interface TechnicalSeoSummary {
  title: string;
  titleLength: number;
  titleOptimal: boolean;
  metaDescription: string;
  metaDescriptionLength: number;
  metaDescriptionOptimal: boolean;
  canonicalUrl: string;
  robotsMeta: string;
  isNoindex: boolean;
  hasViewport: boolean;
  ogTitle: boolean;
  ogDescription: boolean;
  ogImage: boolean;
  h1Count: number;
  firstH1: string;
  h2Count: number;
  visibleWordCount: number;
  totalImages: number;
  imagesWithAlt: number;
  imagesMissingAlt: number;
  imageAltCoveragePct: number;
  robotsTxt: {
    status: number | null;
    present: boolean;
    declaresSitemap: boolean;
  };
  sitemapXml: {
    checkedUrl: string;
    status: number | null;
    present: boolean;
    urlCount: number;
    isSitemapIndex: boolean;
  };
}

export interface LocalSignalZoneCheck {
  zone: string;
  cityMatched: boolean | null;
  serviceMatched: boolean | null;
  snippet: string;
}

export interface LocalSignalsSummary {
  targetCityLabel: string;
  targetCityNormalized: string;
  targetServiceLabel: string;
  targetServiceNormalized: string;
  serviceWasInferred: boolean;
  zones: LocalSignalZoneCheck[];
  cityZoneHits: number;
  serviceZoneHits: number;
  localHubLinksCount: number;
  sampleLocalHubLinks: string[];
}

export interface ConversionAuditSummary {
  hasTelLink: boolean;
  phoneNumbers: string[];
  hasUnlinkedPhoneInText: boolean;
  hasSmsLink: boolean;
  formCount: number;
  hasInteractiveQuoteOrBookingLink: boolean;
  quoteLinkExamples: string[];
  hasGa4OrGtm: boolean;
  hasMetaPixel: boolean;
}

export interface HttpSecuritySummary {
  requestedUrl: string;
  finalUrl: string;
  origin: string;
  hostname: string;
  httpStatus: number;
  isHttps: boolean;
  httpRedirectsToHttps: boolean;
  httpProbeStatus: number | null;
  redirectHops: number;
  ttfbMs: number;
  totalFetchMs: number;
  hasHsts: boolean;
  hasXContentTypeOptions: boolean;
  compressionEncoding: string;
}

export type CwvRating = "good" | "needs_improvement" | "poor";

export interface CruxSummary {
  status: "available" | "insufficient_traffic" | "not_configured" | "error";
  sourceLevel: "url" | "origin" | null;
  lcpMs: number | null;
  inpMs: number | null;
  cls: number | null;
  lcpRating: CwvRating | null;
  inpRating: CwvRating | null;
  clsRating: CwvRating | null;
}

export interface ScannerStage1Response {
  ok: true;
  scannedAt: string;
  http: HttpSecuritySummary;
  scores: {
    overallStage1: number;
    seoScore: number;
    geoAeoScore: number;
    schemaScore: number;
    localSignalsScore: number;
    conversionScore: number;
  };
  geoAeo: {
    llmsTxt: LlmsFileCheck;
    llmsFullTxt: LlmsFileCheck;
    aiCrawlers: AiCrawlerRuleStatus[];
    questionHeadingCount: number;
    sampleQuestionHeadings: string[];
    hasSpeakableSchema: boolean;
    hasSameAsLinks: boolean;
    sameAsCount: number;
    hasAreaServed: boolean;
    hasClearNap: boolean;
  };
  schema: SchemaAuditSummary;
  seo: TechnicalSeoSummary;
  localSignals: LocalSignalsSummary;
  conversion: ConversionAuditSummary;
  crux: CruxSummary;
  issues: ScannerIssue[];
}

export interface ScannerPageSpeedMobileMetrics {
  performanceScore: number;
  seoScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  lcpSeconds: number | null;
  fcpSeconds: number | null;
  tbtMs: number | null;
  cls: number | null;
  speedIndexSeconds: number | null;
  displayLcp: string;
  displayTbt: string;
  displayCls: string;
}

export interface ScannerPageSpeedResponse {
  ok: boolean;
  status: "completed" | "timeout_or_unreachable" | "quota_or_error";
  message?: string;
  mobile?: ScannerPageSpeedMobileMetrics;
}
