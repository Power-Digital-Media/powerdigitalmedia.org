"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Cpu,
  Globe,
  Zap,
  ExternalLink,
  CheckCircle2,
  RotateCw,
  Sparkles,
  Monitor,
  MousePointerClick,
  Lock,
  Star,
  Quote,
} from "lucide-react";
import React, { useState } from "react";
import { Project } from "@/data/projects";

export default function ProjectShowcaseClient({ project }: { project: Project }) {
  const router = useRouter();
  const hasLiveUrl = !!(project.netlifyUrl && project.netlifyUrl.startsWith("http"));
  const canEmbed = hasLiveUrl && !project.embedBlocked;
  const [viewMode, setViewMode] = useState<"interactive" | "screenshot">(
    canEmbed ? "interactive" : "screenshot"
  );
  const [iframeKey, setIframeKey] = useState(0);

  const displayUrl = project.netlifyUrl
    ? project.netlifyUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${project.client.toLowerCase().replace(/\s+/g, "")}.com`;

  return (
    <main className="relative min-h-screen bg-[#020617] text-white overflow-x-hidden">
      {/* Presentation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold uppercase tracking-wider hover:text-cyan-400 transition-colors"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-400 transition-colors bg-slate-900">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <span>Back to Portfolio</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-cyan-400 mb-0.5">
            {project.client}
          </span>
          <h1 className="text-xs md:text-base font-bold tracking-tight text-center">
            {project.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {hasLiveUrl && (
            <a
              href={project.netlifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-28 md:pt-36 pb-40 container mx-auto px-4 lg:px-16 max-w-6xl">
        {/* 1. Interactive Hero Mockup Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          {/* Top Interactive Indicator / Mode Toggle Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 px-1">
            {canEmbed ? (
              <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-1.5 rounded-full shadow-lg shadow-emerald-500/5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="tracking-wide">
                  Fully Functional Live Preview &bull; Click &amp; Scroll Directly Below
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-4 py-1.5 rounded-full shadow-lg shadow-cyan-500/5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="tracking-wide">
                  High-Definition Desktop Showcase &bull; Verified Live Deployment
                </span>
              </div>
            )}

            {canEmbed ? (
              <div className="flex items-center gap-1.5 bg-slate-900/90 border border-white/10 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode("interactive")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "interactive"
                      ? "bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <MousePointerClick className="w-3.5 h-3.5" />
                  <span>Live Interactive</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("screenshot")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "screenshot"
                      ? "bg-slate-800 text-white border border-white/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>HD Snapshot</span>
                </button>
              </div>
            ) : hasLiveUrl ? (
              <a
                href={project.netlifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all"
              >
                <span>Launch Live Website in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : null}
          </div>

          {/* Browser Container */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-950">
            {/* Browser Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>

              {/* URL Address Bar */}
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-slate-900 border border-white/10 text-xs text-white/70 font-mono max-w-md w-full justify-center">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span className="text-white/40">https://</span>
                <span className="text-white font-semibold">{displayUrl}</span>
              </div>

              {/* Browser Controls */}
              <div className="flex items-center gap-2">
                {canEmbed && (
                  <button
                    type="button"
                    onClick={() => setIframeKey((prev) => prev + 1)}
                    title="Reload Live Site"
                    aria-label="Reload Live Site"
                    className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                )}
                {hasLiveUrl && (
                  <a
                    href={project.netlifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in New Tab"
                    aria-label="Open in New Tab"
                    className="p-1.5 rounded-lg text-white/50 hover:text-cyan-400 hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Viewport Area */}
            <div className="relative w-full h-[520px] sm:h-[620px] md:h-[720px] bg-slate-950">
              {viewMode === "interactive" && canEmbed ? (
                <iframe
                  key={iframeKey}
                  src={project.netlifyUrl}
                  title={`${project.title} Live Preview`}
                  className="w-full h-full border-0 bg-slate-950"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; payment"
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* 2. Overview & Details Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div>
              <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-2 block">
                Project Overview
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tight">
                {project.title}
              </h2>
              <p className="text-base md:text-lg text-white/75 leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.objective && (
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
                <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">
                  The Goal
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">{project.objective}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Key Features */}
            {project.features && (
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
                <h4 className="flex items-center gap-2 text-base font-bold mb-4 text-white uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Key Features Delivered
                </h4>
                <ul className="space-y-2.5">
                  {project.features.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
              <h4 className="flex items-center gap-2 text-base font-bold mb-4 text-white uppercase tracking-wider">
                <Globe className="w-4 h-4 text-blue-400" />
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Custom Integrations & Architecture Highlights */}
        {project.integrations && project.integrations.length > 0 && (
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-amber-400 font-bold tracking-widest uppercase text-xs mb-2 block">
                Technical Engineering &amp; Integrations
              </span>
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
                Custom Integrations In Action
              </h3>
              <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mt-3">
                We engineer custom software and native API connections to eliminate friction and
                keep customers directly on your platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {project.integrations.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex flex-col justify-between rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden shadow-2xl hover:border-amber-500/40 transition-all group"
                >
                  {/* Mockup Frame Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/80" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                      <span className="w-2 h-2 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                      {item.badge}
                    </span>
                  </div>

                  {/* Screenshot Image */}
                  <div className="relative w-full aspect-[16/9] bg-slate-950 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>

                  {/* Description */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-slate-900/60">
                    <div>
                      <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-2">
                        {item.title}
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Verified Client Testimonial (if available) */}
        {project.testimonial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-amber-500/30 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-1 mb-6">
              {[...Array(project.testimonial.stars || 5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                Verified {project.testimonial.source || "Client"} Review
              </span>
            </div>
            <blockquote className="text-lg md:text-xl text-white/90 font-medium italic leading-relaxed mb-6">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold text-sm">
                {project.testimonial.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-white text-sm">{project.testimonial.author}</div>
                <div className="text-xs text-white/60">{project.testimonial.role}</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 p-4 flex justify-center">
        <div className="rounded-full bg-slate-950/90 backdrop-blur-xl border border-white/10 px-6 py-3 flex items-center gap-4 shadow-2xl">
          <span className="text-xs font-bold text-white hidden sm:inline">
            Want a similar website for your business?
          </span>
          <Link
            href="/free-audit"
            className="px-6 py-2.5 bg-cyan-400 text-slate-950 font-black uppercase tracking-wider text-xs rounded-full hover:bg-white transition-colors"
          >
            Get Free Audit
          </Link>
          <a
            href="tel:6014462393"
            className="px-5 py-2.5 border border-white/20 text-white font-bold uppercase tracking-wider text-xs rounded-full hover:bg-white/10 transition-colors hidden sm:inline-block"
          >
            Call (601) 446-2393
          </a>
        </div>
      </footer>
    </main>
  );
}
