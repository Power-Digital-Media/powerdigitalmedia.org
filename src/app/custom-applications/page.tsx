"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Cpu, Shield, Layers, BarChart3, Terminal as TerminalIcon, Cpu as CpuIcon, ArrowRight, Zap, Check, Video } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQAccordion from "@/components/ui/FAQAccordion";
import WakeUpCall from "@/components/ui/WakeUpCall";
import CyberHeroBg from "@/components/ui/shared/CyberHeroBg";
import TerminalWindow from "@/components/ui/web-design/TerminalWindow";
import AuditCTA from "@/components/sections/AuditCTA";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

interface AppProtocol {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    icon: React.ElementType | any;
    color: string;
    bg: string;
}

const appProtocols: AppProtocol[] = [
    {
        title: "CRM & Lead Automation",
        subtitle: "Sales Pipeline Systems",
        description: "Configure Capsule CRM and Transpond email pipelines to turn raw website traffic, social media leads, and offline QR codes into organized, high-converting pipelines automatically.",
        features: ["Capsule CRM Setup & Sync", "Transpond Automated Campaigns", "Bespoke Lead Capture Bridges", "Automated Contact Tagging"],
        icon: Shield,
        color: "text-blue-400",
        bg: "bg-blue-500/10"
    },
    {
        title: "Bespoke Custom Software",
        subtitle: "Client Portals & SaaS",
        description: "Secure client portals, operations dashboards, and multi-tenant SaaS hubs built to scale. Bridge customer data directly with your internal operations.",
        features: ["Multi-Tenant Authentication", "Operations HUDs & Live Data", "Stripe Subscription Engine", "Sub-20ms Edge Performance"],
        icon: BarChart3,
        color: "text-cyan-400",
        bg: "bg-cyan-500/10"
    },
    {
        title: "Operational API Bridges",
        subtitle: "System Integrations",
        description: "Secure, custom API connections bridging your forms, legacy systems, and external vendor APIs under one fast, serverless database layer.",
        features: ["Serverless Database Hubs", "Custom Webhook Integrations", "Zapier & Custom API Bridges", "Automated Reports (PDF/CSV)"],
        icon: Database,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10"
    }
];

export default function CustomApplicationsPage() {
    const baseUrl = "https://powerdigitalmedia.org";
    const breadcrumbItems = [
        { name: "Services", url: `${baseUrl}/#services` },
        { name: "CRM & Custom Apps", url: `${baseUrl}/custom-applications` }
    ];

    return (
        <main className="relative min-h-screen bg-background text-foreground overflow-x-clip">
            <BreadcrumbSchema items={breadcrumbItems} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "CRM, Automation & Custom Applications",
                        "provider": {
                            "@id": "https://powerdigitalmedia.org/#organization"
                        },
                        "description": "Premium Capsule CRM and Transpond integration setup, automated email marketing pipelines, and custom SaaS software engineering.",
                        "category": "Software Engineering & CRM Automation",
                        "serviceType": "CRM Setup & Custom Software Development",
                        "areaServed": {
                            "@type": "City",
                            "name": "Jackson",
                            "containedInPlace": {
                                "@type": "State",
                                "name": "Mississippi"
                            }
                        },
                        "offers": {
                            "@type": "AggregateOffer",
                            "priceCurrency": "USD",
                            "lowPrice": "4500",
                            "highPrice": "12500",
                            "offerCount": 2
                        }
                    })
                }}
            />

            <Navbar />

            {/* --- Hero: The Infrastructure --- */}
            <section className="viewport-section relative overflow-hidden flex flex-col justify-center min-h-[90vh]">
                <CyberHeroBg variant="custom-applications" />

                <div className="container relative z-10 px-4 mx-auto text-center mt-32 md:mt-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-5xl mx-auto"
                    >
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 block">CRM, Automation & Custom Apps</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.85] uppercase">
                            Jackson MS <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 text-glow-cyan">
                                CRM & Custom Apps
                            </span>
                        </h1>
                        <p className="text-xl md:text-3xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                            We deploy Capsule CRM and Transpond automation pipelines to track every lead, and build <span className="text-white font-medium">bespoke custom software</span> to run your entire operations.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/book" className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black rounded-full hover:bg-cyan-400 hover:text-white transition-all uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(255,255,255,0.2)] text-center">
                                Initialize Platform Build
                            </Link>
                            <Link href="/book" className="w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-5 border border-white/20 rounded-full hover:bg-cyan-400 hover:text-white hover:border-cyan-400 transition-all font-bold uppercase tracking-widest text-sm group active:scale-95">
                                <Video className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
                                Schedule a Google Meet
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Scroll to Explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse" />
                </div>
            </section>

            {/* Answer Engine Optimization Block */}
            <section className="py-12 bg-[#050505] border-y border-white/5 relative z-20">
                <div className="container px-4 mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">What are CRM Systems & Custom Applications?</h2>
                    <p className="text-foreground/70 leading-relaxed font-light">
                        CRM & Custom Applications are tools designed to manage your customer relationships, automate follow-up emails, and streamline business processes. By integrating Capsule CRM and Transpond email marketing with custom Next.js dashboards, we help you eliminate admin overhead, secure client data, and capture leads from every online and offline marketing channel automatically.
                    </p>
                </div>
            </section>

            <WakeUpCall
                title="Stop running your operations on duct-taped spreadsheets."
                subtitle="Fragmented software is costing you administrative hours and lost leads."
                paragraph="If your business relies on five different software subscriptions bridged together with unstable Zapiers, your pipeline is fragile. A unified setup bridges your Capsule CRM directly with Transpond and your website forms under one lightning-fast, automated system. Zero licensing bloat. Absolute control."
            />

            {/* --- Section 1: The Protocols (Core Pillars) --- */}
            <section id="protocols" className="py-32 relative bg-background">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mb-24">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Bespoke Specifications</span>
                        <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">CRM & Software Pillars.</h2>
                        <p className="text-xl text-foreground/60 leading-relaxed max-w-2xl font-light">
                            Our software architecture integrates secure CRM tracking, direct email marketing pipelines, and custom software dashboards under a single automated ecosystem.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {appProtocols.map((protocol, index) => (
                            <motion.div
                                key={protocol.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="group relative p-10 rounded-[3rem] glass-card border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-700 overflow-hidden"
                            >
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[60px] md:blur-[100px] pointer-events-none rounded-[3rem] ${protocol.bg.replace('/10', '/20')}`} />

                                <div className="relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl ${protocol.bg} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}>
                                        <protocol.icon className={`w-8 h-8 ${protocol.color} group-hover:animate-pulse`} />
                                    </div>
                                    <span className={`${protocol.color} font-bold tracking-widest uppercase text-[10px] mb-3 block transform group-hover:translate-x-2 transition-transform duration-500`}>
                                        {protocol.subtitle}
                                    </span>
                                    <h3 className="text-3xl font-bold mb-6 transform group-hover:translate-x-2 transition-transform duration-500 delay-75">
                                        {protocol.title}
                                    </h3>
                                    <p className="text-foreground/70 mb-10 leading-relaxed text-lg font-light transform group-hover:translate-x-2 transition-transform duration-500 delay-100">
                                        {protocol.description}
                                    </p>
                                    <ul className="space-y-4">
                                        {protocol.features.map((feature, i) => (
                                            <li
                                                key={feature}
                                                className={`flex items-center gap-3 text-sm font-medium text-foreground/50 border-l border-white/10 pl-4 transition-all duration-500 group-hover:text-foreground/80 transform group-hover:translate-x-4`}
                                                style={{ transitionDelay: `${150 + i * 75}ms` }}
                                            >
                                                <div className={`w-1.5 h-1.5 rounded-full ${protocol.bg.replace('/10', '/50')} opacity-0 group-hover:opacity-100 transition-opacity absolute -left-[3px]`} />
                                                <span className="relative">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Section 2: Technical Specifications --- */}
            <section className="viewport-section relative bg-background border-t border-white/5">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
                    <div className="absolute inset-0 cyber-grid-small opacity-10" />
                </div>

                <div className="container relative z-10 px-4 mx-auto">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Engine Specs</span>
                            <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tight leading-tight">Serverless Code.<br />Zero Licensing.</h2>
                            <p className="text-xl text-foreground/70 mb-12 leading-relaxed font-light">
                                Off-the-shelf software subscriptions bleed your business with recurring seat licensing. We deploy serverless architectures that only charge based on usage. Pay pennies for actual activity, not static account fees.
                            </p>
                            <div className="grid grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Zap className="w-6 h-6 text-cyan-400" />
                                        <span className="font-bold text-xl">Supabase & Edge</span>
                                    </div>
                                    <p className="text-sm text-foreground/50">PostgreSQL engine with instantly scaling serverless API layers.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-6 h-6 text-blue-400" />
                                        <span className="font-bold text-xl">Edge Firewall</span>
                                    </div>
                                    <p className="text-sm text-foreground/50">Iron-clad database connections with multi-level row policies.</p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex-1 w-full max-w-md mx-auto">
                            <TerminalWindow />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Pricing & Investment --- */}
            <section id="investment" className="py-32 relative bg-background overflow-hidden scroll-mt-24 border-t border-white/5">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-24">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Pricing Tiers</span>
                        <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">Software Scope.</h2>
                        <p className="text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto font-light">
                            High-velocity software built to be an asset for your business. Select your protocol depth.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                        {/* Package 1 */}
                        <div className="p-8 rounded-[2.5rem] glass-card border border-white/5 bg-white/[0.01] flex flex-col justify-between">
                            <div>
                                <span className="text-cyan-400 font-bold tracking-widest uppercase text-[10px] mb-2 block">Automation Layer</span>
                                <h3 className="text-3xl font-bold text-white mb-4">CRM & Automation</h3>
                                <p className="text-foreground/60 text-sm mb-6 leading-relaxed">
                                    Bespoke Capsule CRM & Transpond email automation setup. Unify your website lead capture, event QR forms, and marketing emails under one robust system.
                                </p>
                                <span className="text-4xl font-black text-white">Starting at $2,500</span>
                                <span className="text-xs text-foreground/40 block mt-1">One-time setup scope</span>

                                <ul className="space-y-3 mt-8 border-t border-white/5 pt-6 text-sm text-foreground/75">
                                    {["Capsule CRM Setup & Pipeline Design", "Transpond Email Campaign Automation", "Bespoke Lead Capture API Bridges", "Automated Contact Tagging & Pipelines"].map((f) => (
                                        <li key={f} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link href="/book" className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full transition-colors text-center text-xs uppercase tracking-widest border border-white/10 block">
                                Request Specs Audit
                            </Link>
                        </div>

                        {/* Package 2 */}
                        <div className="p-8 rounded-[2.5rem] glass-card border border-cyan-500/30 bg-cyan-950/10 flex flex-col justify-between relative">
                            <div className="absolute -top-4 right-8 bg-cyan-400 text-slate-950 font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                                Most Requested
                            </div>
                            <div>
                                <span className="text-cyan-400 font-bold tracking-widest uppercase text-[10px] mb-2 block">Enterprise Layer</span>
                                <h3 className="text-3xl font-bold text-white mb-4">Custom SaaS & Software</h3>
                                <p className="text-foreground/60 text-sm mb-6 leading-relaxed">
                                    Full multi-tenant portal or platform development. Perfect for launching a software product, building custom client areas, or creating proprietary SaaS hubs.
                                </p>
                                <span className="text-4xl font-black text-white">$12,500+</span>
                                <span className="text-xs text-foreground/40 block mt-1">One-time development scope</span>

                                <ul className="space-y-3 mt-8 border-t border-white/5 pt-6 text-sm text-foreground/75">
                                    {["Full Multi-Tenant Authentication", "Stripe Subscription & Payments Gateway", "Advanced Dynamic Admin Privileges", "Serverless PostgreSQL Database Sync", "Enterprise API & CRM Integrations"].map((f) => (
                                        <li key={f} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link href="/book" className="w-full mt-8 py-4 bg-cyan-400 text-slate-950 hover:bg-white transition-colors font-bold rounded-full text-center text-xs uppercase tracking-widest block shadow-[0_0_35px_rgba(34,211,238,0.2)]">
                                Initialize Build Call
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <AuditCTA />

            {/* --- FAQs --- */}
            <FAQAccordion
                faqs={[
                    {
                        question: "Why should I choose automated CRM and custom apps over duct-taped software?",
                        answer: "Using unstable Zapier bridges and paying multiple software licenses is fragile and expensive. By integrating Capsule CRM and Transpond directly with custom Next.js endpoints, you get a bulletproof lead pipeline with zero Zapier fees and total control over your customer records."
                    },
                    {
                        question: "Do you link my custom application to my Capsule CRM?",
                        answer: "Yes, absolutely. We build robust server-side synchronization bridges. When a client performs an action inside your custom portal, it immediately writes notes, maps custom tags, and creates opportunities directly inside your Capsule CRM dynamically."
                    },
                    {
                        question: "How long does a CRM automation or custom app take to set up?",
                        answer: "We can deploy and sync a complete Capsule CRM and Transpond automation setup in 2 to 3 weeks. Custom SaaS portals or operations dashboards typically deploy within 6 to 10 weeks."
                    },
                    {
                        question: "Is Next.js secure enough for financial databases?",
                        answer: "Yes. By deploying Next.js Server Components, our backend API endpoints run fully server-side. Sensitive database credentials and keys are never visible to the client, preventing common browser hacking and data injection attempts."
                    }
                ]}
            />

            <Footer />
        </main>
    );
}
