"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";
import {
  Flame,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Gauge,
  ShoppingCart,
  Calendar,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Founders100Page() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [claimedCount, setClaimedCount] = useState<number>(14);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/founders100")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.claimed === "number") {
          setClaimedCount(Math.min(100, Math.max(1, data.claimed)));
        }
      })
      .catch(() => {
        // Keep default slot telemetry if offline
      });
  }, []);

  const handleClaimSpotClick = () => {
    const formElement = document.getElementById("secure-spot-form-container");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      const nameInput = document.getElementsByName("name")[0] as HTMLInputElement;
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 600);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    data.append("_form_source", "founders-100-reservation");
    data.append("tags", "secure-spot");

    try {
      const { ok } = await submitVerifiedLeadForm({
        formSource: "founders-100-reservation",
        formData: data,
      });

      if (!ok) {
        setStatus("error");
        return;
      }

      const nameVal = (data.get("name") as string) || "";
      const emailVal = (data.get("email") as string) || "";
      const phoneVal = (data.get("phone") as string) || "";

      setStatus("success");
      form.reset();
      setTimeout(() => {
        router.push(
          `/book?from=founders100&name=${encodeURIComponent(nameVal)}&email=${encodeURIComponent(
            emailVal
          )}&phone=${encodeURIComponent(phoneVal)}`
        );
      }, 900);
    } catch (err) {
      console.error("Founders 100 pipeline error:", err);
      setStatus("error");
    }
  };

  const remainingSlots = Math.max(0, 100 - claimedCount);

  return (
    <main className="relative min-h-screen bg-[#06080f] text-white overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-amber-500/[0.06] blur-[150px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <section className="relative pt-32 pb-24 md:pt-40 z-10">
        <div className="container px-4 sm:px-6 mx-auto max-w-6xl">
          {/* Header */}
          <div className="max-w-3xl mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-amber-400" />
              Limited 100-Partner Initiative • Central MS &amp; Beyond
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[1.02]">
              Founder&apos;s <span className="text-amber-400">100.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We&apos;re partnering with <strong className="text-white">100 standout Mississippi contractors and local businesses</strong> to engineer bespoke Next.js Growth Websites, Google Map Pack architecture, and field-crew automation—<strong className="text-amber-400">custom-scoped case-by-case</strong> directly with founder Damein Donald.
            </p>
          </div>

          {/* Two-Column Grid */}
          <div className="grid gap-10 lg:grid-cols-12 items-start mb-20">
            {/* Left Column: Partner Cohort Card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-amber-400/30 bg-[#0b0c10] p-7 sm:p-10 space-y-7 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 block">
                      Mississippi Cohort Status
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mt-1">
                      Priority Founder Allocation
                    </h2>
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-right">
                    <div className="text-xl font-black text-emerald-400 leading-none">
                      {remainingSlots} / 100
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 mt-1">
                      Partner Slots Open
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>{claimedCount} Mississippi Builds Allocated</span>
                    <span className="text-amber-300 font-bold">Case-by-Case Custom Scope</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-[#12141c] border border-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 transition-all duration-700"
                      style={{ width: `${Math.max(12, claimedCount)}%` }}
                    />
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Instead of forcing your business into a rigid agency package, every Founder&apos;s 100 partner receives a <strong className="text-white">tailored engineering scope</strong> built around your exact trade, service cities, and workflow—whether you need a clean 5-page local authority site, a multi-city contractor hub wired to <strong className="text-amber-300">PinCam™ + PinDrop™</strong>, or 0%-commission online ordering.
                </p>

                <ul className="grid sm:grid-cols-2 gap-3.5 pt-2">
                  {[
                    "Custom Next.js 16 Architecture (< 2s Mobile)",
                    "LocalBusiness & Geo JSON-LD Schema",
                    "Direct Cell Access to Damein Donald",
                    "100% Codebase & Domain Ownership",
                    "Capsule CRM & Automated Follow-Up Ready",
                    "Optional PinCam™ & PinDrop™ Crew Rollout",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#12141c] border border-white/[0.07] text-xs font-semibold text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Zero obligation to reserve • Scoped live on a 15-minute call</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClaimSpotClick}
                    className="px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-amber-400/35 text-amber-300 font-black uppercase tracking-wider text-xs transition-all cursor-pointer shrink-0"
                  >
                    Hold My Partner Slot →
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5" id="secure-spot-form-container">
              <div className="rounded-3xl border border-amber-400/35 bg-[#0b0c10] p-7 sm:p-9 shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
                {status === "success" ? (
                  <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-black uppercase text-white">Slot Reserved!</h2>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Taking you straight to Damein&apos;s calendar to lock in your 15-minute scope call...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <h2 className="text-xl font-black tracking-tight uppercase flex items-center gap-2 text-amber-400">
                        <Calendar className="w-5 h-5" />
                        Reserve Your Build Slot
                      </h2>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Hold your Founder&apos;s 100 spot with zero obligation today, then pick a 15-minute scope call directly with Damein.
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
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Business Name *
                        </label>
                        <input
                          type="text"
                          name="business_name"
                          required
                          disabled={status === "submitting"}
                          placeholder="Reynolds Roofing LLC"
                          className="w-full px-4 py-3.5 bg-[#12141c] border border-white/10 focus:border-amber-400 rounded-xl outline-none text-white text-sm placeholder:text-slate-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Current Website (Optional)
                        </label>
                        <input
                          type="url"
                          name="current_website"
                          disabled={status === "submitting"}
                          placeholder="https://yoursite.com"
                          className="w-full px-4 py-3.5 bg-[#12141c] border border-white/10 focus:border-amber-400 rounded-xl outline-none text-white text-sm placeholder:text-slate-500"
                        />
                      </div>

                      {status === "error" && (
                        <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-300 text-xs rounded-xl flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          Could not submit. Please try again or call (601) 446-2393.
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all text-xs uppercase tracking-wider disabled:opacity-50 cursor-pointer shadow-[0_0_28px_rgba(245,158,11,0.3)]"
                      >
                        {status === "submitting" ? (
                          "Locking In Reservation..."
                        ) : (
                          <>
                            Reserve My Partner Build Slot
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

          {/* Ownership & Hosting Clarity */}
          <div className="mb-20 p-7 sm:p-9 rounded-3xl border border-amber-400/30 bg-[#0b0c10] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400" />
            <h2 className="text-lg font-black uppercase tracking-wide text-white mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              100% Code Ownership &amp; Flexible Ongoing Care
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every Founder&apos;s 100 build is hand-coded in <strong className="text-white">Next.js, React, and TypeScript</strong>—never a slow Wix or bloated WordPress template. Upon completion of your custom-scoped build, you own 100% of your custom codebase, copy, and domain.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed mt-3">
              Want us to handle global edge hosting, SSL security, content updates, Local SEO, and priority technical care? We offer flexible <strong className="text-amber-400">month-to-month Managed Hosting &amp; Growth Plans</strong> tailored to your needs—or you can self-host your codebase with zero lock-in.
            </p>
          </div>

          {/* Deliverables */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-7 rounded-3xl border border-white/10 bg-[#0b0c10] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase text-white">Custom Mobile-First UI</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Designed from scratch around your trade or local brand with sticky click-to-call actions and instant quote capture.
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-white/10 bg-[#0b0c10] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase text-white">95+ Speed &amp; Local Schema</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Pre-wired with LocalBusiness JSON-LD schema, service-area metadata, and sub-2-second mobile load performance.
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-white/10 bg-[#0b0c10] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase text-white">CRM, Ordering &amp; Field Apps</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Ready for 0%-fee Square/Stripe ordering, calendar booking, Capsule CRM lead sync, and optional PDM PinDrop™ + PinCam™ field tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
