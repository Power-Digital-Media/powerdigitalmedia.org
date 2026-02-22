"use client";

import React from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const PricingCard = ({
    title,
    price,
    features,
    icon: Icon,
    popular = false,
    colorClass = "cyan",
    delay = 0,
    onCheckout
}: any) => {
    const colorMap: Record<string, string> = {
        cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30 shadow-cyan-500/20",
        purple: "text-purple-400 bg-purple-500/10 border-purple-500/30 shadow-purple-500/20",
        pink: "text-pink-400 bg-pink-500/10 border-pink-500/30 shadow-pink-500/20"
    };

    const trailClassMap: Record<string, string> = {
        cyan: "light-trail-cyan",
        purple: "light-trail-purple",
        pink: "light-trail-pink"
    };

    const btnColorMap: Record<string, string> = {
        cyan: "bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/30",
        purple: "bg-purple-600 hover:bg-purple-700 shadow-purple-600/30",
        pink: "bg-pink-600 hover:bg-pink-700 shadow-pink-600/30"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: delay / 1000, ease: "easeOut" }}
            whileHover={{ y: -10 }}
            className={`relative group ${popular ? 'scale-105 z-10' : 'z-0'}`}
        >
            {popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.6)] z-20 flex items-center gap-2">
                    <Activity className="w-3 h-3 animate-pulse" /> Accelerated Growth
                </div>
            )}

            <div className={`light-trail-wrapper ${trailClassMap[colorClass]} rounded-[2.5rem] p-[1px]`}>
                <div className="light-trail-border"></div>
                <div className={`light-trail-content h-full p-8 md:p-12 rounded-[2.5rem] flex flex-col transition-all duration-500 ${popular ? 'bg-slate-900/40 shadow-[0_0_50px_rgba(6,182,212,0.1)]' : ''
                    }`}>
                    <div className="flex justify-between items-start mb-10">
                        <div className={`p-4 rounded-2xl inline-block ${colorMap[colorClass]}`}>
                            <Icon className="w-10 h-10" />
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">System Tier</span>
                            <span className="text-white font-orbitron font-bold text-sm tracking-widest">VER 2.6.4</span>
                        </div>
                    </div>

                    <h3 className="font-orbitron text-3xl font-black text-white uppercase mb-2 tracking-tighter">{title}</h3>
                    <div className="flex items-baseline gap-1 mb-10">
                        <span className="text-5xl font-black text-white tracking-tighter">${price}</span>
                        <span className="text-slate-500 font-medium tracking-wide uppercase text-xs">/ System Cycle</span>
                    </div>

                    <div className="space-y-5 flex-grow mb-12">
                        {features.map((feature: string, i: number) => (
                            <div key={i} className="flex items-start gap-4 group/item">
                                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full transition-colors ${popular ? 'bg-cyan-400 group-hover/item:bg-white' : 'bg-slate-700'}`}></div>
                                <span className="text-slate-400 text-sm font-medium leading-tight group-hover/item:text-slate-200 transition-colors">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onCheckout}
                        className={`w-full text-center py-5 rounded-2xl font-orbitron font-black uppercase tracking-[0.2em] text-sm transition-shadow shadow-xl ${popular
                            ? `${btnColorMap[colorClass]} text-white group-hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]`
                            : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:shadow-cyan-500/10'
                            }`}
                    >
                        Initialize Protocol
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export const ComparisonMatrix = () => {
    const rows = [
        { label: "Creative Variations", starter: "Low", growth: "10/mo", dominator: "25+/mo" },
        { label: "Testing Frequency", starter: "Manual", growth: "Weekly", dominator: "Daily Engine" },
        { label: "Channel Coverage", starter: "Meta Only", growth: "Meta Full", dominator: "Omni-Present" },
        { label: "Optimization Check", starter: "2x Week", growth: "Daily", dominator: "Dedicated Sync" },
        { label: "Strategy Sessions", starter: "Monthly", growth: "Bi-Weekly", dominator: "Weekly VIP" }
    ];

    return (
        <div className="mt-40 glass-card rounded-[2.5rem] border border-white/10 overflow-hidden hidden md:block">
            <div className="grid grid-cols-4 bg-white/5 p-8 border-b border-white/10">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Feature Matrix</div>
                <div className="text-center font-orbitron font-bold text-xs tracking-widest text-white">Starter</div>
                <div className="text-center font-orbitron font-bold text-xs tracking-widest text-cyan-400">Growth</div>
                <div className="text-center font-orbitron font-bold text-xs tracking-widest text-purple-400">Dominator</div>
            </div>
            <div className="p-4">
                {rows.map((row, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        key={i}
                        className="grid grid-cols-4 p-6 hover:bg-white/5 transition-colors rounded-2xl"
                    >
                        <div className="text-sm font-bold text-slate-300">{row.label}</div>
                        <div className="text-center text-sm text-slate-500">{row.starter}</div>
                        <div className="text-center text-sm text-cyan-300 font-bold">{row.growth}</div>
                        <div className="text-center text-sm text-purple-300 font-bold">{row.dominator}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
