import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
import { 
    MapPin, 
    Smartphone, 
    Zap, 
    Star, 
    ShieldCheck, 
    TrendingUp, 
    CheckCircle2, 
    ArrowRight,
    Camera,
    MessageSquare,
    Layers,
    Globe
} from "lucide-react";

export const metadata: Metadata = {
    title: "PinDrop™ Field Engine for Contractors | Power Digital Media",
    description: "Turn every completed contractor job into instant Google rankings, verified GPS project pins, and automated 5-star review requests. Built exclusively for Mississippi contractors.",
    openGraph: {
        title: "PinDrop™ Field Engine for Contractors | Power Digital Media",
        description: "Turn every completed contractor job into instant Google rankings, verified GPS project pins, and automated 5-star review requests.",
        images: ["/portfolio/growth-engine-real.webp"],
    }
};

export default function PinDropPage() {
    return (
        <main className="relative flex flex-col min-h-screen bg-[#020617] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-36 pb-20 md:pt-44 md:pb-32 px-4 md:px-12 overflow-hidden border-b border-white/5">
                {/* Ambient Backdrops */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[130px] pointer-events-none" />

                <div className="max-w-[1300px] mx-auto relative z-10 text-center">
                    
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-yellow-500/40 bg-yellow-950/20 text-yellow-400 text-xs font-mono font-bold uppercase tracking-widest mb-8">
                        <MapPin className="w-4 h-4 animate-bounce text-yellow-400" />
                        Exclusive Proprietary Contractor Technology
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                        Turn Every Finished Job Into <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-cyan-400">
                            Instant Google Dominance
                        </span>
                    </h1>

                    <p className="text-white/70 max-w-3xl mx-auto text-base sm:text-xl leading-relaxed mb-10">
                        Other contractors finish a job and leave. Google has no idea they were there. 
                        With <strong>PinDrop™</strong>, your field crew snaps a job photo, taps one button, and automatically syncs GPS proof, neighborhood Google schema, and instant 5-star SMS review requests directly to the homeowner.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
                        <a
                            href="/book"
                            className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black uppercase tracking-wider text-xs hover:scale-105 transition-all shadow-[0_0_40px_rgba(234,179,8,0.3)] text-center"
                        >
                            Schedule a 15-Min Demo
                        </a>
                        <a
                            href="tel:6014462393"
                            className="w-full sm:w-auto px-8 py-5 rounded-full border border-yellow-400/40 bg-yellow-500/10 text-yellow-300 font-black uppercase tracking-wider text-xs hover:bg-yellow-400 hover:text-slate-950 transition-all text-center"
                        >
                            Call (601) 446-2393
                        </a>
                        <a
                            href="/free-audit"
                            className="w-full sm:w-auto px-8 py-5 rounded-full border border-white/20 text-white font-bold uppercase tracking-wider text-xs hover:bg-white/10 transition-all text-center"
                        >
                            Get Free SEO Audit
                        </a>
                    </div>

                    {/* Quick Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5">
                            <div className="text-2xl md:text-3xl font-black text-yellow-400 mb-1">1-Tap</div>
                            <div className="text-xs text-white/50 font-bold uppercase tracking-wider">Field Submission</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5">
                            <div className="text-2xl md:text-3xl font-black text-cyan-400 mb-1">100% Exact</div>
                            <div className="text-xs text-white/50 font-bold uppercase tracking-wider">GPS Geocoding</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5">
                            <div className="text-2xl md:text-3xl font-black text-green-400 mb-1">Automated</div>
                            <div className="text-xs text-white/50 font-bold uppercase tracking-wider">SMS Review Routing</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5">
                            <div className="text-2xl md:text-3xl font-black text-white mb-1">0 WordPress</div>
                            <div className="text-xs text-white/50 font-bold uppercase tracking-wider">Blistering Next.js Speed</div>
                        </div>
                    </div>

                </div>
            </section>

            {/* The 3-Step Machine Section */}
            <section className="py-24 md:py-32 px-4 md:px-12 max-w-[1400px] mx-auto w-full">
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                        The Automated Pipeline
                    </span>
                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight text-white">
                        How PinDrop™ Works in the Field
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto mt-4 text-sm md:text-base">
                        No complicated logins or messy spreadsheets. Designed specifically for busy roofers, excavators, plumbers, and field technicians.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="relative rounded-3xl bg-slate-950/60 border border-white/10 p-8 flex flex-col justify-between hover:border-yellow-400/50 transition-colors group">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-black text-xl mb-6 group-hover:scale-110 transition-transform">
                                1
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-yellow-400 tracking-wider mb-2">
                                <Camera className="w-4 h-4" /> Step 1: On the Job Site
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">
                                Snap Photo &amp; Drop Pin
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed mb-6">
                                Your technician finishes replacing a roof in Brandon, MS or clearing land in Yazoo City. They open the PinDrop mobile web portal, snap 2 photos, type a quick 1-sentence description, and tap <strong>Drop Pin</strong>.
                            </p>
                        </div>
                        <div className="pt-4 border-t border-white/5 text-xs text-white/40 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" /> Takes under 30 seconds
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative rounded-3xl bg-slate-950/60 border border-white/10 p-8 flex flex-col justify-between hover:border-cyan-400/50 transition-colors group">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-xl mb-6 group-hover:scale-110 transition-transform">
                                2
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-cyan-400 tracking-wider mb-2">
                                <Globe className="w-4 h-4" /> Step 2: Instant SEO Sync
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">
                                Google Schema &amp; Live Map
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed mb-6">
                                PinDrop automatically extracts the precise GPS coordinates and generates machine-readable <code>LocalBusiness</code> schema. A fresh project pin instantly appears on your website&apos;s interactive map with neighborhood tags.
                            </p>
                        </div>
                        <div className="pt-4 border-t border-white/5 text-xs text-white/40 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Neighborhood SEO signals to Google
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative rounded-3xl bg-slate-950/60 border border-white/10 p-8 flex flex-col justify-between hover:border-green-400/50 transition-colors group">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 font-black text-xl mb-6 group-hover:scale-110 transition-transform">
                                3
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-green-400 tracking-wider mb-2">
                                <MessageSquare className="w-4 h-4" /> Step 3: Review Machine
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">
                                Automated SMS Review
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed mb-6">
                                Before your truck pulls out of the customer&apos;s driveway, PinDrop triggers a personalized SMS to the homeowner with a 1-tap Google Review link while they are happiest with the completed work.
                            </p>
                        </div>
                        <div className="pt-4 border-t border-white/5 text-xs text-white/40 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" /> 70%+ review response rate
                        </div>
                    </div>
                </div>
            </section>

            {/* Proof Section: Live Client Implementations */}
            <section className="py-20 px-4 md:px-12 bg-slate-950/80 border-y border-white/5">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <span className="text-yellow-400 font-mono text-xs uppercase tracking-[0.2em] font-bold block mb-2">
                                Live In Production
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                                Powering Mississippi Contractors
                            </h2>
                        </div>
                        <Link
                            href="/our-work"
                            className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 hover:text-white flex items-center gap-2 transition-colors"
                        >
                            Explore Full Engineering Portfolio <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Born Again Case Study */}
                        <div className="rounded-3xl bg-slate-900/50 border border-white/10 p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-yellow-500/20">
                                        Roofing &amp; Remodeling
                                    </span>
                                    <span className="text-xs text-white/40 font-mono">Jackson Metro, MS</span>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
                                    Born Again Roofing &amp; Remodeling
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed mb-6">
                                    Replaced a slow legacy site with Next.js and integrated PinDrop™. The team has mapped <strong>99+ live roofing and remodeling jobs</strong> across Jackson, Madison, Brandon, Clinton, and Flowood, capturing consistent 5-star Google reviews and inbound homeowner calls.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="text-xs text-yellow-400 font-bold">Verified 99+ Live Job Pins</div>
                                <a
                                    href="https://bornagainroofing.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-white font-bold uppercase tracking-wider hover:text-cyan-400 transition-colors"
                                >
                                    Visit Site →
                                </a>
                            </div>
                        </div>

                        {/* Geaux Pro Outdoors Case Study */}
                        <div className="rounded-3xl bg-slate-900/50 border border-white/10 p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-500/20">
                                        Excavation &amp; Earthmoving
                                    </span>
                                    <span className="text-xs text-white/40 font-mono">Central MS &amp; The Delta</span>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
                                    Geaux Pro Outdoors (MS Dirt)
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed mb-6">
                                    Family-operated excavation, pond building, and commercial land clearing contractor. Utilizing PinDrop™ to demonstrate heavy equipment proof and verify completed project sites across Bentonia, Yazoo City, and Central Mississippi.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="text-xs text-amber-400 font-bold">Verified Equipment Showcase</div>
                                <a
                                    href="https://msdirt.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-white font-bold uppercase tracking-wider hover:text-cyan-400 transition-colors"
                                >
                                    Visit Site →
                                </a>
                            </div>
                        </div>

                        {/* Lungrin's Lawncare Case Study */}
                        <div className="rounded-3xl bg-slate-900/50 border border-white/10 p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-500/20">
                                        Lawn Care &amp; Maintenance
                                    </span>
                                    <span className="text-xs text-white/40 font-mono">Flora &amp; Pocahontas, MS</span>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
                                    Lungrin&apos;s Lawncare LLC
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed mb-6">
                                    Precision lawn maintenance, seasonal yard cleanup, and pine straw contractor in Flora and Pocahontas. Scheduled for PinDrop™ installation to automatically log completed neighborhood projects and capture automated Google reviews.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="text-xs text-emerald-400 font-bold">PinDrop™ Deploying</div>
                                <a
                                    href="https://lungrinslawncare.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-white font-bold uppercase tracking-wider hover:text-cyan-400 transition-colors"
                                >
                                    Visit Site →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA Banner */}
            <section className="py-24 px-4 md:px-12 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
                        Ready to Install PinDrop™ on Your Website?
                    </h2>
                    <p className="text-white/70 max-w-xl mx-auto text-base md:text-lg mb-8 leading-relaxed">
                        PinDrop™ is only available to Power Digital Media web clients. Book a quick strategy session to see a live demo on your smartphone.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="/book"
                            className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-400 hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] text-center"
                        >
                            Book a 15-Minute Strategy Call
                        </a>
                        <a
                            href="tel:6014462393"
                            className="w-full sm:w-auto px-10 py-5 rounded-full border border-white/20 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all text-center"
                        >
                            Call (601) 446-2393
                        </a>
                    </div>
                </div>
            </section>

            <DeferredFooterSections />
        </main>
    );
}
