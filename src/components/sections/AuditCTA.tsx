"use client";

import { m } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Send, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuditCTA() {
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

                setTimeout(() => {
                    router.push("/book?from=audit");
                }, 1000);
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error("Inline audit CTA submission error:", err);
            setStatus("error");
        }
    };

    return (
        <section id="audit" className="py-24 relative overflow-hidden z-10">
            {/* Glowing ambient elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />

            <div className="container px-4 mx-auto">
                <div className="max-w-5xl mx-auto">
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="relative overflow-hidden rounded-[3rem] border border-white/10 p-8 md:p-16 glass-card bg-slate-950/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                    >
                        {/* Accent design border glow */}
                        <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-500/5 pointer-events-none" />

                        <div className="grid gap-12 lg:grid-cols-12 items-center">
                            
                            {/* Copy Column */}
                            <div className="lg:col-span-6 space-y-6 text-left">
                                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Zero-Friction Conversion Boost
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                                    Get a Free 10-Min <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                        Video Website Audit.
                                    </span>
                                </h2>
                                <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                                    Our lead design architects will record a custom screencast of your website, highlighting the exact structural, speed, and conversion updates needed to double your pipeline sales.
                                </p>
                            </div>

                            {/* Form Column */}
                            <div className="lg:col-span-6">
                                {status === "success" ? (
                                    <m.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-8 flex flex-col items-center justify-center text-center space-y-4"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                                            <Send className="w-5 h-5 animate-pulse" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-1">Queue Position Secured!</h4>
                                            <p className="text-xs text-muted-foreground">Redirecting you to our onboarding calendar...</p>
                                        </div>
                                    </m.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <input
                                                type="url"
                                                name="website_url"
                                                required
                                                disabled={status === "submitting"}
                                                placeholder="Website (https://yoursite.com)"
                                                className="w-full px-4 py-4 text-xs bg-white/5 border border-white/10 focus:border-cyan-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white"
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                disabled={status === "submitting"}
                                                placeholder="Email Address"
                                                className="w-full px-4 py-4 text-xs bg-white/5 border border-white/10 focus:border-cyan-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white"
                                            />
                                        </div>

                                        {status === "error" && (
                                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4 shrink-0" />
                                                Submission failed. Please try again.
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full py-4 bg-white text-black font-black rounded-2xl border-glow flex items-center justify-center gap-2 hover:bg-cyan-400 hover:text-white hover:border-cyan-400 transition-all duration-300 group text-[10px] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {status === "submitting" ? (
                                                <>
                                                    <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                    Securing Position...
                                                </>
                                            ) : (
                                                <>
                                                    Get My Free Video Audit
                                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>

                        </div>
                    </m.div>
                </div>
            </div>
        </section>
    );
}
