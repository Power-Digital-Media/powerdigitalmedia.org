"use client";

import { motion } from "framer-motion";
import {
    Send, Mic, User, Radio, Headphones,
    DollarSign, HeartHandshake, Calendar, Sparkles,
    type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type FormStatus = "idle" | "submitting" | "success" | "error";

function Checkbox({ name, value, label, disabled }: { name: string; value: string; label: string; disabled: boolean }) {
    const [checked, setChecked] = useState(false);
    const toggle = () => { if (!disabled) setChecked(c => !c); };
    return (
        <div className="relative flex items-center gap-3 cursor-pointer group select-none" onClick={toggle} role="checkbox" aria-checked={checked} tabIndex={0} onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } }}>
            <input type="hidden" name={checked ? name : ''} value={value} />
            <span className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center shrink-0 ${checked ? 'bg-purple-400 border-purple-400' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}>
                {checked && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </span>
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{label}</span>
        </div>
    );
}

function RadioGroup({ name, options, disabled }: { name: string; options: string[]; disabled: boolean }) {
    const [selected, setSelected] = useState<string | null>(null);
    return (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <input type="hidden" name={name} value={selected ?? ''} />
            {options.map((val) => (
                <div key={val} className="relative flex items-center gap-2 cursor-pointer group select-none" onClick={() => { if (!disabled) setSelected(prev => prev === val ? null : val); }} role="radio" aria-checked={selected === val} tabIndex={0} onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!disabled) setSelected(prev => prev === val ? null : val); } }}>
                    <span className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${selected === val ? 'border-purple-400' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}>
                        <span className={`w-2.5 h-2.5 rounded-full bg-purple-400 transition-transform ${selected === val ? 'scale-100' : 'scale-0'}`} />
                    </span>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{val}</span>
                </div>
            ))}
        </div>
    );
}

function FormSection({ icon: Icon, title, children, delay = 0 }: { icon: LucideIcon; title: string; children: React.ReactNode; delay?: number }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay }} className="p-8 md:p-10 rounded-3xl glass-card border-white/10 space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-purple-400"><Icon className="w-5 h-5" /></div>
                <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            </div>
            {children}
        </motion.div>
    );
}

function Field({ label, name, type = "text", placeholder = "", required = false, disabled = false }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean; disabled?: boolean }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">{label} {required && <span className="text-purple-400">*</span>}</label>
            <input type={type} name={name} required={required} disabled={disabled} placeholder={placeholder} className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-purple-400 outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50 text-white" />
        </div>
    );
}

function TextArea({ label, name, placeholder = "", rows = 3, disabled = false }: { label: string; name: string; placeholder?: string; rows?: number; disabled?: boolean }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">{label}</label>
            <textarea name={name} rows={rows} disabled={disabled} placeholder={placeholder} className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-purple-400 outline-none transition-all placeholder:text-muted-foreground/30 resize-none disabled:opacity-50 text-white" />
        </div>
    );
}

export default function PodcastingDiscoveryPage() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [step, setStep] = useState(1);
    const disabled = status === "submitting";
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        const form = e.currentTarget;
        const data = new FormData(form);
        try {
            const res = await fetch("/api/forms", { method: "POST", body: data, headers: { Accept: "application/json" } });
            if (res.ok) { form.reset(); router.push("/book?from=podcasting-discovery"); }
            else { setStatus("error"); }
        } catch { setStatus("error"); }
    };

    const nextStep = async () => {
        // Find inputs in the current step container and validate them
        const currentStepEl = document.getElementById(`step-${step}`);
        if (currentStepEl) {
            const inputs = currentStepEl.querySelectorAll('input, select, textarea');
            let allValid = true;
            inputs.forEach((input: any) => {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    allValid = false;
                }
            });
            if (!allValid) return;
        }

        // Early Capture Growth Hack: Submit Step 1 details immediately to Transpond
        if (step === 1) {
            try {
                const nameEl = document.getElementsByName('prospect_name')[0] as HTMLInputElement;
                const emailEl = document.getElementsByName('email')[0] as HTMLInputElement;
                const bizEl = document.getElementsByName('business_name')[0] as HTMLInputElement;
                const phoneEl = document.getElementsByName('phone')[0] as HTMLInputElement;

                if (emailEl?.value && nameEl?.value) {
                    const partialData = new FormData();
                    partialData.append('prospect_name', nameEl.value);
                    partialData.append('email', emailEl.value);
                    partialData.append('business_name', bizEl?.value || '');
                    partialData.append('phone', phoneEl?.value || '');
                    partialData.append('_form_source', 'incomplete-podcasting-discovery-lead');

                    // Fire-and-forget background push
                    fetch("/api/forms", { method: "POST", body: partialData }).catch(() => {});
                }
            } catch (err) {
                console.error('Abandoned form capture trigger failed:', err);
            }
        }

        setStep(s => Math.min(s + 1, 4));
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    return (
        <main className="relative min-h-screen bg-background">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-purple-500/5 blur-[120px] pointer-events-none -z-10" />
                <div className="container px-4 mx-auto text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-purple-400/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6"><Mic className="w-4 h-4" />Podcasting Discovery</div>
                        <h1 className="text-4xl font-bold tracking-tight md:text-6xl mb-4">Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Audio Authority.</span></h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">Tell us about your show, your audience, and your vision so we can engineer the right production tier and distribution strategy.</p>
                    </motion.div>
                </div>
            </section>

            {/* Form */}
            <section className="pb-24 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto">

                        {/* Progress Bar Indicators */}
                        {status !== "success" && (
                            <div className="mb-12 max-w-xl mx-auto">
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-3">
                                    <span className={step >= 1 ? "text-purple-400" : ""}>1. About You</span>
                                    <span className={step >= 2 ? "text-purple-400" : ""}>2. The Podcast</span>
                                    <span className={step >= 3 ? "text-purple-400" : ""}>3. Schedule & Reach</span>
                                    <span className={step >= 4 ? "text-purple-400" : ""}>4. Budget & Goal</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-purple-400" animate={{ width: `${(step / 4) * 100}%` }} transition={{ duration: 0.3 }} />
                                </div>
                            </div>
                        )}

                        {status === "success" ? (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-16 rounded-3xl glass-card border-white/10 flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-20 h-20 rounded-full bg-purple-400/20 flex items-center justify-center"><Send className="w-8 h-8 text-purple-400" /></div>
                                <div><h2 className="text-2xl font-bold mb-2">Show Brief Received! 🎙️</h2><p className="text-muted-foreground">We&apos;ve received your podcast details and will be in touch within 24 hours to build your production blueprint.</p></div>
                                <button onClick={() => { setStatus("idle"); setStep(1); }} className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-widest">Submit Another</button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <input type="hidden" name="_form_source" value="podcasting-discovery" />

                                {/* Step 1: Your Information */}
                                {step === 1 && (
                                    <motion.div id="step-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                        <FormSection icon={User} title="Your Information">
                                            <div className="grid gap-6 sm:grid-cols-2">
                                                <Field label="Full Name" name="prospect_name" placeholder="John Doe" required disabled={disabled} />
                                                <Field label="Business / Brand Name" name="business_name" placeholder="Acme Media" required disabled={disabled} />
                                            </div>
                                            <div className="grid gap-6 sm:grid-cols-2">
                                                <Field label="Phone" name="phone" type="tel" placeholder="(601) 555-0199" disabled={disabled} />
                                                <Field label="Email" name="email" type="email" placeholder="john@acme.com" required disabled={disabled} />
                                            </div>
                                            <Field label="Best Contact Method" name="best_contact" placeholder="Phone call, text, email, etc." disabled={disabled} />
                                        </FormSection>
                                    </motion.div>
                                )}

                                {/* Step 2: About Your Podcast & Needs */}
                                {step === 2 && (
                                    <motion.div id="step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                        <FormSection icon={Radio} title="About Your Podcast">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Do you have an existing podcast?</label>
                                                <RadioGroup name="has_podcast" options={["Yes — actively producing","Yes — on hiatus","No — launching a new show"]} disabled={disabled} />
                                            </div>
                                            <Field label="Show Name (if applicable)" name="show_name" placeholder="The Growth Engine Show" disabled={disabled} />
                                            <Field label="Show Topic / Niche" name="show_topic" placeholder="Business, faith, fitness, tech, true crime, etc." disabled={disabled} />
                                            <TextArea label="Describe your show in one paragraph" name="show_description" placeholder="A weekly interview-style show where we break down marketing strategies with local business owners in Mississippi..." disabled={disabled} />
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Show format</label>
                                                <RadioGroup name="show_format" options={["Solo (just me)","Interview / Guest-based","Co-hosted (2+ hosts)","Panel / Roundtable","Narrative / Storytelling"]} disabled={disabled} />
                                            </div>
                                            <Field label="Current episode count (if existing)" name="episode_count" placeholder="e.g. 0, 12, 50+" disabled={disabled} />
                                        </FormSection>

                                        <FormSection icon={Headphones} title="Production Needs">
                                            <div className="space-y-3">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">What do you need help with? (select all)</label>
                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    {["Studio recording sessions","Video podcast (multi-cam)","Audio-only podcast","Live streaming episodes","Full editing & post-production","Social media clip extraction","Show notes & blog posts","Thumbnail & graphic design","Music / intro / outro production","Guest booking & coordination","Distribution & syndication","SEO & GEO optimization"].map((s) => <Checkbox key={s} name="production_needs" value={s} label={s} disabled={disabled} />)}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Preferred recording location</label>
                                                <RadioGroup name="recording_location" options={["PDM Studio (Jackson, MS)","Remote / virtual","On-location (we come to you)","Hybrid (mix of above)"]} disabled={disabled} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">How often do you want to publish?</label>
                                                <RadioGroup name="publish_frequency" options={["Weekly","Bi-weekly","Monthly","Multiple times per week"]} disabled={disabled} />
                                            </div>
                                        </FormSection>
                                    </motion.div>
                                )}

                                {/* Step 3: Schedule & Growth */}
                                {step === 3 && (
                                    <motion.div id="step-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                        <FormSection icon={Calendar} title="Schedule & Availability">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">When do you want to start?</label>
                                                <RadioGroup name="start_timeline" options={["ASAP","Within 2 weeks","Within 30 days","1–3 months","Just exploring"]} disabled={disabled} />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Preferred recording days</label>
                                                <div className="grid gap-3 sm:grid-cols-3">
                                                    {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Flexible"].map((d) => <Checkbox key={d} name="preferred_days" value={d} label={d} disabled={disabled} />)}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Preferred time of day</label>
                                                <RadioGroup name="preferred_time" options={["Morning (8am–12pm)","Afternoon (12pm–5pm)","Evening (5pm–9pm)","Flexible"]} disabled={disabled} />
                                            </div>
                                        </FormSection>

                                        <FormSection icon={Sparkles} title="Distribution & Growth">
                                            <div className="space-y-3">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Where are you currently distributing? (if any)</label>
                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    {["Apple Podcasts","Spotify","YouTube","Facebook","Instagram","TikTok","Kick","Rumble","LinkedIn","Twitter / X","Not distributing yet"].map((p) => <Checkbox key={p} name="current_platforms" value={p} label={p} disabled={disabled} />)}
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Growth goals (select all that apply)</label>
                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    {["Build personal brand","Generate leads / clients","Establish thought leadership","Monetize with sponsors","Grow community / audience","Network with industry leaders","Content repurposing engine","Just have fun & share knowledge"].map((g) => <Checkbox key={g} name="growth_goals" value={g} label={g} disabled={disabled} />)}
                                                </div>
                                            </div>
                                        </FormSection>
                                    </motion.div>
                                )}

                                {/* Step 4: Investment & Anything Else */}
                                {step === 4 && (
                                    <motion.div id="step-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                        <FormSection icon={DollarSign} title="Investment">
                                            <div className="space-y-3">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Monthly podcasting budget</label>
                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    {["Under $500/mo","$500 – $1,000/mo","$1,000 – $1,500/mo","$1,500 – $2,500/mo","$2,500+/mo","Not sure yet"].map((r) => <Checkbox key={r} name="budget_range" value={r} label={r} disabled={disabled} />)}
                                                </div>
                                            </div>
                                        </FormSection>

                                        <FormSection icon={HeartHandshake} title="Anything Else">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Have you worked with a podcast production team before?</label>
                                                <RadioGroup name="has_podcast_experience" options={["Yes — regularly","Yes — once or twice","No — first time"]} disabled={disabled} />
                                            </div>
                                            <Field label="Link to existing show (if applicable)" name="existing_show_url" type="url" placeholder="https://open.spotify.com/show/..." disabled={disabled} />
                                            <TextArea label="What does success look like for your podcast?" name="success_criteria" placeholder="10K downloads/month, land sponsorships, become the go-to voice in my industry..." rows={3} disabled={disabled} />
                                            <TextArea label="Anything else you'd like us to know?" name="notes" placeholder="Guests you want to feature, shows you admire, branding preferences, special equipment needs..." rows={5} disabled={disabled} />
                                        </FormSection>
                                    </motion.div>
                                )}

                                {status === "error" && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center">Something went wrong. Please try again or email us directly at info@powerdigitalmedia.org</motion.p>}

                                {/* Form Navigation Buttons */}
                                <div className="flex gap-4">
                                    {step > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => { setStep(s => Math.max(s - 1, 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                                            className="px-8 py-5 border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/5 focus:scale-[0.98] transition-all uppercase tracking-widest text-sm shrink-0"
                                        >
                                            Back
                                        </button>
                                    )}
                                    
                                    {step < 4 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="flex-grow py-5 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-purple-400 hover:text-white focus:scale-[0.98] transition-all uppercase tracking-widest text-sm"
                                        >
                                            Continue ➔
                                        </button>
                                    ) : (
                                        <motion.button
                                            type="submit"
                                            disabled={disabled}
                                            className="flex-grow py-5 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-purple-400 hover:text-white focus:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all group uppercase tracking-widest text-sm"
                                        >
                                            {disabled ? (
                                                <><div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />Submitting...</>
                                            ) : (
                                                <>Launch Show Brief<Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                                            )}
                                        </motion.button>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
