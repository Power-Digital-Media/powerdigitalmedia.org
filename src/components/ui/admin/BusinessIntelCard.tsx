"use client";

import { motion } from "@/components/providers/MotionProvider";
import { LucideIcon } from "lucide-react";

interface IntelProp {
    label: string;
    value: string | number;
    subValue?: string;
    icon: LucideIcon;
    trend?: {
        value: string;
        positive: boolean;
    };
    color?: string;
}

export default function BusinessIntelCard({
    label,
    value,
    subValue,
    icon: Icon,
    trend,
    color = "text-accent"
}: IntelProp) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl glass-card border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent relative group hover:border-white/10 transition-all"
        >
            <div className="flex items-start justify-between mb-8">
                <div className={`w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                </div>
                {trend && (
                    <div className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${trend.positive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                        {trend.positive ? "▲" : "▼"} {trend.value}
                    </div>
                )}
            </div>

            <div>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-1">{label}</span>
                <div className="text-2xl font-black tracking-tight uppercase">{value}</div>
                {subValue && (
                    <div className="text-[10px] font-medium text-white/40 mt-1 italic">{subValue}</div>
                )}
            </div>

            {/* Decorative HUD Elements */}
            <div className="absolute top-4 right-4 flex gap-1 opacity-20">
                <div className="w-1 h-1 rounded-full bg-white" />
                <div className="w-1 h-1 rounded-full bg-white" />
            </div>
        </motion.div>
    );
}
