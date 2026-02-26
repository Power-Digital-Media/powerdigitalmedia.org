"use client";

import { m } from "framer-motion";
import { Film, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";
import DashboardProof from "@/components/ui/DashboardProof";

export default function Services() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <div id="services">
            {/* Section: The Reach (Dashboard Proof) */}
            <section className="relative flex flex-col justify-start pt-24 pb-12 md:pt-40 md:pb-32 overflow-hidden min-h-[700px] md:min-h-[800px]">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    <DashboardProof />
                    {/* Desktop gradient overlay */}
                    <div className="hidden md:block absolute inset-0 pointer-events-none w-[60%] right-0 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
                    {/* Mobile dark overlay to ensure readability */}
                    <div className="md:hidden absolute inset-0 bg-gradient-to-b from-background via-background/95 to-slate-950 pointer-events-none z-10" />
                </div>

                {/* Content Layer with strict gap spacing */}
                <div className="relative z-20 flex flex-col gap-16 md:gap-0 w-full mt-4 md:mt-0">

                    {/* Text Container */}
                    <div className="container px-6 md:px-6 mx-auto">
                        <div className="flex justify-start md:justify-end">
                            <m.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="max-w-xl text-left md:text-right flex flex-col items-start md:items-end"
                            >
                                <span className="text-accent font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block hover:text-white transition-colors">Undeniable Metrics</span>
                                <h2 className="text-4xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight uppercase leading-none text-white">The Reach.</h2>
                                <p className="text-base md:text-xl text-foreground/80 mb-8 max-w-md leading-relaxed text-balance font-light">
                                    Real, raw data. <strong className="text-white">35M 12S average engagement time</strong> and <strong className="text-accent">+3,095% event tracking growth.</strong> We engineer digital infrastructure that commands absolute attention and converts raw traffic into captured audiences.
                                </p>
                                <ul className="space-y-4 mb-10 flex flex-col items-start md:items-end w-full">
                                    {["Data-Driven SEO Protocol", "Page-One Search Placement", "High-Converting Organic Traffic"].map((f) => (
                                        <li key={f} className="flex items-center flex-row-reverse md:flex-row-reverse gap-3 text-sm md:text-lg font-medium text-white/50 w-full justify-end md:justify-start">
                                            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-purple-400 flex-shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                            <span className="text-right md:text-left">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/marketing" className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)] rounded-full transition-all font-bold uppercase tracking-widest text-[10px] active:scale-95 group">
                                    Analyze Our Methodology <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </m.div>
                        </div>
                    </div>

                    {/* --- MOBILE OPTIMIZED 2D PRESENTATION (CAROUSEL) IN DOCUMENT FLOW --- */}
                    <div className="flex md:hidden w-full flex-col pb-4">
                        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-8 touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                            {/* Card 1: Engagement Time Container */}
                            <m.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative w-[300px] sm:w-[350px] shrink-0 snap-center aspect-video rounded-2xl overflow-hidden shadow-2xl border border-accent/40 glass-card"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-blue-500 z-20" />
                                <Image src="/images/proof/Growth Proof/5.png" alt="Google Analytics Engagement 35m" fill className="object-cover" />

                                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/95 backdrop-blur-xl border border-accent/50 text-accent px-4 py-3 rounded-xl text-center shadow-[0_0_20px_rgba(34,211,238,0.2)] z-30">
                                    <span className="text-[11px] font-black tracking-widest uppercase block mb-0.5">Verified GA4 Data</span>
                                    <span className="text-sm font-bold opacity-90 text-white">35m 12s Avg. Engagement</span>
                                </div>
                            </m.div>

                            {/* Card 2: Performance Graph */}
                            <m.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="relative w-[300px] sm:w-[350px] shrink-0 snap-center aspect-video rounded-2xl overflow-hidden shadow-2xl border border-purple-500/40 glass-card"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-fuchsia-400 z-20" />
                                <Image src="/images/proof/Growth Proof/4.png" alt="Google Search Console Performance" fill className="object-cover" />

                                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/95 backdrop-blur-xl border border-purple-500/50 text-purple-400 px-4 py-3 rounded-xl text-center shadow-[0_0_20px_rgba(168,85,247,0.2)] z-30">
                                    <span className="text-[11px] font-black tracking-widest uppercase block mb-0.5">Event Tracking</span>
                                    <span className="text-sm font-bold opacity-90 text-white">+3,095% Performance Growth</span>
                                </div>
                            </m.div>

                            {/* Card 3: Dashboard Traffic */}
                            <m.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative w-[300px] sm:w-[350px] shrink-0 snap-center aspect-video rounded-2xl overflow-hidden shadow-2xl border border-blue-500/40 glass-card"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 z-20" />
                                <Image src="/images/proof/Growth Proof/3.png" alt="Google Analytics Home Data" fill className="object-cover" />

                                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/95 backdrop-blur-xl border border-blue-500/50 text-blue-400 px-4 py-3 rounded-xl text-center shadow-[0_0_20px_rgba(59,130,246,0.2)] z-30">
                                    <span className="text-[11px] font-black tracking-widest uppercase block mb-0.5">High-Volume Capture</span>
                                    <span className="text-sm font-bold opacity-90 text-white">Dominant Traffic Pipelines</span>
                                </div>
                            </m.div>

                            {/* Card 4: Search Console Baseline */}
                            <m.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="relative w-[300px] sm:w-[350px] shrink-0 snap-center aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 glass-card opacity-90"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/40 to-white/10 z-20" />
                                <Image src="/images/proof/Growth Proof/1.png" alt="Google Search Console Data" fill className="object-cover" />

                                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/95 backdrop-blur-xl border border-white/20 text-white/80 px-4 py-3 rounded-xl text-center z-30">
                                    <span className="text-[11px] font-black tracking-widest uppercase block mb-0.5">Baseline Indexing</span>
                                    <span className="text-sm font-bold opacity-90 text-white">Total Search Authority</span>
                                </div>
                            </m.div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Section 1: The Studio */}
            <section className="relative flex flex-col justify-start pt-8 pb-12 md:pt-40 md:pb-32 overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/studio-session.png"
                        alt="Professional Podcasting Studio Background"
                        fill
                        sizes="100vw"
                        className="object-cover object-center opacity-10 blur-sm scale-110"
                        title="Studio Background" aria-description="An official Power Digital Media structured image asset." data-caption="Power Digital Media Portfolio & Assets"
                    />
                    <div className="absolute inset-0 bg-slate-950/80" />
                    <div className="absolute inset-0 cyber-grid opacity-10" />
                </div>

                <div className="container relative z-10 px-6 mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                        <m.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-xl"
                        >
                            <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block">The Core</span>
                            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight uppercase leading-none">The Studio.</h2>
                            <p className="text-base md:text-xl text-foreground/70 mb-8 leading-relaxed font-light">
                                Complete studio-grade podcasting. From show concept and branding to full RØDECaster-powered production in JACKSON, MS.
                            </p>
                            <ul className="space-y-4 mb-10">
                                {["Show Naming & Format Strategy", "Broadcast-Quality Audio Chain", "Editing & Mastering"].map((f) => (
                                    <li key={f} className="flex items-center gap-3 text-sm md:text-lg font-medium text-white/60">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
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
                        </m.div>

                        <m.div
                            initial={{ opacity: 0, scale: 0.95, x: 30 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 group shadow-2xl"
                        >
                            <Image
                                src="/images/rodecaster-studio-neon.jpg"
                                alt="Power Digital Studio Hardware - Rodecaster Pro Neon"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                                title="Studio Session Detail" aria-description="An official Power Digital Media structured image asset." data-caption="Power Digital Media Portfolio & Assets"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent mix-blend-overlay" />

                            {/* HUD Recording Indicator */}
                            <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-sm border border-white/10">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                                <span className="text-[10px] font-bold tracking-widest uppercase text-white/90">REC</span>
                            </div>

                            {/* Tech Overlay */}
                            <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-sm border border-white/10">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[8px] text-cyan-400 uppercase tracking-widest">Active Node</span>
                                    <span className="text-xs font-mono text-white/90">RØDECaster Pro II</span>
                                </div>
                            </div>
                        </m.div>
                    </div>
                </div>
            </section>

            {/* Section: The Capture (On-Location) */}
            <section className="relative flex flex-col justify-start pt-8 pb-12 md:pt-40 md:pb-32 overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/podcast-hero-cinematic.webp"
                        alt="On-Location Cinematography"
                        fill
                        className="object-cover object-center opacity-25 scale-110"
                        title="Podcast Hero Cinematic" aria-description="An official Power Digital Media structured image asset." data-caption="Power Digital Media Portfolio & Assets"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/40" />
                </div>

                <div className="container relative z-10 px-6 mx-auto">
                    <div className="grid md:grid-cols-2 items-center gap-16">
                        <m.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1 relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10"
                        >
                            <Image
                                src="/images/captures/live-event-gimbal.webp"
                                alt="Event Production"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-accent/20 mix-blend-overlay" />
                        </m.div>

                        <m.div
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
                        </m.div>
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
                    <m.div
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
                    </m.div>
                </div>
            </section>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </div>
    );
}
