"use client";

import { Zap, MapPin, PhoneCall, ArrowRight, CheckCircle2, Sparkles, Cpu, Layers } from "lucide-react";
import Link from "next/link";

const pillars = [
    {
        icon: <Zap className="w-6 h-6 text-amber-400" />,
        badge: "Square SDK & In-App Carts",
        title: "In-App Checkout & Commerce",
        description: "Native Square Web SDK tokenization, interactive Cajun menus, and custom quote calculators. Customers customize items or bulk catering and pay in-app with zero clunky third-party redirects.",
        accent: "border-amber-500/20 hover:border-amber-500/40 bg-amber-500/[0.03]",
        tag: "Square Web Payments • Custom Cart Engine"
    },
    {
        icon: <MapPin className="w-6 h-6 text-cyan-400" />,
        badge: "PinDrop™ GPS & Local 3-Pack",
        title: "PinDrop™ Field Tech & Map Rank",
        description: "Field crews snap a jobsite photo and drop a GPS pin with 1 tap. Instantly updates your live website map, syncs localized JSON-LD geo-schema to Google, and texts homeowners for instant 5-star reviews.",
        accent: "border-cyan-500/20 hover:border-cyan-500/40 bg-cyan-500/[0.03]",
        tag: "GPS Jobsite Pins • 5-Star SMS Review Triggers"
    },
    {
        icon: <PhoneCall className="w-6 h-6 text-emerald-400" />,
        badge: "Capsule CRM & Automated Drips",
        title: "Automated CRM & Lead Pipelines",
        description: "Every quote request, phone click, and estimate inquiry instantly syncs with Capsule CRM and triggers Transpond SMS/email follow-up drips. 100% of leads contacted in under 2 minutes with zero manual data entry.",
        accent: "border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-500/[0.03]",
        tag: "Instant SMS Alerts • 2-Min Lead Response"
    }
];

export default function LocalWebDesign() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-[#060b17] border-t border-white/5">
            {/* Seamless ambient glow */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0b1120] to-transparent pointer-events-none z-0" />

            <div className="container relative z-10 px-6 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-amber-400 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
                            Engineered For Mississippi Businesses
                        </span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase leading-tight text-white">
                        Built to Dominate: <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400">
                            3 Growth Engines Built For You
                        </span>
                    </h2>
                    <p className="text-base md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                        We don&apos;t build generic static brochures. We engineer custom software engines that take orders, drop live jobsite pins, and automatically route high-ticket leads straight to your phone.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.title}
                            className={`p-8 rounded-3xl border ${pillar.accent} transition-all duration-300 group flex flex-col justify-between backdrop-blur-sm bg-slate-900/40`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        {pillar.icon}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                                        {pillar.badge}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black mb-3 text-white uppercase tracking-tight">
                                    {pillar.title}
                                </h3>
                                <p className="text-slate-300 leading-relaxed text-sm">
                                    {pillar.description}
                                </p>
                            </div>
                            
                            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono font-semibold text-slate-400">
                                <span className="text-cyan-400 text-[11px] font-bold">{pillar.tag}</span>
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
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
                        Get Free 5-Minute Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
