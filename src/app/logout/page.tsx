"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Loader2 } from "lucide-react";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const performLogout = async () => {
            if (typeof window !== "undefined") {
                localStorage.removeItem("pdm_demo_company");
            }
            if (auth) {
                try {
                    await signOut(auth);
                } catch (err) {
                    console.error("SignOut error:", err);
                }
            }
            router.push("/login");
            setTimeout(() => {
                if (typeof window !== "undefined") {
                    window.location.reload();
                }
            }, 100);
        };

        performLogout();
    }, [router]);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 text-white">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Terminating Security Session...</span>
        </div>
    );
}
