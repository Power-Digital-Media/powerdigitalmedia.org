"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cpu, Terminal as TerminalIcon } from "lucide-react";
import { useInView } from "framer-motion";

const INITIAL_BOOT_SEQUENCE = [
    { text: "Initializing Power Digital Media Engine v4.2...", delay: 200, type: "system" },
    { text: "Establishing secure WebSocket connection...", delay: 500, type: "system" },
    { text: "[OK] Edge network confirmed: 35 regional nodes active.", delay: 800, type: "success" },
    { text: "Deploying Next.js Server Components...", delay: 1200, type: "action" },
    { text: "[OK] Vercel edge cache linked. TTFB < 50ms.", delay: 1500, type: "success" },
    { text: "Awaiting incoming traffic...", delay: 2000, type: "idle" },
];

const PING_LOGS = [
    { text: "GET /api/graphql - 200 OK (8ms)", type: "log" },
    { text: "CACHE HIT: us-east-1 (IAD)", type: "success" },
    { text: "Fetching dynamic route metadata...", type: "log" },
    { text: "Image optimization complete (45KB -> 12KB)", type: "action" },
    { text: "GET /portfolio/redemption - 200 OK (12ms)", type: "log" },
    { text: "Firewall block: malicious payload dropped.", type: "error" },
    { text: "SSR hydration complete. Client interactive.", type: "success" },
    { text: "Streaming edge component...", type: "log" },
    { text: "DB Query cache HIT: 2ms", type: "success" },
];

export default function TerminalWindow() {
    const [lines, setLines] = useState<{ text: string, type: string }[]>([]);
    const [isBooted, setIsBooted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: true, margin: "-100px" });

    // Boot Sequence
    useEffect(() => {
        if (!inView) return;

        let totalDelay = 0;
        const timeouts: NodeJS.Timeout[] = [];

        INITIAL_BOOT_SEQUENCE.forEach((item) => {
            const timeout = setTimeout(() => {
                setLines(prev => [...prev, item]);
            }, item.delay);
            timeouts.push(timeout);
            totalDelay = Math.max(totalDelay, item.delay);
        });

        const finalTimeout = setTimeout(() => {
            setIsBooted(true);
        }, totalDelay + 1000);
        timeouts.push(finalTimeout);

        return () => timeouts.forEach(clearTimeout);
    }, [inView]);

    // Continuous Pings
    useEffect(() => {
        if (!isBooted) return;

        const interval = setInterval(() => {
            const randomLog = PING_LOGS[Math.floor(Math.random() * PING_LOGS.length)];

            setLines(prev => {
                const newLines = [...prev, randomLog];
                // Keep only the last 15 lines so we don't blow up the DOM
                if (newLines.length > 15) return newLines.slice(newLines.length - 15);
                return newLines;
            });
        }, 1500 + Math.random() * 2000); // Random interval between 1.5s and 3.5s

        return () => clearInterval(interval);
    }, [isBooted]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <div ref={containerRef} className="relative w-full aspect-square max-w-md mx-auto group">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-[2rem] rotate-3 scale-105 blur-2xl opacity-50 group-hover:blur-3xl group-hover:opacity-70 transition-all duration-700" />

            {/* Terminal Window Frame */}
            <div className="relative w-full h-full bg-[#0a0a0a] rounded-[2rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden text-left font-mono">

                {/* Mac-style Window Header */}
                <div className="h-10 w-full bg-white/5 border-b border-white/5 flex items-center px-4 shrink-0">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/30 text-[10px] tracking-widest uppercase font-bold">
                        <TerminalIcon className="w-3 h-3" />
                        sys_log // Next.js
                    </div>
                </div>

                {/* Body Content */}
                <div ref={scrollContainerRef} className="flex-1 p-5 overflow-y-auto hide-scrollbar text-[11px] sm:text-xs leading-relaxed space-y-1 relative scroll-smooth">

                    {lines.map((line, i) => {
                        let colorClass = "text-white/70";
                        if (line.type === "system") colorClass = "text-blue-400";
                        if (line.type === "success") colorClass = "text-green-400";
                        if (line.type === "error") colorClass = "text-red-400";
                        if (line.type === "action") colorClass = "text-cyan-400/80";
                        if (line.type === "idle") colorClass = "text-yellow-400 bg-yellow-400/10 px-1 rounded animate-pulse";

                        return (
                            <div key={i} className="flex gap-3">
                                <span className="text-white/30 select-none shrink-0 w-8 blur-[0.5px]">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className={colorClass + " whitespace-pre-wrap break-all"}>
                                    <span className="text-white/20 select-none mr-2">{'>'}</span>
                                    {line.text}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Overlaid Lighthouse Score Badge */}
                <div className="absolute bottom-6 right-6 p-4 bg-background/80 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-4 shadow-[0_0_20px_rgba(0,0,0,0.8)] z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-400/30 flex items-center justify-center shadow-[inset_0_0_15px_rgba(34,211,238,0.2)]">
                        <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
                    </div>
                    <div>
                        <span className="block text-2xl font-black text-white leading-none tracking-tighter">100/100</span>
                        <span className="block text-[8px] uppercase tracking-widest text-cyan-400 font-bold mt-1">Lighthouse</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
