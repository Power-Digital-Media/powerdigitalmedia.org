"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Founders100Standalone from "@/components/ui/billing/Founders100Standalone";
import { Sparkles } from "lucide-react";

export default function Founders100Page() {
    return (
        <main className="relative min-h-screen bg-background text-white overflow-hidden">
            <Navbar />

            {/* Glowing background shapes */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-orange-500/5 blur-[150px] pointer-events-none -z-10 rounded-full" />

            <section className="relative pt-36 pb-24 md:pt-44">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            EXCLUSIVE INITIATIVE
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl font-black tracking-tight md:text-6xl mb-6 uppercase"
                        >
                            Founder&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500">100</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed"
                        >
                            Mississippi&apos;s High-Authority Web Build Campaign. Lock in your Growth Build deliverables at a one-time 50% discount. Permanent codebase ownership, zero licensing lock-in.
                        </motion.p>
                    </div>

                    <Founders100Standalone />
                </div>
            </section>

            <Footer />
        </main>
    );
}
