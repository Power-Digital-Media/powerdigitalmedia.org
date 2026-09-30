import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Founders 100 Program | Power Digital Media Jackson MS",
    description: "Exclusive digital infrastructure initiative empowering select Mississippi business owners with bespoke Next.js architecture.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/founders100",
    },
    openGraph: {
        title: "Founders 100 Program | Power Digital Media",
        description: "Exclusive digital infrastructure initiative empowering select Mississippi business owners with bespoke Next.js architecture.",
        url: "https://powerdigitalmedia.org/founders100",
    },
};

export default function Founders100Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
