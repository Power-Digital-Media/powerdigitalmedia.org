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
    title: "Fast Mobile Speed",
    subtitle: "Under 2–3s on Cell Phones",
    description: "Built on custom Next.js code with zero bloated templates. Your website opens quickly and smoothly on any phone, keeping homeowners and local clients from bouncing.",
    features: ["Next.js 16 Edge Architecture", "98+ PageSpeed Score", "Instant Click-to-Call Buttons", "Zero Fragile WordPress Plugins"],
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
    a: "No. We hand-code custom Next.js websites. This ensures your site loads fast on mobile networks, never breaks from plugin updates, and provides unmatched security."
  },
  {
    q: "How long does a website build take?",
    a: "Most custom builds launch in 7 to 14 business days. For larger custom software platforms or multi-feature portals, builds take 2 to 4 weeks. We keep you updated every step of the way with live staging previews."
  },
  {
    q: "How much does a custom website cost in Jackson, MS?",
    a: "Our custom web packages start at $1,500 for a complete, high-speed Next.js build. For advanced features like PinDrop™ GPS contractor mapping or custom in-app Square ordering, we provide a clear, fixed quote upfront with no recurring plugin fees or surprise charges."
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Yes. You get direct cell phone access to Damein Donald at (601) 446-2393. We handle your cloud hosting, security, content updates, and Google schema maintenance with personal local support."
  },
  {
    q: "Can you redesign my existing slow website?",
    a: "Yes! We frequently rebuild slow WordPress, Wix, or Squarespace sites onto modern Next.js to significantly cut mobile load times and boost Google Maps rankings."
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
      
      {/* Local Web Design Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Custom Web Design & Local SEO",
            "provider": {
              "@id": "https://powerdigitalmedia.org/#organization"
            },
            "description": "High-performance custom Next.js web design, Google Maps local SEO, and automated lead capture for Mississippi contractors and businesses.",
            "category": "Web Design & Development",
            "serviceType": "Custom Web Design",
            "areaServed": [
              { "@type": "City", "name": "Jackson", "containedInPlace": { "@type": "State", "name": "Mississippi" } },
              { "@type": "City", "name": "Brandon", "containedInPlace": { "@type": "State", "name": "Mississippi" } },
              { "@type": "City", "name": "Madison", "containedInPlace": { "@type": "State", "name": "Mississippi" } },
              { "@type": "City", "name": "Clinton", "containedInPlace": { "@type": "State", "name": "Mississippi" } },
              { "@type": "City", "name": "Pearl", "containedInPlace": { "@type": "State", "name": "Mississippi" } },
              { "@type": "City", "name": "Flowood", "containedInPlace": { "@type": "State", "name": "Mississippi" } }
            ],
            "offers": {
              "@type": "Offer",
              "price": "1500",
              "priceCurrency": "USD",
              "priceValidUntil": "2027-01-01",
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="container relative z-10 px-4 sm:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
                <span className="text-amber-400 text-xs">★★★★★</span>
                <span className="text-amber-300 font-bold tracking-wider uppercase text-[11px]">
                  Jackson, MS Web Design &amp; Local SEO Studio
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 uppercase text-white leading-[1.05]">
                Websites Built to Turn <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400">
                  Clicks Into Phone Calls.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
                We hand-code fast, high-converting Next.js websites for Mississippi contractors and business owners. Fast mobile speeds, top Google Maps rankings, and direct cell phone support from Damein Donald.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <a
                  href="/free-audit"
                  className="px-8 py-4 bg-white text-slate-950 font-black rounded-full hover:bg-amber-400 transition-all uppercase tracking-wider text-xs shadow-[0_0_30px_rgba(251,191,36,0.25)] text-center active:scale-95"
                >
                  Get Free 5-Minute Audit
                </a>
                <a
                  href="tel:6014462393"
                  className="flex items-center justify-center gap-2 px-7 py-4 border border-amber-400/40 bg-amber-500/10 text-amber-300 rounded-full font-black uppercase tracking-wider text-xs hover:bg-amber-400 hover:text-slate-950 transition-all active:scale-95 text-center"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  (601) 446-2393
                </a>
                <Link
                  href="/book"
                  className="flex items-center justify-center gap-2 px-6 py-4 border border-white/15 rounded-full font-bold uppercase tracking-wider text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-all text-center"
                >
                  <Video className="w-4 h-4 text-cyan-400" />
                  Book Call
                </Link>
              </div>

              {/* Key Bullet Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 w-full">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="text-emerald-400 font-bold">✓</span> Fast Mobile Loads (&lt; 2–3s)
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="text-cyan-400 font-bold">✓</span> Google Maps 3-Pack Schema
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="text-amber-400 font-bold">✓</span> 7–14 Day Turnaround
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="text-emerald-400 font-bold">✓</span> Direct Cell Support from Damein
                </div>
              </div>
            </div>

            {/* Right Column: Tangible Device Mockup */}
            <div className="lg:col-span-5 relative w-full">
              <div className="relative rounded-3xl border border-white/15 bg-slate-950/90 shadow-2xl overflow-hidden backdrop-blur-md">
                
                {/* Browser Title Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="px-4 py-1 rounded-full bg-slate-950 border border-white/10 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <span className="text-emerald-400">🔒</span> bornagainroofing.com
                  </div>
                  <div className="w-6" />
                </div>

                {/* Screenshot Frame */}
                <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                  <Image
                    src="/portfolio/born-again-roofing.webp"
                    alt="Born Again Roofing - Live Next.js Web Build in Jackson, MS"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                </div>

                {/* Live Metrics Over Mockup */}
                <div className="p-4 bg-slate-950/95 border-t border-white/10 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Performance Score:</span>
                    <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      ⚡ 98+ (Fast Mobile Load)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Local Visibility:</span>
                    <span className="font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      📍 #1 Jackson Metro Remodeling
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Field Capabilities:</span>
                    <span className="font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                      📱 99+ Live GPS Job Pins
                    </span>
                  </div>
                </div>

              </div>
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
