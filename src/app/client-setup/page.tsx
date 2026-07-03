"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    Mail,
    Phone,
    Globe,
    Clock,
    User,
    CheckSquare,
    Check,
    ArrowRight,
    ArrowLeft,
    Shield,
    Users,
    Volume2,
    Zap,
    AlertCircle,
    Info,
    Network,
    Plus,
    Trash2,
    Cpu
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ─── Types & Constants ─────────────────────────────────────────── */

interface UltatelUser {
    name: string;
    email: string;
    extension: string;
    e911: string;
}

export default function ClientSetupPage() {
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Form States
    const [companyName, setCompanyName] = useState("");
    const [website, setWebsite] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [businessHours, setBusinessHours] = useState("");

    const [contactFirst, setContactFirst] = useState("");
    const [contactLast, setContactLast] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");

    const [services, setServices] = useState({
        capsule: true,
        transpond: true,
        ultatel: true,
    });

    const [capsuleSubdomain, setCapsuleSubdomain] = useState("");
    const [transpondEmail, setTranspondEmail] = useState("");
    const [transpondPassword, setTranspondPassword] = useState("");

    const [ultatelUsers, setUltatelUsers] = useState<UltatelUser[]>([
        { name: "", email: "", extension: "101", e911: "" }
    ]);
    const [ultatelHardwareCount, setUltatelHardwareCount] = useState(1);
    const [ultatelPortingDetails, setUltatelPortingDetails] = useState("");
    const [ultatelNetworkChecked, setUltatelNetworkChecked] = useState(false);

    /* ─── Validation Helpers ───────────────────────────────────────── */

    const validateStep = () => {
        const stepErrors: Record<string, string> = {};

        if (step === 1) {
            if (!companyName.trim()) stepErrors.companyName = "Company Name is required.";
            if (!website.trim()) stepErrors.website = "Website is required.";
            if (!phone.trim()) stepErrors.phone = "Business phone is required.";
            if (!address.trim()) stepErrors.address = "Address is required.";
            if (!businessHours.trim()) stepErrors.businessHours = "Business hours are required.";
        }

        if (step === 2) {
            if (!contactFirst.trim()) stepErrors.contactFirst = "First Name is required.";
            if (!contactLast.trim()) stepErrors.contactLast = "Last Name is required.";
            if (!contactEmail.trim()) stepErrors.contactEmail = "Email is required.";
            else if (!/\S+@\S+\.\S+/.test(contactEmail)) stepErrors.contactEmail = "Invalid email address.";
            if (!contactPhone.trim()) stepErrors.contactPhone = "Contact phone is required.";
        }

        if (step === 3) {
            if (!services.capsule && !services.transpond && !services.ultatel) {
                stepErrors.services = "Please select at least one service to configure.";
            }
        }

        if (step === 4) {
            if (services.capsule && !capsuleSubdomain.trim()) {
                stepErrors.capsuleSubdomain = "Capsule subdomain name is required.";
            }
            if (services.transpond) {
                if (!transpondEmail.trim()) {
                    stepErrors.transpondEmail = "Transpond admin email is required.";
                }
                if (!transpondPassword) {
                    stepErrors.transpondPassword = "Password is required.";
                } else if (transpondPassword.length < 8) {
                    stepErrors.transpondPassword = "Password must be at least 8 characters.";
                } else if (!/[^A-Za-z0-9]/.test(transpondPassword)) {
                    stepErrors.transpondPassword = "Password must include at least one special character.";
                }
            }
            if (services.ultatel) {
                if (!ultatelNetworkChecked) {
                    stepErrors.network = "You must confirm that your network matches the requirements.";
                }
                // Verify extensions are filled
                ultatelUsers.forEach((user, idx) => {
                    if (!user.name.trim() || !user.email.trim() || !user.e911.trim()) {
                        stepErrors[`user_${idx}`] = "All user fields (Name, Email, E911 Address) are required.";
                    }
                });
            }
        }

        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            setStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /* ─── Dynamic Extension Adding ─────────────────────────────────── */

    const addExtensionUser = () => {
        const nextExt = (101 + ultatelUsers.length).toString();
        setUltatelUsers([...ultatelUsers, { name: "", email: "", extension: nextExt, e911: "" }]);
    };

    const removeExtensionUser = (index: number) => {
        if (ultatelUsers.length <= 1) return;
        const newUsers = ultatelUsers.filter((_, idx) => idx !== index);
        // Re-number extensions starting at 101
        const updated = newUsers.map((user, idx) => ({
            ...user,
            extension: (101 + idx).toString()
        }));
        setUltatelUsers(updated);
    };

    const updateExtensionUser = (index: number, field: keyof UltatelUser, value: string) => {
        const updated = [...ultatelUsers];
        updated[index] = { ...updated[index], [field]: value };
        setUltatelUsers(updated);
    };

    /* ─── Submit Action ────────────────────────────────────────────── */

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep()) return;

        setSubmitting(true);
        try {
            const payload = {
                companyName,
                website,
                phone,
                address,
                businessHours,
                contactFirst,
                contactLast,
                contactEmail,
                contactPhone,
                services,
                capsuleSubdomain: services.capsule ? capsuleSubdomain : undefined,
                transpondEmail: services.transpond ? transpondEmail : undefined,
                transpondPassword: services.transpond ? transpondPassword : undefined,
                ultatelUsers: services.ultatel ? ultatelUsers : undefined,
                ultatelHardwareCount: services.ultatel ? ultatelHardwareCount : undefined,
                ultatelPortingDetails: services.ultatel ? ultatelPortingDetails : undefined,
                ultatelNetworkChecked: services.ultatel ? ultatelNetworkChecked : undefined,
            };

            const response = await fetch("/api/client-setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                const data = await response.json();
                setErrors({ submit: data.error || "Failed to submit setup details." });
            }
        } catch (err: any) {
            setErrors({ submit: err.message || "A network error occurred." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />

            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/5 blur-[150px] pointer-events-none -z-10" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] pointer-events-none -z-10" />

            <section className="pt-32 pb-24 md:pt-40 md:pb-32">
                <div className="container px-4 mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">
                            CLIENT INTEGRATION PORTAL
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
                            Client <span className="text-accent">Setup</span> Profile
                        </h1>
                        <p className="text-slate-400 font-light max-w-xl mx-auto text-sm md:text-base">
                            Provide your company information to configure your business solutions. We will setup your Capsule CRM, email subscriber lists, and Ultatel voice servers.
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative mb-12 flex items-center justify-between">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/5 z-0" />
                        <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-accent via-indigo-500 to-blue-500 transition-all duration-500 z-0"
                            style={{ width: `${((step - 1) / 4) * 100}%` }}
                        />
                        {[1, 2, 3, 4, 5].map((num) => (
                            <div
                                key={num}
                                className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-black relative z-10 transition-all duration-500 ${
                                    step >= num
                                        ? "bg-accent border-accent text-black font-black"
                                        : "bg-[#0b0b0c] border-white/10 text-white/40"
                                }`}
                            >
                                {num}
                            </div>
                        ))}
                    </div>

                    {/* Form Card */}
                    <div className="glass-card rounded-[2rem] border border-white/5 bg-white/[0.01] p-8 md:p-12 relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple-500/5 opacity-40 pointer-events-none" />

                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12 space-y-6"
                                >
                                    <div className="w-20 h-20 bg-accent/10 border border-accent/30 text-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(34,211,238,0.15)]">
                                        <Check className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-3xl font-black uppercase tracking-tight text-white">Setup Profile Submitted!</h2>
                                    <p className="text-slate-400 font-light max-w-lg mx-auto text-sm leading-relaxed">
                                        Thank you. We have received your business details and service configurations. Your account setup sequence has been initialized.
                                    </p>
                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 max-w-md mx-auto text-left space-y-3">
                                        <div className="flex items-center gap-2 text-xs text-white/60 font-semibold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                                            Active Setup Action Log:
                                        </div>
                                        <ul className="text-xs text-slate-500 space-y-1.5 list-disc pl-4 font-light">
                                            <li>Client Record in DB: <span className="text-emerald-400 font-bold">CREATED</span></li>
                                            <li>Stripe Customer Profile: <span className="text-emerald-400 font-bold">QUEUED</span></li>
                                            <li>Admin Setup Review Alert: <span className="text-emerald-400 font-bold">DISPATCHED</span></li>
                                        </ul>
                                    </div>
                                    <p className="text-xs text-slate-500 italic pt-4">
                                        An administrator will coordinate credentials shortly via email.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                    {errors.submit && (
                                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.submit}
                                        </div>
                                    )}

                                    {/* STEP 1: Company Profile */}
                                    {step === 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                                                <Building2 className="w-5 h-5 text-accent" />
                                                Step 1: Company Profile
                                            </h3>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Legal Company Name</label>
                                                    <input
                                                        type="text"
                                                        value={companyName}
                                                        onChange={(e) => setCompanyName(e.target.value)}
                                                        className="w-full px-5 py-4 rounded-xl bg-[#0b0b0c] border border-white/5 focus:border-accent text-white outline-none transition"
                                                        placeholder="Acme Corporation"
                                                    />
                                                    {errors.companyName && <p className="text-red-400 text-[10px]">{errors.companyName}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company Website</label>
                                                    <input
                                                        type="url"
                                                        value={website}
                                                        onChange={(e) => setWebsite(e.target.value)}
                                                        className="w-full px-5 py-4 rounded-xl bg-[#0b0b0c] border border-white/5 focus:border-accent text-white outline-none transition"
                                                        placeholder="https://acme.com"
                                                    />
                                                    {errors.website && <p className="text-red-400 text-[10px]">{errors.website}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Main Office Phone</label>
                                                    <input
                                                        type="text"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        className="w-full px-5 py-4 rounded-xl bg-[#0b0b0c] border border-white/5 focus:border-accent text-white outline-none transition"
                                                        placeholder="(601) 555-0100"
                                                    />
                                                    {errors.phone && <p className="text-red-400 text-[10px]">{errors.phone}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Official Operating Hours</label>
                                                    <input
                                                        type="text"
                                                        value={businessHours}
                                                        onChange={(e) => setBusinessHours(e.target.value)}
                                                        className="w-full px-5 py-4 rounded-xl bg-[#0b0b0c] border border-white/5 focus:border-accent text-white outline-none transition"
                                                        placeholder="Tue-Thu: 11AM-8PM, Fri-Sat: 11AM-9PM"
                                                    />
                                                    {errors.businessHours && <p className="text-red-400 text-[10px]">{errors.businessHours}</p>}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">HQ Physical Address</label>
                                                <input
                                                    type="text"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    className="w-full px-5 py-4 rounded-xl bg-[#0b0b0c] border border-white/5 focus:border-accent text-white outline-none transition"
                                                    placeholder="123 Commerce St, Suite A, Jackson, MS 39201"
                                                />
                                                {errors.address && <p className="text-red-400 text-[10px]">{errors.address}</p>}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 2: Primary Contact */}
                                    {step === 2 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                                                <User className="w-5 h-5 text-accent" />
                                                Step 2: Primary Contact Info
                                            </h3>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">First Name</label>
                                                    <input
                                                        type="text"
                                                        value={contactFirst}
                                                        onChange={(e) => setContactFirst(e.target.value)}
                                                        className="w-full px-5 py-4 rounded-xl bg-[#0b0b0c] border border-white/5 focus:border-accent text-white outline-none transition"
                                                        placeholder="John"
                                                    />
                                                    {errors.contactFirst && <p className="text-red-400 text-[10px]">{errors.contactFirst}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Last Name</label>
                                                    <input
                                                        type="text"
                                                        value={contactLast}
                                                        onChange={(e) => setContactLast(e.target.value)}
                                                        className="w-full px-5 py-4 rounded-xl bg-[#0b0b0c] border border-white/5 focus:border-accent text-white outline-none transition"
                                                        placeholder="Doe"
                                                    />
                                                    {errors.contactLast && <p className="text-red-400 text-[10px]">{errors.contactLast}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                                                    <input
                                                        type="email"
                                                        value={contactEmail}
                                                        onChange={(e) => setContactEmail(e.target.value)}
                                                        className="w-full px-5 py-4 rounded-xl bg-[#0b0b0c] border border-white/5 focus:border-accent text-white outline-none transition"
                                                        placeholder="john.doe@acme.com"
                                                    />
                                                    {errors.contactEmail && <p className="text-red-400 text-[10px]">{errors.contactEmail}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Direct Contact Phone</label>
                                                    <input
                                                        type="text"
                                                        value={contactPhone}
                                                        onChange={(e) => setContactPhone(e.target.value)}
                                                        className="w-full px-5 py-4 rounded-xl bg-[#0b0b0c] border border-white/5 focus:border-accent text-white outline-none transition"
                                                        placeholder="(601) 555-0122"
                                                    />
                                                    {errors.contactPhone && <p className="text-red-400 text-[10px]">{errors.contactPhone}</p>}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 3: Services Selection */}
                                    {step === 3 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                                                <CheckSquare className="w-5 h-5 text-accent" />
                                                Step 3: Service Selection
                                            </h3>
                                            <p className="text-xs text-slate-400 italic">
                                                Select which services you would like to enable for your business.
                                            </p>
                                            {errors.services && <p className="text-red-400 text-xs">{errors.services}</p>}

                                            <div className="grid gap-6 md:grid-cols-3">
                                                {/* Capsule */}
                                                <div
                                                    onClick={() => setServices({ ...services, capsule: !services.capsule })}
                                                    className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                                                        services.capsule
                                                            ? "bg-indigo-500/5 border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.1)]"
                                                            : "bg-white/[0.01] border-white/5 hover:border-white/10"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                                            <Users className="w-5 h-5" />
                                                        </div>
                                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                                            services.capsule ? "bg-indigo-500 border-indigo-500" : "border-white/20"
                                                        }`}>
                                                            {services.capsule && <Check className="w-3.5 h-3.5 text-white" />}
                                                        </div>
                                                    </div>
                                                    <h4 className="text-sm font-bold uppercase tracking-tight text-white mb-2">Capsule CRM</h4>
                                                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                                                        Setup your CRM contacts, lead record pipelines, and call pop dashboards.
                                                    </p>
                                                </div>

                                                {/* Transpond */}
                                                <div
                                                    onClick={() => setServices({ ...services, transpond: !services.transpond })}
                                                    className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                                                        services.transpond
                                                            ? "bg-purple-500/5 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.1)]"
                                                            : "bg-white/[0.01] border-white/5 hover:border-white/10"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                                                            <Mail className="w-5 h-5" />
                                                        </div>
                                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                                            services.transpond ? "bg-purple-500 border-purple-500" : "border-white/20"
                                                        }`}>
                                                            {services.transpond && <Check className="w-3.5 h-3.5 text-white" />}
                                                        </div>
                                                    </div>
                                                    <h4 className="text-sm font-bold uppercase tracking-tight text-white mb-2">Transpond</h4>
                                                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                                                        Create a linked marketing email list, campaigns, and auto-sync bridges.
                                                    </p>
                                                </div>

                                                {/* Ultatel */}
                                                <div
                                                    onClick={() => setServices({ ...services, ultatel: !services.ultatel })}
                                                    className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                                                        services.ultatel
                                                            ? "bg-cyan-500/5 border-cyan-500/40 shadow-[0_0_30px_rgba(34,211,238,0.1)]"
                                                            : "bg-white/[0.01] border-white/5 hover:border-white/10"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                                            <Volume2 className="w-5 h-5" />
                                                        </div>
                                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                                            services.ultatel ? "bg-cyan-500 border-cyan-500" : "border-white/20"
                                                        }`}>
                                                            {services.ultatel && <Check className="w-3.5 h-3.5 text-white" />}
                                                        </div>
                                                    </div>
                                                    <h4 className="text-sm font-bold uppercase tracking-tight text-white mb-2">Ultatel Cloud PBX</h4>
                                                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                                                        Configure business cloud phone lines, user seats, auto-attendants, and AI transcripts.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 4: Configuration Details */}
                                    {step === 4 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-8"
                                        >
                                            <h3 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                                                <Cpu className="w-5 h-5 text-accent" />
                                                Step 4: Service Configurations
                                            </h3>

                                            {/* Capsule Details */}
                                            {services.capsule && (
                                                <div className="p-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.01] space-y-4">
                                                    <div className="flex items-center gap-2 text-indigo-400">
                                                        <Users className="w-4 h-4" />
                                                        <span className="text-xs font-black uppercase tracking-widest">Capsule CRM Settings</span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Desired CRM Subdomain</label>
                                                        <div className="flex items-center">
                                                            <input
                                                                type="text"
                                                                value={capsuleSubdomain}
                                                                onChange={(e) => setCapsuleSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                                                                className="flex-1 px-5 py-4 rounded-l-xl bg-[#0b0b0c] border border-white/5 focus:border-accent text-white outline-none transition"
                                                                placeholder="acmeproductions"
                                                            />
                                                            <span className="px-5 py-4 bg-[#141416] border border-l-0 border-white/5 rounded-r-xl text-slate-500 text-xs font-mono">
                                                                .capsulecrm.com
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-500 font-light">Letters, numbers, and dashes only.</p>
                                                        {errors.capsuleSubdomain && <p className="text-red-400 text-[10px]">{errors.capsuleSubdomain}</p>}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Transpond Details */}
                                            {services.transpond && (
                                                <div className="p-6 rounded-2xl border border-purple-500/20 bg-purple-500/[0.01] space-y-4">
                                                    <div className="flex items-center gap-2 text-purple-400">
                                                        <Mail className="w-4 h-4" />
                                                        <span className="text-xs font-black uppercase tracking-widest">Transpond Marketing Setup</span>
                                                    </div>
                                                    <div className="grid gap-6 md:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Desired Admin Email</label>
                                                            <input
                                                                type="email"
                                                                value={transpondEmail}
                                                                onChange={(e) => setTranspondEmail(e.target.value)}
                                                                className="w-full px-5 py-4 rounded-xl bg-[#0b0b0c] border border-white/5 focus:border-accent text-white outline-none transition"
                                                                placeholder="marketing@acme.com"
                                                            />
                                                            {errors.transpondEmail && <p className="text-red-400 text-[10px]">{errors.transpondEmail}</p>}
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Admin Account Password</label>
                                                            <input
                                                                type="password"
                                                                value={transpondPassword}
                                                                onChange={(e) => setTranspondPassword(e.target.value)}
                                                                className="w-full px-5 py-4 rounded-xl bg-[#0b0b0c] border border-white/5 focus:border-accent text-white outline-none transition"
                                                                placeholder="SecurePass123!"
                                                            />
                                                            {errors.transpondPassword && <p className="text-red-400 text-[10px]">{errors.transpondPassword}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="rounded-lg bg-white/[0.02] p-4 text-[10px] text-slate-500 space-y-1 border border-white/5 font-light">
                                                        <span className="font-bold text-slate-400 block mb-1">Password Requirements:</span>
                                                        <div className="flex items-center gap-1.5">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${transpondPassword.length >= 8 ? "bg-emerald-400" : "bg-red-400"}`} />
                                                            Minimum 8 characters
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${/[^A-Za-z0-9]/.test(transpondPassword) ? "bg-emerald-400" : "bg-red-400"}`} />
                                                            Contains at least one special character (e.g. !, @, #, $, etc.)
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Ultatel Details */}
                                            {services.ultatel && (
                                                <div className="p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.01] space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2 text-cyan-400">
                                                            <Volume2 className="w-4 h-4" />
                                                            <span className="text-xs font-black uppercase tracking-widest">Ultatel Telephony Config</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Desk Phones Needed</label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={ultatelHardwareCount}
                                                                onChange={(e) => setUltatelHardwareCount(parseInt(e.target.value) || 0)}
                                                                className="w-16 px-3 py-2 rounded-lg bg-[#0b0b0c] border border-white/5 focus:border-accent text-center text-white outline-none"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Extension Matrix */}
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">User Seat & Extension Allocation</label>
                                                            <button
                                                                type="button"
                                                                onClick={addExtensionUser}
                                                                className="px-3 py-1.5 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 text-cyan-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-cyan-500/5 transition-colors"
                                                            >
                                                                <Plus className="w-3.5 h-3.5" /> Add Seat
                                                            </button>
                                                        </div>

                                                        {ultatelUsers.map((user, idx) => (
                                                            <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 grid gap-4 md:grid-cols-12 items-end relative group">
                                                                <div className="md:col-span-3 space-y-1">
                                                                    <label className="text-[9px] uppercase tracking-wider text-slate-500">Extension</label>
                                                                    <input
                                                                        type="text"
                                                                        readOnly
                                                                        value={user.extension}
                                                                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-400 text-center text-xs outline-none"
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-3 space-y-1">
                                                                    <label className="text-[9px] uppercase tracking-wider text-slate-500">User Full Name</label>
                                                                    <input
                                                                        type="text"
                                                                        value={user.name}
                                                                        onChange={(e) => updateExtensionUser(idx, "name", e.target.value)}
                                                                        placeholder="Damein Donald"
                                                                        className="w-full px-3 py-2 rounded-lg bg-[#0b0b0c] border border-white/5 focus:border-accent text-white text-xs outline-none transition"
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-3 space-y-1">
                                                                    <label className="text-[9px] uppercase tracking-wider text-slate-500">Corporate Email</label>
                                                                    <input
                                                                        type="email"
                                                                        value={user.email}
                                                                        onChange={(e) => updateExtensionUser(idx, "email", e.target.value)}
                                                                        placeholder="damein@company.com"
                                                                        className="w-full px-3 py-2 rounded-lg bg-[#0b0b0c] border border-white/5 focus:border-accent text-white text-xs outline-none transition"
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-3 space-y-1 relative">
                                                                    <label className="text-[9px] uppercase tracking-wider text-slate-500">E911 Physical Address</label>
                                                                    <input
                                                                        type="text"
                                                                        value={user.e911}
                                                                        onChange={(e) => updateExtensionUser(idx, "e911", e.target.value)}
                                                                        placeholder="HQ Address"
                                                                        className="w-full px-3 py-2 rounded-lg bg-[#0b0b0c] border border-white/5 focus:border-accent text-white text-xs outline-none transition pr-8"
                                                                    />
                                                                    {ultatelUsers.length > 1 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeExtensionUser(idx)}
                                                                            className="absolute right-2 bottom-2 text-slate-600 hover:text-red-400 transition-colors"
                                                                        >
                                                                            <Trash2 className="w-3.5 h-3.5" />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                                {errors[`user_${idx}`] && (
                                                                    <p className="text-red-400 text-[9px] md:col-span-12 mt-1">{errors[`user_${idx}`]}</p>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Porting Details */}
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Numbers & Porting Info</label>
                                                        <textarea
                                                            value={ultatelPortingDetails}
                                                            onChange={(e) => setUltatelPortingDetails(e.target.value)}
                                                            className="w-full px-5 py-4 rounded-xl bg-[#0b0b0c] border border-white/5 focus:border-accent text-white text-xs outline-none transition h-20 resize-none"
                                                            placeholder="List any existing numbers you wish to port from your previous carrier, or specify if you need new DIDs."
                                                        />
                                                    </div>

                                                    {/* Router Network Pre-requisites */}
                                                    <div className="p-4 rounded-xl bg-[#141416] border border-white/5 space-y-3">
                                                        <div className="flex items-start gap-2.5">
                                                            <Network className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                                            <div>
                                                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 block mb-1">Office Router Pre-requisites</span>
                                                                <p className="text-[10px] text-slate-500 font-light leading-relaxed">
                                                                    To support VoIP signaling, your local network must disable **SIP ALG**, whitelist the Ultatel IP `38.91.53.85`, and set the UDP inactivity timeout threshold to a minimum of **300 seconds**.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            onClick={() => setUltatelNetworkChecked(!ultatelNetworkChecked)}
                                                            className="flex items-center gap-3 cursor-pointer pt-2 border-t border-white/5"
                                                        >
                                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition ${
                                                                ultatelNetworkChecked ? "bg-cyan-500 border-cyan-500 text-black" : "border-white/20"
                                                            }`}>
                                                                {ultatelNetworkChecked && <Check className="w-3.5 h-3.5 font-bold" />}
                                                            </div>
                                                            <span className="text-[10px] uppercase font-bold text-slate-300 select-none">
                                                                I approve that our network meets these standards
                                                            </span>
                                                        </div>
                                                        {errors.network && <p className="text-red-400 text-[10px]">{errors.network}</p>}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* STEP 5: Review & Consent */}
                                    {step === 5 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                                                <Shield className="w-5 h-5 text-accent" />
                                                Step 5: Review & Confirm
                                            </h3>

                                            <div className="space-y-4 rounded-2xl bg-white/[0.02] border border-white/5 p-6 text-xs text-slate-400 font-light leading-relaxed">
                                                <p className="font-bold text-slate-300 text-sm uppercase tracking-wider mb-2">Summary of Integration Request</p>
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div>
                                                        <p><span className="font-semibold text-white">Company:</span> {companyName}</p>
                                                        <p><span className="font-semibold text-white">Website:</span> {website}</p>
                                                        <p><span className="font-semibold text-white">Hours:</span> {businessHours}</p>
                                                    </div>
                                                    <div>
                                                        <p><span className="font-semibold text-white">Primary Contact:</span> {contactFirst} {contactLast}</p>
                                                        <p><span className="font-semibold text-white">Email:</span> {contactEmail}</p>
                                                        <p><span className="font-semibold text-white">Phone:</span> {contactPhone}</p>
                                                    </div>
                                                </div>

                                                <div className="border-t border-white/5 pt-4 mt-4">
                                                    <p className="font-semibold text-white mb-2">Selected Services:</p>
                                                    <div className="flex flex-wrap gap-3">
                                                        {services.capsule && (
                                                            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
                                                                Capsule CRM
                                                            </span>
                                                        )}
                                                        {services.transpond && (
                                                            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
                                                                Transpond Campaign
                                                            </span>
                                                        )}
                                                        {services.ultatel && (
                                                            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
                                                                Ultatel Phone Node
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 text-slate-500 text-[10px] leading-relaxed flex gap-3 font-light">
                                                <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                                <p>
                                                    Power Digital Media invoices for custom configuration, setup services, and local integration labor. Monthly user seat licenses, outbound calling charges, and phone hardware are billed directly by the respective platforms (Capsule, Transpond, or Ultatel) per their standard service terms.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Navigation Buttons */}
                                    <div className="flex justify-between pt-6 border-t border-white/5">
                                        {step > 1 ? (
                                            <button
                                                type="button"
                                                onClick={handleBack}
                                                className="px-6 py-3 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                                            >
                                                <ArrowLeft className="w-4 h-4" /> Back
                                            </button>
                                        ) : (
                                            <div />
                                        )}

                                        {step < 5 ? (
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                className="px-8 py-3 rounded-full bg-white text-black hover:bg-accent transition text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                                            >
                                                Continue <ArrowRight className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="px-10 py-4 rounded-full bg-accent text-black font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_40px_rgba(34,211,238,0.25)]"
                                            >
                                                {submitting ? "Initializing Configurations..." : "Confirm & Setup Services"}
                                                <Zap className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
