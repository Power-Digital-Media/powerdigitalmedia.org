"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "@/components/providers/MotionProvider";
import { Zap, Clock, Package, ArrowUpRight, Plus } from "lucide-react";
import TaxReserveCard from "@/components/ui/dashboard/TaxReserveCard";

export default function DashboardPage() {
    const { user } = useAuth();

    // Mock gross revenue for initial demonstration - will link to Stripe live data
    const grossRevenue = 1500;

    return (
        <div className="space-y-12">
            {/* ... rest of the header ... */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-2 block">System Online</span>
                    <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
                        Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{user?.email?.split('@')[0]}</span>
                    </h1>
                </div>

                <button className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all flex items-center gap-3">
                    <Plus className="w-4 h-4" /> New Architecture
                </button>
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { label: "Active Protocol", value: "Identity Build", icon: Zap, accent: "text-accent" },
                    { label: "Deployment Phase", value: "Architecture", icon: Clock, accent: "text-blue-400" },
                    { label: "Asset Sync", value: "48 / 60 GB", icon: Package, accent: "text-indigo-400" },
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
                {/* Active Projects */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-10 rounded-[2.5rem] glass-card border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent"
                >
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-xl font-black uppercase tracking-tighter">Active <span className="text-accent">Protocols</span></h2>
                        <button className="text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-widest flex items-center gap-2">
                            View All <ArrowUpRight className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-accent/40 transition-all cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-sm font-bold uppercase tracking-widest">Flagship Website Architecture</div>
                                <span className="px-3 py-1 bg-accent/10 text-accent text-[8px] font-black uppercase tracking-[0.2em] rounded-full">Engineering</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2">
                                <div className="w-[45%] h-full bg-accent" />
                            </div>
                            <div className="flex justify-between text-[8px] font-bold text-white/20 uppercase tracking-widest">
                                <span>Phase 02: Structural Engineering</span>
                                <span>45% Complete</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tax Reserve Calculator */}
                <TaxReserveCard grossRevenue={grossRevenue} />

                {/* Account / Billing Hub Access */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-10 rounded-[2.5rem] glass-card border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent lg:col-span-2"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-tighter mb-4">Financial <span className="text-blue-400">Ledger</span></h2>
                            <p className="text-white/40 text-xs font-medium max-w-md">
                                Access your secure Stripe portal to manage subscriptions, update payment methods, and download legal invoices.
                            </p>
                        </div>
                        <button className="px-10 py-5 rounded-2xl glass-card border-accent/20 text-accent font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent hover:text-slate-950 transition-all whitespace-nowrap shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                            Launch Stripe Billing Portal
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
