"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, FileText, CheckCircle, Lock, Scale } from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  { id: "scope", label: "1. Scope of Agreement", icon: Shield },
  { id: "services", label: "2. Services & Field Apps", icon: FileText },
  { id: "billing", label: "3. Billing & Subscriptions", icon: Scale },
  { id: "ip", label: "4. Code & Content Ownership", icon: Lock },
  { id: "prohibited", label: "5. Acceptable Use", icon: Shield },
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
        className="absolute top-0 right-1/4 w-[600px] h-[450px] bg-amber-500/[0.05] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Header */}
      <section className="relative pt-32 pb-12 md:pt-40 border-b border-white/10 bg-[#0b0c10]/70">
        <div className="container px-4 sm:px-6 mx-auto text-center max-w-4xl">
          <span className="text-amber-400 font-mono font-bold tracking-widest uppercase text-xs mb-3 block">
            Legal &amp; Client Agreements
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase mb-4 leading-[1.05]">
            Terms of Service &amp; <span className="text-amber-400">Client Terms.</span>
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

            {/* Document Content */}
            <div className="lg:col-span-3 space-y-8">
              <div id="scope" className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">1. Scope of Agreement</h2>
                </div>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                  <p>
                    Welcome to Power Digital Media LLC. By accessing <code className="text-amber-300">powerdigitalmedia.org</code>, subscribing to our proprietary field apps (<strong className="text-white">PDM PinDrop™</strong> and <strong className="text-white">PinCam™</strong>), or engaging our web design, Local SEO, paid marketing, or business integration services (including Capsule CRM, Transpond, and Ultatel VoIP systems), you agree to be bound by these Terms of Service.
                  </p>
                  <p>
                    If you enter into this agreement on behalf of a business, contractor crew, church, or organization, you represent that you have authority to bind that entity to these terms.
                  </p>
                </div>
              </div>

              <div id="services" className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
                    2. Services, Deliverables &amp; Field Apps
                  </h2>
                </div>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                  <p>
                    Power Digital Media LLC provides custom Next.js website development, Google Map Pack &amp; Local SEO engineering, proprietary jobsite software (<strong className="text-white">PDM PinDrop™</strong> and <strong className="text-white">PinCam™</strong>), paid acquisition funnels, Capsule CRM pipelines, Transpond email automation, and Ultatel business phone deployments.
                  </p>
                  <p>
                    Project deliverables, milestones, and target launch dates are specified in your project proposal or invoice. Launch timelines depend on timely client approval and asset handoff.
                  </p>
                </div>
              </div>

              <div id="billing" className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
                    3. Billing, Fees &amp; Subscriptions
                  </h2>
                </div>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
                  <p>Payments are processed securely via Stripe:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-white">Custom Website &amp; Software Builds</strong>: Typically invoiced as a 50% kickoff deposit and 50% upon launch readiness (or approved split-payment schedule).</li>
                    <li><strong className="text-white">Monthly Hosting, Growth Retainers &amp; Field App Plans</strong>: Billed month-to-month in advance with no mandatory 12-month lock-ins unless separately contracted.</li>
                    <li><strong className="text-white">Cancellation &amp; Refunds</strong>: Monthly subscriptions and retainers may be canceled in writing at least 14 days before the next billing cycle by emailing <a href="mailto:info@powerdigitalmedia.org" className="text-amber-400 underline">info@powerdigitalmedia.org</a>. See our <Link href="/refund-policy" className="text-amber-400 underline">Refund Policy</Link> for full details.</li>
                  </ul>
                </div>
              </div>

              <div id="ip" className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
                    4. Code &amp; Content Ownership
                  </h2>
                </div>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                  <p>
                    Upon full payment of your custom website build fee, you own 100% of your custom website design, domain, brand copy, and jobsite photos/content created for your business.
                  </p>
                  <p>
                    Power Digital Media LLC retains intellectual property rights to our proprietary SaaS engines (<strong className="text-white">PDM PinDrop™</strong> and <strong className="text-white">PinCam™</strong>) and reusable internal software libraries licensed to active subscribers.
                  </p>
                </div>
              </div>

              <div id="prohibited" className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">5. Acceptable Use</h2>
                </div>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
                  <p>You agree not to misuse our websites, APIs, or field software, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Attempting unauthorized access, automated scraping, or vulnerability probing against our endpoints.</li>
                    <li>Submitting spam, unlawful content, or non-consensual SMS/email recipient lists.</li>
                    <li>Uploading customer photos or property details without homeowner or client authorization.</li>
                  </ul>
                </div>
              </div>

              <div
                id="sms-terms"
                className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-amber-400/35 bg-[#12141c]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                    6. SMS/MMS Mobile Messaging Program
                  </h2>
                </div>
                <div className="space-y-5 text-sm sm:text-base leading-relaxed">
                  <div className="p-5 rounded-2xl bg-[#06080f] border border-amber-400/35 text-amber-200 font-mono text-xs sm:text-sm leading-relaxed">
                    &ldquo;By agreeing to receive reminders, updates, and support messages from Power Digital Media LLC, you understand that message frequency varies, and message/data rates may apply. Reply STOP to opt out.&rdquo;
                  </div>
                  <div className="text-slate-300 space-y-3">
                    <p>
                      By providing your phone number and checking the SMS consent box on our forms or booking pages—or by texting &ldquo;START&rdquo; to (601) 446-2393—you authorize Power Digital Media LLC to send appointment reminders, audit delivery alerts, and client support updates via SMS.
                    </p>
                    <p>
                      Message and data rates may apply. You can opt out at any time by replying &ldquo;STOP&rdquo; to any message, or reply &ldquo;HELP&rdquo; for support. Mobile carriers are not liable for delayed or undelivered messages.
                    </p>
                  </div>
                </div>
              </div>

              <div id="liability" className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
                    7. Disclaimers &amp; Limitation of Liability
                  </h2>
                </div>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                  <p>
                    While we engineer every website and SEO campaign to best-in-class technical standards, search engine rankings and third-party ad algorithms are controlled by external platforms (Google, Meta, Bing) and cannot be guaranteed at fixed positions.
                  </p>
                  <p>
                    To the maximum extent permitted by law, Power Digital Media LLC&apos;s total liability for any claim shall not exceed the fees paid by you to us during the three (3) months preceding the claim.
                  </p>
                </div>
              </div>

              <div id="law" className="scroll-mt-32 p-7 sm:p-10 rounded-3xl border border-white/10 bg-[#0b0c10]">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">8. Governing Law</h2>
                </div>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                  <p>
                    These Terms are governed by the laws of the State of Mississippi. Any dispute arising out of these Terms shall be resolved in state or federal courts located in Hinds County, Mississippi.
                  </p>
                  <p>
                    Questions? Email <a href="mailto:info@powerdigitalmedia.org" className="text-amber-400 underline">info@powerdigitalmedia.org</a> or call (601) 446-2393.
                  </p>
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
