import { AuthProvider } from "@/context/AuthProvider";

export default function AdminLayout({
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
