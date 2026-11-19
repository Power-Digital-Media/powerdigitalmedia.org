import { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Jackson, MS Small Business Initiative | Power Digital",
    description: "Empowering Jackson Metro small businesses, contractors, and faith communities with fast Next.js websites, Google Map Pack SEO, and local support.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/community",
    },
    openGraph: {
        title: "Jackson, MS Small Business Initiative | Power Digital",
        description: "Empowering Jackson Metro small businesses, contractors, and faith communities with fast Next.js websites, Google Map Pack SEO, and local support.",
        url: "https://powerdigitalmedia.org/community",
    },
};

export default function CommunityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://powerdigitalmedia.org/" },
                    { name: "Community Initiative", url: "https://powerdigitalmedia.org/community" },
                ]}
            />
            {children}
        </>
    );
}
