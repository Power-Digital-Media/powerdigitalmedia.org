"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, PhoneCall, Sparkles, Star } from "lucide-react";
import { projects, Project } from "@/data/projects";

export default function Portfolio({ titleAs: Title = "h2" }: { titleAs?: "h1" | "h2" }) {
    return (
        <section
            id="portfolio"
            className="relative w-full overflow-hidden py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-[#06080f] border-t border-white/[0.06]"
        >
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/8 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-[1300px] mx-auto relative z-10">
                {/* Section Header */}
                <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-amber-300 font-mono font-bold text-[11px] uppercase tracking-[0.18em]">
                            Real Mississippi Builds • Verified Live Proof
                        </span>
                    </div>
                    <Title className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-[0.98]">
                        Proven Websites Built To{" "}
                        <span className="text-amber-400">Make Your Phone Ring.</span>
                    </Title>
                    <p className="text-slate-300 mt-5 text-base md:text-lg leading-relaxed">
                        Every build is hand-engineered in Jackson, MS for sub-second mobile speed,
                        Google Map Pack dominance, and turning local searchers into booked jobs.
                    </p>
                </div>

                {/* 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                    {projects.map((project: Project) => {
                        const isExternal = Boolean(
                            project.netlifyUrl && project.netlifyUrl.startsWith("http")
                        );
                        const domainLabel = project.netlifyUrl
                            ? isExternal
                                ? project.netlifyUrl
                                      .replace(/^https?:\/\//, "")
                                      .replace(/^www\./, "")
                                      .replace(/\/.*$/, "")
                                : `powerdigitalmedia.org${project.netlifyUrl}`
                            : `${project.client.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;

                        return (
                            <div
                                key={project.id}
                                className="group relative rounded-3xl overflow-hidden bg-[#0b0c10] border border-white/10 hover:border-amber-500/40 transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 shadow-2xl"
                            >
                                {/* Browser Frame Preview */}
                                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#06080f] mb-6 shadow-md">
                                    <div className="flex items-center gap-2 px-4 py-3 bg-[#12141c] border-b border-white/[0.08]">
                                        <div className="flex gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                        </div>
                                        <div className="mx-auto bg-[#06080f] border border-white/[0.08] rounded-md px-3 py-0.5 text-[10px] text-slate-300 font-mono flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            {domainLabel}
                                        </div>
                                    </div>

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

                                {/* Content */}
                                <div className="flex flex-col flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                                            {project.client}
                                        </span>
                                        <div className="flex flex-wrap gap-1.5 items-center">
                                            {project.metricBadge && (
                                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                                                    {project.metricBadge}
                                                </span>
                                            )}
                                            {project.tags.slice(0, 1).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-3">
                                        {project.title}
                                    </h3>

                                    <p className="text-slate-300 text-sm leading-relaxed mb-5">
                                        {project.description}
                                    </p>

                                    {project.testimonial && (
                                        <div className="mb-6 p-4 rounded-2xl bg-[#12141c] border border-white/[0.07]">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex items-center gap-0.5 text-amber-400">
                                                    {[...Array(project.testimonial.stars || 5)].map(
                                                        (_, i) => (
                                                            <Star
                                                                key={i}
                                                                className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                {project.testimonial.source && (
                                                    <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/25">
                                                        {project.testimonial.source} Review
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs italic text-slate-200 leading-relaxed mb-2">
                                                &ldquo;{project.testimonial.quote}&rdquo;
                                            </p>
                                            <div className="text-[11px] font-bold text-amber-400">
                                                — {project.testimonial.author},{" "}
                                                <span className="text-slate-400 font-normal">
                                                    {project.testimonial.role}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-auto pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
                                        <Link
                                            href={`/portfolio/${project.id}`}
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#06080f] text-xs font-black uppercase tracking-wider rounded-xl transition-colors"
                                        >
                                            View Case Study <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>

                                        {project.netlifyUrl &&
                                            (isExternal ? (
                                                <a
                                                    href={project.netlifyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/[0.04] hover:bg-white/[0.09] border border-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                                                >
                                                    Live Site{" "}
                                                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                                                </a>
                                            ) : (
                                                <Link
                                                    href={project.netlifyUrl}
                                                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/[0.04] hover:bg-white/[0.09] border border-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                                                >
                                                    Explore App{" "}
                                                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Callout Banner */}
                <div className="mt-16 md:mt-20 p-8 md:p-12 rounded-3xl bg-[#12141c] border border-amber-500/30 text-center max-w-4xl mx-auto flex flex-col items-center shadow-2xl">
                    <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-3">
                        Want A Website That Actually Generates Calls?
                    </h4>
                    <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-8">
                        Get a free 5-minute rank &amp; website breakdown from Damein Donald in
                        Jackson, MS—no agency sales pitch.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                        <Link
                            href="/free-audit"
                            className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-[#06080f] text-xs font-black uppercase tracking-[0.16em] rounded-xl transition-all shadow-[0_12px_30px_rgba(245,158,11,0.25)]"
                        >
                            Get Free 5-Min Rank Check
                        </Link>
                        <a
                            href="tel:6014462393"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-xl hover:bg-white/[0.06] transition-all"
                        >
                            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                            Call Damein: (601) 446-2393
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
