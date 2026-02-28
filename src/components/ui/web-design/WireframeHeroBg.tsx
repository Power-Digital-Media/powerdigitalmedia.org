"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function WireframeHeroBg() {
    // Generate a field of "data nodes" entirely with CSS
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            {/* Deep Core Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] bg-cyan-500/10 rounded-full blur-[100px] md:blur-[150px] opacity-70 pointer-events-none" />
            <div className="absolute bottom-0 right-[-20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-blue-600/10 rounded-full blur-[120px] opacity-50 pointer-events-none" />

            {/* The Cyber Grid Platform */}
            <div
                className="absolute inset-x-0 bottom-0 h-[70vh] border-t border-cyan-500/20"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px),
                        linear-gradient(to top, rgba(34, 211, 238, 0.05) 1px, transparent 1px)
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
                        className="absolute w-px h-[30vh] bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                        style={{
                            left: `${15 + i * 14}%`,
                            top: '-30vh',
                            opacity: 0.3
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

            {/* Central Node Structure */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-20 pointer-events-none mix-blend-screen">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" className="text-cyan-500" strokeWidth="0.2" strokeDasharray="2 4" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="0.5" strokeDasharray="10 5 2 5" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" className="text-indigo-400" strokeWidth="0.2" />

                    {/* Radials */}
                    <line x1="50" y1="2" x2="50" y2="10" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" />
                    <line x1="50" y1="90" x2="50" y2="98" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" />
                    <line x1="2" y1="50" x2="10" y2="50" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" />
                    <line x1="90" y1="50" x2="98" y2="50" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" />
                </svg>

                {/* Counter Rotating Inner Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] animate-[spin_40s_linear_infinite_reverse]">
                        <polygon points="50,10 90,50 50,90 10,50" fill="none" stroke="currentColor" className="text-cyan-500" strokeWidth="0.3" strokeDasharray="1 2" />
                        <circle cx="50" cy="50" r="4" fill="currentColor" className="text-cyan-400" />
                    </svg>
                </div>
            </div>

            {/* Fog overlay to blend edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
        </div>
    );
}
