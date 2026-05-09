"use client";

import { motion } from "framer-motion";
import {
    Send, Camera, User, Film, MapPin, Video,
    DollarSign, HeartHandshake, Calendar,
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
            <span className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center shrink-0 ${checked ? 'bg-cyan-400 border-cyan-400' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}>
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
                    <span className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${selected === val ? 'border-cyan-400' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}>
                        <span className={`w-2.5 h-2.5 rounded-full bg-cyan-400 transition-transform ${selected === val ? 'scale-100' : 'scale-0'}`} />
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
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400"><Icon className="w-5 h-5" /></div>
                <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            </div>
            {children}
        </motion.div>
    );
}

function Field({ label, name, type = "text", placeholder = "", required = false, disabled = false }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean; disabled?: boolean }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">{label} {required && <span className="text-cyan-400">*</span>}</label>
            <input type={type} name={name} required={required} disabled={disabled} placeholder={placeholder} className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50 text-white" />
        </div>
    );
}

function TextArea({ label, name, placeholder = "", rows = 3, disabled = false }: { label: string; name: string; placeholder?: string; rows?: number; disabled?: boolean }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">{label}</label>
            <textarea name={name} rows={rows} disabled={disabled} placeholder={placeholder} className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none transition-all placeholder:text-muted-foreground/30 resize-none disabled:opacity-50 text-white" />
        </div>
    );
}

export default function ProductionDiscoveryPage() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const disabled = status === "submitting";
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        const form = e.currentTarget;
        const data = new FormData(form);
        try {
            const res = await fetch("https://formspree.io/f/mdazlovb", { method: "POST", body: data, headers: { Accept: "application/json" } });
            if (res.ok) { form.reset(); router.push("/book?from=production-discovery"); }
            else { setStatus("error"); }
        } catch { setStatus("error"); }
    };

    return (
        <main className="relative min-h-screen bg-background">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />
                <div className="container px-4 mx-auto text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-cyan-400/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6"><Camera className="w-4 h-4" />Production Discovery</div>
                        <h1 className="text-4xl font-bold tracking-tight md:text-6xl mb-4">Architect Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Visual Story.</span></h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">Tell us about your event, brand, or project so we can deploy the right cinematic crew and come prepared to capture something extraordinary.</p>
                    </motion.div>
                </div>
            </section>

            {/* Form */}
            <section className="pb-24 relative z-10">
                <div className="container px-4 mx-auto"><div className="max-w-3xl mx-auto">

                    {status === "success" ? (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-16 rounded-3xl glass-card border-white/10 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 rounded-full bg-cyan-400/20 flex items-center justify-center"><Send className="w-8 h-8 text-cyan-400" /></div>
                            <div><h2 className="text-2xl font-bold mb-2">Production Brief Received! 🎬</h2><p className="text-muted-foreground">We&apos;ve received your project details and will be in touch within 24 hours to scope your production.</p></div>
                            <button onClick={() => setStatus("idle")} className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-widest">Submit Another</button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <input type="hidden" name="_form_source" value="production-discovery" />

                            <FormSection icon={User} title="Your Information">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <Field label="Full Name" name="prospect_name" placeholder="John Doe" required disabled={disabled} />
                                    <Field label="Business / Organization" name="business_name" placeholder="Acme Corp" required disabled={disabled} />
                                </div>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <Field label="Phone" name="phone" type="tel" placeholder="(601) 555-0199" disabled={disabled} />
                                    <Field label="Email" name="email" type="email" placeholder="john@acme.com" required disabled={disabled} />
                                </div>
                                <Field label="Best Contact Method" name="best_contact" placeholder="Phone call, text, email, etc." disabled={disabled} />
                            </FormSection>

                            <FormSection icon={Film} title="What Are We Capturing?" delay={0.05}>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Type of project (select all that apply)</label>
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {["Conference / Summit","Church Service / Sermon","Concert / Live Performance","Corporate Event","Product Launch","Brand Video / Commercial","Real Estate Walkthrough","Wedding / Celebration","Sports Event","Documentary / Interview","Music Video","Testimonial / Case Study","Social Media Content","Training / Educational","Grand Opening","Fundraiser / Gala","Community Event","Other"].map((t) => <Checkbox key={t} name="project_type" value={t} label={t} disabled={disabled} />)}
                                    </div>
                                    <Field label="Other project type (if not listed)" name="project_type_other" placeholder="e.g. Drone cinematography, podcast session..." disabled={disabled} />
                                </div>
                            </FormSection>

                            <FormSection icon={Calendar} title="Event & Shoot Details" delay={0.1}>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <Field label="Event / Shoot Date" name="event_date" type="date" disabled={disabled} />
                                    <Field label="Backup Date" name="backup_date" type="date" disabled={disabled} />
                                </div>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <Field label="Start Time" name="start_time" type="time" disabled={disabled} />
                                    <Field label="Estimated Duration" name="duration" placeholder="e.g. 3 hours, full day" disabled={disabled} />
                                </div>
                                <Field label="Venue / Location Name" name="venue_name" placeholder="The Westin Jackson, First Baptist Church..." disabled={disabled} />
                                <Field label="Full Address" name="venue_address" placeholder="123 Main St, Jackson, MS 39201" disabled={disabled} />
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Indoor or Outdoor?</label>
                                    <RadioGroup name="venue_type" options={["Indoor","Outdoor","Both / Mixed"]} disabled={disabled} />
                                </div>
                                <Field label="Expected audience / attendee count" name="attendee_count" placeholder="e.g. 50, 200, 1000+" disabled={disabled} />
                            </FormSection>

                            <FormSection icon={Video} title="Technical Requirements" delay={0.15}>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">What do you need?</label>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {["Multi-Cam Coverage (2+)","Single Camera Shoot","Drone / Aerial Footage","Live Streaming","Full Editing & Post-Production","Raw Footage Only","Color Grading & Sound Design","Motion Graphics / Titles","Social Media Clips","Highlight Reel / Sizzle","Photography + Video Combo","Teleprompter Setup"].map((r) => <Checkbox key={r} name="tech_requirements" value={r} label={r} disabled={disabled} />)}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Live streaming?</label>
                                    <RadioGroup name="needs_live_stream" options={["Yes — multi-platform","Yes — single platform","No — just recorded"]} disabled={disabled} />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Streaming platforms (if applicable)</label>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {["YouTube Live","Facebook Live","Kick","Rumble","Instagram Live","Custom RTMP / Church Platform"].map((p) => <Checkbox key={p} name="stream_platforms" value={p} label={p} disabled={disabled} />)}
                                    </div>
                                </div>
                                <TextArea label="Specific shots, angles, or creative direction?" name="creative_direction" placeholder="Cinematic opening, crowd reactions, B-roll of venue setup..." disabled={disabled} />
                            </FormSection>

                            <FormSection icon={MapPin} title="Location & Logistics" delay={0.2}>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Is the venue in Jackson, MS metro?</label>
                                    <RadioGroup name="is_local" options={["Yes — Jackson metro","Within 1 hour","Travel required (2+ hrs)","Out of state"]} disabled={disabled} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Power & Internet at venue?</label>
                                    <RadioGroup name="venue_infrastructure" options={["Full power + WiFi","Power only — no WiFi","Outdoor / limited","Not sure"]} disabled={disabled} />
                                </div>
                                <TextArea label="Access restrictions or special logistics?" name="logistics_notes" placeholder="Load-in times, parking, security clearance..." rows={2} disabled={disabled} />
                            </FormSection>

                            <FormSection icon={DollarSign} title="Timeline & Investment" delay={0.25}>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">When do you need final deliverables?</label>
                                    <RadioGroup name="delivery_timeline" options={["Within 48 hours (rush)","1–2 weeks","3–4 weeks","Flexible"]} disabled={disabled} />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Production budget range</label>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {["Under $500","$500 – $1,000","$1,000 – $2,500","$2,500 – $5,000","$5,000 – $10,000","$10,000+","Not sure yet"].map((r) => <Checkbox key={r} name="budget_range" value={r} label={r} disabled={disabled} />)}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Is this recurring?</label>
                                    <RadioGroup name="is_recurring" options={["One-time event","Monthly","Weekly","Quarterly / seasonal"]} disabled={disabled} />
                                </div>
                            </FormSection>

                            <FormSection icon={HeartHandshake} title="Anything Else" delay={0.3}>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Worked with a production company before?</label>
                                    <RadioGroup name="has_production_experience" options={["Yes — regularly","Yes — once or twice","No — first time"]} disabled={disabled} />
                                </div>
                                <TextArea label="What does success look like for this project?" name="success_criteria" placeholder="3-min highlight reel for website, social clips for 30 days, raw footage for archives..." rows={3} disabled={disabled} />
                                <TextArea label="Anything else you'd like us to know?" name="notes" placeholder="Brand guidelines, reference videos, VIP considerations, special requirements..." rows={5} disabled={disabled} />
                            </FormSection>

                            {status === "error" && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center">Something went wrong. Please try again or email us directly at info@powerdigitalmedia.org</motion.p>}

                            <motion.button type="submit" disabled={disabled} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full py-5 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-cyan-400 hover:text-white focus:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all group text-lg uppercase tracking-widest">
                                {disabled ? (<><div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />Submitting...</>) : (<>Submit Production Brief<Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>)}
                            </motion.button>
                        </form>
                    )}
                </div></div>
            </section>
            <Footer />
        </main>
    );
}
