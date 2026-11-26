import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
import MobileSnapCarousel from "@/components/ui/MobileSnapCarousel";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import GoogleReviewsSection from "@/components/sections/GoogleReviewsSection";
import {
  CENTRAL_MS_LOCATIONS,
  getLocationBySlug,
} from "@/data/locations";
import {
  MapPin,
  PhoneCall,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Camera,
  Zap,
  Building2,
  Navigation,
} from "lucide-react";

interface LocationPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return CENTRAL_MS_LOCATIONS.map((loc) => ({
    city: loc.slug,
  }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { city } = await params;
  const loc = getLocationBySlug(city);
  if (!loc) return {};

  const primaryZips = loc.zipCodes.slice(0, 2).join(", ");
  const title = `Web Design & Local SEO in ${loc.city}, MS | Power Digital`;
  const description = `Custom 0.8s websites, Google Map Pack SEO, Capsule CRM, and PinDrop™ crew apps in ${loc.city}, MS (${primaryZips}). Call (601) 446-2393.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://powerdigitalmedia.org/locations/${loc.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://powerdigitalmedia.org/locations/${loc.slug}`,
      images: ["/pincam/roof-after.jpg"],
    },
  };
}

export default async function CityLocationPage({ params }: LocationPageProps) {
  const { city } = await params;
  const loc = getLocationBySlug(city);

  if (!loc) {
    notFound();
  }

  const baseUrl = "https://powerdigitalmedia.org";
  const otherCities = CENTRAL_MS_LOCATIONS.filter((c) => c.slug !== loc.slug);

  return (
    <main className="relative flex flex-col min-h-screen bg-[#06080f] text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${baseUrl}/` },
          { name: "Service Areas", url: `${baseUrl}/local-seo` },
          { name: `${loc.city}, MS`, url: `${baseUrl}/locations/${loc.slug}` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Custom Web Design, Local SEO & Contractor Systems in ${loc.city}, MS`,
            provider: {
              "@id": "https://powerdigitalmedia.org/#organization",
            },
            serviceType: "Web Design & Local SEO",
            description: loc.marketSummary,
            areaServed: {
              "@type": "City",
              name: loc.city,
              containedInPlace: {
                "@type": "State",
                name: "Mississippi",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: loc.coordinates.lat,
                longitude: loc.coordinates.lng,
              },
            },
          }),
        }}
      />

      <Navbar />

      {/* =====================================================================
          CITY HERO SECTION
      ====================================================================== */}
      <section className="relative pt-[114px] pb-9 sm:pt-36 md:pt-40 md:pb-24 px-4 sm:px-6 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 blueprint-grid opacity-55 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute top-12 left-1/3 w-[640px] h-[380px] bg-amber-500/[0.08] rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-5 sm:gap-10 items-center">
          <div className="lg:col-span-7 space-y-3 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-amber-500/10 border border-amber-500/35 text-amber-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider max-w-full">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="sm:hidden truncate">
                {loc.city}, MS • {loc.county} ({loc.zipCodes[0]})
              </span>
              <span className="hidden sm:inline">
                {loc.city}, Mississippi • {loc.county} • {loc.zipCodes.join(" / ")}
              </span>
            </div>

            <h1 className="text-[1.8rem] sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.03] sm:leading-[1.0] text-white">
              {loc.city}, MS{" "}
              <span className="text-amber-400">Web Design, Google Maps SEO &amp; Contractor Systems.</span>
            </h1>

            <p className="text-[13px] sm:text-lg text-slate-300 leading-snug sm:leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none">
              {loc.marketSummary}
            </p>

            <div className="grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5">
              <Link
                href="/estimate"
                className="px-3.5 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-[11px] sm:text-xs text-center shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:brightness-110 transition-all flex items-center justify-center"
              >
                <span className="sm:hidden">{loc.city} Pricing →</span>
                <span className="hidden sm:inline">Build {loc.city} Estimate →</span>
              </Link>
              <Link
                href="/free-audit"
                className="px-3.5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-bold uppercase tracking-wider text-[11px] sm:text-xs text-center transition-all flex items-center justify-center"
              >
                Free {loc.city} Video
              </Link>
              <a
                href="tel:6014462393"
                className="hidden sm:flex px-6 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-bold uppercase tracking-wider text-xs text-center items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                (601) 446-2393
              </a>
            </div>
          </div>

          {/* Right: Geo Telemetry & Local Case Study Card */}
          <div className="lg:col-span-5">
            <div className="obsidian-surface rounded-3xl p-5 sm:p-7 space-y-4 sm:space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5 sm:pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                    {loc.distanceFromHQ}
                  </span>
                  <h2 className="text-base sm:text-lg font-black uppercase text-white mt-0.5">
                    {loc.city} Market Telemetry
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-slate-400 shrink-0">
                  {loc.coordinates.display}
                </span>
              </div>

              <div className="rounded-2xl bg-[#070a12] border border-amber-500/30 p-4 sm:p-5 space-y-2.5">
                <div className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono">
                  <span className="text-amber-300 font-bold uppercase">
                    {loc.featuredProof.category}
                  </span>
                  <span className="text-emerald-400 font-bold shrink-0">LIVE PROOF</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {loc.featuredProof.clientName}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {loc.featuredProof.summary}
                </p>
                <div className="pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-mono text-amber-300 font-bold">
                    {loc.featuredProof.metric}
                  </span>
                  <Link
                    href={loc.featuredProof.portfolioHref}
                    className="font-bold text-white hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
                  >
                    Case Study →
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <Link
                  href="/pincam"
                  className="p-3 rounded-xl bg-white/[0.04] hover:bg-amber-500/15 border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between font-bold text-white"
                >
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-amber-400 shrink-0" /> PinCam™
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </Link>
                <Link
                  href="/pindrop"
                  className="p-3 rounded-xl bg-white/[0.04] hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-400/40 transition-all flex items-center justify-between font-bold text-white"
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> PinDrop™
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hidden lg:block">
        <GoogleReviewsSection variant="compact" />
      </div>

      {/* =====================================================================
          NEIGHBORHOODS, CORRIDORS & TRADES SERVED IN THIS CITY
      ====================================================================== */}
      <section className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <MobileSnapCarousel
          itemCount={3}
          ariaLabel={`${loc.city} local market coverage`}
          desktopGridClass="lg:grid lg:grid-cols-3 gap-6"
          breakpoint="lg"
          itemLabel="zones"
        >
          {/* Neighborhoods */}
          <div className="rounded-3xl bg-[#090d18] border border-white/10 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/12 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold block">
                  Subdivision Targeting
                </span>
                <h2 className="text-xl font-black uppercase text-white">
                  {loc.city} Neighborhoods
                </h2>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We structure neighborhood schema and PinDrop™ project pages around the exact subdivisions where {loc.city} homeowners search:
            </p>
            <ul className="grid grid-cols-1 gap-2 pt-1">
              {loc.neighborhoods.map((n) => (
                <li
                  key={n}
                  className="px-3.5 py-2 rounded-xl bg-[#06080f] border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial Corridors */}
          <div className="rounded-3xl bg-[#090d18] border border-white/10 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/12 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold block">
                  High-Intent Search Zones
                </span>
                <h2 className="text-xl font-black uppercase text-white">
                  Key {loc.city} Corridors
                </h2>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Commercial, retail, and residential service corridors in {loc.county} we optimize your Google Business Profile and service pages around:
            </p>
            <ul className="space-y-2.5 pt-1">
              {loc.corridors.map((c) => (
                <li
                  key={c}
                  className="p-3 rounded-xl bg-[#06080f] border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* High-Demand Industries */}
          <div className="rounded-3xl bg-[#090d18] border border-white/10 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/12 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold block">
                  Built to Convert
                </span>
                <h2 className="text-xl font-black uppercase text-white">
                  Top {loc.city} Verticals
                </h2>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Industries in {loc.city} seeing the fastest ROI from sub-2-second Next.js builds, Capsule CRM automation, and field proof:
            </p>
            <ul className="space-y-2.5 pt-1">
              {loc.topTrades.map((t) => (
                <li
                  key={t}
                  className="p-3 rounded-xl bg-[#06080f] border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </MobileSnapCarousel>
      </section>

      {/* =====================================================================
          CITY-SPECIFIC FAQS + NEARBY MARKETS
      ====================================================================== */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-[#080c16] border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-amber-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] font-bold block mb-2">
              Local Questions Answered
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white">
              {loc.city}, MS Web Design &amp; SEO FAQs
            </h2>
          </div>

          <div className="space-y-3 mb-10 sm:mb-14">
            {loc.faqs.map((faq, idx) => (
              <details
                key={faq.q}
                open={idx === 0}
                className="group rounded-2xl bg-[#06080f] border border-white/10 open:border-amber-500/35 overflow-hidden transition-colors"
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

          {/* Nearby Central MS Markets Cross-Links */}
          <div className="p-5 sm:p-7 rounded-3xl bg-[#06080f] border border-white/10">
            <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3.5 sm:mb-4">
              Also Serving Neighboring Central Mississippi Markets:
            </div>
            <div className="flex flex-wrap gap-2">
              {otherCities.map((other) => (
                <Link
                  key={other.slug}
                  href={`/locations/${other.slug}`}
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-amber-400 hover:text-slate-950 border border-white/10 text-xs font-bold text-slate-200 transition-all"
                >
                  {`${other.city}, MS →`}
                </Link>
              ))}
              <Link
                href="/contractors"
                className="px-3.5 sm:px-4 py-2 rounded-xl bg-amber-500/12 hover:bg-amber-400 hover:text-slate-950 border border-amber-500/35 text-xs font-bold text-amber-300 transition-all"
              >
                Contractor Growth Systems →
              </Link>
              <Link
                href="/estimate"
                className="px-3.5 sm:px-4 py-2 rounded-xl bg-emerald-500/12 hover:bg-emerald-400 hover:text-slate-950 border border-emerald-500/35 text-xs font-bold text-emerald-300 transition-all"
              >
                Instant Scope Estimator →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DeferredFooterSections mode="inner" />
    </main>
  );
}
