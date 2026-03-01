"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Settings, Cpu } from "lucide-react";
import Image from "next/image";

const gear = [
    {
        title: "Quad PodMic Array",
        meta: "4-PERSON BROADCAST CHAIN",
        description: "Four RØDE PodMics mounted on a PSA1+ professional arm array. Balanced frequency response for high-impact multi-guest vocal clarity.",
        icon: "logo"
    },
    {
        title: "RØDECaster Pro II",
        meta: "FLAGSHIP PRODUCTION ENGINE",
        description: "The heartbeat of the studio. Concurrent management of 4 high-gain audio channels with APHEX® processing for broadcast-ready signals.",
        icon: Settings
    },
    {
        title: "Quad OBSBOT Array",
        meta: "4-SOURCE AI CINEMATOGRAPHY",
        description: "A synchronized 4-camera Tiny 2 Lite array. AI-driven tracking across 4 discrete perspectives for dynamic multi-guest 4K visual flow.",
        icon: Camera
    },
    {
        title: "Remote Protocol",
        meta: "GLOBAL CALL-IN ENGINE",
        description: "Bespoke signal routing for remote guest integration. High-fidelity phone and video call-ins with zero-latency monitoring for all 4 hosts.",
        icon: Cpu
    }
];

export default function TechSchematic() {
    const [hoveredGear, setHoveredGear] = useState<number | null>(null);

    return (
        <section className="py-32 relative bg-background overflow-hidden border-t border-white/5">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="flex-1">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Hardware Infrastructure</span>
                        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.85]">
                            The Technical <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Schematic.</span>
                        </h2>
                        <p className="text-lg text-foreground/60 leading-relaxed mb-12 max-w-xl font-light">
                            We don&apos;t compromise on signal quality. Our studio is built on the same foundations used by the world&apos;s leading broadcasters and production houses.
                        </p>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {gear.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    onMouseEnter={() => setHoveredGear(index)}
                                    onMouseLeave={() => setHoveredGear(null)}
                                    className={`p-6 rounded-3xl glass-card transition-all duration-300 group cursor-default ${hoveredGear === index
                                            ? "bg-white/[0.05] border-cyan-500/30 scale-[1.02]"
                                            : "bg-white/[0.02] border-white/5 hover:bg-white/[0.03]"
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${hoveredGear === index ? "bg-cyan-500/20 scale-110" : "bg-cyan-500/10 group-hover:scale-110"
                                        }`}>
                                        {item.icon === "logo" ? (
                                            <Image src="/power-logo.webp" alt="" width={20} height={20} unoptimized className="object-contain" />
                                        ) : (
                                            <item.icon className="w-5 h-5 text-cyan-400" />
                                        )}
                                    </div>
                                    <h4 className="text-lg font-bold mb-1 uppercase tracking-tight">{item.title}</h4>
                                    <span className="text-[9px] font-bold text-cyan-500/50 uppercase tracking-widest block mb-3">{item.meta}</span>
                                    <p className="text-sm text-foreground/40 leading-relaxed font-light line-clamp-3 group-hover:text-foreground/60 transition-colors">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Visual Schematic Side */}
                    <div className="flex-1 w-full relative order-2 lg:order-1">
                        <div className="aspect-square relative rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-white/10 glass-card p-2 md:p-4 bg-slate-900/20 shadow-2xl">
                            {/* Blueprint Grid Layer */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none"
                                style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-black/40 flex items-center justify-center border border-white/5">

                                {/* Base radar sweep - fades when hovering to focus on specific gear */}
                                <motion.div
                                    className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(34,211,238,0)_0%,rgba(34,211,238,0)_80%,rgba(34,211,238,0.1)_100%)] mix-blend-screen"
                                    animate={{ rotate: 360, opacity: hoveredGear !== null ? 0.2 : 1 }}
                                    transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.3 } }}
                                />

                                {/* Central Hardware Visualization (Index 1 - RØDECaster) */}
                                <div className="relative w-64 h-64 flex items-center justify-center">
                                    <motion.div
                                        animate={{
                                            scale: hoveredGear === 1 ? [1, 1.2, 1] : [1, 1.05, 1],
                                            opacity: hoveredGear === 1 ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3]
                                        }}
                                        transition={{ duration: hoveredGear === 1 ? 2 : 4, repeat: Infinity, ease: "easeInOut" }}
                                        className={`absolute inset-0 blur-[60px] rounded-full ${hoveredGear === 1 ? 'bg-cyan-400/40' : 'bg-cyan-500/20'}`}
                                    />
                                    <Image src="/power-logo.webp" alt="Power Digital Media" width={128} height={128} unoptimized
                                        className={`object-contain transition-all duration-500 relative z-10 ${hoveredGear === 1 ? 'opacity-100 scale-110 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]' : 'opacity-30'}`}
                                    />

                                    {/* Orbital Data Rings (Index 2 - OBSBOT) */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: hoveredGear === 2 ? 5 : 20, repeat: Infinity, ease: "linear" }}
                                        className={`absolute inset-0 border border-dashed rounded-full scale-[1.2] transition-colors duration-500 ${hoveredGear === 2 ? 'border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'border-cyan-500/20'}`}
                                    />
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: hoveredGear === 2 ? 3 : 15, repeat: Infinity, ease: "linear" }}
                                        className={`absolute inset-0 border border-dotted rounded-full scale-[1.4] transition-colors duration-500 ${hoveredGear === 2 ? 'border-white/50' : 'border-white/10'}`}
                                    />
                                </div>

                                {/* Dynamic Signal Meters (Index 0 - PodMic) */}
                                <div className={`absolute top-12 left-12 flex flex-col gap-1 w-32 transition-all duration-500 ${hoveredGear === 0 ? 'scale-110 origin-top-left' : 'opacity-60'}`}>
                                    <span className={`text-[7px] font-bold uppercase tracking-widest mb-1 ${hoveredGear === 0 ? 'text-cyan-300 drop-shadow-md' : 'text-cyan-400/50'}`}>Live Input Array</span>
                                    <div className="flex gap-0.5 h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={`m1-${i}`}
                                                animate={{
                                                    opacity: hoveredGear === 0 ? [0.4, 1, 0.4] : [0.2, 0.8, 0.2],
                                                    height: hoveredGear === 0 ? ['100%', `${Math.random() * 40 + 60}%`, '100%'] : '100%'
                                                }}
                                                transition={{ duration: 0.2, repeat: Infinity, delay: i * 0.05 }}
                                                className={`flex-1 ${hoveredGear === 0 ? 'bg-cyan-300 shadow-[0_0_5px_rgba(34,211,238,1)]' : 'bg-cyan-500'}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex gap-0.5 h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-1">
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={`m2-${i}`}
                                                animate={{ opacity: [0.2, 0.8, 0.2] }}
                                                transition={{ duration: 0.3, repeat: Infinity, delay: (12 - i) * 0.05 }}
                                                className={`flex-1 ${hoveredGear === 0 ? 'bg-cyan-400' : 'bg-cyan-500/50'}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Label Callouts */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className={`absolute top-1/4 right-[10%] p-4 glass-card bg-slate-950/80 rounded-2xl shadow-2xl transition-all duration-500 ${hoveredGear === 1 ? 'border-cyan-400/50 scale-110 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'border-cyan-500/20'}`}
                                >
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className={`w-1.5 h-1.5 rounded-full ${hoveredGear === 1 ? 'bg-cyan-300 animate-ping' : 'bg-cyan-500 animate-pulse'}`} />
                                        <span className={`text-[8px] font-bold uppercase tracking-widest whitespace-nowrap ${hoveredGear === 1 ? 'text-cyan-300' : 'text-cyan-400'}`}>96kHz MASTERING</span>
                                    </div>
                                    <div className="w-full h-px bg-white/5 my-2" />
                                    <span className="text-[7px] text-white/40 block">BROADCAST SIGNAL ENGAGED</span>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className={`absolute bottom-1/3 left-[10%] p-4 glass-card bg-slate-950/80 rounded-2xl shadow-2xl transition-all duration-500 ${hoveredGear === 0 ? 'border-cyan-400/50 scale-110' : 'border-white/10'}`}
                                >
                                    <div className="flex items-center gap-3 mb-1">
                                        <Settings className={`w-3 h-3 ${hoveredGear === 0 ? 'text-cyan-300 animate-spin' : 'text-cyan-400'}`} style={{ animationDuration: '3s' }} />
                                        <span className="text-[8px] font-bold text-white uppercase tracking-widest whitespace-nowrap">SUB-ZERO NOISE FLOOR</span>
                                    </div>
                                    <div className="w-full h-px bg-white/5 my-2" />
                                    <span className="text-[7px] text-white/40 block">ULTRA-LOW GAIN ENGINE</span>
                                </motion.div>

                                {/* Latency/Remote Integration (Index 3 - Remote Protocol) */}
                                <div className={`absolute bottom-12 right-12 text-right transition-all duration-500 ${hoveredGear === 3 ? 'scale-125 origin-bottom-right' : 'opacity-80'}`}>
                                    <span className={`text-[7px] font-bold uppercase tracking-[0.3em] block mb-1 ${hoveredGear === 3 ? 'text-cyan-300' : 'text-white/30'}`}>Network Protocol</span>
                                    <span className={`text-xl font-mono font-black tracking-tighter ${hoveredGear === 3 ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'text-cyan-400'}`}>0.02ms</span>
                                    {hoveredGear === 3 && (
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            className="h-px bg-gradient-to-r from-transparent to-cyan-400 w-32 absolute -left-36 top-1/2"
                                            style={{ transformOrigin: 'right' }}
                                        />
                                    )}
                                </div>

                                {/* System Coordinates */}
                                <div className="absolute bottom-4 left-6 font-mono text-[8px] text-white/10 uppercase tracking-widest">
                                    AXIS_SYNC: [32.44, 12.91, {hoveredGear || '0'}.00]
                                </div>
                            </div>
                        </div>

                        {/* Ambient Glow */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full blur-[120px] pointer-events-none -z-10 transition-colors duration-700 ${hoveredGear !== null ? 'bg-cyan-400/20' : 'bg-cyan-500/10'}`} />
                    </div>
                </div>
            </div>
        </section>
    );
}
