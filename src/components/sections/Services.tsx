"use client";

import { motion } from "framer-motion";
import { Film, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";

export default function Services() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <div id="services">
            {/* Section 1: The Studio */}
            <section className="relative flex flex-col justify-start pt-16 pb-12 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1600&auto=format&fit=crop"
                        alt="Professional Podcasting Studio"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top opacity-40 scale-110 md:scale-100 transition-transform duration-[20s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/40" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
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
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="w-full sm:w-auto px-8 py-4 bg-cyan-400 text-slate-950 font-black rounded-full hover:bg-white transition-all uppercase tracking-widest text-[10px] active:scale-95 text-center"
                                >
                                    Start My Show
                                </button>
                                <Link href="/our-work" className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border border-white/10 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all group active:scale-95">
                                    Watch Showreel <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section: The Capture (On-Location) */}
            <section className="relative flex flex-col justify-start pt-8 pb-12 md:pt-40 md:pb-32 overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1512418490979-92798ccc13a0?q=80&w=2070&auto=format&fit=crop"
                        alt="On-Location Cinematography"
                        fill
                        className="object-cover object-center opacity-25 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/40" />
                </div>

                <div className="container relative z-10 px-6 mx-auto">
                    <div className="grid md:grid-cols-2 items-center gap-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1 relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10"
                        >
                            <Image
                                src="/images/captures/live-event-gimbal.webp"
                                alt="Event Production"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-accent/20 mix-blend-overlay" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="order-1 md:order-2"
                        >
                            <span className="text-blue-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block">Field Acquisition</span>
                            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight uppercase leading-none">The Capture.</h2>
                            <p className="text-base md:text-xl text-foreground/70 mb-8 max-w-md leading-relaxed font-light">
                                We go where you are. Cinematic event coverage, brand documentaries, and high-fidelity live streaming from any location.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                {["Footage Mastery", "YouTube Ready Edits", "Viral Social Snippets", "Live Event Streams"].map((f) => (
                                    <div key={f} className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-white/40">
                                        <CheckCircle2 className="w-3 h-3 text-blue-400" />
                                        {f}
                                    </div>
                                ))}
                            </div>
                            <Link href="/production" className="inline-flex items-center gap-4 px-10 py-5 bg-white text-slate-950 font-black rounded-full hover:bg-blue-400 hover:text-white transition-all uppercase tracking-widest text-[10px]">
                                Explore Production Tiers <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="relative flex flex-col justify-start pt-8 pb-12 md:pt-40 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                        alt="Content Distribution"
                        fill
                        className="object-cover object-right-top md:object-center opacity-30 scale-[1.3] md:scale-110 -translate-y-[10%] md:translate-y-0 transition-transform duration-[20s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40" />
                    <div className="absolute inset-0 bg-gradient-to-l from-background via-background/40 to-transparent" />
                </div>

                <div className="container relative z-10 px-2 md:px-6 mx-auto">
                    <div className="flex justify-end">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-xl text-right flex flex-col items-end"
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
            <section id="portfolio" className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center pt-12 pb-0 md:pt-16 md:pb-0 overflow-hidden bg-background">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop"
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
                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="px-10 py-5 border border-white/10 rounded-full hover:bg-white/5 transition-all font-bold uppercase tracking-widest text-[10px] active:scale-95"
                            >
                                Get A Consultation
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </div>
    );
}
