"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function WakeUpCall() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
    const textOpacity1 = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
    const textOpacity2 = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
    const textOpacity3 = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

    // Glitch effect triggers
    const glitchX = useTransform(scrollYProgress, [0.2, 0.21, 0.22, 0.23], [0, -10, 10, 0]);
    const glitchY = useTransform(scrollYProgress, [0.4, 0.41, 0.42, 0.43], [0, 10, -10, 0]);

    return (
        <section ref={containerRef} className="relative h-[250vh] bg-background">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black z-30 shadow-[0_0_100px_rgba(0,0,0,1)]">

                {/* Dynamic noise background */}
                <motion.div
                    style={{ opacity }}
                    className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
                    animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                    <div className="w-full h-full bg-[url('/images/noise.png')] opacity-30" />
                </motion.div>

                <motion.div style={{ opacity, scale }} className="absolute inset-0 flex flex-col justify-center items-center p-4">
                    <div className="max-w-5xl text-center flex flex-col items-center">

                        {/* Line 1 - The Problem */}
                        <motion.div style={{ opacity: textOpacity1, x: glitchX }} className="mb-8">
                            <span className="text-[10px] md:text-sm font-black text-red-500 uppercase tracking-[0.5em] mb-4 block">System Warning</span>
                            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                                Your competitors are <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">out-publishing you.</span>
                            </h2>
                        </motion.div>

                        {/* Line 2 - The Agitation */}
                        <motion.div style={{ opacity: textOpacity2, y: glitchY }} className="mb-12">
                            <p className="text-xl md:text-4xl font-bold text-foreground/80 uppercase tracking-tight max-w-3xl mx-auto leading-tight">
                                Every day you wait is market share lost to inferior content. The algorithm favors volume and quality. <span className="text-white">You need both.</span>
                            </p>
                        </motion.div>

                        {/* Line 3 - The Resolution */}
                        <motion.div style={{ opacity: textOpacity3 }} className="p-8 border border-cyan-500/30 glass-card bg-cyan-950/20 rounded-3xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-cyan-500/10 blur-xl mix-blend-screen" />
                            <p className="text-2xl md:text-5xl font-black text-cyan-400 uppercase tracking-tighter relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                Stop fighting algorithms.<br />
                                <span className="text-white">Start dictating them.</span>
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Cyberpunk Grid Floor */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-cyan-950/20 to-transparent mask-gradient-v">
                    <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.1) 1px, transparent 1px)', backgroundSize: '100% 40px', transform: 'perspective(500px) rotateX(60deg)' }} />
                </div>
            </div>
        </section>
    );
}
