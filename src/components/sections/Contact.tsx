"use client";

import {
  Send,
  Calendar,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";
import Link from "next/link";

interface ContactProps {
  formSource?: string;
  isStandalonePage?: boolean;
}

export default function Contact({
  formSource = "homepage-contact",
  isStandalonePage = false,
}: ContactProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const { ok } = await submitVerifiedLeadForm({
        formSource,
        formData: data,
      });

      if (ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const HeadingTag = isStandalonePage ? "h1" : "h2";

  return (
    <section
      id="contact"
      className={`relative ${
        isStandalonePage ? "pt-32 pb-20 md:pt-40 md:pb-28" : "py-20 md:py-28 border-t border-white/10"
      } overflow-hidden bg-[#06080f]`}
    >
      <div className="absolute inset-0 blueprint-grid opacity-35 pointer-events-none" aria-hidden="true" />

      <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <span className="text-amber-400 font-mono font-bold tracking-[0.25em] uppercase text-xs mb-3 block">
            Direct Jackson, MS Access • Zero Call Centers
          </span>
          <HeadingTag className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight uppercase leading-[1.02] text-white">
            Talk Directly With <span className="text-amber-400">Damein Donald.</span>
          </HeadingTag>
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Questions about a contractor growth website, deploying{" "}
            <strong className="text-white">PinCam™ + PinDrop™</strong> for your crew, or ranking in the Google Map Pack? Call, text, or send a note below.
          </p>
        </div>

        <div className="grid gap-8 lg:gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Direct Access Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Call & Text Card */}
            <div className="p-6 rounded-3xl bg-[#090d18] border border-white/10 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/35 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Direct Call or Text</h3>
                  <span className="text-xs text-slate-400 font-mono">Mon – Fri • 9:00 AM – 5:00 PM CT</span>
                </div>
              </div>

              <a
                href="tel:6014462393"
                className="text-2xl font-black text-amber-400 hover:text-amber-300 transition-colors block font-mono"
              >
                (601) 446-2393
              </a>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href="tel:6014462393"
                  className="py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold uppercase tracking-wider text-white text-center transition-colors"
                >
                  Call Now
                </a>
                <a
                  href="sms:6014462393?body=Hey%20Damein%2C%20I%27d%20like%20to%20talk%20about%20getting%20more%20leads%20for%20my%20business."
                  className="py-2.5 px-3 rounded-xl bg-amber-500/12 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-bold uppercase tracking-wider text-amber-300 text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Text Us
                </a>
              </div>
            </div>

            {/* 15-Minute Strategy Call Card */}
            <div className="p-6 rounded-3xl bg-[#090d18] border border-white/10">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Book a 15-Minute Demo / Strategy Call</h3>
                  <span className="text-xs text-slate-400">Pick an exact slot on Damein&apos;s calendar</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="w-full mt-2 py-3.5 px-4 bg-white/[0.05] hover:bg-amber-400 hover:text-slate-950 border border-white/15 hover:border-amber-400 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all text-center cursor-pointer"
              >
                Choose a Time on Calendar →
              </button>
            </div>

            {/* Headquarters & Email */}
            <div className="p-6 rounded-3xl bg-[#090d18]/80 border border-white/10 space-y-3 text-xs">
              <div className="flex items-start gap-2.5 text-slate-200">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Power Digital Media LLC</div>
                  <div className="text-slate-400">2914 Cynthia Rd, Jackson, MS 39209</div>
                  <div className="text-slate-400 mt-1">
                    Serving Jackson • Madison • Ridgeland • Brandon • Flowood • Clinton
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300 pt-2 border-t border-white/10">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="mailto:info@powerdigitalmedia.org"
                  className="hover:text-amber-300 transition-colors"
                >
                  info@powerdigitalmedia.org
                </a>
              </div>
            </div>

            {/* Preserved SMS Opt-In Compliance */}
            <p className="text-[10px] text-slate-400 leading-relaxed px-1">
              By texting &ldquo;START&rdquo; or messaging (601) 446-2393, you agree that you may receive appointment reminders, support, and updates via SMS from Power Digital Media LLC. Msg &amp; data rates may apply. Msg frequency varies. Mobile information will not be shared with third parties/affiliates for marketing/promotional purposes. Reply STOP to cancel or HELP for support. View our{" "}
              <Link href="/privacy" className="text-amber-400 underline hover:text-amber-300">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-amber-400 underline hover:text-amber-300">
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </div>

          {/* Right Column: Frictionless Lead Form */}
          <div className="lg:col-span-7 obsidian-surface p-6 sm:p-9 rounded-3xl">
            {status === "success" ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white">
                  Inquiry Logged — Damein Has It!
                </h3>
                <p className="text-slate-300 max-w-md text-sm leading-relaxed">
                  Thanks for reaching out. We&apos;ll review your note and reply within 1 business day (usually much faster). Need immediate help? Call{" "}
                  <a href="tel:6014462393" className="text-amber-400 font-bold underline">
                    (601) 446-2393
                  </a>
                  .
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    href="/book"
                    className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider hover:bg-amber-300 transition-colors"
                  >
                    Want to Pick a Call Time Now? →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="px-5 py-3 rounded-xl border border-white/15 text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormSecurityFields />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      disabled={status === "submitting"}
                      placeholder="Mike Reynolds"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#06080f] border border-white/15 focus:border-amber-400 outline-none text-white text-sm placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                      Cell / Best Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      disabled={status === "submitting"}
                      placeholder="(601) 555-0192"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#06080f] border border-white/15 focus:border-amber-400 outline-none text-white text-sm placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      disabled={status === "submitting"}
                      placeholder="mike@yourcompany.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#06080f] border border-white/15 focus:border-amber-400 outline-none text-white text-sm placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                      Company or Website
                    </label>
                    <input
                      type="text"
                      name="company"
                      disabled={status === "submitting"}
                      placeholder="Reynolds Roofing or yoursite.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#06080f] border border-white/15 focus:border-amber-400 outline-none text-white text-sm placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                    What Are You Looking to Build or Fix?
                  </label>
                  <select
                    name="services"
                    disabled={status === "submitting"}
                    defaultValue="Contractor Growth Website + Local SEO"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#06080f] border border-white/15 focus:border-amber-400 outline-none text-white text-sm"
                  >
                    <option value="Contractor Growth Website + Local SEO">
                      Contractor Growth Website + Local SEO
                    </option>
                    <option value="PinCam + PinDrop Field Apps Demo">
                      PinCam™ + PinDrop™ Field Apps (Add-On or Integration)
                    </option>
                    <option value="Google Map Pack & 5-Star Review System">
                      Google Map Pack Ranking &amp; 5-Star Review System
                    </option>
                    <option value="Custom Local Business / E-Commerce Website">
                      Local Business, Restaurant, or E-Commerce Website
                    </option>
                    <option value="2-Minute Lead Rescue CRM & Business Phones">
                      2-Minute SMS Lead Rescue, CRM &amp; Business Phones
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                    Quick Project Details *
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    disabled={status === "submitting"}
                    placeholder="Tell us your trade/industry, the cities you serve, and what's holding your current website or lead flow back..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#06080f] border border-white/15 focus:border-amber-400 outline-none text-white text-sm placeholder:text-slate-500 resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-300 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-xs">
                    Couldn&apos;t submit right now—please call or text Damein directly at{" "}
                    <a href="tel:6014462393" className="font-bold underline">
                      (601) 446-2393
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl hover:brightness-110 transition-all text-xs uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(245,158,11,0.3)] cursor-pointer"
                >
                  <span>{status === "submitting" ? "Sending Direct to Damein..." : "Send Direct Message"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  );
}
