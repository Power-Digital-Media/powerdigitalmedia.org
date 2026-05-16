"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Shield, Mic, ArrowRight, Target, Braces, X, Check } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";
import Link from "next/link";

const capabilities = [
    {
        title: "Machine-Readable Infrastructure",
        description: "Structured data, llms.txt, schema graphs — built so AI agents can parse, recommend, and transact on behalf of your business.",
        icon: Cpu,
        accent: "cyan",
    },
    {
        title: "Sub-Second Architecture",
        description: "Next.js 15 + edge deployment. 90+ PageSpeed scores on mobile. Zero template code. Every byte is engineered.",
        icon: Zap,
        accent: "blue",
    },
    {
        title: "Redundant Security Systems",
        description: "Managed hosting, UPS-backed studio infrastructure, enterprise SSL, automated monitoring, and zero-downtime deployments.",
        icon: Shield,
        accent: "indigo",
    },
    {
        title: "Broadcast-Grade Media",
        description: "Studio production powered by the RØDECaster Pro II audio chain and cinematic capture — when the message needs to be felt, not just read.",
        icon: Mic,
        accent: "purple",
    },
];

const theyDeliver = [
    "Template-based WordPress sites",
    "Generic SEO audit checklists",
    "Cookie-cutter page builders",
    "Slow, unoptimized hosting",
    "Zero structured data",
];

const weEngineer = [
    "Custom Next.js with 90+ PageSpeed",
    "Structured data AI agents can read",
    "GEO-optimized, agentic-ready systems",
    "Edge-deployed, sub-second load times",
    "Machine-readable schema graphs",
];

export default function AboutClient() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <main className="relative min-h-screen bg-background">
            <Navbar />

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 1: HERO — INFRASTRUCTURE ENGINEERING IDENTITY
            ═══════════════════════════════════════════════════════════════ */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 mb-8">
                            <Braces className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase">Jackson, MS — Infrastructure Engineering Firm</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter md:text-7xl mb-8 leading-[0.9] uppercase">
                            We Engineer Digital{" "}
                            <br className="hidden md:block" />
                            Infrastructure That{" "}
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-glow-cyan">
                                AI Trusts
                            </span>
                        </h1>
                        <p className="text-lg text-foreground/60 leading-relaxed mb-10 text-balance max-w-3xl mx-auto">
                            Power Digital Media is not a marketing agency. We are a{" "}
                            <strong className="text-white">high-velocity web architecture firm</strong>{" "}
                            specializing in Next.js, structured data, and AI-retrievable
                            infrastructure — built from Jackson, Mississippi for businesses
                            that refuse to be invisible.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 2: MISSION BLOCK — ARCHITECTURE-FIRST PHILOSOPHY
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-24 relative z-10 bg-white/[0.02]">
                <div className="container px-4 mx-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid gap-16 lg:grid-cols-2 items-start">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                <div>
                                    <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">The Architecture-First Philosophy</span>
                                    <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                                        Most Agencies Sell{" "}
                                        <span className="text-foreground/30 line-through decoration-red-500/40">Pageviews</span>.
                                        <br />
                                        We Sell{" "}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                            Infrastructure
                                        </span>.
                                    </h2>
                                </div>
                                <div className="prose prose-invert max-w-none space-y-5">
                                    <p className="text-lg leading-relaxed text-foreground/70">
                                        In a world where AI agents are becoming the primary
                                        gateway to discovery, your website cannot just look good —
                                        it must be <strong className="text-white">machine-readable,
                                        semantically structured, and engineered for retrieval</strong>.
                                    </p>
                                    <p className="text-foreground/60 leading-relaxed">
                                        We build systems that don&apos;t just rank — they get cited,
                                        summarized, and recommended by the AI models that are
                                        replacing traditional search. Every line of code, every
                                        schema graph, every deployment pipeline is designed to
                                        make your business the authoritative answer.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                    <Link href="/web-design" className="p-6 rounded-2xl glass-card border-white/5 hover:border-cyan-500/40 bg-white/5 transition-all group flex flex-col gap-2">
                                        <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">Protocol 01</span>
                                        <span className="text-lg font-bold">AI Search Architecture</span>
                                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-cyan-400 group-hover:translate-x-2 transition-all" />
                                    </Link>
                                    <Link href="/marketing" className="p-6 rounded-2xl glass-card border-white/5 hover:border-indigo-500/40 bg-white/5 transition-all group flex flex-col gap-2">
                                        <span className="text-indigo-400 font-bold text-xs uppercase tracking-widest">Protocol 02</span>
                                        <span className="text-lg font-bold">Growth Engineering</span>
                                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-indigo-400 group-hover:translate-x-2 transition-all" />
                                    </Link>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-black/50 aspect-[4/5] shadow-[0_0_40px_rgba(6,182,212,0.15)] group"
                            >
                                <Image
                                    src="/images/founder-booth.webp"
                                    alt="Power Digital Media Lead Architect — Jackson Mississippi infrastructure engineering"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover object-center scale-105 transition-transform duration-1000 group-hover:scale-100"
                                />

                                {/* Cyber Overlay Gradients */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent mix-blend-multiply" />
                                <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay" />

                                {/* Tech Corners */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 opacity-50" />
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 opacity-50" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 opacity-50" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 opacity-50" />

                                {/* Scanning Line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_10px_#22d3ee] animate-scan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* HUD Badge */}
                                <div className="absolute bottom-4 left-4 flex gap-2">
                                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/30 uppercase tracking-widest">
                                        SYS.OP: ACTIVE
                                    </span>
                                </div>

                                {/* Overlay Card */}
                                <div className="absolute bottom-8 right-4 left-4 sm:left-auto sm:right-4 sm:max-w-[240px]">
                                    <div className="glass-card p-5 rounded-2xl border-cyan-500/20 bg-cyan-950/30 backdrop-blur-xl">
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-2 block">Est. Jackson, MS</span>
                                        <p className="text-sm font-bold text-white leading-tight">Engineered locally. Built for global-scale infrastructure.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 3: CAPABILITY STACK — THE NUCLEAR PROTOCOL
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Core Capabilities</span>
                        <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">The Nuclear Protocol</h3>
                        <p className="text-foreground/50 text-lg mt-4 max-w-2xl mx-auto">Four pillars of infrastructure that separate dominant brands from digital noise.</p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {capabilities.map((cap, index) => {
                            const accentColors: Record<string, string> = {
                                cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500/60",
                                blue: "text-blue-400 bg-blue-500/10 border-blue-500/30 hover:border-blue-500/60",
                                indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30 hover:border-indigo-500/60",
                                purple: "text-purple-400 bg-purple-500/10 border-purple-500/30 hover:border-purple-500/60",
                            };
                            const colors = accentColors[cap.accent] || accentColors.cyan;
                            const [textColor, bgColor, borderColor, hoverBorder] = colors.split(" ");

                            return (
                                <motion.div
                                    key={cap.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`p-8 rounded-[2rem] glass-card bg-white/[0.03] transition-all group border ${borderColor} ${hoverBorder}`}
                                >
                                    <div className={`w-12 h-12 rounded-2xl ${bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <cap.icon className={`w-6 h-6 ${textColor}`} />
                                    </div>
                                    <h4 className="font-bold text-xl mb-3">{cap.title}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 4: DIFFERENTIATOR — WHAT THEY DELIVER VS WHAT WE ENGINEER
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-24 relative bg-white/[0.01]">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">The Difference</span>
                        <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Why Architecture Matters</h3>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6 md:gap-0">
                            {/* Left — What They Deliver */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 md:p-10 rounded-2xl md:rounded-r-none border border-white/5 bg-white/[0.02]"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/30 border border-red-500/20 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-red-400/80">Most Agencies</span>
                                </div>
                                <h4 className="text-xl font-bold text-foreground/40 mb-6">What They Deliver</h4>
                                <ul className="space-y-4">
                                    {theyDeliver.map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-foreground/30">
                                            <X className="w-4 h-4 text-red-500/50 flex-shrink-0" />
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Right — What We Engineer */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 md:p-10 rounded-2xl md:rounded-l-none border border-cyan-500/20 bg-cyan-950/10 shadow-[0_0_60px_rgba(6,182,212,0.05)]"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Power Digital Media</span>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-6">What We Engineer</h4>
                                <ul className="space-y-4">
                                    {weEngineer.map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-foreground/80">
                                            <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                            <span className="text-sm font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 5: CTA — INITIALIZE YOUR BUILD
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-24 border-t border-white/5 bg-cyan-500/[0.02]">
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-widest mb-8">
                            <Target className="w-4 h-4" /> Your Infrastructure, Our Mission
                        </div>
                        <h3 className="text-4xl md:text-6xl font-black mb-8 max-w-4xl mx-auto tracking-tighter uppercase leading-[0.9]">
                            Stop Competing.{" "}
                            <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 text-glow-cyan">
                                Start Dominating.
                            </span>
                        </h3>
                        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                            Your competitors are still on WordPress. Let&apos;s give them something to worry about.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="w-full sm:w-auto px-12 py-5 font-black text-slate-950 bg-white rounded-full hover:bg-cyan-400 hover:text-white transition-all uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                            >
                                Get a Free Architecture Audit
                            </button>
                            <Link
                                href="/web-design"
                                className="w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-5 border border-white/10 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white/5 hover:border-white/20 transition-all group active:scale-95"
                            >
                                View Our Systems <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
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
