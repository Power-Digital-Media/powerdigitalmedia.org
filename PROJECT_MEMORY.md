# Power Digital Media — Active Session & Project State Memory

> **Purpose**: This file stores the complete context, history, architectural decisions, and current roadmap for Power Digital Media (`powerdigitalmedia.org`). When starting or continuing a session on any machine (desktop or laptop), read this file to pick up seamlessly with 100% context.

---

## 1. Project & Business Identity
- **Company**: Power Digital Media LLC (`https://powerdigitalmedia.org`)
- **Founder / Principal**: Damein Donald (`(601) 446-2393`, Natchez / Jackson Metro, MS)
- **Core Value Proposition**: Bespoke Next.js 16 + React 19 web engineering, local SEO dominance, video/podcasting production, and proprietary contractor automation (PinDrop™).
- **Key Differentiator**: 0 WordPress / 0 slow PHP plugins. High-performance speed score (98+), 2-3s mobile loads, and custom CRM/telephony pipelines (Ultatel + Transpond + Capsule CRM).

---

## 2. Recent Major Milestones Completed

### A. Blog Rebuild & 301 Redirect Consolidation
- Cleaned legacy bloated blog posts (pruned 80+ low-value legacy URLs).
- Implemented comprehensive 301 redirects in `next.config.ts` mapping all deleted URLs to relevant core services (`/web-design`, `/pindrop`, `/seo`, `/production`, `/our-work`).
- Kept 6 high-value, high-converting authoritative pillar posts.
- Deployed dynamic `llms.txt` and `llms-full.txt` for AI discovery.

### B. Dynamic Sitemap & Google Search Console
- Updated `src/app/sitemap.ts` to only output canonical 200 OK URLs (including `/book` and `/reviews`).
- Submitted directly to Google Search Console.

### C. New High-Converting Open Graph Card (1200x630)
- Replaced cheesy generic graphics with real client portfolio mockups, 5.0 Google stars proof, and high-contrast typography.
- Assets deployed at `public/images/og-image.png` and `src/app/opengraph-image.png`.

### D. PinDrop™ Interactive 4-Stage HVAC Demo Engine (Latest Commit `2b3a6c2`)
- Built an authentic, interactive field-to-Google pipeline demo using mock company **"Magnolia State Air & Heating (Madison, MS)"**.
- Explicitly marked every screen with `[⚡ PinDrop™ Sandbox Mode • Interactive Demo]` badges.
- **4 Generated Visual Stages**:
  1. `pindrop-demo-mobile-app.webp`: In-van GPS lock (Annandale, Madison), Before/After photo tagging (R-22 vs. Trane 16 SEER2), 1-tap publish.
  2. `pindrop-demo-seo-page.webp`: Auto-generated Google landing page (`/projects/madison-ms-trane-heat-pump-replacement`), `LocalBusiness` JSON-LD schema, local quote funnel.
  3. `pindrop-demo-map-carousel.webp`: Central MS 64+ job pin radar map and live homepage recent work ticker.
  4. `pindrop-demo-sms-review.webp`: Automated 5-star SMS review trigger dispatched 15 mins post-job with direct 1-tap Google Review link.
- Integrated interactive explorer component `src/components/pindrop/PinDropDemoExplorer.tsx` into `src/app/pindrop/page.tsx`.

---

## 3. Tech Stack & Engineering Standards
- **Framework**: Next.js 16 (App Router with Turbopack), React 19, Tailwind CSS.
- **TypeScript**: Strict type definitions (use `LucideIcon` for Lucide icon components).
- **Speed & Performance Claims**: `< 2–3s on mobile`, `98+ Speed Score` (avoid unrealistic sub-second claims).
- **Repo & Deployment**: GitHub `master` branch at `https://github.com/Power-Digital-Media/powerdigitalmedia.org.git`.
- **Contact & CTAs**: Always preserve Damein's direct line `(601) 446-2393`, `/book`, and `/free-audit`.

---

## 4. Current Site Status & Next Objectives
- **Local Dev Server**: Runs on `http://localhost:3000`.
- **Build Status**: `npm run build` generates 107/107 static pages with 0 errors.
- **Next Priorities to Tackle**:
  1. Review live `/pindrop` page layout and gather feedback on copy/features.
  2. Continue reviewing other service pages (`/business-solutions`, `/custom-applications`, `/web-design`, `/our-work`) for polish and conversion optimization.
  3. Prepare case study assets or client onboarding flows as needed.
