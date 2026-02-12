import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import AnalyticsEngine from "@/components/infrastructure/AnalyticsEngine";
import MotionProvider from "@/components/infrastructure/MotionProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Power Digital Media | Podcast, Video & Web Design in Jackson, MS",
  description: "Power Digital Media is a Jackson, Mississippi digital media studio offering podcast production, video marketing, website design, and AI-powered branding services for businesses, creators, and ministries.",
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
    title: "Power Digital Media | Premier Digital Production",
    description: "Podcast production, video marketing, and web design in Jackson, MS.",
    images: ["/hero-bg.webp"],
  },
  metadataBase: new URL("https://powerdigitalmedia.org"),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/hero-bg.webp" as="image" type="image/webp" />
        <link rel="preload" href="/portfolio/all-things-new-real.webp" as="image" type="image/webp" />
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
              "@type": "Organization",
              "name": "Power Digital Media LLC",
              "url": "https://powerdigitalmedia.org",
              "sameAs": [
                "https://www.youtube.com/@PowerDigitalMedia",
                "https://www.instagram.com/PowerDigitalMedia"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jackson",
                "addressRegion": "MS",
                "addressCountry": "US"
              },
              "description": "Power Digital Media is a Jackson, Mississippi digital media studio offering podcast production, video marketing, website design, and AI-powered branding services for businesses, creators, and ministries."
            })
          }}
        />
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
