"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, ArrowRight, FileText, CheckCircle, Mail, Phone, Lock, Eye } from "lucide-react";
import { motion } from "framer-motion";
import "../typography.css";

const SECTIONS = [
    { id: "identity", label: "1. Scope & Identity", icon: Shield },
    { id: "collection", label: "2. Information We Collect", icon: FileText },
    { id: "sms-consent", label: "3. SMS Consent Policy", icon: CheckCircle },
    { id: "usage", label: "4. How We Use Data", icon: Eye },
    { id: "sharing", label: "5. Information Sharing", icon: ArrowRight },
    { id: "security", label: "6. Security Infrastructure", icon: Lock },
    { id: "rights", label: "7. Your Rights & Choices", icon: FileText },
    { id: "contact", label: "8. System Contacts", icon: Mail },
];

export default function PrivacyClient() {
    const [activeSection, setActiveSection] = useState("identity");

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
                            Privacy Policy &{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-glow-cyan">
                                Data Safeguards.
                            </span>
                        </h1>
                        <div className="flex justify-center items-center gap-4 text-xs font-mono text-foreground/40">
                            <span>DOCUMENT ID: PDM-SEC-2026-V1</span>
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
                            <div id="identity" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Shield className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight">1. Scope & Identity</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-4">
                                        <p>
                                            Power Digital Media LLC (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates as a premier digital architecture and media production firm in Jackson, Mississippi. We are committed to protecting the privacy of our clients, leads, and website visitors.
                                        </p>
                                        <p>
                                            This System Protocol details how we collect, store, process, and secure personal information obtained via `powerdigitalmedia.org` and our integrated sync services (Capsule CRM, Transpond, Ultatel, and Resend). By utilizing our platform or submitting inquiries, you consent to the data policies established herein.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div id="collection" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <FileText className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight">2. Information We Collect</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-2">A. User-Provided Information</h3>
                                            <p>We collect information you explicitly submit through our contact forms, audit checkers, and booking tools, including:</p>
                                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                                <li>Identity Details: First and Last Name.</li>
                                                <li>Contact Parameters: Email Address and Phone Number.</li>
                                                <li>Professional Scope: Company Name and website URL.</li>
                                                <li>Contextual Data: Project requirements, campaign summaries, and communications.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-2">B. Automatically Collected Telemetry</h3>
                                            <p>To optimize platform speed and visual performance, we collect anonymous network telemetry:</p>
                                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                                <li>Technical Parameters: IP address, browser type, operating system, and screen resolution.</li>
                                                <li>Interaction Events: Pages visited, session duration, click patterns, and resource load states.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-2">C. Cookies and Tracking Technologies</h3>
                                            <p>
                                                We deploy standard cookies and tracking scripts (such as Google Analytics and Meta Conversions API) to understand user engagement. You can control cookie preferences directly in your browser settings.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div id="sms-consent" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-cyan-500/20 bg-cyan-950/10 hover:bg-cyan-950/20 transition-all duration-500 shadow-[0_0_30px_rgba(6,182,212,0.05)]">
                                    <div className="flex items-center gap-3 mb-6">
                                        <CheckCircle className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight text-white">3. SMS Opt-In & Mobile Consent Policy</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none leading-relaxed space-y-6">
                                        <div className="p-6 rounded-2xl bg-black/40 border border-cyan-500/30 text-cyan-300 font-mono text-sm leading-relaxed">
                                            &quot;Mobile information will not be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.&quot;
                                        </div>
                                        <div className="text-foreground/75 space-y-4">
                                            <p>
                                                At Power Digital Media LLC, we maintain strict isolation parameters for mobile opt-in data. SMS consent details, phone numbers, and text messaging originator details are locked inside our secure contact endpoints and are never merged, shared, or distributed to any affiliates, marketing partners, or external third parties.
                                            </p>
                                            <p>
                                                Opt-in is strictly voluntary and is only gathered when you explicitly click the SMS consent box on our scheduler/forms or text &quot;START&quot; to our phone line.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 4 */}
                            <div id="usage" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Eye className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight">4. How We Use Data</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-4">
                                        <p>Your data is processed to fuel the following system actions:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Providing Services: Responding to design briefs, delivering site performance audits, and building custom applications.</li>
                                            <li>Sync Integrations: Registering leads in Capsule CRM and managing client support ticket tasks.</li>
                                            <li>Communication Funnels: Sending appointment reminders via Google Calendar, sending transactional thank-you receipts via Resend, and conducting follow-up educational updates via Transpond email groups.</li>
                                            <li>Halting Outreach: Detecting Calendly webhook events to automatically pause email sequences once a call is scheduled.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Section 5 */}
                            <div id="sharing" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <ArrowRight className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight">5. Information Sharing & Disclosures</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-4">
                                        <p>
                                            We do not sell, rent, or trade your personal information. Data is shared exclusively with trusted API integration providers strictly to perform core actions, under strict security agreements:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Capsule CRM</strong> (Zestia): To manage client profiles and sales pipelines.</li>
                                            <li><strong>Transpond</strong>: To dispatch authorized email newsletters and automated campaigns.</li>
                                            <li><strong>Resend</strong>: To transmit instant serverless transactional emails.</li>
                                            <li><strong>Stripe</strong>: To securely process service payments (we do not store or process card numbers on our servers).</li>
                                            <li><strong>Ultatel</strong>: To manage business telephony logs and direct SMS routing.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Section 6 */}
                            <div id="security" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Lock className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight">6. Security Infrastructure</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-4">
                                        <p>
                                            We protect your data using enterprise-grade safeguards. All Next.js Serverless Route Handlers are secured with HTTPS encryption, and client credentials are saved locally in private variables (`.env.local`) shielded by Netlify environment token walls.
                                        </p>
                                        <p>
                                            Our backend systems enforce strict timeouts and module-level error fallbacks to prevent debug logs or system variables from leaking in server responses.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 7 */}
                            <div id="rights" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <FileText className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight">7. Your Rights & Choices</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-4">
                                        <p>Depending on your location, you hold legal rights regarding your personal parameters:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Access & Deletion</strong>: You may request a report of all parameters we hold on you, or request their permanent erasure.</li>
                                            <li><strong>Email Opt-Out</strong>: Every marketing email includes an instant unsubscribe mechanism.</li>
                                            <li><strong>SMS Opt-Out</strong>: You may revoke SMS consent at any time by texting &quot;STOP&quot; in response to any message. Text &quot;HELP&quot; for operational details.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Section 8 */}
                            <div id="contact" className="scroll-mt-32">
                                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Mail className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold uppercase tracking-tight">8. System Contacts</h2>
                                    </div>
                                    <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-4">
                                        <p>For inquiries regarding data safeguards, rights requests, or SMS consent removal, contact our data administration room:</p>
                                        <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                                                <Mail className="w-5 h-5 text-cyan-400" />
                                                <div>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Email Address</p>
                                                    <p className="font-bold text-sm">info@powerdigitalmedia.org</p>
                                                </div>
                                            </div>
                                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                                                <Phone className="w-5 h-5 text-cyan-400" />
                                                <div>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Direct Phone Line</p>
                                                    <p className="font-bold text-sm">+1 (601) 300-2004</p>
                                                </div>
                                            </div>
                                        </div>
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
