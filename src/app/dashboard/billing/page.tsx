"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { CreditCard, ExternalLink, ShieldCheck, History, Download, Zap, Loader2, FileX } from "lucide-react";
import { useState } from "react";

export default function DashboardBillingPage() {
    const { clientProfile, invoices, profileLoading } = useAuth();
    const [portalLoading, setPortalLoading] = useState(false);

    const handleOpenPortal = async () => {
        if (!clientProfile?.stripeCustomerId) return;
        setPortalLoading(true);
        try {
            const res = await fetch("/api/customer-portal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerId: clientProfile.stripeCustomerId,
                    returnUrl: window.location.href,
                }),
            });
            const data = await res.json();
            if (data.url) window.open(data.url, "_blank");
        } catch (err) {
            console.error("Portal error:", err);
        } finally {
            setPortalLoading(false);
        }
    };

    // Format currency
    const fmt = (cents: number) => `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

    // Derive subscription display
    const hasSubscription = clientProfile?.subscriptionStatus === "active" || clientProfile?.subscriptionStatus === "past_due";
    const tierLabel = clientProfile?.subscriptionTier === "management"
        ? "Identity Protocol + Management"
        : clientProfile?.subscriptionTier === "custom"
            ? "Custom Protocol"
            : "No Active Subscription";
    const statusBadge = clientProfile?.subscriptionStatus === "active"
        ? "Active Premium Tier"
        : clientProfile?.subscriptionStatus === "past_due"
            ? "Payment Past Due"
            : clientProfile?.subscriptionStatus === "canceled"
                ? "Subscription Canceled"
                : "No Active Tier";
    const monthlyRate = clientProfile?.monthlyRate ?? 0;
    const nextPayment = clientProfile?.nextPaymentDate
        ? new Date(clientProfile.nextPaymentDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : "—";

    if (profileLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Loading Financial Data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter">Financial <span className="text-accent">Ledger.</span></h1>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-2 italic">Secure managed subscription and payment architecture.</p>
            </div>

            {/* Active Subscription Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-12 rounded-[3.5rem] glass-card flex flex-col md:flex-row items-center justify-between gap-10 ${hasSubscription ? "border-accent/20 bg-accent/5" : "border-white/10 bg-white/[0.02]"}`}
            >
                <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest mb-6 ${hasSubscription ? "bg-accent text-slate-950" : "bg-white/10 text-white/40"}`}>
                        {statusBadge}
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">{tierLabel}</h2>
                    {hasSubscription && (
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Billing Rate</span>
                                <span className="text-xl font-black text-white">${monthlyRate.toLocaleString()}.00 / mo</span>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="flex flex-col">
                                <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Next Transaction</span>
                                <span className="text-xl font-black text-white">{nextPayment}</span>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleOpenPortal}
                    disabled={portalLoading || !clientProfile?.stripeCustomerId}
                    className="px-10 py-6 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent transition-all flex items-center gap-3 shadow-[0_0_50px_rgba(255,255,255,0.1)] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {portalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Manage at Stripe <ExternalLink className="w-4 h-4" /></>}
                </button>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Payment History — Live Invoices */}
                <div className="p-10 rounded-[3rem] glass-card border-white/5 bg-white/[0.01]">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <History className="w-4 h-4 text-white/40" />
                            <h2 className="text-xl font-black uppercase tracking-tighter text-white/60">Payment History</h2>
                        </div>
                    </div>

                    {invoices.length > 0 ? (
                        <div className="space-y-4">
                            {invoices.map((inv) => (
                                <div key={inv.id} className="flex items-center justify-between p-5 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-all group">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black uppercase tracking-widest">{inv.description || "Invoice"}</div>
                                        <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest">
                                            {new Date(inv.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} // {inv.status}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-sm font-black">{fmt(inv.amountPaid)}</span>
                                        {inv.invoicePdf && (
                                            <a href={inv.invoicePdf} target="_blank" rel="noopener noreferrer" className="p-2 text-white/20 hover:text-white transition-colors">
                                                <Download className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center">
                            <FileX className="w-8 h-8 text-white/10 mx-auto mb-4" />
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">No Invoices Yet</p>
                            <p className="text-[8px] text-white/10 uppercase tracking-widest mt-1">Payment history will appear here once your first invoice is generated.</p>
                        </div>
                    )}
                </div>

                {/* Security Info */}
                <div className="p-10 rounded-[3rem] glass-card border-white/5 bg-white/[0.01] flex flex-col justify-between">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-accent" />
                            <h2 className="text-xl font-black uppercase tracking-tighter">Security <span className="text-accent">Protocol.</span></h2>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed font-bold uppercase tracking-widest italic">
                            All transaction data is encrypted via 256-bit SSL and processed exclusively through Stripe's high-authority financial network. Your credentials are never stored on our local architecture.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.03] flex items-center gap-6 mt-10">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/20">
                            <Zap className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest">Tax Resiliency Active</div>
                            <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-1">Stripe Tax 1.0 Deployment</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
