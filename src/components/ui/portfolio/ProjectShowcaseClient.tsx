"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    Globe,
    Zap,
    ExternalLink,
    CheckCircle2,
    RotateCw,
    Sparkles,
    Monitor,
    MousePointerClick,
    Lock,
    Star,
    ArrowRight,
    PhoneCall,
} from "lucide-react";
import React, { useState } from "react";
import { Project } from "@/data/projects";
import Footer from "@/components/layout/Footer";

export default function ProjectShowcaseClient({ project }: { project: Project }) {
    const hasExternalUrl = Boolean(project.netlifyUrl && project.netlifyUrl.startsWith("http"));
    const hasInternalUrl = Boolean(project.netlifyUrl && project.netlifyUrl.startsWith("/"));
    const canEmbed = hasExternalUrl && !project.embedBlocked;
    const [viewMode, setViewMode] = useState<"interactive" | "screenshot">(
        canEmbed ? "interactive" : "screenshot"
    );
    const [iframeKey, setIframeKey] = useState(0);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const displayUrl = project.netlifyUrl
        ? hasExternalUrl
            ? project.netlifyUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
            : `powerdigitalmedia.org${project.netlifyUrl}`
        : `${project.client.toLowerCase().replace(/\s+/g, "")}.com`;

    return (
        <main className="relative min-h-screen bg-[#06080f] text-white overflow-x-hidden">
            {/* Presentation Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 bg-[#06080f]/92 backdrop-blur-xl border-b border-white/[0.08]">
                <Link
                    href="/our-work"
                    className="group flex items-center gap-2 md:gap-3 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-amber-400 transition-colors"
                >
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl border border-white/10 flex items-center justify-center group-hover:border-amber-400 transition-colors bg-[#12141c]">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="hidden sm:inline">Back to Our Work</span>
                    <span className="sm:hidden">Back</span>
                </Link>

                <div className="flex flex-col items-center px-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-amber-400 mb-0.5 text-center">
                        {project.client}
                    </span>
                    <h1 className="text-xs md:text-sm font-black uppercase tracking-tight text-center text-white line-clamp-1">
                        {project.title}
                    </h1>
                </div>

                <div className="flex items-center gap-2.5">
                    {hasExternalUrl ? (
                        <a
                            href={project.netlifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#06080f] text-xs font-black uppercase tracking-wider transition-colors"
                        >
                            <span>Visit Site</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    ) : hasInternalUrl && project.netlifyUrl ? (
                        <Link
                            href={project.netlifyUrl}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#06080f] text-xs font-black uppercase tracking-wider transition-colors"
                        >
                            <span>Explore App</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    ) : null}
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-28 md:pt-32 pb-24 container mx-auto px-4 lg:px-12 max-w-6xl">
                {/* 1. Interactive Hero Browser Frame */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 px-1">
                        {canEmbed ? (
                            <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-1.5 rounded-full">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                                </span>
                                <span>
                                    Live Interactive Client Build &bull; Scroll &amp; Click Directly Below
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/25 px-4 py-1.5 rounded-full">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                <span>Verified Production Deployment Showcase</span>
                            </div>
                        )}

                        {canEmbed ? (
                            <div className="flex items-center gap-1.5 bg-[#0b0c10] border border-white/10 p-1 rounded-xl">
                                <button
                                    type="button"
                                    onClick={() => setViewMode("interactive")}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        viewMode === "interactive"
                                            ? "bg-amber-500 text-[#06080f]"
                                            : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    <MousePointerClick className="w-3.5 h-3.5" />
                                    <span>Live Interactive</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setViewMode("screenshot")}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        viewMode === "screenshot"
                                            ? "bg-[#12141c] text-white border border-white/15"
                                            : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    <Monitor className="w-3.5 h-3.5" />
                                    <span>HD Snapshot</span>
                                </button>
                            </div>
                        ) : hasExternalUrl ? (
                            <a
                                href={project.netlifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all"
                            >
                                <span>Launch Live Website in New Tab</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        ) : hasInternalUrl && project.netlifyUrl ? (
                            <Link
                                href={project.netlifyUrl}
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all"
                            >
                                <span>Open Interactive Field App Showcase</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        ) : null}
                    </div>

                    {/* Browser Container */}
                    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-[#0b0c10]">
                        <div className="flex items-center justify-between px-4 py-3 bg-[#12141c] border-b border-white/[0.08]">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                            </div>

                            <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-[#06080f] border border-white/10 text-xs text-slate-300 font-mono max-w-md w-full justify-center truncate">
                                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                                <span className="text-slate-500">https://</span>
                                <span className="text-white font-semibold truncate">{displayUrl}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                {canEmbed && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIframeLoaded(false);
                                            setIframeKey((prev) => prev + 1);
                                        }}
                                        title="Reload Live Site"
                                        aria-label="Reload Live Site"
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        <RotateCw className="w-3.5 h-3.5" />
                                    </button>
                                )}
                                {hasExternalUrl && (
                                    <a
                                        href={project.netlifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Open in New Tab"
                                        aria-label="Open in New Tab"
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-white/10 transition-colors"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="relative w-full h-[500px] sm:h-[620px] md:h-[700px] bg-[#06080f]">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover object-top"
                                priority
                            />
                            {viewMode === "interactive" && canEmbed && (
                                <iframe
                                    key={iframeKey}
                                    src={project.netlifyUrl}
                                    title={`${project.title} Live Preview`}
                                    onLoad={() => setIframeLoaded(true)}
                                    className={`relative z-10 w-full h-full border-0 transition-opacity duration-500 ${
                                        iframeLoaded ? "opacity-100 bg-[#06080f]" : "opacity-0"
                                    }`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; payment"
                                />
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* 2. Overview & Features */}
                <div className="grid lg:grid-cols-2 gap-10 mb-16">
                    <div className="space-y-6">
                        <div>
                            <span className="text-amber-400 font-mono font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
                                Project Overview
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tight">
                                {project.title}
                            </h2>
                            <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {project.objective && (
                            <div className="p-6 rounded-2xl bg-[#0b0c10] border border-white/10">
                                <h3 className="font-bold text-amber-400 mb-2 text-xs font-mono uppercase tracking-[0.18em]">
                                    Business Objective
                                </h3>
                                <p className="text-slate-200 text-sm leading-relaxed">
                                    {project.objective}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        {project.features && (
                            <div className="p-6 rounded-2xl bg-[#0b0c10] border border-white/10">
                                <h3 className="flex items-center gap-2 text-sm font-black mb-4 text-white uppercase tracking-wider">
                                    <Zap className="w-4 h-4 text-amber-400" />
                                    Key Systems Delivered
                                </h3>
                                <ul className="space-y-2.5">
                                    {project.features.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center gap-2.5 text-sm text-slate-200"
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="p-6 rounded-2xl bg-[#0b0c10] border border-white/10">
                            <h3 className="flex items-center gap-2 text-sm font-black mb-4 text-white uppercase tracking-wider">
                                <Globe className="w-4 h-4 text-amber-400" />
                                Stack &amp; Capabilities
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1.5 rounded-lg bg-[#12141c] border border-white/10 text-xs font-semibold text-slate-200"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Economic Breakdown */}
                {project.economicImpact && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20 rounded-3xl bg-[#0b0c10] border border-amber-500/35 p-6 md:p-10 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                            <div>
                                <span className="text-amber-400 font-mono font-bold tracking-[0.2em] uppercase text-xs mb-1 block">
                                    Before → Engineered → Outcome
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                                    The Business Impact
                                </h3>
                            </div>
                            <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                                Verified Client Build
                            </span>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20">
                                <span className="text-xs font-bold uppercase tracking-wider text-red-400 block mb-2">
                                    Before the Build
                                </span>
                                <p className="text-sm text-slate-200 leading-relaxed">
                                    {project.economicImpact.before}
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-[#12141c] border border-amber-500/25">
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
                                    What We Engineered
                                </span>
                                <p className="text-sm text-slate-200 leading-relaxed">
                                    {project.economicImpact.built}
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                                    Business Outcome
                                </span>
                                <p className="text-sm text-white font-medium leading-relaxed">
                                    {project.economicImpact.result}
                                </p>
                            </div>
                        </div>

                        {project.economicImpact.metrics && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
                                {project.economicImpact.metrics.map((m, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3.5 rounded-xl bg-[#12141c] border border-white/[0.08] text-center"
                                    >
                                        <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider mb-1">
                                            {m.label}
                                        </span>
                                        <span
                                            className={`text-base md:text-lg font-black ${
                                                m.highlight ? "text-amber-400" : "text-white"
                                            }`}
                                        >
                                            {m.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* 4. Custom Integrations */}
                {project.integrations && project.integrations.length > 0 && (
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <span className="text-amber-400 font-mono font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
                                Under The Hood
                            </span>
                            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
                                Custom Systems In Action
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {project.integrations.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                                    className="flex flex-col justify-between rounded-3xl bg-[#0b0c10] border border-white/10 overflow-hidden shadow-2xl hover:border-amber-500/40 transition-all group"
                                >
                                    <div className="flex items-center justify-between px-4 py-3 bg-[#12141c] border-b border-white/[0.08]">
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-red-500/80" />
                                            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                                            <span className="w-2 h-2 rounded-full bg-green-500/80" />
                                        </div>
                                        <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25">
                                            {item.badge}
                                        </span>
                                    </div>

                                    <div className="relative w-full aspect-[16/9] bg-[#06080f] overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="p-6 md:p-8 flex-1">
                                        <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-slate-300 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 5. Testimonial */}
                {project.testimonial && (
                    <div className="mb-16 p-8 md:p-12 rounded-3xl bg-[#12141c] border border-amber-500/30 shadow-2xl">
                        <div className="flex items-center gap-1 mb-5">
                            {[...Array(project.testimonial.stars || 5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                            ))}
                            <span className="ml-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                                Verified {project.testimonial.source || "Client"} Review
                            </span>
                        </div>
                        <blockquote className="text-lg md:text-xl text-white font-medium italic leading-relaxed mb-6">
                            &ldquo;{project.testimonial.quote}&rdquo;
                        </blockquote>
                        <div>
                            <div className="font-bold text-white text-sm">
                                {project.testimonial.author}
                            </div>
                            <div className="text-xs text-slate-400">{project.testimonial.role}</div>
                        </div>
                    </div>
                )}

                {/* Inline Conversion CTA */}
                <div className="p-8 md:p-12 rounded-3xl bg-[#12141c] border border-amber-500/35 text-center">
                    <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-3">
                        Want Results Like {project.title}?
                    </h3>
                    <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-8">
                        Get a free 5-minute rank &amp; website check from Damein Donald in Jackson,
                        MS and see exactly how we&apos;d engineer your build.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/free-audit"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#06080f] font-black text-xs uppercase tracking-[0.16em] transition-all"
                        >
                            Get Free 5-Min Rank Check
                        </Link>
                        <a
                            href="tel:6014462393"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/15 text-white font-bold text-xs uppercase tracking-[0.15em] hover:bg-white/[0.06] transition-all"
                        >
                            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                            Call (601) 446-2393
                        </a>
                    </div>
                </div>
            </div>

            <Footer />

            {/* Desktop-Only Floating Conversion Pill (Mobile uses global StickyMobileDock) */}
            <div className="hidden lg:flex fixed bottom-5 left-0 right-0 z-40 justify-center pointer-events-none">
                <div className="pointer-events-auto rounded-full bg-[#0b0c10]/95 backdrop-blur-xl border border-amber-500/35 px-6 py-3 flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.75)]">
                    <span className="text-xs font-bold text-slate-200">
                        Want a build like <span className="text-amber-400">{project.title}</span>?
                    </span>
                    <Link
                        href="/free-audit"
                        className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-[#06080f] font-black uppercase tracking-wider text-xs rounded-full transition-colors"
                    >
                        Get Free Rank Check
                    </Link>
                    <a
                        href="tel:6014462393"
                        className="px-4 py-2 border border-white/15 text-white font-bold uppercase tracking-wider text-xs rounded-full hover:bg-white/10 transition-colors"
                    >
                        (601) 446-2393
                    </a>
                </div>
            </div>
        </main>
    );
}
