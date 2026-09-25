"use client";

import { useState, type FormEvent } from "react";
import { Send, Sparkles, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
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
                }, 1200);
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error("Audit CTA submission error:", err);
            setStatus("error");
        }
    };

    return (
        <section id="audit" className="py-20 md:py-28 relative overflow-hidden bg-[#020617] border-t border-white/5">
            <div className="container px-6 mx-auto">
                <div className="max-w-5xl mx-auto">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-14 bg-gradient-to-b from-slate-900/60 to-slate-950/80 shadow-2xl">
                        
                        <div className="grid gap-10 lg:grid-cols-12 items-center">
                            
                            {/* Copy Column */}
                            <div className="lg:col-span-6 space-y-5 text-left">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    100% Free • No Obligation
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight uppercase text-white">
                                    Get a Free 5-Minute <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                        Website &amp; SEO Review.
                                    </span>
                                </h2>
                                <p className="text-sm md:text-base text-white/75 leading-relaxed">
                                    Damein Donald will personally inspect your website, test its mobile speed score, and send you a short video showing exactly why competitors in Central Mississippi might be outranking you on Google.
                                </p>
                                <div className="space-y-2 pt-2">
                                    {["Mobile speed test & core web vitals check", "Google Maps 3-Pack ranking breakdown", "Actionable recommendations you can use immediately"].map(item => (
                                        <div key={item} className="flex items-center gap-2 text-xs text-white/80">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Form Column */}
                            <div className="lg:col-span-6 bg-slate-950/60 p-6 md:p-8 rounded-2xl border border-white/10">
                                {status === "success" ? (
                                    <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                                        <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                                            <Send className="w-5 h-5 animate-pulse" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-1">Request Received!</h4>
                                            <p className="text-xs text-white/70">Damein will review your website and follow up with your video breakdown shortly.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-white/80 mb-1 uppercase tracking-wider">
                                                Your Website URL
                                            </label>
                                            <input
                                                type="url"
                                                name="website_url"
                                                required
                                                disabled={status === "submitting"}
                                                placeholder="https://yourbusiness.com"
                                                className="w-full px-4 py-3.5 text-xs bg-slate-900 border border-white/10 focus:border-cyan-400 rounded-xl outline-none transition-all placeholder:text-white/30 text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-white/80 mb-1 uppercase tracking-wider">
                                                Your Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                disabled={status === "submitting"}
                                                placeholder="you@company.com"
                                                className="w-full px-4 py-3.5 text-xs bg-slate-900 border border-white/10 focus:border-cyan-400 rounded-xl outline-none transition-all placeholder:text-white/30 text-white"
                                            />
                                        </div>

                                        {status === "error" && (
                                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4 shrink-0" />
                                                Submission failed. Please call (601) 446-2393 or try again.
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full py-4 bg-cyan-400 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-all text-xs uppercase tracking-wider disabled:opacity-50"
                                        >
                                            {status === "submitting" ? (
                                                <>
                                                    <div className="w-3.5 h-3.5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                                                    Sending Request...
                                                </>
                                            ) : (
                                                <>
                                                    Send Me My Free Audit
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                        <p className="text-[11px] text-white/40 text-center">
                                            No spam, no aggressive sales pitch. Just honest feedback.
                                        </p>
                                    </form>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
