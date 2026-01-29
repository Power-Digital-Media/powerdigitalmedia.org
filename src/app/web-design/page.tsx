"use client";

import { motion } from "framer-motion";
import { Globe, Layout, Palette, ShieldCheck, Gauge, Search, ArrowRight, MousePointer2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const services = [
    {
        title: "High-Performance Design",
        description: "Stunning, user-friendly websites that drive engagement and results.",
        features: [
            "Mobile-Responsive Layouts",
            "User-Focused Interfaces",
            "Fast Loading Times",
            "SEO Integration"
        ],
        icon: Layout
    },
    {
        title: "Strategic Branding",
        description: "Cohesive branding strategies that capture your personality and resonance.",
        features: [
            "Logo Design & Identity",
            "Color & Typography Systems",
            "Consistent Brand Voice",
            "Visual Strategy"
        ],
        icon: Palette
    },
    {
        title: "Stress-Free Management",
        description: "Let us handle the technical side while you focus on growth.",
        features: [
            "Regular Updates & Security",
            "Performance Monitoring",
            "Content Updates",
            "Managed Hosting Specs"
        ],
        icon: ShieldCheck
    }
];

export default function WebDesignPage() {
    return (
        <main className="relative min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-sm font-bold tracking-[0.3em] text-accent uppercase mb-6 flex items-center justify-center gap-2">
                            <Globe className="w-4 h-4" /> Digital Architecture
                        </h1>
                        <h2 className="text-5xl font-bold tracking-tight md:text-7xl mb-8 leading-[1.1]">
                            Transform Your Online Presence <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 text-glow">
                                With Expert Design.
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-10 text-balance max-w-2xl mx-auto">
                            We specialize in creating stunning, user-friendly websites that blend creativity with broadcast-grade functionality.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="px-8 py-4 font-bold text-white bg-accent rounded-full border-glow hover:bg-accent/90 transition-all">
                                Start My Project
                            </Link>
                            <Link href="/our-work" className="px-8 py-4 font-bold transition-all border rounded-full glass-card hover:bg-white/5">
                                View Solutions
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Modern Grid Section */}
            <section className="py-24 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group p-8 rounded-[2.5rem] glass-card border-white/5 hover:border-accent/40 bg-accent/5 transition-all duration-500"
                            >
                                <div className="p-4 rounded-2xl bg-accent/10 w-fit mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <service.icon className="w-8 h-8 text-accent" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-muted-foreground mb-8 leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-4">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-foreground/70">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Highlight */}
            <section className="py-24 bg-accent/5 border-y border-white/5">
                <div className="container px-4 mx-auto">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1">
                            <h3 className="text-3xl font-bold mb-6">Built for Speed and SEO.</h3>
                            <p className="text-lg text-muted-foreground mb-8">
                                Every site we build is optimized for fast loading times and discoverability. We don&apos;t just build pretty pages; we build digital systems that bring your message to the forefront of search.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="flex items-center gap-4">
                                    <Gauge className="w-6 h-6 text-accent" />
                                    <span className="font-bold">Next-Gen Performance</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Search className="w-6 h-6 text-accent" />
                                    <span className="font-bold">Strategic SEO</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full aspect-square relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-accent/10 blur-[100px] -z-10" />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-64 h-64 border-2 border-dashed border-accent/30 rounded-full flex items-center justify-center"
                            >
                                <div className="w-48 h-48 border-2 border-dashed border-accent/50 rounded-full flex items-center justify-center">
                                    <div className="w-32 h-32 bg-accent rounded-full border-glow flex items-center justify-center">
                                        <MousePointer2 className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
