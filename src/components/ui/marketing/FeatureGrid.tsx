"use client";

import React from 'react';
import { Target, Layers, BarChart4, Cpu } from 'lucide-react'; // Corrected lucide-react import
import { motion } from 'framer-motion';
import TiltCard from './TiltCard'; // Single, correct TiltCard import

const FeatureCard = ({ icon: Icon, title, description, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="h-full"
    >
        <TiltCard intensity={20} className="h-full">
            <div className="light-trail-wrapper rounded-2xl p-[1px] h-full">
                <div className="light-trail-border"></div>
                <div className="light-trail-content h-full p-6 md:p-8 rounded-2xl transition-all duration-500 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] hover:bg-slate-900/60 flex flex-col">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-700 transform group-hover:scale-110 group-hover:rotate-12">
                        <Icon className="w-16 h-16 md:w-24 md:h-24 text-cyan-400" />
                    </div>
                    <div className="bg-cyan-500/10 p-3 md:p-4 rounded-xl inline-block mb-6 group-hover:bg-cyan-500/20 transition-all duration-300 border border-cyan-500/20 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] self-start">
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
                    </div>
                    <h3 className="font-orbitron text-lg md:text-xl font-bold text-white mb-4 tracking-wide uppercase transition-colors group-hover:text-cyan-300">{title}</h3>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed flex-grow">{description}</p>
                </div>
            </div>
        </TiltCard>
    </motion.div>
);

export default function FeatureGrid() {
    const features = [
        {
            icon: Target,
            title: "Hyper-Targeted Capture",
            description: "We abandon broad-stroke marketing for precision-engineered funnels that capture high-intent prospects actively searching for your service."
        },
        {
            icon: Layers,
            title: "Omni-Present Retargeting",
            description: "Once a prospect engages, they enter our retargeting ecosystem. We deploy compounding brand touches across Meta, Google, and YouTube."
        },
        {
            icon: BarChart4,
            title: "Ruthless Optimization",
            description: "Our systems run daily forensic checks on ad spend. We immediately execute underperforming assets and scale the mathematical winners."
        },
        {
            icon: Cpu,
            title: "Automated Nurture",
            description: "Leads don't go cold. They are immediately routed into custom indoctrination sequences that build trust before you even make the call."
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto items-stretch">
            {features.map((feature, i) => (
                <FeatureCard key={i} {...feature} delay={i * 0.15} />
            ))}
        </div>
    );
}
