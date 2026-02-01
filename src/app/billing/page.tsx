"use client";

import { motion } from "framer-motion";
import { CreditCard, Receipt, ShieldCheck, Zap, ArrowRight, CheckCircle2, Loader2, DollarSign } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LifecycleCard from "@/components/ui/billing/LifecycleCard";

const serviceTiers = [
    {
        id: "prod_web_design_basic",
        name: "Digital Architecture (Basic)",
        price: 2500,
        priceId: "price_1QlO9eBXMJdQZJj4R0G8p2V0", // Placeholder - User will replace
        description: "High-end, performance-optimized website for solo creators.",
        features: [
            "Custom 3D Animations",
            "Mobile-First Architecture",
            "Basic SEO Protocol",
            "Stripe Integration",
        ],
        highlight: false,
    },
    {
        id: "prod_pod_studio_elite",
        name: "Elite Studio Session",
        price: 499,
        priceId: "price_1QlOAFBXMJdQZJj4L9D1r3S0", // Placeholder - User will replace
        description: "4-camera cinematic recording session with professional audio engineer.",
        features: [
            "4K Multicam Capture",
            "Pro Audio Finishing",
            "Social Media Clips (3x)",
            "Next-Day Delivery",
        ],
        highlight: true,
    },
    {
        id: "prod_full_growth_engine",
        name: "Growth Engine (Monthly)",
        price: 1500,
        priceId: "price_1QlOBGBXMJdQZJj4M8H2T1X9", // Placeholder - User will replace
        description: "Full-service content distribution and strategy partnership.",
        features: [
            "Weekly Strategic Consult",
            "Automated Distribution",
            "SEO & GEO Dominance",
            "Monthly Intel Reports",
        ],
        highlight: false,
    },
];

export default function BillingPage() {
    const [loading, setLoading] = useState<string | null>(null);

    const handleCheckout = async (priceId: string) => {
        setLoading(priceId);
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    priceId,
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
            // Note: In a real app, customerId would come from authenticated user data
            const response = await fetch("/api/customer-portal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerId: "cus_placeholder", // This needs to be real
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

                    {/* Foundational Protocols */}
                    <div className="mb-12 text-center md:text-left max-w-7xl mx-auto">
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Foundational <span className="text-accent">Protocols</span></h2>
                        <p className="text-foreground/50 text-sm max-w-2xl">Standardized high-performance service tiers for immediate agency deployment.</p>
                    </div>

                    {/* Service Grid */}
                    <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
                        {serviceTiers.map((tier, index) => (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative group p-8 rounded-[32px] glass-card border-white/5 transition-all duration-500 overflow-hidden ${tier.highlight ? "border-accent/40 bg-accent/[0.03]" : "hover:border-accent/20"
                                    }`}
                            >
                                {tier.highlight && (
                                    <div className="absolute top-0 right-0 px-6 py-2 bg-accent text-[10px] font-bold tracking-[0.3em] uppercase text-white rounded-bl-2xl">
                                        Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-accent mb-2">{tier.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black tracking-tighter">${tier.price}</span>
                                        <span className="text-foreground/40 text-sm">{tier.id.includes("monthly") ? "/ month" : ""}</span>
                                    </div>
                                    <p className="mt-4 text-sm text-foreground/60 leading-relaxed italic">
                                        {tier.description}
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-10">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-foreground/80">
                                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleCheckout(tier.priceId)}
                                    disabled={loading !== null}
                                    className={`w-full py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all ${tier.highlight
                                        ? "bg-accent text-white hover:bg-accent/90 border-glow"
                                        : "bg-white/5 hover:bg-white/10"
                                        }`}
                                >
                                    {loading === tier.priceId ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            Initiate Payment <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* High-Authority Hybrid Engagement */}
                    <div className="mt-20 max-w-7xl mx-auto">
                        <div className="mb-12 text-center md:text-left">
                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Bespoke <span className="text-accent">Architecture</span></h2>
                            <p className="text-foreground/50 text-sm max-w-2xl">Custom engineered engagements for high-ticket projects, including flexible installment plans and managed growth engineering.</p>
                        </div>

                        <LifecycleCard
                            title="Full Estate Architecture"
                            subtitle="High-ticket website build paired with managed growth engineering. Fully customized to your specific scope and tactical requirements."
                            installmentPrice={250}
                            installmentPriceId="price_installment_placeholder"
                            recurringPrice={250}
                            recurringPriceId="price_recurring_placeholder"
                            installmentsCount={4}
                            features={[
                                "Advanced 3D Architecture",
                                "SEO Domain Dominance",
                                "Weekly Sync Calls",
                                "Technical Maintenance",
                                "YouTube Optimization",
                                "Full Tax Compliance"
                            ]}
                        />
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
