"use client";

import React, { useState, useEffect } from 'react';
import { BarChart4, Cpu, RefreshCcw, Award, Activity } from 'lucide-react';

export default function GrowthEngineVisualizer() {
    const [activeStage, setActiveStage] = useState(0);

    const stages = [
        { title: "Study & Analyze", icon: BarChart4, description: "We ingest 20+ niche top-performers to find psychological patterns.", color: "cyan" },
        { title: "Variation Generation", icon: Cpu, description: "Systematic production of 10+ ad hooks and copy angles.", color: "blue" },
        { title: "Weekly Rotation", icon: RefreshCcw, description: "Kill losers, keep winners. Fresh challengers every week.", color: "purple" },
        { title: "Dominator Scale", icon: Award, description: "Duplicate winners into scaling sets for maximum ROI.", color: "pink" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStage((prev) => (prev + 1) % stages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [stages.length]);

    return (
        <div className="light-trail-wrapper rounded-[2rem] md:rounded-[2.5rem] p-[1px] md:p-[2px]">
            <div className="light-trail-border"></div>
            <div className="light-trail-content rounded-[1.9rem] md:rounded-[2.4rem] overflow-hidden relative group">
                <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>
                <div className="relative z-10 p-6 md:p-12">
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
                        {/* Steps List */}
                        <div className="flex-1 w-full space-y-6 md:space-y-8">
                            <div className="flex items-center gap-3">
                                <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-slate-500">Live System Architecture</span>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                {stages.map((stage, i) => {
                                    const Icon = stage.icon;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setActiveStage(i)}
                                            className={`w-full flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-xl md:rounded-2xl transition-all border text-left ${activeStage === i
                                                    ? 'bg-white/5 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)] scale-[1.01] md:scale-[1.02]'
                                                    : 'bg-transparent border-transparent opacity-40 hover:opacity-100'
                                                }`}
                                        >
                                            <div className={`p-2 md:p-3 rounded-lg md:rounded-xl shrink-0 ${activeStage === i ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                                                <Icon className="w-5 h-5 md:w-6 md:w-6" />
                                            </div>
                                            <div>
                                                <h4 className={`font-bold uppercase text-[10px] md:text-sm tracking-widest ${activeStage === i ? 'text-white' : 'text-slate-500'}`}>
                                                    {stage.title}
                                                </h4>
                                                {activeStage === i && <p className="text-slate-400 text-[10px] md:text-sm mt-1 leading-relaxed">{stage.description}</p>}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Radar / Core Visualization */}
                        <div className="flex-1 w-full relative max-w-[300px] md:max-w-none flex items-center justify-center">
                            <div className="aspect-square relative flex items-center justify-center w-full max-w-[400px]">
                                {/* Outer dashed spinning ring */}
                                <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/5 animate-[spin_20s_linear_infinite]"></div>
                                {/* Inner solid spinning ring */}
                                <div className="absolute inset-8 md:inset-12 rounded-full border border-cyan-500/20 animate-[spin_15s_linear_infinite_reverse]"></div>

                                {/* Center Core */}
                                <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 bg-slate-900 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.2)] md:shadow-[0_0_50px_rgba(6,182,212,0.2)] border border-white/10 overflow-hidden">
                                    <div className="absolute inset-0 animated-gradient opacity-20"></div>
                                    {stages.map((stage, i) => {
                                        const Icon = stage.icon;
                                        return (
                                            <div key={i} className={`absolute transition-all duration-700 flex flex-col items-center justify-center inset-0 ${activeStage === i ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}>
                                                <Icon className="w-10 h-10 md:w-16 md:h-16 text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                                                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-cyan-300">Phase 0{i + 1}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Orbiting Dots */}
                                {[0, 1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className={`absolute w-3 h-3 md:w-4 md:h-4 rounded-full border border-cyan-400 transition-all duration-1000 ${activeStage === i ? 'bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]' : 'bg-slate-900'}`}
                                        style={{
                                            transform: `rotate(${i * 90}deg) translateY(-80px)`,
                                            transformOrigin: '0 80px' // adjust orbit radius
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
