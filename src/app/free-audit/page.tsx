"use client";

import { motion } from "framer-motion";
import { Send, Sparkles, AlertCircle, ShieldCheck, ArrowRight, Video, BarChart, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function FreeAuditPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const data = new FormData(form);
        data.append("_form_source", "website-audit-request");

        try {
            const response = await fetch("/api/forms", {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                setStatus("success");
                localStorage.setItem("audit_converted", "true");
                form.reset();
                
                // Route to scheduler
                setTimeout(() => {
                    router.push("/book?from=audit");
                }, 1000);
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error("Audit submission error:", err);
            setStatus("error");
        }
    };

    return (
        <main className="relative min-h-screen bg-background text-white overflow-hidden">
            <Navbar />

            {/* Glowing background shapes */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] pointer-events-none -z-10 rounded-full" />

            <section className="relative pt-36 pb-24 md:pt-44">
                <div className="container px-4 mx-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid gap-16 lg:grid-cols-12 items-center">
                            
                            {/* Copy/Value Prop Column (7 Cols on desktop) */}
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="lg:col-span-7 space-y-8"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-cyan-400/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                                    <Sparkles className="w-4 h-4 animate-pulse" />
                                    Complimentary Optimization Protocol
                                </div>

                                <div className="space-y-4">
                                    <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl leading-[1.1]">
                                        Is Your Website <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                                            Losing Customers?
                                        </span>
                                    </h1>
                                    <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                                        Stop guessing why visitors leave. Enter your link, and we&apos;ll record a <strong className="text-cyan-400">free 10-minute custom video audit</strong> highlighting structural, speed, and conversion updates to instantly scale your sales.
                                    </p>
                                </div>

                                {/* Three bullet points */}
                                <div className="grid gap-6 sm:grid-cols-3 pt-4">
                                    <div className="space-y-3">
                                        <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                                            <Video className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-sm">Personalized Video</h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">No automated reports. You get a real screen-recording of our team analyzing your actual pages.</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center text-blue-400">
                                            <BarChart className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-sm">CRO Upgrades</h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">We uncover conversion friction points that are stopping visitors from filling forms or booking calls.</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-purple-400">
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-sm">Speed & SEO Core</h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">Discover if your page speeds or lack of AI/search schemas are suppressing your organic visibility.</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-6 text-xs text-slate-400">
                                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                                    No credit card required. 100% confidential analysis. Delivered within 48 hours.
                                </div>
                            </motion.div>

                            {/* Form Column (5 Cols on desktop) */}
                            <motion.div 
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="lg:col-span-5"
                            >
                                <div className="p-10 rounded-[3rem] border border-white/10 glass-card bg-slate-950/40 shadow-[0_0_50px_rgba(0,0,0,0.4)] relative">
                                    
                                    {/* Accent gradient ring */}
                                    <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/10 pointer-events-none" />

                                    {status === "success" ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                                                <Send className="w-6 h-6 animate-pulse" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-bold">Audit Reserved!</h3>
                                                <p className="text-slate-300 text-sm leading-relaxed">
                                                    We&apos;ve added your site to our queue. We are redirecting you to lock in an onboarding call.
                                                </p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold">Claim Your Blueprint</h3>
                                                <p className="text-xs text-muted-foreground leading-relaxed">
                                                    Fill in your details, and our lead design architects will perform your manual optimization review.
                                                </p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                        Website URL
                                                    </label>
                                                    <input 
                                                        type="url" 
                                                        name="website_url" 
                                                        required 
                                                        disabled={status === "submitting"}
                                                        placeholder="https://yourbusiness.com" 
                                                        className="w-full px-4 py-4 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                        Email Address
                                                    </label>
                                                    <input 
                                                        type="email" 
                                                        name="email" 
                                                        required 
                                                        disabled={status === "submitting"}
                                                        placeholder="john@yourbusiness.com" 
                                                        className="w-full px-4 py-4 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
                                                    />
                                                </div>

                                                {status === "error" && (
                                                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
                                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                                        Submission failed. Please check details and try again.
                                                    </div>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={status === "submitting"}
                                                    className="w-full py-5 bg-white text-black font-black rounded-2xl border-glow flex items-center justify-center gap-2 hover:bg-cyan-400 hover:text-white hover:border-cyan-400 transition-all duration-300 group text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {status === "submitting" ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                            Securing Audit Queue...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Generate My Free Audit
                                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
