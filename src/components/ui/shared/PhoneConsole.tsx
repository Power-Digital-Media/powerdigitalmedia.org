"use client";

import React, { useState, useEffect, useRef } from "react";
import { Phone, Terminal as TerminalIcon, Shield, Zap, Sparkles, Check } from "lucide-react";
import { useInView } from "framer-motion";

interface LogLine {
    text: string;
    type: "system" | "success" | "incoming" | "action" | "ai" | "transcript" | "crm" | "transpond" | "idle";
    delay: number;
}

const CONSOLE_LOGS: LogLine[] = [
    { text: "Initializing Ultatel Cloud Node...", type: "system", delay: 200 },
    { text: "[OK] SIP Trunk active on Jackson gateway.", type: "success", delay: 600 },
    { text: "Incoming Call: (601) 555-0192 (Jackson, MS)", type: "incoming", delay: 1200 },
    { text: "Querying Capsule CRM Database...", type: "system", delay: 1800 },
    { text: "[MATCH] Jeff Davis (Davis Logistics)", type: "success", delay: 2200 },
    { text: "Triggering Capsule CRM Screen Pop... [OK]", type: "action", delay: 2800 },
    { text: "Voice AI Agent answering: 'Hello, Davis Logistics...'", type: "ai", delay: 3500 },
    { text: "Transcript: 'Need to book an on-site VoIP setup...'", type: "transcript", delay: 4200 },
    { text: "Capsule CRM: Note logged & opportunity updated.", type: "crm", delay: 5000 },
    { text: "Transpond: Tagged 'Lead-VoIP' -> Triggered follow-up.", type: "transpond", delay: 5800 },
    { text: "Call completed. Awaiting next connection...", type: "idle", delay: 7000 },
];

export default function PhoneConsole() {
    const [lines, setLines] = useState<LogLine[]>([]);
    const [cycleCount, setCycleCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!inView) return;

        let timeouts: NodeJS.Timeout[] = [];
        setLines([]); // Reset lines on cycle

        CONSOLE_LOGS.forEach((item) => {
            const t = setTimeout(() => {
                setLines(prev => [...prev, item]);
            }, item.delay);
            timeouts.push(t);
        });

        // Loop the simulation every 15 seconds
        const loopTimeout = setTimeout(() => {
            setCycleCount(c => c + 1);
        }, 15000);
        timeouts.push(loopTimeout);

        return () => timeouts.forEach(clearTimeout);
    }, [inView, cycleCount]);

    // Auto-scroll to bottom of log terminal
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [lines]);

    const getLineStyle = (type: string) => {
        switch (type) {
            case "success":
                return "text-emerald-400 font-medium";
            case "incoming":
                return "text-amber-400 font-bold animate-pulse";
            case "action":
                return "text-cyan-400 font-semibold";
            case "ai":
                return "text-fuchsia-400 font-medium";
            case "transcript":
                return "text-purple-300 italic";
            case "crm":
                return "text-blue-400 font-medium";
            case "transpond":
                return "text-indigo-400 font-medium";
            case "idle":
                return "text-white/40";
            case "system":
            default:
                return "text-white/60";
        }
    };

    return (
        <div ref={containerRef} className="relative w-full aspect-square max-w-md mx-auto group">
            {/* Ambient background glow in phone warm amber/yellow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-[2rem] -rotate-3 scale-105 blur-2xl opacity-50 group-hover:blur-3xl group-hover:opacity-70 transition-all duration-700" />

            {/* Terminal Frame */}
            <div className="relative w-full h-full bg-[#0a0a0a] rounded-[2rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden text-left font-mono">
                
                {/* Header bar */}
                <div className="h-10 w-full bg-white/5 border-b border-white/5 flex items-center px-4 shrink-0 relative">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/30 text-[10px] tracking-widest uppercase font-bold">
                        <Phone className="w-3 h-3 text-amber-400 animate-pulse" />
                        ultatel_console // cloud voip
                    </div>
                    {/* Pulsing connected node indicator */}
                    <div className="absolute right-4 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500 relative" />
                        <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest hidden sm:inline-block">Live</span>
                    </div>
                </div>

                {/* Lines scroll container */}
                <div 
                    ref={scrollContainerRef}
                    className="flex-1 p-6 overflow-y-auto space-y-4 text-xs md:text-[13px] leading-relaxed scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                >
                    {lines.map((line, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                            <span className="text-white/20 select-none text-[10px] pt-0.5">{(idx + 1).toString().padStart(2, "0")}</span>
                            <span className="text-amber-500/40 select-none">&gt;</span>
                            <span className={getLineStyle(line.type)}>{line.text}</span>
                        </div>
                    ))}

                    {/* Active cursor block */}
                    {lines.length < CONSOLE_LOGS.length && (
                        <div className="flex items-center gap-2 pl-7">
                            <span className="w-2 h-4 bg-amber-400 animate-[pulse_1s_infinite]" />
                        </div>
                    )}
                </div>

                {/* Status Bar */}
                <div className="h-10 w-full bg-white/5 border-t border-white/5 px-6 flex items-center justify-between text-[9px] uppercase tracking-widest text-white/40 shrink-0 font-bold">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                        <span>Voice AI Engine v2.0</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-blue-400" />
                        <span>HIPAA Compliant</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
