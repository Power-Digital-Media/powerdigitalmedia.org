"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function DashboardProof() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax values for different layers
    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [200, -200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [10, -5]);
    const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

    return (
        <div ref={containerRef} className="hidden md:flex absolute inset-0 w-full h-full items-center justify-start overflow-hidden perspective-1000">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

            {/* --- DESKTOP 3D PARALLAX SHOWCASE --- */}
            <m.div
                style={{ rotateX, rotateY }}
                className="hidden md:flex relative w-full h-full min-w-[1200px] -ml-20 transform-style-3d items-center"
            >
                {/* Layer 1: Deep Background (GSC visual noise) */}
                <m.div
                    style={{ y: y3, z: -150 }}
                    className="absolute top-[5%] -left-[5%] w-[500px] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 opacity-60 glass-card"
                >
                    <Image src="/images/proof/Growth Proof/1.webp" alt="Google Search Console Overview" fill className="object-cover" />
                </m.div>

                <m.div
                    style={{ y: y3, z: -200 }}
                    className="absolute bottom-[5%] left-[40%] w-[450px] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 opacity-40 glass-card"
                >
                    <Image src="/images/proof/Growth Proof/2.webp" alt="Google Search Console Insights" fill className="object-cover" />
                </m.div>

                {/* Layer 2: Midground (GA4 Home & Growth) */}
                <m.div
                    style={{ y: y1, z: -50 }}
                    className="absolute top-[15%] left-[20%] w-[600px] aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)] border border-blue-500/20 opacity-80 glass-card"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 z-20" />
                    <Image src="/images/proof/Growth Proof/3.webp" alt="Google Analytics Dashboard" fill className="object-cover" />
                </m.div>

                {/* Layer 3: Foreground Main Stars (GSC Performance Graph & GA4 Snapshot w/ 35m engagement) */}
                <m.div
                    initial={{ opacity: 0, scale: 0.9, x: -50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    style={{ y: y2, z: 50 }}
                    className="absolute top-[35%] -left-[10%] w-[650px] aspect-video rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.3)] border border-purple-500/30 glass-card"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-fuchsia-400 z-20" />
                    <Image src="/images/proof/Growth Proof/4.webp" alt="Google Search Console Performance 6.7K" fill className="object-cover" />
                </m.div>

                <m.div
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    viewport={{ once: true, margin: "-100px" }}
                    style={{ y: y2, z: 100 }}
                    className="absolute bottom-[5%] left-[10%] w-[800px] aspect-video rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)] border border-accent/40 glass-card group"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-blue-500 z-20" />
                    <Image src="/images/proof/Growth Proof/5.webp" alt="Google Analytics Engagement 35m" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />

                    {/* Floating callout for the insane engagement time */}
                    <div className="absolute -right-4 -top-4 bg-slate-950/90 backdrop-blur-md border border-accent text-accent px-6 py-3 rounded-xl text-sm md:text-md font-black tracking-widest uppercase shadow-[0_0_40px_rgba(34,211,238,0.4)] z-30 animate-pulse">
                        35m 12s Avg. Engagement
                    </div>
                </m.div>
            </m.div>
        </div>
    );
}
