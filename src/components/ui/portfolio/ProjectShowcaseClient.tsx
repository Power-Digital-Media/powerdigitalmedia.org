"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Cpu, Globe, Zap, Shield, BarChart3, X } from "lucide-react";
import React from 'react';

// Define Interface for Project (should be imported but for now defining here to avoid circular deps if types are in data/projects)
// Better yet, let's assume the passed prop is 'any' or defined based on usage for speed, 
// strictly speaking we should import the type from @/data/projects if available.
// Looking at previous file view, projects is imported from @/data/projects.

import { Project } from "@/data/projects";

export default function ProjectShowcaseClient({ project }: { project: Project }) {
    const router = useRouter();

    return (
        <main className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
            {/* --- Presentation Header --- */}
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors"
                >
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    Exit Showcase
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-1">Architecture Preview</span>
                    <h1 className="text-xl font-bold tracking-tight">{project.title}</h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </header>

            {/* --- Scrollable Content: The "Figma" Canvas --- */}
            <div className="pt-32 pb-40 container mx-auto px-4 lg:px-20">

                {/* 1. The Hero Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative w-full aspect-[16/10] rounded-[2rem] lg:rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)] border border-white/5 mb-32 group"
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-[10000ms] group-hover:scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                    <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                        <div className="max-w-2xl">
                            <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Primary Interface</span>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">Cinematics & <br /> Conversion</h2>
                        </div>
                        <div className="hidden lg:block text-right">
                            <div className="text-white/40 text-[10px] uppercase tracking-[0.4em] mb-2 font-black">Lighthouse Score</div>
                            <div className="text-4xl font-black text-cyan-400 tracking-tighter">100/100</div>
                        </div>
                    </div>
                </motion.div>

                {/* 2. Technical Breakdown Grid */}
                <div className="grid lg:grid-cols-2 gap-20 mb-40">
                    <div className="space-y-12">
                        <div>
                            <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Executive Summary</span>
                            <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">The Objective.</h3>
                            <p className="text-xl text-foreground/60 leading-relaxed font-light">
                                {project.objective}
                            </p>
                        </div>

                        <div className="grid gap-8">
                            <div className="p-8 rounded-3xl glass-card border-white/5 bg-white/[0.02]">
                                <h4 className="flex items-center gap-3 text-lg font-bold mb-4">
                                    <Cpu className="w-5 h-5 text-cyan-400" />
                                    Engineering Layer
                                </h4>
                                <ul className="space-y-3">
                                    {project.engineering.map(item => (
                                        <li key={item} className="text-sm text-foreground/50 border-l border-cyan-400/30 pl-4">{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-8 rounded-3xl glass-card border-white/5 bg-white/[0.02]">
                                <h4 className="flex items-center gap-3 text-lg font-bold mb-4">
                                    <Globe className="w-5 h-5 text-blue-400" />
                                    Design Protocol
                                </h4>
                                <ul className="space-y-3">
                                    {project.protocol.map(item => (
                                        <li key={item} className="text-sm text-foreground/50 border-l border-blue-400/30 pl-4">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src={project.image} // Reusing main image as placeholder for secondary view
                            alt="Secondary View"
                            fill
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/0 transition-all duration-700" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="px-8 py-4 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.4em]">
                                Technical Detail Capture
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. The Live Architecture Preview */}
                {project.netlifyUrl && (
                    <div className="mb-40">
                        <div className="text-center mb-16">
                            <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Live Environment</span>
                            <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Direct Inspection.</h3>
                        </div>
                        <div className="relative w-full aspect-video rounded-[2rem] lg:rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl bg-black">
                            <iframe
                                src={project.netlifyUrl}
                                className="w-full h-full border-0"
                                title={`${project.title} Preview`}
                                loading="lazy"
                            />
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[8px] font-black uppercase tracking-widest text-white/40">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                Interactive Sandbox Protocol Active
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. The "Architecture" Detail */}

            </div>

            {/* --- Fixed Footer Actions --- */}
            <footer className="fixed bottom-0 left-0 right-0 z-50 p-8 flex justify-center">
                <div className="glass-card rounded-full bg-black/40 backdrop-blur-xl border border-white/10 px-10 py-5 flex items-center gap-8 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Next Protocol</span>
                        <span className="text-sm font-bold">Corner Pharmacy Architecture</span>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <Link href="/contact" className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-cyan-400 hover:text-white transition-all">
                        Initialize Build
                    </Link>
                </div>
            </footer>
        </main>
    );
}
