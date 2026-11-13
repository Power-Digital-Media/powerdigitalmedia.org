"use client";

import React from "react";
import {
  MonitorSmartphone,
  Download,
  Zap,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Monitor,
  PenTool,
  Calendar,
  Users,
  Megaphone,
  Settings,
  BarChart3,
  Lock,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const APP_URL = "https://pdm-site-manager.netlify.app";

const features = [
  {
    icon: PenTool,
    title: "Visual Content Updates",
    description:
      "Update headlines, project photos, specials, and announcements with real-time preview—zero coding required.",
  },
  {
    icon: Calendar,
    title: "Events & Schedules",
    description:
      "Publish seasonal promotions, community events, or operating-hour updates from your phone or laptop.",
  },
  {
    icon: Megaphone,
    title: "Sitewide Banners & Alerts",
    description:
      "Turn on storm-response notices, holiday hours, or limited-time offers in seconds.",
  },
  {
    icon: Users,
    title: "Team & Role Access",
    description:
      "Give office managers or staff clean permissioned access without handing out server credentials.",
  },
  {
    icon: BarChart3,
    title: "Activity Overview",
    description:
      "Track recent page edits, published updates, and team changes from one clean dashboard.",
  },
  {
    icon: Settings,
    title: "Business Info & SEO",
    description:
      "Keep phone numbers, service areas, social links, and metadata aligned everywhere.",
  },
];

const platforms = [
  {
    icon: Monitor,
    name: "Windows",
    instruction: "Open in Chrome or Edge → Click the install icon in the address bar",
  },
  {
    icon: Monitor,
    name: "Mac",
    instruction: "Open in Chrome or Safari → Click Install / Add to Dock",
  },
  {
    icon: Smartphone,
    name: "Android",
    instruction: "Open in Chrome → Tap \"Add to Home Screen\"",
  },
  {
    icon: Smartphone,
    name: "iOS",
    instruction: "Open in Safari → Tap Share → \"Add to Home Screen\"",
  },
];

export default function SiteManagerPage() {
  const baseUrl = "https://powerdigitalmedia.org";
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/` },
    { name: "Web Design", url: `${baseUrl}/web-design` },
    { name: "Site Manager", url: `${baseUrl}/site-manager` },
  ];

  return (
    <main className="relative min-h-screen bg-[#06080f] text-white overflow-x-clip">
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "PDM Site Manager",
            applicationCategory: "WebApplication",
            operatingSystem: "Windows, macOS, Android, iOS",
            provider: {
              "@type": "Organization",
              name: "Power Digital Media LLC",
              url: "https://powerdigitalmedia.org",
            },
            description:
              "Manage website copy, photos, announcements, and events from any device without touching code.",
          }),
        }}
      />
      <Navbar />

      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/[0.06] rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 z-10">
        <div className="container px-4 sm:px-6 mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 mb-6">
            <MonitorSmartphone className="w-4 h-4 text-amber-400" />
            <span className="font-mono font-bold tracking-widest uppercase text-xs">
              Included Client App
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 leading-[1.02] uppercase">
            PDM Site <span className="text-amber-400">Manager.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your website, your control. Edit headlines, swap photos, post storm-season alerts, and manage events from <strong className="text-white">any phone or computer</strong>—zero code required.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl hover:brightness-110 transition-all uppercase tracking-wider text-xs shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
              <Download className="w-4 h-4" />
              Launch Site Manager
            </a>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0b0c10] border border-white/15 rounded-xl hover:border-amber-400/50 transition-colors font-bold uppercase tracking-wider text-xs text-white"
            >
              Explore Features
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* Included Strip */}
      <section className="py-6 bg-[#0b0c10] border-y border-white/10 relative z-10">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <p className="text-slate-300 text-sm sm:text-base">
            <Lock className="w-4 h-4 inline-block mr-2 text-amber-400 -mt-0.5" />
            <strong className="text-white">Included with zero extra software fees</strong> on Power Digital Media custom website builds—alongside optional{" "}
            <Link href="/pindrop" className="text-amber-400 underline hover:text-amber-300 font-semibold">
              PDM PinDrop™
            </Link>{" "}
            for field crews.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 md:py-28 relative z-10">
        <div className="container px-4 sm:px-6 mx-auto max-w-6xl">
          <div className="max-w-3xl mb-14">
            <span className="text-amber-400 font-mono font-bold tracking-widest uppercase text-xs mb-3 block">
              Simple Owner Controls
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight uppercase">
              Everything You Need to <span className="text-amber-400">Stay Current.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Built for busy owners and office managers—no bloated WordPress plugin menus that break your layout.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-7 rounded-3xl border border-white/10 bg-[#0b0c10] hover:border-amber-400/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Platform Install */}
      <section className="py-20 bg-[#0b0c10] border-y border-white/10 relative z-10">
        <div className="container px-4 sm:px-6 mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-amber-400 font-mono font-bold tracking-widest uppercase text-xs mb-3 block">
              Works Everywhere
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight uppercase">
              Install on <span className="text-amber-400">Any Device.</span>
            </h2>
            <p className="text-base text-slate-300 max-w-xl mx-auto">
              Installs as a clean web app on your office desktop, tablet, or phone in two taps.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="p-6 rounded-3xl border border-white/10 bg-[#12141c] text-center"
              >
                <platform.icon className="w-9 h-9 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2 text-white">{platform.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{platform.instruction}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built-In vs Bolt-On */}
      <section className="py-20 md:py-28 relative z-10">
        <div className="container px-4 sm:px-6 mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="text-amber-400 font-mono font-bold tracking-widest uppercase text-xs mb-3 block">
                Why Owners Love It
              </span>
              <h2 className="text-3xl sm:text-5xl font-black mb-5 tracking-tight uppercase leading-tight">
                Built In. <span className="text-amber-400">Never Fragile.</span>
              </h2>
              <p className="text-base text-slate-300 mb-7 leading-relaxed">
                Most agencies hand you a fragile WordPress login with 30 confusing plugins—or charge you every time you want to change a phone number or photo. We give you clean guardrails so your Next.js site stays blazing-fast.
              </p>
              <ul className="space-y-3.5">
                {[
                  "Zero extra monthly CMS software fees",
                  "Impossible to accidentally break your mobile layout",
                  "Changes publish live to your Next.js site in seconds",
                  "Or text Damein anytime and we'll handle edits for you",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clean App Preview Card */}
            <div className="rounded-3xl border border-white/10 bg-[#0b0c10] overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10 bg-[#12141c]">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="ml-3 text-xs text-slate-400 font-mono">
                  pdm-site-manager • Live Workspace
                </span>
              </div>
              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Client Content Hub</p>
                    <p className="text-xs text-slate-400">Connected to Production Edge</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active Pages", value: "8" },
                    { label: "Promos / Events", value: "3" },
                    { label: "Mobile Speed", value: "98" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl bg-[#12141c] border border-white/10 p-4 text-center"
                    >
                      <p className="text-2xl font-black text-amber-400">{stat.value}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1 font-mono">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl bg-[#12141c] border border-white/10 p-4 space-y-2">
                  <p className="text-xs font-bold text-white">Recent Live Updates</p>
                  {[
                    "Updated homepage seasonal promo banner",
                    "Added 4 new project gallery photos",
                    "Published holiday operating hours",
                  ].map((a, i) => (
                    <p
                      key={i}
                      className="text-xs text-slate-300 py-1.5 border-t border-white/5 first:border-0"
                    >
                      ✓ {a}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
