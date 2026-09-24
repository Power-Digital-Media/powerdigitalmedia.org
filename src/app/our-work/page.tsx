"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/ui/BookingModal";
import { liveSites, LiveSite } from "@/data/liveSites";
import { 
    ExternalLink, 
    Search, 
    Zap,
    MapPin,
    ArrowRight,
    PhoneCall,
    CheckCircle2
} from "lucide-react";

export default function OurWorkPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // Filter Categories
    const categories = ["All", "Local Business", "Faith & Community", "E-Commerce", "Agency"];

    // Filtered Sites Logic
    const filteredSites = useMemo(() => {
        return liveSites.filter((site) => {
            const matchesSearch = 
                site.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                site.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
                site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                site.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesCategory = selectedCategory === "All" || site.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <main className="min-h-screen bg-[#020617] text-white flex flex-col relative selection:bg-cyan-500 selection:text-slate-900">
            <Navbar />

            {/* Page Header */}
            <section className="relative z-10 pt-32 pb-12 px-6 md:px-12 max-w-[1300px] mx-auto w-full">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase mb-3 block">
                        Our Portfolio
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight leading-tight mb-6">
                        Websites Built For <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                            Mississippi Growth.
                        </span>
                    </h1>
                    <p className="text-white/75 text-base md:text-lg leading-relaxed">
                        Explore our real-world client websites, PinDrop™ contractor tools, and local business platforms hand-crafted right here in Central Mississippi.
                    </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/60 border border-white/10 rounded-2xl p-4 mb-12 backdrop-blur-md">
                    {/* Search Field */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search by client or keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-white focus:outline-none transition-colors placeholder:text-white/30"
                        />
                    </div>

                    {/* Category Selector */}
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                                    selectedCategory === cat
                                        ? "bg-cyan-400 text-slate-950"
                                        : "bg-slate-950/80 text-white/70 border border-white/10 hover:bg-white/5"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Empty State */}
                {filteredSites.length === 0 && (
                    <div className="text-center py-16 bg-slate-900/30 border border-white/10 rounded-3xl">
                        <h3 className="text-xl font-bold text-white mb-2">No Projects Match Your Search</h3>
                        <p className="text-white/60 text-sm">Try selecting &apos;All&apos; or changing your search terms.</p>
                    </div>
                )}

                {/* Clean Project Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSites.map((site) => {
                        const screenshot = site.image || "/portfolio/growth-engine-real.webp";

                        return (
                            <div
                                key={site.id}
                                className="group relative rounded-3xl border border-white/10 bg-slate-900/40 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 shadow-xl overflow-hidden"
                            >
                                {/* Visual Mockup */}
                                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950 mb-6">
                                    <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-950 border-b border-white/10">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 rounded-full bg-red-500/80" />
                                            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                                            <span className="w-2 h-2 rounded-full bg-green-500/80" />
                                        </div>
                                        <span className="text-[9px] text-white/50 font-mono mx-auto">
                                            {site.domain}
                                        </span>
                                    </div>
                                    <div className="relative w-full h-[calc(100%-25px)]">
                                        <Image 
                                            src={screenshot} 
                                            alt={`${site.title} screenshot`}
                                            fill
                                            className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                </div>

                                {/* Details */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                                            {site.category}
                                        </span>
                                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                                            <Zap className="w-3 h-3" /> {site.performanceScore}/100 Speed
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {site.title}
                                    </h3>

                                    <p className="text-white/70 text-xs leading-relaxed mb-6">
                                        {site.description}
                                    </p>

                                    {/* Tech badges */}
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {site.techStack.map(tech => (
                                            <span 
                                                key={tech} 
                                                className="text-[9px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 text-white/60 border border-white/5"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action button */}
                                <div className="mt-auto pt-4 border-t border-white/10">
                                    <a
                                        href={site.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-cyan-400 hover:text-slate-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/10"
                                    >
                                        Visit Live Website <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Call to Action */}
                <div className="mt-20 p-8 md:p-12 rounded-3xl bg-slate-900/60 border border-white/10 text-center max-w-3xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">
                        Get Started
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
                        Ready To Upgrade Your Website?
                    </h2>
                    <p className="text-white/75 text-sm md:text-base leading-relaxed mb-8">
                        Let&apos;s build a fast, modern website that ranks on Google and turns local Mississippi searchers into paying clients.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/free-audit"
                            className="w-full sm:w-auto px-8 py-4 bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                        >
                            Get Free Website Audit
                        </Link>
                        <a
                            href="tel:6013002004"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all"
                        >
                            <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                            Call (601) 300-2004
                        </a>
                    </div>
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
