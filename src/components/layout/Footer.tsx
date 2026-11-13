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
    <footer className="relative pt-20 pb-28 lg:pb-12 overflow-hidden border-t border-white/10 bg-[#04060b]">
      <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="grid gap-10 mb-14 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center mb-5 group w-fit">
              <div className="relative flex items-center h-13 w-60">
                <Image
                  src="/images/pdm-logo-transparent.png"
                  alt="Power Digital Media LLC"
                  fill
                  unoptimized
                  className="object-contain object-left group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>
            <p className="max-w-sm text-sm text-slate-400 leading-relaxed mb-6">
              High-converting websites, Google Map Pack SEO, and proprietary{" "}
              <strong className="text-slate-200">PinCam™ + PinDrop™</strong> field software engineered in Jackson, Mississippi for contractors &amp; local businesses.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a
                href="https://instagram.com/powerdigitalmedia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@powerdigitalmedia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to our YouTube channel"
                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/powerdigitalms"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X"
                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/PowerDigitalMediaLLC"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@powerdigitalmedia.org"
                aria-label="Send us an email"
                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <BBBSeal variant="badge" />
          </div>

          {/* Solutions & Apps */}
          <div className="lg:col-span-3">
            <h4 className="font-mono font-bold mb-5 uppercase tracking-widest text-[11px] text-amber-400">
              Apps &amp; Services
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/pincam" className="hover:text-amber-300 transition-colors font-semibold text-white">
                  PinCam™ Field Camera App
                </Link>
              </li>
              <li>
                <Link href="/pindrop" className="hover:text-amber-300 transition-colors font-semibold text-white">
                  PinDrop™ Local SEO Engine
                </Link>
              </li>
              <li>
                <Link href="/site-intelligence" className="hover:text-amber-300 transition-colors font-semibold text-cyan-300">
                  PDM Site Intelligence™ Watchtower
                </Link>
              </li>
              <li>
                <Link href="/contractors" className="hover:text-amber-300 transition-colors">
                  Contractor Growth Websites
                </Link>
              </li>
              <li>
                <Link href="/web-design" className="hover:text-amber-300 transition-colors">
                  Custom Next.js Web Design
                </Link>
              </li>
              <li>
                <Link href="/local-seo" className="hover:text-amber-300 transition-colors">
                  Local SEO &amp; Google Map Pack
                </Link>
              </li>
              <li>
                <Link href="/custom-applications" className="hover:text-amber-300 transition-colors">
                  CRM &amp; Online Ordering Systems
                </Link>
              </li>
              <li>
                <Link href="/our-work" className="hover:text-amber-300 transition-colors">
                  Live Client Portfolio
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-amber-300 transition-colors">
                  Verified 5.0★ Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Central MS SEO Service Areas */}
          <div className="lg:col-span-2">
            <h4 className="font-mono font-bold mb-5 uppercase tracking-widest text-[11px] text-amber-400">
              Service Areas
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/locations/jackson-ms" className="hover:text-amber-300 transition-colors">
                  Jackson, MS
                </Link>
              </li>
              <li>
                <Link href="/locations/madison-ms" className="hover:text-amber-300 transition-colors">
                  Madison, MS
                </Link>
              </li>
              <li>
                <Link href="/locations/ridgeland-ms" className="hover:text-amber-300 transition-colors">
                  Ridgeland, MS
                </Link>
              </li>
              <li>
                <Link href="/locations/brandon-ms" className="hover:text-amber-300 transition-colors">
                  Brandon, MS
                </Link>
              </li>
              <li>
                <Link href="/locations/flowood-ms" className="hover:text-amber-300 transition-colors">
                  Flowood, MS
                </Link>
              </li>
              <li>
                <Link href="/locations/clinton-ms" className="hover:text-amber-300 transition-colors">
                  Clinton, MS
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-mono font-bold mb-5 uppercase tracking-widest text-[11px] text-amber-400">
              Direct Jackson Studio
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  2914 Cynthia Rd.
                  <br />
                  Jackson, MS 39209
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:6014462393" className="font-bold text-white hover:text-amber-300 transition-colors">
                  (601) 446-2393
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:info@powerdigitalmedia.org" className="hover:text-amber-300 transition-colors">
                  info@powerdigitalmedia.org
                </a>
              </li>
              <li className="pt-2 flex flex-col gap-2">
                <Link
                  href="/free-audit"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all"
                >
                  Free 5-Min Rank Check
                </Link>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Schedule 15-Min Call
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© {currentYear} Power Digital Media LLC. Engineered in Jackson, Mississippi.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/privacy" className="hover:text-amber-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-amber-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="hover:text-amber-300 transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </footer>
  );
}
