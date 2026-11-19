"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    TrendingUp,
    CheckCircle2,
    ArrowRight,
    Star,
    MousePointerClick,
    Database,
    MailCheck,
    PhoneCall,
    Target,
    ShieldCheck,
    MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/ui/BookingModal";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Portfolio from "@/components/sections/Portfolio";
import AuditCTA from "@/components/sections/AuditCTA";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const tiers = [
    {
        id: "meta_micro",
        name: "Campaign Ignition",
        badge: "One-Time Buildout",
        scopeLabel: "Custom Funnel Launch",
        cadence: "Scoped to Your Trade & Offer • Ad Spend Paid Direct to Meta",
        description:
            "Complete Facebook & Instagram lead campaign buildout paired with high-converting local capture forms and instant CRM list sync.",
        features: [
            "Scroll-Stopping Local Ad Creatives",
            "Radius & Zip-Code Homeowner Targeting",
            "Meta Pixel + Server-Side Conversion API",
            "1-Tap Mobile Quote Capture Funnel",
            "Direct Capsule CRM & Transpond Sync",
        ],
    },
    {
        id: "meta_velocity",
        name: "Local Lead Engine",
        badge: "Most Popular",
        scopeLabel: "Monthly Lead Retainer",
        cadence: "Month-to-Month • Custom-Scoped by Territory",
        popular: true,
        description:
            "Ongoing monthly Meta ad management, creative refresh, and automated SMS/email speed-to-lead routing for contractors and local pros.",
        features: [
            "Everything in Campaign Ignition",
            "Ongoing Creative Testing & Ad Refresh",
            "Capsule CRM Pipeline & Deal Tracking",
            "Automated Transpond Lead Follow-Up",
            "Storm / Seasonal Demand Surge Campaigns",
            "Clear Monthly Cost-Per-Lead Reporting",
        ],
    },
    {
        id: "meta_strategy",
        name: "Market Takeover",
        badge: "Multi-City Scale",
        scopeLabel: "Multi-Market Retainer",
        cadence: "Month-to-Month • Custom-Scoped for Multi-County Growth",
        description:
            "Aggressive multi-city paid acquisition combined with Google Maps authority, retargeting sequences, and weekly revenue strategy.",
        features: [
            "Everything in Local Lead Engine",
            "Multi-County Territory Expansion Ads",
            "Warm Website & Video Retargeting Loops",
            "Past-Customer Reactivation Email Blasts",
            "Capsule Sales Opportunity Value Tracking",
            "Bi-Weekly Strategy Call with Damein",
        ],
    },
];

export default function MarketingPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const baseUrl = "https://powerdigitalmedia.org";
    const breadcrumbItems = [
        { name: "Home", url: `${baseUrl}/` },
        { name: "Paid Ads & Lead Generation", url: `${baseUrl}/marketing` },
    ];

    return (
        <main className="relative min-h-screen bg-[#06080f] overflow-x-clip text-white">
            <BreadcrumbSchema items={breadcrumbItems} />
            <Navbar />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Meta Ads & Local Lead Generation",
                        provider: {
                            "@id": "https://powerdigitalmedia.org/#organization",
                        },
                        description:
                            "High-converting Facebook and Instagram ad campaigns, local contractor lead funnels, and automated Capsule CRM pipelines in Jackson, MS.",
                        category: "Digital Marketing",
                        serviceType: "Paid Social Advertising & Lead Generation",
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

            {/* HERO */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/[0.06] blueprint-grid">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[780px] h-[360px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="container relative z-10 px-4 mx-auto max-w-5xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
                        <Target className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-amber-300">
                            Targeted Local Lead Generation • Jackson, MS
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-white mb-6">
                        Stop Donating Money To{" "}
                        <span className="text-amber-400">&ldquo;Boosted Posts.&rdquo;</span>
                    </h1>

                    <p className="text-slate-300 max-w-3xl mx-auto text-base md:text-xl leading-relaxed mb-10">
                        Boosting a Facebook post gets likes from people three states away—not
                        paying jobs. We engineer precision{" "}
                        <strong className="text-white">Facebook &amp; Instagram lead funnels</strong>{" "}
                        targeted to Central Mississippi homeowners and sync every quote request
                        straight into your phone and CRM.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/free-audit"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#06080f] font-black uppercase tracking-[0.16em] text-xs transition-all shadow-[0_14px_34px_rgba(245,158,11,0.28)]"
                        >
                            Get Free Ad &amp; Funnel Audit
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setIsBookingOpen(true)}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-bold uppercase tracking-[0.15em] text-xs transition-all"
                        >
                            Book 15-Min Strategy Call
                        </button>
                        <a
                            href="tel:6014462393"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 text-slate-300 hover:text-amber-300 font-mono font-bold uppercase tracking-wider text-xs transition-colors"
                        >
                            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                            (601) 446-2393
                        </a>
                    </div>

                    {/* Trust Strip */}
                    <div className="mt-12 pt-8 border-t border-white/[0.07] flex flex-wrap items-center justify-center gap-4 text-xs">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b0c10] border border-white/10 text-slate-300 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            Month-to-Month • Zero Long-Term Lock-In
                        </span>
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b0c10] border border-white/10 text-slate-300 font-medium">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                            BBB A+ Accredited Studio
                        </span>
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b0c10] border border-white/10 text-slate-300 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            Madison • Brandon • Clinton • Flowood • Pearl
                        </span>
                    </div>
                </div>
            </section>

            {/* 4-STEP LEAD PIPELINE */}
            <section className="py-24 bg-[#080a12] border-b border-white/[0.06]">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-amber-400 block mb-3">
                            Speed-To-Lead Architecture
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                            From Local Scroll To Booked Estimate In 4 Steps.
                        </h2>
                        <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                            Ad clicks mean nothing if leads sit in a spreadsheet for 48 hours. We
                            build the ad creative, the landing capture, and the instant follow-up
                            together.
                        </p>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-12 items-center">
                        <div className="lg:col-span-7 space-y-4">
                            {[
                                {
                                    phase: "Step 01",
                                    title: "Neighborhood-Specific Scroll Hooks",
                                    desc: "Real jobsite visuals, before/after roof & dirt-work proof, and direct offers targeted to high-value Central MS zip codes.",
                                    icon: MousePointerClick,
                                },
                                {
                                    phase: "Step 02",
                                    title: "1-Tap Mobile Quote Capture",
                                    desc: "Frictionless native lead forms and sub-second landing pages pre-fill homeowner contact details so mobile conversion rates jump.",
                                    icon: TrendingUp,
                                },
                                {
                                    phase: "Step 03",
                                    title: "Instant Capsule CRM Routing",
                                    desc: "Every lead lands inside Capsule CRM in under 300ms—tagged by city, service needed, and campaign source.",
                                    icon: Database,
                                },
                                {
                                    phase: "Step 04",
                                    title: "Automated SMS & Email Warm-Up",
                                    desc: "Immediate confirmation text and Transpond email sequence warms up the homeowner while alerting your phone to call and close.",
                                    icon: MailCheck,
                                },
                            ].map((step) => (
                                <div
                                    key={step.phase}
                                    className="p-6 rounded-2xl bg-[#12141c] border border-white/[0.08] hover:border-amber-500/35 transition-all flex gap-5 items-start"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
                                        <step.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2.5 mb-1">
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                                                {step.phase}
                                            </span>
                                            <h3 className="font-bold text-base text-white">
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-slate-300 leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-5 flex justify-center">
                            <div className="relative p-4 rounded-3xl border border-white/10 bg-[#0b0c10] shadow-2xl max-w-md w-full">
                                <div className="flex items-center justify-between px-3 pb-3 mb-3 border-b border-white/[0.07]">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                                            Meta Ads → Capsule CRM Active
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-400">
                                        &lt;300ms Sync
                                    </span>
                                </div>

                                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#06080f] border border-white/[0.06]">
                                    <Image
                                        src="/images/marketing_telemetry_system.png"
                                        alt="Automated paid social funnel routing directly into Capsule CRM"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VERIFIED CLIENT REVIEWS */}
            <section className="py-24 bg-[#06080f] border-b border-white/[0.06]">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="text-center mb-14">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-amber-400 block mb-3">
                            Verified Mississippi Results
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                            5.0★ Rated By Local Operators.
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            {
                                quote:
                                    "Took my marketing program from the dumps all the way to the moon. Very responsive and results oriented. I highly recommend!!!",
                                author: "Scott Lowery",
                                role: "Owner, Geaux Pro Outdoors (Bentonia, MS)",
                            },
                            {
                                quote:
                                    "Damein was made to do this and does everything with a spirit of excellence. He’s professional and reasonable. Looking for a web guy he is him.",
                                author: "Jeff Johnson",
                                role: "In His Grip Ministries (Central MS)",
                            },
                            {
                                quote:
                                    "Damein is always right on time. He can figure out what im looking for quickly. Im a picky person and he is patient and professional. Highly recommend.",
                                author: "Joey Nash",
                                role: "Mississippi Business Owner",
                            },
                        ].map((rev) => (
                            <div
                                key={rev.author}
                                className="p-7 rounded-3xl bg-[#0b0c10] border border-white/10 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1 text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-4 h-4 fill-amber-400 text-amber-400"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/25">
                                            Google Review
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-200 italic leading-relaxed mb-6">
                                        &ldquo;{rev.quote}&rdquo;
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-white/[0.07]">
                                    <div className="font-bold text-sm text-white">{rev.author}</div>
                                    <div className="text-xs text-slate-400">{rev.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CUSTOM CAMPAIGN SCOPES */}
            <section id="tiers" className="py-24 bg-[#080a12] border-b border-white/[0.06]">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-amber-400 block mb-3">
                            Scoped Case-by-Case • Month-to-Month
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                            Campaign Engagement Options.
                        </h2>
                        <p className="text-slate-300 text-base md:text-lg">
                            Every campaign is custom-scoped around your service area, season, and growth targets. Ad spend goes 100% directly to Meta from your own ad account—no hidden media markups and no 12-month contracts.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {tiers.map((tier, index) => (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: index * 0.08 }}
                                className={`relative p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                                    tier.popular
                                        ? "bg-[#12141c] border-2 border-amber-500/50 shadow-[0_24px_60px_rgba(0,0,0,0.6)] lg:-translate-y-2"
                                        : "bg-[#0b0c10] border-white/10 hover:border-white/20"
                                }`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-[#06080f] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em]">
                                        Most Popular For Contractors
                                    </div>
                                )}

                                <div>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 block mb-2">
                                        {tier.badge}
                                    </span>
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">
                                        {tier.name}
                                    </h3>
                                    <div className="pb-5 mb-5 border-b border-white/[0.08]">
                                        <span className="text-2xl font-black text-amber-400 uppercase tracking-tight block">
                                            {tier.scopeLabel}
                                        </span>
                                        <span className="text-xs text-slate-400 block mt-1 font-medium">
                                            {tier.cadence}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                                        {tier.description}
                                    </p>

                                    <ul className="space-y-3 mb-8">
                                        {tier.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-2.5 text-xs font-medium text-slate-200"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsBookingOpen(true)}
                                        className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.15em] text-xs transition-all flex items-center justify-center gap-2 ${
                                            tier.popular
                                                ? "bg-amber-500 hover:bg-amber-400 text-[#06080f] shadow-[0_12px_28px_rgba(245,158,11,0.25)]"
                                                : "bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white"
                                        }`}
                                    >
                                        Schedule Campaign Call
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                    <Link
                                        href="/marketing/discovery"
                                        className="w-full py-3 rounded-xl border border-white/[0.08] hover:border-amber-500/35 text-slate-400 hover:text-amber-300 font-bold uppercase tracking-[0.14em] text-[10px] transition-all flex items-center justify-center"
                                    >
                                        Complete Campaign Brief
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Portfolio titleAs="h2" />

            <AuditCTA />

            <FAQAccordion
                faqs={[
                    {
                        question: "How is ad spend handled versus your campaign management?",
                        answer:
                            "Our campaign management is custom-scoped case-by-case around your territory, creative volume, and CRM automation—covering campaign architecture, scroll-stopping ad creatives, landing form tracking, and direct Capsule CRM sync. Your ad spend is paid directly to Meta from your own ad account with 100% transparency and zero agency media markups.",
                    },
                    {
                        question: "What ad platforms work best for Mississippi contractors & service pros?",
                        answer:
                            "Facebook and Instagram (Meta) paired with Google Local Map Pack SEO consistently deliver the lowest cost-per-quote for roofing, dirt work, HVAC, lawn care, and local restaurants across Central Mississippi.",
                    },
                    {
                        question: "Are there 6-month or 12-month agency contracts?",
                        answer:
                            "Never. Our monthly management runs month-to-month. We earn our seat by putting real quote requests and booked calls into your pipeline.",
                    },
                ]}
            />

            <Footer />

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </main>
    );
}
