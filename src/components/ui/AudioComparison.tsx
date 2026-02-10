"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Waves } from "lucide-react";

export default function AudioComparison() {
    const [activeSource, setActiveSource] = useState<"phone" | "studio">("studio");
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto glass-card rounded-[3rem] p-10 md:p-16 border-white/5 bg-white/[0.02] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Waves className="w-32 h-32 text-cyan-500" />
                    </div>

                    <div className="relative z-10">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Audio Fidelity Audit</span>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">
                            The Power <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Difference.</span>
                        </h2>
                        <p className="text-lg text-foreground/60 mb-12 max-w-xl font-light">
                            Experience the shift from low-fidelity digital signal to studio-grade broadcast engineering. Clarity isn&apos;t just heard; it&apos;s felt.
                        </p>

                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            {/* Toggle Switch */}
                            <div className="flex bg-slate-900/50 p-2 rounded-2xl border border-white/5 w-full md:w-auto">
                                <button
                                    onClick={() => setActiveSource("phone")}
                                    className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeSource === "phone" ? "bg-white/10 text-white shadow-lg" : "text-white/40 hover:text-white"}`}
                                >
                                    Raw Phone
                                </button>
                                <button
                                    onClick={() => setActiveSource("studio")}
                                    className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeSource === "studio" ? "bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)]" : "text-white/40 hover:text-white"}`}
                                >
                                    Power Studio
                                </button>
                            </div>

                            {/* Playback Simulation */}
                            <div className="flex-1 w-full bg-slate-950/80 rounded-2xl p-6 border border-white/5 flex items-center gap-6">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                                </button>
                                <div className="flex-1 flex items-end gap-1 h-8">
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                height: isPlaying
                                                    ? (activeSource === "studio" ? [8, 24, 12, 32, 16] : [4, 8, 6, 10, 5])
                                                    : 4
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                repeat: Infinity,
                                                delay: i * 0.05,
                                                ease: "easeInOut"
                                            }}
                                            className={`w-full rounded-full ${activeSource === "studio" ? "bg-cyan-400" : "bg-white/20"}`}
                                        />
                                    ))}
                                </div>
                                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                    {activeSource === "studio" ? "96kHz / 32-bit" : "44.1kHz / 8-bit"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
                </div>
            </div>
        </section>
    );
}
