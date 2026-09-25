"use client";

import { CheckCircle2, ArrowRight, Sparkles, MapPin, Zap, Users, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";

export default function Services() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <div id="services" className="relative bg-[#020617] text-white">

            {/* Service 2: PinDrop™ Field Tech for Contractors */}
            <section className="relative py-20 md:py-32 bg-slate-950/60 border-t border-white/5">
                <div className="container px-6 mx-auto">
                    <div className="grid md:grid-cols-2 items-center gap-12 lg:gap-16">
                        <div className="flex flex-col items-start">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                                    Proprietary Contractor Tech
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 uppercase tracking-tight leading-tight">
                                PinDrop™ Live Mapping &amp; <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                                    5-Star Review Engine.
                                </span>
                            </h2>
                            <p className="text-white/75 text-base md:text-lg mb-6 leading-relaxed">
                                Built specifically for roofers, landscapers, excavators, and home service pros. When your team finishes a job, they snap a photo and drop a GPS pin. PinDrop™ puts proof on your website map, syncs local schema to Google, and texts the homeowner for an instant 5-star review.
                            </p>
                            <ul className="space-y-3 mb-8 w-full">
                                {[
                                    "1-Tap GPS pin drops from any smartphone",
                                    "Live interactive neighborhood map on your website",
                                    "Automated SMS review requests sent to homeowners",
                                    "Boosts local Google Maps 3-Pack authority"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/80 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 shadow-[0_0_8px_#fbbf24]" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/pindrop"
                                    className="px-7 py-3.5 bg-amber-400 text-slate-950 font-black rounded-full hover:bg-white transition-colors uppercase tracking-wider text-xs"
                                >
                                    See How PinDrop™ Works
                                </Link>
                                <a
                                    href="tel:6014462393"
                                    className="px-7 py-3.5 border border-white/20 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/10 text-white transition-colors"
                                >
                                    Call (601) 446-2393
                                </a>
                            </div>
                        </div>

                        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl bg-slate-900">
                            <Image
                                src="/portfolio/geaux-pro-outdoors.webp"
                                alt="PinDrop Field Tech Interface"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 3: CRM & Lead Follow-Up Automation */}
            <section className="relative py-20 md:py-32 border-t border-white/5">
                <div className="container px-6 mx-auto">
                    <div className="grid md:grid-cols-2 items-center gap-12 lg:gap-16">
                        <div className="order-2 md:order-1 relative aspect-[16/10] rounded-3xl overflow-hidden border border-emerald-500/20 shadow-2xl bg-slate-900 p-6 flex flex-col justify-center">
                            <div className="bg-slate-950/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                                        Automated Lead Routing
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">New Quote Request: Jackson, MS</h4>
                                <p className="text-xs text-white/60 mb-4">Homeowner requested roof replacement estimate via website form.</p>
                                <div className="space-y-2 text-xs">
                                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                                        <span className="text-white/70">Capsule CRM Contact Created</span>
                                        <span className="text-emerald-400 font-bold">✓ Synced</span>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                                        <span className="text-white/70">Transpond Instant Confirmation SMS/Email</span>
                                        <span className="text-emerald-400 font-bold">✓ Sent</span>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                                        <span className="text-white/70">Direct Contractor Phone Alert</span>
                                        <span className="text-cyan-400 font-bold">✓ Delivered</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 md:order-2 flex flex-col items-start">
                            <span className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-3">
                                Pillar 03 • Lead Capture &amp; Follow-Up
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 uppercase tracking-tight leading-tight">
                                Never Lose a Job to <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                                    Missed Follow-Up.
                                </span>
                            </h2>
                            <p className="text-white/75 text-base md:text-lg mb-6 leading-relaxed">
                                When a homeowner or business owner fills out a form on your site, they want a fast response. We link your site directly to Capsule CRM and Transpond automation so every lead is organized, texted, and tracked automatically.
                            </p>
                            <div className="space-y-3 mb-8 w-full">
                                {[
                                    "Instant lead notification sent to your smartphone",
                                    "Automated welcome email & SMS sent to client immediately",
                                    "Centralized customer database with Capsule CRM",
                                    "Zero manual data entry, zero lost jobs"
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-2.5 text-sm text-white/80 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/custom-applications"
                                    className="px-7 py-3.5 bg-emerald-400 text-slate-950 font-black rounded-full hover:bg-white transition-colors uppercase tracking-wider text-xs"
                                >
                                    Explore Automation
                                </Link>
                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="px-7 py-3.5 border border-white/20 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/10 text-white transition-colors"
                                >
                                    Book 15-Min Call
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: 3-Step Simple Growth Path */}
            <section className="relative py-24 md:py-32 bg-slate-950/80 border-t border-white/5">
                <div className="container px-6 mx-auto text-center max-w-4xl">
                    <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-3 block">
                        Simple, Proven Process
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight mb-6">
                        How We Help You Win.
                    </h2>
                    <p className="text-white/75 text-base md:text-lg mb-16 max-w-2xl mx-auto">
                        No confusing technical jargon. We give you a reliable growth system that brings in local customers and makes your company look like the #1 choice.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-16">
                        <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 flex flex-col">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-xl mb-6">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Build Fast Mobile Site</h3>
                            <p className="text-white/70 text-sm leading-relaxed">
                                We design and hand-code your custom Next.js website to load in under half a second and look great on any phone.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 flex flex-col">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-xl mb-6">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Install PinDrop™ &amp; SEO</h3>
                            <p className="text-white/70 text-sm leading-relaxed">
                                Pin your job sites with 1 tap, generate automated 5-star Google reviews, and climb the local Google Maps 3-pack.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 flex flex-col">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-xl mb-6">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Automate Follow-Up</h3>
                            <p className="text-white/70 text-sm leading-relaxed">
                                Connect Capsule CRM &amp; Transpond email/SMS follow-up so every customer inquiry is handled immediately.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/free-audit"
                            className="w-full sm:w-auto px-8 py-4 bg-cyan-400 text-slate-950 font-black rounded-full hover:bg-white transition-all uppercase tracking-wider text-xs shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                        >
                            Get Free 5-Minute Audit
                        </Link>
                        <a
                            href="tel:6014462393"
                            className="w-full sm:w-auto px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 text-white font-bold transition-all uppercase tracking-wider text-xs"
                        >
                            Call Damein (601) 446-2393
                        </a>
                    </div>
                </div>
            </section>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </div>
    );
}
