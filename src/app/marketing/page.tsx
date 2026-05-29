"use client";
import { motion } from "framer-motion";
import { 
    TrendingUp, 
    Zap, 
    CheckCircle2, 
    ArrowRight, 
    Star, 
    Youtube, 
    Image as ImageIcon, 
    Search, 
    BarChart3, 
    MousePointerClick, 
    Database, 
    MailCheck, 
    ShieldCheck, 
    Video 
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Portfolio from "@/components/sections/Portfolio";
import BookingModal from "@/components/ui/BookingModal";
import { useState } from "react";
import Image from "next/image";
import WakeUpCall from "@/components/ui/WakeUpCall";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CyberHeroBg from "@/components/ui/shared/CyberHeroBg";

const tiers = [
    {
        id: "meta_micro",
        name: "Campaign Ignition",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_MICRO || "price_social_micro_placeholder",
        price: "1,000",
        description: "Precision Meta Ad architecture setup. The tactical entry for local businesses looking to build a high-performance customer bridge.",
        features: [
            "Custom Thumb-Stopping Ad Creatives",
            "Local Audience Target Engineering",
            "Meta Pixel & API Telemetry Setup",
            "High-Converting Lead Form Setup",
            "First-Month Strategy Optimization"
        ],
        type: "one-time"
    },
    {
        id: "meta_velocity",
        name: "Ad Dominance",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_VELOCITY || "price_social_velocity_placeholder",
        price: "1,500",
        description: "The complete monthly paid growth protocol. Continuous A/B creative testing, budget optimization, and strategic scaling.",
        features: [
            "Unlimited Multi-Format Ad Testing",
            "Complete Campaign Management",
            "Advanced Customer Retargeting Funnels",
            "Continuous Cost-Per-Lead (CPA) Reductions",
            "Monthly Growth Intelligence Analytics"
        ],
        type: "monthly",
        popular: true,
        highlight: "border-blue-500/30 bg-blue-500/[0.02]"
    },
    {
        id: "meta_strategy",
        name: "Market Takeover",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH_STRATEGY || "price_growth_strategy_placeholder",
        price: "2,000",
        description: "The ultimate local scaling partnership. High-budget scaling, automated B2B workflows, and omni-channel support.",
        features: [
            "Everything in 'Ad Dominance' tier",
            "Automated B2B Lead Nurture Funnels",
            "Direct Capsule CRM Custom Mapping",
            "Transpond Email Automation Overhaul",
            "Weekly Priority Strategy Sync"
        ],
        type: "monthly"
    }
];

export default function MarketingPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState<string | null>(null);

    const handleCheckout = async (tier: any) => {
        setIsProcessing(tier.id);

        // Safety check for placeholder IDs
        if (tier.priceId.includes('placeholder')) {
            alert(`⚠️ Stripe Not Configured\n\nThis tier is currently using a placeholder ID (${tier.id}). Please ensure the real Stripe Price ID is added to the environment variables.`);
            setIsProcessing(null);
            return;
        }

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: [{ price: tier.priceId, quantity: 1 }],
                    mode: tier.type === 'monthly' ? 'subscription' : 'payment',
                    successUrl: window.location.origin + "/marketing?success=true",
                    cancelUrl: window.location.origin + "/marketing?canceled=true",
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Stripe Error Details:", data);
                alert(`❌ Checkout Failed: ${data.error || "Unknown error"}\n\nThis is usually due to an incorrect Price ID or missing Stripe Keys in the environment.`);
            }
        } catch (error) {
            console.error("Technical handshake failed:", error);
            alert("Secure pipe connection interrupted. Check console for details.");
        } finally {
            setIsProcessing(null);
        }
    };

    return (
        <main className="relative min-h-screen bg-background overflow-x-clip text-white">
            <Navbar />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Meta Ads & Paid Social Acquisition",
                        "provider": {
                            "@id": "https://powerdigitalmedia.org/#organization"
                        },
                        "description": "High-performance Meta ad campaigns, local lead generation funnels, and automated CRM integration pipelines for Mississippi businesses seeking high-ticket clients.",
                        "category": "Digital Marketing",
                        "serviceType": "Paid Social Advertising",
                        "areaServed": {
                            "@type": "City",
                            "name": "Jackson",
                            "containedInPlace": {
                                "@type": "State",
                                "name": "Mississippi"
                            }
                        },
                        "offers": {
                            "@type": "AggregateOffer",
                            "priceCurrency": "USD",
                            "lowPrice": "1000",
                            "highPrice": "2000+"
                        }
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Do your marketing prices include ad spend?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "No. Our pricing tiers ($1,000 to $2,000/month) cover campaign management, custom ad creatives, A/B testing, and CRM funnel integrations. Ad spend is paid directly to Meta."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What platforms do you run ads on?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "We specialize exclusively in Meta (Facebook and Instagram) paid ads because they offer the lowest cost-per-lead and most precise geographical targeting for local Mississippi businesses."
                                }
                            }
                        ]
                    })
                }}
            />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] lg:min-h-[100vh] flex flex-col justify-center pt-32 pb-24 md:py-0 overflow-hidden">
                <CyberHeroBg variant="marketing" />

                {/* 3D Isometric Telemetry Centerpiece Background (Aligned with Home/Web-Design Visual Language) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[380px] h-[380px] md:w-[650px] md:h-[650px] opacity-[0.22] md:opacity-[0.20] pointer-events-none mix-blend-screen z-0">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                        {/* Core glow behind the telemetry graphic to blend it elegantly */}
                        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
                        <Image 
                            src="/images/marketing_telemetry_system.png" 
                            alt="Marketing Telemetry Background System" 
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                <div className="container relative z-10 px-4 mx-auto text-center mt-4 md:mt-16 mb-4">
                    <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mx-auto">
                            <TrendingUp className="w-3 h-3 animate-pulse" />
                            Local B2B Paid Social Engines
                        </div>

                        <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                            High-Speed <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-glow-blue block mt-2">
                                Ad Funnels.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
                            Stop wasting money on boosted posts. We build high-converting paid social campaigns that capture qualified local leads and sync them directly into <strong className="text-blue-400 font-bold">Capsule CRM</strong> in milliseconds.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4 w-full sm:w-auto">
                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="w-full sm:w-auto px-10 py-5 bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-blue-500 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2 group animate-[pulse_3s_infinite_alternate]"
                            >
                                Schedule Strategy Call
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <a
                                href="#tiers"
                                className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 text-center block"
                            >
                                Explore Deployment Tiers
                            </a>
                        </div>
                    </div>

                    {/* Telemetry Active Pulse Indicator Bar (High-end sub-trust bar) */}
                    <div className="mt-14 mb-4 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-950/20 backdrop-blur-sm">
                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400">TELEMETRY ACTIVE: CAPSULE CRM SYNC LIVE</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Answer Engine Optimization Block */}
            <section className="py-16 bg-[#040406] border-y border-white/5 relative z-20">
                <div className="container px-4 mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl md:text-3xl font-black mb-6 uppercase tracking-tight">Jackson MS Local Lead Acquisition</h2>
                    <p className="text-slate-300 leading-relaxed font-light text-base md:text-lg">
                        Paid acquisition is the science of placing your message directly in front of buyers at the exact moment of decision. By leveraging precision Meta advertising, local geolocation targets, custom direct-response creatives, and automated server-side data routing, we construct frictionless acquisition tunnels that drive calls, emails, and direct revenue for local Mississippi businesses.
                    </p>
                </div>
            </section>

            <WakeUpCall
                title="Boosting Facebook posts is not a strategy. It's a donation to Mark Zuckerberg."
                subtitle="Hope is not a growth mechanism."
                paragraph="If you are running social media ads without an automated pipeline, you do not have an advertising problem—you have a funnel problem. We design scroll-stopping custom video/photo ad creatives and pair them with optimized lead captures that sync leads straight into Capsule CRM, turning ad spend into predictable revenue."
            />

            {/* Interactive Conversion Telemetry Pipeline */}
            <section className="py-24 border-y border-white/5 bg-[#030306] relative z-10">
                <div className="container px-4 mx-auto max-w-5xl">
                    <div className="text-center mb-16 uppercase tracking-tighter">
                        <span className="text-blue-400 font-bold tracking-[0.4em] text-[10px] mb-4 block">The Lead Pipeline</span>
                        <h2 className="text-3xl md:text-5xl font-black">How We <span className="text-white/40">Sync Growth.</span></h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-4 relative">
                        
                        {/* Pipeline Step 1 */}
                        <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4 hover:border-blue-500/30 transition-all duration-300">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                <MousePointerClick className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">Phase 01</span>
                                <h3 className="font-bold text-sm uppercase tracking-wide">The Scroll Hook</h3>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Thumb-stopping direct response creatives designed to disrupt personal feeds and capture attention.
                            </p>
                        </div>

                        {/* Pipeline Step 2 */}
                        <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4 hover:border-indigo-500/30 transition-all duration-300">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Phase 02</span>
                                <h3 className="font-bold text-sm uppercase tracking-wide">In-App Capture</h3>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Custom Meta lead forms auto-fill prospect contact details in 1-tap, slashing mobile friction by 90%.
                            </p>
                        </div>

                        {/* Pipeline Step 3 */}
                        <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4 hover:border-purple-500/30 transition-all duration-300">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400">
                                <Database className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">Phase 03</span>
                                <h3 className="font-bold text-sm uppercase tracking-wide">300ms CRM Sync</h3>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Lead telemetry is instantly posted directly into Capsule CRM and tagged for immediate tracking.
                            </p>
                        </div>

                        {/* Pipeline Step 4 */}
                        <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4 hover:border-cyan-500/30 transition-all duration-300">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                                <MailCheck className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">Phase 04</span>
                                <h3 className="font-bold text-sm uppercase tracking-wide">Welcome Protocol</h3>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Instant welcome email triggers via Transpond list sync, warm-calling the customer automatically.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* B2B Local Trust Review Grid */}
            <section className="py-24 border-b border-white/5 bg-white/[0.01] relative z-10">
                <div className="container px-4 mx-auto max-w-5xl">
                    <div className="text-center mb-16 uppercase tracking-tighter">
                        <span className="text-blue-400 font-bold tracking-[0.4em] text-[10px] mb-4 block">Proven Reputation</span>
                        <h2 className="text-3xl md:text-5xl font-black">Trusted Local <span className="text-white/40">Authority.</span></h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        
                        {/* Google Review */}
                        <div className="p-8 rounded-3xl glass-card border border-white/5 space-y-6 relative overflow-hidden">
                            <div className="flex items-center gap-1.5 text-amber-400">
                                <Star className="w-4 h-4 fill-amber-400" />
                                <Star className="w-4 h-4 fill-amber-400" />
                                <Star className="w-4 h-4 fill-amber-400" />
                                <Star className="w-4 h-4 fill-amber-400" />
                                <Star className="w-4 h-4 fill-amber-400" />
                                <span className="text-xs font-bold text-white/50 ml-2">5.0 Star</span>
                            </div>
                            <p className="text-xs text-slate-300 italic leading-relaxed">
                                "The speed they achieved with Next.js is incredible, and tying our landing pages straight to our Capsule CRM list has completely automated our customer follow-up strategy. Absolute pros."
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-black text-[10px]">G</div>
                                <div>
                                    <h4 className="font-bold text-xs uppercase">Google Business Citation</h4>
                                    <span className="text-[9px] text-slate-400 tracking-wider">Madison, MS</span>
                                </div>
                            </div>
                        </div>

                        {/* BBB Review */}
                        <div className="p-8 rounded-3xl glass-card border border-white/5 space-y-6 relative overflow-hidden">
                            <div className="flex items-center gap-1.5 text-amber-400">
                                <Star className="w-4 h-4 fill-amber-400" />
                                <Star className="w-4 h-4 fill-amber-400" />
                                <Star className="w-4 h-4 fill-amber-400" />
                                <Star className="w-4 h-4 fill-amber-400" />
                                <Star className="w-4 h-4 fill-amber-400" />
                                <span className="text-xs font-bold text-white/50 ml-2">A+ Rating</span>
                            </div>
                            <p className="text-xs text-slate-300 italic leading-relaxed">
                                "Power Digital Media built our marketing campaigns and automated routing setup with complete transparency. They took time to understand our local customers and designed visually stunning assets."
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-black text-[10px]">B</div>
                                <div>
                                    <h4 className="font-bold text-xs uppercase">BBB Business Directory</h4>
                                    <span className="text-[9px] text-slate-400 tracking-wider">Jackson, MS</span>
                                </div>
                            </div>
                        </div>

                        {/* Facebook Review */}
                        <div className="p-8 rounded-3xl glass-card border border-white/5 space-y-6 relative overflow-hidden">
                            <div className="flex items-center gap-1.5 text-amber-400">
                                <Star className="w-4 h-4 fill-amber-400" />
                                <Star className="w-4 h-4 fill-amber-400" />
                                <Star className="w-4 h-4 fill-amber-400" />
                                <Star className="w-4 h-4 fill-amber-400" />
                                <Star className="w-4 h-4 fill-amber-400" />
                                <span className="text-xs font-bold text-white/50 ml-2">Recommended</span>
                            </div>
                            <p className="text-xs text-slate-300 italic leading-relaxed">
                                "Unlike other agencies who just boosted posts and brought zero trackable leads, Damein set up direct Capsule lead sync and automated forms. Our ad ROI is now fully clear."
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-black text-[10px]">F</div>
                                <div>
                                    <h4 className="font-bold text-xs uppercase">Facebook Recommendations</h4>
                                    <span className="text-[9px] text-slate-400 tracking-wider">Brandon, MS</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Strategic Pillars */}
            <section className="py-24 border-b border-white/5 bg-slate-950/20">
                <div className="container px-4 mx-auto">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center group">
                            <div className="w-16 h-16 rounded-[2rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <ImageIcon className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Creative Architecture</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-light">
                                Custom, direct-response design mockups and high-velocity copy built to capture attention and stop the scroll.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Search className="w-8 h-8 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Target Engineering</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-light">
                                Deep geolocated audience targeting and pixel API tracking configuration to match your ads against ready buyers.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 rounded-[2rem] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-8 h-8 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Growth Intelligence</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-light">
                                Pure metric analytics. We measure real lead counts and client acquisition costs rather than empty likes or boosting views.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="tiers" className="py-24 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-20 text-balance uppercase tracking-tighter">
                        <span className="text-blue-400 font-bold tracking-[0.4em] text-[10px] mb-4 block">Deployment Tiers</span>
                        <h2 className="text-4xl md:text-6xl font-black">Growth <span className="text-white/40">Funnels.</span></h2>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
                        {tiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative group p-8 rounded-[2.5rem] glass-card border transition-all duration-500 flex flex-col ${tier.popular ? "border-blue-500/40 bg-blue-500/[0.03] lg:scale-105 shadow-[0_0_40px_rgba(59,130,246,0.1)]" : "border-white/5 hover:border-white/20"
                                    }`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        Authority Protocol
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">{tier.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black">${tier.price}</span>
                                        <span className="text-white/20 text-[10px] uppercase tracking-widest font-bold">
                                            {tier.type === "monthly" ? "/ Month" : "Investment"} <span className="text-white/50 ml-1">+ Ad Spend</span>
                                        </span>
                                    </div>
                                    <p className="mt-4 text-sm text-slate-400 leading-relaxed font-light">
                                        {tier.description}
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Dual-Path Conversion CTAs */}
                                <div className="space-y-4">
                                    {/* Primary CTA: Schedule Strategy Onboarding */}
                                    <button
                                        onClick={() => setIsBookingOpen(true)}
                                        className="w-full py-5 rounded-2xl bg-blue-500 hover:bg-white text-white hover:text-blue-600 shadow-glow font-black uppercase tracking-widest text-[10px] transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Video className="w-3.5 h-3.5 text-cyan-400 group-hover:text-blue-500" />
                                        Schedule Strategy Onboarding
                                    </button>

                                    {/* Secondary CTA: Direct Stripe Checkout */}
                                    <button
                                        onClick={() => handleCheckout(tier)}
                                        disabled={isProcessing !== null}
                                        className="w-full py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white text-white/50 hover:text-black font-black uppercase tracking-widest text-[9px] transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        {isProcessing === tier.id ? (
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            "Secure Online Stripe Setup"
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Portfolio titleAs="h2" />

            <FAQAccordion
                faqs={[
                    {
                        question: "Do your marketing prices include ad spend?",
                        answer: "No. Our pricing tiers ($1,000 to $2,000/month) cover marketing strategy setup, custom creative asset generation, ongoing pixel tracking management, campaign monitoring, and direct CRM sync systems. Ad spend budget is paid directly to Meta."
                    },
                    {
                        question: "What platforms do you run ads on?",
                        answer: "We focus 100% on Meta (Facebook and Instagram) paid social campaigns. For local consumer-facing businesses and B2B services, Meta provides the highest concentration of localized search intent and lowest acquisition costs."
                    },
                    {
                        question: "Is there a long term contract lock?",
                        answer: "No. Our retentive campaign management packages operate on simple month-to-month contracts. We believe in earning your local partnership every single month through clear leads and active database sync."
                    }
                ]}
            />

            {/* Capsule CRM Affiliate Trust Strip */}
            <section className="relative z-10 py-6 border-t border-white/5 bg-white/[0.01]">
                <div className="container px-4 mx-auto flex items-center justify-center">
                    <a
                        href="https://get.capsulenow.io/power-digital-media-llc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-emerald-400/30 transition-all group"
                        title="CRM Powered by Capsule"
                    >
                        {/* Capsule CRM Icon */}
                        <svg className="w-5 h-5 text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2C6.48 2 2 6 2 10.5c0 3 1.5 5.5 4 7v4.5l3.5-2c.8.2 1.6.3 2.5.3 5.52 0 10-4 10-8.5S17.52 2 12 2z" />
                            <circle cx="8" cy="10.5" r="1" fill="currentColor" />
                            <circle cx="12" cy="10.5" r="1" fill="currentColor" />
                            <circle cx="16" cy="10.5" r="1" fill="currentColor" />
                        </svg>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground group-hover:text-emerald-400 transition-colors">
                            CRM Powered by Capsule
                        </span>
                    </a>
                </div>
            </section>

            <Footer />

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </main>
    );
}
