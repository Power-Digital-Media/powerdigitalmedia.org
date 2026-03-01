"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Search, Camera, Cpu, Zap, Globe, Activity } from "lucide-react";

const protocols = [
    {
        id: "SOP 01",
        title: "Strategic Blueprint",
        subtitle: "CONSULTATION & HOOK ENGINEERING",
        description: "We don't just hit record. We map your audience, engineer your primary hooks, and build a strategic content map designed for recurring dominance.",
        icon: Search,
        Animation: ({ active }: { active: boolean }) => (
            <div className="relative w-full h-full flex items-center justify-center">
                <Search className={`w-6 h-6 z-10 transition-colors duration-500 ${active ? 'text-cyan-300' : 'text-cyan-400/30'}`} />
                {active && (
                    <>
                        <motion.div animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 border border-cyan-400/50 rounded-full" />
                        <motion.div animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.75 }} className="absolute inset-0 border border-cyan-400/30 rounded-full" />
                    </>
                )}
            </div>
        )
    },
    {
        id: "SOP 02",
        title: "Elite Capture",
        subtitle: "NESTED SCENE ARCHITECTURE",
        description: "Dynamic production using OBSBOT 4K cameras and nested scene logic. Real-time integration of on-screen media, videos, and professional graphics.",
        icon: Camera,
        Animation: ({ active }: { active: boolean }) => (
            <div className="relative w-full h-full flex items-center justify-center">
                <Camera className={`w-6 h-6 z-10 transition-colors duration-500 ${active ? 'text-red-400' : 'text-cyan-400/30'}`} />
                {active && (
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)]" />
                )}
            </div>
        )
    },
    {
        id: "SOP 03",
        title: "The Mix Room",
        subtitle: "REMOTE CALL-IN & MEDIA SYNC",
        description: "Live guest integration via remote call-ins. Seamless switching between hosts, guests, and cinematic media assets for a broadcast-grade flow.",
        icon: Cpu,
        Animation: ({ active }: { active: boolean }) => (
            <div className="relative w-full h-full flex items-center justify-center gap-[2px]">
                {!active && <Cpu className="w-6 h-6 text-cyan-400/30" />}
                {active && [...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{ width: '4px', backgroundColor: '#22d3ee', borderRadius: '2px' }}
                        animate={{ height: ['20%', '80%', '20%'] }}
                        transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                    />
                ))}
            </div>
        )
    },
    {
        id: "SOP 04",
        title: "Growth Injection",
        subtitle: "VIRAL CLIPPING & SCRIPTING",
        description: "We extract the high-velocity signals from your long-form content. Transform complex conversations into short-form viral engines.",
        icon: Zap,
        Animation: ({ active }: { active: boolean }) => (
            <div className="relative w-full h-full flex items-center justify-center">
                <Zap className={`w-6 h-6 z-10 transition-colors duration-500 ${active ? 'text-yellow-400' : 'text-cyan-400/30'}`} />
                {active && (
                    <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ rotate: { duration: 3, repeat: Infinity, ease: 'linear' }, scale: { duration: 1, repeat: Infinity } }} className="absolute inset-0 border-2 border-dashed border-yellow-400/30 rounded-full" />
                )}
            </div>
        )
    },
    {
        id: "SOP 05",
        title: "Global Deployment",
        subtitle: "OMNI-CHANNEL SYNC & PODBEAN",
        description: "Automatic audio extraction and distribution to Podbean. Your show synchronized across iHeartRadio, Apple Podcasts, and Spotify with SEO-optimized metadata.",
        icon: Globe,
        Animation: ({ active }: { active: boolean }) => (
            <div className="relative w-full h-full flex items-center justify-center">
                <Globe className={`w-6 h-6 z-10 transition-colors duration-500 ${active ? 'text-blue-400' : 'text-cyan-400/30'}`} />
                {active && (
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(59,130,246,0.4)_360deg)] rounded-full" />
                )}
            </div>
        )
    }
];

const StepNode = ({ index, protocol, isEven }: { index: number, protocol: any, isEven: boolean }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    return (
        <div ref={ref} className={`relative flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-24 w-full group py-8`}>

            {/* Center Connection Node */}
            <div className="absolute left-[24px] lg:left-1/2 -translate-x-1/2 w-4 h-4 z-20 flex items-center justify-center">
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${isInView ? 'bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] scale-150' : 'bg-slate-800 border border-cyan-900'}`} />
            </div>

            {/* Connecting Line from Node to Card (Desktop only) */}
            {isEven ? (
                <div className={`hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 h-px transition-all duration-700 ${isInView ? 'w-24 bg-gradient-to-r from-cyan-400 to-cyan-500/10' : 'w-0'}`} />
            ) : (
                <div className={`hidden lg:block absolute right-1/2 top-1/2 -translate-y-1/2 h-px transition-all duration-700 ${isInView ? 'w-24 bg-gradient-to-l from-cyan-400 to-cyan-500/10' : 'w-0'}`} />
            )}

            {/* Content Side */}
            <div className="flex-1 w-full pl-16 lg:pl-0">
                <div
                    className={`p-8 md:p-12 rounded-[2rem] transition-all duration-700 relative overflow-hidden backdrop-blur-md ${isInView
                            ? "bg-slate-900/80 border border-cyan-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(34,211,238,0.1)] scale-100 opacity-100"
                            : "bg-slate-950/40 border border-white/5 opacity-40 scale-95 hover:opacity-60"
                        }`}
                >
                    {/* Active Highlight Gradient */}
                    {isInView && (
                        <div className={`absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent ${isEven ? 'left-0' : 'right-0'}`} />
                    )}

                    <div className="flex items-center gap-6 mb-6">
                        <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500 ${isInView ? 'bg-cyan-950/50 border border-cyan-500/30' : 'bg-slate-900/50 border border-white/5'}`}>
                            <protocol.Animation active={isInView} />
                        </div>
                        <div>
                            <span className={`font-bold tracking-[0.3em] uppercase text-[10px] transition-colors duration-500 ${isInView ? 'text-cyan-400' : 'text-slate-500'}`}>{protocol.id}</span>
                            <h3 className={`text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight mt-1 transition-colors duration-500 ${isInView ? 'text-white' : 'text-white/40'}`}>{protocol.title}</h3>
                        </div>
                    </div>

                    <span className={`font-bold tracking-widest text-[9px] uppercase mb-4 block leading-none transition-colors duration-500 ${isInView ? 'text-cyan-100/60' : 'text-white/20'}`}>{protocol.subtitle}</span>
                    <p className={`leading-relaxed font-light text-base md:text-lg transition-colors duration-500 ${isInView ? 'text-foreground/80' : 'text-foreground/30'}`}>
                        {protocol.description}
                    </p>
                </div>
            </div>

            {/* Spacer Side (Desktop) */}
            <div className="flex-1 hidden lg:block" />
        </div>
    );
};

export default function ProductionPipeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
    const beamHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    return (
        <section className="py-32 md:py-48 relative bg-black overflow-hidden border-t border-cyan-500/10">
            {/* Dark Hex Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'100\' viewBox=\'0 0 60 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg stroke=\'%23ffffff\' stroke-width=\'1\' fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg opacity=\'1\'%3E%3Cpath d=\'M30 0L60 17.3205L60 51.9615L30 69.282L0 51.9615L0 17.3205L30 0Z\'/%3E%3Cpath d=\'M30 69.282L60 86.6025L60 121.2435L30 138.564L0 121.2435L0 86.6025L30 69.282Z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
            />

            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-32">
                    <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block border border-cyan-500/30 rounded-full px-4 py-1.5 inline-block bg-cyan-950/30">
                        Standard Operating Protocol
                    </span>
                    <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.85] text-white drop-shadow-2xl">
                        The Power <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-glow-cyan">
                            Protocol.
                        </span>
                    </h2>
                    <p className="text-lg md:text-2xl text-foreground/50 font-light tracking-tight max-w-2xl mx-auto">
                        A systematic assembly line designed to transform raw conversations into high-yielding digital assets.
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto" ref={containerRef}>
                    {/* The Conduit Beam (Track) */}
                    <div className="absolute left-[24px] lg:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 z-0" />

                    {/* The Active Energy Beam */}
                    <motion.div
                        className="absolute left-[24px] lg:left-1/2 top-0 w-1 bg-cyan-400 -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                        style={{ height: beamHeight }}
                    >
                        {/* Energy flare at the tip */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-12 bg-white rounded-full blur-[8px] opacity-80" />
                    </motion.div>

                    <div className="flex flex-col">
                        {protocols.map((protocol, index) => (
                            <StepNode
                                key={protocol.id}
                                index={index}
                                protocol={protocol}
                                isEven={index % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />
        </section>
    );
}
