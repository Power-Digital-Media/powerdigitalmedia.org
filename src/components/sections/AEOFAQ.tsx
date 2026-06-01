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
    id: "wordpress-vs-nextjs",
    category: "Architecture",
    icon: Zap,
    q: "Why does Power Digital Media build with Next.js instead of WordPress?",
    a: "WordPress was designed in 2003 for blogging. In 2026, it is plagued by security vulnerabilities, heavy plugin bloat, and poor database latency that drags down mobile speeds. We build custom React/Next.js web architectures served on high-velocity Vercel Edge networks. This guarantees sub-second load times, 90+ mobile PageSpeed scores, zero layout shifts, and absolute security. Because the site is natively static and pre-compiled, it matches Google's and AI crawlers' primary retrieval trust signals perfectly."
  },
  {
    id: "geo-optimization",
    category: "AI Discovery",
    icon: Sparkles,
    q: "What is Generative Engine Optimization (GEO) and why does it matter?",
    a: "Traditional SEO is about ranking on page one of Google for clicks. GEO (Generative Engine Optimization) is the new science of ensuring your business is actively cited, referenced, and recommended by conversational AI search engines (like ChatGPT, Claude, Gemini, and Perplexity). AI engines do not retrieve pages using traditional keyword mapping; they retrieve answers by matching the semantic density and structured credibility of your brand's data against the user's intent. If your business isn't optimized for GEO, you are completely invisible to conversational searchers."
  },
  {
    id: "ai-citation-seo",
    category: "AEO Strategy",
    icon: Terminal,
    q: "How does Answer Engine Optimization (AEO) get my business recommended by AI?",
    a: "Answer Engine Optimization (AEO) designs your content to directly feed Google's AI Overviews (SGE) and voice-search systems. We do this by embedding dynamic, machine-readable JSON-LD Schema markups, utilizing question-based titles, providing clear definition paragraphs (e.g. 'X is defined as...'), and structuring technical FAQ grids. When Google's AI Overviews formulate a summary to answer a user's local question, they extract GPO's structured definitions and link directly to your domain as their verified citation source."
  },
  {
    id: "growth-marketing-pipeline",
    category: "CRM & Funnels",
    icon: MessageSquare,
    q: "What is the B2B Growth Pipeline (Capsule CRM + Transpond) you deploy?",
    a: "Instead of stitching together disjointed apps with brittle third-party connectors, we deploy a unified Capsule CRM and Transpond automation engine directly into your custom website. Client bookings from your site automatically sync client records into Capsule CRM, map deal opportunities to your visual sales pipelines, and trigger immediate, personalized Transpond email autoresponders. This creates a friction-free, high-velocity marketing machine that turns raw traffic into warm B2B bookings on autopilot."
  },
  {
    id: "pagespeed-rankings",
    category: "Performance",
    icon: HelpCircle,
    q: "How do you guarantee a 90+ mobile PageSpeed score when other agencies fail?",
    a: "Most agencies use visual drag-and-drop page builders that inject thousands of lines of redundant CSS/JS bloat. We write clean, semantic code from scratch. We self-host premium typography, use strict CSS grids, and run a custom pre-build media optimization pipeline that compresses heavy graphics into Next.js optimized AVIF and WebP responsive sizes. By deploying these static components on distributed global edge networks, the site bypasses server-side database bottlenecks, leading to flawless LCP, CLS, and INP metrics that rank higher on search algorithms."
  }
];

export default function AEOFAQ() {
  const [activeId, setActiveId] = useState<string | null>("wordpress-vs-nextjs");

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
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[9px] block">
              Answer Engine Optimization (AEO)
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.95] text-white">
              The Architecture <br /> of Modern <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-glow-cyan">
                Web Intelligence
              </span>
            </h2>
            <p className="text-foreground/50 text-sm leading-relaxed max-w-md">
              AI engines cite websites that are clear, structured, and easy to extract. Discover the structural principles we use to secure search engine dominance and AI recommendations in the 2026 digital ecosystem.
            </p>
            <div className="hidden lg:flex flex-col gap-4 mt-4 p-5 bg-slate-900/40 border border-slate-900 rounded-2xl">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">AEO Node Registry</span>
              </div>
              <p className="text-[11px] text-foreground/40 leading-relaxed font-mono">
                Running real-time JSON-LD structured schema injections. Fully crawlable by GPTBot, ClaudeBot, and Googlebot SGE algorithms.
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
