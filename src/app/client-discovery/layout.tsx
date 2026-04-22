import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Client Discovery Sheet | Power Digital Media",
    description:
        "Complete our client discovery form to help us understand your business, marketing goals, and growth needs. Power Digital Media — Jackson, MS.",
    openGraph: {
        title: "Client Discovery Sheet | Power Digital Media",
        description:
            "Tell us about your business so we can build the right strategy. Fill out the discovery sheet to get started.",
        url: "https://powerdigitalmedia.org/client-discovery",
    },
    alternates: {
        canonical: "/client-discovery",
    },
};

export default function ClientDiscoveryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
