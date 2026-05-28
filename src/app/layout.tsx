import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import AnalyticsEngine from "@/components/infrastructure/AnalyticsEngine";
import MotionProvider from "@/components/infrastructure/MotionProvider";
import SmoothScrollProvider from "@/components/infrastructure/SmoothScrollProvider";
import Script from "next/script";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Power Digital Media | Elite Web Design, Custom Apps & Growth Marketing in Jackson, MS",
  description: "Jackson, MS elite digital agency specializing in Next.js, React & Vite web design, custom application development, and high-velocity growth marketing systems.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://powerdigitalmedia.org",
    siteName: "Power Digital Media",
    images: [
      {
        url: "/hero-bg.webp",
        width: 1200,
        height: 630,
        alt: "Power Digital Media Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Power Digital Media | Elite Web Design, Custom Apps & Growth Marketing",
    description: "Bespoke Web Design, Custom Applications, and High-Velocity Growth Marketing in Jackson, MS.",
    images: ["/hero-bg.webp"],
    creator: "@PowerDigitalMS",
    site: "@PowerDigitalMS",
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
    canonical: './',
  },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-52WQVB8N";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Site Verification (HTML Tag Method) */}
        <meta name="google-site-verification" content="3gJZWrSWWnZtSbDZgQzznQeNdzOgHuUcC8C-H2LzenA" />

        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >

        <Suspense fallback={null}>
          <AnalyticsEngine />
        </Suspense>
        {/* Organization Schema.org (GEO Optimization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://powerdigitalmedia.org/#organization",
              "name": "Power Digital Media LLC",
              "url": "https://powerdigitalmedia.org",
              "logo": "https://powerdigitalmedia.org/power-logo.webp",
              "image": "https://powerdigitalmedia.org/hero-bg.webp",
              "telephone": "+16014462393",
              "priceRange": "$$$",
              "sameAs": [
                "https://www.youtube.com/@PowerDigitalMedia",
                "https://www.instagram.com/PowerDigitalMedia",
                "https://www.facebook.com/PowerDigitalMedia",
                "https://www.google.com/search?q=Power+Digital+Media+Jackson+MS",
                "https://www.bbb.org/us/ms/jackson/profile/web-design/power-digital-media-llc"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jackson",
                "addressRegion": "MS",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 32.2988,
                "longitude": -90.1848
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Jackson",
                  "sameAs": "https://en.wikipedia.org/wiki/Jackson,_Mississippi"
                },
                {
                  "@type": "State",
                  "name": "Mississippi"
                }
              ],
              "founder": {
                "@type": "Person",
                "name": "Damein Donald",
                "jobTitle": "Lead Infrastructure Architect"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "15",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "E-Commerce Client"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "reviewBody": "Outstanding Next.js web development and CRM integration. Power Digital Media engineered a high-velocity marketing funnel that streamlined our customer bookings.",
                  "publisher": {
                    "@type": "Organization",
                    "name": "Google Reviews"
                  }
                },
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Regional Business Partner"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "reviewBody": "Damein Donald designed a robust, machine-readable custom application that exceeded all expectations. Extremely professional service.",
                  "publisher": {
                    "@type": "Organization",
                    "name": "Better Business Bureau"
                  }
                },
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Media Network Leader"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "reviewBody": "Exceptional audio-visual stage setup and SEO marketing architecture. Their attention to machine-readable schema is unparalleled.",
                  "publisher": {
                    "@type": "Organization",
                    "name": "Facebook Reviews"
                  }
                }
              ],
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "High-Velocity Web Design"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Bespoke Custom Applications"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "High-Velocity Growth Marketing"
                  }
                }
              ],
              "description": "Power Digital Media LLC is Jackson’s elite digital agency engineering high-performance web design, Next.js, React & Vite custom application development, and high-velocity growth marketing systems."
            })
          }}
        />
        <MotionProvider>
          <SmoothScrollProvider>
            {children}
            <ExitIntentPopup />
          </SmoothScrollProvider>
        </MotionProvider>
        {/* GTM — offloaded to Partytown web worker (off main thread) */}
        <Script id="google-tag-manager" strategy="worker">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
      </body>
    </html >
  );
}
