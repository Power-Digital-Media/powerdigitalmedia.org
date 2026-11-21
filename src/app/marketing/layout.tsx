import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Meta Ads & Lead Generation Jackson, MS | Power Digital",
    description: "High-converting Facebook & Instagram ad funnels and automated Capsule CRM pipelines built for Jackson & Central MS businesses. Call (601) 446-2393.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/marketing",
    },
    openGraph: {
        title: "Meta Ads & Lead Generation Jackson, MS | Power Digital",
        description: "High-converting Facebook & Instagram ad funnels and automated Capsule CRM pipelines built for Jackson & Central MS businesses. Call (601) 446-2393.",
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
