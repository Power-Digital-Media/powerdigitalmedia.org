"use client";

import { motion } from "framer-motion";
import {
    Send, Globe, User, Building2, Palette, LayoutGrid,
    FileText, Wrench, Clock, HeartHandshake, Search, Sparkles,
    Monitor, type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, type FormEvent } from "react";

/* ─── Types ─────────────────────────────────────────────────────── */
type FormStatus = "idle" | "submitting" | "success" | "error";

/* ─── Styled Checkbox ───────────────────────────────────────────── */
function Checkbox({ name, value, label, disabled }: { name: string; value: string; label: string; disabled: boolean }) {
    return (
        <label className="relative flex items-center gap-3 cursor-pointer group select-none">
            <input
                type="checkbox"
                name={name}
                value={value}
                disabled={disabled}
                className="peer absolute opacity-0 w-0 h-0"
            />
            <span className="w-5 h-5 rounded-md border border-white/20 bg-white/5 peer-checked:bg-cyan-400 peer-checked:border-cyan-400 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-400/50 transition-all flex items-center justify-center group-hover:border-white/40 shrink-0">
                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{label}</span>
        </label>
    );
}

/* ─── Radio Group ───────────────────────────────────────────────── */
function RadioGroup({ name, options, disabled }: { name: string; options: string[]; disabled: boolean }) {
    return (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {options.map((val) => (
                <label key={val} className="relative flex items-center gap-2 cursor-pointer group select-none">
                    <input
                        type="radio"
                        name={name}
                        value={val}
                        disabled={disabled}
                        className="peer absolute opacity-0 w-0 h-0"
                    />
                    <span className="w-5 h-5 rounded-full border border-white/20 bg-white/5 peer-checked:border-cyan-400 transition-all flex items-center justify-center group-hover:border-white/40">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 scale-0 peer-checked:scale-100 transition-transform" />
                    </span>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{val}</span>
                </label>
            ))}
        </div>
    );
}

/* ─── Section Wrapper ───────────────────────────────────────────── */
function FormSection({ icon: Icon, title, children, delay = 0 }: { icon: LucideIcon; title: string; children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            className="p-8 md:p-10 rounded-3xl glass-card border-white/10 space-y-6"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            </div>
            {children}
        </motion.div>
    );
}

/* ─── Input Field ───────────────────────────────────────────────── */
function Field({ label, name, type = "text", placeholder = "", required = false, disabled = false }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean; disabled?: boolean }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                {label} {required && <span className="text-cyan-400">*</span>}
            </label>
            <input
                type={type}
                name={name}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50 text-white"
            />
        </div>
    );
}

/* ─── Textarea Field ────────────────────────────────────────────── */
function TextArea({ label, name, placeholder = "", rows = 3, disabled = false }: { label: string; name: string; placeholder?: string; rows?: number; disabled?: boolean }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">{label}</label>
            <textarea
                name={name}
                rows={rows}
                disabled={disabled}
                placeholder={placeholder}
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none transition-all placeholder:text-muted-foreground/30 resize-none disabled:opacity-50 text-white"
            />
        </div>
    );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function WebDesignDiscoveryPage() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const disabled = status === "submitting";

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mdazlovb", {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <main className="relative min-h-screen bg-background">
            <Navbar />

            {/* ─── Hero ─────────────────────────────────────────── */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-cyan-400/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Globe className="w-4 h-4" />
                            Web Design Discovery
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight md:text-6xl mb-4">
                            Initialize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Build.</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                            Tell us about your project so we can scope the right architecture, come prepared, and build something that dominates.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ─── Form ─────────────────────────────────────────── */}
            <section className="pb-24 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto">

                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-16 rounded-3xl glass-card border-white/10 flex flex-col items-center justify-center text-center space-y-6"
                            >
                                <div className="w-20 h-20 rounded-full bg-cyan-400/20 flex items-center justify-center">
                                    <Send className="w-8 h-8 text-cyan-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Build Request Received! 🚀</h2>
                                    <p className="text-muted-foreground">We&apos;ve received your project details and will be in touch within 24 hours to discuss your architecture.</p>
                                </div>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-widest"
                                >
                                    Submit Another
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* ─── Prospect Info ───────────────────────── */}
                                <FormSection icon={User} title="Your Information">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Field label="Full Name" name="prospect_name" placeholder="John Doe" required disabled={disabled} />
                                        <Field label="Business / Organization Name" name="business_name" placeholder="Acme Corp" required disabled={disabled} />
                                    </div>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Field label="Phone" name="phone" type="tel" placeholder="(601) 555-0199" disabled={disabled} />
                                        <Field label="Email" name="email" type="email" placeholder="john@acme.com" required disabled={disabled} />
                                    </div>
                                    <Field label="Best Contact Method" name="best_contact" placeholder="Phone call, text, email, etc." disabled={disabled} />
                                </FormSection>

                                {/* ─── Business Context ────────────────────── */}
                                <FormSection icon={Building2} title="About Your Business" delay={0.05}>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">What type of business are you?</label>
                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                            {[
                                                "Construction / Contractor", "Real Estate", "Restaurant / Food Service",
                                                "Retail / E-Commerce Store", "Health & Wellness", "Ministry / Church",
                                                "Law Firm / Legal", "Medical / Dental", "Automotive",
                                                "Salon / Barbershop", "Fitness / Gym", "Non-Profit / Foundation",
                                                "Technology / SaaS", "Photography / Videography", "Consulting / Coaching",
                                                "Home Services (HVAC, Plumbing, etc.)", "Entertainment / Events", "Education / Training",
                                                "Insurance", "Pharmacy",
                                            ].map((type) => (
                                                <Checkbox key={type} name="business_type" value={type} label={type} disabled={disabled} />
                                            ))}
                                        </div>
                                        <Field label="Other Industry (if not listed)" name="business_type_other" placeholder="e.g. Agriculture, Logistics, Insurance..." disabled={disabled} />
                                    </div>
                                    <TextArea label="What products or services do you offer?" name="products_services" placeholder="Describe your core offerings..." disabled={disabled} />
                                    <Field label="Who is your ideal customer?" name="ideal_customer" placeholder="Demographics, pain points, buying behavior..." disabled={disabled} />
                                    <Field label="Business Location / Service Area" name="service_area" placeholder="Jackson, MS — serving all of Mississippi" disabled={disabled} />
                                </FormSection>

                                {/* ─── Current Website Status ─────────────── */}
                                <FormSection icon={Globe} title="Current Website Status" delay={0.1}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Do you currently have a website?</label>
                                        <RadioGroup name="has_website" options={["Yes", "No"]} disabled={disabled} />
                                    </div>
                                    <Field label="Current Website URL (if applicable)" name="current_url" type="url" placeholder="https://yourbusiness.com" disabled={disabled} />
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">What platform is it built on?</label>
                                        <RadioGroup name="current_platform" options={["WordPress", "Wix", "Squarespace", "Shopify", "Custom / Don't Know", "N/A — No site yet"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">What is this project?</label>
                                        <RadioGroup name="project_type" options={["Complete redesign", "New build from scratch", "Updates to existing site"]} disabled={disabled} />
                                    </div>
                                    <TextArea label="What do you like or dislike about your current site?" name="current_site_feedback" placeholder="What's working? What's frustrating? What's missing?" disabled={disabled} />
                                </FormSection>

                                {/* ─── Design Preferences ────────────────── */}
                                <FormSection icon={Palette} title="Design Preferences" delay={0.15}>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">What visual style are you drawn to?</label>
                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                            {[
                                                "Clean & Minimal", "Bold & High-Impact", "Corporate & Professional",
                                                "Dark & Premium", "Playful & Colorful", "Luxury / High-End",
                                            ].map((style) => (
                                                <Checkbox key={style} name="visual_style" value={style} label={style} disabled={disabled} />
                                            ))}
                                        </div>
                                    </div>
                                    <TextArea label="Reference sites you love (paste URLs)" name="reference_sites" placeholder="e.g. https://stripe.com, https://apple.com — tell us what you like about them" rows={2} disabled={disabled} />
                                    <TextArea label="Competitor websites (paste URLs)" name="competitor_sites" placeholder="Your top 2-3 competitors — we'll study them and build something that outperforms" rows={2} disabled={disabled} />
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Do you have existing brand colors and a logo?</label>
                                        <RadioGroup name="has_branding" options={["Yes — ready to go", "Partially — needs refinement", "No — need branding too"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">What&apos;s the #1 thing visitors should do on your site?</label>
                                        <RadioGroup name="primary_goal" options={["Call / Contact Us", "Buy a Product", "Book an Appointment", "Fill Out a Form", "Learn About Services", "Sign Up / Register"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Hero section preference (top of homepage)</label>
                                        <RadioGroup name="hero_style" options={["Video Background", "Static Image", "Image Slider / Carousel", "Animated Text / Minimal", "Not sure — recommend something"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Animation level</label>
                                        <RadioGroup name="animation_level" options={["Static / Minimal — clean and fast", "Moderate — subtle scroll effects and transitions", "Heavy — parallax, cinematic, motion-rich"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Photography direction</label>
                                        <RadioGroup name="photo_direction" options={["Custom photography", "Professional stock imagery", "Illustrations / Graphics", "Icon-heavy / minimal photos", "Mix of everything"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Color mood</label>
                                        <RadioGroup name="color_mood" options={["Warm (reds, oranges, golds)", "Cool (blues, greens, purples)", "Neutral (grays, blacks, whites)", "Earthy (browns, tans, forest)", "Bold & Vibrant", "Muted & Pastel"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Font vibe</label>
                                        <RadioGroup name="font_vibe" options={["Modern / Clean sans-serif", "Classic / Serif (traditional)", "Bold / Display (high-impact)", "Handwritten / Script", "Not sure — you decide"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Layout density</label>
                                        <RadioGroup name="layout_density" options={["Spacious — lots of whitespace and breathing room", "Balanced — clean but informative", "Content-rich — packed with info above the fold"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">How important is mobile?</label>
                                        <RadioGroup name="mobile_priority" options={["Critical — most of our customers are on phones", "Important — about equal mobile/desktop", "Secondary — most visitors use desktop"]} disabled={disabled} />
                                    </div>
                                </FormSection>

                                {/* ─── Functionality Requirements ───────── */}
                                <FormSection icon={LayoutGrid} title="Functionality & Features" delay={0.2}>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">What features do you need?</label>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {[
                                                "Contact Form", "Booking / Appointment Calendar",
                                                "E-Commerce / Online Store", "Blog / News Section",
                                                "Photo / Video Gallery", "Member Portal / Login Area",
                                                "Live Chat Widget", "Email Signup / Newsletter",
                                                "Customer Reviews / Testimonials", "Social Media Integration",
                                                "Multi-Language Support", "Custom Dashboard / Admin Panel",
                                            ].map((feature) => (
                                                <Checkbox key={feature} name="features_needed" value={feature} label={feature} disabled={disabled} />
                                            ))}
                                        </div>
                                        <Field label="Other features" name="features_other" placeholder="Anything else not listed above..." disabled={disabled} />
                                    </div>
                                </FormSection>

                                {/* ─── Pages & Structure ─────────────────── */}
                                <FormSection icon={FileText} title="Pages & Structure" delay={0.25}>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Key pages needed</label>
                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                            {[
                                                "Home", "About", "Services", "Contact",
                                                "Portfolio / Gallery", "Blog", "FAQ",
                                                "Pricing", "Testimonials", "Team / Staff",
                                            ].map((page) => (
                                                <Checkbox key={page} name="pages_needed" value={page} label={page} disabled={disabled} />
                                            ))}
                                        </div>
                                        <Field label="Other pages" name="pages_other" placeholder="e.g. Events, Locations, Careers..." disabled={disabled} />
                                    </div>
                                    <Field label="Estimated total page count" name="page_count" placeholder="e.g. 5-10 pages, 20+ pages" disabled={disabled} />
                                </FormSection>

                                {/* ─── Content Readiness ─────────────────── */}
                                <FormSection icon={Wrench} title="Content & Technical Readiness" delay={0.3}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Do you have written content (copy) ready?</label>
                                        <RadioGroup name="has_copy" options={["Yes — all written", "Some — need help finishing", "No — need copywriting"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Do you have professional photos / videos?</label>
                                        <RadioGroup name="has_media" options={["Yes", "Some — need more", "No — need photography/video"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Do you have a domain name?</label>
                                        <RadioGroup name="has_domain" options={["Yes", "No — need one"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Third-party integrations needed</label>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {[
                                                "Email Hosting / Setup", "CRM (HubSpot, Salesforce, etc.)",
                                                "Payment Processing (Stripe, PayPal)", "Google Analytics / Tag Manager",
                                                "Social Media Feeds", "Scheduling Tool (Calendly, etc.)",
                                            ].map((integration) => (
                                                <Checkbox key={integration} name="integrations" value={integration} label={integration} disabled={disabled} />
                                            ))}
                                        </div>
                                        <Field label="Other integrations" name="integrations_other" placeholder="Any other tools or platforms..." disabled={disabled} />
                                    </div>
                                </FormSection>

                                {/* ─── Search & AI Visibility ──────────── */}
                                <FormSection icon={Search} title="Search & AI Visibility" delay={0.32}>
                                    <p className="text-sm text-muted-foreground -mt-2">Modern visibility goes beyond Google. Select the strategies you&apos;re interested in — we&apos;ll scope them into your build.</p>
                                    <div className="space-y-5">
                                        <label className="relative flex items-start gap-3 cursor-pointer group select-none">
                                            <input type="checkbox" name="visibility_services" value="SEO" disabled={disabled} className="peer absolute opacity-0 w-0 h-0" />
                                            <span className="w-5 h-5 mt-0.5 rounded-md border border-white/20 bg-white/5 peer-checked:bg-cyan-400 peer-checked:border-cyan-400 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-400/50 transition-all flex items-center justify-center group-hover:border-white/40 shrink-0">
                                                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </span>
                                            <div>
                                                <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">SEO — Search Engine Optimization</span>
                                                <p className="text-xs text-muted-foreground mt-0.5">Rank higher on Google & Bing. Includes keyword strategy, meta tags, site speed optimization, schema markup, and technical SEO best practices.</p>
                                            </div>
                                        </label>
                                        <label className="relative flex items-start gap-3 cursor-pointer group select-none">
                                            <input type="checkbox" name="visibility_services" value="AEO" disabled={disabled} className="peer absolute opacity-0 w-0 h-0" />
                                            <span className="w-5 h-5 mt-0.5 rounded-md border border-white/20 bg-white/5 peer-checked:bg-cyan-400 peer-checked:border-cyan-400 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-400/50 transition-all flex items-center justify-center group-hover:border-white/40 shrink-0">
                                                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </span>
                                            <div>
                                                <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">AEO — Answer Engine Optimization</span>
                                                <p className="text-xs text-muted-foreground mt-0.5">Get featured in AI-powered answers (Google AI Overviews, Siri, Alexa). We structure your content so AI assistants pull your business as the answer.</p>
                                            </div>
                                        </label>
                                        <label className="relative flex items-start gap-3 cursor-pointer group select-none">
                                            <input type="checkbox" name="visibility_services" value="GEO" disabled={disabled} className="peer absolute opacity-0 w-0 h-0" />
                                            <span className="w-5 h-5 mt-0.5 rounded-md border border-white/20 bg-white/5 peer-checked:bg-cyan-400 peer-checked:border-cyan-400 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-400/50 transition-all flex items-center justify-center group-hover:border-white/40 shrink-0">
                                                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </span>
                                            <div>
                                                <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">GEO — Generative Engine Optimization</span>
                                                <p className="text-xs text-muted-foreground mt-0.5">Be cited by ChatGPT, Claude, Perplexity, and other AI search engines. We optimize your site&apos;s authority signals so generative AI models reference your business in their responses.</p>
                                            </div>
                                        </label>
                                        <label className="relative flex items-start gap-3 cursor-pointer group select-none">
                                            <input type="checkbox" name="visibility_services" value="llms.txt" disabled={disabled} className="peer absolute opacity-0 w-0 h-0" />
                                            <span className="w-5 h-5 mt-0.5 rounded-md border border-white/20 bg-white/5 peer-checked:bg-cyan-400 peer-checked:border-cyan-400 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-400/50 transition-all flex items-center justify-center group-hover:border-white/40 shrink-0">
                                                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </span>
                                            <div>
                                                <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">llms.txt — AI-Readable Site Index</span>
                                                <p className="text-xs text-muted-foreground mt-0.5">A machine-readable file (like robots.txt but for AI) that tells large language models exactly what your business does, what you offer, and how to represent you. The new standard for AI discoverability.</p>
                                            </div>
                                        </label>
                                    </div>
                                </FormSection>

                                {/* ─── Timeline & Budget ─────────────────── */}
                                <FormSection icon={Clock} title="Timeline & Investment" delay={0.35}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">When do you need the site live?</label>
                                        <RadioGroup name="timeline" options={["ASAP", "Within 30 days", "1–3 months", "No rush — just planning"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Investment range</label>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {[
                                                "Under $5,000", "$5,000 – $10,000 (Identity Protocol)",
                                                "$10,000 – $25,000 (Growth Architecture)", "$25,000+ (Enterprise Ecosystem)",
                                                "Not sure yet — need guidance",
                                            ].map((range) => (
                                                <Checkbox key={range} name="budget_range" value={range} label={range} disabled={disabled} />
                                            ))}
                                        </div>
                                    </div>
                                </FormSection>

                                {/* ─── Ongoing Support ───────────────────── */}
                                <FormSection icon={HeartHandshake} title="Ongoing Support" delay={0.4}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Are you interested in ongoing website management?</label>
                                        <RadioGroup name="ongoing_management" options={["Yes — monthly retainer", "Maybe — tell me more", "No — just the build"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Additional services of interest</label>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {[
                                                "SEO / Search Optimization", "Content Marketing / Blog Management",
                                                "Social Media Management", "Paid Ads (Google / Meta)",
                                                "Email Marketing", "Brand Strategy",
                                            ].map((service) => (
                                                <Checkbox key={service} name="additional_services" value={service} label={service} disabled={disabled} />
                                            ))}
                                        </div>
                                    </div>
                                    <TextArea label="Anything else you'd like us to know?" name="notes" placeholder="Additional context, special requirements, questions, or goals for this project..." rows={5} disabled={disabled} />
                                </FormSection>

                                {/* ─── Submit ─────────────────────────────── */}
                                {status === "error" && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-400 text-sm text-center"
                                    >
                                        Something went wrong. Please try again or email us directly at info@powerdigitalmedia.org
                                    </motion.p>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={disabled}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="w-full py-5 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-cyan-400 hover:text-white focus:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all group text-lg uppercase tracking-widest"
                                >
                                    {disabled ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Initialize Build
                                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>

                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
