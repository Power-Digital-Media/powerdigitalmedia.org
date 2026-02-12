import dynamic from "next/dynamic";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Portfolio from "@/components/sections/Portfolio";

const Services = dynamic(() => import("@/components/sections/Services"));
const TechStack = dynamic(() => import("@/components/sections/TechStack"));
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
      <div className="absolute top-0 left-0 right-0 h-screen w-full z-0 overflow-hidden bg-background">
        <Image
          src="/hero-bg.webp"
          alt="Power Digital Media - Jackson, MS Production Studio"
          fill
          priority
          fetchPriority="high"
          quality={65}
          sizes="100vw"
          className="object-cover opacity-40 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
        <div className="absolute inset-0 cyber-grid opacity-20" />
      </div>

      <Portfolio />
      <Services />
      <TechStack />
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
