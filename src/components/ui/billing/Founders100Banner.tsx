"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowRight, Loader2, CheckCircle2, Flame, Shield } from "lucide-react";
import { useState, useEffect } from "react";

interface Founders100Props {
    onCheckout: (priceId: string) => void;
    loading: string | null;
}

export default function Founders100Banner({ onCheckout, loading }: Founders100Props) {
    const [promoData, setPromoData] = useState<{
        remaining: number;
        total: number;
        claimed: number;
        active: boolean;
    } | null>(null);

    const promoPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_FOUNDERS100 || "";

    useEffect(() => {
        fetch("/api/founders100")
            .then((r) => r.json())
            .then(setPromoData)
            .catch(() =>
                setPromoData({ remaining: 97, total: 100, claimed: 3, active: true })
            );
    }, []);

    if (!promoData || !promoData.active || promoData.remaining <= 0) return null;

    const progressPercent = (promoData.claimed / promoData.total) * 100;
    const isUrgent = promoData.remaining <= 20;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-5xl mx-auto mb-20"
        >
            {/* Ambient glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-[48px] blur-2xl pointer-events-none" />
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-400/30 to-amber-500/20 rounded-[44px] blur-md pointer-events-none opacity-50" />

            <div className="relative rounded-[40px] border border-amber-400/20 bg-gradient-to-br from-amber-950/40 via-slate-950/80 to-orange-950/30 backdrop-blur-xl overflow-hidden">
                {/* Top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

                {/* Animated corner badge */}
                <div className="absolute top-0 right-0">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black uppercase tracking-[0.25em] rounded-bl-2xl shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                    >
                        Limited Offer
                    </motion.div>
                </div>

                <div className="p-10 md:p-14">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                            <Flame className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black tracking-[0.3em] uppercase text-amber-400/70">
                                Exclusive Initiative
                            </p>
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                                Founder&apos;s 100
                            </h2>
                        </div>
                    </div>

                    {/* Value Proposition */}
                    <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mb-10">
                        We&apos;re building <span className="text-white font-semibold">100 high-authority websites</span> at our
                        Growth Build tier — for the price of an Identity Build. Once all 100 spots are claimed,
                        this offer disappears permanently.
                    </p>

                    {/* Pricing Block */}
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16 mb-10">
                        {/* Price */}
                        <div>
                            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">
                                Growth Build Value
                            </p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-white/25 line-through text-2xl font-bold">$3,000</span>
                                <span className="text-5xl md:text-6xl font-black text-white tracking-tight">
                                    $1,500
                                </span>
                            </div>
                            <p className="text-amber-400/60 text-xs mt-2 font-medium">
                                50% off — One-time investment
                            </p>
                        </div>

                        {/* Counter */}
                        <div className="flex-1 w-full md:max-w-xs">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">
                                    Spots Claimed
                                </p>
                                <p className={`text-sm font-black ${isUrgent ? 'text-red-400' : 'text-amber-400'}`}>
                                    {promoData.remaining} left
                                </p>
                            </div>

                            {/* Progress bar */}
                            <div className="relative w-full h-3 rounded-full bg-white/5 border border-white/5 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                    className={`absolute inset-y-0 left-0 rounded-full ${isUrgent
                                        ? 'bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                                        : 'bg-gradient-to-r from-amber-500 to-orange-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                                        }`}
                                />
                            </div>

                            <div className="flex justify-between mt-2">
                                <span className="text-[10px] text-white/20 font-mono">{promoData.claimed} claimed</span>
                                <span className="text-[10px] text-white/20 font-mono">{promoData.total} total</span>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        {[
                            { icon: CheckCircle2, text: "Custom UI/UX + Advanced 3D Assets" },
                            { icon: CheckCircle2, text: "E-commerce Protocol + Logic Integrations" },
                            { icon: Shield, text: "Next.js Performance + SEO Foundation" },
                        ].map((feat, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5"
                            >
                                <feat.icon className="w-4 h-4 text-amber-400/60 flex-shrink-0" />
                                <span className="text-[10px] font-bold tracking-wider uppercase text-white/40">
                                    {feat.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <button
                            onClick={() => onCheckout(promoPriceId)}
                            disabled={loading !== null || !promoPriceId}
                            className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black uppercase tracking-[0.2em] text-xs transition-all hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {loading === promoPriceId ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <Zap className="w-4 h-4" />
                                    Claim Your Spot
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <p className="text-[10px] text-white/20 italic text-center sm:text-left max-w-xs">
                            Same Growth Build deliverables. Same quality. Half the investment.
                            No recurring fees.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
