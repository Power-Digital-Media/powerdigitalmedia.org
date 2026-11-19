"use client";

import { useState, useEffect, useMemo, useRef, type FormEvent } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Bot,
  Code2,
  MapPin,
  Gauge,
  Phone,
  MessageSquare,
  Send,
  ArrowRight,
  Activity,
  Globe,
  FileCode2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Loader2,
  Lock,
  Zap,
} from "lucide-react";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";
import type {
  ScannerIssue,
  ScannerPageSpeedMobileMetrics,
  ScannerStage1Response,
} from "@/lib/scanner-types";

const CENTRAL_MS_CITIES = [
  "Jackson, MS",
  "Madison, MS",
  "Flora, MS",
  "Brandon, MS",
  "Ridgeland, MS",
  "Flowood, MS",
  "Pearl, MS",
  "Clinton, MS",
  "Canton, MS",
  "Byram, MS",
] as const;

const QUICK_SERVICE_PILLS = [
  "Roofing",
  "HVAC",
  "Dirt Work",
  "Restaurant",
  "Plumbing",
  "Medical/Retail",
] as const;

type ScannerTabId =
  | "overview"
  | "geo_aeo"
  | "schema"
  | "seo_local"
  | "speed_conversion";

interface AllInOneSiteScannerProps {
  isStandalonePage?: boolean;
  headlineOverride?: string;
  subheadlineOverride?: string;
}

function getScoreTheme(score: number | null) {
  if (score === null) {
    return {
      text: "text-cyan-300",
      border: "border-cyan-500/35",
      bg: "bg-cyan-500/10",
      ring: "#38bdf8",
      grade: "…",
      statusLabel: "Testing…",
    };
  }
  if (score >= 85) {
    return {
      text: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      ring: "#10b981",
      grade: score >= 95 ? "A+" : "A",
      statusLabel: "Strong",
    };
  }
  if (score >= 68) {
    return {
      text: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      ring: "#f59e0b",
      grade: score >= 76 ? "B" : "C+",
      statusLabel: "Needs Tuning",
    };
  }
  return {
    text: "text-rose-400",
    border: "border-rose-500/45",
    bg: "bg-rose-500/10",
    ring: "#f43f5e",
    grade: score >= 52 ? "C-" : score >= 38 ? "D" : "F",
    statusLabel: "Leaking Calls",
  };
}

export default function AllInOneSiteScanner({
  isStandalonePage = true,
  headlineOverride,
  subheadlineOverride,
}: AllInOneSiteScannerProps) {
  const [urlInput, setUrlInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const [cityChoice, setCityChoice] = useState<string>("Jackson, MS");
  const [customCity, setCustomCity] = useState("");

  const [scanPhase, setScanPhase] = useState<"idle" | "scanning" | "ready" | "error">(
    "idle"
  );
  const [scanError, setScanError] = useState("");
  const [stage1, setStage1] = useState<ScannerStage1Response | null>(null);

  const [psiPhase, setPsiPhase] = useState<"idle" | "running" | "done" | "unavailable">(
    "idle"
  );
  const [psiMobile, setPsiMobile] = useState<ScannerPageSpeedMobileMetrics | null>(
    null
  );
  const [psiNote, setPsiNote] = useState("");

  const [activeTab, setActiveTab] = useState<ScannerTabId>("overview");
  const [showRawSchema, setShowRawSchema] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Lead lock form state
  const [leadStatus, setLeadStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [leadError, setLeadError] = useState("");

  const abortRef = useRef<AbortController | null>(null);
  const autoBootstrappedRef = useRef(false);
  const resultsAnchorRef = useRef<HTMLDivElement | null>(null);

  const effectiveCity =
    cityChoice === "__custom__" ? customCity.trim() || "Jackson, MS" : cityChoice;

  const runLiveScan = async (params?: {
    overrideUrl?: string;
    overrideCity?: string;
    overrideService?: string;
  }) => {
    const rawUrl = (params?.overrideUrl ?? urlInput).trim();
    const rawCity = (params?.overrideCity ?? effectiveCity).trim() || "Jackson, MS";
    const rawService = (params?.overrideService ?? serviceInput).trim();

    if (!rawUrl) {
      setScanError("Enter a website domain first (for example: bornagainroofing.com).");
      setScanPhase("error");
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setScanPhase("scanning");
    setScanError("");
    setStage1(null);
    setPsiPhase("running");
    setPsiMobile(null);
    setPsiNote("");
    setActiveTab("overview");
    setLeadStatus("idle");
    setLeadError("");

    // Stage 1 Fast Multi-Pillar Probe (~1-2s), followed immediately by Stage 2 PSI on resolved finalUrl
    try {
      const res = await fetch("/api/scanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: rawUrl,
          targetCity: rawCity,
          targetService: rawService,
        }),
        signal: controller.signal,
      });

      const data = await res.json();
      if (controller.signal.aborted) return;

      if (!res.ok || !data?.ok) {
        setScanError(
          data?.error ||
            "Could not scan that URL. Verify the domain is live and publicly reachable."
        );
        setScanPhase("error");
        setPsiPhase("idle");
        controller.abort();
        return;
      }

      const typedStage1 = data as ScannerStage1Response;
      setStage1(typedStage1);
      setScanPhase("ready");

      // Fire Stage 2 Google Lighthouse Mobile scan against resolved finalUrl (skips redirect overhead)
      fetch("/api/scanner/pagespeed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: typedStage1.http.finalUrl }),
        signal: controller.signal,
      })
        .then(async (r) => {
          const psiData = await r.json();
          if (controller.signal.aborted) return;
          if (psiData?.ok && psiData?.mobile) {
            setPsiMobile(psiData.mobile);
            setPsiPhase("done");
          } else {
            setPsiNote(
              psiData?.message ||
                "Google Lighthouse Mobile timed out on target server."
            );
            setPsiPhase("unavailable");
          }
        })
        .catch(() => {
          if (controller.signal.aborted) return;
          setPsiNote("Google Mobile Lighthouse test timed out.");
          setPsiPhase("unavailable");
        });

      setTimeout(() => {
        resultsAnchorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 120);
    } catch (err: unknown) {
      if (controller.signal.aborted) return;
      setScanError(
        err instanceof Error
          ? err.message
          : "Network error while running live scanner."
      );
      setScanPhase("error");
      setPsiPhase("idle");
    }
  };

  // Auto-run if launched with ?url=...&city=...&service=...
  useEffect(() => {
    if (autoBootstrappedRef.current) return;
    if (typeof window === "undefined") return;

    const sp = new URLSearchParams(window.location.search);
    const qUrl = sp.get("url")?.trim() || "";
    const qCity = sp.get("city")?.trim() || "";
    const qService = sp.get("service")?.trim() || "";

    if (qCity) {
      const matchedPreset = CENTRAL_MS_CITIES.find(
        (c) => c.toLowerCase() === qCity.toLowerCase()
      );
      if (matchedPreset) {
        setCityChoice(matchedPreset);
      } else {
        setCityChoice("__custom__");
        setCustomCity(qCity);
      }
    }

    if (qService) {
      setServiceInput(qService);
    }

    if (qUrl) {
      autoBootstrappedRef.current = true;
      setUrlInput(qUrl);
      void runLiveScan({
        overrideUrl: qUrl,
        overrideCity: qCity || "Jackson, MS",
        overrideService: qService,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recompute Overall Composite + Dynamic Speed Issue once Google Lighthouse finishes
  const combinedIssues = useMemo<ScannerIssue[]>(() => {
    if (!stage1) return [];
    const list = [...stage1.issues];

    if (psiMobile) {
      const perf = psiMobile.performanceScore;
      const lcp = psiMobile.lcpSeconds;
      if (perf < 60 || (lcp !== null && lcp > 4.0)) {
        list.unshift({
          id: "psi-mobile-slow",
          pillar: "speed",
          severity: "critical",
          title: `Slow Google Mobile Speed (${perf}/100 • ${psiMobile.displayLcp} LCP)`,
          detail: `Google Lighthouse measured ${psiMobile.displayLcp} Largest Contentful Paint and ${psiMobile.displayTbt} Total Blocking Time on cellular simulation.`,
          businessImpact:
            "53% of mobile callers abandon pages taking longer than 3 seconds—hurting both Google Map Pack rankings and ad conversion rates.",
        });
      } else if (perf < 85 || (lcp !== null && lcp > 2.5)) {
        const firstWarningIdx = list.findIndex((i) => i.severity !== "critical");
        const warnItem: ScannerIssue = {
          id: "psi-mobile-moderate",
          pillar: "speed",
          severity: "warning",
          title: `Mobile Speed Has Room to Gain (${perf}/100 • ${psiMobile.displayLcp} LCP)`,
          detail: `Google Mobile Lighthouse scored ${perf}/100 (target: 90+ and <= 2.5s LCP; PDM custom Next.js builds average 0.8s–1.4s).`,
          businessImpact:
            "Shaving 1–2 seconds off mobile load time directly lifts tap-to-call conversion rates.",
        };
        if (firstWarningIdx === -1) list.push(warnItem);
        else list.splice(firstWarningIdx, 0, warnItem);
      } else {
        list.push({
          id: "psi-mobile-fast",
          pillar: "speed",
          severity: "passed",
          title: `Fast Google Mobile Lighthouse Performance (${perf}/100 • ${psiMobile.displayLcp} LCP)`,
          detail: `Passed Google's mobile speed benchmark with ${psiMobile.displayLcp} LCP and ${psiMobile.displayCls} CLS.`,
          businessImpact:
            "Fast mobile rendering keeps high-intent callers on the page.",
        });
      }
    }

    return list;
  }, [stage1, psiMobile]);

  const overallScore = useMemo<number>(() => {
    if (!stage1) return 0;
    const s = stage1.scores;
    if (!psiMobile) return s.overallStage1;
    return Math.round(
      s.seoScore * 0.2 +
        psiMobile.performanceScore * 0.22 +
        s.geoAeoScore * 0.16 +
        s.schemaScore * 0.14 +
        s.localSignalsScore * 0.14 +
        s.conversionScore * 0.14
    );
  }, [stage1, psiMobile]);

  const criticalAndWarningIssues = useMemo(
    () => combinedIssues.filter((i) => i.severity !== "passed"),
    [combinedIssues]
  );

  const passedIssues = useMemo(
    () => combinedIssues.filter((i) => i.severity === "passed"),
    [combinedIssues]
  );

  const handleFormScanSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void runLiveScan();
  };

  const handleCopySchema = async () => {
    if (!stage1?.schema.jsonPreview) return;
    try {
      await navigator.clipboard.writeText(stage1.schema.jsonPreview);
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2000);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const handleLeadLockSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stage1) return;

    setLeadStatus("submitting");
    setLeadError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const domain = stage1.http.hostname;
    const speedStr = psiMobile
      ? `${psiMobile.performanceScore}/100 (${psiMobile.displayLcp} LCP)`
      : "Pending/Timed Out";

    const pillarSummary = `Overall ${overallScore}/100 | SEO ${stage1.scores.seoScore}/100 | GEO/AEO ${stage1.scores.geoAeoScore}/100 | Schema ${stage1.scores.schemaScore}/100 | Local Signals ${stage1.scores.localSignalsScore}/100 | Conversion ${stage1.scores.conversionScore}/100 | Mobile Speed ${speedStr}`;

    const topIssueTitles = criticalAndWarningIssues
      .slice(0, 8)
      .map((item) => `[${item.severity.toUpperCase()}] ${item.title}`)
      .join(" ; ");

    formData.set("website_url", stage1.http.finalUrl);
    if (!formData.get("business_name")) {
      formData.set("business_name", domain);
    }
    formData.set("target_city", stage1.localSignals.targetCityLabel);
    formData.set("target_service", stage1.localSignals.targetServiceLabel);
    formData.set("overall_scan_score", `${overallScore}/100`);
    formData.set("pillar_scores", pillarSummary);
    formData.set(
      "llms_txt_status",
      stage1.geoAeo.llmsTxt.validPlaintext ? "Valid /llms.txt Live" : "Missing /llms.txt"
    );
    formData.set(
      "critical_findings",
      topIssueTitles || "High-performing site — requesting 5-min Map Pack growth review"
    );
    formData.set(
      "services",
      `Site Scanner Fix Plan + 5-Min Video Teardown (${domain})`
    );
    formData.set(
      "notes",
      `Scanned Domain: ${domain} | City: ${stage1.localSignals.targetCityLabel} | Trade: ${stage1.localSignals.targetServiceLabel} | ${pillarSummary} | Issues Found (${criticalAndWarningIssues.length}): ${
        topIssueTitles || "None"
      }`
    );

    try {
      const { ok, result } = await submitVerifiedLeadForm({
        formSource: "all-in-one-scanner",
        formData,
      });

      if (ok) {
        setLeadStatus("success");
        form.reset();
      } else {
        setLeadStatus("error");
        setLeadError(
          result.error ||
            "Could not send right now—tap Text or Call below to reach Damein at (601) 446-2393."
        );
      }
    } catch {
      setLeadStatus("error");
      setLeadError(
        "Network hiccup—tap Text or Call below to reach Damein at (601) 446-2393."
      );
    }
  };

  const HeadingTag = isStandalonePage ? "h1" : "h2";
  const overallTheme = getScoreTheme(overallScore);

  const smsHref = useMemo(() => {
    if (!stage1) return "sms:6014462393";
    const msg = `Hi Damein, I just scanned ${stage1.http.hostname} on powerdigitalmedia.org (${overallScore}/100 overall, ${criticalAndWarningIssues.length} items flagged for ${stage1.localSignals.targetCityLabel}). Could you send over a 5-min breakdown?`;
    return `sms:6014462393?body=${encodeURIComponent(msg)}`;
  }, [stage1, overallScore, criticalAndWarningIssues.length]);

  return (
    <section
      id="live-scanner"
      className={`relative overflow-hidden bg-[#06080f] text-white ${
        isStandalonePage ? "pt-32 pb-20 md:pt-40 md:pb-24" : "py-20 md:py-24"
      }`}
    >
      <div
        className="absolute inset-0 blueprint-grid opacity-45 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 left-1/3 w-[720px] h-[420px] bg-amber-500/[0.08] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-0 w-[520px] h-[380px] bg-cyan-500/[0.06] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl">
        {/* ===================================================================
            HEADER & TOP WATCHTOWER INPUT CONSOLE
        ==================================================================== */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/35 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest mb-5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            PDM Site Intelligence™ • 100% Live Real-Time Scanner
          </div>

          <HeadingTag className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.02] text-white mb-4">
            {headlineOverride ? (
              headlineOverride
            ) : (
              <>
                Scan Your Website,{" "}
                <span className="text-amber-400">
                  Google Schema, llms.txt &amp; Mobile Speed
                </span>{" "}
                in Seconds.
              </>
            )}
          </HeadingTag>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            {subheadlineOverride ||
              "Zero fake vanity grades. Test any website live against Google Lighthouse Mobile, Chrome UX cellular vitals, Schema.org JSON-LD validation, ChatGPT/Gemini/Perplexity AI crawler access (/llms.txt), and Central MS local ranking signals."}
          </p>
        </div>

        {/* Input Console Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#090d18]/95 border-2 border-amber-500/35 shadow-[0_24px_80px_rgba(0,0,0,0.75),0_0_40px_rgba(245,158,11,0.1)] p-5 sm:p-7">
          <form onSubmit={handleFormScanSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
              {/* Website URL */}
              <div className="md:col-span-5">
                <label
                  htmlFor="scanner-url"
                  className="block text-[10px] font-mono font-extrabold uppercase tracking-wider text-amber-300 mb-1.5"
                >
                  1. Website Domain to Audit *
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="scanner-url"
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="yourbusiness.com"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#05070d] border border-white/15 focus:border-amber-400 outline-none text-sm font-semibold text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Primary Trade / Service */}
              <div className="md:col-span-4">
                <label
                  htmlFor="scanner-service"
                  className="block text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  2. Primary Trade / Service (Optional)
                </label>
                <input
                  id="scanner-service"
                  type="text"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  placeholder="e.g. Roofing, HVAC, Catering..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#05070d] border border-white/15 focus:border-amber-400 outline-none text-sm text-white placeholder:text-slate-500"
                />
              </div>

              {/* Target City */}
              <div className="md:col-span-3">
                <label
                  htmlFor="scanner-city"
                  className="block text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  3. Target Market City
                </label>
                <select
                  id="scanner-city"
                  value={cityChoice}
                  onChange={(e) => setCityChoice(e.target.value)}
                  className="w-full px-3.5 py-3.5 rounded-xl bg-[#05070d] border border-white/15 focus:border-amber-400 outline-none text-sm text-white"
                >
                  {CENTRAL_MS_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="__custom__">Other City…</option>
                </select>
              </div>
            </div>

            {cityChoice === "__custom__" && (
              <div className="max-w-xs">
                <input
                  type="text"
                  value={customCity}
                  onChange={(e) => setCustomCity(e.target.value)}
                  placeholder="Enter target city (e.g. Vicksburg, MS)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070d] border border-amber-400/40 outline-none text-xs text-white placeholder:text-slate-500"
                />
              </div>
            )}

            {/* Quick Service Pills + Submit CTA */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono text-slate-400 mr-1">
                  Quick Trade:
                </span>
                {QUICK_SERVICE_PILLS.map((pill) => {
                  const active =
                    serviceInput.trim().toLowerCase() === pill.toLowerCase();
                  return (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => setServiceInput(active ? "" : pill)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                        active
                          ? "bg-amber-400 text-slate-950 border-amber-300"
                          : "bg-white/[0.04] text-slate-300 border-white/10 hover:border-amber-400/40 hover:text-white"
                      }`}
                    >
                      {pill}
                    </button>
                  );
                })}
              </div>

              <button
                type="submit"
                disabled={scanPhase === "scanning"}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(245,158,11,0.35)] cursor-pointer disabled:opacity-60 shrink-0"
              >
                {scanPhase === "scanning" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Probing Live Site &amp; Schema…</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Run Live All-In-One Scan →</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Instant Live Sample Triggers */}
          <div className="mt-4 pt-3.5 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-slate-500">Test a live MS build:</span>
              <button
                type="button"
                onClick={() => {
                  setUrlInput("bornagainroofing.com");
                  setServiceInput("Roofing");
                  setCityChoice("Brandon, MS");
                  void runLiveScan({
                    overrideUrl: "bornagainroofing.com",
                    overrideCity: "Brandon, MS",
                    overrideService: "Roofing",
                  });
                }}
                className="text-amber-300 hover:text-amber-200 underline underline-offset-2 font-semibold cursor-pointer"
              >
                bornagainroofing.com
              </button>
              <span className="text-slate-600">•</span>
              <button
                type="button"
                onClick={() => {
                  setUrlInput("tbeauxs.com");
                  setServiceInput("Restaurant");
                  setCityChoice("Clinton, MS");
                  void runLiveScan({
                    overrideUrl: "tbeauxs.com",
                    overrideCity: "Clinton, MS",
                    overrideService: "Restaurant",
                  });
                }}
                className="text-amber-300 hover:text-amber-200 underline underline-offset-2 font-semibold cursor-pointer"
              >
                tbeauxs.com
              </button>
            </div>
            <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Read-Only Public HTTP + Google CrUX / PSI v5
            </span>
          </div>

          {/* Error Banner */}
          {scanPhase === "error" && scanError && (
            <div className="mt-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/35 text-rose-200 text-xs sm:text-sm flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-white">Scan Blocked or Unreachable:</strong>{" "}
                {scanError}
              </div>
            </div>
          )}

          {/* Stage 1 Loading Telemetry */}
          {scanPhase === "scanning" && (
            <div className="mt-5 p-5 rounded-2xl bg-[#06080f] border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
                <span className="flex items-center gap-2 font-bold">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  Executing Live Multi-Pillar Telemetry Probe…
                </span>
                <span className="text-slate-400">~2 Seconds</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-300 font-mono">
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  ✓ SSL / HTTP Redirect Chain
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  ✓ /llms.txt &amp; 6 AI Crawlers
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  ✓ Schema.org JSON-LD Parse
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  ✓ Sitemap &amp; On-Page SEO
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  ✓ {effectiveCity} Signal Matrix
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  ✓ Google CrUX + Lighthouse
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===================================================================
            LIVE DIAGNOSTIC CONSOLE RESULTS
        ==================================================================== */}
        <div ref={resultsAnchorRef} className="scroll-mt-28">
          {stage1 && scanPhase === "ready" && (
            <div className="mt-10 space-y-8">
              {/* Top Telemetry Bar */}
              <div className="rounded-3xl bg-[#090d18] border border-white/12 p-6 sm:p-8">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  {/* Overall Grade Ring */}
                  <div className="lg:col-span-4 flex items-center gap-5">
                    <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke={overallTheme.ring}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${Math.round((overallScore / 100) * 264)} 264`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-3xl font-black leading-none ${overallTheme.text}`}>
                          {overallScore}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-slate-400 mt-1">
                          / 100 ({overallTheme.grade})
                        </span>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase border ${overallTheme.bg} ${overallTheme.border} ${overallTheme.text} mb-1.5`}
                      >
                        {overallTheme.statusLabel}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-white truncate">
                        {stage1.http.hostname}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Target: <strong className="text-slate-200">{stage1.localSignals.targetServiceLabel}</strong> in{" "}
                        <strong className="text-amber-300">{stage1.localSignals.targetCityLabel}</strong>
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] font-mono text-slate-400">
                        <span className="text-emerald-400">
                          HTTP {stage1.http.httpStatus}
                        </span>
                        <span>•</span>
                        <span>TTFB {stage1.http.ttfbMs}ms</span>
                        <span>•</span>
                        <span>
                          {stage1.http.isHttps ? "SSL Active" : "Insecure HTTP"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 6 Pillar Scorecards */}
                  <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      {
                        label: "Technical SEO",
                        score: stage1.scores.seoScore,
                        tab: "seo_local" as ScannerTabId,
                        sub: stage1.seo.sitemapXml.present
                          ? `Sitemap (${stage1.seo.sitemapXml.urlCount} URLs)`
                          : "No XML Sitemap",
                      },
                      {
                        label: "AI / GEO & llms.txt",
                        score: stage1.scores.geoAeoScore,
                        tab: "geo_aeo" as ScannerTabId,
                        sub: stage1.geoAeo.llmsTxt.validPlaintext
                          ? "/llms.txt Verified Live"
                          : "No /llms.txt Found",
                      },
                      {
                        label: "Schema / JSON-LD",
                        score: stage1.scores.schemaScore,
                        tab: "schema" as ScannerTabId,
                        sub:
                          stage1.schema.validBlocks > 0
                            ? `${stage1.schema.validBlocks} Valid Block(s)`
                            : "0 Schema Blocks",
                      },
                      {
                        label: "Local City Signals",
                        score: stage1.scores.localSignalsScore,
                        tab: "seo_local" as ScannerTabId,
                        sub: `${stage1.localSignals.cityZoneHits}/6 Zones Match ${stage1.localSignals.targetCityNormalized}`,
                      },
                      {
                        label: "Lead-Leak & CRM",
                        score: stage1.scores.conversionScore,
                        tab: "speed_conversion" as ScannerTabId,
                        sub: stage1.conversion.hasTelLink
                          ? "Tap-to-Call Active"
                          : "Missing tel: Link",
                      },
                      {
                        label: "Mobile Lighthouse",
                        score: psiMobile ? psiMobile.performanceScore : null,
                        tab: "speed_conversion" as ScannerTabId,
                        sub:
                          psiPhase === "running"
                            ? "Testing Google PSI…"
                            : psiMobile
                            ? `${psiMobile.displayLcp} LCP`
                            : "Timed Out / Slow",
                      },
                    ].map((card) => {
                      const theme = getScoreTheme(card.score);
                      return (
                        <button
                          key={card.label}
                          type="button"
                          onClick={() => setActiveTab(card.tab)}
                          className={`p-3.5 rounded-2xl bg-[#06080f] border hover:border-amber-400/50 text-left transition-all cursor-pointer ${theme.border}`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[11px] font-bold text-slate-300 truncate">
                              {card.label}
                            </span>
                            {card.score === null && psiPhase === "running" ? (
                              <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                            ) : (
                              <span className={`text-lg font-black ${theme.text}`}>
                                {card.score !== null ? card.score : "—"}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 truncate">
                            {card.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 5 INTERACTIVE DIAGNOSTIC TABS */}
              <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
                {[
                  {
                    id: "overview" as ScannerTabId,
                    label: `Overview & Fixes (${criticalAndWarningIssues.length})`,
                    icon: Sparkles,
                  },
                  {
                    id: "geo_aeo" as ScannerTabId,
                    label: "AI Search, GEO/AEO & llms.txt",
                    icon: Bot,
                  },
                  {
                    id: "schema" as ScannerTabId,
                    label: `Schema & JSON-LD (${stage1.schema.validBlocks})`,
                    icon: Code2,
                  },
                  {
                    id: "seo_local" as ScannerTabId,
                    label: "SEO & Local Ranking Signals",
                    icon: MapPin,
                  },
                  {
                    id: "speed_conversion" as ScannerTabId,
                    label: "Mobile Speed & Lead Leaks",
                    icon: Gauge,
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border ${
                        active
                          ? "bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                          : "bg-[#090d18] text-slate-300 border-white/10 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* LEFT 7 COLS: ACTIVE TAB DIAGNOSTIC PANEL */}
                <div className="lg:col-span-7 space-y-6">
                  {/* TAB 1: OVERVIEW & CRITICAL FIXES */}
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      {psiPhase === "running" && (
                        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/35 flex items-center justify-between gap-3 text-xs text-cyan-200">
                          <div className="flex items-center gap-2.5">
                            <Loader2 className="w-4 h-4 animate-spin text-cyan-400 shrink-0" />
                            <span>
                              Running Official Google Mobile Lighthouse Test on{" "}
                              <strong className="text-white">{stage1.http.hostname}</strong>…
                            </span>
                          </div>
                          <span className="font-mono text-[10px] uppercase text-cyan-300 shrink-0">
                            Live PSI v5
                          </span>
                        </div>
                      )}

                      <div className="rounded-3xl bg-[#090d18] border border-white/10 p-6 space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-base sm:text-lg font-black uppercase text-white">
                            Prioritized Visibility &amp; Lead-Leak Fixes ({criticalAndWarningIssues.length})
                          </h4>
                          <span className="text-[11px] font-mono text-amber-300">
                            Sorted by Revenue Impact
                          </span>
                        </div>

                        {criticalAndWarningIssues.length === 0 ? (
                          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/35 text-sm text-emerald-200 flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-white block mb-1">
                                Zero Critical Technical or AI-Readiness Leaks Found!
                              </strong>
                              This site passed our live SEO, Schema, `/llms.txt`, and tap-to-call checks. Request Damein&apos;s free 5-minute video review on the right to inspect live neighborhood Google Map Pack positions and competitor review velocity.
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {criticalAndWarningIssues.map((issue) => {
                              const isCrit = issue.severity === "critical";
                              return (
                                <div
                                  key={issue.id}
                                  className={`p-4 rounded-2xl border space-y-1.5 ${
                                    isCrit
                                      ? "bg-rose-500/[0.07] border-rose-500/35"
                                      : "bg-amber-500/[0.07] border-amber-500/30"
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-start gap-2.5">
                                      {isCrit ? (
                                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                                      ) : (
                                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                      )}
                                      <span className="text-sm font-black text-white leading-snug">
                                        {issue.title}
                                      </span>
                                    </div>
                                    <span
                                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase shrink-0 ${
                                        isCrit
                                          ? "bg-rose-500/20 text-rose-300"
                                          : "bg-amber-500/20 text-amber-300"
                                      }`}
                                    >
                                      {issue.severity}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-300 pl-6.5 leading-relaxed">
                                    {issue.detail}
                                  </p>
                                  <p className="text-xs text-emerald-300/90 pl-6.5 leading-relaxed font-medium">
                                    Why it matters: {issue.businessImpact}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Passed Strengths */}
                      {passedIssues.length > 0 && (
                        <div className="rounded-3xl bg-[#090d18] border border-white/10 p-6 space-y-3">
                          <h4 className="text-sm font-mono font-extrabold uppercase tracking-wider text-emerald-400">
                            Verified Passed Checks ({passedIssues.length})
                          </h4>
                          <div className="grid gap-2.5">
                            {passedIssues.map((item) => (
                              <div
                                key={item.id}
                                className="p-3.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/25 flex items-start gap-2.5"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <div>
                                  <div className="text-xs font-bold text-white">
                                    {item.title}
                                  </div>
                                  <div className="text-[11px] text-slate-300 mt-0.5">
                                    {item.detail}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: AI SEARCH, GEO/AEO & LLMS.TXT */}
                  {activeTab === "geo_aeo" && (
                    <div className="space-y-6">
                      {/* /llms.txt & /llms-full.txt Live Inspector */}
                      <div className="rounded-3xl bg-[#090d18] border border-white/10 p-6 space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300 block">
                              Generative Engine Optimization (GEO)
                            </span>
                            <h4 className="text-lg font-black uppercase text-white">
                              Live /llms.txt &amp; AI Entity Directory Check
                            </h4>
                          </div>
                          <FileCode2 className="w-5 h-5 text-cyan-400 shrink-0" />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {[
                            { label: "/llms.txt (Concise AI Index)", data: stage1.geoAeo.llmsTxt },
                            {
                              label: "/llms-full.txt (Deep Reference)",
                              data: stage1.geoAeo.llmsFullTxt,
                            },
                          ].map((f) => (
                            <div
                              key={f.label}
                              className={`p-4 rounded-2xl border ${
                                f.data.validPlaintext
                                  ? "bg-emerald-500/[0.08] border-emerald-500/35"
                                  : "bg-rose-500/[0.06] border-rose-500/30"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-xs font-bold text-white">
                                  {f.label}
                                </span>
                                <span
                                  className={`text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded ${
                                    f.data.validPlaintext
                                      ? "bg-emerald-500/20 text-emerald-300"
                                      : "bg-rose-500/20 text-rose-300"
                                  }`}
                                >
                                  {f.data.validPlaintext
                                    ? "LIVE MARKDOWN"
                                    : f.data.isSoft404Html
                                    ? "HTML SOFT-404"
                                    : `MISSING (${f.data.httpStatus ?? "404"})`}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-300 font-mono">
                                {f.data.validPlaintext
                                  ? `${f.data.wordCount.toLocaleString()} words • ${f.data.headingCount} Markdown headings`
                                  : "Not published on this domain"}
                              </p>
                            </div>
                          ))}
                        </div>

                        {stage1.geoAeo.llmsTxt.validPlaintext && (
                          <div className="p-4 rounded-2xl bg-[#05070d] border border-white/10">
                            <div className="text-[10px] font-mono uppercase text-cyan-300 mb-1.5">
                              Live /llms.txt Excerpt:
                            </div>
                            <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                              {stage1.geoAeo.llmsTxt.previewSnippet}
                            </pre>
                          </div>
                        )}
                      </div>

                      {/* 6-Bot AI Crawler Matrix */}
                      <div className="rounded-3xl bg-[#090d18] border border-white/10 p-6 space-y-4">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300 block">
                            robots.txt AI Access Audit
                          </span>
                          <h4 className="text-lg font-black uppercase text-white">
                            6-Crawler AI Search Permission Matrix
                          </h4>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {stage1.geoAeo.aiCrawlers.map((bot) => {
                            const allowed = bot.status === "allowed";
                            return (
                              <div
                                key={bot.bot}
                                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                                  allowed
                                    ? "bg-[#06080f] border-emerald-500/30"
                                    : "bg-rose-500/[0.08] border-rose-500/40"
                                }`}
                              >
                                <div className="min-w-0">
                                  <div className="text-xs font-black text-white font-mono">
                                    {bot.bot}
                                  </div>
                                  <div className="text-[11px] text-slate-400 truncate">
                                    {bot.platform}
                                  </div>
                                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                                    {bot.matchedGroup}
                                  </div>
                                </div>
                                <span
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-black uppercase shrink-0 ${
                                    allowed
                                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                      : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                                  }`}
                                >
                                  {bot.status}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Answer-Engine Structure Checklist */}
                      <div className="rounded-3xl bg-[#090d18] border border-white/10 p-6 space-y-3">
                        <h4 className="text-base font-black uppercase text-white">
                          Answer-Engine (AEO) Entity Signals
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-2.5 text-xs">
                          {[
                            {
                              label: "Clear NAP (Phone + Address)",
                              ok: stage1.geoAeo.hasClearNap,
                            },
                            {
                              label: `Entity sameAs Profiles (${stage1.geoAeo.sameAsCount})`,
                              ok: stage1.geoAeo.hasSameAsLinks,
                            },
                            {
                              label: "Explicit areaServed Cities",
                              ok: stage1.geoAeo.hasAreaServed,
                            },
                            {
                              label: "Speakable Voice/AI Specification",
                              ok: stage1.geoAeo.hasSpeakableSchema,
                            },
                            {
                              label: `Q&A Subheadings (${stage1.geoAeo.questionHeadingCount} found)`,
                              ok: stage1.geoAeo.questionHeadingCount >= 1,
                            },
                          ].map((row) => (
                            <div
                              key={row.label}
                              className="p-3 rounded-xl bg-[#06080f] border border-white/10 flex items-center justify-between gap-2"
                            >
                              <span className="text-slate-200 font-semibold">
                                {row.label}
                              </span>
                              {row.ok ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : (
                                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: SCHEMA & JSON-LD VALIDATOR */}
                  {activeTab === "schema" && (
                    <div className="space-y-6">
                      <div className="rounded-3xl bg-[#090d18] border border-white/10 p-6 space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300 block">
                              Structured Data Telemetry
                            </span>
                            <h4 className="text-lg font-black uppercase text-white">
                              Schema.org JSON-LD Validator
                            </h4>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold text-slate-200">
                            {stage1.schema.validBlocks} Valid •{" "}
                            {stage1.schema.malformedBlocks} Syntax Errors
                          </span>
                        </div>

                        {/* Detected @type Badges */}
                        <div>
                          <div className="text-[11px] font-mono uppercase text-slate-400 mb-2">
                            Detected @type Entities:
                          </div>
                          {stage1.schema.detectedTypes.length === 0 ? (
                            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200">
                              Zero JSON-LD `@type` entities found on this page.
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {stage1.schema.detectedTypes.map((t) => (
                                <span
                                  key={t}
                                  className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/35 text-xs font-mono font-bold text-amber-300"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 9-Point Local Map Pack Schema Property Matrix */}
                        <div>
                          <div className="text-[11px] font-mono uppercase text-slate-400 mb-2">
                            Local Map Pack Entity Property Checklist:
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                            {[
                              { k: "Business Name", v: stage1.schema.fields.name },
                              { k: "Phone (telephone)", v: stage1.schema.fields.telephone },
                              { k: "Street Address", v: stage1.schema.fields.address },
                              { k: "GPS Lat/Lng (geo)", v: stage1.schema.fields.geo },
                              { k: "Service Cities (areaServed)", v: stage1.schema.fields.areaServed },
                              { k: "Star Rating Schema", v: stage1.schema.fields.aggregateRating },
                              { k: "Business Hours", v: stage1.schema.fields.openingHoursSpecification },
                              { k: "Brand Image / Logo", v: stage1.schema.fields.image },
                              { k: "Social / BBB sameAs", v: stage1.schema.fields.sameAs },
                            ].map((prop) => (
                              <div
                                key={prop.k}
                                className="p-3 rounded-xl bg-[#06080f] border border-white/10 flex items-center justify-between gap-2"
                              >
                                <span className="text-slate-200 font-medium truncate">
                                  {prop.k}
                                </span>
                                {prop.v ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Rich Result Warnings */}
                        {stage1.schema.richResultWarnings.length > 0 && (
                          <div className="space-y-2">
                            <div className="text-[11px] font-mono uppercase text-amber-300">
                              Google Rich Result Notes:
                            </div>
                            {stage1.schema.richResultWarnings.map((w) => (
                              <div
                                key={w}
                                className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-100 flex items-start gap-2.5"
                              >
                                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                <span>{w}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Expandable Raw JSON-LD Viewer */}
                        {stage1.schema.jsonPreview && (
                          <div className="pt-2 border-t border-white/10">
                            <div className="flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => setShowRawSchema((prev) => !prev)}
                                className="text-xs font-mono font-bold text-cyan-300 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer"
                              >
                                {showRawSchema ? (
                                  <>
                                    <ChevronUp className="w-4 h-4" /> Hide Parsed JSON-LD Code
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-4 h-4" /> Inspect Raw JSON-LD Payload
                                  </>
                                )}
                              </button>

                              {showRawSchema && (
                                <button
                                  type="button"
                                  onClick={handleCopySchema}
                                  className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-[11px] font-mono text-slate-200 flex items-center gap-1.5 cursor-pointer"
                                >
                                  {copiedSchema ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" /> Copy JSON
                                    </>
                                  )}
                                </button>
                              )}
                            </div>

                            {showRawSchema && (
                              <pre className="mt-3 p-4 rounded-2xl bg-[#05070d] border border-white/10 text-[11px] text-emerald-200/90 font-mono overflow-x-auto max-h-80">
                                {stage1.schema.jsonPreview}
                              </pre>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: SEO & LOCAL RANKING SIGNALS */}
                  {activeTab === "seo_local" && (
                    <div className="space-y-6">
                      {/* 6-Zone Local Map Pack & Keyword Signal Alignment */}
                      <div className="rounded-3xl bg-[#090d18] border border-white/10 p-6 space-y-4">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300 block">
                            Local Map Pack &amp; Keyword Signal Alignment
                          </span>
                          <h4 className="text-lg font-black uppercase text-white">
                            6-Zone Alignment for &ldquo;{stage1.localSignals.targetServiceLabel}&rdquo; in{" "}
                            {stage1.localSignals.targetCityLabel}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1">
                            100% real HTML &amp; JSON-LD verification—never a fake SERP number. Live Google Search Console query positions &amp; neighborhood 3-Pack heatmaps are included in Damein&apos;s free 5-minute video review.
                          </p>
                        </div>

                        <div className="space-y-2.5">
                          {stage1.localSignals.zones.map((z) => (
                            <div
                              key={z.zone}
                              className="p-3.5 rounded-2xl bg-[#06080f] border border-white/10 space-y-1.5"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="text-xs font-black font-mono text-white">
                                  {z.zone}
                                </span>
                                <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase">
                                  {z.cityMatched !== null && (
                                    <span
                                      className={`px-2 py-0.5 rounded ${
                                        z.cityMatched
                                          ? "bg-emerald-500/15 text-emerald-300"
                                          : "bg-rose-500/15 text-rose-300"
                                      }`}
                                    >
                                      {stage1.localSignals.targetCityNormalized}:{" "}
                                      {z.cityMatched ? "✓ YES" : "✗ NO"}
                                    </span>
                                  )}
                                  {z.serviceMatched !== null && (
                                    <span
                                      className={`px-2 py-0.5 rounded ${
                                        z.serviceMatched
                                          ? "bg-emerald-500/15 text-emerald-300"
                                          : "bg-amber-500/15 text-amber-300"
                                      }`}
                                    >
                                      Trade: {z.serviceMatched ? "✓ YES" : "✗ NO"}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-slate-400 truncate">
                                {z.snippet}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 text-xs">
                          <span className="text-slate-300">
                            Dedicated City / Service-Area Hub Links Detected:
                          </span>
                          <span className="font-mono font-black text-amber-300">
                            {stage1.localSignals.localHubLinksCount} link(s)
                          </span>
                        </div>
                      </div>

                      {/* Core Technical SEO Breakdown */}
                      <div className="rounded-3xl bg-[#090d18] border border-white/10 p-6 space-y-4">
                        <h4 className="text-base font-black uppercase text-white">
                          Technical On-Page SEO &amp; Crawlability
                        </h4>

                        <div className="grid sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3.5 rounded-xl bg-[#06080f] border border-white/10">
                            <div className="text-[10px] font-mono uppercase text-slate-400">
                              Title Length ({stage1.seo.titleLength} chars)
                            </div>
                            <div className="font-bold text-white mt-1 line-clamp-2">
                              {stage1.seo.title || "Missing <title>"}
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#06080f] border border-white/10">
                            <div className="text-[10px] font-mono uppercase text-slate-400">
                              Primary &lt;h1&gt; ({stage1.seo.h1Count} tag)
                            </div>
                            <div className="font-bold text-white mt-1 line-clamp-2">
                              {stage1.seo.firstH1 || "Missing <h1>"}
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#06080f] border border-white/10">
                            <div className="text-[10px] font-mono uppercase text-slate-400">
                              XML Sitemap
                            </div>
                            <div className="font-bold text-white mt-1">
                              {stage1.seo.sitemapXml.present
                                ? `Verified (${stage1.seo.sitemapXml.urlCount} entries)`
                                : "Missing / Unreachable"}
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#06080f] border border-white/10">
                            <div className="text-[10px] font-mono uppercase text-slate-400">
                              Image Alt Accessibility
                            </div>
                            <div className="font-bold text-white mt-1">
                              {stage1.seo.imageAltCoveragePct}% ({stage1.seo.imagesWithAlt}/
                              {stage1.seo.totalImages} images)
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#06080f] border border-white/10">
                            <div className="text-[10px] font-mono uppercase text-slate-400">
                              Canonical Tag
                            </div>
                            <div className="font-mono text-slate-200 mt-1 truncate">
                              {stage1.seo.canonicalUrl || "Missing canonical link"}
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#06080f] border border-white/10">
                            <div className="text-[10px] font-mono uppercase text-slate-400">
                              Visible Word Count &amp; H2s
                            </div>
                            <div className="font-bold text-white mt-1">
                              {stage1.seo.visibleWordCount.toLocaleString()} words •{" "}
                              {stage1.seo.h2Count} H2 sections
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: MOBILE SPEED & LEAD LEAKS */}
                  {activeTab === "speed_conversion" && (
                    <div className="space-y-6">
                      {/* Google Lighthouse Mobile vs PDM 0.8s Benchmark */}
                      <div className="rounded-3xl bg-[#090d18] border border-white/10 p-6 space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300 block">
                              Official Google PageSpeed Insights v5 (Mobile)
                            </span>
                            <h4 className="text-lg font-black uppercase text-white">
                              Cellular Speed vs. PDM 0.8s Next.js Benchmark
                            </h4>
                          </div>
                          <Zap className="w-5 h-5 text-amber-400" />
                        </div>

                        {psiPhase === "running" && (
                          <div className="p-6 rounded-2xl bg-[#06080f] border border-cyan-500/30 flex items-center gap-3 text-sm text-cyan-200">
                            <Loader2 className="w-5 h-5 animate-spin text-cyan-400 shrink-0" />
                            <span>
                              Google&apos;s mobile Lighthouse engine is auditing{" "}
                              <strong>{stage1.http.hostname}</strong> right now (typically 5–8 seconds)…
                            </span>
                          </div>
                        )}

                        {psiPhase === "unavailable" && (
                          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                            {psiNote} Server TTFB measured directly by our probe:{" "}
                            <strong>{stage1.http.ttfbMs}ms</strong>.
                          </div>
                        )}

                        {psiMobile && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {[
                                {
                                  label: "Mobile Speed",
                                  val: psiMobile.performanceScore,
                                },
                                { label: "Lighthouse SEO", val: psiMobile.seoScore },
                                {
                                  label: "Accessibility",
                                  val: psiMobile.accessibilityScore,
                                },
                                {
                                  label: "Best Practices",
                                  val: psiMobile.bestPracticesScore,
                                },
                              ].map((m) => {
                                const t = getScoreTheme(m.val);
                                return (
                                  <div
                                    key={m.label}
                                    className={`p-3.5 rounded-2xl bg-[#06080f] border text-center ${t.border}`}
                                  >
                                    <div className={`text-2xl font-black ${t.text}`}>
                                      {m.val}
                                    </div>
                                    <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                                      {m.label}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3">
                              <div className="p-4 rounded-2xl bg-[#06080f] border border-white/10">
                                <div className="text-[10px] font-mono uppercase text-slate-400">
                                  Scanned Mobile LCP / Blocking Time
                                </div>
                                <div className="text-lg font-black text-white mt-1">
                                  {psiMobile.displayLcp} LCP • {psiMobile.displayTbt} TBT
                                </div>
                                <div className="text-[11px] text-slate-400 mt-0.5">
                                  CLS Layout Shift: {psiMobile.displayCls}
                                </div>
                              </div>

                              <div className="p-4 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/35">
                                <div className="text-[10px] font-mono uppercase text-emerald-300 font-bold">
                                  PDM Custom Next.js 16 Standard
                                </div>
                                <div className="text-lg font-black text-emerald-400 mt-1">
                                  0.8s – 1.4s Mobile LCP
                                </div>
                                <div className="text-[11px] text-slate-300 mt-0.5">
                                  Zero bloated WordPress plugins • Edge CDN
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Real-User Google CrUX Field Data */}
                        <div className="p-4 rounded-2xl bg-[#06080f] border border-white/10 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-white">
                              Chrome UX Report (CrUX) 28-Day Real-User Telemetry
                            </span>
                            <span className="text-[10px] font-mono uppercase text-cyan-300">
                              {stage1.crux.status === "available"
                                ? `Verified (${stage1.crux.sourceLevel} level)`
                                : stage1.crux.status === "insufficient_traffic"
                                ? "Below Public CrUX Traffic Threshold"
                                : "Field Telemetry Checked"}
                            </span>
                          </div>
                          {stage1.crux.status === "available" ? (
                            <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-1">
                              <div className="p-2.5 rounded-xl bg-white/[0.03]">
                                p75 LCP:{" "}
                                <strong className="text-white">
                                  {stage1.crux.lcpMs !== null
                                    ? `${(stage1.crux.lcpMs / 1000).toFixed(2)}s`
                                    : "—"}
                                </strong>
                              </div>
                              <div className="p-2.5 rounded-xl bg-white/[0.03]">
                                p75 INP:{" "}
                                <strong className="text-white">
                                  {stage1.crux.inpMs !== null
                                    ? `${stage1.crux.inpMs}ms`
                                    : "—"}
                                </strong>
                              </div>
                              <div className="p-2.5 rounded-xl bg-white/[0.03]">
                                p75 CLS:{" "}
                                <strong className="text-white">
                                  {stage1.crux.cls ?? "—"}
                                </strong>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400">
                              Most local contractor &amp; SMB sites don&apos;t yet have enough monthly Chrome traffic to appear in Google&apos;s public CrUX dataset—making our Google Lighthouse Mobile test above + Local Map Pack SEO critical to grow traffic.
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Lead-Leak & Attribution Checklist */}
                      <div className="rounded-3xl bg-[#090d18] border border-white/10 p-6 space-y-4">
                        <h4 className="text-base font-black uppercase text-white">
                          Mobile Lead-Leak &amp; Tracking Checklist
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3 text-xs">
                          {[
                            {
                              label: stage1.conversion.hasTelLink
                                ? `1-Tap Call (${stage1.conversion.phoneNumbers[0]})`
                                : "1-Tap Mobile Call (tel:)",
                              ok: stage1.conversion.hasTelLink,
                            },
                            {
                              label: "1-Tap Text Message (sms:)",
                              ok: stage1.conversion.hasSmsLink,
                            },
                            {
                              label: `Lead Forms / Quote Flow (${stage1.conversion.formCount} form)`,
                              ok:
                                stage1.conversion.formCount > 0 ||
                                stage1.conversion.hasInteractiveQuoteOrBookingLink,
                            },
                            {
                              label: "HTTP -> HTTPS Secure Redirect",
                              ok:
                                stage1.http.isHttps &&
                                stage1.http.httpRedirectsToHttps,
                            },
                            {
                              label: "GA4 / Google Tag Installed",
                              ok: stage1.conversion.hasGa4OrGtm,
                            },
                            {
                              label: "Meta / Facebook Pixel Installed",
                              ok: stage1.conversion.hasMetaPixel,
                            },
                          ].map((c) => (
                            <div
                              key={c.label}
                              className="p-3.5 rounded-xl bg-[#06080f] border border-white/10 flex items-center justify-between gap-2"
                            >
                              <span className="font-semibold text-slate-200 truncate">
                                {c.label}
                              </span>
                              {c.ok ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : (
                                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT 5 COLS: STICKY HIGH-CONVERTING FIX PLAN + VIDEO TEARDOWN CARD */}
                <div className="lg:col-span-5 lg:sticky lg:top-28">
                  <div className="rounded-3xl bg-[#0b0e18] border-2 border-amber-500/45 shadow-[0_24px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.14)] overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-cyan-500/10 border-b border-white/10 flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-amber-300">
                        Next Step • Personal Jackson Review
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold">
                        ● 100% Free
                      </span>
                    </div>

                    <div className="p-6 sm:p-7 space-y-5">
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight text-white">
                          Email Me Full Fix Plan +{" "}
                          <span className="text-amber-400">
                            Free 5-Min Damein Video Teardown
                          </span>
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          We&apos;ll send this full{" "}
                          <strong className="text-white">{stage1.http.hostname}</strong>{" "}
                          report straight to your inbox, and Damein Donald will record a{" "}
                          <strong className="text-emerald-300">
                            personal 5-minute Google Map Pack heatmap video
                          </strong>{" "}
                          showing your exact rankings in {stage1.localSignals.targetCityLabel}.
                        </p>
                      </div>

                      {leadStatus === "success" ? (
                        <div className="p-5 rounded-2xl bg-emerald-500/12 border border-emerald-500/35 text-center space-y-2.5">
                          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                          <h4 className="text-base font-black uppercase text-white">
                            Scan Report &amp; Video Teardown Queued!
                          </h4>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            Damein has your live{" "}
                            <strong className="text-amber-300">
                              {overallScore}/100
                            </strong>{" "}
                            scan for {stage1.http.hostname} and will send your personalized 5-minute Map Pack video within 1 business day.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleLeadLockSubmit} className="space-y-3">
                          <FormSecurityFields />

                          <input
                            type="text"
                            name="name"
                            required
                            disabled={leadStatus === "submitting"}
                            placeholder="Your Name *"
                            className="w-full px-4 py-3 text-xs bg-[#06080f] border border-white/15 focus:border-amber-400 rounded-xl outline-none text-white placeholder:text-slate-500"
                          />
                          <input
                            type="email"
                            name="email"
                            required
                            disabled={leadStatus === "submitting"}
                            placeholder="Best Email for Fix Plan & Video *"
                            className="w-full px-4 py-3 text-xs bg-[#06080f] border border-white/15 focus:border-amber-400 rounded-xl outline-none text-white placeholder:text-slate-500"
                          />
                          <input
                            type="tel"
                            name="phone"
                            disabled={leadStatus === "submitting"}
                            placeholder="Cell # for SMS Video Link (optional)"
                            className="w-full px-4 py-3 text-xs bg-[#06080f] border border-white/15 focus:border-amber-400 rounded-xl outline-none text-white placeholder:text-slate-500"
                          />

                          {leadStatus === "error" && (
                            <p className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-2">
                              {leadError}
                            </p>
                          )}

                          <button
                            type="submit"
                            disabled={leadStatus === "submitting"}
                            className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(245,158,11,0.32)] cursor-pointer disabled:opacity-50"
                          >
                            {leadStatus === "submitting" ? (
                              <span>Sending Scan &amp; Reserving Video…</span>
                            ) : (
                              <>
                                <span>Send Fix Plan + Free 5-Min Video</span>
                                <Send className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        </form>
                      )}

                      {/* 1-Tap SMS + 1-Tap Scope Estimator CTAs */}
                      <div className="space-y-2.5 pt-3 border-t border-white/10">
                        <a
                          href={smsHref}
                          className="w-full py-3.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 text-center"
                        >
                          <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Text My Scan Results to Damein</span>
                        </a>

                        <Link
                          href="/estimate"
                          className="w-full py-3.5 px-4 rounded-xl bg-white/[0.06] hover:bg-amber-400 hover:text-slate-950 border border-amber-500/35 text-amber-300 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 text-center"
                        >
                          <span>
                            {criticalAndWarningIssues.length > 0
                              ? `Estimate Cost to Fix All ${criticalAndWarningIssues.length} Issues`
                              : "Explore Custom Growth & Field App Scope"}
                          </span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </Link>

                        <a
                          href="tel:6014462393"
                          className="w-full py-2.5 px-4 rounded-xl text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-400" />
                          <span>Or Call Direct: (601) 446-2393</span>
                        </a>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>5.0★ BBB Accredited • Jackson, MS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
