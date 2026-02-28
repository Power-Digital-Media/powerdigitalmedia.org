"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Search, Activity, Cpu, Code, Zap, FileJson, AlertTriangle, ShieldCheck, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import BookingModal from "@/components/ui/BookingModal";

export default function LiveScanner() {
    const [url, setUrl] = useState("");
    const [scanState, setScanState] = useState<"idle" | "scanning" | "results">("idle");
    const [logs, setLogs] = useState<{ text: string, type: "info" | "success" | "warning" | "error" | "system" }[]>([]);
    const [results, setResults] = useState<any>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const addLog = (text: string, type: "info" | "success" | "warning" | "error" | "system" = "info") => {
        setLogs(prev => [...prev.slice(-4), { text, type }]);
    };

    const handleScan = async (e?: React.FormEvent) => {
        if (e && e.preventDefault) e.preventDefault();

        let targetUrl = url.trim();
        if (!targetUrl) return;

        // Auto-format standard URLs if user forgets https://
        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
            targetUrl = `https://${targetUrl}`;
            setUrl(targetUrl); // Update the input field visually
        }

        setScanState("scanning");
        setLogs([]);
        setResults(null);

        // Simulated highly technical boot sequence (Accelerated)
        const sequence = [
            { text: "INITIALIZING DIAGNOSTIC PROTOCOLS...", type: "system", delay: 100 },
            { text: `TARGET: ${url}`, type: "info", delay: 400 },
            { text: "ESTABLISHING SECURE HANDSHAKE...", type: "info", delay: 700 },
            { text: "HANDSHAKE ACCEPTED.", type: "success", delay: 1000 },
            { text: "EXTRACTING STRUCTURED DATA (JSON-LD)...", type: "system", delay: 1400 },
            { text: "CHECKING TARGET FOR llms.txt (AI READINESS)...", type: "system", delay: 1800 },
            { text: "COMPILING SEO HEURISTICS...", type: "info", delay: 2200 },
        ];

        sequence.forEach(({ text, type, delay }) => {
            setTimeout(() => addLog(text, type as any), delay);
        });

        try {
            const res = await fetch("/api/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: targetUrl })
            });

            const data = await res.json();

            // Wait for accelerated animation to finish
            setTimeout(() => {
                if (data.error) {
                    addLog(`CRITICAL FAILURE: ${data.error}`, "error");
                    setScanState("idle");
                    return;
                }

                setResults(data);
                addLog("TELEMETRY RECEIVED. COMPILING REPORT...", "success");

                setTimeout(() => {
                    setScanState("results");
                }, 800);
            }, 2500);

        } catch (error) {
            setTimeout(() => {
                addLog("CONNECTION SEVERED. TARGET UNREACHABLE.", "error");
                setScanState("idle");
            }, 2500);
        }
    };

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative z-10 px-4 mx-auto">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 flex items-center justify-center gap-2">
                            <Activity className="w-4 h-4" /> Live Diagnostics
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase">
                            Is Your Architecture <span className="text-glow-red text-red-500">Bleeding Revenue?</span>
                        </h2>
                        <p className="text-xl text-foreground/60 font-light">
                            Enter your URL to instantly scan your Core Web Vitals and AI Agent Readiness (llms.txt).
                        </p>
                    </div>

                    {/* Terminal UI */}
                    <div className="bg-[#0a0a0a] rounded-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                        {/* Fake Mac Window Controls */}
                        <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="flex-1 text-center font-mono text-[10px] text-white/30 uppercase tracking-widest">
                                root@power-digital:~//scanner
                            </div>
                        </div>

                        <div className="font-mono text-sm relative transition-all duration-500">

                            <AnimatePresence mode="wait">
                                {scanState === "idle" && (
                                    <motion.div
                                        key="idle"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="p-6 md:p-8 flex flex-col justify-center min-h-[400px]"
                                    >
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="relative flex-1">
                                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                                    <Search className="w-5 h-5 text-white/30" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="powerdigitalmedia.org"
                                                    value={url}
                                                    onChange={(e) => setUrl(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handleScan();
                                                    }}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400 focus:bg-cyan-400/5 transition-all outline-none"
                                                />
                                            </div>
                                            <button
                                                onClick={() => handleScan()}
                                                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                                            >
                                                Initialize Scan <Terminal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {scanState === "scanning" && (
                                    <motion.div
                                        key="scanning"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="p-6 md:p-8 overflow-hidden min-h-[400px] flex flex-col justify-end"
                                    >
                                        <div className="space-y-2 mb-6">
                                            {logs.map((log, i) => (
                                                <div key={i} className={`flex gap-3 ${log.type === 'error' ? 'text-red-400' :
                                                    log.type === 'success' ? 'text-green-400' :
                                                        log.type === 'warning' ? 'text-yellow-400' :
                                                            log.type === 'system' ? 'text-cyan-400' :
                                                                'text-white/60'
                                                    }`}>
                                                    <span className="opacity-50 select-none">{'>'}</span>
                                                    <span>{log.text}</span>
                                                </div>
                                            ))}
                                            <div className="flex gap-3 text-cyan-400 animate-pulse">
                                                <span className="opacity-50 select-none">{'>'}</span>
                                                <span className="w-2 h-4 bg-cyan-400 inline-block" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {scanState === "results" && results && (
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-6 md:p-8 flex flex-col justify-between space-y-6 min-h-[400px]"
                                    >
                                        <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-4 truncate">
                                            Analysis Target: <span className="text-cyan-400">{results.url}</span>
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                            {/* Schema Card */}
                                            <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                                                <div className="flex items-center justify-between mb-3 text-white/50 text-xs tracking-widest uppercase">
                                                    <div className="flex items-center gap-2">
                                                        <FileJson className="w-4 h-4" /> Schema Data
                                                    </div>
                                                    {results.schemaScore >= 80 ? (
                                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4 text-red-500" />
                                                    )}
                                                </div>
                                                <div className={`text-4xl font-black ${results.schemaScore >= 80 ? 'text-green-400' :
                                                    results.schemaScore >= 50 ? 'text-yellow-400' :
                                                        'text-red-500'
                                                    }`}>
                                                    {results.schemaScore}<span className="text-sm opacity-50">/100</span>
                                                </div>
                                                {results.schemaTypesFound && results.schemaTypesFound.length > 0 && (
                                                    <div className="text-[10px] text-cyan-400/70 mt-2 uppercase tracking-wider truncate">
                                                        Detected: {results.schemaTypesFound.join(', ')}
                                                    </div>
                                                )}
                                                {(!results.schemaTypesFound || results.schemaTypesFound.length === 0) && (
                                                    <div className="text-[10px] text-red-400/70 mt-2 uppercase tracking-wider truncate">
                                                        Critical Fault
                                                    </div>
                                                )}
                                            </div>

                                            {/* AI Readiness Card */}
                                            <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                                                <div className="flex items-center justify-between mb-3 text-white/50 text-xs tracking-widest uppercase">
                                                    <div className="flex items-center gap-2">
                                                        <Cpu className="w-4 h-4" /> LLMs.txt
                                                    </div>
                                                    {results.hasLlmsTxt ? (
                                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4 text-red-500" />
                                                    )}
                                                </div>
                                                <div className={`text-4xl font-black ${results.hasLlmsTxt ? 'text-green-400' : 'text-red-500'
                                                    }`}>
                                                    {results.hasLlmsTxt ? '100' : '0'}<span className="text-sm opacity-50">/100</span>
                                                </div>
                                                {!results.hasLlmsTxt && (
                                                    <div className="text-[10px] text-red-400/70 mt-2 uppercase tracking-wider">
                                                        Invisible to AI Agents
                                                    </div>
                                                )}
                                                {results.hasLlmsTxt && (
                                                    <div className="text-[10px] text-green-400/70 mt-2 uppercase tracking-wider">
                                                        Architecture Verified
                                                    </div>
                                                )}
                                            </div>

                                            {/* Tech SEO Card */}
                                            <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                                                <div className="flex items-center justify-between mb-3 text-white/50 text-xs tracking-widest uppercase">
                                                    <div className="flex items-center gap-2">
                                                        <Search className="w-4 h-4" /> Tech SEO
                                                    </div>
                                                    {results.seoScore >= 80 ? (
                                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4 text-red-500" />
                                                    )}
                                                </div>
                                                <div className={`text-4xl font-black ${results.seoScore >= 80 ? 'text-green-400' :
                                                    results.seoScore >= 50 ? 'text-yellow-400' :
                                                        'text-red-500'
                                                    }`}>
                                                    {results.seoScore || "0"}<span className="text-sm opacity-50">/100</span>
                                                </div>
                                                {(results.seoScore < 80) && (
                                                    <div className="text-[10px] text-yellow-400/70 mt-2 uppercase tracking-wider">
                                                        Optimization Required
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Seamless Email Capture (Replaces URL Input Form) */}
                                        <div className="mt-auto border-t border-white/10 pt-6">
                                            <p className="text-xs text-white/60 mb-3 uppercase tracking-widest text-center">
                                                <AlertTriangle className="w-3 h-3 inline-block -mt-1 mr-1 text-yellow-400" />
                                                Action Required: Full Diagnostic Report Available
                                            </p>
                                            <div className="flex flex-col md:flex-row gap-4">
                                                <div className="relative flex-1">
                                                    <input
                                                        type="email"
                                                        placeholder="ENTER EMAIL FOR FULL REPORT"
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400 focus:bg-cyan-400/5 transition-all outline-none"
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => setIsBookingOpen(true)}
                                                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                                                >
                                                    Get Report <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => setScanState("idle")}
                                                className="mx-auto mt-4 text-white/30 hover:text-white transition-colors text-xs tracking-widest uppercase flex items-center gap-1 justify-center w-full"
                                            >
                                                Run New Scan
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
