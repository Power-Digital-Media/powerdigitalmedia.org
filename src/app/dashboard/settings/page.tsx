"use client";

import { motion } from "framer-motion";
import { Settings, Lock, Bell, User, Shield } from "lucide-react";

export default function DashboardSettingsPage() {
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
                                placeholder="Partner Name"
                                className="w-full px-6 py-4 rounded-xl bg-white/[0.02] border border-white/5 outline-none focus:border-accent transition-all text-xs font-bold uppercase tracking-widest"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Authorized Email</label>
                            <input
                                type="email"
                                disabled
                                className="w-full px-6 py-4 rounded-xl bg-white/[0.02] border border-white/5 text-white/20 text-xs font-bold uppercase tracking-widest cursor-not-allowed"
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
                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Last Change: 30 Days Ago</span>
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
            </div>
        </div>
    );
}
