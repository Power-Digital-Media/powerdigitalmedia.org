import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
import { Star, ExternalLink, ShieldCheck, MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import { VERIFIED_REVIEWS, GOOGLE_REVIEW_URL, GOOGLE_PROFILE_URL, BBB_PROFILE_URL } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Client Reviews & Feedback | Power Digital Media Jackson MS",
  description: "Read 5-star verified reviews from Mississippi business owners or leave your feedback on our official Google Business Profile.",
};

export default function ReviewPage() {
  return (
    <main className="relative flex flex-col min-h-screen bg-[#070d1e] text-white">
      <Navbar />

      <section className="relative pt-36 pb-20 px-4 md:px-8 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Official Review & Feedback Portal
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
          Client Reviews & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
            Verified Experiences
          </span>
        </h1>

        <p className="text-slate-300 max-w-2xl text-base md:text-lg mb-8 leading-relaxed">
          Thank you for partnering with Power Digital Media. If you enjoyed working with Damein Donald, taking 60 seconds to leave an official Google Review makes a huge impact for our local Jackson team!
        </p>

        {/* Stars Indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-8 h-8 md:w-10 md:h-10 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Direct Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-16 text-left">
          {/* Google Review Primary CTA */}
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-3xl bg-slate-900/90 border-2 border-amber-400/50 hover:border-amber-400 p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_40px_rgba(251,191,36,0.2)] hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-950 font-black text-xl shadow-md">
                  G
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 font-bold text-xs border border-amber-500/30">
                  ★★★★★ 5.0
                </span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-white">
                Leave a Google Review
              </h3>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Direct 1-click submission to our verified Google Business Profile. Takes less than 60 seconds.
              </p>
            </div>
            <span className="w-full py-3.5 px-6 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 group-hover:bg-white transition-colors">
              Write Review on Google <ExternalLink className="w-4 h-4" />
            </span>
          </a>

          {/* Direct Support / Call Damein */}
          <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white/70" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-white">
                Direct Line to Founder
              </h3>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Have specific project requests, need a speed boost, or want personal consultation? Damein answers directly.
              </p>
            </div>
            <a
              href="tel:6014462393"
              className="w-full py-3.5 px-6 rounded-xl border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              📞 Call Damein: (601) 446-2393
            </a>
          </div>
        </div>

        {/* Verified Reviews Showcase */}
        <div className="w-full mb-16 text-left">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-black uppercase text-white">
                Verified Client Reviews
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Authentic reviews from Mississippi business owners
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                Google Profile <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={BBB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex items-center gap-1"
              >
                BBB Accredited <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {VERIFIED_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      Verified Google Review
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{review.author}</span>
                  <span className="text-slate-400">{review.roleOrCompany || "Client"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Helpful Prompts */}
        <div className="w-full rounded-3xl bg-slate-900/40 border border-white/5 p-6 md:p-8 text-left">
          <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Helpful Review Ideas:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 italic">
              &ldquo;Damein Donald and Power Digital Media built an ultra-fast website for our business and automated our local Google rankings. Responsive, honest, and high-quality work.&rdquo;
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 italic">
              &ldquo;The PinDrop contractor software and CRM pipeline completely streamlined our lead management. Great communication and personal support right here in Mississippi.&rdquo;
            </div>
          </div>
        </div>

      </section>

      <DeferredFooterSections />
    </main>
  );
}
