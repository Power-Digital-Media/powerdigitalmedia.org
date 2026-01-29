"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const mainGear = [
    {
        name: "RØDECaster Pro II",
        type: "The Heart",
        description: "Studio-Grade Audio Chain. Revolutionary audio production studio with ultra-low-noise Revolution Preamps™ and world-class APHEX® processing.",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
        specs: ["Dual USB-C interfaces", "Advanced APHEX processing", "Individually customizable pads"]
    },
    {
        name: "Blackmagic Design",
        type: "The Eye",
        description: "Cinematic Visual Integrity. Blackmagic Pocket Cinema Cameras paired with high-end glass to ensure that 'Big Studio' aesthetic in every frame.",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
        specs: ["4K DCI Recording", "13 Stops of Dynamic Range", "Multi-Cam Color Matching"]
    }
];

export default function TechStack() {
    return (
        <section id="studio" className="relative py-28 md:py-48 overflow-hidden bg-background">
            <div className="container relative z-10 px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center mb-24 md:mb-40"
                >
                    <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block">Infrastructure</span>
                    <h2 className="text-4xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-none">Precision Implements.</h2>
                    <p className="text-base md:text-2xl text-foreground/70 leading-relaxed text-balance font-light">
                        We don&apos;t just hit record. We use world-class signal chains and broadcast-grade equipment to ensure your message is felt, not just heard.
                    </p>
                </motion.div>

                <div className="space-y-40">
                    {mainGear.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-16 items-center`}
                        >
                            <div className="flex-1 w-full h-[500px] relative rounded-3xl overflow-hidden glass-card">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                            </div>
                            <div className="flex-1 max-w-xl">
                                <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">{item.type}</span>
                                <h3 className="text-3xl md:text-5xl font-bold mb-6">{item.name}</h3>
                                <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                                    {item.description}
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {item.specs.map((spec) => (
                                        <li key={spec} className="flex items-center gap-2 text-sm font-medium text-foreground/60 border-l border-accent/30 pl-4 py-1">
                                            {spec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-40 p-12 rounded-[32px] glass-card border-accent/10 bg-accent/[0.02] text-center max-w-4xl mx-auto">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8 border border-accent/20">
                        <Zap className="w-8 h-8 text-accent" />
                    </div>
                    <h4 className="text-2xl font-bold mb-4">Studio-Ready Guarantee</h4>
                    <p className="text-foreground/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                        Every session is backed by redundant recording paths and UPS power systems. Your production integrity is our highest priority.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-accent font-bold hover:gap-4 transition-all">
                        Tour the Studio <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
        </section>
    );
}

