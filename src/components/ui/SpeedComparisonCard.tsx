"use client";

import { useState } from "react";
import { Zap, XCircle, CheckCircle2, PhoneCall, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SpeedComparisonCard() {
    const [viewMode, setViewMode] = useState<"comparison" | "calculator">("comparison");
    const [monthlyVisitors, setMonthlyVisitors] = useState<number>(500);

    // Math: Average slow site loses 53% of mobile visits over 3s. Fast site captures ~8% call conversion.
    const estimatedLostCalls = Math.round((monthlyVisitors * 0.53 * 0.08));
    const estimatedCapturedJobs = Math.round(monthlyVisitors * 0.08);

    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            {/* Ambient Warm Backdrops */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-6xl">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                            Why Speed Wins Mississippi Customers
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                        The 3-Second Rule: <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-cyan-400">
                            Slow Sites Lose Jobs. Fast Sites Win Them.
                        </span>
                    </h2>
                    <p className="text-white/75 text-base md:text-lg mt-4 leading-relaxed font-normal">
                        When a Mississippi homeowner has a leaking roof, an air conditioning breakdown, or needs catering, they search on their phone. If your website doesn&apos;t load in 3 seconds, they hit &ldquo;back&rdquo; and call your competitor.
                    </p>
                </div>

                {/* Side-by-Side Comparison Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
                    
                    {/* The Slow Template Site */}
                    <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/40 border border-red-500/20 flex flex-col justify-between relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
                        
                        <div>
                            <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                                        <AlertTriangle className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-white">The Typical Agency Site</h3>
                                        <p className="text-xs text-white/50">WordPress / Clunky Templates</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold font-mono">
                                    ⏳ 5.8s - 8.2s Load
                                </span>
                            </div>

                            <ul className="space-y-3.5 mb-8">
                                {[
                                    "Takes 6+ seconds to open on a cell phone",
                                    "53% of mobile visitors leave before seeing your phone number",
                                    "Overloaded with 30+ plugins that break constantly",
                                    "Zero Google Map Pack schema optimization",
                                    "Quote requests get lost in spam folders"
                                ].map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/70">
                                        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/15 text-center mt-auto">
                            <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block mb-0.5">The Bottom Line</span>
                            <p className="text-xs text-white/80">You pay for marketing, but visitors bounce before ever contacting you.</p>
                        </div>
                    </div>

                    {/* The Power Digital Build */}
                    <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-cyan-500/40 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-cyan-950/30">
                        <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                        
                        <div>
                            <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-cyan-500/20">
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-white">Power Digital Growth Platform</h3>
                                        <p className="text-xs text-cyan-400">Hand-Crafted Next.js 16</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold font-mono shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                                    ⚡ Fast &lt; 2–3s Mobile Load
                                </span>
                            </div>

                            <ul className="space-y-3.5 mb-8">
                                {[
                                    "Opens fast (under 2–3s) on mobile networks without lagging",
                                    "95+ Google Mobile PageSpeed performance",
                                    "PinDrop™ job site GPS pins & automated 5-star Google reviews",
                                    "1-Tap direct phone calling and instant quote routing",
                                    "Direct Capsule CRM sync with zero missed leads"
                                ].map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/90 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between gap-3 mt-auto">
                            <div>
                                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Real Mississippi Results</span>
                                <p className="text-xs text-white/90">More phone calls, better Google rank, zero tech headaches.</p>
                            </div>
                            <Link
                                href="/free-audit"
                                className="px-4 py-2 bg-cyan-400 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-white transition-all shrink-0"
                            >
                                Free Audit
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Quick Call Out Strip */}
                <div className="mt-10 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                        <span className="text-xs sm:text-sm text-white/80 font-medium">
                            Wondering where your current website scores? We&apos;ll run a free speed &amp; Google Maps breakdown for you.
                        </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            href="/free-audit"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white transition-colors uppercase tracking-wider"
                        >
                            Request 5-Min Video Review <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
