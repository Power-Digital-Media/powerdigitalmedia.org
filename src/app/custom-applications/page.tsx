"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Database,
    Shield,
    BarChart3,
    ArrowRight,
    Zap,
    Check,
    PhoneCall,
    ExternalLink,
    MapPin,
    Camera,
    Workflow,
    CreditCard,
    CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQAccordion from "@/components/ui/FAQAccordion";
import AuditCTA from "@/components/sections/AuditCTA";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

interface CapabilityCard {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    icon: React.ComponentType<{ className?: string }>;
    href?: string;
    ctaLabel?: string;
}

const capabilities: CapabilityCard[] = [
    {
        title: "Capsule CRM & Automated Follow-Ups",
        subtitle: "Zero Dropped Leads",
        description:
            "Every website quote request, phone call, and inspection booking syncs directly into Capsule CRM with automated Transpond SMS and email follow-ups.",
        features: [
            "Capsule CRM Pipeline & Stage Design",
            "2-Minute Missed-Call & Form SMS Replies",
            "Transpond Automated Email Sequences",
            "Source & Neighborhood Lead Tagging",
        ],
        icon: Shield,
    },
    {
        title: "0%-Commission Checkout & Calculators",
        subtitle: "Custom Revenue Engines",
        description:
            "Keep 100% of your revenue on your own domain. We engineer native Square SDK & Stripe checkouts, instant hauling calculators, and catering planners.",
        features: [
            "Native Square Web SDK In-App Ordering",
            "Zero Third-Party Marketplace Redirects",
            "Interactive Pricing & Quote Calculators",
            "DoorDash Drive & Local Delivery Routing",
        ],
        icon: CreditCard,
    },
    {
        title: "Proprietary Field Apps & Portals",
        subtitle: "Built For Real Crews",
        description:
            "From our flagship PDM PinDrop™ & PinCam™ contractor suite to custom client portals and operations dashboards, we build software your team actually uses.",
        features: [
            "PDM PinDrop™ GPS Job Map & Review Engine",
            "PinCam™ 5-Mode Jobsite Camera & PDF Reports",
            "Custom Client & Crew Login Dashboards",
            "Serverless PostgreSQL & Firebase Sync",
        ],
        icon: Workflow,
        href: "/pindrop",
        ctaLabel: "Explore Field Apps",
    },
];

export default function CustomApplicationsPage() {
    const baseUrl = "https://powerdigitalmedia.org";
    const breadcrumbItems = [
        { name: "Home", url: `${baseUrl}/` },
        { name: "CRM & Custom Apps", url: `${baseUrl}/custom-applications` },
    ];

    return (
        <main className="relative min-h-screen bg-[#06080f] text-white overflow-x-clip">
            <BreadcrumbSchema items={breadcrumbItems} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "CRM, Automation & Custom Applications",
                        provider: {
                            "@id": "https://powerdigitalmedia.org/#organization",
                        },
                        description:
                            "Capsule CRM and Transpond automation, native Square & Stripe checkout integrations, and proprietary contractor field software in Jackson, MS.",
                        category: "Software Engineering & CRM Automation",
                        serviceType: "CRM Setup & Custom Software Development",
                        areaServed: {
                            "@type": "City",
                            name: "Jackson",
                            containedInPlace: {
                                "@type": "State",
                                name: "Mississippi",
                            },
                        },
                    }),
                }}
            />

            <Navbar />

            {/* HERO */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/[0.06] blueprint-grid">
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[760px] h-[380px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="container relative z-10 px-4 mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-7"
                        >
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
                                <Workflow className="w-3.5 h-3.5 text-amber-400" />
                                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-amber-300">
                                    CRM • Custom Checkout • Field Software
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.96] text-white mb-6">
                                Stop Running Your Business On{" "}
                                <span className="text-amber-400">Duct-Tape Spreadsheets.</span>
                            </h1>

                            <p className="text-slate-300 text-base md:text-xl leading-relaxed mb-8 max-w-2xl">
                                We wire your website directly into{" "}
                                <strong className="text-white">Capsule CRM</strong>, build{" "}
                                <strong className="text-white">0%-commission online ordering</strong>,
                                and deploy custom field apps so every call, quote, and job site flows
                                into one clean pipeline.
                            </p>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                                <Link
                                    href="/free-audit"
                                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#06080f] font-black text-xs uppercase tracking-[0.16em] transition-all shadow-[0_14px_34px_rgba(245,158,11,0.28)]"
                                >
                                    Get Free System Audit
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/book"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-bold text-xs uppercase tracking-[0.15em] transition-all"
                                >
                                    Book 15-Min Strategy Call
                                </Link>
                                <a
                                    href="tel:6014462393"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 text-slate-300 hover:text-amber-300 text-xs font-mono font-bold uppercase tracking-wider transition-colors"
                                >
                                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                                    (601) 446-2393
                                </a>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-white/[0.08]">
                                {[
                                    { value: "< 300ms", label: "Direct API Lead Sync" },
                                    { value: "No Zapier", label: "Zero Fragile Middlemen" },
                                    { value: "0% Fees", label: "Direct Square/Stripe SDK" },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="p-3.5 rounded-xl bg-[#0b0c10] border border-white/[0.07]"
                                    >
                                        <div className="text-lg md:text-xl font-black text-amber-400">
                                            {stat.value}
                                        </div>
                                        <div className="text-[11px] text-slate-400 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Live Architecture Diagram Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.1 }}
                            className="lg:col-span-5"
                        >
                            <div className="rounded-3xl bg-[#0b0c10] border border-white/10 p-6 sm:p-7 shadow-[0_28px_70px_rgba(0,0,0,0.65)]">
                                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.07]">
                                    <div>
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 block">
                                            Unified Workflow
                                        </span>
                                        <h2 className="text-lg font-black uppercase tracking-tight text-white">
                                            How Your Pipeline Runs Automatically
                                        </h2>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400 uppercase">
                                        Live Sync
                                    </span>
                                </div>

                                <div className="space-y-3.5">
                                    {[
                                        {
                                            step: "01",
                                            title: "Customer Clicks, Calls, or Orders",
                                            desc: "Quote form, click-to-call button, or Square menu cart captures intent directly on your domain.",
                                            badge: "Next.js Edge",
                                        },
                                        {
                                            step: "02",
                                            title: "Instant Capsule CRM Opportunity",
                                            desc: "Creates contact record, tags service type & city, and opens a tracked deal card in <300ms.",
                                            badge: "Capsule CRM",
                                        },
                                        {
                                            step: "03",
                                            title: "2-Minute SMS & Email Follow-Up",
                                            desc: "Sends immediate confirmation text/email so leads never call the next contractor on Google.",
                                            badge: "Transpond + SMS",
                                        },
                                        {
                                            step: "04",
                                            title: "Jobsite Proof & 5-Star Review Loop",
                                            desc: "Crews snap PinCam™ photos & drop a PDM PinDrop™ GPS pin to rank that neighborhood.",
                                            badge: "PinCam™ + PinDrop™",
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.step}
                                            className="p-4 rounded-2xl bg-[#12141c] border border-white/[0.07] flex items-start gap-3.5"
                                        >
                                            <span className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                                {item.step}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <h3 className="text-sm font-bold text-white">
                                                        {item.title}
                                                    </h3>
                                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-amber-300 shrink-0">
                                                        {item.badge}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-400 leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CORE CAPABILITIES */}
            <section className="py-24 bg-[#080a12] border-b border-white/[0.06]">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="max-w-3xl mb-14">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-amber-400 block mb-3">
                            Custom Engineering Pillars
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                            Software Built Around How You Actually Work.
                        </h2>
                        <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                            Instead of forcing your crew into five disconnected subscriptions, we
                            connect your website, phones, payments, and field tools into one clean
                            system.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {capabilities.map((cap, index) => (
                            <motion.div
                                key={cap.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="rounded-3xl bg-[#12141c] border border-white/[0.08] hover:border-amber-500/35 p-8 flex flex-col justify-between transition-all shadow-xl"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-6">
                                        <cap.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 block mb-2">
                                        {cap.subtitle}
                                    </span>
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
                                        {cap.title}
                                    </h3>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                        {cap.description}
                                    </p>
                                    <ul className="space-y-2.5 pt-5 border-t border-white/[0.07]">
                                        {cap.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-center gap-2.5 text-xs font-medium text-slate-300"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {cap.href && (
                                    <div className="pt-6 mt-6 border-t border-white/[0.07]">
                                        <Link
                                            href={cap.href}
                                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-white transition-colors"
                                        >
                                            {cap.ctaLabel}
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LIVE INTEGRATIONS IN ACTION */}
            <section className="py-24 bg-[#06080f] border-b border-white/[0.06]">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-amber-400 block mb-3">
                            Live Production Proof
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                            Custom Integrations In Action.
                        </h2>
                        <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                            Real software running right now for Mississippi contractors and local
                            operators—built in Jackson, MS.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        {/* Card 1: Square SDK */}
                        <div className="rounded-3xl bg-[#0b0c10] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-amber-500/40 transition-all">
                            <div>
                                <div className="flex items-center justify-between px-5 py-3.5 bg-[#12141c] border-b border-white/[0.08]">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                        <span className="text-xs text-white/50 font-mono ml-2">
                                            tbeauxs.com/menu
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                                        Square SDK In-App Checkout
                                    </span>
                                </div>
                                <div className="relative w-full aspect-[16/9] bg-[#06080f]">
                                    <Image
                                        src="/portfolio/tbeauxs-square-menu.webp"
                                        alt="T'Beaux's Custom Menu with Square SDK In-App Checkout"
                                        fill
                                        className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 sm:p-8">
                                    <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
                                        T&apos;Beaux&apos;s Seafood &amp; Catering • Clinton, MS
                                    </div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">
                                        0%-Commission Menu &amp; Direct Square Payments
                                    </h3>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                        Customers customize catfish platters, crawfish boils, and
                                        sides directly on the restaurant&apos;s domain and check out
                                        via the native <strong>Square Web SDK</strong>—zero 30%
                                        marketplace fees and zero slow redirects.
                                    </p>
                                    <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-300">
                                        <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                                            0% Commission Leakage
                                        </span>
                                        <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                                            Square Web SDK
                                        </span>
                                        <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                                            DoorDash Drive Dispatch
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 sm:px-8 sm:pb-8 pt-0 flex items-center gap-6">
                                <Link
                                    href="/portfolio/tbeaux"
                                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-white transition-colors"
                                >
                                    View Case Study <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                                <a
                                    href="https://tbeauxs.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                                >
                                    Live Site <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>

                        {/* Card 2: Born Again Roofing PinDrop */}
                        <div className="rounded-3xl bg-[#0b0c10] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-amber-500/40 transition-all">
                            <div>
                                <div className="flex items-center justify-between px-5 py-3.5 bg-[#12141c] border-b border-white/[0.08]">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                        <span className="text-xs text-white/50 font-mono ml-2">
                                            bornagainroofing.com
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                                        99+ Live GPS Pins
                                    </span>
                                </div>
                                <div className="relative w-full aspect-[16/9] bg-[#06080f]">
                                    <Image
                                        src="/pindrop/bar-live-pins.jpg"
                                        alt="Born Again Roofing Live PDM PinDrop Map"
                                        fill
                                        className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 sm:p-8">
                                    <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
                                        Born Again Roofing • Brandon &amp; Jackson Metro, MS
                                    </div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">
                                        PDM PinDrop™ Field SEO &amp; Storm CRM Pipeline
                                    </h3>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                        Crews drop GPS pins straight from job sites across Brandon,
                                        Madison, and Pearl—automatically publishing local proof to
                                        the website map, syncing storm leads to Capsule CRM, and
                                        texting homeowners for 5-star reviews.
                                    </p>
                                    <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-300">
                                        <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                                            PDM PinDrop™ Engine
                                        </span>
                                        <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                                            Capsule CRM Sync
                                        </span>
                                        <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                                            Automated SMS Reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 sm:px-8 sm:pb-8 pt-0 flex items-center gap-6">
                                <Link
                                    href="/pindrop"
                                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-white transition-colors"
                                >
                                    Explore PDM PinDrop™ <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                                <Link
                                    href="/pincam"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                                >
                                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                                    Explore PinCam™
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CUSTOM ENGINEERING SCOPES */}
            <section id="investment" className="py-24 bg-[#080a12] scroll-mt-24 border-b border-white/[0.06]">
                <div className="container px-4 mx-auto max-w-5xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-amber-400 block mb-3">
                            Scoped Case-by-Case
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                            CRM &amp; Custom Software Scopes.
                        </h2>
                        <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                            Every integration and software build is custom-quoted to your exact workflow with zero bloated per-seat agency markups. You own your customer database and pipelines.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Tier 1 */}
                        <div className="p-8 md:p-10 rounded-3xl bg-[#0b0c10] border border-white/10 flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 block mb-2">
                                    Pipeline &amp; Follow-Up Layer
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black uppercase text-white mb-3">
                                    CRM &amp; Lead Automation
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                    Complete Capsule CRM &amp; Transpond setup wired directly to your
                                    website forms, quote calculators, and missed-call SMS workflows.
                                </p>
                                <div className="pb-6 mb-6 border-b border-white/[0.08]">
                                    <span className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight block">
                                        Custom Pipeline Scope
                                    </span>
                                    <span className="text-xs text-slate-400 block mt-1">
                                        Tailored to your team size &amp; workflows (typically 2–3 weeks)
                                    </span>
                                </div>

                                <ul className="space-y-3 text-sm text-slate-200">
                                    {[
                                        "Capsule CRM Pipeline & Custom Opportunity Stages",
                                        "Transpond Automated Email & SMS Follow-Up Flows",
                                        "Direct Server-Side Form & Quote API Bridges",
                                        "Automated City, Trade & Lead-Source Tagging",
                                        "Live Team Training & Handoff in Central MS",
                                    ].map((f) => (
                                        <li key={f} className="flex items-center gap-2.5">
                                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href="/book"
                                className="w-full mt-8 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-bold text-xs uppercase tracking-[0.16em] text-center transition-all block"
                            >
                                Scope CRM Automation
                            </Link>
                        </div>

                        {/* Tier 2 */}
                        <div className="p-8 md:p-10 rounded-3xl bg-[#12141c] border-2 border-amber-500/45 flex flex-col justify-between relative shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
                            <div className="absolute -top-3.5 right-8 bg-amber-500 text-[#06080f] font-black text-[10px] uppercase tracking-[0.18em] px-4 py-1 rounded-full">
                                Custom Portals &amp; SaaS
                            </div>
                            <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 block mb-2">
                                    Bespoke Software Layer
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black uppercase text-white mb-3">
                                    Custom Portals, Ordering &amp; Apps
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                    Full-stack web applications, 0%-commission Square/Stripe ordering
                                    engines, customer portals, or multi-crew field tools tailored to
                                    your operation.
                                </p>
                                <div className="pb-6 mb-6 border-b border-white/[0.08]">
                                    <span className="text-2xl md:text-3xl font-black text-amber-400 uppercase tracking-tight block">
                                        Custom Architecture Quote
                                    </span>
                                    <span className="text-xs text-slate-400 block mt-1">
                                        Scoped case-by-case to your exact workflow &amp; integrations
                                    </span>
                                </div>

                                <ul className="space-y-3 text-sm text-slate-200">
                                    {[
                                        "Native Square Web SDK or Stripe Subscription Billing",
                                        "Secure Client / Crew Login Portals & Role Permissions",
                                        "Interactive Estimators, Feast Planners & Quote Math",
                                        "Serverless Database + Capsule CRM Two-Way Sync",
                                        "Optional PDM PinDrop™ & PinCam™ Field Suite Bundle",
                                    ].map((f) => (
                                        <li key={f} className="flex items-center gap-2.5">
                                            <Check className="w-4 h-4 text-amber-400 shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href="/book"
                                className="w-full mt-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#06080f] font-black text-xs uppercase tracking-[0.16em] text-center transition-all block shadow-[0_12px_30px_rgba(245,158,11,0.25)]"
                            >
                                Book Architecture Call
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <AuditCTA />

            <FAQAccordion
                faqs={[
                    {
                        question: "Why connect Capsule CRM directly instead of using Zapier?",
                        answer:
                            "Zapier bridges break silently when tokens expire and charge recurring monthly task fees as you grow. We build direct server-side API connections from your Next.js site straight into Capsule CRM and Transpond—faster (<300ms), more reliable, and zero middleman fees.",
                    },
                    {
                        question: "Can you build online ordering without 30% DoorDash or UberEats commissions?",
                        answer:
                            "Yes. Just like we built for T'Beaux's Seafood & Catering in Clinton, we integrate the Square Web SDK or Stripe directly inside your website so customers customize orders and pay on your domain with 0% marketplace commission loss.",
                    },
                    {
                        question: "Can I add PDM PinDrop™ and PinCam™ to my existing business?",
                        answer:
                            "Absolutely. Both PDM PinDrop™ and PinCam™ can be deployed onto your existing website as standalone field apps for your crew, or bundled directly into a custom Contractor Growth System build—scoped case-by-case to your crew and service area.",
                    },
                    {
                        question: "How long does a CRM setup or custom application take to launch?",
                        answer:
                            "A complete Capsule CRM + Transpond lead pipeline launches in 2 to 3 weeks. Custom ordering engines, interactive calculators, or client portals typically launch in 4 to 8 weeks depending on scope.",
                    },
                ]}
            />

            <Footer />
        </main>
    );
}
