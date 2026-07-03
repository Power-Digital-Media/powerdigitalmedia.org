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
  title: "Power Digital Media | Elite Web Design, Custom Apps & Growth Marketing",
  description: "We engineer blistering-fast Next.js web architectures, bespoke custom applications, and high-converting growth marketing systems in Jackson, MS.",
  openGraph: {
    title: "Power Digital Media | Elite Web Design, Custom Apps & Growth Marketing",
    description: "We engineer blistering-fast Next.js web architectures, bespoke custom applications, and high-converting growth marketing systems in Jackson, MS.",
    images: ["/images/og-image.png"],
  },
};

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar />

      {/* 
        CRITICAL LCP OPTIMIZATION: 
        We render the hardware-accelerated CyberHeroBg here
        to eliminate hydration delays while displaying a premium 3D perspective network platform.
      */}
      <section className="relative overflow-hidden flex flex-col justify-center min-h-0 md:min-h-screen pt-28 pb-12 md:py-0">
        <DeferredHeroBg variant="web-design" />

        <div className="container relative z-10 px-4 mx-auto text-center mt-4 md:mt-16 mb-4">
          <span 
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
            className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[8px] md:text-[9px] mb-4 md:mb-6 block"
          >
            THE COMPLETE LOCAL BUSINESS TECHNOLOGY STACK
          </span>
          <h1 
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
            className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-[0.85] uppercase"
          >
            Jackson MS <br /> One-Stop
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-glow-cyan text-glow block mt-2">
              Business Tech Stack
            </span>
          </h1>
          <p 
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
            className="text-foreground/60 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            We engineer blistering-fast websites, configure automatic lead-tracking CRMs, and set up cloud business phone systems. One local partner for your entire digital backbone.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 mt-6 md:mt-10">
            <a
              href="/free-audit"
              className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 bg-white text-black font-black rounded-full hover:bg-cyan-400 hover:text-white transition-all uppercase tracking-widest text-[9px] shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95 text-center block"
            >
              Get a Free Architecture Audit
            </a>
            <a href="/book" className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 md:px-12 md:py-5 border border-white/10 rounded-full font-black uppercase tracking-widest text-[9px] hover:bg-cyan-400 hover:text-white hover:border-cyan-400 transition-all group active:scale-95 block">
              <Video className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white transition-colors" />
              Schedule a Google Meet
            </a>
          </div>

          {/* Trust Signals Bar */}
          <div className="mt-14 mb-8 flex flex-col items-center justify-center gap-4 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">Verified 90+/100 Mobile PageSpeed</span>
              </div>
              <BBBSeal variant="inline" />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-foreground/40 mt-1">Most agencies score a 40. We build blistering fast infrastructure.</p>
          </div>
        </div>
      </section>

      <WakeUpCall
        title="You run a premium business. But your digital presence looks strictly amateur."
        subtitle="Mediocre digital architecture kills great companies."
        paragraph="If your brand looks like everyone else's, you will be priced like everyone else. A slow, outdated website isn't just a bad look—it's actively bleeding revenue. We engineer high-velocity digital ecosystems that separate you from the noise and command absolute authority in your market."
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
