"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, CreditCard, Briefcase, Settings, LogOut, Loader2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        );
    }

    if (!user) return null;

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    return (
        <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/5 bg-white/[0.01] backdrop-blur-xl flex flex-col pt-10 px-6">
                <div className="mb-12 px-4">
                    <h2 className="text-xl font-black tracking-tighter uppercase italic">
                        Power <span className="text-accent">Hub.</span>
                    </h2>
                </div>

                <nav className="flex-grow space-y-2">
                    {[
                        { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
                        { icon: Briefcase, label: "Projects", href: "/dashboard/projects" },
                        { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
                        { icon: Settings, label: "Settings", href: "/dashboard/settings" },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all group"
                        >
                            <item.icon className="w-4 h-4 group-hover:text-accent transition-colors" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="pb-10 px-6">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500/40 hover:text-red-500 hover:bg-red-500/5 transition-all w-full text-left"
                    >
                        <LogOut className="w-4 h-4" />
                        Auth Terminate
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-12 overflow-y-auto relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
                {children}
            </main>
        </div>
    );
}
