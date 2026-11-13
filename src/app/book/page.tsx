"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    CalendarCheck,
    Phone,
    Mail,
    Clock,
    Sparkles,
    Video,
    CheckCircle2,
    ArrowRight,
    User,
    Briefcase,
    FileText,
    Coffee,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";
import { BOOKING_CONFIG } from "@/lib/booking";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const BBBSeal = dynamic(() => import("@/components/ui/BBBSeal"));

function BookPageContent() {
    const searchParams = useSearchParams();
    const fromParam = searchParams.get("from");
    const prefilledFromFunnel = Boolean(fromParam);

    const [step, setStep] = useState<1 | 2>(() => (prefilledFromFunnel ? 2 : 1));
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [meetingFormat, setMeetingFormat] = useState<"phone" | "meet" | "lunch">("meet");
    const [leadInfo, setLeadInfo] = useState({
        name: searchParams.get("name") || "",
        email: searchParams.get("email") || "",
        phone: searchParams.get("phone") || "",
    });

    useEffect(() => {
        if (prefilledFromFunnel) {
            setStep(2);
        }
        const qName = searchParams.get("name");
        const qEmail = searchParams.get("email");
        const qPhone = searchParams.get("phone");
        if (qName || qEmail || qPhone) {
            setLeadInfo((prev) => ({
                name: qName || prev.name,
                email: qEmail || prev.email,
                phone: qPhone || prev.phone,
            }));
        }
    }, [prefilledFromFunnel, searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        const form = e.currentTarget;
        const data = new FormData(form);
        data.append("_form_source", "g-business-booking");

        const nameVal = data.get("name")?.toString() || "";
        const emailVal = data.get("email")?.toString() || "";
        const phoneVal = data.get("phone")?.toString() || "";
        setLeadInfo({ name: nameVal, email: emailVal, phone: phoneVal });

        try {
            const { ok } = await submitVerifiedLeadForm({
                formSource: "g-business-booking",
                formData: data,
            });
            setStatus(ok ? "success" : "error");
            setStep(2);
        } catch {
            setStatus("error");
            setStep(2);
        }
    };

    const getCalendarUrl = () => {
        const calendlyConfig = BOOKING_CONFIG.calendly;

        if (calendlyConfig && calendlyConfig.username) {
            const slug = calendlyConfig.slugs[meetingFormat];
            if (slug) {
                let url = `https://calendly.com/${calendlyConfig.username}/${slug}?embed_domain=powerdigitalmedia.org&embed_type=Inline`;

                if (leadInfo.name) {
                    url += `&name=${encodeURIComponent(leadInfo.name)}`;
                }
                if (leadInfo.email) {
                    url += `&email=${encodeURIComponent(leadInfo.email)}`;
                }
                if (leadInfo.phone) {
                    url += `&phone=${encodeURIComponent(leadInfo.phone)}`;
                }
                return url;
            }
        }

        return BOOKING_CONFIG.calendarUrl;
    };

    return (
        <main className="relative min-h-screen bg-[#06080f] text-white">
            <Navbar />

            {/* HERO */}
            <section className="relative pt-32 pb-8 overflow-hidden blueprint-grid border-b border-white/[0.06]">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[680px] h-[320px] bg-amber-500/10 blur-[140px] pointer-events-none" />

                <div className="container px-4 mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        {prefilledFromFunnel ? (
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-bold uppercase tracking-[0.18em] mb-5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                Details Received • Pick Your Time Below
                            </div>
                        ) : (
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-[0.18em] mb-5">
                                <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
                                Direct With Damein Donald • Jackson, MS
                            </div>
                        )}

                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 leading-[0.96]">
                            {prefilledFromFunnel ? (
                                <>
                                    Lock In Your{" "}
                                    <span className="text-amber-400">15-Min Strategy Call.</span>
                                </>
                            ) : (
                                <>
                                    Book A{" "}
                                    <span className="text-amber-400">15-Min Strategy Call.</span>
                                </>
                            )}
                        </h1>
                        <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto mb-6">
                            {prefilledFromFunnel
                                ? "Your request is saved. Choose a phone call, Google Meet screen-share, or local Jackson coffee/lunch slot below."
                                : "Zero agency fluff. In 15 minutes we'll look at your Google Maps rankings, website speed, and map out the fastest path to more calls."}
                        </p>

                        {!prefilledFromFunnel && (
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                                        95+ Mobile Speed Builds
                                    </span>
                                </div>
                                <BBBSeal variant="inline" />
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Progress Indicator */}
            {!prefilledFromFunnel && (
                <section className="pt-8 pb-2 relative z-20">
                    <div className="container px-4 mx-auto">
                        <div className="max-w-md mx-auto flex items-center justify-between relative px-2">
                            <div className="absolute top-4 left-6 right-6 h-[2px] bg-white/10 -z-10" />
                            <div
                                className="absolute top-4 left-6 h-[2px] bg-amber-500 -z-10 transition-all duration-500"
                                style={{ width: step === 1 ? "0%" : "calc(100% - 3rem)" }}
                            />

                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                                        step === 1
                                            ? "bg-amber-500 text-[#06080f] scale-110"
                                            : "bg-emerald-500 text-[#06080f]"
                                    }`}
                                >
                                    {step === 2 ? <CheckCircle2 className="w-4 h-4" /> : "1"}
                                </div>
                                <span
                                    className={`text-[10px] font-mono uppercase font-bold tracking-wider ${
                                        step === 1 ? "text-amber-400" : "text-slate-400"
                                    }`}
                                >
                                    1. Your Info
                                </span>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                                        step === 2
                                            ? "bg-amber-500 text-[#06080f] scale-110"
                                            : "bg-[#12141c] border border-white/15 text-slate-400"
                                    }`}
                                >
                                    2
                                </div>
                                <span
                                    className={`text-[10px] font-mono uppercase font-bold tracking-wider ${
                                        step === 2 ? "text-amber-400" : "text-slate-400"
                                    }`}
                                >
                                    2. Pick A Time
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Main Booking Steps */}
            <section className="py-8 relative z-10 min-h-[560px]">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            {step === 1 && !prefilledFromFunnel ? (
                                <motion.div
                                    key="step1-form"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.35 }}
                                    className="p-5 sm:p-10 rounded-3xl bg-[#0b0c10] border border-white/10 shadow-2xl"
                                >
                                    <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2.5 text-white">
                                        <Sparkles className="w-5 h-5 text-amber-400" />
                                        Step 1: Tell Us Who We&apos;re Meeting With
                                    </h2>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <FormSecurityFields />
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5 text-amber-400" />{" "}
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    defaultValue={leadInfo.name}
                                                    disabled={status === "submitting"}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none transition-all text-white placeholder:text-slate-500 disabled:opacity-50"
                                                    placeholder="John Smith"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                                                    <Mail className="w-3.5 h-3.5 text-amber-400" />{" "}
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    defaultValue={leadInfo.email}
                                                    disabled={status === "submitting"}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none transition-all text-white placeholder:text-slate-500 disabled:opacity-50"
                                                    placeholder="john@yourcompany.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                                                    <Phone className="w-3.5 h-3.5 text-amber-400" />{" "}
                                                    Mobile / Best Phone *
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    defaultValue={leadInfo.phone}
                                                    disabled={status === "submitting"}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none transition-all text-white placeholder:text-slate-500 disabled:opacity-50"
                                                    placeholder="(601) 555-0199"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                                                    <Briefcase className="w-3.5 h-3.5 text-amber-400" />{" "}
                                                    Business Name (Optional)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    disabled={status === "submitting"}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none transition-all text-white placeholder:text-slate-500 disabled:opacity-50"
                                                    placeholder="Smith Roofing & Remodeling"
                                                />
                                            </div>
                                        </div>

                                        {/* Preferred Meeting Format */}
                                        <div className="space-y-2.5">
                                            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 block">
                                                Preferred Meeting Format
                                            </label>
                                            <div className="grid gap-3.5 sm:grid-cols-3">
                                                {[
                                                    {
                                                        id: "phone",
                                                        icon: Phone,
                                                        label: "Phone Call",
                                                        desc: "Direct call to your cell",
                                                    },
                                                    {
                                                        id: "meet",
                                                        icon: Video,
                                                        label: "Google Meet",
                                                        desc: "Live screen-share & audit",
                                                    },
                                                    {
                                                        id: "lunch",
                                                        icon: Coffee,
                                                        label: "Jackson Coffee / Lunch",
                                                        desc: "In-person in Jackson Metro",
                                                    },
                                                ].map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() =>
                                                            setMeetingFormat(opt.id as "phone" | "meet" | "lunch")
                                                        }
                                                        disabled={status === "submitting"}
                                                        className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                                                            meetingFormat === opt.id
                                                                ? "border-amber-500 bg-amber-500/10 text-white"
                                                                : "border-white/10 bg-[#12141c] text-slate-400 hover:border-white/20 hover:text-white"
                                                        }`}
                                                    >
                                                        <div
                                                            className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                                                                meetingFormat === opt.id
                                                                    ? "bg-amber-500 text-[#06080f]"
                                                                    : "bg-white/[0.05] text-amber-400"
                                                            }`}
                                                        >
                                                            <opt.icon className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold">
                                                                {opt.label}
                                                            </p>
                                                            <p className="text-[10px] opacity-75 mt-0.5">
                                                                {opt.desc}
                                                            </p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                            <input
                                                type="hidden"
                                                name="meeting_format"
                                                value={meetingFormat}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                                                <FileText className="w-3.5 h-3.5 text-amber-400" />{" "}
                                                What would you like to cover? *
                                            </label>
                                            <textarea
                                                rows={3}
                                                name="primary_goals"
                                                required
                                                disabled={status === "submitting"}
                                                className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none transition-all text-white placeholder:text-slate-500 resize-none disabled:opacity-50"
                                                placeholder="e.g. New contractor website, Google Maps 3-Pack rankings, PDM PinDrop + PinCam field apps..."
                                            />
                                        </div>

                                        {/* A2P 10DLC Compliant SMS Checkbox */}
                                        <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/[0.08] bg-[#12141c]">
                                            <input
                                                type="checkbox"
                                                id="sms-opt-in"
                                                name="sms_opt_in"
                                                required
                                                disabled={status === "submitting"}
                                                className="mt-1 shrink-0 rounded border-white/20 bg-transparent text-amber-500 focus:ring-amber-500"
                                            />
                                            <label
                                                htmlFor="sms-opt-in"
                                                className="text-[11px] text-slate-400 leading-relaxed"
                                            >
                                                By checking this box, you agree that you may receive
                                                appointment reminders, support, and updates via text
                                                messages (SMS) from Power Digital Media LLC. Msg &amp;
                                                data rates may apply. Msg frequency varies. Mobile
                                                information will not be shared with third
                                                parties/affiliates for marketing/promotional purposes.
                                                All the above categories exclude text messaging
                                                originator opt-in data and consent; this information
                                                will not be shared with any third parties. Unsubscribe
                                                at any time by replying STOP. Reply HELP for support.
                                                Review our{" "}
                                                <Link
                                                    href="/privacy"
                                                    className="text-amber-400 underline hover:text-amber-300"
                                                >
                                                    Privacy Policy
                                                </Link>{" "}
                                                and{" "}
                                                <Link
                                                    href="/terms"
                                                    className="text-amber-400 underline hover:text-amber-300"
                                                >
                                                    Terms &amp; Conditions
                                                </Link>
                                                .
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#06080f] font-black text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 disabled:opacity-70 transition-all shadow-[0_14px_34px_rgba(245,158,11,0.28)]"
                                        >
                                            {status === "submitting"
                                                ? "Saving Your Details..."
                                                : "Continue To Live Calendar"}
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2-calendar"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.35 }}
                                    className="space-y-6"
                                >
                                    {!prefilledFromFunnel && (
                                        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                                            <div>
                                                <p className="font-bold text-white">
                                                    Step 1 Saved • Choose Your Slot Below
                                                </p>
                                                <p className="text-xs text-slate-300 mt-0.5">
                                                    Pick any open time below to lock in your call with
                                                    Damein.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Meeting Format Selector on Step 2 when arriving from another funnel */}
                                    {prefilledFromFunnel && (
                                        <div className="grid gap-3 sm:grid-cols-3">
                                            {[
                                                {
                                                    id: "meet",
                                                    icon: Video,
                                                    label: "Google Meet",
                                                    desc: "Live screen-share & rank walkthrough",
                                                },
                                                {
                                                    id: "phone",
                                                    icon: Phone,
                                                    label: "Phone Call",
                                                    desc: "Quick call straight to your cell",
                                                },
                                                {
                                                    id: "lunch",
                                                    icon: Coffee,
                                                    label: "Jackson Coffee / Lunch",
                                                    desc: "Meet locally in Jackson Metro",
                                                },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() =>
                                                        setMeetingFormat(
                                                            opt.id as "phone" | "meet" | "lunch"
                                                        )
                                                    }
                                                    className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                                                        meetingFormat === opt.id
                                                            ? "border-amber-500 bg-[#12141c] text-white"
                                                            : "border-white/10 bg-[#0b0c10] text-slate-400 hover:text-white"
                                                    }`}
                                                >
                                                    <div
                                                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                                            meetingFormat === opt.id
                                                                ? "bg-amber-500 text-[#06080f]"
                                                                : "bg-white/[0.05] text-amber-400"
                                                        }`}
                                                    >
                                                        <opt.icon className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold">
                                                            {opt.label}
                                                        </div>
                                                        <div className="text-[10px] text-slate-400">
                                                            {opt.desc}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {!prefilledFromFunnel && (
                                        <div className="grid gap-4 sm:grid-cols-3">
                                            {[
                                                {
                                                    icon: Clock,
                                                    label: "15-Minute Focus",
                                                    desc: "Straight to the numbers—zero fluff",
                                                },
                                                {
                                                    icon: Video,
                                                    label: "Live Rank Walkthrough",
                                                    desc: "See your Google Map Pack & speed live",
                                                },
                                                {
                                                    icon: Sparkles,
                                                    label: "Custom Scope & Plan",
                                                    desc: "Tailored case-by-case to your goals",
                                                },
                                            ].map((item) => (
                                                <div
                                                    key={item.label}
                                                    className="p-5 rounded-2xl bg-[#0b0c10] border border-white/10 text-center"
                                                >
                                                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mx-auto mb-2.5">
                                                        <item.icon className="w-4 h-4" />
                                                    </div>
                                                    <p className="text-sm font-bold text-white">
                                                        {item.label}
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-0.5">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Live Calendar Embed */}
                                    <div className="rounded-3xl border border-white/10 overflow-hidden bg-[#0b0c10] shadow-2xl">
                                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#12141c]">
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-amber-300">
                                                    Live Calendar Availability
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                                                <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
                                                {getCalendarUrl().includes("calendly.com")
                                                    ? "Calendly Sync"
                                                    : "Google Calendar"}
                                            </div>
                                        </div>

                                        <div
                                            className="w-full overflow-hidden"
                                            style={{ minHeight: "680px", background: "#0b0c10" }}
                                        >
                                            <iframe
                                                src={getCalendarUrl()}
                                                className="w-full border-none"
                                                style={{
                                                    height: "680px",
                                                    filter: getCalendarUrl().includes("calendly.com")
                                                        ? "none"
                                                        : "invert(0.88) hue-rotate(180deg)",
                                                    colorScheme: getCalendarUrl().includes(
                                                        "calendly.com"
                                                    )
                                                        ? "dark"
                                                        : "light",
                                                }}
                                                title={`Book a ${BOOKING_CONFIG.title}`}
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Direct Contact Strip */}
            <section className="pb-24 relative z-10">
                <div className="container px-4 mx-auto text-center">
                    <p className="text-sm text-slate-400 mb-4">
                        Prefer to call or email Damein directly right now?
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                        <a
                            href={`tel:${BOOKING_CONFIG.phone}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0b0c10] border border-white/10 hover:border-amber-500/40 hover:text-amber-300 transition-all text-sm font-mono font-bold"
                        >
                            <Phone className="w-4 h-4 text-amber-400" />
                            {BOOKING_CONFIG.phone}
                        </a>
                        <a
                            href={`mailto:${BOOKING_CONFIG.email}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0b0c10] border border-white/10 hover:border-amber-500/40 hover:text-amber-300 transition-all text-sm font-medium"
                        >
                            <Mail className="w-4 h-4 text-amber-400" />
                            {BOOKING_CONFIG.email}
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default function BookPage() {
    return (
        <Suspense
            fallback={
                <main className="relative min-h-screen bg-[#06080f] flex items-center justify-center">
                    <Navbar />
                    <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                </main>
            }
        >
            <BookPageContent />
        </Suspense>
    );
}
