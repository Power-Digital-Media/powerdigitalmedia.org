"use client";

import { motion } from "@/components/providers/MotionProvider";
import { Camera, Video, Zap, CheckCircle2, ArrowRight, Star, MapPin, Film, Share2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Portfolio from "@/components/sections/Portfolio";
import ProductionPipeline from "@/components/ui/ProductionPipeline";
import BookingModal from "@/components/ui/BookingModal";
import { useState } from "react";
import Image from "next/image";

const tiers = [
    {
        id: "prod_field_acquisition",
        name: "Field Acquisition",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_FIELD || "price_field_placeholder",
        price: "500",
        description: "Professional on-location capture. We secure the high-fidelity raw assets for your library.",
        features: [
            "On-Location Shoot (Event/Brand)",
            "Dual-Cam 4K Acquisition",
            "Professional Audio Capture",
            "Full RAW Footage Delivery",
            "Asset Ownership Transfer"
        ],
        type: "one-time"
    },
    {
        id: "prod_live_stream",
        name: "Live Broadcast",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_LIVE || "price_prod_live_placeholder",
        price: "750",
        description: "Zero-latency event streaming. Real-time engagement for your global audience.",
        features: [
            "On-Location Live Stream",
            "Quad-Platform Sync (YT/FB/Kick/Rumble)",
            "Professional Mixer Integration",
            "Real-time Technical Direction",
            "VOD Archive Delivery"
        ],
        type: "one-time",
        highlight: "border-cyan-400/30 bg-cyan-400/[0.02]"
    },
    {
        id: "prod_protocol",
        name: "Production Protocol",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_PROTOCOL || "price_prod_protocol_placeholder",
        price: "1,000",
        description: "The complete content engine. From capture to a cinematic final cut ready for delivery.",
        features: [
            "Everything in 'Field Acquisition'",
            "Full Cinematic Editing",
            "Color Grading & Sound Design",
            "YouTube/Vimeo Ready Export",
            "Advanced Motion Graphics"
        ],
        type: "one-time",
        popular: true
    },
    {
        id: "prod_authority",
        name: "Authority Package",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_AUTHORITY || "price_prod_authority_placeholder",
        price: "1,500",
        description: "The ultimate digital footprint. A cinematic masterpiece plus a month's worth of viral social assets.",
        features: [
            "Everything in 'Production Protocol'",
            "4 High-Velocity Social Clips",
            "Viral-Ready Subtitles & Framing",
            "Content Distribution Strategy",
            "Priority Post-Production"
        ],
        type: "one-time"
    }
];

export default function ProductionPage() {
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
                    mode: 'payment',
                    successUrl: window.location.origin + "/production?success=true",
                    cancelUrl: window.location.origin + "/production?canceled=true",
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
            alert("Secure pipe connection interrupted. Check console for details.");
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
                        src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
                        alt="On-Location Production"
                        fill
                        className="object-cover opacity-20 scale-105"
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
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border-cyan-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                            <MapPin className="w-3 h-3 animate-pulse" />
                            On-Location Production
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.85] uppercase">
                            Capture <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-glow-cyan">
                                Anywhere.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
                            We bring studio-grade cinema to your event, brand, or location. High-velocity production for high-authority players.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="px-12 py-6 bg-cyan-400 text-slate-950 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_40px_rgba(34,211,238,0.2)]"
                            >
                                Book A Shoot
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="tiers" className="py-24 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-20 text-balance uppercase tracking-tighter">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] text-[10px] mb-4 block">Deployment Tiers</span>
                        <h2 className="text-4xl md:text-6xl font-black">Event <span className="text-white/40">Production.</span></h2>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-4">
                        {tiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative group p-8 rounded-[2.5rem] glass-card border transition-all duration-500 flex flex-col ${tier.popular ? "border-cyan-400/40 bg-cyan-400/[0.03] lg:scale-105" : "border-white/5 hover:border-white/20"
                                    }`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-400 text-slate-950 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        Top Choice
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">{tier.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black">${tier.price}</span>
                                        <span className="text-white/20 text-xs uppercase tracking-widest font-bold">Investment</span>
                                    </div>
                                    <p className="mt-4 text-sm text-foreground/50 leading-relaxed italic">
                                        {tier.description}
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-foreground/40">
                                            <CheckCircle2 className="w-3 h-3 text-cyan-400/50" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleCheckout(tier)}
                                    disabled={isProcessing !== null}
                                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${tier.popular ? "bg-cyan-400 text-slate-950 hover:bg-white" : "bg-white/5 hover:bg-white text-white hover:text-slate-950"
                                        }`}
                                >
                                    {isProcessing === tier.id ? (
                                        <div className="w-4 h-4 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
                                    ) : (
                                        "Initialize Build"
                                    )}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <ProductionPipeline />

            <Portfolio titleAs="h2" />

            <Footer />

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </main>
    );
}
