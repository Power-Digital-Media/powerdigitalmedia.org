"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mic2, LayoutDashboard, LogIn, Terminal } from "lucide-react";
import Link from "next/link";
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
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Design", href: "/web-design", external: false },
        { name: "Podcasting", href: "/podcasting", external: false },
        { name: "Production", href: "/production", external: false },
        { name: "Marketing", href: "/marketing", external: false },
        { name: "Portfolio", href: "/our-work", external: false },
        { name: "Showroom", href: "/showroom", external: false },
        { name: "Blog", href: "/blog", external: false },
        { name: "Billing", href: "/billing", external: false },
        { name: "About", href: "/about", external: false },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4" : "py-6"
                }`}
        >
            <div className="container px-4 mx-auto">
                <div
                    className={`relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${isScrolled
                        ? "glass-card bg-background/80 backdrop-blur-lg border-white/10"
                        : "bg-transparent border-transparent"
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-accent group-hover:bg-accent/90 transition-colors">
                            <Mic2 className="w-6 h-6 text-white" />
                            <div className="absolute inset-0 rounded-xl bg-accent animate-pulse opacity-20 -z-10" />
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
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
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
                        <button
                            onClick={() => setIsBookingOpen(true)}
                            className="px-5 py-2 text-sm font-bold text-white bg-accent rounded-full hover:bg-accent/90 transition-all border-glow"
                        >
                            Book Studio
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-foreground p-1"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 p-4 md:hidden"
                    >
                        <div className="glass-card rounded-3xl p-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    target={link.external ? "_blank" : undefined}
                                    rel={link.external ? "noopener noreferrer" : undefined}
                                    className="text-lg font-medium py-2 border-b border-white/5"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href={user ? "/dashboard" : "/login"}
                                className="w-full py-4 text-center font-bold text-white glass-card border-accent/20 rounded-2xl flex items-center justify-center gap-2"
                                onClick={() => setIsMobileMenuOpen(false)}
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

                            {isAdmin(user?.email) && (
                                <Link
                                    href="/admin"
                                    className="w-full py-4 text-center font-black text-accent glass-card border-accent/40 rounded-2xl flex items-center justify-center gap-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Terminal className="w-4 h-4" />
                                    Nexus HUD
                                </Link>
                            )}
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsBookingOpen(true);
                                }}
                                className="w-full py-4 text-center font-bold text-white bg-accent rounded-2xl"
                            >
                                Book Studio
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </nav>
    );
}
