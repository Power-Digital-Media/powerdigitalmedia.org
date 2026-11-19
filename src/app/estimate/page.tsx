import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import GrowthScopeEstimator from "@/components/sections/GrowthScopeEstimator";
import GoogleReviewsSection from "@/components/sections/GoogleReviewsSection";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title:
    "Instant Website & Growth Scope Estimator | Central MS Contractors & Businesses | Power Digital Media",
  description:
    "Build a transparent custom website, Google Map Pack SEO, PDM Site Intelligence™, PinCam™ + PinDrop™, and Meta Ads scope in seconds. Built in Jackson, MS by Damein Donald.",
  alternates: {
    canonical: "https://powerdigitalmedia.org/estimate",
  },
  openGraph: {
    title: "Interactive Growth & Scope Estimator | Power Digital Media",
    description:
      "Configure your custom 0.8s website, 24/7 watchtower, contractor field apps, and local growth stack—and text or lock in your 1-on-1 scope directly with Damein Donald.",
    url: "https://powerdigitalmedia.org/estimate",
    images: ["/images/og-image.png"],
  },
};

export default function EstimatePage() {
  const baseUrl = "https://powerdigitalmedia.org";

  return (
    <main className="relative flex flex-col min-h-screen bg-[#06080f] text-white">
      <BreadcrumbSchema
        items={[
          { name: "Services", url: `${baseUrl}/web-design` },
          { name: "Interactive Scope Estimator", url: `${baseUrl}/estimate` },
        ]}
      />

      {/* WebPage Schema (intentionally zero rigid Offer price promises) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://powerdigitalmedia.org/estimate#webpage",
            url: "https://powerdigitalmedia.org/estimate",
            name: "Interactive Growth & Scope Estimator | Power Digital Media",
            description:
              "Interactive Central Mississippi project and monthly growth partnership scope configurator for custom Next.js websites, Google Map Pack optimization, PDM Site Intelligence™, PinCam™ + PinDrop™, and Meta lead funnels.",
            isPartOf: {
              "@id": "https://powerdigitalmedia.org/#website",
            },
            about: {
              "@id": "https://powerdigitalmedia.org/#organization",
            },
          }),
        }}
      />

      <Navbar />

      <GrowthScopeEstimator isStandalonePage />

      <GoogleReviewsSection variant="compact" />

      <DeferredFooterSections />
    </main>
  );
}
