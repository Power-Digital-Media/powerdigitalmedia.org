"use client";

import { ArrowRight, CheckCircle2, ShieldCheck, Database, PhoneCall, MailCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GrowthScopeEstimator from "@/components/sections/GrowthScopeEstimator";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BusinessSolutionsPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const { ok } = await submitVerifiedLeadForm({
        formSource: "unified-solutions-lead",
        formData: data,
      });

      if (ok) {
        setStatus("success");
        form.reset();
        const nameVal = (data.get("name") as string) || "";
        const emailVal = (data.get("email") as string) || "";
        const phoneVal = (data.get("phone") as string) || "";
        setTimeout(() => {
          router.push(
            `/book?from=solutions&name=${encodeURIComponent(nameVal)}&email=${encodeURIComponent(
              emailVal
            )}&phone=${encodeURIComponent(phoneVal)}`
          );
        }, 900);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Solutions form submission error:", err);
      setStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen bg-[#06080f] text-white overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-amber-500/[0.06] blur-[150px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 z-10">
        <div className="container px-4 sm:px-6 mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Value Prop Column */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Connected Business Stack • Jackson, MS
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-black tracking-tight sm:text-6xl leading-[1.03] uppercase">
                  One Connected <span className="text-amber-400">Growth Stack.</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                  Stop duct-taping five disconnected vendors together. We wire your Next.js website, Capsule CRM, Transpond follow-ups, PDM PinDrop™ field apps, and PDM Site Intelligence™ monitoring into one unified system.
                </p>
              </div>

              {/* Core Pillars */}
              <div className="grid gap-4 sm:grid-cols-3 pt-2">
                <div className="p-5 rounded-2xl bg-[#0b0c10] border border-white/10 space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <h2 className="font-bold text-sm text-white">Web &amp; Field Apps</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Sub-2s Next.js websites wired to PDM PinDrop™ &amp; PinCam™ jobsite proof.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#0b0c10] border border-white/10 space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <MailCheck className="w-5 h-5" />
                  </div>
                  <h2 className="font-bold text-sm text-white">CRM &amp; Follow-Up</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Capsule CRM pipelines and Transpond SMS/email sequences running automatically.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#0b0c10] border border-white/10 space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <h2 className="font-bold text-sm text-white">24/7 Watchtower</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    PDM Site Intelligence™ uptime, SSL, speed &amp; Search Console monitoring in Jackson.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-400 pt-2">
                Authorized Integration Partner for Capsule CRM &amp; Transpond Automation.
              </p>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-5">
              <div className="p-7 sm:p-9 rounded-3xl border border-white/10 bg-[#0b0c10] shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
                {status === "success" ? (
                  <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black uppercase text-white">Request Logged!</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Taking you directly to Damein&apos;s calendar to pick your 15-minute strategy slot...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <h2 className="text-xl font-black uppercase text-white">
                        Request a Systems Walkthrough
                      </h2>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Tell us which pieces of your stack need fixing and pick a time to talk directly with Damein.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <FormSecurityFields />

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          disabled={status === "submitting"}
                          placeholder="Mike Reynolds"
                          className="w-full px-4 py-3.5 bg-[#12141c] border border-white/10 focus:border-amber-400 rounded-xl outline-none text-white text-sm placeholder:text-slate-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          disabled={status === "submitting"}
                          placeholder="mike@yourcompany.com"
                          className="w-full px-4 py-3.5 bg-[#12141c] border border-white/10 focus:border-amber-400 rounded-xl outline-none text-white text-sm placeholder:text-slate-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          disabled={status === "submitting"}
                          placeholder="(601) 555-0199"
                          className="w-full px-4 py-3.5 bg-[#12141c] border border-white/10 focus:border-amber-400 rounded-xl outline-none text-white text-sm placeholder:text-slate-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                          Systems Needed
                        </label>
                        <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-xl bg-[#12141c] border border-white/10">
                          {["Web Design", "PinDrop / PinCam", "Square Ordering", "CRM & Marketing"].map(
                            (svc) => (
                              <label
                                key={svc}
                                className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  name="services"
                                  value={svc}
                                  className="rounded bg-[#06080f] border-white/20 focus:ring-amber-500 h-4 w-4 text-amber-500"
                                />
                                {svc}
                              </label>
                            )
                          )}
                        </div>
                      </div>

                      {status === "error" && (
                        <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-300 text-xs rounded-xl">
                          Could not submit right now. Please call (601) 446-2393 directly.
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all text-xs uppercase tracking-wider disabled:opacity-50 cursor-pointer shadow-[0_0_28px_rgba(245,158,11,0.3)]"
                      >
                        {status === "submitting" ? (
                          "Saving & Opening Calendar..."
                        ) : (
                          <>
                            Continue to Strategy Calendar
                            <ArrowRight className="w-4 h-4" />
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

      <GrowthScopeEstimator defaultIndustryId="local_business_ministry" />

      {/* Secondary CTA */}
      <section className="py-16 border-t border-white/10 bg-[#0b0c10] relative z-10">
        <div className="container px-4 sm:px-6 mx-auto max-w-4xl text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Want Us to Check Your Lead Leaks First?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Request a free manual check of your website speed, Google Map Pack visibility, AI search readiness, and quote lead routing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <Link
              href="/free-audit"
              className="w-full sm:w-auto px-7 py-4 bg-amber-400 text-slate-950 font-black rounded-xl hover:bg-amber-300 transition-colors uppercase tracking-wider text-xs"
            >
              Get Free 5-Min Rank Check
            </Link>
            <Link
              href="/lead-leak-check"
              className="w-full sm:w-auto px-7 py-4 bg-[#12141c] border border-white/15 hover:border-amber-400/50 rounded-xl font-bold uppercase tracking-wider text-xs text-white transition-colors"
            >
              Run Lead Leak Diagnostic
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
