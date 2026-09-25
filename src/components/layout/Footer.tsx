"use client";

import { Instagram, Twitter, Youtube, Mail, Phone, MapPin, Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
                        <Link href="/" className="flex items-center mb-6 group w-fit">
                            <div className="relative flex items-center h-14 w-64">
                                <Image src="/images/pdm-logo-transparent.png" alt="Power Digital Media LLC" fill unoptimized className="object-contain object-left group-hover:scale-105 transition-transform" />
                            </div>
                        </Link>
                        <p className="max-w-sm text-muted-foreground leading-relaxed mb-8">
                            Custom Next.js Web Design, Proprietary PinDrop™ Contractor Tech, and High-Converting Growth Systems built in Jackson, Mississippi.
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
                            <li><Link href="/pindrop" className="hover:text-accent transition-colors">PinDrop™ Field App</Link></li>
                            <li><Link href="/custom-applications" className="hover:text-accent transition-colors">CRM &amp; Custom Apps</Link></li>
                            <li><Link href="/marketing" className="hover:text-accent transition-colors">Growth Marketing</Link></li>
                            <li><Link href="/our-work" className="hover:text-accent transition-colors">Portfolio</Link></li>
                            <li><Link href="/review" className="hover:text-accent transition-colors">Leave a Review</Link></li>
                        </ul>
                    </div>

                    {/* Contact - Jackson MS Area Focus */}
                    <div>
                        <h4 className="font-bold mb-6 uppercase tracking-wider text-xs text-accent">Service Area</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>2914 Cynthia Rd.</li>
                            <li>Jackson, MS 39209</li>
                            <li className="text-xs text-slate-400">Serving Jackson, Clinton, Madison, Ridgeland, Brandon, Flowood, Pearl &amp; Central MS</li>
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
                        <div className="mt-6">
                            <BBBSeal variant="badge" />
                        </div>
                    </div>

                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-medium">
                    <div className="flex flex-col gap-1">
                        <p>© {currentYear} Power Digital Media LLC. All rights reserved. 🛡️ v1.6-elite</p>
                    </div>
                    <div className="flex items-center gap-6">
                        {/* Edge Infrastructure Badge */}
                        <div
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-all"
                            title="Deployed on Vercel Global Edge"
                        >
                            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 1155 1000" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M577.344 0L1154.69 1000H0L577.344 0Z" />
                            </svg>
                            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-300">
                                Next.js &amp; Vercel Edge
                            </span>
                        </div>
                        <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
                        <Link href="/terms-and-conditions" className="hover:text-accent transition-colors">Terms of Service</Link>
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
