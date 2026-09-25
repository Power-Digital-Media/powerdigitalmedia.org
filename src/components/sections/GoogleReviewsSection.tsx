import React from "react";
import { VERIFIED_REVIEWS, GOOGLE_REVIEW_URL, GOOGLE_PROFILE_URL, BBB_PROFILE_URL } from "@/data/reviews";
import { Star, ShieldCheck, ExternalLink, MessageSquare, ThumbsUp } from "lucide-react";

export default function GoogleReviewsSection() {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#0b1329] border-t border-b border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header with Google 5.0 Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 max-w-6xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
              <span className="text-amber-400 text-xs flex items-center">
                ★★★★★
              </span>
              <span className="text-amber-300 font-bold tracking-wider uppercase text-[11px]">
                100% 5-Star Verified Client Reviews
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
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
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-black text-slate-900 shadow-md">
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
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
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

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {VERIFIED_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-amber-500/40 transition-all duration-300 shadow-lg group hover:-translate-y-1"
            >
              <div>
                {/* Header: Stars & Platform Badge directly beside */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-slate-300 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
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

                {/* Review Highlight / Quote */}
                {review.highlight && (
                  <p className="text-amber-300 font-bold text-sm mb-3 leading-snug">
                    &ldquo;{review.highlight}&rdquo;
                  </p>
                )}

                {/* Review Full Text */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {review.author}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {review.roleOrCompany || "Verified Client"}
                    </span>
                  </div>
                </div>

                <a
                  href={review.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-amber-400 transition-colors p-1.5 rounded-lg hover:bg-white/5"
                  title="View original Google review profile"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}

          {/* 6th Card: Call to action to leave review / work with us */}
          <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-4">
                <ThumbsUp className="w-3.5 h-3.5" />
                100% Satisfaction Guarantee
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                Ready for a 5-Star Website Experience?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                Work directly with Damein Donald. No junior account managers, no outsourced offshore delays, just direct communication and rapid execution.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-3">
              <a
                href="/free-audit"
                className="w-full py-3 bg-white hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all text-center shadow-md active:scale-95"
              >
                Claim Free Website Audit
              </a>
              <a
                href="tel:6014462393"
                className="w-full py-2.5 border border-amber-400/40 bg-amber-500/10 hover:bg-amber-400 hover:text-slate-950 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all text-center"
              >
                Call Damein: (601) 446-2393
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Trust Links */}
        <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
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
