import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
import MobileSnapCarousel from "@/components/ui/MobileSnapCarousel";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import GoogleReviewsSection from "@/components/sections/GoogleReviewsSection";
import QuickScanBanner from "@/components/scanner/QuickScanBanner";
import {
  MapPin,
  Search,
  Star,
  Zap,
  Globe,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  PhoneCall,
  Building2,
  MessageSquare,
  TrendingUp,
  Activity,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Local SEO & Google Map Pack Jackson, MS | Power Digital",
  description:
    "Google Map Pack optimization, LocalBusiness schema, PinDrop™ GPS job pins & automated 5-star reviews in Jackson, Madison & Brandon, MS: (601) 446-2393.",
  alternates: {
    canonical: "https://powerdigitalmedia.org/local-seo",
  },
  openGraph: {
    title: "Local SEO & Google Map Pack Jackson, MS | Power Digital",
    description:
      "Over 70% of local service calls go to the Google 3-Pack. See how we optimize Google Map Pack visibility for Mississippi contractors and local businesses.",
    url: "https://powerdigitalmedia.org/local-seo",
    images: ["/pindrop/bar-live-pins.webp"],
  },
};

const SEO_PILLARS = [
  {
    icon: Building2,
    badge: "01 • Google Business Profile",
    title: "Complete Map Pack Engineering",
    desc: "We structure primary & secondary Google categories, service-area polygons, Q&A seeding, UTM call tracking, and weekly geo-tagged updates so Google trusts your listing.",
  },
  {
    icon: MapPin,
    badge: "02 • Hyper-Local Proof Signals",
    title: "PinDrop™ Subdivision Authority",
    desc: "Instead of generic blog fluff, every real job your crew completes publishes an indexable neighborhood project page with exact coordinates and LocalBusiness JSON-LD.",
  },
  {
    icon: MessageSquare,
    badge: "03 • Review Velocity Engine",
    title: "Automated 5-Star SMS Requests",
    desc: "Consistent, keyword-rich homeowner reviews are a top Map Pack ranking factor. Our automated 15-minute post-job SMS flow compounds authentic 5-star reviews hands-free.",
  },
  {
    icon: Zap,
    badge: "04 • Technical Core Web Vitals",
    title: "Sub-2s Next.js Speed Advantage",
    desc: "Slow WordPress sites bleed mobile callers and fail Core Web Vitals. Our custom Next.js builds score 98/100+ and include clean LocalBusiness, Service, and Breadcrumb schema.",
  },
];

const LOCAL_SEO_FAQS = [
  {
    q: "Why does the Google Map Pack (Top 3) matter more than regular search links?",
    a: "When a homeowner in Madison, Brandon, or Jackson searches 'roof leak repair near me' or 'AC repair Madison MS' on their phone, the Google 3-Pack sits right at the top with tap-to-call buttons and star ratings—capturing over 70% of all high-intent local calls.",
  },
  {
    q: "How long does it take to climb into the Google 3-Pack in Central Mississippi?",
    a: "Technical fixes, Google Business Profile restructuring, and fast Next.js service-area hubs often produce measurable ranking jumps within 30 to 45 days. Competitive metro keywords compound steadily over 60 to 120 days as PinDrop™ job pins and 5-star reviews stack up.",
  },
  {
    q: "Can I rank in cities outside my physical office address (like Madison, Brandon, or Flowood)?",
    a: "Yes—when done the right way. Simply stuffing city names in a footer doesn't work anymore. We build dedicated city hubs backed by real completed project pages, verified GPS check-ins, and customer reviews from those specific suburbs.",
  },
  {
    q: "How is Power Digital Media different from national SEO agencies?",
    a: "National agencies outsource templated blog posts to writers who don't know Lakeland Drive from Highway 49. We're headquartered at 2914 Cynthia Rd in Jackson, MS, and we built proprietary field software (PinCam™ + PinDrop™) that turns your actual daily jobs into Google ranking proof.",
  },
];

const CITIES = [
  { name: "Jackson, MS", slug: "jackson-ms", note: "Fondren, Belhaven, West Jackson & Metro HQ" },
  { name: "Madison, MS", slug: "madison-ms", note: "Annandale, Reunion, Hwy 463 & Gluckstadt" },
  { name: "Flora, MS", slug: "flora-ms", note: "Hwy 49 Corridor, Kearney Park & Cox Ferry" },
  { name: "Ridgeland, MS", slug: "ridgeland-ms", note: "Highland Colony, Renaissance & Reservoir" },
  { name: "Brandon, MS", slug: "brandon-ms", note: "Crossgates, Castlewoods & 39042/39047" },
  { name: "Flowood, MS", slug: "flowood-ms", note: "Lakeland Dr Corridor, Dogwood & Commercial" },
  { name: "Pearl, MS", slug: "pearl-ms", note: "I-20, Airport Rd & Hwy 80 Trade Corridor" },
  { name: "Clinton, MS", slug: "clinton-ms", note: "Olde Towne, Lovett, Hwy 80 & I-20 West" },
  { name: "Canton, MS", slug: "canton-ms", note: "Courthouse Square, Hwy 51 & Nissan Pkwy" },
  { name: "Byram, MS", slug: "byram-ms", note: "I-55 South, Siwell Rd & Terry Rd Growth" },
];

export default function LocalSEOPage() {
  const baseUrl = "https://powerdigitalmedia.org";

  return (
    <main className="relative flex flex-col min-h-screen bg-[#06080f] text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${baseUrl}/` },
          { name: "Local SEO & Google Maps", url: `${baseUrl}/local-seo` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Local SEO & Google Map Pack Optimization",
            provider: {
              "@id": "https://powerdigitalmedia.org/#organization",
            },
            serviceType: "Local Search Engine Optimization",
            description:
              "Google Business Profile engineering, neighborhood LocalBusiness schema, PinDrop™ GPS project authority, and automated 5-star review systems in Jackson and Central Mississippi.",
            areaServed: CITIES.map((c) => c.name),
          }),
        }}
      />

      <Navbar />

      {/* =====================================================================
          HERO SECTION
      ====================================================================== */}
      <section className="relative pt-[114px] pb-9 sm:pt-36 md:pt-40 md:pb-24 px-4 sm:px-6 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 blueprint-grid opacity-55 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute top-14 left-1/2 -translate-x-1/2 w-[780px] h-[400px] bg-emerald-500/[0.08] rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/35 text-emerald-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest mb-3 sm:mb-6">
            <Search className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="sm:hidden">Jackson &amp; Central MS Map Pack SEO</span>
            <span className="hidden sm:inline">Jackson &amp; Central Mississippi Local Search Engineering</span>
          </div>

          <h1 className="text-[1.78rem] sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[1.03] sm:leading-[0.98] max-w-5xl mx-auto mb-3 sm:mb-6">
            Stop Hiding on Page Two.{" "}
            <span className="text-amber-400">Own the Google Map Pack.</span>
          </h1>

          <p className="sm:hidden text-slate-300 text-[13px] leading-snug mb-4 max-w-md mx-auto">
            Over <strong className="text-white">70% of local calls</strong> go to the Top 3 on Google Maps. We wire Next.js speed, GBP optimization, and <strong className="text-white">PinDrop™</strong> proof so buyers call you first.
          </p>
          <p className="hidden sm:block text-slate-300 max-w-3xl mx-auto text-base sm:text-xl leading-relaxed mb-9">
            Over <strong className="text-white">70% of local service calls</strong> go straight to the Top 3 businesses on Google Maps. We combine technical Next.js speed, Google Business Profile optimization, automated 5-star SMS reviews, and{" "}
            <strong className="text-white">PinDrop™</strong> neighborhood job proof so buyers find and call you first.
          </p>

          <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 mb-6 sm:mb-14">
            <Link
              href="/free-audit"
              className="w-full sm:w-auto px-3.5 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-[11px] sm:text-xs shadow-[0_0_32px_rgba(245,158,11,0.32)] hover:brightness-110 transition-all"
            >
              <span className="sm:hidden">Free Rank Video →</span>
              <span className="hidden sm:inline">Get Free 5-Min Google Rank Video →</span>
            </Link>
            <Link
              href="/pindrop"
              className="w-full sm:w-auto px-3.5 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-bold uppercase tracking-wider text-[11px] sm:text-xs transition-all"
            >
              <span className="sm:hidden">PinDrop™ Engine</span>
              <span className="hidden sm:inline">See PinDrop™ SEO Engine</span>
            </Link>
            <a
              href="tel:6014462393"
              className="hidden sm:flex w-full sm:w-auto px-6 py-4 rounded-xl border border-amber-500/35 bg-amber-500/10 text-amber-300 font-bold uppercase tracking-wider text-xs hover:bg-amber-400 hover:text-slate-950 transition-all items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              (601) 446-2393
            </a>
          </div>

          {/* Visual Simulated Google 3-Pack Telemetry */}
          <div className="max-w-3xl mx-auto rounded-3xl obsidian-surface p-4 sm:p-7 text-left">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-white/10 text-[11px] sm:text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                Google Maps 3-Pack Target
              </span>
              <span className="text-emerald-400 font-bold">70%+ OF BUYER CALLS</span>
            </div>

            <div className="space-y-2">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-500/[0.09] border border-emerald-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-400 text-slate-950 text-[10px] font-black uppercase shrink-0">
                      Top 3 Map Pack Target
                    </span>
                    <span className="font-black text-white text-sm sm:text-base">
                      Your Company + PinDrop™ Geo Proof
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-amber-300 mt-1">
                    <span className="flex items-center gap-0.5 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 5.0
                    </span>
                    <span className="text-slate-300">• Active Weekly Job Photos • Sub-2s Website</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-300 shrink-0">
                  Tap-to-Call Winner
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3 opacity-65 text-xs">
                <span className="text-slate-300 font-semibold truncate">
                  #2 Competitor (Static WordPress • Last Photo 2023)
                </span>
                <span className="font-mono text-slate-400 shrink-0">4.4★</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3 opacity-50 text-xs">
                <span className="text-slate-400 font-semibold truncate">
                  #3 Competitor (No City Pages • 6.4s Mobile Load)
                </span>
                <span className="font-mono text-slate-500 shrink-0">4.1★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuickScanBanner />

      <div className="hidden lg:block">
        <GoogleReviewsSection variant="compact" />
      </div>

      {/* =====================================================================
          4-PILLAR RANKING ARCHITECTURE
      ====================================================================== */}
      <section className="py-12 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-7 sm:mb-14">
          <span className="text-amber-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] font-bold block mb-2 sm:mb-3">
            How We Engineer Rankings
          </span>
          <h2 className="text-2xl sm:text-5xl font-black uppercase tracking-tight text-white mb-2 sm:mb-4">
            Real Local Signals Google Can Verify—Zero Black-Hat Gimmicks.
          </h2>
          <p className="hidden sm:block text-slate-300 text-base leading-relaxed">
            Google&apos;s local algorithm measures three things: Relevance, Distance/Service Proof, and Prominence. Every piece of our system strengthens those exact signals.
          </p>
        </div>

        <MobileSnapCarousel
          itemCount={SEO_PILLARS.length}
          ariaLabel="Four Local SEO ranking pillars"
          desktopGridClass="md:grid md:grid-cols-2 gap-6"
          itemLabel="pillars"
        >
          {SEO_PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-3xl bg-[#090d18] border border-white/10 p-6 sm:p-8 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/12 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white">{p.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </MobileSnapCarousel>

        {/* 24/7 Watchtower Telemetry Banner */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#070b14] border border-cyan-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" /> Zero Invented Vanity Reports
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
              Tracked Live in PDM Site Intelligence™.
            </h3>
            <p className="text-sm text-slate-300">
              Our proprietary Jackson watchtower connects directly to your Google Search Console, GA4, and Chrome UX telemetry—monitoring 7d/28d/90d ranking gains, Rich Result schema health, and mobile speed around the clock.
            </p>
          </div>
          <Link
            href="/site-intelligence"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-200 font-bold uppercase tracking-wider text-xs transition-colors"
          >
            <span>Explore Watchtower Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* =====================================================================
          CENTRAL MISSISSIPPI COVERAGE MATRIX
      ====================================================================== */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-[#080c16] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-12">
            <div>
              <span className="text-emerald-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] font-bold block mb-2">
                Hinds • Madison • Rankin Counties
              </span>
              <h2 className="text-2xl sm:text-5xl font-black uppercase tracking-tight text-white">
                Central Mississippi Markets We Help You Dominate
              </h2>
            </div>
            <Link
              href="/free-audit"
              className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-2"
            >
              Check Your City Rankings <TrendingUp className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}`}
                className="shrink-0 w-[272px] sm:w-auto snap-start group p-5 sm:p-6 rounded-2xl bg-[#06080f] border border-white/10 hover:border-amber-400/50 transition-all flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 font-black text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    {city.name}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{city.note}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
          <p className="sm:hidden text-[11px] font-mono text-slate-400 mt-2.5">
            Swipe markets → 10 Central MS service hubs
          </p>
        </div>
      </section>

      {/* =====================================================================
          LOCAL SEO FAQS
      ====================================================================== */}
      <section className="py-12 md:py-20 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-amber-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] font-bold block mb-2 sm:mb-3">
            Common Questions
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-white">
            Jackson &amp; Central MS Local SEO FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {LOCAL_SEO_FAQS.map((faq, idx) => (
            <details
              key={faq.q}
              open={idx === 0}
              className="group rounded-2xl bg-[#090d18] border border-white/10 open:border-amber-500/35 overflow-hidden transition-colors"
            >
              <summary className="list-none cursor-pointer p-4 sm:p-6 flex items-center justify-between gap-3">
                <h3 className="text-sm sm:text-lg font-bold text-white text-left">{faq.q}</h3>
                <ChevronDown className="w-4 h-4 text-amber-400 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      <DeferredFooterSections mode="inner" />
    </main>
  );
}
