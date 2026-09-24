"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowUpRight, ShieldCheck, Zap, Heart, TrendingUp, Sparkles, Activity } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { projects, Project } from "@/data/projects";

const BookingModal = dynamic(() => import("../ui/BookingModal"), { ssr: false });

// Type definition for visual metric overlays mapping directly to Jackson MS projects
interface BentoMetric {
    stat: string;
    statLabel: string;
    highlights: string[];
    icon: React.ReactNode;
    techStack: string[];
}

const bentoMetricsMap: Record<string, BentoMetric> = {
    "born-again-roofing": {
        stat: "99+",
        statLabel: "Live Pin Drops",
        highlights: ["Proprietary PinDrop™ mapping", "Automatic GPS neighborhood sync", "1-Tap client SMS reviews"],
        icon: <Zap className="w-5 h-5 text-yellow-400" />,
        techStack: ["Next.js App Router", "PinDrop™ Engine", "Google Geo-Schema"]
    },
    "tbeaux": {
        stat: "100%",
        statLabel: "Daily Boil Sync",
        highlights: ["Live crawfish price tracker", "High-volume feast calculator", "Direct phone & Google Maps route"],
        icon: <TrendingUp className="w-5 h-5 text-red-400" />,
        techStack: ["Live Price Engine", "Feast Planner", "Local 3-Pack SEO"]
    },
    "pindrop-saas": {
        stat: "Proprietary",
        statLabel: "Contractor Tech",
        highlights: ["Exif photo & GPS auto-tagging", "Direct Google Schema push", "Zero-friction review capture"],
        icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
        techStack: ["GPS Geotag Engine", "Automated SMS/Email", "Local Mapbox Layer"]
    },
    "geaux-pro-outdoors": {
        stat: "5-Star",
        statLabel: "Delta Coverage",
        highlights: ["Commercial site prep portal", "PinDrop™ field verification", "Heavy machinery showcases"],
        icon: <Activity className="w-5 h-5 text-amber-400" />,
        techStack: ["Next.js Core", "PinDrop™ Layer", "Commercial Lead Funnel"]
    },
    "the-local-guide-ms": {
        stat: "4K POV",
        statLabel: "Media Engine",
        highlights: ["YouTube channel integration", "Interactive Mississippi diner map", "Ray-Ban Meta video pipeline"],
        icon: <Heart className="w-5 h-5 text-amber-500" />,
        techStack: ["YouTube Sync API", "Interactive Map", "Media Optimization"]
    },
    "simmons-memorial": {
        stat: "99/100",
        statLabel: "Accessibility",
        highlights: ["Mobile-optimized streaming", "Multi-channel online giving", "Community ministry gateway"],
        icon: <Heart className="w-5 h-5 text-blue-400" />,
        techStack: ["High-Accessibility", "Giving Gateway", "Events Sync"]
    }
};

export default function Portfolio({ titleAs: Title = "h1" }: { titleAs?: "h1" | "h2" }) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    // Map desktop asymmetric columns to create a beautiful geometric Bento Grid
    const getGridSpanClass = (projectId: string) => {
        switch (projectId) {
            case "born-again-roofing":
                return "col-span-12 lg:col-span-8 h-[450px] lg:h-[550px]";
            case "tbeaux":
                return "col-span-12 md:col-span-6 lg:col-span-4 h-[450px] lg:h-[550px]";
            case "pindrop-saas":
                return "col-span-12 md:col-span-6 lg:col-span-4 h-[450px] lg:h-[550px]";
            case "geaux-pro-outdoors":
                return "col-span-12 lg:col-span-8 h-[450px] lg:h-[550px]";
            case "the-local-guide-ms":
                return "col-span-12 md:col-span-6 lg:col-span-6 h-[450px] lg:h-[520px]";
            case "simmons-memorial":
                return "col-span-12 md:col-span-6 lg:col-span-6 h-[450px] lg:h-[520px]";
            default:
                return "col-span-12 md:col-span-6 h-[450px]";
        }
    };

    return (
        <section
            id="portfolio"
            className="relative bg-[#020617] w-full overflow-hidden py-24 md:py-32 px-4 md:px-12 border-t border-white/5"
        >
            {/* Soft Ambient Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                
                {/* Section Header */}
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-[1px] w-8 bg-cyan-400"></div>
                            <span className="text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">Client Success Stories</span>
                        </div>
                        <Title className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">
                            Real Results For <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                                Mississippi Businesses.
                            </span>
                        </Title>
                        <p className="text-white/70 max-w-2xl mt-5 text-base md:text-lg leading-relaxed font-normal">
                            Every platform we engineer is hand-crafted for sub-second mobile speed, Google Map dominance, and converting visitors into paying clients.
                        </p>
                    </div>

                    <Link
                        href="/free-audit"
                        className="self-start md:self-auto px-8 py-4 bg-white text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 duration-300 block text-center"
                    >
                        Get Free Website Audit
                    </Link>
                </div>

                {/* SOTA Bento Grid */}
                <div className="grid grid-cols-12 gap-6 lg:gap-8">
                    {projects.map((project: Project) => {
                        const metrics = bentoMetricsMap[project.id] || {
                            stat: "99+",
                            statLabel: "Score",
                            highlights: ["High-speed server architecture", "Optimized micro-services"],
                            icon: <Zap className="w-5 h-5 text-cyan-400" />,
                            techStack: ["Next.js Core", "CDN Optimized"]
                        };

                        const isHovered = hoveredCard === project.id;
                        const glowRGB = project.glowColor || "34, 197, 94";

                        return (
                            <div
                                key={project.id}
                                className={`relative group rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-950/40 backdrop-blur-xl border border-white/5 shadow-2xl flex flex-col justify-end p-6 md:p-10 transition-all duration-700 ${getGridSpanClass(project.id)}`}
                                onMouseEnter={() => setHoveredCard(project.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                style={{
                                    boxShadow: isHovered 
                                        ? `0 0 40px -5px rgba(${glowRGB}, 0.2), 0 0 100px -15px rgba(${glowRGB}, 0.05), inset 0 0 20px 2px rgba(${glowRGB}, 0.1)` 
                                        : 'none',
                                    borderColor: isHovered 
                                        ? `rgba(${glowRGB}, 0.3)` 
                                        : 'rgba(255, 255, 255, 0.05)'
                                }}
                            >
                                {/* Immersive Brand-Matched Ambient Glow Backdrop */}
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[80px] rounded-full pointer-events-none z-0"
                                    style={{
                                        background: `radial-gradient(circle at center, rgba(${glowRGB}, 0.15) 0%, transparent 70%)`
                                    }}
                                />

                                {/* Background Screenshot Cover */}
                                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 70vw"
                                        className="object-cover object-top opacity-[0.18] group-hover:opacity-[0.38] group-hover:scale-[1.04] transition-all duration-[1200ms] ease-out"
                                    />
                                    {/* Glass Mask Gradients */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent opacity-60 z-10" />
                                </div>

                                {/* Floating Technical Code Tag */}
                                <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                                    <div 
                                        className="w-1.5 h-1.5 rounded-full group-hover:animate-pulse"
                                        style={{ 
                                            backgroundColor: `rgb(${glowRGB})`,
                                            boxShadow: `0 0 8px rgb(${glowRGB})`
                                        }} 
                                    />
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/50">
                                        Active Sync
                                    </span>
                                </div>

                                {/* Core Card Content Layout */}
                                <div className="relative z-20 flex flex-col justify-end h-full w-full">
                                    
                                    {/* Grid Top Content: Metric Spotlight */}
                                    <div className="mb-auto flex flex-col items-start pt-4">
                                        <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/10 rounded-2xl p-4 backdrop-blur-sm group-hover:bg-white/[0.06] transition-colors duration-500">
                                            <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                                                {metrics.icon}
                                            </div>
                                            <div>
                                                <div className="text-2xl md:text-3xl font-black text-white leading-none tracking-tight">
                                                    {metrics.stat}
                                                </div>
                                                <div className="text-[10px] font-bold text-white/40 tracking-wider uppercase mt-1">
                                                    {metrics.statLabel}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Grid Bottom Content: Title & Technical Specs */}
                                    <div className="mt-8">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {project.tags.map(tag => (
                                                <span 
                                                    key={tag} 
                                                    className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/5 bg-slate-950/60 text-white/60"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-3 flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-500">
                                            {project.title}
                                            <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors duration-500" />
                                        </h3>

                                        <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-6 max-w-xl line-clamp-2 md:line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Highlight Features */}
                                        <ul className="space-y-2 mb-6 hidden md:block border-t border-white/5 pt-4">
                                            {metrics.highlights.slice(0, 2).map((highlight, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-[11px] text-white/50">
                                                    <div 
                                                        className="w-1 h-1 rounded-full shrink-0" 
                                                        style={{ backgroundColor: `rgb(${glowRGB})` }} 
                                                    />
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Actions Toolbar */}
                                        <div className="flex items-center gap-4 border-t border-white/5 pt-5">
                                            <Link
                                                href={`/portfolio/${project.id}`}
                                                prefetch={false}
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 hover:text-slate-950 transition-all duration-300"
                                            >
                                                View Case Study
                                            </Link>
                                            
                                            {project.netlifyUrl && (
                                                <a
                                                    href={project.netlifyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center px-4 py-3 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white hover:text-cyan-400 hover:border-cyan-400 transition-all bg-slate-900/60 backdrop-blur-md"
                                                >
                                                    Live Site <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </section>
    );
}
