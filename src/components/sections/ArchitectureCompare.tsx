"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
    AlertTriangle, Zap, ServerCrash, ShieldCheck,
    SearchX, Search, Database, Cpu, ChevronLeft, ChevronRight
} from "lucide-react";

export default function ArchitectureCompare() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    const handleMouseMove = (e: MouseEvent | React.MouseEvent) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent | React.TouchEvent) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', () => setIsDragging(false));
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', () => setIsDragging(false));
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', () => setIsDragging(false));
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', () => setIsDragging(false));
        };
    }, [isDragging]);

    return (
        <section className="py-32 relative bg-background overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

            <div className="container relative z-10 px-4 mx-auto">
                <div className="text-center mb-20">
                    <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">The Architecture Difference</span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">Legacy vs <span className="text-glow-cyan text-cyan-400">Next-Gen</span></h2>
                    <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
                        Drag the slider to see why traditional agency websites fail, and why our dynamic web engines dominate the market.
                    </p>
                </div>

                {/* Interactive Slider Container */}
                <div
                    ref={containerRef}
                    className="relative w-full max-w-5xl mx-auto h-[650px] md:h-[550px] rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl transform scale-[0.90] md:scale-95 transition-transform duration-700"
                    onMouseDown={(e) => {
                        setIsDragging(true);
                        handleMove(e.clientX);
                    }}
                    onTouchStart={(e) => {
                        setIsDragging(true);
                        handleMove(e.touches[0].clientX);
                    }}
                >
                    {/* LEFT SIDE (Legacy WordPress/Bloat) - Always underneath */}
                    <div className="absolute inset-0 bg-red-950/20 bg-noise flex flex-col justify-center p-6 sm:p-8 md:p-16 lg:p-20">
                        <div className="w-[85%] sm:w-[50%] md:w-[42%] max-w-[400px]">
                            <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-red-500 mb-2 uppercase opacity-40">Traditional Web</h3>
                            <h4 className="text-sm sm:text-lg font-bold text-red-400/80 mb-6 border-b border-red-500/20 pb-4">Theme-Based / WordPress</h4>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="hidden sm:flex w-10 h-10 rounded-full bg-red-900/50 items-center justify-center shrink-0">
                                        <Database className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                        <strong className="block text-red-300 mb-1 text-sm sm:text-base">Server-Side Render Delay</strong>
                                        <p className="text-xs sm:text-sm text-red-200/50">Each page visit queries a slow database, leading to 3+ sec load times.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="hidden sm:flex w-10 h-10 rounded-full bg-red-900/50 items-center justify-center shrink-0">
                                        <ServerCrash className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                        <strong className="block text-red-300 mb-1 text-sm sm:text-base">Plugin Vulnerabilities</strong>
                                        <p className="text-xs sm:text-sm text-red-200/50">Constant updates required. Prone to hacking and code conflicts.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="hidden sm:flex w-10 h-10 rounded-full bg-red-900/50 items-center justify-center shrink-0">
                                        <SearchX className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                        <strong className="block text-red-300 mb-1 text-sm sm:text-base">Poor SEO Fundamentals</strong>
                                        <p className="text-xs sm:text-sm text-red-200/50">Bloated HTML output triggers Google Developer penalties.</p>
                                    </div>
                                </li>
                            </ul>

                            {/* Score Card */}
                            <div className="mt-8 p-3 sm:p-4 bg-red-950/50 rounded-xl border border-red-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-2 sm:gap-12">
                                <span className="text-red-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">LHS Score</span>
                                <span className="text-2xl sm:text-4xl font-black text-red-500">42/100</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE (Next.js / Power Digital) - Clipped via state */}
                    <div
                        className="absolute inset-0 bg-blue-950/30 backdrop-blur-md flex flex-col justify-center p-6 sm:p-8 md:p-16 lg:p-20 border-l border-cyan-400/50 shadow-[-20px_0_50px_rgba(34,211,238,0.15)]"
                        style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
                    >
                        <div className="w-[85%] sm:w-[50%] md:w-[42%] max-w-[400px] absolute right-6 sm:right-8 md:right-16 lg:right-20 text-right">
                            <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-cyan-400 mb-2 uppercase text-glow-cyan">Engineered Core</h3>
                            <h4 className="text-sm sm:text-lg font-bold text-blue-300 mb-6 border-b border-cyan-500/20 pb-4">Next.js / React Architecture</h4>

                            <ul className="space-y-4 text-left">
                                <li className="flex items-start gap-4 flex-row-reverse">
                                    <div className="hidden sm:flex w-10 h-10 rounded-full bg-cyan-900/50 items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                                        <Zap className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div className="text-right">
                                        <strong className="block text-cyan-300 mb-1 text-sm sm:text-base">Instant Edge Delivery</strong>
                                        <p className="text-xs sm:text-sm text-blue-200/70">Pre-compiled HTML distributed globally. 0.3s interactions.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 flex-row-reverse">
                                    <div className="hidden sm:flex w-10 h-10 rounded-full bg-cyan-900/50 items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                                        <ShieldCheck className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div className="text-right">
                                        <strong className="block text-cyan-300 mb-1 text-sm sm:text-base">Bulletproof Security</strong>
                                        <p className="text-xs sm:text-sm text-blue-200/70">No databases exposed. Serverless functions lock out intruders.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 flex-row-reverse">
                                    <div className="hidden sm:flex w-10 h-10 rounded-full bg-cyan-900/50 items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                                        <Search className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div className="text-right">
                                        <strong className="block text-cyan-300 mb-1 text-sm sm:text-base">AI-Ready SEO Schema</strong>
                                        <p className="text-xs sm:text-sm text-blue-200/70">Perfect scores signal immense authority to Google's bots.</p>
                                    </div>
                                </li>
                            </ul>

                            {/* Score Card */}
                            <div className="mt-8 p-3 sm:p-4 bg-cyan-950/50 rounded-xl border border-cyan-400/30 flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2 sm:gap-12 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                                <span className="text-2xl sm:text-4xl font-black text-cyan-400 drop-shadow-md">99/100</span>
                                <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">LHS Score</span>
                            </div>
                        </div>
                    </div>

                    {/* Custom Draggable Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-white/50 cursor-ew-resize flex items-center justify-center z-20 group hover:bg-cyan-400 transition-colors"
                        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                    >
                        {/* Center Drag Button */}
                        <div className="w-12 h-12 bg-black border-2 border-white/50 group-hover:border-cyan-400 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center backdrop-blur-md transition-all group-hover:scale-110 group-active:scale-95 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                            <ChevronLeft className="w-4 h-4 text-white/70 group-hover:text-cyan-400" />
                            <ChevronRight className="w-4 h-4 text-white/70 group-hover:text-cyan-400" />
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center px-4">
                    <p className="text-xs text-foreground/40 font-mono tracking-widest uppercase">
                        Drag handle left/right to compare technical infrastructure.
                    </p>
                </div>
            </div>
        </section>
    );
}
