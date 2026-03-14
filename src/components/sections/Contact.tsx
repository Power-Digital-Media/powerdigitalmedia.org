"use client";

import { m } from "framer-motion";
import { Send, Calendar, MessageSquare, Phone, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";

export default function Contact() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mdazlovb", {
                method: "POST",
                body: data,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="relative pt-28 pb-20 md:py-48 overflow-hidden">
            {/* Ecosystem Grid Fade-In */}
            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

            <div className="container relative z-10 px-6 mx-auto">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 md:mb-32 text-center">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block">Initialize Contact</span>
                        <h2 className="text-4xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-none">Let&apos;s Connect.</h2>
                        <p className="text-base md:text-2xl text-foreground/60 max-w-2xl mx-auto leading-relaxed text-balance font-light">
                            Whether you&apos;re looking to launch a flagship production or deploy a <span className="text-cyan-400 font-medium whitespace-nowrap">Growth Architecture</span>, our studio is ready to execute.
                        </p>
                    </div>

                    <div className="grid gap-20 lg:grid-cols-5">

                        {/* Left Side: Info */}
                        <m.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="lg:col-span-2 space-y-12"
                        >
                            <div className="space-y-10">
                                <div>
                                    <button
                                        onClick={() => setIsBookingOpen(true)}
                                        className="w-full text-left group"
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 transition-all">
                                                <Calendar className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <h4 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">Protocol Sync</h4>
                                        </div>
                                        <p className="text-foreground/70 leading-relaxed pl-14">
                                            Book a 30-minute deep dive into your content and growth goals. Zero pressure. Total clarity.
                                        </p>
                                    </button>
                                </div>

                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                            <MessageSquare className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <h4 className="text-xl font-bold">System Proposals</h4>
                                    </div>
                                    <p className="text-foreground/70 leading-relaxed pl-14">
                                        Tailored packages for ministries, brands, and creators looking for systematic scalability.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-white/5 space-y-4">
                                <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                    <Phone className="w-4 h-4 text-cyan-400" />
                                    <span>601-446-2393</span>
                                </div>
                                <p className="text-foreground/50 text-xs pl-8">
                                    Broadcast-grade production available on-site or via secure remote systems.
                                </p>
                            </div>
                        </m.div>

                        {/* Right Side: Form */}
                        <m.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="lg:col-span-3 relative"
                        >
                            <div className="p-10 rounded-[40px] glass-card border-white/5 bg-cyan-500/[0.01] overflow-hidden">
                                {status === "success" ? (
                                    <m.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
                                            <Send className="w-8 h-8 text-cyan-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black uppercase tracking-widest mb-2">Message Deployed</h3>
                                            <p className="text-muted-foreground">Our team has received your intel. We will initiate contact shortly.</p>
                                        </div>
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-bold uppercase tracking-widest"
                                        >
                                            Send Another
                                        </button>
                                    </m.div>
                                ) : (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-8"
                                    >
                                        <div className="grid gap-8 sm:grid-cols-2">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Your Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    disabled={status === "submitting"}
                                                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-muted-foreground/30 font-medium disabled:opacity-50"
                                                    placeholder="Enter Full Name"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    disabled={status === "submitting"}
                                                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-muted-foreground/30 font-medium disabled:opacity-50"
                                                    placeholder="name@company.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Vision Summary</label>
                                            <textarea
                                                rows={5}
                                                name="message"
                                                required
                                                disabled={status === "submitting"}
                                                className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-muted-foreground/30 font-medium resize-none disabled:opacity-50"
                                                placeholder="Tell us about your production goals..."
                                            />
                                        </div>

                                        {status === "error" && (
                                            <p className="text-red-400 text-sm">Failed to send message. Please try again or email us directly.</p>
                                        )}

                                        <button
                                            disabled={status === "submitting"}
                                            className="group w-full py-6 bg-cyan-500 text-slate-950 font-black rounded-full shadow-[0_0_30px_rgba(34,211,238,0.2)] flex items-center justify-center gap-3 hover:bg-cyan-400 hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 disabled:opacity-70 disabled:cursor-not-allowed transition-all text-lg uppercase tracking-widest"
                                        >
                                            {status === "submitting" ? "Deploying..." : "Deploy Message"}
                                            <Send className={`w-5 h-5 transition-transform ${status === "submitting" ? "animate-pulse" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`} />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </m.div>

                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </section>
    );
}
