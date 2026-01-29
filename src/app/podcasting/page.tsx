"use client";

import { motion } from "framer-motion";
import { Mic2, Radio, Camera, Video, Zap, CheckCircle2, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const tiers = [
    {
        name: "Basic Tier",
        price: "65",
        description: "Essential studio recording for creators starting their journey.",
        features: [
            "Podcast audio recording",
            "Video recording included",
            "Live streaming (1 platform)",
            "Studio-quality audio chain",
            "Standard studio lighting"
        ],
        accent: "blue"
    },
    {
        name: "Advanced Tier",
        price: "75",
        description: "The sweet spot for growing shows and ministry highlights.",
        features: [
            "All Basic Tier features",
            "Live streaming (3 platforms)",
            "Custom overlays & graphics",
            "Post-production editing",
            "Multi-cam DSLR setup"
        ],
        accent: "blue",
        popular: true
    },
    {
        name: "Premium Tier",
        price: "100",
        description: "The full production experience for elite brands and ministries.",
        features: [
            "All Advanced Tier features",
            "Personalized branding package",
            "Full promotional support",
            "Dedicated tech assistant",
            "Priority distribution"
        ],
        accent: "blue"
    }
];

export default function PodcastingPage() {
    return (
        <main className="relative min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 blur-[120px] pointer-events-none -z-10" />

                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-sm font-bold tracking-[0.3em] text-accent uppercase mb-6">
                            Studio Production
                        </h1>
                        <h2 className="text-5xl font-bold tracking-tight md:text-7xl mb-8">
                            Take Podcasting <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 text-glow">
                                To The Next Level.
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-10 text-balance">
                            Your vision, our expertise. From professional recording to multi-platform streaming, we build the digital foundation your message deserves.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="px-8 py-4 font-bold text-white bg-accent rounded-full border-glow hover:bg-accent/90 transition-all">
                                Get A Quote
                            </Link>
                            <Link href="/#studio" className="px-8 py-4 font-bold transition-all border rounded-full glass-card hover:bg-white/5">
                                View Studio Specs
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 relative z-10">
                <div className="container px-4 mx-auto">
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

                                <div className={`h-full p-8 rounded-[2.5rem] glass-card transition-all duration-500 border-white/5 ${tier.popular ? "border-accent/40 bg-accent/5 scale-105" : "hover:border-accent/30"}`}>
                                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-4xl font-bold">${tier.price}</span>
                                        <span className="text-muted-foreground text-sm">/hour</span>
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

                                    <Link
                                        href="/contact"
                                        className={`w-full py-4 flex items-center justify-center font-bold rounded-2xl transition-all ${tier.popular ? "bg-accent text-white border-glow" : "glass-card hover:bg-accent hover:text-white"}`}
                                    >
                                        Book Session
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Sections */}
            <section className="py-24 bg-accent/5">
                <div className="container px-4 mx-auto">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
                                <Radio className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-4xl font-bold mb-6">Live Streaming <br /> Without Limits.</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Broadcast your message across multiple platforms simultaneously. Whether it&apos;s YouTube, Facebook, or Twitch, our RØDECaster-powered system ensures high-quality real-time engagement.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <span className="font-medium text-foreground/80">Multi-Platform Simultaneous Broadcast</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <span className="font-medium text-foreground/80">Real-time Technical Management</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <span className="font-medium text-foreground/80">Ultra-low Latency Monitoring</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative aspect-video rounded-3xl overflow-hidden glass-card border-white/10"
                        >
                            <div className="absolute inset-0 bg-accent/10 transition-colors group-hover:bg-accent/20 flex items-center justify-center">
                                <Zap className="w-12 h-12 text-accent animate-pulse" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
