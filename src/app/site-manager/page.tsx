"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    MonitorSmartphone,
    Download,
    Shield,
    Zap,
    Globe,
    Layers,
    ArrowRight,
    CheckCircle2,
    Smartphone,
    Monitor,
    Tablet,
    PenTool,
    Calendar,
    Users,
    Megaphone,
    Settings,
    BarChart3,
    Lock
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

/* ─── constants ───────────────────────────────────────────────── */

const APP_URL = "https://pdm-site-manager.netlify.app";

const features = [
    {
        icon: PenTool,
        title: "Visual Page Editor",
        description: "Edit hero text, images, colors, and content blocks with a real-time preview — no code required.",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10"
    },
    {
        icon: Calendar,
        title: "Event Management",
        description: "Create, schedule, and manage events with RSVP tracking and automatic calendar integration.",
        color: "text-blue-400",
        bg: "bg-blue-500/10"
    },
    {
        icon: Megaphone,
        title: "Announcements",
        description: "Publish announcements with priority badges, expiration dates, and audience targeting.",
        color: "text-indigo-400",
        bg: "bg-indigo-500/10"
    },
    {
        icon: Users,
        title: "Team Management",
        description: "Manage team members, assign roles, and control permissions across your organization.",
        color: "text-purple-400",
        bg: "bg-purple-500/10"
    },
    {
        icon: BarChart3,
        title: "Activity Dashboard",
        description: "Real-time analytics on page edits, events, and team activity at a glance.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10"
    },
    {
        icon: Settings,
        title: "Site Settings",
        description: "Configure SEO, branding, social links, and contact information from one central hub.",
        color: "text-amber-400",
        bg: "bg-amber-500/10"
    }
];

const platforms = [
    {
        icon: Monitor,
        name: "Windows",
        instruction: "Visit the app in Chrome → Click install icon in address bar",
        color: "text-blue-400"
    },
    {
        icon: Monitor,
        name: "Mac",
        instruction: "Visit the app in Chrome → Click install icon in address bar",
        color: "text-cyan-400"
    },
    {
        icon: Smartphone,
        name: "Android",
        instruction: "Visit in Chrome → Tap \"Add to Home Screen\" banner",
        color: "text-emerald-400"
    },
    {
        icon: Smartphone,
        name: "iOS",
        instruction: "Visit in Safari → Share → \"Add to Home Screen\"",
        color: "text-indigo-400"
    }
];

/* ─── page component ──────────────────────────────────────────── */

export default function SiteManagerPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const baseUrl = "https://powerdigitalmedia.org";
    const breadcrumbItems = [
        { name: "Services", url: `${baseUrl}/#services` },
        { name: "Site Manager", url: `${baseUrl}/site-manager` }
    ];

    return (
        <main className="relative min-h-screen bg-background text-foreground overflow-x-clip">
            <BreadcrumbSchema items={breadcrumbItems} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Site Manager — Power Digital Media",
                        "applicationCategory": "WebApplication",
                        "operatingSystem": "Windows, macOS, Android, iOS",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD",
                            "description": "Included with every Power Digital Media web design package."
                        },
                        "provider": {
                            "@type": "Organization",
                            "name": "Power Digital Media",
                            "url": "https://powerdigitalmedia.org"
                        },
                        "description": "Manage your website content, events, team, and announcements from any device. Included with every Power Digital Media build."
                    })
                }}
            />
            <Navbar />

            {/* ── Hero ────────────────────────────────────────── */}
            <section ref={heroRef} className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-cyan-500/8 rounded-full blur-[180px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
                    <div className="absolute inset-0 cyber-grid-small opacity-[0.06]" />
                </div>

                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="container relative z-10 px-4 mx-auto text-center mt-24"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-5xl mx-auto"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8 backdrop-blur-sm">
                            <MonitorSmartphone className="w-4 h-4 text-cyan-400" />
                            <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[10px]">
                                Client Portal
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.85] uppercase">
                            Site{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-glow-cyan">
                                Manager
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-foreground/60 mb-14 max-w-2xl mx-auto leading-relaxed font-light">
                            Your website. Your control. Edit content, manage events, and update
                            your&nbsp;site from{" "}
                            <span className="text-white font-medium">any device</span> —
                            no code required.
                        </p>

                        <div className="flex flex-wrap justify-center gap-5">
                            <a
                                href={APP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 bg-white text-black font-black rounded-full hover:bg-cyan-400 hover:text-white transition-all uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(34,211,238,0.3)]"
                            >
                                <Download className="w-5 h-5 group-hover:animate-bounce" />
                                Launch App
                            </a>
                            <Link
                                href="#features"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-12 py-5 border border-white/20 rounded-full hover:bg-white/5 transition-all font-bold uppercase tracking-widest text-sm"
                            >
                                See Features
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Scroll to Explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse" />
                </div>
            </section>

            {/* ── Included with every build ────────────────────── */}
            <section className="py-12 bg-[#050505] border-y border-white/5 relative z-20">
                <div className="container px-4 mx-auto max-w-4xl text-center">
                    <p className="text-foreground/50 text-lg font-light">
                        <Lock className="w-4 h-4 inline-block mr-2 text-cyan-400 -mt-0.5" />
                        <span className="text-white font-medium">Included at no extra cost</span> with
                        every Power Digital Media web design package. Your clients get a
                        professional management tool from day one.
                    </p>
                </div>
            </section>

            {/* ── Features Grid ────────────────────────────────── */}
            <section id="features" className="py-32 relative bg-background">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mb-24">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
                            Command Center
                        </span>
                        <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">
                            Everything They Need.
                        </h2>
                        <p className="text-xl text-foreground/60 leading-relaxed max-w-2xl">
                            A complete content management system designed for non-technical
                            users. No training required — just log in and start managing.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="group relative p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-700 overflow-hidden"
                            >
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[80px] pointer-events-none ${feature.bg.replace("/10", "/20")}`} />
                                <div className="relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700`}>
                                        <feature.icon className={`w-7 h-7 ${feature.color}`} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-foreground/60 leading-relaxed font-light">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Install on Any Device ────────────────────────── */}
            <section className="py-32 relative bg-background border-t border-white/5 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
                </div>

                <div className="container relative z-10 px-4 mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
                            Cross-Platform
                        </span>
                        <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">
                            Install Anywhere.
                        </h2>
                        <p className="text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto font-light">
                            Site Manager installs like a native app on every major platform.
                            No app store required — just visit, install, done.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                        {platforms.map((platform, index) => (
                            <motion.div
                                key={platform.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] text-center hover:bg-white/[0.04] transition-all duration-500"
                            >
                                <platform.icon className={`w-10 h-10 ${platform.color} mx-auto mb-5`} />
                                <h3 className="text-xl font-bold mb-3">{platform.name}</h3>
                                <p className="text-sm text-foreground/50 leading-relaxed font-light">
                                    {platform.instruction}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why This Matters (Sales Pitch) ──────────────── */}
            <section className="py-32 relative border-t border-white/5">
                <div className="container px-4 mx-auto">
                    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
                                The Difference
                            </span>
                            <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight leading-tight">
                                Built-In.{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                    Not Bolt-On.
                                </span>
                            </h2>
                            <p className="text-xl text-foreground/60 mb-10 leading-relaxed font-light">
                                Other agencies hand you a website and disappear. We hand you a
                                website <span className="text-white font-medium">and</span> the
                                keys to run it. Site Manager is purpose-built for every site we
                                deploy — not a generic third-party dashboard.
                            </p>
                            <ul className="space-y-5">
                                {[
                                    "No monthly CMS subscription fees",
                                    "No training required — intuitive from day one",
                                    "Works offline — cached for zero-downtime management",
                                    "Branded to your organization — not generic",
                                    "Instant updates — changes reflect in real-time"
                                ].map((point) => (
                                    <li
                                        key={point}
                                        className="flex items-start gap-3 text-foreground/70"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                                        <span className="font-light">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 w-full"
                        >
                            {/* Mockup frame */}
                            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.02] overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.08)]">
                                <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/40" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/40" />
                                    <span className="ml-3 text-xs text-foreground/30 font-mono">
                                        app.powerdigitalmedia.org
                                    </span>
                                </div>
                                <div className="p-8 space-y-4">
                                    {/* Simulated dashboard */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                            <Zap className="w-4 h-4 text-cyan-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Welcome back, Pastor</p>
                                            <p className="text-[10px] text-foreground/40">Church 244 · Dashboard</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { label: "Pages", value: "4" },
                                            { label: "Events", value: "4" },
                                            { label: "Team", value: "3" },
                                        ].map((stat) => (
                                            <div key={stat.label} className="rounded-xl bg-white/[0.03] border border-white/5 p-4 text-center">
                                                <p className="text-2xl font-bold text-cyan-400">{stat.value}</p>
                                                <p className="text-[10px] text-foreground/40 uppercase tracking-wider mt-1">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
                                        <p className="text-xs font-bold mb-2">Recent Activity</p>
                                        {["Updated hero section text", "Added Easter event", "Published new announcement"].map((a, i) => (
                                            <p key={i} className="text-[11px] text-foreground/40 py-1.5 border-t border-white/5 first:border-0">
                                                {a}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CTA ─────────────────────────────────────────── */}
            <section className="py-40 relative overflow-hidden">
                <div className="absolute inset-0 cyber-grid opacity-10" />
                <div className="container relative z-10 px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-8xl font-bold mb-10 tracking-tighter leading-tight uppercase font-heading">
                            Ready to Take{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Control?
                            </span>
                        </h2>
                        <p className="text-xl text-foreground/60 mb-16 max-w-xl mx-auto leading-relaxed font-light">
                            Launch the Site Manager now and experience the power of managing
                            your website from any device.
                        </p>
                        <a
                            href={APP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white text-black px-16 py-8 rounded-full font-black uppercase tracking-[0.3em] text-sm hover:scale-105 transition-all shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:shadow-cyan-400/50"
                        >
                            <Download className="w-5 h-5" />
                            Launch Site Manager
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
