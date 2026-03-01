"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Zap, ArrowRight, XCircle } from "lucide-react";
import Link from "next/link";

const diyPainPoints = [
    "15+ Hours Editing Per Episode",
    "Juggling 4 Software Subscriptions",
    "Algorithm Penalties for Inconsistency",
    "Guest Drop-offs from Tech Issues",
    "Audio Clipping & Echo Issues",
    "Burnout Before Episode 10"
];

const powerProtocol = [
    "Zero Hours Editing",
    "One Consolidated Premium Solution",
    "Optimized Omnichannel Distribution",
    "VIP White-Glove Guest Experience",
    "Broadcast-Grade Aphex Mastering",
    "Infinite Runway for Growth"
];

export default function CostOfInaction() {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handlePointerDown = () => setIsDragging(true);
    const handlePointerUp = () => setIsDragging(false);
    const handlePointerLeave = () => setIsDragging(false);

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPos(percentage);
    };

    return (
        <section className="py-24 md:py-32 relative bg-background overflow-hidden border-t border-white/5">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-red-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">The Cost of Inaction</span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85]">
                        DIY is a <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Trap.</span>
                    </h2>
                    <p className="text-lg text-foreground/60 leading-relaxed mt-6 max-w-xl mx-auto font-light">
                        Drag to expose the reality of self-production vs. deploying the Power Protocol.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* The Interactive Slider Container */}
                    <div
                        ref={containerRef}
                        className="relative h-[600px] md:h-[500px] w-full rounded-3xl overflow-hidden cursor-ew-resize select-none touch-none border border-white/10 shadow-2xl bg-black"
                        onPointerDown={handlePointerDown}
                        onPointerUp={handlePointerUp}
                        onPointerLeave={handlePointerLeave}
                        onPointerMove={handlePointerMove}
                    >
                        {/* LEFT SIDE: DIY (Red/Pain) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 to-black p-8 md:p-16 flex flex-col justify-center">
                            <h3 className="text-3xl md:text-5xl font-black text-red-500 uppercase tracking-tighter mb-8 opacity-80">
                                The Solo Grind
                            </h3>
                            <div className="grid gap-4">
                                {diyPainPoints.map((point, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <XCircle className="w-6 h-6 text-red-500/70 shrink-0" />
                                        <span className="text-lg md:text-xl font-medium text-red-50/70">{point}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="absolute bottom-8 right-8 text-red-500/30 font-black text-8xl md:text-[150px] leading-none tracking-tighter opacity-10 blur-sm pointer-events-none">
                                FAIL
                            </div>
                        </div>

                        {/* RIGHT SIDE: Power Protocol (Cyan/Success) */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 to-slate-900 border-l border-cyan-400 p-8 md:p-16 flex flex-col justify-center"
                            style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
                        >
                            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay" />

                            <h3 className="text-3xl md:text-5xl font-black text-cyan-400 uppercase tracking-tighter mb-8 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                The Power Protocol
                            </h3>

                            {/* Singular focus representation */}
                            <div className="hidden md:flex flex-col items-start justify-center h-full">
                                <div className="p-8 rounded-3xl glass-card border-cyan-400/30 bg-cyan-950/40 w-full max-w-lg shadow-[0_0_50px_rgba(34,211,238,0.1)] relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Zap className="w-32 h-32 text-cyan-400" />
                                    </div>
                                    <h4 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 relative z-10">
                                        Show up.<br />Speak.
                                    </h4>
                                    <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm relative z-10">
                                        // We handle literally everything else.
                                    </p>
                                </div>
                            </div>

                            {/* Mobile list view */}
                            <div className="grid gap-4 md:hidden relative z-10">
                                {powerProtocol.map((point, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
                                        <span className="text-base font-bold text-white shadow-black">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Draggable Scrubber Handle */}
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-20 flex items-center justify-center pointer-events-none"
                            style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-8 h-16 bg-black border-2 border-cyan-400 rounded-full flex items-center justify-center gap-1 shadow-[0_0_30px_rgba(34,211,238,0.8)] backdrop-blur-md"
                            >
                                <div className="w-0.5 h-6 bg-cyan-400/50 rounded-full" />
                                <div className="w-0.5 h-8 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,1)]" />
                                <div className="w-0.5 h-6 bg-cyan-400/50 rounded-full" />
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link href="#pricing" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform">
                        Outsource The Grind
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
