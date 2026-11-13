"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, ArrowRight, FileText, CheckCircle, Mail, Phone, Lock, Eye } from "lucide-react";

const SECTIONS = [
  { id: "identity", label: "1. Scope & Identity", icon: Shield },
  { id: "collection", label: "2. Information We Collect", icon: FileText },
  { id: "sms-consent", label: "3. SMS Consent Policy", icon: CheckCircle },
  { id: "usage", label: "4. How We Use Data", icon: Eye },
  { id: "sharing", label: "5. Information Sharing", icon: ArrowRight },
  { id: "security", label: "6. Security Safeguards", icon: Lock },
  { id: "rights", label: "7. Your Rights & Choices", icon: FileText },
  { id: "contact", label: "8. Privacy Contacts", icon: Mail },
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

    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <main className="relative min-h-screen bg-[#06080f] text-white overflow-x-clip">
      <Navbar />

      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[450px] bg-amber-500/[0.05] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Header */}
      <section className="relative pt-32 pb-12 md:pt-40 border-b border-white/10 bg-[#0b0c10]/70">
        <div className="container px-4 sm:px-6 mx-auto text-center max-w-4xl">
          <span className="text-amber-400 font-mono font-bold tracking-widest uppercase text-xs mb-3 block">
            Legal &amp; Compliance
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase mb-4 leading-[1.05]">
            Privacy Policy &amp; <span className="text-amber-400">Data Safeguards.</span>
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs font-mono text-slate-400">
            <span>Power Digital Media LLC • Jackson, MS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
            <span>Last Updated: April 2026</span>
          </div>
        </div>
      </section>

      {/* Main Document Layout */}
      <section className="py-16 md:py-20 relative z-10">
        <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-4 items-start">
            {/* Sidebar ToC */}
            <div className="lg:col-span-1 lg:sticky lg:top-28">
              <div className="p-5 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4 pl-2">
                  Contents
                </h2>
                <nav className="space-y-1">
                  {SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-colors text-left cursor-pointer ${
                          isActive
                            ? "bg-amber-500/15 text-amber-300 border-l-2 border-amber-400"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-400" : "text-slate-500"}`} />
                        <span className="truncate">{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Document Sections */}
            <div className="lg:col-span-3 space-y-8">
              <div id="identity" className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">1. Scope &amp; Identity</h2>
                </div>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                  <p>
                    Power Digital Media LLC (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates as a custom web design, Local SEO, contractor field-software, and business systems firm headquartered at 2914 Cynthia Rd, Jackson, Mississippi 39209. We are committed to protecting the privacy of our clients, software users, prospective leads, and website visitors.
                  </p>
                  <p>
                    This Privacy Policy explains how we collect, store, process, and safeguard personal information gathered via <code className="text-amber-300">powerdigitalmedia.org</code>, our proprietary software (<strong className="text-white">PDM PinDrop™</strong>, <strong className="text-white">PinCam™</strong>, and <strong className="text-white">PDM Site Intelligence™</strong>), and our authorized operational integrations (Capsule CRM, Transpond, Square, Stripe, and Resend).
                  </p>
                </div>
              </div>

              <div id="collection" className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">2. Information We Collect</h2>
                </div>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">A. Information You Provide</h3>
                    <p>We collect details you voluntarily submit through our audit forms, contact forms, discovery questionnaires, and booking calendars, including:</p>
                    <ul className="list-disc pl-6 space-y-1.5 mt-2">
                      <li>Contact Details: Name, email address, and phone number.</li>
                      <li>Business Information: Company name, trade/industry, service area, and website URL.</li>
                      <li>App &amp; Project Data: Jobsite photos, neighborhood pin metadata (with residential address fuzzing enabled in PDM PinDrop™), and project notes uploaded by authorized crew accounts.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">B. Automatically Collected Technical Data</h3>
                    <p>To keep our websites fast and secure, we collect standard technical analytics such as IP address, browser type, device screen size, pages visited, and spam-prevention timestamps.</p>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">C. Cookies &amp; Analytics</h3>
                    <p>
                      We use standard cookies and analytics scripts (such as Google Analytics and Meta Conversions API) to measure website performance and ad attribution. You can manage cookie preferences in your browser settings at any time.
                    </p>
                  </div>
                </div>
              </div>

              <div
                id="sms-consent"
                className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-amber-400/35 bg-[#12141c]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                    3. SMS Opt-In &amp; Mobile Consent Policy
                  </h2>
                </div>
                <div className="space-y-5 text-sm sm:text-base leading-relaxed">
                  <div className="p-5 rounded-2xl bg-[#06080f] border border-amber-400/35 text-amber-200 font-mono text-xs sm:text-sm leading-relaxed">
                    &ldquo;Mobile information will not be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.&rdquo;
                  </div>
                  <div className="text-slate-300 space-y-3">
                    <p>
                      Power Digital Media LLC strictly isolates mobile opt-in data. SMS consent records, mobile phone numbers, and text-messaging originator data are never sold, rented, merged, or shared with external affiliates, lead brokers, or third parties for marketing or promotional purposes.
                    </p>
                    <p>
                      SMS opt-in is completely voluntary and occurs only when you check an explicit SMS consent box on our forms/booking pages or text &ldquo;START&rdquo; to (601) 446-2393.
                    </p>
                  </div>
                </div>
              </div>

              <div id="usage" className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">4. How We Use Data</h2>
                </div>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
                  <p>We process your information solely to deliver requested services and communications:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Delivering Services: Recording personalized rank/website audits, scoping custom builds, and operating PDM PinDrop™ &amp; PinCam™ workspaces.</li>
                    <li>CRM &amp; Support: Logging inquiries in Capsule CRM so our team can respond promptly and track active client milestones.</li>
                    <li>Appointment &amp; Transactional Updates: Sending calendar confirmations, transactional receipts via Resend, and requested follow-ups via Transpond.</li>
                    <li>Automatic Outreach Pause: Detecting booked strategy calls via Calendly webhooks to automatically pause follow-up sequences.</li>
                  </ul>
                </div>
              </div>

              <div id="sharing" className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <div className="flex items-center gap-3 mb-4">
                  <ArrowRight className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
                    5. Information Sharing &amp; Service Providers
                  </h2>
                </div>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
                  <p>
                    We never sell, rent, or trade your personal information. Data is processed only through vetted infrastructure providers under strict confidentiality obligations:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-white">Capsule CRM</strong>: Client profile and project pipeline management.</li>
                    <li><strong className="text-white">Transpond</strong>: Authorized email newsletters and follow-up sequences.</li>
                    <li><strong className="text-white">Resend</strong>: Transactional email delivery.</li>
                    <li><strong className="text-white">Square &amp; Stripe</strong>: PCI-compliant payment processing (card numbers never touch our servers).</li>
                    <li><strong className="text-white">Authorized Telecom Carriers</strong>: Opt-in transactional and appointment SMS routing.</li>
                  </ul>
                </div>
              </div>

              <div id="security" className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">6. Security Safeguards</h2>
                </div>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
                  <p>
                    All traffic across our websites and serverless API routes is encrypted via TLS/HTTPS. API keys and credentials are stored strictly in encrypted server-side environment variables and are never exposed to client browsers.
                  </p>
                </div>
              </div>

              <div id="rights" className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">7. Your Rights &amp; Choices</h2>
                </div>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-white">Access &amp; Deletion</strong>: Request a copy or permanent deletion of your personal records at any time by emailing <a href="mailto:info@powerdigitalmedia.org" className="text-amber-400 underline">info@powerdigitalmedia.org</a>.</li>
                    <li><strong className="text-white">Email Opt-Out</strong>: Every marketing email includes a one-click unsubscribe link.</li>
                    <li><strong className="text-white">SMS Opt-Out</strong>: Reply &ldquo;STOP&rdquo; to any text message to opt out immediately, or reply &ldquo;HELP&rdquo; for assistance.</li>
                  </ul>
                </div>
              </div>

              <div id="contact" className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">8. Privacy Contacts</h2>
                </div>
                <p className="text-slate-300 text-sm sm:text-base mb-5">
                  For privacy inquiries, data deletion requests, or SMS consent questions, contact Power Digital Media LLC directly:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <a
                    href="mailto:info@powerdigitalmedia.org"
                    className="p-4 rounded-2xl bg-[#12141c] border border-white/10 hover:border-amber-400/40 transition-colors flex items-center gap-3.5"
                  >
                    <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Email</p>
                      <p className="font-bold text-sm text-white">info@powerdigitalmedia.org</p>
                    </div>
                  </a>
                  <a
                    href="tel:6014462393"
                    className="p-4 rounded-2xl bg-[#12141c] border border-white/10 hover:border-amber-400/40 transition-colors flex items-center gap-3.5"
                  >
                    <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Direct Line</p>
                      <p className="font-bold text-sm text-white">(601) 446-2393</p>
                    </div>
                  </a>
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
