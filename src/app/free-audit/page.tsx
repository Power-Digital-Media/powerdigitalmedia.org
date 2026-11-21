"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Send,
  AlertCircle,
  ShieldCheck,
  Video,
  MapPin,
  Zap,
  Phone,
  Calendar,
  Star,
  Activity,
  MessageSquare,
  Search,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";

const AllInOneSiteScanner = dynamic(
  () => import("@/components/scanner/AllInOneSiteScanner"),
  { ssr: false }
);

const AUDIT_GOALS = [
  "Contractor Website + Map Pack",
  "More Google 3-Pack Calls",
  "PinCam™ + PinDrop™ Apps",
  "0%-Fee Square Ordering",
  "Capsule CRM Setup",
] as const;

function normalizeWebsiteOrBusiness(raw: string): {
  websiteUrl: string;
  businessName: string;
} {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { websiteUrl: "Not provided", businessName: "" };
  }
  const looksLikeDomain =
    /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(trimmed) &&
    !/\s/.test(trimmed);

  if (looksLikeDomain) {
    const normalizedUrl = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    const host = normalizedUrl
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .split("/")[0];
    return { websiteUrl: normalizedUrl, businessName: host };
  }

  return {
    websiteUrl: `No website URL entered (${trimmed})`,
    businessName: trimmed,
  };
}

export default function FreeAuditPage() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [selectedGoal, setSelectedGoal] = useState<string>(AUDIT_GOALS[0]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const rawSiteOrBiz = String(data.get("business_or_website") || "");
    const { websiteUrl, businessName } = normalizeWebsiteOrBusiness(rawSiteOrBiz);
    const nameVal = String(data.get("name") || "").trim();

    data.set("website_url", websiteUrl);
    data.set("services", selectedGoal);
    if (!data.get("business_name") && businessName) {
      data.set("business_name", businessName);
    }

    try {
      const { ok, result } = await submitVerifiedLeadForm({
        formSource: "website-audit-request",
        formData: data,
      });

      if (ok) {
        setFirstName(nameVal.split(/\s+/)[0] || "Friend");
        setStatus("success");
        localStorage.setItem("audit_converted", "true");
        form.reset();
      } else {
        setErrorMessage(
          result.error ||
            "Submission failed. Please check your email or text (601) 446-2393."
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage(
        "Network hiccup. Please try again or call/text (601) 446-2393."
      );
      setStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen bg-[#06080f] text-white overflow-hidden">
      <Navbar />

      {/* =====================================================================
          1. ABOVE-THE-FOLD HERO: DAMEIN'S PERSONAL 5-MINUTE VIDEO TEARDOWN
      ====================================================================== */}
      <section className="relative pt-28 pb-16 sm:pt-36 md:pt-40 md:pb-24 border-b border-white/10 bg-[#06080f]">
        <div
          className="absolute inset-0 blueprint-grid opacity-45 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -top-20 left-1/3 w-[680px] h-[420px] bg-amber-500/[0.08] rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="container px-4 sm:px-6 mx-auto relative z-10 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Left Copy & Proof Column */}
            <div className="lg:col-span-7 space-y-6 pt-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest">
                <Video className="w-4 h-4 text-amber-400" />
                Free Personal 5-Minute Video • Jackson, MS
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-black uppercase tracking-tight leading-[1.02]">
                  Get a Free 5-Minute{" "}
                  <span className="text-amber-400">
                    Google Map Pack &amp; Website Video
                  </span>{" "}
                  Recorded For Your Business.
                </h1>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  Skip the awkward sales pitch. Enter your business name and email—{" "}
                  <strong className="text-white">Damein Donald</strong> will pull up your
                  exact neighborhood rankings across Central MS, compare your top 3 local
                  competitors, and send you a{" "}
                  <strong className="text-amber-300">
                    personal 5-minute screen-recorded action plan
                  </strong>{" "}
                  within 1 business day.
                </p>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-3">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold text-sm text-white">Map Pack Heatmap</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    See where you show up (and disappear) in Jackson, Madison, Brandon &amp; Ridgeland.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold text-sm text-white">Mobile Lead Leaks</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Spot slow mobile load times, missing schema, or quote friction costing you calls.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Video className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold text-sm text-white">Zero Sales Pressure</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Keep the full video checklist for free—no meeting required unless you want one.
                  </p>
                </div>
              </div>

              {/* Real Client Proof Card */}
              <div className="p-5 rounded-2xl bg-[#0a0f1c] border border-amber-500/20 space-y-1.5">
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="ml-1.5 text-[11px] font-mono font-bold text-amber-300 uppercase">
                    Verified Mississippi Client
                  </span>
                </div>
                <p className="text-sm text-slate-200 font-medium">
                  &ldquo;Took my marketing program from the dumps all the way to the moon. Very responsive and results oriented.&rdquo;
                </p>
                <span className="text-xs text-slate-400 block">
                  — Scott Lowery, Owner, Geaux Pro Outdoors (Bentonia, MS)
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  No credit card • Recorded in Jackson, MS
                </span>
                <a
                  href="#live-scanner"
                  className="font-mono font-bold uppercase tracking-wider text-cyan-300 hover:text-amber-300 inline-flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Or Run Instant Code Scan Below ↓</span>
                </a>
              </div>
            </div>

            {/* Right 20-Second Request Form Card */}
            <div className="lg:col-span-5">
              <div className="p-5 sm:p-8 rounded-3xl bg-[#0a0e19] border-2 border-amber-500/40 shadow-[0_24px_80px_rgba(0,0,0,0.75),0_0_36px_rgba(245,158,11,0.14)] relative">
                {status === "success" ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center space-y-5">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400">
                      <Send className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-black uppercase text-white">
                        Video Audit Queued for {firstName}!
                      </h2>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Damein has your business queued up and will send your personalized 5-minute Google Map Pack &amp; website video within 1 business day.
                      </p>
                    </div>
                    <div className="w-full pt-3 space-y-2.5">
                      <Link
                        href="/book?from=audit"
                        prefetch={false}
                        className="w-full py-4 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                      >
                        <Calendar className="w-4 h-4" />
                        Want to Talk Sooner? Pick a 15-Min Call Slot
                      </Link>
                      <a
                        href="tel:6014462393"
                        className="w-full py-3.5 px-5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                      >
                        <Phone className="w-4 h-4 text-amber-400" />
                        Or Call/Text Damein: (601) 446-2393
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="pb-3 border-b border-white/10">
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-300 block">
                        Takes 20 Seconds • 100% Free
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black uppercase text-white mt-0.5">
                        Where Should Damein Send Your Video?
                      </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <FormSecurityFields />

                      <div>
                        <label
                          htmlFor="fa-biz"
                          className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                        >
                          Website or Business Name + City *
                        </label>
                        <input
                          id="fa-biz"
                          type="text"
                          name="business_or_website"
                          required
                          disabled={status === "submitting"}
                          placeholder="yourbusiness.com or Magnolia HVAC, Brandon"
                          className="w-full px-4 py-3.5 bg-[#06080f] border border-white/15 focus:border-amber-400 rounded-xl outline-none transition-all placeholder:text-slate-500 text-white text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="fa-name"
                            className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                          >
                            Your Name *
                          </label>
                          <input
                            id="fa-name"
                            type="text"
                            name="name"
                            required
                            autoComplete="name"
                            disabled={status === "submitting"}
                            placeholder="John Smith"
                            className="w-full px-4 py-3.5 bg-[#06080f] border border-white/15 focus:border-amber-400 rounded-xl outline-none transition-all placeholder:text-slate-500 text-white text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="fa-phone"
                            className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                          >
                            Cell # <span className="text-slate-500">(Optional SMS)</span>
                          </label>
                          <input
                            id="fa-phone"
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            disabled={status === "submitting"}
                            placeholder="(601) 555-0199"
                            className="w-full px-4 py-3.5 bg-[#06080f] border border-white/15 focus:border-amber-400 rounded-xl outline-none transition-all placeholder:text-slate-500 text-white text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="fa-email"
                          className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                        >
                          Best Email for Video Link *
                        </label>
                        <input
                          id="fa-email"
                          type="email"
                          name="email"
                          required
                          autoComplete="email"
                          disabled={status === "submitting"}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3.5 bg-[#06080f] border border-white/15 focus:border-amber-400 outline-none transition-all placeholder:text-slate-500 text-white text-sm"
                        />
                      </div>

                      <div>
                        <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          #1 Priority (1-Tap):
                        </span>
                        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Primary growth goal">
                          {AUDIT_GOALS.map((goal) => {
                            const active = selectedGoal === goal;
                            return (
                              <button
                                key={goal}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setSelectedGoal(goal)}
                                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${
                                  active
                                    ? "bg-amber-400 text-slate-950 border-amber-300"
                                    : "bg-[#06080f] text-slate-300 border-white/12 hover:border-amber-400/50"
                                }`}
                              >
                                {goal}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {status === "error" && (
                        <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-300 text-xs rounded-xl flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full px-4 py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all text-xs uppercase tracking-wider shadow-[0_0_28px_rgba(245,158,11,0.32)] disabled:opacity-50 cursor-pointer"
                      >
                        {status === "submitting" ? (
                          <span>Reserving Your Video Audit…</span>
                        ) : (
                          <>
                            <span>Send My Free 5-Min Video Audit</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>

                    <div className="pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" />
                        Powered by PDM Site Intelligence™
                      </span>
                      <a
                        href="sms:6014462393?body=Hi%20Damein%2C%20can%20you%20send%20me%20a%205-min%20Google%20Map%20Pack%20video%20for%20my%20business%3F"
                        className="font-bold text-emerald-300 hover:text-emerald-200 inline-flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Or Text Damein Now</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. BONUS INSTANT AUTOMATED CODE & SPEED SCANNER
      ====================================================================== */}
      <div id="live-scanner" className="scroll-mt-20">
        <AllInOneSiteScanner
          isStandalonePage={false}
          headlineOverride="Want Instant Automated Scores Right Now?"
          subheadlineOverride="Already have a live website? Test your mobile Google Lighthouse speed, Schema.org JSON-LD, and /llms.txt AI readiness while Damein prepares your Map Pack video."
        />
      </div>

      <Footer />
    </main>
  );
}
