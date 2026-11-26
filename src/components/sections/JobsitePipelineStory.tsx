"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  MapPin,
  PhoneIncoming,
  Sliders,
  CheckCircle2,
  Star,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PIPELINE_STAGES = [
  {
    idx: 0 as const,
    mobilePill: "01 · PinCam™",
    step: "STEP 01 • ON THE JOB SITE",
    title: "Capture & Prove With PinCam™",
    desc: "Ghost before/after alignment, damage markups, GPS watermarks & instant PDF customer reports.",
    icon: Camera,
  },
  {
    idx: 1 as const,
    mobilePill: "02 · PinDrop™",
    step: "STEP 02 • GOOGLE MAP PACK",
    title: "Rank the Neighborhood With PinDrop™",
    desc: "1 tap publishes a geo-tagged project page to your website and texts the homeowner for a 5-star review.",
    icon: MapPin,
  },
  {
    idx: 2 as const,
    mobilePill: "03 · CRM",
    step: "STEP 03 • AUTOMATED CRM & FOLLOW-UPS",
    title: "Route Every Quote Into Capsule CRM",
    desc: "Interactive quote calculators & web forms sync straight into Capsule CRM with automated Transpond follow-ups.",
    icon: PhoneIncoming,
  },
];

export default function JobsitePipelineStory() {
  const [ghostSplit, setGhostSplit] = useState(0);
  const [activeStage, setActiveStage] = useState<0 | 1 | 2>(0);

  const updateSplitFromPointer = (clientX: number, el: HTMLDivElement) => {
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const pct = Math.round(
      Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    );
    setGhostSplit(pct);
  };

  return (
    <section
      id="jobsite-engine"
      className="relative py-24 md:py-32 bg-[#05070d] border-y border-white/10 overflow-hidden"
    >
      {/* Architectural Blueprint Grid + Warm Spotlight */}
      <div className="absolute inset-0 blueprint-grid opacity-55 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[420px] bg-amber-500/[0.07] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl">
        {/* Centered Architectural Header — Distinct from Left-Aligned Hero */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-[0.28em] block mb-3">
            Interactive 3-Stage System Walkthrough
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[1.04] text-white mb-4">
            How One Finished Job{" "}
            <span className="text-amber-400">Sparks Your Next Wave of Calls.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Most websites sit static for years while your crew does great work every single day. Click any stage below to test-drive how our connected field-to-phone pipeline works in real life.
          </p>
        </div>

        {/* Mobile Single-Row Thumb Switcher (Keeps Switcher + Live Stage in 1 Screen) */}
        <div
          className="md:hidden grid grid-cols-3 gap-1.5 mb-3 p-1.5 rounded-2xl bg-[#090d18]/95 border border-white/10 backdrop-blur-xl shadow-xl"
          role="tablist"
          aria-label="Select pipeline stage"
        >
          {PIPELINE_STAGES.map((item) => {
            const Icon = item.icon;
            const selected = activeStage === item.idx;
            return (
              <button
                key={item.step}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveStage(item.idx)}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-[11px] font-extrabold tracking-tight transition-all cursor-pointer ${
                  selected
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_0_18px_rgba(245,158,11,0.3)]"
                    : "text-slate-300 hover:text-white bg-white/[0.03]"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{item.mobilePill}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Interactive 3-Stage Selector Bar */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 mb-10">
          {PIPELINE_STAGES.map((item) => {
            const Icon = item.icon;
            const selected = activeStage === item.idx;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStage(item.idx)}
                className={`text-left p-4 sm:p-6 rounded-2xl transition-all cursor-pointer border ${
                  selected
                    ? "bg-[#0d1322] border-amber-400/70 shadow-[0_16px_40px_-12px_rgba(245,158,11,0.22)]"
                    : "bg-[#080c16]/80 border-white/10 hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-mono font-extrabold uppercase tracking-widest ${
                      selected ? "text-amber-400" : "text-slate-400"
                    }`}
                  >
                    {item.step}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${
                      selected
                        ? "bg-amber-400 text-slate-950 border-amber-300"
                        : "bg-white/[0.04] text-slate-300 border-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Stage Viewport */}
        <div className="rounded-3xl obsidian-surface p-3.5 sm:p-8 lg:p-10">
          {/* Compact Mobile Stage Context & Prev/Next Stepper */}
          <div className="md:hidden flex items-center justify-between gap-2 pb-3 mb-3.5 border-b border-white/10">
            <div className="min-w-0">
              <div className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-400">
                {PIPELINE_STAGES[activeStage].step}
              </div>
              <div className="text-xs font-bold text-white truncate">
                {PIPELINE_STAGES[activeStage].title}
              </div>
            </div>
            <div className="inline-flex items-center gap-1 shrink-0">
              <button
                type="button"
                aria-label="Previous pipeline stage"
                onClick={() =>
                  setActiveStage(((activeStage + 2) % 3) as 0 | 1 | 2)
                }
                className="w-7 h-7 rounded-full border border-white/15 bg-white/[0.04] text-white flex items-center justify-center active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono font-bold text-slate-300 px-1">
                {activeStage + 1}/3
              </span>
              <button
                type="button"
                aria-label="Next pipeline stage"
                onClick={() =>
                  setActiveStage(((activeStage + 1) % 3) as 0 | 1 | 2)
                }
                className="w-7 h-7 rounded-full border border-white/15 bg-white/[0.04] text-white flex items-center justify-center active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          {activeStage === 0 && (
            <div className="grid lg:grid-cols-12 gap-7 lg:gap-12 items-center">
              {/* Interactive Before/After Ghost Camera Preview */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black select-none">
                  <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 sm:px-4 py-2.5 bg-[#070a12] border-b border-white/10 text-[11px] font-mono">
                    <span className="text-amber-400 font-bold flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 shrink-0" />
                      <span>PinCam™ Photo Match</span>
                    </span>
                    <span className="text-emerald-400 font-bold">GPS LOCKED • MADISON, MS</span>
                  </div>

                  <div
                    className="relative aspect-[16/10] w-full overflow-hidden cursor-ew-resize touch-pan-y"
                    onPointerDown={(e) => {
                      e.currentTarget.setPointerCapture(e.pointerId);
                      updateSplitFromPointer(e.clientX, e.currentTarget);
                    }}
                    onPointerMove={(e) => {
                      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
                      updateSplitFromPointer(e.clientX, e.currentTarget);
                    }}
                    onPointerUp={(e) => {
                      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                        e.currentTarget.releasePointerCapture(e.pointerId);
                      }
                    }}
                    onPointerCancel={(e) => {
                      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                        e.currentTarget.releasePointerCapture(e.pointerId);
                      }
                    }}
                  >
                    {/* Base Layer: BEFORE (100% visible when slider is all the way LEFT at 0%) */}
                    <Image
                      src="/pincam/roof-before.jpg"
                      alt="Storm damaged roof with blue tarp before replacement"
                      fill
                      sizes="(max-width: 1024px) 94vw, 680px"
                      className="object-cover pointer-events-none"
                    />
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 border border-red-400/40 text-[9px] sm:text-[10px] font-mono font-bold text-red-300 uppercase pointer-events-none">
                      BEFORE • STORM DAMAGE
                    </span>

                    {/* Top Layer: AFTER (Wipes in from LEFT to RIGHT as slider moves 0% -> 100%) */}
                    <div
                      className="absolute inset-0 overflow-hidden pointer-events-none"
                      style={{ clipPath: `inset(0 ${100 - ghostSplit}% 0 0)` }}
                    >
                      <Image
                        src="/pincam/roof-after.jpg"
                        alt="Completed architectural shingle roof in Madison, MS"
                        fill
                        sizes="(max-width: 1024px) 94vw, 680px"
                        className="object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 border border-emerald-400/40 text-[9px] sm:text-[10px] font-mono font-bold text-emerald-300 uppercase">
                        AFTER • 30-YR ROOF
                      </span>
                    </div>

                    {/* Vertical Split Divider Line */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.9)] pointer-events-none"
                      style={{ left: `${ghostSplit}%` }}
                    />

                    {/* Draggable Handle Pill (Clamped inside edges so 0% and 100% never clip) */}
                    <div
                      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center touch-none"
                      style={{ left: `clamp(18px, ${ghostSplit}%, calc(100% - 18px))` }}
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-xl border-2 border-white">
                        {ghostSplit === 0 ? "→" : ghostSplit === 100 ? "←" : "↔"}
                      </div>
                    </div>
                  </div>

                  {/* Clean Verification Stamp Footer (Below Photo — Zero Obstruction) */}
                  <div className="px-3.5 py-2 bg-[#090d16] border-t border-white/10 flex flex-wrap items-center justify-between gap-1.5 text-[10px] font-mono text-slate-300">
                    <span>📍 32.4618° N, 90.1154° W • Annandale, Madison MS</span>
                    <span className="text-amber-400 font-bold">✓ PINCAM VERIFIED</span>
                  </div>

                  {/* Accessible Range Slider Control */}
                  <div className="px-3.5 sm:px-4 py-3 bg-[#070a12] border-t border-white/10 flex items-center gap-3">
                    <span
                      className={`text-[11px] font-mono shrink-0 ${
                        ghostSplit < 50 ? "text-amber-400 font-bold" : "text-slate-400"
                      }`}
                    >
                      Before
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={ghostSplit}
                      onChange={(e) => setGhostSplit(Number(e.target.value))}
                      aria-label="Slide left to right to transform before photo into after photo"
                      className="w-full accent-amber-400 cursor-ew-resize"
                    />
                    <span
                      className={`text-[11px] font-mono shrink-0 ${
                        ghostSplit >= 50 ? "text-emerald-400 font-bold" : "text-slate-400"
                      }`}
                    >
                      After
                    </span>
                  </div>
                </div>
              </div>

              {/* Copy & Real App Capabilities */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  Proprietary App #1 • PinCam™
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase">
                  Document Every Job Like a Million-Dollar Operation.
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Crews use <strong className="text-white">PinCam™</strong> on their phone to align perfect before-and-after shots, draw hail/leak arrows &amp; measurements, record dual-camera PiP walkthroughs, and hand homeowners or insurance adjusters a branded PDF report on the spot.
                </p>

                <ul className="space-y-3 text-sm text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Ghost Camera Photo Match:</strong> Overlays the &ldquo;Before&rdquo; angle right inside the camera lens so every &ldquo;After&rdquo; lines up 1:1.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Markups, Measurements &amp; PDF Reports:</strong> Arrows, custom callouts, GPS timestamps, and 1-tap shareable inspection links.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Offline Rural Jobsite Recovery:</strong> Auto-saves every photo on the device even with zero cell bars, syncing the moment your truck hits signal.
                    </span>
                  </li>
                </ul>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/pincam"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(245,158,11,0.28)]"
                  >
                    <span>Test-Drive PinCam™ App</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contractors"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Contractor Packages
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeStage === 1 && (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Authentic Real PDM PinDrop Satellite Map + Feed Card Preview */}
              <div className="lg:col-span-7 space-y-4">
                {/* Real Esri Satellite Map Preview (`Local Project Pins`) */}
                <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#0b0c10] p-2">
                  <div className="px-2.5 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <span className="font-mono font-extrabold uppercase tracking-wider text-[#e2b047]">
                      LIVE JOB FEED • Local Project Pins
                    </span>
                    <span className="font-mono text-emerald-400">99+ Active Pins</span>
                  </div>
                  <div className="relative aspect-[16/10] sm:aspect-auto sm:h-56 rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src="/pindrop/central-ms-satellite.jpg"
                      alt="Real PDM PinDrop Esri satellite map of Central Mississippi with gold job pins"
                      fill
                      sizes="(max-width: 1024px) 92vw, 680px"
                      className="object-cover"
                    />
                    {[
                      { x: "52%", y: "20%", label: "Madison" },
                      { x: "50%", y: "36%", label: "Ridgeland" },
                      { x: "57%", y: "49%", label: "Flowood" },
                      { x: "68%", y: "63%", label: "Brandon" },
                      { x: "29%", y: "54%", label: "Clinton" },
                      { x: "45%", y: "56%", label: "Jackson" },
                    ].map((pt) => (
                      <div
                        key={pt.label}
                        style={{ left: pt.x, top: pt.y }}
                        className="absolute -translate-x-1/2 -translate-y-full"
                      >
                        <svg
                          width="24"
                          height="30"
                          viewBox="0 0 32 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)]"
                        >
                          <path
                            d="M16 1.5C8.54 1.5 2.5 7.54 2.5 15C2.5 24.8 14.35 36.85 15.32 37.8C15.7 38.17 16.3 38.17 16.68 37.8C17.65 36.85 29.5 24.8 29.5 15C29.5 7.54 23.46 1.5 16 1.5Z"
                            fill="#e2b047"
                            stroke="#0b0c10"
                            strokeWidth="2"
                          />
                          <circle cx="16" cy="14.5" r="5" fill="#0b0c10" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real `.pin-feed-card` Replica */}
                <div className="rounded-2xl bg-[#12141c] border border-white/10 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-white/[0.06]">
                    <div>
                      <div className="text-sm font-extrabold text-[#5c6cff]">
                        Eddie Buchanan
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Madison, MS • Verified Crew Check-In
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#d1a453]/15 border border-[#d1a453]/35 text-[10px] font-extrabold uppercase text-[#e2b047]">
                      RESIDENTIAL ROOFING
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 italic font-serif mb-3.5">
                    &ldquo;Completed full tear-off, synthetic underlayment &amp; 30-yr charcoal architectural shingles.&rdquo;
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    <div className="relative h-24 sm:h-32 rounded-xl overflow-hidden border border-white/10">
                      <Image
                        src="/pindrop/sat-madison.jpg"
                        alt="Madison MS satellite neighborhood mini-map"
                        fill
                        sizes="(max-width: 640px) 45vw, 280px"
                        className="object-cover"
                      />
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#0b0c10]/90 border border-white/15 text-[9px] sm:text-[10px] font-extrabold text-white whitespace-nowrap">
                        Madison, MS
                      </span>
                    </div>
                    <div className="relative h-24 sm:h-32 rounded-xl overflow-hidden border border-white/10">
                      <Image
                        src="/pincam/roof-after.jpg"
                        alt="Completed roof photo"
                        fill
                        sizes="(max-width: 640px) 45vw, 280px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  Proprietary App #2 • PDM PinDrop™
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase">
                  Turn Completed Jobs Into #1 Neighborhood Google Rankings.
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Instead of paying an agency to write generic blog posts nobody reads, <strong className="text-white">PDM PinDrop™</strong> turns every real HVAC install, roof replacement, or dirt-work job in Madison, Brandon, or Clinton into a live satellite map pin, an Answer Engine Google page, and a 1-tap homeowner review text.
                </p>
                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-xl font-black text-amber-400">99+</div>
                    <div className="text-[11px] text-slate-400">Live Pins on BAR</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-xl font-black text-emerald-400">15 Min</div>
                    <div className="text-[11px] text-slate-400">Auto-SMS Review</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-xl font-black text-white">Crew-Wide</div>
                    <div className="text-[11px] text-slate-400">No Per-Tech Tax</div>
                  </div>
                </div>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/pindrop"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(245,158,11,0.28)]"
                  >
                    <span>Test-Drive Real PinDrop™ App</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://www.bornagainroofing.com/pins/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <span>See Live BAR Map ↗</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeStage === 2 && (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-white/15 bg-[#070a12] p-4 sm:p-7 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                      ⚡ Live Quote-to-CRM Pipeline (Zero Dropped Leads)
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400">Direct API Sync</span>
                  </div>

                  {[
                    {
                      time: "2:14:02 PM",
                      badge: "INBOUND QUOTE",
                      title: "Homeowner in Brandon, MS submits interactive roof / AC quote form",
                      detail: "Sub-second Next.js 16 load on cellular — zero slow WordPress bounce.",
                      color: "border-amber-500/30 bg-amber-500/10 text-amber-300",
                    },
                    {
                      time: "2:14:04 PM",
                      badge: "CAPSULE CRM + DEAL",
                      title: "Pipeline creates a contact card, opens a deal & alerts your phone",
                      detail: "Full name, service city, project scope, and clickable callback details logged cleanly.",
                      color: "border-sky-500/30 bg-sky-500/10 text-sky-300",
                    },
                    {
                      time: "2:14:06 PM",
                      badge: "TRANSPOND FOLLOW-UP",
                      title: "Automated confirmation engages the homeowner before they keep shopping",
                      detail: "“Hey Mike! Got your Brandon roof inspection request — our estimator is reviewing your address now.”",
                      color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
                    },
                  ].map((row) => (
                    <div
                      key={row.time}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row sm:items-start gap-3.5"
                    >
                      <span className="text-[11px] font-mono text-slate-400 shrink-0 pt-0.5">
                        {row.time}
                      </span>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-extrabold border ${row.color}`}>
                            {row.badge}
                          </span>
                          <span className="text-sm font-bold text-white">{row.title}</span>
                        </div>
                        <p className="text-xs text-slate-400">{row.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  CRM &amp; Automated Follow-Up
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase">
                  78% of Homeowners Hire the First Contractor Who Responds.
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  When you&apos;re in an attic, on a roof, or running an excavator, scattered inbox leads cost thousands. We wire your interactive quote calculators, lead forms, <strong className="text-white">Capsule CRM</strong>, and automated Transpond sequences together so every inquiry is logged, tagged, and followed up automatically.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    href="/free-audit"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(245,158,11,0.28)]"
                  >
                    <span>Check My Website &amp; Lead Leaks</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="tel:6014462393"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    (601) 446-2393
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Direct Flagship App Promotion Bar (Standalone Embed OR Website Bundle) */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white">Want PDM PinDrop™ or PinCam™ for your crew?</strong>{" "}
              Bundled <strong className="text-amber-300">with zero per-seat fees</strong> on our Contractor Growth Websites—or install on your existing WordPress/Wix/custom site with a guided 14-day trial.
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/pindrop"
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Explore Real PinDrop™ App →</span>
              </Link>
              <Link
                href="/pincam"
                className="px-4 py-2.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500 hover:text-white border border-indigo-400/45 text-indigo-200 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Explore PinCam™ App →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
