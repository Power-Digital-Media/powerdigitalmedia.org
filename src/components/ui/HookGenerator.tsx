"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Send, Sparkles, Lock, ArrowRight, RefreshCcw, AlertTriangle, Terminal, Play, Plus, MoreHorizontal } from "lucide-react";

const loadingLogs = [
    "INITIALIZING GROWTH PROTOCOL v2.4.1",
    "CONNECTING TO NEURAL NETWORK...",
    "ESTABLISHED SECURE HANDSHAKE",
    "ANALYZING SEARCH INTENT & ALGORITHMIC TRENDS...",
    "EXTRACTING VIRAL ARCHITECTURES...",
    "ISOLATING HIGH-RETENTION HOOK VECTORS...",
    "SYNTHESIZING EPISODE METADATA...",
    "COMPILING FINAL HYPER-GROWTH PAYLOAD...",
    "DECRYPTION COMPLETE."
];

export default function HookGenerator() {
    const [mounted, setMounted] = useState(false);
    const [topic, setTopic] = useState("");
    const [channelInfo, setChannelInfo] = useState("");
    const [email, setEmail] = useState("");
    const [hooks, setHooks] = useState<string | null>(null);
    const [podcastTitle, setPodcastTitle] = useState<string | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [step, setStep] = useState<"input" | "lead" | "generating" | "result">("input");
    const [error, setError] = useState<string | null>(null);
    const [currentLogIndex, setCurrentLogIndex] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Terminal typing effect logic
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (step === "generating") {
            if (currentLogIndex < loadingLogs.length - 1) {
                // Randomize typing speed for realism (100ms - 400ms)
                timeout = setTimeout(() => {
                    setCurrentLogIndex(prev => prev + 1);
                }, Math.random() * 300 + 100);
            }
        } else {
            setCurrentLogIndex(0);
        }
        return () => clearTimeout(timeout);
    }, [step, currentLogIndex]);

    const handleGenerateRequest = (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic) return;
        setError(null);
        setStep("lead");
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStep("generating");
        setError(null);

        try {
            // Track start time to enforce a minimum loading duration for visual flair
            const startTime = Date.now();

            // 1. Submit lead to Formspree
            const formspreePromise = fetch("https://formspree.io/f/mqaejajb", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, topic, channelInfo, type: "AI_HOOK_LEAD" }),
            });

            // 2. Execute AI Protocol
            const aiPromise = fetch("/api/ai/hooks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic, channelInfo }),
            });

            const [_, response] = await Promise.all([formspreePromise, aiPromise]);

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || "AI Protocol Failure");
            }

            const data = await response.json();

            // Enforce minimum 3.5 seconds loading for dramatic effect
            const elapsed = Date.now() - startTime;
            if (elapsed < 3500) {
                await new Promise(r => setTimeout(r, 3500 - elapsed));
            }

            setHooks(data.hooks);
            setPodcastTitle(data.podcastTitle || "The Elite Creator Strategy");

            if (data.thumbnailUrl) {
                setThumbnailUrl(data.thumbnailUrl);
            } else {
                setThumbnailUrl(null); // Explicitly null if generation failed due to quota
            }

            setStep("result");
        } catch (err: any) {
            console.error("Growth Intelligence Protocol Breach:", err);
            setError(err.message || "Encryption error in AI logic. Please try again.");
            setStep("input"); // Kick back to input if it fails
        }
    };

    const resetProtocol = () => {
        setStep("input");
        setTopic("");
        setEmail("");
        setHooks(null);
        setPodcastTitle(null);
        setError(null);
    };

    // Prevent hydration flicker
    if (!mounted) return null;

    return (
        <section className="py-24 relative overflow-hidden bg-slate-950/20">
            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-3xl mx-auto glass-card rounded-[3rem] p-8 md:p-16 border-accent/20 bg-slate-900/40 backdrop-blur-3xl min-h-[500px] flex flex-col justify-between">
                    <div>
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
                                {step === "generating" ? <Terminal className="w-3 h-3 animate-pulse" /> : <Sparkles className="w-3 h-3" />}
                                {step === "generating" ? "PROCESSING PROTOCOL" : "Growth Intelligence"}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
                                {step === "generating" ? (
                                    <>System <span className="text-accent animate-pulse">Active.</span></>
                                ) : (
                                    <>Growth <span className="text-white/40">Intelligence.</span></>
                                )}
                            </h2>
                            {step !== "generating" && (
                                <p className="text-foreground/60 font-light text-sm md:text-base">
                                    Enter your podcast topic to engineer <span className="text-white font-medium">5 Viral Hooks</span>, an <span className="text-white font-medium">Episode Blueprint</span>, and <span className="text-white font-medium">Search Intelligence</span>.
                                </p>
                            )}
                        </div>

                        {error && (
                            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-3">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <AnimatePresence mode="wait">
                            {step === "input" && (
                                <motion.form
                                    key="input"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onSubmit={handleGenerateRequest}
                                    className="space-y-6"
                                >
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            placeholder="e.g. The Future of AI in Real Estate"
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-accent/50 transition-all text-lg font-light group-hover:bg-black/60 placeholder:text-white/10"
                                            required
                                        />
                                        <Wand2 className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            value={channelInfo}
                                            onChange={(e) => setChannelInfo(e.target.value)}
                                            placeholder="Your YouTube Channel URL (Optional)"
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-accent/50 transition-all text-lg font-light group-hover:bg-black/60 placeholder:text-white/10"
                                        />
                                        <Sparkles className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-accent text-slate-950 font-black uppercase tracking-widest rounded-2xl border-glow flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-[0.98] transition-all"
                                    >
                                        Get Your Custom Growth Blueprint <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.form>
                            )}

                            {step === "lead" && (
                                <motion.form
                                    key="lead"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onSubmit={handleLeadSubmit}
                                    className="space-y-6"
                                >
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4 mb-4">
                                        <Lock className="w-5 h-5 text-accent shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-sm uppercase tracking-tight mb-1">Access Protocol Required</h4>
                                            <p className="text-[10px] md:text-xs text-foreground/40 leading-relaxed uppercase tracking-wider">
                                                Provide your professional sync address to reveal your engineered growth assets.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-accent/50 transition-all text-lg font-light"
                                            required
                                        />
                                        <Send className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-50" />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-white text-slate-950 font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl hover:bg-neutral-200"
                                    >
                                        Analyze & Reveal
                                    </button>
                                </motion.form>
                            )}

                            {step === "generating" && (
                                <motion.div
                                    key="generating"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-inner font-mono relative overflow-hidden"
                                >
                                    {/* Scanline effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-4 animate-scan opacity-50 pointer-events-none" />

                                    <div className="space-y-3">
                                        {loadingLogs.slice(0, currentLogIndex + 1).map((log, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={`text-xs md:text-sm ${index === currentLogIndex ? 'text-cyan-400' : 'text-white/40'}`}
                                            >
                                                <span className="opacity-50 mr-2">{'>'}</span> {log}
                                            </motion.div>
                                        ))}
                                        {currentLogIndex < loadingLogs.length - 1 && (
                                            <motion.div
                                                animate={{ opacity: [1, 0] }}
                                                transition={{ duration: 0.8, repeat: Infinity }}
                                                className="w-2 h-4 bg-cyan-400 inline-block align-middle ml-1"
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {step === "result" && hooks && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    {podcastTitle && (
                                        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#1E1E1E] to-[#121212] p-6 shadow-2xl p-[1px]">
                                            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest text-[#B3B3B3] border border-white/10">
                                                YouTube Mockup
                                            </div>
                                            <div className="bg-[#0f0f0f] rounded-[1.4rem] p-4 w-full h-full flex flex-col gap-4">

                                                {/* Mock Video Thumbnail */}
                                                <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-neutral-800 to-black border border-white/5 shadow-lg relative overflow-hidden group">
                                                    {thumbnailUrl ? (
                                                        <img
                                                            src={thumbnailUrl}
                                                            alt="Generated Thumbnail"
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                            <Sparkles className="w-12 h-12 text-white/20 mb-2" />
                                                            <span className="text-xs text-white/40 font-mono uppercase tracking-widest">Generating Visual...</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-medium text-white tracking-wide">
                                                        12:45
                                                    </div>
                                                </div>

                                                {/* Text Info */}
                                                <div className="flex gap-3 px-1">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-blue-900 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                                                        <span className="text-white font-bold text-sm uppercase">
                                                            {(channelInfo || "PD").substring(0, 2)}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h3 className="text-white font-semibold text-base leading-tight mb-1 line-clamp-2">
                                                            {podcastTitle}
                                                        </h3>
                                                        <div className="text-[#AAAAAA] text-sm flex items-center gap-1 group cursor-pointer hover:text-white transition-colors">
                                                            {channelInfo || "Power Digital Media"}
                                                        </div>
                                                        <div className="text-[#AAAAAA] text-sm flex items-center gap-1">
                                                            1.2M views • 2 hours ago
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                    <div className="p-8 rounded-2xl bg-black/40 border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)_inset]">
                                        <div className="prose prose-invert max-w-none text-foreground/80 font-light leading-relaxed whitespace-pre-wrap text-sm md:text-base selection:bg-accent selection:text-slate-900">
                                            {hooks}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {step === "result" && (
                        <button
                            onClick={resetProtocol}
                            className="mt-8 w-full py-4 glass-card rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center justify-center gap-2 hover:border-cyan-500/30"
                        >
                            <RefreshCcw className="w-3 h-3" /> Execute New Search Protocol
                        </button>
                    )}
                </div>
            </div>

            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-accent/5 blur-[150px] -z-10 pointer-events-none" />
        </section>
    );
}
