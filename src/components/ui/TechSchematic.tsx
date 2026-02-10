"use client";

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
                                    className="p-6 rounded-3xl glass-card border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        {item.icon === "logo" ? (
                                            <Image src="/power-logo.png" alt="" width={20} height={20} className="object-contain" />
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
                        <div className="aspect-square relative rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-white/10 glass-card p-2 md:p-4 bg-slate-900/20">
                            {/* Blueprint Grid Layer */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none"
                                style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-black/40 flex items-center justify-center border border-white/5">
                                {/* Central Hardware Visualization */}
                                <div className="relative w-64 h-64 flex items-center justify-center">
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full"
                                    />
                                    <Image src="/power-logo.png" alt="Power Digital Media" width={128} height={128} className="object-contain opacity-30 relative z-10" />

                                    {/* Orbital Data Rings */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border border-dashed border-cyan-500/20 rounded-full scale-[1.2]"
                                    />
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border border-dotted border-white/10 rounded-full scale-[1.4]"
                                    />
                                </div>

                                {/* Dynamic Signal Meters */}
                                <div className="absolute top-12 left-12 flex flex-col gap-1 w-32">
                                    <span className="text-[7px] font-bold text-cyan-400/50 uppercase tracking-widest mb-1">Live Input 01</span>
                                    <div className="flex gap-0.5 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ opacity: [0.2, 1, 0.2] }}
                                                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                                                className="flex-1 bg-cyan-500"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="absolute bottom-12 right-12 text-right">
                                    <span className="text-[7px] font-bold text-white/30 uppercase tracking-[0.3em] block mb-1">Latency Delta</span>
                                    <span className="text-xl font-mono text-cyan-400 font-black tracking-tighter">0.02ms</span>
                                </div>

                                {/* Label Callouts (Enhanced) */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-1/4 right-[10%] p-4 glass-card border-cyan-500/20 bg-slate-950/80 rounded-2xl shadow-2xl"
                                >
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                                        <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest whitespace-nowrap">96kHz MASTERING</span>
                                    </div>
                                    <div className="w-full h-px bg-white/5 my-2" />
                                    <span className="text-[7px] text-white/40 block">BROADCAST SIGNAL ENGAGED</span>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-1/3 left-[10%] p-4 glass-card border-white/10 bg-slate-950/80 rounded-2xl shadow-2xl"
                                >
                                    <div className="flex items-center gap-3 mb-1">
                                        <Settings className="w-3 h-3 text-cyan-400" />
                                        <span className="text-[8px] font-bold text-white uppercase tracking-widest whitespace-nowrap">SUB-ZERO NOISE FLOOR</span>
                                    </div>
                                    <div className="w-full h-px bg-white/5 my-2" />
                                    <span className="text-[7px] text-white/40 block">ULTRA-LOW GAIN ENGINE</span>
                                </motion.div>

                                {/* System Coordinates */}
                                <div className="absolute bottom-4 left-6 font-mono text-[8px] text-white/10 uppercase tracking-widest">
                                    AXIS_SYNC: [32.44, 12.91, 0.00]
                                </div>
                            </div>
                        </div>

                        {/* Ambient Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
