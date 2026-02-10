"use client";

import { motion } from "@/components/providers/MotionProvider";
import {
    Activity,
    Users,
    DollarSign,
    ShieldCheck,
    ArrowUpRight,
    Zap,
    Globe,
    Terminal,
    Target
} from "lucide-react";
import AdminGuard from "@/components/auth/AdminGuard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnalyticsOverview from "@/components/ui/admin/AnalyticsOverview";
import BusinessIntelCard from "@/components/ui/admin/BusinessIntelCard";
import TaxReserveCard from "@/components/ui/dashboard/TaxReserveCard";

export default function AdminDashboard() {
    // Mastermind Intelligence Mock Data
    const totalGross = 125000;
    const activeLeads = 12;
    const systemStatus = "99.9% Uptime";

    return (
        <AdminGuard>
            <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
                <Navbar />

                {/* Sub-Nav / HUD Breadcrumbs */}
                <div className="absolute top-24 left-0 w-full border-b border-white/5 py-3 bg-black/40 backdrop-blur-md z-20">
                    <div className="container px-6 mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em]">
                            <span className="text-white/20">System</span>
                            <span className="text-white/20">/</span>
                            <span className="text-accent">Nexus HUD</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Master Clearance Active</span>
                        </div>
                    </div>
                </div>

                <section className="relative pt-48 pb-24">
                    <div className="container px-6 mx-auto">
                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Primary Intelligence Column */}
                            <div className="flex-1 space-y-12">
                                {/* Header Section */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                                            <Terminal className="w-5 h-5 text-accent" />
                                        </div>
                                        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
                                            Nexus <span className="text-accent">HUD</span>
                                        </h1>
                                    </div>
                                    <p className="text-white/40 font-medium max-w-xl italic">
                                        Consolidated Business Intelligence Interface. Monitoring global nodes, conversion matrix, and financial solvency in real-time.
                                    </p>
                                </motion.div>

                                {/* Analytics Engine Overlay */}
                                <AnalyticsOverview />

                                {/* Secondary HUD Grid */}
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    <BusinessIntelCard
                                        label="Active Leads"
                                        value={activeLeads}
                                        subValue="High Priority Conversion"
                                        icon={Target}
                                        trend={{ value: "12%", positive: true }}
                                        color="text-indigo-400"
                                    />
                                    <BusinessIntelCard
                                        label="Network Uptime"
                                        value={systemStatus}
                                        subValue="All Nodes Operational"
                                        icon={Zap}
                                        color="text-accent"
                                    />
                                    <BusinessIntelCard
                                        label="Global Clients"
                                        value="08"
                                        subValue="Enterprise Tier Assets"
                                        icon={Globe}
                                        color="text-blue-400"
                                    />
                                </div>
                            </div>

                            {/* Sidebar Intelligence (Financials & Security) */}
                            <div className="w-full lg:w-[400px] space-y-12">
                                {/* Aggregated Tax Reserve Monitor */}
                                <div>
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-xl font-black uppercase tracking-tighter">Aggregate <span className="text-blue-400">Ledger</span></h2>
                                        <DollarSign className="w-5 h-5 text-blue-400" />
                                    </div>
                                    {/* Using the same component for consistency, but with admin context */}
                                    <TaxReserveCard grossRevenue={totalGross} />
                                </div>

                                {/* Security Clearance Panel */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-8 rounded-[2rem] glass-card border-red-500/20 bg-red-500/5"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <ShieldCheck className="w-5 h-5 text-red-500" />
                                        <span className="text-sm font-black uppercase tracking-tighter">Admin Protocols</span>
                                    </div>
                                    <div className="space-y-4">
                                        <button className="w-full py-4 rounded-xl glass-card border-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-left px-5 flex items-center justify-between group">
                                            User Management <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        <button className="w-full py-4 rounded-xl glass-card border-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-left px-5 flex items-center justify-between group">
                                            System Configurations <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        <button className="w-full py-4 rounded-xl border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/10 transition-all text-left px-5 flex items-center justify-between group">
                                            Emergency Halt <Zap className="w-3 h-3 group-hover:scale-125 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </AdminGuard>
    );
}
