"use client";

import { motion } from "framer-motion";
import { Radio, Camera, Video, Zap, CheckCircle2, ArrowRight, Star, Loader2 } from "lucide-react";
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
import AuthorityMarquee from "@/components/ui/AuthorityMarquee";
import PodcastingCommandBar from "@/components/ui/PodcastingCommandBar";
import WakeUpCall from "@/components/ui/WakeUpCall";
import CostOfInaction from "@/components/ui/CostOfInaction";
import ROIEngine from "@/components/ui/ROIEngine";
import { useState } from "react";
import Image from "next/image";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const tiers = [
    {
        id: "pod_broadcaster",
        name: "Broadcaster Entry",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_POD_BROADCASTER || "price_pod_broadcaster_placeholder",
        price: "500",
        description: "High-frequency weekly presence on the Power Digital Network. Perfect for building immediate authority.",
        features: [
            "4 Studio Sessions/mo (Weekly)",
            "Live Stream to PD Platforms*",
            "YouTube, FB, Kick, Rumble",
            "Raw 4K Video + Audio Files",
            "Professional Studio Engineer"
        ],
        accent: "blue"
    },
    {
        id: "pod_growth",
        name: "Growth Engine",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_POD_GROWTH || "price_pod_growth_placeholder",
        price: "1,000",
        description: "The viral choice for personal brands. Full multi-cam production plus high-velocity social extractions.",
        features: [
            "4 Studio Sessions/mo (Weekly)",
            "Stream to 2 Client Platforms",
            "4 Viral Social Clips (1/wk)",
            "Automated Distribution Suite",
            "SEO & GEO Optimization"
        ],
        accent: "blue",
        popular: true
    },
    {
        id: "pod_syndication",
        name: "Syndication Suite",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_POD_SYNDICATION || "price_pod_syndication_placeholder",
        price: "1,500",
        description: "The total agency production takeover. Maximum reach and hands-off executive management.",
        features: [
            "4 Studio Sessions/mo (Weekly)",
            "Stream to 4 Client Platforms",
            "12 Viral Social Clips (3/wk)",
            "Dedicated Show Manager",
            "SEO Blog Show Notes Sync"
        ],
        accent: "blue"
    }
];

export default function PodcastingPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState<string | null>(null);

    const handleCheckout = async (tier: any) => {
        setIsProcessing(tier.id);

        // Safety check for placeholder IDs
        if (tier.priceId.includes('placeholder')) {
            alert(`⚠️ Stripe Not Configured\n\nThis tier is currently using a placeholder ID (${tier.id}). Please ensure the real Stripe Price ID is added to the environment variables.`);
            setIsProcessing(null);
            return;
        }

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: [{ price: tier.priceId, quantity: 1 }],
                    mode: 'subscription',
                    successUrl: window.location.origin + "/podcasting?success=true",
                    cancelUrl: window.location.origin + "/podcasting?canceled=true",
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Stripe Error Details:", data);
                alert(`❌ Checkout Failed: ${data.error || "Unknown error"}\n\nThis is usually due to an incorrect Price ID or missing Stripe Keys in the environment.`);
            }
        } catch (error) {
            console.error("Technical handshake failed:", error);
            alert("Secure pipe connection interrupted. Check your network or console for details.");
        } finally {
            setIsProcessing(null);
        }
    };

    const baseUrl = "https://powerdigitalmedia.org";
    const breadcrumbItems = [
        { name: "Services", url: `${baseUrl}/#services` },
        { name: "Podcasting", url: `${baseUrl}/podcasting` }
    ];

    return (
        <main className="relative min-h-screen bg-background overflow-x-clip">
            <BreadcrumbSchema items={breadcrumbItems} />
            <Navbar />

            {/* Cinematic Background Layers (Global for Landing Page) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Darkened Studio Base with Vertical Fade */}
                <div className="absolute inset-0 mask-gradient-v opacity-30 md:opacity-100">
                    <Image
                        src="/images/studio-mood-bg.webp"
                        alt="Studio Environment"
                        fill
                        className="object-cover opacity-20 scale-105"
                    />
                </div>

                {/* Growth Graphs Overlay - Top Right with Radial Fade */}
                <div className="absolute top-12 -right-32 md:top-24 md:-right-24 w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-10 md:opacity-20 blur-[2px] md:blur-[1px] mask-gradient-radial">
                    <Image
                        src="/images/growth-data-overlay.webp"
                        alt="Growth Metrics"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Growth Graphs Overlay - Bottom Left with Radial Fade */}
                <div className="absolute -bottom-24 -left-32 md:-bottom-48 md:-left-24 w-[400px] h-[400px] md:w-[800px] md:h-[800px] opacity-10 blur-[4px] rotate-12 mask-gradient-radial">
                    <Image
                        src="/images/growth-data-overlay.webp"
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
            <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
                {/* Cinematic Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/podcast-hero-cinematic.webp"
                        alt="High-end Podcast Studio"
                        fill
                        className="object-cover opacity-30 scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-60" />
                </div>

                {/* Audio Frequency Visual Layer */}
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden mix-blend-screen">
                    <div className="flex items-center gap-1 md:gap-2 w-[120%] h-[40vh] max-w-none opacity-50"
                        style={{ maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)' }}>
                        {[...Array(60)].map((_, i) => {
                            // Deterministic pseudo-random values for hydration-safe animations
                            const baseHeight = Math.abs(Math.sin(i * 0.4) * 30 + Math.cos(i * 1.1) * 20 + 20);
                            const duration = Math.abs(Math.sin(i * 0.7) * 2 + 2.5);
                            const delay = Math.abs(Math.cos(i * 0.3) * 2);
                            return (
                                <motion.div
                                    key={`wave-${i}`}
                                    animate={{
                                        height: [`${baseHeight}%`, `${baseHeight + 40}%`, `${baseHeight}%`]
                                    }}
                                    transition={{
                                        duration: duration,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: delay
                                    }}
                                    className="flex-1 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                                />
                            );
                        })}
                    </div>
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

                        <Link href="#pricing" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-6">
                            ↓ Jump to Pricing Tiers
                        </Link>

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

            {/* Authority Marquee */}
            <AuthorityMarquee />

            {/* Showcase Section */}
            <ShowcaseReel />

            {/* AI Growth Intelligence (Primary Conversion Slot) */}
            <HookGenerator />

            {/* Scroll-Hijack Disruption */}
            <WakeUpCall
                title="Your competitors are out-publishing you."
                subtitle="Every day you wait is market share lost to inferior content. The algorithm favors volume and quality. You need both."
                paragraph="Stop fighting algorithms. Start dictating them."
            />

            {/* Pain Point Agitation vs Power Protocol */}
            <CostOfInaction />

            {/* Mathematical Advantage */}
            <ROIEngine />

            {/* Power Protocol Pipeline */}
            <ProductionPipeline />

            {/* Audio Fidelity Comparison */}
            <AudioComparison />

            {/* Pricing Section */}
            <section id="pricing" className="py-24 relative z-10 bg-slate-950/20 backdrop-blur-sm">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Engineered Tiers</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Production <span className="text-white/40">Tiers.</span></h2>
                    </div>
                    <div className="grid gap-8 lg:grid-cols-3">
                        {tiers.map((tier, index) => (
                            <div
                                key={tier.name}
                                className="relative group animate-fade-in-up"
                                style={{ animationDelay: `${index * 150}ms`, animationFillMode: "both" }}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-accent text-[10px] font-bold uppercase tracking-widest text-white border-glow flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-white" /> Most Popular
                                    </div>
                                )}

                                <div
                                    onMouseMove={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const y = e.clientY - rect.top;
                                        e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                                        e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                                    }}
                                    className={`relative overflow-hidden h-full p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] glass-card transition-all duration-500 border-white/5 ${tier.popular ? "border-accent/40 bg-accent/5 lg:scale-105" : "hover:border-accent/30"}`}
                                >
                                    {/* Mouse Spotlight */}
                                    <div className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" style={{ background: "radial-gradient(800px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(34,211,238,0.06), transparent 40%)" }} />

                                    <div className="relative z-10">
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
                                            onClick={() => handleCheckout(tier)}
                                            disabled={isProcessing !== null}
                                            className={`w-full py-4 flex items-center justify-center font-bold rounded-2xl transition-all ${tier.popular ? "bg-accent text-white border-glow shadow-[0_0_20px_rgba(34,211,238,0.2)]" : "glass-card hover:bg-accent hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"} ${isProcessing === tier.id ? "opacity-50 cursor-not-allowed" : ""}`}
                                        >
                                            {isProcessing === tier.id ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                "Apply Now"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 text-center">
                        <p className="text-[10px] text-foreground/30 uppercase tracking-[0.3em] font-medium max-w-2xl mx-auto">
                            * Broadcaster Entry sessions are streamed to PD Media channels (FB, YT, Kick, Rumble). RAW recordings are delivered to the client for personal/external use.
                        </p>
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

            {/* Fixed Call to Action Bar */}
            <PodcastingCommandBar />
        </main>
    );
}
