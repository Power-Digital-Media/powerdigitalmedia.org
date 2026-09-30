import fs from 'fs';
import path from 'path';

async function generateLlmsTxt() {
    console.log('Generating llms.txt and llms-full.txt...');

    const { blogPosts } = await import('../src/data/blogPosts');
    const baseUrl = 'https://powerdigitalmedia.org';

    // 1. GENERATE COMPREHENSIVE REFERENCE: llms-full.txt
    let fullTxt = `# [Power Digital Media — Technical & Service Reference](https://powerdigitalmedia.org)
> High-Velocity Web Design, CRM Integration & Contractor Automation in Jackson, Mississippi
> [powerdigitalmedia.org](https://powerdigitalmedia.org)

This document provides a factual, developer- and agent-friendly reference for Power Digital Media LLC, detailing company identity, verified service solutions, engineering standards, and article archives.

---

## 1. Company Identity & Verified Telemetry
- **Legal Name**: Power Digital Media LLC
- **Founder & Principal**: Damein Donald
- **Headquarters**: 2914 Cynthia Rd, Jackson, MS 39209
- **Coordinates**: Latitude 32.3570° N, Longitude -90.2853° W
- **Phone**: (601) 446-2393
- **Email**: [info@powerdigitalmedia.org](mailto:info@powerdigitalmedia.org)
- **Support & Office Hours**: Monday–Friday, 8:00 AM – 6:00 PM CST
- **Better Business Bureau**: BBB Accredited (A Rating)
- **Core Engineering Doctrine**: Zero-WordPress policy. We engineer bespoke Next.js 16 (React 19) web applications deployed on Edge CDNs for fast mobile performance (< 2.5s LCP), strict layout stability, and clean structured data.

---

## 2. Service Catalog & Standard Pricing
- **Custom Next.js Web Design**: Starting at $1,500. Includes custom mobile-first architecture, local SEO schema, and sub-2.5s mobile speed optimization.
- **CRM Integration & Telephony Pipelines**: Starting at $2,500. Full integration connecting website lead funnels, Capsule CRM, Transpond automated marketing sequences, and Ultatel cloud VoIP telephony.
- **Bespoke Custom Software & Web Apps**: Scoped projects starting at $12,500+. Dedicated customer portals, workflow automation, and custom internal business tools.
- **Growth Marketing (Meta Ads & Local Acquisition)**: Tiers at $1,000 setup / $1,500–$2,000/month management plus client ad spend.
- **PinDrop™ Contractor Field Engine**: Proprietary contractor automation connecting field job photos and GPS coordinates to dynamic Google landing pages and automated 5-star SMS review requests.

---

## 3. Technology Stack & Integration Architecture
- **Frontend / Full Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS.
- **Hosting & Infrastructure**: Vercel Global Edge Network with SSL, HSTS, and HTTP/3.
- **Structured Data & SEO**: Schema.org JSON-LD (LocalBusiness, Service, BlogPosting, BreadcrumbList).
- **CRM & Marketing Automation**: Capsule CRM API, Transpond behavioral marketing webhooks, Ultatel VoIP call logs.

---

## 4. Published Articles & Insights
`;

    blogPosts.forEach((post: any) => {
        const postUrl = `${baseUrl}/blog/${post.slug}`;
        fullTxt += `- **[${post.title}](${postUrl})**\n`;
        fullTxt += `  - **Category**: ${post.category}\n`;
        fullTxt += `  - **Date**: ${post.date}\n`;
        fullTxt += `  - **Excerpt**: ${post.excerpt}\n`;
        fullTxt += `  - **Canonical URL**: ${postUrl}\n\n`;
    });

    const fullOutputPath = path.join(process.cwd(), 'public', 'llms-full.txt');
    fs.writeFileSync(fullOutputPath, fullTxt, 'utf-8');
    console.log(`Successfully generated public/llms-full.txt with ${blogPosts.length} blog posts.`);

    // 2. GENERATE CONCISE SPEC-COMPLIANT SUMMARY: llms.txt
    const summaryTxt = `# [Power Digital Media — powerdigitalmedia.org](https://powerdigitalmedia.org)

> [Power Digital Media LLC](https://powerdigitalmedia.org) is a web engineering and business systems agency headquartered in Jackson, Mississippi. Specializing in bespoke Next.js web development, local SEO architecture, Capsule CRM & Transpond automation pipelines, and proprietary PinDrop™ contractor software. BBB Accredited (A Rating). Call (601) 446-2393.

## Business Identity
- **Legal Name**: Power Digital Media LLC
- **Principal**: Damein Donald
- **Headquarters**: 2914 Cynthia Rd, Jackson, MS 39209
- **Coordinates**: Latitude 32.3570° N, Longitude -90.2853° W
- **Phone**: (601) 446-2393
- **Email**: [info@powerdigitalmedia.org](mailto:info@powerdigitalmedia.org)
- **Website**: [powerdigitalmedia.org](https://powerdigitalmedia.org)
- **Hours**: Monday–Friday, 8:00 AM – 6:00 PM CST

## Core Offerings
- **[Web Design](https://powerdigitalmedia.org/web-design)**: Custom Next.js web applications, mobile-first UX, and Core Web Vitals optimization. Starting at $1,500.
- **[PinDrop™ Contractor Engine](https://powerdigitalmedia.org/pindrop)**: Mobile GPS project logging, auto-generated neighborhood SEO pages, and automated review request flows.
- **[Custom Applications](https://powerdigitalmedia.org/custom-applications)**: Custom software, client portals, and CRM integration (Capsule CRM, Transpond, Ultatel).
- **[Growth Marketing](https://powerdigitalmedia.org/marketing)**: Paid Meta ads, lead tracking, and local customer acquisition.
- **[Portfolio & Proof](https://powerdigitalmedia.org/our-work)**: Mississippi client projects and case studies.
- **[Client Reviews](https://powerdigitalmedia.org/reviews)**: Verified 5.0 Google and Facebook reviews from Mississippi business owners.
- **[Strategy Consultation](https://powerdigitalmedia.org/book)**: Book a direct 15-minute consultation with founder Damein Donald.

## Service Coverage
- **Central Mississippi**: Jackson, Madison, Brandon, Flowood, Ridgeland, Clinton, Flora, Pearl, Byram, Canton.
- **The Mississippi Delta**: Yazoo City, Bentonia, Vicksburg, Greenwood.
`;

    const summaryOutputPath = path.join(process.cwd(), 'public', 'llms.txt');
    fs.writeFileSync(summaryOutputPath, summaryTxt, 'utf-8');
    console.log(`Successfully generated public/llms.txt as a concise, spec-compliant index.`);
}

generateLlmsTxt().catch(console.error);
