"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Video, MonitorPlay, Maximize, Target } from "lucide-react";

export default function MultiCamArchitect() {
    const [activeSetup, setActiveSetup] = useState(1);

    const setups = [
        {
            id: 1,
            name: "Single Cam",
            desc: "The Baseline. One angle. Risk of being boring.",
            features: ["Wide Angle Coverage", "Basic Audio", "No Safety Net"],
            visuals: [
                { id: "cam1", label: "Wide Master", position: "bottom-10 left-1/2 -translate-x-1/2", delay: 0 }
            ],
            color: "border-slate-800",
            textColor: "text-slate-400"
        },
        {
            id: 2,
            name: "Dual Cam Array",
            desc: "The Standard. Wide + Tight coverage.",
            features: ["Wide Master", "Tight Close-up", "Edit Flexibility"],
            visuals: [
                { id: "cam1", label: "Wide Master", position: "bottom-10 left-1/3", delay: 0 },
                { id: "cam2", label: "Tight Close-up", position: "bottom-10 right-1/3", delay: 0.1 }
            ],
            color: "border-blue-500/50",
            textColor: "text-blue-400"
        },
        {
            id: 3,
            name: "Tri-Cam Matrix",
            desc: "The Professional. Ultimate dynamic range.",
            features: ["Wide Master", "Tight Close-up", "Roving/Crowd Reaction"],
            visuals: [
                { id: "cam1", label: "Wide Master", position: "bottom-10 left-1/2 -translate-x-1/2", delay: 0 },
                { id: "cam2", label: "Tight Close-up", position: "top-1/3 right-10", delay: 0.1 },
                { id: "cam3", label: "Roving Action", position: "top-1/3 left-10", delay: 0.2 }
            ],
            color: "border-cyan-400",
            textColor: "text-cyan-400"
        },
        {
            id: 4,
            name: "Quad-Cam Domination",
            desc: "The Broadcaster. Total event coverage.",
            features: ["Master", "Tight", "Roving Action", "Reverse/Audience"],
            visuals: [
                { id: "cam1", label: "Wide Master", position: "bottom-10 left-1/2 -translate-x-1/2", delay: 0 },
                { id: "cam2", label: "Tight Action", position: "bottom-32 right-20", delay: 0.1 },
                { id: "cam3", label: "Roving Camera", position: "top-1/4 left-10", delay: 0.2 },
                { id: "cam4", label: "Reverse Audience", position: "top-10 left-1/2 -translate-x-1/2", delay: 0.3 }
            ],
            color: "border-purple-500",
            textColor: "text-purple-400"
        }
    ];

    const currentSetup = setups.find(s => s.id === activeSetup) || setups[0];

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-900/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-20">
                    <span className="text-cyan-400 font-bold tracking-[0.4em] text-[10px] mb-4 block uppercase">Visual Proof</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                        The Multi-Cam <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Architect.</span>
                    </h2>
                    <p className="mt-6 text-foreground/60 max-w-2xl mx-auto font-light text-lg">
                        See why high-ticket events require multi-angle setups. Do not let your brand die on a single boring camera angle.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto">

                    {/* Controls */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {setups.map((setup) => (
                            <button
                                key={setup.id}
                                onClick={() => setActiveSetup(setup.id)}
                                className={`text-left p-6 rounded-2xl glass-card transition-all duration-300 relative overflow-hidden group ${activeSetup === setup.id
                                        ? `border border-cyan-400 bg-cyan-950/20 shadow-[0_0_30px_rgba(34,211,238,0.15)] scale-105 z-10`
                                        : 'border border-white/5 hover:border-white/20 bg-white/5 opacity-50 hover:opacity-100'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className={`font-black uppercase tracking-widest text-sm ${activeSetup === setup.id ? 'text-white' : 'text-white/70'}`}>
                                        {setup.name}
                                    </h3>
                                    <Video className={`w-4 h-4 ${activeSetup === setup.id ? 'text-cyan-400' : 'text-white/30'}`} />
                                </div>
                                <p className="text-xs text-foreground/50 mb-4">{setup.desc}</p>

                                <div className="flex gap-2">
                                    {Array.from({ length: setup.id }).map((_, i) => (
                                        <div key={i} className={`w-2 h-2 rounded-full ${activeSetup === setup.id ? 'bg-cyan-400 animate-pulse' : 'bg-white/20'}`} />
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Stage Visualizer */}
                    <div className="lg:col-span-8">
                        <div className="aspect-video relative rounded-3xl border border-white/10 glass-card bg-black flex items-center justify-center p-8 overflow-hidden">

                            {/* Grid Floor */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyan-900/20 to-transparent perspective-1000">
                                <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px', transform: 'rotateX(60deg)' }} />
                            </div>

                            {/* The "Stage / Subject" */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-dashed border-white/20 flexitems-center justify-center animate-spin-slow">
                                <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-cyan-400/20 border border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)] flex items-center justify-center">
                                    <Target className="w-6 h-6 text-cyan-400 animate-pulse" />
                                </div>
                            </div>

                            {/* Camera Positions */}
                            <AnimatePresence>
                                {currentSetup.visuals.map((cam) => (
                                    <motion.div
                                        key={`${activeSetup}-${cam.id}`}
                                        initial={{ opacity: 0, scale: 0, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 0.4, delay: cam.delay, ease: "backOut" }}
                                        className={`absolute ${cam.position} flex flex-col items-center gap-2`}
                                    >
                                        <div className="bg-black border border-cyan-400 p-3 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.2)] relative z-10">
                                            <Camera className="w-6 h-6 text-cyan-400" />
                                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                                        </div>
                                        <div className="px-3 py-1 bg-black/80 border border-white/10 rounded-full text-[10px] font-mono text-cyan-400 whitespace-nowrap uppercase tracking-widest backdrop-blur-md">
                                            {cam.label}
                                        </div>

                                        {/* FOV Line/Beam (simplified) */}
                                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[200px] h-[300px] -z-10 opacity-20 pointer-events-none" style={{
                                            background: 'conic-gradient(from 150deg at 50% 0%, transparent 0deg, rgba(34,211,238,0.5) 30deg, transparent 60deg)',
                                            transformOrigin: 'top center'
                                        }} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Info Overlay */}
                            <motion.div
                                key={`info-${activeSetup}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-6 left-8 right-8 flex justify-between items-start"
                            >
                                <div>
                                    <h4 className="font-mono text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">Active Configuration:</h4>
                                    <ul className="space-y-1">
                                        {currentSetup.features.map((f, i) => (
                                            <li key={i} className="text-[10px] text-white/70 font-mono flex items-center gap-2">
                                                <span className="text-cyan-400">►</span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-mono text-white/40 mb-1">DATA STREAM</div>
                                    <div className="text-xs font-mono text-green-400">SYNC LOCKED</div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
