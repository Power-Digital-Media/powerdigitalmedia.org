import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import "../typography.css";

export const metadata: Metadata = {
    title: "About Power Digital Media | Jackson, MS Web & SEO Studio",
    description: "Meet founder Damein Donald in Jackson, MS. We engineer custom 0.8s Next.js websites, PinDrop™ contractor apps, and local SEO systems across Mississippi.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/about",
    },
    openGraph: {
        title: "About Power Digital Media | Jackson, MS Web & SEO Studio",
        description: "Meet founder Damein Donald in Jackson, MS. We engineer custom 0.8s Next.js websites, PinDrop™ contractor apps, and local SEO systems across Mississippi.",
        url: "https://powerdigitalmedia.org/about",
    }
};

const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://powerdigitalmedia.org/about/#webpage",
    "url": "https://powerdigitalmedia.org/about",
    "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2"]
    }
};

export default function AboutPage() {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://powerdigitalmedia.org/" },
                    { name: "About Power Digital Media", url: "https://powerdigitalmedia.org/about" },
                ]}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
            />
            <AboutClient />
        </>
    );
}
