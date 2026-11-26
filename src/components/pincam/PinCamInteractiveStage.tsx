"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Camera,
  Ruler,
  Video,
  FileCheck2,
  MapPin,
  Eye,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  WifiOff,
  RotateCcw,
  Share2,
  Layers,
} from "lucide-react";

type PinCamTab = "ghost" | "markup" | "pip" | "report" | "sync";

export default function PinCamInteractiveStage() {
  const [activeTab, setActiveTab] = useState<PinCamTab>("ghost");

  // Mode 1: Before -> After Split & Ghost Alignment Lens (0% Left = Before, 100% Right = After)
  const [ghostOpacity, setGhostOpacity] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"split_compare" | "ghost_lens">("split_compare");
  const [splitPos, setSplitPos] = useState<number>(0);

  const updateLensFromPointer = (clientX: number, el: HTMLDivElement) => {
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const pct = Math.round(
      Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    );
    if (viewMode === "split_compare") {
      setSplitPos(pct);
    } else {
      setGhostOpacity(pct);
    }
  };

  // Mode 2: Non-destructive Markup Studio state
  const [showMeasurements, setShowMeasurements] = useState<boolean>(true);
  const [showArrows, setShowArrows] = useState<boolean>(true);
  const [showCrewPin, setShowCrewPin] = useState<boolean>(true);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);

  // Mode 3: Dual-Cam PiP Walkthrough state
  const [pipSource, setPipSource] = useState<"before_photo" | "tech_notes">("before_photo");
  const [pipCorner, setPipCorner] = useState<"top-right" | "bottom-right">("top-right");
  const [showLowerThird, setShowLowerThird] = useState<boolean>(true);

  const TABS: {
    id: PinCamTab;
    badge: string;
    label: string;
    sub: string;
    icon: typeof Camera;
  }[] = [
    {
      id: "ghost",
      badge: "01 • LENS",
      label: "Ghost Photo Match",
      sub: "Align Before & After 1:1",
      icon: Camera,
    },
    {
      id: "markup",
      badge: "02 • MARKUP",
      label: "Measurements & Tags",
      sub: "Arrows, callouts & stamps",
      icon: Ruler,
    },
    {
      id: "pip",
      badge: "03 • VIDEO",
      label: "Dual-Cam Walkthrough",
      sub: "PiP + branded lower-third",
      icon: Video,
    },
    {
      id: "report",
      badge: "04 • PROOF",
      label: "Instant PDF Reports",
      sub: "Homeowner & adjuster ready",
      icon: FileCheck2,
    },
    {
      id: "sync",
      badge: "05 • APP + SYNC",
      label: "Mobile App & PinDrop™",
      sub: "iOS/Android + Google map sync",
      icon: MapPin,
    },
  ];

  return (
    <div className="w-full">
      {/* Mobile Single-Row Horizontal Snap Tab Strip (< 640px) */}
      <div
        className="sm:hidden flex items-center gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory mb-3.5 pb-1"
        role="tablist"
        aria-label="PinCam interactive app features"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={`mob-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 snap-start inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                active
                  ? "bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.3)]"
                  : "bg-[#080c16]/90 text-slate-300 border-white/15"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tablet & Desktop Interactive Feature Tab Selector */}
      <div
        className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-7 sm:mb-8"
        role="tablist"
        aria-label="PinCam interactive app features"
      >
        {TABS.map((tab, idx) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          const isLast = idx === TABS.length - 1;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                isLast ? "col-span-2 sm:col-span-1" : ""
              } ${
                active
                  ? "bg-[#0e1424] border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.18)]"
                  : "bg-[#080c16]/85 border-white/10 hover:border-white/25"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <span
                  className={`text-[10px] font-mono font-extrabold uppercase tracking-wider ${
                    active ? "text-amber-400" : "text-slate-500"
                  }`}
                >
                  {tab.badge}
                </span>
                <Icon className={`w-4 h-4 shrink-0 ${active ? "text-amber-400" : "text-slate-400"}`} />
              </div>
              <div className="text-xs sm:text-sm font-black text-white leading-tight">
                {tab.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 truncate">{tab.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Main Hardware & App Viewport */}
      <div className="rounded-3xl obsidian-surface overflow-hidden">
        {/* App Top Status Chrome */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#060911] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#6366f1]/15 border border-[#6366f1]/40">
              <svg
                width="18"
                height="18"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 3C14.06 3 6 11.06 6 21C6 32.25 21.15 43.9 22.86 45.18C23.54 45.69 24.46 45.69 25.14 45.18C26.85 43.9 42 32.25 42 21C42 11.06 33.94 3 24 3Z"
                  fill="#6366f1"
                />
                <circle cx="24" cy="20" r="9.5" fill="#090d16" />
                <circle cx="24" cy="20" r="6" fill="#818cf8" />
                <circle cx="26.2" cy="17.8" r="2" fill="#ffffff" />
              </svg>
              <span className="text-xs font-black tracking-tight text-white">
                PinCam™
              </span>
              <span className="text-[10px] font-mono font-bold text-indigo-300">
                Android APK + iOS App
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Active Folder: Smith Residence • Madison, MS
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Offline Vault Active
            </span>
          </div>
        </div>

        {/* ===============================================================
            TAB 1: GHOST CAMERA PHOTO MATCH
        ================================================================ */}
        {activeTab === "ghost" && (
          <div className="p-4 sm:p-8 lg:p-10 grid lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              {/* Toggle between Before/After Split Wipe and Live Ghost Alignment Lens */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex p-1 rounded-xl bg-[#070a12] border border-white/10">
                  <button
                    type="button"
                    onClick={() => setViewMode("split_compare")}
                    className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "split_compare"
                        ? "bg-amber-400 text-slate-950"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    1. Before → After Split
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("ghost_lens")}
                    className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "ghost_lens"
                        ? "bg-amber-400 text-slate-950"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    2. In-Lens Ghost Overlay
                  </button>
                </div>
                <span className="text-[11px] font-mono text-amber-300 whitespace-nowrap">
                  {viewMode === "split_compare"
                    ? `After Reveal: ${splitPos}%`
                    : `After Blend: ${ghostOpacity}%`}
                </span>
              </div>

              {/* Camera Viewfinder Frame + Non-Overlapping Bottom Telemetry Dock */}
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-black select-none">
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden cursor-ew-resize touch-pan-y"
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    updateLensFromPointer(e.clientX, e.currentTarget);
                  }}
                  onPointerMove={(e) => {
                    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
                    updateLensFromPointer(e.clientX, e.currentTarget);
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
                  {/* Base Layer: BEFORE Photo (100% visible when slider is all the way LEFT at 0%) */}
                  <Image
                    src="/pincam/roof-before.jpg"
                    alt="Before storm damaged roof with tarp"
                    fill
                    sizes="(max-width: 1024px) 94vw, 680px"
                    className="object-cover pointer-events-none"
                    priority
                  />

                  {viewMode === "ghost_lens" ? (
                    <>
                      {/* Translucent 'After' Alignment Layer (0% Left = Before -> 50% Ghost Align -> 100% Right = After) */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-75"
                        style={{ opacity: ghostOpacity / 100 }}
                      >
                        <Image
                          src="/pincam/roof-after.jpg"
                          alt="Completed architectural roof blending into live PinCam viewfinder"
                          fill
                          sizes="(max-width: 1024px) 94vw, 680px"
                          className="object-cover"
                        />
                      </div>

                      {/* Camera Alignment Reticle & Horizon Level */}
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="w-40 sm:w-48 h-px bg-amber-400/70" />
                        <div className="h-24 sm:h-32 w-px bg-amber-400/70 absolute" />
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-amber-400/80 flex items-center justify-center">
                          <span className="px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono font-bold text-emerald-400">
                            0.0° LEVEL
                          </span>
                        </div>
                      </div>

                      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2.5 py-1 rounded-lg bg-black/80 border border-amber-400/40 text-[10px] font-mono font-bold text-amber-300 pointer-events-none">
                        {ghostOpacity === 0
                          ? "👻 BEFORE REFERENCE • SLIDE →"
                          : ghostOpacity === 100
                          ? "✓ AFTER MATCH LOCKED • 100%"
                          : `👻 GHOST ALIGNMENT • ${ghostOpacity}%`}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Base 'Before' Badge (Covered as After wipes across to 100%) */}
                      <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-black/80 border border-red-400/40 text-[10px] font-mono font-bold text-red-300 pointer-events-none">
                        BEFORE<span className="hidden sm:inline"> • TARP &amp; WIND DAMAGE</span>
                      </span>

                      {/* Clipped Top Layer: AFTER Photo (Wipes LEFT -> RIGHT as slider moves 0% -> 100%) */}
                      <div
                        className="absolute inset-0 overflow-hidden pointer-events-none"
                        style={{ clipPath: `inset(0 ${100 - splitPos}% 0 0)` }}
                      >
                        <Image
                          src="/pincam/roof-after.jpg"
                          alt="Completed architectural roof"
                          fill
                          sizes="(max-width: 1024px) 94vw, 680px"
                          className="object-cover"
                        />
                        <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-black/80 border border-emerald-400/40 text-[10px] font-mono font-bold text-emerald-300">
                          AFTER<span className="hidden sm:inline"> • NEW ARCHITECTURAL ROOF</span>
                        </span>
                      </div>

                      {/* Vertical Split Line */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.9)] pointer-events-none"
                        style={{ left: `${splitPos}%` }}
                      />

                      {/* Draggable Handle Pill */}
                      <div
                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center touch-none"
                        style={{ left: `clamp(18px, ${splitPos}%, calc(100% - 18px))` }}
                      >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center border-2 border-white shadow-xl">
                          {splitPos === 0 ? "→" : splitPos === 100 ? "←" : "↔"}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Camera HUD Bottom Bar (cleanly below photo so 0% of roof is covered) */}
                <div className="px-3.5 sm:px-4 py-2.5 bg-[#060911] border-t border-white/10 flex flex-wrap items-center justify-between gap-1.5 text-[10px] font-mono text-slate-300">
                  <span>📍 32.4618° N, 90.1154° W (±4ft GPS)</span>
                  <span className="text-emerald-400 font-bold">
                    {(viewMode === "split_compare" ? splitPos : ghostOpacity) >= 50
                      ? "STAGE: AFTER VERIFICATION"
                      : "STAGE: BEFORE INSPECTION"}
                  </span>
                </div>
              </div>

              {/* Interactive Control Bar */}
              <div className="p-4 rounded-2xl bg-[#070a12] border border-white/10 flex flex-col sm:flex-row items-center gap-3.5">
                {viewMode === "ghost_lens" ? (
                  <>
                    <div className="flex items-center gap-3 w-full">
                      <span
                        className={`text-xs font-mono shrink-0 flex items-center gap-1 ${
                          ghostOpacity < 50 ? "text-amber-300 font-bold" : "text-slate-400"
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Before
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={ghostOpacity}
                        onChange={(e) => setGhostOpacity(Number(e.target.value))}
                        aria-label="Slide left to right to blend before ghost overlay into after photo"
                        className="w-full accent-amber-400 cursor-ew-resize"
                      />
                      <span
                        className={`text-xs font-mono shrink-0 ${
                          ghostOpacity >= 50 ? "text-emerald-400 font-bold" : "text-slate-400"
                        }`}
                      >
                        After
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewMode("split_compare")}
                      className="w-full sm:w-auto shrink-0 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider cursor-pointer"
                    >
                      Split Wipe →
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-3 w-full">
                    <span
                      className={`text-xs font-mono shrink-0 ${
                        splitPos < 50 ? "text-amber-300 font-bold" : "text-slate-400"
                      }`}
                    >
                      Before
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={splitPos}
                      onChange={(e) => setSplitPos(Number(e.target.value))}
                      aria-label="Slide left to right to transform before photo into after photo"
                      className="w-full accent-amber-400 cursor-ew-resize"
                    />
                    <span
                      className={`text-xs font-mono shrink-0 ${
                        splitPos >= 50 ? "text-emerald-400 font-bold" : "text-slate-400"
                      }`}
                    >
                      After
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                Real PinCam™ Feature • Photo Match Lens
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight">
                Never Take Mismatched &ldquo;Before &amp; After&rdquo; Photos Again.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Usually one crew member snaps a &ldquo;Before&rdquo; photo from the street and another tech snaps the &ldquo;After&rdquo; from the porch—ruining your marketing proof.{" "}
                <strong className="text-white">PinCam™ Ghost Photo Match</strong> floats the original &ldquo;Before&rdquo; photo right inside the live camera lens at adjustable opacity so any tech lines up the exact roofline, unit, or yard in 3 seconds.
              </p>
              <div className="space-y-2.5 text-sm text-slate-200 pt-1">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>1-tap composite Before/After card export for Facebook &amp; Google</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Auto-recovers unsaved photos even if the phone dies or loses signal</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===============================================================
            TAB 2: PHOTO MARKUP, MEASUREMENTS & NON-DESTRUCTIVE TAG STUDIO
        ================================================================ */}
        {activeTab === "markup" && (
          <div className="p-4 sm:p-8 lg:p-10 grid lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              {/* Interactive Layer Toolbar */}
              <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-[#070a12] border border-white/10">
                <span className="text-[11px] font-mono text-slate-400 px-2">Toggle Layers:</span>
                <button
                  type="button"
                  onClick={() => setShowMeasurements(!showMeasurements)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    showMeasurements
                      ? "bg-amber-500/20 border-amber-400 text-amber-200"
                      : "bg-white/[0.03] border-white/10 text-slate-400"
                  }`}
                >
                  📏 Measurements
                </button>
                <button
                  type="button"
                  onClick={() => setShowArrows(!showArrows)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    showArrows
                      ? "bg-red-500/20 border-red-400 text-red-200"
                      : "bg-white/[0.03] border-white/10 text-slate-400"
                  }`}
                >
                  ↗ Inspection Callouts
                </button>
                <button
                  type="button"
                  onClick={() => setShowCrewPin(!showCrewPin)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    showCrewPin
                      ? "bg-sky-500/20 border-sky-400 text-sky-200"
                      : "bg-white/[0.03] border-white/10 text-slate-400"
                  }`}
                >
                  💬 Pinned Crew Note
                </button>
                <button
                  type="button"
                  onClick={() => setShowWatermark(!showWatermark)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    showWatermark
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-200"
                      : "bg-white/[0.03] border-white/10 text-slate-400"
                  }`}
                >
                  🛡 GPS Stamp
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMeasurements(false);
                    setShowArrows(false);
                    setShowCrewPin(false);
                  }}
                  className="ml-auto px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 hover:text-white bg-white/[0.04] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Clean Base
                </button>
              </div>

              {/* Annotated HVAC Jobsite Canvas + Non-Overlapping Watermark Strip */}
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-black select-none">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/pincam/hvac-install.jpg"
                    alt="HVAC condenser installation annotated inside PinCam Markup Studio"
                    fill
                    sizes="(max-width: 1024px) 94vw, 680px"
                    className="object-cover"
                  />

                  {/* SVG Vector Annotations Overlay */}
                  <svg
                    viewBox="0 0 800 500"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    {showMeasurements && (
                      <g>
                        {/* Concrete Pad Dimension Line */}
                        <line
                          x1="190"
                          y1="430"
                          x2="495"
                          y2="465"
                          stroke="#f59e0b"
                          strokeWidth="4"
                          strokeDasharray="8 5"
                        />
                        <circle cx="190" cy="430" r="6" fill="#f59e0b" />
                        <circle cx="495" cy="465" r="6" fill="#f59e0b" />
                        <rect
                          x="275"
                          y="428"
                          width="148"
                          height="30"
                          rx="8"
                          fill="#090d16"
                          stroke="#f59e0b"
                          strokeWidth="2"
                        />
                        <text
                          x="349"
                          y="448"
                          textAnchor="middle"
                          fill="#fde68a"
                          fontSize="13"
                          fontWeight="800"
                          fontFamily="monospace"
                        >
                          36&quot; × 36&quot; LEVEL PAD
                        </text>
                      </g>
                    )}

                    {showArrows && (
                      <g>
                        {/* Disconnect Box Callout */}
                        <circle
                          cx="698"
                          cy="150"
                          r="48"
                          fill="rgba(239,68,68,0.12)"
                          stroke="#ef4444"
                          strokeWidth="3.5"
                        />
                        <line x1="560" y1="95" x2="648" y2="132" stroke="#ef4444" strokeWidth="4" />
                        <rect
                          x="375"
                          y="68"
                          width="200"
                          height="32"
                          rx="8"
                          fill="#dc2626"
                        />
                        <text
                          x="475"
                          y="89"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="12"
                          fontWeight="800"
                          fontFamily="monospace"
                        >
                          NEW 240V EATON DISCONNECT
                        </text>

                        {/* Line-Set Callout */}
                        <line x1="565" y1="365" x2="592" y2="305" stroke="#22c55e" strokeWidth="4" />
                        <rect
                          x="468"
                          y="366"
                          width="215"
                          height="30"
                          rx="8"
                          fill="#052e16"
                          stroke="#22c55e"
                          strokeWidth="2"
                        />
                        <text
                          x="575"
                          y="386"
                          textAnchor="middle"
                          fill="#86efac"
                          fontSize="12"
                          fontWeight="800"
                          fontFamily="monospace"
                        >
                          ✓ UV-SEALED COPPER LINE-SET
                        </text>
                      </g>
                    )}
                  </svg>

                  {/* Pinned Crew Comment Bubble */}
                  {showCrewPin && (
                    <div className="absolute top-2.5 left-2.5 sm:top-[28%] sm:left-[12%] max-w-[195px] sm:max-w-[230px] p-2 sm:p-3 rounded-xl bg-[#070b14]/95 border border-sky-400/50 shadow-2xl backdrop-blur-md">
                      <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-sky-400 mb-0.5 sm:mb-1">
                        <MessageSquare className="w-3 h-3 shrink-0" />
                        <span>PIN #1 • TECH CHRIS</span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-white leading-snug">
                        Subcooling dialed in at 10.2°F. Homeowner signed warranty packet.
                      </p>
                    </div>
                  )}
                </div>

                {/* Authentic Watermark Verification Stamp (cleanly below image so 36"x36" pad is never obscured) */}
                {showWatermark && (
                  <div className="px-3.5 sm:px-4 py-2.5 bg-[#060911] border-t border-amber-500/30 flex flex-wrap items-center justify-between gap-1.5 text-[10px] font-mono">
                    <span className="text-amber-300 font-bold">
                      PINCAM™ VERIFIED • STAGE: AFTER
                    </span>
                    <span className="text-slate-300">
                      NOV 12 • 32.4765° N, 90.1322° W • VERIFIED
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                Real PinCam™ Feature • Non-Destructive Markup Studio
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight">
                Draw Measurements, Point Out Damage &amp; Keep the Clean Photo Underneath.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether you&apos;re showing an insurance adjuster hail hits on a ridge vent or proving to a property manager that a new condenser was installed to code,{" "}
                <strong className="text-white">PinCam™</strong> lets techs add draggable arrows, measurements, 20 Before/After badge styles, and coordinate-pinned crew notes—while preserving the clean un-annotated photo underneath so you can edit or delete markups anytime.
              </p>
              <div className="space-y-2.5 text-sm text-slate-200 pt-1">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Full Undo/Redo &amp; clean base-photo preservation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Automatic EXIF GPS + timestamp + technician watermark stamping</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===============================================================
            TAB 3: DUAL-CAM PIP WALKTHROUGH RECORDER
        ================================================================ */}
        {activeTab === "pip" && (
          <div className="p-4 sm:p-8 lg:p-10 grid lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-[#070a12] border border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    setPipSource(pipSource === "before_photo" ? "tech_notes" : "before_photo")
                  }
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 border border-amber-400 text-amber-200 cursor-pointer"
                >
                  PiP Window: {pipSource === "before_photo" ? "Before Photo" : "Live Tech Cam"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPipCorner(pipCorner === "top-right" ? "bottom-right" : "top-right")
                  }
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/[0.05] border border-white/15 text-white cursor-pointer"
                >
                  Move PiP Corner ({pipCorner})
                </button>
                <button
                  type="button"
                  onClick={() => setShowLowerThird(!showLowerThird)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                    showLowerThird
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-200"
                      : "bg-white/[0.04] border-white/10 text-slate-400"
                  }`}
                >
                  Branded Lower-Third: {showLowerThird ? "ON" : "OFF"}
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/15 bg-black">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/pincam/roof-after.jpg"
                    alt="Narrated jobsite walkthrough video preview"
                    fill
                    sizes="(max-width: 1024px) 94vw, 680px"
                    className="object-cover"
                  />

                  {/* REC Indicator */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/80 border border-red-500/50 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono font-bold text-white">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span>REC 00:42</span>
                    <span className="hidden sm:inline">• NARRATED WALKTHROUGH</span>
                  </div>

                  {/* Draggable/Corner Picture-in-Picture Window */}
                  <div
                    className={`absolute w-28 sm:w-48 aspect-[16/10] rounded-xl overflow-hidden border-2 border-amber-400 shadow-2xl bg-slate-950 transition-all duration-300 ${
                      pipCorner === "top-right"
                        ? "top-2.5 right-2.5 sm:top-3.5 sm:right-3.5"
                        : "bottom-2.5 right-2.5 sm:bottom-20 sm:right-3.5"
                    }`}
                  >
                    {pipSource === "before_photo" ? (
                      <>
                        <Image
                          src="/pincam/roof-before.jpg"
                          alt="Before reference in PiP window"
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                        <span className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-mono font-bold text-amber-300">
                          BEFORE REF
                        </span>
                      </>
                    ) : (
                      <>
                        <Image
                          src="/images/founder-booth.webp"
                          alt="Crew lead narrating walkthrough in selfie PiP"
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                        <span className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-mono font-bold text-emerald-300">
                          CREW LEAD CAM
                        </span>
                      </>
                    )}
                  </div>

                  {/* Branded Lower-Third + Live Voice Transcript (Desktop inside video; Mobile docked cleanly below) */}
                  {showLowerThird && (
                    <div className="hidden sm:flex absolute inset-x-3.5 bottom-3.5 p-3.5 rounded-xl bg-[#060911]/90 backdrop-blur-md border border-amber-500/35 items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] font-mono font-extrabold text-amber-400 uppercase">
                          BORN AGAIN ROOFING • FINAL WALKTHROUGH
                        </div>
                        <p className="text-xs text-white font-medium">
                          &ldquo;...replaced all storm-damaged ridge decking, installed ice &amp; water shield, and cleaned the driveway with a magnetic sweep.&rdquo;
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 shrink-0">
                        AUTO-CAPTIONED
                      </span>
                    </div>
                  )}
                </div>

                {/* Mobile Non-Overlapping Lower-Third Transcript Bar */}
                {showLowerThird && (
                  <div className="sm:hidden p-3 bg-[#060911] border-t border-amber-500/30 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-extrabold text-amber-400 uppercase">
                        BORN AGAIN ROOFING • WALKTHROUGH
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 shrink-0">
                        AUTO-CAPTIONED
                      </span>
                    </div>
                    <p className="text-xs text-white font-medium leading-relaxed">
                      &ldquo;...replaced all storm-damaged ridge decking, installed ice &amp; water shield, and cleaned the driveway with a magnetic sweep.&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                Real PinCam™ Feature • Dual-Cam PiP Walkthroughs
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight">
                Close Absentee Homeowners &amp; Insurance Claims in One Video.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Record the roof or mechanical room with your rear camera while displaying either your face (selfie cam) or the original &ldquo;Before&rdquo; photo in a Picture-in-Picture corner—complete with your company&apos;s branded lower-third banner and automatic voice transcription.
              </p>
            </div>
          </div>
        )}

        {/* ===============================================================
            TAB 4: INSTANT HOMEOWNER / ADJUSTER PDF REPORT & INVOICE
        ================================================================ */}
        {activeTab === "report" && (
          <div className="p-4 sm:p-8 lg:p-10 grid lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white text-slate-900 p-4 sm:p-7 shadow-2xl border border-white/20 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <div className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-600">
                      VERIFIED PINCAM™ COMPLETION REPORT
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-slate-950">
                      Smith Residence — Full Roof Replacement
                    </h4>
                    <p className="text-xs text-slate-600">
                      123 Oak Ridge Dr, Madison, MS 39110 • Inspected by Lead Tech
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                    ✓ GPS &amp; Timestamp Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-200">
                      <Image
                        src="/pincam/roof-before.jpg"
                        alt="Report before photo"
                        fill
                        sizes="(max-width: 640px) 90vw, 300px"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-red-600 block">
                      01. BEFORE — Wind Damage &amp; Ridge Tarp
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-200">
                      <Image
                        src="/pincam/roof-after.jpg"
                        alt="Report after photo"
                        fill
                        sizes="(max-width: 640px) 90vw, 300px"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 block">
                      02. AFTER — Architectural Shingle System
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100 text-xs text-slate-700 leading-relaxed">
                  <strong>Field Summary:</strong> Removed damaged 3-tab shingles, replaced 3 sheets of OSB decking near ridge, installed synthetic underlayment &amp; architectural shingles. Yard magnet-swept and spotless.
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                  <span className="font-mono text-slate-500 break-all sm:break-normal">
                    Share Link: powerdigitalmedia.org/project-report/ms-4092
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-extrabold text-amber-700">
                    <Share2 className="w-3.5 h-3.5" /> Sent via SMS + PDF
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                Real PinCam™ Feature • Instant Customer &amp; Adjuster Reports
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight">
                Text a Branded Inspection Report Before You Pull Out of the Driveway.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Homeowners and insurance adjusters trust what they can see. With 1 tap,{" "}
                <strong className="text-white">PinCam™</strong> bundles your verified photos, markups, and technician notes into a clean branded web link &amp; PDF—plus an optional branded invoice—so you get paid faster with zero disputes.
              </p>
            </div>
          </div>
        )}

        {/* ===============================================================
            TAB 5: REAL PINCAM MOBILE DASHBOARD + PINDROP SATELLITE SYNC
        ================================================================ */}
        {activeTab === "sync" && (
          <div className="p-4 sm:p-8 lg:p-10 grid lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 grid sm:grid-cols-12 gap-4 items-stretch">
              {/* Left: Authentic PinCam Native Mobile Home Screen */}
              <div className="sm:col-span-7 rounded-[26px] bg-[#090d16] border border-[#252f45] p-4 flex flex-col justify-between shadow-2xl">
                <div className="space-y-3.5">
                  {/* Top App Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24 3C14.06 3 6 11.06 6 21C6 32.25 21.15 43.9 22.86 45.18C23.54 45.69 24.46 45.69 25.14 45.18C26.85 43.9 42 32.25 42 21C42 11.06 33.94 3 24 3Z"
                          fill="#6366f1"
                        />
                        <circle cx="24" cy="20" r="9.5" fill="#090d16" />
                        <circle cx="24" cy="20" r="6" fill="#818cf8" />
                        <circle cx="26.2" cy="17.8" r="2" fill="#ffffff" />
                      </svg>
                      <span className="text-sm font-black text-white">PinCam</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/20 border border-[#6366f1]/45 text-[10px] font-bold text-indigo-300">
                      📲 Installed App
                    </span>
                  </div>

                  <div>
                    <div className="text-lg font-black text-white leading-tight">
                      Good morning, Crew
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Central MS Field Workspace • Roofing &amp; HVAC
                    </div>
                  </div>

                  {/* 3 Real KPI Tiles */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-xl bg-[#111726] border border-white/[0.07]">
                      <div className="text-base font-black text-white">7</div>
                      <div className="text-[10px] text-slate-400">Today&apos;s Jobs</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#111726] border border-white/[0.07]">
                      <div className="text-base font-black text-white">24</div>
                      <div className="text-[10px] text-slate-400">Photos</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#111726] border border-white/[0.07]">
                      <div className="text-base font-black text-rose-400">4</div>
                      <div className="text-[10px] text-slate-400">Crew Chat</div>
                    </div>
                  </div>

                  {/* Full-Width Electric Indigo Capture CTA */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("ghost")}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(79,70,229,0.4)] cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Capture Photo or Video</span>
                  </button>

                  {/* 3 Studio Tiles (Social Studio | 9:16 Reels | Before/After) */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-[#13172e] border border-[#6366f1]/40">
                      <div className="text-[11px] font-extrabold text-white">Social Studio</div>
                      <div className="text-[9px] text-indigo-300 mt-0.5">FB • IG • GBP</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#1f1b12] border border-amber-400/40">
                      <div className="text-[11px] font-extrabold text-amber-300">9:16 Reels</div>
                      <div className="text-[9px] text-slate-300 mt-0.5">ClipCraft Video</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#111726] border border-white/10">
                      <div className="text-[11px] font-extrabold text-white">Before/After</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">20 Tag Styles</div>
                    </div>
                  </div>
                </div>

                {/* Authentic 5-Tab Mobile Bottom Dock */}
                <div className="mt-4 pt-2.5 border-t border-white/10 grid grid-cols-5 items-center text-center text-[9px] font-bold text-slate-400">
                  <span className="text-indigo-400">🏠 Home</span>
                  <span>📁 Projects</span>
                  <span className="mx-auto w-8 h-8 rounded-full bg-[#6366f1] text-white flex items-center justify-center shadow-lg">
                    📷
                  </span>
                  <span>📣 Social</span>
                  <span>☰ More</span>
                </div>
              </div>

              {/* Right: Live Sync into PDM PinDrop Satellite Map + SMS Review */}
              <div className="sm:col-span-5 flex flex-col justify-between gap-3">
                <div className="rounded-2xl bg-[#12141c] border border-amber-400/35 p-3.5 space-y-2.5 flex-1">
                  <div className="text-[10px] font-mono font-extrabold text-amber-300 uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Synced to PinDrop™ Satellite Map
                  </div>
                  <div className="relative aspect-[16/10] sm:aspect-auto sm:h-32 rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src="/pindrop/sat-madison.jpg"
                      alt="Madison MS satellite neighborhood pin"
                      fill
                      sizes="(max-width: 640px) 90vw, 240px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center border-2 border-black shadow-lg">
                        📍
                      </span>
                    </div>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/85 text-[10px] font-bold text-white">
                      Madison, MS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Publishes directly to your website&apos;s `/pins/` map, creates a neighborhood Google page, and texts the homeowner for a 5-star review.
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3.5 space-y-1">
                  <div className="text-xs font-extrabold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Android APK + iPhone Ready
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Native 9.9 MB Android install + 1-tap iPhone Home Screen app for every truck in your fleet.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                The Unfair Advantage • PinCam™ + PinDrop™ Connected
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight">
                Other Photo Apps Trap Your Work. Ours Ranks You on Google.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                In standalone apps like CompanyCam, thousands of great job photos sit buried in private folders nobody ever sees. Because we built both{" "}
                <strong className="text-white">PinCam™ and PDM PinDrop™</strong>, your crew&apos;s best daily work turns straight into live satellite map pins, Google rankings, 9:16 social reels, and 5-star reviews.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300">
                <Sparkles className="w-4 h-4" />
                Zero double-entry • Zero per-tech seat fees
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
