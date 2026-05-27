"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Database, Terminal, Shield, Zap, RefreshCw, BarChart } from "lucide-react";

interface SchematicNode {
    id: string;
    label: string;
    subLabel: string;
    icon: React.ElementType | any;
    color: string;
    glow: string;
    metric: string;
    description: string;
    details: string[];
}

const schematicNodes: SchematicNode[] = [
    {
        id: "feed",
        label: "The Feed",
        subLabel: "Traffic & Intent",
        icon: Search,
        color: "text-purple-400",
        glow: "rgba(168, 85, 247, 0.4)",
        metric: "CPA -54.2% | CR +3,095%",
        description: "High-velocity SEO and AI Answer Engine optimization capture user intent before competitors register. Engineered for absolute organic search dominance.",
        details: ["AI Search Engine Ready (GEO)", "Page-One Search Placement", "Dynamic Organic Conversion"]
    },
    {
        id: "interface",
        label: "The Interface",
        subLabel: "Web Architecture",
        icon: Globe,
        color: "text-blue-400",
        glow: "rgba(59, 130, 246, 0.4)",
        metric: "LCP 0.4s | Speed 100/100",
        description: "Bespoke Next.js Server Components distributed globally at the Edge CDN. Eliminates latency, retains traffic, and projects prestige.",
        details: ["Sub-200ms Core Web Vitals", "Edge CDN Pre-rendering", "Bespoke Glassmorphic UI"]
    },
    {
        id: "engine",
        label: "The Engine",
        subLabel: "Bespoke Apps",
        icon: Database,
        color: "text-cyan-400",
        glow: "rgba(6, 182, 212, 0.4)",
        metric: "Latency <15ms | Secured",
        description: "Bespoke custom portals and serverless dashboards housing your internal workflows. Engineered with enterprise security boundaries.",
        details: ["Row-Level Data Policies (RLS)", "Serverless PostgreSQL Nodes", "HIPAA & PCI Security Ready"]
    },
    {
        id: "hub",
        label: "The Hub",
        subLabel: "CRM Operations",
        icon: Terminal,
        color: "text-emerald-400",
        glow: "rgba(52, 211, 153, 0.4)",
        metric: "Capsule Sync | Active",
        description: "Serverless API bridges sync client records and conversions straight into Capsule CRM & Transpond, triggering automated pipelines.",
        details: ["Capsule DB Pipeline Bridges", "Transpond Automated Tagging", "Zero-Licensing Operations"]
    }
];

export default function SystemSchematic() {
    const [activeNode, setActiveNode] = useState<string>("feed");

    const currentNode = schematicNodes.find(n => n.id === activeNode) || schematicNodes[0];

    return (
        <div className="w-full max-w-5xl mx-auto mt-16 px-4">
            
            {/* Desktop Pipeline Diagram (Horizontal layout with SVG connections) */}
            <div className="hidden md:block relative h-48 mb-12">
                {/* Custom SVG Connecting Lines with glowing flows */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="glowGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="33%" stopColor="#3b82f6" />
                            <stop offset="66%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                    </defs>
                    
                    {/* Background Static Connection Line */}
                    <path 
                        d="M 100 96 H 900" 
                        fill="none" 
                        stroke="rgba(255,255,255,0.05)" 
                        strokeWidth="2" 
                    />
                    
                    {/* Glowing Pulse Line running horizontally */}
                    <motion.path 
                        d="M 100 96 H 900" 
                        fill="none" 
                        stroke="url(#glowGrad)" 
                        strokeWidth="2" 
                        strokeDasharray="20 180"
                        animate={{ strokeDashoffset: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    />
                </svg>

                {/* Nodes container */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-12 z-10">
                    {schematicNodes.map((node, index) => {
                        const Icon = node.icon;
                        const isActive = activeNode === node.id;
                        
                        return (
                            <div 
                                key={node.id} 
                                className="flex flex-col items-center cursor-pointer group"
                                onClick={() => setActiveNode(node.id)}
                            >
                                {/* Pinned Orbit Circle */}
                                <div className="relative flex items-center justify-center w-20 h-20">
                                    {/* Glowing active outer ring */}
                                    {isActive && (
                                        <motion.div 
                                            layoutId="activeGlowRing"
                                            className="absolute inset-0 rounded-full border-2 border-white/20"
                                            style={{ boxShadow: `0 0 25px 2px ${node.glow}` }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}

                                    {/* Static hover ring */}
                                    <div className="absolute inset-2 rounded-full border border-white/5 bg-slate-950/90 group-hover:border-white/10 transition-colors" />

                                    {/* Icon */}
                                    <Icon className={`relative z-10 w-7 h-7 transition-all duration-300 ${isActive ? node.color : "text-muted-foreground group-hover:text-white"}`} />
                                </div>

                                {/* Text descriptions below nodes */}
                                <span className={`text-xs font-black uppercase tracking-widest mt-4 transition-colors ${isActive ? "text-white" : "text-muted-foreground group-hover:text-white"}`}>
                                    {node.label}
                                </span>
                                <span className="text-[10px] font-medium text-muted-foreground/60 tracking-wider uppercase mt-1">
                                    {node.subLabel}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Pipeline Diagram (Vertical Grid structure) */}
            <div className="md:hidden flex flex-col gap-4 mb-8">
                <div className="grid grid-cols-4 gap-2">
                    {schematicNodes.map((node) => {
                        const Icon = node.icon;
                        const isActive = activeNode === node.id;
                        
                        return (
                            <button
                                key={node.id}
                                onClick={() => setActiveNode(node.id)}
                                className={`flex flex-col items-center justify-center p-3 rounded-2xl glass-card transition-all ${isActive ? "border-white/20 bg-white/[0.03]" : "border-white/5 bg-transparent"}`}
                                style={isActive ? { boxShadow: `inset 0 0 12px ${node.glow}` } : {}}
                            >
                                <Icon className={`w-6 h-6 mb-1 ${isActive ? node.color : "text-muted-foreground"}`} />
                                <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? "text-white" : "text-muted-foreground"}`}>
                                    {node.id}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Dynamic Telemetry HUD / Details Panel */}
            <div className="w-full relative overflow-hidden rounded-[2rem] border border-white/10 p-8 glass-card bg-slate-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                
                {/* Accent glow mapped to active node */}
                <div 
                    className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-15 pointer-events-none transition-all duration-700" 
                    style={{ backgroundColor: currentNode.glow.replace('0.4', '1') }}
                />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentNode.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="grid md:grid-cols-3 gap-8 items-start relative z-10"
                    >
                        {/* Column 1: Core HUD Telemetry */}
                        <div className="space-y-4 md:border-r border-white/5 md:pr-8">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-white/[0.02] text-[10px] font-mono tracking-wider uppercase ${currentNode.color} border-white/5`}>
                                <Zap className="w-3.5 h-3.5" />
                                NODE: {currentNode.id.toUpperCase()}
                            </span>
                            
                            <div>
                                <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                                    {currentNode.label}
                                </h3>
                                <p className="text-xs text-muted-foreground/60 uppercase tracking-widest font-bold mt-1">
                                    {currentNode.subLabel}
                                </p>
                            </div>

                            <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center gap-3">
                                <BarChart className={`w-5 h-5 shrink-0 ${currentNode.color}`} />
                                <div className="font-mono text-[10px] uppercase text-white/80 tracking-wide leading-none">
                                    <span className="text-muted-foreground/50 block mb-1 text-[8px] tracking-widest font-bold">Metrics / Status</span>
                                    {currentNode.metric}
                                </div>
                            </div>
                        </div>

                        {/* Column 2: System Description */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Protocol Overview</h4>
                                <p className="text-sm text-slate-300 leading-relaxed font-light">
                                    {currentNode.description}
                                </p>
                            </div>

                            {/* Bullet Features */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest">Engineering Specs</h4>
                                <div className="grid sm:grid-cols-3 gap-3">
                                    {currentNode.details.map((spec, i) => (
                                        <div key={i} className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold text-white/60 p-2.5 rounded-xl bg-white/[0.01] border border-white/5">
                                            <Shield className={`w-3.5 h-3.5 shrink-0 ${currentNode.color}`} />
                                            <span>{spec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

            </div>

        </div>
    );
}
