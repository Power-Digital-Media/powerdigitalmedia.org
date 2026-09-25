"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Zap, Shield, Search, ArrowRight, BarChart3, CheckCircle2, PhoneCall, Video, Star } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Portfolio from "@/components/sections/Portfolio";
import AuditCTA from "@/components/sections/AuditCTA";
import GoogleReviewsSection from "@/components/sections/GoogleReviewsSection";
import SpeedComparisonCard from "@/components/ui/SpeedComparisonCard";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const pillars = [
  {
    title: "Sub-Second Mobile Speed",
    subtitle: "Opens in < 0.4s",
    description: "Built on custom Next.js code with zero bloated templates. Your website opens instantly on any phone, keeping homeowners and local clients from bouncing.",
    features: ["Next.js 16 Edge Architecture", "99/100 Core Web Vitals", "Instant Click-to-Call Buttons", "Zero Fragile WordPress Plugins"],
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    borderColor: "border-amber-500/30"
  },
  {
    title: "Google Map Pack Dominance",
    subtitle: "#1 Local Visibility",
    description: "Engineered specifically for Jackson and Central Mississippi search rankings. We embed structured local business schema to help you own the Google 3-Pack.",
    features: ["Geo-Targeted Schema Markup", "Google Business Profile Sync", "Jackson & Metro Target Pages", "High-Converting Service Layouts"],
    icon: Globe,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30"
  },
  {
    title: "Automated Lead Capture",
    subtitle: "Turn Clicks Into Calls",
    description: "We connect your site directly to Capsule CRM and automated SMS/email follow-ups so you never lose a high-value customer inquiry while on the job.",
    features: ["Direct Capsule CRM Integration", "Instant SMS/Email Lead Alerts", "Frictionless Quote Request Forms", "Direct Founder Support from Damein"],
    icon: BarChart3,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30"
  }
];

const faqs = [
  {
    q: "Do you use WordPress for your web design?",
    a: "No. We hand-code custom Next.js websites. This ensures your site opens in under half a second, never breaks from plugin updates, and provides unmatched security."
  },
  {
    q: "How long does a website build take?",
    a: "Most custom builds launch in 2 to 4 weeks, depending on the size of your site and content needs. We keep you updated every step of the way."
  },
  {
    q: "How much does a custom website cost in Jackson, MS?",
    a: "Our custom web packages start at $1,500 for a high-speed professional build and scale based on custom features like PinDrop™ or CRM automation. We give you a clear, fixed quote with no hidden fees."
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Yes. Damein Donald provides direct ongoing management, hosting, security updates, and content changes so you never have to worry about your website breaking."
  },
  {
    q: "Can you redesign my existing slow website?",
    a: "Yes! We frequently rebuild slow WordPress, Wix, or Squarespace sites onto modern Next.js to double mobile speed and improve Google Maps rankings."
  }
];

export default function WebDesignPage() {
  const baseUrl = "https://powerdigitalmedia.org";
  const breadcrumbItems = [
    { name: "Services", url: `${baseUrl}/#services` },
    { name: "Web Design", url: `${baseUrl}/web-design` }
  ];

  return (
    <main className="relative min-h-screen bg-[#080d1a] text-white overflow-x-clip">
      <BreadcrumbSchema items={breadcrumbItems} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden border-b border-white/5">
        <div className="container relative z-10 px-4 sm:px-6 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
            <span className="text-amber-400 text-xs">★★★★★</span>
            <span className="text-amber-300 font-bold tracking-wider uppercase text-[11px]">
              Jackson, MS Web Design &amp; Local SEO Studio
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 uppercase text-white leading-[1.05]">
            Websites Built to Turn <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400">
              Clicks Into Phone Calls.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            We hand-code lightning-fast Next.js websites for Mississippi contractors and small business owners. Sub-second mobile speeds, top Google Maps rankings, and direct personal support from Damein Donald.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-12">
            <a
              href="/free-audit"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 font-black rounded-full hover:bg-amber-400 transition-all uppercase tracking-wider text-xs shadow-[0_0_30px_rgba(251,191,36,0.25)] text-center active:scale-95"
            >
              Get Free 5-Minute Audit
            </a>
            <a
              href="tel:6014462393"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border border-amber-400/40 bg-amber-500/10 text-amber-300 rounded-full font-black uppercase tracking-wider text-xs hover:bg-amber-400 hover:text-slate-950 transition-all active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              (601) 446-2393
            </a>
            <Link
              href="/book"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 border border-white/15 rounded-full font-bold uppercase tracking-wider text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <Video className="w-4 h-4 text-cyan-400" />
              Book Call
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10 text-left">
            <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5">
              <span className="text-xs text-slate-400 block font-medium">Mobile Load Speed</span>
              <span className="text-sm font-bold text-emerald-400">⚡ &lt; 0.4s Instant</span>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5">
              <span className="text-xs text-slate-400 block font-medium">Google Rating</span>
              <span className="text-sm font-bold text-amber-400">⭐ 5.0 Star Verified</span>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5">
              <span className="text-xs text-slate-400 block font-medium">Code Architecture</span>
              <span className="text-sm font-bold text-cyan-400">⚛️ 100% Next.js 16</span>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5">
              <span className="text-xs text-slate-400 block font-medium">Direct Support</span>
              <span className="text-sm font-bold text-white">🤝 Damein Donald</span>
            </div>
          </div>
        </div>
      </section>

      {/* Speed Comparison Section */}
      <SpeedComparisonCard />

      {/* The 3 Pillars Section */}
      <section className="py-20 md:py-28 relative bg-slate-950/60 border-t border-white/5">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-amber-400 font-bold tracking-widest uppercase text-xs mb-3 block">
              The Power Digital Standard
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Everything Your Business Needs <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400">
                To Win Local Customers
              </span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
              We combine modern engineering with local SEO and automated lead management so your website pays for itself.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className={`p-8 rounded-3xl bg-slate-900/80 border ${pillar.borderColor} flex flex-col justify-between shadow-xl`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl ${pillar.bg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${pillar.color}`} />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        {pillar.subtitle}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {pillar.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <Portfolio titleAs="h2" />

      {/* Verified Google Reviews */}
      <GoogleReviewsSection />

      {/* Plain English FAQ Section */}
      <section className="py-20 md:py-28 bg-[#090f20] border-t border-white/5">
        <div className="container px-4 sm:px-6 mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <span className="text-amber-400 font-bold tracking-widest uppercase text-xs mb-3 block">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              Web Design FAQs
            </h2>
            <p className="text-slate-300 text-sm md:text-base mt-3">
              Clear, honest answers for Mississippi business owners.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-white/10">
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900/50 border border-white/10">
            <p className="text-sm text-slate-300 mb-3">
              Need something custom or have specific questions about your business?
            </p>
            <a
              href="tel:6014462393"
              className="inline-flex items-center gap-2 text-amber-400 font-bold hover:underline text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              Call Damein Donald directly: (601) 446-2393
            </a>
          </div>
        </div>
      </section>

      {/* Audit & Contact */}
      <AuditCTA />
      <Footer />
    </main>
  );
}
