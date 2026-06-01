"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/ui/BookingModal";
import { liveSites, LiveSite } from "@/data/liveSites";
import { 
    ExternalLink, 
    Globe, 
    Activity, 
    Zap, 
    Search, 
    Filter, 
    Server, 
    Clock, 
    Gauge,
    Shield,
    Heart,
    ShoppingBag,
    Code,
    CheckCircle2
} from "lucide-react";

// Category Icons Mapping
const categoryIcons: Record<string, React.ReactNode> = {
    Healthcare: <Shield className="w-4 h-4 text-teal-400" />,
    "Local Business": <Globe className="w-4 h-4 text-amber-400" />,
    "E-Commerce": <ShoppingBag className="w-4 h-4 text-purple-400" />,
    "Faith & Community": <Heart className="w-4 h-4 text-red-400" />,
    Agency: <Activity className="w-4 h-4 text-cyan-400" />
};

export default function OurWorkPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedTech, setSelectedTech] = useState<string>("All");
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // Filter Categories Lists
    const categories = ["All", "Local Business", "Faith & Community", "Healthcare", "E-Commerce", "Agency"];
    const techStacks = ["All", "Next.js", "Standard HTML/JS"];

    // Filtered Sites Logic
    const filteredSites = useMemo(() => {
        return liveSites.filter((site) => {
            const matchesSearch = 
                site.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                site.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
                site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                site.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesCategory = selectedCategory === "All" || site.category === selectedCategory;
            const matchesTech = selectedTech === "All" || 
                (selectedTech === "Next.js" ? site.deployType === "Next.js" : site.deployType === "Standard HTML/JS");

            return matchesSearch && matchesCategory && matchesTech;
        });
    }, [searchQuery, selectedCategory, selectedTech]);

    // Average page speeds calculations for live metrics
    const stats = useMemo(() => {
        const total = liveSites.length;
        const nextJsCount = liveSites.filter(s => s.deployType === "Next.js").length;
        const avgSpeed = Math.round(liveSites.reduce((acc, curr) => acc + curr.performanceScore, 0) / total);
        return { total, nextJsCount, avgSpeed };
    }, []);

    return (
        <main className="min-h-screen bg-[#020617] text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-slate-900">
            {/* Cyber Studio Grid Mesh Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />
            
            <Navbar />

            {/* Immersive Header / Telemetry Section */}
            <section className="relative z-10 pt-32 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-[1px] w-8 bg-cyan-400"></div>
                            <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">SYSTEMS SHOWCASE</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-glow-cyan leading-none mb-6">
                            OUR WORK &amp;<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 italic">
                                DIGITAL FLEET.
                            </span>
                        </h1>
                        <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
                            Interactive showroom of client websites and applications engineered, hosted, and optimized by **Power Digital Media**. All systems feature certified live status indicators, custom styling, and premium core web vitals.
                        </p>
                    </div>

                    {/* Dynamic Telemetry Stats Counter */}
                    <div className="grid grid-cols-3 gap-3 md:gap-4 bg-slate-950/60 border border-white/5 p-4 rounded-2xl backdrop-blur-md min-w-[280px] lg:min-w-[400px]">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider flex items-center gap-1">
                                <Server className="w-3 h-3 text-cyan-400" /> Active Nodes
                            </span>
                            <span className="text-2xl md:text-3xl font-black text-white mt-1">
                                {stats.total}
                            </span>
                        </div>
                        <div className="flex flex-col border-l border-white/5 pl-3 md:pl-4">
                            <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider flex items-center gap-1">
                                <Code className="w-3 h-3 text-blue-400" /> Next.js
                            </span>
                            <span className="text-2xl md:text-3xl font-black text-blue-400 mt-1">
                                {stats.nextJsCount}
                            </span>
                        </div>
                        <div className="flex flex-col border-l border-white/5 pl-3 md:pl-4">
                            <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider flex items-center gap-1">
                                <Gauge className="w-3 h-3 text-green-400" /> Avg Speed
                            </span>
                            <span className="text-2xl md:text-3xl font-black text-green-400 mt-1">
                                {stats.avgSpeed}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filter and Search Controls Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-950/40 border border-white/5 rounded-3xl p-4 md:p-6 mb-12 backdrop-blur-md">
                    {/* Search Field */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search fleet (domain, tech, sector)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/5 focus:border-cyan-500/40 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium text-white focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Category Selector */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        <span className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mr-2 flex items-center gap-1">
                            <Filter className="w-3 h-3" /> Sector:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                                        selectedCategory === cat
                                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/35"
                                            : "bg-slate-900/40 text-slate-400 border border-white/5 hover:bg-slate-800"
                                    }`}
                                >
                                    {cat === "All" ? "All Sectors" : cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tech Selector */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto ml-auto">
                        <span className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mr-2 flex items-center gap-1">
                            <Code className="w-3 h-3" /> Stack:
                        </span>
                        <div className="flex gap-1.5">
                            {techStacks.map((stack) => (
                                <button
                                    key={stack}
                                    onClick={() => setSelectedTech(stack)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                                        selectedTech === stack
                                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/35"
                                            : "bg-slate-900/40 text-slate-400 border border-white/5 hover:bg-slate-800"
                                    }`}
                                >
                                    {stack === "All" ? "All Tech" : stack}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {filteredSites.length === 0 && (
                    <div className="text-center py-20 bg-slate-950/20 border border-white/5 rounded-[2rem] backdrop-blur-md">
                        <Activity className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-pulse" />
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider">No Active Nodes Located</h3>
                        <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
                            Adjust your filters or search terms to inspect other nodes within the Digital Fleet.
                        </p>
                    </div>
                )}

                {/* Blazing Fast Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredSites.map((site) => {
                        return (
                            <div
                                key={site.id}
                                className="group relative rounded-[2rem] border border-white/5 bg-slate-950/45 p-6 md:p-8 flex flex-col justify-between hover:border-opacity-100 transition-all duration-500 shadow-xl overflow-hidden"
                                style={{
                                    boxShadow: `0 0 40px -10px rgba(${site.glowColor}, 0.05), inset 0 0 16px rgba(${site.glowColor}, 0.02)`,
                                }}
                            >
                                {/* Immersive Ambient Glow Backdrop */}
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[60px] rounded-full pointer-events-none -z-10"
                                    style={{
                                        background: `radial-gradient(circle at center, rgba(${site.glowColor}, 0.12) 0%, transparent 60%)`
                                    }}
                                />

                                {/* Card Header Details */}
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2 bg-slate-900 border border-white/5 px-3 py-1.5 rounded-full">
                                            {categoryIcons[site.category] || <Globe className="w-3.5 h-3.5" />}
                                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
                                                {site.category}
                                            </span>
                                        </div>

                                        {/* Deployment Pulse Light */}
                                        <div className="flex items-center gap-2">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-green-400">
                                                Active Node
                                            </span>
                                        </div>
                                    </div>

                                    {/* Project Info */}
                                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-glow transition-all">
                                        {site.title}
                                    </h3>
                                    
                                    <span className="text-[11px] font-mono text-cyan-400/80 tracking-widest block mb-4">
                                        {site.domain}
                                    </span>

                                    <p className="text-slate-400 text-xs leading-relaxed mb-6 line-clamp-3">
                                        {site.description}
                                    </p>

                                    {/* TechBadges */}
                                    <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-white/5">
                                        {site.techStack.map(tech => (
                                            <span 
                                                key={tech} 
                                                className="text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded-md border border-white/5 bg-slate-900/80 text-slate-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Core Speed Indicators (Lighthouse Dials) */}
                                <div className="mt-auto">
                                    <div className="grid grid-cols-4 gap-2 bg-slate-900/60 border border-white/5 p-3 rounded-2xl mb-6">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <span className="text-xs font-black text-green-400 leading-none">
                                                {site.performanceScore}
                                            </span>
                                            <span className="text-[7px] font-mono uppercase text-slate-500 tracking-wider mt-1">
                                                Perf
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center text-center border-l border-white/5">
                                            <span className="text-xs font-black text-green-400 leading-none">
                                                {site.accessibilityScore}
                                            </span>
                                            <span className="text-[7px] font-mono uppercase text-slate-500 tracking-wider mt-1">
                                                A11y
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center text-center border-l border-white/5">
                                            <span className="text-xs font-black text-green-400 leading-none">
                                                {site.bestPracticesScore}
                                            </span>
                                            <span className="text-[7px] font-mono uppercase text-slate-500 tracking-wider mt-1">
                                                Best P.
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center text-center border-l border-white/5">
                                            <span className="text-xs font-black text-green-400 leading-none">
                                                {site.seoScore}
                                            </span>
                                            <span className="text-[7px] font-mono uppercase text-slate-500 tracking-wider mt-1">
                                                SEO
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-3">
                                        <a
                                            href={site.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 hover:text-white transition-all duration-300"
                                        >
                                            Launch System <ExternalLink className="w-3 h-3" />
                                        </a>
                                        <div className="px-3.5 py-3 rounded-xl border border-white/5 bg-slate-900/50 flex items-center justify-center">
                                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                                            <span className="text-[7px] font-mono uppercase text-slate-500 tracking-wider ml-1.5 hidden group-hover:inline-block transition-all">
                                                {site.publishedAt}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Closing CTA */}
                <div className="mt-20 border border-white/5 bg-slate-950/30 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-md text-center max-w-4xl mx-auto relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
                    
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-cyan-400 mb-4 block">
                        DEDICATED DIGITAL ENGINEERING
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                        READY TO DEPLOY YOUR OWN<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">
                            HIGH-SPEED ENGINE?
                        </span>
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto mb-8">
                        Stop bleeding B2B leads to slow, heavy WordPress templates. Secure a bespoke Next.js system and command first-page search authority now.
                    </p>
                    <button
                        onClick={() => setIsBookingOpen(true)}
                        className="px-10 py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.05)] active:scale-95 duration-300"
                    >
                        Initiate Strategy Audit
                    </button>
                </div>
            </section>

            <Footer />

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </main>
    );
}
