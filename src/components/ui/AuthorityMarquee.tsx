"use client";

import { motion } from "framer-motion";

const marqueeData = [
    "500M+ VIRAL IMPRESSIONS GENERATED",
    "12 SHOWS IN THE TOP 100",
    "0 COMPROMISES",
    "BROADCAST QUALITY GUARANTEED",
    "100M+ HOURS WATCHED",
    "ALGORITHM DOMINATION"
];

export default function AuthorityMarquee() {
    return (
        <div className="w-full bg-slate-950/40 border-y border-cyan-500/10 py-5 overflow-hidden relative z-20 flex items-center shadow-[0_0_30px_rgba(34,211,238,0.05)_inset]">
            {/* Gradients for smooth fading on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex whitespace-nowrap gap-12 items-center"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            >
                {/* Map multiple times to ensure seamless looping */}
                {[...Array(4)].map((_, arrayIndex) => (
                    <div key={`group-${arrayIndex}`} className="flex gap-12 items-center">
                        {marqueeData.map((text, i) => (
                            <div key={`item-${arrayIndex}-${i}`} className="flex items-center gap-12">
                                <span className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-cyan-50/40 drop-shadow-sm">
                                    {text}
                                </span>
                                <span className="text-cyan-500/30 font-black animate-pulse">//</span>
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
