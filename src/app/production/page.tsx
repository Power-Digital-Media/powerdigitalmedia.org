"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Portfolio from "@/components/sections/Portfolio";
import ProductionPipeline from "@/components/ui/ProductionPipeline";
import BookingModal from "@/components/ui/BookingModal";
import { useState } from "react";
import Image from "next/image";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import PodcastingCommandBar from "@/components/ui/PodcastingCommandBar";
import WakeUpCall from "@/components/ui/WakeUpCall";
import MultiCamArchitect from "@/components/ui/MultiCamArchitect";
import RawVsGradedSlider from "@/components/ui/RawVsGradedSlider";
import FAQAccordion from "@/components/ui/FAQAccordion";

const tiers = [
    {
        id: "prod_field_acquisition",
        name: "Field Acquisition",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_FIELD || "price_field_placeholder",
        price: "500",
        description: "Professional on-location capture. We secure the high-fidelity raw assets for your library.",
        features: [
            "On-Location Shoot (Event/Brand)",
            "Dual-Cam 4K Acquisition",
            "Professional Audio Capture",
            "Full RAW Footage Delivery",
            "Asset Ownership Transfer"
        ],
        type: "one-time"
    },
    {
        id: "prod_live_stream",
        name: "Live Broadcast",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_LIVE || "price_prod_live_placeholder",
        price: "750",
        description: "Zero-latency event streaming. Real-time engagement for your global audience.",
        features: [
            "On-Location Live Stream",
            "Quad-Platform Sync (YT/FB/Kick/Rumble)",
            "Professional Mixer Integration",
            "Real-time Technical Direction",
            "VOD Archive Delivery"
        ],
        type: "one-time",
        highlight: "border-cyan-400/30 bg-cyan-400/[0.02]"
    },
    {
        id: "prod_protocol",
        name: "Production Protocol",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_PROTOCOL || "price_prod_protocol_placeholder",
        price: "1,000",
        description: "The complete content engine. From capture to a cinematic final cut ready for delivery.",
        features: [
            "Everything in 'Field Acquisition'",
            "Full Cinematic Editing",
            "Color Grading & Sound Design",
            "YouTube/Vimeo Ready Export",
            "Advanced Motion Graphics"
        ],
        type: "one-time",
        popular: true
    },
    {
        id: "prod_authority",
        name: "Authority Package",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_AUTHORITY || "price_prod_authority_placeholder",
        price: "1,500",
        description: "The ultimate digital footprint. A cinematic masterpiece plus a month's worth of viral social assets.",
        features: [
            "Everything in 'Production Protocol'",
            "4 High-Velocity Social Clips",
            "Viral-Ready Subtitles & Framing",
            "Content Distribution Strategy",
            "Priority Post-Production"
        ],
        type: "one-time"
    }
];

export default function ProductionPage() {
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
                    mode: 'payment',
                    successUrl: window.location.origin + "/production?success=true",
                    cancelUrl: window.location.origin + "/production?canceled=true",
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

    const baseUrl = "https://powerdigitalmedia.org";
    const breadcrumbItems = [
        { name: "Services", url: `${baseUrl}/#services` },
        { name: "Production", url: `${baseUrl}/production` }
    ];

    return (
        <main className="relative min-h-screen bg-background overflow-x-clip">
            <BreadcrumbSchema items={breadcrumbItems} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Cinematic Production & Podcasting",
                        "provider": {
                            "@id": "https://powerdigitalmedia.org/#organization"
                        },
                        "description": "Studio-grade cinema services, high-end video podcasts, and commercial production for dynamic brands and creators.",
                        "category": "Video Production",
                        "serviceType": "Commercial Video Production",
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
                            "lowPrice": "500",
                            "highPrice": "4000+"
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
                                "name": "Do you travel for video production?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, our Multi-Cam Architect framework is highly mobile. We deploy cinematic crews across the region to capture on-location footage."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What type of cameras do you use?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "We operate exclusively on premium 4K to 8K cinema camera systems, including high-end Sony Alpha setups, built for flawless low-light performance and maximum dynamic range."
                                }
                            }
                        ]
                    })
                }}
            />
            <Navbar />

            <PodcastingCommandBar />

            {/* Cinematic Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#020202]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2070&auto=format&fit=crop"
                        alt="On-Location Production Floor"
                        fill
                        className="object-cover opacity-10 mix-blend-luminosity scale-105 filter blur-sm"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#020202]/80 to-background" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
                </div>

                <div className="container px-4 mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="max-w-2xl"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                Live Deployment: 1 Slot Left
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.85] uppercase">
                                Cinematic <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-glow-cyan">
                                    Firepower.
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed mb-10 font-light border-l-2 border-cyan-400/50 pl-6">
                                We bring studio-grade cinema directly to your event, brand, or location. We don't just point a camera. We architect a <span className="text-white font-bold">multi-angle narrative</span> built for conversion and high-authority distribution.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="w-full sm:w-auto px-10 py-5 bg-cyan-400 text-slate-950 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-[0_0_40px_rgba(34,211,238,0.2)] flex items-center justify-center gap-2 group"
                                >
                                    Claim Your Slot <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <span className="text-xs text-foreground/40 font-mono tracking-widest uppercase">
                                    Fully Managed • Zero Tech Headaches
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="relative lg:h-[600px] flex justify-center items-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-blue-500/5 rounded-3xl border border-white/5 backdrop-blur-sm overflow-hidden flex flex-col">
                                {/* Faux Camera UI Header */}
                                <div className="h-10 bg-black/40 border-b border-white/5 flex items-center justify-between px-4">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest">REC 00:14:23:09</span>
                                    </div>
                                    <div className="flex gap-3 text-[10px] font-mono text-white/50">
                                        <span>120FPS</span>
                                        <span>8K RAW</span>
                                        <span>S-LOG 3</span>
                                    </div>
                                </div>
                                <div className="flex-1 relative">
                                    <Image
                                        src="/cinematic_camera.png"
                                        alt="Cinematic Target"
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Rule of thirds crosshairs */}
                                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                                        <div className="border-b border-r border-white/10" />
                                        <div className="border-b border-r border-white/10" />
                                        <div className="border-b border-white/10" />
                                        <div className="border-b border-r border-white/10" />
                                        <div className="border-b border-r border-white/10 relative">
                                            {/* Center focus bracket */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-cyan-400/50 flex items-center justify-center">
                                                <div className="w-1 h-1 bg-cyan-400/50" />
                                            </div>
                                        </div>
                                        <div className="border-b border-white/10" />
                                        <div className="border-r border-white/10" />
                                        <div className="border-r border-white/10" />
                                        <div className="" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <WakeUpCall
                title="You spent $20,000 on the venue. But the video makes it look like it was shot on a security camera."
                subtitle="Your event ROI shouldn't die the moment the doors close."
                paragraph="You flew in the speakers. You rented the lighting. You packed the room. But if the final video output is flat, washed out, and boring—that's how the entire internet will perceive your brand forever. We don't do shaky cameras in the back of the room. We deploy full cinema cameras, heavy staging, and live-grading to ensure your brand looks like a blockbuster."
            />

            {/* Answer Engine Optimization Block */}
            <section className="py-12 bg-[#050505] border-y border-white/5 relative z-20">
                <div className="container px-4 mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">What is Cinematic Production?</h2>
                    <p className="text-foreground/70 leading-relaxed font-light">
                        Cinematic Production is the process of capturing studio-grade, multi-cam 4K and 8K video for high-end commercial use and video podcasting. We utilize premium cinema camera systems, specialized lighting architectures, and professional color grading strictly tailored for maximum brand authority and Answer Engine discovery.
                    </p>
                </div>
            </section>

            <MultiCamArchitect />

            <RawVsGradedSlider />

            {/* Pricing Section */}
            <section id="tiers" className="py-24 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-20 text-balance uppercase tracking-tighter">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] text-[10px] mb-4 block">Deployment Tiers</span>
                        <h2 className="text-4xl md:text-6xl font-black">Event <span className="text-white/40">Production.</span></h2>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-4">
                        {tiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative group p-8 rounded-[2.5rem] glass-card border transition-all duration-500 flex flex-col ${tier.popular ? "border-cyan-400/40 bg-cyan-400/[0.03] lg:scale-105" : "border-white/5 hover:border-white/20"
                                    }`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-400 text-slate-950 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        Top Choice
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">{tier.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black">${tier.price}</span>
                                        <span className="text-white/20 text-xs uppercase tracking-widest font-bold">Investment</span>
                                    </div>
                                    <p className="mt-4 text-sm text-foreground/50 leading-relaxed italic">
                                        {tier.description}
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-foreground/40">
                                            <CheckCircle2 className="w-3 h-3 text-cyan-400/50" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleCheckout(tier)}
                                    disabled={isProcessing !== null}
                                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${tier.popular ? "bg-cyan-400 text-slate-950 hover:bg-white" : "bg-white/5 hover:bg-white text-white hover:text-slate-950"
                                        }`}
                                >
                                    {isProcessing === tier.id ? (
                                        <div className="w-4 h-4 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
                                    ) : (
                                        "Initialize Build"
                                    )}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <ProductionPipeline />

            <Portfolio titleAs="h2" />

            <FAQAccordion
                faqs={[
                    {
                        question: "Do you travel for video production?",
                        answer: "Yes, our Multi-Cam Architect framework is highly mobile. We deploy cinematic crews across the region to capture on-location footage."
                    },
                    {
                        question: "What type of cameras do you use?",
                        answer: "We operate exclusively on premium 4K to 8K cinema camera systems, including high-end Sony Alpha setups, built for flawless low-light performance and maximum dynamic range."
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
