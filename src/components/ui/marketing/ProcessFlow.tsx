"use client";

import React from 'react';
import { MousePointer2, Cpu, TrendingUp, Flame, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProcessFlow() {
    const steps = [
        { title: "Study", desc: "Analysis of 15-20 winners", icon: MousePointer2 },
        { title: "Generate", desc: "10+ Copied variations", icon: Cpu },
        { title: "Deploy", desc: "Dual-ad testing engine", icon: Flame },
        { title: "Scale", desc: "Aggressive budget push", icon: TrendingUp }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 py-12 md:py-16">
            {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                        key={i}
                        className="light-trail-wrapper rounded-2xl relative"
                    >
                        <div className="light-trail-border"></div>
                        <div className="light-trail-content h-full p-6 md:p-8 rounded-2xl transition-all duration-300 flex flex-col items-center text-center group hover:bg-slate-900/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 bg-slate-900 border border-white/10 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-colors shadow-inner relative overflow-hidden">
                                <Icon className="w-6 h-6 md:w-7 md:h-7 text-cyan-400 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                                <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <h4 className="font-orbitron font-black uppercase text-xs md:text-sm tracking-[0.2em] text-white mb-2 transition-colors group-hover:text-cyan-300">{step.title}</h4>
                            <p className="text-slate-500 text-[10px] md:text-xs font-medium uppercase tracking-wider">{step.desc}</p>
                        </div>
                        {i < 3 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 0.5, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: (i * 0.15) + 0.3, duration: 0.4 }}
                                className="hidden md:block absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 text-cyan-500"
                            >
                                <Workflow className="w-6 h-6 animate-pulse" />
                            </motion.div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
