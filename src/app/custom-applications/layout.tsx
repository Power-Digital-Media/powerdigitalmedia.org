import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CRM Integration & Custom Apps in Jackson MS | Power Digital Media",
    description: "Custom business software, automated Capsule CRM & Transpond pipelines, and workflow automation built for Mississippi businesses.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/custom-applications",
    },
    openGraph: {
        title: "CRM Integration & Custom Apps in Jackson MS | Power Digital Media",
        description: "Custom business software, automated Capsule CRM & Transpond pipelines, and workflow automation built for Mississippi businesses.",
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
