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
import BookingModal from "@/components/ui/BookingModal";
import { useState } from "react";
import Image from "next/image";
import WakeUpCall from "@/components/ui/WakeUpCall";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CyberHeroBg from "@/components/ui/shared/CyberHeroBg";
import Portfolio from "@/components/sections/Portfolio";


const tiers = [
    {
        id: "meta_micro",
        name: "Campaign Ignition",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_MICRO || "price_social_micro_placeholder",
        price: "1,000",
        description: "Tactical Meta ad architecture paired with precision landing capture forms. Instantly syncs and tags names, emails, and company details in your list.",
        features: [
            "Custom Thumb-Stopping Ad Creatives",
            "Local Geotarget Audience Engineering",
            "Meta Pixel & Conversion API Telemetry",
            "Frictionless B2B Lead Funnel Setup",
            "Transpond Active Sync (List 186443)"
        ],
        type: "one-time"
    },
    {
        id: "meta_velocity",
        name: "Ad Dominance & CRM Sync",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_VELOCITY || "price_social_velocity_placeholder",
        price: "1,500",
        description: "Full-scale social campaign management integrated with a native Capsule CRM database. Automatically segments and tags leads on intake.",
        features: [
            "Everything in 'Campaign Ignition'",
            "Capsule CRM Client Account Integration",
            "Automated B2B Lead-to-CRM Routing",
            "Dynamic Customer Segment Tagging",
            "Transpond Automated Welcome Sequences",
            "Monthly Lead Telemetry Reports"
        ],
        type: "monthly",
        popular: true,
        highlight: "border-blue-500/40 bg-blue-500/[0.03] lg:scale-105 shadow-[0_0_40px_rgba(59,130,246,0.1)]"
    },
    {
        id: "meta_strategy",
        name: "Market Takeover & Sales Automation",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH_STRATEGY || "price_growth_strategy_placeholder",
        price: "2,000",
        description: "The ultimate local scaling pipeline. Integrates multi-channel ad scaling, automated email nurtures, and Capsule Sales Opportunity board tracking.",
        features: [
            "Everything in 'Ad Dominance & CRM Sync'",
            "Capsule Sales Opportunities Board Setup",
            "Visual Sales Pipeline & Value Tracking",
            "Transpond Behavioral Email Nurtures",
            "Automated Lead Follow-Up Triggers",
            "Weekly Strategic Revenue Consultation"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "@id": "https://powerdigitalmedia.org/marketing/#webpage",
                        "url": "https://powerdigitalmedia.org/marketing/",
                        "speakable": {
                            "@type": "SpeakableSpecification",
                            "cssSelector": ["h1", "h2", "details > p"]
                        }
                    })
                }}
            />

            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex flex-col justify-center pt-32 pb-16 md:py-0 overflow-hidden">
                <CyberHeroBg variant="marketing" />

                <div className="container relative z-10 px-4 mx-auto text-center mt-4 md:mt-16 mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
                        <span className="text-blue-300 font-bold tracking-wider uppercase text-[10px] md:text-xs">
                            ⭐ Local Lead Generation &amp; Paid Ads
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 tracking-tight leading-[0.95] uppercase text-white">
                        Targeted Local Ads <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-400 block mt-2">
                            In Jackson, MS.
                        </span>
                    </h1>
                    <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-xl leading-relaxed font-normal">
                        Stop wasting money on boosted posts. We build high-converting paid social campaigns on Facebook and Instagram that bring in qualified quote requests and sync leads straight to your CRM.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 md:mt-10">
                        <button
                            onClick={() => setIsBookingOpen(true)}
                            className="w-full sm:w-auto px-10 py-5 bg-white text-slate-950 font-black rounded-full hover:bg-blue-400 hover:text-slate-950 transition-all uppercase tracking-wider text-xs shadow-[0_0_35px_rgba(96,165,250,0.25)] active:scale-95 text-center block"
                        >
                            Initiate Campaign Strategy
                        </button>
                        <a 
                            href="tel:6014462393"
                            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-5 border border-blue-400/40 bg-blue-500/10 text-blue-300 rounded-full font-black uppercase tracking-wider text-xs hover:bg-blue-400 hover:text-slate-950 transition-all"
                        >
                            Call (601) 446-2393
                        </a>
                        <button 
                            onClick={() => setIsBookingOpen(true)}
                            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 border border-white/20 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/10 transition-all group active:scale-95 text-white"
                        >
                            <Video className="w-3.5 h-3.5 text-blue-400 group-hover:text-white transition-colors" />
                            Book 15-Min Meeting
                        </button>
                    </div>

                    {/* Trust Signals Bar */}
                    <div className="mt-14 mb-8 flex flex-col items-center justify-center gap-4 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-950/20 backdrop-blur-sm">
                                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#3b82f6]" />
                                <span className="text-xs font-bold tracking-widest uppercase text-blue-400">Verified CRM Sync Pipelines</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]">
                                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300">BBB A+ ACCREDITED</span>
                            </div>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-foreground/40 mt-1">
                            Most agencies run generic ad setups. We build automated B2B engines.
                        </p>
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
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="text-center mb-20 uppercase tracking-tighter">
                        <span className="text-blue-400 font-bold tracking-[0.4em] text-[10px] mb-4 block">The Lead Pipeline</span>
                        <h2 className="text-3xl md:text-5xl font-black">How We <span className="text-white/40">Sync Growth.</span></h2>
                    </div>

                    <div className="grid gap-16 lg:grid-cols-12 items-center">
                        
                        {/* Pipeline Checklist Column */}
                        <div className="lg:col-span-7 space-y-6 text-left">
                            
                            {/* Pipeline Step 1 */}
                            <div className="p-6 rounded-2xl glass-card border border-white/5 flex gap-5 hover:border-blue-500/30 transition-all duration-300 items-start">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                    <MousePointerClick className="w-5 h-5" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Phase 01</span>
                                        <h3 className="font-bold text-sm uppercase tracking-wide">The Scroll Hook</h3>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Thumb-stopping direct response creatives designed to disrupt personal feeds and capture attention.
                                    </p>
                                </div>
                            </div>

                            {/* Pipeline Step 2 */}
                            <div className="p-6 rounded-2xl glass-card border border-white/5 flex gap-5 hover:border-indigo-500/30 transition-all duration-300 items-start">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Phase 02</span>
                                        <h3 className="font-bold text-sm uppercase tracking-wide">In-App Capture</h3>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Custom Meta lead forms auto-fill prospect contact details in 1-tap, slashing mobile friction by 90%.
                                    </p>
                                </div>
                            </div>

                            {/* Pipeline Step 3 */}
                            <div className="p-6 rounded-2xl glass-card border border-white/5 flex gap-5 hover:border-purple-500/30 transition-all duration-300 items-start">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400 shrink-0">
                                    <Database className="w-5 h-5" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">Phase 03</span>
                                        <h3 className="font-bold text-sm uppercase tracking-wide">300ms CRM Sync</h3>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Lead telemetry is instantly posted directly into Capsule CRM and tagged for immediate tracking.
                                    </p>
                                </div>
                            </div>

                            {/* Pipeline Step 4 */}
                            <div className="p-6 rounded-2xl glass-card border border-white/5 flex gap-5 hover:border-cyan-500/30 transition-all duration-300 items-start">
                                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                                    <MailCheck className="w-5 h-5" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">Phase 04</span>
                                        <h3 className="font-bold text-sm uppercase tracking-wide">Welcome Protocol</h3>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Instant welcome email triggers via Transpond list sync, warm-calling the customer automatically.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Interactive Visual Dashboard Column */}
                        <div className="lg:col-span-5 relative w-full flex justify-center">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative p-3 rounded-[3rem] border border-white/10 glass-card bg-slate-950/40 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group max-w-md w-full"
                            >
                                <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-blue-400/10 via-transparent to-purple-500/10 pointer-events-none" />
                                
                                {/* Telemetry Badge */}
                                <div className="absolute top-6 left-6 z-20 px-3 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400">TELEMETRY SCHEMA: CRM ACTIVE</span>
                                </div>

                                <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden bg-slate-950/80">
                                    <Image 
                                        src="/images/marketing_telemetry_system.png" 
                                        alt="Automated paid social funnel telemetry showing direct Capsule CRM syncing pipelines" 
                                        fill
                                        sizes="(max-w-md) 100vw, 400px"
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                                    />
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Verified Customer Reviews Grid */}
            <section className="py-24 border-b border-white/5 bg-white/[0.01] relative z-10">
                <div className="container px-4 mx-auto max-w-5xl">
                    <div className="text-center mb-16 uppercase tracking-tighter">
                        <span className="text-blue-400 font-bold tracking-[0.4em] text-[10px] mb-4 block">Verified Reputation</span>
                        <h2 className="text-3xl md:text-5xl font-black">100% 5-Star <span className="text-white/40">Verified Reviews.</span></h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        
                        {/* Scott Lowery Review */}
                        <div className="p-8 rounded-3xl glass-card border border-white/5 space-y-6 relative overflow-hidden flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-1 text-amber-400">
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                    </div>
                                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">Google Review</span>
                                </div>
                                <p className="text-xs text-slate-300 italic leading-relaxed">
                                    &ldquo;Took my marketing program from the dumps all the way to the moon. Very responsive and results oriented. I highly recommend!!!&rdquo;
                                </p>
                            </div>
                            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">S</div>
                                <div>
                                    <h4 className="font-bold text-xs uppercase text-white">Scott Lowery</h4>
                                    <span className="text-[10px] text-slate-400">Owner, Geaux Pro Outdoors (Bentonia, MS)</span>
                                </div>
                            </div>
                        </div>

                        {/* Jeff Johnson Review */}
                        <div className="p-8 rounded-3xl glass-card border border-white/5 space-y-6 relative overflow-hidden flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-1 text-amber-400">
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                    </div>
                                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">Google Review</span>
                                </div>
                                <p className="text-xs text-slate-300 italic leading-relaxed">
                                    &ldquo;Damein was made to do this and does everything with a spirit of excellence. He’s professional and reasonable. Looking for a web guy he is him.&rdquo;
                                </p>
                            </div>
                            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">J</div>
                                <div>
                                    <h4 className="font-bold text-xs uppercase text-white">Jeff Johnson</h4>
                                    <span className="text-[10px] text-slate-400">Local Mississippi Client</span>
                                </div>
                            </div>
                        </div>

                        {/* Joey Nash Review */}
                        <div className="p-8 rounded-3xl glass-card border border-white/5 space-y-6 relative overflow-hidden flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-1 text-amber-400">
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                    </div>
                                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">Google Review</span>
                                </div>
                                <p className="text-xs text-slate-300 italic leading-relaxed">
                                    &ldquo;Damein is always right on time. He can figure out what im looking for quickly. Im a picky person and he is patient and professional. Highly recommend.&rdquo;
                                </p>
                            </div>
                            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">J</div>
                                <div>
                                    <h4 className="font-bold text-xs uppercase text-white">Joey Nash</h4>
                                    <span className="text-[10px] text-slate-400">Local Business Owner</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Capsule & Transpond Operational Integration Pillars */}
            <section className="py-24 border-b border-white/5 bg-slate-950/20">
                <div className="container px-4 mx-auto max-w-5xl">
                    <div className="text-center mb-16 uppercase tracking-tighter">
                        <span className="text-blue-400 font-bold tracking-[0.4em] text-[10px] mb-4 block">Operational Pillars</span>
                        <h2 className="text-3xl md:text-5xl font-black">Our Certified <span className="text-white/40">Integrations.</span></h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        
                        {/* Pillar 1: Growth Funnels */}
                        <div className="text-center group">
                            <div className="w-16 h-16 rounded-[2rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <MousePointerClick className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">B2B Growth Funnels</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-light">
                                We design custom Next.js forms and paid ad flows that capture qualified local intent and route contact data into your pipeline within 300ms.
                            </p>
                        </div>

                        {/* Pillar 2: Email Marketing */}
                        <div className="text-center group">
                            <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <MailCheck className="w-8 h-8 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Email Marketing</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-light">
                                Powered by Transpond automation. Custom automated welcome flows, cold B2B nurture sequences, and newsletters triggered by target tags.
                            </p>
                        </div>

                        {/* Pillar 3: Sales Opportunities */}
                        <div className="text-center group">
                            <div className="w-16 h-16 rounded-[2rem] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Database className="w-8 h-8 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Sales Opportunities</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-light">
                                Fully configured Capsule CRM sales pipelines. Track deal values, assign pipeline stages (lead, estimate, proposal), and never lose a follow-up.
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

            {/* SOTA Interactive Glassmorphic Bento Grid Portfolio Showcase */}
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
