"use client";

import { m } from "framer-motion";
import { Globe, Search, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

const pillars = [
    {
        icon: <Globe className="w-6 h-6 text-cyan-400" />,
        title: "Mobile-First & Blazing Fast",
        description: "We build completely custom solutions, never generic, sluggish templates. Your site is engineered to load instantly and perform flawlessly on every device.",
    },
    {
        icon: <Search className="w-6 h-6 text-blue-400" />,
        title: "Local SEO Dominance",
        description: "We optimize your digital architecture to outrank competitors specifically in Jackson, Madison, Brandon, Vicksburg, Yazoo City, and across Mississippi.",
    },
    {
        icon: <Cpu className="w-6 h-6 text-indigo-400" />,
        title: "Enterprise-Grade Technology",
        description: "We custom-code your platform using React and Next.js—the exact stack powering Netflix. Deployed on Netlify's Global Edge Network for blistering speed.",
    }
];

export default function LocalWebDesign() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            <div className="container relative z-10 px-6 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                    <m.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block"
                    >
                        Central Mississippi & Beyond
                    </m.span>
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-tight"
                    >
                        High-Conversion Web Design <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">for Jackson & Madison</span>
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto"
                    >
                        Your digital storefront needs to do more than look good—it needs to dominate search and convert traffic. We engineer premium, lightning-fast web architecture for elite brands across Central Mississippi.
                    </m.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {pillars.map((pillar, index) => (
                        <m.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            className="p-8 rounded-3xl glass-card border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {pillar.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-white">
                                {pillar.title}
                            </h3>
                            <p className="text-foreground/60 leading-relaxed text-sm">
                                {pillar.description}
                            </p>
                        </m.div>
                    ))}
                </div>

                <m.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center"
                >
                    <Link
                        href="/contact"
                        className="group flex items-center gap-3 px-10 py-4 font-bold text-white transition-all bg-accent rounded-full border-glow hover:bg-accent/90 hover:scale-105 active:scale-95"
                    >
                        Start Your Build <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </m.div>
            </div>

            {/* Decorative Gradients */}
            <div className="absolute top-1/2 left-1/4 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10 -translate-y-1/2" />
            <div className="absolute top-1/2 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10 -translate-y-1/2" />
        </section>
    );
}
