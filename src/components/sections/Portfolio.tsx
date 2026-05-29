"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowUpRight, ShieldCheck, Zap, Heart, TrendingUp, Sparkles, Activity } from "lucide-react";
import { useState } from "react";
import BookingModal from "../ui/BookingModal";
import { projects, Project } from "@/data/projects";

// Type definition for visual metric overlays mapping directly to Jackson MS projects
interface BentoMetric {
    stat: string;
    statLabel: string;
    highlights: string[];
    icon: React.ReactNode;
    techStack: string[];
}

const bentoMetricsMap: Record<string, BentoMetric> = {
    "all-things-new": {
        stat: "98%",
        statLabel: "PageSpeed Index",
        highlights: ["Next.js cinematic engine", "Global CDN distribution", "Dynamic video compression"],
        icon: <Sparkles className="w-5 h-5 text-green-400" />,
        techStack: ["Next.js 14", "GSAP Cinematic", "Netlify Edge"]
    },
    "corner-pharmacy": {
        stat: "400+ Hrs",
        statLabel: "Manual Admin Saved",
        highlights: ["HIPAA-compliant integration", "Free same-day delivery routing", "Frictionless refill capture"],
        icon: <ShieldCheck className="w-5 h-5 text-teal-400" />,
        techStack: ["React 18", "HIPAA Data Vault", "Tailwind CSS"]
    },
    "simmons-memorial": {
        stat: "99/100",
        statLabel: "Accessibility Score",
        highlights: ["High-accessibility protocol", "Legacy database sync", "Mobile-optimized stream"],
        icon: <Heart className="w-5 h-5 text-orange-400" />,
        techStack: ["Next.js Core", "A11y Compliant", "Fluid Typography"]
    },
    "growth-engine": {
        stat: "5.2x",
        statLabel: "Marketing ROAS",
        highlights: ["Real-time CRM integrations", "Meta Lead Gen webhooks", "Pipeline telemetry tracking"],
        icon: <TrendingUp className="w-5 h-5 text-cyan-400" />,
        techStack: ["Capsule CRM Sync", "Transpond Email API", "Facebook Webhooks"]
    },
    "black-sheep-recovery": {
        stat: "180ms",
        statLabel: "LCP Load Speed",
        highlights: ["Emergency CDN routing", "Semantic schema linking", "High-converting forms"],
        icon: <Activity className="w-5 h-5 text-red-500" />,
        techStack: ["High-Velocity Load", "SEO Entity Schema", "Responsive Tailwind"]
    }
};

export default function Portfolio({ titleAs: Title = "h1" }: { titleAs?: "h1" | "h2" }) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    // Map desktop asymmetric columns to create a beautiful geometric Bento Grid
    const getGridSpanClass = (projectId: string) => {
        switch (projectId) {
            case "all-things-new":
                return "col-span-12 lg:col-span-8 h-[450px] lg:h-[550px]";
            case "corner-pharmacy":
                return "col-span-12 md:col-span-6 lg:col-span-4 h-[450px] lg:h-[550px]";
            case "simmons-memorial":
                return "col-span-12 md:col-span-6 lg:col-span-4 h-[450px] lg:h-[550px]";
            case "growth-engine":
                return "col-span-12 lg:col-span-8 h-[450px] lg:h-[550px]";
            case "black-sheep-recovery":
                return "col-span-12 h-[450px] lg:h-[600px]";
            default:
                return "col-span-12 h-[450px]";
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
                            <span className="text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase">Engineering Portfolio</span>
                        </div>
                        <Title className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase text-glow-cyan leading-none drop-shadow-md">
                            High-Velocity<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
                                Digital Systems
                            </span>
                        </Title>
                        <p className="text-white/60 max-w-2xl mt-6 text-base md:text-lg leading-relaxed">
                            A curated selection of our certified architectures built for humans, optimized for AI search engines, and integrated directly into B2B sales pipelines.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsBookingOpen(true)}
                        className="self-start md:self-auto px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)] active:scale-95 duration-300"
                    >
                        Initiate Strategy Audit
                    </button>
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
                                        priority={project.id === "all-things-new"}
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
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 hover:text-white transition-all duration-300"
                                            >
                                                Analyze Build
                                            </Link>
                                            
                                            {project.netlifyUrl && (
                                                <a
                                                    href={project.netlifyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center px-4 py-3 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white hover:text-cyan-400 hover:border-cyan-400 transition-all bg-slate-900/60 backdrop-blur-md"
                                                >
                                                    Live Intel <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
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
