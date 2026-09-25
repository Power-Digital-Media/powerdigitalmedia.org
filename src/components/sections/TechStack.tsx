"use client";

import React from "react";
import {
  Cpu,
  Zap,
  ShieldCheck,
  Globe,
  Database,
  CreditCard,
  MapPin,
  Mail,
  Search,
  Layers,
  ArrowRight,
  Server,
  Lock,
  Code2,
} from "lucide-react";
import Link from "next/link";

interface TechCategory {
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  technologies: {
    name: string;
    role: string;
    tag: string;
  }[];
}

const techCategories: TechCategory[] = [
  {
    title: "High-Velocity Edge & Frontend",
    badge: "Sub-Second Speed",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    description: "Modern, pre-rendered React architectures deployed to global edge CDNs for instantaneous mobile delivery.",
    technologies: [
      { name: "Next.js 16 / React 19", role: "Server-Side Rendering & App Router", tag: "Core Framework" },
      { name: "Vercel Global Edge", role: "Distributed Edge CDN & Serverless Compute", tag: "Cloud Infrastructure" },
      { name: "Tailwind CSS", role: "Zero-Bloat Utility Architecture", tag: "Design Engine" },
      { name: "TypeScript", role: "Type-Safe Strict Production Reliability", tag: "Code Quality" },
    ],
  },
  {
    title: "Direct Commerce & In-App Payments",
    badge: "Zero 3rd-Party Redirects",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    description: "Native merchant tokenization keeping customers on your domain without clunky external hops.",
    technologies: [
      { name: "Square Web Payments SDK", role: "Native In-App Card, Apple Pay & Google Pay", tag: "Payment Processing" },
      { name: "Stripe Connect API", role: "Direct Merchant Payouts & Recurring Giving", tag: "Subscription Engine" },
      { name: "DoorDash Drive Dispatch", role: "Automated On-Demand Delivery Routing", tag: "Logistics API" },
      { name: "Custom Cart Engine", role: "Headcount & Multi-Platter Calculation", tag: "Business Logic" },
    ],
  },
  {
    title: "Field Automation & CRM Pipelines",
    badge: "Automated Lead Routing",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    description: "Synchronized operational tools that route customer inquiries straight to your phone and map jobsites.",
    technologies: [
      { name: "PinDrop™ Contractor GPS", role: "1-Tap Field Pins & Live Proof Maps", tag: "Field Tech" },
      { name: "Capsule CRM REST API", role: "Automated Lead Ingestion & Pipeline Tracking", tag: "Operations Stack" },
      { name: "Transpond Automation", role: "Instant SMS & Email Drip Follow-Up Sequences", tag: "Lead Nurture" },
      { name: "Webhooks & Sync Engine", role: "Sub-2-Minute Notification Triggers", tag: "Event Routing" },
    ],
  },
  {
    title: "Local SEO & AI Engine Discovery",
    badge: "#1 Metro Visibility",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    description: "Structured data feeds and local geo-coordinates designed for Google Maps 3-pack and AI conversational search.",
    technologies: [
      { name: "Google Maps Platform API", role: "Interactive Boundary & Radius Mapping", tag: "Location Services" },
      { name: "Schema.org JSON-LD", role: "GeoCoordinates & LocalBusiness Microdata", tag: "Search Schema" },
      { name: "AEO / GEO Optimization", role: "Semantic AI Citation & Answer Engine Feeding", tag: "AI Search" },
      { name: "Core Web Vitals Engine", role: "100/100 LCP, CLS & INP Performance Scores", tag: "Speed Index" },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="relative py-20 md:py-28 bg-[#040813] border-t border-white/5 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
              Enterprise Architecture &amp; APIs
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase leading-[1.08] text-white">
            Built On Modern Infrastructure. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">
              Zero Outdated Plugins.
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            We don&apos;t build on fragile, bloated WordPress templates that break every time a plugin updates. We engineer high-performance software connected directly to official enterprise APIs.
          </p>
        </div>

        {/* 4-Category Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mb-14">
          {techCategories.map((category) => (
            <div
              key={category.title}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm group"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">
                    {category.title}
                  </h3>
                  <span className={`text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${category.badgeColor}`}>
                    {category.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Tech List Items */}
                <div className="space-y-2">
                  {category.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 hover:border-cyan-500/20 transition-colors flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-white block">
                          {tech.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {tech.role}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono uppercase tracking-wider text-cyan-300/80 bg-white/5 px-2 py-0.5 rounded border border-white/10 shrink-0">
                        {tech.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust & Local Support Card */}
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-amber-950/20 border border-white/15 max-w-4xl mx-auto text-center backdrop-blur-md shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-amber-400" />
          </div>
          <h4 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">
            Direct Support by Damein Donald • Jackson, MS
          </h4>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
            When you build with Power Digital Media, you get direct cell phone access to the engineer who architected your site. No offshore call centers, no ticketing delays, and no generic excuses.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/free-audit"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-950 font-black rounded-full hover:bg-amber-400 transition-all text-xs uppercase tracking-wider shadow-lg active:scale-95"
            >
              Get Free 5-Minute Audit
            </Link>
            <a
              href="tel:6014462393"
              className="w-full sm:w-auto px-7 py-3.5 border border-amber-400/30 bg-amber-500/10 text-amber-300 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-400 hover:text-slate-950 transition-all active:scale-95"
            >
              📞 Call (601) 446-2393
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
