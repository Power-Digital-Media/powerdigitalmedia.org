"use client";

import { Zap, MapPin, PhoneCall, ArrowRight } from "lucide-react";
import Link from "next/link";

const pillars = [
    {
        icon: <Zap className="w-6 h-6 text-cyan-400" />,
        title: "Sub-Second Mobile Speed",
        description: "Hand-coded on Next.js to open in under 0.5 seconds on any cell phone. Zero bloated templates, zero broken plugins.",
    },
    {
        icon: <MapPin className="w-6 h-6 text-blue-400" />,
        title: "Google Map Pack Dominance",
        description: "Engineered with localized schema so you appear at the top of Google Maps when customers search in Jackson, Madison, Brandon, or Clinton.",
    },
    {
        icon: <PhoneCall className="w-6 h-6 text-amber-400" />,
        title: "High-Converting Money Paths",
        description: "Frictionless quote forms, instant call routing, and interactive calculators designed to turn casual visitors into paying customers.",
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
                        className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[9px] md:text-xs mb-4 block"
                    >
                        Built For Central Mississippi Businesses
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-tight"
                    >
                        Built to Dominate: <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                            The 3 Growth Pillars
                        </span>
                    </h2>
                    <p
                        className="text-base md:text-xl text-foreground/75 leading-relaxed max-w-3xl mx-auto"
                    >
                        Your website should be your #1 salesperson. We engineer custom web platforms for Mississippi businesses that load instantly, command local search rankings, and convert traffic into booked jobs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.title}
                            className="p-8 rounded-3xl glass-card border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-300 group flex flex-col"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {pillar.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-white">
                                {pillar.title}
                            </h3>
                            <p className="text-foreground/70 leading-relaxed text-sm">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/free-audit"
                        prefetch={false}
                        className="group flex items-center justify-center gap-3 px-10 py-4 font-bold text-slate-950 transition-all bg-white rounded-full hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] text-xs uppercase tracking-wider"
                    >
                        Get a Free Website Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                        href="tel:6013002004"
                        className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-white/90 border border-white/15 rounded-full hover:bg-white/10 transition-all text-xs uppercase tracking-wider"
                    >
                        Call (601) 300-2004
                    </a>
                </div>
            </div>

            {/* Decorative Gradients */}
            <div className="absolute top-1/2 left-1/4 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10 -translate-y-1/2" />
            <div className="absolute top-1/2 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10 -translate-y-1/2" />
        </section>
    );
}
