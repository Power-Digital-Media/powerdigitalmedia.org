import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import {
    Star,
    ExternalLink,
    MessageSquare,
    Sparkles,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";
import {
    VERIFIED_REVIEWS,
    GOOGLE_REVIEW_URL,
    GOOGLE_PROFILE_URL,
    BBB_PROFILE_URL,
} from "@/data/reviews";

export const metadata: Metadata = {
    title: "5.0★ Client Reviews in Jackson, MS | Power Digital Media",
    description:
        "Read verified 5-star Google and Facebook reviews from Mississippi contractors, restaurants, ministries, and local owners working with Power Digital.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/reviews",
    },
    openGraph: {
        title: "5.0★ Client Reviews in Jackson, MS | Power Digital Media",
        description:
            "Read verified 5-star reviews from Mississippi contractors and business owners or leave feedback on our Google Business Profile.",
        url: "https://powerdigitalmedia.org/reviews",
    },
};

export default function ReviewsPage() {
    return (
        <main className="relative flex flex-col min-h-screen bg-[#06080f] text-white">
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://powerdigitalmedia.org/" },
                    { name: "Client Reviews", url: "https://powerdigitalmedia.org/reviews" },
                ]}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": VERIFIED_REVIEWS.map((rev) => ({
                            "@type": "Review",
                            "@id": `https://powerdigitalmedia.org/reviews#${rev.id}`,
                            itemReviewed: {
                                "@id": "https://powerdigitalmedia.org/#organization",
                            },
                            author: {
                                "@type": "Person",
                                name: rev.author,
                            },
                            reviewRating: {
                                "@type": "Rating",
                                ratingValue: String(rev.rating),
                                bestRating: "5",
                                worstRating: "1",
                            },
                            reviewBody: rev.text,
                            publisher: {
                                "@type": "Organization",
                                name: rev.source,
                            },
                        })),
                    }),
                }}
            />
            <Navbar />

            <section className="relative pt-36 pb-20 px-4 md:px-8 border-b border-white/[0.06] blueprint-grid overflow-hidden">
                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[620px] h-[320px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-[0.18em] mb-6">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        5.0★ Verified Reputation • Jackson, MS
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.96] mb-4">
                        Trusted By Real{" "}
                        <span className="text-amber-400">Mississippi Operators.</span>
                    </h1>

                    <p className="text-slate-300 max-w-2xl text-base md:text-lg mb-8 leading-relaxed">
                        Every review below comes from a real local contractor, ministry leader, or
                        business owner we work with directly. Already a client? Leaving a quick
                        60-second Google review helps our Jackson studio tremendously!
                    </p>

                    <div className="flex items-center justify-center gap-2 mb-12">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                                key={s}
                                className="w-8 h-8 md:w-9 md:h-9 fill-amber-400 text-amber-400"
                            />
                        ))}
                    </div>

                    {/* Direct Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-16 text-left">
                        <a
                            href={GOOGLE_REVIEW_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-3xl bg-[#12141c] border-2 border-amber-500/50 hover:border-amber-400 p-7 flex flex-col justify-between transition-all shadow-2xl"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-[#06080f] font-black text-lg">
                                        G
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
                                        5.0 ★
                                    </span>
                                </div>
                                <h2 className="text-lg font-black uppercase tracking-tight mb-2 text-white">
                                    Leave a Google Review
                                </h2>
                                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                                    Direct 1-click link to our verified Google Business Profile.
                                    Takes under 60 seconds.
                                </p>
                            </div>
                            <span className="w-full py-3.5 px-5 rounded-xl bg-amber-500 group-hover:bg-amber-400 text-[#06080f] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors">
                                Write Google Review <ExternalLink className="w-3.5 h-3.5" />
                            </span>
                        </a>

                        <div className="rounded-3xl bg-[#0b0c10] border border-white/10 p-7 flex flex-col justify-between">
                            <div>
                                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mb-4 text-amber-400">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-black uppercase tracking-tight mb-2 text-white">
                                    Not A Client Yet?
                                </h2>
                                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                                    See why your competitors outrank you on Google Maps with a free
                                    5-minute site &amp; rank check.
                                </p>
                            </div>
                            <Link
                                href="/free-audit"
                                className="w-full py-3.5 px-5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                            >
                                Get Free Rank Check <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                            </Link>
                        </div>

                        <div className="rounded-3xl bg-[#0b0c10] border border-white/10 p-7 flex flex-col justify-between">
                            <div>
                                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4">
                                    <MessageSquare className="w-5 h-5 text-amber-400" />
                                </div>
                                <h2 className="text-lg font-black uppercase tracking-tight mb-2 text-white">
                                    Direct Line To Damein
                                </h2>
                                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                                    Need an update, speed boost, or want to talk through a new build?
                                    Damein answers directly in Jackson.
                                </p>
                            </div>
                            <a
                                href="tel:6014462393"
                                className="w-full py-3.5 px-5 rounded-xl border border-white/15 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-white/[0.08] transition-colors flex items-center justify-center gap-2"
                            >
                                Call (601) 446-2393
                            </a>
                        </div>
                    </div>

                    {/* Verified Reviews Grid */}
                    <div className="w-full mb-16 text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
                            <div>
                                <h2 className="text-2xl font-black uppercase text-white">
                                    Verified Client Reviews
                                </h2>
                                <p className="text-xs text-slate-400 mt-1">
                                    100% authentic feedback from Mississippi business owners
                                </p>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-semibold">
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
                                    className="text-emerald-400 hover:underline flex items-center gap-1"
                                >
                                    BBB A+ Accredited <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {VERIFIED_REVIEWS.map((review) => (
                                <div
                                    key={review.id}
                                    className="p-6 rounded-2xl bg-[#0b0c10] border border-white/10 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-1 text-amber-400">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-4 h-4 fill-amber-400 text-amber-400"
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/25">
                                                Verified Review
                                            </span>
                                        </div>
                                        <p className="text-slate-200 text-sm leading-relaxed mb-4">
                                            &ldquo;{review.text}&rdquo;
                                        </p>
                                    </div>
                                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                                        <span className="font-bold text-white">{review.author}</span>
                                        <span className="text-slate-400">
                                            {review.roleOrCompany || "Mississippi Client"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Helpful Prompts */}
                    <div className="w-full rounded-3xl bg-[#0b0c10] border border-white/10 p-6 md:p-8 text-left">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-amber-400 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Helpful Review Prompts For Clients:
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                            <div className="p-4 rounded-xl bg-[#12141c] border border-white/[0.06] italic leading-relaxed">
                                &ldquo;Damein Donald and Power Digital Media built a fast custom
                                website for our business and got our Google Maps rankings moving.
                                Responsive, honest, and easy to work with.&rdquo;
                            </div>
                            <div className="p-4 rounded-xl bg-[#12141c] border border-white/[0.06] italic leading-relaxed">
                                &ldquo;The PDM PinDrop and PinCam field tools made it effortless for
                                our crew to document jobs and get 5-star homeowner reviews right here
                                in Central Mississippi.&rdquo;
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <DeferredFooterSections />
        </main>
    );
}
