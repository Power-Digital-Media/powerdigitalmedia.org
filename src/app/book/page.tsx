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
    MessageSquare,
    Coffee,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";
import { BOOKING_CONFIG } from "@/lib/booking";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const BBBSeal = dynamic(() => import("@/components/ui/BBBSeal"));

const BOOKING_TOPICS = [
    "New 0.8s Website",
    "Google Map Pack SEO",
    "Capsule CRM / Custom App",
    "PinDrop™ + PinCam™",
    "0%-Fee Square Ordering",
    "Meta Lead Ads",
] as const;

export default function BookPage() {
    const [prefilledFromFunnel, setPrefilledFromFunnel] = useState(false);
    const [step, setStep] = useState<1 | 2>(1);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [meetingFormat, setMeetingFormat] = useState<"phone" | "meet" | "lunch">("meet");
    const [selectedTopics, setSelectedTopics] = useState<string[]>([
        "New 0.8s Website",
        "Google Map Pack SEO",
    ]);
    const [leadInfo, setLeadInfo] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        const sp = new URLSearchParams(window.location.search);
        const fromParam = sp.get("from");
        if (fromParam) {
            setPrefilledFromFunnel(true);
            setStep(2);
        }
        const qName = sp.get("name");
        const qEmail = sp.get("email");
        const qPhone = sp.get("phone");
        if (qName || qEmail || qPhone) {
            setLeadInfo((prev) => ({
                name: qName || prev.name,
                email: qEmail || prev.email,
                phone: qPhone || prev.phone,
            }));
        }
    }, []);

    const toggleTopic = (topic: string) => {
        setSelectedTopics((prev) => {
            if (prev.includes(topic)) {
                return prev.length > 1 ? prev.filter((t) => t !== topic) : prev;
            }
            return [...prev, topic];
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        const form = e.currentTarget;
        const data = new FormData(form);
        data.append("_form_source", "g-business-booking");

        const nameVal = data.get("name")?.toString() || "";
        const emailVal = data.get("email")?.toString() || "";
        const phoneVal = data.get("phone")?.toString() || "";
        const extraNote = data.get("optional_note")?.toString().trim() || "";
        const topicSummary = selectedTopics.join(", ");

        data.set("services", topicSummary);
        data.set(
            "primary_goals",
            extraNote ? `${topicSummary} — ${extraNote}` : topicSummary
        );
        data.set(
            "notes",
            `15-Min Strategy Call (${meetingFormat.toUpperCase()}) | Topics: ${topicSummary}${
                extraNote ? ` | Note: ${extraNote}` : ""
            }`
        );

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

    const smsShortcutHref = `sms:6014462393?body=${encodeURIComponent(
        `Hi Damein, I'd like to schedule a quick 15-min call about ${selectedTopics.join(
            " + "
        )}. What times look good?`
    )}`;

    return (
        <main className="relative min-h-screen bg-[#06080f] text-white">
            <Navbar />

            {/* HERO */}
            <section className="relative pt-[114px] pb-5 sm:pt-32 sm:pb-8 overflow-hidden blueprint-grid border-b border-white/[0.06]">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[680px] h-[320px] bg-amber-500/10 blur-[140px] pointer-events-none" />

                <div className="container px-4 mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        {prefilledFromFunnel ? (
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.15em] sm:tracking-[0.18em] mb-3 sm:mb-5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>Details Received • Pick Your Time</span>
                            </div>
                        ) : (
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.15em] sm:tracking-[0.18em] mb-3 sm:mb-5">
                                <CalendarCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span className="sm:hidden">Direct With Damein • Jackson, MS</span>
                                <span className="hidden sm:inline">Direct With Damein Donald • Jackson, MS</span>
                            </div>
                        )}

                        <h1 className="text-[1.82rem] md:text-6xl font-black uppercase tracking-tight mb-2.5 sm:mb-4 leading-[1.02] md:leading-[0.96]">
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
                        <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto mb-3.5 sm:mb-6 leading-snug sm:leading-relaxed">
                            {prefilledFromFunnel
                                ? "Your request is saved. Choose a phone call, Google Meet screen-share, or local Jackson coffee/lunch slot below."
                                : "Takes 10 seconds to unlock Damein's live calendar—we'll inspect your Google Map Pack rankings, site speed, and fastest path to more calls."}
                        </p>

                        {!prefilledFromFunnel && (
                            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                                <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                                    <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                                        98+ Speed Builds
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
                                    1. Quick Info (10s)
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
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                                        <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2.5 text-white">
                                            <Sparkles className="w-5 h-5 text-amber-400" />
                                            Step 1: Unlock Live Calendar Availability
                                        </h2>
                                        <span className="text-[11px] font-mono font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                                            Takes ~10 Seconds
                                        </span>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <FormSecurityFields />

                                        {/* 1-Tap Topic Pills (replaces mandatory essay wall) */}
                                        <div className="space-y-2.5">
                                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 block">
                                                What should we focus on? (Tap 1 or more)
                                            </span>
                                            <div
                                                className="flex flex-wrap gap-2"
                                                role="group"
                                                aria-label="Topics to discuss on your strategy call"
                                            >
                                                {BOOKING_TOPICS.map((topic) => {
                                                    const active = selectedTopics.includes(topic);
                                                    return (
                                                        <button
                                                            key={topic}
                                                            type="button"
                                                            onClick={() => toggleTopic(topic)}
                                                            aria-pressed={active}
                                                            disabled={status === "submitting"}
                                                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                                                                active
                                                                    ? "bg-amber-400 text-[#06080f] border-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.28)]"
                                                                    : "bg-[#12141c] text-slate-300 border-white/10 hover:border-amber-400/50 hover:text-white"
                                                            }`}
                                                        >
                                                            {active ? `✓ ${topic}` : topic}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Preferred Meeting Format */}
                                        <div className="space-y-2.5">
                                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 block">
                                                How would you like to meet?
                                            </span>
                                            <div
                                                className="grid grid-cols-3 gap-2 sm:gap-3.5"
                                                role="group"
                                                aria-label="Preferred meeting format"
                                            >
                                                {[
                                                    {
                                                        id: "meet",
                                                        icon: Video,
                                                        label: "Google Meet",
                                                        shortLabel: "Video Meet",
                                                        desc: "Live screen-share & audit",
                                                    },
                                                    {
                                                        id: "phone",
                                                        icon: Phone,
                                                        label: "Phone Call",
                                                        shortLabel: "Phone Call",
                                                        desc: "Direct call to your cell",
                                                    },
                                                    {
                                                        id: "lunch",
                                                        icon: Coffee,
                                                        label: "Jackson Coffee / Lunch",
                                                        shortLabel: "In-Person",
                                                        desc: "In-person in Jackson Metro",
                                                    },
                                                ].map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        aria-pressed={meetingFormat === opt.id}
                                                        onClick={() =>
                                                            setMeetingFormat(opt.id as "phone" | "meet" | "lunch")
                                                        }
                                                        disabled={status === "submitting"}
                                                        className={`p-2.5 sm:p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                                                            meetingFormat === opt.id
                                                                ? "border-amber-500 bg-amber-500/10 text-white"
                                                                : "border-white/10 bg-[#12141c] text-slate-400 hover:border-white/20 hover:text-white"
                                                        }`}
                                                    >
                                                        <div
                                                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center ${
                                                                meetingFormat === opt.id
                                                                    ? "bg-amber-500 text-[#06080f]"
                                                                    : "bg-white/[0.05] text-amber-400"
                                                            }`}
                                                        >
                                                            <opt.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[11px] sm:text-xs font-bold leading-tight">
                                                                <span className="sm:hidden">{opt.shortLabel}</span>
                                                                <span className="hidden sm:inline">{opt.label}</span>
                                                            </p>
                                                            <p className="hidden sm:block text-[10px] opacity-75 mt-0.5">
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

                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="book-name"
                                                    className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5"
                                                >
                                                    <User className="w-3.5 h-3.5 text-amber-400" />{" "}
                                                    Your Name *
                                                </label>
                                                <input
                                                    id="book-name"
                                                    type="text"
                                                    name="name"
                                                    required
                                                    autoComplete="name"
                                                    defaultValue={leadInfo.name}
                                                    disabled={status === "submitting"}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none transition-all text-white placeholder:text-slate-500 disabled:opacity-50"
                                                    placeholder="John Smith"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="book-email"
                                                    className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5"
                                                >
                                                    <Mail className="w-3.5 h-3.5 text-amber-400" />{" "}
                                                    Best Email *
                                                </label>
                                                <input
                                                    id="book-email"
                                                    type="email"
                                                    name="email"
                                                    required
                                                    autoComplete="email"
                                                    defaultValue={leadInfo.email}
                                                    disabled={status === "submitting"}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none transition-all text-white placeholder:text-slate-500 disabled:opacity-50"
                                                    placeholder="john@yourcompany.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="book-phone"
                                                    className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5"
                                                >
                                                    <Phone className="w-3.5 h-3.5 text-amber-400" />{" "}
                                                    {meetingFormat === "phone"
                                                        ? "Cell / Best Phone *"
                                                        : "Cell Phone (Optional — for text reminder)"}
                                                </label>
                                                <input
                                                    id="book-phone"
                                                    type="tel"
                                                    name="phone"
                                                    required={meetingFormat === "phone"}
                                                    autoComplete="tel"
                                                    defaultValue={leadInfo.phone}
                                                    disabled={status === "submitting"}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none transition-all text-white placeholder:text-slate-500 disabled:opacity-50"
                                                    placeholder="(601) 555-0199"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="book-company"
                                                    className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5"
                                                >
                                                    <Briefcase className="w-3.5 h-3.5 text-amber-400" />{" "}
                                                    Business or Website (Optional)
                                                </label>
                                                <input
                                                    id="book-company"
                                                    type="text"
                                                    name="company"
                                                    disabled={status === "submitting"}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none transition-all text-white placeholder:text-slate-500 disabled:opacity-50"
                                                    placeholder="e.g. Smith Roofing or smithroofing.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label
                                                htmlFor="book-optional-note"
                                                className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block"
                                            >
                                                Anything specific we should pull up beforehand? (Optional)
                                            </label>
                                            <input
                                                id="book-optional-note"
                                                type="text"
                                                name="optional_note"
                                                disabled={status === "submitting"}
                                                className="w-full px-4 py-3 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none transition-all text-sm text-white placeholder:text-slate-500 disabled:opacity-50"
                                                placeholder="Optional — e.g. want more Brandon / Madison roofing calls"
                                            />
                                        </div>

                                        {/* Optional A2P 10DLC Compliant SMS Checkbox */}
                                        <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-white/[0.08] bg-[#12141c]">
                                            <input
                                                type="checkbox"
                                                id="sms-opt-in"
                                                name="sms_opt_in"
                                                disabled={status === "submitting"}
                                                className="mt-1 shrink-0 rounded border-white/20 bg-transparent text-amber-500 focus:ring-amber-500"
                                            />
                                            <label
                                                htmlFor="sms-opt-in"
                                                className="text-[11px] text-slate-400 leading-relaxed"
                                            >
                                                <strong className="text-slate-300">Optional SMS Reminder:</strong>{" "}
                                                Check if you&apos;d like appointment reminders &amp; support updates via text (SMS) from Power Digital Media LLC. Msg &amp; data rates may apply; msg frequency varies. Mobile opt-in data is never shared with third parties. Reply STOP anytime or HELP for support.{" "}
                                                <Link
                                                    href="/privacy"
                                                    className="text-amber-400 underline hover:text-amber-300"
                                                >
                                                    Privacy Policy
                                                </Link>{" "}
                                                &amp;{" "}
                                                <Link
                                                    href="/terms"
                                                    className="text-amber-400 underline hover:text-amber-300"
                                                >
                                                    Terms
                                                </Link>
                                                .
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#06080f] font-black text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 disabled:opacity-70 transition-all shadow-[0_14px_34px_rgba(245,158,11,0.28)] cursor-pointer"
                                        >
                                            {status === "submitting"
                                                ? "Opening Live Calendar..."
                                                : "See Open Times On Live Calendar"}
                                            <ArrowRight className="w-4 h-4" />
                                        </button>

                                        <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                                            <span>Rather skip the calendar and talk right now?</span>
                                            <div className="flex items-center gap-4 font-bold">
                                                <a
                                                    href={smsShortcutHref}
                                                    className="text-emerald-300 hover:text-emerald-200 inline-flex items-center gap-1.5"
                                                >
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                    <span>Text Damein</span>
                                                </a>
                                                <a
                                                    href="tel:6014462393"
                                                    className="text-amber-300 hover:text-amber-200 inline-flex items-center gap-1.5"
                                                >
                                                    <Phone className="w-3.5 h-3.5" />
                                                    <span>(601) 446-2393</span>
                                                </a>
                                            </div>
                                        </div>
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
                                                    aria-pressed={meetingFormat === opt.id}
                                                    onClick={() =>
                                                        setMeetingFormat(
                                                            opt.id as "phone" | "meet" | "lunch"
                                                        )
                                                    }
                                                    className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
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

            {/* Direct Contact Strip (Desktop Only — Step 1 footer & sticky bar already provide 1-tap Call/Text on mobile) */}
            <section className="hidden lg:block pb-24 relative z-10">
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
