"use client";

import { motion } from "framer-motion";
import { Users, Target, Rocket, Shield, Heart, ArrowRight, Mic2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";

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
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-sm font-bold tracking-[0.3em] text-accent uppercase mb-6">
                            Our Mission
                        </h1>
                        <h2 className="text-5xl font-bold tracking-tight md:text-7xl mb-8 leading-[1.1]">
                            Where You Are The <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 text-glow">
                                Top Priority.
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-10 text-balance">
                            At Power Digital Media LLC, we believe that your goals and vision are unique. We focus on delivering personalized solutions tailored specifically to your objectives.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="grid gap-16 lg:grid-cols-2 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-[2.5rem] overflow-hidden glass-card border-white/5 aspect-square lg:aspect-auto lg:h-[600px]"
                        >
                            <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                                <Users className="w-24 h-24 text-accent/20" />
                            </div>
                            <div className="absolute bottom-12 left-12 right-12 p-8 rounded-3xl glass-card border-accent/20 bg-accent/5 backdrop-blur-xl">
                                <h4 className="text-xl font-bold mb-2">Dedicated To You</h4>
                                <p className="text-sm text-foreground/70 leading-relaxed">
                                    Timely communication and relentless attention to detail. We learn about your brand, your audience, and your long-term vision.
                                </p>
                            </div>
                        </motion.div>

                        <div className="space-y-8">
                            <h3 className="text-3xl font-bold tracking-tight md:text-5xl">We Help You <br /> Embrace The Future.</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                In the fast-paced digital world, even the smallest details can make a significant impact. Whether you&apos;re a small business, a podcaster, or a ministry, our team is here to support you every step of the way.
                            </p>

                            <div className="grid gap-6 sm:grid-cols-2">
                                {values.map((value, index) => (
                                    <motion.div
                                        key={value.title}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="p-6 rounded-2xl glass-card border-white/5 hover:border-accent/40 bg-accent/5 transition-all group"
                                    >
                                        <value.icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                                        <h4 className="font-bold mb-2">{value.title}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Layer */}
            <section className="py-24 border-t border-white/5">
                <div className="container px-4 mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-accent/20 text-accent text-sm font-bold mb-8">
                        <Target className="w-4 h-4" /> Your Mission, Our Mission
                    </div>
                    <h3 className="text-4xl font-bold mb-8 max-w-2xl mx-auto">Experience the difference of working with a team that values your success.</h3>
                    <button
                        onClick={() => setIsBookingOpen(true)}
                        className="px-10 py-5 font-bold text-white bg-accent rounded-full border-glow hover:bg-accent/90 transition-all flex items-center gap-2 mx-auto"
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
