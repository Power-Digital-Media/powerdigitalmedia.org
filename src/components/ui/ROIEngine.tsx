"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TrendingUp, Activity, BarChart4, Play, Pause } from "lucide-react";

export default function ROIEngine() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Smooth out the scroll progress for drawing the line
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 20
    });

    // We draw the SVG path based on scroll position. 
    // Wait until they scroll to near the middle to hit the 'inflection point'
    const drawLine = useTransform(smoothProgress, [0.3, 0.7], [0, 1]);

    // Scale the 'Viral Clip Hit' marker based on scroll
    const milestoneScale = useTransform(smoothProgress, [0.55, 0.6], [0, 1]);

    return (
        <section ref={sectionRef} className="py-24 md:py-32 relative bg-slate-950 border-t border-cyan-500/10 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left Copy */}
                    <div className="flex-1 text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                            <Activity className="w-3 h-3" /> Growth Trajectory
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-[0.85]">
                            The Power <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">Digital Effect.</span>
                        </h2>

                        <p className="text-lg text-foreground/70 leading-relaxed font-light mb-8 max-w-xl">
                            Standard podcasts build linear audiences. They rely on luck and algorithm favor. <strong className="text-white font-bold">The Power Protocol</strong> guarantees exponential trajectory through high-velocity omnichannel clip distribution.
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="p-4 rounded-2xl glass-card border border-white/5 bg-white/[0.02]">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/50">Average Podcaster</h4>
                                </div>
                                <p className="text-sm text-white/30">Linear growth. Burnout by month 3. Buried in search results.</p>
                            </div>
                            <div className="p-4 rounded-2xl glass-card border border-cyan-500/30 bg-cyan-950/20 shadow-[0_0_30px_rgba(34,211,238,0.05)]">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-cyan-400">The Power Protocol</h4>
                                </div>
                                <p className="text-sm text-cyan-50/70">Exponential viral hooks. Omnichannel syndication. Top 1% ranking probability.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Interactive Graph */}
                    <div className="flex-1 w-full relative h-[400px] md:h-[500px] p-6 rounded-[2rem] glass-card border-white/10 bg-black/40 shadow-2xl flex items-end">

                        {/* Y-Axis Label */}
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
                            Audience Reach
                        </div>
                        {/* X-Axis Label */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full text-center text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
                            Time (Months)
                        </div>

                        {/* Graph Canvas */}
                        <div className="relative w-full h-[85%] border-l border-b border-white/20 pl-4 pb-4">

                            {/* Linear "Average" Line */}
                            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                <line
                                    x1="5%" y1="95%"
                                    x2="95%" y2="70%"
                                    stroke="rgba(239, 68, 68, 0.4)"
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                />
                            </svg>

                            {/* Exponential "Power" Line */}
                            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                <motion.path
                                    d="M 5 95 C 40 90, 60 80, 70 50 C 75 30, 85 10, 95 5"
                                    fill="transparent"
                                    stroke="#22d3ee"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    style={{ pathLength: drawLine }}
                                    className="drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                                />
                            </svg>

                            {/* Milestone Marker */}
                            <motion.div
                                className="absolute"
                                style={{
                                    left: '65%',
                                    top: '40%',
                                    scale: milestoneScale,
                                }}
                            >
                                <div className="relative -translate-x-1/2 -translate-y-1/2">
                                    <div className="w-4 h-4 rounded-full bg-cyan-400 absolute inset-0 animate-ping opacity-50" />
                                    <div className="w-4 h-4 rounded-full bg-cyan-300 relative z-10 border-2 border-slate-900 shadow-[0_0_15px_rgba(34,211,238,1)]" />

                                    {/* Tooltip */}
                                    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-cyan-500/40 p-3 rounded-xl w-48 text-center shadow-xl">
                                        <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Viral Extraction Hit</div>
                                        <div className="text-xs text-white">Algorithm takes over. Reach 10x multiplier activated.</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Info Box that fades in at end of scroll */}
                            <motion.div
                                style={{ opacity: useTransform(smoothProgress, [0.8, 0.9], [0, 1]) }}
                                className="absolute top-4 right-4 bg-cyan-500 text-slate-950 p-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                            >
                                Domination Achieved
                            </motion.div>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
