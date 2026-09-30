import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mississippi Website & Software Projects | Power Digital Media Portfolio",
    description: "Explore live Next.js websites, contractor PinDrop™ implementations, and custom web applications built for Mississippi business owners.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/our-work",
    },
    openGraph: {
        title: "Mississippi Website & Software Projects | Power Digital Media",
        description: "Explore live Next.js websites, contractor PinDrop™ implementations, and custom web applications built for Mississippi business owners.",
        url: "https://powerdigitalmedia.org/our-work",
        images: ["/portfolio/growth-engine-real.webp"],
    },
};

export default function OurWorkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
