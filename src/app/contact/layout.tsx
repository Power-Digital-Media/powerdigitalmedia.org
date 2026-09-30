import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Power Digital Media | Jackson, Mississippi Web & Tech Agency",
    description: "Connect directly with Damein Donald at Power Digital Media. Call (601) 446-2393 or schedule a 15-minute digital strategy consultation in Jackson, MS.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/contact",
    },
    openGraph: {
        title: "Contact Power Digital Media | Jackson, Mississippi",
        description: "Connect directly with Damein Donald at Power Digital Media. Call (601) 446-2393 or schedule a 15-minute digital strategy consultation in Jackson, MS.",
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
