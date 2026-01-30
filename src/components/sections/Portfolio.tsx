"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ThreeDCarousel from "../ui/ThreeDCarousel";
import BookingModal from "../ui/BookingModal";

import { projects } from "@/data/projects";

export default function Portfolio() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <section id="portfolio" className="relative min-h-screen flex flex-col items-center justify-center pt-12 pb-8 md:pt-16 md:pb-12 overflow-hidden bg-background">
            {/* --- Hero Background Layer --- */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.png"
                    alt="Power Digital Media Studio"
                    fill
                    className="object-cover opacity-40 scale-105 transition-transform duration-[20s]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
                <div className="absolute inset-0 cyber-grid opacity-20" />
            </div>

            <div className="container relative z-10 px-4 mx-auto text-center">
                {/* --- Headline Merger --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto mb-6 md:mb-10"
                >
                    <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[8px] md:text-[9px] mb-4 md:mb-6 block">Premium Digital Infrastructure</span>
                    <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-[0.85] uppercase">
                        Digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-glow-cyan text-glow">
                            Architecture.
                        </span>
                    </h1>
                    <p className="text-base md:text-xl text-foreground font-medium tracking-tight opacity-70 max-w-2xl mx-auto text-balance font-light px-6">
                        We don&apos;t build websites. We deploy <span className="text-white font-medium">high-velocity digital engines</span> engineered for prestige and engineered for dominance.
                    </p>
                </motion.div>

                {/* --- The Showpiece --- */}
                <div className="relative z-10 -my-2 md:my-4">
                    <ThreeDCarousel />
                </div>

                {/* --- Hero CTAs Merger --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 mt-6 md:mt-10"
                >
                    <button
                        onClick={() => setIsBookingOpen(true)}
                        className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 bg-white text-black font-black rounded-full hover:bg-cyan-400 hover:text-white transition-all uppercase tracking-widest text-[9px] shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95 text-center"
                    >
                        Initialize Build
                    </button>
                    <Link href="#services" className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 md:px-12 md:py-5 border border-white/10 rounded-full font-black uppercase tracking-widest text-[9px] hover:bg-white/5 hover:border-white/20 transition-all group active:scale-95">
                        View Protocols <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            {/* Global Decorative Lights */}
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </section>
    );
}
