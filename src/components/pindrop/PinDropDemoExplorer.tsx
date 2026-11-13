"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Search,
  Layers,
  Plus,
  Minus,
  CheckCircle2,
  MessageSquare,
  Mail,
  FileText,
  Sparkles,
  Code2,
  ExternalLink,
  Copy,
  Check,
  Mic,
  Navigation,
  Star,
  ArrowRight,
  Sliders,
} from "lucide-react";

interface RealPinItem {
  id: string;
  author: string;
  date: string;
  city: string;
  service: string;
  quote: string;
  mapThumb: string;
  mainPhoto: string;
  extraThumbs: string[];
  beforePhoto: string;
  afterPhoto: string;
  lat: string;
  lng: string;
  mapX: number;
  mapY: number;
  slug: string;
  aeoQuestions: { q: string; a: string }[];
  isUserDropped?: boolean;
}

const CITY_MAP_POSITIONS: Record<
  string,
  { x: number; y: number; lat: string; lng: string; thumb: string }
> = {
  "Madison, MS": {
    x: 52,
    y: 19,
    lat: "32.4618",
    lng: "-90.1154",
    thumb: "/pindrop/sat-madison.jpg",
  },
  "Brandon, MS": {
    x: 68,
    y: 63,
    lat: "32.2732",
    lng: "-89.9859",
    thumb: "/pindrop/sat-brandon-v2.jpg",
  },
  "Flowood, MS": {
    x: 57,
    y: 49,
    lat: "32.3276",
    lng: "-90.1228",
    thumb: "/pindrop/sat-flowood-v2.jpg",
  },
  "Clinton, MS": {
    x: 29,
    y: 54,
    lat: "32.3415",
    lng: "-90.3218",
    thumb: "/pindrop/sat-clinton-v2.jpg",
  },
  "Ridgeland, MS": {
    x: 50,
    y: 35,
    lat: "32.4288",
    lng: "-90.1312",
    thumb: "/pindrop/sat-madison.jpg",
  },
  "Byram, MS": {
    x: 39,
    y: 84,
    lat: "32.1813",
    lng: "-90.2476",
    thumb: "/pindrop/sat-brandon-v2.jpg",
  },
};

const INITIAL_PINS: RealPinItem[] = [
  {
    id: "pin-madison-roof",
    author: "Eddie Buchanan",
    date: "Nov 12, 2026",
    city: "Madison, MS",
    service: "RESIDENTIAL ROOFING",
    quote:
      "Completed full tear-off of storm-creased shingles, installed synthetic underlayment, valley ice/water shield, and 30-yr charcoal architectural shingles.",
    mapThumb: "/pindrop/sat-madison.jpg",
    mainPhoto: "/pincam/roof-after.jpg",
    extraThumbs: ["/pincam/roof-before.jpg", "/pincam/roof-after.jpg"],
    beforePhoto: "/pincam/roof-before.jpg",
    afterPhoto: "/pincam/roof-after.jpg",
    lat: "32.4618",
    lng: "-90.1154",
    mapX: 52,
    mapY: 19,
    slug: "/pin-page/?id=madison-ms-architectural-roof-replacement",
    aeoQuestions: [
      {
        q: "What roofing materials were installed on this Madison, MS home?",
        a: "30-year architectural dimensional shingles over synthetic water-shedding underlayment, new drip edge, step flashing, and continuous ridge ventilation.",
      },
      {
        q: "How quickly was this storm roof replacement completed?",
        a: "Full tear-off, decking inspection, installation, and magnetic nail sweep were completed in 1 day with verified before-and-after GPS photo documentation.",
      },
    ],
  },
  {
    id: "pin-brandon-hvac",
    author: "Robert Christoforo",
    date: "Nov 11, 2026",
    city: "Brandon, MS",
    service: "HVAC REPLACEMENT",
    quote:
      "Installed high-efficiency 4-ton variable-speed heat pump condenser on new composite hurricane pad with insulated copper line-set and 240V disconnect.",
    mapThumb: "/pindrop/sat-brandon-v2.jpg",
    mainPhoto: "/pincam/hvac-install.jpg",
    extraThumbs: ["/pincam/hvac-install.jpg", "/pincam/roof-after.jpg"],
    beforePhoto: "/pincam/roof-before.jpg",
    afterPhoto: "/pincam/hvac-install.jpg",
    lat: "32.2732",
    lng: "-89.9859",
    mapX: 68,
    mapY: 63,
    slug: "/pin-page/?id=brandon-ms-4-ton-heat-pump-installation",
    aeoQuestions: [
      {
        q: "Why upgrade to a high-SEER2 heat pump in Rankin County humidity?",
        a: "Variable-speed compressors run longer low-amp cycles that pull significantly more moisture out of Brandon homes during 98°F Mississippi summers.",
      },
      {
        q: "Was the outdoor condenser leveled on a new composite pad?",
        a: "Yes — placed on a vibration-isolated composite equipment pad with sealed low-voltage whip and weatherproof Eaton service disconnect.",
      },
    ],
  },
  {
    id: "pin-flowood-remodel",
    author: "Christopher Heard",
    date: "Nov 09, 2026",
    city: "Flowood, MS",
    service: "STORM RESTORATION",
    quote:
      "Replaced wind-damaged ridge caps, sealed pipe boots, and completed full perimeter gutter & fascia restoration off Lakeland corridor.",
    mapThumb: "/pindrop/sat-flowood-v2.jpg",
    mainPhoto: "/pincam/roof-after.jpg",
    extraThumbs: ["/pincam/roof-before.jpg", "/pincam/hvac-install.jpg"],
    beforePhoto: "/pincam/roof-before.jpg",
    afterPhoto: "/pincam/roof-after.jpg",
    lat: "32.3276",
    lng: "-90.1228",
    mapX: 57,
    mapY: 49,
    slug: "/pin-page/?id=flowood-ms-wind-damage-ridge-restoration",
    aeoQuestions: [
      {
        q: "Does PinDrop™ document wind & hail damage for insurance adjusters?",
        a: "Every pin stores timestamped Before, During, and After HD photos plus a shareable Customer & Adjuster Photo Report link.",
      },
    ],
  },
  {
    id: "pin-clinton-grading",
    author: "Chris Smith",
    date: "Nov 07, 2026",
    city: "Clinton, MS",
    service: "EXTERIOR & DRAINAGE",
    quote:
      "Completed roof valley waterproofing, downspout tie-ins, and yard drainage grading to stop standing water near slab foundation.",
    mapThumb: "/pindrop/sat-clinton-v2.jpg",
    mainPhoto: "/pincam/hvac-install.jpg",
    extraThumbs: ["/pincam/roof-after.jpg", "/pincam/hvac-install.jpg"],
    beforePhoto: "/pincam/roof-before.jpg",
    afterPhoto: "/pincam/hvac-install.jpg",
    lat: "32.3415",
    lng: "-90.3218",
    mapX: 29,
    mapY: 54,
    slug: "/pin-page/?id=clinton-ms-exterior-drainage-waterproofing",
    aeoQuestions: [
      {
        q: "How do neighborhood pins help contractors rank in Clinton, MS?",
        a: "Google sees verified city/subdivision coordinates, service schema, and fresh customer reviews tied directly to Clinton search queries.",
      },
    ],
  },
];

// Ambient background cluster pins mirroring Born Again Roofing's 99+ Central MS density
const BACKGROUND_CLUSTER_DOTS = [
  { x: 48, y: 42 },
  { x: 46, y: 52 },
  { x: 44, y: 58 },
  { x: 50, y: 56 },
  { x: 53, y: 62 },
  { x: 49, y: 28 },
  { x: 54, y: 44 },
  { x: 62, y: 58 },
  { x: 43, y: 66 },
  { x: 39, y: 84 },
];

const TRADE_PRESETS = [
  {
    id: "roofing",
    label: "🏠 Roofing & Exteriors",
    services: [
      "Residential Roofing",
      "Metal Roofing",
      "Storm & Hail Inspection",
      "Commercial Flat Roof",
      "Gutters & Siding",
    ],
  },
  {
    id: "hvac",
    label: "❄️ HVAC & Mechanical",
    services: [
      "AC & Heat Pump Install",
      "Emergency No-Cool Repair",
      "Ductwork & Mini-Splits",
      "Commercial RTU Service",
      "Seasonal Tune-Up",
    ],
  },
  {
    id: "dirt",
    label: "🚜 Dirt Work & Land Clearing",
    services: [
      "Forestry Mulching",
      "Laser House Pad Grading",
      "French Drains & Culverts",
      "Driveway & Gravel Work",
      "Demolition & Hauling",
    ],
  },
  {
    id: "plumbing",
    label: "🔧 Plumbing & Drain",
    services: [
      "Tankless Water Heater",
      "Slab Leak Detection",
      "Main Sewer Line Repair",
      "Whole-Home Repipe",
      "Commercial Plumbing",
    ],
  },
  {
    id: "electrical",
    label: "⚡ Electrical & Generators",
    services: [
      "200A Service Panel Upgrade",
      "Standby Generator Install",
      "EV Charger & Subpanels",
      "Commercial LED Retrofit",
      "Whole-Home Surge",
    ],
  },
  {
    id: "remodel",
    label: "🔨 Remodeling & Flooring",
    services: [
      "Kitchen & Bath Remodel",
      "Waterproof LVP & Tile",
      "Custom Decks & Fencing",
      "Interior/Exterior Paint",
      "Sheetrock & Carpentry",
    ],
  },
];

function GoldTeardropPin({
  active = false,
  size = 30,
}: {
  active?: boolean;
  size?: number;
}) {
  return (
    <span className="relative inline-flex items-center justify-center">
      {active && (
        <span className="absolute -inset-2 rounded-full bg-[#e2b047]/45 animate-ping pointer-events-none" />
      )}
      <svg
        width={size}
        height={Math.round(size * 1.25)}
        viewBox="0 0 32 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]"
      >
        <path
          d="M16 1.5C8.54 1.5 2.5 7.54 2.5 15C2.5 24.8 14.35 36.85 15.32 37.8C15.7 38.17 16.3 38.17 16.68 37.8C17.65 36.85 29.5 24.8 29.5 15C29.5 7.54 23.46 1.5 16 1.5Z"
          fill={active ? "#fde047" : "#e2b047"}
          stroke="#0b0c10"
          strokeWidth="2"
        />
        <circle cx="16" cy="14.5" r="5" fill="#0b0c10" />
      </svg>
    </span>
  );
}

type ExplorerTab = "live_map" | "drop_portal" | "seo_page" | "embed_trades";

export default function PinDropDemoExplorer() {
  const [activeTab, setActiveTab] = useState<ExplorerTab>("live_map");
  const [pins, setPins] = useState<RealPinItem[]>(INITIAL_PINS);
  const [selectedPinId, setSelectedPinId] = useState<string>(INITIAL_PINS[0].id);

  // Live Map & Feed state (View 01)
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [serviceFilter, setServiceFilter] = useState("ALL");
  const [mapZoomed, setMapZoomed] = useState(false);
  const [mapDarkStyle, setMapDarkStyle] = useState(false);

  // Real PDM PinDrop Check-In Portal state (View 02)
  const [portalSubTab, setPortalSubTab] = useState<
    "drop_pin" | "social_studio" | "messenger"
  >("drop_pin");
  const [techName, setTechName] = useState("Eddie Buchanan");
  const [dropCity, setDropCity] = useState("Madison, MS");
  const [dropService, setDropService] = useState("Residential Roofing");
  const [customerName, setCustomerName] = useState("Smith Residence");
  const [customerPhone, setCustomerPhone] = useState("(601) 555-0194");
  const [latInput, setLatInput] = useState("32.4618");
  const [lngInput, setLngInput] = useState("-90.1154");
  const [jobNotes, setJobNotes] = useState(
    "Completed full tear-off, synthetic underlayment, ice & water valley shield, and architectural shingle installation."
  );
  const [stampPhoto, setStampPhoto] = useState(true);
  const [pinSubmitted, setPinSubmitted] = useState(false);

  // View 03 Before/After Slider state
  const [seoSplit, setSeoSplit] = useState(54);

  // View 04 Trade & Embed state
  const [selectedTrade, setSelectedTrade] = useState(TRADE_PRESETS[0]);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const activePin = pins.find((p) => p.id === selectedPinId) || pins[0];

  const filteredPins = pins.filter((p) => {
    const matchesCity = cityFilter === "ALL" || p.city === cityFilter;
    const matchesSvc = serviceFilter === "ALL" || p.service === serviceFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQ =
      !q ||
      p.city.toLowerCase().includes(q) ||
      p.service.toLowerCase().includes(q) ||
      p.quote.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q);
    return matchesCity && matchesSvc && matchesQ;
  });

  const handleCitySelectInPortal = (city: string) => {
    setDropCity(city);
    const meta = CITY_MAP_POSITIONS[city];
    if (meta) {
      setLatInput(meta.lat);
      setLngInput(meta.lng);
    }
  };

  const handleSimulateVoiceDictate = () => {
    setJobNotes(
      `Finished ${dropService.toLowerCase()} in ${dropCity}. Verified all flashing, cleaned job site with magnetic sweep, and walked homeowner through final photos.`
    );
  };

  const handleDropLivePin = (e: React.FormEvent) => {
    e.preventDefault();
    const pos = CITY_MAP_POSITIONS[dropCity] || CITY_MAP_POSITIONS["Madison, MS"];
    const newId = `live-pin-${Date.now()}`;
    const isHvacOrMech =
      dropService.toLowerCase().includes("hvac") ||
      dropService.toLowerCase().includes("heat") ||
      dropService.toLowerCase().includes("drain");

    const created: RealPinItem = {
      id: newId,
      author: techName,
      date: "Just Now • Live Demo",
      city: dropCity,
      service: dropService.toUpperCase(),
      quote:
        jobNotes.trim() ||
        `Completed ${dropService} project documentation in ${dropCity} by ${techName}.`,
      mapThumb: pos.thumb,
      mainPhoto: isHvacOrMech ? "/pincam/hvac-install.jpg" : "/pincam/roof-after.jpg",
      extraThumbs: ["/pincam/roof-before.jpg", "/pincam/roof-after.jpg"],
      beforePhoto: "/pincam/roof-before.jpg",
      afterPhoto: isHvacOrMech ? "/pincam/hvac-install.jpg" : "/pincam/roof-after.jpg",
      lat: latInput,
      lng: lngInput,
      mapX: Math.min(82, Math.max(20, pos.x + 2)),
      mapY: Math.min(84, Math.max(16, pos.y - 2)),
      slug: `/pin-page/?id=${dropCity
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}-${dropService
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}`,
      aeoQuestions: [
        {
          q: `What work was completed on this ${dropCity} property?`,
          a:
            jobNotes.trim() ||
            `Verified ${dropService} completed by ${techName} with GPS-stamped before and after photos.`,
        },
        {
          q: `Do you offer free ${dropService.toLowerCase()} estimates near ${dropCity}?`,
          a: `Yes — our crews actively serve ${dropCity} and surrounding Central Mississippi neighborhoods with fast on-site inspections.`,
        },
      ],
      isUserDropped: true,
    };

    setPins((prev) => [created, ...prev]);
    setSelectedPinId(newId);
    setPinSubmitted(true);
  };

  const embedSnippet = `<iframe src="https://pdm-pindrop-central.netlify.app/embed/map?clientId=your-company" width="100%" height="540" style="border:none;border-radius:16px;"></iframe>`;

  const handleCopyEmbed = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(embedSnippet);
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2500);
    }
  };

  return (
    <div id="interactive-engine" className="w-full scroll-mt-28">
      {/* Top Real-App Switcher Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        {[
          {
            id: "live_map" as const,
            step: "SCREEN 01 • PUBLIC WEBSITE FEED",
            title: "Local Project Pins & Map",
            sub: "Real satellite map + neighborhood cards",
          },
          {
            id: "drop_portal" as const,
            step: "SCREEN 02 • CREW TRUCK PORTAL",
            title: "PDM PinDrop Check-In",
            sub: "Drop a live test pin in 30 seconds",
          },
          {
            id: "seo_page" as const,
            step: "SCREEN 03 • GOOGLE & AEO PAGE",
            title: "Auto-Built Project Page",
            sub: "Before/After slider + Answer Engine",
          },
          {
            id: "embed_trades" as const,
            step: "SCREEN 04 • ANY WEBSITE OR TRADE",
            title: "7 Trades + 1-Click Embed",
            sub: "Native Next.js or WordPress/Wix widget",
          },
        ].map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                active
                  ? "bg-[#12141c] border-[#e2b047] shadow-[0_0_28px_rgba(226,176,71,0.18)]"
                  : "bg-[#0b0c10] border-white/10 hover:border-white/25"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-[10px] font-mono font-extrabold uppercase tracking-wider ${
                    active ? "text-[#e2b047]" : "text-slate-500"
                  }`}
                >
                  {tab.step}
                </span>
                {active && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </div>
              <div className="text-sm font-black text-white">{tab.title}</div>
              <div className="text-xs text-slate-400 mt-0.5 truncate">{tab.sub}</div>
            </button>
          );
        })}
      </div>

      {/* ===================================================================
          AUTHENTIC PDM PINDROP APPLICATION WINDOW (#0b0c10 + #12141c + #e2b047)
      ==================================================================== */}
      <div className="rounded-[28px] p-1.5 bg-gradient-to-b from-white/15 via-white/[0.05] to-white/[0.03] shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
        <div className="rounded-[23px] bg-[#0b0c10] border border-white/[0.07] overflow-hidden">
          {/* App Browser / Workspace Top Bar */}
          <div className="px-4 sm:px-6 py-3.5 bg-[#090a0e] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="px-3 py-1 rounded-lg bg-[#12141c] border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e2b047]" />
                <span>
                  {activeTab === "live_map" && "yourcompany.com/pins/"}
                  {activeTab === "drop_portal" && "yourcompany.com/admin/drop-pin/"}
                  {activeTab === "seo_page" && `yourcompany.com${activePin.slug}`}
                  {activeTab === "embed_trades" && "pindrop.powerdigitalmedia.org/embed"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {activeTab === "live_map" ? (
                <button
                  type="button"
                  onClick={() => {
                    setPinSubmitted(false);
                    setActiveTab("drop_portal");
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-[#e2b047] hover:brightness-110 text-[#0b0c10] text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all shadow-[0_4px_16px_rgba(226,176,71,0.3)]"
                >
                  <span>📌 + Drop a Live Test Pin</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveTab("live_map")}
                  className="px-3.5 py-1.5 rounded-full bg-[#12141c] hover:bg-white/10 border border-[#e2b047]/50 text-[#e2b047] text-xs font-bold cursor-pointer transition-all"
                >
                  ← View Public Project Map ({pins.length + 95} Pins)
                </button>
              )}
              <a
                href="https://bornagainroofing.com/pins/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-xs font-semibold text-slate-300 transition-colors"
              >
                <span>See Live on Born Again Roofing</span>
                <ExternalLink className="w-3 h-3 text-[#e2b047]" />
              </a>
            </div>
          </div>

          {/* ===============================================================
              SCREEN 01: REAL PUBLIC `/pins` SATELLITE MAP & 2-COL FEED
          ================================================================ */}
          {activeTab === "live_map" && (
            <div className="p-5 sm:p-8 lg:p-10">
              {/* Authentic PinDrop Public Header */}
              <div className="text-center max-w-2xl mx-auto mb-7">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#d1a453] block mb-2">
                  LIVE JOB FEED
                </span>
                <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2.5">
                  Local Project Pins
                </h3>
                <p className="text-sm sm:text-base text-slate-400">
                  Real jobs, real photos, real locations. See our quality craftsmanship at work near you.
                </p>
              </div>

              {/* Authentic 3-Input Filter Bar (`Search jobs...` | `All Locations` | `All Services`) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6 max-w-5xl mx-auto">
                <div className="md:col-span-6 relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search jobs (e.g. Madison, roofing, heat pump)..."
                    aria-label="Search project pins"
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#12141c] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#d1a453]"
                  />
                </div>
                <div className="md:col-span-3">
                  <select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    aria-label="Filter by location"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#12141c] border border-white/10 text-sm font-semibold text-white focus:outline-none focus:border-[#d1a453]"
                  >
                    <option value="ALL">All Locations</option>
                    {Array.from(new Set(pins.map((p) => p.city))).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-3">
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    aria-label="Filter by service"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#12141c] border border-white/10 text-sm font-semibold text-white focus:outline-none focus:border-[#d1a453]"
                  >
                    <option value="ALL">All Services</option>
                    {Array.from(new Set(pins.map((p) => p.service))).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Authentic Double-Bezel Esri World Imagery Satellite Map */}
              <div className="max-w-5xl mx-auto rounded-2xl p-2 bg-[#10121a] border border-white/[0.08] mb-8 shadow-2xl">
                <div className="relative h-[320px] sm:h-[420px] rounded-xl overflow-hidden border border-white/10 bg-[#0b0c10] select-none">
                  <div
                    className={`absolute inset-0 transition-transform duration-500 ${
                      mapZoomed ? "scale-125" : "scale-100"
                    }`}
                  >
                    <Image
                      src="/pindrop/central-ms-satellite.jpg"
                      alt="Central Mississippi Esri World Imagery satellite project map"
                      fill
                      sizes="(max-width: 1024px) 96vw, 1024px"
                      className={`object-cover transition-all duration-300 ${
                        mapDarkStyle ? "brightness-50 contrast-125 saturate-50" : ""
                      }`}
                      priority
                    />

                    {/* Subtle Central MS Metro Cluster Pins (mirrors real 99+ pin density) */}
                    {BACKGROUND_CLUSTER_DOTS.map((dot, idx) => (
                      <div
                        key={idx}
                        style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-full opacity-75 pointer-events-none"
                      >
                        <GoldTeardropPin size={22} />
                      </div>
                    ))}

                    {/* Interactive Featured Gold Teardrop Pins */}
                    {filteredPins.map((pin) => {
                      const isSelected = pin.id === activePin.id;
                      return (
                        <button
                          key={pin.id}
                          type="button"
                          onClick={() => setSelectedPinId(pin.id)}
                          style={{ left: `${pin.mapX}%`, top: `${pin.mapY}%` }}
                          aria-label={`Inspect ${pin.service} pin in ${pin.city}`}
                          className={`absolute -translate-x-1/2 -translate-y-full cursor-pointer transition-transform ${
                            isSelected ? "z-30 scale-125" : "z-20 hover:scale-110"
                          }`}
                        >
                          <GoldTeardropPin active={isSelected} size={30} />
                        </button>
                      );
                    })}
                  </div>

                  {/* Authentic Leaflet Top-Left [+] [-] Zoom Control */}
                  <div className="absolute top-3.5 left-3.5 z-30 rounded-md overflow-hidden bg-white text-slate-900 shadow-lg border border-black/20 flex flex-col">
                    <button
                      type="button"
                      onClick={() => setMapZoomed(true)}
                      aria-label="Zoom in satellite map"
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 border-b border-slate-300 font-bold cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setMapZoomed(false)}
                      aria-label="Zoom out satellite map"
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 font-bold cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Authentic Top-Right Layer Switcher Button */}
                  <button
                    type="button"
                    onClick={() => setMapDarkStyle((prev) => !prev)}
                    title="Toggle Satellite / Dark Map Layer"
                    className="absolute top-3.5 right-3.5 z-30 px-3 py-2 rounded-lg bg-[#12141c]/95 hover:bg-[#1a1d29] border border-white/15 text-xs font-bold text-white flex items-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-[#e2b047]" />
                    <span>{mapDarkStyle ? "Dark Radar" : "Satellite"}</span>
                  </button>

                  {/* Authentic Clicked-Pin Dark Popup Card */}
                  {activePin && (
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:right-auto sm:w-[350px] z-30 rounded-xl bg-[#12141c]/96 backdrop-blur-md border border-[#e2b047]/45 p-3.5 shadow-[0_14px_40px_rgba(0,0,0,0.85)]">
                      <div className="flex items-start gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10">
                          <Image
                            src={activePin.mainPhoto}
                            alt={activePin.service}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#e2b047] truncate">
                              {activePin.service}
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0">
                              {activePin.city}
                            </span>
                          </div>
                          <p className="text-xs text-slate-200 italic line-clamp-2 mt-1 font-serif">
                            &ldquo;{activePin.quote}&rdquo;
                          </p>
                          <button
                            type="button"
                            onClick={() => setActiveTab("seo_page")}
                            className="mt-2 text-[11px] font-extrabold text-[#e2b047] hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                          >
                            <span>View Auto-Built Google Page</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Authentic Bottom-Right Attribution */}
                  <div className="hidden sm:block absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded bg-white/90 text-[10px] text-slate-800 font-sans">
                    Leaflet | © Esri World Imagery
                  </div>
                </div>
              </div>

              {/* Authentic 2-Column `.pin-feed-card` Grid (Exact match to `src/app/pins/page.tsx`) */}
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPins.map((pin) => (
                  <div
                    key={pin.id}
                    className={`rounded-2xl bg-[#12141c] p-5 sm:p-6 border transition-all flex flex-col justify-between ${
                      pin.isUserDropped
                        ? "border-emerald-400/60 shadow-[0_0_30px_rgba(16,185,129,0.16)]"
                        : "border-white/[0.07] hover:border-[#d1a453]/40"
                    }`}
                  >
                    <div>
                      {/* Card Header: Royal Blue Author + Date on Left | Gold Service Tag on Right */}
                      <div className="flex items-start justify-between gap-3 pb-3.5 mb-3.5 border-b border-white/[0.06]">
                        <div>
                          <div className="text-sm font-extrabold text-[#5c6cff] flex items-center gap-2">
                            <span>{pin.author}</span>
                            {pin.isUserDropped && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[9px] font-mono uppercase text-emerald-300">
                                Live Pin
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">{pin.date}</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-[#d1a453]/12 border border-[#d1a453]/30 text-[10px] font-extrabold uppercase tracking-wider text-[#e2b047] shrink-0">
                          {pin.service}
                        </span>
                      </div>

                      {/* Georgia Serif Italic Quote Description */}
                      <p className="text-sm text-slate-200 italic font-serif leading-relaxed mb-4 line-clamp-2">
                        &ldquo;{pin.quote}&rdquo;
                      </p>

                      {/* Signature PinDrop Split Media Row: Left Zoomed Satellite Mini-Map | Right Job Photo + Thumbs */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {/* Left: IndividualProjectMap Satellite View */}
                        <div className="relative h-40 sm:h-44 rounded-xl overflow-hidden border border-white/10 bg-[#0b0c10]">
                          <Image
                            src={pin.mapThumb}
                            alt={`Verified neighborhood satellite view in ${pin.city}`}
                            fill
                            sizes="(max-width: 768px) 44vw, 240px"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <GoldTeardropPin size={26} />
                          </div>
                          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0b0c10]/90 border border-white/15 text-[11px] font-extrabold text-white whitespace-nowrap shadow-md">
                            {pin.city}
                          </div>
                        </div>

                        {/* Right: Job Photo + Secondary Thumbnails */}
                        <div className="flex flex-col gap-2">
                          <div className="relative h-28 sm:h-32 rounded-xl overflow-hidden border border-white/10">
                            <Image
                              src={pin.mainPhoto}
                              alt={`${pin.service} in ${pin.city}`}
                              fill
                              sizes="(max-width: 768px) 44vw, 240px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            {pin.extraThumbs.map((thumb, tIdx) => (
                              <div
                                key={tIdx}
                                className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/15"
                              >
                                <Image
                                  src={thumb}
                                  alt="Job stage thumbnail"
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              </div>
                            ))}
                            <span className="text-[10px] font-mono text-slate-400 ml-auto">
                              GPS Verified
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Authentic Bottom Pill Button */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPinId(pin.id);
                          setActiveTab("seo_page");
                        }}
                        className="px-5 py-2.5 rounded-full bg-transparent hover:bg-white/[0.06] border border-white/15 hover:border-[#e2b047]/60 text-xs font-extrabold text-white transition-all cursor-pointer"
                      >
                        View Full Details
                      </button>
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Indexed SEO Page
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===============================================================
              SCREEN 02: REAL `/admin/drop-pin` FIELD CHECK-IN PORTAL
          ================================================================ */}
          {activeTab === "drop_portal" && (
            <div className="p-5 sm:p-8 lg:p-10">
              <div className="max-w-3xl mx-auto">
                {/* Authentic PDM PinDrop Portal Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#e2b047]">
                      Power Digital Media
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#e2b047]/15 border border-[#e2b047] text-[#fde047] text-[11px] font-extrabold">
                      🎓 Interactive Crew Portal
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white">PDM PinDrop</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Field Photo Documentation, Crew Messenger &amp; Live SEO Pin Engine
                  </p>

                  {/* Authentic Horizontal Workspace Pill Bar */}
                  <div className="mt-4 p-1.5 rounded-xl bg-[#11141d] border border-white/[0.08] flex items-center gap-1.5 overflow-x-auto">
                    {[
                      { id: "drop_pin" as const, label: "📌 Drop Pin" },
                      { id: "social_studio" as const, label: "📣 Social Studio (FB • IG • GBP)" },
                      { id: "messenger" as const, label: "💬 Crew Chat (3)" },
                    ].map((pill) => (
                      <button
                        key={pill.id}
                        type="button"
                        onClick={() => setPortalSubTab(pill.id)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                          portalSubTab === pill.id
                            ? "bg-[#e2b047]/20 border border-[#e2b047] text-white"
                            : "text-slate-400 hover:text-white border border-transparent"
                        }`}
                      >
                        {pill.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setActiveTab("live_map")}
                      className="px-3.5 py-2 rounded-lg text-xs font-extrabold whitespace-nowrap text-slate-400 hover:text-white ml-auto cursor-pointer"
                    >
                      📍 Job Map ({pins.length + 95})
                    </button>
                  </div>
                </div>

                {portalSubTab === "drop_pin" && pinSubmitted ? (
                  /* Authentic `Pin Dropped Successfully!` Double-Bezel Card */
                  <div className="rounded-2xl p-6 sm:p-8 bg-[#12141c] border border-[#e2b047]/50 text-center space-y-6">
                    <div>
                      <div className="text-4xl mb-2">🎉</div>
                      <h4 className="text-2xl font-black text-white">
                        Pin Dropped Successfully!
                      </h4>
                      <p className="text-sm text-slate-300 mt-1">
                        Your <strong>{dropService}</strong> pin in <strong>{dropCity}</strong> is now live on the satellite map, feed, and Google-indexed project page.
                      </p>
                    </div>

                    {/* Customer & Insurance Photo Report Card */}
                    <div className="p-4 rounded-xl bg-[#e2b047]/10 border border-[#e2b047]/40 text-left">
                      <div className="text-sm font-extrabold text-[#fde047] mb-1 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Share Customer / Insurance Photo Report
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        Send the interactive Before/After timeline, HD photos, homeowner e-signature pad &amp; printable PDF report straight to {customerName || "the homeowner"}:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab("seo_page")}
                          className="px-4 py-2 rounded-lg bg-[#e2b047] text-[#0b0c10] text-xs font-extrabold cursor-pointer"
                        >
                          📄 Inspect Generated Project Page ↗
                        </button>
                        <span className="px-3.5 py-2 rounded-lg bg-white/[0.05] border border-white/15 text-xs font-bold text-slate-200">
                          📲 Ready to Text {customerPhone}
                        </span>
                      </div>
                    </div>

                    {/* Authentic Google Review SMS / Email Trigger Box */}
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left">
                      <div className="text-sm font-extrabold text-white mb-1 flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#e2b047]" />
                        Send Direct 1-Tap Google Review Request
                      </div>
                      <p className="text-xs text-slate-400 mb-3">
                        Pre-filled SMS &amp; email links open the homeowner&apos;s Google 5-star review box in one tap (15-min auto-dispatch or instant manual send):
                      </p>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="py-2.5 px-3 rounded-lg bg-[#e2b047]/10 border border-[#e2b047]/35 text-xs font-bold text-[#fde047] flex items-center justify-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>💬 Send SMS Review Link</span>
                        </div>
                        <div className="py-2.5 px-3 rounded-lg bg-white/[0.04] border border-white/15 text-xs font-bold text-slate-200 flex items-center justify-center gap-2">
                          <Mail className="w-3.5 h-3.5" />
                          <span>✉️ Send Email Review Link</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveTab("live_map")}
                        className="flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#f3c973] to-[#d4af37] text-[#090b10] font-black text-xs uppercase tracking-wider cursor-pointer"
                      >
                        📍 View Your New Pin on Satellite Map →
                      </button>
                      <button
                        type="button"
                        onClick={() => setPortalSubTab("social_studio")}
                        className="py-3.5 px-5 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                      >
                        📣 Open Social Studio
                      </button>
                      <button
                        type="button"
                        onClick={() => setPinSubmitted(false)}
                        className="py-3.5 px-4 rounded-xl border border-white/15 text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
                      >
                        Drop Another
                      </button>
                    </div>
                  </div>
                ) : portalSubTab === "drop_pin" ? (
                  /* Authentic `PDM PinDrop` Check-In Form */
                  <form
                    onSubmit={handleDropLivePin}
                    className="rounded-2xl p-5 sm:p-7 bg-[#12141c] border border-white/10 space-y-5 text-left"
                  >
                    {/* Smart EXIF GPS Auto-Job Match Banner */}
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-extrabold text-emerald-400">
                          🎯 Smart EXIF / GPS Job Match Active (42 ft accuracy)
                        </div>
                        <div className="text-[11px] text-slate-300 mt-0.5">
                          Automatically detects nearby active job folders from photo EXIF coordinates while fuzzing public pins for homeowner privacy.
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-[10px] font-mono font-bold text-emerald-300 shrink-0">
                        GPS LOCKED
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          Team Member Name
                        </label>
                        <select
                          value={techName}
                          onChange={(e) => setTechName(e.target.value)}
                          className="w-full h-11 px-3 rounded-xl bg-[#0b0c10] border border-white/15 text-sm text-white focus:border-[#e2b047] focus:outline-none"
                        >
                          <option value="Eddie Buchanan">Eddie Buchanan</option>
                          <option value="Robert Christoforo">Robert Christoforo</option>
                          <option value="Christopher Heard">Christopher Heard</option>
                          <option value="Chris Smith">Chris Smith</option>
                          <option value="Damein Donald">Damein Donald</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          Location (City)
                        </label>
                        <select
                          value={dropCity}
                          onChange={(e) => handleCitySelectInPortal(e.target.value)}
                          className="w-full h-11 px-3 rounded-xl bg-[#0b0c10] border border-white/15 text-sm text-white focus:border-[#e2b047] focus:outline-none"
                        >
                          {Object.keys(CITY_MAP_POSITIONS).map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          Service Type
                        </label>
                        <select
                          value={dropService}
                          onChange={(e) => setDropService(e.target.value)}
                          className="w-full h-11 px-3 rounded-xl bg-[#0b0c10] border border-white/15 text-sm text-white focus:border-[#e2b047] focus:outline-none"
                        >
                          <option value="Residential Roofing">Residential Roofing</option>
                          <option value="HVAC Replacement">HVAC Replacement</option>
                          <option value="Metal Roofing">Metal Roofing</option>
                          <option value="Storm Damage Repair">Storm Damage Repair</option>
                          <option value="Bathroom & Tile Remodel">Bathroom &amp; Tile Remodel</option>
                          <option value="Land Clearing & Grading">Land Clearing &amp; Grading</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer & Project Folder Box */}
                    <div className="p-4 rounded-xl bg-[#131826] border border-[#e2b047]/35 space-y-3">
                      <div className="text-xs font-extrabold text-[#fde047]">
                        🗂️ Project Folder &amp; Customer Details (Triggers Report + 15-Min SMS Review)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">
                            Customer / Property Name
                          </label>
                          <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full h-10 px-3 rounded-lg bg-[#0b0c10] border border-white/15 text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">
                            Customer Phone (For Report &amp; 5★ SMS)
                          </label>
                          <input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full h-10 px-3 rounded-lg bg-[#0b0c10] border border-white/15 text-sm text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* GPS Coordinates Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                      <button
                        type="button"
                        onClick={() => handleCitySelectInPortal(dropCity)}
                        className="h-10 px-3 rounded-lg bg-[#161c2c] border border-[#e2b047]/50 text-[#fde047] text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Tap to Lock Truck GPS</span>
                      </button>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-1">
                          Latitude
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={latInput}
                          className="w-full h-10 px-3 rounded-lg bg-[#0b0c10] border border-white/10 text-xs font-mono text-emerald-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-1">
                          Longitude
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={lngInput}
                          className="w-full h-10 px-3 rounded-lg bg-[#0b0c10] border border-white/10 text-xs font-mono text-emerald-400"
                        />
                      </div>
                    </div>

                    {/* Project Description + Voice Dictate */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-300">
                          Project Description (Feeds Google Page &amp; GBP Post)
                        </label>
                        <button
                          type="button"
                          onClick={handleSimulateVoiceDictate}
                          className="px-3 py-1 rounded-lg bg-[#181e2e] border border-[#e2b047] text-[#fde047] text-[11px] font-extrabold flex items-center gap-1.5 cursor-pointer hover:bg-[#e2b047] hover:text-[#0b0c10] transition-colors"
                        >
                          <Mic className="w-3 h-3" />
                          <span>🎙️ Voice Dictate Sample</span>
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={jobNotes}
                        onChange={(e) => setJobNotes(e.target.value)}
                        className="w-full p-3 rounded-xl bg-[#0b0c10] border border-white/15 text-sm text-white focus:border-[#e2b047] focus:outline-none"
                      />
                    </div>

                    {/* HD Photos & Verification Stamp */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/15">
                          <Image
                            src="/pincam/roof-before.jpg"
                            alt="Before stage photo"
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                          <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-extrabold text-amber-300 text-center uppercase">
                            Before
                          </span>
                        </div>
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-emerald-400/50">
                          <Image
                            src="/pincam/roof-after.jpg"
                            alt="After stage photo"
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                          <span className="absolute bottom-0 inset-x-0 bg-emerald-950/90 text-[8px] font-extrabold text-emerald-300 text-center uppercase">
                            After
                          </span>
                        </div>
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer ml-1">
                          <input
                            type="checkbox"
                            checked={stampPhoto}
                            onChange={(e) => setStampPhoto(e.target.checked)}
                            className="accent-[#e2b047] w-4 h-4"
                          />
                          <span>Photo Verification Stamp</span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#f3c973] to-[#d4af37] hover:brightness-110 text-[#090b10] font-black text-xs uppercase tracking-wider cursor-pointer shadow-[0_8px_28px_rgba(226,176,71,0.35)]"
                      >
                        📌 Drop Pin Live to Map &amp; Google →
                      </button>
                    </div>
                  </form>
                ) : portalSubTab === "social_studio" ? (
                  /* Authentic Social Studio Preview inside Portal */
                  <div className="rounded-2xl p-6 bg-[#12141c] border border-white/10 space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-[#e2b047]">
                          BUILT-IN AI SOCIAL &amp; GBP STUDIO
                        </span>
                        <h4 className="text-xl font-black text-white">
                          One Job Pin → Facebook, Instagram &amp; Google Business Post
                        </h4>
                      </div>
                      <Sparkles className="w-5 h-5 text-[#e2b047]" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#0b0c10] border border-white/10 space-y-2">
                        <div className="text-xs font-extrabold text-emerald-400">
                          ✓ Google Business Profile &ldquo;What&apos;s New&rdquo; Update
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          &ldquo;Just wrapped up a {dropService.toLowerCase()} project in {dropCity}! Full synthetic underlayment, ridge ventilation, and spotless magnetic cleanup by {techName}. Need an honest inspection in {dropCity.split(",")[0]}? Call or request your estimate online.&rdquo;
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0b0c10] border border-white/10 space-y-2">
                        <div className="text-xs font-extrabold text-[#fde047]">
                          ✓ Branded Before/After Split &amp; 9:16 Reel Ready
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Auto-generates a branded Before/After composite graphic with your company logo, city tag, and service badge ready to post to Facebook &amp; Instagram in one tap.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Authentic Crew Messenger Panel Preview */
                  <div className="rounded-2xl p-6 bg-[#12141c] border border-white/10 space-y-3.5 text-left">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-[#e2b047]">
                      💬 Real-Time Crew Messenger (Linked to Job Folders)
                    </div>
                    {[
                      {
                        who: "Eddie Buchanan • Lead Tech",
                        time: "10:18 AM",
                        msg: " Chimneys & step flashing sealed on the Madison job. Dropping final After pin now.",
                      },
                      {
                        who: "Office Dispatch",
                        time: "10:19 AM",
                        msg: "Awesome — homeowner photo report link & Google review text are queued!",
                      },
                    ].map((chat, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#0b0c10] border border-white/10"
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-bold text-white">{chat.who}</span>
                          <span>{chat.time}</span>
                        </div>
                        <p className="text-xs text-slate-300">{chat.msg}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===============================================================
              SCREEN 03: REAL `/pin-page` AUTO-SEO & ANSWER ENGINE VIEW
          ================================================================ */}
          {activeTab === "seo_page" && (
            <div className="p-5 sm:p-8 lg:p-10">
              <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 items-start text-left">
                {/* Left: Interactive Before/After Transformation Slider */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#e2b047]/15 border border-[#e2b047]/40 text-[10px] font-extrabold uppercase text-[#e2b047]">
                      {activePin.service}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-[10px] font-mono font-bold text-emerald-300">
                      ✓ JSON-LD LocalBusiness Schema
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {activePin.service} in {activePin.city}
                  </h3>

                  <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#12141c]">
                    <div className="px-4 py-2.5 bg-[#090b10] border-b border-white/10 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#e2b047] font-bold flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5" />
                        Interactive Transformation Slider
                      </span>
                      <span className="text-slate-400">
                        GPS: {activePin.lat}, {activePin.lng}
                      </span>
                    </div>

                    <div className="relative aspect-[16/10] select-none">
                      <Image
                        src={activePin.afterPhoto}
                        alt={`Completed ${activePin.service} in ${activePin.city}`}
                        fill
                        sizes="(max-width: 1024px) 92vw, 620px"
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - seoSplit}% 0 0)` }}
                      >
                        <Image
                          src={activePin.beforePhoto}
                          alt="Before project photo"
                          fill
                          sizes="(max-width: 1024px) 92vw, 620px"
                          className="object-cover"
                        />
                      </div>
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-[#e2b047] pointer-events-none"
                        style={{ left: `${seoSplit}%` }}
                      >
                        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#e2b047] text-[#0b0c10] font-black text-xs flex items-center justify-center border-2 border-white">
                          ↔
                        </div>
                      </div>
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 text-[10px] font-bold text-amber-300">
                        BEFORE
                      </span>
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/80 text-[10px] font-bold text-emerald-300">
                        AFTER
                      </span>
                    </div>

                    <div className="px-4 py-3 bg-[#090b10] border-t border-white/10 flex items-center gap-3">
                      <span className="text-[11px] font-mono text-slate-400">Before</span>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={seoSplit}
                        onChange={(e) => setSeoSplit(Number(e.target.value))}
                        aria-label="Slide before and after transformation"
                        className="w-full accent-[#e2b047] cursor-ew-resize"
                      />
                      <span className="text-[11px] font-mono text-[#e2b047] font-bold">
                        After
                      </span>
                    </div>
                  </div>

                  {/* Technician & Date Metadata Strip */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[#12141c] border border-white/10">
                      <div className="text-[10px] font-mono uppercase text-slate-400">
                        Lead Tech
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {activePin.author}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#12141c] border border-white/10">
                      <div className="text-[10px] font-mono uppercase text-slate-400">
                        Service Area
                      </div>
                      <div className="text-xs font-bold text-[#e2b047] mt-0.5">
                        {activePin.city}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#12141c] border border-white/10">
                      <div className="text-[10px] font-mono uppercase text-slate-400">
                        Logged Date
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {activePin.date}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Authentic `PinDetailClient` Answer Engine (AEO) + Neighborhood Lead Form */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-2xl p-5 bg-[#12141c] border border-white/10 space-y-3.5">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#e2b047]">
                      Project Analysis &amp; Expert Answers (Google + AI Search)
                    </div>
                    <p className="text-xs text-slate-300 italic font-serif leading-relaxed">
                      &ldquo;{activePin.quote}&rdquo;
                    </p>
                    {activePin.aeoQuestions.map((qa, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#0b0c10] border border-white/[0.08] space-y-1"
                      >
                        <div className="text-xs font-bold text-white">{qa.q}</div>
                        <p className="text-xs text-slate-400 leading-relaxed">{qa.a}</p>
                      </div>
                    ))}
                  </div>

                  {/* Built-In Neighborhood Estimate Conversion Box */}
                  <div className="rounded-2xl p-5 bg-gradient-to-b from-[#161926] to-[#12141c] border border-[#e2b047]/40 space-y-3">
                    <div className="text-sm font-black text-white">
                      Need {activePin.service} Near {activePin.city}?
                    </div>
                    <p className="text-xs text-slate-300">
                      Every auto-generated PinDrop™ page embeds your lead form &amp; click-to-call bar so neighbors searching Google convert on the spot.
                    </p>
                    <Link
                      href="/book"
                      className="w-full py-3 px-4 rounded-xl bg-[#e2b047] hover:brightness-110 text-[#0b0c10] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Get PinDrop™ Wired to Your Site</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              SCREEN 04: 7 TRADES + 1-CLICK WEBSITE EMBED WIDGET
          ================================================================ */}
          {activeTab === "embed_trades" && (
            <div className="p-5 sm:p-8 lg:p-10">
              <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 items-start text-left">
                {/* Left: 7 Pre-Built Trade Presets */}
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#e2b047]">
                    Multi-Trade Contractor Engine
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Pre-Loaded for Every Home &amp; Commercial Trade.
                  </h3>
                  <p className="text-sm text-slate-300">
                    Click your trade below to see the pre-built service tags, inspection checklists, and neighborhood SEO templates included out of the box:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TRADE_PRESETS.map((trade) => {
                      const active = selectedTrade.id === trade.id;
                      return (
                        <button
                          key={trade.id}
                          type="button"
                          onClick={() => setSelectedTrade(trade)}
                          className={`p-3 rounded-xl border text-left text-xs font-extrabold transition-all cursor-pointer ${
                            active
                              ? "bg-[#e2b047]/15 border-[#e2b047] text-white"
                              : "bg-[#12141c] border-white/10 text-slate-300 hover:border-white/25"
                          }`}
                        >
                          {trade.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-2xl bg-[#12141c] border border-white/10">
                    <div className="text-xs font-bold text-[#fde047] mb-2.5">
                      Included {selectedTrade.label} Pin Tags:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedTrade.services.map((svc) => (
                        <span
                          key={svc}
                          className="px-3 py-1 rounded-full bg-[#0b0c10] border border-white/10 text-xs font-semibold text-slate-200"
                        >
                          <MapPin className="w-3 h-3 inline mr-1 text-[#e2b047]" />
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Native Build OR 2-Line Embed on Any Existing Website */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="rounded-2xl p-5 bg-[#12141c] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                        <Code2 className="w-4 h-4" />
                        Works on Any Website (WordPress, Wix, Squarespace, Custom)
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyEmbed}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/10 text-[11px] font-mono text-slate-200 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedEmbed ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Snippet</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Building a new Power Digital Next.js website? We bake PinDrop™ natively into your domain for maximum SEO power. Already love your current website? Drop in this 1-line widget to add a live satellite job map &amp; recent project carousel today:
                    </p>
                    <pre className="p-3.5 rounded-xl bg-[#08090d] border border-white/10 text-[11px] font-mono text-amber-200 overflow-x-auto">
                      {embedSnippet}
                    </pre>
                  </div>

                  {/* Real Live Proof Screenshot of Born Again Roofing `/pins/` */}
                  <div className="rounded-2xl overflow-hidden bg-[#12141c] border border-[#e2b047]/35">
                    <div className="px-4 py-2.5 bg-[#090b10] border-b border-white/10 flex items-center justify-between text-xs">
                      <span className="font-bold text-white">
                        Live Production Proof: Born Again Roofing (99+ Pins)
                      </span>
                      <a
                        href="https://bornagainroofing.com/pins/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#e2b047] font-extrabold hover:underline flex items-center gap-1"
                      >
                        <span>Open Live Map</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="relative h-44 w-full">
                      <Image
                        src="/pindrop/bar-live-pins.jpg"
                        alt="Born Again Roofing live PinDrop satellite map and feed with 99+ pins"
                        fill
                        sizes="(max-width: 1024px) 92vw, 540px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
