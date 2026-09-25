"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Flag, Mail, Phone, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function PaymentSuccessPage() {
    return (
        <main className="relative min-h-screen bg-background">
            <Navbar />

            {/* ─── Ambient glow ──────────────────────────────────── */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none -z-10" />

            <section className="pt-32 pb-24">
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl mx-auto"
                    >
                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 0.2,
                            }}
                            className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-8"
                        >
                            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                        </motion.div>

                        <h1 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">
                            Payment{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                                Confirmed!
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10">
                            Thank you for your order. Your custom flag print job is now
                            being submitted for production.
                        </p>

                        {/* Order Summary Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="rounded-2xl glass-card border-white/10 p-8 text-left mb-8"
                        >
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4 flex items-center gap-2">
                                <Flag className="w-4 h-4 text-cyan-400" />
                                Order Summary
                            </h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-white/60">Project</span>
                                    <span className="font-medium text-white">
                                        Yazoo City Complex — 75 Year Anniversary
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/60">Item</span>
                                    <span className="font-medium text-white">
                                        3 × Custom 3&apos; × 5&apos; Fabric Flags
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-white/5 pt-3">
                                    <span className="text-white/60 font-bold">Total Paid</span>
                                    <span className="font-bold text-emerald-400">$300.00</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* What Happens Next */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="rounded-2xl glass-card border-white/10 p-8 text-left mb-10"
                        >
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">
                                What Happens Next
                            </h2>
                            <div className="space-y-4">
                                {[
                                    "You'll receive a confirmation email from Stripe with your receipt.",
                                    "Power Digital Media will submit your approved design to the print vendor.",
                                    "Your flags will be produced and shipped directly to you.",
                                    "We'll send tracking information once the order ships.",
                                ].map((step, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-[11px] font-bold mt-0.5">
                                            {i + 1}
                                        </div>
                                        <p className="text-sm text-white/80 leading-relaxed">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Contact */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="space-y-4"
                        >
                            <p className="text-sm text-muted-foreground">
                                Questions? Reach out anytime.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="tel:601-446-2393"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card border-white/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-all text-sm font-medium"
                                >
                                    <Phone className="w-4 h-4" />
                                    601-446-2393
                                </a>
                                <a
                                    href="mailto:info@powerdigitalmedia.org"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card border-white/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-all text-sm font-medium"
                                >
                                    <Mail className="w-4 h-4" />
                                    info@powerdigitalmedia.org
                                </a>
                            </div>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors mt-4"
                            >
                                Back to Power Digital Media
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
