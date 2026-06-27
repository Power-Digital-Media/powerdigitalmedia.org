import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import "../typography.css";

export const metadata: Metadata = {
    title: "About Us | Power Digital Media — AI-Ready Web Architecture in Jackson, MS",
    description: "Power Digital Media is a Jackson, MS infrastructure engineering firm specializing in high-velocity Next.js architecture, AI search dominance, structured data systems, and broadcast-grade media production.",
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
