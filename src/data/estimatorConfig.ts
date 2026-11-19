/**
 * Power Digital Media LLC — Modular Growth & Scope Estimator Configuration
 *
 * Designed so new proprietary applications (e.g., PDM ClipCraft™ AI Reel Studio)
 * or regional service modules can be added in seconds without touching component logic.
 */

export type EstimatorIndustryId =
  | "trades_roofing_hvac"
  | "dirt_lawn_exterior"
  | "restaurant_catering"
  | "local_business_ministry";

export type EstimatorAddOnId = "pindrop" | "pincam" | "meta_ads_funnels";

export interface EstimatorIndustryConfig {
  id: EstimatorIndustryId;
  title: string;
  shortLabel: string;
  subtitle: string;
  avgTicketLabel: string;
  roiHeadline: string;
  roiDetail: string;
  recommendedAddOns: EstimatorAddOnId[];
}

export interface EstimatorCoreFeature {
  id: string;
  title: string;
  badge?: string;
  standaloneValueLabel?: string;
  description: string;
}

export interface EstimatorAddOnModule {
  id: EstimatorAddOnId;
  title: string;
  shortSmsLabel: string;
  badge: string;
  monthlyMin: number;
  monthlyMax: number;
  standaloneMonthlyValue: number;
  replacesNote: string;
  bullets: {
    heading: string;
    detail: string;
  }[];
}

export interface CustomScopeExtension {
  id: string;
  title: string;
  statusBadge: string;
  description: string;
}

export const ESTIMATOR_HOMETOWN_AREAS = [
  "Jackson",
  "Madison",
  "Flora",
  "Brandon",
  "Ridgeland",
  "Flowood",
  "Pearl",
  "Clinton",
  "Canton",
  "Byram",
  "Other MS Area",
] as const;

export type EstimatorHometownArea = (typeof ESTIMATOR_HOMETOWN_AREAS)[number];

export const ESTIMATOR_BUSINESS_TYPES: EstimatorIndustryConfig[] = [
  {
    id: "trades_roofing_hvac",
    title: "Roofing, HVAC & Home Trades",
    shortLabel: "Roofing / HVAC / Trade",
    subtitle: "Plumbing, Electrical, Storm & Mechanical Crews",
    avgTicketLabel: "$4,500 – $12,000+ avg ticket",
    roiHeadline: "1 closed job covers 6–12+ months of your entire system",
    roiDetail:
      "Built for crews who want exclusive homeowner calls from Google Maps + PinDrop™ neighborhood proof & PinCam™ inspection reports instead of shared marketplace leads.",
    recommendedAddOns: ["pindrop", "pincam"],
  },
  {
    id: "dirt_lawn_exterior",
    title: "Dirt Work, Land Clearing & Lawn/Exterior",
    shortLabel: "Dirt Work / Exterior",
    subtitle: "Excavation, Pads, Forestry Mulching, Turf & Fencing",
    avgTicketLabel: "$2,500 – $8,500+ avg project",
    roiHeadline: "1 closed project covers 4–10+ months of partnership",
    roiDetail:
      "Interactive acreage/footage quote calculators + GPS-verified PinDrop™ field pins across Hinds, Madison, Rankin, and Yazoo counties.",
    recommendedAddOns: ["pindrop"],
  },
  {
    id: "restaurant_catering",
    title: "Restaurant, Food Truck & Catering",
    shortLabel: "Restaurant / Catering",
    subtitle: "0%-Commission Square Ordering & Event Calculators",
    avgTicketLabel: "Saves 25–30% third-party app fees",
    roiHeadline: "0%-commission direct Square checkout pays for itself every month",
    roiDetail:
      "Customers order platters, boils, or catering right on your domain with native Square Web SDK checkout—keeping 100% of your ticket margin.",
    recommendedAddOns: ["meta_ads_funnels"],
  },
  {
    id: "local_business_ministry",
    title: "Local Business, Medical, Retail & Ministry",
    shortLabel: "Local Business / Organization",
    subtitle: "Clinics, Pharmacies, Storefronts & Faith Communities",
    avgTicketLabel: "Sub-second mobile UX + Local SEO",
    roiHeadline: "Replaces 4–5 disconnected software & agency bills with 1 partner",
    roiDetail:
      "Custom 0.8s Next.js website, Google Map Pack + AI answer engine citations (ChatGPT, Gemini, Perplexity), CRM automation, and 24/7 watchtower care.",
    recommendedAddOns: [],
  },
];

export const ONE_TIME_WEBSITE_BUILD_CONFIG = {
  min: 1000,
  max: 1500,
  typicalAgencyComparison: "$4,500 – $8,000+ typical agency builds",
  highlights: [
    "100% codebase & domain ownership upon completion",
    "Sub-second (0.8s) custom Next.js 16 mobile architecture — zero bloated WordPress plugins",
    "Built-in interactive quote calculator or 0%-fee Square ordering flow",
    "Mobile-first conversion UX engineered in Jackson, MS (launches in 7–14 business days)",
  ],
};

export const CORE_FOUNDATION_CONFIG = {
  title: "Core Growth & Watchtower Foundation",
  monthlyMin: 550,
  monthlyMax: 650,
  standaloneMonthlyValue: 1850,
  features: [
    {
      id: "site_intelligence",
      title: "PDM Site Intelligence™ 24/7 Watchtower",
      badge: "INCLUDED • $299/mo Value",
      description:
        "5-minute HTTP & SSL uptime probes, daily 25-page deep technical SEO crawl, live Google CrUX cellular speed monitoring, Search Console + GA4 reporting, & AI diagnostics.",
    },
    {
      id: "map_pack_geo_aeo",
      title: "Google Map Pack Optimization + GEO & AEO AI Search",
      description:
        "Ongoing local authority & structured entity markup engineered for Google Maps 3-Pack, ChatGPT, Gemini & Perplexity citations.",
    },
    {
      id: "capsule_transpond_crm",
      title: "Capsule CRM + Automated Transpond Lead Follow-Ups",
      description:
        "Every call click, quote calculator submission & web form wired straight into your deal pipeline with instant nurture sequences.",
    },
    {
      id: "site_manager_direct",
      title: "PDM Site Manager CMS + Direct (601) Founder Access",
      description:
        "Update menus, promos, photos, or 0%-fee Square items anytime—plus direct cell phone access to founder Damein Donald in Jackson, MS.",
    },
  ] satisfies EstimatorCoreFeature[],
};

export const FIELD_SUITE_BUNDLE_DISCOUNT_MONTHLY = 50;

export const ESTIMATOR_ADDON_MODULES: EstimatorAddOnModule[] = [
  {
    id: "pindrop",
    title: "PDM PinDrop™ GPS Neighborhood SEO & GBP Auto-Post Engine",
    shortSmsLabel: "PDM PinDrop",
    badge: "+$400 – $500 / mo",
    monthlyMin: 400,
    monthlyMax: 500,
    standaloneMonthlyValue: 450,
    replacesNote: "Standalone competitor value ~$450/mo (replaces NiceJob + manual GBP agencies)",
    bullets: [
      {
        heading: "10-Second Crew Check-Ins -> Live Website Map & Google Authority",
        detail:
          "Crews snap a photo and check in from the truck—auto-publishing GPS-verified neighborhood project pages, live map pins, Google Business Profile updates, and 15-minute homeowner 5-star review texts.",
      },
    ],
  },
  {
    id: "pincam",
    title: "PinCam™ Unlimited-Crew Field Camera, Ghost Match & 9:16 Reel App",
    shortSmsLabel: "PinCam",
    badge: "+$350 – $450 / mo",
    monthlyMin: 350,
    monthlyMax: 450,
    standaloneMonthlyValue: 550,
    replacesNote: "$0 per-tech seat fees • Standalone per-seat value ~$550/mo vs CompanyCam Pro/Elite",
    bullets: [
      {
        heading: "Native Android + iOS Jobsite Camera Studio ($0 Per-Tech Seat Tax)",
        detail:
          "Ghost Photo Match 1:1 before/after alignment, non-destructive contractor measurements & damage markups, Dual-Cam PiP walkthroughs, homeowner e-signature PDF reports, & on-device 9:16 jobsite reel builder.",
      },
    ],
  },
  {
    id: "meta_ads_funnels",
    title: "Done-For-You Facebook / Meta Ads & Video Funnels",
    shortSmsLabel: "Meta Ads & Video",
    badge: "+$500 – $600 / mo",
    monthlyMin: 500,
    monthlyMax: 600,
    standaloneMonthlyValue: 1250,
    replacesNote: "0% agency markup on ad spend • Standalone agency value ~$1,250/mo",
    bullets: [
      {
        heading: "Full Facebook & Instagram Lead Funnel Management",
        detail:
          "Scroll-stopping vertical video ad creative, hyper-local radius targeting, Meta Pixel + Server-Side CAPI deduplicated conversion tracking, and direct Capsule CRM lead sync (ad budget paid 100% direct to Meta).",
      },
    ],
  },
];

export const CUSTOM_SCOPE_EXTENSIONS: CustomScopeExtension[] = [
  {
    id: "pdm_clipcraft",
    title: "PDM ClipCraft™ AI Reel & Commercial Video Studio",
    statusBadge: "Custom Scope Add-On",
    description:
      "4K commercial video ads, kinetic Reels/Shorts production, and custom studio scoring tailored 1-on-1 for launches and seasonal campaigns.",
  },
];

export interface EstimatorTotals {
  needsNewWebsite: boolean;
  oneTimeMin: number;
  oneTimeMax: number;
  oneTimeRangeLabel: string;
  monthlyMin: number;
  monthlyMax: number;
  monthlyMidpoint: number;
  monthlyRangeLabel: string;
  standaloneMonthlyValue: number;
  standaloneValueLabel: string;
  fieldSuiteBundleApplied: boolean;
  bundleDiscountAmount: number;
  selectedModulesList: string[];
  smsShortStackLabel: string;
}

export function calculateEstimatorTotals(params: {
  needsNewWebsite: boolean;
  selectedAddOns: EstimatorAddOnId[];
}): EstimatorTotals {
  const oneTimeMin = params.needsNewWebsite ? ONE_TIME_WEBSITE_BUILD_CONFIG.min : 0;
  const oneTimeMax = params.needsNewWebsite ? ONE_TIME_WEBSITE_BUILD_CONFIG.max : 0;
  const oneTimeRangeLabel = params.needsNewWebsite
    ? `$${oneTimeMin.toLocaleString()} – $${oneTimeMax.toLocaleString()}`
    : "$0 (Existing PDM Site)";

  let monthlyMin = CORE_FOUNDATION_CONFIG.monthlyMin;
  let monthlyMax = CORE_FOUNDATION_CONFIG.monthlyMax;
  let standaloneMonthlyValue = CORE_FOUNDATION_CONFIG.standaloneMonthlyValue;

  const activeAddOns = ESTIMATOR_ADDON_MODULES.filter((m) =>
    params.selectedAddOns.includes(m.id)
  );

  for (const mod of activeAddOns) {
    monthlyMin += mod.monthlyMin;
    monthlyMax += mod.monthlyMax;
    standaloneMonthlyValue += mod.standaloneMonthlyValue;
  }

  // Full Field Suite Bundle Bonus: -$50/mo when BOTH PinDrop™ AND PinCam™ are toggled on ($1,250 – $1,550/mo)
  const fieldSuiteBundleApplied =
    params.selectedAddOns.includes("pindrop") &&
    params.selectedAddOns.includes("pincam");
  const bundleDiscountAmount = fieldSuiteBundleApplied
    ? FIELD_SUITE_BUNDLE_DISCOUNT_MONTHLY
    : 0;

  if (fieldSuiteBundleApplied) {
    monthlyMin -= bundleDiscountAmount;
    monthlyMax -= bundleDiscountAmount;
  }

  const monthlyMidpoint = Math.round((monthlyMin + monthlyMax) / 2);
  const monthlyRangeLabel = `$${monthlyMin.toLocaleString()} – $${monthlyMax.toLocaleString()}/mo`;
  const standaloneValueLabel = `~$${standaloneMonthlyValue.toLocaleString()}/mo`;

  const selectedModulesList = [
    CORE_FOUNDATION_CONFIG.title,
    ...activeAddOns.map((m) => m.title),
  ];

  const smsShortStackLabel = [
    params.needsNewWebsite ? "0.8s Website" : "Existing Site",
    "Core SEO/CRM/Watchtower",
    ...activeAddOns.map((m) => m.shortSmsLabel),
  ].join(" + ");

  return {
    needsNewWebsite: params.needsNewWebsite,
    oneTimeMin,
    oneTimeMax,
    oneTimeRangeLabel,
    monthlyMin,
    monthlyMax,
    monthlyMidpoint,
    monthlyRangeLabel,
    standaloneMonthlyValue,
    standaloneValueLabel,
    fieldSuiteBundleApplied,
    bundleDiscountAmount,
    selectedModulesList,
    smsShortStackLabel,
  };
}
