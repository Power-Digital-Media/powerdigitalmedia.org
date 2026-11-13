import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
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

  const title = `Web Design & Local SEO in ${loc.city}, MS | Contractor & Business Growth`;
  const description = `Custom sub-2s websites, Google Map Pack SEO, and PinCam™ + PinDrop™ contractor apps in ${loc.city}, MS (${loc.zipCodes.join(", ")}). Built locally by Power Digital Media. Call (601) 446-2393.`;

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
          { name: "Service Areas", url: `${baseUrl}/local-seo` },
          { name: `${loc.city}, MS`, url: `${baseUrl}/locations/${loc.slug}` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
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
              },
              {
                "@type": "FAQPage",
                mainEntity: loc.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.a,
                  },
                })),
              },
            ],
          }),
        }}
      />

      <Navbar />

      {/* =====================================================================
          CITY HERO SECTION
      ====================================================================== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 blueprint-grid opacity-55 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute top-12 left-1/3 w-[640px] h-[380px] bg-amber-500/[0.08] rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/35 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {loc.city}, Mississippi • {loc.county} • {loc.zipCodes.join(" / ")}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.0] text-white">
              {loc.city}, MS{" "}
              <span className="text-amber-400">Web Design, Google Maps SEO &amp; Contractor Systems.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {loc.marketSummary}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/free-audit"
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs text-center shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:brightness-110 transition-all"
              >
                Get Free {loc.city} Rank Video →
              </Link>
              <a
                href="tel:6014462393"
                className="px-6 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-bold uppercase tracking-wider text-xs text-center flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                (601) 446-2393
              </a>
            </div>
          </div>

          {/* Right: Geo Telemetry & Local Case Study Card */}
          <div className="lg:col-span-5">
            <div className="obsidian-surface rounded-3xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                    {loc.distanceFromHQ}
                  </span>
                  <h2 className="text-lg font-black uppercase text-white mt-0.5">
                    {loc.city} Market Telemetry
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {loc.coordinates.display}
                </span>
              </div>

              <div className="rounded-2xl bg-[#070a12] border border-amber-500/30 p-5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-amber-300 font-bold uppercase">
                    {loc.featuredProof.category}
                  </span>
                  <span className="text-emerald-400 font-bold">LIVE PROOF</span>
                </div>
                <h3 className="text-lg font-black text-white">
                  {loc.featuredProof.clientName}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {loc.featuredProof.summary}
                </p>
                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-300 font-bold">
                    {loc.featuredProof.metric}
                  </span>
                  <Link
                    href={loc.featuredProof.portfolioHref}
                    className="font-bold text-white hover:text-amber-300 transition-colors"
                  >
                    Inspect Case Study →
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <Link
                  href="/pincam"
                  className="p-3 rounded-xl bg-white/[0.04] hover:bg-amber-500/15 border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between font-bold text-white"
                >
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-amber-400" /> PinCam™
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </Link>
                <Link
                  href="/pindrop"
                  className="p-3 rounded-xl bg-white/[0.04] hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-400/40 transition-all flex items-center justify-between font-bold text-white"
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> PinDrop™
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoogleReviewsSection variant="compact" />

      {/* =====================================================================
          NEIGHBORHOODS, CORRIDORS & TRADES SERVED IN THIS CITY
      ====================================================================== */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Neighborhoods */}
          <div className="rounded-3xl bg-[#090d18] border border-white/10 p-7 space-y-4">
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
          <div className="rounded-3xl bg-[#090d18] border border-white/10 p-7 space-y-4">
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
          <div className="rounded-3xl bg-[#090d18] border border-white/10 p-7 space-y-4">
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
              Industries in {loc.city} seeing the fastest ROI from sub-2-second Next.js builds, automated SMS lead rescue, and field proof:
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
        </div>
      </section>

      {/* =====================================================================
          CITY-SPECIFIC FAQS + NEARBY MARKETS
      ====================================================================== */}
      <section className="py-20 px-4 sm:px-6 bg-[#080c16] border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-[0.25em] font-bold block mb-2">
              Local Questions Answered
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white">
              {loc.city}, MS Web Design &amp; SEO FAQs
            </h2>
          </div>

          <div className="space-y-4 mb-14">
            {loc.faqs.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl bg-[#06080f] border border-white/10 space-y-2"
              >
                <h3 className="text-base sm:text-lg font-bold text-white">{faq.q}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Nearby Central MS Markets Cross-Links */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#06080f] border border-white/10">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
              Also Serving Neighboring Central Mississippi Markets:
            </div>
            <div className="flex flex-wrap gap-2.5">
              {otherCities.map((other) => (
                <Link
                  key={other.slug}
                  href={`/locations/${other.slug}`}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-amber-400 hover:text-slate-950 border border-white/10 text-xs font-bold text-slate-200 transition-all"
                >
                  {other.city}, MS →
                </Link>
              ))}
              <Link
                href="/contractors"
                className="px-4 py-2 rounded-xl bg-amber-500/12 hover:bg-amber-400 hover:text-slate-950 border border-amber-500/35 text-xs font-bold text-amber-300 transition-all"
              >
                Contractor Growth Systems →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DeferredFooterSections />
    </main>
  );
}
