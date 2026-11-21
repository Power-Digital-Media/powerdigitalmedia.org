"use client";

import { useState, useId, type FormEvent } from "react";
import Link from "next/link";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageSquare,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";

interface QuickHeroLeadCardProps {
  formSource: string;
  eyebrow: string;
  heading: string;
  subtext: string;
  pills: string[];
  defaultPill?: string;
  submitLabel?: string;
  businessPlaceholder?: string;
}

export default function QuickHeroLeadCard({
  formSource,
  eyebrow,
  heading,
  subtext,
  pills,
  defaultPill,
  submitLabel = "Send My Ballpark & Gameplan",
  businessPlaceholder = "Your Business or Website (e.g. Smith Roofing, Brandon)",
}: QuickHeroLeadCardProps) {
  const uid = useId();
  const [selectedPill, setSelectedPill] = useState<string>(
    defaultPill || pills[0] || "Custom Website + SEO"
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");

  const smsHref = `sms:6014462393?body=${encodeURIComponent(
    `Hi Damein, I'm interested in ${selectedPill} for my business. Got a few minutes?`
  )}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const nameVal = String(data.get("name") || "").trim();
    const bizVal = String(data.get("business_or_website") || "").trim();

    data.set("services", selectedPill);
    if (bizVal) {
      data.set("company", bizVal);
      if (/^[a-z0-9-]+(\.[a-z0-9-]+)+/i.test(bizVal) && !/\s/.test(bizVal)) {
        data.set(
          "website_url",
          /^https?:\/\//i.test(bizVal) ? bizVal : `https://${bizVal}`
        );
      }
    }
    data.set(
      "notes",
      `Quick Hero Request (${formSource}): Interested in ${selectedPill}${
        bizVal ? ` | Business/Site: ${bizVal}` : ""
      }`
    );

    try {
      const { ok, result } = await submitVerifiedLeadForm({
        formSource,
        formData: data,
      });

      if (ok) {
        setFirstName(nameVal.split(/\s+/)[0] || "Friend");
        setStatus("success");
        form.reset();
      } else {
        setErrorMsg(
          result.error || "Please double-check your email or text (601) 446-2393."
        );
        setStatus("error");
      }
    } catch {
      setErrorMsg("Connection hiccup. Please try again or text (601) 446-2393.");
      setStatus("error");
    }
  };

  return (
    <div className="rounded-3xl bg-[#0a0e19] border-2 border-amber-500/35 p-5 sm:p-7 shadow-[0_24px_70px_rgba(0,0,0,0.7),0_0_32px_rgba(245,158,11,0.12)]">
      {status === "success" ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-black uppercase text-white">
              Got It, {firstName}!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Damein Donald in Jackson, MS just received your{" "}
              <strong className="text-amber-300">{selectedPill}</strong> request and
              will reply personally within 1 business day (usually much faster).
            </p>
          </div>
          <div className="pt-2 space-y-2">
            <Link
              href="/book?from=quick-hero"
              prefetch={false}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Want to Talk Today? Grab a 15-Min Slot</span>
            </Link>
            <a
              href="tel:6014462393"
              className="w-full py-3 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/[0.1] transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Direct: (601) 446-2393</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-2 pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-300 block">
                {eyebrow}
              </span>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white mt-0.5">
                {heading}
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {subtext}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-300 shrink-0">
              Free • Fast
            </span>
          </div>

          {/* 1-Tap Topic Pills */}
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              1. Tap What You Need:
            </span>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Select project focus">
              {pills.map((pill) => {
                const active = pill === selectedPill;
                return (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => setSelectedPill(pill)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${
                      active
                        ? "bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.28)]"
                        : "bg-[#06080f] text-slate-300 border-white/12 hover:border-amber-400/50 hover:text-white"
                    }`}
                  >
                    {pill}
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <FormSecurityFields />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label htmlFor={`${uid}-name`} className="sr-only">
                  Your Name
                </label>
                <input
                  id={`${uid}-name`}
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  disabled={status === "submitting"}
                  placeholder="Your Name *"
                  className="w-full px-3.5 py-3 rounded-xl bg-[#06080f] border border-white/15 focus:border-amber-400 outline-none text-xs sm:text-sm text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <label htmlFor={`${uid}-phone`} className="sr-only">
                  Cell Phone Number (Optional)
                </label>
                <input
                  id={`${uid}-phone`}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  disabled={status === "submitting"}
                  placeholder="Cell # (optional — for text)"
                  className="w-full px-3.5 py-3 rounded-xl bg-[#06080f] border border-white/15 focus:border-amber-400 outline-none text-xs sm:text-sm text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor={`${uid}-email`} className="sr-only">
                Best Email Address
              </label>
              <input
                id={`${uid}-email`}
                type="email"
                name="email"
                required
                autoComplete="email"
                disabled={status === "submitting"}
                placeholder="Best Email Address *"
                className="w-full px-3.5 py-3 rounded-xl bg-[#06080f] border border-white/15 focus:border-amber-400 outline-none text-xs sm:text-sm text-white placeholder:text-slate-500"
              />
            </div>

            <div>
              <label htmlFor={`${uid}-biz`} className="sr-only">
                Business Name or Website
              </label>
              <input
                id={`${uid}-biz`}
                type="text"
                name="business_or_website"
                disabled={status === "submitting"}
                placeholder={businessPlaceholder}
                className="w-full px-3.5 py-3 rounded-xl bg-[#06080f] border border-white/15 focus:border-amber-400 outline-none text-xs sm:text-sm text-white placeholder:text-slate-500"
              />
            </div>

            {status === "error" && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_26px_rgba(245,158,11,0.3)] cursor-pointer disabled:opacity-50"
            >
              <span>
                {status === "submitting" ? "Sending to Damein…" : submitLabel}
              </span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Direct with Damein in Jackson, MS
            </span>
            <div className="flex items-center gap-3 font-bold">
              <a
                href={smsHref}
                className="text-emerald-300 hover:text-emerald-200 inline-flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Text Now</span>
              </a>
              <a
                href="tel:6014462393"
                className="text-amber-300 hover:text-amber-200 inline-flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>(601) 446-2393</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
