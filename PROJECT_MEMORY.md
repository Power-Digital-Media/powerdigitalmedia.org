# Power Digital Media — Active Session & Project State Memory

> **Purpose**: This file stores the complete context, history, architectural decisions, and current roadmap for Power Digital Media (`powerdigitalmedia.org`). When starting or continuing a session on any machine, read this file and `context.md` to pick up with 100% context.

---

## 1. Project & Business Identity
- **Company**: Power Digital Media LLC (`https://powerdigitalmedia.org`)
- **Founder / Principal**: Damein Donald (`(601) 446-2393`, `2914 Cynthia Rd, Jackson, MS 39209`)
- **Primary Positioning**: Contractor-first growth engineering (Roofing, HVAC, Excavation/Dirt Work, Plumbing, Electrical, Lawn Care) + bespoke web/commerce platforms for standout Mississippi businesses (e.g., T'Beaux's Seafood).
- **Proprietary Software Suite**:
  1. **`PinCam™` (`/pincam`)** — Contractor jobsite camera featuring Ghost Camera Photo Match (0–90% opacity overlay), non-destructive damage/measurement markups, dual-cam PiP walkthroughs, homeowner/adjuster PDF reports, and 1-tap `PinDrop™` sync.
  2. **`PinDrop™` (`/pindrop`)** — 30-second mobile crew check-in engine publishing `/projects/[slug]` neighborhood SEO pages, live GPS website pins, Google Business Profile posts, and 15-minute homeowner SMS 5-star review triggers.
  3. **`PDM Site Intelligence™` (`/site-intelligence`)** — Proprietary 24/7 engineering watchtower (5-min multi-probe uptime/SSL checks, CrUX cellular speed, Google Search Console & GA4 `7d/28d/90d` growth snapshots, and 2-stage human-approved staged fixes) included behind Managed Hosting, Local SEO, and Growth Retainers (listed under `Services ▾`, keeping `Field Apps ▾` pure for crews).
- **Approved Packaging Model (Hybrid)**: Primarily bundled as high-stickiness integrated add-ons with Contractor Growth Websites & Monthly Retainers (no per-tech seat gouging), with a secondary guided standalone integration/demo path for established contractors who already like their domain.

---

## 2. Major Website Rebuild & CRO/SEO Overhaul (Completed)
1. **"Industrial Luxury" Visual System (`globals.css`, `Navbar.tsx`, `Footer.tsx`, `StickyMobileDock.tsx`)**:
   - Upgraded palette to deep obsidian (`#06080f`) + molten amber (`#f59e0b`) + blueprint architectural grid.
   - Added mobile thumb-zone `StickyMobileDock` (`Call`, `Text`, `Free Check`) with safe-area padding and input-focus auto-hide.
2. **Immersive Homepage (`src/app/page.tsx`, `ContractorHeroStage.tsx`, `JobsitePipelineStory.tsx`)**:
   - Interactive 4-vertical hero stage + 3-step `PinCam™` → `PinDrop™` → `18s SMS Lead Rescue` pipeline + twin app showcase + 6-city Central MS SEO matrix.
3. **Authentic Interactive App Showcases (`/pincam` & `/pindrop`)**:
   - Photorealistic 1:1 camera-aligned Madison MS roof before/after & HVAC install assets (`public/pincam/`).
   - 5-mode interactive `PinCamInteractiveStage.tsx` and 5-stage `PinDropDemoExplorer.tsx` with Central MS city payload simulator.
4. **Zero-Leak Lead Capture (`AuditCTA.tsx`, `/free-audit`, `Contact.tsx`, `/contact`)**:
   - Fixed mobile `type="url"` silent submission blockers with smart domain/business-name normalization, added `Name` + `Cell Phone` + `Trade` fields, unified the 5-Minute Rank & Website Video offer, and wired durable Firestore/Capsule/Transpond submission.
5. **Local Search Money Pages & City Hubs**:
   - Created `/contractors`, `/local-seo` (with `301` redirect from `/seo`), server-rendered `/web-design`, and 6 static Central MS city pages (`/locations/{jackson-ms,madison-ms,ridgeland-ms,brandon-ms,flowood-ms,clinton-ms}`).
   - Upgraded `layout.tsx` JSON-LD (`AggregateRating` 5.0★ + `Person` + `WebSite` + `SoftwareApplication` entities), `SpeakableSpecification` on `/`, `FAQPage` & `Review` schema, `sitemap.ts`, `robots.ts` (resolved `public/robots.txt` HTTP 500 conflict and enabled explicit AI search crawlers), `llms.txt`, and `llms-full.txt`.
6. **Full-Site Hangover Cleanup & 100% Case-by-Case Custom Scoping**:
   - Unified all secondary routes (`/our-work`, `/portfolio/[slug]`, `/reviews`, `/about`, `/book`, `/blog`, `/privacy`, `/terms`, `/refund-policy`, `/founders100`, discovery funnels, `/site-manager`, `/login`, `/rss.xml`, `/video-sitemap.xml`) onto the Industrial-Luxury system and deleted dead legacy cyberpunk/podcast routes & components behind `301` redirects.
   - Retired public payment/checkout routes (`/billing`, `/billing/bespoke`, `/pay/*`) via permanent `301` redirects (`/billing*` & `/pricing` → `/book`; `/pay*` → `/contact`) while preserving internal `/dashboard/billing` & `/admin/*`. Removed all public service/app dollar figures across UI, FAQs, discovery forms, JSON-LD, and `llms*.txt` in favor of case-by-case custom scoping.

---

## 3. Tech Stack & Engineering Standards
- **Framework**: Next.js 16.1.x (App Router with Turbopack), React 19, Tailwind CSS v4, TypeScript.
- **TypeScript**: Strict type definitions (use `LucideIcon` for Lucide icon components).
- **Speed & Honesty Claims**: `< 2s` / `< 2–3s on mobile`, `98+ Speed Score`.
- **Contact & CTAs**: Always preserve Damein's direct line `(601) 446-2393`, `/book`, and `/free-audit`.
- **GBP API Allowlist Case ID**: `6-2776000041917` (GCP project `power-digital-media` / `978634389841`; GBP Manager account `100% verified` for `Power Digital Media LLC` + `Born Again Roofing`; permanent CLI ready in `scripts/gbp-sync.ts`).
- **Follow-On Track**: Debug and polish live standalone `PinCam™` & `PinDrop™` app workflows in `e:\AntiGravity\pindrop-saas`.
