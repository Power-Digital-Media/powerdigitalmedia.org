import { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Founders 100 Program | Power Digital Media Jackson, MS",
    description: "Exclusive digital infrastructure initiative equipping select Mississippi business owners with custom 0.8s Next.js websites, Local SEO, and CRM systems.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/founders100",
    },
    openGraph: {
        title: "Founders 100 Program | Power Digital Media Jackson, MS",
        description: "Exclusive digital infrastructure initiative equipping select Mississippi business owners with custom 0.8s Next.js websites, Local SEO, and CRM systems.",
        url: "https://powerdigitalmedia.org/founders100",
    },
};

export default function Founders100Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://powerdigitalmedia.org/" },
                    { name: "Founders 100 Program", url: "https://powerdigitalmedia.org/founders100" },
                ]}
            />
            {children}
        </>
    );
}
