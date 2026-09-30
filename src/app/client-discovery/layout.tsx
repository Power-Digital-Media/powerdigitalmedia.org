import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Client Discovery & Intake | Power Digital Media",
    description: "Project intake and scope discovery portal.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function ClientDiscoveryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
