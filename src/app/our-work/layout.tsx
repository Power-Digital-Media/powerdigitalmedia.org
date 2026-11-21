import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Live Mississippi Websites & App Builds | Power Digital",
    description: "Inspect 10+ live 0.8s Mississippi websites, Born Again Roofing (800+ pins), Geaux Pro Outdoors, T'Beaux's 0%-fee ordering & Church 244 builds.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/our-work",
    },
    openGraph: {
        title: "Live Mississippi Websites & App Builds | Power Digital",
        description: "Inspect 10+ live 0.8s Mississippi websites, Born Again Roofing (800+ pins), Geaux Pro Outdoors, T'Beaux's 0%-fee ordering & Church 244 builds.",
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
