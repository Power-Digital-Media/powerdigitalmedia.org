import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
import { Star, ExternalLink, ThumbsUp, CheckCircle, Sparkles, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
    title: "Leave a Review | Power Digital Media",
    description: "Share your experience working with Power Digital Media. Your feedback helps our local Mississippi team continue building elite digital systems.",
};

export default function ReviewPage() {
    // Default Google Maps / Review query for Power Digital Media
    const googleReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJrb9eJalKKEYRsYZZwc3sKS8";
    const googleSearchReviewUrl = "https://www.google.com/search?q=Power+Digital+Media+Jackson+MS#lrd=0x86294a29255ebfb1:0x2f29eccdc59986b1,3,,,,";

    return (
        <main className="relative flex flex-col min-h-screen bg-[#020617] text-white">
            <Navbar />

            <section className="relative pt-36 pb-20 px-4 md:px-8 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
                {/* Ambient glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
                    <Sparkles className="w-3.5 h-3.5" /> Client Feedback Portal
                </div>

                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
                    How Did We Do With Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
                        Digital Infrastructure?
                    </span>
                </h1>

                <p className="text-white/70 max-w-xl text-base md:text-lg mb-8 leading-relaxed">
                    Thank you for trusting Power Digital Media with your web systems. If you enjoyed working with Damein and our team, taking 60 seconds to leave a 5-star review helps us tremendously!
                </p>

                {/* Stars Indicator */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-8 h-8 md:w-10 md:h-10 fill-amber-400 text-amber-400 animate-pulse" />
                    ))}
                </div>

                {/* Direct Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
                    {/* Google Review Primary CTA */}
                    <a
                        href={googleSearchReviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative rounded-3xl bg-slate-900/80 border-2 border-cyan-500/40 hover:border-cyan-400 p-8 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] hover:-translate-y-1"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                            <Star className="w-7 h-7 text-cyan-400 fill-cyan-400" />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-white">
                            Review Us on Google
                        </h3>
                        <p className="text-xs text-white/60 mb-6 leading-relaxed">
                            Takes less than 60 seconds. Direct 1-tap submission to our Google Business listing.
                        </p>
                        <span className="w-full py-3.5 px-6 rounded-xl bg-cyan-400 text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-white transition-colors">
                            Leave Google Review <ExternalLink className="w-4 h-4" />
                        </span>
                    </a>

                    {/* Direct Feedback / Message Option */}
                    <div className="rounded-3xl bg-slate-950/60 border border-white/10 p-8 flex flex-col items-center justify-between text-center">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                            <MessageSquare className="w-7 h-7 text-white/70" />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-white">
                            Direct Message
                        </h3>
                        <p className="text-xs text-white/60 mb-6 leading-relaxed">
                            Have specific feedback or need a feature upgrade? Reach out directly to Damein Donald.
                        </p>
                        <a
                            href="tel:16013002004"
                            className="w-full py-3.5 px-6 rounded-xl border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                        >
                            Call (601) 300-2004
                        </a>
                    </div>
                </div>

                {/* Helpful Review Prompts (Copyable) */}
                <div className="w-full rounded-3xl bg-slate-900/40 border border-white/5 p-6 md:p-8 text-left">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Not sure what to say? Here are quick ideas:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/70">
                        <div className="p-4 rounded-xl bg-black/40 border border-white/5 italic">
                            &ldquo;Damein and Power Digital Media built an ultra-fast website for our business and automated our local SEO. Professional, communicative, and delivers high-tier results.&rdquo;
                        </div>
                        <div className="p-4 rounded-xl bg-black/40 border border-white/5 italic">
                            &ldquo;The PinDrop app and CRM integration completely changed how we capture leads in the field. Outstanding speed and customer service in Mississippi.&rdquo;
                        </div>
                    </div>
                </div>
            </section>

            <DeferredFooterSections />
        </main>
    );
}
