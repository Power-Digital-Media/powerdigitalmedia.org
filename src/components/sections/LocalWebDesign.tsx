"use client";

import { Zap, MapPin, PhoneCall, ArrowRight, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

const pillars = [
    {
        icon: <Zap className="w-6 h-6 text-amber-400" />,
        badge: "0.4s Instant Load",
        title: "Sub-Second Mobile Speed",
        description: "Hand-coded on Next.js so your website opens instantly on any iPhone or Android. No bloated templates, no spinny wheels, zero lost customers.",
        accent: "border-amber-500/20 hover:border-amber-500/40 bg-amber-500/[0.03]"
    },
    {
        icon: <MapPin className="w-6 h-6 text-cyan-400" />,
        badge: "Local 3-Pack Rank",
        title: "Google Map Pack Dominance",
        description: "Engineered with localized schema markup so you show up top when homeowners and businesses search in Jackson, Madison, Brandon, Pearl, and Clinton.",
        accent: "border-cyan-500/20 hover:border-cyan-500/40 bg-cyan-500/[0.03]"
    },
    {
        icon: <PhoneCall className="w-6 h-6 text-emerald-400" />,
        badge: "Direct Calls & Leads",
        title: "High-Converting Money Paths",
        description: "Frictionless tap-to-call buttons, instant quote forms, and direct text routes that make it effortless for high-intent clients to hire you.",
        accent: "border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-500/[0.03]"
    }
];

export default function LocalWebDesign() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Seamless transition from the dark portfolio section */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0b1120] to-transparent pointer-events-none z-0" />

            <div className="container relative z-10 px-6 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-5">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-amber-400 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
                            Built For Central Mississippi Businesses
                        </span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase leading-tight text-white">
                        Built to Dominate: <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400">
                            The 3 Growth Pillars
                        </span>
                    </h2>
                    <p className="text-base md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                        Your website should be your hardest-working salesperson. We engineer custom web platforms for Mississippi contractors and business owners that load in a blink, dominate local Google Maps, and turn visitors into booked jobs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.title}
                            className={`p-8 rounded-3xl border ${pillar.accent} transition-all duration-300 group flex flex-col justify-between backdrop-blur-sm`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        {pillar.icon}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                        {pillar.badge}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">
                                    {pillar.title}
                                </h3>
                                <p className="text-slate-300/80 leading-relaxed text-sm">
                                    {pillar.description}
                                </p>
                            </div>
                            
                            <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-slate-400">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>Proven Mississippi client results</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/free-audit"
                        prefetch={false}
                        className="group flex items-center justify-center gap-3 px-10 py-4 font-bold text-slate-950 transition-all bg-white rounded-full hover:bg-amber-400 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(251,191,36,0.2)] text-xs uppercase tracking-wider"
                    >
                        Get a Free Website Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                        href="tel:6014462393"
                        className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-white/90 border border-white/15 rounded-full hover:bg-white/10 transition-all text-xs uppercase tracking-wider"
                    >
                        Call (601) 446-2393
                    </a>
                </div>
            </div>

            {/* Decorative Ambient Gradients */}
            <div className="absolute top-1/2 left-1/4 w-[30rem] h-[30rem] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -z-10 -translate-y-1/2" />
            <div className="absolute top-1/2 right-1/4 w-[30rem] h-[30rem] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10 -translate-y-1/2" />
        </section>
    );
}
