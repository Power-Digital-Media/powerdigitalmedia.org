import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Client Billing & Retainers | Power Digital Media",
    description: "Client billing, bespoke payments, and retainer management.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function BillingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
