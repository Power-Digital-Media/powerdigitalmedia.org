"use client";

import { motion } from "framer-motion";
import { ShieldAlert, TrendingUp, Landmark, Calculator } from "lucide-react";

interface TaxReserveCardProps {
    grossRevenue: number;
    reservePercentage?: number;
}

export default function TaxReserveCard({
    grossRevenue,
    reservePercentage = 30
}: TaxReserveCardProps) {
    const reserveAmount = (grossRevenue * reservePercentage) / 100;
    const netOperating = grossRevenue - reserveAmount;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 rounded-[2.5rem] glass-card border-accent/20 bg-gradient-to-br from-accent/[0.05] to-transparent relative overflow-hidden group"
        >
            {/* Background Icon Watermark */}
            <Calculator className="absolute -right-8 -bottom-8 w-40 h-40 text-accent/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <ShieldAlert className="w-4 h-4 text-accent" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Power Reserve Protocol</span>
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tighter">Tax <span className="text-white">Liability</span></h2>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Calculator className="w-6 h-6 text-accent" />
                    </div>
                </div>

                <div className="grid gap-8">
                    {/* Gross Metric */}
                    <div className="flex items-end justify-between border-b border-white/5 pb-6">
                        <div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-white/20 block mb-1">Gross Inbound Revenue</span>
                            <div className="text-3xl font-black tracking-tight">${grossRevenue.toLocaleString()}</div>
                        </div>
                        <TrendingUp className="w-4 h-4 text-white/20 mb-2" />
                    </div>

                    {/* Calculated Reserve */}
                    <div className="flex items-end justify-between bg-accent/10 p-6 rounded-2xl border border-accent/20">
                        <div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-accent block mb-1">Estimated Tax Reserve ({reservePercentage}%)</span>
                            <div className="text-3xl font-black tracking-tight text-accent">${reserveAmount.toLocaleString()}</div>
                        </div>
                        <Landmark className="w-6 h-6 text-accent opacity-50 mb-1" />
                    </div>

                    {/* Net Operating */}
                    <div className="flex items-end justify-between pt-2">
                        <div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-white/40 block mb-1">Net Operating Capital</span>
                            <div className="text-xl font-bold tracking-tight text-white/60">${netOperating.toLocaleString()}</div>
                        </div>
                        <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">
                            Operational Safe Zone
                        </div>
                    </div>
                </div>

                <div className="mt-10 p-4 rounded-xl bg-white/[0.02] border border-dashed border-white/10">
                    <p className="text-[10px] text-white/40 leading-loose italic">
                        "Protocol Reminder: Move the <span className="text-accent font-bold">${reserveAmount.toLocaleString()}</span> reserve to your dedicated tax vault immediately to maintain 100% solvency."
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
