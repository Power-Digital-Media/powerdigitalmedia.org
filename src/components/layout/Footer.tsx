"use client";

import { Instagram, Twitter, Youtube, Mail, Phone, MapPin, Facebook } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BookingModal from "../ui/BookingModal";
import BBBSeal from "../ui/BBBSeal";

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
                            Bespoke Web Design, Custom Applications, and High-Velocity Growth Marketing built for high-ticket brands.
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
                            <a href="https://facebook.com/powerdigitalmedia" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="mailto:info@powerdigitalmedia.org" aria-label="Send us an email" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-6 uppercase tracking-wider text-xs text-accent">Services</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/web-design" className="hover:text-accent transition-colors">Web Design</Link></li>
                            <li><Link href="/custom-applications" className="hover:text-accent transition-colors">CRM & Custom Apps</Link></li>
                            <li><Link href="/business-phones" className="hover:text-accent transition-colors">Business Phones</Link></li>
                            <li><Link href="/marketing" className="hover:text-accent transition-colors">Marketing</Link></li>
                            <li><Link href="/our-work" className="hover:text-accent transition-colors">Portfolio</Link></li>
                        </ul>
                    </div>

                    {/* Contact - Jackson MS Area Focus */}
                    <div>
                        <h4 className="font-bold mb-6 uppercase tracking-wider text-xs text-accent">Service Area</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>2914 Cynthia Rd.</li>
                            <li>Jackson, MS 39209</li>
                            <li>info@powerdigitalmedia.org</li>
                            <li>601-300-2004</li>
                            <li>
                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="text-accent font-bold hover:underline"
                                >
                                    Book Local Strategy
                                </button>
                            </li>
                        </ul>
                        <div className="mt-6">
                            <BBBSeal variant="badge" />
                        </div>
                    </div>

                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-medium">
                    <div className="flex flex-col gap-1">
                        <p>© {currentYear} Power Digital Media LLC. All rights reserved. 🛡️ v1.6-elite</p>
                        <p className="text-[10px] opacity-50 uppercase tracking-widest">As an Amazon Associate I earn from qualifying purchases. We may earn commissions from affiliate links.</p>
                    </div>
                    <div className="flex items-center gap-6">
                        {/* Netlify Affiliate Badge */}
                        <a
                            href="https://join.netlify.com/power-digital-media-llc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-teal-400/30 transition-all group"
                            title="Deployed on Netlify"
                        >
                            <svg className="w-4 h-4 text-[#00C7B7] group-hover:drop-shadow-[0_0_6px_rgba(0,199,183,0.5)] transition-all" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M149.1 72.7l-34.4 34.4h47.3l6.3-6.3c-2.4-11-8.5-20.5-19.2-28.1zm-84.5 84.5l-6.3 6.3c2.4 11 8.5 20.5 19.2 28.1l34.4-34.4H64.6zm106.2-29.2H128l-42.8 42.8c5.8 2.3 12.4 3.6 19.7 3.6h27.5c7.3 0 13.9-1.3 19.7-3.6L109.3 128h42.8l42.8-42.8c-5.8-2.3-12.4-3.6-19.7-3.6h-27.5c-7.3 0-13.9 1.3-19.7 3.6L170.8 128z" transform="translate(23, 23) scale(0.82)" />
                            </svg>
                            <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground group-hover:text-[#00C7B7] transition-colors">
                                Deployed on Netlify
                            </span>
                        </a>
                        <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
                        <Link href="/refund-policy" className="hover:text-accent transition-colors">Refund Policy</Link>
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
