"use client";

import { m } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import TerminalWindow from "@/components/ui/web-design/TerminalWindow";
import Link from "next/link";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";
import DashboardProof from "@/components/ui/DashboardProof";
import SystemSchematic from "@/components/ui/shared/SystemSchematic";

const proofCards = [
    {
        image: "/images/proof/Growth_Proof/5.webp",
        badge: "Verified Traffic",
        text: "35m 12s Avg. Engagement",
        border: "border-accent/40",
        bar: "from-accent to-blue-500",
        shadow: "shadow-[0_0_20px_rgba(34,211,238,0.2)]",
        badgeColor: "text-accent",
        badgeBorder: "border-accent/50",
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
        <div id="services">
            {/* Section: The Reach (Dashboard Proof) */}
            <section className="relative flex flex-col justify-start pt-24 pb-12 md:pt-40 md:pb-32 overflow-hidden min-h-[700px] md:min-h-[800px]">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    <DashboardProof />
                    {/* Desktop gradient overlay */}
                    <div className="hidden md:block absolute inset-0 pointer-events-none w-[60%] right-0 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
                    {/* Mobile dark overlay to ensure readability */}
                    <div className="md:hidden absolute inset-0 bg-gradient-to-b from-background via-background/95 to-slate-950 pointer-events-none z-10" />
                </div>

                {/* Content Layer with strict gap spacing */}
                <div className="relative z-20 flex flex-col gap-16 md:gap-0 w-full mt-4 md:mt-0">

                    {/* Text Container */}
                    <div className="container px-6 md:px-6 mx-auto">
                        <div className="flex justify-center md:justify-end">
                            <m.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="max-w-xl flex flex-col items-center md:items-end w-full"
                            >
                                <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[9px] md:text-xs mb-4 block text-center md:text-right w-full">
                                    Real Mississippi Results
                                </span>
                                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 md:mb-8 tracking-tight uppercase leading-none text-white text-center md:text-right w-full">
                                    The Proof.
                                </h2>
                                <p className="text-base md:text-xl text-foreground/80 mb-8 max-w-md leading-relaxed font-normal text-left md:text-right w-full">
                                    Real, verified analytics. Over <strong className="text-white">35 minutes average engagement</strong> and <strong className="text-cyan-400">+3,095% growth</strong> in trackable customer actions. We build websites that don&apos;t just look great—they consistently drive qualified calls.
                                </p>
                                <ul className="space-y-3 mb-10 flex flex-col items-start md:items-end w-full">
                                    {["Page-One Google Map Placements", "Sub-Second Mobile Load Times", "High-Converting Quote Funnels"].map((f) => (
                                        <li key={f} className="flex items-center gap-3 text-sm md:text-base font-semibold text-white/75 w-full justify-start md:justify-end text-left md:text-right">
                                            <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 shadow-[0_0_8px_#22d3ee]" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/marketing" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)] rounded-full transition-all font-bold uppercase tracking-widest text-[10px] active:scale-95 group">
                                    See Growth Strategy <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </m.div>
                        </div>
                    </div>

                    {/* Mobile Scrolling Marquee Banner */}
                    <div className="flex md:hidden w-full flex-col pb-4 overflow-hidden relative z-20 mt-4">
                        <style dangerouslySetInnerHTML={{__html: `
                            @keyframes marquee {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-50%); }
                            }
                            .animate-marquee {
                                display: flex;
                                width: max-content;
                                animation: marquee 35s linear infinite;
                            }
                            .animate-marquee:active, .animate-marquee:hover {
                                animation-play-state: paused;
                            }
                        `}} />

                        <div className="w-full overflow-hidden py-2">
                            <div className="animate-marquee flex gap-4 pr-4">
                                {proofCards.map((card, idx) => (
                                    <div
                                        key={`set1-${idx}`}
                                        className={`relative w-[280px] sm:w-[320px] shrink-0 aspect-video rounded-2xl overflow-hidden shadow-2xl border ${card.border} glass-card`}
                                    >
                                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.bar} z-20`} />
                                        <Image src={card.image} alt={card.badge} fill sizes="320px" className="object-cover" />

                                        <div className={`absolute bottom-3 left-3 right-3 bg-slate-950/95 backdrop-blur-xl border ${card.badgeBorder} ${card.badgeColor} px-4 py-2.5 rounded-xl text-center ${card.shadow} z-30`}>
                                            <span className="text-[9px] font-black tracking-widest uppercase block mb-0.5">{card.badge}</span>
                                            <span className="text-[11px] font-bold opacity-95 text-white leading-none">{card.text}</span>
                                        </div>
                                    </div>
                                ))}

                                {proofCards.map((card, idx) => (
                                    <div
                                        key={`set2-${idx}`}
                                        className={`relative w-[280px] sm:w-[320px] shrink-0 aspect-video rounded-2xl overflow-hidden shadow-2xl border ${card.border} glass-card`}
                                    >
                                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.bar} z-20`} />
                                        <Image src={card.image} alt={card.badge} fill sizes="320px" className="object-cover" />

                                        <div className={`absolute bottom-3 left-3 right-3 bg-slate-950/95 backdrop-blur-xl border ${card.badgeBorder} ${card.badgeColor} px-4 py-2.5 rounded-xl text-center ${card.shadow} z-30`}>
                                            <span className="text-[9px] font-black tracking-widest uppercase block mb-0.5">{card.badge}</span>
                                            <span className="text-[11px] font-bold opacity-95 text-white leading-none">{card.text}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 1: Hand-Crafted Web Design */}
            <section className="relative flex flex-col justify-start pt-16 pb-12 md:pt-36 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-background/60 to-background" />
                </div>

                <div className="container relative z-10 px-6 mx-auto">
                    <div className="grid md:grid-cols-2 items-center gap-16">
                        <m.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1 relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 w-full shadow-2xl"
                        >
                            <Image
                                src="/portfolio/born-again-roofing.jpg"
                                alt="High Speed Web Design by Power Digital Media"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                        </m.div>

                        <m.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="order-1 md:order-2 flex flex-col items-center md:items-start w-full"
                        >
                            <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[9px] md:text-xs mb-4 block text-center md:text-left w-full">
                                Web Design &amp; Local SEO
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase leading-tight text-center md:text-left w-full text-white">
                                Custom Web Architecture.
                            </h2>
                            <p className="text-base md:text-lg text-foreground/75 mb-8 max-w-md leading-relaxed text-left w-full">
                                Blazing fast, custom Next.js websites built from scratch. Designed to make your company look like the undisputed market leader while scoring 95+ on Google mobile speed.
                            </p>
                            <div className="grid grid-cols-2 gap-3 mb-10 w-full text-left">
                                {["<0.5s Mobile Load", "Google 3-Pack Schema", "Frictionless Call Forms", "Zero Broken Plugins"].map((f) => (
                                    <div key={f} className="flex items-center gap-2 text-xs font-semibold text-white/80 justify-start">
                                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                        {f}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center md:justify-start">
                                <Link href="/web-design" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 font-black rounded-full hover:bg-cyan-400 transition-all uppercase tracking-widest text-[10px] text-center block">
                                    Explore Web Design
                                </Link>
                                <Link href="/free-audit" className="w-full sm:w-auto px-8 py-4 border border-white/15 rounded-full font-bold uppercase tracking-widest text-[10px] text-white/80 hover:text-white hover:bg-white/10 transition-all text-center block">
                                    Get Free Audit
                                </Link>
                            </div>
                        </m.div>
                    </div>
                </div>
            </section>

            {/* Service 2: Proprietary PinDrop™ Contractor Tech */}
            <section className="relative flex flex-col justify-start pt-16 pb-12 md:pt-36 md:pb-32 overflow-hidden bg-slate-950/40">
                <div className="container relative z-10 px-6 mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                        <m.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-xl flex flex-col items-center md:items-start mx-auto md:mx-0 w-full"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
                                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">PDM Exclusive Technology</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase leading-tight text-center md:text-left w-full text-white">
                                PinDrop™ Field Engine.
                            </h2>
                            <p className="text-base md:text-lg text-foreground/75 mb-8 leading-relaxed text-left w-full">
                                The exclusive field tool built for contractors and service pros. Your crew drops a GPS pin and snaps a photo on their phone. PinDrop™ automatically updates your website&apos;s map, syncs proof to Google, and texts your customer for an instant 5-star review.
                            </p>
                            <ul className="space-y-3 mb-10 flex flex-col items-start w-full">
                                {["1-Tap GPS Job Site Drop Pins", "Live Interactive Map on Your Website", "Automated 5-Star SMS Review Requests", "Before & After Photo Showcase Sync"].map((f) => (
                                    <li key={f} className="flex items-center gap-3 text-sm md:text-base font-semibold text-white/80 justify-start text-left w-full">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center md:justify-start">
                                <Link
                                    href="/pindrop"
                                    className="w-full sm:w-auto px-8 py-4 bg-cyan-400 text-slate-950 font-black rounded-full hover:bg-white transition-all uppercase tracking-widest text-[10px] active:scale-95 text-center block shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                                >
                                    See How PinDrop™ Works
                                </Link>
                                <a
                                    href="tel:6013002004"
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border border-white/15 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 text-white transition-all group active:scale-95"
                                >
                                    Call (601) 300-2004
                                </a>
                            </div>
                        </m.div>

                        <div className="w-full relative aspect-[4/3] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                            <Image
                                src="/portfolio/growth-engine-real.webp"
                                alt="PinDrop Field Tech interface"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 3: CRM & Lead Follow-Up Automation */}
            <section className="relative flex flex-col justify-start pt-16 pb-12 md:pt-36 md:pb-32 overflow-hidden">
                <div className="container relative z-10 px-6 mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                        <m.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-xl flex flex-col items-center md:items-start mx-auto md:mx-0 w-full"
                        >
                            <span className="text-emerald-400 font-bold tracking-[0.3em] uppercase text-[9px] md:text-xs mb-4 block text-center md:text-left w-full">
                                Lead Management &amp; Follow-Up
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase leading-tight text-center md:text-left w-full text-white">
                                CRM &amp; Automation.
                            </h2>
                            <p className="text-base md:text-lg text-foreground/75 mb-8 leading-relaxed text-left w-full">
                                We connect your website directly with Capsule CRM and Transpond automation so every quote request, form submission, and customer inquiry is captured, organized, and automatically followed up with.
                            </p>
                            <ul className="space-y-3 mb-10 flex flex-col items-start w-full">
                                {["Capsule CRM Setup & Organization", "Transpond Automated Email Sequences", "Instant Lead Alerts to Your Phone", "Zero Lost Follow-Ups"].map((f) => (
                                    <li key={f} className="flex items-center gap-3 text-sm md:text-base font-semibold text-white/80 justify-start text-left w-full">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center md:justify-start">
                                <Link
                                    href="/custom-applications"
                                    className="w-full sm:w-auto px-8 py-4 bg-emerald-400 text-slate-950 font-black rounded-full hover:bg-white transition-all uppercase tracking-widest text-[10px] active:scale-95 text-center block shadow-[0_0_30px_rgba(52,211,153,0.2)]"
                                >
                                    Explore CRM Systems
                                </Link>
                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border border-white/15 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 text-white transition-all group active:scale-95"
                                >
                                    Book Strategy Call
                                </button>
                            </div>
                        </m.div>

                        <div className="w-full flex justify-center">
                            <TerminalWindow />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: The Complete Growth System */}
            <section id="the-system" className="relative min-h-[80vh] flex flex-col items-center justify-center pt-16 pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
                </div>

                <div className="container relative z-10 px-6 mx-auto text-center">
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[9px] md:text-xs mb-4 block">
                            All Connected in One Ecosystem
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none text-white">
                            Your Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 text-glow-cyan">Command Center.</span>
                        </h2>
                        <p className="text-base sm:text-xl md:text-2xl text-foreground/75 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
                            We give Mississippi businesses the complete digital foundation: <span className="text-cyan-400 font-semibold">Blazing-fast Web Design</span>, <span className="text-cyan-400 font-semibold">PinDrop™ Job Site Mapping</span>, and <span className="text-cyan-400 font-semibold">Automated CRM Lead Follow-up</span>.
                        </p>
                        
                        <SystemSchematic />

                        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-16">
                            <Link href="/free-audit" className="px-10 py-5 bg-cyan-400 text-slate-950 font-black rounded-full shadow-[0_0_40px_rgba(34,211,238,0.2)] hover:bg-white hover:scale-105 transition-all uppercase tracking-widest text-[10px] active:scale-95">
                                Get Free Website Audit
                            </Link>
                            <a
                                href="tel:6013002004"
                                className="px-10 py-5 border border-white/15 rounded-full hover:bg-white/10 transition-all font-bold uppercase tracking-widest text-[10px] text-white active:scale-95"
                            >
                                Call (601) 300-2004
                            </a>
                        </div>
                    </m.div>
                </div>
            </section>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </div>
    );
}
