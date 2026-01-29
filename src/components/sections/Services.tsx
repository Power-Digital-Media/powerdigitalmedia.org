"use client";

import { motion } from "framer-motion";
import { Mic2, Film, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
    return (
        <div id="services">
            {/* Section 1: The Studio */}
            <section className="viewport-section relative">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop"
                        alt="Professional Podcasting Studio"
                        fill
                        className="object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
                </div>

                <div className="container relative z-10 px-4 mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block">The Core</span>
                        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">The Studio.</h2>
                        <p className="text-xl text-foreground/80 mb-8 max-w-lg leading-relaxed">
                            Complete studio-grade podcasting. From show concept and branding to full RØDECaster-powered production in JACKSON, MS.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {["Show Naming & Format Strategy", "Broadcast-Quality Audio Chain", "Editing & Mastering"].map((f) => (
                                <li key={f} className="flex items-center gap-3 text-lg font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <Link href="/podcasting" className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all font-bold">
                            Explore Production <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Section 2: The Reach */}
            <section className="viewport-section relative">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                        alt="Content Distribution"
                        fill
                        className="object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-background via-background/60 to-transparent" />
                </div>

                <div className="container relative z-10 px-4 mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1" />
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="order-1 md:order-2 text-right flex flex-col items-end"
                    >
                        <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block">The Velocity</span>
                        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">The Reach.</h2>
                        <p className="text-xl text-foreground/80 mb-8 max-w-lg leading-relaxed">
                            Turn one session into weeks of high-impact content. Cinematic 4K recording and viral-ready social media distribution.
                        </p>
                        <ul className="space-y-4 mb-10 flex flex-col items-end">
                            {["BMPCC 4K Multi-Cam Setups", "Shorts, Reels & TikTok Edits", "Content Distribution Systems"].map((f) => (
                                <li key={f} className="flex items-center gap-3 text-lg font-medium">
                                    {f}
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                </li>
                            ))}
                        </ul>
                        <Link href="/our-work" className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all font-bold">
                            View Showreel <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Section 3: The System -> Ecosystem Bridge */}
            <section className="viewport-section relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                        alt="Digital Systems"
                        fill
                        className="object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    {/* Ecosystem Bridge Grid */}
                    <div className="absolute inset-0 cyber-grid opacity-20" />
                </div>

                <div className="container relative z-10 px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Core Protocol</span>
                        <h2 className="text-5xl md:text-8xl font-bold mb-10 tracking-tight">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">System.</span></h2>
                        <p className="text-2xl text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                            We deploy high-velocity <span className="text-cyan-400 font-medium">Growth Architecture</span>. High-performance digital systems that turn studio-grade media into engineered dominance.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href="https://powerdigitalgrowth.org" target="_blank" rel="noopener noreferrer" className="px-12 py-5 bg-cyan-500 text-slate-950 font-black rounded-full shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:scale-105 transition-all uppercase tracking-widest text-sm">
                                Initialize Protocol
                            </Link>
                            <Link href="/contact" className="px-12 py-5 border border-white/20 rounded-full hover:bg-white/10 transition-all font-bold">
                                Get A Consultation
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
