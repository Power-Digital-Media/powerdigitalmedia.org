"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  LogIn,
  Terminal,
  ChevronDown,
  Camera,
  MapPin,
  Hammer,
  Globe,
  Search,
  Workflow,
  TrendingUp,
  Phone,
  ArrowUpRight,
  Activity,
  Home,
  Calculator,
  Briefcase,
  Star,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { isAdmin } from "@/lib/auth-constants";

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname() || "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hideQuickStrip = ["/admin", "/dashboard", "/login", "/logout", "/client-setup"].some((p) =>
    pathname.startsWith(p)
  );

  const mobileQuickTabs = [
    { name: "Overview", href: "/", icon: Home },
    { name: "Contractors", href: "/contractors", icon: Hammer },
    { name: "PinDrop™", href: "/pindrop", icon: MapPin },
    { name: "PinCam™", href: "/pincam", icon: Camera },
    { name: "Pricing", href: "/estimate", icon: Calculator },
    { name: "Our Work", href: "/our-work", icon: Briefcase },
    { name: "Site Scan", href: "/scanner", icon: Search },
    { name: "Watchtower", href: "/site-intelligence", icon: Activity },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const appLinks = [
    {
      name: "PDM PinDrop™ SEO Engine",
      href: "/pindrop",
      tag: "LIVE SATELLITE MAP",
      desc: "Real Esri jobsite pins, auto-built neighborhood Google pages & 5-star review texts.",
      icon: MapPin,
      accent: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    },
    {
      name: "PinCam™ Field Camera",
      href: "/pincam",
      tag: "ANDROID + iOS APP",
      desc: "Ghost photo match, damage markups, Dual-Cam PiP, 9:16 reels & PDF reports.",
      icon: Camera,
      accent: "text-indigo-300 bg-indigo-500/15 border-indigo-400/35",
    },
  ];

  const serviceLinks = [
    {
      name: "Contractor & Trade Systems",
      href: "/contractors",
      desc: "Built for HVAC, roofing, dirt work & home services",
      icon: Hammer,
    },
    {
      name: "Custom Web Design",
      href: "/web-design",
      desc: "Hand-coded Next.js sites with sub-2s mobile speed",
      icon: Globe,
    },
    {
      name: "Local SEO & Map Pack",
      href: "/local-seo",
      desc: "Google Map Pack optimization + GEO & AEO AI search",
      icon: Search,
    },
    {
      name: "CRM & Custom Apps",
      href: "/custom-applications",
      desc: "0%-fee Square ordering, quote calculators & Capsule CRM",
      icon: Workflow,
    },
    {
      name: "Growth Marketing",
      href: "/marketing",
      desc: "Paid lead pipelines & automated follow-up campaigns",
      icon: TrendingUp,
    },
    {
      name: "PDM Site Intelligence™",
      href: "/site-intelligence",
      desc: "24/7 uptime, SSL, CrUX speed & Search Console watchtower",
      icon: Activity,
    },
    {
      name: "Free Live Site Scanner",
      href: "/scanner",
      desc: "Test live Google speed, JSON-LD schema & /llms.txt AI search",
      icon: Search,
    },
  ];

  const mainLinks = [
    { name: "Contractors", href: "/contractors" },
    { name: "Free Site Scanner", href: "/scanner" },
    { name: "Instant Estimate", href: "/estimate", highlight: true },
    { name: "Our Work", href: "/our-work" },
    { name: "Reviews", href: "/reviews" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? "py-2 lg:py-2.5 bg-[#05070d]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.65)]"
            : "py-2 lg:py-4 bg-[#05070d]/85 lg:bg-[#05070d]/70 backdrop-blur-xl border-b border-white/[0.08]"
        }`}
      >
        <div className="container px-3.5 sm:px-6 mx-auto relative z-50">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Logo */}
            <Link
              href="/"
              prefetch={false}
              className="flex items-center group shrink-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative flex items-center h-9 sm:h-11 lg:h-12 w-40 sm:w-52 xl:w-56">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/pdm-logo-amber.webp"
                  alt="Power Digital Media LLC"
                  width={448}
                  height={84}
                  fetchPriority="high"
                  decoding="async"
                  className="h-9 sm:h-11 w-auto object-contain object-left group-hover:scale-[1.02] transition-transform"
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-6 whitespace-nowrap">
              {/* Field Apps Dropdown */}
              <div className="relative group/apps py-2">
                <button className="text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Field Apps
                  <ChevronDown className="w-3.5 h-3.5 opacity-75 group-hover/apps:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-0 pt-2.5 opacity-0 invisible group-hover/apps:opacity-100 group-hover/apps:visible transition-all duration-200 w-[400px] whitespace-normal">
                  <div className="rounded-2xl p-3 flex flex-col gap-2 border border-amber-500/20 shadow-[0_24px_60px_rgba(0,0,0,0.85)] bg-[#080c16]/98 backdrop-blur-2xl">
                    <div className="px-2 pt-1 pb-1.5 flex items-center justify-between border-b border-white/[0.06]">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400/90">
                        Proprietary Contractor Apps
                      </span>
                      <span className="text-[10px] text-slate-400">Built in Jackson, MS</span>
                    </div>
                    {appLinks.map((app) => {
                      const Icon = app.icon;
                      return (
                        <Link
                          key={app.name}
                          href={app.href}
                          prefetch={false}
                          className="group/item p-3 rounded-xl hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all flex items-start gap-3.5"
                        >
                          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${app.accent}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-bold text-white group-hover/item:text-amber-300 transition-colors">
                                {app.name}
                              </span>
                              <span className="text-[9px] font-mono font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/25">
                                {app.tag}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-snug">{app.desc}</p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover/item:text-amber-400 transition-colors shrink-0 mt-1" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Services Dropdown */}
              <div className="relative group/services py-2">
                <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                  Services
                  <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover/services:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 opacity-0 invisible group-hover/services:opacity-100 group-hover/services:visible transition-all duration-200 w-[340px] whitespace-normal">
                  <div className="rounded-2xl p-2.5 flex flex-col gap-1 border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.85)] bg-[#080c16]/98 backdrop-blur-2xl">
                    {serviceLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          prefetch={false}
                          className="p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors flex items-start gap-3 group/s"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 group-hover/s:text-amber-400 group-hover/s:border-amber-500/30 transition-colors shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover/s:text-amber-300 transition-colors">
                              {link.name}
                            </div>
                            <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                              {link.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {mainLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={false}
                  className={
                    link.highlight
                      ? "text-sm font-bold text-amber-300 hover:text-amber-200 transition-colors"
                      : "text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  }
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 whitespace-nowrap shrink-0">
              <a
                href="tel:6014462393"
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-200 hover:text-amber-300 bg-white/[0.04] border border-white/10 hover:border-amber-500/40 rounded-full transition-all shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>(601) 446-2393</span>
              </a>

              <Link
                href="/free-audit"
                prefetch={false}
                className="px-4 xl:px-5 py-2.5 text-xs font-black text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-[0_0_24px_rgba(245,158,11,0.3)] uppercase tracking-wider shrink-0"
              >
                Free Rank Check
              </Link>

              {isAdmin(user?.email) && (
                <Link
                  href="/admin"
                  prefetch={false}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-400 border border-amber-500/30 hover:bg-amber-500/10 transition-all rounded-full"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Admin
                </Link>
              )}

              <Link
                href={user ? "/dashboard" : "/login"}
                prefetch={false}
                className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-slate-400 hover:text-white transition-all"
              >
                {user ? (
                  <>
                    <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                    Portal
                  </>
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5 text-slate-400" />
                    Login
                  </>
                )}
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/free-audit"
                prefetch={false}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-1.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-wide"
              >
                Free Check
              </Link>
              <button
                className="text-foreground p-2 rounded-full hover:bg-white/5 border border-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* App-Style Horizontal Quick-Jump Strip (1-Tap Page-to-Page Navigation Without Opening Hamburger) */}
          {!hideQuickStrip && !isMobileMenuOpen && (
            <div
              className="lg:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar mt-2 pt-1.5 border-t border-white/[0.06] -mx-3.5 px-3.5"
              aria-label="Mobile quick page switcher"
            >
              {mobileQuickTabs.map((tab) => {
                const TabIcon = tab.icon;
                const active =
                  tab.href === "/"
                    ? pathname === "/"
                    : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    prefetch={false}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                      active
                        ? "bg-amber-400 text-slate-950 font-black shadow-[0_0_14px_rgba(245,158,11,0.3)]"
                        : "bg-white/[0.04] text-slate-300 border border-white/[0.08] active:bg-white/10"
                    }`}
                  >
                    <TabIcon className={`w-3 h-3 shrink-0 ${active ? "text-slate-950" : "text-amber-400"}`} />
                    <span>{tab.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Single-Screen Bento Drawer (Zero Scroll Fatigue, Zero Duplicate Links) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#05070d]/98 backdrop-blur-2xl lg:hidden flex flex-col justify-between pt-18 pb-24 px-4 overflow-y-auto animate-fadeIn">
          <div className="flex flex-col gap-4">
            {/* 1. Proprietary Apps Trio (1-Row Bento) */}
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase px-1 mb-2 block">
                Proprietary Software ($0 Seat Fees)
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "PinDrop™", sub: "GPS SEO Map", href: "/pindrop", icon: MapPin, color: "text-amber-400 bg-amber-500/12 border-amber-500/30" },
                  { name: "PinCam™", sub: "Job Camera", href: "/pincam", icon: Camera, color: "text-indigo-300 bg-indigo-500/15 border-indigo-400/35" },
                  { name: "Watchtower", sub: "24/7 Health", href: "/site-intelligence", icon: Activity, color: "text-cyan-300 bg-cyan-500/12 border-cyan-400/30" },
                ].map((app) => {
                  const AppIcon = app.icon;
                  return (
                    <Link
                      key={app.href}
                      href={app.href}
                      prefetch={false}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col items-start gap-2 active:scale-[0.98]"
                    >
                      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${app.color}`}>
                        <AppIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-white leading-tight">{app.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{app.sub}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 2. Interactive Self-Serve Tools */}
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/estimate"
                prefetch={false}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-amber-500/15 border border-amber-400/40 flex items-center gap-2.5"
              >
                <Calculator className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-black text-amber-300">Instant Pricing</div>
                  <div className="text-[10px] text-slate-300">Ballpark Scope</div>
                </div>
              </Link>
              <Link
                href="/scanner"
                prefetch={false}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-emerald-500/12 border border-emerald-400/35 flex items-center gap-2.5"
              >
                <Search className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-black text-emerald-300">Free Site Scan</div>
                  <div className="text-[10px] text-slate-300">Speed &amp; AI Check</div>
                </div>
              </Link>
            </div>

            {/* 3. Core Services & Proof (Clean 2x3 Grid) */}
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase px-1 mb-2 block">
                Services &amp; Proof
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Contractors", href: "/contractors", icon: Hammer },
                  { name: "Web Design", href: "/web-design", icon: Globe },
                  { name: "Map Pack SEO", href: "/local-seo", icon: TrendingUp },
                  { name: "CRM & Square", href: "/custom-applications", icon: Workflow },
                  { name: "Our Work", href: "/our-work", icon: Briefcase },
                  { name: "5.0★ Reviews", href: "/reviews", icon: Star },
                ].map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch={false}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2 text-xs font-bold text-white active:bg-white/10"
                    >
                      <span className="inline-flex items-center gap-2 truncate">
                        <ItemIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Utility & Primary CTA */}
          <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col gap-2.5 shrink-0">
            <div className="grid grid-cols-3 gap-2">
              <Link
                href="/about"
                prefetch={false}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 text-center text-[11px] font-bold text-slate-200 bg-white/[0.04] border border-white/10 rounded-xl"
              >
                About Damein
              </Link>
              <Link
                href="/book"
                prefetch={false}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 text-center text-[11px] font-bold text-slate-200 bg-white/[0.04] border border-white/10 rounded-xl"
              >
                Book 15m Call
              </Link>
              <Link
                href={user ? "/dashboard" : "/login"}
                prefetch={false}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 text-center text-[11px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/25 rounded-xl"
              >
                {user ? "Portal" : "Client Login"}
              </Link>
            </div>

            {isAdmin(user?.email) && (
              <Link
                href="/admin"
                className="w-full py-2.5 text-center text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Terminal className="w-4 h-4" />
                Admin Studio
              </Link>
            )}

            <Link
              href="/free-audit"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3.5 text-center text-xs font-black uppercase tracking-widest text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-xl shadow-[0_0_26px_rgba(245,158,11,0.3)]"
            >
              Get Free 5-Min Rank &amp; Site Video →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
