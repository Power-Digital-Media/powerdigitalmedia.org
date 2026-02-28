import dynamic from "next/dynamic";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";

const Portfolio = dynamic(() => import("@/components/sections/Portfolio"));

const Footer = dynamic(() => import("@/components/layout/Footer"));

const Services = dynamic(() => import("@/components/sections/Services"));
const LocalWebDesign = dynamic(() => import("@/components/sections/LocalWebDesign"));
const TechStack = dynamic(() => import("@/components/sections/TechStack"));
const LatestInsights = dynamic(() => import("@/components/sections/LatestInsights"));
const LeadArchitect = dynamic(() => import("@/components/sections/LeadArchitect"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export const metadata = {
  title: "Power Digital Media | Premier Digital Production Studio",
  description: "Transforming brands with high-velocity content, expert web design, and cinematic video production in Jackson, MS.",
  openGraph: {
    title: "Power Digital Media | Premier Digital Production Studio",
    description: "Transforming brands with high-velocity content, expert web design, and cinematic video production in Jackson, MS.",
    images: ["/hero-bg.webp"],
  },
};

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar />

      {/* 
        CRITICAL LCP OPTIMIZATION: 
        We render the Hero Background here in the Server Component 
        to eliminate the 1.8s "Render Delay" caused by React hydration in client components.
      */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="absolute top-0 w-full h-[60vh] bg-gradient-to-b from-blue-500/5 to-transparent" />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center mt-32 md:mt-48 mb-4">
        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[8px] md:text-[9px] mb-4 md:mb-6 block">
          CENTRAL MISSISSIPPI'S FASTEST WEB ARCHITECTURE
        </span>
        <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-[0.85] uppercase">
          We Engineer <br /> Websites That
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-glow-cyan text-glow block mt-2">
            Dominate Search
          </span>
        </h1>
        <p className="text-foreground/60 max-w-2xl mx-auto text-lg leading-relaxed">
          Lightning-fast Next.js architecture designed for humans and trusted by AI search engines.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 mt-6 md:mt-10">
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 bg-white text-black font-black rounded-full hover:bg-cyan-400 hover:text-white transition-all uppercase tracking-widest text-[9px] shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95 text-center block"
          >
            Get a Free Architecture Audit
          </a>
          <a href="#studio" className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 md:px-12 md:py-5 border border-white/10 rounded-full font-black uppercase tracking-widest text-[9px] hover:bg-white/5 hover:border-white/20 transition-all group active:scale-95 block">
            View The Tech Stack
          </a>
        </div>

        {/* Speed Proof / Trust Badge */}
        <div className="mt-14 mb-8 flex flex-col items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">Verified 90+/100 Mobile PageSpeed</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-foreground/40 mt-2">Most agencies score a 40. We build blistering fast infrastructure.</p>
        </div>
      </div>

      <Portfolio />
      <LocalWebDesign />
      <Services />
      <TechStack />
      <LatestInsights />
      <LeadArchitect />
      <Contact />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Power Digital Media",
            "image": "https://powerdigitalmedia.org/hero-bg.webp",
            "url": "https://powerdigitalmedia.org",
            "telephone": "+1-601-446-2393",
            "priceRange": "$$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Regional Office",
              "addressLocality": "Jackson",
              "addressRegion": "MS",
              "postalCode": "39201",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 32.2988,
              "longitude": -90.1848
            },
            "areaServed": [
              { "@type": "City", "name": "Jackson" },
              { "@type": "City", "name": "Madison" },
              { "@type": "City", "name": "Brandon" },
              { "@type": "City", "name": "Flowood" },
              { "@type": "City", "name": "Clinton" },
              { "@type": "City", "name": "Ridgeland" }
            ],
            "description": "Premier digital production studio specializing in cinematic video production, high-end web design, and AI-driven marketing in the Jackson, MS area.",
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
      <Footer />
    </main>
  );
}
