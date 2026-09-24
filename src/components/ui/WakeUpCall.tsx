"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AlertCircle } from "lucide-react";

export default function WakeUpCall({ title, subtitle, paragraph }: { title: string, subtitle: string, paragraph: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.75, 0.95], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.45, 0.9], [0.92, 1, 1.05]);
    const textOpacity1 = useTransform(scrollYProgress, [0.05, 0.22], [0, 1]);
    const textOpacity2 = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
    const textOpacity3 = useTransform(scrollYProgress, [0.48, 0.68], [0, 1]);

    const splitTitle = title.split(' ');
    const firstHalf = splitTitle.slice(0, Math.ceil(splitTitle.length / 2)).join(' ');
    const secondHalf = splitTitle.slice(Math.ceil(splitTitle.length / 2)).join(' ');

    return (
        <section ref={containerRef} className="wakeup-zone relative h-[140vh] md:h-[220vh] bg-background">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#030712] z-30 shadow-[0_0_100px_rgba(0,0,0,1)]">

                {/* Soft ambient background glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

                <m.div style={{ opacity, scale }} className="absolute inset-0 flex flex-col justify-center items-center px-6 py-4">
                    <div className="max-w-5xl text-center flex flex-col items-center">

                        {/* Tag & The Problem Hook */}
                        <m.div style={{ opacity: textOpacity1 }} className="mb-6 md:mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-5">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                                <span className="text-[10px] md:text-xs font-bold text-amber-400 uppercase tracking-widest">
                                    The Hard Truth For Local Businesses
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-[0.95]">
                                {firstHalf} <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
                                    {secondHalf}
                                </span>
                            </h2>
                        </m.div>

                        {/* The Agitation / Context */}
                        <m.div style={{ opacity: textOpacity2 }} className="mb-8 md:mb-12">
                            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white/80 uppercase tracking-tight max-w-3xl mx-auto leading-snug">
                                {subtitle}
                            </p>
                        </m.div>

                        {/* The Resolution / Solution */}
                        <m.div style={{ opacity: textOpacity3 }} className="p-6 sm:p-8 md:p-10 border border-cyan-500/30 glass-card bg-cyan-950/30 backdrop-blur-xl rounded-3xl relative overflow-hidden max-w-4xl">
                            <div className="absolute inset-0 bg-cyan-500/10 blur-xl mix-blend-screen pointer-events-none" />
                            <p className="text-sm sm:text-lg md:text-xl font-medium text-white/95 leading-relaxed relative z-10">
                                {paragraph}
                            </p>
                        </m.div>
                    </div>
                </m.div>

                {/* Subtle perspective grid floor */}
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-cyan-950/20 to-transparent mask-gradient-v pointer-events-none">
                    <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px)', backgroundSize: '100% 36px', transform: 'perspective(500px) rotateX(60deg)' }} />
                </div>
            </div>
        </section>
    );
}
