import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Gauge,
  Lock,
  PhoneCall,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteIntelligenceInteractiveStage from "@/components/site-intelligence/SiteIntelligenceInteractiveStage";

export const metadata: Metadata = {
  title:
    "PDM Site Intelligence™ | 24/7 Website Monitoring, Speed & SEO Watchtower | Power Digital Media",
  description:
    "Proprietary 24/7 website uptime, SSL expiry, CrUX cellular speed, Google Search Console growth, and 2-stage human-verified AI diagnostics built in Jackson, MS by Power Digital Media.",
  alternates: {
    canonical: "https://powerdigitalmedia.org/site-intelligence",
  },
  openGraph: {
    title: "PDM Site Intelligence™ — 24/7 Website & SEO Watchtower",
    description:
      "Every managed Power Digital website is protected around the clock by multi-probe uptime checks, CrUX cellular speed tracking, Search Console telemetry, and staged human-approved fixes.",
    url: "https://powerdigitalmedia.org/site-intelligence",
    type: "website",
  },
};

const WATCHTOWER_FAQS = [
  {
    q: "Do I have to log in and learn another complicated dashboard?",
    a: "No. PDM Site Intelligence™ is our proprietary 24/7 engineering watchtower that monitors your website, SSL certificates, broken links, cellular speed, and Google Search Console rankings behind the scenes. We catch and fix issues for you automatically—and send clear plain-English growth snapshots whenever you want them.",
  },
  {
    q: "How is this different from generic 'monthly website maintenance'?",
    a: "Most agencies charge a monthly maintenance retainer and never look at your website until a customer tells you your quote form is broken. PDM Site Intelligence™ probes your live site every 5 minutes, checks SSL expiration daily, audits every internal link, tracks real Chrome cellular speed (CrUX), and monitors your Google Search Console clicks and rankings.",
  },
  {
    q: "Does AI ever make automatic changes to my live business website?",
    a: "Never. Our Phase 4 Optimization Queue enforces a strict 2-Stage Human Approval protocol: every proposed SEO or speed improvement is built onto an isolated staging preview first, verified by Damein Donald in Jackson, MS, and backed by a 1-click pre-change rollback snapshot.",
  },
  {
    q: "How do I get PDM Site Intelligence™ on my website?",
    a: "PDM Site Intelligence™ comes wired into our custom-scoped Managed Hosting, Local SEO, and Growth Retainer engagements—and it's the exact diagnostic engine we use when recording your Free 5-Minute Rank & Website Video Audit.",
  },
];

export default function SiteIntelligencePage() {
  const baseUrl = "https://powerdigitalmedia.org";

  return (
    <main className="min-h-screen bg-[#06080f] text-white flex flex-col overflow-x-clip">
      <BreadcrumbSchema
        items={[
          { name: "Services", url: `${baseUrl}/web-design` },
          { name: "PDM Site Intelligence™", url: `${baseUrl}/site-intelligence` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "PDM Site Intelligence™ Watchtower & SEO Telemetry Platform",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, Cloud",
            creator: {
              "@id": "https://powerdigitalmedia.org/#organization",
            },
            description:
              "Proprietary multi-client website monitoring and growth intelligence platform featuring 5-minute multi-probe HTTP & SSL checks, broken-link crawls, Chrome UX Report (CrUX) cellular telemetry, Google Search Console & GA4 growth snapshots, and 2-stage human-approved optimization workflows.",
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
          className="absolute top-16 left-1/2 -translate-x-1/2 w-[820px] h-[420px] bg-cyan-500/[0.08] rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/35 bg-cyan-500/10 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest mb-6">
            <Activity className="w-4 h-4 text-cyan-400" />
            Proprietary 24/7 Engineering Watchtower • Built in Jackson, MS
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.98] max-w-5xl mx-auto mb-6">
            We Know If Your Website Slows Down or Drops Rank{" "}
            <span className="text-amber-400">Before Your Customers Ever Do.</span>
          </h1>

          <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-xl leading-relaxed mb-9">
            Other agencies launch your website and forget it exists until something breaks. Every managed client build at Power Digital Media is wired into{" "}
            <strong className="text-white">PDM Site Intelligence™</strong>—our in-house watchtower running 5-minute uptime &amp; SSL probes, broken-link crawls, cellular Core Web Vitals checks, and live Google Search Console growth tracking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <a
              href="#watchtower-console"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs shadow-[0_0_32px_rgba(245,158,11,0.32)] hover:brightness-110 transition-all"
            >
              Explore Live Watchtower Console ↓
            </a>
            <Link
              href="/free-audit"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-bold uppercase tracking-wider text-xs transition-all"
            >
              Scan My Current Website Free →
            </Link>
            <a
              href="tel:6014462393"
              className="w-full sm:w-auto px-6 py-4 rounded-xl border border-amber-500/35 bg-amber-500/10 text-amber-300 font-bold uppercase tracking-wider text-xs hover:bg-amber-400 hover:text-slate-950 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              (601) 446-2393
            </a>
          </div>

          {/* Telemetry Proof Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto text-left">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#090d18] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 mb-1">Every 5m</div>
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                HTTP, Latency &amp; SSL Probes
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#090d18] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">CrUX + GSC</div>
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                Real Google Speed &amp; Clicks
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#090d18] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">2-Stage</div>
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                Human-Approved Fixes Only
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#090d18] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">Zero Work</div>
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                Managed For You In-House
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          AUTHENTIC INTERACTIVE WATCHTOWER CONSOLE
      ====================================================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.25em] font-bold block mb-3">
            Authentic In-House Platform Preview
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            See Inside <span className="text-amber-400">PDM Site Intelligence™.</span>
          </h2>
          <p className="text-slate-300 text-base">
            Switch between all 4 live telemetry tabs below—run a real-time fleet check, inspect 28-day Google Search Console gains, verify CrUX cellular speed, and test our 2-stage staged approval workflow.
          </p>
        </div>

        <SiteIntelligenceInteractiveStage />
      </section>

      {/* =====================================================================
          WHY TYPICAL AGENCY HOSTING FAILS VS. PDM SITE INTELLIGENCE
      ====================================================================== */}
      <section className="py-20 px-4 sm:px-6 bg-[#080c16] border-y border-white/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-[0.25em] font-bold block">
              Proactive Engineering vs. Guesswork
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              Stop Paying Monthly Hosting Fees For Someone To Ignore Your Site.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A broken SSL certificate, silent 404 page, or sudden mobile speed drop during storm or crawfish season can quietly cost dozens of calls before you notice. We built{" "}
              <strong className="text-white">PDM Site Intelligence™</strong> so every client domain under our care is continuously verified with zero invented vanity numbers.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/free-audit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all"
              >
                <span>Run Diagnostic On My Site</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Book 15-Min Scope Call</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-red-500/[0.05] border border-red-500/20 space-y-3">
              <div className="flex items-center gap-2 text-red-300 font-bold text-sm uppercase">
                <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                Typical WordPress Agency &ldquo;Care&rdquo;
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <li>• Auto-updates 30 plugins on Friday and breaks your mobile quote form all weekend</li>
                <li>• Sends generic automated PDF fluff with fake &ldquo;SEO scores&rdquo; disconnected from calls</li>
                <li>• Never notices expired SSL certificates, broken links, or Google indexing drops</li>
                <li>• Takes 4 days and a support ticket just to answer a simple question</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-500/[0.06] border border-emerald-500/25 space-y-3">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm uppercase">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                PDM Site Intelligence™ Care
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200 leading-relaxed">
                <li>• Multi-probe confirmation prevents false alarms and texts Damein the second an issue occurs</li>
                <li>• Strict truth policy: Technical Health is separated from real Google Search Console &amp; GA4 numbers</li>
                <li>
                  • Daily SSL, canonical,{" "}
                  <code className="text-emerald-300 font-mono text-[11px]">robots.txt</code>, and{" "}
                  <code className="text-emerald-300 font-mono text-[11px]">LocalBusiness</code> Rich Result schema verification
                </li>
                <li>• Every upgrade is tested on a staged preview URL with 1-click snapshot rollback</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4-LAYER ARCHITECTURE SUMMARY
      ====================================================================== */}
      <section className="py-20 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: ShieldAlert,
              badge: "Phase 1 · Uptime & Crawl",
              title: "Multi-Probe Watchtower",
              desc: "5-minute HTTP latency probes, TLS/SSL expiry countdowns, and full internal link crawls across every page.",
            },
            {
              icon: BarChart3,
              badge: "Phase 2 · Real ROI",
              title: "Search Console & GA4",
              desc: "Direct Google OAuth bindings tracking 7d, 28d, and 90d clicks, local search positions, and phone/form conversions.",
            },
            {
              icon: Gauge,
              badge: "Phase 3 · Cellular Speed",
              title: "CrUX & Schema Audits",
              desc: "Real-world Chrome mobile speed telemetry (LCP, INP, CLS) paired with Google Rich Result schema validation.",
            },
            {
              icon: Lock,
              badge: "Phase 4 · Safe Upgrades",
              title: "2-Stage Staged Fixes",
              desc: "AI diagnostics surface ranking opportunities, while human-verified staged previews guarantee zero live breakage.",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="p-6 rounded-3xl bg-[#090d18] border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/12 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-lg font-black uppercase text-white">{card.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          FAQS
      ====================================================================== */}
      <section className="py-20 px-4 sm:px-6 bg-[#080c16] border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-400 font-mono font-bold tracking-[0.25em] uppercase text-xs mb-3 block">
              Straight Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              PDM Site Intelligence™ FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {WATCHTOWER_FAQS.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl bg-[#06080f] border border-white/10 space-y-2"
              >
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DeferredFooterSections />
    </main>
  );
}
