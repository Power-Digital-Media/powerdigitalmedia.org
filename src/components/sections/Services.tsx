"use client";

import { m } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import TerminalWindow from "@/components/ui/web-design/TerminalWindow";
import PhoneConsole from "@/components/ui/shared/PhoneConsole";
import Link from "next/link";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";
import DashboardProof from "@/components/ui/DashboardProof";
import SystemSchematic from "@/components/ui/shared/SystemSchematic";

const proofCards = [
    {
        image: "/images/proof/Growth_Proof/5.webp",
        badge: "Verified GA4 Data",
        text: "35m 12s Avg. Engagement",
        border: "border-accent/40",
        bar: "from-accent to-blue-500",
        shadow: "shadow-[0_0_20px_rgba(34,211,238,0.2)]",
        badgeColor: "text-accent",
        badgeBorder: "border-accent/50",
    },
    {
        image: "/images/proof/Growth_Proof/4.webp",
        badge: "Event Tracking",
        text: "+3,095% Performance Growth",
        border: "border-purple-500/40",
        bar: "from-purple-500 to-fuchsia-400",
        shadow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
        badgeColor: "text-purple-400",
        badgeBorder: "border-purple-500/50",
    },
    {
        image: "/images/proof/Growth_Proof/3.webp",
        badge: "High-Volume Capture",
        text: "Dominant Traffic Pipelines",
        border: "border-blue-500/40",
        bar: "from-blue-500 to-cyan-400",
        shadow: "shadow-[0_0_20px_rgba(59,130,246,0.2)]",
        badgeColor: "text-blue-400",
        badgeBorder: "border-blue-500/50",
    },
    {
        image: "/images/proof/Growth_Proof/1.webp",
        badge: "Baseline Indexing",
        text: "Total Search Authority",
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
                                <span className="text-accent font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block hover:text-white transition-colors text-center md:text-right w-full">Undeniable Metrics</span>
                                <h2 className="text-4xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight uppercase leading-none text-white text-center md:text-right w-full">The Reach.</h2>
                                <p className="text-base md:text-xl text-foreground/80 mb-8 max-w-md leading-relaxed text-balance font-light text-left md:text-right w-full">
                                    Real, raw data. <strong className="text-white">35M 12S average engagement time</strong> and <strong className="text-accent">+3,095% event tracking growth.</strong> We engineer digital infrastructure that commands absolute attention and converts raw traffic into captured audiences.
                                </p>
                                <ul className="space-y-4 mb-10 flex flex-col items-start md:items-end w-full">
                                    {["Data-Driven SEO Protocol", "Page-One Search Placement", "High-Converting Organic Traffic"].map((f) => (
                                        <li key={f} className="flex items-center gap-3 text-sm md:text-lg font-medium text-white/50 w-full justify-start md:justify-end text-left md:text-right">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/marketing" className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)] rounded-full transition-all font-bold uppercase tracking-widest text-[10px] active:scale-95 group">
                                    Analyze Our Methodology <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </m.div>
                        </div>
                    </div>

                    {/* --- MOBILE OPTIMIZED AUTOMATED SCROLLING MARQUEE BANNER --- */}
                    <div className="flex md:hidden w-full flex-col pb-4 overflow-hidden relative z-20 mt-4">
                        {/* Self-contained CSS Marquee Animations for 100% hardware acceleration */}
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
                                {/* First Set of Cards */}
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

                                {/* Second Set of Cards (Duplicates for infinite loop) */}
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

            {/* Section 1: Custom Applications */}
            <section className="relative flex flex-col justify-start pt-20 pb-12 md:pt-40 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-950/80 to-slate-950/80" />
                    <div className="absolute inset-0 cyber-grid opacity-10" />
                </div>

                <div className="container relative z-10 px-6 mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                        <m.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-xl flex flex-col items-center md:items-start mx-auto md:mx-0 w-full"
                        >
                            <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block text-center md:text-left w-full">CRM & Lead Automation</span>
                            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight uppercase leading-none text-center md:text-left w-full">CRM & Automation.</h2>
                            <p className="text-base md:text-xl text-foreground/70 mb-8 leading-relaxed font-light text-left w-full">
                                We deploy and configure Capsule CRM and Transpond automation so every lead from your website, social media, and offline events is captured, organized, and followed up on automatically.
                            </p>
                            <ul className="space-y-4 mb-10 flex flex-col items-start w-full">
                                {["Capsule CRM Setup", "Transpond Marketing Automation", "Automated Pipeline Workflows", "Bespoke Lead Capture Integrations"].map((f) => (
                                     <li key={f} className="flex items-center gap-3 text-sm md:text-lg font-medium text-white/60 justify-start text-left w-full">
                                         <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                         {f}
                                     </li>
                                 ))}
                            </ul>
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center md:justify-start">
                                <Link
                                    href="/custom-applications"
                                    className="w-full sm:w-auto px-8 py-4 bg-cyan-400 text-slate-950 font-black rounded-full hover:bg-white transition-all uppercase tracking-widest text-[10px] active:scale-95 text-center block"
                                >
                                    Initialize Platform Build
                                </Link>
                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border border-white/10 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all group active:scale-95"
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

            {/* Section 2: Bespoke Web Design */}
            <section className="relative flex flex-col justify-start pt-8 pb-12 md:pt-40 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-background/60 to-background" />
                    <div className="absolute inset-0 cyber-grid opacity-10" />
                </div>

                <div className="container relative z-10 px-6 mx-auto">
                    <div className="grid md:grid-cols-2 items-center gap-16">
                        <m.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1 relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 w-full"
                        >
                            <Image
                                src="/images/growth-data-overlay.webp"
                                alt="High Velocity Web Design Architecture"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
                        </m.div>

                        <m.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="order-1 md:order-2 flex flex-col items-center md:items-start w-full"
                        >
                            <span className="text-blue-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block text-center md:text-left w-full">Web Architecture</span>
                            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight uppercase leading-none text-center md:text-left w-full">The Build.</h2>
                            <p className="text-base md:text-xl text-foreground/70 mb-8 max-w-md leading-relaxed font-light text-left w-full">
                                Blistering fast web architectures built on Next.js 14 and React. Designed to project immediate aesthetic prestige and deliver massive SEO performance.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-10 w-fit mx-auto md:mx-0 text-left">
                                {["0.4s Interaction Load", "Edge CDN Distribution", "Semantic SEO Structure", "Tesla-Level Aesthetics"].map((f) => (
                                    <div key={f} className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-white/40 justify-start">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                                        {f}
                                    </div>
                                ))}
                            </div>
                            <Link href="/web-design" className="inline-flex items-center gap-4 px-10 py-5 bg-white text-slate-950 font-black rounded-full hover:bg-blue-400 hover:text-white transition-all uppercase tracking-widest text-[10px] w-full sm:w-auto justify-center">
                                Explore Web Design <ArrowRight className="w-4 h-4" />
                            </Link>
                        </m.div>
                    </div>
                </div>
            </section>

            {/* Section 3: Cloud VoIP Phones */}
            <section className="relative flex flex-col justify-start pt-8 pb-12 md:pt-40 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-950/80 to-slate-950/80" />
                    <div className="absolute inset-0 cyber-grid opacity-10" />
                </div>

                <div className="container relative z-10 px-6 mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                        <m.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-xl flex flex-col items-center md:items-start mx-auto md:mx-0 w-full"
                        >
                            <span className="text-amber-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block text-center md:text-left w-full">Cloud Telephony</span>
                            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight uppercase leading-none text-center md:text-left w-full">VoIP & Cloud Phones.</h2>
                            <p className="text-base md:text-xl text-foreground/70 mb-8 leading-relaxed font-light text-left w-full">
                                We deploy enterprise-grade Ultatel cloud phone systems integrated directly with your Capsule CRM and website. Get professional call routing (IVR menus), voice AI call agents, and 100% human local on-site support.
                            </p>
                            <ul className="space-y-4 mb-10 flex flex-col items-start w-full">
                                {["Voice AI Call Agent Answering", "Capsule CRM Screen Pops & Logging", "Microsoft Teams Certified SBC", "99.999% Voice Uptime Guarantee"].map((f) => (
                                     <li key={f} className="flex items-center gap-3 text-sm md:text-lg font-medium text-white/60 justify-start text-left w-full">
                                         <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                                         {f}
                                     </li>
                                 ))}
                            </ul>
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center md:justify-start">
                                <Link
                                    href="/business-phones"
                                    className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-white hover:text-slate-950 text-white font-black rounded-full transition-all uppercase tracking-widest text-[10px] active:scale-95 text-center block shadow-[0_0_30px_rgba(245,158,11,0.2)] border border-amber-500/20"
                                >
                                    Explore VoIP Phones
                                </Link>
                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border border-white/10 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all group active:scale-95"
                                >
                                    Book Phone Audit
                                </button>
                            </div>
                        </m.div>

                        <div className="w-full flex justify-center">
                            <PhoneConsole />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: The System -> Ecosystem Bridge */}
            <section id="the-system" className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center pt-12 pb-0 md:pt-16 md:pb-0 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop"
                        alt="Digital Systems"
                        fill
                        sizes="100vw"
                        className="object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    {/* Ecosystem Bridge Grid */}
                    <div className="absolute inset-0 cyber-grid opacity-10" />
                </div>

                <div className="container relative z-10 px-6 mx-auto text-center">
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block">Core Protocol</span>
                        <h2 className="text-4xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-none">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-glow-cyan">System.</span>
                        </h2>
                        <p className="text-lg md:text-3xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light text-balance">
                            We deploy the ultimate local business infrastructure: <span className="text-cyan-400 font-medium tracking-tight">Blistering-fast Websites</span>, <span className="text-cyan-400 font-medium tracking-tight">Automated Lead CRM</span>, and <span className="text-cyan-400 font-medium tracking-tight">Cloud Business Phone Systems</span>. Everything synced, everything simple, backed by 100% local support.
                        </p>
                        
                        <SystemSchematic />

                        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-16">
                            <Link href="/client-discovery" className="px-10 py-5 bg-cyan-400 text-slate-950 font-black rounded-full shadow-[0_0_40px_rgba(34,211,238,0.2)] hover:scale-105 transition-all uppercase tracking-widest text-[10px] active:scale-95">
                                Initialize Protocol
                            </Link>
                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="px-10 py-5 border border-white/10 rounded-full hover:bg-white/5 transition-all font-bold uppercase tracking-widest text-[10px] active:scale-95"
                            >
                                Get A Consultation
                            </button>
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
