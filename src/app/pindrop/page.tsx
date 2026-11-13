import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import PinDropDemoExplorer from "@/components/pindrop/PinDropDemoExplorer";
import {
  MapPin,
  CheckCircle2,
  ArrowRight,
  Camera,
  MessageSquare,
  Globe,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PDM PinDrop™ Contractor Local SEO & Google Map Engine | Power Digital Media",
  description:
    "Turn every completed job into verified GPS website pins, neighborhood Google ranking pages, Google Business Profile posts, and automated 5-star SMS reviews. Built in Jackson, MS for contractors.",
  alternates: {
    canonical: "https://powerdigitalmedia.org/pindrop",
  },
  openGraph: {
    title: "PDM PinDrop™ Field-to-Google Ranking Engine | Power Digital Media",
    description:
      "Your crew checks in from the truck in 30 seconds. PinDrop™ publishes neighborhood SEO pages, syncs Google Maps, and texts homeowners for 5-star reviews automatically.",
    url: "https://powerdigitalmedia.org/pindrop",
    images: ["/pindrop/bar-live-pins.jpg"],
  },
};

export default function PinDropPage() {
  const baseUrl = "https://powerdigitalmedia.org";

  return (
    <main className="relative flex flex-col min-h-screen bg-[#06080f] text-white">
      <BreadcrumbSchema
        items={[
          { name: "Field Apps", url: `${baseUrl}/pindrop` },
          { name: "PinDrop™ SEO Engine", url: `${baseUrl}/pindrop` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "PinDrop™ Field-to-Google Local SEO & Review Engine",
            applicationCategory: "BusinessApplication",
            operatingSystem: "iOS, Android, Web",
            creator: {
              "@id": "https://powerdigitalmedia.org/#organization",
            },
            description:
              "Proprietary contractor field check-in and local SEO automation software that turns completed jobs into GPS-verified project pages, live neighborhood map pins, Google Business Profile updates, and 15-minute homeowner SMS review requests.",
          }),
        }}
      />

      <Navbar />

      {/* =====================================================================
          HERO SECTION
      ====================================================================== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 blueprint-grid opacity-55 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 w-[820px] h-[420px] bg-emerald-500/[0.08] rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 text-emerald-300 text-xs font-mono font-bold uppercase tracking-widest mb-6">
            <MapPin className="w-4 h-4 text-emerald-400" />
            Proprietary Field-to-Google Software • Built in Jackson, MS
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.98] max-w-5xl mx-auto mb-6">
            Turn Every Finished Job Into{" "}
            <span className="text-amber-400">
              Neighborhood Google Rankings &amp; 5-Star Reviews.
            </span>
          </h1>

          <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-xl leading-relaxed mb-9">
            Most contractors finish a great job in Madison, Brandon, or Flowood and drive away—and Google never knows they were there. With{" "}
            <strong className="text-white">PinDrop™</strong>, one 30-second check-in from the truck publishes a neighborhood SEO page, drops a verified map pin on your website, updates your Google Business Profile, and texts the homeowner for a 5-star review.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <a
              href="#interactive-engine"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs shadow-[0_0_32px_rgba(245,158,11,0.32)] hover:brightness-110 transition-all"
            >
              Test-Drive Real PinDrop™ App ↓
            </a>
            <Link
              href="/book"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-bold uppercase tracking-wider text-xs transition-all"
            >
              Start 14-Day Crew Trial / Demo
            </Link>
            <a
              href="https://bornagainroofing.com/pins/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl border border-amber-500/35 bg-amber-500/10 text-amber-300 font-bold uppercase tracking-wider text-xs hover:bg-amber-400 hover:text-slate-950 transition-all flex items-center justify-center gap-2"
            >
              <MapPin className="w-3.5 h-3.5" />
              See 99+ Live Pins (BAR) ↗
            </a>
          </div>

          {/* Telemetry Proof Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto text-left">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#090d18] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">99+ Pins</div>
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                Live on Born Again Roofing
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#090d18] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">&lt; 30 Sec</div>
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                Truck Check-In Time
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#090d18] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">15 Min</div>
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                Auto-SMS Review Dispatch
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#090d18] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 mb-1">Crew-Wide</div>
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                No Per-Tech Seat Tax
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE 5-STAGE PINDROP SANDBOX
      ====================================================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-[0.25em] font-bold block mb-3">
            Authentic Live Product Preview
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Explore the Real PDM PinDrop™ App
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto mt-4 text-sm sm:text-base">
            Filter the live Central Mississippi satellite map, switch to the Crew Truck Portal to drop a live test pin onto the map, and inspect the auto-generated Answer Engine SEO page.
          </p>
        </div>

        <PinDropDemoExplorer />
      </section>

      {/* =====================================================================
          WHAT'S UNDER THE HOOD (AUTHENTIC SAAS ENGINE MODULES)
      ====================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-y border-white/10 bg-[#080c16]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-[0.25em] font-bold block mb-3">
              Engineered Specifically for Service Pros
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Six Automated Modules Running Behind Every Check-In.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Traditional SEO agencies write generic blog posts nobody reads. PinDrop™ turns your actual daily crew activity into verifiable local proof Google rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Camera,
                badge: "01 • Field Portal",
                title: "Mobile Check-In & PinCam™ Sync",
                desc: "Works from any iPhone or Android in the field—or receives Ghost-aligned before/after photos and job notes straight from PinCam™ in one tap.",
              },
              {
                icon: Globe,
                badge: "02 • Dynamic SEO Pages",
                title: "Auto-Built Project & City Hubs",
                desc: "Every check-in generates an indexable /projects/[slug] page and feeds your /areas-we-service/[city] hubs with LocalBusiness geo-schema.",
              },
              {
                icon: Building2,
                badge: "03 • Google Maps OAuth",
                title: "Google Business Profile Sync",
                desc: "Automatically publishes verified project photos and service updates to your Google Business Profile so your Map Pack listing stays active weekly.",
              },
              {
                icon: MapPin,
                badge: "04 • Privacy-Safe Map Radar",
                title: "Interactive Neighborhood Map",
                desc: "Dual geocoding verifies exact work locations while fuzzing public pins to the street/subdivision level to protect homeowner privacy.",
              },
              {
                icon: MessageSquare,
                badge: "05 • Review Automation",
                title: "15-Minute SMS Review Trigger",
                desc: "Sends a polite, branded text message with a direct 1-tap Google review link right after completion while homeowner excitement is highest.",
              },
              {
                icon: Users,
                badge: "06 • Crew Accountability",
                title: "Team Attribution & Leaderboard",
                desc: "Assigns check-ins and earned 5-star reviews to specific crew leads so owners can see who is documenting jobs and driving reputation.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl bg-[#06080f] border border-white/10 p-7 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          LIVE MISSISSIPPI PRODUCTION CASE STUDIES + PINCAM BRIDGE
      ====================================================================== */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-[0.25em] font-bold block mb-2">
              Proven in Central Mississippi
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Live on Real Contractor Websites Today
            </h2>
          </div>
          <Link
            href="/our-work"
            className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-2 transition-colors"
          >
            View All Live Builds <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="rounded-3xl bg-[#090d18] border border-white/10 p-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-500/25">
                  Roofing &amp; Storm Restoration
                </span>
                <span className="text-xs text-slate-400 font-mono">Brandon &amp; Metro MS</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
                Born Again Roofing &amp; Remodeling
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Replaced a sluggish legacy site with a custom Next.js build + PinDrop™. Their crews have logged{" "}
                <strong className="text-white">99+ verified roofing and remodeling pins</strong> across Brandon, Madison, Ridgeland, Clinton, and Jackson.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-mono font-bold">
                99+ Live Job Pins
              </span>
              <a
                href="https://bornagainroofing.com/pins/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 font-bold uppercase tracking-wider hover:text-white transition-colors"
              >
                Inspect Live Pin Map →
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-[#090d18] border border-white/10 p-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-500/25">
                  Excavation &amp; Land Clearing
                </span>
                <span className="text-xs text-slate-400 font-mono">Bentonia &amp; Central MS</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
                Geaux Pro Outdoors (MS Dirt)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Showcases heavy equipment earthmoving, pond construction, laser-graded house pads, and commercial land clearing across Bentonia, Yazoo City, and Madison County.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-mono font-bold">
                Heavy Civil Showcase
              </span>
              <a
                href="https://msdirt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 font-bold uppercase tracking-wider hover:text-white transition-colors"
              >
                Inspect Live Site →
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-[#090d18] border border-white/10 p-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-500/25">
                  Lawn Care &amp; Property Maintenance
                </span>
                <span className="text-xs text-slate-400 font-mono">Flora &amp; Madison County</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
                Lungrin&apos;s Lawncare LLC
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Built for recurring residential &amp; commercial turf maintenance, seasonal cleanups, and pine straw installs—turning neighborhood route density into local search dominance.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-mono font-bold">
                Route-Density SEO
              </span>
              <a
                href="https://lungrinslawncare.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 font-bold uppercase tracking-wider hover:text-white transition-colors"
              >
                Inspect Live Site →
              </a>
            </div>
          </div>
        </div>

        {/* PinCam Ecosystem Bridge Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/12 via-[#090d18] to-emerald-500/10 border border-amber-500/30 p-7 sm:p-9 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
              <Camera className="w-4 h-4 text-amber-400" /> Better Together: PinCam™ + PinDrop™
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
              Capture Proof in PinCam™. Rank &amp; Collect Reviews in PinDrop™.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Need 1:1 Ghost-aligned before/after photos, roof/slab damage markups, dual-cam walkthrough videos, and instant PDF homeowner reports before publishing to your map? Explore our companion field camera app.
            </p>
          </div>
          <Link
            href="/pincam"
            className="shrink-0 px-7 py-4 rounded-xl bg-white/[0.07] hover:bg-amber-400 hover:text-slate-950 border border-amber-400/40 text-white font-black uppercase tracking-wider text-xs transition-all flex items-center gap-2"
          >
            <span>Explore PinCam™ Camera App</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* =====================================================================
          HYBRID PACKAGING MODEL (BUNDLED WEBSITE ADD-ON + STANDALONE INTEGRATION)
      ====================================================================== */}
      <section className="pb-24 pt-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 rounded-3xl bg-[#090d18] border border-white/10 p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block mb-2">
                Why Agencies Can&apos;t Match This
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mb-6">
                Real Jobsite Proof Beats Generic Monthly &ldquo;SEO Retainers&rdquo; Every Time.
              </h2>

              <div className="space-y-4 text-sm">
                <div className="p-4 rounded-2xl bg-red-500/[0.06] border border-red-500/20 space-y-2">
                  <div className="font-bold text-red-300 flex items-center gap-2">
                    <XCircle className="w-4 h-4 shrink-0" />
                    Old-School Marketing Retainers
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Charges bloated monthly retainers to post stock photos and AI-spun blog articles while your real completed jobs in Madison and Brandon never touch your website or Google Maps.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/[0.07] border border-emerald-500/25 space-y-2">
                  <div className="font-bold text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    PinDrop™ Automated Field Authority
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Turns every real roof, unit install, pad grade, or service call into permanent neighborhood ranking equity, live map trust, and automated 5-star Google reviews.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Want to see where you rank on Google Maps right now?</span>
              <Link href="/free-audit" className="font-bold text-amber-400 hover:text-amber-300">
                Get Free Rank Video →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl obsidian-surface border-amber-500/35 p-7 sm:p-9 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Flexible Deployment Options
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
                How to Put PinDrop™ to Work for Your Crew
              </h2>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-amber-500/[0.08] border border-amber-400/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-extrabold uppercase text-amber-300">
                      Option 1 • Recommended
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                      Turnkey System
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white">
                    Included Add-On With a Contractor Growth Website
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    We engineer your sub-2-second custom website with native PinDrop™ + PinCam™, Google Business Profile sync, and 2-minute SMS lead rescue—all under one predictable monthly partner plan.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-slate-400">
                    Option 2 • Keep Your Current Domain
                  </span>
                  <h3 className="text-lg font-black text-white">
                    Guided Standalone Map &amp; Review Integration
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Already invested in a website you like? Book a 15-minute call with Damein and we&apos;ll embed the live PinDrop™ neighborhood map, project feed, and automated SMS review engine onto your existing site.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/book"
                className="flex-1 py-4 px-5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_0_24px_rgba(245,158,11,0.3)]"
              >
                <span>Book 15-Min Live Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/free-audit"
                className="py-4 px-5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Free Rank Check
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DeferredFooterSections />
    </main>
  );
}
