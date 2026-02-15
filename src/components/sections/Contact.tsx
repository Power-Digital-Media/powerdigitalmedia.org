"use client";

import { m } from "framer-motion";
import { Send, Calendar, MessageSquare, Phone, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";

export default function Contact() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <section id="contact" className="relative pt-28 pb-20 md:py-48 overflow-hidden bg-background">
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
                                <form
                                    action="https://formspree.io/f/mdazlovb"
                                    method="POST"
                                    className="space-y-8"
                                >
                                    <div className="grid gap-8 sm:grid-cols-2">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Your Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-muted-foreground/30 font-medium"
                                                placeholder="Enter Full Name"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-muted-foreground/30 font-medium"
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
                                            className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-muted-foreground/30 font-medium resize-none"
                                            placeholder="Tell us about your production goals..."
                                        />
                                    </div>

                                    <button className="group w-full py-6 bg-cyan-500 text-slate-950 font-black rounded-full shadow-[0_0_30px_rgba(34,211,238,0.2)] flex items-center justify-center gap-3 hover:bg-cyan-400 hover:scale-[1.02] active:scale-[0.98] transition-all text-lg uppercase tracking-widest">
                                        Deploy Message <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </button>
                                </form>
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
