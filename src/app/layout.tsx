import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import AnalyticsEngine from "@/components/infrastructure/AnalyticsEngine";
import { AuthProvider } from "@/context/AuthContext";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <AuthProvider>
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
                "logo": "https://powerdigitalmedia.org/images/logo.png",
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
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
