"use client";

import { motion } from "framer-motion";
import { Users, Target, Rocket, Shield, Heart, ArrowRight, Mic2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";
import Link from "next/link";

const values = [
    {
        title: "Client First",
        description: "Your success is our mission. We believe that every client's goals and vision are unique.",
        icon: Heart
    },
    {
        title: "Forward Thinking",
        description: "We embrace the future with tech-forward solutions that keep your brand ahead of the curve.",
        icon: Rocket
    },
    {
        title: "Broadcast Quality",
        description: "Whether it's audio or web, we maintain broadcast-grade standards in everything we build.",
        icon: Mic2
    },
    {
        title: "Trusted Security",
        description: "Redundant systems and managed security ensure your digital assets are always protected.",
        icon: Shield
    }
];

export default function AboutPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <main className="relative min-h-screen bg-background">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-sm font-bold tracking-[0.3em] text-accent uppercase mb-6">
                            About Power Digital Media
                        </h1>
                        <h2 className="text-5xl font-bold tracking-tight md:text-7xl mb-8 leading-[1.1]">
                            Digital Media and <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 text-glow">
                                Podcast Production
                            </span> <br />
                            in Jackson, Mississippi
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-10 text-balance max-w-3xl mx-auto">
                            Founded by <strong>Damein Donald</strong>, Power Digital Media helps businesses, ministries, creators, and organizations build a powerful online presence through cinematic visuals, professional audio production, and strategic digital storytelling.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Bio Section */}
            <section className="py-24 relative z-10 bg-white/[0.02]">
                <div className="container px-4 mx-auto">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid gap-16 lg:grid-cols-2 items-start">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-xl leading-relaxed text-foreground/80">
                                        Power Digital Media is a Jackson, Mississippi–based digital media and marketing studio specializing in high-quality video production, podcast development, website design, and AI-powered branding solutions.
                                    </p>
                                    <p className="text-foreground/70 leading-relaxed">
                                        With years of hands-on experience in podcast production, livestreaming, and multimedia marketing, we offer full-service solutions that include studio recording, multi-camera video shoots, content editing, brand development, and modern website creation. From concept to final delivery, every project is crafted with precision, creativity, and a commitment to excellence.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Link href="/podcasting" className="p-6 rounded-2xl glass-card border-white/5 hover:border-accent/40 bg-white/5 transition-all group flex flex-col gap-2">
                                        <span className="text-accent font-bold text-xs uppercase tracking-widest">Protocol 01</span>
                                        <span className="text-lg font-bold">Podcast Services</span>
                                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-accent group-hover:translate-x-2 transition-all" />
                                    </Link>
                                    <Link href="/web-design" className="p-6 rounded-2xl glass-card border-white/5 hover:border-accent/40 bg-white/5 transition-all group flex flex-col gap-2">
                                        <span className="text-accent font-bold text-xs uppercase tracking-widest">Protocol 02</span>
                                        <span className="text-lg font-bold">Website Design</span>
                                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-accent group-hover:translate-x-2 transition-all" />
                                    </Link>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5]"
                            >
                                <img
                                    src="/images/gear/cinematic_studio_setup.webp"
                                    alt="Power Digital Media podcast and video production studio in Jackson Mississippi"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="glass-card p-6 rounded-2xl border-accent/20 bg-accent/5 backdrop-blur-xl">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2 block">Studio Authority</span>
                                        <p className="text-sm font-bold text-white leading-tight">Elite broadcasting standards from the heart of Mississippi.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="mt-24 prose prose-invert max-w-none">
                            <div className="grid gap-12 lg:grid-cols-2">
                                <div className="space-y-6">
                                    <h3 className="text-3xl font-bold tracking-tight">Blending Tech & Authenticity</h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Power Digital Media is known for blending cutting-edge technology with authentic storytelling. By integrating AI-assisted design, advanced video editing techniques, and optimized SEO strategies, clients receive content that not only looks professional but also performs across search engines and social platforms.
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <h3 className="text-3xl font-bold tracking-tight">Serving Jackson & Nationwide</h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        We work with entrepreneurs, churches, nonprofits, musicians, podcasters, and local businesses to create impactful digital experiences that drive engagement and growth. Whether launching a new podcast, producing a promotional video, or building a brand-new website, Power Digital Media delivers results that stand out in a crowded digital world.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Grid */}
            <section className="py-24 relative overflow-hidden">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Operations</span>
                        <h3 className="text-4xl font-bold">The Power Philosophy</h3>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-8 rounded-[2rem] glass-card border-white/5 hover:border-accent/40 bg-white/5 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <value.icon className="w-6 h-6 text-accent" />
                                </div>
                                <h4 className="font-bold text-xl mb-3">{value.title}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Layer */}
            <section className="py-24 border-t border-white/5 bg-accent/[0.02]">
                <div className="container px-4 mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card border-accent/30 text-accent text-xs font-black uppercase tracking-widest mb-8">
                        <Target className="w-4 h-4" /> Your Mission, Our Mission
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black mb-8 max-w-4xl mx-auto tracking-tight">Begin Your Digital Legacy Today.</h3>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">Experience the difference of working with a team that values your success and understands your vision.</p>
                    <button
                        onClick={() => setIsBookingOpen(true)}
                        className="px-12 py-6 font-bold text-white bg-accent rounded-full border-glow hover:bg-accent/90 transition-all flex items-center gap-3 mx-auto text-lg hover:scale-105 active:scale-95"
                    >
                        Contact Us Today <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            <Footer />

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </main>
    );
}
