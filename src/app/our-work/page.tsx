"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuditCTA from "@/components/sections/AuditCTA";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { liveSites } from "@/data/liveSites";
import {
    ExternalLink,
    Search,
    Zap,
    ArrowRight,
    Sparkles,
} from "lucide-react";

const CATEGORIES = [
    "All",
    "Contractors & Trades",
    "Field Apps",
    "Restaurants & Local",
    "Faith & Community",
] as const;

export default function OurWorkPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const filteredSites = useMemo(() => {
        return liveSites.filter((site) => {
            const q = searchQuery.toLowerCase();
            const matchesSearch =
                site.title.toLowerCase().includes(q) ||
                site.domain.toLowerCase().includes(q) ||
                site.description.toLowerCase().includes(q) ||
                site.techStack.some((t) => t.toLowerCase().includes(q));

            const matchesCategory =
                selectedCategory === "All" || site.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <main className="min-h-screen bg-[#06080f] text-white flex flex-col relative">
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://powerdigitalmedia.org/" },
                    { name: "Our Work", url: "https://powerdigitalmedia.org/our-work" },
                ]}
            />
            <Navbar />

            {/* HERO */}
            <section className="relative z-10 pt-32 pb-12 px-4 sm:px-6 md:px-12 border-b border-white/[0.06] blueprint-grid overflow-hidden">
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[320px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-[1300px] mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-amber-300 font-mono font-bold text-[11px] tracking-[0.18em] uppercase">
                                Live Production Portfolio • Central Mississippi
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] mb-5">
                            Websites &amp; Field Apps{" "}
                            <span className="text-amber-400">Built To Win Jobs.</span>
                        </h1>
                        <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                            Inspect live client platforms, 0%-commission ordering engines, and our
                            proprietary{" "}
                            <strong className="text-white">PDM PinDrop™ + PinCam™</strong>{" "}
                            contractor apps running across Mississippi right now.
                        </p>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-[#0b0c10] border border-white/10 rounded-2xl p-4">
                        <div className="relative w-full lg:w-80">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search client, trade, or tech..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#12141c] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-white focus:outline-none transition-colors placeholder:text-slate-500"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                                        selectedCategory === cat
                                            ? "bg-amber-500 text-[#06080f] shadow-[0_8px_20px_rgba(245,158,11,0.25)]"
                                            : "bg-[#12141c] text-slate-300 border border-white/10 hover:border-amber-500/35 hover:text-white"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CARDS GRID */}
            <section className="py-16 px-4 sm:px-6 md:px-12 max-w-[1300px] mx-auto w-full">
                {filteredSites.length === 0 ? (
                    <div className="text-center py-16 bg-[#0b0c10] border border-white/10 rounded-3xl">
                        <h2 className="text-xl font-bold text-white mb-2">
                            No Projects Match Your Search
                        </h2>
                        <p className="text-slate-400 text-sm mb-6">
                            Try selecting &ldquo;All&rdquo; or clearing your search filter.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("All");
                            }}
                            className="px-6 py-2.5 rounded-xl bg-amber-500 text-[#06080f] font-black text-xs uppercase tracking-wider"
                        >
                            Show All Builds
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {filteredSites.map((site) => {
                            const screenshot = site.image || "/portfolio/bornagain-hero-16-10.webp";
                            const isExternal = site.url.startsWith("http");

                            return (
                                <div
                                    key={site.id}
                                    className="group relative rounded-3xl border border-white/10 bg-[#0b0c10] p-4 sm:p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-2xl overflow-hidden"
                                >
                                    <div>
                                        {/* Browser Frame */}
                                        <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#06080f] mb-5 sm:mb-6">
                                            <div className="flex items-center gap-1.5 px-3 py-2 bg-[#12141c] border-b border-white/[0.08]">
                                                <div className="flex gap-1 shrink-0">
                                                    <span className="w-2 h-2 rounded-full bg-red-500/80" />
                                                    <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                                                    <span className="w-2 h-2 rounded-full bg-green-500/80" />
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-mono mx-auto truncate max-w-[190px]">
                                                    {site.domain}
                                                </span>
                                            </div>
                                            <div className="relative aspect-[16/10] w-full">
                                                <Image
                                                    src={screenshot}
                                                    alt={`${site.title} screenshot`}
                                                    fill
                                                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-2 mb-2.5">
                                            <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                                                {site.category}
                                            </span>
                                            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                                                <Zap className="w-3 h-3" /> {site.performanceScore}/100
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-black uppercase tracking-tight text-white mb-1">
                                            {site.title}
                                        </h2>
                                        <p className="text-[11px] text-slate-400 font-medium mb-3">
                                            {site.publishedAt}
                                        </p>

                                        <p className="text-slate-300 text-xs leading-relaxed mb-5">
                                            {site.description}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {site.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-[10px] font-medium px-2.5 py-0.5 rounded-md bg-[#12141c] text-slate-300 border border-white/[0.08]"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Dual Action Footer */}
                                    <div
                                        className={`mt-auto pt-4 border-t border-white/[0.08] ${
                                            site.caseStudyUrl
                                                ? "grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                                                : "flex"
                                        }`}
                                    >
                                        {site.caseStudyUrl && (
                                            <Link
                                                href={site.caseStudyUrl}
                                                className="inline-flex items-center justify-center gap-1.5 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-[#06080f] text-xs font-black uppercase tracking-wider rounded-xl transition-all whitespace-nowrap"
                                            >
                                                Case Study
                                                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                                            </Link>
                                        )}

                                        {isExternal ? (
                                            <a
                                                href={site.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`${
                                                    site.caseStudyUrl ? "" : "w-full"
                                                } inline-flex items-center justify-center gap-1.5 py-3 px-4 bg-[#12141c] hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/10 whitespace-nowrap`}
                                            >
                                                Live Site
                                                <ExternalLink className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                            </a>
                                        ) : (
                                            <Link
                                                href={site.url}
                                                className={`${
                                                    site.caseStudyUrl ? "" : "w-full"
                                                } inline-flex items-center justify-center gap-1.5 py-3 px-4 bg-[#12141c] hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/10 whitespace-nowrap`}
                                            >
                                                Interactive Demo
                                                <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            <AuditCTA />

            <Footer />
        </main>
    );
}
