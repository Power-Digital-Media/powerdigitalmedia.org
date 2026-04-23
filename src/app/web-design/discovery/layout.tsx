import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Web Design Discovery Sheet | Power Digital Media",
    description:
        "Tell us about your web design project — your vision, functionality needs, and timeline. We'll scope your custom build and come to the table ready. Power Digital Media — Jackson, MS.",
    openGraph: {
        title: "Web Design Discovery Sheet | Power Digital Media",
        description:
            "Start your custom web build with our discovery intake. Share your project details so we can engineer the right solution.",
        url: "https://powerdigitalmedia.org/web-design/discovery",
    },
    alternates: {
        canonical: "/web-design/discovery",
    },
};

export default function WebDesignDiscoveryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
