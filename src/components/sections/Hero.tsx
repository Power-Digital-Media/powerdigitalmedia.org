"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-between py-24 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.webp"
                    alt="Power Digital Media Studio"
                    fill
                    className="object-cover opacity-60 scale-100"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
            </div>

            <div className="container relative z-10 px-4 mx-auto text-center mt-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl mx-auto"
                >
                    <h1 className="mb-8 text-6xl font-bold tracking-tight md:text-8xl lg:text-9xl text-balance leading-[0.9]">
                        Message <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 text-glow">
                            Redefined.
                        </span>
                    </h1>

                    <p className="mb-12 text-xl md:text-2xl text-foreground font-medium tracking-tight opacity-90 max-w-2xl mx-auto text-balance">
                        The elite standard for podcasting, content strategy, and digital prestige.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row mb-12">
                        <Link href="/contact" className="group px-12 py-5 font-bold text-white transition-all bg-accent rounded-full border-glow hover:bg-accent/90 hover:scale-105 active:scale-95">
                            Start My Show
                        </Link>
                        <Link href="/our-work" className="px-12 py-5 font-bold transition-all border border-white/20 rounded-full backdrop-blur-md hover:bg-white/10 hover:border-white/40 active:scale-95">
                            Watch Showreel
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="relative z-10 mt-auto flex flex-col items-center gap-4 text-muted-foreground/60"
            >
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Discover Excellence</span>
                <div className="w-px h-24 bg-gradient-to-b from-accent to-transparent" />
            </motion.div>

            {/* Decorative Lights */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[160px] pointer-events-none opacity-50" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[160px] pointer-events-none opacity-50" />
        </section>
    );
}
