"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Cpu, Globe, Zap, ExternalLink, CheckCircle2 } from "lucide-react";
import React from 'react';
import { Project } from "@/data/projects";

export default function ProjectShowcaseClient({ project }: { project: Project }) {
    const router = useRouter();

    return (
        <main className="relative min-h-screen bg-[#020617] text-white overflow-x-hidden">
            {/* Presentation Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold uppercase tracking-wider hover:text-cyan-400 transition-colors"
                >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-400 transition-colors bg-slate-900">
                        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span>Back to Portfolio</span>
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-cyan-400 mb-0.5">
                        {project.client}
                    </span>
                    <h1 className="text-xs md:text-base font-bold tracking-tight text-center">{project.title}</h1>
                </div>

                <div className="flex items-center gap-3">
                    {project.netlifyUrl && (
                        <a
                            href={project.netlifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                        >
                            <span>Live Site</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-28 md:pt-36 pb-40 container mx-auto px-4 lg:px-16 max-w-6xl">

                {/* 1. Hero Screenshot */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-16 bg-slate-900"
                >
                    <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-950 border-b border-white/10">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        <span className="text-xs text-white/40 font-mono ml-2">
                            {project.client.toLowerCase().replace(/\s+/g, '')}.com
                        </span>
                    </div>

                    <div className="relative w-full h-[calc(100%-41px)]">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>
                </motion.div>

                {/* 2. Overview & Details Grid */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    <div className="space-y-6">
                        <div>
                            <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-2 block">
                                Project Overview
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tight">
                                {project.title}
                            </h2>
                            <p className="text-base md:text-lg text-white/75 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {project.objective && (
                            <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
                                <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">The Goal</h4>
                                <p className="text-white/70 text-sm leading-relaxed">{project.objective}</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        {/* Key Features */}
                        {project.features && (
                            <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
                                <h4 className="flex items-center gap-2 text-base font-bold mb-4 text-white uppercase tracking-wider">
                                    <Zap className="w-4 h-4 text-cyan-400" />
                                    Key Features Delivered
                                </h4>
                                <ul className="space-y-2.5">
                                    {project.features.map((item) => (
                                        <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Tech Stack */}
                        <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
                            <h4 className="flex items-center gap-2 text-base font-bold mb-4 text-white uppercase tracking-wider">
                                <Globe className="w-4 h-4 text-blue-400" />
                                Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white/80">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Live Embedded View (if available) */}
                {project.netlifyUrl && (
                    <div className="mb-20">
                        <div className="text-center mb-8">
                            <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-2 block">
                                Live Preview
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Interactive Preview</h3>
                        </div>
                        <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950">
                            <iframe
                                src={project.netlifyUrl}
                                className="w-full h-full border-0"
                                title={`${project.title} Preview`}
                                loading="lazy"
                            />
                        </div>
                    </div>
                )}

            </div>

            {/* Bottom Sticky Action Bar */}
            <footer className="fixed bottom-0 left-0 right-0 z-50 p-4 flex justify-center">
                <div className="rounded-full bg-slate-950/90 backdrop-blur-xl border border-white/10 px-6 py-3 flex items-center gap-4 shadow-2xl">
                    <span className="text-xs font-bold text-white hidden sm:inline">
                        Want a similar website for your business?
                    </span>
                    <Link
                        href="/free-audit"
                        className="px-6 py-2.5 bg-cyan-400 text-slate-950 font-black uppercase tracking-wider text-xs rounded-full hover:bg-white transition-colors"
                    >
                        Get Free Audit
                    </Link>
                    <a
                        href="tel:6013002004"
                        className="px-5 py-2.5 border border-white/20 text-white font-bold uppercase tracking-wider text-xs rounded-full hover:bg-white/10 transition-colors hidden sm:inline-block"
                    >
                        Call (601) 300-2004
                    </a>
                </div>
            </footer>
        </main>
    );
}
