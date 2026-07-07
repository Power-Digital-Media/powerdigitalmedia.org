"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, ArrowRight, FileText, CheckCircle, Mail, Phone, Lock, Scale } from "lucide-react";
import { motion } from "framer-motion";
import "../typography.css";

const SECTIONS = [
    { id: "scope", label: "1. Scope of Agreement", icon: Shield },
    { id: "services", label: "2. Services & SLA", icon: FileText },
    { id: "billing", label: "3. Billing & Payments", icon: Scale },
    { id: "ip", label: "4. Intellectual Property", icon: Lock },
    { id: "prohibited", label: "5. Prohibited Conduct", icon: Shield },
    { id: "sms-terms", label: "6. SMS Program Terms", icon: CheckCircle },
    { id: "liability", label: "7. Liability Limits", icon: Scale },
    { id: "law", label: "8. Governing Law", icon: Scale },
];

export default function TermsClient() {
    const [activeSection, setActiveSection] = useState("scope");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            for (const section of SECTIONS) {
                const el = document.getElementById(section.id);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop - 120,
                behavior: "smooth",
            });
            setActiveSection(id);
        }
    };

    return (
        <main className="relative min-h-screen bg-background text-foreground overflow-x-clip">
            <Navbar />

            {/* Premium Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute inset-0 cyber-grid-small opacity-5 pointer-events-none" />

            {/* --- Hero: Protocol Header --- */}
            <section className="relative pt-36 pb-12 overflow-hidden border-b border-white/5 bg-white/[0.01]">
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">System Protocols</span>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-none">
                            Terms of Service &{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-glow-cyan">
                                User Agreements.
                            </span>
                        </h1>
                        <div className="flex justify-center items-center gap-4 text-xs font-mono text-foreground/40">
                            <span>DOCUMENT ID: PDM-TOS-2026-V1</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                            <span>LAST UPDATED: JULY 2026</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- Main Document Layout --- */}
            <section className="py-20 relative z-10">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="grid gap-12 lg:grid-cols-4 items-start">
                        
                        {/* Interactive Sidebar (ToC) */}
                        <div className="lg:col-span-1 lg:sticky lg:top-32 space-y-4">
                            <div className="glass-card p-6 rounded-3xl border-white/5 bg-white/[0.02] backdrop-blur-md">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 pl-2">Protocol Index</h3>
                                <nav className="space-y-1">
                                    {SECTIONS.map((section) => {
                                        const Icon = section.icon;
                                        const isActive = activeSection === section.id;
                                        return (
                                            <button
                                                key={section.id}
                                                onClick={() => scrollToSection(section.id)}
                                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                                                    isActive
                                                        ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400"
                                                        : "text-foreground/50 hover:text-foreground/80 hover:bg-white/5"
                                                }`}
                                            >
                                                <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-cyan-400" : "opacity-60"}`} />
                                                <span className="truncate">{section.label}</span>
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>

                        {/* Document Content */}
                        <div className="lg:col-span-3 space-y-12">
                            
                            {/* Section 1 */}
                            <div id="scope" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Shield className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight">1. Scope of Agreement</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-4">
                                        <p>
                                            Welcome to Power Digital Media. By accessing our platform, utilizing our custom design systems, or purchasing our web design, custom development, or business integration services (including Capsule CRM, Transpond email marketing, and Ultatel VoIP systems), you agree to comply with and be bound by the following Terms of Service.
                                        </p>
                                        <p>
                                            If you are entering into this agreement on behalf of a company, church, or organization, you represent that you hold the legal authority to bind that entity to these conditions.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div id="services" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <FileText className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight">2. Description of Services & SLA</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-4">
                                        <p>
                                            Power Digital Media LLC provides high-velocity digital solutions including custom Next.js development, local SEO optimization, digital booking integrations, Capsule CRM visual pipelines, Transpond automated email marketing systems, and Ultatel business phone VoIP systems.
                                        </p>
                                        <p>
                                            Specific deliverables, timelines, and launch phases will be outlined in your custom Service Level Agreement (SLA). All development launches are pending client content assets and prompt design feedback.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div id="billing" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Scale className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight">3. Billing, Fees & Subscriptions</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-4">
                                        <p>
                                            All services require advance payment parameters via our secure Stripe payment gateway:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Bespoke Builds</strong>: Typically invoiced as 50% upfront deposit and 50% upon successful deployment.</li>
                                            <li><strong>Monthly Subscriptions</strong>: Our standard Build & Manage protocol (priced at $550/month) covers serverless hosting, API maintenance, and weekly updates. Subscription fees are automatically billed recurringly.</li>
                                            <li><strong>Cancelation Policy</strong>: Monthly maintenance cycles can be canceled at any time with 30 days written notice to info@powerdigitalmedia.org.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Section 4 */}
                            <div id="ip" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Lock className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight">4. Intellectual Property & Code Ownership</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-4">
                                        <p>
                                            Upon complete receipt of project payments, we transfer ownership of all custom layout graphics, logos, video assets, and text content compiled specifically for your business.
                                        </p>
                                        <p>
                                            We retain rights to our underlying pre-built software blocks, generic React components, and custom serverless API routing endpoints developed prior to or independently of this agreement.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 5 */}
                            <div id="prohibited" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Shield className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight">5. Prohibited Conduct</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-4">
                                        <p>You agree not to engage in any actions that compromise the security or speed of our system, including:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Attempting to bypass serverless route security walls or run unauthorized vulnerability scans.</li>
                                            <li>Using our form endpoints to distribute unsolicited spam material.</li>
                                            <li>Reverse-engineering or scraping the dynamic portfolio or booking engine layouts.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Section 6 */}
                            <div id="sms-terms" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-cyan-500/20 bg-cyan-950/10 hover:bg-cyan-950/20 transition-all duration-500 shadow-[0_0_30px_rgba(6,182,212,0.05)]">
                                    <div className="flex items-center gap-3 mb-6">
                                        <CheckCircle className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight text-white">6. SMS/MMS Mobile Messaging Program</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none leading-relaxed space-y-6">
                                        <div className="p-6 rounded-2xl bg-black/40 border border-cyan-500/30 text-cyan-300 font-mono text-sm leading-relaxed">
                                            &quot;By agreeing to receive reminders, updates, and support messages from Power Digital Media LLC, you understand that message frequency varies, and message/data rates may apply. Reply STOP to opt out.&quot;
                                        </div>
                                        <div className="text-foreground/75 space-y-4">
                                            <p>
                                                By inputting your phone number and consenting via checkbox in our contact forms or booking widgets, or by sending SMS messages (such as texting &quot;START&quot;) to our line, you authorize Power Digital Media LLC to dispatch transactional notifications, scheduling updates, and project status alerts via SMS.
                                            </p>
                                            <p>
                                                Message and data rates from your mobile carrier may apply. You may revoke consent at any time by texting &quot;STOP&quot; in response to any message. For assistance, text &quot;HELP&quot;. We are not responsible for delayed or undelivered messages caused by network carrier transit failures.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 7 */}
                            <div id="liability" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Scale className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight">7. Warranty Disclaimers & Liability Limits</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-4">
                                        <p>
                                            Our platforms are provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. We make no guarantees regarding uninterrupted uptime or absolute index positioning on search engines (which depend on dynamic third-party algorithms).
                                        </p>
                                        <p>
                                            In no event shall Power Digital Media LLC be liable for any lost profits, data corruption, or indirect damages exceeding the total amount paid by you to us during the three (3) months preceding the claim.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 8 */}
                            <div id="law" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Scale className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight">8. Governing Law</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-4">
                                        <p>
                                            This agreement and all relations arising from it are governed by the laws of the State of Mississippi, without regard to conflict of law principles. Any legal actions or arbitration proceedings must be filed within courts of competent jurisdiction located in Jackson, Hinds County, Mississippi.
                                        </p>
                                        <p>
                                            If you have any questions regarding these operational parameters, contact our support room at info@powerdigitalmedia.org.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
