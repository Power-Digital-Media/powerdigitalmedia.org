"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Radio } from "lucide-react";

export default function PodcastingCommandBar() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Show after scrolling past the hero (approx 80vh)
        if (latest > window.innerHeight * 0.8) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    });

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90%] md:max-w-2xl"
                >
                    <div className="glass-card rounded-full p-2 md:p-3 border-cyan-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(34,211,238,0.2)] flex items-center justify-between gap-4 bg-slate-950/90 backdrop-blur-xl">

                        <div className="flex items-center gap-3 pl-4">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest block leading-tight">Studio Capacity</span>
                                <span className="text-xs font-black text-white uppercase tracking-tight">2 Slots Remaining <span className="text-red-400">For Q2</span></span>
                            </div>
                            <div className="sm:hidden text-xs font-bold text-foreground/80 uppercase tracking-widest">
                                <span className="text-white">2 Slots</span> Left
                            </div>
                        </div>

                        <Link
                            href="#pricing"
                            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs transition-all flex items-center gap-2 group hover:shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <Radio className="w-4 h-4 group-hover:animate-pulse" />
                            Initialize Protocol
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
