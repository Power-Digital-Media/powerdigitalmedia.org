/**
 * Canonical Automated Google Business Profile (GBP) Post Rotation
 * Power Digital Media LLC — Jackson, MS & Central Mississippi Tri-County Area
 *
 * Google GBP `localPosts` Compliance Rules Enforced Here:
 * - Zero phone numbers or raw URLs inside `summary` body text (prevents Google spam-filter rejection;
 *   every post attaches a clean structured `callToAction` button instead).
 * - Zero public dollar figures or retired offerings (100% case-by-case custom scoping).
 * - Paired with `1200x900` (4:3) `.jpg` visuals hosted at `https://powerdigitalmedia.org/gbp-posts/*`.
 */

export interface GbpAutoPostTemplate {
  id: string;
  title: string;
  /** Unique substring used to detect if this topic already exists in recent live GBP posts */
  signaturePhrase: string;
  summary: string;
  actionType: "LEARN_MORE" | "BOOK";
  actionUrl: string;
  mediaUrl: string;
}

export const PDM_GBP_AUTOPOST_ROTATION: GbpAutoPostTemplate[] = [
  {
    id: "contractor-websites-sms-rescue",
    title: "Mississippi Contractor Websites & Missed-Call SMS Rescue",
    signaturePhrase: "sub-2-second Next.js contractor websites",
    summary:
      "When a homeowner in Jackson, Madison, Ridgeland, or Brandon searches for a roofer, HVAC tech, excavator, or plumber on cellular data, slow template websites lose the call before the page even finishes loading. Power Digital Media LLC engineers custom sub-2-second Next.js contractor websites paired with instant missed-call SMS text-back so leads are rescued even while you are on a roof or job site. Request your free 5-minute Google Rank & Website Breakdown recorded personally by Damein Donald.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/contractors?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=contractor-websites-sms-rescue",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/contractor-websites.jpg",
  },
  {
    id: "pdm-pindrop-neighborhood-seo",
    title: "PDM PinDrop — 30-Second Jobsite Check-In to Map Pack SEO",
    signaturePhrase: "30-second mobile crew check-in",
    summary:
      "Most Central Mississippi contractors finish dozens of jobs across Madison, Flowood, Brandon, and Clinton every season—yet Google never sees that neighborhood proof. With PDM PinDrop, a 30-second mobile crew check-in automatically turns completed jobs into GPS-verified subdivision pages, live interactive website job maps, fresh Google Business Profile updates, and automated 5-star homeowner SMS review requests. Explore the live interactive PinDrop demo today.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/pindrop?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=pdm-pindrop-neighborhood-seo",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/pindrop-seo.jpg",
  },
  {
    id: "pincam-field-camera-proof",
    title: "PinCam — Ghost Photo Match & Branded Inspection PDFs",
    signaturePhrase: "Ghost Photo Match aligns your live camera lens",
    summary:
      "Stop digging through chaotic camera rolls to prove job quality to homeowners and insurance adjusters. PinCam is Power Digital Media's native contractor field camera built for roofing, restoration, HVAC, and exterior trades. Ghost Photo Match aligns your live camera lens 1:1 over the original before photo, pairs with non-destructive damage markups and Dual-Cam walkthroughs, and exports branded PDF inspection reports in seconds.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/pincam?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=pincam-field-camera-proof",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/pincam-camera.jpg",
  },
  {
    id: "pdm-site-intelligence-watchtower",
    title: "PDM Site Intelligence — 24/7 Website & SEO Watchtower",
    signaturePhrase: "Introducing PDM Site Intelligence",
    summary:
      "Introducing PDM Site Intelligence — our 24/7 website health, cellular speed, and Google Search Console watchtower engineered in Jackson, MS for contractors and standout local businesses. Every Power Digital Media build is monitored every 5 minutes for uptime, SSL health, broken links, Core Web Vitals, and local Map Pack ranking velocity—paired with PinCam and PDM PinDrop field apps to keep your crews booked. Request your free 5-minute Google Rank & Website Breakdown recorded personally by Damein Donald.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/site-intelligence?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=pdm-site-intelligence-watchtower",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/site-intelligence.jpg",
  },
  {
    id: "madison-ridgeland-map-pack-seo",
    title: "Madison & Ridgeland Google Map Pack Engineering",
    signaturePhrase: "Reunion, Annandale, Lake Caroline, and Bridgewater",
    summary:
      "Ranking in the Google Map Pack across Madison County takes more than a generic homepage. Power Digital Media LLC builds dedicated city and subdivision SEO architecture targeting high-intent homeowners across Madison, Ridgeland, Reunion, Annandale, Lake Caroline, and Bridgewater—backed by LocalBusiness JSON-LD schema and verified neighborhood project proof. See where your business currently ranks across Madison and Hinds County with a free breakdown.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/locations/madison-ms?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=madison-ridgeland-map-pack-seo",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/central-ms-map-pack.jpg",
  },
  {
    id: "born-again-roofing-case-study",
    title: "Client Spotlight: Born Again Home Remodeling & Roofing",
    signaturePhrase: "Born Again Home Remodeling & Roofing",
    summary:
      "Real Central Mississippi proof beats agency promises every time. See how Power Digital Media engineered a sub-2-second custom Next.js growth platform for Born Again Home Remodeling & Roofing—complete with interactive storm-damage inspection flows, live PDM PinDrop neighborhood job maps across the Tri-County metro, and direct mobile call routing built for homeowners on 4G and 5G phones.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/our-work?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=born-again-roofing-case-study",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/born-again-roofing.jpg",
  },
  {
    id: "brandon-flowood-rankin-seo",
    title: "Brandon, Flowood & Rankin County Local SEO Systems",
    signaturePhrase: "Lakeland Drive, Dogwood, Castlewoods, and Reservoir",
    summary:
      "Want more residential and commercial estimate calls from Rankin County? We engineer hyper-local service pages, Google Business Profile alignment, and sub-second mobile websites tailored for searches along Lakeland Drive, Dogwood, Castlewoods, and Reservoir neighborhoods across Flowood, Brandon, and Pearl. Request a custom 5-minute video audit of your current Map Pack visibility.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/locations/brandon-ms?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=brandon-flowood-rankin-seo",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/pincam-roof-proof.jpg",
  },
  {
    id: "geaux-pro-heavy-civil-spotlight",
    title: "Client Spotlight: Geaux Pro Outdoors Land Clearing & Civil",
    signaturePhrase: "Geaux Pro Outdoors",
    summary:
      "Land clearing, forestry mulching, drainage, and heavy dirt work require serious visual authority to win high-ticket acreage and commercial bids. Explore how Power Digital Media built the custom high-velocity web architecture and video-backed estimate funnel for Geaux Pro Outdoors—turning mobile property-owner searches into qualified site-walk requests with zero bloated WordPress plugins.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/our-work?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=geaux-pro-heavy-civil-spotlight",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/geaux-pro-outdoors.jpg",
  },
  {
    id: "tbeauxs-zero-commission-ordering",
    title: "Zero-Commission Square Online Ordering & Catering Funnels",
    signaturePhrase: "zero third-party marketplace commission fees",
    summary:
      "Third-party delivery apps shouldn't take a massive cut of every order from local restaurants and caterers. Power Digital Media engineers custom Next.js ordering experiences and interactive catering calculators integrated natively with Square Web SDK—delivering fast mobile checkout with zero third-party marketplace commission fees, as built for T'Beaux's Cajun Kitchen & Catering.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/our-work?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=tbeauxs-zero-commission-ordering",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/tbeauxs-cajun-kitchen.jpg",
  },
  {
    id: "capsule-crm-transpond-pipelines",
    title: "Capsule CRM & Automated SMS/Email Follow-Up Pipelines",
    signaturePhrase: "Certified Capsule CRM and Transpond Solutions Partner",
    summary:
      "Getting a quote request is only half the battle—speed to lead wins the job. As a Certified Capsule CRM and Transpond Solutions Partner in Jackson, MS, Power Digital Media connects every website form, missed call, and booking calendar directly into structured deal pipelines with instant automated SMS and email follow-up so zero homeowner leads slip through the cracks.",
    actionType: "BOOK",
    actionUrl:
      "https://powerdigitalmedia.org/book?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=capsule-crm-transpond-pipelines",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/crm-sms-automation.jpg",
  },
  {
    id: "ai-search-geo-entity-seo",
    title: "Generative Engine Optimization (GEO) for Local Businesses",
    signaturePhrase: "ChatGPT, Google AI Overviews, Perplexity, and Claude",
    summary:
      "Homeowners and commercial buyers across Central Mississippi are increasingly asking ChatGPT, Google AI Overviews, Perplexity, and Claude who to hire before they ever click ten blue links. Every Power Digital Media website ships with deep JSON-LD entity graphs, verified service-area coordinates, and clean semantic architecture engineered so both Google Map Pack and AI answer engines cite your business first.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/local-seo?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=ai-search-geo-entity-seo",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/pdm-studio-cover.jpg",
  },
  {
    id: "jackson-clinton-custom-nextjs",
    title: "Custom Hand-Coded Next.js Websites in Jackson & Clinton, MS",
    signaturePhrase: "BBB Accredited with an A Rating",
    summary:
      "Tired of sluggish agency WordPress templates, broken plugins, and mystery retainers? Power Digital Media LLC is BBB Accredited with an A Rating right here in Jackson, Mississippi. Every website and growth system is custom-scoped case-by-case and hand-engineered in Next.js for 95–99 mobile PageSpeed and full codebase ownership. Book a straightforward strategy call with founder Damein Donald.",
    actionType: "BOOK",
    actionUrl:
      "https://powerdigitalmedia.org/book?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=jackson-clinton-custom-nextjs",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/lungrins-lawncare.jpg",
  },
];
