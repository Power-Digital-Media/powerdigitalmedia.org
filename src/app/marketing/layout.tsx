import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Growth Marketing & Paid Social in Jackson MS | Power Digital Media",
    description: "High-converting Facebook & Instagram ad campaigns, automated lead funnels, and local customer acquisition for Mississippi companies.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/marketing",
    },
    openGraph: {
        title: "Growth Marketing & Paid Social in Jackson MS | Power Digital Media",
        description: "High-converting Facebook & Instagram ad campaigns, automated lead funnels, and local customer acquisition for Mississippi companies.",
        url: "https://powerdigitalmedia.org/marketing",
        images: ["/portfolio/growth-engine-real.webp"],
    },
};

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
