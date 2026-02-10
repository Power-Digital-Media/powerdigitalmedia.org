"use client";

import { motion } from "framer-motion";
import { Mic, Share2, TrendingUp, Zap } from "lucide-react";

const addons = [
    {
        title: "Podbean Audio Sync",
        description: "Native audio extraction from video sessions for distribution across Apple Podcasts, iHeartRadio, and Spotify.",
        icon: Mic,
        price: "+$20.00/mo"
    },
    {
        title: "Omni-Channel Clipping",
        description: "Advanced AI-driven extraction of 10+ high-velocity clips for TikTok, IG Reels, and YouTube Shorts.",
        icon: Zap,
        price: "+$300/mo"
    },
    {
        title: "SEO Metadata Pack",
        description: "Bespoke show notes, keyword-rich descriptions, and chapter markers for maximal search dominance.",
        icon: TrendingUp,
        price: "+$100/mo"
    }
];

export default function AddOnProtocols() {
    return (
        <section className="py-24 relative bg-slate-950/30 border-t border-white/5">
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-cyan-500 font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block">Expansion Modules</span>
                    <h2 className="text-4xl font-bold tracking-tighter uppercase mb-6">Add-On <span className="text-white/40">Protocols.</span></h2>
                    <p className="text-foreground/50 max-w-xl mx-auto text-sm">Elevate your production with modular growth injections designed for your specific vertical.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
                    {addons.map((addon, index) => (
                        <motion.div
                            key={addon.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 rounded-[2rem] glass-card border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group relative overflow-hidden"
                        >
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <addon.icon className="w-5 h-5 text-cyan-400" />
                            </div>
                            <h4 className="text-xl font-bold mb-3 uppercase tracking-tight">{addon.title}</h4>
                            <p className="text-sm text-foreground/50 leading-relaxed mb-6 font-light">
                                {addon.description}
                            </p>
                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Protocol Available</span>
                                <span className="text-sm font-black text-white">{addon.price}</span>
                            </div>

                            {/* Ambient Glow */}
                            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-cyan-500/5 blur-[80px] pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
