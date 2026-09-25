"use client";

import { m } from "framer-motion";
import { Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const growthEngines = [
    {
        name: "Hand-Crafted High-Speed Web Design",
        type: "Growth Engine 01",
        description: "Say goodbye to bloated WordPress templates, broken plugins, and sluggish mobile load times. We build hand-crafted, custom Next.js websites that load in under half a second on any cell phone. Designed to make your business look like the undisputed leader in your market.",
        image: "/portfolio/growth-engine-real.webp",
        specs: ["95+ Mobile PageSpeed Score", "Custom Mobile-First Layouts", "Instant Click-To-Call Routing"]
    },
    {
        name: "Proprietary PinDrop™ Field Tech",
        type: "Growth Engine 02 (PDM Exclusive)",
        description: "The secret weapon installed for our contractor clients. When your crew finishes a job, they take a photo and drop a GPS pin on their smartphone. PinDrop™ automatically publishes the project to your live website map, syncs local schema to Google, and texts the customer for a 5-star Google review.",
        image: "/images/growth-data-overlay.webp",
        specs: ["1-Tap GPS Job Site Pins", "Geotagged Photo Showcases", "Automated 5-Star SMS Reviews"]
    },
    {
        name: "Capsule CRM & Lead Follow-Up Pipelines",
        type: "Growth Engine 03",
        description: "Never lose a high-paying job because you were busy on a job site. We integrate your website directly with Capsule CRM and Transpond automation so every quote request, form submission, and customer inquiry is instantly organized and followed up with automatically.",
        image: "/images/capsule_transpond_sync.png",
        specs: ["Instant Lead Notifications", "Automated Customer Follow-Up", "Centralized Client Pipeline"]
    }
];

export default function TechStack() {
    return (
        <section id="growth-engines" className="relative py-28 md:py-40 overflow-hidden">
            <div className="container relative z-10 px-6 mx-auto">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center mb-20 md:mb-32"
                >
                    <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[9px] md:text-xs mb-4 block">
                        The Power Digital Media Advantage
                    </span>
                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-tight">
                        3 Growth Engines <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                            Built For Your Business.
                        </span>
                    </h2>
                    <p className="text-base md:text-xl text-foreground/75 leading-relaxed max-w-2xl mx-auto font-normal">
                        We don&apos;t just build websites. We build connected growth systems that bring in traffic, capture leads, and turn local searchers into loyal, paying clients.
                    </p>
                </m.div>

                <div className="space-y-32 md:space-y-40">
                    {growthEngines.map((item, index) => (
                        <m.div
                            key={item.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-16 items-center`}
                        >
                            <div className="flex-1 w-full h-[280px] md:h-[460px] relative rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover opacity-85"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                            </div>
                            <div className="flex-1 max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start w-full">
                                <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-3 block text-center lg:text-left w-full">
                                    {item.type}
                                </span>
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-5 text-center lg:text-left w-full text-white">
                                    {item.name}
                                </h3>
                                <p className="text-base md:text-lg text-foreground/80 mb-8 leading-relaxed text-left w-full">
                                    {item.description}
                                </p>
                                <ul className="flex flex-wrap gap-2.5 mb-6 w-full justify-start">
                                    {item.specs.map((spec) => (
                                        <li key={spec} className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 hover:border-cyan-400/40 transition-colors">
                                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                            <span>{spec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </m.div>
                    ))}
                </div>

                {/* Guarantee / Callout Card */}
                <div className="mt-32 p-8 md:p-12 rounded-[2.5rem] glass-card border border-cyan-500/20 bg-cyan-950/20 text-center max-w-4xl mx-auto shadow-[0_0_50px_rgba(6,182,212,0.08)]">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6">
                        <Zap className="w-7 h-7 text-cyan-400" />
                    </div>
                    <h4 className="text-2xl md:text-3xl font-black mb-4 text-white uppercase tracking-tight">
                        Built Local. Supported Locally.
                    </h4>
                    <p className="text-foreground/75 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                        No overseas call centers. When you work with Power Digital Media, you work directly with our local Jackson, MS team who cares about your business growing.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/free-audit" 
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-black rounded-full hover:bg-cyan-400 transition-all text-xs uppercase tracking-wider shadow-lg"
                        >
                            Get Free Website Audit <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a 
                            href="tel:6014462393" 
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 rounded-full hover:bg-white/10 text-white font-bold transition-all text-xs uppercase tracking-wider"
                        >
                            Call (601) 446-2393
                        </a>
                    </div>
                </div>
            </div>

            <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
        </section>
    );
}
