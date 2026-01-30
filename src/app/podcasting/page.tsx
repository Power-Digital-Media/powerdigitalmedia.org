"use client";

import { motion } from "framer-motion";
import { Mic2, Radio, Camera, Video, Zap, CheckCircle2, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShowcaseReel from "@/components/ui/ShowcaseReel";
import BookingModal from "@/components/ui/BookingModal";
import ProductionPipeline from "@/components/ui/ProductionPipeline";
import AudioComparison from "@/components/ui/AudioComparison";
import TechSchematic from "@/components/ui/TechSchematic";
import AddOnProtocols from "@/components/ui/AddOnProtocols";
import HookGenerator from "@/components/ui/HookGenerator";
import { useState } from "react";
import Image from "next/image";

const tiers = [
    {
        name: "Foundational Broadcast",
        price: "500",
        description: "Your proven entry-level protocol. High-fidelity audio messaging with cinematic single-cam capture.",
        features: [
            "4 Episodes (1 Session/mo)",
            "Up to 4 In-Studio Guests",
            "Quad RØDE PodMic Array",
            "Professional Engineering",
            "YouTube/FB/Twitch Sync"
        ],
        accent: "blue"
    },
    {
        name: "Growth Engine",
        price: "1,000",
        description: "The sweet spot for brand authority. Multi-cam 4K production + high-velocity viral clipping.",
        features: [
            "4 Episodes (4K Video)",
            "Quad-Platform Live Stream",
            "4 Viral Social Clips",
            "Multi-Mic + Dual-Cam AI",
            "Post-Production & SEO"
        ],
        accent: "blue",
        popular: true
    },
    {
        name: "Authority Suite",
        price: "1,500",
        description: "The total production takeover. Cinematic multi-cam, viral synchronization, and global distribution.",
        features: [
            "4 Episodes (Multi-Cam 4K)",
            "Quad-Platform Live Stream",
            "8 Viral Social Clips",
            "Full Quad-Cam AI Array",
            "Dedicated Show Manager"
        ],
        accent: "blue"
    }
];

export default function PodcastingPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <main className="relative min-h-screen bg-background overflow-x-hidden">
            <Navbar />

            {/* Cinematic Background Layers (Global for Landing Page) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Darkened Studio Base with Vertical Fade */}
                <div className="absolute inset-0 mask-gradient-v opacity-30 md:opacity-100">
                    <Image
                        src="/images/studio-mood-bg.png"
                        alt="Studio Environment"
                        fill
                        className="object-cover opacity-20 scale-105"
                    />
                </div>

                {/* Growth Graphs Overlay - Top Right with Radial Fade */}
                <div className="absolute top-12 -right-32 md:top-24 md:-right-24 w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-10 md:opacity-20 blur-[2px] md:blur-[1px] mask-gradient-radial">
                    <Image
                        src="/images/growth-data-overlay.png"
                        alt="Growth Metrics"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Growth Graphs Overlay - Bottom Left with Radial Fade */}
                <div className="absolute -bottom-24 -left-32 md:-bottom-48 md:-left-24 w-[400px] h-[400px] md:w-[800px] md:h-[800px] opacity-10 blur-[4px] rotate-12 mask-gradient-radial">
                    <Image
                        src="/images/growth-data-overlay.png"
                        alt="Audience Dynamics"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Global Vignette & Blend Layer */}
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-90 md:opacity-80" />
                <div className="absolute inset-0 bg-radial-vignette opacity-80 md:opacity-70" />
            </div>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
                {/* Cinematic Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/podcast-hero-cinematic.png"
                        alt="High-end Podcast Studio"
                        fill
                        className="object-cover opacity-30 scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-60" />
                </div>

                <div className="container px-4 mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-10 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            Elite Production Suite
                        </div>

                        <h1 className="text-5xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] uppercase">
                            The Audio <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-indigo-500 text-glow-cyan">
                                Authority.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed mb-12 max-w-2xl mx-auto font-light tracking-tight">
                            We don&apos;t just record episodes. We engineer <span className="text-white font-medium italic">high-velocity digital assets</span> designed for total industry dominance.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="w-full sm:w-auto px-10 py-5 font-black text-slate-950 bg-accent rounded-full border-glow hover:bg-white transition-all uppercase tracking-widest text-[11px]"
                            >
                                Initialize Protocol
                            </button>
                            <Link href="#tiers" className="w-full sm:w-auto px-10 py-5 font-black transition-all border border-white/10 rounded-full glass-card hover:bg-white/5 uppercase tracking-widest text-[11px]">
                                View Production Tiers
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Ambient Floor Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </section>

            {/* Showcase Section */}
            <ShowcaseReel />

            {/* AI Growth Intelligence (Primary Conversion Slot) */}
            <HookGenerator />

            {/* Power Protocol Pipeline */}
            <ProductionPipeline />

            {/* Audio Fidelity Comparison */}
            <AudioComparison />

            {/* Pricing Section */}
            <section id="tiers" className="py-24 relative z-10 bg-slate-950/20 backdrop-blur-sm">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Engineered Tiers</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Production <span className="text-white/40">Tiers.</span></h2>
                    </div>
                    <div className="grid gap-8 lg:grid-cols-3">
                        {tiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative group"
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-accent text-[10px] font-bold uppercase tracking-widest text-white border-glow flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-white" /> Most Popular
                                    </div>
                                )}

                                <div className={`h-full p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] glass-card transition-all duration-500 border-white/5 ${tier.popular ? "border-accent/40 bg-accent/5 lg:scale-105" : "hover:border-accent/30"}`}>
                                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-4xl font-bold">${tier.price}</span>
                                        <span className="text-muted-foreground text-sm">/month</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                                        {tier.description}
                                    </p>

                                    <div className="space-y-4 mb-10">
                                        {tier.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-3 text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                                                <span className="text-foreground/80">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setIsBookingOpen(true)}
                                        className={`w-full py-4 flex items-center justify-center font-bold rounded-2xl transition-all ${tier.popular ? "bg-accent text-white border-glow" : "glass-card hover:bg-accent hover:text-white"}`}
                                    >
                                        Inquire / Book
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Schematic Overlay */}
            <TechSchematic />

            {/* Feature Sections Removed (Integrated into TechSchematic) */}

            {/* Add-On Protocols */}
            <AddOnProtocols />

            <Footer />

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </main>
    );
}
