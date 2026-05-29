"use client";

import { m, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, AlertCircle } from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function ExitIntentPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const router = useRouter();

    useEffect(() => {
        // 1. Safety Checks: Verify user hasn't already converted or closed the popup this session
        const hasConverted = localStorage.getItem("audit_converted") === "true";
        const hasDismissed = sessionStorage.getItem("audit_dismissed") === "true";

        if (hasConverted || hasDismissed) {
            return;
        }

        // 2. Desktop Trigger: Exit Intent (Cursor leaves top of viewport)
        const handleMouseLeave = (e: MouseEvent) => {
            // Dynamic check at event execution time
            if (sessionStorage.getItem("audit_dismissed") === "true" || localStorage.getItem("audit_converted") === "true") {
                return;
            }
            // e.clientY < 20 signifies the user moving the cursor towards the address bar/tabs/close button
            if (e.clientY < 20) {
                setIsOpen(true);
            }
        };

        // Bind exit-intent desktop trigger
        document.addEventListener("mouseleave", handleMouseLeave);

        // 3. Mobile Trigger: Scroll Depth using IntersectionObserver (eliminates layout-thrashing Forced Reflows)
        // Dynamically create a tiny sentinel div at 60% scroll depth client-side to prevent hydration mismatch
        const sentinel = document.createElement("div");
        sentinel.id = "exit-intent-sentinel";
        sentinel.style.position = "absolute";
        sentinel.style.top = "60%";
        sentinel.style.left = "0";
        sentinel.style.width = "1px";
        sentinel.style.height = "1px";
        sentinel.style.pointerEvents = "none";
        sentinel.style.zIndex = "-9999";
        
        // Ensure body is relatively positioned so sentinel positions perfectly
        if (document.body.style.position !== "relative") {
            document.body.style.position = "relative";
        }
        document.body.appendChild(sentinel);

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const isConverted = localStorage.getItem("audit_converted") === "true";
                    const isDismissed = sessionStorage.getItem("audit_dismissed") === "true";
                    if (!isConverted && !isDismissed) {
                        setIsOpen(true);
                    }
                    observer.disconnect();
                }
            },
            { threshold: 0 }
        );
        
        observer.observe(sentinel);

        return () => {
            document.removeEventListener("mouseleave", handleMouseLeave);
            observer.disconnect();
            if (sentinel.parentNode) {
                sentinel.parentNode.removeChild(sentinel);
            }
        };
    }, []);

    const handleDismiss = () => {
        setIsOpen(false);
        sessionStorage.setItem("audit_dismissed", "true");
    };

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
                
                // Wait briefly for success animation, then redirect to bookings
                setTimeout(() => {
                    setIsOpen(false);
                    router.push("/book?from=audit");
                }, 1500);
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error("Popup lead capture error:", err);
            setStatus("error");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-[90] w-full max-w-[420px] px-4 md:px-0">
                    <m.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        transition={{ type: "spring", damping: 20, stiffness: 260 }}
                        className="relative overflow-hidden rounded-[2rem] border border-white/10 p-8 glass-card bg-slate-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                        {/* Glow Effects */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[40px] pointer-events-none -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/5 blur-[50px] pointer-events-none -z-10" />

                        {/* Close button */}
                        <button
                            onClick={handleDismiss}
                            disabled={status === "submitting"}
                            className="absolute top-4 right-4 p-1.5 rounded-full border border-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all disabled:opacity-50"
                            aria-label="Dismiss"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Card Content */}
                        {status === "success" ? (
                            <m.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center py-6 space-y-4"
                            >
                                <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                                    <Send className="w-5 h-5 animate-bounce" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-1">Audit Reserved! 🚀</h4>
                                    <p className="text-xs text-muted-foreground">Redirecting you to schedule a quick sync call...</p>
                                </div>
                            </m.div>
                        ) : (
                            <div className="space-y-5">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Free Optimization Protocol
                                </div>

                                {/* Headline */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold tracking-tight text-white">
                                        Wait! Is your website losing clients?
                                    </h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Before you leave, enter your website and we&apos;ll record a <strong className="text-cyan-400">free 10-minute custom video audit</strong> highlighting critical speed, SEO, and layout upgrades to double your sales.
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-3.5">
                                    <div className="space-y-2">
                                        <input
                                            type="url"
                                            name="website_url"
                                            required
                                            disabled={status === "submitting"}
                                            placeholder="https://yourbusiness.com"
                                            className="w-full px-4 py-3 text-xs bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl outline-none transition-all placeholder:text-muted-foreground/30 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            disabled={status === "submitting"}
                                            placeholder="john@yourbusiness.com"
                                            className="w-full px-4 py-3 text-xs bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl outline-none transition-all placeholder:text-muted-foreground/30 text-white"
                                        />
                                    </div>

                                    {status === "error" && (
                                        <p className="text-[10px] text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            Submission failed. Please try again.
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-black bg-white rounded-xl border border-white hover:bg-cyan-400 hover:border-cyan-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === "submitting" ? (
                                            <>
                                                <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                Preparing Audit...
                                            </>
                                        ) : (
                                            <>
                                                Get My Free Video Audit
                                                <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}
                    </m.div>
                </div>
            )}
        </AnimatePresence>
    );
}
