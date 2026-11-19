/**
 * Canonical Automated Google Business Profile (GBP) Single-Feature Spotlight Lineup
 * Power Digital Media LLC — Jackson, MS & Central Mississippi Tri-County Area
 *
 * Design Philosophy:
 * - Each post spotlights ONE distinct Power Digital Media feature with tight, direct copy.
 * - Paired with a bespoke 1200x900 (4:3) commercial feature graphic in `public/gbp-posts/`.
 * - Zero phone numbers or raw URLs inside `summary` body text (structured CTA button handles routing).
 * - Zero public dollar figures or retired offerings (100% case-by-case custom scoping).
 */

export interface GbpAutoPostTemplate {
  id: string;
  title: string;
  /** Unique substring used to detect if this feature spotlight already exists in recent live GBP posts */
  signaturePhrase: string;
  summary: string;
  actionType: "LEARN_MORE" | "BOOK";
  actionUrl: string;
  mediaUrl: string;
}

export const PDM_GBP_AUTOPOST_ROTATION: GbpAutoPostTemplate[] = [
  {
    id: "pincam-ghost-photo-match",
    title: "PinCam — Ghost Photo Match",
    signaturePhrase: "Ghost Photo Match overlays your original",
    summary:
      "Most before-and-after job photos fail because they were shot from two completely different angles. Inside PinCam, Ghost Photo Match overlays your original before shot right inside your live camera lens—so your crew lines up the after photo 1:1 every single time for undeniable homeowner and insurance adjuster proof.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/pincam?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=pincam-ghost-photo-match",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/01-ghost-photo-match.jpg",
  },
  {
    id: "google-map-pack-geo-aeo",
    title: "Google Map Pack Optimization + GEO & AEO AI Search",
    signaturePhrase: "ChatGPT, Gemini, and Perplexity recommend",
    summary:
      "Customers across Jackson, Madison, Ridgeland, Flowood, Brandon, and Flora now discover local pros inside both the Google Maps 3-Pack and AI search tools. We engineer localized JSON-LD entity schema, dedicated city hubs, and generative answer engine signals so Google Map Pack results and AI platforms like ChatGPT, Gemini, and Perplexity recommend your business when buyers are ready to hire.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/local-seo?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=google-map-pack-geo-aeo",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/02-google-map-pack-geo-aeo.jpg",
  },
  {
    id: "pindrop-30s-crew-checkin",
    title: "PDM PinDrop — 30-Second Crew Check-In",
    signaturePhrase: "crew snaps one photo and taps check-in in 30 seconds",
    summary:
      "Every finished job should help you win the next three houses on that street. With PDM PinDrop, your crew snaps one photo and taps check-in in 30 seconds—automatically publishing a GPS-verified neighborhood project page and live map pin that builds real Google Map Pack authority where you actually work.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/pindrop?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=pindrop-30s-crew-checkin",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/03-pindrop-crew-checkin.jpg",
  },
  {
    id: "site-intelligence-5min-watchtower",
    title: "PDM Site Intelligence — 5-Minute Site Watchtower",
    signaturePhrase: "every 5 minutes around the clock",
    summary:
      "Most business owners only find out their website or quote form broke weeks after calls slow down. PDM Site Intelligence probes your live website, SSL certificate, cellular load speed, and form endpoints every 5 minutes around the clock—catching issues before they ever cost you a lead.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/site-intelligence?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=site-intelligence-5min-watchtower",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/04-site-watchtower-uptime.jpg",
  },
  {
    id: "pindrop-automated-5star-reviews",
    title: "PDM PinDrop — 15-Minute Automated 5-Star Reviews",
    signaturePhrase: "15 minutes after the job wraps up",
    summary:
      "Asking for reviews weeks later rarely works—happy customers get busy and forget. PDM PinDrop automatically sends a friendly, 1-tap Google review text 15 minutes after the job wraps up, capturing authentic 5-star homeowner reviews right at peak satisfaction so your Map Pack rating climbs steadily.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/pindrop?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=pindrop-automated-5star-reviews",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/05-automated-5star-reviews.jpg",
  },
  {
    id: "pincam-instant-pdf-reports",
    title: "PinCam — Instant Branded PDF Job Reports",
    signaturePhrase: "branded PDF inspection report right from the truck",
    summary:
      "Stop spending late nights at the kitchen table dragging jobsite photos into Word documents. PinCam compiles your verified before-and-after photos, damage callouts, and inspection notes into a clean, branded PDF inspection report right from the truck—ready to text or email to homeowners and adjusters before you leave the driveway.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/pincam?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=pincam-instant-pdf-reports",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/06-instant-pdf-job-reports.jpg",
  },
  {
    id: "pincam-dual-cam-walkthroughs",
    title: "PinCam — Dual-Cam Field Walkthroughs",
    signaturePhrase: "records both your rear jobsite lens and front",
    summary:
      "Homeowners trust what they can see and hear directly from the pro on site. PinCam's Dual-Cam mode records both your rear jobsite lens and front narration camera in one synchronized video walkthrough—making it effortless to show storm damage, explain repair options clearly, and get faster estimate approvals.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/pincam?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=pincam-dual-cam-walkthroughs",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/07-dual-cam-walkthroughs.jpg",
  },
  {
    id: "pincam-precision-photo-markup",
    title: "PinCam — Non-Destructive Precision Photo Markup",
    signaturePhrase: "separate vector layer while keeping your raw original",
    summary:
      "Drawing messy finger scribbles over a phone photo ruins the original evidence image. PinCam places crisp measurement lines, callout magnifiers, and directional arrows on a separate vector layer while keeping your raw original photo completely untouched underneath.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/pincam?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=pincam-precision-photo-markup",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/08-precision-photo-markup.jpg",
  },
  {
    id: "sub-second-nextjs-mobile-speed",
    title: "Sub-Second Next.js Cellular Speed Architecture",
    signaturePhrase: "over half of mobile visitors bounce",
    summary:
      "When a homeowner taps your listing on 4G or 5G cellular data, over half of mobile visitors bounce if the site stalls on a slow template loading screen. Every Power Digital Media website is hand-engineered in Next.js with zero bloated plugins—opening in under a second so callers hit your phone instead of the back button.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/web-design?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=sub-second-nextjs-mobile-speed",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/09-sub-second-mobile-speed.jpg",
  },
  {
    id: "verified-site-remediation",
    title: "PDM Site Intelligence — Human-Verified SEO Remediation",
    signaturePhrase: "staged and reviewed by a real engineer",
    summary:
      "Blind automated plugins can break a live business website overnight. Inside PDM Site Intelligence, whenever telemetry spots a broken link, schema warning, or Search Console ranking dip, the fix is staged and reviewed by a real engineer before a single line is deployed to your live domain.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/site-intelligence?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=verified-site-remediation",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/10-verified-site-remediation.jpg",
  },
  {
    id: "zero-commission-square-ordering",
    title: "Zero-Commission Direct Online & Catering Ordering",
    signaturePhrase: "keep 100 percent of every order",
    summary:
      "Third-party delivery apps shouldn't take a massive cut out of every ticket you cook. We build custom mobile menus, interactive event guest calculators, and native Square checkout right inside your own website—so customers check out in seconds on their phone and you keep 100 percent of every order.",
    actionType: "LEARN_MORE",
    actionUrl:
      "https://powerdigitalmedia.org/web-design?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=zero-commission-square-ordering",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/11-zero-commission-ordering.jpg",
  },
  {
    id: "ai-search-geo-crm-pipeline",
    title: "AI Answer Engine Schema & Direct CRM Lead Sync",
    signaturePhrase: "routes straight into your CRM pipeline",
    summary:
      "Buyers now ask ChatGPT, Google AI Overviews, and voice search who to hire—and expect an instant response once they reach out. We wire structured entity schema into your site so AI search engines recommend you first, while every quote form and call routes straight into your CRM pipeline with instant automated follow-up.",
    actionType: "BOOK",
    actionUrl:
      "https://powerdigitalmedia.org/book?utm_source=google&utm_medium=organic&utm_campaign=gbp_autopost&utm_content=ai-search-geo-crm-pipeline",
    mediaUrl: "https://powerdigitalmedia.org/gbp-posts/12-ai-search-crm-pipeline.jpg",
  },
];
