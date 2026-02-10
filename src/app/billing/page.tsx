"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    CreditCard, Receipt, ShieldCheck, Zap, ArrowRight,
    CheckCircle2, Loader2, DollarSign, Layout,
    Camera, TrendingUp, Search, Briefcase, Globe
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LifecycleCard from "@/components/ui/billing/LifecycleCard";

interface ServiceTier {
    id: string;
    name: string;
    price: number | "Custom";
    priceId: string;
    description: string;
    features: string[];
    category: 'design' | 'podcasting' | 'production' | 'growth';
    isMonthly?: boolean;
    highlight?: boolean;
}

const serviceTiers: ServiceTier[] = [
    // Web Builds
    {
        id: "web_identity",
        name: "Identity Build",
        price: 1500,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_WEB_IDENTITY || "price_web_identity_placeholder",
        description: "The foundational high-authority digitial presence.",
        features: ["Custom UI/UX", "Next.js Performance", "SEO Foundation"],
        category: "design"
    },
    {
        id: "web_growth",
        name: "Growth Build",
        price: 3000,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_WEB_GROWTH || "price_web_growth_placeholder",
        description: "Advanced architecture for scaling brands and commerce.",
        features: ["Advanced 3D Assets", "E-commerce Protocol", "Logic Integrations"],
        category: "design",
        highlight: true
    },
    {
        id: "web_enterprise",
        name: "Enterprise Build",
        price: 5000,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_WEB_ENTERPRISE || "price_web_enterprise_placeholder",
        description: "Absolute custom architecture for industry leaders.",
        features: ["Neural Sync", "Multi-System Deployment", "Priority Engineering"],
        category: "design"
    },
    {
        id: "web_management",
        name: "Build & Manage",
        price: 500,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MANAGEMENT || "price_management_placeholder",
        description: "Continuous evolution and high-sec hosting (Monthly).",
        features: ["2 Monthly Updates", "Elite Hosting", "Security Core"],
        category: "design",
        isMonthly: true
    },

    // Podcasting Network
    {
        id: "pod_broadcaster",
        name: "Broadcaster Entry",
        price: 500,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_POD_BROADCASTER || "price_pod_broadcaster_placeholder",
        description: "Weekly presence on the Power Digital Network (Monthly).",
        features: ["4 Sessions/mo", "PD Platform Stream", "Raw 4K Files"],
        category: "podcasting",
        isMonthly: true
    },
    {
        id: "pod_growth",
        name: "Growth Engine",
        price: 1000,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_POD_GROWTH || "price_pod_growth_placeholder",
        description: "Multi-cam production + viral social extractions (Monthly).",
        features: ["Stream to 2 Client Platforms", "4 Viral Social Clips", "SEO Opt"],
        category: "podcasting",
        isMonthly: true,
        highlight: true
    },
    {
        id: "pod_syndication",
        name: "Syndication Suite",
        price: 1500,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_POD_SYNDICATION || "price_pod_syndication_placeholder",
        description: "Total agency takeover and executive management (Monthly).",
        features: ["12 Viral Clips", "Dedicated Show Manager", "SEO Blog Sync"],
        category: "podcasting",
        isMonthly: true
    },

    // Production Hub
    {
        id: "prod_field",
        name: "Field Acquisition",
        price: 500,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_FIELD || "price_field_placeholder",
        description: "Professional on-location raw asset capture.",
        features: ["4K Acquisition", "Pro Audio", "RAW Delivery"],
        category: "production"
    },
    {
        id: "prod_live",
        name: "Live Broadcast",
        price: 750,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_LIVE || "price_prod_live_placeholder",
        description: "Zero-latency event streaming to multiple platforms.",
        features: ["Quad-Platform Sync", "Real-time Direction", "VOD Archive"],
        category: "production"
    },
    {
        id: "prod_protocol",
        name: "Production Protocol",
        price: 1000,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_PROTOCOL || "price_prod_protocol_placeholder",
        description: "Complete capture to cinematic final cut.",
        features: ["Cinematic Editing", "Color Grading", "Motion Graphics"],
        category: "production",
        highlight: true
    },
    {
        id: "prod_authority",
        name: "Authority Package",
        price: 1500,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_AUTHORITY || "price_prod_authority_placeholder",
        description: "Cinematic masterpiece + 1 month viral social assets.",
        features: ["Everything in Protocol", "4 Social Clips", "Strategy Link"],
        category: "production"
    },

    // Social & Strategy (Growth)
    {
        id: "social_micro",
        name: "Micro-Growth",
        price: 250,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_MICRO || "price_social_micro_placeholder",
        description: "Precision thumbnail engineering and high-authority SEO.",
        features: ["5 Custom Thumbs", "Video SEO (5 vids)", "CTR Mastery"],
        category: "growth"
    },
    {
        id: "social_velocity",
        name: "Social Velocity",
        price: 750,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_VELOCITY || "price_social_velocity_placeholder",
        description: "Continuous design and strategic SEO dominance (Monthly).",
        features: ["Unlimited Design*", "Full Video SEO", "Analytics Sync"],
        category: "growth",
        isMonthly: true,
        highlight: true
    },
    {
        id: "marketing_branding",
        name: "Branding Protocol",
        price: 750,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BRANDING || "price_branding_placeholder",
        description: "Visual identity hub and professional brand bible.",
        features: ["Logo Mastery", "Visual Brand Bible", "Identity Hub"],
        category: "growth"
    },
    {
        id: "strategy_audit",
        name: "Elite Audit",
        price: 500,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_AUDIT || "price_audit_placeholder",
        description: "1-hour recorded strategy roadmap for growth.",
        features: ["1hr Strategy Session", "Recorded Roadmap", "Growth Intel"],
        category: "growth"
    },
    {
        id: "tech_deployment",
        name: "Tech Deployment",
        price: 1500,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_TECH || "price_tech_placeholder",
        description: "Studio hardware consulting and software neural bridge.",
        features: ["Hardware Chain Opt", "Studio Set Alignment", "Engineering Link"],
        category: "growth"
    },
];

export default function BillingPage() {
    const [loading, setLoading] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<'all' | 'design' | 'podcasting' | 'production' | 'growth'>('all');

    const handleCheckout = async (priceId: string) => {
        setLoading(priceId);
        const tier = serviceTiers.find(t => t.priceId === priceId);

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: [{ price: priceId, quantity: 1 }],
                    mode: tier?.isMonthly ? 'subscription' : 'payment',
                    successUrl: `${window.location.origin}/billing?success=true`,
                    cancelUrl: `${window.location.origin}/billing?canceled=true`,
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || "Checkout failed");
            }
        } catch (error) {
            console.error("Checkout Error:", error);
            alert("Billing Error: Technical handshake failed. Please contact engineering support.");
        } finally {
            setLoading(null);
        }
    };

    const openPortal = async () => {
        setLoading("portal");
        try {
            const response = await fetch("/api/customer-portal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerId: "cus_placeholder",
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Portal Error:", error);
        } finally {
            setLoading(null);
        }
    };

    return (
        <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
            <Navbar />

            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

            <section className="relative pt-40 pb-24">
                <div className="container px-6 mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-accent/20 mb-8">
                            <ShieldCheck className="w-4 h-4 text-accent" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Secure Billing Protocol</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">
                            Financial <span className="text-accent underline decoration-accent/30">Architecture.</span>
                        </h1>
                        <p className="text-xl text-foreground/60 leading-relaxed font-light text-balance">
                            Foundational protocols and bespoke financial engineering for high-authority digital deployments.
                        </p>
                    </motion.div>

                    {/* Category Switcher */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 max-w-7xl mx-auto">
                        <div className="max-w-xl">
                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Service <span className="text-accent">Protocols</span></h2>
                            <p className="text-foreground/50 text-sm italic">Standardized high-performance service tiers for immediate agency deployment.</p>
                        </div>

                        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                            {[
                                { id: 'all', label: 'All Services', icon: Globe },
                                { id: 'design', label: 'Design', icon: Layout },
                                { id: 'podcasting', label: 'Podcast', icon: "logo" },
                                { id: 'production', label: 'Production', icon: Camera },
                                { id: 'growth', label: 'Growth', icon: TrendingUp }
                            ].map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id as any)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat.id
                                        ? "bg-accent text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                        : "text-white/40 hover:text-white hover:bg-white/5 border border-transparent"
                                        }`}
                                >
                                    {cat.icon === "logo" ? (
                                        <Image src="/power-logo.png" alt="" width={12} height={12} className="object-contain" />
                                    ) : (
                                        <cat.icon className="w-3 h-3" />
                                    )}
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Service Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        <AnimatePresence mode="popLayout">
                            {serviceTiers
                                .filter(tier => activeCategory === 'all' || tier.category === activeCategory)
                                .map((tier) => (
                                    <motion.div
                                        key={tier.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={`relative group p-6 rounded-[32px] glass-card border transition-all duration-500 flex flex-col ${tier.highlight ? "border-accent/40 bg-accent/[0.03] ring-1 ring-accent/20" : "border-white/5 hover:border-white/20"
                                            }`}
                                    >
                                        {tier.highlight && (
                                            <div className="absolute top-0 right-0 px-4 py-1.5 bg-accent text-white text-[8px] font-black uppercase tracking-widest rounded-bl-2xl shadow-glow">
                                                Popular
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">{tier.name}</h3>
                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 group-hover:text-accent transition-colors">
                                                    {tier.category === 'design' && <Layout className="w-4 h-4" />}
                                                    {tier.category === 'podcasting' && <Image src="/power-logo.png" alt="" width={16} height={16} className="object-contain" />}
                                                    {tier.category === 'production' && <Camera className="w-4 h-4" />}
                                                    {tier.category === 'growth' && <TrendingUp className="w-4 h-4" />}
                                                </div>
                                            </div>
                                            <div className="flex items-baseline gap-1 font-black tracking-tighter">
                                                <span className="text-3xl">
                                                    {typeof tier.price === 'number' ? `$${tier.price.toLocaleString()}` : tier.price}
                                                </span>
                                                {tier.isMonthly && (
                                                    <span className="text-white/20 text-[10px] uppercase font-bold tracking-widest">/mo</span>
                                                )}
                                            </div>
                                            <p className="mt-3 text-[11px] text-foreground/40 leading-relaxed italic line-clamp-2">
                                                {tier.description}
                                            </p>
                                        </div>

                                        <ul className="space-y-3 mb-8 flex-grow">
                                            {tier.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-foreground/30">
                                                    <CheckCircle2 className="w-3 h-3 text-accent/50" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <button
                                            onClick={() => handleCheckout(tier.priceId)}
                                            disabled={loading !== null}
                                            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${tier.highlight
                                                ? "bg-accent text-white hover:bg-white hover:text-slate-950 border-glow"
                                                : "bg-white/5 hover:bg-white text-white hover:text-slate-950"
                                                }`}
                                        >
                                            {loading === tier.priceId ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <>Initialize Build <ArrowRight className="w-3 h-3" /></>
                                            )}
                                        </button>
                                    </motion.div>
                                ))}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Portal Access */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-24 p-12 rounded-[40px] glass-card border-white/5 bg-white/[0.01] flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[24px] bg-accent/10 border border-accent/20 flex items-center justify-center">
                                <Receipt className="w-8 h-8 text-accent" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold">Existing Client?</h4>
                                <p className="text-foreground/50 text-sm mt-1">Access your automated invoicing portal and billing history.</p>
                            </div>
                        </div>

                        <button
                            onClick={openPortal}
                            className="px-8 py-5 rounded-2xl border border-accent/20 hover:border-accent/40 bg-accent/5 transition-all text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-3 group"
                        >
                            Access Client Portal <CreditCard className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
