"use client";

import { CheckCircle2, ArrowRight, Sparkles, MapPin, Zap, Users, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";
import DashboardProof from "@/components/ui/DashboardProof";

const proofCards = [
    {
        image: "/images/proof/Growth_Proof/5.webp",
        badge: "Verified Traffic",
        text: "35m 12s Avg. Engagement",
        border: "border-cyan-500/40",
        bar: "from-cyan-400 to-blue-500",
        shadow: "shadow-[0_0_20px_rgba(34,211,238,0.2)]",
        badgeColor: "text-cyan-400",
        badgeBorder: "border-cyan-500/50",
    },
    {
        image: "/images/proof/Growth_Proof/4.webp",
        badge: "Conversion Growth",
        text: "+3,095% Performance Growth",
        border: "border-purple-500/40",
        bar: "from-purple-500 to-fuchsia-400",
        shadow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
        badgeColor: "text-purple-400",
        badgeBorder: "border-purple-500/50",
    },
    {
        image: "/images/proof/Growth_Proof/3.webp",
        badge: "Inbound Leads",
        text: "High-Intent Customer Calls",
        border: "border-blue-500/40",
        bar: "from-blue-500 to-cyan-400",
        shadow: "shadow-[0_0_20px_rgba(59,130,246,0.2)]",
        badgeColor: "text-blue-400",
        badgeBorder: "border-blue-500/50",
    },
    {
        image: "/images/proof/Growth_Proof/1.webp",
        badge: "Google 3-Pack",
        text: "Local Map Search Authority",
        border: "border-white/20",
        bar: "from-white/40 to-white/10",
        shadow: "",
        badgeColor: "text-white/80",
        badgeBorder: "border-white/20",
    }
];

export default function Services() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <div id="services" className="relative bg-[#020617] text-white">
            
            {/* Section 1: The Proof (Verified Analytics) */}
            <section className="relative flex flex-col justify-start pt-24 pb-16 md:pt-36 md:pb-28 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <DashboardProof />
                    <div className="hidden md:block absolute inset-0 pointer-events-none w-[60%] right-0 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-10" />
                    <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/95 to-slate-950 pointer-events-none z-10" />
                </div>

                <div className="relative z-20 container px-6 mx-auto">
                    <div className="flex justify-center md:justify-end">
                        <div className="max-w-xl flex flex-col items-center md:items-end w-full">
                            <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs mb-3 block text-center md:text-right w-full">
                                Real Results in Mississippi
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase leading-none text-white text-center md:text-right w-full">
                                The Proof.
                            </h2>
                            <p className="text-base md:text-lg text-white/80 mb-8 max-w-md leading-relaxed font-normal text-center md:text-right w-full">
                                Real, verified client analytics. Over <strong className="text-white">35 minutes average engagement</strong> and <strong className="text-cyan-400">+3,095% growth</strong> in trackable customer actions. We build websites that make phones ring.
                            </p>
                            <ul className="space-y-3 mb-8 flex flex-col items-start md:items-end w-full">
                                {["Page-One Google Map 3-Pack Placements", "Sub-Second Mobile Load Times", "High-Converting Quote Forms & Call Tracking"].map((f) => (
                                    <li key={f} className="flex items-center gap-3 text-sm md:text-base font-semibold text-white/80 w-full justify-start md:justify-end text-left md:text-right">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 shadow-[0_0_8px_#22d3ee]" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-end">
                                <Link
                                    href="/free-audit"
                                    className="px-8 py-4 bg-cyan-400 text-slate-950 rounded-full font-black uppercase tracking-wider text-xs hover:bg-white transition-all text-center"
                                >
                                    Get Free Website Audit
                                </Link>
                                <a
                                    href="tel:6013002004"
                                    className="px-8 py-4 border border-white/20 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/10 text-white transition-all text-center"
                                >
                                    Call (601) 300-2004
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Marquee */}
                <div className="flex md:hidden w-full flex-col pb-4 overflow-hidden relative z-20 mt-12">
                    <div className="flex gap-4 overflow-x-auto px-6 py-2 no-scrollbar">
                        {proofCards.map((card, idx) => (
                            <div
                                key={idx}
                                className={`relative w-[280px] shrink-0 aspect-video rounded-2xl overflow-hidden shadow-2xl border ${card.border}`}
                            >
                                <Image src={card.image} alt={card.badge} fill sizes="280px" className="object-cover" />
                                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 backdrop-blur-md border border-white/10 p-2 rounded-xl text-center">
                                    <span className="text-[9px] font-bold uppercase text-cyan-400 block">{card.badge}</span>
                                    <span className="text-[11px] font-bold text-white">{card.text}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service 1: Hand-Crafted Web Design */}
            <section className="relative py-20 md:py-32 border-t border-white/5">
                <div className="container px-6 mx-auto">
                    <div className="grid md:grid-cols-2 items-center gap-12 lg:gap-16">
                        <div className="order-2 md:order-1 relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950">
                            {/* Browser bar */}
                            <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-950 border-b border-white/10">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                <span className="text-[10px] text-white/50 font-mono ml-2">bornagainroofing.com</span>
                            </div>
                            <div className="relative w-full h-[calc(100%-33px)]">
                                <Image
                                    src="/portfolio/born-again-roofing.jpg"
                                    alt="Born Again Roofing - High Speed Next.js Website"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover object-top"
                                />
                            </div>
                        </div>

                        <div className="order-1 md:order-2 flex flex-col items-start">
                            <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-3">
                                Pillar 01 • Custom Web Architecture
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 uppercase tracking-tight leading-tight">
                                Hand-Crafted Websites. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                    Zero Clutter. Pure Speed.
                                </span>
                            </h2>
                            <p className="text-white/75 text-base md:text-lg mb-6 leading-relaxed">
                                No bloated WordPress templates that take 8 seconds to load on mobile. We hand-code custom Next.js websites that open instantly, look professional, and make your business the clear leader in Jackson and Central Mississippi.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full">
                                {[
                                    "Opens in < 0.5s on mobile",
                                    "Optimized for Google Core Web Vitals",
                                    "Direct 1-click call buttons",
                                    "Clean, custom-tailored branding"
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-2.5 text-sm text-white/80 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/web-design"
                                    className="px-7 py-3.5 bg-white text-slate-950 font-black rounded-full hover:bg-cyan-400 transition-colors uppercase tracking-wider text-xs"
                                >
                                    Explore Web Design
                                </Link>
                                <Link
                                    href="/free-audit"
                                    className="px-7 py-3.5 border border-white/20 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/10 text-white transition-colors"
                                >
                                    Get Free Website Audit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                                    href="tel:6013002004"
                                    className="px-7 py-3.5 border border-white/20 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/10 text-white transition-colors"
                                >
                                    Call (601) 300-2004
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
                            href="tel:6013002004"
                            className="w-full sm:w-auto px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 text-white font-bold transition-all uppercase tracking-wider text-xs"
                        >
                            Call Damein (601) 300-2004
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
