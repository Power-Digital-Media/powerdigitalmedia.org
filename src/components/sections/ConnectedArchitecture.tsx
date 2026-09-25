"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Truck,
  Utensils,
  Calculator,
  MapPin,
  Database,
  Mail,
  Youtube,
  Search,
  HeartHandshake,
  Video,
  Calendar,
  ArrowRight,
  ExternalLink,
  Star,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowUpRight,
  Home,
  Users,
  Smartphone,
  Monitor,
  Radio,
  ShoppingBag,
  Heart,
  ShieldAlert,
  Wifi,
  Battery,
} from "lucide-react";

interface IntegrationNode {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  screenshot?: string;
  mobileScreenshot?: string;
  pagePath: string;
  techTag: string;
  displayType?: "image" | "pindrop-map" | "capsule-crm" | "transpond-flow" | "google-schema";
}

interface ClientArchitecture {
  id: string;
  name: string;
  shortName: string;
  industry: string;
  location: string;
  domain: string;
  url: string;
  heroImage: string;
  mobileHeroImage?: string;
  speedScore: string;
  headline: string;
  summary: string;
  accentColor: string;
  glowRgb: string;
  caseStudySlug?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    source: "Google" | "Facebook" | "BBB";
  };
  nodes: IntegrationNode[];
}

const clientArchitectures: ClientArchitecture[] = [
  {
    id: "tbeaux",
    caseStudySlug: "tbeaux",
    name: "T'Beaux's Seafood & Catering",
    shortName: "T'Beaux's Seafood",
    industry: "Restaurant & High-Volume Catering",
    location: "Clinton, MS",
    domain: "tbeauxs.com",
    url: "https://tbeauxs.com",
    heroImage: "/portfolio/tbeauxs-hero.webp",
    mobileHeroImage: "/portfolio/tbeauxs-mobile-hero-fresh.webp",
    speedScore: "98/100 (0.4s)",
    headline: "Zero-Redirect Square SDK & Direct Delivery Hub",
    summary:
      "Engineered an integrated ordering portal for Clinton's favorite Cajun spot. Rather than losing 15-30% fees and bouncing customers to generic Square storefronts, customers customize platters, calculate bulk catering needs, and pay in-app.",
    accentColor: "text-red-400",
    glowRgb: "239, 68, 68",
    nodes: [
      {
        id: "square-sdk",
        title: "Square SDK In-App Checkout",
        category: "Payment Processing",
        badge: "Zero 3rd-Party Redirects",
        description:
          "Customers customize catfish baskets, platters, and sides, checking out directly on tbeauxs.com with native Square Web SDK tokens. No clunky external Square hops.",
        icon: CreditCard,
        iconColor: "text-amber-400",
        iconBg: "bg-amber-500/10 border-amber-500/30",
        screenshot: "/portfolio/tbeauxs-checkout-user-v2.webp",
        mobileScreenshot: "/portfolio/tbeauxs-checkout-user-phone.webp",
        pagePath: "/secure-checkout",
        techTag: "Square Web Payments SDK",
        displayType: "image",
      },
      {
        id: "custom-menu",
        title: "Dynamic Cajun Menu Customizer",
        category: "Interactive UI",
        badge: "Live Menu & Modifiers",
        description:
          "Interactive mobile menu with live daily crawfish boil pricing, custom platter modifiers, and instant cart synchronization with kitchen printers.",
        icon: Utensils,
        iconColor: "text-red-400",
        iconBg: "bg-red-500/10 border-red-500/30",
        screenshot: "/portfolio/tbeauxs-menu-user-v2.webp",
        mobileScreenshot: "/portfolio/tbeauxs-menu-user-phone.webp",
        pagePath: "/menu/cajun-platters",
        techTag: "React Component Engine",
        displayType: "image",
      },
      {
        id: "doordash",
        title: "DoorDash Fleet Integration",
        category: "Logistics & Delivery",
        badge: "Direct Delivery Dispatch",
        description:
          "Wired direct delivery routing allowing customers to order directly from the website while automatically dispatching nearby DoorDash drivers for delivery.",
        icon: Truck,
        iconColor: "text-orange-400",
        iconBg: "bg-orange-500/10 border-orange-500/30",
        screenshot: "/portfolio/tbeauxs-delivery-user-v2.webp",
        mobileScreenshot: "/portfolio/tbeauxs-delivery-mobile.webp",
        pagePath: "/delivery-dispatch",
        techTag: "DoorDash Drive Dispatch",
        displayType: "image",
      },
      {
        id: "feast-planner",
        title: "Cajun Feast Catering Engine",
        category: "Business Logic",
        badge: "Automated Quote Engine",
        description:
          "Interactive catering calculation tool that estimates exact crawfish poundage, jumbo shrimp, smoked sausage, and side requirements based on guest headcount.",
        icon: Calculator,
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/10 border-cyan-500/30",
        screenshot: "/portfolio/tbeauxs-planner-user-v2.webp",
        mobileScreenshot: "/portfolio/tbeauxs-planner-user-phone.webp",
        pagePath: "/feast-planner",
        techTag: "Custom Event Estimation Engine",
        displayType: "image",
      },
    ],
  },
  {
    id: "born-again",
    caseStudySlug: "born-again-roofing",
    name: "Born Again Roofing & Remodeling",
    shortName: "Born Again Roofing",
    industry: "Contracting & Storm Restoration",
    location: "Jackson Metro, MS",
    domain: "bornagainroofing.com",
    url: "https://bornagainroofing.com",
    heroImage: "/portfolio/bornagain-hero.webp",
    mobileHeroImage: "/portfolio/bornagain-mobile-hero.webp",
    speedScore: "99/100 (0.3s)",
    headline: "Field GPS Project Mapping & CRM Review Pipeline",
    summary:
      "Replaced a slow legacy site with a high-velocity contractor portal. Every roofing crew is equipped with PinDrop™ to log completed jobs on the map, automatically routing customer records to Capsule CRM and dispatching 5-star review SMS requests.",
    accentColor: "text-yellow-400",
    glowRgb: "234, 179, 8",
    testimonial: {
      quote:
        "Power Digital Media completely transformed our online presence and pipeline. The PinDrop map lets our crews drop pins right from the jobsite and our Google rankings jumped immediately.",
      author: "Born Again Roofing Team",
      role: "Brandon, MS",
      source: "Google",
    },
    nodes: [
      {
        id: "pindrop",
        title: "PinDrop™ GPS Field App",
        category: "Field Automation",
        badge: "99+ Live Job Pins",
        description:
          "Field crews take a before/after photo on their phone and drop a GPS pin. The job instantly posts to the website's live interactive project map.",
        icon: MapPin,
        iconColor: "text-yellow-400",
        iconBg: "bg-yellow-500/10 border-yellow-500/30",
        pagePath: "/recent-projects-map",
        techTag: "PinDrop™ Contractor GPS",
        displayType: "pindrop-map",
      },
      {
        id: "capsule-crm",
        title: "Capsule CRM Lead Pipeline",
        category: "CRM & Operations",
        badge: "Instant Lead Capture",
        description:
          "Every webform quote and phone click writes directly to Capsule CRM, creating customer cards, assigning estimators, and tracking job values.",
        icon: Database,
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/10 border-emerald-500/30",
        pagePath: "/pipeline/born-again-roofing",
        techTag: "Capsule CRM REST API",
        displayType: "capsule-crm",
      },
      {
        id: "transpond-email",
        title: "Transpond Automated Follow-Ups",
        category: "Email Marketing",
        badge: "Automated SMS/Email",
        description:
          "Automated follow-up drip campaigns for pending estimates and post-completion SMS review triggers that route homeowners directly to Google reviews.",
        icon: Mail,
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/10 border-cyan-500/30",
        pagePath: "/automations/roofing-nurture",
        techTag: "Transpond Automation Pipeline",
        displayType: "transpond-flow",
      },
      {
        id: "google-geo",
        title: "Google Local Geo-Schema",
        category: "Search Engine Dominance",
        badge: "#1 Metro Ranking",
        description:
          "Deep JSON-LD structured schema mapping service radiuses across Jackson, Madison, Brandon, Clinton, and Flowood for high-intent homeowner search.",
        icon: Search,
        iconColor: "text-blue-400",
        iconBg: "bg-blue-500/10 border-blue-500/30",
        pagePath: "/search?q=roofing+contractor+brandon+ms",
        techTag: "Schema.org GeoCoordinates",
        displayType: "google-schema",
      },
    ],
  },
  {
    id: "geaux-pro",
    caseStudySlug: "geaux-pro-outdoors",
    name: "Geaux Pro Outdoors (MS Dirt)",
    shortName: "Geaux Pro Outdoors",
    industry: "Excavation, Pond Digging & Land Clearing",
    location: "Bentonia & Central MS",
    domain: "msdirt.com",
    url: "https://msdirt.com",
    heroImage: "/portfolio/geauxpro-hero.webp",
    mobileHeroImage: "/portfolio/geauxpro-mobile-hero.webp",
    speedScore: "99/100 (0.4s)",
    headline: "Heavy Equipment Lead Engine & Video Automation",
    summary:
      "A commercial earthmoving platform engineered to capture high-value land clearing and hauling inquiries across Central Mississippi and the Delta.",
    accentColor: "text-amber-400",
    glowRgb: "245, 158, 11",
    testimonial: {
      quote:
        "Took my marketing program from the dumps all the way to the moon. Very responsive and results oriented. I highly recommend!!!",
      author: "Scott Lowery",
      role: "Owner, Geaux Pro Outdoors (Bentonia, MS)",
      source: "Google",
    },
    nodes: [
      {
        id: "capsule-geaux",
        title: "Capsule CRM Inquiry Sync",
        category: "Commercial CRM",
        badge: "High-Ticket Lead Tracking",
        description:
          "Commercial hauling requests, pond digging inquiries, and land clearing leads automatically log to Capsule CRM with acreage and equipment tags.",
        icon: Database,
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/10 border-emerald-500/30",
        pagePath: "/pipeline/geaux-pro-excavation",
        techTag: "Capsule CRM Pipeline",
        displayType: "capsule-crm",
      },
      {
        id: "transpond-geaux",
        title: "Transpond Lead Nurture",
        category: "Email & SMS",
        badge: "Instant Quote Alerts",
        description:
          "Instant automated quote confirmations sent to landowners with automated follow-ups ensuring zero missed estimates.",
        icon: Mail,
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/10 border-cyan-500/30",
        pagePath: "/automations/dirtwork-quotes",
        techTag: "Transpond Lead Pipelines",
        displayType: "transpond-flow",
      },
      {
        id: "pindrop-geaux",
        title: "PinDrop™ Project Verification",
        category: "Proof Mapping",
        badge: "Verified Machinery Pins",
        description:
          "Live GPS project mapping showing active pond digging, site preparation, and commercial dozer work across Yazoo City and Bentonia.",
        icon: MapPin,
        iconColor: "text-amber-400",
        iconBg: "bg-amber-500/10 border-amber-500/30",
        pagePath: "/machinery-projects-map",
        techTag: "PinDrop™ Field Engine",
        displayType: "pindrop-map",
      },
      {
        id: "youtube-automation",
        title: "YouTube Video Showcase Feed",
        category: "Content Automation",
        badge: "Heavy Machinery 4K Video",
        description:
          "Automated YouTube video feeds displaying real excavator and forestry mulching operations directly on the website for undeniable visual proof.",
        icon: Youtube,
        iconColor: "text-red-500",
        iconBg: "bg-red-500/10 border-red-500/30",
        screenshot: "/portfolio/geauxpro-video-widescreen-v3.webp",
        mobileScreenshot: "/portfolio/geauxpro-video-mobile-user.webp",
        pagePath: "/video-showcase",
        techTag: "YouTube API Integration",
        displayType: "image",
      },
    ],
  },
  {
    id: "church-244",
    caseStudySlug: "simmons-memorial",
    name: "Church 244 & Simmons Memorial",
    shortName: "Church 244",
    industry: "Faith, Ministry & Community",
    location: "Richland & Jackson, MS",
    domain: "church244.com",
    url: "https://church244.com",
    heroImage: "/portfolio/church244-hero.webp",
    mobileHeroImage: "/portfolio/church244-mobile-hero.webp",
    speedScore: "98/100 (0.4s)",
    headline: "1-Tap Online Giving & Live Broadcast Hub",
    summary:
      "Clean digital portals designed for Central Mississippi ministries to engage congregations, process tithes with zero friction on mobile, and livestream sermons.",
    accentColor: "text-cyan-400",
    glowRgb: "6, 182, 212",
    testimonial: {
      quote:
        "Power Digital Media is my go to company for all of my media needs, including our church website. He was very attentive to detail and met or surpassed every single request.",
      author: "Josh Watts",
      role: "Pastor, Church 244 (Jackson, MS)",
      source: "Facebook",
    },
    nodes: [
      {
        id: "online-giving",
        title: "1-Tap Secure Online Giving",
        category: "Donation Processing",
        badge: "Mobile Frictionless Giving",
        description:
          "Frictionless tithe and donation processing engineered for rapid smartphone giving during services with instant receipts.",
        icon: HeartHandshake,
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/10 border-cyan-500/30",
        screenshot: "/portfolio/church244-giving.webp",
        mobileScreenshot: "/portfolio/church244-giving-user-phone.webp",
        pagePath: "/give-online",
        techTag: "Secure Giving Gateway",
        displayType: "image",
      },
      {
        id: "sermon-streams",
        title: "Sermon Livestream Archive",
        category: "Media Broadcast",
        badge: "High-Definition Video",
        description:
          "Integrated video broadcast archive allowing members to stream Sunday messages and series without intrusive ads or buffering.",
        icon: Video,
        iconColor: "text-blue-400",
        iconBg: "bg-blue-500/10 border-blue-500/30",
        screenshot: "/portfolio/church244-sermons-user-v2.webp",
        mobileScreenshot: "/portfolio/church244-sermons-user-phone.webp",
        pagePath: "/watch-sermons",
        techTag: "YouTube Live Integration",
        displayType: "image",
      },
      {
        id: "community-events",
        title: "Community Calendar",
        category: "Congregation Engagement",
        badge: "Church Center Sync",
        description:
          "Live event calendar integrated with Church Center for seamless registration for Youth Nights, Sunday worship, and weekly Bible studies.",
        icon: Calendar,
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/10 border-emerald-500/30",
        screenshot: "/portfolio/church244-events-user-v2.webp",
        mobileScreenshot: "/portfolio/church244-events-user-phone.webp",
        pagePath: "/events",
        techTag: "Church Center Integration",
        displayType: "image",
      },
      {
        id: "youth-ministry",
        title: "Youth Ministry Hub",
        category: "Next-Gen Ministry",
        badge: "Ages 13–19 Community",
        description:
          "Dedicated teen ministry hub featuring weekly Thursday 6:30 PM worship schedules, Bible study groups, and community social sync.",
        icon: Users,
        iconColor: "text-amber-400",
        iconBg: "bg-amber-500/10 border-amber-500/30",
        screenshot: "/portfolio/church244-youth-user-v2.webp",
        mobileScreenshot: "/portfolio/church244-youth-user-phone.webp",
        pagePath: "/ministries/youth",
        techTag: "Social & Community Sync",
        displayType: "image",
      },
    ],
  },
  {
    id: "blacksheep-recovery",
    caseStudySlug: "blacksheep-recovery",
    name: "Black Sheep Recovery Warfare",
    shortName: "Black Sheep",
    industry: "Faith, Media & Addiction Recovery",
    location: "Jackson Metro & Mississippi",
    domain: "blacksheeprecoverywarfare.com",
    url: "https://blacksheeprecoverywarfare.com",
    heroImage: "/portfolio/blacksheep-hero.webp",
    mobileHeroImage: "/portfolio/blacksheep-mobile-hero.webp",
    speedScore: "99/100 (0.3s)",
    headline: "Video Podcast Engine & Tactical Merch E-Commerce Hub",
    summary:
      "Engineered a high-octane digital battleground for an addiction recovery ministry. Combines video episode broadcasting, integrated merchandise ordering, direct donor funding, and instant crisis helpline directories.",
    accentColor: "text-orange-400",
    glowRgb: "249, 115, 22",
    nodes: [
      {
        id: "podcast-engine",
        title: "Podcast Broadcast Engine",
        category: "Media Broadcast",
        badge: "Video & Audio Sync",
        description:
          "High-definition video/audio episode player with timestamps, show notes, and direct integration with Spotify and Apple Podcasts.",
        icon: Radio,
        iconColor: "text-orange-400",
        iconBg: "bg-orange-500/10 border-orange-500/30",
        screenshot: "/portfolio/blacksheep-episodes.webp",
        mobileScreenshot: "/portfolio/blacksheep-episodes-mobile.webp",
        pagePath: "/episodes",
        techTag: "Media Streaming Engine",
        displayType: "image",
      },
      {
        id: "merch-store",
        title: "Tactical Merch & Apparel Store",
        category: "Custom E-Commerce",
        badge: "Direct In-App Store",
        description:
          "Custom tactical apparel and gear store with sizing selection, cart state management, and direct in-app checkout.",
        icon: ShoppingBag,
        iconColor: "text-amber-400",
        iconBg: "bg-amber-500/10 border-amber-500/30",
        screenshot: "/portfolio/blacksheep-merch.webp",
        mobileScreenshot: "/portfolio/blacksheep-merch-mobile.webp",
        pagePath: "/merch",
        techTag: "Custom E-Commerce",
        displayType: "image",
      },
      {
        id: "donor-portal",
        title: "Direct Giving & Sponsorship Hub",
        category: "Donation Processing",
        badge: "Frictionless Giving",
        description:
          "Frictionless recurring and one-time donor portal designed to fund recovery outreach, community rallies, and crisis aid.",
        icon: Heart,
        iconColor: "text-red-400",
        iconBg: "bg-red-500/10 border-red-500/30",
        screenshot: "/portfolio/blacksheep-donate.webp",
        mobileScreenshot: "/portfolio/blacksheep-donate-mobile.webp",
        pagePath: "/donate",
        techTag: "Direct Giving Gateway",
        displayType: "image",
      },
      {
        id: "crisis-directory",
        title: "Emergency Crisis Support Network",
        category: "Community Support",
        badge: "24/7 Crisis Helplines",
        description:
          "Instant-access helpline directory and vetted recovery center roadmaps connecting individuals in active addiction to immediate local help.",
        icon: ShieldAlert,
        iconColor: "text-yellow-400",
        iconBg: "bg-yellow-500/10 border-yellow-500/30",
        screenshot: "/portfolio/blacksheep-resources.webp",
        mobileScreenshot: "/portfolio/blacksheep-resources-mobile.webp",
        pagePath: "/resources",
        techTag: "Crisis Support Network",
        displayType: "image",
      },
    ],
  },
];

// --- Custom Interactive System Screen Renderers for Backend / Automation Cards ---

function PinDropMapScreen({ client }: { client: ClientArchitecture }) {
  const isGeaux = client.id === "geaux-pro";
  const locations = isGeaux
    ? [
        { name: "Yazoo City, MS", x: "32%", y: "28%", active: true, tag: "15-Acre Forestry Mulching", crew: "Crew #1 (CAT 320)" },
        { name: "Bentonia, MS", x: "48%", y: "45%", active: false, tag: "Pond Excavation", crew: "Crew #2" },
        { name: "Flora, MS", x: "65%", y: "58%", active: false, tag: "Land Clearing", crew: "Crew #1" },
        { name: "Canton, MS", x: "78%", y: "38%", active: false, tag: "Site Prep & Hauling", crew: "Crew #3" },
      ]
    : [
        { name: "Madison, MS", x: "35%", y: "25%", active: false, tag: "4,200 sq ft Architectural", crew: "Crew #1" },
        { name: "Flowood, MS", x: "62%", y: "48%", active: true, tag: "38-Square GAF Timberline HDZ", crew: "Crew #2" },
        { name: "Brandon, MS", x: "78%", y: "65%", active: false, tag: "Storm Damage Metal Roof", crew: "Crew #3" },
        { name: "Jackson, MS", x: "42%", y: "55%", active: false, tag: "Deck & Ridge Vent Repair", crew: "Crew #1" },
        { name: "Clinton, MS", x: "22%", y: "60%", active: false, tag: "Residential Re-Roof", crew: "Crew #2" },
      ];

  const activeLoc = locations.find((l) => l.active) || locations[0];

  return (
    <div className="relative w-full h-full bg-[#080e1a] flex flex-col overflow-hidden select-none">
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-white/10 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
            PinDrop™ Live Project Telemetry
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full font-bold">
            99+ Active Verified Job Pins
          </span>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
            Central MS Radar
          </span>
        </div>
      </div>

      {/* Interactive Map Grid Canvas */}
      <div className="relative flex-1 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] overflow-hidden">
        {/* Topographic Map Rings / Radar Waves */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[320px] h-[320px] rounded-full border border-yellow-500/40 animate-pulse" />
          <div className="absolute w-[480px] h-[480px] rounded-full border border-cyan-500/20" />
        </div>

        {/* Map Pins */}
        {locations.map((loc, i) => (
          <div
            key={i}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
            style={{ left: loc.x, top: loc.y }}
          >
            {loc.active ? (
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-yellow-400/30 animate-ping" />
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-300 border-2 border-slate-950 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.8)]">
                  <MapPin className="w-4 h-4 text-slate-950" />
                </div>
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
              </div>
            )}
            <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[9px] font-mono whitespace-nowrap px-1.5 py-0.5 rounded bg-slate-950/80 text-slate-300 border border-white/10">
              {loc.name}
            </span>
          </div>
        ))}

        {/* Open Pin Callout Card (Centered/Top-Left) */}
        <div className="absolute top-4 left-4 max-w-[260px] sm:max-w-[300px] p-3 rounded-xl bg-slate-950/95 border border-yellow-500/50 shadow-2xl backdrop-blur-md z-20">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-yellow-400" />
              Verified Completed Job
            </span>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/30">
              Today
            </span>
          </div>
          <h5 className="text-xs font-black text-white leading-snug mb-1">
            {activeLoc.tag}
          </h5>
          <p className="text-[10px] text-slate-300 mb-2">
            📍 {activeLoc.name} • {activeLoc.crew}
          </p>
          <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-white/10 text-[9px] font-mono">
            <div className="flex items-center gap-1 text-cyan-300">
              <span>📸 4 Geotagged Photos</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400">
              <span>⭐ 5-Star SMS Sent</span>
            </div>
          </div>
        </div>

        {/* In-Truck Mobile App Inset (Bottom Right Phone Mockup) */}
        <div className="absolute bottom-3 right-3 w-[155px] sm:w-[175px] rounded-xl bg-slate-950 border-2 border-white/20 p-2 shadow-2xl z-20">
          <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/10">
            <span className="text-[8px] font-mono font-bold text-yellow-400 uppercase tracking-wider">
              PinDrop™ Field App
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="bg-slate-900 rounded-lg p-1.5 mb-1.5 text-center border border-white/5">
            <div className="w-full h-10 bg-slate-800 rounded flex items-center justify-center text-[9px] text-slate-400 font-mono mb-1">
              📷 Roof Photo Captured
            </div>
            <div className="w-full py-1 bg-yellow-400 rounded text-slate-950 text-[9px] font-black uppercase tracking-wider">
              📍 Drop Pin
            </div>
          </div>
          <p className="text-[8px] font-mono text-cyan-300 text-center">
            ⚡ Synced to website in 0.1s
          </p>
        </div>
      </div>
    </div>
  );
}

function CapsuleCRMScreen({ client }: { client: ClientArchitecture }) {
  const isGeaux = client.id === "geaux-pro";
  const columns = isGeaux
    ? [
        {
          name: "Inbound Quote (3)",
          color: "border-cyan-500/40",
          deals: [
            { client: "Delta Land Holdings", job: "25-Acre Forestry Mulching", val: "$34,000", tag: "Website Form" },
            { client: "Yazoo Farm Co.", job: "3-Acre Pond Excavation", val: "$18,500", tag: "Phone Call" },
          ],
        },
        {
          name: "Site Assessment (2)",
          color: "border-amber-500/40",
          deals: [
            { client: "Scott Lowery", job: "Dozer & Road Prep", val: "$12,800", tag: "Scheduled" },
          ],
        },
        {
          name: "Won & Dispatched ($54.2k)",
          color: "border-emerald-500/40",
          deals: [
            { client: "Bentonia Commercial", job: "Highway Clearing", val: "$42,000", tag: "Active Machinery" },
          ],
        },
      ]
    : [
        {
          name: "Inbound Leads (4)",
          color: "border-cyan-500/40",
          deals: [
            { client: "John Miller (Madison)", job: "4,200 sq ft Shingle Tear-Off", val: "$16,500", tag: "Web Quote Form" },
            { client: "Sarah Jenkins (Flowood)", job: "Full Metal Roof Upgrade", val: "$22,400", tag: "Webform Inbound" },
          ],
        },
        {
          name: "Inspection Dispatched (2)",
          color: "border-amber-500/40",
          deals: [
            { client: "Robert Davis (Brandon)", job: "Ridge Vent & Storm Repair", val: "$3,800", tag: "Estimator En Route" },
          ],
        },
        {
          name: "Won & Scheduled ($68.5k)",
          color: "border-emerald-500/40",
          deals: [
            { client: "Keith Adams (Clinton)", job: "Architectural Re-Roof", val: "$19,200", tag: "Deposit Received" },
          ],
        },
      ];

  return (
    <div className="relative w-full h-full bg-[#090e1a] flex flex-col overflow-hidden select-none p-4 font-sans">
      {/* CRM Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-black text-white uppercase tracking-wider">
              Capsule CRM Pipeline
            </span>
            <span className="text-[10px] text-slate-400 font-mono ml-2">
              • {client.shortName}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
            ⚡ REST API Sync: 0.2s
          </span>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-3 gap-3 flex-1 overflow-hidden">
        {columns.map((col, idx) => (
          <div key={idx} className="flex flex-col bg-slate-900/60 rounded-xl p-2 border border-white/10">
            <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10">
              <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                {col.name}
              </span>
            </div>
            <div className="flex flex-col gap-2 flex-1 overflow-hidden">
              {col.deals.map((deal, dIdx) => (
                <div
                  key={dIdx}
                  className={`p-2.5 rounded-lg bg-slate-950/90 border transition-all ${
                    idx === 0 && dIdx === 0
                      ? "border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                      : "border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-white truncate">
                      {deal.client}
                    </span>
                    <span className="text-[10px] font-mono font-black text-amber-400">
                      {deal.val}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 line-clamp-1 mb-1.5">
                    {deal.job}
                  </p>
                  <span className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-cyan-400 border border-cyan-500/30">
                    {deal.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Real-time sync ticker at bottom */}
      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1 text-emerald-400 font-bold">
          <CheckCircle2 className="w-3 h-3" />
          Live Hook: Website Form ➔ Capsule Deal Created Instantly
        </span>
        <span className="text-cyan-400 hidden sm:inline">0 Missed Inquiries</span>
      </div>
    </div>
  );
}

function TranspondWorkflowScreen({ client }: { client: ClientArchitecture }) {
  const isGeaux = client.id === "geaux-pro";
  const steps = isGeaux
    ? [
        { title: "Trigger: Inbound Dirt Quote", desc: "Acreage & Equipment selection received on msdirt.com", time: "Instant" },
        { title: "SMS Confirmation", desc: "'Hi! Got your forestry clearing request. Estimator is reviewing.'", time: "< 60s" },
        { title: "Material / Machine PDF", desc: "Automated CAT machinery capabilities sent to landowner", time: "+ 2 Hours" },
        { title: "5-Star Review Trigger", desc: "SMS review link dispatched upon job completion", time: "Post-Job" },
      ]
    : [
        { title: "Trigger: Free Roof Quote", desc: "Homeowner submits form on bornagainroofing.com", time: "Instant" },
        { title: "Instant SMS Confirmation", desc: "'Hi John, Keith here from Born Again. We received your request!'", time: "< 60s" },
        { title: "Warranty & Material PDF", desc: "Automated GAF shingle guide & warranty overview email", time: "+ 24 Hours" },
        { title: "Google 5-Star Review SMS", desc: "1-Tap direct Google review link dispatched after final inspection", time: "Post-Job" },
      ];

  return (
    <div className="relative w-full h-full bg-[#080d19] flex flex-col overflow-hidden select-none p-4 font-sans">
      {/* Workflow Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div>
            <span className="text-xs font-black text-white uppercase tracking-wider">
              Transpond Automation Engine
            </span>
            <span className="text-[10px] text-slate-400 font-mono ml-2">
              • {client.shortName}
            </span>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-bold">
          ⭐ 68% Review Conversion Rate
        </span>
      </div>

      {/* Sequential Automation Nodes */}
      <div className="grid grid-cols-4 gap-2 flex-1 items-center">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex flex-col h-full justify-between p-2.5 rounded-xl bg-slate-900/80 border border-white/10 group hover:border-cyan-400 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-mono font-bold flex items-center justify-center">
                {idx + 1}
              </span>
              <span className="text-[8px] font-mono uppercase text-slate-400 bg-white/5 px-1 py-0.5 rounded">
                {step.time}
              </span>
            </div>
            <h6 className="text-[11px] font-black text-white leading-tight mb-1">
              {step.title}
            </h6>
            <p className="text-[9px] text-slate-300 line-clamp-3 leading-relaxed">
              {step.desc}
            </p>
            <div className="mt-2 pt-1 border-t border-white/10 flex items-center gap-1 text-[8px] font-mono text-emerald-400 font-bold">
              <CheckCircle2 className="w-2.5 h-2.5" /> Automated Active
            </div>
          </div>
        ))}
      </div>

      {/* Bottom KPI bar */}
      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="text-amber-400 font-bold">
          ⚡ 100% Leads Contacted in &lt; 2 mins
        </span>
        <span className="text-slate-400">Automated SMS + Email Sequence Active</span>
      </div>
    </div>
  );
}

function GoogleSchemaScreen({ client }: { client: ClientArchitecture }) {
  return (
    <div className="relative w-full h-full bg-[#0a0f1d] flex flex-col overflow-hidden select-none p-4 font-sans">
      {/* Search Header Bar */}
      <div className="flex items-center gap-3 pb-3 mb-3 border-b border-white/10">
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-white/15 text-xs font-sans text-slate-300">
          <Search className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="truncate">roofing contractor near me (Jackson &amp; Brandon, MS)</span>
        </div>
        <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-1 rounded-full font-bold">
          #1 Local Pack
        </span>
      </div>

      {/* Google Local Pack & SERP Snippet Preview */}
      <div className="flex-1 bg-slate-900/60 rounded-xl p-3 border border-white/10 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-blue-400">
              https://bornagainroofing.com
            </span>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
              JSON-LD Verified
            </span>
          </div>
          <h4 className="text-sm font-black text-white hover:underline cursor-pointer mb-1">
            Born Again Roofing &amp; Remodeling — Jackson &amp; Brandon, MS
          </h4>
          <div className="flex items-center gap-2 text-xs mb-2">
            <div className="flex items-center text-amber-400 text-[11px]">
              {"★★★★★"}
            </div>
            <span className="text-amber-400 font-bold text-xs">5.0</span>
            <span className="text-slate-400 text-[10px]">(47 Google Reviews)</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 text-[10px]">Contractor in Brandon, MS</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Premier residential roofing, storm restoration &amp; remodeling serving Brandon, Madison, Flowood, Jackson &amp; Clinton. GAF Certified with instant online quotes.
          </p>
        </div>

        {/* Schema & Structured Data Telemetry */}
        <div className="p-2.5 rounded-lg bg-slate-950/90 border border-blue-500/30 text-[10px] font-mono">
          <div className="flex items-center justify-between mb-1 text-cyan-300 font-bold">
            <span>⚡ Schema.org / LocalBusiness JSON-LD</span>
            <span className="text-emerald-400">100% Rich Results Health</span>
          </div>
          <p className="text-slate-400 text-[9px]">
            GeoCoordinates: {`{"latitude": "32.2732", "longitude": "-90.0001"}`} • Radius: 50mi Metro
          </p>
        </div>
      </div>

      <div className="mt-2.5 pt-1.5 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>Google Maps &amp; Organic Local Dominance</span>
        <span className="text-emerald-400">Rank #1 in Jackson Metro</span>
      </div>
    </div>
  );
}

function SystemScreenRenderer({
  client,
  node,
}: {
  client: ClientArchitecture;
  node: IntegrationNode;
}) {
  switch (node.displayType) {
    case "pindrop-map":
      return <PinDropMapScreen client={client} />;
    case "capsule-crm":
      return <CapsuleCRMScreen client={client} />;
    case "transpond-flow":
      return <TranspondWorkflowScreen client={client} />;
    case "google-schema":
      return <GoogleSchemaScreen client={client} />;
    case "image":
    default:
      return (
        <Image
          src={node.screenshot || client.heroImage}
          alt={`${client.name} - ${node.title || "Core Website"}`}
          fill
          className="object-cover object-top"
          priority
        />
      );
  }
}

function PhoneMockupFrame({
  client,
  selectedNode,
}: {
  client: ClientArchitecture;
  selectedNode: IntegrationNode | null;
}) {
  const currentMobileSrc = selectedNode
    ? selectedNode.mobileScreenshot || selectedNode.screenshot || client.mobileHeroImage || client.heroImage
    : client.mobileHeroImage || client.heroImage;

  return (
    <div className="relative mx-auto w-full max-w-[290px] sm:max-w-[320px]">
      {/* Outer Titanium Smartphone Chassis with Side Button Notches */}
      <div className="relative rounded-[48px] bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900 p-[3.5px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.18)] border border-slate-500/40">
        
        {/* Left Side Volume Notches */}
        <div className="absolute -left-[5.5px] top-24 w-[3px] h-9 bg-slate-600 rounded-l-sm" />
        <div className="absolute -left-[5.5px] top-36 w-[3px] h-9 bg-slate-600 rounded-l-sm" />
        {/* Right Side Power Notch */}
        <div className="absolute -right-[5.5px] top-28 w-[3px] h-12 bg-slate-600 rounded-r-sm" />

        {/* Inner Phone Screen Container */}
        <div className="relative rounded-[44px] bg-slate-950 overflow-hidden border border-slate-900 aspect-[9/19] flex flex-col justify-between">
          
          {/* Top Speaker & Dynamic Island Status Bar */}
          <div className="relative z-30 pt-3 px-5 pb-2 bg-slate-950/90 backdrop-blur-md flex items-center justify-between text-[10px] font-mono text-white/70 select-none border-b border-white/5">
            <span className="font-bold text-[11px] text-white">9:41</span>
            
            {/* Dynamic Island / Notch */}
            <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center gap-1.5 px-2 shadow-inner border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700 inline-block" />
              <span className="w-1 h-1 rounded-full bg-blue-950 border border-blue-500/40 inline-block" />
            </div>

            <div className="flex items-center gap-1 text-[10px] text-white/70">
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Mini Mobile URL Address Bar */}
          <div className="relative z-20 px-3 py-1.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-[10px] font-mono">
            <div className="flex items-center gap-1 text-slate-300 truncate max-w-[170px]">
              <span className="text-emerald-400 text-[10px]">🔒</span>
              <span className="text-white/40 text-[9px]">https://</span>
              <span className="font-bold text-white text-[10px] truncate">
                {client.domain}{selectedNode?.pagePath ? selectedNode.pagePath : ""}
              </span>
            </div>
            <span className="text-[8px] font-bold text-amber-400 uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 shrink-0">
              {selectedNode ? selectedNode.badge.slice(0, 14) : "9:16 Mobile"}
            </span>
          </div>

          {/* Mobile Screen Glass (9:16 content - 100% Unobstructed Full Screen) */}
          <div className="relative flex-1 w-full bg-slate-950 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${client.id}-${selectedNode ? selectedNode.id : "mobile-home"}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 w-full h-full"
              >
                {selectedNode && selectedNode.displayType && selectedNode.displayType !== "image" ? (
                  <SystemScreenRenderer client={client} node={selectedNode} />
                ) : (
                  <Image
                    src={currentMobileSrc}
                    alt={`${client.name} Mobile View`}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* iOS Bottom Home Swipe Indicator */}
          <div className="relative z-30 py-1.5 bg-slate-950/95 flex items-center justify-center border-t border-white/5">
            <div className="w-24 h-1 bg-white/40 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ConnectedArchitecture() {
  const [activeClient, setActiveClient] = useState<ClientArchitecture>(
    clientArchitectures[0]
  );
  const [selectedNode, setSelectedNode] = useState<IntegrationNode | null>(null);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");

  // Auto-detect mobile devices and default to 9:16 phone view
  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 1024) {
          setDeviceMode("mobile");
        } else {
          setDeviceMode("desktop");
        }
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSelectClient = (client: ClientArchitecture) => {
    setActiveClient(client);
    setSelectedNode(null); // Always start on the client's homepage!
  };

  const handleToggleNode = (node: IntegrationNode) => {
    // Clicking an active node returns to the homepage hub
    setSelectedNode((prev) => (prev?.id === node.id ? null : node));
  };

  return (
    <section
      id="architecture"
      className="py-24 md:py-36 bg-[#070c18] border-t border-b border-white/10 relative overflow-hidden"
    >
      {/* Dynamic ambient backdrop glow based on active client accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(${activeClient.glowRgb}, 0.5) 0%, transparent 70%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 font-bold tracking-widest uppercase text-[10px] md:text-xs">
              System Architecture &amp; Live Integrations
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
            We Don&apos;t Just Build Websites. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
              We Wire Your Entire Business.
            </span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            A website without integrations is just a digital brochure. We connect your website directly to Square SDK payments, Capsule CRM pipelines, DoorDash delivery dispatch, and PinDrop™ field mapping.
          </p>
        </div>

        {/* Client Selection Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 max-w-4xl mx-auto p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-2xl">
          {clientArchitectures.map((client) => {
            const isActive = client.id === activeClient.id;
            return (
              <button
                key={client.id}
                onClick={() => handleSelectClient(client)}
                className={`flex-1 min-w-[140px] sm:min-w-0 px-4 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 text-center relative ${
                  isActive
                    ? "bg-white text-slate-950 shadow-lg scale-[1.02]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{client.shortName}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* --- Central System Schematic Diagram --- */}
        <div className="rounded-3xl bg-slate-900/80 border border-white/15 p-6 md:p-10 backdrop-blur-2xl shadow-2xl relative">
          
          {/* Active Client Info Banner */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  {activeClient.industry}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  {activeClient.location}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                {activeClient.name}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
                ⚡ Speed: {activeClient.speedScore}
              </span>
              <a
                href={activeClient.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white hover:text-slate-950 text-white text-xs font-bold uppercase tracking-wider transition-all border border-white/15"
              >
                <span>{activeClient.domain}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Schematic Grid (Central Engine + 4 Branching Integration Nodes) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: 2 Connected Nodes */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {activeClient.nodes.slice(0, 2).map((node) => {
                const IconComponent = node.icon;
                const isSelected = selectedNode?.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => handleToggleNode(node)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-300 relative group ${
                      isSelected
                        ? "bg-slate-800/90 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.2)] scale-[1.02]"
                        : "bg-slate-950/60 border-white/10 hover:border-white/30 hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border ${node.iconBg}`}
                      >
                        <IconComponent className={`w-5 h-5 ${node.iconColor}`} />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/10">
                        {node.badge}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-tight mb-1 group-hover:text-amber-300 transition-colors">
                      {node.title}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {node.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-cyan-400 font-semibold">
                      <span>{node.techTag}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-70" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Center Column: Interactive Core Engine Browser / Smartphone Mockup */}
            <div className="lg:col-span-6 flex flex-col items-center">
              {/* Centered Controls: View Homepage Pill Button + Device Mode Toggle */}
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2.5 w-full">
                <button
                  onClick={() => setSelectedNode(null)}
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 border cursor-pointer ${
                    selectedNode === null
                      ? "bg-amber-400 text-slate-950 border-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.35)] scale-105"
                      : "bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border-white/15 hover:border-amber-400/50 hover:shadow-lg"
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>{selectedNode === null ? "Currently Viewing: Core Homepage" : "← Return to Core Homepage"}</span>
                  {selectedNode === null ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </button>

                {/* Desktop (16:10) vs Smartphone (9:16) Device Toggle */}
                <div className="inline-flex items-center p-1 rounded-full bg-slate-950/90 border border-white/15 shadow-inner">
                  <button
                    onClick={() => setDeviceMode("desktop")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all duration-200 cursor-pointer ${
                      deviceMode === "desktop"
                        ? "bg-white/20 text-white shadow-sm border border-white/20"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop (16:10)</span>
                  </button>
                  <button
                    onClick={() => setDeviceMode("mobile")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all duration-200 cursor-pointer ${
                      deviceMode === "mobile"
                        ? "bg-amber-400 text-slate-950 font-black shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                        : "text-slate-400 hover:text-amber-400"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile (9:16)</span>
                  </button>
                </div>
              </div>

              {/* Conditional Viewport Frame: 9:16 Smartphone Chassis vs 16:10 Desktop Browser Frame */}
              {deviceMode === "mobile" ? (
                <PhoneMockupFrame client={activeClient} selectedNode={selectedNode} />
              ) : (
                <div className="w-full rounded-2xl bg-slate-950 border border-white/20 overflow-hidden shadow-2xl relative group">
                  {/* Browser Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-white/10">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shrink-0" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shrink-0" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 shrink-0" />
                      <div className="flex items-center gap-1 ml-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono truncate">
                        <span className="text-slate-400">
                          https://{selectedNode ? (selectedNode.displayType === "capsule-crm" ? "app.capsulecrm.com" : selectedNode.displayType === "transpond-flow" ? "transpond.io" : selectedNode.displayType === "google-schema" ? "google.com" : activeClient.domain) : activeClient.domain}
                        </span>
                        <span className="text-cyan-400 font-bold">
                          {selectedNode ? selectedNode.pagePath : "/"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      {selectedNode && (
                        <button
                          onClick={() => setSelectedNode(null)}
                          className="text-[9px] font-mono text-slate-300 hover:text-white px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer"
                        >
                          ← View Homepage
                        </button>
                      )}
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                        {selectedNode ? selectedNode.badge : "Central Hub"}
                      </span>
                    </div>
                  </div>

                  {/* Screenshot / System View Display with Dynamic Inspection Overlay */}
                  <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${activeClient.id}-${selectedNode ? selectedNode.id : "homepage"}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.01 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute inset-0 w-full h-full"
                      >
                        {selectedNode ? (
                          <SystemScreenRenderer
                            client={activeClient}
                            node={selectedNode}
                          />
                        ) : (
                          <Image
                            src={activeClient.heroImage}
                            alt={`${activeClient.name} - Homepage Hub`}
                            fill
                            className="object-cover object-top"
                            priority
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Active Highlight Spotlight Pill */}
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/90 border border-amber-500/40 backdrop-blur-md shadow-2xl">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-amber-400" />
                          {selectedNode ? `Selected Feature: ${selectedNode.title}` : `Central Hub: ${activeClient.name}`}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">
                          {selectedNode ? selectedNode.techTag : `${activeClient.industry}`}
                        </span>
                      </div>
                      <p className="text-xs text-white leading-relaxed">
                        {selectedNode ? selectedNode.description : activeClient.summary}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {selectedNode ? "Click card again or 'View Homepage' to return to core hub" : "Click any integration card to inspect its live system & pages"}
                </span>
              </div>
            </div>

            {/* Right Column: 2 Connected Nodes */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {activeClient.nodes.slice(2, 4).map((node) => {
                const IconComponent = node.icon;
                const isSelected = selectedNode?.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => handleToggleNode(node)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-300 relative group ${
                      isSelected
                        ? "bg-slate-800/90 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.2)] scale-[1.02]"
                        : "bg-slate-950/60 border-white/10 hover:border-white/30 hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border ${node.iconBg}`}
                      >
                        <IconComponent className={`w-5 h-5 ${node.iconColor}`} />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/10">
                        {node.badge}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-tight mb-1 group-hover:text-amber-300 transition-colors">
                      {node.title}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {node.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-cyan-400 font-semibold">
                      <span>{node.techTag}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-70" />
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Testimonial Banner if present for this client */}
          {activeClient.testimonial && (
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.02] p-5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                  {activeClient.testimonial.source === "Google" ? (
                    <span className="text-amber-400 font-black">Google Review</span>
                  ) : (
                    <span className="text-[#1877F2] font-black">Facebook Review</span>
                  )}
                </span>
                <p className="text-xs italic text-white/90 hidden md:block">
                  &ldquo;{activeClient.testimonial.quote}&rdquo;
                </p>
              </div>
              <span className="text-xs font-bold text-cyan-400 shrink-0">
                — {activeClient.testimonial.author},{" "}
                <span className="text-slate-400 font-normal">
                  {activeClient.testimonial.role}
                </span>
              </span>
            </div>
          )}

          {/* Bottom Action Ribbon */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Need custom Square checkout, CRM sync, or field software for your business?
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/portfolio/${activeClient.caseStudySlug || activeClient.id}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/15 text-center"
              >
                Deep-Dive Case Study <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/book"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-lg active:scale-95 text-center"
              >
                Build My System
              </Link>
            </div>
          </div>

        </div>

        {/* Link to Full Portfolio */}
        <div className="mt-12 text-center">
          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors py-2 px-4 rounded-full border border-white/10 hover:border-cyan-400/40"
          >
            Explore Complete 10+ Client Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
