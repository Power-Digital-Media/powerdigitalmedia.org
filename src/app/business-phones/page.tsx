"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Phone,
    Users,
    Shield,
    ArrowRight,
    Check,
    Volume2,
    MessageSquare,
    PhoneCall,
    MapPin,
    CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQAccordion from "@/components/ui/FAQAccordion";
import AuditCTA from "@/components/sections/AuditCTA";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const phonePillars = [
    {
        title: "2-Minute Missed-Call SMS Rescue",
        subtitle: "Never Lose A Ladder Call",
        description:
            "When you're on a roof, in an excavator, or with a customer, unanswered calls trigger an instant text-back so the homeowner replies instead of calling your competitor.",
        features: [
            "Automatic Missed-Call SMS Text-Back",
            "After-Hours & Storm Surge Routing",
            "Voicemail-to-Text Transcription",
            "Instant Crew Lead Dispatch Alerts",
        ],
        icon: MessageSquare,
    },
    {
        title: "Capsule CRM Screen Pops",
        subtitle: "Know Who Is Calling",
        description:
            "Connect your business lines directly to Capsule CRM. Incoming calls pop up the customer's job history, notes, and open estimate before you even say hello.",
        features: [
            "Live Caller-ID CRM Contact Cards",
            "Automatic Call History & Note Logging",
            "1-Click Outbound Dialing From Desktop",
            "New Caller Lead Record Creation",
        ],
        icon: Users,
    },
    {
        title: "Auto-Attendant, Desk & Mobile App",
        subtitle: "Powered by ULTATEL Cloud",
        description:
            "Keep your personal cell number private while answering business calls from your truck iPhone/Android app, office desk phones, or Microsoft Teams.",
        features: [
            "Professional IVR Voice Menus & AI Routing",
            "iOS & Android Business Softphone App",
            "99.999% Carrier-Grade Uptime SLA",
            "On-Site Jackson Metro Setup & Number Porting",
        ],
        icon: Volume2,
    },
];

export default function BusinessPhonesPage() {
    const baseUrl = "https://powerdigitalmedia.org";
    const breadcrumbItems = [
        { name: "Home", url: `${baseUrl}/` },
        { name: "Business Phones & VoIP", url: `${baseUrl}/business-phones` },
    ];

    return (
        <main className="relative min-h-screen bg-[#06080f] text-white overflow-x-clip">
            <BreadcrumbSchema items={breadcrumbItems} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Cloud Business Phone Systems (VoIP) & Missed-Call SMS Setup",
                        provider: {
                            "@id": "https://powerdigitalmedia.org/#organization",
                        },
                        description:
                            "Cloud VoIP business phone systems, missed-call SMS text-back, Capsule CRM screen pops, and local on-site Jackson MS installation.",
                        category: "Telecommunications & Business VoIP",
                        serviceType: "Business VoIP Phone System Installation",
                        areaServed: {
                            "@type": "City",
                            name: "Jackson",
                            containedInPlace: {
                                "@type": "State",
                                name: "Mississippi",
                            },
                        },
                    }),
                }}
            />

            <Navbar />

            {/* HERO */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/[0.06] blueprint-grid">
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[760px] h-[360px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="container relative z-10 px-4 mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-7"
                        >
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
                                <Phone className="w-3.5 h-3.5 text-amber-400" />
                                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-amber-300">
                                    Authorized ULTATEL Partner • Jackson, MS On-Site Setup
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] text-white mb-6">
                                Every Missed Call Costs You{" "}
                                <span className="text-amber-400">Booked Jobs.</span>
                            </h1>

                            <p className="text-slate-300 text-base md:text-xl leading-relaxed mb-8 max-w-2xl">
                                National VoIP companies mail you a box of phones and wish you luck.
                                We install carrier-grade{" "}
                                <strong className="text-white">ULTATEL cloud phone systems</strong>{" "}
                                right here in Central Mississippi—wired to{" "}
                                <strong className="text-white">missed-call SMS rescue</strong> and{" "}
                                <strong className="text-white">Capsule CRM screen pops</strong>.
                            </p>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                                <Link
                                    href="/book"
                                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#06080f] font-black text-xs uppercase tracking-[0.16em] transition-all shadow-[0_14px_34px_rgba(245,158,11,0.28)]"
                                >
                                    Request Phone System Audit
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href="tel:6014462393"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-bold text-xs uppercase tracking-[0.15em] transition-all"
                                >
                                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                                    Call Damein: (601) 446-2393
                                </a>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/[0.08]">
                                {[
                                    { value: "99.999%", label: "Carrier Voice SLA" },
                                    { value: "< 2 Min", label: "Missed-Call SMS" },
                                    { value: "HIPAA", label: "& SOC 2 Compliant" },
                                    { value: "Local MS", label: "On-Site Install" },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="p-3.5 rounded-xl bg-[#0b0c10] border border-white/[0.07]"
                                    >
                                        <div className="text-lg font-black text-amber-400">
                                            {item.value}
                                        </div>
                                        <div className="text-[11px] text-slate-400 font-medium">
                                            {item.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Simulated Incoming Call + SMS Rescue Stage */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.1 }}
                            className="lg:col-span-5"
                        >
                            <div className="rounded-3xl bg-[#0b0c10] border border-white/10 p-6 sm:p-7 shadow-[0_28px_70px_rgba(0,0,0,0.65)] space-y-4">
                                <div className="flex items-center justify-between pb-4 border-b border-white/[0.07]">
                                    <div>
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 block">
                                            Live Call Simulation
                                        </span>
                                        <h2 className="text-base font-black uppercase text-white">
                                            PDM × ULTATEL + Capsule CRM
                                        </h2>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400 uppercase">
                                        Connected
                                    </span>
                                </div>

                                <div className="p-4 rounded-2xl bg-[#12141c] border border-amber-500/30">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                                            Incoming Caller Screen Pop
                                        </span>
                                        <span className="text-[10px] font-mono text-slate-400">
                                            (601) 555-0148
                                        </span>
                                    </div>
                                    <div className="text-sm font-bold text-white mb-1">
                                         Brandon Homeowner • Storm Roof Quote
                                    </div>
                                    <p className="text-xs text-slate-400">
                                        Capsule CRM Match: Submitted website roof form 4 mins ago •
                                        Crossgates Neighborhood
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-[#12141c] border border-emerald-500/25">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                                            Auto SMS Rescue (If Crew Is On Roof)
                                        </span>
                                        <span className="text-[10px] font-mono text-emerald-400">
                                            Sent in 14s
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-200 leading-relaxed bg-[#06080f] p-3 rounded-xl border border-white/[0.06]">
                                        &ldquo;Hey! Sorry we missed your call—our crew is on a job
                                        site right now. What address do you need us to take a look
                                        at? Damein / Dispatch is texting you right back.&rdquo;
                                    </p>
                                </div>

                                <div className="flex items-center gap-2.5 text-xs text-slate-400 pt-1">
                                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                                    <span>
                                        Installed &amp; tested in person across Jackson, Madison,
                                        Brandon, Clinton &amp; Flowood.
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3 PILLARS */}
            <section id="features" className="py-24 bg-[#080a12] border-b border-white/[0.06]">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="max-w-3xl mb-14">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-amber-400 block mb-3">
                            Built For Busy Field &amp; Office Teams
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                            Modern Business Phones That Close Deals.
                        </h2>
                        <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                            Separate work calls from your personal cell, route calls cleanly, and
                            log every conversation automatically.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {phonePillars.map((pillar, index) => (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="rounded-3xl bg-[#12141c] border border-white/[0.08] hover:border-amber-500/35 p-8 flex flex-col justify-between transition-all shadow-xl"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-6">
                                        <pillar.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 block mb-2">
                                        {pillar.subtitle}
                                    </span>
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                        {pillar.description}
                                    </p>
                                    <ul className="space-y-2.5 pt-5 border-t border-white/[0.07]">
                                        {pillar.features.map((f) => (
                                            <li
                                                key={f}
                                                className="flex items-center gap-2.5 text-xs font-medium text-slate-300"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LOCAL JACKSON ON-SITE ADVANTAGE */}
            <section className="py-24 bg-[#06080f] border-b border-white/[0.06]">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="rounded-3xl bg-[#0b0c10] border border-white/10 p-8 md:p-12 grid lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-7 space-y-5">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-amber-400 block">
                                Local Hands-On Deployment
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                                We Come To Your Office &amp; Test Every Line Live.
                            </h2>
                            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                                Big telecom companies ship you hardware and leave you stuck in a
                                call-center queue when your router drops voice packets. We come on
                                site in the Jackson Metro, port your existing business numbers with
                                zero downtime, configure your voice menus, and test your CRM screen
                                pops before we leave.
                            </p>
                        </div>
                        <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
                            {[
                                {
                                    title: "Zero-Downtime Porting",
                                    desc: "Keep the phone number on your trucks and yard signs while upgrading to cloud VoIP.",
                                },
                                {
                                    title: "Use Existing IP Phones",
                                    desc: "Reuse compatible Yealink, Polycom, or Cisco desk phones—or run 100% on mobile apps.",
                                },
                                {
                                    title: "Microsoft Teams Ready",
                                    desc: "Certified SBC direct routing if your office staff works inside Microsoft Teams.",
                                },
                                {
                                    title: "Direct Local Support",
                                    desc: "Call or text Damein in Jackson directly—backed by ULTATEL 24/7/365 NOC monitoring.",
                                },
                            ].map((box) => (
                                <div
                                    key={box.title}
                                    className="p-5 rounded-2xl bg-[#12141c] border border-white/[0.08]"
                                >
                                    <Shield className="w-5 h-5 text-amber-400 mb-2.5" />
                                    <h3 className="text-sm font-bold text-white mb-1.5">
                                        {box.title}
                                    </h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        {box.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SCOPED ROLLOUT OPTIONS */}
            <section id="investment" className="py-24 bg-[#080a12] scroll-mt-24 border-b border-white/[0.06]">
                <div className="container px-4 mx-auto max-w-5xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-amber-400 block mb-3">
                            Scoped Case-by-Case
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                            Installation &amp; Integration Options.
                        </h2>
                        <p className="text-slate-300 text-base md:text-lg">
                            Custom-scoped around your seat count, desk hardware, local number porting, and CRM workflow—with hands-on staff training included.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Tier 1 */}
                        <div className="p-8 md:p-10 rounded-3xl bg-[#0b0c10] border border-white/10 flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 block mb-2">
                                    Office &amp; Truck Mobility
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black uppercase text-white mb-3">
                                    Local Cloud VoIP Setup
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                    Professional IVR voice menus, number porting, desk phone
                                    provisioning, and iOS/Android mobile softphone setup.
                                </p>
                                <div className="pb-6 mb-6 border-b border-white/[0.08]">
                                    <span className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight block">
                                        Custom Office &amp; Crew Rollout
                                    </span>
                                    <span className="text-xs text-slate-400 block mt-1">
                                        Scoped by phone lines, desk hardware &amp; local installation
                                    </span>
                                </div>

                                <ul className="space-y-3 text-sm text-slate-200">
                                    {[
                                        "Custom IVR Auto-Attendant & Business Hours Routing",
                                        "Desk Phone & Mobile App Provisioning",
                                        "Voicemail-to-Email & SMS Transcriptions",
                                        "On-Site Jackson Metro Setup & Staff Training",
                                    ].map((f) => (
                                        <li key={f} className="flex items-center gap-2.5">
                                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href="/book"
                                className="w-full mt-8 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-bold text-xs uppercase tracking-[0.16em] text-center transition-all block"
                            >
                                Request Phone Audit
                            </Link>
                        </div>

                        {/* Tier 2 */}
                        <div className="p-8 md:p-10 rounded-3xl bg-[#12141c] border-2 border-amber-500/45 flex flex-col justify-between relative shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
                            <div className="absolute -top-3.5 right-8 bg-amber-500 text-[#06080f] font-black text-[10px] uppercase tracking-[0.18em] px-4 py-1 rounded-full">
                                Most Requested
                            </div>
                            <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 block mb-2">
                                    Full Pipeline Integration
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black uppercase text-white mb-3">
                                    VoIP + CRM &amp; SMS Rescue
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                    Unify your phone lines, missed-call text-back, and Capsule CRM
                                    screen pops so every inbound call becomes a tracked deal.
                                </p>
                                <div className="pb-6 mb-6 border-b border-white/[0.08]">
                                    <span className="text-2xl md:text-3xl font-black text-amber-400 uppercase tracking-tight block">
                                        Full Turnkey Integration
                                    </span>
                                    <span className="text-xs text-slate-400 block mt-1">
                                        Custom-scoped around your phone lines, SMS flows &amp; CRM pipeline
                                    </span>
                                </div>

                                <ul className="space-y-3 text-sm text-slate-200">
                                    {[
                                        "Everything in Local Cloud VoIP Setup",
                                        "Capsule CRM Incoming Caller Screen Pops",
                                        "Automated Missed-Call SMS Rescue Workflows",
                                        "Automatic Call History & Recording Rules",
                                        "Priority Local Network & Router QoS Tuning",
                                    ].map((f) => (
                                        <li key={f} className="flex items-center gap-2.5">
                                            <Check className="w-4 h-4 text-amber-400 shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href="/book"
                                className="w-full mt-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#06080f] font-black text-xs uppercase tracking-[0.16em] text-center transition-all block shadow-[0_12px_30px_rgba(245,158,11,0.25)]"
                            >
                                Schedule Phone &amp; CRM Build
                            </Link>
                        </div>
                    </div>

                    <div className="text-center mt-12 max-w-3xl mx-auto">
                        <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider">
                            *Disclaimer: ULTATEL cloud phone service is provided by ULTATEL. Power
                            Digital Media provides separate setup, onboarding, configuration,
                            training, device support, workflow consulting, and ongoing management
                            services. Any Power Digital Media setup, installation, support, or
                            management fees are separate from ULTATEL service charges and are not
                            ULTATEL installation fees.
                        </p>
                    </div>
                </div>
            </section>

            <AuditCTA />

            <FAQAccordion
                faqs={[
                    {
                        question: "Can I keep my existing business phone number?",
                        answer:
                            "Yes. We coordinate seamless number porting so the phone number printed on your trucks, trailers, and Google Business Profile stays 100% the same with zero downtime.",
                    },
                    {
                        question: "How do Capsule CRM screen pops work when a customer calls?",
                        answer:
                            "The moment your business line rings, our integration matches the caller ID against Capsule CRM and pops up their contact card, past project notes, and open quote right on your screen.",
                    },
                    {
                        question: "Do I have to buy physical desk phones?",
                        answer:
                            "Not unless you want them. Many contractors run 100% on the iOS/Android mobile app so crews can call and text from the business number without exposing personal cell numbers. If you already own modern Yealink, Polycom, or Cisco IP desk phones, we can usually reprogram them.",
                    },
                ]}
            />

            <Footer />
        </main>
    );
}
