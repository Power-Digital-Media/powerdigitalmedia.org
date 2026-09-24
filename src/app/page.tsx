import dynamic from "next/dynamic";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import DeferredHeroBg from "@/components/ui/DeferredHeroBg";
import { Video } from "lucide-react";
import DeferredServices from "@/components/ui/DeferredServices";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";

const Portfolio = dynamic(() => import("@/components/sections/Portfolio"));
const LocalWebDesign = dynamic(() => import("@/components/sections/LocalWebDesign"));
const TechStack = dynamic(() => import("@/components/sections/TechStack"));
const LatestInsights = dynamic(() => import("@/components/sections/LatestInsights"));
const WakeUpCall = dynamic(() => import("@/components/ui/WakeUpCall"));
const BBBSeal = dynamic(() => import("@/components/ui/BBBSeal"));
const AEOFAQ = dynamic(() => import("@/components/sections/AEOFAQ"));

export const metadata = {
  title: "Power Digital Media | Jackson MS Web Design, Local SEO & Growth Tech",
  description: "Websites that turn clicks into calls. We build blistering-fast Next.js websites, PinDrop™ contractor tech, and automated CRM pipelines for Mississippi businesses.",
  openGraph: {
    title: "Power Digital Media | Jackson MS Web Design, Local SEO & Growth Tech",
    description: "Websites that turn clicks into calls. We build blistering-fast Next.js websites, PinDrop™ contractor tech, and automated CRM pipelines for Mississippi businesses.",
    images: ["/images/og-image.png"],
  },
};

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar />

      {/* 
        HERO SECTION:
        High conversion, warm authority, highlighting local speed and real contractor growth tech.
      */}
      <section className="relative overflow-hidden flex flex-col justify-center min-h-0 md:min-h-screen pt-28 pb-12 md:py-0">
        <DeferredHeroBg variant="web-design" />

        <div className="container relative z-10 px-4 mx-auto text-center mt-4 md:mt-16 mb-4">
          <span 
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
            className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[9px] md:text-xs mb-4 md:mb-6 block"
          >
            Jackson, MS • Web Design, Local SEO &amp; Growth Tech
          </span>
          <h1 
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-[0.9] uppercase"
          >
            Websites That Turn <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 text-glow-cyan text-glow inline-block mt-1">
              Clicks Into Calls.
            </span>
          </h1>
          <p 
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
            className="text-foreground/75 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-normal"
          >
            We build custom, lightning-fast websites and proprietary contractor tools that outrank competitors, dominate Google Maps, and capture high-paying clients across Central Mississippi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 md:mt-10">
            <a
              href="/free-audit"
              className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 bg-white text-slate-950 font-black rounded-full hover:bg-cyan-400 hover:text-slate-950 transition-all uppercase tracking-widest text-[10px] md:text-xs shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-95 text-center block"
            >
              Get Free Website Audit
            </a>
            <a 
              href="tel:6013002004" 
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 md:px-10 md:py-5 border border-cyan-400/40 bg-cyan-950/20 text-cyan-400 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-cyan-400 hover:text-slate-950 transition-all group active:scale-95 block"
            >
              Call (601) 300-2004
            </a>
            <a 
              href="/book" 
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 md:px-8 md:py-5 border border-white/15 rounded-full font-bold uppercase tracking-widest text-[10px] text-white/80 hover:text-white hover:bg-white/10 transition-all group active:scale-95 block"
            >
              <Video className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white transition-colors" />
              Book 15-Min Call
            </a>
          </div>

          {/* Trust Signals Bar */}
          <div className="mt-12 mb-6 flex flex-col items-center justify-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                <span className="text-xs font-bold tracking-wider uppercase text-cyan-400">⚡ 95+ Mobile Speed Score</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                <span className="text-xs font-semibold text-white/80">📍 Jackson • Madison • Brandon • Clinton</span>
              </div>
              <BBBSeal variant="inline" />
            </div>
            <p className="text-xs text-foreground/50 max-w-lg">
              No bloated templates. Hand-coded Next.js speed + Google Maps optimization built to get your phone ringing.
            </p>
          </div>
        </div>
      </section>

      <WakeUpCall
        title="Is Your Outdated Website Costing You High-Paying Customers?"
        subtitle="When someone needs your service, they decide in 3 seconds whether to call you or your competitor."
        paragraph="If your website is slow on mobile, hard to navigate, or looks like it was built a decade ago, you are handing revenue to the competition. We build fast, high-converting digital platforms that establish immediate trust, rank on Google Maps, and turn local traffic into booked jobs."
      />
      <Portfolio />
      <LocalWebDesign />
      <DeferredServices />
      <TechStack />
      <LatestInsights />
      <AEOFAQ />
      <DeferredFooterSections />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Power Digital Media",
            "image": "https://powerdigitalmedia.org/hero-bg.webp",
            "url": "https://powerdigitalmedia.org",
            "telephone": "+1-601-300-2004",
            "priceRange": "$$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2914 Cynthia Rd",
              "addressLocality": "Jackson",
              "addressRegion": "MS",
              "postalCode": "39209",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 32.3570,
              "longitude": -90.2853
            },
            "areaServed": [
              { "@type": "City", "name": "Jackson" },
              { "@type": "City", "name": "Madison" },
              { "@type": "City", "name": "Brandon" },
              { "@type": "City", "name": "Flowood" },
              { "@type": "City", "name": "Clinton" },
              { "@type": "City", "name": "Ridgeland" }
            ],
            "description": "Jackson, MS elite digital agency engineering blistering-fast Next.js web architectures, bespoke custom applications, and high-converting growth marketing systems.",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.facebook.com/powerdigitalmedia",
              "https://www.instagram.com/powerdigitalmedia"
            ]
          })
        }}
      />
    </main>
  );
}
