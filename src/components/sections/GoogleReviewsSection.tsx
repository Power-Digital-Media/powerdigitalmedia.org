import React from "react";
import { VERIFIED_REVIEWS, GOOGLE_REVIEW_URL, GOOGLE_PROFILE_URL, BBB_PROFILE_URL, REVIEWS_SUMMARY } from "@/data/reviews";
import { Star, ShieldCheck, ExternalLink, MessageSquare, ThumbsUp, ArrowRight, Sparkles } from "lucide-react";

export default function GoogleReviewsSection({ variant = "full" }: { variant?: "full" | "compact" }) {
  // Seamless loop by duplicating reviews array
  const duplicatedReviews = [...VERIFIED_REVIEWS, ...VERIFIED_REVIEWS];

  if (variant === "compact") {
    return (
      <section id="reviews" className="py-8 md:py-10 bg-[#070c18] border-b border-white/10 relative overflow-hidden select-none">
        {/* Subtle ambient golden background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 text-center mb-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30">
            <span className="text-amber-400 text-xs">★★★★★</span>
            <span className="text-amber-300 font-bold uppercase tracking-wider text-[11px]">
              100% 5-Star Verified Client Reviews • Central Mississippi
            </span>
          </div>
        </div>

        {/* Continuous Infinite Loop Carousel (Marquee) */}
        <div className="relative w-full overflow-hidden py-2">
          {/* Left and Right Edge Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#070c18] via-[#070c18]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#070c18] via-[#070c18]/80 to-transparent z-20 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="animate-marquee pause-on-hover flex gap-6 px-4">
            {duplicatedReviews.map((review, idx) => (
              <div
                key={`${review.id}-compact-${idx}`}
                className="w-[300px] sm:w-[360px] shrink-0 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-slate-900/85 border border-white/10 hover:border-amber-400/50 transition-all duration-300 shadow-xl group hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.2)] hover:-translate-y-1 cursor-grab active:cursor-grabbing backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      {review.source === "Google" ? "⭐ Google" : "👍 Facebook"}
                    </span>
                  </div>

                  {review.highlight && (
                    <p className="text-amber-300 font-bold text-xs sm:text-sm mb-2 leading-snug group-hover:text-amber-200 transition-colors">
                      &ldquo;{review.highlight}&rdquo;
                    </p>
                  )}

                  <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-3">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {review.author}
                    </h4>
                    <span className="text-[10px] text-slate-400 truncate block">
                      {review.roleOrCompany || "Verified Client"}
                    </span>
                  </div>
                  <a
                    href={review.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-amber-400 transition-colors p-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Continuous Live Review Feed • Hover or Touch to Pause</span>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#0b1329] border-t border-b border-white/10 relative overflow-hidden select-none">
      {/* Subtle ambient golden background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header with 5.0 Google Badge & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 max-w-7xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
              <span className="text-amber-400 text-xs flex items-center">
                ★★★★★
              </span>
              <span className="text-amber-300 font-bold tracking-wider uppercase text-[11px]">
                100% 5-Star Verified Client Reviews
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-[1.08]">
              What Mississippi Business Owners <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                Say About Working With Us
              </span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg mt-3 max-w-2xl">
              Real feedback from local contractors, business leaders, and ministries across the Jackson metro area. We build long-term relationships through speed, trust, and real results.
            </p>
          </div>

          {/* Quick Summary Card & Direct Review Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-900/90 border border-white/15 p-5 rounded-2xl backdrop-blur-md shadow-xl shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 shadow-md">
                <span className="text-xl">5★</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-black text-white">5.0</span>
                  <div className="flex text-amber-400 text-sm ml-1">
                    ★★★★★
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold block">
                  Google &amp; Facebook Verified
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/10 hidden sm:block mx-1" />

            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:shadow-[0_0_22px_rgba(245,158,11,0.4)] active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Leave a Google Review
              </a>
              <a
                href={BBB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>BBB Profile Verified</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* --- Continuous Infinite Loop Carousel (Marquee) --- */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left and Right Edge Gradient Masks for Smooth Seamless Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0b1329] via-[#0b1329]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0b1329] via-[#0b1329]/80 to-transparent z-20 pointer-events-none" />

        {/* Scrolling Track with Pause on Hover / Touch */}
        <div className="animate-marquee pause-on-hover flex gap-6 px-4">
          {duplicatedReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-[320px] sm:w-[380px] md:w-[420px] shrink-0 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-900/85 border border-white/10 hover:border-amber-400/50 transition-all duration-300 shadow-xl group hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.2)] hover:-translate-y-1.5 cursor-grab active:cursor-grabbing backdrop-blur-md"
            >
              <div>
                {/* Header: Stars & Platform Badge */}
                <div className="flex items-center justify-between gap-2.5 mb-3.5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-slate-300 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 flex items-center gap-1 shrink-0">
                    {review.source === "Facebook" && (
                      <>
                        <span className="text-[#1877F2] font-black text-xs">Facebook</span> Recommendation
                      </>
                    )}
                    {review.source === "Google" && (
                      <>
                        <span className="text-amber-400 font-black text-xs">Google</span> Review
                      </>
                    )}
                    {review.source === "BBB" && (
                      <>
                        <span className="text-blue-400 font-black text-xs">BBB</span> Verified
                      </>
                    )}
                  </span>
                </div>

                {/* Review Highlight / Main Quote */}
                {review.highlight && (
                  <p className="text-amber-300 font-bold text-sm sm:text-base mb-2.5 leading-snug group-hover:text-amber-200 transition-colors">
                    &ldquo;{review.highlight}&rdquo;
                  </p>
                )}

                {/* Review Full Text */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal line-clamp-4">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm shrink-0 shadow-md">
                    {review.author.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white leading-tight truncate">
                      {review.author}
                    </h4>
                    <span className="text-[11px] text-slate-400 truncate block">
                      {review.roleOrCompany || "Verified Client"}
                    </span>
                  </div>
                </div>

                <a
                  href={review.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-amber-400 transition-colors p-2 rounded-lg hover:bg-white/5 shrink-0"
                  title="View original verified review"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Marquee Navigation Tip */}
        <div className="mt-4 mb-10 text-center flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Continuous Live Feed • Hover or Touch to Pause</span>
        </div>

        {/* Bottom Callout & Trust Links */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-amber-500/30 p-6 sm:p-8 max-w-5xl mx-auto shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
              <ThumbsUp className="w-3.5 h-3.5" />
              100% 5-Star Commitment
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Ready for a 5-Star Website Experience?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              Work directly with Damein Donald. No offshore delays, no generic templates — just bespoke high-velocity engineering and direct phone support.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="/free-audit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95 text-center"
            >
              <span>Get Your Free Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="tel:6014462393"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-white/15 text-center"
            >
              (601) 446-2393
            </a>
          </div>
        </div>

        {/* Footer Trust Links */}
        <div className="mt-10 text-center flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5 underline decoration-white/20 underline-offset-4"
          >
            <span>View Jackson, MS Google Business Profile</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5 underline decoration-white/20 underline-offset-4"
          >
            <span>Direct Google Review Link: g.page/r/Cd8B19AxtAaPEBM/review</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={BBB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 underline decoration-white/20 underline-offset-4"
          >
            <span>Better Business Bureau (BBB) Accredited</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
}
