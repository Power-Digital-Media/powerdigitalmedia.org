"use client";

import { motion } from "framer-motion";
import { Search, Camera, Cpu, Zap, Globe } from "lucide-react";

const protocols = [
    {
        id: "SOP 01",
        title: "Strategic Blueprint",
        subtitle: "CONSULTATION & HOOK ENGINEERING",
        description: "We don't just hit record. We map your audience, engineer your primary hooks, and build a strategic content map designed for recurring dominance.",
        icon: Search,
        color: "cyan"
    },
    {
        id: "SOP 02",
        title: "Elite Capture",
        subtitle: "NESTED SCENE ARCHITECTURE",
        description: "Dynamic production using OBSBOT 4K cameras and nested scene logic. Real-time integration of on-screen media, videos, and professional graphics.",
        icon: Camera,
        color: "blue"
    },
    {
        id: "SOP 03",
        title: "The Mix Room",
        subtitle: "REMOTE CALL-IN & MEDIA SYNC",
        description: "Live guest integration via remote call-ins. Seamless switching between hosts, guests, and cinematic media assets for a broadcast-grade flow.",
        icon: Cpu,
        color: "indigo"
    },
    {
        id: "SOP 04",
        title: "Growth Injection",
        subtitle: "VIRAL CLIPPING & SCRIPTING",
        description: "We extract the high-velocity signals from your long-form content. Transform complex conversations into short-form viral engines.",
        icon: Zap,
        color: "cyan"
    },
    {
        id: "SOP 05",
        title: "Global Deployment",
        subtitle: "OMNI-CHANNEL SYNC & PODBEAN",
        description: "Automatic audio extraction and distribution to Podbean. Your show synchronized across iHeartRadio, Apple Podcasts, and Spotify with SEO-optimized metadata.",
        icon: Globe,
        color: "blue"
    }
];

export default function ProductionPipeline() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Standard Operating Protocol</span>
                    <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.85]">
                        The Power <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-glow-cyan">
                            Protocol.
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-foreground/60 font-medium tracking-tight max-w-2xl mx-auto">
                        A systematic architecture designed to move your message from raw concept to global digital dominance.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 hidden md:block" />

                    <div className="space-y-12 md:space-y-24">
                        {protocols.map((protocol, index) => (
                            <motion.div
                                key={protocol.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`relative flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16`}
                            >
                                {/* Center Node (Desktop) */}
                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.5)] hidden md:block" />

                                {/* Content Side */}
                                <div className="flex-1 w-full text-center md:text-left">
                                    <div className={`p-8 md:p-12 rounded-[2.5rem] glass-card border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 group`}>
                                        <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
                                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                                <protocol.icon className="w-6 h-6 text-cyan-400" />
                                            </div>
                                            <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[10px]">{protocol.id}</span>
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tighter leading-tight">{protocol.title}</h3>
                                        <span className="text-foreground/40 font-bold tracking-widest text-[9px] uppercase mb-6 block leading-none">{protocol.subtitle}</span>
                                        <p className="text-foreground/60 leading-relaxed font-light text-base md:text-lg">
                                            {protocol.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Spacer Side (Desktop) */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />
        </section>
    );
}
