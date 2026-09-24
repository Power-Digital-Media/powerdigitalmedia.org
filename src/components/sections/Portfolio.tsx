"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, CheckCircle2, PhoneCall, Sparkles } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { projects, Project } from "@/data/projects";

const BookingModal = dynamic(() => import("../ui/BookingModal"), { ssr: false });

export default function Portfolio({ titleAs: Title = "h2" }: { titleAs?: "h1" | "h2" }) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <section
            id="portfolio"
            className="relative bg-[#020617] w-full overflow-hidden py-24 md:py-32 px-4 md:px-8 lg:px-12 border-t border-white/5"
        >
            {/* Soft Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-[1300px] mx-auto relative z-10">
                
                {/* Section Header */}
                <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">
                            Real Projects • Real Mississippi Results
                        </span>
                    </div>
                    <Title className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight">
                        Proven Websites Built For <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                            Local Business Growth.
                        </span>
                    </Title>
                    <p className="text-white/75 mt-5 text-base md:text-lg leading-relaxed font-normal">
                        Every site we build is hand-coded for sub-second mobile speed, Google Map dominance, and converting casual local visitors into high-paying phone calls.
                    </p>
                </div>

                {/* Clean, High-Impact 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                    {projects.map((project: Project) => {
                        return (
                            <div
                                key={project.id}
                                className="group relative rounded-3xl overflow-hidden bg-slate-900/40 border border-white/10 hover:border-cyan-500/40 transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 shadow-xl hover:shadow-[0_0_40px_rgba(6,182,212,0.12)]"
                            >
                                {/* Top Browser Frame Preview */}
                                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950 mb-6 shadow-md">
                                    {/* Clean Browser Chrome Bar */}
                                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-b border-white/10">
                                        <div className="flex gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                        </div>
                                        <div className="mx-auto bg-slate-900/90 border border-white/5 rounded-md px-3 py-0.5 text-[10px] text-white/50 font-mono">
                                            {project.client.toLowerCase().replace(/\s+/g, '')}.com
                                        </div>
                                    </div>

                                    {/* Real Screenshot */}
                                    <div className="relative w-full h-[calc(100%-33px)]">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                                        />
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="flex flex-col flex-1">
                                    {/* Client & Tags */}
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                                            {project.client}
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tags.slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-3">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                                        {project.description}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="mt-auto pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                                        <Link
                                            href={`/portfolio/${project.id}`}
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl hover:bg-cyan-400 transition-colors"
                                        >
                                            View Case Study <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>

                                        {project.netlifyUrl && (
                                            <a
                                                href={project.netlifyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                                            >
                                                Live Site <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Callout Banner */}
                <div className="mt-16 md:mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-blue-950/40 border border-cyan-500/20 text-center max-w-4xl mx-auto flex flex-col items-center">
                    <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-3">
                        Want a website that gets your phone ringing?
                    </h4>
                    <p className="text-white/75 text-sm md:text-base max-w-xl mx-auto mb-8">
                        We build custom, fast digital systems for Mississippi business owners who want real leads, not empty traffic.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                        <Link
                            href="/free-audit"
                            className="w-full sm:w-auto px-8 py-4 bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                        >
                            Get Free Website Review
                        </Link>
                        <a
                            href="tel:6013002004"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all"
                        >
                            <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                            Call Damein (601) 300-2004
                        </a>
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
