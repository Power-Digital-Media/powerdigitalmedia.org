import { Metadata } from "next";
import { AuthProvider } from "@/context/AuthProvider";

export const metadata: Metadata = {
    title: "Client Portal Login | Power Digital Media",
    description: "Secure client portal authentication and project dashboard access.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
