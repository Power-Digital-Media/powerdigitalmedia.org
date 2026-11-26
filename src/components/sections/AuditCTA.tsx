"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Send,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Video,
  Phone,
  Calendar,
  ShieldCheck,
} from "lucide-react";
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

export default function AuditCTA() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submittedName, setSubmittedName] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const rawForm = new FormData(form);
    const rawSiteOrBiz = String(rawForm.get("business_or_website") || "");
    const { websiteUrl, businessName } = normalizeWebsiteOrBusiness(rawSiteOrBiz);
    const nameVal = String(rawForm.get("name") || "").trim();

    rawForm.set("website_url", websiteUrl);
    if (!rawForm.get("business_name") && businessName) {
      rawForm.set("business_name", businessName);
    }

    try {
      const { ok, result } = await submitVerifiedLeadForm({
        formSource: "website-audit-request",
        formData: rawForm,
      });

      if (ok) {
        setSubmittedName(nameVal.split(/\s+/)[0] || "Friend");
        setStatus("success");
        localStorage.setItem("audit_converted", "true");
        form.reset();
      } else {
        setErrorMessage(result.error || "Could not submit right now. Please call or text (601) 446-2393.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network hiccup. Please try again or text Damein at (601) 446-2393.");
      setStatus("error");
    }
  };

  return (
    <section
      id="audit"
      className="py-11 md:py-28 relative overflow-hidden bg-[#05070d] border-t border-white/10"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[380px] bg-amber-500/[0.07] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl obsidian-surface p-4 sm:p-10 md:p-14">
            <div className="grid gap-5 sm:gap-10 lg:grid-cols-12 items-center">
              {/* Left Copy Column */}
              <div className="lg:col-span-6 space-y-3 sm:space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
                  <Video className="w-3.5 h-3.5 text-amber-400" />
                  100% Free • Recorded Personally by Damein
                </div>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.05] uppercase text-white">
                  Get Your Free 5-Minute{" "}
                  <span className="text-amber-400">Google Rank &amp; Website Breakdown.</span>
                </h2>

                <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
                  Enter your business name or website below. Damein Donald will personally check your Google Map Pack rankings &amp; mobile speed and text/email you a 5-minute video game plan.
                </p>

                <div className="hidden sm:block space-y-2.5 pt-1">
                  {[
                    "Live Google Map Pack check in your exact Mississippi service area",
                    "Mobile speed & lead-leak review (even if you don't have a website yet)",
                    "Zero pushy sales calls — keep the video game plan either way",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Delivered within 1 business day
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <a
                    href="tel:6014462393"
                    className="font-bold text-amber-300 hover:text-amber-200 transition-colors"
                  >
                    Or call/text (601) 446-2393
                  </a>
                </div>
              </div>

              {/* Right Form Column */}
              <div className="lg:col-span-6 bg-[#060912]/90 p-4 sm:p-8 rounded-2xl border border-white/10">
                {status === "success" ? (
                  <div className="py-6 flex flex-col items-center justify-center text-center space-y-5">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400">
                      <Send className="w-6 h-6" />
                    </div>
                    <div className="space-y-2 max-w-md">
                      <h3 className="text-2xl font-black text-white uppercase">
                        You&apos;re Locked In, {submittedName}!
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Damein has your request and will record your custom 5-minute Google &amp; website breakdown shortly. Want to jump on a quick 15-minute call right away?
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                      <Link
                        href="/book?from=audit"
                        className="flex-1 py-3.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                      >
                        <Calendar className="w-4 h-4" />
                        Book 15-Min Call
                      </Link>
                      <a
                        href="tel:6014462393"
                        className="flex-1 py-3.5 px-5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                      >
                        <Phone className="w-4 h-4 text-amber-400" />
                        (601) 446-2393
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <FormSecurityFields />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label
                          htmlFor="audit-cta-name"
                          className="block text-[11px] font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider"
                        >
                          Your Name *
                        </label>
                        <input
                          id="audit-cta-name"
                          type="text"
                          name="name"
                          required
                          autoComplete="name"
                          disabled={status === "submitting"}
                          placeholder="Mike Williams"
                          className="w-full px-3.5 py-3 text-sm bg-[#0b101d] border border-white/12 focus:border-amber-400 rounded-xl outline-none transition-all placeholder:text-slate-500 text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="audit-cta-phone"
                          className="block text-[11px] font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider"
                        >
                          Cell Phone (For Video Link) *
                        </label>
                        <input
                          id="audit-cta-phone"
                          type="tel"
                          name="phone"
                          required
                          autoComplete="tel"
                          disabled={status === "submitting"}
                          placeholder="(601) 555-0199"
                          className="w-full px-3.5 py-3 text-sm bg-[#0b101d] border border-white/12 focus:border-amber-400 rounded-xl outline-none transition-all placeholder:text-slate-500 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="audit-cta-biz"
                        className="block text-[11px] font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider"
                      >
                        Website or Business Name *
                      </label>
                      <input
                        id="audit-cta-biz"
                        type="text"
                        name="business_or_website"
                        required
                        disabled={status === "submitting"}
                        placeholder="yourcompany.com or Business Name (if no site yet)"
                        className="w-full px-3.5 py-3 text-sm bg-[#0b101d] border border-white/12 focus:border-amber-400 rounded-xl outline-none transition-all placeholder:text-slate-500 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label
                          htmlFor="audit-cta-email"
                          className="block text-[11px] font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider"
                        >
                          Email Address *
                        </label>
                        <input
                          id="audit-cta-email"
                          type="email"
                          name="email"
                          required
                          autoComplete="email"
                          disabled={status === "submitting"}
                          placeholder="mike@company.com"
                          className="w-full px-3.5 py-3 text-sm bg-[#0b101d] border border-white/12 focus:border-amber-400 rounded-xl outline-none transition-all placeholder:text-slate-500 text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="audit-cta-trade"
                          className="block text-[11px] font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider"
                        >
                          Industry / Trade
                        </label>
                        <select
                          id="audit-cta-trade"
                          name="services"
                          disabled={status === "submitting"}
                          defaultValue="Contractor / Home Services"
                          className="w-full px-3.5 py-3 text-sm bg-[#0b101d] border border-white/12 focus:border-amber-400 rounded-xl outline-none transition-all text-white"
                        >
                          <option value="Contractor / Home Services">Roofing / HVAC / Construction</option>
                          <option value="Excavation / Lawn / Exterior">Dirt Work / Lawn / Exterior</option>
                          <option value="PinCam + PinDrop Apps">PinCam™ + PinDrop™ Field Apps</option>
                          <option value="Restaurant / Local Commerce">Restaurant / Local Business</option>
                          <option value="Church / Ministry / Other">Ministry / Other Organization</option>
                        </select>
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
                      className="w-full py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all text-xs uppercase tracking-widest shadow-[0_0_28px_rgba(245,158,11,0.3)] disabled:opacity-60 cursor-pointer"
                    >
                      {status === "submitting" ? (
                        <span>Locking In Your Review...</span>
                      ) : (
                        <>
                          <span>Send My Free 5-Min Video Breakdown</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="lg:hidden pt-1 flex items-center justify-center gap-4 text-xs">
                      <Link
                        href="/book"
                        className="font-bold text-amber-300 underline underline-offset-4"
                      >
                        Book 15-Min Call →
                      </Link>
                      <span className="text-slate-600">•</span>
                      <Link
                        href="/contact"
                        className="font-semibold text-slate-300 underline underline-offset-4"
                      >
                        Direct Contact Page
                      </Link>
                    </div>
                    <p className="hidden lg:block text-[11px] text-center text-slate-500">
                      100% free. Recorded personally in Jackson, MS by Damein Donald.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
