"use client";

import { useAuth } from "@/context/AuthContext";
import { isAdmin } from "@/lib/auth-constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, ShieldAlert } from "lucide-react";
import { motion } from "@/components/providers/MotionProvider";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user || !isAdmin(user.email)) {
                // Redirect non-admins to standard dashboard
                router.push("/dashboard");
            } else {
                setAuthorized(true);
            }
        }
    }, [user, loading, router]);

    if (loading || (!authorized && !loading)) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-16 h-16 rounded-3xl glass-card border-accent/20 flex items-center justify-center mb-6 relative">
                        <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse" />
                        <Loader2 className="w-8 h-8 text-accent animate-spin relative z-10" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent animate-pulse">
                        Verifying Clearance
                    </span>
                </motion.div>
            </div>
        );
    }

    return <>{children}</>;
}
