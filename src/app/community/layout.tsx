import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mississippi Community & Small Business Initiative | Power Digital Media",
    description: "Empowering Jackson Metro small businesses and faith communities with high-performance digital architecture and accessible web solutions.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/community",
    },
    openGraph: {
        title: "Mississippi Community & Small Business Initiative | Power Digital Media",
        description: "Empowering Jackson Metro small businesses and faith communities with high-performance digital architecture and accessible web solutions.",
        url: "https://powerdigitalmedia.org/community",
    },
};

export default function CommunityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
