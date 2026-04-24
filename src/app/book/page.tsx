"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Phone, Mail, Clock, Sparkles, Video, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BOOKING_CONFIG } from "@/lib/booking";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

/* ─── Inner content (needs useSearchParams inside Suspense) ────── */
function BookPageContent() {
    const searchParams = useSearchParams();
    const fromDiscovery = searchParams.get("from") === "discovery";

    return (
        <main className="relative min-h-screen bg-background">
            <Navbar />

            {/* ─── Hero ─────────────────────────────────────────── */}
            <section className="relative pt-32 pb-12 overflow-hidden">
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
                                Build Request Received
                            </motion.div>
                        ) : (
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border-cyan-400/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <CalendarCheck className="w-4 h-4" />
                                Schedule a Call
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
                                ? "Your project details are locked in. Pick a time below and we\u2019ll come prepared to discuss architecture, timeline, and next steps."
                                : "Choose a time that works for you. We\u2019ll discuss your vision, answer your questions, and map out a plan to build something that dominates."
                            }
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ─── What to Expect Cards ─────────────────────────── */}
            <section className="pb-8 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid gap-4 sm:grid-cols-3 mb-10">
                            {[
                                { icon: Clock, label: `${BOOKING_CONFIG.duration} Call`, desc: "Focused and efficient \u2014 no fluff" },
                                { icon: Video, label: "Google Meet", desc: "Face-to-face via video call" },
                                { icon: Sparkles, label: "Custom Strategy", desc: "Tailored plan for your business" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="p-6 rounded-2xl glass-card border-white/10 text-center"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mx-auto mb-3">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <p className="text-sm font-bold text-white">{item.label}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Calendar Embed ───────────────────────────────── */}
            <section className="pb-16 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="rounded-3xl glass-card border-white/10 overflow-hidden"
                        >
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

                            {/* Iframe — CSS invert trick for dark‑mode appearance */}
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
                        </motion.div>
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
                            transition={{ delay: 0.7 }}
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
