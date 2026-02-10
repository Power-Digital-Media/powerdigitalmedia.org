"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, Calendar, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/ui/BookingModal";
import { useState } from "react";

export default function StandaloneContactPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <main className="relative min-h-screen bg-background">
            <Navbar />

            {/* Hero Header */}
            <section className="relative pt-32 pb-12 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-accent/5 blur-[100px] pointer-events-none -z-10" />
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl font-bold tracking-tight md:text-7xl mb-4">Get In Touch.</h1>
                        <p className="text-lg text-muted-foreground">We&apos;re ready to help you sound big and grow fast.</p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid gap-16 lg:grid-cols-2">

                            {/* Info Column */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-12"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 group">
                                            <div className="w-12 h-12 rounded-2xl glass-card border-white/5 flex items-center justify-center text-accent group-hover:border-accent/40 transition-all">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-accent uppercase tracking-widest">Office</p>
                                                <p className="font-medium">Jackson, Mississippi</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 group">
                                            <div className="w-12 h-12 rounded-2xl glass-card border-white/5 flex items-center justify-center text-accent group-hover:border-accent/40 transition-all">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-accent uppercase tracking-widest">Email</p>
                                                <p className="font-medium">info@powerdigitalmedia.org</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 group">
                                            <div className="w-12 h-12 rounded-2xl glass-card border-white/5 flex items-center justify-center text-accent group-hover:border-accent/40 transition-all">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-accent uppercase tracking-widest">Phone</p>
                                                <p className="font-medium">601-446-2393</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="w-full text-left p-8 rounded-3xl glass-card border-accent/20 bg-accent/5 hover:border-accent/50 transition-all group"
                                >
                                    <Calendar className="w-10 h-10 text-accent mb-6 group-hover:scale-110 transition-transform" />
                                    <h4 className="text-xl font-bold mb-2">Strategy Calls</h4>
                                    <p className="text-muted-foreground mb-6">Book a 30-minute deep dive into your content goals. We&apos;ll outline a path to success.</p>
                                    <div className="flex items-center gap-2 font-bold text-accent group-hover:translate-x-2 transition-transform">
                                        Schedule Now <ArrowRight className="w-4 h-4" />
                                    </div>
                                </button>
                            </motion.div>

                            {/* Form Column */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="p-10 rounded-[3rem] glass-card border-white/10 bg-accent/5">
                                    <form
                                        action="https://formspree.io/f/mdazlovb"
                                        method="POST"
                                        className="space-y-8"
                                    >
                                        <div className="grid gap-8 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Name</label>
                                                <input type="text" name="name" required className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-accent outline-none transition-all placeholder:text-muted-foreground/30" placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                                                <input type="email" name="email" required className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-accent outline-none transition-all placeholder:text-muted-foreground/30" placeholder="john@example.com" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Topic</label>
                                            <select name="topic" className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-accent outline-none text-muted-foreground">
                                                <option>General Inquiry</option>
                                                <option>Studio Booking</option>
                                                <option>Web Design Bundle</option>
                                                <option>Strategy Consultation</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Message</label>
                                            <textarea rows={4} name="message" required className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-accent outline-none transition-all placeholder:text-muted-foreground/30 resize-none" placeholder="Tell us about your project..."></textarea>
                                        </div>
                                        <button className="w-full py-5 bg-accent text-white font-bold rounded-2xl border-glow flex items-center justify-center gap-2 hover:bg-accent/90 transition-all group">
                                            Send Message <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </button>
                                    </form>
                                </div>
                            </motion.div>

                        </div>
                    </div>
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
