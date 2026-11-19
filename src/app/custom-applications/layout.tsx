import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CRM Setup & Integration in Jackson, MS | Power Digital",
    description: "Capsule CRM setup, automated Transpond follow-ups, 0%-fee Square ordering, and custom apps for Jackson & Mississippi businesses. Book a strategy call.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/custom-applications",
    },
    openGraph: {
        title: "CRM Setup & Integration in Jackson, MS | Power Digital",
        description: "Capsule CRM setup, automated Transpond follow-ups, 0%-fee Square ordering, and custom apps for Jackson & Mississippi businesses. Book a strategy call.",
        url: "https://powerdigitalmedia.org/custom-applications",
        images: ["/portfolio/growth-engine-real.webp"],
    },
};

export default function CustomApplicationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
