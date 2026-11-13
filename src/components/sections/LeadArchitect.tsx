"use client";

import Image from "next/image";
import { ShieldCheck, PhoneCall, Code2, ArrowRight, MapPin, Star, Smartphone } from "lucide-react";
import Link from "next/link";

export default function LeadArchitect() {
  return (
    <section
      className="relative w-full py-20 md:py-28 overflow-hidden bg-[#060912] border-t border-white/10"
      id="about"
    >
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/[0.06] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image Column */}
          <div className="w-full lg:w-5/12 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#090d18] aspect-[4/3] shadow-2xl">
              <Image
                src="/images/founder-booth.webp"
                alt="Damein Donald - Founder & Lead Engineer at Power Digital Media in Jackson, MS"
                fill
                sizes="(max-width: 768px) 94vw, 42vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/90 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 bg-[#070a12]/92 backdrop-blur-md border border-white/15 p-4 rounded-2xl flex items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h4 className="text-white font-bold text-sm">Damein Donald</h4>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs font-medium">
                    Founder &amp; Lead Engineer • Power Digital Media
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold bg-amber-500/15 px-3 py-1.5 rounded-full border border-amber-500/30 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Jackson, MS
                </div>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="w-full lg:w-7/12 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-amber-300 tracking-wider uppercase">
                No Call Centers • No Overseas Handoffs
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.06] uppercase tracking-tight">
              Built Right Here in Jackson.{" "}
              <span className="text-amber-400">Backed By My Direct Cell Number.</span>
            </h2>

            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
              <p>
                Most local business owners have been burned at least once by an agency that charged thousands for a slow template, locked them into a confusing contract, and vanished when something broke.
              </p>
              <p>
                When you work with Power Digital Media, you deal directly with me—from mapping your Google rankings and coding your website to setting up{" "}
                <strong className="text-white">PinCam™</strong> and{" "}
                <strong className="text-white">PinDrop™</strong> on your crew&apos;s phones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <Code2 className="w-5 h-5 text-amber-400 mb-2" />
                <h4 className="font-bold text-white text-sm">7–14 Day Launch</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Hand-coded in-house for speed, security, and local rankings.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <Smartphone className="w-5 h-5 text-amber-400 mb-2" />
                <h4 className="font-bold text-white text-sm">Proprietary Field Apps</h4>
                <p className="text-xs text-slate-400 mt-1">
                  PinCam™ + PinDrop™ wired straight into your website.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <PhoneCall className="w-5 h-5 text-amber-400 mb-2" />
                <h4 className="font-bold text-white text-sm">Direct Cell Support</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Call or text me directly at (601) 446-2393 anytime.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/free-audit"
                className="px-7 py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_0_24px_rgba(245,158,11,0.28)]"
              >
                <span>Get Free 5-Min Video Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:6014462393"
                className="px-6 py-4 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                Call/Text (601) 446-2393
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
