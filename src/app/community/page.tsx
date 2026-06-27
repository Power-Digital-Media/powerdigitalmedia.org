"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  Globe, 
  PhoneCall, 
  Check, 
  Send, 
  MapPin, 
  Sparkles,
  ShieldCheck,
  Heart,
  Users
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CommunityLandingPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Convert checkbox services into an array
    const services: string[] = [];
    formData.getAll("services_interested").forEach((val) => {
      services.push(val.toString());
    });

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      business_name: formData.get("business_name"),
      biggest_challenge: formData.get("biggest_challenge"),
      services_interested: services,
      _form_source: "community-event"
    };

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to submit your details. Please check your inputs.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      <Navbar />

      {/* Hero section */}
      <main className="flex-grow pt-32 pb-24 relative overflow-hidden">
        {/* Background Cyber Grid */}
        <div className="absolute inset-0 cyber-grid opacity-[0.03] pointer-events-none" />
        
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-2 justify-center mb-6"
            >
              <Heart className="w-4 h-4 text-amber-500 fill-amber-500/30" />
              <span className="text-amber-500 font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs">
                Jackson Local Business Initiative
              </span>
            </motion.div>

            {/* Main Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight uppercase leading-none">
                Stronger Together. <br />
                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
                  Elevating Jackson MS.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed font-light">
                Local businesses are the heartbeat of our community. We build the high-speed website and customer operations systems that help you stand out, capture clients, and succeed against corporate giants.
              </p>
            </motion.div>

            {/* Core Offerings (One-Stop Shop Grid) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid gap-6 md:grid-cols-3 mb-20"
            >
              {/* Card 1: Web Design */}
              <div className="p-8 rounded-3xl glass-card border border-white/5 bg-white/[0.01] hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-3">1. Web Design</h3>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Blisteringly fast Next.js & React websites built to convert local traffic into loyal customers. Secure, responsive, and fully optimized for local search ranking (SEO).
                </p>
              </div>

              {/* Card 2: CRM & Marketing */}
              <div className="p-8 rounded-3xl glass-card border border-white/5 bg-white/[0.01] hover:border-teal-500/30 hover:bg-teal-500/[0.02] transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-3">2. CRM & Campaigns</h3>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Power up your backend with **Capsule CRM** and **Transpond.io**. Capture every lead, sync customer records instantly, and automate targeted B2B follow-up email campaigns.
                </p>
              </div>

              {/* Card 3: Business Phone */}
              <div className="p-8 rounded-3xl glass-card border border-white/5 bg-white/[0.01] hover:border-amber-500/30 hover:bg-amber-500/[0.02] transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                  <PhoneCall className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-3">3. Business Phone</h3>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Deploy **Ultel Business Phone** systems. Crystal-clear cloud telecommunications built for growing businesses, giving you auto-attendants, mobile app sync, and dedicated support.
                </p>
              </div>
            </motion.div>

            {/* Core Message & Form Grid */}
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              {/* Left Column: Heart-warming copy */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="lg:col-span-5 space-y-6"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>The One-Stop Shop</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight leading-tight">
                  We Handle Your Infrastructure. You Grow Your Business.
                </h2>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  We are proud to call Jackson home. We believe that when local businesses succeed, our families and communities thrive. But B2B tech can feel fragmented and overwhelming. 
                </p>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  That&apos;s why we configured Power Digital Media as your single B2B technology partner. We integrate your website, client databases, email newsletters, and office phones under one seamless umbrella.
                </p>
                
                {/* Local badges */}
                <div className="pt-6 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <MapPin className="w-5 h-5 text-amber-500" />
                    <span>Based locally in Jackson, Mississippi</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    <span>B2B Integrated System Support</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Lead Form Card */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-7"
              >
                <div className="p-8 md:p-10 rounded-[32px] glass-card border border-white/5 bg-cyan-500/[0.01] relative overflow-hidden">
                  
                  {status === "success" ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-wider mb-2">Connection Initiated!</h3>
                        <p className="text-foreground/70 text-sm max-w-md mx-auto">
                          Thank you for reaching out. Your business details have been synced to our CRM. We will reach out shortly to discuss growing your business!
                        </p>
                      </div>
                      <button
                        onClick={() => setStatus("idle")}
                        className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-widest"
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="text-center sm:text-left mb-2">
                        <h3 className="text-xl font-bold uppercase">Let&apos;s Build Jackson Together</h3>
                        <p className="text-xs text-foreground/60">Fill out this quick form and we will send you a follow-up packet.</p>
                      </div>

                      {/* Name & Email Group */}
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-foreground/60 ml-1">Your Name *</label>
                          <input 
                            type="text" 
                            name="name" 
                            required 
                            placeholder="John Doe"
                            className="w-full px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/5 focus:border-cyan-400 focus:outline-none transition-all text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-foreground/60 ml-1">Email Address *</label>
                          <input 
                            type="email" 
                            name="email" 
                            required 
                            placeholder="john@example.com"
                            className="w-full px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/5 focus:border-cyan-400 focus:outline-none transition-all text-sm"
                          />
                        </div>
                      </div>

                      {/* Phone & Business Name */}
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-foreground/60 ml-1">Phone Number</label>
                          <input 
                            type="tel" 
                            name="phone" 
                            placeholder="601-555-0199"
                            className="w-full px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/5 focus:border-cyan-400 focus:outline-none transition-all text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-foreground/60 ml-1">Business Name *</label>
                          <input 
                            type="text" 
                            name="business_name" 
                            required 
                            placeholder="Jackson Coffee Co."
                            className="w-full px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/5 focus:border-cyan-400 focus:outline-none transition-all text-sm"
                          />
                        </div>
                      </div>

                      {/* Services checklist */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-foreground/60 ml-1">What can we help you set up?</label>
                        <div className="grid gap-3 sm:grid-cols-2 p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                          <label className="flex items-center gap-3 text-xs text-foreground/80 cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              name="services_interested" 
                              value="Web Design"
                              className="rounded border-white/10 text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-transparent w-4 h-4"
                            />
                            <span>High-Speed Website</span>
                          </label>
                          <label className="flex items-center gap-3 text-xs text-foreground/80 cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              name="services_interested" 
                              value="CRM & Automation"
                              className="rounded border-white/10 text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-transparent w-4 h-4"
                            />
                            <span>CRM & Sales Automation</span>
                          </label>
                          <label className="flex items-center gap-3 text-xs text-foreground/80 cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              name="services_interested" 
                              value="Email Marketing"
                              className="rounded border-white/10 text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-transparent w-4 h-4"
                            />
                            <span>Email Newsletter Campaign</span>
                          </label>
                          <label className="flex items-center gap-3 text-xs text-foreground/80 cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              name="services_interested" 
                              value="Ultel Business Phone"
                              className="rounded border-white/10 text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-transparent w-4 h-4"
                            />
                            <span>Ultel Business Phone</span>
                          </label>
                        </div>
                      </div>

                      {/* Biggest Challenge */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-foreground/60 ml-1">What is your biggest business roadblock today?</label>
                        <textarea 
                          name="biggest_challenge" 
                          rows={3} 
                          placeholder="e.g. Getting more local leads, tracking customer follow-ups, outdated phone systems, etc."
                          className="w-full px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/5 focus:border-cyan-400 focus:outline-none transition-all text-sm resize-none"
                        />
                      </div>

                      {/* Error messaging */}
                      {status === "error" && (
                        <p className="text-red-400 text-xs ml-1 font-medium">{errorMessage}</p>
                      )}

                      {/* Submit button */}
                      <button 
                        type="submit" 
                        disabled={status === "submitting"}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-cyan-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {status === "submitting" ? (
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Register Business Inquiry</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}

                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
