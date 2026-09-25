import dynamic from "next/dynamic";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import DeferredHeroBg from "@/components/ui/DeferredHeroBg";
import { Video } from "lucide-react";
import DeferredServices from "@/components/ui/DeferredServices";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
import GoogleReviewsSection from "@/components/sections/GoogleReviewsSection";

const ConnectedArchitecture = dynamic(() => import("@/components/sections/ConnectedArchitecture"));
const LocalWebDesign = dynamic(() => import("@/components/sections/LocalWebDesign"));
const TechStack = dynamic(() => import("@/components/sections/TechStack"));
const LatestInsights = dynamic(() => import("@/components/sections/LatestInsights"));
const SpeedComparisonCard = dynamic(() => import("@/components/ui/SpeedComparisonCard"));
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
        Rich, structured 2-column agency hero layout built for high trust, clear readability, and conversion.
      */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-40 md:pb-28 bg-[#090e1a] border-b border-white/5">
        <DeferredHeroBg variant="home" />

        <div className="container relative z-10 px-4 sm:px-6 mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            
            {/* Left Column: Value Prop & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Local Trust Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
                <div className="flex text-amber-400 text-xs">
                  ★★★★★
                </div>
                <span className="text-amber-300 font-bold tracking-wider uppercase text-[11px]">
                  5.0 Rated Jackson, MS Web Studio • Direct Support by Damein
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] uppercase text-white mb-6">
                High-Speed Websites Built to <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400">
                  Grow Your Business.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed font-normal mb-8 max-w-2xl">
                We build clean, lightning-fast Next.js websites and Google Maps engines for Mississippi contractors and business owners. Load in under 0.4 seconds, outrank local competitors, and turn website clicks into booked phone calls.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
                <a
                  href="/free-audit"
                  className="px-8 py-4 bg-white text-slate-950 font-black rounded-full hover:bg-amber-400 transition-all uppercase tracking-wider text-xs shadow-[0_0_30px_rgba(251,191,36,0.25)] text-center block active:scale-95"
                >
                  Get Free 5-Minute Audit
                </a>
                <a 
                  href="tel:6014462393" 
                  className="flex items-center justify-center gap-2 px-7 py-4 border border-amber-400/40 bg-amber-500/10 text-amber-300 rounded-full font-black uppercase tracking-wider text-xs hover:bg-amber-400 hover:text-slate-950 transition-all active:scale-95"
                >
                  📞 (601) 446-2393
                </a>
                <a 
                  href="/book" 
                  className="flex items-center justify-center gap-2 px-6 py-4 border border-white/15 rounded-full font-bold uppercase tracking-wider text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                >
                  <Video className="w-4 h-4 text-cyan-400" />
                  Book Call
                </a>
              </div>

              {/* Key Bullet Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 w-full">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="text-emerald-400 font-bold">✓</span> Opens in &lt; 0.4s on Cell Phones
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="text-emerald-400 font-bold">✓</span> Google Maps 3-Pack Dominance
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="text-emerald-400 font-bold">✓</span> 100% Hand-Crafted (No WordPress)
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="text-emerald-400 font-bold">✓</span> Personal Cell Support from Damein
                </div>
              </div>

            </div>

            {/* Right Column: Tangible Browser Mockup Showcase */}
            <div className="lg:col-span-5 relative w-full">
              <div className="relative rounded-3xl border border-white/15 bg-slate-950/80 shadow-2xl overflow-hidden backdrop-blur-md">
                
                {/* Browser Title Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="px-4 py-1 rounded-full bg-slate-950 border border-white/10 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <span className="text-emerald-400">🔒</span> msdirt.com
                  </div>
                  <div className="w-6" />
                </div>

                {/* Screenshot Frame */}
                <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                  <Image
                    src="/portfolio/geaux-pro-outdoors.webp"
                    alt="Geaux Pro Outdoors (MS Dirt) - Live Next.js Web Build in Mississippi"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                </div>

                {/* Floating Metrics Over Mockup */}
                <div className="p-4 bg-slate-950/95 border-t border-white/10 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Mobile Speed Score:</span>
                    <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      ⚡ 99/100 (0.4s)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Google Map Ranking:</span>
                    <span className="font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      📍 #1 Central MS Dirt Work
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Equipment Showcase:</span>
                    <span className="font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                      ✓ Instant Hauling Quote Engine
                    </span>
                  </div>
                </div>

              </div>

              {/* Floating Verified Google Review Pill */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 p-3 rounded-2xl bg-slate-900/95 border border-amber-500/30 shadow-2xl backdrop-blur-xl max-w-[280px]">
                <div className="flex items-center gap-2 text-xs mb-1">
                  <span className="text-amber-400">★★★★★</span>
                  <span className="text-[9px] font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-wider">
                    Google Review
                  </span>
                </div>
                <p className="text-[11px] text-white font-medium leading-tight">
                  &ldquo;Took my marketing program from the dumps all the way to the moon. Very responsive and results oriented.&rdquo;
                </p>
                <span className="text-[10px] text-amber-300 font-semibold block mt-1">
                  — Scott Lowery, Owner, Geaux Pro Outdoors (Bentonia, MS)
                </span>
              </div>

            </div>

          </div>

          {/* Social Proof / Client Ribbon Below Hero */}
          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-7xl mx-auto text-slate-400 text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-400">
              Trusted by Central Mississippi Businesses:
            </span>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-bold text-slate-300 text-sm">
              <span>Born Again Roofing</span>
              <span className="text-slate-600">•</span>
              <span>T&apos;Beaux&apos;s Seafood</span>
              <span className="text-slate-600">•</span>
              <span>Geaux Pro Outdoors</span>
              <span className="text-slate-600">•</span>
              <span>Jackson Metro Contractors</span>
            </div>
          </div>

        </div>
      </section>

      <SpeedComparisonCard />
      <LocalWebDesign />
      <ConnectedArchitecture />
      <GoogleReviewsSection />
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
            "name": "Power Digital Media LLC",
            "image": "https://powerdigitalmedia.org/hero-bg.webp",
            "url": "https://powerdigitalmedia.org",
            "telephone": "+1-601-446-2393",
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
              { "@type": "City", "name": "Ridgeland" },
              { "@type": "City", "name": "Pearl" }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "5",
              "bestRating": "5"
            },
            "description": "Jackson, MS web design and SEO agency building ultra-fast Next.js websites, PinDrop™ contractor technology, and automated CRM pipelines for Mississippi businesses.",
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
              "https://www.instagram.com/powerdigitalmedia",
              "https://www.bbb.org/us/ms/jackson/profile/web-design/power-digital-media-llc-0523-235907954",
              "https://g.page/r/Cd8B19AxtAaPEBM/review"
            ]
          })
        }}
      />
    </main>
  );
}
