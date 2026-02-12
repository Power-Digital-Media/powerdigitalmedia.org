import dynamic from "next/dynamic";
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
            "image": "https://powerdigitalmedia.com/hero-bg.webp",
            "@id": "https://powerdigitalmedia.com",
            "url": "https://powerdigitalmedia.com",
            "telephone": "+1-601-555-0123", // Assuming a placeholder or known number
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Jackson",
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
