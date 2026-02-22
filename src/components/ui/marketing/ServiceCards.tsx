"use client";

import React, { useRef } from 'react';
import { Target, TrendingUp, Video, CheckCircle2, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ServiceCard = ({ icon: Icon, title, description, features, image }: any) => (
    <div className="w-screen shrink-0 h-full flex flex-col justify-center items-center px-4 sm:px-10 lg:px-32 xl:px-48">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 w-full max-w-7xl">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 w-full space-y-6 md:space-y-8"
            >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Core Service Module</span>
                </div>
                <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-tight text-balance">{title}</h2>
                <p className="text-slate-400 text-base md:text-lg lg:text-xl font-light leading-relaxed text-balance">{description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 group">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500 transition-all duration-300">
                                <CheckCircle2 className="w-3 md:w-3.5 h-3 md:h-3.5 text-cyan-400 group-hover:text-white" />
                            </div>
                            <span className="text-xs md:text-sm text-slate-300 font-medium transition-colors group-hover:text-white">{feature}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="flex-1 w-full relative"
            >
                <div className="absolute inset-0 bg-cyan-500/5 blur-[60px] md:blur-[100px] rounded-full"></div>
                <div className="light-trail-wrapper rounded-3xl md:rounded-[2.5rem]">
                    <div className="light-trail-border"></div>
                    <div className="light-trail-content rounded-[1.4rem] md:rounded-[2.4rem] overflow-hidden group aspect-[4/3] relative">
                        <div className="absolute inset-0 animated-gradient opacity-0 group-hover:opacity-15 transition-opacity duration-700 z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10"></div>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                         title="Power Digital Media Asset" aria-description="An official Power Digital Media structured image asset." data-caption="Power Digital Media Portfolio & Assets" />
                        <div className="absolute bottom-6 left-6 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
);

export const ServiceShowcase = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-slate-950">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex w-[300vw] h-full items-center">
                    <ServiceCard
                        icon={Target}
                        title="Lead Gen Engines"
                        image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
                        description="High-intent capture systems engineered specifically for local business growth. We don't just build ads; we build conversion environments."
                        features={[
                            "Lead Magnet Architecture",
                            "Message-to-Call Systems",
                            "Intent-Based Targeting",
                            "Automated Qualification",
                            "CRM System Integration"
                        ]}
                    />

                    <ServiceCard
                        icon={TrendingUp}
                        title="Multi-Model Testing"
                        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
                        description="Our signature system. We test hooks, visuals, and copy angles weekly, ensuring your winners keep winning and losers are cut ruthlessly."
                        features={[
                            "Weekly Creative Rotation",
                            "Multivariate Hook Testing",
                            "Data-Backed Iteration",
                            "Dynamic Scaling Logic",
                            "Competitor Ad Forensics"
                        ]}
                    />

                    <ServiceCard
                        icon={Video}
                        title="Direct Response Content"
                        image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000"
                        description="Short-form video assets designed to stop the scroll and drive immediate action. Content is the new targeting layer in 2026."
                        features={[
                            "Scroll-Stopping Hooks",
                            "High-Impact Editing",
                            "Direct-to-Camera Scripting",
                            "UGC-Style Creative",
                            "Professional Studio Output"
                        ]}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export const CustomProtocolCTA = () => (
    <section className="py-24 md:py-40 bg-slate-900/50 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none"></div>
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-6 text-center relative z-10"
        >
            <h2 className="font-orbitron text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase mb-8 md:mb-10 tracking-tighter">
                Need a <span className="text-cyan-400 blur-[0.5px]">Custom Protocol?</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg mb-10 md:mb-12 font-light text-balance">
                We specialize in tailoring our Growth Systems for businesses allocating between $5k and $50k monthly on ad platforms.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                <Link href="/contact" className="relative inline-flex items-center justify-center gap-3 bg-slate-900 border border-cyan-500/50 hover:bg-cyan-500 hover:border-cyan-400 text-white px-8 md:px-12 py-5 md:py-6 rounded-xl md:rounded-2xl font-orbitron font-black uppercase tracking-[0.2em] text-xs md:text-sm transition-all shadow-xl group-hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] w-full sm:w-auto">
                    Request Strategy Audit <Zap className="w-4 h-4 fill-white animate-pulse" />
                </Link>
            </motion.div>
        </motion.div>
    </section>
)
