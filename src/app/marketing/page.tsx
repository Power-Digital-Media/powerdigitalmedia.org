"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap, CheckCircle2, ArrowRight, Star, Youtube, Image as ImageIcon, Search, BarChart3 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Portfolio from "@/components/sections/Portfolio";
import ProductionPipeline from "@/components/ui/ProductionPipeline";
import BookingModal from "@/components/ui/BookingModal";
import { useState } from "react";
import Image from "next/image";
import WakeUpCall from "@/components/ui/WakeUpCall";
import FAQAccordion from "@/components/ui/FAQAccordion";

const tiers = [
    {
        id: "meta_micro",
        name: "Campaign Ignition",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_MICRO || "price_social_micro_placeholder",
        price: "1,000",
        description: "The tactical entry for businesses. Precision Meta Ad setup and initial targeting.",
        features: [
            "Custom Ad Creatives",
            "Target Audience Engineering",
            "Campaign Setup & Launch",
            "Pixel & Conversion Tracking",
            "First-Month Optimization"
        ],
        type: "one-time"
    },
    {
        id: "meta_velocity",
        name: "Ad Dominance",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_VELOCITY || "price_social_velocity_placeholder",
        price: "1,500",
        description: "The complete monthly paid growth protocol. Continuous ad testing and strategic scaling.",
        features: [
            "Unlimited Creative Testing*",
            "Full Campaign Management",
            "A/B Testing for Lower CPA",
            "Advanced Retargeting Funnels",
            "Monthly Analytics Report"
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
        description: "The ultimate scaling partnership. High-budget optimization, lead routing, and omni-channel support.",
        features: [
            "Everything in 'Ad Dominance'",
            "Strategic Scaling Consulting",
            "Automated Lead Gen Workflows",
            "Landing Page Optimization",
            "Priority Support Line"
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
        <main className="relative min-h-screen bg-background overflow-x-clip">
            <Navbar />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Meta Ads & Paid Acquisition",
                        "provider": {
                            "@id": "https://powerdigitalmedia.org/#organization"
                        },
                        "description": "Precision Meta ad campaigns, algorithmic funnel engineering, and paid acquisition protocols for businesses seeking measurable ROI.",
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
                                    "text": "No. Our pricing tiers ($1,000 to $2,000/month) cover campaign management, custom ad creatives, A/B testing, and funnel optimization. Ad spend is managed directly through your Meta Business Manager."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What platforms do you run ads on?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "We specialize exclusively in Meta (Facebook and Instagram) ads to build high-velocity conversion funnels."
                                }
                            }
                        ]
                    })
                }}
            />

            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center pt-24 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                        alt="Digital Growth Architecture"
                        fill
                        className="object-cover opacity-10 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                </div>

                <div className="container px-4 mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                            <TrendingUp className="w-3 h-3 animate-pulse" />
                            Paid Acquisition Protocols
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.85] uppercase text-balance">
                            Build <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-glow-blue">
                                Scale.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
                            We don&apos;t just run ads. We engineer <span className="text-white font-medium italic">algorithmic funnels</span> through precision Meta campaigns and high-conversion assets.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="px-12 py-6 bg-blue-500 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-blue-500 transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                            >
                                Initiate Campaign
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Answer Engine Optimization Block */}
            <section className="py-12 bg-[#050505] border-y border-white/5 relative z-20">
                <div className="container px-4 mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">What is Meta Ads Acquisition?</h2>
                    <p className="text-foreground/70 leading-relaxed font-light">
                        Meta Ads Acquisition is the deployment of precision advertising campaigns across Facebook and Instagram to drive immediate, measurable revenue. Instead of basic boosting, we engineer algorithmic funnels, utilize custom data-driven creatives, and optimize pixel tracking to systematically capture high-ticket leads and customers.
                    </p>
                </div>
            </section>

            <WakeUpCall
                title="Boosting posts is not a strategy. It's a donation to Mark Zuckerberg."
                subtitle="Hope is not a growth mechanism."
                paragraph="If you are burning budget on Meta ads without a solid architecture, you don't have an ad problem—you have a funnel problem. We engineer ruthless targeting strategies and high-converting creatives that force the ecosystem to bring you qualified leads, scaling your revenue with absolute precision."
            />

            {/* Strategic Pillars */}
            <section className="py-24 border-y border-white/5 bg-white/[0.01]">
                <div className="container px-4 mx-auto">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center group">
                            <div className="w-16 h-16 rounded-[2rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <ImageIcon className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Creative Architecture</h3>
                            <p className="text-sm text-foreground/50 leading-relaxed italic">
                                Visuals and direct-response copy designed to stop the scroll and force the click.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Search className="w-8 h-8 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Algorithmic Targeting</h3>
                            <p className="text-sm text-foreground/50 leading-relaxed italic">
                                Deep audience extraction and pixel optimization to place your ads in front of proven buyers.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 rounded-[2rem] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-8 h-8 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Growth Intelligence</h3>
                            <p className="text-sm text-foreground/50 leading-relaxed italic">
                                Data-driven strategy. We analyze the metrics to steer your brand toward total authority.
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
                        <h2 className="text-4xl md:text-6xl font-black">Meta <span className="text-white/40">Funnels.</span></h2>
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
                                    <p className="mt-4 text-sm text-foreground/50 leading-relaxed italic">
                                        {tier.description}
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-foreground/40">
                                            <CheckCircle2 className="w-3 h-3 text-blue-500/50" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleCheckout(tier)}
                                    disabled={isProcessing !== null}
                                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${tier.popular ? "bg-blue-500 text-white hover:bg-white hover:text-blue-500 shdaow-glow" : "bg-white/5 hover:bg-white text-white hover:text-slate-950"
                                        }`}
                                >
                                    {isProcessing === tier.id ? (
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        "Initialize Protocol"
                                    )}
                                </button>
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
                        answer: "No. Our pricing tiers ($1,000 to $2,000/month) cover campaign management, custom ad creatives, A/B testing, and funnel optimization. Ad spend is managed directly through your Meta Business Manager."
                    },
                    {
                        question: "What platforms do you run ads on?",
                        answer: "We specialize exclusively in Meta (Facebook and Instagram) ads to build high-velocity conversion funnels."
                    }
                ]}
            />

            <Footer />

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </main>
    );
}
