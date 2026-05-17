"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Zap, Clock, Package, ArrowUpRight, Plus, Loader2, FolderOpen } from "lucide-react";
import TaxReserveCard from "@/components/ui/dashboard/TaxReserveCard";
import { useState } from "react";

export default function DashboardPage() {
    const { user, clientProfile, projects, activity, profileLoading } = useAuth();
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

    // Derive display values from live data
    const tierLabel = clientProfile?.subscriptionTier === "management"
        ? "Managed Growth"
        : clientProfile?.subscriptionTier === "custom"
            ? "Custom Protocol"
            : "No Active Protocol";

    const statusLabel = clientProfile?.subscriptionStatus === "active"
        ? "Active"
        : clientProfile?.subscriptionStatus === "past_due"
            ? "Past Due"
            : clientProfile?.subscriptionStatus === "canceled"
                ? "Canceled"
                : "Inactive";

    const monthlyRate = clientProfile?.monthlyRate ?? 0;

    // Loading skeleton
    if (profileLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Loading Dashboard Data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-2 block">System Online</span>
                    <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
                        Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{clientProfile?.displayName || user?.email?.split('@')[0]}</span>
                    </h1>
                </div>

                <button className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all flex items-center gap-3">
                    <Plus className="w-4 h-4" /> New Architecture
                </button>
            </motion.div>

            {/* Quick Stats Grid — Live Data */}
            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { label: "Active Protocol", value: tierLabel, icon: Zap, accent: "text-accent" },
                    { label: "Status", value: statusLabel, icon: Clock, accent: "text-blue-400" },
                    { label: "Monthly Rate", value: monthlyRate > 0 ? `$${monthlyRate.toLocaleString()}.00 / mo` : "N/A", icon: Package, accent: "text-indigo-400" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-3xl glass-card border-white/5 bg-white/[0.01]"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <stat.icon className={`w-5 h-5 ${stat.accent}`} />
                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none">{stat.label}</span>
                        </div>
                        <div className="text-xl font-black uppercase tracking-tight">{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Active Projects — Live Data */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-10 rounded-[2.5rem] glass-card border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-950/50 shadow-2xl shadow-black/50 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/5 rounded-full blur-[80px] group-hover:bg-accent/10 transition-colors duration-700" />
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-xl font-black uppercase tracking-tighter">Active <span className="text-accent">Protocols</span></h2>
                        <button className="text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-widest flex items-center gap-2">
                            View All <ArrowUpRight className="w-3 h-3" />
                        </button>
                    </div>

                    {projects.length > 0 ? (
                        <div className="space-y-6">
                            {projects.slice(0, 2).map((project) => (
                                <div key={project.id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-accent/40 transition-all cursor-pointer">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-sm font-bold uppercase tracking-widest">{project.name}</div>
                                        <span className="px-3 py-1 bg-accent/10 text-accent text-[8px] font-black uppercase tracking-[0.2em] rounded-full">{project.status}</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2">
                                        <div className="h-full bg-accent" style={{ width: `${project.progress}%` }} />
                                    </div>
                                    <div className="flex justify-between text-[8px] font-bold text-white/20 uppercase tracking-widest">
                                        <span>{project.type}</span>
                                        <span>{project.progress}% Complete</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-10 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center">
                            <FolderOpen className="w-8 h-8 text-white/10 mx-auto mb-4" />
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">No Active Protocols</p>
                            <p className="text-[8px] text-white/10 uppercase tracking-widest mt-1">Projects will appear here once initiated.</p>
                        </div>
                    )}
                </motion.div>

                {/* Tax Reserve Calculator — Live Rate */}
                <TaxReserveCard grossRevenue={monthlyRate} />

                {/* Account / Billing Hub Access — Stripe Portal Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-10 rounded-[2.5rem] glass-card border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-950/50 lg:col-span-2 relative overflow-hidden group"
                >
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-colors duration-700" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative z-10">
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-tighter mb-4">Financial <span className="text-blue-400">Ledger</span></h2>
                            <p className="text-white/40 text-xs font-medium max-w-md">
                                Access your secure Stripe portal to manage subscriptions, update payment methods, and download legal invoices.
                            </p>
                        </div>
                        <button
                            onClick={handleOpenPortal}
                            disabled={portalLoading || !clientProfile?.stripeCustomerId}
                            className="px-10 py-5 rounded-2xl glass-card border-accent/20 text-accent font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent hover:text-slate-950 transition-all whitespace-nowrap shadow-[0_0_30px_rgba(34,211,238,0.1)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-3"
                        >
                            {portalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Launch Stripe Billing Portal"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
