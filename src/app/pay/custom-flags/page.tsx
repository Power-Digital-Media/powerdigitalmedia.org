"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Flag,
    Package,
    Truck,
    Palette,
    CheckCircle2,
    ShieldCheck,
    CreditCard,
    Loader2,
    FileText,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ─── Invoice Data ─────────────────────────────────────────────── */
const INVOICE = {
    project: "Custom 3' × 5' Fabric Flags",
    client: "Yazoo City Complex — 75 Year Anniversary",
    preparedBy: "Power Digital Media",
    total: 300_00, // cents for Stripe
    items: [
        {
            icon: Palette,
            name: "Approved Design Setup & Print Formatting",
            description:
                "Final sizing, positioning, and preparation of the already-approved design for production",
            qty: 1,
            unitPrice: 50_00,
        },
        {
            icon: Flag,
            name: "3' × 5' Custom Fabric Flags",
            description:
                "Full-color custom printed fabric flags using the approved Yazoo City Complex 75 Year Anniversary design",
            qty: 3,
            unitPrice: 65_00,
        },
        {
            icon: Truck,
            name: "Shipping & Vendor Handling",
            description:
                "Standard shipping, vendor upload, production processing, and order handling",
            qty: 1,
            unitPrice: 55_00,
        },
    ],
    includes: [
        "Final print setup",
        "Three custom 3' × 5' fabric flags",
        "Approved artwork placement",
        "Vendor upload",
        "Standard shipping",
        "Production handling",
    ],
};

function formatCurrency(cents: number): string {
    return `$${(cents / 100).toFixed(2)}`;
}

/* ─── Page Content ─────────────────────────────────────────────── */
export default function CustomFlagsPaymentPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePayment = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: [
                        {
                            price_data: {
                                currency: "usd",
                                product_data: {
                                    name: "Custom 3' × 5' Fabric Flags — Yazoo City Complex 75 Year Anniversary",
                                    description:
                                        "Package includes: Design setup, 3 custom fabric flags, artwork placement, vendor upload, shipping & handling.",
                                },
                                unit_amount: INVOICE.total,
                            },
                            quantity: 1,
                        },
                    ],
                    mode: "payment",
                    customerEmail: "hannah.hasty@cfindustries.com",
                    successUrl: `${window.location.origin}/pay/custom-flags/success`,
                    cancelUrl: `${window.location.origin}/pay/custom-flags`,
                }),
            });

            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || "Failed to create checkout session");
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen bg-background">
            <Navbar />

            {/* ─── Ambient glow ──────────────────────────────────── */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />
            <div className="absolute top-40 right-1/4 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none -z-10 rounded-full" />

            {/* ─── Hero Header ───────────────────────────────────── */}
            <section className="pt-32 pb-8">
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <FileText className="w-4 h-4" />
                            Invoice &amp; Payment
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">
                            Custom Flag{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Print Order
                            </span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                            Yazoo City Complex — 75 Year Anniversary
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ─── Invoice Card ───────────────────────────────────── */}
            <section className="pb-8">
                <div className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="rounded-3xl glass-card border-white/10 overflow-hidden"
                        >
                            {/* Invoice Header */}
                            <div className="flex items-center justify-between px-8 py-4 border-b border-white/5 bg-slate-950/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                                        Invoice Details
                                    </span>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
                                    Power Digital Media
                                </span>
                            </div>

                            {/* Line Items */}
                            <div className="divide-y divide-white/5">
                                {INVOICE.items.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="px-8 py-6 flex gap-5"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mt-0.5">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-sm font-semibold text-white">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <p className="text-sm font-bold text-white">
                                                        {formatCurrency(item.unitPrice * item.qty)}
                                                    </p>
                                                    {item.qty > 1 && (
                                                        <p className="text-[11px] text-muted-foreground mt-0.5">
                                                            {item.qty} × {formatCurrency(item.unitPrice)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="px-8 py-6 border-t border-white/10 bg-slate-950/30">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold uppercase tracking-wider text-white/60">
                                        Total Due
                                    </span>
                                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                        {formatCurrency(INVOICE.total)}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── Package Includes ───────────────────────────────── */}
            <section className="pb-8">
                <div className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="rounded-2xl glass-card border-white/10 p-8"
                        >
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4 flex items-center gap-2">
                                <Package className="w-4 h-4 text-cyan-400" />
                                Package Includes
                            </h2>
                            <div className="grid gap-2 sm:grid-cols-2">
                                {INVOICE.includes.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-2.5 text-sm text-white/80"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── Design Status ──────────────────────────────────── */}
            <section className="pb-8">
                <div className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="rounded-2xl bg-emerald-500/5 border border-emerald-400/15 p-6 flex items-start gap-4"
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-emerald-400">
                                    Design Approved
                                </p>
                                <p className="text-xs text-white/60 mt-1 leading-relaxed">
                                    The design has already been reviewed and approved. Once payment
                                    is received, the order will be submitted for production
                                    immediately.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── Pay Button ─────────────────────────────────────── */}
            <section className="pb-24">
                <div className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="text-center space-y-4"
                        >
                            <button
                                onClick={handlePayment}
                                disabled={isLoading}
                                className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base
                                    shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40
                                    transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                                    disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Redirecting to Stripe…
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        Pay {formatCurrency(INVOICE.total)}
                                    </>
                                )}
                                {!isLoading && (
                                    <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                            </button>

                            {error && (
                                <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2 inline-block">
                                    {error}
                                </p>
                            )}

                            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                Secure payment powered by Stripe
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
