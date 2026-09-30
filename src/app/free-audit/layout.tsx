import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Website & Local SEO Audit | Power Digital Media Jackson MS",
    description: "Request a comprehensive performance, mobile speed, and Google Map Pack visibility audit for your Mississippi business.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/free-audit",
    },
    openGraph: {
        title: "Free Website & Local SEO Audit | Power Digital Media",
        description: "Request a comprehensive performance, mobile speed, and Google Map Pack visibility audit for your Mississippi business.",
        url: "https://powerdigitalmedia.org/free-audit",
    },
};

export default function FreeAuditLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
