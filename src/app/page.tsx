import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import ContractorHeroStage from "@/components/sections/ContractorHeroStage";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
import {
  Phone,
  ArrowRight,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const JobsitePipelineStory = dynamic(() => import("@/components/sections/JobsitePipelineStory"));
const GoogleReviewsSection = dynamic(() => import("@/components/sections/GoogleReviewsSection"));
const ConnectedArchitecture = dynamic(() => import("@/components/sections/ConnectedArchitecture"));
const SpeedComparisonCard = dynamic(() => import("@/components/ui/SpeedComparisonCard"));
const AEOFAQ = dynamic(() => import("@/components/sections/AEOFAQ"));

export const metadata = {
  title: "Power Digital Media | Contractor Websites, Local SEO & Field Apps in Jackson, MS",
  description:
    "Mississippi's contractor & local business growth studio. We build sub-2s custom websites, Google Map Pack SEO, and proprietary PinCam™ + PinDrop™ jobsite apps that turn finished jobs into phone calls.",
  alternates: {
    canonical: "https://powerdigitalmedia.org",
  },
  openGraph: {
    title: "Power Digital Media | Websites, Local SEO & Field Apps That Pull Local Leads",
    description:
      "Turn every finished job into neighborhood Google rankings, 5-star reviews, and booked calls. Built in Jackson, MS by Damein Donald.",
    url: "https://powerdigitalmedia.org",
    images: ["/images/og-image.png"],
  },
};

const METRO_CITIES = [
  { name: "Jackson, MS", slug: "jackson-ms", tag: "Hinds County HQ" },
  { name: "Madison, MS", slug: "madison-ms", tag: "High-Ticket Residential" },
  { name: "Ridgeland, MS", slug: "ridgeland-ms", tag: "Commercial & Home Pros" },
  { name: "Brandon, MS", slug: "brandon-ms", tag: "Rankin County Growth" },
  { name: "Flowood, MS", slug: "flowood-ms", tag: "Lakeland Corridor" },
  { name: "Clinton, MS", slug: "clinton-ms", tag: "Local Commerce & Trades" },
];

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen bg-[#06080f] text-white">
      <Navbar />

      {/* =====================================================================
          IMMERSIVE INDUSTRIAL-LUXURY HERO
      ====================================================================== */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 md:pt-40 md:pb-24 bg-[#06080f] border-b border-white/10">
        {/* Architectural Blueprint Grid + Focused Copper/Amber Lighting */}
        <div className="absolute inset-0 blueprint-grid opacity-55 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute -top-24 left-1/4 w-[780px] h-[480px] bg-amber-500/[0.09] rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 w-[520px] h-[420px] bg-amber-600/[0.05] rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: High-Impact Contractor & Local Business Pitch */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-5">
                <span className="text-amber-400 text-xs">★★★★★</span>
                <span className="text-amber-300 font-mono font-bold tracking-wider uppercase text-[11px]">
                  5.0★ Jackson, MS Studio • Built for Contractors &amp; Local Pros
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-[3.65rem] font-black tracking-tight leading-[1.02] uppercase text-white mb-5">
                Websites &amp; Field Tech That{" "}
                <span className="text-amber-400">Keep Your Crews Booked.</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-7 max-w-xl">
                Stop losing high-value jobs to slower competitors on Google. We engineer sub-2-second custom websites,{" "}
                <strong className="text-white">Google Map Pack rankings</strong>, and proprietary crew software for Mississippi contractors and standout local businesses.
              </p>

              {/* Clean, High-Converting 2-Button CTA Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-7">
                <Link
                  href="/free-audit"
                  className="px-7 py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl hover:brightness-110 transition-all uppercase tracking-wider text-xs shadow-[0_0_32px_rgba(245,158,11,0.32)] text-center flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Get Free 5-Min Rank &amp; Site Check</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:6014462393"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] text-white font-bold uppercase tracking-wider text-xs transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>(601) 446-2393</span>
                </a>
              </div>

              {/* Outcome Proof Bullets (Zero Dev Jargon) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-5 border-t border-white/10 w-full text-xs font-semibold text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Rank in the Google Maps 3-Pack</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>PinCam™ + PinDrop™ Jobsite Suite</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>2-Min Missed-Call SMS Text-Back</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Launched in 7–14 Days • Direct Support</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Trade & Live Deployment Stage */}
            <div className="lg:col-span-6 w-full">
              <ContractorHeroStage />
            </div>
          </div>

          {/* Verified Client Proof Strip */}
          <div className="mt-14 pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span className="font-mono font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Powering Real Mississippi Operators:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 font-bold text-slate-200 text-xs">
              <Link
                href="/portfolio/born-again-roofing"
                className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:text-amber-300 transition-colors"
              >
                Born Again Roofing (99+ Pins)
              </Link>
              <Link
                href="/portfolio/geaux-pro-outdoors"
                className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:text-amber-300 transition-colors"
              >
                Geaux Pro Outdoors (#1 MS Dirt)
              </Link>
              <Link
                href="/portfolio/tbeaux"
                className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:text-amber-300 transition-colors"
              >
                T&apos;Beaux&apos;s Seafood (0% Fee Ordering)
              </Link>
              <Link
                href="/our-work"
                className="px-3.5 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 transition-colors"
              >
                View All 10+ Builds →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          1. IMMERSIVE 3-STAGE JOBSITE-TO-LEAD INTERACTIVE STORY
      ====================================================================== */}
      <JobsitePipelineStory />

      {/* =====================================================================
          2. VERIFIED 5.0★ GOOGLE & FACEBOOK REVIEWS (IMMEDIATE SOCIAL PROOF)
      ====================================================================== */}
      <GoogleReviewsSection />

      {/* =====================================================================
          3. LIVE CLIENT ARCHITECTURE & STANDOUT LOCAL BUILDS (T'BEAUX'S, ETC.)
      ====================================================================== */}
      <ConnectedArchitecture />

      {/* =====================================================================
          5. SPEED BENCHMARK + CENTRAL MS SERVICE AREA SEO HUB
      ====================================================================== */}
      <SpeedComparisonCard />

      <section className="py-20 bg-[#05070d] border-t border-white/10">
        <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest block mb-2">
                Central Mississippi Local Search Coverage
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Helping Local Pros Dominate Every Metro Market.
              </h2>
            </div>
            <Link
              href="/local-seo"
              className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
            >
              <span>See Our Google Map Pack System</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {METRO_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}`}
                className="group p-4 rounded-2xl bg-white/[0.03] hover:bg-amber-500/[0.08] border border-white/10 hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>
                <div className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                  {city.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{city.tag}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. FAQS + DAMEIN FOUNDER PROOF + INLINE AUDIT CTA + CONTACT + FOOTER
      ====================================================================== */}
      <AEOFAQ />
      <DeferredFooterSections />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://powerdigitalmedia.org/#webpage",
            url: "https://powerdigitalmedia.org",
            name: "Power Digital Media | Contractor Websites, Local SEO & Field Apps in Jackson, MS",
            isPartOf: {
              "@id": "https://powerdigitalmedia.org/#website",
            },
            about: {
              "@id": "https://powerdigitalmedia.org/#organization",
            },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", "h2"],
            },
          }),
        }}
      />
    </main>
  );
}
