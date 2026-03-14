"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Cpu, Zap, Shield, Search, ArrowRight, BarChart3, Layers } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Portfolio from "@/components/sections/Portfolio";
import ArchitectureCompare from "@/components/sections/ArchitectureCompare";
import BookingModal from "@/components/ui/BookingModal";
import WebDesignPricing from "@/components/ui/billing/WebDesignPricing";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import WireframeHeroBg from "@/components/ui/web-design/WireframeHeroBg";
import TerminalWindow from "@/components/ui/web-design/TerminalWindow";
import LiveScanner from "@/components/ui/web-design/LiveScanner";
import WakeUpCall from "@/components/ui/WakeUpCall";


interface Protocol {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    icon: React.ElementType | any; // Lucide icon
    color: string;
    bg: string;
}

interface Tier {
    name: string;
    investment: string;
    description: string;
    features: string[];
    cta: string;
    accent: string;
    featured?: boolean;
}

const protocols: Protocol[] = [
    {
        title: "The Aesthetic Protocol",
        subtitle: "Visual Prestige",
        description: "We don't build generic pages. We craft immersive digital environments that signal immediate authority and high-tier value.",
        features: ["Tesla-Level Minimalism", "Kinetic Typography", "Cinematic Media Integration", "Glassmorphic Depth"],
        icon: Globe,
        color: "text-blue-400",
        bg: "bg-blue-500/10"
    },
    {
        title: "The Engineering Layer",
        subtitle: "Technical Superiority",
        description: "Built on Next.js 14. Lightning-fast load times and iron-clad security protocols that outperform 99% of the web.",
        features: ["Next.js 14 Core", "Edge CDN Distribution", "Semantic SEO Structure", "0.4s Interaction Load"],
        icon: Cpu,
        color: "text-cyan-400",
        bg: "bg-cyan-500/10"
    },
    {
        title: "The Conversion Hub",
        subtitle: "ROI Architecture",
        description: "Direct synchronization with the Power Digital Growth Engine. Designed to turn attention into measurable engineered dominance.",
        features: ["Growth Engine Sync", "High-Velocity Funnels", "Data-Driven UX", "Conversion Protocol"],
        icon: BarChart3,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10"
    }
];

const tiers: Tier[] = [
    {
        name: "Identity Protocol",
        investment: "$5,500+",
        description: "For leaders and organizations requiring a singular, high-prestige flagship presence to ground their digital authority.",
        features: ["Bespoke Visual Identity", "Next.js Performance Core", "Cinematic Media Layer", "Premium SEO Foundation"],
        cta: "Deploy Identity",
        accent: "border-blue-500/20"
    },
    {
        name: "Growth Architecture",
        investment: "$12,500+",
        description: "The complete system. Full integration between your Media Studio and the Growth Engine to drive measurable scale.",
        features: ["Full Studio + Engine Sync", "High-Velocity Funnel Layer", "Automated Lead Protocol", "Ecosystem Brand Scaling"],
        cta: "Initialize Growth",
        accent: "border-cyan-500/40",
        featured: true
    },
    {
        name: "Enterprise Ecosystem",
        investment: "$25,000+",
        description: "For organizations managing multiple brands or high-volume traffic. Custom engineered multi-site synchronization.",
        features: ["Custom Protocol Sync", "Dedicated Engineering Hub", "Multi-Brand Architecture", "Advanced Data Layer"],
        accent: "border-indigo-500/20",
        cta: "Contact Enterprise"
    }
];

export default function WebDesignPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const baseUrl = "https://powerdigitalmedia.org";
    const breadcrumbItems = [
        { name: "Services", url: `${baseUrl}/#services` },
        { name: "Web Design", url: `${baseUrl}/web-design` }
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
                        "name": "High-Velocity Web Design & Architecture",
                        "provider": {
                            "@id": "https://powerdigitalmedia.org/#organization"
                        },
                        "description": "Premium Next.js and React-based web design, development, and digital architecture for high-ticket businesses.",
                        "category": "Web Design",
                        "serviceType": "Bespoke Web Development",
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
                            "lowPrice": "5500",
                            "highPrice": "25000+"
                        }
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Do you use WordPress for your web design?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "No. We exclusively build high-velocity digital engines using modern frameworks like Next.js and React, hosted on Edge networks for maximum performance, security, and AI-crawler compatibility."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How long does a website build take?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Our flagship Identity Protocol builds typically launch within 4-6 weeks, pending client feedback and asset collection. Complex enterprise ecosystems may take longer."
                                }
                            }
                        ]
                    })
                }}
            />
            <Navbar />

            {/* --- Hero: The Architecture --- */}
            <section className="viewport-section relative overflow-hidden flex flex-col justify-center min-h-[90vh]">
                <WireframeHeroBg />

                <div className="container relative z-10 px-4 mx-auto text-center mt-32 md:mt-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-5xl mx-auto"
                    >
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 block">Premium Digital Infrastructure</span>
                        <h1 className="text-5xl md:text-9xl font-bold mb-10 tracking-tighter leading-tight">
                            Digital <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 text-glow-cyan text-glow pb-2">
                                Architecture.
                            </span>
                        </h1>
                        <p className="text-xl md:text-3xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                            We don&apos;t build websites. We deploy <span className="text-white font-medium">high-velocity digital engines</span> engineered for prestige and engineered for dominance.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black rounded-full hover:bg-cyan-400 hover:text-white transition-all uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                            >
                                Initialize Build
                            </button>
                            <Link href="#protocols" className="w-full sm:w-auto flex items-center justify-center px-12 py-5 border border-white/20 rounded-full hover:bg-white/5 transition-all font-bold uppercase tracking-widest text-sm">
                                View Protocols
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
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">What is Bespoke Web Architecture?</h2>
                    <p className="text-foreground/70 leading-relaxed font-light">
                        Bespoke Web Architecture is the process of building high-velocity digital engines using modern frameworks like Next.js and React, hosted on Edge CDN networks. Unlike traditional template builders like WordPress, this approach guarantees maximum conversion speed, zero interaction lag, and elite AI-crawler compatibility for high-ticket businesses.
                    </p>
                </div>
            </section>

            <WakeUpCall
                title="Stop building digital brochures. Start deploying high-velocity conversion engines."
                subtitle="Your website is costing you high-ticket clients."
                paragraph="A modern website isn't a digital business card—it's a 24/7 sales architecture. If your current site isn't actively generating qualified leads, closing deals, and asserting your absolute dominance in the market, it's obsolete. We don't use templates. We build bespoke applications that turn attention into revenue."
            />

            {/* --- Section 1: The Protocols --- */}
            <section id="protocols" className="py-32 relative bg-background">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mb-24">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Standard Operating Protocol</span>
                        <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">Triple-Layer Build.</h2>
                        <p className="text-xl text-foreground/60 leading-relaxed max-w-2xl">
                            Our architecture is built on three unbreakable pillars. We integrate visual prestige with technical superiority and conversion-ready systems.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {protocols.map((protocol, index) => (
                            <motion.div
                                key={protocol.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="group relative p-10 rounded-[3rem] glass-card border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-700 overflow-hidden"
                            >
                                {/* Animated Core Glow */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[60px] md:blur-[100px] pointer-events-none rounded-[3rem] ${protocol.bg.replace('/10', '/20')}`} />

                                <div className="relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl ${protocol.bg} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-[0_0_0_rgba(255,255,255,0)] group-hover:shadow-[0_0_30px_var(--tw-shadow-color)]`} style={{ '--tw-shadow-color': protocol.color === 'text-cyan-400' ? 'rgba(34,211,238,0.2)' : protocol.color === 'text-blue-400' ? 'rgba(96,165,250,0.2)' : 'rgba(129,140,248,0.2)' } as any}>
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
                                                <div className={`w-1.5 h-1.5 rounded-full ${protocol.bg.replace('/10', '/50')} opacity-0 group-hover:opacity-100 transition-opacity absolute -left-[3px]`} style={{ transitionDelay: `${200 + i * 75}ms` }} />
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

            {/* --- Interactive Architecture Comparison --- */}
            <ArchitectureCompare />

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
                            <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">The Engine Room</span>
                            <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tight leading-tight">0.3s Interaction. <br /> Zero Friction.</h2>
                            <p className="text-xl text-foreground/70 mb-12 leading-relaxed font-light">
                                Speed isn&apos;t just a metric; it&apos;s a conversion factor. We utilize React and Next.js to deliver instant-load experiences that keep your audience engaged. No spinny circles. No lag. Just performance.
                            </p>
                            <div className="grid grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Zap className="w-6 h-6 text-cyan-400" />
                                        <span className="font-bold text-xl">Vercel Edge</span>
                                    </div>
                                    <p className="text-sm text-foreground/50">Global content distribution at the edge of the network.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-6 h-6 text-blue-400" />
                                        <span className="font-bold text-xl">SSL Protocol</span>
                                    </div>
                                    <p className="text-sm text-foreground/50">Enterprise-grade security on every dynamic route.</p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex-1 w-full max-w-md mx-auto">
                            <TerminalWindow />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Integration: 3D Proof of Work --- */}
            <Portfolio titleAs="h2" />



            {/* --- NEW: Live Scanner Lead Magnet --- */}
            <LiveScanner />

            {/* --- Section 3: Investment Roadmap --- */}
            <section className="py-32 relative bg-background overflow-hidden">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-24">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Deployment Phases</span>
                        <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">Investment Roadmap.</h2>
                        <p className="text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto font-light">
                            High-prestige architecture is an investment in your organization&apos;s future dominance. Select your protocol depth.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3 mb-20">
                        {/* Interactive Pricing Hub */}
                        <div className="col-span-full">
                            <WebDesignPricing />
                        </div>
                    </div>


                    <div className="mt-20 text-center">
                        <p className="text-[10px] text-foreground/20 uppercase tracking-[0.3em] font-medium">
                            * All architectures include enterprise-grade edge hosting and technical support protocols.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Final CTA: The Ecosystem --- */}
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
                            Ready for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Peak Performance?</span>
                        </h2>
                        <p className="text-xl text-foreground/60 mb-16 max-w-xl mx-auto leading-relaxed">
                            Stop building websites. Start engineering your digital dominance. Deploy your custom growth architecture today.
                        </p>
                        <button
                            onClick={() => setIsBookingOpen(true)}
                            className="inline-block bg-white text-black px-16 py-8 rounded-full font-black uppercase tracking-[0.3em] text-sm hover:scale-105 transition-all shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:shadow-cyan-400/50"
                        >
                            Initialize Contact
                        </button>
                    </motion.div>
                </div>
            </section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "High-Velocity Web Architecture & Design",
                        "provider": {
                            "@type": "ProfessionalService",
                            "name": "Power Digital Media"
                        },
                        "serviceType": "Web Design",
                        "description": "Premium digital infrastructure engineered for visual prestige, technical superiority, and conversion dominance. Hand-coded React and Next.js platforms.",
                        "areaServed": {
                            "@type": "City",
                            "name": "Jackson",
                            "addressRegion": "MS"
                        },
                        "offers": {
                            "@type": "AggregateOffer",
                            "priceCurrency": "USD",
                            "lowPrice": "5500",
                            "highPrice": "25000",
                            "offerCount": 3
                        }
                    })
                }}
            />
            <Footer />

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </main>
    );
}
