import { AuthProvider } from "@/context/AuthProvider";

export default function BillingLayout({
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
