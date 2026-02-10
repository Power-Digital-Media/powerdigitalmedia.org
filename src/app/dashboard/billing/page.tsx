"use client";

import { motion } from "@/components/providers/MotionProvider";
import { CreditCard, ExternalLink, ShieldCheck, History, Download, Zap } from "lucide-react";

export default function DashboardBillingPage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter">Financial <span className="text-accent">Ledger.</span></h1>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-2 italic">Secure managed subscription and payment architecture.</p>
            </div>

            {/* Active Subscription Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 rounded-[3.5rem] glass-card border-accent/20 bg-accent/5 flex flex-col md:flex-row items-center justify-between gap-10"
            >
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-slate-950 text-[8px] font-black uppercase tracking-widest mb-6">
                        Active Premium Tier
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Identity Protocol + Management</h2>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Billing Rate</span>
                            <span className="text-xl font-black text-white">$500.00 / mo</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Next Transaction</span>
                            <span className="text-xl font-black text-white">Feb 15, 2026</span>
                        </div>
                    </div>
                </div>

                <button className="px-10 py-6 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent transition-all flex items-center gap-3 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                    Manage at Stripe <ExternalLink className="w-4 h-4" />
                </button>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Payment History */}
                <div className="p-10 rounded-[3rem] glass-card border-white/5 bg-white/[0.01]">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <History className="w-4 h-4 text-white/40" />
                            <h2 className="text-xl font-black uppercase tracking-tighter text-white/60">Payment History</h2>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { id: "INV-001", date: "Jan 15, 2026", amount: "$1,500.00", service: "Identity Build" },
                            { id: "INV-002", date: "Jan 15, 2026", amount: "$500.00", service: "Managed Growth" },
                        ].map((inv) => (
                            <div key={inv.id} className="flex items-center justify-between p-5 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-all group">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black uppercase tracking-widest">{inv.service}</div>
                                    <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{inv.date} // {inv.id}</div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-sm font-black">{inv.amount}</span>
                                    <button className="p-2 text-white/20 hover:text-white transition-colors">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security Info */}
                <div className="p-10 rounded-[3rem] glass-card border-white/5 bg-white/[0.01] flex flex-col justify-between">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-accent" />
                            <h2 className="text-xl font-black uppercase tracking-tighter">Security <span className="text-accent">Protocol.</span></h2>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed font-bold uppercase tracking-widest italic">
                            All transaction data is encrypted via 256-bit SSL and processed exclusively through Stripe's high-authority financial network. Your credentials are never stored on our local architecture.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.03] flex items-center gap-6 mt-10">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/20">
                            <Zap className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest">Tax Resiliency Active</div>
                            <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-1">Stripe Tax 1.0 Deployment</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
