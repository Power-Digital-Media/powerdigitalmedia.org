"use client";

import { Send, Calendar, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";
import Link from "next/link";

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
                const nameVal = data.get("name") as string;
                const emailVal = data.get("email") as string;
                fetch("/api/contact/thank-you", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: emailVal, name: nameVal, template: "contact" }),
                }).catch(() => {});
                form.reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="relative py-20 md:py-32 overflow-hidden bg-[#020617] border-t border-white/5">
            <div className="container relative z-10 px-6 mx-auto">
                <div className="max-w-5xl mx-auto">
                    
                    {/* Header */}
                    <div className="mb-14 md:mb-20 text-center">
                        <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-3 block">
                            Let&apos;s Grow Your Business
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 tracking-tight uppercase leading-none text-white">
                            Get In Touch.
                        </h2>
                        <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
                            Have questions about a new website, PinDrop™ for your team, or local SEO? Reach out directly to Damein Donald.
                        </p>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-5 items-start">

                        {/* Left Side: Contact Methods & Direct Info */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* Call / Text Box */}
                            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10">
                                <div className="flex items-center gap-3.5 mb-3">
                                    <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-base">Direct Phone &amp; Text</h4>
                                        <span className="text-xs text-white/50">Mon - Fri, 8am - 6pm CT</span>
                                    </div>
                                </div>
                                <a
                                    href="tel:6013002004"
                                    className="text-xl font-black text-cyan-400 hover:text-white transition-colors block pl-13"
                                >
                                    (601) 300-2004
                                </a>
                            </div>

                            {/* Book 15-Min Call */}
                            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10">
                                <div className="flex items-center gap-3.5 mb-3">
                                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-base">Book a 15-Min Call</h4>
                                        <span className="text-xs text-white/50">Quick phone or video consultation</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="w-full mt-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors text-center"
                                >
                                    Select a Time on Calendar →
                                </button>
                            </div>

                            {/* Location */}
                            <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/5 space-y-2">
                                <div className="flex items-center gap-2 text-white/80 text-xs font-semibold">
                                    <MapPin className="w-4 h-4 text-cyan-400" />
                                    <span>Jackson, MS • Serving Central Mississippi</span>
                                </div>
                                <p className="text-white/50 text-xs pl-6">
                                    Jackson • Madison • Brandon • Clinton • Flowood • Ridgeland
                                </p>
                            </div>

                            {/* SMS Opt-in Disclaimer */}
                            <p className="text-[10px] text-white/40 leading-relaxed px-2">
                                By texting (601) 300-2004, you agree that you may receive messages from Power Digital Media LLC. Msg &amp; data rates may apply. Reply STOP to cancel at any time. View our <Link href="/privacy-policy" className="text-cyan-400 underline">Privacy Policy</Link> and <Link href="/terms-and-conditions" className="text-cyan-400 underline">Terms</Link>.
                            </p>
                        </div>

                        {/* Right Side: Simple Contact Form */}
                        <div className="lg:col-span-3 bg-slate-900/60 p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
                            {status === "success" ? (
                                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-black uppercase text-white">Message Sent!</h3>
                                    <p className="text-white/70 max-w-sm text-sm">
                                        Thanks for reaching out! Damein Donald will review your message and get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="mt-4 px-6 py-2.5 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                disabled={status === "submitting"}
                                                placeholder="John Smith"
                                                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-white/10 focus:border-cyan-400 outline-none text-white text-sm placeholder:text-white/30"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                disabled={status === "submitting"}
                                                placeholder="john@yourbusiness.com"
                                                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-white/10 focus:border-cyan-400 outline-none text-white text-sm placeholder:text-white/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                disabled={status === "submitting"}
                                                placeholder="(601) 000-0000"
                                                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-white/10 focus:border-cyan-400 outline-none text-white text-sm placeholder:text-white/30"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                                                Company / Business Name
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                disabled={status === "submitting"}
                                                placeholder="Your Business Name"
                                                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-white/10 focus:border-cyan-400 outline-none text-white text-sm placeholder:text-white/30"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                                            How Can We Help You?
                                        </label>
                                        <textarea
                                            rows={4}
                                            name="message"
                                            required
                                            disabled={status === "submitting"}
                                            placeholder="Tell us about your project, current website, or what you'd like to improve..."
                                            className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-white/10 focus:border-cyan-400 outline-none text-white text-sm placeholder:text-white/30 resize-none"
                                        />
                                    </div>

                                    {status === "error" && (
                                        <p className="text-red-400 text-xs">
                                            Failed to send. Please give us a direct call at (601) 300-2004.
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="w-full py-4 bg-cyan-400 text-slate-950 font-black rounded-xl hover:bg-white transition-all text-xs uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {status === "submitting" ? "Sending Message..." : "Send Message"}
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </section>
    );
}
