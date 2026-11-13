"use client";

import React, { useState } from "react";
import {
  Globe,
  PhoneCall,
  Check,
  Send,
  MapPin,
  ShieldCheck,
  Heart,
  Users,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";
import Link from "next/link";

export default function CommunityLandingPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const services: string[] = [];
    formData.getAll("services_interested").forEach((val) => {
      services.push(val.toString());
    });

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      business_name: formData.get("business_name"),
      biggest_challenge: formData.get("biggest_challenge"),
      services_interested: services,
      tags: ["community", "community-event", "jackson-local"],
      _form_source: "community-event",
      _hp_company_fax: formData.get("_hp_company_fax") || "",
      _form_loaded_at: formData.get("_form_loaded_at") || "",
      "cf-turnstile-response": formData.get("cf-turnstile-response") || "",
    };

    try {
      const { ok, result } = await submitVerifiedLeadForm({
        formSource: "community-event",
        jsonPayload: payload,
      });

      if (ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to submit your details. Please check your inputs.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#06080f] text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 md:pt-40 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[450px] bg-amber-500/[0.06] rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-5">
              <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
              <span className="font-mono font-bold tracking-widest uppercase text-xs">
                Jackson Local Business Initiative
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black mb-5 tracking-tight uppercase leading-[1.03]">
              Stronger Together. <span className="text-amber-400">Elevating Jackson, MS.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Local businesses and contractors are the backbone of Central Mississippi. We build fast Next.js websites, Google Map Pack visibility, and connected phone/CRM systems so you can compete and win against national franchises.
            </p>
          </div>

          {/* 3 Core Offerings */}
          <div className="grid gap-6 md:grid-cols-3 mb-16">
            <div className="p-7 rounded-3xl border border-white/10 bg-[#0b0c10]">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-5">
                <Globe className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-tight mb-2.5">
                1. Custom Web &amp; Local SEO
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Hand-coded Next.js websites engineered for sub-2-second mobile speed, Google Maps rankings, and <strong className="text-white">PDM PinDrop™</strong> neighborhood proof.
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-white/10 bg-[#0b0c10]">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-5">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-tight mb-2.5">
                2. CRM &amp; Follow-Ups
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Power up your follow-up with <strong className="text-white">Capsule CRM</strong> and <strong className="text-white">Transpond</strong>—capturing every quote request, customer record, and email/SMS sequence automatically.
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-white/10 bg-[#0b0c10]">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-5">
                <PhoneCall className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-tight mb-2.5">
                3. Cloud Business Phones
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Deploy <strong className="text-white">ULTATEL Business Phone</strong> systems with auto-attendants, mobile app routing, and 2-minute missed-call text-back rescue.
              </p>
            </div>
          </div>

          {/* Story + Form */}
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-amber-400 font-mono font-bold uppercase tracking-widest text-xs block">
                Your Neighbor in Jackson
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
                We Handle Your Tech. You Run Your Crew &amp; Customers.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                We&apos;re proud to call Jackson home. When Mississippi contractors, restaurants, churches, and family businesses thrive, our whole community wins.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Instead of juggling four out-of-state agencies, you get one direct local partner at 2914 Cynthia Rd who picks up the phone when you call.
              </p>

              <div className="pt-5 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Headquartered in Jackson, Mississippi</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>BBB Accredited (A Rating) • 5.0★ Google Reviews</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10] shadow-2xl">
                {status === "success" ? (
                  <div className="text-center py-10 space-y-5">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                        Inquiry Logged!
                      </h3>
                      <p className="text-slate-300 text-sm max-w-md mx-auto">
                        Thanks for connecting! Damein has your details and will follow up shortly.
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Link
                        href="/book"
                        className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider"
                      >
                        Pick a 15-Min Call Slot →
                      </Link>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="px-6 py-3 rounded-xl border border-white/15 hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <FormSecurityFields />
                    <div>
                      <h3 className="text-xl font-black uppercase text-white">
                        Connect With Power Digital Media
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Share your details below and we&apos;ll send over our local partner info packet.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="John Doe"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none text-sm text-white placeholder:text-slate-500"
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
                          placeholder="john@yourbusiness.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none text-sm text-white placeholder:text-slate-500"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="(601) 555-0199"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none text-sm text-white placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Business / Organization Name *
                        </label>
                        <input
                          type="text"
                          name="business_name"
                          required
                          placeholder="Jackson Roofing Co."
                          className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none text-sm text-white placeholder:text-slate-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                        What Can We Help You Set Up?
                      </label>
                      <div className="grid gap-2.5 sm:grid-cols-2 p-4 rounded-xl bg-[#12141c] border border-white/10">
                        {[
                          { value: "Web Design", label: "High-Speed Website & SEO" },
                          { value: "CRM & Automation", label: "CRM & Lead Follow-Up" },
                          { value: "Email Marketing", label: "PinDrop™ / Review Automation" },
                          { value: "Ultatel Business Phone", label: "ULTATEL Business Phones" },
                        ].map((opt) => (
                          <label
                            key={opt.value}
                            className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer select-none"
                          >
                            <input
                              type="checkbox"
                              name="services_interested"
                              value={opt.value}
                              className="rounded border-white/20 text-amber-500 focus:ring-amber-500 bg-[#06080f] w-4 h-4"
                            />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Biggest Business Goal Right Now
                      </label>
                      <textarea
                        name="biggest_challenge"
                        rows={3}
                        placeholder="Getting more local calls, ranking in Google Maps, catching missed calls..."
                        className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none text-sm text-white placeholder:text-slate-500 resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-red-400 text-xs font-medium">{errorMessage}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-[0_0_28px_rgba(245,158,11,0.3)]"
                    >
                      <span>
                        {status === "submitting" ? "Sending..." : "Connect With Damein"}
                      </span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
