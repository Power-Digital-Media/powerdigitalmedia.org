"use client";

import { motion } from "framer-motion";
import {
    Send, TrendingUp, User, Building2, Target, BarChart3,
    DollarSign, Clock, HeartHandshake, Search, Sparkles,
    type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

/* ─── Types ─────────────────────────────────────────────────────── */
type FormStatus = "idle" | "submitting" | "success" | "error";

/* ─── Styled Checkbox ───────────────────────────────────────────── */
function Checkbox({ name, value, label, disabled }: { name: string; value: string; label: string; disabled: boolean }) {
    const [checked, setChecked] = useState(false);
    const toggle = () => { if (!disabled) setChecked(c => !c); };
    return (
        <div className="relative flex items-center gap-3 cursor-pointer group select-none" onClick={toggle} role="checkbox" aria-checked={checked} tabIndex={0} onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } }}>
            <input type="hidden" name={checked ? name : ''} value={value} />
            <span className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center shrink-0 ${
                checked ? 'bg-blue-400 border-blue-400' : 'border-white/20 bg-white/5 group-hover:border-white/40'
            }`}>
                {checked && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </span>
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{label}</span>
        </div>
    );
}

/* ─── Descriptive Checkbox ──────────────────────────────────────── */
function DescriptiveCheckbox({ name, value, title, description, disabled }: { name: string; value: string; title: string; description: string; disabled: boolean }) {
    const [checked, setChecked] = useState(false);
    const toggle = () => { if (!disabled) setChecked(c => !c); };
    return (
        <div className="relative flex items-start gap-3 cursor-pointer group select-none" onClick={toggle} role="checkbox" aria-checked={checked} tabIndex={0} onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } }}>
            <input type="hidden" name={checked ? name : ''} value={value} />
            <span className={`w-5 h-5 mt-0.5 rounded-md border transition-all flex items-center justify-center shrink-0 ${
                checked ? 'bg-blue-400 border-blue-400' : 'border-white/20 bg-white/5 group-hover:border-white/40'
            }`}>
                {checked && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </span>
            <div>
                <span className={`text-sm font-semibold transition-colors ${checked ? 'text-blue-400' : 'text-white group-hover:text-blue-400'}`}>{title}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            </div>
        </div>
    );
}

/* ─── Radio Group ───────────────────────────────────────────────── */
function RadioGroup({ name, options, disabled }: { name: string; options: string[]; disabled: boolean }) {
    const [selected, setSelected] = useState<string | null>(null);
    return (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <input type="hidden" name={name} value={selected ?? ''} />
            {options.map((val) => (
                <div
                    key={val}
                    className="relative flex items-center gap-2 cursor-pointer group select-none"
                    onClick={() => { if (!disabled) setSelected(prev => prev === val ? null : val); }}
                    role="radio"
                    aria-checked={selected === val}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!disabled) setSelected(prev => prev === val ? null : val); } }}
                >
                    <span className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${
                        selected === val ? 'border-blue-400' : 'border-white/20 bg-white/5 group-hover:border-white/40'
                    }`}>
                        <span className={`w-2.5 h-2.5 rounded-full bg-blue-400 transition-transform ${
                            selected === val ? 'scale-100' : 'scale-0'
                        }`} />
                    </span>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{val}</span>
                </div>
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
                <div className="w-10 h-10 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center text-blue-400">
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
                {label} {required && <span className="text-blue-400">*</span>}
            </label>
            <input
                type={type}
                name={name}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-blue-400 outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50 text-white"
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
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-blue-400 outline-none transition-all placeholder:text-muted-foreground/30 resize-none disabled:opacity-50 text-white"
            />
        </div>
    );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function MarketingDiscoveryPage() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const disabled = status === "submitting";
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch("/api/forms", {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                form.reset();
                router.push("/book?from=marketing-discovery");
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-blue-500/5 blur-[120px] pointer-events-none -z-10" />
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <TrendingUp className="w-4 h-4" />
                            Marketing Discovery
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight md:text-6xl mb-4">
                            Engineer Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Growth.</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                            Tell us about your business and growth goals so we can architect the right paid acquisition strategy and come prepared to dominate.
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
                                <div className="w-20 h-20 rounded-full bg-blue-400/20 flex items-center justify-center">
                                    <Send className="w-8 h-8 text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Campaign Brief Received! 🚀</h2>
                                    <p className="text-muted-foreground">We&apos;ve received your marketing details and will be in touch within 24 hours to discuss your growth strategy.</p>
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
                                {/* Hidden field to tag the source */}
                                <input type="hidden" name="_form_source" value="marketing-discovery" />

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
                                        <Field label="Other Industry (if not listed)" name="business_type_other" placeholder="e.g. Agriculture, Logistics..." disabled={disabled} />
                                    </div>
                                    <TextArea label="What products or services do you offer?" name="products_services" placeholder="Describe your core offerings..." disabled={disabled} />
                                    <Field label="Who is your ideal customer?" name="ideal_customer" placeholder="Demographics, pain points, buying behavior..." disabled={disabled} />
                                    <Field label="Business Location / Service Area" name="service_area" placeholder="Jackson, MS — serving all of Mississippi" disabled={disabled} />
                                </FormSection>

                                {/* ─── Current Marketing Status ─────────────── */}
                                <FormSection icon={BarChart3} title="Current Marketing Status" delay={0.1}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Have you run paid ads before?</label>
                                        <RadioGroup name="has_run_ads" options={["Yes — currently running", "Yes — in the past", "No — never"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Which platforms have you advertised on?</label>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {[
                                                "Facebook / Instagram (Meta)", "Google Ads (Search/Display)",
                                                "TikTok Ads", "YouTube Ads",
                                                "LinkedIn Ads", "Twitter / X Ads",
                                                "Snapchat Ads", "None — first time",
                                            ].map((platform) => (
                                                <Checkbox key={platform} name="ad_platforms" value={platform} label={platform} disabled={disabled} />
                                            ))}
                                        </div>
                                    </div>
                                    <Field label="Current monthly ad spend (approximate)" name="current_ad_spend" placeholder="e.g. $500/month, $2,000/month, not sure" disabled={disabled} />
                                    <TextArea label="What's working and what's not with your current marketing?" name="current_marketing_feedback" placeholder="What strategies have you tried? What results have you seen? What's frustrating you?" disabled={disabled} />
                                </FormSection>

                                {/* ─── Goals & Objectives ──────────────────── */}
                                <FormSection icon={Target} title="Goals & Objectives" delay={0.15}>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">What is your primary marketing goal?</label>
                                        <RadioGroup name="primary_goal" options={[
                                            "Generate leads / inquiries",
                                            "Drive online sales",
                                            "Increase foot traffic",
                                            "Build brand awareness",
                                            "Book appointments / consultations",
                                            "Grow social media following",
                                            "Launch a new product / service",
                                        ]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">What services are you interested in?</label>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {[
                                                "Meta Ads (Facebook + Instagram)", "Google Ads (Search + Display)",
                                                "Social Media Management", "Content Creation & Strategy",
                                                "Email Marketing / Automation", "SEO / Organic Traffic",
                                                "Landing Page / Funnel Design", "Full Marketing Retainer",
                                            ].map((service) => (
                                                <Checkbox key={service} name="services_interested" value={service} label={service} disabled={disabled} />
                                            ))}
                                        </div>
                                    </div>
                                    <TextArea label="Describe your ideal outcome" name="ideal_outcome" placeholder="What does success look like for you in 30, 60, 90 days?" disabled={disabled} />
                                </FormSection>

                                {/* ─── Audience & Targeting ─────────────────── */}
                                <FormSection icon={Search} title="Audience & Targeting" delay={0.2}>
                                    <Field label="Who is your target customer?" name="target_customer" placeholder="Age range, location, interests, income level..." disabled={disabled} />
                                    <Field label="What problem do you solve for them?" name="customer_problem" placeholder="The pain point that drives them to you..." disabled={disabled} />
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">How do customers typically find you now?</label>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {[
                                                "Word of mouth / referrals", "Google search",
                                                "Social media", "Paid ads",
                                                "Walk-ins / foot traffic", "Community events",
                                                "Online directories (Yelp, BBB)", "Not sure",
                                            ].map((source) => (
                                                <Checkbox key={source} name="customer_sources" value={source} label={source} disabled={disabled} />
                                            ))}
                                        </div>
                                    </div>
                                    <TextArea label="Who are your top 2-3 competitors?" name="competitors" placeholder="Names and/or websites — we'll research them and build a strategy to outperform" rows={2} disabled={disabled} />
                                </FormSection>

                                {/* ─── Search & AI Visibility ──────────────── */}
                                <FormSection icon={Sparkles} title="Search & AI Visibility" delay={0.25}>
                                    <p className="text-sm text-muted-foreground -mt-2">Modern visibility goes beyond Google. Select the strategies you&apos;re interested in — we&apos;ll scope them into your campaign.</p>
                                    <div className="space-y-5">
                                        <DescriptiveCheckbox name="visibility_services" value="SEO" disabled={disabled} title="SEO — Search Engine Optimization" description="Rank higher on Google & Bing. Includes keyword strategy, meta tags, site speed optimization, schema markup, and technical SEO best practices." />
                                        <DescriptiveCheckbox name="visibility_services" value="AEO" disabled={disabled} title="AEO — Answer Engine Optimization" description="Get featured in AI-powered answers (Google AI Overviews, Siri, Alexa). We structure your content so AI assistants pull your business as the answer." />
                                        <DescriptiveCheckbox name="visibility_services" value="GEO" disabled={disabled} title="GEO — Generative Engine Optimization" description="Be cited by ChatGPT, Claude, Perplexity, and other AI search engines. We optimize your site's authority signals so generative AI models reference your business in their responses." />
                                    </div>
                                </FormSection>

                                {/* ─── Timeline & Budget ─────────────────── */}
                                <FormSection icon={DollarSign} title="Timeline & Investment" delay={0.3}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">When do you need to launch?</label>
                                        <RadioGroup name="timeline" options={["ASAP", "Within 30 days", "1–3 months", "No rush — just planning"]} disabled={disabled} />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Monthly marketing budget (management + ad spend)</label>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {[
                                                "Under $1,000/mo", "$1,000 – $2,500/mo",
                                                "$2,500 – $5,000/mo", "$5,000 – $10,000/mo",
                                                "$10,000+/mo", "Not sure yet — need guidance",
                                            ].map((range) => (
                                                <Checkbox key={range} name="budget_range" value={range} label={range} disabled={disabled} />
                                            ))}
                                        </div>
                                    </div>
                                </FormSection>

                                {/* ─── Additional Context ───────────────────── */}
                                <FormSection icon={HeartHandshake} title="Anything Else" delay={0.35}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Do you have a website?</label>
                                        <RadioGroup name="has_website" options={["Yes", "No — need one"]} disabled={disabled} />
                                    </div>
                                    <Field label="Website URL (if applicable)" name="website_url" type="url" placeholder="https://yourbusiness.com" disabled={disabled} />
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Do you have existing brand assets (logo, colors, photos)?</label>
                                        <RadioGroup name="has_brand_assets" options={["Yes — ready to go", "Partially — needs refinement", "No — need branding too"]} disabled={disabled} />
                                    </div>
                                    <TextArea label="Anything else you'd like us to know?" name="notes" placeholder="Special requirements, past experiences, upcoming events, seasonal promotions, or any other context..." rows={5} disabled={disabled} />
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
                                    className="w-full py-5 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-400 hover:text-white focus:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all group text-lg uppercase tracking-widest"
                                >
                                    {disabled ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Launch Campaign Brief
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
