"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Zap,
  Star,
  ArrowUpRight,
  HardHat,
  Flame,
  Truck,
  UtensilsCrossed,
  CheckCircle2,
} from "lucide-react";

interface ShowcaseItem {
  id: string;
  tabLabel: string;
  icon: typeof HardHat;
  domain: string;
  clientName: string;
  location: string;
  image: string;
  imageAlt: string;
  caseStudyHref: string;
  liveRankBadge: string;
  speedScore: string;
  engineBadge: string;
  proofQuote: string;
  proofAuthor: string;
}

const SHOWCASES: ShowcaseItem[] = [
  {
    id: "roofing",
    tabLabel: "Roofing",
    icon: HardHat,
    domain: "bornagainroofing.com",
    clientName: "Born Again Roofing & Remodeling",
    location: "Brandon & Jackson Metro, MS",
    image: "/portfolio/bornagain-hero-16-10.webp",
    imageAlt: "Born Again Roofing & Remodeling custom Next.js website and PinDrop map",
    caseStudyHref: "/portfolio/born-again-roofing",
    liveRankBadge: "800+ Live GPS Job Pins Mapped",
    speedScore: "98/100 Mobile",
    engineBadge: "PinDrop™ + Storm Lead CRM",
    proofQuote:
      "Crews drop a GPS pin from the truck and homeowners in that exact neighborhood find us on Google.",
    proofAuthor: "Live Production Build • Central MS",
  },
  {
    id: "dirtwork",
    tabLabel: "Dirt & Civil",
    icon: Truck,
    domain: "msdirt.com",
    clientName: "Geaux Pro Outdoors (MS Dirt)",
    location: "Bentonia, Yazoo & Madison, MS",
    image: "/portfolio/geaux-pro-outdoors.webp",
    imageAlt: "Geaux Pro Outdoors (MS Dirt) Central MS excavation and dirt work website",
    caseStudyHref: "/portfolio/geaux-pro-outdoors",
    liveRankBadge: "Top Google Map Pack • MS Dirt Work",
    speedScore: "98/100 Mobile",
    engineBadge: "Instant Hauling & Land Quote Engine",
    proofQuote:
      "“Took my marketing program from the dumps all the way to the moon. Very responsive and results oriented.”",
    proofAuthor: "Scott Lowery, Owner — Verified 5.0★ Google Review",
  },
  {
    id: "hvac",
    tabLabel: "HVAC & Trades",
    icon: Flame,
    domain: "PinCam™ + PinDrop™ Suite",
    clientName: "HVAC, Plumbing & Electrical System",
    location: "Madison, Ridgeland & Flowood, MS",
    image: "/pincam/hvac-install.webp",
    imageAlt: "HVAC condenser field installation documented with PinCam and PinDrop",
    caseStudyHref: "/pincam",
    liveRankBadge: "Auto-Publishes Neighborhood SEO",
    speedScore: "< 2s Mobile Load",
    engineBadge: "PinCam™ Proof + 15-Min 5★ SMS",
    proofQuote:
      "Snap equipment photos, stamp GPS proof, send homeowner PDF reports, and trigger 5-star Google reviews automatically.",
    proofAuthor: "Exclusive Power Digital Field Tech",
  },
  {
    id: "commerce",
    tabLabel: "Local Biz",
    icon: UtensilsCrossed,
    domain: "tbeauxs.com",
    clientName: "T'Beaux's Seafood & Catering",
    location: "Clinton, MS",
    image: "/portfolio/tbeauxs-hero.webp",
    imageAlt: "T'Beaux's Seafood & Catering custom Square SDK online ordering website",
    caseStudyHref: "/portfolio/tbeaux",
    liveRankBadge: "0% Commission In-App Ordering",
    speedScore: "98/100 Mobile",
    engineBadge: "Square SDK + DoorDash Dispatch",
    proofQuote:
      "Customers order platters, check live crawfish pricing, and pay directly on-site with zero 30% app commissions.",
    proofAuthor: "Live Production Build • Clinton, MS",
  },
];

export default function ContractorHeroStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = SHOWCASES[activeIndex];

  return (
    <div className="relative w-full">
      {/* Warm Copper Rim Light */}
      <div
        className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-amber-500/15 via-amber-600/5 to-transparent blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Interactive Trade Switcher Tabs */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3 p-1.5 rounded-2xl bg-[#0a0e19]/90 border border-white/10 backdrop-blur-xl"
        role="tablist"
        aria-label="Select industry showcase"
      >
        {SHOWCASES.map((item, idx) => {
          const Icon = item.icon;
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(idx)}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{item.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tactical Browser & Telemetry Console */}
      <div className="relative rounded-3xl obsidian-surface overflow-hidden">
        {/* Top Browser Chrome */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#070a12] border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/75" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/75" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/75" />
          </div>

          <div className="px-3.5 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{current.domain}</span>
          </div>

          <Link
            href={current.caseStudyHref}
            prefetch={false}
            className="text-[11px] font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>Inspect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Live Visual Viewport (100% Unobstructed Screenshot) */}
        <div className="relative aspect-[16/10] w-full bg-[#05070c] overflow-hidden">
          {activeIndex === 0 ? (
            <picture>
              <source
                media="(max-width: 680px)"
                srcSet="/portfolio/bornagain-hero-mobile.webp"
                type="image/webp"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portfolio/bornagain-hero-16-10.webp"
                alt={current.imageAlt}
                width={1200}
                height={716}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </picture>
          ) : (
            <Image
              key={current.image}
              src={current.image}
              alt={current.imageAlt}
              fill
              sizes="(max-width: 640px) 94vw, (max-width: 1024px) 85vw, 580px"
              className="object-cover object-top transition-all duration-500"
            />
          )}
        </div>

        {/* Clean Non-Overlapping Identity, Telemetry & Proof Dock */}
        <div className="p-4 sm:p-5 bg-[#070a12] border-t border-white/10 space-y-3.5">
          {/* Client Identity & Speed Row (Moved off screenshot for 100% visual clarity) */}
          <div className="flex flex-wrap items-start justify-between gap-2.5 pb-3 border-b border-white/[0.08]">
            <div className="min-w-0">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300">
                Verified Mississippi Deployment
              </div>
              <div className="text-base sm:text-xl font-black text-white tracking-tight leading-snug mt-0.5">
                {current.clientName}
              </div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{current.location}</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 text-[11px] font-extrabold shrink-0">
              ⚡ {current.speedScore}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="px-3.5 py-2.5 rounded-xl bg-amber-500/[0.08] border border-amber-500/25 flex items-center gap-2 text-xs font-bold text-amber-200">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
              <span className="truncate">{current.liveRankBadge}</span>
            </div>
            <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2 text-xs font-bold text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{current.engineBadge}</span>
            </div>
          </div>

          {/* Integrated Verified Proof Strip (Zero Overlapping Collisions) */}
          <div className="pt-3 border-t border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <p className="text-xs text-slate-200 leading-snug font-medium">
                {current.proofQuote}
              </p>
              <span className="text-[11px] font-semibold text-amber-400/90 block">
                {current.proofAuthor}
              </span>
            </div>
            <Link
              href={current.caseStudyHref}
              prefetch={false}
              className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-amber-400 hover:text-slate-950 text-white text-[11px] font-black uppercase tracking-wider transition-all"
            >
              <span>See Live Proof</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
