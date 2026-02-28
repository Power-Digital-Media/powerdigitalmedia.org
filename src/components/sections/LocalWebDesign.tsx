"use client";

import { Globe, Search, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

const pillars = [
    {
        icon: <Globe className="w-6 h-6 text-cyan-400" />,
        title: "Instant LCP",
        description: "Sub-second load times that keep visitors on the page and force Google to rank you higher.",
    },
    {
        icon: <Search className="w-6 h-6 text-blue-400" />,
        title: "Agentic SEO",
        description: "We structure JSON-LD and semantic data so AI tools like ChatGPT and Perplexity can recommend your business.",
    },
    {
        icon: <Cpu className="w-6 h-6 text-indigo-400" />,
        title: "High-Performance CSS",
        description: "No bloated themes. Just raw, hand-coded React architecture that scores 99/100 on PageSpeed Insights.",
    }
];

export default function LocalWebDesign() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Seamless transition from the dark portfolio section */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#020617] to-transparent pointer-events-none z-0" />

            <div className="container relative z-10 px-6 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                    <span
                        className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block"
                    >
                        Central Mississippi & Beyond
                    </span>
                    <h2
                        className="text-3xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-tight"
                    >
                        Built for 2026: <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">The Machine-Readable Web</span>
                    </h2>
                    <p
                        className="text-base md:text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto"
                    >
                        Your digital storefront needs to do more than look good—it needs to guide AI agents and convert traffic instantly. We engineer premium, lightning-fast web architecture for elite brands across Central Mississippi.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {pillars.map((pillar, index) => (
                        <div
                            key={pillar.title}
                            className="p-8 rounded-3xl glass-card border-none bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
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
                        </div>
                    ))}
                </div>

                <div
                    className="flex justify-center"
                >
                    <Link
                        href="/contact"
                        className="group flex items-center gap-3 px-10 py-4 font-bold text-white transition-all bg-accent rounded-full border-glow hover:bg-accent/90 hover:scale-105 active:scale-95"
                    >
                        Start Your Build <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Decorative Gradients */}
            <div className="absolute top-1/2 left-1/4 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10 -translate-y-1/2" />
            <div className="absolute top-1/2 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10 -translate-y-1/2" />
        </section>
    );
}
