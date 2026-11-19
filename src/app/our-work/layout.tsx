import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mississippi Web Design & App Portfolio | Power Digital",
    description: "Explore live 0.8s Next.js websites, contractor PinDrop™ deployments, 0%-fee Square ordering, and custom web apps built for Mississippi business owners.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/our-work",
    },
    openGraph: {
        title: "Mississippi Web Design & App Portfolio | Power Digital",
        description: "Explore live 0.8s Next.js websites, contractor PinDrop™ deployments, 0%-fee Square ordering, and custom web apps built for Mississippi business owners.",
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
