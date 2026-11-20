import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CRM Integration Services in Jackson, MS | Power Digital",
    description:
        "Turnkey Mississippi CRM setup & integration services in Jackson, MS. Direct Capsule CRM pipelines, automated follow-ups, $0-seat field apps & 0%-fee checkout.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/custom-applications",
    },
    openGraph: {
        title: "CRM Integration Services in Jackson, MS | Power Digital",
        description:
            "Turnkey Mississippi CRM setup & integration services in Jackson, MS. Direct Capsule CRM pipelines, automated follow-ups, $0-seat field apps & 0%-fee checkout.",
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
