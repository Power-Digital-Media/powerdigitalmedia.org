"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Video, Database, PhoneCall, MailCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function BusinessSolutionsPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const data = new FormData(form);
        data.append("_form_source", "unified-solutions-lead");

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
                    router.push("/book?from=solutions");
                }, 1000);
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error("Solutions form submission error:", err);
            setStatus("error");
        }
    };

    return (
        <main className="relative min-h-screen bg-background text-white overflow-hidden">
            <Navbar />

            {/* Glowing background shapes */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] pointer-events-none -z-10 rounded-full" />

            {/* Hero Section */}
            <section className="relative pt-36 pb-24 md:pt-44">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="grid gap-16 lg:grid-cols-12 items-center">
                        
                        {/* Copy / Value Prop Column */}
                        <div className="lg:col-span-7 space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest"
                            >
                                <Sparkles className="w-4 h-4 animate-pulse" />
                                Unified Infrastructure Stack
                            </motion.div>

                            <div className="space-y-4">
                                <motion.h1 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-4xl font-extrabold tracking-tight md:text-6xl leading-[1.1] uppercase"
                                >
                                    Unified Business <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500">
                                        Solutions
                                    </span>
                                </motion.h1>
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-lg text-slate-300 max-w-xl leading-relaxed"
                                >
                                    Marrying carrier-grade voice communications with local workflow automation. Eliminate manual data entry and connect your website, CRM, email, and phone system on autopilot.
                                </motion.p>
                            </div>

                            {/* Core Pillars */}
                            <div className="grid gap-6 sm:grid-cols-3 pt-4">
                                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                        <Database className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-sm">Web & Apps</h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Bespoke Next.js apps engineered for sub-second speeds and generative search visibility.
                                    </p>
                                </div>
                                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                                        <MailCheck className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-sm">CRM & Email</h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Capsule CRM & Transpond automation syncing leads and marketing on autopilot.
                                    </p>
                                </div>
                                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                        <PhoneCall className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-sm">VoIP Phones</h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        ULTATEL cloud voice networks with 99.999% SLA uptime and Microsoft Teams integration.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-6 text-xs text-slate-400">
                                <ShieldCheck className="w-4 h-4 text-blue-400" />
                                Full deployment support. Authorized Integration Partner of ULTATEL Cloud Communications.
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-5">
                            <div className="p-10 rounded-[3rem] border border-white/10 glass-card bg-slate-950/40 shadow-[0_0_50px_rgba(0,0,0,0.4)] relative">
                                <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-blue-400/10 via-transparent to-indigo-500/10 pointer-events-none" />

                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 animate-bounce">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold">Request Received!</h3>
                                            <p className="text-slate-300 text-sm leading-relaxed">
                                                We have saved your details and synced them to our CRM queue. Redirecting you to book your local strategy call...
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold">Get a Free Audit</h3>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                Fill in the form below to claim a complimentary integration audit for your business workflows.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                                    className="w-full px-4 py-4 bg-white/5 border border-white/10 focus:border-blue-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
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
                                                    className="w-full px-4 py-4 bg-white/5 border border-white/10 focus:border-blue-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
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
                                                    className="w-full px-4 py-4 bg-white/5 border border-white/10 focus:border-blue-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                    Services Needed
                                                </label>
                                                <div className="grid grid-cols-2 gap-3 pt-2">
                                                    {["Web Design", "Custom CRM", "VoIP Phones", "Marketing"].map((svc) => (
                                                        <label key={svc} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                name="services" 
                                                                value={svc} 
                                                                className="rounded bg-white/5 border-white/10 focus:ring-blue-500 h-4 w-4 text-blue-500" 
                                                            />
                                                            {svc}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {status === "error" && (
                                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
                                                    Failed to send. Please check your connection and try again.
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={status === "submitting"}
                                                className="w-full py-5 bg-white text-black font-black rounded-2xl border-glow flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 group text-xs uppercase tracking-widest disabled:opacity-50"
                                            >
                                                {status === "submitting" ? (
                                                    "Connecting Channels..."
                                                ) : (
                                                    <>
                                                        Submit Request
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
