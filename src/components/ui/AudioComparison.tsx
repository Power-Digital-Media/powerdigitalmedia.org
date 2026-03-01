"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Waves, Sparkles } from "lucide-react";

export default function AudioComparison() {
    const [sliderValue, setSliderValue] = useState(50);
    const [isPlaying, setIsPlaying] = useState(false);

    // Pre-generate deterministic heights for the waveform so it doesn't shift on re-renders,
    // but instead creates a realistic "audio track" visual.
    const waveformLength = 40;
    const baseHeights = Array.from({ length: waveformLength }, (_, i) => {
        // Create a pseudo-random wave pattern using sine functions
        return Math.abs(Math.sin(i * 0.5) * 40 + Math.cos(i * 1.2) * 20 + 20);
    });

    return (
        <section className="py-32 relative overflow-hidden bg-background border-t border-white/5">
            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block inline-flex items-center gap-2">
                            <Waves className="w-3 h-3" /> Audio Fidelity Audit
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-[0.9]">
                            The Power <br className="md:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Difference.</span>
                        </h2>
                        <p className="text-lg text-foreground/60 max-w-2xl font-light">
                            Slide to experience the shift from low-fidelity digital signal to studio-grade broadcast engineering. Clarity isn&apos;t just heard; it&apos;s engineered.
                        </p>
                    </div>

                    {/* Interactive Scrubber Component */}
                    <div className="relative w-full h-[300px] md:h-[400px] rounded-[2rem] md:rounded-[3rem] overflow-hidden glass-card border border-white/10 group bg-slate-900 shadow-2xl">

                        {/* Play/Pause Button overlayed globally centered at bottom */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all hover:scale-105 active:scale-95 text-white shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                            >
                                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                            </button>
                        </div>

                        {/* LEFT SIDE: Low Fidelity (RAW PHONE) */}
                        <div className="absolute inset-0 bg-[#110505] flex flex-col justify-between p-6 md:p-10 pointer-events-none">
                            <div className="absolute inset-0 bg-red-500/5 blur-3xl" />
                            <div className="relative z-10">
                                <div className="inline-flex flex-col">
                                    <span className="text-red-500 font-black text-xl md:text-2xl uppercase tracking-tighter shadow-black drop-shadow-md">Raw Phone</span>
                                    <span className="text-red-500/50 font-mono text-[10px] uppercase tracking-widest mt-1">44.1kHz / 8-bit / Unprocessed</span>
                                </div>
                            </div>

                            {/* Low Fi Waveform */}
                            <div className="flex items-end gap-1 md:gap-2 h-32 md:h-48 w-full opacity-60">
                                {baseHeights.map((val, i) => (
                                    <motion.div
                                        key={`low-${i}`}
                                        animate={{
                                            height: isPlaying
                                                ? `${Math.max(10, val * 0.4 + (Math.random() * 20 - 10))}%`
                                                : `${Math.max(10, val * 0.4)}%`
                                        }}
                                        transition={{ duration: 0.1, ease: "linear" }}
                                        className="flex-1 bg-red-600 rounded-sm"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* RIGHT SIDE: High Fidelity (POWER STUDIO) */}
                        <div
                            className="absolute inset-0 bg-slate-950 flex flex-col justify-between p-6 md:p-10 pointer-events-none border-l border-white/20"
                            style={{ clipPath: `polygon(${sliderValue}% 0, 100% 0, 100% 100%, ${sliderValue}% 100%)` }}
                        >
                            {/* Studio grid background */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none"
                                style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                            <div className="absolute inset-0 bg-cyan-500/10 blur-[80px]" />

                            <div className="relative z-10 flex justify-end text-right">
                                <div className="inline-flex flex-col">
                                    <span className="text-cyan-400 font-black text-xl md:text-2xl uppercase tracking-tighter flex items-center justify-end gap-2 shadow-black drop-shadow-md">
                                        Power Studio <Sparkles className="w-5 h-5 text-cyan-300" />
                                    </span>
                                    <span className="text-cyan-400/50 font-mono text-[10px] uppercase tracking-widest mt-1">96kHz / 32-bit / Mastered</span>
                                </div>
                            </div>

                            {/* High Fi Waveform */}
                            <div className="flex items-end gap-1 md:gap-2 h-32 md:h-48 w-full">
                                {baseHeights.map((val, i) => (
                                    <motion.div
                                        key={`high-${i}`}
                                        animate={{
                                            height: isPlaying
                                                ? `${Math.max(15, val + (Math.random() * 30 - 15))}%`
                                                : `${Math.max(15, val)}%`
                                        }}
                                        transition={{ duration: 0.1, ease: "linear" }}
                                        className="flex-1 bg-cyan-400 rounded-sm shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Slider Handle Concept */}
                        <div
                            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] pointer-events-none z-20"
                            style={{ left: `${sliderValue}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-slate-900 pointer-events-none transition-transform group-hover:scale-110">
                                <div className="flex gap-1 md:gap-1.5">
                                    <div className="w-0.5 h-3 md:h-4 bg-slate-400 rounded-full" />
                                    <div className="w-0.5 h-3 md:h-4 bg-slate-400 rounded-full" />
                                    <div className="w-0.5 h-3 md:h-4 bg-slate-400 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* Actual Input Range */}
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={sliderValue}
                            onChange={(e) => setSliderValue(Number(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
                            aria-label="Compare raw vs mastered audio"
                        />
                    </div>
                </div>
            </div>

            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        </section>
    );
}
