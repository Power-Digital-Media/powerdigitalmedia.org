"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap, CheckCircle2, ArrowRight, Star, Youtube, Image as ImageIcon, Search, BarChart3 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductionPipeline from "@/components/ui/ProductionPipeline";
import BookingModal from "@/components/ui/BookingModal";
import { useState } from "react";
import Image from "next/image";

const tiers = [
    {
        id: "social_micro",
        name: "Micro-Growth",
        priceId: "price_social_micro_placeholder",
        price: "250",
        description: "The tactical entry for creators. Precision thumbnail engineering and high-authority video SEO.",
        features: [
            "5 Custom Engineered Thumbnails",
            "Video SEO Metadata (5 Videos)",
            "Keyword Research & Target",
            "CTR Mastery Optimization",
            "Asset Delivery (72hrs)"
        ],
        type: "one-time"
    },
    {
        id: "social_velocity",
        name: "Social Velocity",
        priceId: "price_social_velocity_placeholder",
        price: "750",
        description: "The complete monthly growth protocol. Continuous thumbnail design and strategic SEO dominance.",
        features: [
            "Unlimited Thumbnail Design*",
            "Full Video SEO & Optimization",
            "A/B Testing for CTR",
            "Community Management Sync",
            "Monthly Analytics Report"
        ],
        type: "monthly",
        popular: true,
        highlight: "border-blue-500/30 bg-blue-500/[0.02]"
    },
    {
        id: "social_growth_strategy",
        name: "Growth Strategy",
        priceId: "price_growth_strategy_placeholder",
        price: "1,500",
        description: "The ultimate brand partnership. High-level strategy, automated outreach, and full social takeover.",
        features: [
            "Everything in 'Social Velocity'",
            "Strategic Growth Consulting",
            "Automated Lead Generation",
            "Multi-Platform Management",
            "Priority Support Link"
        ],
        type: "monthly"
    }
];

export default function MarketingPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState<string | null>(null);

    const handleCheckout = async (tier: any) => {
        setIsProcessing(tier.id);
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: [{ price: tier.priceId, quantity: 1 }],
                    mode: tier.type === 'monthly' ? 'subscription' : 'payment',
                    successUrl: window.location.origin + "/marketing?success=true",
                    cancelUrl: window.location.origin + "/marketing?canceled=true",
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Technical handshake failed:", error);
            alert("Secure pipe connection interrupted.");
        } finally {
            setIsProcessing(null);
        }
    };

    return (
        <main className="relative min-h-screen bg-background overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center pt-24 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                        alt="Digital Growth Architecture"
                        fill
                        className="object-cover opacity-10 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                </div>

                <div className="container px-4 mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                            <TrendingUp className="w-3 h-3 animate-pulse" />
                            Velocity & Growth Protcols
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.85] uppercase text-balance">
                            Build <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-glow-blue">
                                Velocity.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
                            We don&apos;t just post content. We engineer <span className="text-white font-medium italic">mathematical growth</span> through precision SEO and high-conversion assets.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="px-12 py-6 bg-blue-500 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-blue-500 transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                            >
                                Initiate Growth Protocol
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Strategic Pillars */}
            <section className="py-24 border-y border-white/5 bg-white/[0.01]">
                <div className="container px-4 mx-auto">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center group">
                            <div className="w-16 h-16 rounded-[2rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <ImageIcon className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Thumbnail Engineering</h3>
                            <p className="text-sm text-foreground/50 leading-relaxed italic">
                                Visual architecture designed to force the click. High-CTR designs that dominate the feed.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Search className="w-8 h-8 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Video SEO Domain</h3>
                            <p className="text-sm text-foreground/50 leading-relaxed italic">
                                Deep keyword extraction and metadata optimization to rank your content where it matters.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 rounded-[2rem] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-8 h-8 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Growth Intelligence</h3>
                            <p className="text-sm text-foreground/50 leading-relaxed italic">
                                Data-driven strategy. We analyze the metrics to steer your brand toward total authority.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="tiers" className="py-24 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-20 text-balance uppercase tracking-tighter">
                        <span className="text-blue-400 font-bold tracking-[0.4em] text-[10px] mb-4 block">Deployment Tiers</span>
                        <h2 className="text-4xl md:text-6xl font-black">Social <span className="text-white/40">Velocity.</span></h2>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
                        {tiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative group p-8 rounded-[2.5rem] glass-card border transition-all duration-500 flex flex-col ${tier.popular ? "border-blue-500/40 bg-blue-500/[0.03] lg:scale-105 shadow-[0_0_40px_rgba(59,130,246,0.1)]" : "border-white/5 hover:border-white/20"
                                    }`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        Authority Protocol
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">{tier.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black">${tier.price}</span>
                                        <span className="text-white/20 text-[10px] uppercase tracking-widest font-bold">
                                            {tier.type === "monthly" ? "/ Month" : "Investment"}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-sm text-foreground/50 leading-relaxed italic">
                                        {tier.description}
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-foreground/40">
                                            <CheckCircle2 className="w-3 h-3 text-blue-500/50" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleCheckout(tier)}
                                    disabled={isProcessing !== null}
                                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${tier.popular ? "bg-blue-500 text-white hover:bg-white hover:text-blue-500 shdaow-glow" : "bg-white/5 hover:bg-white text-white hover:text-slate-950"
                                        }`}
                                >
                                    {isProcessing === tier.id ? (
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        "Initialize Protocol"
                                    )}
                                </button>
                            </motion.div>
                        ))}
                    </div>
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
