"use client";

import { motion } from "framer-motion";
import {
    Zap,
    Shield,
    ArrowRight,
    MapPin,
    X,
    Check,
    Camera,
    PhoneCall,
    Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuditCTA from "@/components/sections/AuditCTA";

const capabilities = [
    {
        title: "Sub-Second Next.js Speed",
        description:
            "Hand-engineered web platforms scoring 95–99/100 on mobile PageSpeed. Zero bloated WordPress themes or fragile third-party plugins.",
        icon: Zap,
    },
    {
        title: "PDM PinDrop™ + PinCam™ Apps",
        description:
            "Our proprietary contractor field apps turn daily roof, HVAC, and dirt-work job sites into GPS neighborhood proof, PDF photo reports, and 5-star reviews.",
        icon: Camera,
    },
    {
        title: "Google Map Pack Authority",
        description:
            "Hyper-local schema, neighborhood project signals, and review velocity engineered to put your business in the Top 3 across Jackson, Madison, Brandon & Clinton.",
        icon: MapPin,
    },
    {
        title: "CRM, Ordering & Lead Rescue",
        description:
            "Direct Capsule CRM pipelines, 0%-commission Square checkouts, and automated 2-minute SMS lead follow-up so no inquiry slips through the cracks.",
        icon: Shield,
    },
];

const theyDeliver = [
    "Slow, cookie-cutter WordPress templates (35/100 mobile speed)",
    "40+ fragile plugins that break or get hacked",
    "Zero connection to what your crews do in the field",
    "30% marketplace commissions or broken lead forms",
    "Out-of-state ticket queues when something breaks",
];

const weEngineer = [
    "Custom Next.js builds with 95+ Mobile PageSpeed",
    "Proprietary PDM PinDrop™ & PinCam™ jobsite apps",
    "Central MS Google Maps 3-Pack & AI Search optimization",
    "2-minute missed-call SMS rescue + Capsule CRM sync",
    "Direct phone & in-person access to Damein in Jackson, MS",
];

export default function AboutClient() {
    return (
        <main className="relative min-h-screen bg-[#06080f] text-white">
            <Navbar />

            {/* HERO */}
            <section className="relative pt-36 pb-20 overflow-hidden border-b border-white/[0.06] blueprint-grid">
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="container px-4 mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-[11px] font-mono font-bold text-amber-300 tracking-[0.18em] uppercase">
                                2914 Cynthia Rd • Jackson, MS • BBB A+ Accredited
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[0.95] uppercase">
                            Built In Mississippi For{" "}
                            <span className="text-amber-400">People Who Actually Work.</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                            Power Digital Media LLC was founded on one conviction: Mississippi
                            roofers, dirt-work contractors, HVAC pros, restaurants, and ministries
                            work too hard to get stuck with slow, overpriced agency brochure sites
                            that never generate a phone call.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FOUNDER & STUDIO STORY */}
            <section className="py-24 bg-[#080a12] border-b border-white/[0.06]">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="grid gap-14 lg:grid-cols-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-7 space-y-6"
                        >
                            <div>
                                <span className="text-amber-400 font-mono font-bold tracking-[0.22em] uppercase text-xs mb-3 block">
                                    Direct Founder Access • Zero Agency Runaround
                                </span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[0.98] text-white uppercase">
                                    Software Craftsmanship Meets{" "}
                                    <span className="text-amber-400">Jobsite Reality.</span>
                                </h2>
                            </div>

                            <div className="space-y-4 text-slate-300 leading-relaxed text-base md:text-lg">
                                <p>
                                    Most agencies charge thousands to slap your logo onto a generic
                                    WordPress template that takes 6 seconds to load on a cell signal
                                    in Brandon or Bentonia—and the day after launch, your crew goes
                                    right back to finishing great jobs that Google never hears about.
                                </p>
                                <p>
                                    That&apos;s why founder <strong className="text-white">Damein Donald</strong>{" "}
                                    built Power Digital Media differently. Alongside hand-coded
                                    Next.js websites and local Google Map Pack engineering, we built
                                    our own proprietary field apps—
                                    <strong className="text-amber-300">PDM PinDrop™</strong> and{" "}
                                    <strong className="text-amber-300">PinCam™</strong>—so a crew can
                                    snap proof photos, drop a GPS pin in 15 seconds, and turn every
                                    driveway they leave into their next five neighborhood calls.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                                <Link
                                    href="/pindrop"
                                    className="p-5 rounded-2xl bg-[#12141c] border border-white/10 hover:border-amber-500/40 transition-all group flex flex-col justify-between"
                                >
                                    <span className="text-amber-400 font-mono font-bold text-[10px] uppercase tracking-widest mb-1">
                                        Field App 01
                                    </span>
                                    <span className="text-base font-black uppercase text-white mb-2">
                                        PDM PinDrop™
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-amber-400 transition-colors">
                                        See Live Map <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                </Link>

                                <Link
                                    href="/pincam"
                                    className="p-5 rounded-2xl bg-[#12141c] border border-white/10 hover:border-amber-500/40 transition-all group flex flex-col justify-between"
                                >
                                    <span className="text-amber-400 font-mono font-bold text-[10px] uppercase tracking-widest mb-1">
                                        Field App 02
                                    </span>
                                    <span className="text-base font-black uppercase text-white mb-2">
                                        PinCam™ Camera
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-amber-400 transition-colors">
                                        Try 5 Modes <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                </Link>

                                <Link
                                    href="/our-work"
                                    className="p-5 rounded-2xl bg-[#12141c] border border-white/10 hover:border-amber-500/40 transition-all group flex flex-col justify-between"
                                >
                                    <span className="text-emerald-400 font-mono font-bold text-[10px] uppercase tracking-widest mb-1">
                                        12+ Live Builds
                                    </span>
                                    <span className="text-base font-black uppercase text-white mb-2">
                                        Client Proof
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-amber-400 transition-colors">
                                        Inspect Work <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-amber-500/35 bg-[#0b0c10] aspect-[4/5] shadow-[0_28px_70px_rgba(0,0,0,0.65)] group"
                        >
                            <Image
                                src="/images/founder-booth.webp"
                                alt="Damein Donald — Founder of Power Digital Media LLC in Jackson, Mississippi"
                                fill
                                sizes="(max-width: 768px) 100vw, 45vw"
                                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-[#06080f]/25 to-transparent" />
                            <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-[#0b0c10]/90 backdrop-blur-xl border border-amber-500/30">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-amber-400 block mb-1">
                                    Damein Donald • Founder &amp; Lead Engineer
                                </span>
                                <p className="text-xs text-slate-200 leading-relaxed mb-3">
                                    When you call Power Digital Media, you talk directly to the
                                    engineer building your website, your CRM pipeline, and your local
                                    rankings.
                                </p>
                                <a
                                    href="tel:6014462393"
                                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-300 hover:text-white transition-colors"
                                >
                                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                                    (601) 446-2393
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4 PILLARS */}
            <section className="py-24 bg-[#06080f] border-b border-white/[0.06]">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-amber-400 font-mono font-bold tracking-[0.22em] uppercase text-xs mb-3 block">
                            Full-Stack Local Growth
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-white">
                            The 4 Systems Behind Every Build.
                        </h2>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {capabilities.map((cap, index) => (
                            <motion.div
                                key={cap.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: index * 0.08 }}
                                className="p-7 rounded-3xl bg-[#0b0c10] border border-white/10 hover:border-amber-500/35 transition-all flex flex-col"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mb-5 text-amber-400">
                                    <cap.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-black uppercase tracking-tight text-lg mb-2.5 text-white">
                                    {cap.title}
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {cap.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMPARISON */}
            <section className="py-24 bg-[#080a12] border-b border-white/[0.06]">
                <div className="container px-4 mx-auto max-w-5xl">
                    <div className="text-center mb-14">
                        <span className="text-amber-400 font-mono font-bold tracking-[0.22em] uppercase text-xs mb-3 block">
                            Side-By-Side Comparison
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-white">
                            Typical Agency Brochure vs. Power Digital.
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/25 mb-5">
                                <span className="w-2 h-2 rounded-full bg-red-400" />
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-300">
                                    Typical Agencies
                                </span>
                            </div>
                            <h3 className="text-xl font-black uppercase text-slate-300 mb-6">
                                What Most Businesses Get Stuck With
                            </h3>
                            <ul className="space-y-4">
                                {theyDeliver.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 text-slate-400"
                                    >
                                        <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 md:p-10 rounded-3xl border-2 border-amber-500/45 bg-[#12141c] shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 mb-5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300">
                                    Power Digital Media LLC
                                </span>
                            </div>
                            <h3 className="text-xl font-black uppercase text-white mb-6">
                                What We Engineer For You
                            </h3>
                            <ul className="space-y-4">
                                {weEngineer.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-white">
                                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <span className="text-sm font-semibold">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <AuditCTA />

            <Footer />
        </main>
    );
}
