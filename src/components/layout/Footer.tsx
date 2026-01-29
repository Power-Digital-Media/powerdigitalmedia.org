"use client";

import { Mic2, Instagram, Youtube, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative pt-24 pb-12 overflow-hidden border-t border-white/5 bg-background">
            <div className="container relative z-10 px-4 mx-auto">
                <div className="grid gap-12 mb-16 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6 group w-fit">
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-accent group-hover:bg-accent/90 transition-colors">
                                <Mic2 className="w-6 h-6 text-white" />
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
                            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all">
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="mailto:info@powerdigitalmedia.org" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-6 uppercase tracking-wider text-xs text-accent">Studio</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/web-design" className="hover:text-accent transition-colors">Services</Link></li>
                            <li><Link href="/podcasting" className="hover:text-accent transition-colors">Podcasting</Link></li>
                            <li><a href="https://powerdigitalgrowth.org" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Marketing</a></li>
                            <li><Link href="/our-work" className="hover:text-accent transition-colors">Portfolio</Link></li>
                            <li><Link href="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold mb-6 uppercase tracking-wider text-xs text-accent">Contact</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>Jackson, Mississippi</li>
                            <li>info@powerdigitalmedia.org</li>
                            <li>(601) 000-0000</li>
                            <li><Link href="/contact" className="text-accent font-bold hover:underline">Book Strategy Call</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-medium">
                    <p>© {currentYear} Power Digital Media LLC. All rights reserved.</p>
                    <div className="flex items-center gap-8">
                        <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
