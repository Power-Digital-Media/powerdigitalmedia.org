"use client";
import { useState } from "react";
import { HelpCircle, ChevronDown, Sparkles, MessageSquare, Zap, Terminal } from "lucide-react";

interface FAQItem {
  id: string;
  q: string;
  a: string;
  category: string;
  icon: any;
}

const FAQS: FAQItem[] = [
  {
    id: "timeline-turnaround",
    category: "Project Delivery",
    icon: Zap,
    q: "What is your turnaround timeline for a custom build?",
    a: "Most custom websites and connected systems (Square checkout, PinDrop GPS, and CRM setups) are engineered, tested, and launched in 7 to 14 business days. Because everything is built in-house with Next.js and Tailwind by Damein Donald without offshore outsourcing or clunky page builders, delivery is fast, focused, and precise."
  },
  {
    id: "ongoing-support-damein",
    category: "Direct Support",
    icon: MessageSquare,
    q: "Who handles updates and support after the site goes live?",
    a: "You get direct cell phone access to Damein Donald at (601) 446-2393. No ticketing queues, no offshore call centers, and no disappearing freelancers. We handle your high-velocity Vercel cloud hosting, SSL certificates, Google schema updates, and content revisions with personal, ongoing local support."
  },
  {
    id: "wordpress-vs-nextjs",
    category: "Architecture",
    icon: Terminal,
    q: "Why does Power Digital Media build with Next.js instead of WordPress?",
    a: "WordPress was designed in 2003 for blogging. In 2026, it is plagued by security vulnerabilities, heavy plugin bloat, and poor database latency that drags down mobile speeds. We build custom React/Next.js web architectures served on high-velocity Vercel Edge networks. This delivers fast, reliable load times (well under 3 seconds on cell phones), high PageSpeed scores, and rock-solid security."
  },
  {
    id: "in-app-payments-crm",
    category: "Integrations",
    icon: HelpCircle,
    q: "How do custom in-app checkouts (Square) and CRM pipelines work?",
    a: "We write direct API integrations with your merchant account (Square Web Payments SDK, Stripe) and operations stack (Capsule CRM, Transpond). Payments deposit directly into your business bank account with zero third-party redirect hops, and new customer inquiries ping your smartphone via SMS in under 2 minutes."
  },
  {
    id: "geo-optimization",
    category: "Search & AI",
    icon: Sparkles,
    q: "How do you get my business ranked on Google Maps and AI Search (GEO)?",
    a: "We engineer deep localized JSON-LD structured geo-schema mapping your service radiuses across Jackson, Madison, Brandon, Clinton, and Pearl. This pairs with PinDrop™ jobsite pins and automated 5-star Google review triggers so your company dominates Google Maps 3-pack search results and gets cited by conversational AI engines like ChatGPT and Gemini."
  }
];

export default function AEOFAQ() {
  const [activeId, setActiveId] = useState<string | null>("timeline-turnaround");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section className="section py-20 bg-slate-950/40 relative overflow-hidden border-t border-slate-900" id="faq">
      {/* Dynamic Schema Integration for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header Panel */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            <span className="text-amber-400 font-bold tracking-[0.2em] uppercase text-xs block">
              Clear Answers For Business Owners
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white">
              Frequently Asked <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400">
                Questions.
              </span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-md font-normal">
              Have questions about how we build websites, rank you on Google Maps, or set up automated lead capture? Here are the most common questions from Mississippi business owners.
            </p>
            <div className="flex flex-col gap-3 mt-2 p-5 bg-slate-900/60 border border-white/10 rounded-2xl">
              <div className="flex items-center gap-2 text-white font-bold text-xs">
                <span>💬 Have a different question?</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Call or text Damein Donald directly at <strong className="text-amber-300">(601) 446-2393</strong> for straight answers with no sales pressure.
              </p>
            </div>
          </div>

          {/* Accordion Panel */}
          <div className="lg:col-span-7 flex flex-col gap-4 w-full">
            {FAQS.map((faq) => {
              const Icon = faq.icon;
              const isOpen = activeId === faq.id;

              return (
                <div 
                  key={faq.id} 
                  className={`group relative overflow-hidden transition-all duration-300 rounded-2xl border ${
                    isOpen 
                      ? "bg-slate-900/60 border-cyan-500/20 shadow-[0_0_40px_rgba(34,211,238,0.03)]" 
                      : "bg-slate-900/25 border-slate-900 hover:border-slate-800/80"
                  }`}
                >
                  <button
                    onClick={() => setActiveId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 flex items-start gap-4 text-left transition-colors cursor-pointer"
                  >
                    <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
                      isOpen 
                        ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]" 
                        : "bg-slate-900 border-slate-800 text-foreground/45 group-hover:text-foreground/80 group-hover:border-slate-700/80"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1 pr-4">
                      <span className="text-[9px] uppercase tracking-widest text-cyan-400/65 font-bold mb-1 block">
                        {faq.category}
                      </span>
                      <h3 className="text-sm md:text-base font-bold text-white leading-snug group-hover:text-cyan-400 transition-colors">
                        {faq.q}
                      </h3>
                    </div>

                    <div className={`mt-2 transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan-400" : "text-foreground/30"}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <div 
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pt-1 pl-16 border-t border-slate-900/50">
                      <p className="text-foreground/60 text-xs md:text-sm leading-relaxed">
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
