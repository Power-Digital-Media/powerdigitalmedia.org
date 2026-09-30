import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Custom Next.js Web Design in Jackson MS | Power Digital Media",
    description: "Bespoke Next.js 16 websites for Mississippi businesses. Fast mobile loading (< 2.5s LCP), local SEO architecture, and zero WordPress plugin bloat. Starting at $1,500.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/web-design",
    },
    openGraph: {
        title: "Custom Next.js Web Design in Jackson MS | Power Digital Media",
        description: "Bespoke Next.js 16 websites for Mississippi businesses. Fast mobile loading (< 2.5s LCP), local SEO architecture, and zero WordPress plugin bloat. Starting at $1,500.",
        url: "https://powerdigitalmedia.org/web-design",
        images: ["/portfolio/growth-engine-real.webp"],
    },
};

export default function WebDesignLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
