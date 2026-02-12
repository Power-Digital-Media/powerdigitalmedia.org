"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Send, Sparkles, Lock, ArrowRight, RefreshCcw, AlertTriangle } from "lucide-react";

export default function HookGenerator() {
    const [mounted, setMounted] = useState(false);
    const [topic, setTopic] = useState("");
    const [email, setEmail] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [hooks, setHooks] = useState<string | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [step, setStep] = useState<"input" | "lead" | "result">("input");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleGenerateRequest = (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic) return;
        setError(null);
        setStep("lead");
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsGenerating(true);
        setError(null);

        try {
            // 1. Submit lead to Formspree
            await fetch("https://formspree.io/f/mqaejajb", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, topic, type: "AI_HOOK_LEAD" }),
            });

            // 2. Execute AI Protocol
            const response = await fetch("/api/ai/hooks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || "AI Protocol Failure");
            }

            const data = await response.json();
            setHooks(data.hooks);

            if (data.thumbnailPrompt) {
                // Zero-cost Image Protocol via Pollinations.ai
                const encodedPrompt = encodeURIComponent(data.thumbnailPrompt);
                const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1280&height=720&nologo=true&enhance=true`;
                setThumbnailUrl(imageUrl);
            }

            setStep("result");
        } catch (err: any) {
            console.error("Growth Intelligence Protocol Breach:", err);
            setError(err.message || "Encryption error in AI logic. Please try again.");
            setStep("input"); // Kick back to input if it fails
        } finally {
            setIsGenerating(false);
        }
    };

    const resetProtocol = () => {
        setStep("input");
        setTopic("");
        setEmail("");
        setHooks(null);
        setThumbnailUrl(null);
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
                                <Sparkles className="w-3 h-3" /> Growth Intelligence
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
                                Growth <span className="text-white/40">Intelligence.</span>
                            </h2>
                            <p className="text-foreground/60 font-light text-sm md:text-base">
                                Enter your podcast topic to engineer <span className="text-white font-medium">5 Viral Hooks</span>, a <span className="text-white font-medium">Custom Thumbnail</span>, and <span className="text-white font-medium">Search Intelligence</span>.
                            </p>
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
                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-accent text-slate-950 font-black uppercase tracking-widest rounded-2xl border-glow flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-[0.98] transition-all"
                                    >
                                        Engineer Strategy <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                                        disabled={isGenerating}
                                        className="w-full py-5 bg-white text-slate-950 font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-xl"
                                    >
                                        {isGenerating ? (
                                            <span className="flex items-center gap-2">
                                                <RefreshCcw className="w-4 h-4 animate-spin" />
                                                Calibrating AI...
                                            </span>
                                        ) : (
                                            "Analyze & Reveal"
                                        )}
                                    </button>
                                </motion.form>
                            )}

                            {step === "result" && hooks && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    {thumbnailUrl && (
                                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                                            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-accent text-[9px] font-bold uppercase tracking-widest text-white border-glow">
                                                AI Generated Mockup
                                            </div>
                                            <img
                                                src={thumbnailUrl}
                                                alt={`AI Generated podcast thumbnail mockup for ${topic}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="p-8 rounded-2xl bg-black/40 border border-white/5 shadow-inner">
                                        <div className="prose prose-invert max-w-none text-foreground/80 font-light leading-relaxed whitespace-pre-wrap text-sm md:text-base">
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
                            className="mt-8 w-full py-4 glass-card rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCcw className="w-3 h-3" /> New Strategy Protocol
                        </button>
                    )}
                </div>
            </div>

            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[150px] -z-10 pointer-events-none" />
        </section>
    );
}
