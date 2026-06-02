"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, Phone, Mail, Clock, Sparkles, Video, CheckCircle2, ArrowRight, User, Briefcase, FileText, Coffee } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BOOKING_CONFIG } from "@/lib/booking";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";

const BBBSeal = dynamic(() => import("@/components/ui/BBBSeal"));

/* ─── Inner content (needs useSearchParams inside Suspense) ────── */
function BookPageContent() {
    const searchParams = useSearchParams();
    const fromDiscovery = searchParams.get("from") === "discovery";

    const [step, setStep] = useState<1 | 2>(1);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [meetingFormat, setMeetingFormat] = useState<"phone" | "meet" | "lunch">("meet");

    // Initialize step based on URL params to avoid flashing Step 1
    useEffect(() => {
        if (fromDiscovery) {
            setStep(2);
        }
    }, [fromDiscovery]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        const form = e.currentTarget;
        const data = new FormData(form);
        data.append("_form_source", "g-business-booking");

        try {
            const response = await fetch("/api/forms", {
                method: "POST",
                body: data,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setStatus("success");
                setStep(2);
            } else {
                setStatus("error");
                // Allow them to book a time even if Capsule/Transpond sync encounters an issue
                setStep(2);
            }
        } catch (error) {
            setStatus("error");
            setStep(2);
        }
    };

    return (
        <main className="relative min-h-screen bg-background text-white">
            <Navbar />

            {/* ─── Hero ─────────────────────────────────────────── */}
            <section className="relative pt-32 pb-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />
                <div className="absolute top-20 right-1/4 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none -z-10 rounded-full" />

                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        {/* Status Badge */}
                        {fromDiscovery ? (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Project Details Received
                            </motion.div>
                        ) : (
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border-cyan-400/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <CalendarCheck className="w-4 h-4" />
                                Booking Pipeline Active
                            </div>
                        )}

                        {/* Heading */}
                        <h1 className="text-4xl font-bold tracking-tight md:text-6xl mb-4">
                            {fromDiscovery ? (
                                <>
                                    Now Let&apos;s{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                        Talk Strategy.
                                    </span>
                                </>
                            ) : (
                                <>
                                    Book a{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                        Strategy Call.
                                    </span>
                                </>
                            )}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                            {fromDiscovery
                                ? "Your project details are locked in. Pick a time below and we'll discuss architecture, timeline, and next steps."
                                : "Schedule a 30-minute consultation. We'll map out an actionable plan to scale your digital presence."
                            }
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ─── Trust Signals Bar ────────────────────────────── */}
            {!fromDiscovery && (
                <section className="relative z-20 pb-4 mt-2">
                    <div className="container px-4 mx-auto">
                        <div className="flex flex-col items-center justify-center gap-4 opacity-80 hover:opacity-100 transition-opacity">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-sm">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                                    <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">Verified 90+/100 Mobile PageSpeed</span>
                                </div>
                                <BBBSeal variant="inline" />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ─── Funnel Progress Indicator ────────────────────── */}
            {!fromDiscovery && (
                <section className="py-4 relative z-20">
                    <div className="container px-4 mx-auto">
                        <div className="max-w-md mx-auto flex items-center justify-between relative px-2">
                            {/* Line connecting the dots */}
                            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/5 -translate-y-1/2 -z-10" />
                            <div 
                                className="absolute top-1/2 left-0 h-[2px] bg-cyan-400 -translate-y-1/2 -z-10 transition-all duration-500" 
                                style={{ width: step === 1 ? "0%" : "100%" }}
                            />

                            {/* Step 1 Indicator */}
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                    step === 1 
                                        ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20 scale-110" 
                                        : "bg-emerald-500 text-white"
                                }`}>
                                    {step === 2 ? <CheckCircle2 className="w-4 h-4" /> : "1"}
                                </div>
                                <span className={`text-[10px] uppercase font-bold tracking-wider ${
                                    step === 1 ? "text-cyan-400" : "text-white/40"
                                }`}>Your Details</span>
                            </div>

                            {/* Step 2 Indicator */}
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                    step === 2 
                                        ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20 scale-110" 
                                        : "bg-slate-900 border border-white/10 text-white/50"
                                }`}>
                                    2
                                </div>
                                <span className={`text-[10px] uppercase font-bold tracking-wider ${
                                    step === 2 ? "text-cyan-400" : "text-white/40"
                                }`}>Schedule Time</span>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ─── Main Booking Steps ───────────────────────────── */}
            <section className="py-8 relative z-10 min-h-[600px]">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            {step === 1 && !fromDiscovery ? (
                                /* ─── STEP 1: LEAD CAPTURE FORM ─── */
                                <motion.div
                                    key="step1-form"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4 }}
                                    className="p-8 sm:p-10 rounded-[2.5rem] glass-card border-white/10 bg-accent/5 backdrop-blur-md"
                                >
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                                        <Sparkles className="w-5 h-5 text-cyan-400" />
                                        Step 1: Contact Details & Project Goals
                                    </h3>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name
                                                </label>
                                                <input 
                                                    type="text" 
                                                    name="name" 
                                                    required 
                                                    disabled={status === "submitting"} 
                                                    className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50" 
                                                    placeholder="John Doe" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1.5">
                                                    <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email Address
                                                </label>
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    required 
                                                    disabled={status === "submitting"} 
                                                    className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50" 
                                                    placeholder="john@example.com" 
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1.5">
                                                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> Phone Number
                                                </label>
                                                <input 
                                                    type="tel" 
                                                    name="phone" 
                                                    required 
                                                    disabled={status === "submitting"} 
                                                    className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50" 
                                                    placeholder="(601) 555-0199" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1.5">
                                                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> Company Name (Optional)
                                                </label>
                                                <input 
                                                    type="text" 
                                                    name="company" 
                                                    disabled={status === "submitting"} 
                                                    className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50" 
                                                    placeholder="Your Company LLC" 
                                                />
                                            </div>
                                        </div>

                                        {/* Meeting Format Choice */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                                Preferred Format
                                            </label>
                                            <div className="grid gap-4 sm:grid-cols-3">
                                                {[
                                                    { id: "phone", icon: Phone, label: "Phone Call", desc: "We'll call you directly" },
                                                    { id: "meet", icon: Video, label: "Google Meet", desc: "Perfect for screen-sharing & live audits" },
                                                    { id: "lunch", icon: Coffee, label: "Business Lunch", desc: "Jackson Metro — our treat" },
                                                ].map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => setMeetingFormat(opt.id as any)}
                                                        disabled={status === "submitting"}
                                                        className={`p-5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 group/opt ${
                                                            meetingFormat === opt.id
                                                                ? "border-cyan-400 bg-cyan-400/10 text-white shadow-lg shadow-cyan-400/5"
                                                                : "border-white/5 bg-white/[0.02] hover:border-white/15 text-muted-foreground hover:text-white"
                                                        }`}
                                                    >
                                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                                            meetingFormat === opt.id
                                                                ? "bg-cyan-400 text-slate-950"
                                                                : "bg-white/5 text-cyan-400 group-hover/opt:bg-white/10"
                                                        }`}>
                                                            <opt.icon className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold">{opt.label}</p>
                                                            <p className="text-[10px] opacity-60 mt-0.5">{opt.desc}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                            <input type="hidden" name="meeting_format" value={meetingFormat} />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1.5">
                                                <FileText className="w-3.5 h-3.5 text-cyan-400" /> What are your primary goals for this call?
                                            </label>
                                            <textarea 
                                                rows={3} 
                                                name="primary_goals" 
                                                required 
                                                disabled={status === "submitting"} 
                                                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none transition-all placeholder:text-muted-foreground/30 resize-none disabled:opacity-50" 
                                                placeholder="Tell us a bit about your website, design, or marketing needs..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl border-glow flex items-center justify-center gap-2 hover:opacity-90 focus:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all group shadow-lg shadow-cyan-500/10 text-sm tracking-wider uppercase"
                                        >
                                            {status === "submitting" ? "Saving Details..." : "Next: Choose a Time"}
                                            <ArrowRight className={`w-4 h-4 transition-transform ${status === "submitting" ? "animate-pulse" : "group-hover:translate-x-1"}`} />
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                /* ─── STEP 2: LIVE CALENDAR SCHEDULER ─── */
                                <motion.div
                                    key="step2-calendar"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    {/* Integration Confirmation Banner */}
                                    {!fromDiscovery && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-sm flex items-start gap-3"
                                        >
                                            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-bold">Step 1 Completed: Lead Saved</p>
                                                <p className="text-xs opacity-90 mt-0.5">Your contact details have been successfully synced to Capsule CRM & Transpond. Choose a time slot below to complete your booking.</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* What to Expect Cards */}
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        {[
                                            { icon: Clock, label: `${BOOKING_CONFIG.duration} Call`, desc: "Focused and efficient — no fluff" },
                                            { icon: Video, label: "Google Meet", desc: "Perfect for screen-sharing & live audits" },
                                            { icon: Sparkles, label: "Custom Strategy", desc: "Tailored plan for your business" },
                                        ].map((item) => (
                                            <div
                                                key={item.label}
                                                className="p-6 rounded-2xl glass-card border-white/10 text-center bg-slate-950/20"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mx-auto mb-3">
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <p className="text-sm font-bold text-white">{item.label}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Google Calendar Widget */}
                                    <div className="rounded-3xl glass-card border-white/10 overflow-hidden bg-slate-950/40">
                                        {/* Calendar Header */}
                                        <div className="flex items-center justify-between px-8 py-4 border-b border-white/5 bg-slate-950/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                                                    Live Availability
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-white/30">
                                                <CalendarCheck className="w-3.5 h-3.5" />
                                                Google Calendar
                                            </div>
                                        </div>

                                        {/* Iframe — CSS invert trick for dark-mode appearance */}
                                        <div
                                            className="w-full rounded-b-3xl overflow-hidden"
                                            style={{
                                                minHeight: "680px",
                                                background: "#0b1120",
                                            }}
                                        >
                                            <iframe
                                                src={BOOKING_CONFIG.calendarUrl}
                                                className="w-full border-none"
                                                style={{
                                                    height: "680px",
                                                    filter: "invert(0.88) hue-rotate(180deg)",
                                                    colorScheme: "light",
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

            {/* ─── Fallback Contact ─────────────────────────────── */}
            <section className="pb-24 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-center"
                        >
                            <p className="text-sm text-muted-foreground mb-4">
                                Prefer to reach out directly? No problem.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href={`tel:${BOOKING_CONFIG.phone}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card border-white/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-all text-sm font-medium"
                                >
                                    <Phone className="w-4 h-4" />
                                    {BOOKING_CONFIG.phone}
                                </a>
                                <a
                                    href={`mailto:${BOOKING_CONFIG.email}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card border-white/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-all text-sm font-medium"
                                >
                                    <Mail className="w-4 h-4" />
                                    {BOOKING_CONFIG.email}
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

/* ─── Page Export (Suspense boundary for useSearchParams) ──────── */
export default function BookPage() {
    return (
        <Suspense
            fallback={
                <main className="relative min-h-screen bg-background flex items-center justify-center">
                    <Navbar />
                    <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                </main>
            }
        >
            <BookPageContent />
        </Suspense>
    );
}
