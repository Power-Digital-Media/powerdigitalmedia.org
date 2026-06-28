"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Users, Shield, Layers, BarChart3, Terminal as TerminalIcon, ArrowRight, Zap, Check, Video, Volume2, Key, HelpCircle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQAccordion from "@/components/ui/FAQAccordion";
import WakeUpCall from "@/components/ui/WakeUpCall";
import CyberHeroBg from "@/components/ui/shared/CyberHeroBg";
import TerminalWindow from "@/components/ui/web-design/TerminalWindow";
import AuditCTA from "@/components/sections/AuditCTA";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

interface PhoneFeature {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    icon: React.ElementType | any;
    color: string;
    bg: string;
}

const phoneFeatures: PhoneFeature[] = [
    {
        title: "IVR & Voice AI Agent",
        subtitle: "AI-Powered Routing",
        description: "Deploy a cutting-edge conversational Voice AI Agent to answer calls, handle routine tasks, and route complex requests to the right department automatically.",
        features: ["Voice AI Conversational Agent", "Multi-Level Voice Menus", "Time-of-Day Routing Rules", "Custom Welcome Greetings"],
        icon: Volume2,
        color: "text-blue-400",
        bg: "bg-blue-500/10"
    },
    {
        title: "CRM Screen Pop Sync",
        subtitle: "Customer HUDs",
        description: "Connect your phone lines directly to Capsule CRM. Instantly open customer profiles on incoming calls and automatically log call history notes.",
        features: ["Capsule CRM Screen Pops", "Automated Call Notes Log", "Direct Click-to-Dial Setup", "Missed Call Email Alerts"],
        icon: Users,
        color: "text-cyan-400",
        bg: "bg-cyan-500/10"
    },
    {
        title: "Teams & VoIP Mobility",
        subtitle: "Unified Dialing",
        description: "Make and receive corporate calls from physical desk phones, mobile apps, or directly inside Microsoft Teams via certified Teams SBC integration.",
        features: ["Microsoft Teams Certified SBC", "iOS & Android Mobile Apps", "99.999% Uptime Guarantee", "24/7/365 Live Support"],
        icon: Phone,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10"
    }
];

export default function BusinessPhonesPage() {
    const baseUrl = "https://powerdigitalmedia.org";
    const breadcrumbItems = [
        { name: "Services", url: `${baseUrl}/#services` },
        { name: "Business Phones", url: `${baseUrl}/business-phones` }
    ];

    return (
        <main className="relative min-h-screen bg-background text-foreground overflow-x-clip">
            <BreadcrumbSchema items={breadcrumbItems} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Cloud Business Phone Systems (VoIP) & Telecom Setup",
                        "provider": {
                            "@id": "https://powerdigitalmedia.org/#organization"
                        },
                        "description": "Premium cloud VoIP business phone systems, automated IVR voice menus, Capsule CRM integrations, and local Jackson MS support.",
                        "category": "Telecommunications & Business VoIP",
                        "serviceType": "Business VoIP Phone System Installation",
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
                            "lowPrice": "2500",
                            "highPrice": "4500",
                            "offerCount": 2
                        }
                    })
                }}
            />

            <Navbar />

            {/* --- Hero Section --- */}
            <section className="viewport-section relative overflow-hidden flex flex-col justify-center min-h-[90vh]">
                <CyberHeroBg variant="custom-applications" />

                <div className="container relative z-10 px-4 mx-auto text-center mt-32 md:mt-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-5xl mx-auto"
                    >
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 block">Cloud Telephony & VoIP Integration</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.85] uppercase">
                            Jackson MS <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 text-glow-cyan">
                                Business Phones
                            </span>
                        </h1>
                        <p className="text-xl md:text-3xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                            We deploy bulletproof, automated cloud VoIP phone systems integrated directly with your <span className="text-white font-medium">Capsule CRM and lead pipelines</span>. Local Jackson support.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/book" className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black rounded-full hover:bg-cyan-400 hover:text-white transition-all uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(255,255,255,0.2)] text-center">
                                Request Phone Audit
                            </Link>
                            <Link href="/book" className="w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-5 border border-white/20 rounded-full hover:bg-cyan-400 hover:text-white hover:border-cyan-400 transition-all font-bold uppercase tracking-widest text-sm group active:scale-95">
                                <Video className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
                                Schedule a Google Meet
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Scroll to Explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse" />
                </div>
            </section>

            {/* AEO Description Block */}
            <section className="py-12 bg-[#050505] border-y border-white/5 relative z-20">
                <div className="container px-4 mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">What are Cloud VoIP Business Phones?</h2>
                    <p className="text-foreground/70 leading-relaxed font-light">
                        Cloud Business Phone Systems (Voice over IP) run your office telephony through a secure internet connection rather than legacy copper wires. By integrating cloud phones with Capsule CRM and Transpond, every customer call, voicemail, and text is synced directly to the client's contact record. You get crystal-clear calling on physical desk phones, mobile softphones, and web browsers, backed by local on-site support.
                    </p>
                </div>
            </section>

            <WakeUpCall
                title="Stop missing customer calls on legacy phone lines."
                subtitle="Unanswered calls are costing you thousands in missed business."
                paragraph="If your office relies on traditional landlines or unintegrated mobile numbers, you have a fragmented workflow. When clients call, your staff has to search for customer records manually. A modern cloud VoIP phone system automatically displays customer profile 'screen pops' the second your phone rings. 100% connected, 100% automated."
            />

            {/* --- Pillars Section --- */}
            <section id="features" className="py-32 relative bg-background">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mb-24">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Telephony Specs</span>
                        <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">VoIP Phone Pillars.</h2>
                        <p className="text-xl text-foreground/60 leading-relaxed max-w-2xl font-light">
                            Our cloud phone architectures unify professional auto-attendants, Capsule CRM screen pops, and multi-device mobility under a single secure business setup.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {phoneFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="group relative p-10 rounded-[3rem] glass-card border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-700 overflow-hidden"
                            >
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[60px] md:blur-[100px] pointer-events-none rounded-[3rem] ${feature.bg.replace('/10', '/20')}`} />

                                <div className="relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}>
                                        <feature.icon className={`w-8 h-8 ${feature.color} group-hover:animate-pulse`} />
                                    </div>
                                    <span className={`${feature.color} font-bold tracking-widest uppercase text-[10px] mb-3 block transform group-hover:translate-x-2 transition-transform duration-500`}>
                                        {feature.subtitle}
                                    </span>
                                    <h3 className="text-3xl font-bold mb-6 transform group-hover:translate-x-2 transition-transform duration-500 delay-75">
                                        {feature.title}
                                    </h3>
                                    <p className="text-foreground/70 mb-10 leading-relaxed text-lg font-light transform group-hover:translate-x-2 transition-transform duration-500 delay-100">
                                        {feature.description}
                                    </p>
                                    <ul className="space-y-4">
                                        {feature.features.map((f, i) => (
                                            <li
                                                key={f}
                                                className={`flex items-center gap-3 text-sm font-medium text-foreground/50 border-l border-white/10 pl-4 transition-all duration-500 group-hover:text-foreground/80 transform group-hover:translate-x-4`}
                                                style={{ transitionDelay: `${150 + i * 75}ms` }}
                                            >
                                                <div className={`w-1.5 h-1.5 rounded-full ${feature.bg.replace('/10', '/50')} opacity-0 group-hover:opacity-100 transition-opacity absolute -left-[3px]`} />
                                                <span className="relative">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Local Support block --- */}
            <section className="viewport-section relative bg-background border-t border-white/5">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
                    <div className="absolute inset-0 cyber-grid-small opacity-10" />
                </div>

                <div className="container relative z-10 px-4 mx-auto">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">On-Site Specs</span>
                            <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tight leading-tight">Local Support.<br />100% Human.</h2>
                            <p className="text-xl text-foreground/70 mb-12 leading-relaxed font-light">
                                Standard VoIP companies mail you a box of phones and tell you to figure it out yourself. We do the opposite. We come directly to your office in Jackson, set up the physical phones, configure the voice trees, and test the CRM sync live before we leave. Local support is just a text or call away.
                            </p>
                            <div className="grid grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Zap className="w-6 h-6 text-cyan-400" />
                                        <span className="font-bold text-xl">Ultatel Partnership</span>
                                    </div>
                                    <p className="text-sm text-foreground/50">Official Ultatel cloud partner ensuring premium voice quality, 99.999% uptime, and 24/7/365 live support.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-6 h-6 text-blue-400" />
                                        <span className="font-bold text-xl">HIPAA & Compliant</span>
                                    </div>
                                    <p className="text-sm text-foreground/50">Enterprise-grade security meeting HIPAA, SOC 2, ISO 27001, PCI DSS, and NIST 800-53 compliance standards.</p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex-1 w-full max-w-md mx-auto">
                            <TerminalWindow />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Pricing & Investment --- */}
            <section id="investment" className="py-32 relative bg-background overflow-hidden scroll-mt-24 border-t border-white/5">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-24">
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Pricing Tiers</span>
                        <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">VoIP Systems Scope.</h2>
                        <p className="text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto font-light">
                            Select your phone system depth. Full local installation and on-site support included in all setups.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                        {/* Package 1 */}
                        <div className="p-8 rounded-[2.5rem] glass-card border border-white/5 bg-white/[0.01] flex flex-col justify-between">
                            <div>
                                <span className="text-cyan-400 font-bold tracking-widest uppercase text-[10px] mb-2 block">Traction Layer</span>
                                <h3 className="text-3xl font-bold text-white mb-4">Local VoIP Setup</h3>
                                <p className="text-foreground/60 text-sm mb-6 leading-relaxed">
                                    Custom virtual voice menus, physical desk phone setup, and mobile app linking. Best for offices needing reliable, professional calling.
                                </p>
                                <span className="text-4xl font-black text-white">Starting at $1,250</span>
                                <span className="text-xs text-foreground/40 block mt-1">One-time setup fee</span>

                                <ul className="space-y-3 mt-8 border-t border-white/5 pt-6 text-sm text-foreground/75">
                                    {["Custom IVR Auto-Attendant Setup", "Desk Phone & Mobile Softphone Link", "Voicemail-to-Email Notifications", "Local On-Site Installation & Training"].map((f) => (
                                        <li key={f} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link href="/book" className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full transition-colors text-center text-xs uppercase tracking-widest border border-white/10 block">
                                Request Phone Audit
                            </Link>
                        </div>

                        {/* Package 2 */}
                        <div className="p-8 rounded-[2.5rem] glass-card border border-cyan-500/30 bg-cyan-950/10 flex flex-col justify-between relative">
                            <div className="absolute -top-4 right-8 bg-cyan-400 text-slate-950 font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                                Most Requested
                            </div>
                            <div>
                                <span className="text-cyan-400 font-bold tracking-widest uppercase text-[10px] mb-2 block">Enterprise Layer</span>
                                <h3 className="text-3xl font-bold text-white mb-4">CRM & Phone Sync</h3>
                                <p className="text-foreground/60 text-sm mb-6 leading-relaxed">
                                    Unified CRM & Telephony integration. Pop up customer contact cards instantly on incoming calls and log histories automatically.
                                </p>
                                <span className="text-4xl font-black text-white">Starting at $2,500</span>
                                <span className="text-xs text-foreground/40 block mt-1">One-time integration fee</span>

                                <ul className="space-y-3 mt-8 border-t border-white/5 pt-6 text-sm text-foreground/75">
                                    {["Everything in Local VoIP Setup Package", "Capsule CRM Integration (Screen Pops)", "Automated Call Activity Note Logging", "Voicemail-to-Email Text Transcription", "Custom Call Recording Rules & Uptime"].map((f) => (
                                        <li key={f} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link href="/book" className="w-full mt-8 py-4 bg-cyan-400 text-slate-950 hover:bg-white transition-colors font-bold rounded-full text-center text-xs uppercase tracking-widest block shadow-[0_0_35px_rgba(34,211,238,0.2)]">
                                Initialize Phone Build
                            </Link>
                        </div>
                    </div>

                    <div className="text-center mt-12 max-w-2xl mx-auto">
                        <p className="text-[10px] text-foreground/40 leading-relaxed uppercase tracking-wider">
                            *Note: Monthly recurring calling plans and user seat licenses are billed directly by Ultatel at standard partner rates. One-time setup and integration fees cover custom auto-attendant menus, physical desk phone configuration, mobile softphone linking, and Capsule CRM integration services engineered by Power Digital Media.
                        </p>
                    </div>
                </div>
            </section>

            <AuditCTA />

            {/* --- FAQs --- */}
            <FAQAccordion
                faqs={[
                    {
                        question: "What is a VoIP cloud business phone system?",
                        answer: "VoIP (Voice over Internet Protocol) runs your phone lines over a secure, cloud-based internet connection instead of old physical telephone wires. This allows you to place calls from desk phones, mobile apps, or computers, while reducing line rental costs and gaining advanced call routing features."
                    },
                    {
                        question: "How does the CRM integration work with the phone?",
                        answer: "When a customer calls your business number, our system queries Capsule CRM using the caller ID. It immediately pops up the customer's contact card on your computer screen so your staff knows exactly who is calling, what they bought, and can instantly take notes that save directly to Capsule."
                    },
                    {
                        question: "Why is local Jackson MS support important for VoIP?",
                        answer: "Standard phone providers mail you a box of pre-configured phones, and when something goes wrong with your voice quality or network router, you get stuck in a call center queue. We come directly to your office, handle all network wiring, verify your router settings for voice, and test it on-site so it is 100% working."
                    },
                    {
                        question: "Do I have to buy new desk phones?",
                        answer: "Not necessarily. If you already have modern IP phones (like Polycom, Yealink, or Cisco), we can often re-program them to link to your new cloud network. Alternatively, you can use our desktop and mobile softphone apps with zero physical hardware cost."
                    }
                ]}
            />

            <Footer />
        </main>
    );
}
