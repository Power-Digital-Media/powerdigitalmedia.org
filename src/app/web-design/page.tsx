import React from "react";
import {
  Globe,
  Zap,
  BarChart3,
  CheckCircle2,
  PhoneCall,
  MapPin,
  Camera,
  ArrowRight,
  Activity,
  Calculator,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
import MobileSnapCarousel from "@/components/ui/MobileSnapCarousel";
import Image from "next/image";
import Portfolio from "@/components/sections/Portfolio";
import GoogleReviewsSection from "@/components/sections/GoogleReviewsSection";
import SpeedComparisonCard from "@/components/ui/SpeedComparisonCard";
import GrowthScopeEstimator from "@/components/sections/GrowthScopeEstimator";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import QuickHeroLeadCard from "@/components/ui/QuickHeroLeadCard";

const pillars = [
  {
    title: "Fast Mobile Speed",
    subtitle: "Under 2s on Cell Phones",
    description:
      "Hand-coded Next.js 16 architecture with zero bloated templates. Your website opens cleanly on any jobsite or neighborhood cell connection so callers never bounce.",
    features: [
      "Next.js 16 Edge Architecture",
      "98+ PageSpeed Score",
      "Sticky Click-to-Call & Text Bar",
      "Zero Fragile WordPress Plugins",
    ],
    icon: Zap,
  },
  {
    title: "Google Map Pack Authority",
    subtitle: "Top 3 Local Visibility",
    description:
      "Engineered specifically for Jackson and Central Mississippi search rankings. Structured LocalBusiness schema and city hubs help you capture high-intent Map Pack calls.",
    features: [
      "Geo-Targeted Schema Markup",
      "Google Business Profile Sync",
      "Jackson & Metro City Hubs",
      "PinDrop™ Jobsite Proof Ready",
    ],
    icon: Globe,
  },
  {
    title: "Automated Lead Capture",
    subtitle: "Clicks Into Phone Calls",
    description:
      "Connected directly to interactive quote calculators, Capsule CRM pipelines, and automated Transpond follow-ups so you never lose a homeowner or customer inquiry.",
    features: [
      "Direct Capsule CRM Pipeline",
      "Instant SMS/Email Lead Alerts",
      "Zero-Friction Quote & Order Flows",
      "Direct Cell Access to Damein",
    ],
    icon: BarChart3,
  },
];

const faqs = [
  {
    q: "Do you use WordPress for your web design?",
    a: "No. We hand-code custom Next.js websites. That means your site loads in under 2 seconds on mobile networks, never breaks from plugin updates, and gives Google clean structured data.",
  },
  {
    q: "How long does a custom website build take?",
    a: "Most custom contractor and local business builds launch in 7 to 14 business days. Larger custom e-commerce, catering calculators, or multi-portal applications typically launch in 2 to 4 weeks with live staging previews.",
  },
  {
    q: "How do you scope and quote a custom website in Jackson, MS?",
    a: "Every build is custom-scoped case-by-case based on your page count, city hubs, PinCam™ or PinDrop™ crew workflows, and CRM or Square checkout integrations. Request a free 5-minute video audit or hop on a 15-minute call with Damein and you'll get a clear, exact written scope with zero cookie-cutter fluff or surprise fees.",
  },
  {
    q: "Do you provide ongoing local support after launch?",
    a: "Yes. You get direct cell phone access to founder Damein Donald at (601) 446-2393 right here in Jackson, MS—covering hosting, security, updates, Google Map Pack tuning, and field crew support.",
  },
  {
    q: "Can you replace my slow WordPress, Wix, or Squarespace website without losing my domain?",
    a: "Yes. We handle the entire cutover, preserve and redirect every important URL with permanent 301 redirects, and upgrade your mobile speed and Google schema seamlessly.",
  },
];

export default function WebDesignPage() {
  const baseUrl = "https://powerdigitalmedia.org";
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/` },
    { name: "Custom Web Design", url: `${baseUrl}/web-design` },
  ];

  return (
    <main className="relative min-h-screen bg-[#06080f] text-white overflow-x-clip">
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Website Design & Custom Next.js Development in Jackson, MS",
            provider: {
              "@id": "https://powerdigitalmedia.org/#organization",
            },
            description:
              "Custom 0.8s Next.js web design, Google Map Pack optimization, GEO/AEO AI search schema, 0%-fee Square online ordering, and automated CRM lead capture for small businesses, contractors, restaurants, and local brands in Jackson and Central Mississippi.",
            category: "Web Design & Development",
            serviceType: "Website Design",
            areaServed: [
              { "@type": "City", name: "Jackson" },
              { "@type": "City", name: "Madison" },
              { "@type": "City", name: "Flora" },
              { "@type": "City", name: "Ridgeland" },
              { "@type": "City", name: "Brandon" },
              { "@type": "City", name: "Flowood" },
              { "@type": "City", name: "Pearl" },
              { "@type": "City", name: "Clinton" },
              { "@type": "City", name: "Canton" },
              { "@type": "City", name: "Byram" },
            ],
          }),
        }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-[114px] pb-8 sm:pt-36 md:pt-40 md:pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 blueprint-grid opacity-55 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute top-1/4 left-1/4 w-[560px] h-[420px] bg-amber-500/[0.08] rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-10 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 text-left space-y-3 sm:space-y-6">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-amber-500/10 border border-amber-500/35">
                <span className="text-amber-400 text-[11px] sm:text-xs">★★★★★</span>
                <span className="text-amber-300 font-mono font-bold tracking-wider uppercase text-[10px] sm:text-[11px]">
                  <span className="sm:hidden">Custom Next.js Builds • Zero WordPress</span>
                  <span className="hidden sm:inline">Jackson, MS Custom Web Engineering • Zero WordPress</span>
                </span>
              </div>

              <h1 className="text-[1.82rem] sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-white leading-[1.03] sm:leading-[1.02]">
                Custom Websites Engineered to Turn{" "}
                <span className="text-amber-400">Clicks Into Phone Calls.</span>
              </h1>

              <p className="sm:hidden text-[13px] text-slate-300 leading-snug">
                Hand-coded 0.8s Next.js websites wired to Google Map Pack schema, Capsule CRM, and 0%-fee Square checkout.
              </p>
              <p className="hidden sm:block text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Whether you run a multi-truck roofing, HVAC, or excavation crew—or a high-volume local restaurant like{" "}
                <strong className="text-white">T&apos;Beaux&apos;s Seafood</strong>—we hand-code sub-2-second websites wired to Google Maps, CRM follow-up, and direct cell support from Damein Donald.
              </p>

              <div className="grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5">
                <a
                  href="#estimator"
                  className="px-3.5 sm:px-7 py-3.5 sm:py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl hover:brightness-110 transition-all uppercase tracking-wider text-[11px] sm:text-xs shadow-[0_0_30px_rgba(245,158,11,0.3)] text-center flex items-center justify-center"
                >
                  <span className="sm:hidden">Instant Pricing →</span>
                  <span className="hidden sm:inline">See Instant Price &amp; Scope →</span>
                </a>
                <Link
                  href="/free-audit"
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-3.5 sm:py-4 bg-white/[0.05] border border-white/15 text-white rounded-xl font-bold uppercase tracking-wider text-[11px] sm:text-xs hover:bg-white/[0.1] transition-all text-center"
                >
                  <span>Free 5-Min Video</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </Link>
                <a
                  href="tel:6014462393"
                  className="hidden sm:flex items-center justify-center gap-2 px-6 py-4 border border-amber-500/35 bg-amber-500/10 text-amber-300 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-amber-400 hover:text-slate-950 transition-all text-center"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  (601) 446-2393
                </a>
              </div>

              <div className="hidden sm:grid grid-cols-2 gap-3 pt-4 border-t border-white/10 max-w-xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <span className="text-emerald-400 font-bold">✓</span> Sub-2s Mobile Load Speeds
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <span className="text-amber-400 font-bold">✓</span> Google Map Pack 3-Pack Schema
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <span className="text-emerald-400 font-bold">✓</span> 7–14 Business Day Launch
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <span className="text-amber-400 font-bold">✓</span> PinCam™ &amp; PinDrop™ Ready
                </div>
              </div>
            </div>

            {/* Right Column: Clean Integrated Browser Stage (Zero Overlapping Floating Badges) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl obsidian-surface overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-[#070a12] border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <div className="px-3.5 py-1 rounded-full bg-black/50 border border-white/10 text-[11px] font-mono text-slate-300">
                    bornagainroofing.com
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400">98/100</span>
                </div>

                <div className="relative aspect-[16/10] w-full bg-[#06080f] overflow-hidden">
                  <Image
                    src="/portfolio/bornagain-hero-16-10.webp"
                    alt="Born Again Roofing - Custom Next.js Website Built in Jackson, MS"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover object-top"
                    priority
                  />
                </div>

                <div className="p-5 bg-[#080c16] border-t border-white/10 space-y-3">
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-[10px] font-mono uppercase text-slate-400">Mobile Speed</div>
                      <div className="font-black text-emerald-400 mt-0.5">98+ Score (&lt; 2s)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-[10px] font-mono uppercase text-slate-400">Field Proof</div>
                      <div className="font-black text-amber-300 mt-0.5">800+ Live Job Pins</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      Includes PinDrop™ + PinCam™ Add-On Option
                    </span>
                    <Link
                      href="/contractors"
                      className="font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0"
                    >
                      <span>Trade Systems</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hidden lg:block">
        <GoogleReviewsSection variant="compact" />
      </div>

      {/* 20-Second Quick Project Quote & Ballpark Band */}
      <section className="py-10 md:py-16 bg-[#070a13] border-b border-white/10">
        <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-amber-400 block">
                Fast Straight-Talk Pricing • Built in Jackson, MS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Want a Quick Ballpark Without Playing Agency Guessing Games?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Most custom 0.8s Next.js website builds start between{" "}
                <strong className="text-white">$1,000 – $1,500 one-time</strong> (with 100% domain &amp; codebase ownership) and launch in{" "}
                <strong className="text-white">7–14 business days</strong>. Use the{" "}
                <a href="#estimator" className="text-amber-300 underline hover:text-amber-200 font-semibold">
                  Interactive Scope Estimator
                </a>{" "}
                or drop your info here for a personal reply from Damein Donald.
              </p>
              <div className="hidden sm:flex flex-wrap gap-4 pt-1 text-xs font-semibold text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Zero WordPress Plugin Bloat
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Google Map Pack + AI Search Schema
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Direct Cell Support: (601) 446-2393
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <QuickHeroLeadCard
                formSource="web-design-quick-quote"
                eyebrow="20-Second Ballpark Request"
                heading="Ask Damein For a Quick Quote"
                subtext="Pick your build type—get an honest written scope & 5-min teardown of your current Google rankings."
                pills={[
                  "Contractor Website",
                  "Local Business Site",
                  "0%-Fee Restaurant Site",
                  "Redesign + Map Pack SEO",
                ]}
                defaultPill="Local Business Site"
                submitLabel="Send My Website Ballpark"
                businessPlaceholder="Business or Current URL (e.g. Smith HVAC, Ridgeland)"
              />
            </div>
          </div>
        </div>
      </section>

      <Portfolio titleAs="h2" />

      <div className="hidden lg:block">
        <SpeedComparisonCard />
      </div>

      {/* Mobile Launchpad vs Desktop Full Estimator (Eliminates 2,500px mobile repeat while keeping #estimator working) */}
      <div id="estimator" className="scroll-mt-28">
        <section className="lg:hidden py-10 px-4 bg-[#06080f] border-t border-white/10">
          <div className="max-w-xl mx-auto rounded-3xl bg-[#090d18] border border-amber-500/35 p-5 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              Interactive Price &amp; Module Configurator
            </div>
            <h2 className="text-xl font-black uppercase text-white leading-tight">
              Configure Your Custom Website &amp; Monthly Growth Scope
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Toggle your industry, Central MS market, and optional PinCam™ / PinDrop™ / Meta modules to see instant ballpark pricing.
            </p>
            <Link
              href="/estimate"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(245,158,11,0.28)]"
            >
              <span>Open Live Scope Estimator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
        <div className="hidden lg:block">
          <GrowthScopeEstimator defaultIndustryId="local_business_ministry" />
        </div>
      </div>

      {/* 3 Core Engineering Pillars */}
      <section className="py-12 md:py-28 relative bg-[#080c16] border-t border-white/10">
        <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-7 sm:mb-14">
            <span className="text-amber-400 font-mono font-bold tracking-[0.22em] sm:tracking-[0.25em] uppercase text-[10px] sm:text-xs mb-2 sm:mb-3 block">
              The Power Digital Standard
            </span>
            <h2 className="text-2xl sm:text-5xl font-black uppercase tracking-tight text-white mb-2 sm:mb-4">
              Built to Rank Fast &amp; Convert Mobile Callers.
            </h2>
            <p className="hidden sm:block text-slate-300 text-base">
              Modern engineering paired with local SEO and automated lead rescue so your website pays for itself.
            </p>
          </div>

          <MobileSnapCarousel
            itemCount={pillars.length}
            ariaLabel="Three web engineering pillars"
            desktopGridClass="md:grid md:grid-cols-3 gap-6"
            itemLabel="pillars"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 sm:p-8 rounded-3xl bg-[#06080f] border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5 sm:mb-6">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/12 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 px-2.5 sm:px-3 py-1 rounded-full border border-amber-500/25 whitespace-nowrap">
                        {pillar.subtitle}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black uppercase text-white mb-2.5 sm:mb-3">{pillar.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5 sm:mb-6">
                      {pillar.description}
                    </p>
                    <ul className="space-y-2.5">
                      {pillar.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-center gap-2.5 text-xs text-slate-200 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </MobileSnapCarousel>

          {/* Proprietary Field App Callout Bar */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#090d18] border border-amber-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" /> Running Trucks or Service Crews?
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
                Add PinCam™ + PinDrop™ Directly Into Your Website Build.
              </h3>
              <p className="text-sm text-slate-300">
                Give your crew Ghost before/after cameras, homeowner PDF reports, live neighborhood website pins, and 15-minute SMS review automation with zero per-seat SaaS tax.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/pincam"
                className="px-5 py-3.5 rounded-xl bg-amber-400 text-slate-950 font-black uppercase tracking-wider text-xs hover:bg-amber-300 transition-colors"
              >
                Explore PinCam™ →
              </Link>
              <Link
                href="/pindrop"
                className="px-5 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-bold uppercase tracking-wider text-xs transition-colors"
              >
                Explore PinDrop™ →
              </Link>
            </div>
          </div>

          {/* 24/7 PDM Site Intelligence Watchtower Callout Bar */}
          <div className="mt-5 p-6 sm:p-8 rounded-3xl bg-[#070b14] border border-cyan-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" /> Included In Ongoing Managed Hosting &amp; Care
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
                Protected 24/7 by PDM Site Intelligence™.
              </h3>
              <p className="text-sm text-slate-300">
                Every managed Power Digital website is wired into our in-house watchtower—running 5-minute HTTP &amp; SSL probes, broken-link crawls, cellular Core Web Vitals checks, and 2-stage staged updates so your quote forms never silently break.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/site-intelligence"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-200 font-bold uppercase tracking-wider text-xs transition-colors"
              >
                <span>See Inside Watchtower</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Plain-English FAQs */}
      <section className="py-12 md:py-24 bg-[#06080f] border-t border-white/10">
        <div className="container px-4 sm:px-6 mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-amber-400 font-mono font-bold tracking-[0.22em] sm:tracking-[0.25em] uppercase text-[10px] sm:text-xs mb-2 sm:mb-3 block">
              Straight Answers
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Custom Web Design FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={faq.q}
                open={idx === 0}
                className="group rounded-2xl bg-[#090d18] border border-white/10 open:border-amber-500/35 overflow-hidden transition-colors"
              >
                <summary className="list-none cursor-pointer p-4 sm:p-6 flex items-center justify-between gap-3">
                  <h3 className="text-sm sm:text-lg font-bold text-white text-left">{faq.q}</h3>
                  <ChevronDown className="w-4 h-4 text-amber-400 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <DeferredFooterSections mode="inner" />
    </main>
  );
}
