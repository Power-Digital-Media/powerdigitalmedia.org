import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "High-Velocity Web Design in Jackson MS | Power Digital Media",
    description:
        "Premium bespoke web design and development for Jackson, MS businesses. Next.js-powered digital engines engineered for speed, SEO dominance, and high-ticket conversion. Request a free site audit.",
    openGraph: {
        title: "High-Velocity Web Design in Jackson MS | Power Digital Media",
        description:
            "We don't build websites — we deploy high-velocity digital engines. Premium Next.js architecture for businesses that demand prestige and performance.",
        url: "https://powerdigitalmedia.org/web-design",
        type: "website",
    },
    alternates: {
        canonical: "/web-design",
    },
};

export default function WebDesignLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
