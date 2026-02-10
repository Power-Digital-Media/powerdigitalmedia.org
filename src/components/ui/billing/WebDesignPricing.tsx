"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "@/components/providers/MotionProvider";
import { CheckCircle2, Zap, Shield, ArrowRight, Loader2, Sparkles, Building, Rocket, Globe } from "lucide-react";

interface Tier {
    id: string;
    name: string;
    price: number;
    priceId: string;
    description: string;
    features: string[];
    accent: string;
    icon: React.ElementType;
}

const tiers: Tier[] = [
    {
        id: "identity",
        name: "Identity Protocol",
        price: 1500,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_WEB_IDENTITY || "price_web_identity_placeholder", // Match Billing Hub catalog
        description: "Bespoke high-prestige flagship presence for solo creators and brands.",
        features: ["Custom UI/UX Architecture", "Next.js Core Performance", "SEO Foundation Layer", "Cinematic Media Support"],
        accent: "border-blue-500/30",
        icon: Globe
    },
    {
        id: "growth",
        name: "Growth Architecture",
        price: 3000,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_WEB_GROWTH || "price_web_growth_placeholder", // Match Billing Hub catalog
        description: "Engineered for scale. Full integration between studio and engine.",
        features: ["Ecosystem Synchronization", "High-Velocity Funnels", "Automated Lead Capture", "Priority Support Sync"],
        accent: "border-cyan-400/50",
        icon: Rocket
    },
    {
        id: "enterprise",
        name: "Enterprise Hub",
        price: 5000,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_WEB_ENTERPRISE || "price_web_enterprise_placeholder", // Match Billing Hub catalog
        description: "Multi-site ecosystem for organizations managing massive traffic.",
        features: ["Multi-Brand Architecture", "Custom Engineering Support", "Dedicated Data Layer", "Global Edge Distribution"],
        accent: "border-indigo-500/30",
        icon: Building
    }
];

const MANAGEMENT_PRICE = 500;
const MANAGEMENT_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_MANAGEMENT || "price_management_placeholder"; // Match Billing Hub catalog

export default function WebDesignPricing() {
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [wantsManagement, setWantsManagement] = useState<boolean | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInitialization = async () => {
        if (!selectedTier || wantsManagement === null) return;

        setIsProcessing(true);
        const tier = tiers.find(t => t.id === selectedTier);
        if (!tier) return;

        // Safety check for placeholder IDs
        const hasPlaceholders = tier.priceId.includes('placeholder') || (wantsManagement && MANAGEMENT_PRICE_ID.includes('placeholder'));

        if (hasPlaceholders) {
            alert(`⚠️ Stripe Not Configured\n\nOne or more selected tiers are using placeholder IDs. Please ensure the real Stripe Price IDs are added to the environment variables.`);
            setIsProcessing(false);
            return;
        }

        const items = [
            { price: tier.priceId, quantity: 1 }
        ];

        if (wantsManagement) {
            items.push({ price: MANAGEMENT_PRICE_ID, quantity: 1 });
        }

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items,
                    successUrl: window.location.origin + "/web-design?success=true",
                    cancelUrl: window.location.origin + "/web-design?canceled=true",
                    mode: wantsManagement ? 'subscription' : 'payment'
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
            console.error("Initialization Failed:", error);
            alert("Technical handshake failed. Secure pipe connection interrupted. Check console for details.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-12">
            {/* Step 1: Select Your Architecture */}
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/20">
                        <span className="text-cyan-400 font-bold text-xs uppercase">01</span>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Choose Your <span className="text-cyan-400">Architecture</span></h3>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            onClick={() => setSelectedTier(tier.id)}
                            className={`cursor-pointer group relative p-8 rounded-[2.5rem] glass-card border transition-all duration-500 ${selectedTier === tier.id
                                ? `${tier.accent} bg-white/[0.05] shadow-[0_0_40px_rgba(34,211,238,0.1)] scale-[1.02]`
                                : "border-white/5 bg-white/[0.01] hover:border-white/20"
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${selectedTier === tier.id ? "text-cyan-400" : "text-white/40"}`}>
                                <tier.icon className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold uppercase tracking-widest mb-2">{tier.name}</h4>
                            <div className="text-3xl font-black text-white mb-4 tracking-tighter">
                                ${tier.price.toLocaleString()}
                            </div>
                            <p className="text-sm text-foreground/50 mb-8 leading-relaxed italic line-clamp-2">
                                {tier.description}
                            </p>
                            <ul className="space-y-3 mb-4">
                                {tier.features.slice(0, 3).map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-foreground/30">
                                        <CheckCircle2 className="w-3 h-3 text-cyan-500/50" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {selectedTier === tier.id && (
                                <motion.div
                                    layoutId="selected-indicator"
                                    className="absolute top-4 right-4 text-cyan-400"
                                >
                                    <Sparkles className="w-5 h-5 fill-cyan-400/20" />
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Step 2: Managed Protocol Selection */}
            <AnimatePresence>
                {selectedTier && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
                                <span className="text-blue-400 font-bold text-xs uppercase">02</span>
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter">Select Operating <span className="text-blue-400">Protocol</span></h3>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div
                                onClick={() => setWantsManagement(false)}
                                className={`cursor-pointer p-8 rounded-[2.5rem] glass-card border transition-all duration-500 ${wantsManagement === false
                                    ? "border-white/40 bg-white/[0.05]"
                                    : "border-white/5 bg-white/[0.01] hover:border-white/20"
                                    }`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-3 h-3 rounded-full border ${wantsManagement === false ? "bg-white border-white" : "border-white/20"}`} />
                                    <h4 className="text-lg font-bold uppercase tracking-widest">Build Only</h4>
                                </div>
                                <p className="text-sm text-foreground/50 leading-relaxed">
                                    Full delivery of the build architecture. Client assumes 100% technical management post-deployment.
                                </p>
                            </div>

                            <div
                                onClick={() => setWantsManagement(true)}
                                className={`cursor-pointer p-8 rounded-[2.5rem] glass-card border transition-all duration-500 ${wantsManagement === true
                                    ? "border-cyan-400/40 bg-cyan-400/[0.03]"
                                    : "border-white/5 bg-white/[0.01] hover:border-white/20"
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full border ${wantsManagement === true ? "bg-cyan-400 border-cyan-400" : "border-white/20"}`} />
                                        <h4 className="text-lg font-bold uppercase tracking-widest">Build & Manage</h4>
                                    </div>
                                    <span className="text-cyan-400 font-black tracking-tighter">+$500/mo</span>
                                </div>
                                <p className="text-sm text-foreground/50 leading-relaxed mb-4">
                                    Managed high-authority growth engine. Includes security patches, weekly updates, and tactical support.
                                </p>
                                <div className="flex items-center gap-2 text-[10px] text-cyan-400/70 font-black uppercase tracking-widest">
                                    <Zap className="w-3 h-3 animate-pulse" />
                                    Highly Recommended for Scalability
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Final Action Hub */}
            <AnimatePresence>
                {selectedTier && wantsManagement !== null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-10 rounded-[3rem] glass-card border-white/20 bg-gradient-to-br from-white/[0.03] to-transparent flex flex-col md:flex-row items-center justify-between gap-8"
                    >
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/40 block mb-2">Deployment Summary</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black tracking-tighter text-white">
                                    ${(tiers.find(t => t.id === selectedTier)?.price || 0).toLocaleString()}
                                </span>
                                {wantsManagement && (
                                    <span className="text-xl font-bold text-cyan-400">
                                        + $500/mo
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-foreground/40 mt-2 uppercase tracking-widest font-bold">
                                Secure Encrypted Transaction via Stripe. Automatic Tax Calculation Active.
                            </p>
                        </div>

                        <button
                            onClick={handleInitialization}
                            disabled={isProcessing}
                            className="group relative px-12 py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.3em] text-sm hover:bg-cyan-400 hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center gap-4 overflow-hidden"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Calibrating...
                                </>
                            ) : (
                                <>
                                    Initialize Build Layer <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
