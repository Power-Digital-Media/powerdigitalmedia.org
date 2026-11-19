"use client";

import { Zap, XCircle, CheckCircle2, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SpeedComparisonCard() {
  return (
    <section className="py-20 md:py-28 bg-[#06080f] border-t border-white/10 relative overflow-hidden">
      {/* Subtle Industrial-Luxury Blueprint & Warm Glow */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[520px] h-[420px] bg-amber-500/[0.06] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-widest">
              Why Mobile Speed Wins Local Jobs
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.05]">
            The 3-Second Rule:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
              Slow Sites Lose Calls. Fast Sites Book Crews.
            </span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg mt-4 leading-relaxed">
            When a Mississippi homeowner has a roof leak, a dead AC unit, or needs dinner catered tonight, they search on their phone. If your site takes 6 seconds to load, they tap &ldquo;Back&rdquo; and call the next company on Google Maps.
          </p>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* The Slow Template Site */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#0b0c10] border border-red-500/20 flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="mb-6 pb-4 border-b border-white/[0.07] space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-400 shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold font-mono shrink-0">
                    5.8s – 8.2s Load
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white leading-snug">
                    Typical Agency WordPress / Wix Site
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Heavy Plugins &amp; Generic Stock Photos
                  </p>
                </div>
              </div>

              <ul className="space-y-3.5 mb-8">
                {[
                  "Stalls for 6+ seconds on cellular connections",
                  "53% of mobile callers bounce before seeing your phone number",
                  "Zero neighborhood project proof — Google only sees one city",
                  "Static contact forms sit in spam folders with zero CRM tracking",
                  "Bloated plugins break layouts and hurt Core Web Vitals",
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/15 text-center mt-auto">
              <span className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider block mb-0.5">
                The Cost
              </span>
              <p className="text-xs text-slate-300">
                You do great work in the field, while slower competitors outrank you online.
              </p>
            </div>
          </div>

          {/* The Power Digital Build */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#12141c] to-[#0b0c10] border border-amber-500/40 flex flex-col justify-between relative overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="mb-6 pb-4 border-b border-amber-500/20 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-xs font-bold font-mono shrink-0">
                    ⚡ &lt; 1.8s Mobile Load
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white leading-snug">
                    Power Digital Growth System
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">
                    Custom Next.js + PinCam™ &amp; PinDrop™
                  </p>
                </div>
              </div>

              <ul className="space-y-3.5 mb-8">
                {[
                  "Opens in under 2 seconds on 4G/5G phones with 95–99 PageSpeed",
                  "PinDrop™ turns every finished job into a GPS neighborhood SEO page",
                  "PinCam™ captures verified before/after proof & branded PDF reports",
                  "Interactive quote calculators & automated Transpond follow-up flows",
                  "Direct Capsule CRM, Square 0%-fee checkout & 1-tap call routing",
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-auto">
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                  Real Mississippi Results
                </span>
                <p className="text-xs text-slate-200">
                  More booked estimates, stronger Map Pack rank, zero tech headaches.
                </p>
              </div>
              <Link
                href="/free-audit"
                className="w-full sm:w-auto text-center px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 shadow-md"
              >
                Free Rank Check
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Call Out Strip */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-[#0b0c10] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399] shrink-0" />
            <span className="text-xs sm:text-sm text-slate-200 font-medium">
              Want to see how your current website &amp; Google Business Profile stack up against local competitors?
            </span>
          </div>
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider shrink-0"
          >
            Get Free 5-Min Breakdown <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
