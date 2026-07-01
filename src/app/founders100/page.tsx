"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Founders100Standalone from "@/components/ui/billing/Founders100Standalone";
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle, Cpu, Gauge, ShoppingCart } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Founders100Page() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const data = new FormData(form);
        data.append("_form_source", "founders-100-application");

        try {
            const response = await fetch("/api/forms", {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
                setTimeout(() => {
                    router.push("/book?from=founders100");
                }, 1000);
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error("Founders 100 application error:", err);
            setStatus("error");
        }
    };

    return (
        <main className="relative min-h-screen bg-background text-white overflow-hidden">
            <Navbar />

            {/* Cyan/Blue tech ambient glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] pointer-events-none -z-10 rounded-full" />
            <div className="absolute bottom-1/3 right-1/4 w-[700px] h-[700px] bg-blue-500/5 blur-[180px] pointer-events-none -z-10 rounded-full" />

            {/* Cyber Circuit Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-10" />

            <section className="relative pt-36 pb-24 md:pt-44">
                <div className="container px-4 mx-auto max-w-6xl">
                    
                    {/* Full-Width Header Block (Spans across both columns) */}
                    <div className="max-w-4xl mb-12 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-cyan-400/20 text-cyan-400 text-xs font-bold uppercase tracking-widest"
                        >
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            LIMITED OFFER
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white uppercase leading-none"
                        >
                            Founder&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">100</span>
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl font-bold tracking-widest text-cyan-400/90 uppercase"
                        >
                            High-Authority Website Initiative
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-base md:text-lg text-slate-300 leading-relaxed font-light max-w-3xl"
                        >
                            We are building 100 enterprise-grade Next.js web applications at our Growth Build tier for the price of a basic identity build. Once all 100 spots are claimed, this campaign disappears permanently.
                        </motion.p>
                    </div>

                    {/* Two-Column Grid (Aligned perfectly at the top edge!) */}
                    <div className="grid gap-12 lg:grid-cols-12 items-start mb-24">
                        
                        {/* Left Column: Checkout Card */}
                        <div className="lg:col-span-7">
                            <div className="border border-cyan-500/20 rounded-[2.5rem] p-2 bg-slate-950/20 backdrop-blur-md relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-cyan-500/15 to-blue-500/10 rounded-[2.6rem] blur-sm pointer-events-none -z-10" />
                                <Founders100Standalone />
                            </div>
                        </div>

                        {/* Right Column: Lead Capture / Inquiry Form */}
                        <div className="lg:col-span-5">
                            <div className="relative rounded-[3rem] border border-cyan-500/20 glass-card bg-slate-950/40 p-8 md:p-10 overflow-hidden">
                                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />
                                
                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 animate-pulse">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold">Inquiry Sent!</h3>
                                            <p className="text-slate-300 text-sm leading-relaxed">
                                                Your application is registered in our CRM. Redirecting you to book your local onboarding consultation...
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-extrabold tracking-tight uppercase">Prefer to Consult First?</h3>
                                            <p className="text-xs text-slate-450 leading-relaxed">
                                                Fill out this application to secure your spot temporarily and request a project audit.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                    Full Name
                                                </label>
                                                <input 
                                                    type="text" 
                                                    name="name" 
                                                    required 
                                                    disabled={status === "submitting"}
                                                    placeholder="John Doe" 
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-xs"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                    Email Address
                                                </label>
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    required 
                                                    disabled={status === "submitting"}
                                                    placeholder="john@yourbusiness.com" 
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-xs"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                    Phone Number
                                                </label>
                                                <input 
                                                    type="tel" 
                                                    name="phone" 
                                                    required 
                                                    disabled={status === "submitting"}
                                                    placeholder="601-555-0199" 
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-xs"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                    Business Name
                                                </label>
                                                <input 
                                                    type="text" 
                                                    name="business_name" 
                                                    required 
                                                    disabled={status === "submitting"}
                                                    placeholder="My Enterprise" 
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-xs"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                    Current Website
                                                </label>
                                                <input 
                                                    type="url" 
                                                    name="current_website" 
                                                    disabled={status === "submitting"}
                                                    placeholder="https://mycurrentbusiness.com" 
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-xs"
                                                />
                                            </div>

                                            {status === "error" && (
                                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
                                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                                    Submission failed. Try again.
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={status === "submitting"}
                                                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 group text-xs uppercase tracking-widest disabled:opacity-50"
                                            >
                                                {status === "submitting" ? (
                                                    "Securing Application Slot..."
                                                ) : (
                                                    <>
                                                        Apply & Request Call
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Architecture & Hosting Disclosure */}
                    <div className="max-w-6xl mx-auto mb-24 p-8 rounded-[2rem] border border-blue-500/20 bg-blue-950/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-400" />
                        <h3 className="text-base font-bold uppercase tracking-wider text-white mb-3">
                            Codebase Architecture & Hosting Protocol
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed font-light">
                            Every site we build is custom-engineered using modern framework standards—specifically <strong className="text-white">Next.js, React, Vite, and Vanilla JS</strong>. These are high-performance, developer-grade applications, not simple drag-and-drop templates built on Wix or WordPress. 
                        </p>
                        <p className="text-sm text-slate-300 leading-relaxed mt-4 font-light">
                            Because of this custom architecture, these applications require specialized edge hosting and active technical maintenance. Power Digital Media provides a fully managed <strong className="text-cyan-400">Hosting & Tech Management Protocol for $550.00/month</strong> which covers edge servers, security patches, performance tuning, and code maintenance. 
                        </p>
                        <p className="text-sm text-slate-300 leading-relaxed mt-4 italic text-slate-400 font-light">
                            Note: This monthly management plan is optional. If you choose to host and manage the site yourself, we will deliver the raw codebase to you. However, you will need your own server setup and a professional developer on staff to maintain and deploy updates.
                        </p>
                    </div>

                    {/* Detailed Features Expansion (The Flyer Pillars) */}
                    <div className="mb-24 space-y-16">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase">Campaign Deliverables</h2>
                            <p className="text-sm text-slate-400">Technical specifications for the Growth Architecture tier included in this campaign</p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.01] space-y-6">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                                    <Cpu className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold uppercase tracking-wider">Custom UI/UX & 3D Assets</h3>
                                <p className="text-sm text-slate-400 leading-relaxed font-light">
                                    No generic templates. Your design is engineered from scratch, using tailored grid systems, cinematic transitions, and optional WebGL/Three.js 3D elements to establish a premium visual authority.
                                </p>
                            </div>

                            <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.01] space-y-6">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Gauge className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold uppercase tracking-wider">Performance & SEO Core</h3>
                                <p className="text-sm text-slate-400 leading-relaxed font-light">
                                    Built on Next.js App Router with server-side pre-rendering (SSR) for sub-second load times. Pre-loaded with full JSON-LD entity schema arrays and `llms.txt` config files for Google and AI search visibility.
                                </p>
                            </div>

                            <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.01] space-y-6">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    <ShoppingCart className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold uppercase tracking-wider">E-Commerce & Integrations</h3>
                                <p className="text-sm text-slate-400 leading-relaxed font-light">
                                    Equipped with Stripe Checkout payment integrations, client booking links, custom input forms, and data pipe bridges that sync incoming website leads straight into your CRM.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="mb-24 space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase">Package Comparison</h2>
                            <p className="text-sm text-slate-400">See the exact features upgraded for this limited initiative</p>
                        </div>

                        <div className="overflow-x-auto rounded-3xl border border-white/5 bg-white/[0.01]">
                            <table className="w-full border-collapse text-left text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/[0.03]">
                                        <th className="p-6 font-bold uppercase text-slate-400">Architecture Features</th>
                                        <th className="p-6 font-bold uppercase text-slate-400">Identity Protocol ($1,500)</th>
                                        <th className="p-6 font-bold uppercase text-cyan-400 bg-cyan-400/[0.02]">Growth Architecture (Included!)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-slate-300">
                                    <tr>
                                        <td className="p-6 font-medium">Bespoke Design Framework</td>
                                        <td className="p-6">✓ Up to 5 Pages</td>
                                        <td className="p-6 font-bold text-white bg-cyan-400/[0.02]">✓ Dynamic Multi-Page (Unlimited)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 font-medium">Core speed optimization</td>
                                        <td className="p-6">✓ Standard Next.js</td>
                                        <td className="p-6 font-bold text-white bg-cyan-400/[0.02]">✓ Edge Runtime Rendering (Sub-second)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 font-medium">Structured Entity Schema</td>
                                        <td className="p-6">✓ Basic tags</td>
                                        <td className="p-6 font-bold text-white bg-cyan-400/[0.02]">✓ Fully mapped JSON-LD ID Loop Array</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 font-medium">CRM Lead Sync Bridge</td>
                                        <td className="p-6">❌ Not Included</td>
                                        <td className="p-6 font-bold text-white bg-cyan-400/[0.02]">✓ Transpond & Capsule API Automation</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 font-medium">Stripe Gateway Setup</td>
                                        <td className="p-6">❌ Not Included</td>
                                        <td className="p-6 font-bold text-white bg-cyan-400/[0.02]">✓ Stripe Checkout & Subscription Hooks</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 font-medium">Managed Hosting Integration</td>
                                        <td className="p-6">✓ Netlify deploy</td>
                                        <td className="p-6 font-bold text-white bg-cyan-400/[0.02]">✓ Netlify Edge + Webhook config</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* How it Works / Onboarding */}
                    <div className="space-y-12">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase">How It Works</h2>
                            <p className="text-sm text-slate-400">Our 4-step onboarding pipeline from purchase to deployment</p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-4">
                            {[
                                { step: "01", title: "Claim Your Spot", desc: "Purchase the build above or submit an inquiry to lock in one of the 100 campaign spots." },
                                { step: "02", title: "Onboarding Call", desc: "We schedule a strategy kickoff meeting to map out your brand assets, target audience, and project scope." },
                                { step: "03", title: "Build & Integrate", desc: "Our team develops your Next.js project and configures your Capsule CRM and Ultatel VoIP networks." },
                                { step: "04", title: "Edge Launch", desc: "We deploy your high-authority website live onto the Netlify Edge network and trigger search indexing." }
                            ].map((item, idx) => (
                                <div key={idx} className="relative p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
                                    <div className="text-xs font-black tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full w-fit">
                                        STEP {item.step}
                                    </div>
                                    <h3 className="font-bold text-base uppercase tracking-tight">{item.title}</h3>
                                    <p className="text-xs text-slate-450 leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
