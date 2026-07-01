"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Founders100Standalone from "@/components/ui/billing/Founders100Standalone";
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Founders100Page() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const data = new FormData(form);
        data.append("_form_source", "founders-100-application");

        try {
            const response = await fetch("/api/forms", {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
                setTimeout(() => {
                    router.push("/book?from=founders100");
                }, 1000);
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error("Founders 100 application error:", err);
            setStatus("error");
        }
    };

    return (
        <main className="relative min-h-screen bg-background text-white overflow-hidden">
            <Navbar />

            {/* Glowing background shapes */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-orange-500/5 blur-[150px] pointer-events-none -z-10 rounded-full" />

            <section className="relative pt-36 pb-24 md:pt-44">
                <div className="container px-4 mx-auto max-w-5xl">
                    
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            EXCLUSIVE INITIATIVE
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl font-black tracking-tight md:text-6xl mb-6 uppercase"
                        >
                            Founder&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500">100</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed"
                        >
                            Mississippi&apos;s High-Authority Web Build Campaign. Lock in your Growth Build deliverables at a one-time 50% discount. Permanent codebase ownership, zero licensing lock-in.
                        </motion.p>
                    </div>

                    {/* Standard Billing component */}
                    <Founders100Standalone />

                    {/* Inquiry / Lead Form Block below checkout */}
                    <div className="mt-20 max-w-3xl mx-auto">
                        <div className="relative rounded-[40px] border border-white/10 glass-card bg-slate-950/40 p-10 md:p-14 overflow-hidden">
                            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 pointer-events-none" />
                            
                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                                >
                                    <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                                        <CheckCircle2 className="w-6 h-6 animate-pulse" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold">Spot Reserved!</h3>
                                        <p className="text-slate-300 text-sm leading-relaxed">
                                            Your application has been received and synced to Transpond CRM. Redirecting you to book your local design onboarding...
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="space-y-8">
                                    <div className="text-center md:text-left space-y-2">
                                        <h2 className="text-2xl font-extrabold tracking-tight">Prefer to Consult First?</h2>
                                        <p className="text-slate-300 text-sm leading-relaxed max-w-lg">
                                            Fill out this brief application to secure your spot temporarily. We will schedule a discovery review to verify project compatibility.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                Full Name
                                            </label>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                required 
                                                disabled={status === "submitting"}
                                                placeholder="John Doe" 
                                                className="w-full px-4 py-4 bg-white/5 border border-white/10 focus:border-amber-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
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
                                                className="w-full px-4 py-4 bg-white/5 border border-white/10 focus:border-amber-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                Phone Number
                                            </label>
                                            <input 
                                                type="tel" 
                                                name="phone" 
                                                required 
                                                disabled={status === "submitting"}
                                                placeholder="601-555-0199" 
                                                className="w-full px-4 py-4 bg-white/5 border border-white/10 focus:border-amber-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                Business Name
                                            </label>
                                            <input 
                                                type="text" 
                                                name="business_name" 
                                                required 
                                                disabled={status === "submitting"}
                                                placeholder="My Enterprise" 
                                                className="w-full px-4 py-4 bg-white/5 border border-white/10 focus:border-amber-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                Current Website (If applicable)
                                            </label>
                                            <input 
                                                type="url" 
                                                name="current_website" 
                                                disabled={status === "submitting"}
                                                placeholder="https://mycurrentbusiness.com" 
                                                className="w-full px-4 py-4 bg-white/5 border border-white/10 focus:border-amber-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
                                            />
                                        </div>

                                        {status === "error" && (
                                            <div className="md:col-span-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4 shrink-0" />
                                                Submission failed. Please check details and try again.
                                            </div>
                                        )}

                                        <div className="md:col-span-2 pt-2">
                                            <button
                                                type="submit"
                                                disabled={status === "submitting"}
                                                className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300 group text-xs uppercase tracking-widest disabled:opacity-50"
                                            >
                                                {status === "submitting" ? (
                                                    "Securing Application Slot..."
                                                ) : (
                                                    <>
                                                        Apply & Request Call
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
