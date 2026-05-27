"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface CyberHeroBgProps {
    variant: "home" | "web-design" | "custom-applications" | "marketing";
}

export default function CyberHeroBg({ variant }: CyberHeroBgProps) {
    
    // Choose glow colors and beam colors based on variant
    const getThemeDetails = () => {
        switch (variant) {
            case "marketing":
                return {
                    glowTop: "bg-blue-600/10",
                    glowBottom: "bg-purple-600/10",
                    beamColor: "via-purple-400",
                    gridColor: "rgba(168, 85, 247, 0.05)" // Purple grid
                };
            case "custom-applications":
                return {
                    glowTop: "bg-cyan-500/10",
                    glowBottom: "bg-indigo-600/10",
                    beamColor: "via-blue-400",
                    gridColor: "rgba(99, 102, 241, 0.05)" // Indigo grid
                };
            case "home":
                return {
                    glowTop: "bg-cyan-500/10",
                    glowBottom: "bg-indigo-600/10",
                    beamColor: "via-cyan-400",
                    gridColor: "rgba(6, 182, 212, 0.05)" // Cyan grid
                };
            case "web-design":
            default:
                return {
                    glowTop: "bg-cyan-500/10",
                    glowBottom: "bg-blue-600/10",
                    beamColor: "via-cyan-400",
                    gridColor: "rgba(34, 211, 238, 0.05)" // Cyan grid
                };
        }
    };

    const theme = getThemeDetails();

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            {/* Deep Core Glows */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] ${theme.glowTop} rounded-full blur-[100px] md:blur-[150px] opacity-70 pointer-events-none`} />
            <div className={`absolute bottom-0 right-[-20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] ${theme.glowBottom} rounded-full blur-[120px] opacity-50 pointer-events-none`} />

            {/* The Cyber Grid Platform */}
            <div
                className="absolute inset-x-0 bottom-0 h-[70vh] border-t border-white/5"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, ${theme.gridColor} 1px, transparent 1px),
                        linear-gradient(to top, ${theme.gridColor} 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    transform: 'perspective(1000px) rotateX(60deg) translateY(100px) scale(2.5)',
                    transformOrigin: 'bottom center',
                    maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
                }}
            />

            {/* Data Streams (Vertical Beams) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-px h-[30vh] bg-gradient-to-b from-transparent ${theme.beamColor} to-transparent`}
                        style={{
                            left: `${15 + i * 14}%`,
                            top: '-30vh',
                            opacity: variant === "marketing" ? 0.25 : 0.3
                        }}
                        animate={{
                            top: ['100vh', '-30vh']
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Ambient Core Circle (Barely visible behind text overlay) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full border border-white/[0.02] bg-white/[0.002] blur-sm pointer-events-none" />

            {/* Dynamic Centerpieces based on Variant */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-[0.35] pointer-events-none mix-blend-screen">
                
                {/* --- VARIANT 1: WEB DESIGN (Concentric Radar Loops) --- */}
                {variant === "web-design" && (
                    <div className="w-full h-full relative">
                        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
                            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" className="text-cyan-500" strokeWidth="0.2" strokeDasharray="2 4" />
                            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="0.5" strokeDasharray="10 5 2 5" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" className="text-indigo-400" strokeWidth="0.2" />

                            <line x1="50" y1="2" x2="50" y2="10" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" />
                            <line x1="50" y1="90" x2="50" y2="98" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" />
                            <line x1="2" y1="50" x2="10" y2="50" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" />
                            <line x1="90" y1="50" x2="98" y2="50" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" />
                        </svg>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] animate-[spin_40s_linear_infinite_reverse]">
                                <polygon points="50,10 90,50 50,90 10,50" fill="none" stroke="currentColor" className="text-cyan-500" strokeWidth="0.3" strokeDasharray="1 2" />
                                <circle cx="50" cy="50" r="4" fill="currentColor" className="text-cyan-400" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* --- VARIANT 2: CUSTOM APPLICATIONS (CPU Microchip / Database Hub) --- */}
                {variant === "custom-applications" && (
                    <div className="w-full h-full relative">
                        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_80s_linear_infinite]">
                            {/* Microchip Outer Connections */}
                            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" className="text-indigo-500/30" strokeWidth="0.1" />
                            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-cyan-500/40" strokeWidth="0.2" strokeDasharray="1 6" />
                            <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" className="text-indigo-400" strokeWidth="0.3" strokeDasharray="12 4 2 4" />

                            {/* Core Microchip Square Frame */}
                            <rect x="36" y="36" width="28" height="28" rx="3" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="0.4" />
                            
                            {/* Circuit Traces / Radial Lines */}
                            <path d="M 50 2 L 50 36 M 50 64 L 50 98 M 2 50 L 36 50 M 64 50 L 98 50" stroke="currentColor" className="text-indigo-500/50" strokeWidth="0.2" />
                            <path d="M 16 16 L 36 36 M 84 84 L 64 64 M 84 16 L 64 36 M 16 84 L 36 64" stroke="currentColor" className="text-indigo-500/30" strokeWidth="0.2" />
                            
                            {/* Tiny silicon transistors inside */}
                            <circle cx="50" cy="50" r="5" fill="none" stroke="currentColor" className="text-cyan-400 animate-pulse" strokeWidth="0.3" />
                            <rect x="47" y="47" width="6" height="6" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="0.2" />
                        </svg>

                        {/* Fast Spinning Outer Processing Ring */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] animate-[spin_25s_linear_infinite_reverse]">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-cyan-400/60" strokeWidth="0.3" strokeDasharray="2 15" />
                                <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" className="text-blue-500/20" strokeWidth="0.1" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* --- VARIANT 3: GROWTH MARKETING (Ascending Sine Wave Graph) --- */}
                {variant === "marketing" && (
                    <div className="w-full h-full relative flex items-center justify-center">
                        {/* Interactive analytical coordinate box */}
                        <div className="w-[85%] h-[85%] border border-purple-500/20 relative rounded-2xl overflow-hidden flex flex-col justify-end p-4">
                            {/* Coordinate Graph Lines */}
                            <div className="absolute inset-0" style={{
                                backgroundImage: `
                                    linear-gradient(to right, rgba(168, 85, 247, 0.07) 1px, transparent 1px),
                                    linear-gradient(to top, rgba(168, 85, 247, 0.07) 1px, transparent 1px)
                                `,
                                backgroundSize: '20px 20px'
                            }} />

                            {/* Growing Analytics Wave */}
                            <svg viewBox="0 0 200 100" className="w-full h-[80%] absolute inset-x-0 bottom-6 z-10 overflow-visible">
                                <defs>
                                    <linearGradient id="waveGrad" x1="0" y1="1" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                                    </linearGradient>
                                    <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.1" />
                                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Background Area Under Wave */}
                                <motion.path 
                                    d="M 0 90 Q 30 75 60 85 T 120 40 T 180 15 L 200 10 L 200 100 L 0 100 Z"
                                    fill="url(#waveFill)"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2.5, ease: "easeOut" }}
                                />

                                {/* Dotted Prediction Analysis Wave */}
                                <motion.path 
                                    d="M 0 90 Q 30 75 60 85 T 120 40 T 180 15 L 200 10" 
                                    fill="none" 
                                    stroke="rgba(255,255,255,0.12)" 
                                    strokeWidth="0.6" 
                                    strokeDasharray="2 3"
                                />

                                {/* Dynamic Main Wave Path */}
                                <motion.path 
                                    d="M 0 90 Q 30 75 60 85 T 120 40 T 180 15 L 200 10" 
                                    fill="none" 
                                    stroke="url(#waveGrad)" 
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2.5, ease: "easeOut" }}
                                    style={{ filter: "drop-shadow(0px 0px 6px rgba(168, 85, 247, 0.45))" }}
                                />

                                {/* Glowing Nodes at key conversion spikes */}
                                <motion.circle cx="60" cy="85" r="2.5" className="fill-blue-500 shadow-lg text-glow" animate={{ r: [2.5, 3.8, 2.5] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} style={{ filter: "drop-shadow(0px 0px 4px rgba(59, 130, 246, 0.8))" }} />
                                <motion.circle cx="120" cy="40" r="2.5" className="fill-indigo-400 shadow-lg text-glow" animate={{ r: [2.5, 3.8, 2.5] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} style={{ filter: "drop-shadow(0px 0px 4px rgba(129, 140, 248, 0.8))" }} />
                                <motion.circle cx="180" cy="15" r="2.5" className="fill-purple-400 shadow-lg text-glow" animate={{ r: [2.5, 4.2, 2.5] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ filter: "drop-shadow(0px 0px 5px rgba(168, 85, 247, 0.8))" }} />
                            </svg>

                            {/* Subtitle metrics inside graph */}
                            <div className="absolute top-4 left-4 flex gap-4 text-[9px] font-mono text-purple-400/40">
                                <span>METRIC: CPA -54.2%</span>
                                <span>CR: +3,095%</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- VARIANT 4: HOME PAGE (Interconnected Network Rings) --- */}
                {variant === "home" && (
                    <div className="w-full h-full relative">
                        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_100s_linear_infinite]">
                            {/* Interconnected CDN / Node circles */}
                            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" className="text-cyan-500/25" strokeWidth="0.12" />
                            <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" className="text-blue-500/50" strokeWidth="0.25" strokeDasharray="6 12" />
                            <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" className="text-indigo-400/60" strokeWidth="0.12" />

                            {/* Radial Server node connections */}
                            <path d="M 50 4 L 50 96 M 4 50 L 96 50 M 18 18 L 82 82 M 82 18 L 18 82" stroke="currentColor" className="text-cyan-500/15" strokeWidth="0.1" />

                            {/* Orbiting data points */}
                            <motion.circle cx="50" cy="4" r="1.5" className="fill-cyan-400 text-glow" style={{ filter: "drop-shadow(0px 0px 4px rgba(34, 211, 238, 0.8))" }} />
                            <motion.circle cx="16" cy="18" r="1.2" className="fill-blue-400" style={{ filter: "drop-shadow(0px 0px 3px rgba(59, 130, 246, 0.8))" }} />
                            <motion.circle cx="84" cy="18" r="1.2" className="fill-indigo-400" style={{ filter: "drop-shadow(0px 0px 3px rgba(129, 140, 248, 0.8))" }} />
                            <motion.circle cx="50" cy="96" r="1.5" className="fill-cyan-400 text-glow" style={{ filter: "drop-shadow(0px 0px 4px rgba(34, 211, 238, 0.8))" }} />
                        </svg>

                        {/* Reverse spinning vector core for high-prestige depth */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-[50%] h-[50%] animate-[spin_35s_linear_infinite_reverse]">
                                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" className="text-indigo-400/35" strokeWidth="0.3" strokeDasharray="3 5" />
                                <polygon points="50,4 96,50 50,96 4,50" fill="none" stroke="currentColor" className="text-cyan-400/50" strokeWidth="0.25" style={{ filter: "drop-shadow(0px 0px 5px rgba(34, 211, 238, 0.6))" }} />
                                <circle cx="50" cy="50" r="3" fill="currentColor" className="text-cyan-400" style={{ filter: "drop-shadow(0px 0px 5px rgba(34, 211, 238, 0.8))" }} />
                            </svg>
                        </div>
                    </div>
                )}

            </div>

            {/* Fog overlay to blend edges and maintain strict dark readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background z-[2]" />
        </div>
    );
}
