"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SystemHUD() {
    const [cycleCount, setCycleCount] = useState(4021);

    useEffect(() => {
        const interval = setInterval(() => {
            setCycleCount(prev => prev + Math.floor(Math.random() * 3));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="fixed bottom-6 left-6 z-50 glass-card border border-cyan-500/20 rounded-lg p-3 md:p-4 hidden md:flex flex-col gap-2 shadow-[0_0_30px_rgba(6,182,212,0.1)] backdrop-blur-md pointer-events-none"
        >
            <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute left-0 top-0 w-full h-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="font-orbitron font-bold text-[10px] tracking-widest text-cyan-400 uppercase">System Status: Active</span>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent my-1"></div>
            <div className="flex justify-between items-center gap-6">
                <span className="text-[9px] text-slate-500 font-medium uppercase tracking-wider">Opt. Cycles:</span>
                <span className="text-white font-mono text-[10px]">{cycleCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center gap-6">
                <span className="text-[9px] text-slate-500 font-medium uppercase tracking-wider">AI Modules:</span>
                <span className="text-white font-mono text-[10px]">Deployed</span>
            </div>
            <div className="flex justify-between items-center gap-6">
                <span className="text-[9px] text-slate-500 font-medium uppercase tracking-wider">Latency:</span>
                <span className="text-cyan-400 font-mono text-[10px]">12ms</span>
            </div>
        </motion.div>
    );
}
