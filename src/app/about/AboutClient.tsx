"use client";

import { motion } from "framer-motion";
import { Zap, Shield, ArrowRight, Target, MapPin, X, Check, Sparkles, PhoneCall } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";
import Link from "next/link";

const capabilities = [
    {
        title: "Fast Mobile Web Speed",
        description: "Hand-crafted with Next.js and deployed at the edge. 95+ PageSpeed scores on cell phones. Zero template code, zero broken WordPress plugins.",
        icon: Zap,
        accent: "cyan",
    },
    {
        title: "Proprietary PinDrop™ Tech",
        description: "Exclusive contractor tool: drop GPS pins on job sites, auto-geotag project photos, update your website map, and automatically text clients for 5-star Google reviews.",
        icon: Sparkles,
        accent: "blue",
    },
    {
        title: "Google Map Pack Domination",
        description: "Local schema graphs and review velocity engineered to place your business at the top of Google Maps across Jackson, Madison, Brandon, and Clinton.",
        icon: MapPin,
        accent: "indigo",
    },
    {
        title: "Lead Automation & Smart CRM",
        description: "Direct Capsule CRM and Transpond integration so every customer quote request, call, and message is captured and followed up with automatically.",
        icon: Shield,
        accent: "purple",
    },
];

const theyDeliver = [
    "Slow, bloated WordPress templates",
    "Third-party plugins that break constantly",
    "Generic SEO checklists with zero local ranking",
    "Zero mobile speed optimization (scoring 30-40)",
    "Overseas support tickets when you need help",
];

const weEngineer = [
    "Hand-crafted Next.js with 95+ Mobile PageSpeed",
    "Proprietary PinDrop™ job site GPS & review tech",
    "Jackson Metro Google Maps 3-Pack optimization",
    "Automated lead capture & Capsule CRM pipelines",
    "100% human local support right here in Mississippi",
];

export default function AboutClient() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <main className="relative min-h-screen bg-background">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-36 pb-20 overflow-hidden">
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
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase">Jackson, MS • Web Engineering &amp; Growth Studio</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.95] uppercase">
                            We Build Websites <br />
                            That Turn Local Clicks <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 text-glow-cyan">
                                Into Paying Clients
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-foreground/75 leading-relaxed mb-10 text-balance max-w-3xl mx-auto font-normal">
                            Power Digital Media was built on a simple premise: Mississippi business owners work too hard to have slow, broken websites that don&apos;t get calls. We build custom high-speed web platforms, local SEO engines, and contractor growth tech that dominate local search.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* MISSION & STORY BLOCK */}
            <section className="py-24 relative z-10 bg-white/[0.02]">
                <div className="container px-4 mx-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid gap-16 lg:grid-cols-2 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                <div>
                                    <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                                        Our Philosophy
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6 text-white uppercase">
                                        No Cookie-Cutters. <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                                            Just Real Local Results.
                                        </span>
                                    </h2>
                                </div>
                                <div className="space-y-5 text-foreground/80 leading-relaxed text-base md:text-lg">
                                    <p>
                                        Most web agencies charge thousands to install a generic WordPress theme packed with 40 plugins that break every few months and take 6 seconds to load on a smartphone.
                                    </p>
                                    <p>
                                        At Power Digital Media, we hand-craft modern web software on Next.js. Your site opens fast on any mobile network, looks undeniably premium, and comes equipped with our proprietary contractor tools like <strong>PinDrop™</strong> to turn your completed jobs into automated 5-star Google reviews.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                    <Link href="/web-design" className="p-6 rounded-2xl glass-card border border-white/5 hover:border-cyan-500/40 bg-white/[0.02] transition-all group flex flex-col gap-2">
                                        <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">Growth Engine 01</span>
                                        <span className="text-lg font-bold text-white">Custom Web Design</span>
                                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-cyan-400 group-hover:translate-x-2 transition-all" />
                                    </Link>
                                    <Link href="/pindrop" className="p-6 rounded-2xl glass-card border border-white/5 hover:border-indigo-500/40 bg-white/[0.02] transition-all group flex flex-col gap-2">
                                        <span className="text-indigo-400 font-bold text-xs uppercase tracking-widest">Growth Engine 02</span>
                                        <span className="text-lg font-bold text-white">PinDrop™ Contractor Tech</span>
                                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-indigo-400 group-hover:translate-x-2 transition-all" />
                                    </Link>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-black/50 aspect-[4/5] shadow-[0_0_50px_rgba(6,182,212,0.15)] group"
                            >
                                <Image
                                    src="/images/founder-booth.webp"
                                    alt="Damein Donald — Power Digital Media founder in Jackson, Mississippi"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover object-center scale-105 transition-transform duration-1000 group-hover:scale-100"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent mix-blend-multiply" />
                                
                                <div className="absolute bottom-8 right-4 left-4 sm:left-auto sm:right-6 sm:max-w-[280px]">
                                    <div className="glass-card p-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-xl">
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-1.5 block">Damein Donald • Founder</span>
                                        <p className="text-xs font-semibold text-white leading-relaxed">Dedicated to building high-converting digital powerhouses for Mississippi businesses.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE CAPABILITIES */}
            <section className="py-24 relative overflow-hidden">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Capabilities</span>
                        <h3 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">The 4 Growth Pillars</h3>
                        <p className="text-foreground/60 text-base md:text-lg mt-4 max-w-2xl mx-auto">Everything you need to outrank competitors and capture high-paying clients.</p>
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
                                    className={`p-8 rounded-3xl glass-card bg-white/[0.02] transition-all group border ${borderColor} ${hoverBorder} flex flex-col`}
                                >
                                    <div className={`w-12 h-12 rounded-2xl ${bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <cap.icon className={`w-6 h-6 ${textColor}`} />
                                    </div>
                                    <h4 className="font-bold text-xl mb-3 text-white">{cap.title}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* COMPARISON TABLE */}
            <section className="py-24 relative bg-white/[0.01]">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">The Difference</span>
                        <h3 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">Why Hand-Crafted Code Wins</h3>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6 md:gap-0">
                            {/* Left — What Cheap Agencies Deliver */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 md:p-10 rounded-3xl md:rounded-r-none border border-white/5 bg-white/[0.02]"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/30 border border-red-500/20 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-red-400/80">Typical Agencies</span>
                                </div>
                                <h4 className="text-xl font-bold text-foreground/50 mb-6">What They Deliver</h4>
                                <ul className="space-y-4">
                                    {theyDeliver.map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-foreground/50">
                                            <X className="w-4 h-4 text-red-500/60 flex-shrink-0" />
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Right — What We Build */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 md:p-10 rounded-3xl md:rounded-l-none border border-cyan-500/30 bg-cyan-950/20 shadow-[0_0_60px_rgba(6,182,212,0.08)]"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Power Digital Media</span>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-6">What We Build For You</h4>
                                <ul className="space-y-4">
                                    {weEngineer.map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-foreground/90">
                                            <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                            <span className="text-sm font-semibold">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="py-24 border-t border-white/5 bg-cyan-500/[0.02]">
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-widest mb-8">
                            <Target className="w-4 h-4" /> Ready to Dominate Your Local Market?
                        </div>
                        <h3 className="text-3xl sm:text-5xl md:text-6xl font-black mb-8 max-w-4xl mx-auto tracking-tighter uppercase leading-[0.95] text-white">
                            Let&apos;s Build A Website That <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 text-glow-cyan">
                                Actually Gets Results.
                            </span>
                        </h3>
                        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                            Get a free 5-minute audit of your current site and see exactly what is holding your business back on Google.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/free-audit"
                                className="w-full sm:w-auto px-10 py-5 font-black text-slate-950 bg-white rounded-full hover:bg-cyan-400 transition-all uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.1)] text-center block"
                            >
                                Get Free Website Audit
                            </Link>
                            <a
                                href="tel:6014462393"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 border border-white/15 rounded-full font-bold uppercase tracking-widest text-[10px] text-white hover:bg-white/10 transition-all group active:scale-95"
                            >
                                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                                Call (601) 446-2393
                            </a>
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
