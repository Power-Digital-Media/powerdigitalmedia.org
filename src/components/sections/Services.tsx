"use client";

import { motion } from "framer-motion";
import { Mic2, Film, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
    return (
        <div id="services">
            {/* Section 1: The Studio */}
            <section className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col justify-center pt-12 pb-16 md:pt-40 md:pb-24">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop"
                        alt="Professional Podcasting Studio"
                        fill
                        className="object-cover opacity-30 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
                </div>

                <div className="container relative z-10 px-6 mx-auto">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block">The Core</span>
                            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight uppercase leading-none">The Studio.</h2>
                            <p className="text-base md:text-xl text-foreground/70 mb-8 max-w-md leading-relaxed text-balance font-light">
                                Complete studio-grade podcasting. From show concept and branding to full RØDECaster-powered production in JACKSON, MS.
                            </p>
                            <ul className="space-y-4 mb-10">
                                {["Show Naming & Format Strategy", "Broadcast-Quality Audio Chain", "Editing & Mastering"].map((f) => (
                                    <li key={f} className="flex items-center gap-3 text-sm md:text-lg font-medium text-white/50">
                                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/podcasting" className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 rounded-full hover:bg-white/5 transition-all font-bold uppercase tracking-widest text-[10px] active:scale-95">
                                Explore Production <ArrowRight className="w-3 h-3" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 2: The Reach */}
            <section className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col justify-center pt-12 pb-16 md:pt-40 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                        alt="Content Distribution"
                        fill
                        className="object-cover opacity-20 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-background via-background/70 to-transparent" />
                </div>

                <div className="container relative z-10 px-6 mx-auto">
                    <div className="flex md:justify-end">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-xl md:text-right flex flex-col md:items-end"
                        >
                            <span className="text-blue-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block">The Velocity</span>
                            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight uppercase leading-none">The Reach.</h2>
                            <p className="text-base md:text-xl text-foreground/70 mb-8 max-w-md leading-relaxed text-balance font-light">
                                Turn one session into weeks of high-impact content. Cinematic 4K recording and viral-ready social media distribution.
                            </p>
                            <ul className="space-y-4 mb-10 flex flex-col md:items-end">
                                {["BMPCC 4K Multi-Cam Setups", "Shorts, Reels & TikTok Edits", "Content Distribution Systems"].map((f) => (
                                    <li key={f} className="flex items-center md:flex-row-reverse gap-3 text-sm md:text-lg font-medium text-white/50">
                                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/our-work" className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 rounded-full hover:bg-white/5 transition-all font-bold uppercase tracking-widest text-[10px] active:scale-95">
                                View Showreel <ArrowRight className="w-3 h-3" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 3: The System -> Ecosystem Bridge */}
            <section className="relative min-h-[70vh] flex items-center pt-28 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                        alt="Digital Systems"
                        fill
                        className="object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    {/* Ecosystem Bridge Grid */}
                    <div className="absolute inset-0 cyber-grid opacity-10" />
                </div>

                <div className="container relative z-10 px-6 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block">Core Protocol</span>
                        <h2 className="text-4xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-none">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-glow-cyan">System.</span>
                        </h2>
                        <p className="text-lg md:text-3xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light text-balance">
                            We deploy high-velocity <span className="text-cyan-400 font-medium tracking-tight">Growth Architecture</span>. High-performance digital systems that turn studio-grade media into engineered dominance.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            <Link href="https://powerdigitalgrowth.org" target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-cyan-400 text-slate-950 font-black rounded-full shadow-[0_0_40px_rgba(34,211,238,0.2)] hover:scale-105 transition-all uppercase tracking-widest text-[10px] active:scale-95">
                                Initialize Protocol
                            </Link>
                            <Link href="/contact" className="px-10 py-5 border border-white/10 rounded-full hover:bg-white/5 transition-all font-bold uppercase tracking-widest text-[10px] active:scale-95">
                                Get A Consultation
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
