"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Monitor,
  Users,
  Mail,
  MessageSquare,
  Phone,
  FileText,
  AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";
import Link from "next/link";
import dynamic from "next/dynamic";

const BBBSeal = dynamic(() => import("@/components/ui/BBBSeal"), { ssr: false });

export default function LeadLeakCheckPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submittedLead, setSubmittedLead] = useState({ name: "", email: "", phone: "" });
  const [tags, setTags] = useState<string[]>([]);
  const [trackingData, setTrackingData] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    referrer: "",
    page_path: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Free Lead Leak Check | Power Digital Media";

      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = (urlParams.get("utm_source") || "").toLowerCase();
      const utmMedium = (urlParams.get("utm_medium") || "").toLowerCase();
      const ref = document.referrer || "";
      const refLower = ref.toLowerCase();

      const detectedTags: string[] = [];
      const isMeta =
        utmSource.includes("facebook") ||
        utmSource.includes("instagram") ||
        utmSource.includes("meta") ||
        utmSource.includes("fb") ||
        utmSource.includes("ig") ||
        utmMedium.includes("facebook") ||
        utmMedium.includes("instagram") ||
        utmMedium.includes("meta") ||
        refLower.includes("facebook.com") ||
        refLower.includes("instagram.com") ||
        refLower.includes("fb.com") ||
        refLower.includes("meta.com") ||
        refLower.includes("l.instagram.com") ||
        refLower.includes("l.facebook.com");

      if (isMeta) {
        detectedTags.push("meta-lead");
      }
      setTags(detectedTags);

      setTrackingData({
        utm_source: urlParams.get("utm_source") || "",
        utm_medium: urlParams.get("utm_medium") || "",
        utm_campaign: urlParams.get("utm_campaign") || "",
        referrer: ref,
        page_path: window.location.pathname || "",
      });
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("_form_source", "lead-leak-check");
    data.append("utm_source", trackingData.utm_source);
    data.append("utm_medium", trackingData.utm_medium);
    data.append("utm_campaign", trackingData.utm_campaign);
    data.append("referrer", trackingData.referrer);
    data.append("page_path", trackingData.page_path);

    tags.forEach((tag) => {
      data.append("tags", tag);
    });

    try {
      const { ok } = await submitVerifiedLeadForm({
        formSource: "lead-leak-check",
        formData: data,
      });

      if (ok) {
        setStatus("success");
        const nameVal = data.get("name") as string;
        const emailVal = data.get("email") as string;
        const phoneVal = data.get("phone") as string;
        setSubmittedLead({
          name: nameVal || "there",
          email: emailVal || "",
          phone: phoneVal || "",
        });
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Lead Leak Check submission error:", err);
      setStatus("error");
    }
  };

  const leakPoints = [
    {
      title: "Mobile visitors bounce without an instant quote path",
      desc: "Slow template sites make homeowners hunt for basic pricing or service info while they're ready to book.",
    },
    {
      title: "Contact forms only send a plain email",
      desc: "Quote requests sit in an inbox for hours while the homeowner calls the next contractor on Google.",
    },
    {
      title: "Facebook & Instagram messages get buried",
      desc: "Social inquiries go cold because notifications aren't routed into one central pipeline.",
    },
    {
      title: "Zero instant quote confirmation",
      desc: "Prospects never get an immediate confirmation showing you received their request.",
    },
    {
      title: "Past customers aren't leaving Google reviews",
      desc: "Completed jobs wrap up without an automated 5-star review link or neighborhood pin.",
    },
    {
      title: "No visibility on what's actually working",
      desc: "You can't see which Google searches, ads, or cities are producing real booked jobs.",
    },
  ];

  const notificationItems = [
    {
      type: "Instant Quote Calculator",
      time: "Just now",
      message: "Estimate scoped & synced to CRM",
      icon: Phone,
      color: "text-amber-300 bg-amber-500/10 border-amber-500/25",
    },
    {
      type: "Website Quote Logged",
      time: "1 min ago",
      message: "Roof inspection • Madison, MS",
      icon: Monitor,
      color: "text-emerald-300 bg-emerald-500/10 border-emerald-500/25",
    },
    {
      type: "Facebook Lead Synced",
      time: "2 min ago",
      message: "Added to Capsule CRM Pipeline",
      icon: MessageSquare,
      color: "text-amber-200 bg-white/[0.04] border-white/10",
    },
    {
      type: "Estimate Follow-Up",
      time: "3 min ago",
      message: "Appointment link texted to homeowner",
      icon: FileText,
      color: "text-emerald-300 bg-emerald-500/10 border-emerald-500/25",
    },
  ];

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
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-8 lg:pr-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Free 5-Point Lead Leak Diagnostic
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-[1.03] uppercase text-white">
                  Are You Losing <span className="text-amber-400">Customers</span> Before You Ever Talk to Them?
                </h1>
                <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                  Power Digital Media helps Mississippi contractors and local businesses capture every website quote, Google Map Pack click, AI search inquiry, and CRM follow-up automatically.
                </p>
              </div>

              {/* Leak Points */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h2 className="text-base font-bold text-white flex items-center gap-2 uppercase tracking-wide">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Common Places Local Businesses Leak Jobs:
                </h2>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  {leakPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-4 rounded-2xl bg-[#0b0c10] border border-white/10"
                    >
                      <div className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5 text-red-400 font-bold text-xs">
                        ✕
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-sm text-white">{point.title}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unified Channels */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                  Channels We Test in Your Audit
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { name: "Website Forms", icon: Monitor },
                    { name: "Capsule CRM", icon: Users },
                    { name: "Email Follow-Up", icon: Mail },
                    { name: "GEO & AI Search", icon: MessageSquare },
                    { name: "Google Map Pack", icon: Phone },
                  ].map((channel, i) => {
                    const Icon = channel.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#0b0c10] text-xs font-semibold text-slate-200"
                      >
                        <Icon className="w-3.5 h-3.5 text-amber-400" />
                        <span>{channel.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Phone Feed Preview */}
              <div className="pt-4 hidden sm:block">
                <div className="w-[310px] bg-[#0b0c10] border-4 border-[#1a1d28] rounded-[2.25rem] shadow-2xl overflow-hidden p-4 space-y-3">
                  <div className="text-center pb-2 border-b border-white/10">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                      Live Lead Capture Feed
                    </span>
                    <h3 className="text-xs font-black text-white mt-0.5">ZERO MISSED JOBS</h3>
                  </div>

                  <div className="space-y-2.5">
                    {notificationItems.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.12 }}
                          className={`p-3 rounded-2xl border flex gap-3 items-center ${item.color}`}
                        >
                          <div className="w-8 h-8 rounded-xl bg-[#06080f]/60 border border-white/10 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-white truncate">
                                {item.type}
                              </span>
                              <span className="text-[9px] text-slate-400 shrink-0">{item.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-300 truncate mt-0.5">
                              {item.message}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Lead Form Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="p-5 sm:p-9 rounded-3xl border border-white/10 bg-[#0b0c10] shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
                {status === "success" ? (
                  <div className="py-10 flex flex-col items-center justify-center text-center space-y-5">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                        Lead Leak Check Logged!
                      </h2>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Damein has your details and is reviewing your website, phone routing, and follow-up setup now.
                      </p>
                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-semibold leading-relaxed mt-3">
                        Want to walk through your results live? Pick a 15-minute slot on Damein&apos;s calendar right now.
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full pt-2">
                      <Link
                        href={`/book?from=lead-leak-check&name=${encodeURIComponent(
                          submittedLead.name
                        )}&email=${encodeURIComponent(
                          submittedLead.email
                        )}&phone=${encodeURIComponent(submittedLead.phone)}`}
                        className="w-full py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all text-xs uppercase tracking-wider text-center"
                      >
                        Book a 15-Minute Review Call
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="w-full py-3.5 border border-white/15 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        Wait for Email Report Instead
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                        Get Your Free Lead Leak Check
                      </h2>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Tell us where to look and we&apos;ll send you a plain-English breakdown of every spot leads are slipping through.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <FormSecurityFields />

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          disabled={status === "submitting"}
                          placeholder="Mike Reynolds"
                          className="w-full px-4 py-3.5 bg-[#12141c] border border-white/10 focus:border-amber-400 rounded-xl outline-none transition-colors placeholder:text-slate-500 text-white text-sm"
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
                          placeholder="Reynolds Roofing & Exteriors"
                          className="w-full px-4 py-3.5 bg-[#12141c] border border-white/10 focus:border-amber-400 rounded-xl outline-none transition-colors placeholder:text-slate-500 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Email Address (For Your Report) *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          disabled={status === "submitting"}
                          placeholder="mike@yourcompany.com"
                          className="w-full px-4 py-3.5 bg-[#12141c] border border-white/10 focus:border-amber-400 rounded-xl outline-none transition-colors placeholder:text-slate-500 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Cell / Best Phone (Optional)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          disabled={status === "submitting"}
                          placeholder="(601) 555-0199"
                          className="w-full px-4 py-3.5 bg-[#12141c] border border-white/10 focus:border-amber-400 rounded-xl outline-none transition-colors placeholder:text-slate-500 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Website or Facebook Page *
                        </label>
                        <input
                          type="text"
                          name="website_or_facebook"
                          required
                          disabled={status === "submitting"}
                          placeholder="yoursite.com or facebook.com/yourbusiness"
                          className="w-full px-4 py-3.5 bg-[#12141c] border border-white/10 focus:border-amber-400 rounded-xl outline-none transition-colors placeholder:text-slate-500 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Biggest Priority Right Now *
                        </label>
                        <select
                          name="roadblock"
                          required
                          defaultValue=""
                          disabled={status === "submitting"}
                          className="w-full px-4 py-3.5 bg-[#12141c] border border-white/10 focus:border-amber-400 rounded-xl outline-none transition-colors text-white text-sm cursor-pointer"
                        >
                          <option value="" disabled>
                            Select an option...
                          </option>
                          <option value="Getting more calls/leads">Getting more calls &amp; leads</option>
                          <option value="Following up with leads">Faster lead follow-up</option>
                          <option value="My website is not bringing leads">
                            My website isn&apos;t bringing calls
                          </option>
                          <option value="Quote conversion">Converting visitors into quotes</option>
                          <option value="Email/text marketing">Google reviews &amp; automated follow-ups</option>
                          <option value="Not sure">Not sure — check everything</option>
                        </select>
                      </div>

                      {/* A2P 10DLC SMS Compliance */}
                      <div className="pt-1">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="sms_opt_in"
                            value="on"
                            disabled={status === "submitting"}
                            className="rounded bg-[#12141c] border-white/20 focus:ring-amber-500 h-4 w-4 text-amber-500 shrink-0 mt-0.5 cursor-pointer"
                          />
                          <span className="text-[10px] text-slate-400 leading-relaxed">
                            By checking this box, you agree to receive text messages from Power Digital Media LLC about your Lead Leak Check, appointment reminders, support, and updates. Msg &amp; data rates may apply. Msg frequency varies. Reply STOP to unsubscribe and HELP for help. Mobile information will not be shared with third parties/affiliates for marketing/promotional purposes. All text messaging originator opt-in data and consent will not be shared with any third parties. View our{" "}
                            <Link href="/privacy" target="_blank" className="text-amber-400 underline hover:text-amber-300">
                              Privacy Policy
                            </Link>{" "}
                            and{" "}
                            <Link href="/terms" target="_blank" className="text-amber-400 underline hover:text-amber-300">
                              Terms &amp; Conditions
                            </Link>
                            .
                          </span>
                        </label>
                      </div>

                      {status === "error" && (
                        <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-300 text-xs rounded-xl flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          Submission failed. Please try again or call (601) 446-2393.
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full px-4 py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all text-xs uppercase tracking-wider disabled:opacity-50 cursor-pointer shadow-[0_0_28px_rgba(245,158,11,0.3)]"
                      >
                        {status === "submitting" ? (
                          "Submitting Request..."
                        ) : (
                          <>
                            <span>Get My Free Lead Leak Check</span>
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

          {/* Trust Footer Strip */}
          <div className="mt-16 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                Jackson, Mississippi • Direct Local Support
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                Built by <strong className="text-white">Power Digital Media LLC</strong> — helping Mississippi contractors and local businesses win with custom Next.js websites, Google Map Pack optimization, PDM PinDrop™ &amp; PinCam™ field apps, and Capsule CRM automation.
              </p>
            </div>
            <BBBSeal variant="badge" className="shrink-0" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
