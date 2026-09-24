"use client";

import Image from "next/image";
import { ShieldCheck, PhoneCall, Code2, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export default function LeadArchitect() {
    return (
        <section className="relative w-full py-20 md:py-32 overflow-hidden bg-[#020617] border-t border-white/5" id="about">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Image Column */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900 aspect-[4/3] shadow-2xl">
                            <Image
                                src="/images/founder-booth.webp"
                                alt="Damein Donald - Founder of Power Digital Media"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                            
                            {/* Local Badge */}
                            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                                <div>
                                    <h4 className="text-white font-bold text-sm">Damein Donald</h4>
                                    <p className="text-white/60 text-xs">Founder &amp; Lead Developer</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/30">
                                    <MapPin className="w-3.5 h-3.5" /> Jackson, MS
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text / Content Column */}
                    <div className="w-full lg:w-1/2 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                            <ShieldCheck className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">Direct Personal Support</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                            Built Locally in Jackson. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                                Supported Directly by Damein.
                            </span>
                        </h2>

                        <div className="space-y-4 text-white/75 text-base md:text-lg leading-relaxed text-left">
                            <p>
                                I don&apos;t outsource your company&apos;s website to junior freelancers or overseas agencies. When you partner with Power Digital Media, you work directly with me from start to finish.
                            </p>
                            <p>
                                I personally design and code your website, install our proprietary PinDrop™ field map for your crew, optimize your Google Maps profile, and make sure your phone starts ringing with real local jobs.
                            </p>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 w-full text-left">
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                                    <Code2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">100% Custom Code</h4>
                                    <p className="text-xs text-white/60 mt-0.5">No clunky themes or broken plugins.</p>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                                    <PhoneCall className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">Direct Cell Access</h4>
                                    <p className="text-xs text-white/60 mt-0.5">Call or text me whenever you need updates.</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                href="/free-audit"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-black rounded-full hover:bg-cyan-400 transition-colors uppercase tracking-wider text-xs"
                            >
                                Get Free Website Audit <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                                href="tel:6013002004"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 text-white font-bold transition-colors uppercase tracking-wider text-xs"
                            >
                                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                                Call (601) 300-2004
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
