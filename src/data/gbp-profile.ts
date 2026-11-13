/**
 * Canonical Google Business Profile (GBP) Source of Truth
 * Power Digital Media LLC — Jackson, Mississippi
 *
 * Keep this file 100% synchronized with `src/app/layout.tsx` JSON-LD,
 * `src/data/locations.ts`, and our 100% Case-by-Case Custom Scoping policy
 * (zero public dollar figures, zero retired podcast/showroom/gear offerings).
 *
 * Google GBP Description Policy:
 * - Maximum 750 characters
 * - No URLs, email addresses, or phone numbers allowed inside `description`
 *   (Google rejects descriptions containing links or phone numbers)
 */

export interface GbpServiceDefinition {
  categoryId: string;
  displayName: string;
  description: string;
}

export const PDM_CANONICAL_GBP_PROFILE = {
  businessName: "Power Digital Media LLC",
  primaryPhone: "(601) 446-2393",
  e164Phone: "+16014462393",
  websiteUri:
    "https://powerdigitalmedia.org/?utm_source=google&utm_medium=organic&utm_campaign=gbp_listing",
  appointmentUri:
    "https://powerdigitalmedia.org/book?utm_source=google&utm_medium=organic&utm_campaign=gbp_appointment",
  auditUri:
    "https://powerdigitalmedia.org/free-audit?utm_source=google&utm_medium=organic&utm_campaign=gbp_post",

  /**
   * CRITICAL GBP COMPLIANCE LOCK (Home-Based Studio):
   * Keep `businessType` strictly set to `"CUSTOMER_LOCATION_ONLY"` ("Show business address to customers" = OFF).
   * Never push `storefrontAddress` publicly to GBP unless Power Digital Media moves into a
   * staffed commercial office with permanent exterior street signage.
   */
  businessType: "CUSTOMER_LOCATION_ONLY" as const,

  privateVerificationAddressNote:
    "2914 Cynthia Rd, Jackson, MS 39209 (Entered privately in GBP verification settings ONLY — hidden from public Maps)",

  primaryCategory: {
    name: "categories/gcid:website_designer",
    displayName: "Website designer",
  },

  additionalCategories: [
    {
      name: "categories/gcid:internet_marketing_service",
      displayName: "Internet marketing service",
    },
    {
      name: "categories/gcid:marketing_agency",
      displayName: "Marketing agency",
    },
    {
      name: "categories/gcid:software_company",
      displayName: "Software company",
    },
    {
      name: "categories/gcid:business_to_business_service",
      displayName: "Business to business service",
    },
  ],

  /**
   * 676 characters — safely under Google's 750-character hard limit,
   * zero URLs/phones inside body text per Google GBP guidelines.
   */
  description:
    "Power Digital Media LLC engineers high-converting custom Next.js websites, Google Map Pack SEO systems, and proprietary contractor software in Jackson, Mississippi. Founded by Damein Donald and BBB Accredited (A Rating), we help roofing, HVAC, excavation, plumbing, electrical, and standout local businesses rank in the Google Top 3 and turn mobile searches into booked jobs. Our in-house platforms include PinCam jobsite camera & inspection reporting, PDM PinDrop GPS neighborhood SEO & automated 5-star SMS review software, PDM Site Intelligence 24/7 website monitoring, Capsule CRM pipelines, automated SMS lead rescue, and 0%-commission Square online ordering across Central Mississippi.",

  regularHours: {
    periods: [
      { openDay: "MONDAY", openTime: { hours: 9, minutes: 0 }, closeDay: "MONDAY", closeTime: { hours: 17, minutes: 0 } },
      { openDay: "TUESDAY", openTime: { hours: 9, minutes: 0 }, closeDay: "TUESDAY", closeTime: { hours: 17, minutes: 0 } },
      { openDay: "WEDNESDAY", openTime: { hours: 9, minutes: 0 }, closeDay: "WEDNESDAY", closeTime: { hours: 17, minutes: 0 } },
      { openDay: "THURSDAY", openTime: { hours: 9, minutes: 0 }, closeDay: "THURSDAY", closeTime: { hours: 17, minutes: 0 } },
      { openDay: "FRIDAY", openTime: { hours: 9, minutes: 0 }, closeDay: "FRIDAY", closeTime: { hours: 17, minutes: 0 } },
    ],
  },

  serviceAreaPlaces: [
    "Jackson, MS, USA",
    "Madison, MS, USA",
    "Ridgeland, MS, USA",
    "Brandon, MS, USA",
    "Flowood, MS, USA",
    "Clinton, MS, USA",
    "Pearl, MS, USA",
    "Byram, MS, USA",
    "Hinds County, MS, USA",
    "Madison County, MS, USA",
    "Rankin County, MS, USA",
  ],

  services: [
    {
      categoryId: "categories/gcid:website_designer",
      displayName: "Contractor Growth Websites & Lead Rescue",
      description:
        "Custom sub-2-second mobile websites engineered for roofers, HVAC pros, excavators, plumbers, electricians, and service trades—paired with instant missed-call and quote SMS follow-up.",
    },
    {
      categoryId: "categories/gcid:website_designer",
      displayName: "Custom Next.js Website Design & Engineering",
      description:
        "Hand-coded Next.js websites with zero bloated WordPress plugins, 98+ mobile PageSpeed performance, custom conversion architecture, and 100% codebase ownership.",
    },
    {
      categoryId: "categories/gcid:internet_marketing_service",
      displayName: "Local SEO & Google Map Pack Ranking",
      description:
        "Google Business Profile optimization, city and subdivision landing pages, LocalBusiness JSON-LD schema, and 5-star review velocity across Jackson, Madison, Ridgeland, Brandon, Flowood, and Clinton.",
    },
    {
      categoryId: "categories/gcid:software_company",
      displayName: "PDM PinDrop™ Neighborhood SEO & Review Software",
      description:
        "30-second mobile crew check-ins that publish GPS-verified neighborhood project pages, live website job maps, Google updates, and automated homeowner 5-star SMS review requests.",
    },
    {
      categoryId: "categories/gcid:software_company",
      displayName: "PinCam™ Contractor Field Camera & Inspection Reports",
      description:
        "iOS and Android field camera featuring Ghost Photo Match 1:1 before/after alignment, non-destructive damage markups, Dual-Cam walkthroughs, and branded homeowner/adjuster PDF reports.",
    },
    {
      categoryId: "categories/gcid:software_company",
      displayName: "PDM Site Intelligence™ 24/7 Website & SEO Watchtower",
      description:
        "Proactive 5-minute uptime and SSL monitoring, broken-link crawls, Chrome UX cellular speed telemetry, Google Search Console growth tracking, and staged human-verified updates.",
    },
    {
      categoryId: "categories/gcid:business_to_business_service",
      displayName: "CRM Automation & Zero-Commission Online Ordering",
      description:
        "Direct Capsule CRM pipelines, Transpond email/SMS follow-up automation, and native Square Web SDK online ordering and catering calculators with zero third-party commission fees.",
    },
  ] satisfies GbpServiceDefinition[],
} as const;
