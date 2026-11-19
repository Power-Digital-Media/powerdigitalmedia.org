"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Send,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Video,
  MapPin,
  Zap,
  Phone,
  Calendar,
  Star,
  Activity,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AllInOneSiteScanner from "@/components/scanner/AllInOneSiteScanner";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";

function normalizeWebsiteOrBusiness(raw: string): {
  websiteUrl: string;
  businessName: string;
} {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { websiteUrl: "Not provided", businessName: "" };
  }
  const looksLikeDomain =
    /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(trimmed) && !/\s/.test(trimmed);

  if (looksLikeDomain) {
    const normalizedUrl = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
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
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");

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
          result.error || "Submission failed. Please check your email or text (601) 446-2393."
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network hiccup. Please try again or call/text (601) 446-2393.");
      setStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen bg-[#06080f] text-white overflow-hidden">
      <Navbar />

      {/* =====================================================================
          1. PRIMARY INTERACTIVE HERO CONSOLE: LIVE ALL-IN-ONE SCANNER
      ====================================================================== */}
      <AllInOneSiteScanner isStandalonePage />

      {/* =====================================================================
          2. DAMEIN'S PERSONAL 5-MINUTE GOOGLE MAP PACK HEATMAP VIDEO REVIEW
      ====================================================================== */}
      <section className="relative py-20 md:py-24 border-t border-white/10 bg-[#070b14]">
        <div
          className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none"
          aria-hidden="true"
        />

        <div className="container px-4 sm:px-6 mx-auto relative z-10 max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Left Copy & Proof Column */}
            <div className="lg:col-span-7 space-y-8 pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest">
                <Video className="w-4 h-4 text-amber-400" />
                Plus: Manual 5-Minute Google Map Pack Video
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[1.04]">
                  Want Damein to Map Your{" "}
                  <span className="text-amber-400">
                    Neighborhood Google 3-Pack Rankings
                  </span>{" "}
                  Personally?
                </h2>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  Even if you don&apos;t have a website yet—or want deeper competitor intelligence beyond automated code checks—Damein Donald will pull up your business on Google Maps across Central MS and text/email you a{" "}
                  <strong className="text-white">
                    personal 5-minute screen-recorded heatmap &amp; action plan
                  </strong>
                  .
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-white">Google Map Pack Check</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    See where you rank across Jackson, Madison, Flora, Brandon, Ridgeland &amp; Clinton.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-white">Competitor Gap Check</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Compare your review velocity, categories, and speed against local top-3 rivals.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Video className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-white">Plain-English Action Plan</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Keep the entire checklist for free—whether we build together or you do it yourself.
                  </p>
                </div>
              </div>

              {/* Real Client Proof Card */}
              <div className="p-5 rounded-2xl bg-[#0a0f1c] border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
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
              </div>

              <div className="p-4 rounded-2xl bg-[#06080f] border border-cyan-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    Ongoing client telemetry powered 24/7 by{" "}
                    <strong className="text-white">PDM Site Intelligence™</strong>.
                  </span>
                </div>
                <Link
                  href="/site-intelligence"
                  className="font-mono font-bold uppercase tracking-wider text-cyan-300 hover:text-amber-300 shrink-0"
                >
                  See Watchtower →
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No credit card. Zero spam. Sent within 24 business hours from Jackson, MS.</span>
              </div>
            </div>

            {/* Right Manual Video Request Card */}
            <div className="lg:col-span-5">
              <div className="p-5 sm:p-9 rounded-3xl obsidian-surface relative">
                {status === "success" ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center space-y-5">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400">
                      <Send className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black uppercase text-white">
                        Audit Queued for {firstName}!
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Damein has your details and will text/email your personalized 5-minute video breakdown within 1 business day.
                      </p>
                    </div>
                    <div className="w-full pt-3 space-y-2.5">
                      <Link
                        href="/book?from=audit"
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
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
                        Request Manual 5-Min Video
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Don&apos;t have a website yet? Enter your business name &amp; city—Damein will map your local Google opportunity.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <FormSecurityFields />

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
                          className="w-full px-4 py-3.5 bg-[#0b101d] border border-white/12 focus:border-amber-400 rounded-xl outline-none transition-all placeholder:text-slate-500 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="fa-biz"
                          className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                        >
                          Website or Business Name *
                        </label>
                        <input
                          id="fa-biz"
                          type="text"
                          name="business_or_website"
                          required
                          disabled={status === "submitting"}
                          placeholder="yourbusiness.com or Magnolia HVAC (Madison)"
                          className="w-full px-4 py-3.5 bg-[#0b101d] border border-white/12 focus:border-amber-400 rounded-xl outline-none transition-all placeholder:text-slate-500 text-white text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label
                            htmlFor="fa-phone"
                            className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                          >
                            Cell Phone (For SMS Link) *
                          </label>
                          <input
                            id="fa-phone"
                            type="tel"
                            name="phone"
                            required
                            autoComplete="tel"
                            disabled={status === "submitting"}
                            placeholder="(601) 555-0199"
                            className="w-full px-4 py-3.5 bg-[#0b101d] border border-white/12 focus:border-amber-400 rounded-xl outline-none transition-all placeholder:text-slate-500 text-white text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="fa-email"
                            className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                          >
                            Email Address *
                          </label>
                          <input
                            id="fa-email"
                            type="email"
                            name="email"
                            required
                            autoComplete="email"
                            disabled={status === "submitting"}
                            placeholder="john@company.com"
                            className="w-full px-4 py-3.5 bg-[#0b101d] border border-white/12 focus:border-amber-400 rounded-xl outline-none transition-all placeholder:text-slate-500 text-white text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="fa-services"
                          className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                        >
                          What Are You Looking to Grow?
                        </label>
                        <select
                          id="fa-services"
                          name="services"
                          disabled={status === "submitting"}
                          defaultValue="Contractor Website + Google Map Pack"
                          className="w-full px-4 py-3.5 bg-[#0b101d] border border-white/12 focus:border-amber-400 rounded-xl outline-none transition-all text-white text-sm"
                        >
                          <option value="Contractor Website + Google Map Pack">
                            Contractor Website + Google Map Pack
                          </option>
                          <option value="PinCam + PinDrop Field Apps">
                            PinCam™ + PinDrop™ Field Apps
                          </option>
                          <option value="Local SEO & More Phone Calls">
                            Local SEO &amp; More Phone Calls
                          </option>
                          <option value="Restaurant / Online Ordering Website">
                            Restaurant / Local Commerce Website
                          </option>
                          <option value="Capsule CRM & Quote Automation">
                            Capsule CRM &amp; Quote Follow-Up Automation
                          </option>
                        </select>
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
                        className="w-full px-4 py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all text-xs uppercase tracking-wider shadow-[0_0_28px_rgba(245,158,11,0.3)] disabled:opacity-50 cursor-pointer"
                      >
                        {status === "submitting" ? (
                          <span>Reserving Your Video Review…</span>
                        ) : (
                          <>
                            <span>Send My Free 5-Min Video Breakdown</span>
                            <ArrowRight className="w-4 h-4 shrink-0" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
