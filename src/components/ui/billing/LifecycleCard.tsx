"use client";

import { motion } from "framer-motion";
import { Calendar, RefreshCw, Star, ArrowRight, ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface LifecycleCardProps {
    title: string;
    subtitle: string;
    installmentPrice: number;
    installmentPriceId: string;
    recurringPrice: number;
    recurringPriceId: string;
    installmentsCount: number;
    features: string[];
}

export default function LifecycleCard({
    title,
    subtitle,
    installmentPrice,
    installmentPriceId,
    recurringPrice,
    recurringPriceId,
    installmentsCount,
    features
}: LifecycleCardProps) {
    const [loading, setLoading] = useState(false);

    const handleHybridCheckout = async () => {
        setLoading(true);

        // Safety check for placeholder IDs
        if (installmentPriceId.includes('placeholder') || recurringPriceId.includes('placeholder')) {
            alert(`⚠️ Stripe Not Configured\n\nThis bespoke project is currently using placeholder IDs. Please ensure the real Stripe Price IDs for both installments and recurring management are added to the environment variables.`);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mode: 'subscription',
                    items: [
                        { price: installmentPriceId, quantity: 1 },
                        { price: recurringPriceId, quantity: 1 }
                    ],
                    successUrl: `${window.location.origin}/billing?success=true`,
                    cancelUrl: `${window.location.origin}/billing?canceled=true`,
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
            console.error("Hybrid Checkout Error:", error);
            alert("Technical handshake failed. Secure pipe connection interrupted. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-10 rounded-[40px] glass-card border-accent/30 bg-accent/[0.02] relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-6">
                <Star className="w-6 h-6 text-accent animate-pulse" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="flex items-center gap-3 text-accent text-xs font-bold tracking-[0.3em] uppercase mb-6">
                        <ShieldCheck className="w-4 h-4" />
                        Active Lifecycle Protocol
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter mb-4 leading-tight">
                        {title}
                    </h2>
                    <p className="text-foreground/60 leading-relaxed mb-8 italic">
                        {subtitle}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                                <CheckCircle2 className="w-4 h-4 text-accent" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-8 mb-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <Calendar className="w-4 h-4 text-accent/60" />
                                <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">Build Fee</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black">${installmentPrice}</span>
                                <span className="text-xs text-foreground/40">/mo</span>
                            </div>
                            <p className="text-[10px] text-accent font-bold mt-1">({installmentsCount} MO'S)</p>
                        </div>

                        <div className="w-px h-12 bg-white/10" />

                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <RefreshCw className="w-4 h-4 text-accent/60" />
                                <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">Management</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black">${recurringPrice}</span>
                                <span className="text-xs text-foreground/40">/mo</span>
                            </div>
                            <p className="text-[10px] text-foreground/30 font-bold mt-1">(FOREVER)</p>
                        </div>
                    </div>

                    <div className="w-full pt-8 border-t border-white/5">
                        <div className="mb-6">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 block mb-1">Total Initial Commitment</span>
                            <span className="text-4xl font-black text-accent tracking-tighter">${installmentPrice + recurringPrice}<span className="text-lg text-foreground/40">.00</span></span>
                        </div>

                        <button
                            onClick={handleHybridCheckout}
                            disabled={loading}
                            className="w-full py-5 rounded-2xl bg-accent text-white font-black text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 border-glow hover:bg-accent/90 transition-all"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Initiate Engagement <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
