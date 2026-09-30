import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book a 15-Minute Strategy Call | Power Digital Media",
    description: "Schedule a direct consultation with Damein Donald to discuss custom Next.js web design, PinDrop™ contractor software, or CRM pipelines.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/book",
    },
    openGraph: {
        title: "Book a 15-Minute Strategy Call | Power Digital Media",
        description: "Schedule a direct consultation with Damein Donald to discuss custom Next.js web design, PinDrop™ contractor software, or CRM pipelines.",
        url: "https://powerdigitalmedia.org/book",
    },
};

export default function BookLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
