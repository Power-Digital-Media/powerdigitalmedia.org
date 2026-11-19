import { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Connected Web, CRM & Growth Stack | Power Digital Media",
    description: "Unified digital infrastructure in Jackson, MS: custom 0.8s Next.js websites, Capsule CRM setup, Transpond automation, and PDM Site Intelligence™.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/business-solutions",
    },
    openGraph: {
        title: "Connected Web, CRM & Growth Stack | Power Digital Media",
        description: "Unified digital infrastructure in Jackson, MS: custom 0.8s Next.js websites, Capsule CRM setup, Transpond automation, and PDM Site Intelligence™.",
        url: "https://powerdigitalmedia.org/business-solutions",
    },
};

export default function BusinessSolutionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://powerdigitalmedia.org/" },
                    { name: "Business Solutions", url: "https://powerdigitalmedia.org/business-solutions" },
                ]}
            />
            {children}
        </>
    );
}
