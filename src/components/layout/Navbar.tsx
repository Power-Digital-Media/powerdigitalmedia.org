"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, LogIn, Terminal, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import { isAdmin } from "@/lib/auth-constants";

export default function Navbar() {
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHiddenByWakeUp, setIsHiddenByWakeUp] = useState(false);


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

    // Hide navbar when a WakeUpCall section is in view (cinematic immersion)
    useEffect(() => {
        const zones = document.querySelectorAll('.wakeup-zone');
        if (!zones.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Hide if ANY wakeup zone is intersecting
                const anyActive = entries.some(e => e.isIntersecting);
                setIsHiddenByWakeUp(anyActive);
            },
            { threshold: 0.05 }
        );

        zones.forEach(zone => observer.observe(zone));
        return () => observer.disconnect();
    }, []);

    const serviceLinks = [
        { name: "Web Design", href: "/web-design" },
        { name: "Custom Applications", href: "/custom-applications" },
        { name: "Growth Marketing", href: "/marketing" },
    ];

    const mainLinks = [
        { name: "Portfolio", href: "/our-work", external: false },
        { name: "Showroom", href: "/showroom", external: false },
        { name: "Blog", href: "/blog", external: false },
        { name: "About", href: "/about", external: false },
    ];

    return (
        <>
            {/* Navbar Bar */}
            <nav
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? "py-4" : "py-6"
                    } ${isHiddenByWakeUp && !isMobileMenuOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
            >
                <div className="container px-4 mx-auto relative z-50">
                    <div
                        className={`relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${isScrolled || isMobileMenuOpen
                            ? "glass-card bg-background/80 backdrop-blur-lg border-white/10"
                            : "bg-transparent border-transparent"
                            }`}
                    >
                        {/* Logo */}
                        <Link href="/" className="flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="relative flex items-center h-16 w-48">
                                <Image src="/images/new%20nav%20logo.webp" alt="Power Digital Media LLC" fill unoptimized className="object-contain group-hover:scale-105 transition-transform mix-blend-screen" priority />
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
                                                prefetch={false}
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
                                    prefetch={false}
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
                                    prefetch={false}
                                    className="flex items-center gap-2 px-5 py-2 text-sm font-black text-accent glass-card border-accent/40 hover:bg-accent/10 transition-all rounded-full"
                                >
                                    <Terminal className="w-4 h-4" />
                                    Nexus HUD
                                </Link>
                            )}
                            <Link
                                href={user ? "/dashboard" : "/login"}
                                prefetch={false}
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
                                href="/book"
                                prefetch={false}
                                className="px-5 py-2 text-sm font-bold text-white bg-accent rounded-full hover:bg-accent/90 transition-all border-glow"
                            >
                                Book a Call
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
            </nav>

            {/* Mobile Menu Full Screen Overlay — lives OUTSIDE nav so it's never affected by nav transforms */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <m.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[99] bg-background/98 backdrop-blur-2xl lg:hidden flex flex-col pt-32 pb-8 px-6 overflow-y-auto"
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
                                            prefetch={false}
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
                                            prefetch={false}
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
                                    prefetch={false}
                                    className="py-3 text-center text-sm font-medium text-muted-foreground hover:text-white glass-card border-white/5 rounded-xl"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Billing
                                </Link>
                                <Link
                                    href={user ? "/dashboard" : "/login"}
                                    prefetch={false}
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
                                href="/book"
                                prefetch={false}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full py-4 text-center font-bold text-white bg-accent rounded-xl border border-accent border-glow shadow-[0_0_30px_rgba(var(--accent),0.3)] hover:shadow-[0_0_50px_rgba(var(--accent),0.5)] transition-all mt-2"
                            >
                                Book a Call
                            </Link>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
}
