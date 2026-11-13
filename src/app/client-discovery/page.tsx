"use client";

import { MapPin, TrendingUp, Globe, ArrowRight, Hammer } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { LucideIcon } from "lucide-react";

interface ServiceRoute {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  href: string;
  features: string[];
  ctaLabel: string;
}

const services: ServiceRoute[] = [
  {
    title: "Custom Website Build",
    subtitle: "Web & Local SEO",
    description:
      "Hand-coded Next.js websites built for sub-2-second mobile speed, Google Map Pack rankings, and direct customer calls.",
    icon: Globe,
    href: "/web-design/discovery",
    features: [
      "Custom Mobile-First Design",
      "Service + City SEO Architecture",
      "0%-Fee Square or Stripe Checkout",
    ],
    ctaLabel: "Start Website Brief",
  },
  {
    title: "Paid Leads & Marketing",
    subtitle: "Ads & Pipeline",
    description:
      "Targeted Meta & Google Search ad funnels wired straight into Capsule CRM and 2-minute SMS speed-to-lead.",
    icon: TrendingUp,
    href: "/marketing/discovery",
    features: [
      "Local Paid Lead Acquisition",
      "Google Maps & Organic Growth",
      "Automated SMS & Email Follow-Up",
    ],
    ctaLabel: "Start Marketing Brief",
  },
  {
    title: "PinDrop™ & PinCam™ Apps",
    subtitle: "Contractor Field Suite",
    description:
      "Turn every completed jobsite into a live GPS neighborhood pin, Google project page, PDF report, and 5-star review.",
    icon: MapPin,
    href: "/book?from=discovery",
    features: [
      "PDM PinDrop™ Satellite SEO Map",
      "PinCam™ Ghost Photo & PDF Studio",
      "15-Min SMS Review Automation",
    ],
    ctaLabel: "Book Live App Demo",
  },
];

export default function ClientDiscoveryPage() {
  return (
    <main className="relative min-h-screen bg-[#06080f] text-white overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-amber-500/[0.06] blur-[150px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-14 z-10">
        <div className="container px-4 sm:px-6 mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-5">
            <Hammer className="w-3.5 h-3.5 text-amber-400" />
            Project Scoping &amp; Onboarding
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase mb-4 leading-[1.03]">
            What Are We <span className="text-amber-400">Building Together?</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Pick your starting point below so Damein can review your goals ahead of time and come to your strategy call with an exact game plan.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="pb-24 md:pb-32 relative z-10">
        <div className="container px-4 sm:px-6 mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.title} href={service.href} className="block group h-full">
                  <div className="h-full p-7 sm:p-8 rounded-3xl border border-white/10 hover:border-amber-400/50 bg-[#0b0c10] transition-all duration-300 flex flex-col shadow-[0_18px_50px_rgba(0,0,0,0.45)] group-hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-amber-400">
                        {service.subtitle}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black tracking-tight mb-3 text-white uppercase">
                      {service.title}
                    </h2>

                    <p className="text-sm text-slate-300 leading-relaxed mb-7">
                      {service.description}
                    </p>

                    <ul className="space-y-2.5 mb-8 flex-grow">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2.5 text-xs text-slate-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 pt-4 border-t border-white/10">
                      {service.ctaLabel}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-14">
            <p className="text-sm text-slate-400 mb-4">
              Not sure where to start? Skip the form and talk directly with Damein.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#0b0c10] border border-white/15 hover:border-amber-400/50 text-xs font-bold uppercase tracking-wider text-white transition-colors"
            >
              Book a 15-Minute Strategy Call
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
