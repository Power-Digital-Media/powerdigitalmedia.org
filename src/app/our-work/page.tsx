"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink, Globe, Film, Share2, MousePointer2, Megaphone, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/ui/BookingModal";

const workCategories = [
    {
        title: "Professional Video Marketing",
        description: "Harness the power of video marketing to elevate your brand. Strategic content that captures attention and drives measurable success.",
        icon: Megaphone,
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Professional Videography",
        description: "Elevate your visual storytelling with cinematic videography that resonates. Crafts high-quality videos showcasing your brand’s unique narrative.",
        icon: Film,
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Beautiful Web-Design",
        description: "Visually striking, responsive web designs. We blend creativity and technology to engage visitors and boost growth.",
        icon: Globe,
        image: "https://images.unsplash.com/photo-1547658719-da2b8116c1d8?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Social Media Marketing",
        description: "Amplify your brand through strategic social media campaigns. Spark engagement and foster meaningful connections.",
        icon: Share2,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
    }
];

export default function OurWorkPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <main className="relative min-h-screen bg-background">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-sm font-bold tracking-[0.3em] text-accent uppercase mb-6">
                            Portfolio
                        </h1>
                        <h2 className="text-5xl font-bold tracking-tight md:text-7xl mb-8 leading-[1.1]">
                            Marketing That <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 text-glow">
                                Gets Results.
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-10 text-balance">
                            Your Brand, Amplified. Your Message, Heard. Explore our latest projects across video, web, and strategic marketing.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-24 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {workCategories.map((cat, index) => (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden glass-card border-white/5 group-hover:border-accent/30 transition-all duration-700">
                                    <Image
                                        src={cat.image}
                                        alt={cat.title}
                                        fill
                                        className="object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent p-12 flex flex-col justify-end">
                                        <div className="p-4 rounded-2xl bg-accent/10 w-fit mb-6 border border-accent/20 group-hover:border-accent/40 group-hover:scale-110 transition-all duration-500">
                                            <cat.icon className="w-8 h-8 text-accent" />
                                        </div>
                                        <h3 className="text-3xl font-bold mb-4 group-hover:text-glow transition-all">
                                            {cat.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
                                            {cat.description}
                                        </p>

                                        <button
                                            onClick={() => setIsBookingOpen(true)}
                                            className="flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest group/btn text-left"
                                        >
                                            Explore Series <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                                        </button>
                                    </div>

                                    <div className="absolute top-8 right-8 w-12 h-12 rounded-full glass-card border-accent/20 flex items-center justify-center translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                        <Play className="w-5 h-5 text-accent fill-accent" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Layer */}
            <section className="py-24 bg-accent/5 border-y border-white/5">
                <div className="container px-4 mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-8">Want to see what we can do for you?</h3>
                    <button
                        onClick={() => setIsBookingOpen(true)}
                        className="inline-block px-10 py-5 font-bold text-white bg-accent rounded-full border-glow hover:bg-accent/90 transition-all"
                    >
                        Schedule A Free Consultation
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
