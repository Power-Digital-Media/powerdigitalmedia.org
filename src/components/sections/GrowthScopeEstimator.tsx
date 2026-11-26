"use client";

import { useState, useMemo, type FormEvent } from "react";
import {
  Calculator,
  CheckCircle2,
  Phone,
  MessageSquare,
  Send,
  Sparkles,
  ShieldCheck,
  Hammer,
  Shovel,
  UtensilsCrossed,
  Building2,
  MapPin,
  Layers,
  Activity,
  Camera,
  TrendingUp,
  Film,
  AlertCircle,
} from "lucide-react";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";
import {
  ESTIMATOR_BUSINESS_TYPES,
  ESTIMATOR_HOMETOWN_AREAS,
  ONE_TIME_WEBSITE_BUILD_CONFIG,
  CORE_FOUNDATION_CONFIG,
  ESTIMATOR_ADDON_MODULES,
  CUSTOM_SCOPE_EXTENSIONS,
  calculateEstimatorTotals,
  type EstimatorIndustryId,
  type EstimatorAddOnId,
  type EstimatorHometownArea,
} from "@/data/estimatorConfig";

interface GrowthScopeEstimatorProps {
  defaultIndustryId?: EstimatorIndustryId;
  defaultCity?: EstimatorHometownArea;
  defaultAddOns?: EstimatorAddOnId[];
  isStandalonePage?: boolean;
}

const INDUSTRY_ICONS: Record<EstimatorIndustryId, typeof Hammer> = {
  trades_roofing_hvac: Hammer,
  dirt_lawn_exterior: Shovel,
  restaurant_catering: UtensilsCrossed,
  local_business_ministry: Building2,
};

const ADDON_ICONS: Record<EstimatorAddOnId, typeof MapPin> = {
  pindrop: MapPin,
  pincam: Camera,
  meta_ads_funnels: TrendingUp,
};

export default function GrowthScopeEstimator({
  defaultIndustryId = "trades_roofing_hvac",
  defaultCity = "Jackson",
  defaultAddOns,
  isStandalonePage = false,
}: GrowthScopeEstimatorProps) {
  const initialIndustry =
    ESTIMATOR_BUSINESS_TYPES.find((b) => b.id === defaultIndustryId) ||
    ESTIMATOR_BUSINESS_TYPES[0];

  const [industryId, setIndustryId] = useState<EstimatorIndustryId>(
    initialIndustry.id
  );
  const [city, setCity] = useState<EstimatorHometownArea>(defaultCity);
  const [needsNewWebsite, setNeedsNewWebsite] = useState<boolean>(true);
  const [selectedAddOns, setSelectedAddOns] = useState<EstimatorAddOnId[]>(
    defaultAddOns ?? initialIndustry.recommendedAddOns
  );
  const [expandedMobileDetails, setExpandedMobileDetails] = useState<
    Record<string, boolean>
  >({});

  const toggleMobileDetails = (key: string) => {
    setExpandedMobileDetails((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const activeIndustry = useMemo(
    () =>
      ESTIMATOR_BUSINESS_TYPES.find((b) => b.id === industryId) ||
      ESTIMATOR_BUSINESS_TYPES[0],
    [industryId]
  );

  const totals = useMemo(
    () =>
      calculateEstimatorTotals({
        needsNewWebsite,
        selectedAddOns,
      }),
    [needsNewWebsite, selectedAddOns]
  );

  const handleSelectIndustry = (nextId: EstimatorIndustryId) => {
    setIndustryId(nextId);
    const nextConfig = ESTIMATOR_BUSINESS_TYPES.find((b) => b.id === nextId);
    if (nextConfig) {
      setSelectedAddOns(nextConfig.recommendedAddOns);
    }
  };

  const toggleAddOn = (id: EstimatorAddOnId) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const smsBody = `Hi Damein, I built an estimate on powerdigitalmedia.org for my ${activeIndustry.shortLabel} business in ${city} (${totals.smsShortStackLabel} — est. ${totals.monthlyRangeLabel}${
    totals.needsNewWebsite ? `, build ${totals.oneTimeRangeLabel}` : ""
  }). Got a few minutes to talk?`;
  const smsHref = `sms:6014462393?body=${encodeURIComponent(smsBody)}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.set("industry", activeIndustry.title);
    formData.set("hometown_area", `${city}, MS`);
    formData.set(
      "website_build_option",
      needsNewWebsite
        ? `New 0.8s Custom Website (${totals.oneTimeRangeLabel})`
        : "Already Have a PDM Website ($0 Build)"
    );
    formData.set("selected_modules", totals.selectedModulesList.join(", "));
    formData.set("one_time_ballpark", totals.oneTimeRangeLabel);
    formData.set("monthly_ballpark", totals.monthlyRangeLabel);
    formData.set(
      "field_suite_bundle_applied",
      totals.fieldSuiteBundleApplied ? "Yes (-$50/mo)" : "No"
    );
    formData.set(
      "estimated_monthly_midpoint",
      String(totals.monthlyMidpoint)
    );
    formData.set(
      "services",
      `${totals.smsShortStackLabel} (${totals.monthlyRangeLabel})`
    );
    formData.set(
      "notes",
      `Estimator Scope: ${activeIndustry.title} in ${city}, MS | Website Build: ${totals.oneTimeRangeLabel} | Monthly Partner Range: ${totals.monthlyRangeLabel}${totals.fieldSuiteBundleApplied ? " (includes -$50/mo Full Field Suite Bundle)" : ""} | Selected Modules: ${totals.selectedModulesList.join(" + ")}`
    );

    try {
      const { ok, result } = await submitVerifiedLeadForm({
        formSource: "interactive-growth-estimator",
        formData,
      });

      if (ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(
          result.error ||
            "Could not submit right now—please text or call Damein at (601) 446-2393."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Network hiccup—tap Text or Call below to reach Damein directly at (601) 446-2393."
      );
    }
  };

  const HeadingTag = isStandalonePage ? "h1" : "h2";
  const CoreHeadingTag = isStandalonePage ? "h2" : "h3";
  const ModHeadingTag = isStandalonePage ? "h3" : "h4";

  return (
    <section
      id="estimator"
      className={`relative overflow-hidden bg-[#06080f] text-white ${
        isStandalonePage
          ? "pt-[114px] pb-14 sm:pt-36 md:pt-40 md:pb-28"
          : "py-12 md:py-28 border-t border-white/10"
      }`}
    >
      {/* Blueprint Grid & Industrial Amber/Emerald Ambient Lighting */}
      <div
        className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 left-1/4 w-[680px] h-[420px] bg-amber-500/[0.08] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[560px] h-[380px] bg-emerald-500/[0.06] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-5 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-amber-500/10 border border-amber-500/35 text-amber-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-3 sm:mb-4">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            Interactive Central MS Growth &amp; Scope Estimator
          </div>

          <HeadingTag className="text-2xl sm:text-5xl font-black uppercase tracking-tight leading-[1.04] text-white mb-2 sm:mb-4">
            See Your Ballpark Investment &amp;{" "}
            <span className="text-amber-400">Everything Included Upfront.</span>
          </HeadingTag>

          <p className="sm:hidden text-xs text-slate-300 leading-relaxed">
            Tap your trade, city, and modules below to see your live Central MS ballpark instantly.
          </p>
          <p className="hidden sm:block text-slate-300 text-base sm:text-lg leading-relaxed">
            No mystery agency retainers or per-technician SaaS seat traps. Toggle your trade, hometown market, and growth modules below to see your starting Central Mississippi range in seconds—then text or lock in your custom 1-on-1 scope with Damein Donald.
          </p>
        </div>

        {/* Mobile Sticky Live Ballpark Bar (Clears Navbar + Quick-Jump Strip) */}
        <div className="lg:hidden sticky top-[92px] z-30 mb-4 -mx-1">
          <div className="rounded-2xl bg-[#0b0f1c]/95 backdrop-blur-xl border border-amber-400/50 px-3.5 py-2.5 shadow-[0_14px_34px_rgba(0,0,0,0.75),0_0_20px_rgba(245,158,11,0.18)] flex items-center justify-between gap-2.5">
            <div className="min-w-0">
              <div className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-amber-300 truncate">
                Live Scope • {city}, MS
              </div>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-base sm:text-lg font-black text-amber-400 tracking-tight">
                  {totals.monthlyRangeLabel}
                </span>
                <span className="text-[11px] font-semibold text-slate-300">
                  {needsNewWebsite ? `+ ${totals.oneTimeRangeLabel} build` : "• $0 build"}
                </span>
              </div>
            </div>
            <a
              href="#estimator-summary-card"
              className="shrink-0 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-md active:scale-95 transition-all"
            >
              Lock Scope ↓
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* =================================================================
              LEFT COLUMN (7 COLS): MODULAR CONFIGURATOR
          ================================================================== */}
          <div className="lg:col-span-7 min-w-0 space-y-5 sm:space-y-7">
            {/* STEP 1: BUSINESS TYPE */}
            <div className="rounded-3xl bg-[#090d18] border border-white/10 p-4 sm:p-7 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-amber-400">
                  Step 01 • Select Your Industry
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  {activeIndustry.avgTicketLabel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {ESTIMATOR_BUSINESS_TYPES.map((b) => {
                  const Icon = INDUSTRY_ICONS[b.id];
                  const active = b.id === industryId;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => handleSelectIndustry(b.id)}
                      className={`text-left p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5 ${
                        active
                          ? "bg-amber-500/[0.11] border-amber-400 shadow-[0_0_28px_rgba(245,158,11,0.16)]"
                          : "bg-[#06080f] border-white/10 hover:border-white/25"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                          active
                            ? "bg-amber-400 text-slate-950 border-amber-300"
                            : "bg-white/[0.04] text-amber-400 border-white/10"
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-black text-white leading-snug">
                          {b.title}
                        </div>
                        <div className="hidden sm:block text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {b.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Industry ROI Banner (Desktop/Tablet — Shown in Summary on Mobile) */}
              <div className="hidden sm:flex p-4 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/30 items-start gap-3">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-black text-emerald-300 uppercase tracking-wide">
                    {activeIndustry.roiHeadline}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeIndustry.roiDetail}
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 2: HOMETOWN AREA (Single-Row Snap Strip on Mobile) */}
            <div className="rounded-3xl bg-[#090d18] border border-white/10 p-4 sm:p-7 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Step 02 • Primary Hometown Market
                </span>
                <span className="hidden sm:inline text-[11px] text-slate-400 font-mono">
                  Central MS Local Priority
                </span>
              </div>

              <div className="flex sm:flex-wrap gap-2 overflow-x-auto sm:overflow-visible no-scrollbar snap-x pb-0.5 sm:pb-0">
                {ESTIMATOR_HOMETOWN_AREAS.map((area) => {
                  const active = city === area;
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setCity(area)}
                      className={`shrink-0 snap-start px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                        active
                          ? "bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.28)]"
                          : "bg-[#06080f] text-slate-300 border-white/10 hover:border-amber-400/40 hover:text-white"
                      }`}
                    >
                      {area}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: ONE-TIME CUSTOM WEBSITE BUILD TOGGLE */}
            <div className="rounded-3xl bg-[#090d18] border border-white/10 p-4 sm:p-7 space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  Step 03 • Website Build
                </span>
                <span className="hidden sm:inline text-[11px] font-mono text-slate-400 line-through">
                  {ONE_TIME_WEBSITE_BUILD_CONFIG.typicalAgencyComparison}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setNeedsNewWebsite(true)}
                  className={`p-3 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    needsNewWebsite
                      ? "bg-amber-500/[0.11] border-amber-400"
                      : "bg-[#06080f] border-white/10 hover:border-white/25"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 mb-1">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase text-amber-300">
                      New 0.8s Site
                    </span>
                    <span className="text-xs sm:text-sm font-black text-white">$1,000 – $1,500</span>
                  </div>
                  <p className="hidden sm:block text-xs text-slate-300">
                    One-time custom Next.js build • 100% code &amp; domain ownership
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setNeedsNewWebsite(false)}
                  className={`p-3 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    !needsNewWebsite
                      ? "bg-emerald-500/[0.11] border-emerald-400"
                      : "bg-[#06080f] border-white/10 hover:border-white/25"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 mb-1">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase text-emerald-300">
                      Have PDM Site
                    </span>
                    <span className="text-xs sm:text-sm font-black text-white">$0 Build</span>
                  </div>
                  <p className="hidden sm:block text-xs text-slate-300">
                    Plug monthly SEO, Watchtower, Field Apps, or Meta Ads straight in
                  </p>
                </button>
              </div>

              {needsNewWebsite && (
                <ul className="hidden sm:grid sm:grid-cols-2 gap-2 pt-1">
                  {ONE_TIME_WEBSITE_BUILD_CONFIG.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* STEP 4: MONTHLY GROWTH & INFRASTRUCTURE STACK */}
            <div className="rounded-3xl bg-[#090d18] border border-white/10 p-4 sm:p-7 space-y-4 sm:space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-amber-400">
                  Step 04 • Monthly Growth Stack
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 font-bold">
                  Zero Hostage Contracts
                </span>
              </div>

              {/* 1. ALWAYS INCLUDED CORE FOUNDATION (Compact Chips on Mobile, Full Breakdown on Desktop) */}
              <div className="rounded-2xl bg-[#06080f] border border-emerald-500/40 p-3.5 sm:p-5 space-y-3 sm:space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-white/10">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-[9px] sm:text-[10px] font-mono font-extrabold uppercase mb-1">
                      <Activity className="w-3 h-3 text-emerald-400" />
                      Always Included Base
                    </div>
                    <CoreHeadingTag className="text-sm sm:text-xl font-black uppercase text-white">
                      {CORE_FOUNDATION_CONFIG.title}
                    </CoreHeadingTag>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="hidden sm:block text-[11px] font-mono text-slate-400 line-through">
                      ~$1,850/mo standalone value
                    </div>
                    <div className="text-sm sm:text-lg font-black text-emerald-400">
                      $550 – $650/mo
                    </div>
                  </div>
                </div>

                {/* Mobile Compact Foundation Chips + Expand Toggle */}
                <div className="sm:hidden space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {CORE_FOUNDATION_CONFIG.features.map((feat) => (
                      <span
                        key={`chip-${feat.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-semibold text-slate-200"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{feat.title}</span>
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleMobileDetails("core_foundation")}
                    className="text-[11px] font-mono font-bold text-emerald-300 underline underline-offset-4 cursor-pointer"
                  >
                    {expandedMobileDetails["core_foundation"]
                      ? "Hide foundation details ▲"
                      : "See full foundation details ▼"}
                  </button>
                </div>

                <div
                  className={`${
                    expandedMobileDetails["core_foundation"] ? "grid" : "hidden"
                  } sm:grid gap-3`}
                >
                  {CORE_FOUNDATION_CONFIG.features.map((feat) => (
                    <div
                      key={feat.id}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.07] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {feat.title}
                          </span>
                          {feat.badge && (
                            <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-mono font-black uppercase">
                              {feat.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. OPTIONAL ADD-ON MODULES */}
              <div className="space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                    Optional High-Velocity Add-On Modules (Tap to Toggle):
                  </span>
                  {totals.fieldSuiteBundleApplied ? (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-[10px] font-mono font-extrabold uppercase text-emerald-300">
                      ✓ Full Field Suite Bundle Applied (-$50/mo)
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-amber-300">
                      Tip: Pair PinDrop™ + PinCam™ to save $50/mo
                    </span>
                  )}
                </div>

                {ESTIMATOR_ADDON_MODULES.map((mod) => {
                  const selected = selectedAddOns.includes(mod.id);
                  const ModIcon = ADDON_ICONS[mod.id];
                  return (
                    <div
                      key={mod.id}
                      onClick={() => toggleAddOn(mod.id)}
                      role="checkbox"
                      aria-checked={selected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleAddOn(mod.id);
                        }
                      }}
                      className={`rounded-2xl p-5 border transition-all cursor-pointer select-none ${
                        selected
                          ? "bg-amber-500/[0.1] border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.14)]"
                          : "bg-[#06080f] border-white/10 hover:border-white/25"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              selected
                                ? "bg-amber-400 border-amber-300 text-slate-950"
                                : "bg-white/[0.04] border-white/20 text-transparent"
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <ModIcon className="w-4 h-4 text-amber-400 shrink-0" />
                              <ModHeadingTag className="text-sm sm:text-base font-black uppercase text-white">
                                {mod.title}
                              </ModHeadingTag>
                            </div>
                            <p className="text-[11px] font-mono text-emerald-300 mt-0.5">
                              {mod.replacesNote}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-mono font-black shrink-0 self-start sm:self-center ${
                            selected
                              ? "bg-amber-400 text-slate-950"
                              : "bg-white/[0.06] text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {mod.badge}
                        </span>
                      </div>

                      <div className="sm:hidden pt-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMobileDetails(mod.id);
                          }}
                          className="text-[11px] font-mono font-bold text-amber-300 underline underline-offset-4 cursor-pointer"
                        >
                          {expandedMobileDetails[mod.id]
                            ? "Hide included deliverables ▲"
                            : `View ${mod.bullets.length} included deliverables ▼`}
                        </button>
                      </div>

                      <div
                        className={`${
                          expandedMobileDetails[mod.id] ? "block" : "hidden"
                        } sm:block space-y-2.5 pl-0 sm:pl-9 mt-2.5 sm:mt-0`}
                      >
                        {mod.bullets.map((b) => (
                          <div
                            key={b.heading}
                            className="p-3 rounded-xl bg-black/30 border border-white/[0.06]"
                          >
                            <div className="text-xs font-bold text-white mb-0.5">
                              {b.heading}
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {b.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Modular Custom-Scope Extensions (Desktop/Tablet) */}
                {CUSTOM_SCOPE_EXTENSIONS.map((ext) => (
                  <div
                    key={ext.id}
                    className="hidden sm:flex rounded-2xl p-4 bg-white/[0.02] border border-dashed border-white/15 flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                        <Film className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {ext.title}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px] font-mono font-bold uppercase text-amber-300">
                            {ext.statusBadge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                          {ext.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN (5 COLS): STICKY LIVE BALLPARK & 3 CONVERSION PATHS
          ================================================================== */}
          <div
            id="estimator-summary-card"
            className="lg:col-span-5 min-w-0 lg:sticky lg:top-28 scroll-mt-32"
          >
            <div className="rounded-3xl bg-[#0b0e18] border-2 border-amber-500/45 shadow-[0_24px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.12)] overflow-hidden">
              {/* Top Telemetry Header */}
              <div className="px-6 py-4 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-emerald-500/10 border-b border-white/10 flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-amber-300">
                  Live Scope Summary • {city}, MS
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  ● Instant Ballpark
                </span>
              </div>

              <div className="p-6 sm:p-7 space-y-6">
                {/* Live Numbers */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#06080f] border border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        One-Time Engineering Build
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        {needsNewWebsite
                          ? "0.8s Custom Next.js + Calculator"
                          : "Existing PDM Website"}
                      </div>
                    </div>
                    <div className="text-right">
                      {needsNewWebsite && (
                        <div className="text-[10px] font-mono text-slate-400 line-through">
                          $4,500–$8,000+
                        </div>
                      )}
                      <div className="text-lg sm:text-xl font-black text-white">
                        {totals.oneTimeRangeLabel}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-[#090d18] to-emerald-500/10 border border-amber-400/45 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                        Estimated Monthly Partner Range
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 line-through">
                        {totals.standaloneValueLabel} value
                      </span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                      {totals.monthlyRangeLabel}
                    </div>
                    {totals.fieldSuiteBundleApplied && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-[10px] font-mono font-extrabold uppercase text-emerald-300">
                        ✓ Full Field Suite Bundle Applied (-$50/mo)
                      </div>
                    )}
                    <div className="text-xs text-emerald-300 font-semibold">
                      ✓ {activeIndustry.roiHeadline}
                    </div>
                  </div>

                  {/* Active Stack Pills */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Included In Your Selected Scope:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {needsNewWebsite && (
                        <span className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[11px] font-semibold text-white">
                          0.8s Custom Website
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/12 border border-emerald-500/30 text-[11px] font-semibold text-emerald-300">
                        Site Intelligence™ ($299/mo Value)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[11px] font-semibold text-slate-200">
                        Map Pack + GEO/AEO + CRM
                      </span>
                      {selectedAddOns.includes("pindrop") && (
                        <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/35 text-[11px] font-bold text-amber-300">
                          PDM PinDrop™ SEO Engine
                        </span>
                      )}
                      {selectedAddOns.includes("pincam") && (
                        <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/35 text-[11px] font-bold text-amber-300">
                          PinCam™ ($0 Seat Fees)
                        </span>
                      )}
                      {selectedAddOns.includes("meta_ads_funnels") && (
                        <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/35 text-[11px] font-bold text-amber-300">
                          Done-For-You Meta Ads &amp; Video
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed border-t border-white/10 pt-3">
                    <strong className="text-slate-200">
                      Estimated Central MS Starting Range
                    </strong>{" "}
                    — Final scope tailored 1-on-1 with Damein Donald. Zero hostage contracts.
                  </p>
                </div>

                {/* Mobile 1-Tap Email Form Expander (Always Expanded on Desktop) */}
                {status !== "success" && (
                  <button
                    type="button"
                    onClick={() => toggleMobileDetails("email_scope_form")}
                    className="sm:hidden w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(245,158,11,0.3)] cursor-pointer"
                  >
                    <span>
                      {expandedMobileDetails["email_scope_form"]
                        ? "Hide Email Form ▲"
                        : "Lock Scope Online (30s) ▼"}
                    </span>
                  </button>
                )}

                <div
                  className={`${
                    status === "success" || expandedMobileDetails["email_scope_form"]
                      ? "block"
                      : "hidden"
                  } sm:block`}
                >
                {/* CONVERSION PATH 1: INLINE LEAD LOCK FORM */}
                {status === "success" ? (
                  <div className="p-5 rounded-2xl bg-emerald-500/12 border border-emerald-500/35 text-center space-y-2.5">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <h3 className="text-base font-black uppercase text-white">
                      Custom Scope Sent to Damein!
                    </h3>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      We logged your{" "}
                      <strong className="text-amber-300">
                        {totals.monthlyRangeLabel}
                      </strong>{" "}
                      {city} estimate and will reach out personally within 1 business day—or tap below to text/call Damein right now.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <FormSecurityFields />

                    <div className="grid sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        disabled={status === "submitting"}
                        aria-label="Your Name"
                        placeholder="Your Name *"
                        className="w-full px-3.5 py-3 text-xs bg-[#06080f] border border-white/15 focus:border-amber-400 rounded-xl outline-none text-white placeholder:text-slate-500"
                      />
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        disabled={status === "submitting"}
                        aria-label="Best Email Address"
                        placeholder="Best Email *"
                        className="w-full px-3.5 py-3 text-xs bg-[#06080f] border border-white/15 focus:border-amber-400 rounded-xl outline-none text-white placeholder:text-slate-500"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2.5">
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        disabled={status === "submitting"}
                        aria-label="Cell Phone Number (optional)"
                        placeholder="Cell # (optional)"
                        className="w-full px-3.5 py-3 text-xs bg-[#06080f] border border-white/15 focus:border-amber-400 rounded-xl outline-none text-white placeholder:text-slate-500"
                      />
                      <input
                        type="text"
                        name="business_name"
                        autoComplete="organization"
                        disabled={status === "submitting"}
                        aria-label="Business Name (optional)"
                        placeholder="Business Name (optional)"
                        className="w-full px-3.5 py-3 text-xs bg-[#06080f] border border-white/15 focus:border-amber-400 rounded-xl outline-none text-white placeholder:text-slate-500"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/25 rounded-xl px-3 py-2 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errorMsg}</span>
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(245,158,11,0.32)] cursor-pointer disabled:opacity-50"
                    >
                      {status === "submitting" ? (
                        <span>Locking In Your Scope...</span>
                      ) : (
                        <>
                          <span>Send My Custom Scope &amp; Check Availability</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* CONVERSION PATHS 2 & 3: INSTANT SMS & CALL */}
                </div>
                <div className="pt-3 border-t border-white/10 space-y-2.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 text-center">
                    Or Reach Damein Directly in Jackson Right Now:
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={smsHref}
                      className="py-3 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 text-center"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Text Scope to Damein</span>
                    </a>
                    <a
                      href="tel:6014462393"
                      className="py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 text-center"
                    >
                      <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Call (601) 446-2393</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>5.0★ BBB Accredited • Headquartered in Jackson, MS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
