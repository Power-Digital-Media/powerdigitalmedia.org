import fs from "fs";
import path from "path";

async function generateLlmsTxt() {
  console.log("Generating llms.txt and llms-full.txt...");

  const { blogPosts } = await import("../src/data/blogPosts");
  const { CENTRAL_MS_LOCATIONS } = await import("../src/data/locations");
  const baseUrl = "https://powerdigitalmedia.org";

  // 1. GENERATE COMPREHENSIVE REFERENCE: llms-full.txt
  let fullTxt = `# [Power Digital Media — Technical, Product & Local SEO Reference](https://powerdigitalmedia.org)
> Contractor Growth Engineering, Custom Next.js Web Design, Local SEO & Proprietary Field Apps (\`PinCam™\` + \`PinDrop™\`) in Jackson, Mississippi
> [https://powerdigitalmedia.org](https://powerdigitalmedia.org)

This document provides a factual, machine-readable reference for Power Digital Media LLC, covering company identity, proprietary contractor software, service architecture, verified Mississippi case studies, Central MS location hubs, and published articles.

---

## 1. Company Identity & Verified Telemetry
- **Legal Name**: Power Digital Media LLC
- **Founder & Principal**: Damein Donald
- **Headquarters**: 2914 Cynthia Rd, Jackson, MS 39209
- **Coordinates**: Latitude 32.3570 N, Longitude -90.2853 W
- **Direct Phone & SMS**: (601) 446-2393
- **Email**: [info@powerdigitalmedia.org](mailto:info@powerdigitalmedia.org)
- **Office Hours**: Monday–Friday, 8:00 AM – 6:00 PM CT
- **Accreditation & Reputation**: BBB Accredited (A Rating) • 5.0-Star Google Review Rating
- **Engineering Doctrine**: Zero-WordPress policy. Every client build uses custom Next.js (React 19, TypeScript, Tailwind CSS) for sub-2-second mobile load times, strict Core Web Vitals, and clean Schema.org JSON-LD.

---

## 2. Proprietary Software & Engineering Platforms
1. **[PinCam™ Jobsite Camera & Proof Studio](https://powerdigitalmedia.org/pincam)**
   - **Core Features**: Ghost Camera Photo Match (0–90% live translucent overlay for exact 1:1 before/after angles), non-destructive vector markup & measurement studio, dual-camera Picture-in-Picture narrated walkthroughs, offline-resilient jobsite capture, GPS/timestamp verification watermarks, instant branded PDF homeowner/adjuster inspection reports, and 1-tap sync to PinDrop™.
   - **Access Model**: Available as an integrated crew suite within Power Digital Contractor Growth Websites & Monthly Retainers (with zero per-tech seat tax), or deployed onto existing contractor domains via custom case-by-case onboarding.
2. **[PinDrop™ Field-to-Google SEO & Review Engine](https://powerdigitalmedia.org/pindrop)**
   - **Core Features**: 30-second mobile truck check-in portal, dual satellite/street geocoding with homeowner-safe neighborhood pin fuzzing, automatic \`/projects/[slug]\` and \`/areas-we-service/[city]\` SEO page generation with \`LocalBusiness\` JSON-LD, direct Google Business Profile OAuth posting, embeddable live project maps, crew attribution leaderboards, and 15-minute post-job homeowner SMS 5-star Google review requests.
   - **Access Model**: Deployed either as a lightweight 5-minute standalone embed on an existing contractor website or pre-wired into a custom Next.js Contractor Growth System—scoped case-by-case to crew size and service territory.
3. **[PDM Site Intelligence™ 24/7 Website & SEO Watchtower](https://powerdigitalmedia.org/site-intelligence)**
   - **Core Features**: 5-minute multi-probe HTTP & latency monitoring (preventing false-positive alarms), daily SSL certificate expiry countdowns, broken-link crawls, Chrome UX Report (CrUX) cellular Core Web Vitals telemetry, Google Search Console & GA4 7d/28d/90d growth tracking (zero invented vanity scores), Rich Result schema validation, and a 2-Stage Human Approval AI optimization queue with staged previews and 1-click snapshot rollback.
   - **Access Model**: Included behind Power Digital Media's Managed Hosting, Local SEO, and Growth Retainer engagements, and used to run the Free 5-Minute Rank & Website Video Audit.

---

## 3. Core Services & Custom Case-by-Case Scoping
- **Engagement & Quoting Model**: Power Digital Media LLC scopes every website build, field-app deployment, CRM/VoIP integration, and month-to-month growth retainer **case-by-case** so clients never pay for cookie-cutter agency bloat. Prospects start with a **[Free 5-Minute Rank & Site Video Audit](https://powerdigitalmedia.org/free-audit)** or a **[15-Minute Strategy Call with Damein Donald](https://powerdigitalmedia.org/book)** to receive an exact written scope.
- **[Contractor Growth Systems](https://powerdigitalmedia.org/contractors)**: Complete trade lead-generation infrastructure combining a sub-2s custom website, Google Map Pack optimization, PinCam™ + PinDrop™ crew tools, and 2-minute SMS missed-call/quote lead rescue.
- **[Custom Next.js Web Design](https://powerdigitalmedia.org/web-design)**: Mobile-first custom Next.js 16 engineering for contractors, restaurants, e-commerce, churches, and local organizations—with 100% codebase ownership upon build completion and optional month-to-month managed edge care.
- **[Local SEO & Google Map Pack Engineering](https://powerdigitalmedia.org/local-seo)**: Google 3-Pack optimization, city/subdivision hubs, geo-schema, and automated review velocity across Central Mississippi.
- **[CRM, Custom Checkout & Business Automation](https://powerdigitalmedia.org/custom-applications)**: Direct Capsule CRM pipelines, Transpond follow-up sequences, and native Square Web SDK / Stripe 0%-commission online ordering.
- **[Ultatel Cloud Business Phones](https://powerdigitalmedia.org/business-phones)**: On-site Central Mississippi VoIP installation, Capsule CRM caller screen pops, and missed-call SMS text-back rescue.
- **[Growth Marketing](https://powerdigitalmedia.org/marketing)**: Targeted local Facebook & Instagram homeowner lead funnels with month-to-month management and ad spend paid 100% directly to Meta.

---

## 4. Verified Mississippi Production Case Studies
- **[Born Again Roofing & Remodeling](https://bornagainroofing.com)**: Jackson & Brandon, MS storm restoration contractor running 99+ live GPS project pins via PDM PinDrop™, Capsule CRM lead routing, and automated SMS 5-star review flows (98/100 mobile speed).
- **[Geaux Pro Outdoors / MS Dirt](https://msdirt.com)**: Bentonia & Yazoo County excavation, pond digging, and forestry mulching operator with Capsule CRM pipeline sync, PDM PinDrop™ heavy-equipment job map, and automated YouTube 4K showcase feed.
- **[T'Beaux's Seafood & Catering](https://tbeauxs.com)**: Clinton, MS Cajun restaurant & catering hub built with native Square Web Payments SDK (0% third-party redirect fees), DoorDash Drive dispatch, and an interactive Cajun Feast Catering calculator.
- **[Church 244](https://church244.com)**: Jackson Metro ministry platform featuring 1-tap mobile tithe giving, livestream sermon archives, and Church Center event sync.

---

## 5. Central Mississippi Location Hubs
`;

  CENTRAL_MS_LOCATIONS.forEach((loc) => {
    fullTxt += `- **[${loc.city}, MS (${loc.zipCodes.join(", ")})](${baseUrl}/locations/${loc.slug})**: ${loc.heroTagline}\n`;
  });

  fullTxt += `\n---\n\n## 6. Published Articles & Technical Guides\n`;

  blogPosts.forEach((post) => {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    fullTxt += `- **[${post.title}](${postUrl})**\n`;
    fullTxt += `  - **Category**: ${post.category}\n`;
    fullTxt += `  - **Date**: ${post.date}\n`;
    fullTxt += `  - **Excerpt**: ${post.excerpt}\n`;
    fullTxt += `  - **Canonical URL**: ${postUrl}\n\n`;
  });

  const fullOutputPath = path.join(process.cwd(), "public", "llms-full.txt");
  fs.writeFileSync(fullOutputPath, fullTxt, "utf-8");
  console.log(`Successfully generated public/llms-full.txt with ${blogPosts.length} blog posts.`);

  // 2. GENERATE CONCISE SPEC-COMPLIANT SUMMARY: llms.txt
  const locationBullets = CENTRAL_MS_LOCATIONS.map(
    (loc) => `- **[${loc.city}, MS](${baseUrl}/locations/${loc.slug})**`
  ).join("\n");

  const summaryTxt = `# [Power Digital Media — powerdigitalmedia.org](https://powerdigitalmedia.org)

> [Power Digital Media LLC](https://powerdigitalmedia.org) is a contractor growth engineering, custom Next.js web design, local SEO, and field-software studio headquartered in Jackson, Mississippi. Creators of **PinCam™** (contractor jobsite camera & Ghost before/after documentation app) and **PinDrop™** (field-to-Google local SEO & automated 5-star SMS review engine). BBB Accredited (A Rating) with 5.0-star verified Google client reviews. Every build, app rollout, and month-to-month growth retainer is custom-scoped case-by-case. Direct phone: (601) 446-2393.

## Business Identity
- **Legal Name**: Power Digital Media LLC
- **Founder & Lead Architect**: Damein Donald
- **Headquarters**: 2914 Cynthia Rd, Jackson, MS 39209
- **Coordinates**: 32.3570 N, -90.2853 W
- **Phone / SMS**: (601) 446-2393
- **Email**: [info@powerdigitalmedia.org](mailto:info@powerdigitalmedia.org)
- **Website**: [https://powerdigitalmedia.org](https://powerdigitalmedia.org)
- **Hours**: Monday–Friday, 8:00 AM – 6:00 PM CT

## Flagship Software & Services (Custom-Scoped Case-by-Case)
- **[Contractor Growth Systems](https://powerdigitalmedia.org/contractors)**: Turnkey sub-2-second websites, Google Map Pack SEO, PinCam™ + PinDrop™ crew apps, and 18-second SMS lead rescue for roofers, HVAC pros, excavators, plumbers, electricians, and lawn care teams.
- **[PinCam™ Jobsite Camera App](https://powerdigitalmedia.org/pincam)**: Ghost Camera 1:1 before/after photo alignment, non-destructive damage/measurement markups, dual-cam PiP walkthroughs, instant homeowner/adjuster PDF reports, and 1-tap PinDrop™ sync.
- **[PinDrop™ Field SEO Engine](https://powerdigitalmedia.org/pindrop)**: 30-second mobile truck check-ins that auto-publish \`/projects/[slug]\` neighborhood SEO pages, live website GPS map pins, Google Business Profile updates, and 15-minute homeowner SMS 5-star review requests.
- **[PDM Site Intelligence™ Watchtower](https://powerdigitalmedia.org/site-intelligence)**: Proprietary 24/7 engineering watchtower monitoring 5-minute uptime & SSL probes, CrUX cellular speed, Google Search Console & GA4 growth deltas, and 2-stage human-approved staged fixes across managed client sites.
- **[Custom Next.js Web Design](https://powerdigitalmedia.org/web-design)**: Hand-coded Next.js 16 websites for contractors and standout local businesses—custom-scoped case-by-case with 100% codebase ownership and optional month-to-month managed edge care.
- **[Local SEO & Google Maps](https://powerdigitalmedia.org/local-seo)**: Google 3-Pack optimization, neighborhood JSON-LD schema, and review velocity across Central Mississippi.
- **[Custom Applications & CRM](https://powerdigitalmedia.org/custom-applications)** | **[Ultatel Business Phones](https://powerdigitalmedia.org/business-phones)** | **[Growth Marketing](https://powerdigitalmedia.org/marketing)**
- **[Free 5-Minute Rank & Site Video](https://powerdigitalmedia.org/free-audit)** | **[Live Portfolio](https://powerdigitalmedia.org/our-work)** | **[Verified Reviews](https://powerdigitalmedia.org/reviews)** | **[Book a 15-Min Scope Call](https://powerdigitalmedia.org/book)**

## Verified Mississippi Deployments
- **[Born Again Roofing](https://bornagainroofing.com)**: 99+ live PDM PinDrop™ GPS job pins, Capsule CRM routing & SMS 5-star review automation.
- **[Geaux Pro Outdoors](https://msdirt.com)**: Commercial excavation & forestry mulching lead engine + PinDrop™ job map.
- **[T'Beaux's Seafood](https://tbeauxs.com)**: 0%-commission native Square Web SDK ordering, DoorDash Drive dispatch & catering calculator.
- **[Church 244](https://church244.com)**: 1-tap mobile giving & sermon livestream platform.

## Central Mississippi Service Areas
${locationBullets}
`;

  const summaryOutputPath = path.join(process.cwd(), "public", "llms.txt");
  fs.writeFileSync(summaryOutputPath, summaryTxt, "utf-8");
  console.log("Successfully generated public/llms.txt as a concise, spec-compliant index.");
}

generateLlmsTxt().catch(console.error);
