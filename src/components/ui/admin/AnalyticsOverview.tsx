"use client";

import { motion } from "framer-motion";
import { Activity, Users, MousePointer2, TrendingUp } from "lucide-react";

export default function AnalyticsOverview() {
    // High-performance mock data for traffic visualization
    const dailyTraffic = [
        { day: "Mon", visits: 450 },
        { day: "Tue", visits: 620 },
        { day: "Wed", visits: 890 },
        { day: "Thu", visits: 740 },
        { day: "Fri", visits: 980 },
        { day: "Sat", visits: 1240 },
        { day: "Sun", visits: 1560 },
    ];

    const maxVisits = Math.max(...dailyTraffic.map(d => d.visits));

    return (
        <div className="p-10 rounded-[2.5rem] glass-card border-white/5 bg-white/[0.01] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Traffic Intelligence</span>
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Nexus <span className="text-white">Flow</span></h2>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Peak Volume</div>
                        <div className="text-xl font-black text-blue-400">{maxVisits} <span className="text-[10px] text-white/20">U/D</span></div>
                    </div>
                </div>
            </div>

            {/* Chart Engine */}
            <div className="h-64 flex items-end gap-3 mb-10 px-4 relative">
                {/* Horizontal Grid Lines */}
                {[0, 25, 50, 75, 100].map((line) => (
                    <div
                        key={line}
                        className="absolute w-full border-t border-white/[0.03]"
                        style={{ bottom: `${line}%` }}
                    />
                ))}

                {dailyTraffic.map((data, i) => (
                    <div key={data.day} className="flex-1 flex flex-col items-center gap-4 group/bar">
                        <div className="relative w-full flex items-end justify-center h-full">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${(data.visits / maxVisits) * 100}%` }}
                                transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                                className="w-full max-w-[40px] bg-gradient-to-t from-blue-500/20 via-blue-400/40 to-blue-400 rounded-t-xl group-hover/bar:brightness-125 transition-all relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_2s_infinite]" />
                            </motion.div>
                        </div>
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{data.day}</span>
                    </div>
                ))}
            </div>

            {/* Real-time KPI Ribbon */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5">
                {[
                    { label: "Active Nodes", value: "24", icon: Users, color: "text-blue-400" },
                    { label: "Conversion Rate", value: "4.8%", icon: MousePointer2, color: "text-accent" },
                    { label: "Growth Index", value: "+12%", icon: TrendingUp, color: "text-indigo-400" },
                ].map((kpi) => (
                    <div key={kpi.label} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <kpi.icon className={`w-4 h-4 ${kpi.color} mb-3`} />
                        <div className="text-lg font-black tracking-tight">{kpi.value}</div>
                        <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-1">{kpi.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
