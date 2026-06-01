"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { 
    Zap, 
    Clock, 
    Package, 
    ArrowUpRight, 
    Plus, 
    Loader2, 
    FolderOpen, 
    Globe, 
    TrendingUp, 
    Eye, 
    MousePointerClick,
    Percent,
    LineChart,
    ChevronRight,
    Users,
    Search
} from "lucide-react";
import TaxReserveCard from "@/components/ui/dashboard/TaxReserveCard";
import { useState, useEffect, useMemo } from "react";

// Analytics Data Types
interface AnalyticsPayload {
    domain: string;
    company: string;
    category: string;
    metrics: {
        totalClicks: number;
        totalImpressions: number;
        avgCtr: number;
        avgPosition: number;
        activeUsers: number;
    };
    timeSeries: Array<{ date: string; clicks: number; impressions: number; ctr: number }>;
    queries: Array<{ query: string; clicks: number; impressions: number; position: number }>;
    pages: Array<{ path: string; views: number; rate: string }>;
}

export default function DashboardPage() {
    const { user, clientProfile, projects, activity, profileLoading } = useAuth();
    const [portalLoading, setPortalLoading] = useState(false);

    // Analytics States
    const [analytics, setAnalytics] = useState<AnalyticsPayload | null>(null);
    const [analyticsLoading, setAnalyticsLoading] = useState(true);
    const [analyticsError, setAnalyticsError] = useState<string | null>(null);

    // Fetch Google Analytics & GSC Data from API Route
    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!user) return;
            try {
                const token = await user.getIdToken();
                const res = await fetch("/api/analytics", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (!res.ok) throw new Error("Failed to authenticate search console.");
                const data = await res.json();
                setAnalytics(data);
            } catch (err: any) {
                console.error("Analytics fetch error:", err);
                setAnalyticsError(err.message);
            } finally {
                setAnalyticsLoading(false);
            }
        };

        fetchAnalytics();
    }, [user]);

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

    // Custom SVG Line Graph calculations for clicks over time
    const chartPath = useMemo(() => {
        if (!analytics || analytics.timeSeries.length === 0) return "";
        const data = analytics.timeSeries;
        const maxVal = Math.max(...data.map(d => d.clicks));
        const width = 800;
        const height = 180;
        const points = data.map((d, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - (d.clicks / maxVal) * (height - 30) - 15;
            return `${x},${y}`;
        });
        return `M ${points.join(" L ")}`;
    }, [analytics]);

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
        <div className="space-y-12 pb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-2 block font-mono">System Online</span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                        Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{clientProfile?.displayName || user?.email?.split('@')[0]}</span>
                    </h1>
                </div>

                <button className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-cyan-400 hover:text-white transition-all flex items-center gap-3">
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
                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none font-mono">{stat.label}</span>
                        </div>
                        <div className="text-xl font-black uppercase tracking-tight">{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* ── CENTRAL GOOGLE SEARCH CONSOLE & ANALYTICS INTERFACE ── */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 md:p-10 rounded-[2.5rem] glass-card border-white/10 bg-gradient-to-br from-slate-950 via-[#06061f] to-slate-950 shadow-2xl relative overflow-hidden group"
            >
                {/* Tech Glowing Grid mesh overlay */}
                <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-white/5 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <LineChart className="w-4 h-4 text-cyan-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 font-mono">Telemetry Node</span>
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
                            Google Search Console &amp; <span className="text-cyan-400">Analytics</span>
                        </h2>
                        {analytics && (
                            <span className="text-xs font-mono text-white/40 block mt-1 tracking-wider uppercase">
                                MONITORING PROPERTY: <span className="text-cyan-400/80">{analytics.domain}</span>
                            </span>
                        )}
                    </div>

                    {/* Google Analytics Real-time Pulse */}
                    {analytics && (
                        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-2xl px-5 py-3 shadow-lg shadow-green-500/5">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <div className="flex flex-col">
                                <span className="text-white text-xs font-black tracking-tight leading-none">
                                    {analytics.metrics.activeUsers} Users Active
                                </span>
                                <span className="text-[7px] font-mono uppercase text-green-400 font-bold tracking-widest mt-1">
                                    Live Google Analytics
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {analyticsLoading ? (
                    <div className="py-20 text-center flex flex-col items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-4" />
                        <p className="text-[9px] font-mono uppercase text-slate-500 tracking-[0.4em]">Querying search console matrix...</p>
                    </div>
                ) : analyticsError ? (
                    <div className="py-12 text-center bg-red-950/20 border border-red-500/20 rounded-2xl">
                        <p className="text-xs font-mono text-red-400">Authentication failure: {analyticsError}</p>
                    </div>
                ) : analytics ? (
                    <div className="space-y-10">
                        {/* Metrics Panel Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Organic Clicks", value: analytics.metrics.totalClicks.toLocaleString(), rate: "+12.4% vs last 30d", icon: MousePointerClick, color: "text-cyan-400", bg: "bg-cyan-500/5" },
                                { label: "Impressions", value: analytics.metrics.totalImpressions.toLocaleString(), rate: "+8.7% exposure index", icon: Eye, color: "text-blue-400", bg: "bg-blue-500/5" },
                                { label: "Avg CTR", value: `${analytics.metrics.avgCtr}%`, rate: "Direct search conversions", icon: Percent, color: "text-indigo-400", bg: "bg-indigo-500/5" },
                                { label: "Avg Position", value: analytics.metrics.avgPosition.toFixed(1), rate: "First page dominance", icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/5" },
                            ].map((met) => (
                                <div key={met.label} className={`p-6 rounded-2xl border border-white/5 ${met.bg} flex flex-col justify-between`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <met.icon className={`w-4 h-4 ${met.color}`} />
                                        <span className="text-[8px] font-mono uppercase text-white/40 tracking-wider font-bold">{met.label}</span>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-white">{met.value}</div>
                                        <div className="text-[8px] font-mono text-white/20 mt-1 uppercase tracking-wider">{met.rate}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Custom Pure SVG Time Series Line Graph */}
                        <div className="bg-slate-950/70 border border-white/5 rounded-3xl p-6 relative">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[10px] font-mono uppercase text-white/40 tracking-widest font-bold">Organic clicks Trajectory (Last 30 Days)</span>
                                <div className="flex gap-4 text-[9px] font-mono">
                                    <span className="flex items-center gap-1.5 text-cyan-400"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Clicks</span>
                                    <span className="flex items-center gap-1.5 text-white/20"><span className="w-1.5 h-1.5 rounded-full bg-white/10" /> Base Baseline</span>
                                </div>
                            </div>

                            {/* SVG Chart Container */}
                            <div className="relative w-full h-[180px]">
                                <svg className="w-full h-full" viewBox="0 0 800 180" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
                                            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    
                                    {/* Grid Lines */}
                                    <line x1="0" y1="30" x2="800" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                    <line x1="0" y1="75" x2="800" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                    <line x1="0" y1="120" x2="800" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                    <line x1="0" y1="165" x2="800" y2="165" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                                    {/* Shaded Area */}
                                    {chartPath && (
                                        <path
                                            d={`${chartPath} L 800,165 L 0,165 Z`}
                                            fill="url(#chartGlow)"
                                        />
                                    )}

                                    {/* Main Chart Line */}
                                    {chartPath && (
                                        <path
                                            d={chartPath}
                                            fill="none"
                                            stroke="#22d3ee"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    )}
                                </svg>
                            </div>

                            {/* X-Axis labels */}
                            <div className="flex justify-between text-[8px] font-mono text-white/30 uppercase tracking-widest mt-4">
                                <span>{analytics.timeSeries[0].date}</span>
                                <span>{analytics.timeSeries[14].date}</span>
                                <span>{analytics.timeSeries[29].date}</span>
                            </div>
                        </div>

                        {/* Top Queries & Pages Bento Grid */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Queries Table */}
                            <div className="border border-white/5 bg-slate-950/40 rounded-2xl p-6">
                                <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400 font-mono mb-4 flex items-center gap-2">
                                    <Search className="w-3.5 h-3.5" /> Driving Search Queries
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-[11px] font-medium border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/5 text-[9px] font-mono uppercase text-white/35">
                                                <th className="py-2.5">Search Keyword</th>
                                                <th className="py-2.5 text-center">Clicks</th>
                                                <th className="py-2.5 text-center">Exposure</th>
                                                <th className="py-2.5 text-right">Avg Pos</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/[0.03] text-slate-300">
                                            {analytics.queries.map((q) => (
                                                <tr key={q.query} className="hover:bg-white/[0.01] transition-colors">
                                                    <td className="py-3 font-semibold text-white">{q.query}</td>
                                                    <td className="py-3 text-center text-cyan-400 font-mono">{q.clicks}</td>
                                                    <td className="py-3 text-center font-mono text-slate-500">{q.impressions}</td>
                                                    <td className="py-3 text-right text-green-400 font-mono">{q.position.toFixed(1)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Pages Table */}
                            <div className="border border-white/5 bg-slate-950/40 rounded-2xl p-6">
                                <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 font-mono mb-4 flex items-center gap-2">
                                    <Globe className="w-3.5 h-3.5" /> High-Performance Pages
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-[11px] font-medium border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/5 text-[9px] font-mono uppercase text-white/35">
                                                <th className="py-2.5">Page Path</th>
                                                <th className="py-2.5 text-center">Visitor Views</th>
                                                <th className="py-2.5 text-right">Growth Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/[0.03] text-slate-300">
                                            {analytics.pages.map((p) => (
                                                <tr key={p.path} className="hover:bg-white/[0.01] transition-colors">
                                                    <td className="py-3 font-mono text-slate-400">{p.path}</td>
                                                    <td className="py-3 text-center text-white font-mono">{p.views}</td>
                                                    <td className="py-3 text-right text-green-400 font-mono font-bold">{p.rate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </motion.div>

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


