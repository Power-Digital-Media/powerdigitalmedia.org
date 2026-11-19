import { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Free Website Lead Leak Diagnostic | Power Digital Media",
    description: "Spot where your Mississippi business website is losing customer calls, slow follow-ups, and Map Pack visibility—with a free diagnostic from Jackson, MS.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/lead-leak-check",
    },
    openGraph: {
        title: "Free Website Lead Leak Diagnostic | Power Digital Media",
        description: "Spot where your Mississippi business website is losing customer calls, slow follow-ups, and Map Pack visibility—with a free diagnostic from Jackson, MS.",
        url: "https://powerdigitalmedia.org/lead-leak-check",
    },
};

export default function LeadLeakCheckLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://powerdigitalmedia.org/" },
                    { name: "Lead Leak Diagnostic", url: "https://powerdigitalmedia.org/lead-leak-check" },
                ]}
            />
            {children}
        </>
    );
}
