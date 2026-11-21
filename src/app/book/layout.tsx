import { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Book a 15-Minute Strategy Call | Power Digital Media",
    description: "Schedule a direct 15-minute strategy call with Damein Donald in Jackson, MS to review custom Next.js web design, Map Pack SEO, or CRM integration.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/book",
    },
    openGraph: {
        title: "Book a 15-Minute Strategy Call | Power Digital Media",
        description: "Schedule a direct 15-minute strategy call with Damein Donald in Jackson, MS to review custom Next.js web design, Map Pack SEO, or CRM integration.",
        url: "https://powerdigitalmedia.org/book",
        images: ["/images/og-image.png"],
    },
};

export default function BookLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://powerdigitalmedia.org/" },
                    { name: "Book Strategy Call", url: "https://powerdigitalmedia.org/book" },
                ]}
            />
            {children}
        </>
    );
}
