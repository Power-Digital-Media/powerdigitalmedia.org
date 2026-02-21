"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Cpu, Code2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LeadArchitect() {
    return (
        <section className="relative w-full py-24 overflow-hidden border-y border-cyan-500/20 bg-background/95 backdrop-blur-md z-20" id="architect">

            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-1/2 relative group"
                    >
                        {/* Holographic scanning effect container */}
                        <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-black/50 aspect-[4/3] shadow-[0_0_40px_rgba(6,182,212,0.15)]">
                            <Image
                                src="/images/founder-booth.png"
                                alt="Christopher Simmons - Lead Infrastructure Architect"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover object-center scale-105 transition-transform duration-1000 group-hover:scale-100"
                                quality={90}
                            />

                            {/* Cyber Overlay Gradients */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent mix-blend-multiply" />
                            <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay" />

                            {/* Decorative Tech Corners */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 opacity-50" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 opacity-50" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 opacity-50" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 opacity-50" />

                            {/* Scanning Line Animation */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_10px_#22d3ee] animate-scan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* HUD Elements */}
                            <div className="absolute bottom-4 left-4 flex gap-2">
                                <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/30 uppercase tracking-widest hidden sm:block">
                                    SYS.OP: ACTIVE
                                </span>
                                <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/30 uppercase tracking-widest">
                                    LOC: M-01
                                </span>
                            </div>
                        </div>

                        {/* Drop Shadow Base */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-cyan-500/20 blur-2xl rounded-full" />
                    </motion.div>

                    {/* Text/Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="w-full lg:w-1/2 space-y-8"
                    >
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30">
                                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                                <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">Direct Accountability</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-satoshi text-white leading-tight">
                                Engineered by the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                                    Lead Architect
                                </span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-inter">
                            <p>
                                I don't outsource your brand's infrastructure to junior developers or cheap overseas agencies. When you partner with Power Digital Media, you work directly with me.
                            </p>
                            <p>
                                As the Lead Architect, I personally design, deploy, and scale the digital systems that drive your revenue. Whether it's a high-performance web application or a cinematic podcasting studio, you get enterprise-grade execution from the top down.
                            </p>
                        </div>

                        {/* Feature Bullets */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <div className="glass-card p-4 rounded-xl border border-white/5 flex items-start gap-3 group hover:border-cyan-500/30 transition-colors">
                                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                                    <Code2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white tracking-wide">Custom Code</h4>
                                    <p className="text-sm text-slate-400 mt-1">Zero templates. Only raw performance.</p>
                                </div>
                            </div>

                            <div className="glass-card p-4 rounded-xl border border-white/5 flex items-start gap-3 group hover:border-cyan-500/30 transition-colors">
                                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                                    <Cpu className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white tracking-wide">System Scalability</h4>
                                    <p className="text-sm text-slate-400 mt-1">Built to handle massive traffic spikes.</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="pt-6">
                            <Link href="/contact" className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white" />
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Initialize Your Build</span>
                                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:text-white transition-all duration-300" />
                            </Link>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
