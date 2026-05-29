"use client";

import React from "react";
import { m } from "framer-motion";

interface AnimatedHeroBgProps {
    variant: "home" | "web-design" | "custom-applications" | "marketing";
}

export default function AnimatedHeroBg({ variant }: AnimatedHeroBgProps) {
    const getThemeDetails = () => {
        switch (variant) {
            case "marketing":
                return {
                    beamColor: "via-purple-400"
                };
            case "custom-applications":
                return {
                    beamColor: "via-blue-400"
                };
            case "home":
                return {
                    beamColor: "via-cyan-400"
                };
            case "web-design":
            default:
                return {
                    beamColor: "via-cyan-400"
                };
        }
    };

    const theme = getThemeDetails();

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Data Streams (Vertical Beams) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
                {[...Array(6)].map((_, i) => (
                    <m.div
                        key={i}
                        className={`absolute w-px h-[30vh] bg-gradient-to-b from-transparent ${theme.beamColor} to-transparent`}
                        style={{
                            left: `${15 + i * 14}%`,
                            top: '-30vh',
                            opacity: variant === "marketing" ? 0.25 : 0.3,
                            willChange: "transform"
                        }}
                        animate={{
                            y: ['0vh', '130vh']
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

            {/* Dynamic Centerpieces based on Variant */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-[0.35] pointer-events-none mix-blend-screen hidden md:block">
                
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
                            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" className="text-indigo-500/30" strokeWidth="0.1" />
                            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-cyan-500/40" strokeWidth="0.2" strokeDasharray="1 6" />
                            <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" className="text-indigo-400" strokeWidth="0.3" strokeDasharray="12 4 2 4" />

                            <rect x="36" y="36" width="28" height="28" rx="3" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="0.4" />
                            
                            <path d="M 50 2 L 50 36 M 50 64 L 50 98 M 2 50 L 36 50 M 64 50 L 98 50" stroke="currentColor" className="text-indigo-500/50" strokeWidth="0.2" />
                            <path d="M 16 16 L 36 36 M 84 84 L 64 64 M 84 16 L 64 36 M 16 84 L 36 64" stroke="currentColor" className="text-indigo-500/30" strokeWidth="0.2" />
                            
                            <circle cx="50" cy="50" r="5" fill="none" stroke="currentColor" className="text-cyan-400 animate-pulse" strokeWidth="0.3" />
                            <rect x="47" y="47" width="6" height="6" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="0.2" />
                        </svg>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] animate-[spin_25s_linear_infinite_reverse]">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-cyan-400/60" strokeWidth="0.3" strokeDasharray="2 15" />
                                <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" className="text-blue-500/20" strokeWidth="0.1" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* --- VARIANT 3: GROWTH MARKETING (Concentric Growth Radars & Telemetry Lines) --- */}
                {variant === "marketing" && (
                    <div className="w-full h-full relative">
                        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_80s_linear_infinite]">
                            <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" className="text-purple-500/30" strokeWidth="0.15" strokeDasharray="3 6" />
                            <circle cx="50" cy="50" r="39" fill="none" stroke="currentColor" className="text-blue-500/40" strokeWidth="0.3" strokeDasharray="12 4 2 4" />
                            <circle cx="50" cy="50" r="29" fill="none" stroke="currentColor" className="text-cyan-500/30" strokeWidth="0.15" />
                            
                            <path d="M 50 50 L 85 15" stroke="currentColor" className="text-purple-400/50" strokeWidth="0.3" strokeDasharray="1 1" />
                            <circle cx="85" cy="15" r="1.2" fill="currentColor" className="text-purple-400" style={{ filter: "drop-shadow(0px 0px 4px rgba(168, 85, 247, 0.8))" }} />
                            
                            <line x1="50" y1="2" x2="50" y2="8" stroke="currentColor" className="text-blue-400" strokeWidth="0.4" />
                            <line x1="50" y1="92" x2="50" y2="98" stroke="currentColor" className="text-blue-400" strokeWidth="0.4" />
                            <line x1="2" y1="50" x2="8" y2="50" stroke="currentColor" className="text-blue-400" strokeWidth="0.4" />
                            <line x1="92" y1="50" x2="98" y2="50" stroke="currentColor" className="text-blue-400" strokeWidth="0.4" />
                        </svg>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-[70%] h-[70%] animate-[spin_30s_linear_infinite_reverse]">
                                <polygon points="50,15 80,50 50,85 20,50" fill="none" stroke="currentColor" className="text-purple-500/40" strokeWidth="0.2" strokeDasharray="1 3" />
                                <circle cx="50" cy="50" r="3.5" fill="currentColor" className="text-blue-400" style={{ filter: "drop-shadow(0px 0px 5px rgba(59, 130, 246, 0.8))" }} />
                                <circle cx="50" cy="50" r="6" fill="none" stroke="currentColor" className="text-cyan-400/30" strokeWidth="0.2" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* --- VARIANT 4: HOME PAGE (Interconnected Network Rings) --- */}
                {variant === "home" && (
                    <div className="w-full h-full relative">
                        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_100s_linear_infinite]">
                            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" className="text-cyan-500/25" strokeWidth="0.12" />
                            <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" className="text-blue-500/50" strokeWidth="0.25" strokeDasharray="6 12" />
                            <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" className="text-indigo-400/60" strokeWidth="0.12" />

                            <path d="M 50 4 L 50 96 M 4 50 L 96 50 M 18 18 L 82 82 M 82 18 L 18 82" stroke="currentColor" className="text-cyan-500/15" strokeWidth="0.1" />

                            <circle cx="50" cy="4" r="1.5" className="fill-cyan-400 text-glow" style={{ filter: "drop-shadow(0px 0px 4px rgba(34, 211, 238, 0.8))" }} />
                            <circle cx="16" cy="18" r="1.2" className="fill-blue-400" style={{ filter: "drop-shadow(0px 0px 3px rgba(59, 130, 246, 0.8))" }} />
                            <circle cx="84" cy="18" r="1.2" className="fill-indigo-400" style={{ filter: "drop-shadow(0px 0px 3px rgba(129, 140, 248, 0.8))" }} />
                            <circle cx="50" cy="96" r="1.5" className="fill-cyan-400 text-glow" style={{ filter: "drop-shadow(0px 0px 4px rgba(34, 211, 238, 0.8))" }} />
                        </svg>

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
        </div>
    );
}
