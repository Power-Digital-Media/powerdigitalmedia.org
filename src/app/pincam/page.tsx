import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import PinCamInteractiveStage from "@/components/pincam/PinCamInteractiveStage";
import {
  Camera,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Phone,
  ShieldCheck,
  WifiOff,
  Ruler,
  FileText,
  Video,
  MapPin,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PinCam™ Contractor Jobsite Camera & Proof App | Power Digital Media",
  description:
    "Interactive showcase of PinCam™ by Power Digital Media: Ghost Camera before/after alignment, jobsite damage markups, dual-cam PiP walkthroughs, instant homeowner PDF reports, and 1-tap Google SEO sync.",
  alternates: {
    canonical: "https://powerdigitalmedia.org/pincam",
  },
  openGraph: {
    title: "PinCam™ Jobsite Camera & Field Proof App | Built in Jackson, MS",
    description:
      "Capture aligned before/after job photos, draw measurements & arrows, send instant homeowner PDF reports, and publish directly to Google Maps with PinDrop™.",
    url: "https://powerdigitalmedia.org/pincam",
    images: ["/pincam/roof-after.jpg"],
  },
};

export default function PinCamPage() {
  const baseUrl = "https://powerdigitalmedia.org";

  return (
    <main className="relative flex flex-col min-h-screen bg-[#06080f] text-white">
      <BreadcrumbSchema
        items={[
          { name: "Field Apps", url: `${baseUrl}/pincam` },
          { name: "PinCam™ Camera Suite", url: `${baseUrl}/pincam` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "PinCam™ Contractor Jobsite Camera & Proof Studio",
            applicationCategory: "BusinessApplication",
            operatingSystem: "iOS, Android, Web",
            creator: {
              "@id": "https://powerdigitalmedia.org/#organization",
            },
            description:
              "Contractor field camera and documentation suite featuring Ghost Camera Photo Match, non-destructive measurements and arrows, dual-camera PiP walkthroughs, GPS timestamp watermarks, instant homeowner PDF reports, and direct PinDrop™ local SEO publishing.",
          }),
        }}
      />

      <Navbar />

      {/* =====================================================================
          HERO SECTION
      ====================================================================== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 blueprint-grid opacity-55 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[820px] h-[420px] bg-amber-500/[0.09] rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="container px-4 sm:px-6 mx-auto max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/35 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest mb-6">
            <Camera className="w-4 h-4 text-amber-400" />
            Proprietary Contractor Field Software • Built in Jackson, MS
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.98] max-w-5xl mx-auto mb-6">
            Jobsite Proof That{" "}
            <span className="text-amber-400">Closes Claims, Protects Crews &amp; Ranks You on Google.</span>
          </h1>

          <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-xl leading-relaxed mb-9">
            Meet <strong className="text-white">PinCam™</strong>—the contractor camera &amp; documentation app engineered specifically to plug straight into your website and Google Business Profile. Align 1:1 before/after shots, mark up damage, send instant PDF customer reports, and turn every job into new phone calls.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <a
              href="#interactive-app"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs shadow-[0_0_32px_rgba(245,158,11,0.32)] hover:brightness-110 transition-all"
            >
              Test-Drive Interactive App Below ↓
            </a>
            <Link
              href="/book"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-bold uppercase tracking-wider text-xs transition-all"
            >
              Book 15-Min Crew Demo
            </Link>
            <a
              href="tel:6014462393"
              className="w-full sm:w-auto px-6 py-4 rounded-xl border border-amber-500/35 bg-amber-500/10 text-amber-300 font-bold uppercase tracking-wider text-xs hover:bg-amber-400 hover:text-slate-950 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              (601) 446-2393
            </a>
          </div>

          {/* Key Spec Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            {[
              { top: "Ghost Lens", sub: "1:1 Before/After Alignment" },
              { top: "0 Seat Fees", sub: "No Per-Tech Price Gouging" },
              { top: "Offline Safe", sub: "Rural Jobsite Auto-Recovery" },
              { top: "PinDrop™ Wired", sub: "1-Tap Website & Google Sync" },
            ].map((stat) => (
              <div key={stat.top} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-amber-400">{stat.top}</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          HANDS-ON INTERACTIVE APP STAGE
      ====================================================================== */}
      <section id="interactive-app" className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-10">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest block mb-2">
            ⚡ Hands-On App Preview
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Click Through All 5 Real PinCam™ Modes.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Drag the Ghost Camera opacity slider, toggle measurement &amp; inspection layers, switch PiP camera corners, and inspect a live homeowner PDF report.
          </p>
        </div>

        <PinCamInteractiveStage />
      </section>

      {/* =====================================================================
          6 CORE CAPABILITIES BUILT FOR REAL FIELD CREWS
      ====================================================================== */}
      <section className="py-20 md:py-24 bg-[#05070d] border-y border-white/10">
        <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
          <div className="max-w-3xl mb-14">
            <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest block mb-2">
              Engineered for Roofers, HVAC, Plumbing, Dirt Work &amp; Remodelers
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Everything Your Crew Needs on Site. Nothing Clunky.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Camera,
                title: "Ghost Camera Photo Match",
                desc: "Floats the 'Before' photo transparently over your live camera lens so any tech captures a pixel-matched 'After' angle without guessing.",
              },
              {
                icon: Ruler,
                title: "Measurements, Arrows & 20 Badge Styles",
                desc: "Highlight hail bruising, cracked heat exchangers, pad dimensions, and code upgrades—saved non-destructively over the clean original photo.",
              },
              {
                icon: Video,
                title: "Dual-Cam PiP Narrated Walkthroughs",
                desc: "Film the jobsite while displaying your face or the 'Before' photo in a corner window with branded company lower-thirds and auto-captions.",
              },
              {
                icon: FileText,
                title: "Instant PDF Reports & Branded Invoices",
                desc: "Generate clean inspection & completion reports with a shareable link you can text to homeowners, landlords, or insurance adjusters in seconds.",
              },
              {
                icon: WifiOff,
                title: "Zero-Signal Rural Auto-Recovery",
                desc: "Working out in Yazoo County or rural Rankin County with 0 bars? Every photo and video auto-saves locally on the device and syncs once back on signal.",
              },
              {
                icon: MapPin,
                title: "Direct Bridge to PinDrop™ & Social Studio",
                desc: "Publish finished jobs straight to your website's live map, spin up a Google-ranked project page, and auto-build 9:16 social reels in one tap.",
              },
            ].map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="p-7 rounded-3xl obsidian-surface space-y-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black uppercase text-white">{feat.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          COMPARISON + HYBRID ACCESS MODEL (BUNDLED ADD-ON + GUIDED DEMO)
      ====================================================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Why It Beats Per-Seat SaaS */}
          <div className="lg:col-span-6 rounded-3xl bg-[#090d18] border border-white/10 p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block mb-2">
                Why Contractors Make the Switch
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mb-6">
                Stop Paying Per-Tech Seat Fees for Photos That Never Bring You Leads.
              </h2>

              <div className="space-y-4 text-sm">
                <div className="p-4 rounded-2xl bg-red-500/[0.06] border border-red-500/20 space-y-2">
                  <div className="font-bold text-red-300 flex items-center gap-2">
                    <XCircle className="w-4 h-4 shrink-0" />
                    Typical Big-Box Field Photo Apps
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Charges steep per-user seat fees every month (penalizing you as your crew grows), locks photos in private folders Google can&apos;t index, and still leaves you paying another agency for a disconnected website.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/[0.07] border border-emerald-500/25 space-y-2">
                  <div className="font-bold text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Power Digital Website + PinCam™ + PinDrop™
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Flat, predictable crew access wired directly into your Next.js website, Google Business Profile, and 5-star SMS review pipeline—engineered and supported locally by Damein Donald.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span>Want to see how PinDrop™ handles the SEO half?</span>
              <Link href="/pindrop" className="font-bold text-amber-400 hover:text-amber-300 shrink-0">
                Explore PinDrop™ →
              </Link>
            </div>
          </div>

          {/* Right: Hybrid Packaging Offer */}
          <div className="lg:col-span-6 rounded-3xl obsidian-surface border-amber-500/35 p-7 sm:p-9 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" /> How to Get PinCam™ for Your Crew
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
                Two Ways to Deploy PinCam™ + PinDrop™
              </h2>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-amber-500/[0.08] border border-amber-400/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-extrabold uppercase text-amber-300">
                      Option 1 • Most Popular
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                      Best ROI
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white">
                    Bundled Add-On With a Contractor Growth Website
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    We build your fast custom contractor website, wire PinCam™ + PinDrop™ directly to your domain &amp; Google Map Pack, onboard your techs, and manage everything under one simple monthly growth plan.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-slate-400">
                    Option 2 • Already Happy With Your Website?
                  </span>
                  <h3 className="text-lg font-black text-white">
                    Guided Standalone Integration &amp; Crew Onboarding
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Already have a solid site? Book a 15-minute live walkthrough and we&apos;ll configure a branded PinCam™ + PinDrop™ workspace and embeddable live map widget for your existing domain.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/book"
                className="flex-1 py-4 px-5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_0_24px_rgba(245,158,11,0.3)]"
              >
                <span>Schedule 15-Min Live Demo</span>
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
