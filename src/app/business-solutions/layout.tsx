import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Integrated Business Technology Solutions | Power Digital Media Jackson MS",
    description: "End-to-end digital infrastructure for Mississippi businesses: Next.js web design, Capsule CRM integration, Transpond email pipelines, and Ultatel cloud VoIP.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/business-solutions",
    },
    openGraph: {
        title: "Integrated Business Technology Solutions | Power Digital Media",
        description: "End-to-end digital infrastructure for Mississippi businesses: Next.js web design, Capsule CRM integration, Transpond email pipelines, and Ultatel cloud VoIP.",
        url: "https://powerdigitalmedia.org/business-solutions",
    },
};

export default function BusinessSolutionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
