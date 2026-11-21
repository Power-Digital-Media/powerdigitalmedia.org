import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CRM Setup & Integration in Jackson, MS | Power Digital",
    description:
        "Turnkey Mississippi CRM setup & integration services in Jackson, MS. Direct Capsule CRM pipelines, automated follow-ups & $0-seat apps: (601) 446-2393.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/custom-applications",
    },
    openGraph: {
        title: "CRM Setup & Integration in Jackson, MS | Power Digital",
        description:
            "Turnkey Mississippi CRM setup & integration services in Jackson, MS. Direct Capsule CRM pipelines, automated follow-ups & $0-seat apps: (601) 446-2393.",
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
