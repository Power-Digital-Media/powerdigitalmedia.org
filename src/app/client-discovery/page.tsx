"use client";

import { motion } from "framer-motion";
import { Mic2, TrendingUp, Globe, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { LucideIcon } from "lucide-react";

/* ─── Service Card Data ─────────────────────────────────────────── */
interface ServiceRoute {
    title: string;
    subtitle: string;
    description: string;
    icon: LucideIcon;
    href: string;
    gradient: string;
    borderColor: string;
    glowColor: string;
    accentText: string;
    features: string[];
}

const services: ServiceRoute[] = [
    {
        title: "Podcasting",
        subtitle: "The Studio",
        description:
            "Launch or level up your podcast with studio-grade production, branding, and distribution strategy.",
        icon: Mic2,
        href: "/podcasting/discovery",
        gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
        borderColor: "border-cyan-500/30 hover:border-cyan-400/60",
        glowColor: "shadow-[0_0_40px_rgba(34,211,238,0.08)] hover:shadow-[0_0_60px_rgba(34,211,238,0.15)]",
        accentText: "text-cyan-400",
        features: ["Show Strategy & Naming", "Broadcast-Quality Production", "Distribution & Growth"],
    },
    {
        title: "Marketing",
        subtitle: "The Reach",
        description:
            "Data-driven digital marketing, SEO, and growth strategy that converts traffic into revenue.",
        icon: TrendingUp,
        href: "/marketing/discovery",
        gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
        borderColor: "border-purple-500/30 hover:border-purple-400/60",
        glowColor: "shadow-[0_0_40px_rgba(168,85,247,0.08)] hover:shadow-[0_0_60px_rgba(168,85,247,0.15)]",
        accentText: "text-purple-400",
        features: ["SEO & Search Dominance", "Social Media Management", "Paid Advertising Strategy"],
    },
    {
        title: "Web Design",
        subtitle: "The System",
        description:
            "High-performance websites and digital systems engineered for speed, conversion, and scale.",
        icon: Globe,
        href: "/web-design/discovery",
        gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
        borderColor: "border-blue-500/30 hover:border-blue-400/60",
        glowColor: "shadow-[0_0_40px_rgba(59,130,246,0.08)] hover:shadow-[0_0_60px_rgba(59,130,246,0.15)]",
        accentText: "text-blue-400",
        features: ["Custom Website Build", "E-Commerce Solutions", "Ongoing Site Management"],
    },
];

/* ─── Service Card Component ────────────────────────────────────── */
function ServiceCard({ service, index }: { service: ServiceRoute; index: number }) {
    const Icon = service.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link href={service.href} className="block group h-full">
                <div
                    className={`relative h-full p-8 md:p-10 rounded-3xl border ${service.borderColor} ${service.glowColor} bg-white/[0.02] backdrop-blur-sm transition-all duration-500 overflow-hidden`}
                >
                    {/* Gradient Background */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                        {/* Icon + Subtitle */}
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 flex items-center justify-center ${service.accentText} transition-all duration-300`}
                            >
                                <Icon className="w-6 h-6" />
                            </div>
                            <span
                                className={`text-[10px] font-black tracking-[0.3em] uppercase ${service.accentText} opacity-70`}
                            >
                                {service.subtitle}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-white group-hover:translate-x-1 transition-transform duration-300">
                            {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-8 font-light">
                            {service.description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-3 mb-10 flex-grow">
                            {service.features.map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-center gap-3 text-xs md:text-sm text-white/50 group-hover:text-white/70 transition-colors"
                                >
                                    <div
                                        className={`w-1.5 h-1.5 rounded-full ${service.accentText.replace("text-", "bg-")} opacity-60 shrink-0`}
                                    />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {/* CTA */}
                        <div
                            className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest ${service.accentText} group-hover:gap-3 transition-all duration-300`}
                        >
                            Start Discovery
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function ClientDiscoveryPage() {
    return (
        <main className="relative min-h-screen bg-background">
            <Navbar />

            {/* ─── Hero ─────────────────────────────────────────── */}
            <section className="relative pt-32 pb-8 md:pt-40 md:pb-12 overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 blur-[120px] pointer-events-none -z-10" />
                <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] pointer-events-none -z-10" />

                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                            <Zap className="w-3.5 h-3.5" />
                            Initialize Protocol
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl mb-6 leading-[0.95]">
                            What Are We{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400">
                                Building?
                            </span>
                        </h1>
                        <p className="text-base md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed font-light">
                            Select your service below. Each discovery form is tailored to
                            capture exactly what we need to engineer your growth.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ─── Service Cards ─────────────────────────────────── */}
            <section className="pb-24 md:pb-32 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="max-w-5xl mx-auto grid gap-6 md:gap-8 md:grid-cols-3">
                        {services.map((service, i) => (
                            <ServiceCard key={service.title} service={service} index={i} />
                        ))}
                    </div>

                    {/* Not Sure? CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-center mt-12 md:mt-16"
                    >
                        <p className="text-sm text-slate-500 mb-4">
                            Not sure which service you need?
                        </p>
                        <Link
                            href="/book"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.03] text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all duration-300"
                        >
                            Book a Free Consultation
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
