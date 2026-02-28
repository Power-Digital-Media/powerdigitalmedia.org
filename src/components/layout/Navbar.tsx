"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, LogIn, Terminal, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BookingModal from "../ui/BookingModal";
import { useAuth } from "@/context/AuthContext";
import { isAdmin } from "@/lib/auth-constants";

export default function Navbar() {
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        // Lock body scroll when mobile menu is open
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    const serviceLinks = [
        { name: "Web Design", href: "/web-design" },
        { name: "Podcasting", href: "/podcasting" },
        { name: "Production", href: "/production" },
        { name: "Marketing", href: "/marketing" },
    ];

    const mainLinks = [
        { name: "Portfolio", href: "/our-work", external: false },
        { name: "Showroom", href: "/showroom", external: false },
        { name: "Blog", href: "/blog", external: false },
        { name: "About", href: "/about", external: false },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? "py-4" : "py-6"
                }`}
        >
            <div className="container px-4 mx-auto relative z-50">
                <div
                    className={`relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${isScrolled || isMobileMenuOpen
                        ? "glass-card bg-background/80 backdrop-blur-lg border-white/10"
                        : "bg-transparent border-transparent"
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="relative flex items-center justify-center w-12 h-12">
                            <img src="/power-logo.webp" alt="Power Digital Media" width={40} height={40} className="object-contain group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tighter leading-none">
                                POWER <span className="text-accent">DIGITAL</span>
                            </span>
                            <span className="text-[8px] font-bold tracking-[0.3em] text-muted-foreground uppercase leading-none mt-1">
                                Media Studio
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {/* Services Dropdown */}
                        <div className="relative group/services py-2">
                            <button className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
                                Services <ChevronDown className="w-4 h-4 opacity-70 group-hover/services:rotate-180 transition-transform duration-300" />
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover/services:opacity-100 group-hover/services:visible transition-all duration-300 w-48">
                                <div className="glass-card rounded-2xl p-2 flex flex-col border border-white/10 shadow-xl bg-background/95 backdrop-blur-xl">
                                    {serviceLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="px-4 py-3 text-sm font-medium hover:bg-white/5 hover:text-accent rounded-xl transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {mainLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {isAdmin(user?.email) && (
                            <Link
                                href="/admin"
                                className="flex items-center gap-2 px-5 py-2 text-sm font-black text-accent glass-card border-accent/40 hover:bg-accent/10 transition-all rounded-full"
                            >
                                <Terminal className="w-4 h-4" />
                                Nexus HUD
                            </Link>
                        )}
                        <Link
                            href={user ? "/dashboard" : "/login"}
                            className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white glass-card border-accent/20 hover:bg-accent/10 transition-all rounded-full"
                        >
                            {user ? (
                                <>
                                    <LayoutDashboard className="w-4 h-4 text-accent" />
                                    Dashboard
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4 text-accent" />
                                    Client Portal
                                </>
                            )}
                        </Link>
                        <Link
                            href="#footer"
                            className="px-5 py-2 text-sm font-bold text-white bg-accent rounded-full hover:bg-accent/90 transition-all border-glow"
                        >
                            Book Studio
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden text-foreground p-2 rounded-full hover:bg-white/5"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6 text-accent" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Full Screen Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <m.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl lg:hidden flex flex-col pt-32 pb-8 px-6 overflow-y-auto"
                    >
                        {/* Primary Exploration Links */}
                        <div className="flex flex-col gap-6 flex-1">
                            {/* Services Group */}
                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-black tracking-widest text-accent uppercase px-4 opacity-80">Services</span>
                                <div className="glass-card rounded-3xl p-2 flex flex-col border border-white/5">
                                    {serviceLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="px-6 py-4 text-lg font-medium hover:bg-white/5 rounded-2xl transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Main Links */}
                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-black tracking-widest text-muted-foreground uppercase px-4 opacity-80">Explore</span>
                                <div className="glass-card rounded-3xl p-2 flex flex-col border border-white/5">
                                    {mainLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="px-6 py-4 text-lg font-medium hover:bg-white/5 rounded-2xl transition-colors border-b border-white/5 last:border-0"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Utilities & CTAs */}
                        <div className="mt-8 flex flex-col gap-3 pt-6 border-t border-white/10 shrink-0">
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    href="/billing"
                                    className="py-3 text-center text-sm font-medium text-muted-foreground hover:text-white glass-card border-white/5 rounded-xl"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Billing
                                </Link>
                                <Link
                                    href={user ? "/dashboard" : "/login"}
                                    className="py-3 text-center text-sm font-medium text-white glass-card border-white/5 rounded-xl flex items-center justify-center gap-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {user ? "Dashboard" : "Client Portal"}
                                </Link>
                            </div>

                            {isAdmin(user?.email) && (
                                <Link
                                    href="/admin"
                                    className="w-full py-3 text-center text-sm font-black text-accent bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center gap-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Terminal className="w-4 h-4" />
                                    Nexus HUD
                                </Link>
                            )}

                            <Link
                                href="#footer"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full py-4 text-center font-bold text-white bg-accent rounded-xl border border-accent border-glow shadow-[0_0_30px_rgba(var(--accent),0.3)] hover:shadow-[0_0_50px_rgba(var(--accent),0.5)] transition-all mt-2"
                            >
                                Book Studio
                            </Link>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </nav>
    );
}
