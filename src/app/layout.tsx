import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import AnalyticsEngine from "@/components/infrastructure/AnalyticsEngine";
import MotionProvider from "@/components/infrastructure/MotionProvider";
import Script from "next/script";
import SmoothScrollProvider from "@/components/infrastructure/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
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


        <style dangerouslySetInnerHTML={{
          __html: `
          :root {
  --background: #020617;
  --foreground: #f8fafc;
  --primary: #3b82f6;
  --accent: #3b82f6;
  --font - sans: var(--font - inter);
  --font - heading: var(--font - space - grotesk);
}
          body {
  background: var(--background);
  color: var(--foreground);
  font - family: var(--font - sans);
  -webkit - font - smoothing: antialiased;
  overflow - x: hidden;
  margin: 0;
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z - index: -2;
  background: radial - gradient(circle at 50 % 50 %, #020617 0 %, #020617 100 %);
}
h1, h2, h3 { font - family: var(--font - heading); letter - spacing: -0.02em; font - weight: 700; }
          .cyber - grid {
  background - image: linear - gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px),
    linear - gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px);
  background - size: 40px 40px;
}
`}} />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {/* Google Tag Manager is now injected via @next/third-parties below if needed, or we just rely on the component. Actually the component usually injects noscript too, let's just add the component. */}

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
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </MotionProvider>
        <Script
          id="gtm-lazy"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `
          }}
        />
      </body >
    </html >
  );
}
