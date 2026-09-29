"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
    Smartphone, 
    Globe, 
    MapPin, 
    MessageSquare, 
    CheckCircle2, 
    Zap, 
    ShieldCheck, 
    Sparkles, 
    ExternalLink,
    ChevronRight,
    Search,
    Star,
    type LucideIcon
} from "lucide-react";

interface StepData {
    id: string;
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    imageAlt: string;
    aspectRatio: string;
    callouts: {
        title: string;
        desc: string;
        icon: LucideIcon;
        tagColor: string;
    }[];
    metrics: { label: string; value: string }[];
}

const STEPS: StepData[] = [
    {
        id: "mobile-app",
        badge: "Step 1 • Field Mobile App",
        title: "In-Van 1-Tap Workflow",
        subtitle: "Zero-friction job logging on any phone or tablet",
        description: "Your HVAC technician finishes a replacement in Madison, MS. They open the lightweight mobile web app, auto-lock GPS telemetry, snap before/after equipment photos, and tap Drop Pin in under 30 seconds.",
        image: "/portfolio/pindrop-demo-mobile-app.webp",
        imageAlt: "PinDrop Mobile Web App Demo for Magnolia State Air",
        aspectRatio: "aspect-[440/900]",
        callouts: [
            {
                title: "Auto-GPS Satellite Geocoding",
                desc: "Locks exact latitude/longitude coordinates (±4ft) in Annandale, Madison, MS without tech typing.",
                icon: MapPin,
                tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-950/30"
            },
            {
                title: "EXIF Before/After Tagging",
                desc: "Embeds timestamps and job metadata into R-22 failure vs. Trane 16 SEER2 heat pump photos.",
                icon: Smartphone,
                tagColor: "text-amber-400 border-amber-500/30 bg-amber-950/30"
            },
            {
                title: "Instant 0.1s Cloud Sync",
                desc: "1 tap transmits job payload to your Next.js site to generate SEO pages and dispatch SMS review requests.",
                icon: Zap,
                tagColor: "text-green-400 border-green-500/30 bg-green-950/30"
            }
        ],
        metrics: [
            { label: "Tech Time Required", value: "< 30 Sec" },
            { label: "GPS Accuracy", value: "±4 Feet" },
            { label: "App Training Time", value: "0 Minutes" }
        ]
    },
    {
        id: "seo-page",
        badge: "Step 2 • Dynamic SEO Landing Page",
        title: "Instant Google Ranking Page",
        subtitle: "Machine-generated local project page with Schema.org",
        description: "The instant the pin is dropped, PinDrop automatically publishes an indexable, search-optimized project showcase page with Google LocalBusiness JSON-LD schema, photo gallery, and neighborhood estimate form.",
        image: "/portfolio/pindrop-demo-seo-page.webp",
        imageAlt: "PinDrop Auto-Generated SEO Project Page Demo",
        aspectRatio: "aspect-[1024/640]",
        callouts: [
            {
                title: "Hyper-Local SEO Slug",
                desc: "Auto-generates clean URLs like /projects/madison-ms-trane-heat-pump-replacement targeting exact buyer keywords.",
                icon: Globe,
                tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-950/30"
            },
            {
                title: "Google LocalBusiness JSON-LD",
                desc: "Machine-readable geo-coordinates and service taxonomy feed Google's Map Pack crawler automatically.",
                icon: Search,
                tagColor: "text-amber-400 border-amber-500/30 bg-amber-950/30"
            },
            {
                title: "Neighborhood Conversion Funnel",
                desc: "Custom quote form captures nearby neighbors searching for Madison & Ridgeland AC repair.",
                icon: CheckCircle2,
                tagColor: "text-green-400 border-green-500/30 bg-green-950/30"
            }
        ],
        metrics: [
            { label: "Page Generation Time", value: "0.1s" },
            { label: "Google Schema Status", value: "100% Valid" },
            { label: "SEO Speed Score", value: "98/100" }
        ]
    },
    {
        id: "map-carousel",
        badge: "Step 3 • Live Map & Homepage Carousel",
        title: "Central MS Interactive Proof",
        subtitle: "Dynamic project radar map & recent work carousel",
        description: "Prospective customers can explore real completed jobs across Madison, Brandon, Flowood, and Jackson. Plus, the homepage work carousel updates in real time with zero manual code edits.",
        image: "/portfolio/pindrop-demo-map-carousel.webp",
        imageAlt: "PinDrop Live Central MS Project Map and Work Carousel Demo",
        aspectRatio: "aspect-[1024/640]",
        callouts: [
            {
                title: "Interactive Central MS Pins",
                desc: "Homeowners click active pin clusters to inspect verified installations and repairs in their specific neighborhood.",
                icon: MapPin,
                tagColor: "text-yellow-400 border-yellow-500/30 bg-yellow-950/30"
            },
            {
                title: "Live Homepage Work Ticker",
                desc: "Demonstrates non-stop company momentum and fresh job completions without updating static web pages.",
                icon: Sparkles,
                tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-950/30"
            },
            {
                title: "Irrefutable Local Authority",
                desc: "Outclasses competitors with static 5-year-old stock photo websites by showing continuous daily field proof.",
                icon: ShieldCheck,
                tagColor: "text-green-400 border-green-500/30 bg-green-950/30"
            }
        ],
        metrics: [
            { label: "Active Field Pins", value: "64+ Jackson Metro" },
            { label: "Homepage Sync", value: "Instantaneous" },
            { label: "Conversion Lift", value: "+38% Avg" }
        ]
    },
    {
        id: "sms-review",
        badge: "Step 4 • Automated 5-Star SMS Machine",
        title: "Automated Review Velocity",
        subtitle: "1-tap Google Review requests sent 15 mins post-job",
        description: "While the homeowner is feeling the ice-cold air conditioning and happiest with the technician's work, PinDrop automatically triggers a personalized SMS with a direct 1-tap Google Review link.",
        image: "/portfolio/pindrop-demo-sms-review.webp",
        imageAlt: "PinDrop Automated SMS Review Flow Demo for Magnolia State Air",
        aspectRatio: "aspect-[440/750]",
        callouts: [
            {
                title: "15-Minute Peak Joy Dispatch",
                desc: "Automatically fires via SMS webhook before the technician's van even reaches the next county.",
                icon: MessageSquare,
                tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-950/30"
            },
            {
                title: "1-Tap Direct Review Link",
                desc: "Bypasses search friction and opens the Google 5-star rating modal directly on the homeowner's phone.",
                icon: Star,
                tagColor: "text-amber-400 border-amber-500/30 bg-amber-950/30"
            },
            {
                title: "Hands-Free Office Workflow",
                desc: "No chasing invoices or begging for reviews over email. 100% automated field-to-Google pipeline.",
                icon: Zap,
                tagColor: "text-green-400 border-green-500/30 bg-green-950/30"
            }
        ],
        metrics: [
            { label: "SMS Open Rate", value: "88%" },
            { label: "Review Conversion", value: "74% of Jobs" },
            { label: "Staff Time Needed", value: "0 Minutes" }
        ]
    }
];

export default function PinDropDemoExplorer() {
    const [activeTab, setActiveTab] = useState<number>(0);
    const currentStep = STEPS[activeTab];

    return (
        <div className="w-full">
            {/* Simulation Header Banner */}
            <div className="mb-10 rounded-2xl border border-yellow-500/30 bg-gradient-to-r from-yellow-950/40 via-amber-950/20 to-slate-950 p-4 md:p-6 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center shrink-0">
                        <Zap className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-xs uppercase font-extrabold tracking-wider text-yellow-400">
                                ⚡ Live Interactive Sandbox Demo
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-yellow-400/20 text-yellow-300 border border-yellow-400/40">
                                SIMULATION
                            </span>
                        </div>
                        <p className="text-xs text-white/70 mt-1">
                            Simulated workflow featuring mock contractor <strong>&ldquo;Magnolia State Air &amp; Heating&rdquo;</strong> in Madison, MS demonstrating the complete PinDrop™ field-to-Google automation engine.
                        </p>
                    </div>
                </div>
                <div className="shrink-0 font-mono text-[11px] text-yellow-400/80 bg-black/40 px-3 py-1.5 rounded-lg border border-yellow-500/20">
                    Step {activeTab + 1} of 4 Active
                </div>
            </div>

            {/* Tab Navigation Pill Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-10">
                {STEPS.map((step, idx) => {
                    const isActive = activeTab === idx;
                    return (
                        <button
                            key={step.id}
                            onClick={() => setActiveTab(idx)}
                            className={`relative text-left p-4 rounded-2xl transition-all border ${
                                isActive 
                                    ? "bg-slate-900 border-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.15)] ring-1 ring-yellow-400/40" 
                                    : "bg-slate-950/60 border-white/10 hover:border-white/20 hover:bg-slate-900/40"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-[10px] font-mono font-extrabold uppercase tracking-wider ${
                                    isActive ? "text-yellow-400" : "text-white/40"
                                }`}>
                                    Stage 0{idx + 1}
                                </span>
                                {isActive && (
                                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                                )}
                            </div>
                            <div className={`text-xs md:text-sm font-black uppercase tracking-tight line-clamp-1 ${
                                isActive ? "text-white" : "text-white/70"
                            }`}>
                                {step.title}
                            </div>
                            <div className="text-[11px] text-white/40 truncate mt-0.5">
                                {step.subtitle}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Main Stage Display Card */}
            <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-6 md:p-10 relative overflow-hidden backdrop-blur-md">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Left Column: Explanations & Visual Callouts (6/12 or 7/12) */}
                    <div className="lg:col-span-6 flex flex-col justify-between order-2 lg:order-1 text-left">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-950/30 text-yellow-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                                <Zap className="w-3.5 h-3.5" />
                                {currentStep.badge}
                            </div>

                            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-3 leading-tight">
                                {currentStep.title}
                            </h3>
                            <p className="text-sm md:text-base text-white/70 leading-relaxed mb-6">
                                {currentStep.description}
                            </p>

                            {/* Hotspot Callouts */}
                            <div className="space-y-3.5 mb-8">
                                {currentStep.callouts.map((callout, cIdx) => {
                                    const IconComponent = callout.icon;
                                    return (
                                        <div 
                                            key={cIdx} 
                                            className="p-3.5 rounded-2xl bg-slate-900/70 border border-white/10 flex items-start gap-3.5 hover:border-white/20 transition-colors"
                                        >
                                            <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${callout.tagColor}`}>
                                                <IconComponent className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs md:text-sm font-black uppercase tracking-tight text-white mb-1">
                                                    {callout.title}
                                                </h4>
                                                <p className="text-xs text-white/60 leading-relaxed">
                                                    {callout.desc}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Bottom Metrics Ticker */}
                        <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-3">
                            {currentStep.metrics.map((m, mIdx) => (
                                <div key={mIdx} className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                                    <div className="text-[10px] font-mono uppercase text-white/40 truncate">{m.label}</div>
                                    <div className="text-sm md:text-base font-black text-yellow-400 mt-0.5">{m.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: High-Res Mockup Display (6/12) */}
                    <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
                        <div className="relative w-full max-w-[480px] group">
                            {/* Ambient Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 via-cyan-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

                            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-slate-950 shadow-2xl">
                                <Image
                                    src={currentStep.image}
                                    alt={currentStep.imageAlt}
                                    width={currentStep.id.includes("mobile") || currentStep.id.includes("sms") ? 440 : 1024}
                                    height={currentStep.id.includes("mobile") || currentStep.id.includes("sms") ? 900 : 640}
                                    className="w-full h-auto object-contain rounded-2xl"
                                    priority
                                />
                            </div>

                            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-white/40 px-2">
                                <span>⚡ Magnolia State Air • Madison, MS</span>
                                <span className="text-cyan-400">Sandbox Preview</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Stage Progression Buttons */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <button
                        onClick={() => setActiveTab((prev) => (prev > 0 ? prev - 1 : STEPS.length - 1))}
                        className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-white/60 hover:text-white hover:border-white/30 transition-colors"
                    >
                        ← Previous Stage
                    </button>
                    <div className="flex gap-1.5">
                        {STEPS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTab(i)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    activeTab === i ? "w-6 bg-yellow-400" : "bg-white/20 hover:bg-white/40"
                                }`}
                                aria-label={`Go to stage ${i + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={() => setActiveTab((prev) => (prev < STEPS.length - 1 ? prev + 1 : 0))}
                        className="px-5 py-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xs font-mono font-extrabold uppercase transition-all flex items-center gap-1.5"
                    >
                        <span>Next Stage</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
