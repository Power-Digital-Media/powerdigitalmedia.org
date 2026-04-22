"use client";

import { motion } from "framer-motion";
import { Send, ClipboardList, User, Building2, Share2, Megaphone, Target, Camera, DollarSign, StickyNote } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

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
            <span className="w-5 h-5 rounded-md border border-white/20 bg-white/5 peer-checked:bg-accent peer-checked:border-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent/50 transition-all flex items-center justify-center group-hover:border-white/40 shrink-0">
                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{label}</span>
        </label>
    );
}

/* ─── Inline Yes/No Radio ───────────────────────────────────────── */
function YesNo({ name, disabled }: { name: string; disabled: boolean }) {
    return (
        <div className="flex items-center gap-6">
            {["Yes", "No"].map((val) => (
                <label key={val} className="relative flex items-center gap-2 cursor-pointer group select-none">
                    <input
                        type="radio"
                        name={name}
                        value={val}
                        disabled={disabled}
                        className="peer absolute opacity-0 w-0 h-0"
                    />
                    <span className="w-5 h-5 rounded-full border border-white/20 bg-white/5 peer-checked:border-accent transition-all flex items-center justify-center group-hover:border-white/40">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent scale-0 peer-checked:scale-100 transition-transform" />
                    </span>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{val}</span>
                </label>
            ))}
        </div>
    );
}

/* ─── Section Wrapper ───────────────────────────────────────────── */
function FormSection({ icon: Icon, title, children, delay = 0 }: { icon: React.ElementType; title: string; children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            className="p-8 md:p-10 rounded-3xl glass-card border-white/10 space-y-6"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
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
                {label} {required && <span className="text-accent">*</span>}
            </label>
            <input
                type={type}
                name={name}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-accent outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50 text-white"
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
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-accent outline-none transition-all placeholder:text-muted-foreground/30 resize-none disabled:opacity-50 text-white"
            />
        </div>
    );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function ClientDiscoveryPage() {
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-accent/5 blur-[120px] pointer-events-none -z-10" />
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                            <ClipboardList className="w-4 h-4" />
                            Client Discovery
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight md:text-6xl mb-4">
                            Let&apos;s Learn <span className="text-accent">About You.</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                            Fill out this discovery sheet so we can understand your business, goals, and needs — and build a strategy that actually moves the needle.
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
                                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                                    <Send className="w-8 h-8 text-accent" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Discovery Sheet Submitted! 🎉</h2>
                                    <p className="text-muted-foreground">We&apos;ve received your information and will be in touch within 24 hours to discuss next steps.</p>
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
                                <FormSection icon={User} title="Prospect Information">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Field label="Prospect Name" name="prospect_name" placeholder="John Doe" required disabled={disabled} />
                                        <Field label="Business Name" name="business_name" placeholder="Acme Corp" required disabled={disabled} />
                                    </div>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Field label="Phone" name="phone" type="tel" placeholder="(601) 555-0199" disabled={disabled} />
                                        <Field label="Email" name="email" type="email" placeholder="john@acme.com" required disabled={disabled} />
                                    </div>
                                    <Field label="Best Contact Method" name="best_contact" placeholder="Phone call, text, email, etc." disabled={disabled} />
                                </FormSection>

                                {/* ─── Business Information ────────────────── */}
                                <FormSection icon={Building2} title="Business Information" delay={0.05}>
                                    <Field label="What type of business are you in?" name="business_type" placeholder="Retail, Real Estate, Ministry, etc." disabled={disabled} />
                                    <Field label="Industry / Niche / Genre" name="industry" placeholder="e.g. Health & Wellness, Church, E-commerce" disabled={disabled} />
                                    <TextArea label="What products or services do you offer?" name="products_services" placeholder="Describe your core offerings..." disabled={disabled} />
                                    <TextArea label="Who is your ideal customer?" name="ideal_customer" placeholder="Demographics, pain points, buying behavior..." disabled={disabled} />
                                    <Field label="How long have you been in business?" name="business_age" placeholder="e.g. 2 years, just starting out" disabled={disabled} />
                                    <Field label="Business Location / Service Area" name="service_area" placeholder="Jackson, MS — serving all of Mississippi" disabled={disabled} />
                                    <Field label="Website URL" name="website_url" type="url" placeholder="https://yourbusiness.com" disabled={disabled} />
                                </FormSection>

                                {/* ─── Social Media ────────────────────────── */}
                                <FormSection icon={Share2} title="Social Media Accounts" delay={0.1}>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Field label="Facebook Page" name="facebook" placeholder="facebook.com/yourpage" disabled={disabled} />
                                        <Field label="Instagram Page" name="instagram" placeholder="@yourhandle" disabled={disabled} />
                                    </div>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Field label="TikTok Account" name="tiktok" placeholder="@yourhandle" disabled={disabled} />
                                        <Field label="YouTube Channel" name="youtube" placeholder="youtube.com/@yourchannel" disabled={disabled} />
                                    </div>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Field label="LinkedIn Page" name="linkedin" placeholder="linkedin.com/in/yourpage" disabled={disabled} />
                                        <Field label="Pinterest" name="pinterest" placeholder="pinterest.com/yourpage" disabled={disabled} />
                                    </div>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Field label="X / Twitter" name="twitter" placeholder="@yourhandle" disabled={disabled} />
                                        <Field label="Other Platforms" name="other_platforms" placeholder="Threads, Snapchat, etc." disabled={disabled} />
                                    </div>
                                </FormSection>

                                {/* ─── Current Marketing Activity ─────────── */}
                                <FormSection icon={Megaphone} title="Current Marketing Activity" delay={0.15}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Are you currently doing any online marketing?</label>
                                        <YesNo name="doing_marketing" disabled={disabled} />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">If yes, which platforms are you using?</label>
                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                            {[
                                                "Facebook Ads", "Instagram Ads", "Google Ads", "YouTube Ads",
                                                "TikTok Ads", "SEO", "Email Marketing", "SMS Marketing",
                                                "Influencer Marketing", "Organic Social Media", "Content Marketing / Blogs",
                                                "Referral Marketing"
                                            ].map((platform) => (
                                                <Checkbox key={platform} name="marketing_platforms" value={platform} label={platform} disabled={disabled} />
                                            ))}
                                        </div>
                                        <Field label="Other" name="marketing_other" placeholder="Any other platforms..." disabled={disabled} />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Who manages your marketing now?</label>
                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                            {["Self", "Employee", "Agency", "Freelancer", "Nobody Currently"].map((manager) => (
                                                <Checkbox key={manager} name="marketing_manager" value={manager} label={manager} disabled={disabled} />
                                            ))}
                                        </div>
                                    </div>
                                </FormSection>

                                {/* ─── Goals & Growth ──────────────────────── */}
                                <FormSection icon={Target} title="Goals & Growth" delay={0.2}>
                                    <TextArea label="Main reason for seeking help now" name="reason_for_help" placeholder="What triggered you to reach out?" disabled={disabled} />
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Top 3 Business Goals</label>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <span className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-bold shrink-0">1</span>
                                                <input type="text" name="goal_1" disabled={disabled} placeholder="e.g. Increase monthly revenue" className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-accent outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50 text-white" />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-bold shrink-0">2</span>
                                                <input type="text" name="goal_2" disabled={disabled} placeholder="e.g. Build brand awareness locally" className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-accent outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50 text-white" />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-bold shrink-0">3</span>
                                                <input type="text" name="goal_3" disabled={disabled} placeholder="e.g. Get more leads from social media" className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-accent outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <TextArea label="What results would make this successful in 90 days?" name="success_90_days" placeholder="Paint the picture of success..." disabled={disabled} />
                                    <TextArea label="Biggest challenge right now" name="biggest_challenge" placeholder="What's holding you back the most?" disabled={disabled} />
                                </FormSection>

                                {/* ─── Content Creation ────────────────────── */}
                                <FormSection icon={Camera} title="Content Creation" delay={0.25}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Do you have photos/videos available?</label>
                                        <YesNo name="has_content" disabled={disabled} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Are you comfortable being on camera?</label>
                                        <YesNo name="on_camera" disabled={disabled} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Do you need help creating content ideas?</label>
                                        <YesNo name="needs_content_ideas" disabled={disabled} />
                                    </div>
                                    <Field label="How often are you posting now?" name="posting_frequency" placeholder="e.g. 3x per week, once a month, not at all" disabled={disabled} />
                                </FormSection>

                                {/* ─── Budget / Readiness ─────────────────── */}
                                <FormSection icon={DollarSign} title="Budget / Readiness" delay={0.3}>
                                    <Field label="Monthly marketing budget" name="budget" placeholder="e.g. $500 – $1,000/month" disabled={disabled} />

                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Looking for</label>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {["Consulting Only", "Monthly Management", "Ads Management", "Website Help", "Full Growth Strategy"].map((service) => (
                                                <Checkbox key={service} name="looking_for" value={service} label={service} disabled={disabled} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">When would you like to start?</label>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {["ASAP", "This Month", "Next Month", "Just Researching"].map((timeline) => (
                                                <Checkbox key={timeline} name="start_timeline" value={timeline} label={timeline} disabled={disabled} />
                                            ))}
                                        </div>
                                    </div>
                                </FormSection>

                                {/* ─── Notes ──────────────────────────────── */}
                                <FormSection icon={StickyNote} title="Additional Notes" delay={0.35}>
                                    <TextArea label="Anything else you'd like us to know?" name="notes" placeholder="Additional context, special requirements, or questions..." rows={5} disabled={disabled} />
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
                                    className="w-full py-5 bg-accent text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-accent/90 focus:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all group text-lg"
                                >
                                    {disabled ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Discovery Sheet
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
