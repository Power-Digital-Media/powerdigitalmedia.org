import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import "../typography.css";

export const metadata: Metadata = {
    title: "About Us | Power Digital Media — Jackson MS Web Design & Growth Studio",
    description: "Learn about Power Digital Media. We build hand-crafted Next.js websites, PinDrop™ contractor tech, and local SEO engines for Central Mississippi businesses.",
    alternates: {
        canonical: './',
    }
};

const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://powerdigitalmedia.org/about/#webpage",
    "url": "https://powerdigitalmedia.org/about/",
    "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2"]
    }
};

export default function AboutPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
            />
            <AboutClient />
        </>
    );
}
