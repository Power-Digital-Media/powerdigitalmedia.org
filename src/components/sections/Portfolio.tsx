"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ThreeDCarousel from "../ui/ThreeDCarousel";

import { projects } from "@/data/projects";

export default function Portfolio() {
    return (
        <section id="portfolio" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-background">
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
                    className="max-w-5xl mx-auto mb-24 md:mb-32"
                >
                    <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[8px] md:text-[10px] mb-4 md:mb-6 block">Engineered Dominance</span>
                    <h1 className="text-5xl md:text-9xl font-black mb-6 md:mb-8 tracking-tighter leading-[0.85] uppercase">
                        Message <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-glow-cyan text-glow">
                            Redefined.
                        </span>
                    </h1>
                    <p className="text-lg md:text-2xl text-foreground font-medium tracking-tight opacity-70 max-w-2xl mx-auto text-balance font-light px-4">
                        The elite standard for high-prestige content strategy and digital engineering.
                    </p>
                </motion.div>

                {/* --- The Showpiece --- */}
                <div className="relative z-10 my-4 md:my-10">
                    <ThreeDCarousel />
                </div>

                {/* --- Hero CTAs Merger --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 mt-24 md:mt-32"
                >
                    <Link href="/contact" className="w-full sm:w-auto px-10 py-5 md:px-14 md:py-6 bg-white text-black font-black rounded-full hover:bg-cyan-400 hover:text-white transition-all uppercase tracking-widest text-[10px] shadow-[0_0_50px_rgba(255,255,255,0.15)] active:scale-95 text-center">
                        Start My Show
                    </Link>
                    <Link href="/our-work" className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 md:px-14 md:py-6 border border-white/10 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white/5 hover:border-white/20 transition-all group active:scale-95">
                        Watch Showreel <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            {/* Global Decorative Lights */}
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
        </section>
    );
}
