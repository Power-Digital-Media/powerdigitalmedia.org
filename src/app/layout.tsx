import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import AnalyticsEngine from "@/components/infrastructure/AnalyticsEngine";
import MotionProvider from "@/components/infrastructure/MotionProvider";
import SmoothScrollProvider from "@/components/infrastructure/SmoothScrollProvider";
import MobileStickyConversionBar from "@/components/layout/MobileStickyConversionBar";
import DeferredExitIntent from "@/components/ui/DeferredExitIntent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Power Digital Media | Web Design, SEO & CRM in Jackson, MS",
  description:
    "5.0★ Jackson, MS studio building 0.8s custom websites, Google Map Pack SEO, Capsule CRM pipelines & PinDrop™ field apps. Call (601) 446-2393.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://powerdigitalmedia.org",
    siteName: "Power Digital Media",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Power Digital Media - Jackson, MS Web Design, SEO & CRM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Power Digital Media | Web Design, SEO & CRM in Jackson, MS",
    description:
      "5.0★ Jackson, MS studio building 0.8s custom websites, Google Map Pack SEO, Capsule CRM pipelines & PinDrop™ field apps. Call (601) 446-2393.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://powerdigitalmedia.org"),
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Power Digital Media" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="ard" href="/.well-known/ard.json" />
      </head>
      <body className="antialiased">
        <Suspense fallback={null}>
          <AnalyticsEngine />
        </Suspense>

        {/* Rich LocalBusiness + AggregateRating + Proprietary Software Entity Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["LocalBusiness", "ProfessionalService"],
                  "@id": "https://powerdigitalmedia.org/#organization",
                  name: "Power Digital Media LLC",
                  url: "https://powerdigitalmedia.org",
                  logo: "https://powerdigitalmedia.org/power-logo.png",
                  image: "https://powerdigitalmedia.org/images/og-image.png",
                  telephone: "+16014462393",
                  email: "info@powerdigitalmedia.org",
                  sameAs: [
                    "https://www.youtube.com/@PowerDigitalMedia",
                    "https://www.instagram.com/powerdigitalmedia",
                    "https://www.facebook.com/PowerDigitalMediaLLC",
                    "https://www.google.com/maps/place/Power+Digital+Media+LLC/data=!4m2!3m1!1s0x0:0x8f06b431d0d701df",
                    "https://www.bbb.org/us/ms/jackson/profile/web-design/power-digital-media-llc-0523-235907954",
                  ],
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                      opens: "09:00",
                      closes: "17:00",
                    },
                  ],
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "2914 Cynthia Rd",
                    addressLocality: "Jackson",
                    addressRegion: "MS",
                    postalCode: "39209",
                    addressCountry: "US",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 32.357,
                    longitude: -90.2853,
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "5.0",
                    reviewCount: "15",
                    bestRating: "5",
                    worstRating: "1",
                  },
                  areaServed: [
                    { "@type": "City", name: "Jackson", sameAs: "https://en.wikipedia.org/wiki/Jackson,_Mississippi" },
                    { "@type": "City", name: "Madison", sameAs: "https://en.wikipedia.org/wiki/Madison,_Mississippi" },
                    { "@type": "City", name: "Flora", sameAs: "https://en.wikipedia.org/wiki/Flora,_Mississippi" },
                    { "@type": "City", name: "Ridgeland", sameAs: "https://en.wikipedia.org/wiki/Ridgeland,_Mississippi" },
                    { "@type": "City", name: "Brandon", sameAs: "https://en.wikipedia.org/wiki/Brandon,_Mississippi" },
                    { "@type": "City", name: "Flowood", sameAs: "https://en.wikipedia.org/wiki/Flowood,_Mississippi" },
                    { "@type": "City", name: "Pearl", sameAs: "https://en.wikipedia.org/wiki/Pearl,_Mississippi" },
                    { "@type": "City", name: "Clinton", sameAs: "https://en.wikipedia.org/wiki/Clinton,_Mississippi" },
                    { "@type": "City", name: "Canton", sameAs: "https://en.wikipedia.org/wiki/Canton,_Mississippi" },
                    { "@type": "City", name: "Byram", sameAs: "https://en.wikipedia.org/wiki/Byram,_Mississippi" },
                    { "@type": "State", name: "Mississippi" },
                  ],
                  founder: {
                    "@id": "https://powerdigitalmedia.org/#founder",
                  },
                  makesOffer: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Custom Next.js Web Design",
                        url: "https://powerdigitalmedia.org/web-design",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Contractor & Home Service Growth Engine",
                        url: "https://powerdigitalmedia.org/contractors",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Local SEO & Google Business Profile Map Pack Optimization",
                        url: "https://powerdigitalmedia.org/local-seo",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "CRM Integration, Custom Checkout & Business Automation",
                        url: "https://powerdigitalmedia.org/custom-applications",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Targeted Local Lead Generation & Paid Social Funnels",
                        url: "https://powerdigitalmedia.org/marketing",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "SoftwareApplication",
                        name: "PinCam™ Contractor Jobsite Camera & Proof Studio",
                        applicationCategory: "BusinessApplication",
                        operatingSystem: "iOS, Android, Web",
                        url: "https://powerdigitalmedia.org/pincam",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "SoftwareApplication",
                        name: "PDM PinDrop™ Contractor GPS Neighborhood SEO & Review Engine",
                        applicationCategory: "BusinessApplication",
                        operatingSystem: "iOS, Android, Web",
                        url: "https://powerdigitalmedia.org/pindrop",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "SoftwareApplication",
                        name: "PDM Site Intelligence™ 24/7 Website & SEO Watchtower",
                        applicationCategory: "BusinessApplication",
                        operatingSystem: "Web, Cloud",
                        url: "https://powerdigitalmedia.org/site-intelligence",
                      },
                    },
                  ],
                  description:
                    "Power Digital Media LLC builds high-converting custom Next.js websites, Google Map Pack SEO systems, and proprietary PinCam™, PDM PinDrop™, and PDM Site Intelligence™ software for contractors and businesses across Jackson, Madison, Ridgeland, Brandon, Flowood, and Clinton, Mississippi.",
                },
                {
                  "@type": "Person",
                  "@id": "https://powerdigitalmedia.org/#founder",
                  name: "Damein Donald",
                  jobTitle: "Founder & Lead Engineer",
                  worksFor: {
                    "@id": "https://powerdigitalmedia.org/#organization",
                  },
                  url: "https://powerdigitalmedia.org/about",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://powerdigitalmedia.org/#website",
                  name: "Power Digital Media",
                  alternateName: "Power Digital Media LLC",
                  url: "https://powerdigitalmedia.org/",
                  publisher: {
                    "@id": "https://powerdigitalmedia.org/#organization",
                  },
                  inLanguage: "en-US",
                },
              ],
            }),
          }}
        />

        <MotionProvider>
          <SmoothScrollProvider>
            {children}
            <MobileStickyConversionBar />
            <DeferredExitIntent />
          </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
