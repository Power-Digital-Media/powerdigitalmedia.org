import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Power Digital Media | Jackson, MS Web & SEO",
    description: "Connect directly with Damein Donald at Power Digital Media. Call (601) 446-2393 or book a 15-minute strategy call at our Jackson, MS headquarters.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/contact",
    },
    openGraph: {
        title: "Contact Power Digital Media | Jackson, MS Web & SEO",
        description: "Connect directly with Damein Donald at Power Digital Media. Call (601) 446-2393 or book a 15-minute strategy call at our Jackson, MS headquarters.",
        url: "https://powerdigitalmedia.org/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
