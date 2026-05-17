"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Settings, Lock, Bell, User, Shield, Loader2 } from "lucide-react";

export default function DashboardSettingsPage() {
    const { user, clientProfile, profileLoading } = useAuth();

    if (profileLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Loading Settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter">System <span className="text-accent">Settings.</span></h1>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-2 italic">Managed account credentials and security protocols.</p>
            </div>

            <div className="max-w-4xl space-y-8">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-10 rounded-[2.5rem] glass-card border-white/5 bg-white/[0.01] space-y-8"
                >
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-accent" />
                        <h2 className="text-xl font-black uppercase tracking-tighter">Profile <span className="text-accent">Identity.</span></h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Display Name</label>
                            <input
                                type="text"
                                value={clientProfile?.displayName || user?.displayName || ""}
                                readOnly
                                className="w-full px-6 py-4 rounded-xl bg-white/[0.02] border border-white/5 outline-none text-xs font-bold uppercase tracking-widest text-white/60 cursor-default"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Authorized Email</label>
                            <input
                                type="email"
                                value={clientProfile?.email || user?.email || ""}
                                disabled
                                className="w-full px-6 py-4 rounded-xl bg-white/[0.02] border border-white/5 text-white/20 text-xs font-bold uppercase tracking-widest cursor-not-allowed"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Company</label>
                            <input
                                type="text"
                                value={clientProfile?.company || "—"}
                                readOnly
                                className="w-full px-6 py-4 rounded-xl bg-white/[0.02] border border-white/5 outline-none text-xs font-bold uppercase tracking-widest text-white/60 cursor-default"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Phone</label>
                            <input
                                type="text"
                                value={clientProfile?.phone || "—"}
                                readOnly
                                className="w-full px-6 py-4 rounded-xl bg-white/[0.02] border border-white/5 outline-none text-xs font-bold uppercase tracking-widest text-white/60 cursor-default"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Security Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-10 rounded-[2.5rem] glass-card border-white/5 bg-white/[0.01] space-y-8"
                >
                    <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-blue-400" />
                        <h2 className="text-xl font-black uppercase tracking-tighter">Access <span className="text-blue-400">Security.</span></h2>
                    </div>

                    <div className="space-y-4">
                        <button className="flex items-center justify-between w-full p-6 rounded-2xl border border-white/5 hover:border-accent/40 transition-all group">
                            <div className="flex items-center gap-4">
                                <Shield className="w-4 h-4 text-white/20 group-hover:text-accent transition-colors" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Update Protocol Password</span>
                            </div>
                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Firebase Auth Managed</span>
                        </button>

                        <button className="flex items-center justify-between w-full p-6 rounded-2xl border border-white/5 hover:border-accent/40 transition-all group">
                            <div className="flex items-center gap-4">
                                <Bell className="w-4 h-4 text-white/20 group-hover:text-accent transition-colors" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Notification Channels</span>
                            </div>
                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Email Active</span>
                        </button>
                    </div>
                </motion.div>

                {/* Account Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-10 rounded-[2.5rem] glass-card border-white/5 bg-white/[0.01] space-y-6"
                >
                    <h2 className="text-xl font-black uppercase tracking-tighter">Account <span className="text-white/40">Metadata.</span></h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Stripe Customer ID</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/60 truncate">{clientProfile?.stripeCustomerId || "—"}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Member Since</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/60">
                                {clientProfile?.createdAt ? new Date(clientProfile.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—"}
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Last Profile Update</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/60">
                                {clientProfile?.updatedAt ? new Date(clientProfile.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
