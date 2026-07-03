"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    AlertCircle, 
    Monitor, 
    Users, 
    Mail, 
    MessageSquare, 
    Phone, 
    FileText, 
    Check, 
    AlertTriangle 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";

const BBBSeal = dynamic(() => import("@/components/ui/BBBSeal"), { ssr: false });

export default function LeadLeakCheckPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [submittedLead, setSubmittedLead] = useState({ name: "", email: "", phone: "" });
    const [tags, setTags] = useState<string[]>([]);
    const [trackingData, setTrackingData] = useState({
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        referrer: "",
        page_path: ""
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Set dynamic title
            document.title = "Free Lead Leak Check | Power Digital Media";
            
            const urlParams = new URLSearchParams(window.location.search);
            const utmSource = (urlParams.get("utm_source") || "").toLowerCase();
            const utmMedium = (urlParams.get("utm_medium") || "").toLowerCase();
            const ref = document.referrer || "";
            const refLower = ref.toLowerCase();

            // Detect if visitor came from Facebook, Instagram, or Meta
            const detectedTags: string[] = [];
            const isMeta = 
                utmSource.includes("facebook") || 
                utmSource.includes("instagram") || 
                utmSource.includes("meta") || 
                utmSource.includes("fb") || 
                utmSource.includes("ig") || 
                utmMedium.includes("facebook") || 
                utmMedium.includes("instagram") || 
                utmMedium.includes("meta") || 
                refLower.includes("facebook.com") || 
                refLower.includes("instagram.com") || 
                refLower.includes("fb.com") || 
                refLower.includes("meta.com") ||
                refLower.includes("l.instagram.com") ||
                refLower.includes("l.facebook.com");

            if (isMeta) {
                detectedTags.push("meta-lead");
            }
            setTags(detectedTags);

            setTrackingData({
                utm_source: urlParams.get("utm_source") || "",
                utm_medium: urlParams.get("utm_medium") || "",
                utm_campaign: urlParams.get("utm_campaign") || "",
                referrer: ref,
                page_path: window.location.pathname || ""
            });
        }
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const data = new FormData(form);
        data.append("_form_source", "lead-leak-check");
        data.append("utm_source", trackingData.utm_source);
        data.append("utm_medium", trackingData.utm_medium);
        data.append("utm_campaign", trackingData.utm_campaign);
        data.append("referrer", trackingData.referrer);
        data.append("page_path", trackingData.page_path);
        
        // Append tags to the payload
        tags.forEach(tag => {
            data.append("tags", tag);
        });

        try {
            const response = await fetch("/api/forms", {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                setStatus("success");
                const nameVal = data.get("name") as string;
                const emailVal = data.get("email") as string;
                const phoneVal = data.get("phone") as string;
                setSubmittedLead({ name: nameVal || "there", email: emailVal || "", phone: phoneVal || "" });
                form.reset();
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error("Lead Leak Check submission error:", err);
            setStatus("error");
        }
    };

    const leakPoints = [
        { title: "Calls go unanswered", desc: "No backup system to catch and route callers after hours or when busy." },
        { title: "Contact forms only send an email", desc: "Leads sit in your inbox for hours before anyone follows up." },
        { title: "Facebook messages get buried", desc: "Inquiries from social media go unnoticed because notifications are missed." },
        { title: "Quote requests are ignored", desc: "No instant automated confirmation or routing to close deals quickly." },
        { title: "Past customers are forgotten", desc: "No system in place to reactivate prior clients and generate repeat sales." },
        { title: "No tracking on conversions", desc: "Unsure which ads, flyers, or search results are actually driving revenue." }
    ];

    const notificationItems = [
        { type: "New Website Lead", time: "Just now", message: "Jane requested a quote", icon: Monitor, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
        { type: "New Facebook Message", time: "1 min ago", message: "Is this service available?", icon: MessageSquare, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
        { type: "Quote Request", time: "2 min ago", message: "Estimate: $1,200 pending", icon: FileText, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
        { type: "Missed Call", time: "3 min ago", message: "(601) 555-0182 called", icon: Phone, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" }
    ];

    return (
        <main className="relative min-h-screen bg-background text-white overflow-hidden">
            <Navbar />

            {/* Mesh glows matching standard page backgrounds */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] pointer-events-none -z-10 rounded-full" />

            <section className="relative pt-32 pb-24 md:pt-44">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="grid gap-12 lg:grid-cols-12 items-start">
                        
                        {/* Left Column - Pain & Vibe */}
                        <div className="lg:col-span-7 space-y-8 lg:pr-6">
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                            >
                                <ShieldCheck className="w-4 h-4 text-amber-400 animate-pulse" />
                                Complimentary Diagnostic
                            </motion.div>

                            <div className="space-y-4">
                                <motion.h1 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl leading-[1.1] uppercase text-white"
                                >
                                    Are you losing <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-amber-500 text-glow-amber">
                                        customers
                                    </span> <br />
                                    before you ever talk to them?
                                </motion.h1>
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-lg text-slate-300 max-w-xl leading-relaxed"
                                >
                                    Power Digital Media helps local businesses capture missed calls, website leads, Facebook messages, quote requests, and follow-ups in one simple system.
                                </motion.p>
                            </div>

                            {/* Key Leak Points Section */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-4 pt-4 border-t border-white/5"
                            >
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-amber-400 animate-bounce" />
                                    You may be losing leads if:
                                </h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {leakPoints.map((point, index) => (
                                        <div key={index} className="flex gap-3 p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all duration-300">
                                            <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5 text-red-500 font-bold text-xs">
                                                ✕
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-bold text-sm text-slate-200">{point.title}</h4>
                                                <p className="text-xs text-muted-foreground leading-relaxed">{point.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm font-semibold text-amber-400/90 pt-2">
                                    💡 We&apos;ll check your website, phone setup, forms, Facebook presence, and follow-up process.
                                </p>
                            </motion.div>

                            {/* Sleek Row of Unified Channels */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-3 pt-6 border-t border-white/5"
                            >
                                <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Unified Channels Analyzed</span>
                                <div className="flex flex-wrap gap-2.5">
                                    {[
                                        { name: "Websites", icon: Monitor },
                                        { name: "CRM", icon: Users },
                                        { name: "Email", icon: Mail },
                                        { name: "SMS", icon: MessageSquare },
                                        { name: "Business Phones", icon: Phone }
                                    ].map((channel, i) => {
                                        const Icon = channel.icon;
                                        return (
                                            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-xs font-semibold text-slate-300">
                                                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                                                <span>{channel.name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Interactive Phone Mockup */}
                            <div className="relative pt-8 hidden sm:block">
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                                    className="relative mx-auto lg:mx-0 w-[300px] h-[550px] bg-slate-950 border-[6px] border-slate-800 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden"
                                >
                                    {/* Notch */}
                                    <div className="absolute top-0 inset-x-0 h-5 bg-slate-800 rounded-b-2xl flex items-center justify-center z-20">
                                        <div className="w-16 h-3 bg-black rounded-full" />
                                    </div>

                                    {/* Screen Content */}
                                    <div className="h-full p-4 pt-10 flex flex-col justify-start space-y-4 bg-gradient-to-b from-slate-950 to-slate-900 overflow-y-auto no-scrollbar relative">
                                        
                                        {/* Phone Background Mesh */}
                                        <div className="absolute inset-0 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none" />

                                        <div className="text-center pb-2 border-b border-white/5">
                                            <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Incoming Platform Leads</span>
                                            <h4 className="text-xs font-extrabold text-white mt-0.5">NEW LEAD HUB</h4>
                                        </div>

                                        {/* Notifications Queue with Staggered Fade-in */}
                                        <div className="space-y-3 relative z-10">
                                            {notificationItems.map((item, idx) => {
                                                const Icon = item.icon;
                                                return (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.6 + idx * 0.2 }}
                                                        className={`p-3.5 rounded-2xl border border-white/5 flex gap-3 items-center backdrop-blur-sm ${item.color} shadow-sm`}
                                                    >
                                                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                            <Icon className="w-4 h-4" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-[10px] font-black tracking-tight text-white truncate">{item.type}</span>
                                                                <span className="text-[9px] text-slate-400 shrink-0">{item.time}</span>
                                                            </div>
                                                            <p className="text-[11px] text-slate-300 truncate mt-0.5">{item.message}</p>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        {/* Simulation visual helper */}
                                        <div className="flex-1 flex flex-col justify-end pb-2">
                                            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl text-[9px] text-slate-400 text-center leading-relaxed">
                                                All channels feed into a single high-performance pipeline in real time.
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            </div>

                        </div>

                        {/* Right Column - Lead Form Card */}
                        <div className="lg:col-span-5">
                            <div className="p-8 md:p-10 rounded-[3rem] border border-white/10 glass-card bg-slate-950/40 shadow-[0_0_50px_rgba(0,0,0,0.4)] relative overflow-hidden">
                                
                                {/* Accent gradient ring */}
                                <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-amber-400/10 via-transparent to-cyan-500/10 pointer-events-none" />

                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 animate-bounce">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-bold uppercase tracking-tight text-white">Check Scheduled!</h3>
                                            <p className="text-slate-300 text-sm leading-relaxed">
                                                Your Lead Leak Check request has been received. We are already analyzing your business capture setup.
                                            </p>
                                            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold leading-relaxed mt-4">
                                                💡 Want to get your results faster? Schedule a quick 10-minute review call now.
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 w-full pt-4">
                                            <Link
                                                href={`/book?from=lead-leak-check&name=${encodeURIComponent(submittedLead.name)}&email=${encodeURIComponent(submittedLead.email)}&phone=${encodeURIComponent(submittedLead.phone)}`}
                                                className="w-full py-4 bg-white text-black font-black rounded-2xl border-glow flex items-center justify-center gap-2 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 text-xs uppercase tracking-widest text-center"
                                            >
                                                Yes, Book a 10-Minute Call
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => setStatus("idle")}
                                                className="w-full py-4 border border-white/10 rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                                            >
                                                No thanks, I&apos;ll wait for the email
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold uppercase tracking-tight text-white">Free Lead Leak Check</h3>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                Fill in your details below to get a custom audit of your lead capture channels and check where you might be losing sales.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            
                                            {/* Name */}
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                    Name
                                                </label>
                                                <input 
                                                    type="text" 
                                                    name="name" 
                                                    required 
                                                    disabled={status === "submitting"}
                                                    placeholder="John Doe" 
                                                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 focus:border-amber-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
                                                />
                                            </div>

                                            {/* Business Name */}
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                    Business Name
                                                </label>
                                                <input 
                                                    type="text" 
                                                    name="business_name" 
                                                    required 
                                                    disabled={status === "submitting"}
                                                    placeholder="Acme Local LLC" 
                                                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 focus:border-amber-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
                                                />
                                            </div>

                                            {/* Email with descriptive label */}
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                    Email Address — Where should we send your results?
                                                </label>
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    required 
                                                    disabled={status === "submitting"}
                                                    placeholder="john@yourbusiness.com" 
                                                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 focus:border-amber-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
                                                />
                                            </div>

                                            {/* Phone Number */}
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                    Phone Number (Optional)
                                                </label>
                                                <input 
                                                    type="tel" 
                                                    name="phone" 
                                                    disabled={status === "submitting"}
                                                    placeholder="601-555-0199" 
                                                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 focus:border-amber-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
                                                />
                                            </div>

                                            {/* Website or Facebook Page */}
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                    Website or Facebook Page
                                                </label>
                                                <input 
                                                    type="text" 
                                                    name="website_or_facebook" 
                                                    required 
                                                    disabled={status === "submitting"}
                                                    placeholder="e.g. www.acme.com or facebook.com/acme" 
                                                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 focus:border-amber-400 rounded-2xl outline-none transition-all placeholder:text-muted-foreground/30 text-white text-sm"
                                                />
                                            </div>

                                            {/* What do you need help with most? */}
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                                    What do you need help with most?
                                                </label>
                                                <select 
                                                    name="roadblock"
                                                    required
                                                    disabled={status === "submitting"}
                                                    className="w-full px-4 py-3.5 bg-slate-900 border border-white/10 focus:border-amber-400 rounded-2xl outline-none transition-all text-white text-sm cursor-pointer appearance-none animate-none"
                                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundSize: '1em', backgroundRepeat: 'no-repeat' }}
                                                >
                                                    <option value="" disabled className="text-slate-500">Select an option...</option>
                                                    <option value="Getting more calls/leads">Getting more calls/leads</option>
                                                    <option value="Following up with leads">Following up with leads</option>
                                                    <option value="My website is not bringing leads">My website is not bringing leads</option>
                                                    <option value="Missed calls">Missed calls</option>
                                                    <option value="Email/text marketing">Email/text marketing</option>
                                                    <option value="Not sure">Not sure</option>
                                                </select>
                                            </div>

                                            {/* SMS Opt-In checkbox with detailed compliance language */}
                                            <div className="pt-2">
                                                <label className="flex items-start gap-3 cursor-pointer group">
                                                    <input 
                                                        type="checkbox" 
                                                        name="sms_opt_in" 
                                                        value="on"
                                                        disabled={status === "submitting"}
                                                        className="rounded bg-white/5 border-white/10 focus:ring-amber-500 h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5 cursor-pointer transition-colors animate-none" 
                                                    />
                                                    <span className="text-[10px] text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                                        By checking this box, you agree to receive text messages from Power Digital Media about your Lead Leak Check, appointment reminders, support, and updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to unsubscribe and HELP for help. Mobile information will not be shared with third parties/affiliates for marketing/promotional purposes. All text messaging originator opt-in data and consent will not be shared with any third parties. View our <Link href="/privacy" target="_blank" className="text-amber-400 underline hover:text-amber-300">Privacy Policy</Link> and <Link href="/terms" target="_blank" className="text-amber-400 underline hover:text-amber-300">Terms & Conditions</Link>.
                                                    </span>
                                                </label>
                                            </div>

                                            {status === "error" && (
                                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
                                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                                    Submission failed. Please check your network and details.
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={status === "submitting"}
                                                className="w-full py-4.5 bg-white text-black font-black rounded-2xl border-glow flex items-center justify-center gap-2 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 group text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {status === "submitting" ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                        Analyzing Channels...
                                                    </>
                                                ) : (
                                                    <>
                                                        Get My Free Lead Leak Check
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

                    {/* Personal trust footer section */}
                    <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div className="space-y-2 max-w-xl">
                            <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Operational Excellence</span>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Built by **Power Digital Media LLC** — helping Mississippi businesses with blistering-fast websites, custom CRMs, cloud phones, marketing automation, and digital growth systems.
                            </p>
                        </div>
                        <BBBSeal variant="badge" className="shrink-0" />
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
