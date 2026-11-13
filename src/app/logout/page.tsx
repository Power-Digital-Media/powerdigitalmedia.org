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
    <div className="min-h-screen bg-[#06080f] flex flex-col items-center justify-center gap-4 text-white">
      <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
      <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-400">
        Signing Out...
      </span>
    </div>
  );
}
