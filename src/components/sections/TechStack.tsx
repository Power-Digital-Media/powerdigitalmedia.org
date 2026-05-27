"use client";

import { m } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const mainStack = [
    {
        name: "Next.js 14 & React Server Components",
        type: "The Framework Core",
        description: "High-Performance Edge Architecture. Blistering fast edge rendering and React server-side optimization. The ultimate codebase architecture for 2026 search engine crawler dominance, providing sub-200ms Largest Contentful Paint (LCP) performance.",
        image: "/portfolio/growth-engine-real.webp",
        specs: ["React Server Components", "Vercel Edge Distribution", "Sub-200ms Interactive Load"]
    },
    {
        name: "Supabase & Serverless PostgreSQL",
        type: "The Database Engine",
        description: "Enterprise-Grade Real-Time Data. Sub-20ms database query execution, secure row-level security (RLS) policies, and instant serverless scaling to handle massive user spikes with absolute data security.",
        image: "/images/growth-data-overlay.webp",
        specs: ["Serverless PostgreSQL", "Real-Time Sockets Sync", "Row-Level Security Policies"]
    },
    {
        name: "Capsule CRM & Transpond Automation",
        type: "The System Bridge",
        description: "Official CRM & Marketing Partner. Seamless operations integration through REST API webhooks, automated contact synchronization, and dynamic tag segmentation. Instantly capture customer intent and convert leads into paid client pipelines.",
        image: "/images/capsule_transpond_sync.png",
        specs: ["Official Partnership Integrations", "REST API Automated Sync", "Transpond Email Marketing Automations"]
    }
];

export default function TechStack() {
    return (
        <section id="studio" className="relative py-28 md:py-48 overflow-hidden">
            <div className="container relative z-10 px-6 mx-auto">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center mb-24 md:mb-40"
                >
                    <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block">Infrastructure</span>
                    <h2 className="text-4xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-none">Precision Implements.</h2>
                    <p className="text-base md:text-2xl text-foreground/70 leading-relaxed text-balance font-light">
                        We don&apos;t just write code. We select and orchestrate world-class technology stacks to ensure your digital footprint is lightning-fast, highly secure, and optimized for conversions.
                    </p>
                </m.div>

                <div className="space-y-40">
                    {mainStack.map((item, index) => (
                        <m.div
                            key={item.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-16 items-center`}
                        >
                            <div className="flex-1 w-full h-[280px] md:h-[500px] relative rounded-3xl overflow-hidden glass-card">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                            </div>
                            <div className="flex-1 max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start w-full">
                                <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block text-center lg:text-left w-full">{item.type}</span>
                                <h3 className="text-3xl md:text-5xl font-bold mb-6 text-center lg:text-left w-full">{item.name}</h3>
                                <p className="text-lg text-foreground/80 mb-8 leading-relaxed text-left w-full">
                                    {item.description}
                                </p>
                                <ul className="flex flex-wrap gap-3 mb-8 w-full justify-start">
                                    {item.specs.map((spec) => (
                                        <li key={spec} className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest text-white/70 bg-white/[0.02] border border-white/5 rounded-full px-4 py-2.5 hover:bg-white/[0.04] hover:border-accent/30 transition-all duration-300 w-fit shrink-0">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#22d3ee] flex-shrink-0" />
                                            <span>{spec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </m.div>
                    ))}
                </div>

                <div className="mt-40 p-12 rounded-[32px] glass-card border-accent/10 bg-accent/[0.02] text-center max-w-4xl mx-auto">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8 border border-accent/20">
                        <Zap className="w-8 h-8 text-accent" />
                    </div>
                    <h4 className="text-2xl font-bold mb-4">Production-Ready Guarantee</h4>
                    <p className="text-foreground/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                        Every build is backed by redundant edge server failovers, automated testing suites, and secure data encryption protocols. Your business integrity is our highest priority.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-accent font-bold hover:gap-4 transition-all">
                        Initialize Your Build <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
        </section>
    );
}
