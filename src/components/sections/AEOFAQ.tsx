"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, Sparkles, MessageSquare, Zap, MapPin, Smartphone, ArrowRight } from "lucide-react";

interface FAQItem {
  id: string;
  q: string;
  a: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FAQS: FAQItem[] = [
  {
    id: "timeline-turnaround",
    category: "Launch Speed",
    icon: Zap,
    q: "How fast can you build and launch our new website?",
    a: "Most custom websites and connected systems (PinDrop™ map embed, Square checkout, interactive quote calculators, and Capsule CRM pipelines) are built, tested, and live in 7 to 14 business days. Everything is engineered in-house in Jackson, MS by Damein Donald—never outsourced overseas.",
  },
  {
    id: "pindrop-pincam-options",
    category: "Field Apps",
    icon: MapPin,
    q: "Can we add PDM PinDrop™ or PinCam™ to our existing website, or get a full custom build?",
    a: "Both. If you already like your current WordPress, Wix, or Squarespace website, PDM PinDrop™ drops onto any site in 5 minutes with a lightweight embed snippet—scoped to your crew and service area. Or if your current site is slow and outdated, we build custom sub-2-second Next.js websites with PinDrop™ and PinCam™ wired right in.",
  },
  {
    id: "ongoing-support-damein",
    category: "Direct Local Support",
    icon: MessageSquare,
    q: "Who handles updates and support after we launch?",
    a: "You get direct phone and text access to Damein Donald at (601) 446-2393 right here in Jackson, MS. No support tickets, no call centers, and no disappearing freelancers. We handle cloud hosting, SSL security, Google Map Pack updates, and content edits for you.",
  },
  {
    id: "wordpress-vs-nextjs",
    category: "Performance",
    icon: Smartphone,
    q: "Why do your custom websites load so much faster than WordPress?",
    a: "Traditional agency WordPress sites rely on 25–40 third-party plugins and slow database queries that stall for 6+ seconds on cell phones. We engineer clean Next.js websites deployed on global edge servers—loading in under 2 seconds on 4G/5G so mobile homeowners call instead of bouncing.",
  },
  {
    id: "in-app-payments-crm",
    category: "Integrations",
    icon: HelpCircle,
    q: "Can you connect Square online ordering and CRM lead tracking?",
    a: "Yes. We wire direct integrations with Square Web Payments SDK (0% redirect fees—proven on T'Beaux's Seafood), interactive quote calculators, Capsule CRM pipelines, and automated Transpond follow-ups.",
  },
  {
    id: "geo-optimization",
    category: "Google Maps & AI Search",
    icon: Sparkles,
    q: "How do you get contractors ranked in surrounding cities like Madison, Brandon, and Flowood?",
    a: "Google ranks contractors in the neighborhoods where it sees verified proof of work. We combine dedicated city/trade pages, LocalBusiness JSON-LD geo-schema, Google Business Profile optimization, and live PDM PinDrop™ jobsite pins + SMS review requests so you rank across every suburb your crews work in.",
  },
];

export default function AEOFAQ() {
  const [activeId, setActiveId] = useState<string | null>("timeline-turnaround");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section className="py-20 md:py-24 bg-[#06080f] relative overflow-hidden border-t border-white/10" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[520px] h-[420px] bg-amber-500/[0.05] rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container px-4 sm:px-6 mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Header Panel */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            <span className="text-amber-400 font-mono font-bold tracking-widest uppercase text-xs block">
              Straight Answers • Zero Jargon
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.05] text-white">
              Common Questions From{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
                Local Owners.
              </span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-md">
              Everything you need to know about turnaround times, pricing options, Google Map Pack rankings, and our proprietary field apps.
            </p>
            <div className="flex flex-col gap-3 mt-2 p-5 bg-[#0b0c10] border border-white/10 rounded-2xl">
              <div className="text-white font-bold text-xs uppercase tracking-wider font-mono text-amber-300">
                Want to ask Damein directly?
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Call or text <a href="tel:6014462393" className="text-white font-bold underline decoration-amber-400/50 underline-offset-4 hover:text-amber-300">(601) 446-2393</a> anytime for straight answers with zero sales pressure.
              </p>
              <Link
                href="/free-audit"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider mt-1"
              >
                <span>Or request a free 5-min video review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Accordion Panel */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 w-full">
            {FAQS.map((faq) => {
              const Icon = faq.icon;
              const isOpen = activeId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`group relative overflow-hidden transition-all duration-300 rounded-2xl border ${
                    isOpen
                      ? "bg-[#12141c] border-amber-500/40 shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
                      : "bg-[#0b0c10] border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => setActiveId(isOpen ? null : faq.id)}
                    className="w-full px-5 sm:px-6 py-5 flex items-start gap-4 text-left transition-colors cursor-pointer"
                  >
                    <div
                      className={`p-2.5 rounded-xl border transition-all duration-300 shrink-0 ${
                        isOpen
                          ? "bg-amber-500/15 border-amber-500/35 text-amber-400"
                          : "bg-white/[0.03] border-white/10 text-slate-400 group-hover:text-amber-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 pr-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80 font-bold mb-1 block">
                        {faq.category}
                      </span>
                      <h3 className="text-sm md:text-base font-bold text-white leading-snug group-hover:text-amber-200 transition-colors">
                        {faq.q}
                      </h3>
                    </div>

                    <div
                      className={`mt-2 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-amber-400" : "text-slate-500"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 sm:px-6 pb-5 pt-2 sm:pl-16 border-t border-white/[0.06]">
                      <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
