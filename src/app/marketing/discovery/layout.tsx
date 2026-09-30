import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Marketing Campaign Discovery | Power Digital Media",
    description: "Growth marketing campaign discovery and intake form.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function MarketingDiscoveryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
