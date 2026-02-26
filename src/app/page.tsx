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
      <div className="absolute top-0 left-0 right-0 h-[140vh] w-full z-0 overflow-hidden bg-background pointer-events-none">
        <Image
          src="/hero-bg.webp"
          alt="Power Digital Media - Jackson, MS Production Studio"
          fill
          priority
          fetchPriority="high"
          quality={30}
          sizes="100vw"
          className="object-cover opacity-40 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
        <div className="absolute inset-0 cyber-grid opacity-20" />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center mt-32 md:mt-48 mb-4">
        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[8px] md:text-[9px] mb-4 md:mb-6 block">
          Premier Production in Jackson, MS & Madison Area
        </span>
        <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-[0.85] uppercase">
          Digital <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-glow-cyan text-glow">
            Architecture.
          </span>
        </h1>
        <p className="text-foreground/60 max-w-2xl mx-auto text-lg leading-relaxed">
          We build the high-performance media infrastructure and marketing systems that scale your brand's authority.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 mt-6 md:mt-10">
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 bg-white text-black font-black rounded-full hover:bg-cyan-400 hover:text-white transition-all uppercase tracking-widest text-[9px] shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95 text-center block"
          >
            Initialize Build
          </a>
          <a href="#services" className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 md:px-12 md:py-5 border border-white/10 rounded-full font-black uppercase tracking-widest text-[9px] hover:bg-white/5 hover:border-white/20 transition-all group active:scale-95 block">
            View Protocols
          </a>
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
