import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Meta Ads & Lead Generation in Jackson, MS | Power Digital",
    description: "High-converting Facebook & Instagram ad campaigns, local lead funnels, and automated Capsule CRM pipelines built for Jackson & Mississippi businesses.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/marketing",
    },
    openGraph: {
        title: "Meta Ads & Lead Generation in Jackson, MS | Power Digital",
        description: "High-converting Facebook & Instagram ad campaigns, local lead funnels, and automated Capsule CRM pipelines built for Jackson & Mississippi businesses.",
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
