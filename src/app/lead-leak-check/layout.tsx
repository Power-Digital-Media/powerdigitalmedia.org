import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lead Leak Diagnostic & Conversion Check | Power Digital Media",
    description: "Identify where your Mississippi business website is dropping customer leads, slow response times, and missing phone inquiries.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/lead-leak-check",
    },
    openGraph: {
        title: "Lead Leak Diagnostic & Conversion Check | Power Digital Media",
        description: "Identify where your Mississippi business website is dropping customer leads, slow response times, and missing phone inquiries.",
        url: "https://powerdigitalmedia.org/lead-leak-check",
    },
};

export default function LeadLeakCheckLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
