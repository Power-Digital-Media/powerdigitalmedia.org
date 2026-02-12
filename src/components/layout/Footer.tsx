"use client";

import { Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BookingModal from "../ui/BookingModal";

export default function Footer() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative pt-24 pb-12 overflow-hidden border-t border-white/5 bg-background">
            <div className="container relative z-10 px-4 mx-auto">
                <div className="grid gap-12 mb-16 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6 group w-fit">
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-accent group-hover:bg-accent/90 transition-colors">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold tracking-tighter leading-none">
                                    POWER <span className="text-accent">DIGITAL</span>
                                </span>
                                <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase leading-none mt-1">
                                    Media Studio
                                </span>
                            </div>
                        </Link>
                        <p className="max-w-sm text-muted-foreground leading-relaxed mb-8">
                            Premium podcasting, video production, and digital systems built for those who have a message that deserves more than the default.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://instagram.com/powerdigitalmedia" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://youtube.com/@powerdigitalmedia" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all">
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a href="https://twitter.com/powerdigitalms" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="mailto:info@powerdigitalmedia.org" aria-label="Send us an email" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-6 uppercase tracking-wider text-xs text-accent">Studio</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/web-design" className="hover:text-accent transition-colors">Design</Link></li>
                            <li><Link href="/podcasting" className="hover:text-accent transition-colors">Podcasting</Link></li>
                            <li><a href="https://powerdigitalgrowth.org" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Marketing</a></li>
                            <li><Link href="/our-work" className="hover:text-accent transition-colors">Portfolio</Link></li>
                            <li><Link href="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Contact - Jackson MS Area Focus */}
                    <div>
                        <h4 className="font-bold mb-6 uppercase tracking-wider text-xs text-accent">Service Area</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>Jackson • Madison • Brandon, MS</li>
                            <li>info@powerdigitalmedia.org</li>
                            <li>601-446-2393</li>
                            <li>
                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="text-accent font-bold hover:underline"
                                >
                                    Book Local Strategy
                                </button>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-medium">
                    <div className="flex flex-col gap-1">
                        <p>© {currentYear} Power Digital Media LLC. All rights reserved. 🛡️ v1.6-elite</p>
                        <p className="text-[10px] opacity-50 uppercase tracking-widest">As an Amazon Associate I earn from qualifying purchases.</p>
                    </div>
                    <div className="flex items-center gap-8">
                        <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </footer>
    );
}
