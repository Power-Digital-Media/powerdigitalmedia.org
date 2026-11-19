"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  ArrowRight,
  Loader2,
  Mail,
  Lock,
  Chrome,
  UserPlus,
  CheckCircle2,
  Phone,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const IS_DEV = process.env.NODE_ENV === "development";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showDevTools, setShowDevTools] = useState(false);
  const router = useRouter();

  const handleDemoLogin = (companyKey: string) => {
    if (!IS_DEV) return;
    setLoading(true);
    localStorage.setItem("pdm_demo_company", companyKey);
    router.push("/dashboard");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError("Authentication service is currently unavailable. Please call (601) 446-2393.");
      return;
    }
    setLoading(true);
    setError(null);
    setResetMessage(null);

    try {
      if (isRegistering) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const idToken = await cred.user.getIdToken();
        await fetch("/api/onboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            uid: cred.user.uid,
            email: cred.user.email,
            displayName: cred.user.email?.split("@")[0] || "Client",
          }),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error("Auth Error:", err);
      const code = (err as { code?: string })?.code;
      if (code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Try signing in instead.");
      } else if (code === "auth/weak-password") {
        setError("Password must be at least 6 characters long.");
      } else {
        setError("Invalid email or password. Please verify your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError(null);
    setResetMessage(null);
    if (!email.trim()) {
      setError("Enter your client email address above first, then click Forgot Password.");
      return;
    }
    if (!auth) {
      setError("Password reset is unavailable right now. Call (601) 446-2393 for direct help.");
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email.trim());
      setResetMessage(`Password reset link sent to ${email.trim()}. Check your inbox.`);
    } catch {
      setError("Could not send password reset email. Verify your email address or contact support.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!auth) {
      setError("Google Sign-In is currently unavailable. Please call (601) 446-2393.");
      return;
    }
    setGoogleLoading(true);
    setError(null);
    setResetMessage(null);
    const provider = new GoogleAuthProvider();

    try {
      const cred = await signInWithPopup(auth, provider);
      const idToken = await cred.user.getIdToken();
      await fetch("/api/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: cred.user.displayName || cred.user.email?.split("@")[0] || "Client",
        }),
      });
      router.push("/dashboard");
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Google sign-in was canceled or interrupted. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#06080f] text-white overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-12 right-1/4 w-[600px] h-[500px] bg-amber-500/[0.06] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <section className="relative pt-32 pb-24 md:pt-40 flex items-center justify-center">
        <div className="container px-4 sm:px-6 mx-auto flex flex-col items-center">
          <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#0b0c10] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.65)] relative">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-5">
                {isRegistering ? (
                  <UserPlus className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest">
                  {isRegistering ? "Client Onboarding" : "Client Portal"}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase mb-2 text-white">
                {isRegistering ? "Create " : "Client "}
                <span className="text-amber-400">{isRegistering ? "Account" : "Sign In"}</span>
              </h1>
              <p className="text-slate-400 text-sm">
                {isRegistering
                  ? "Set up portal access for your website, SEO reports, and billing."
                  : "Access your project milestones, PinDrop™ analytics, and invoices."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-xs font-medium text-center">
                  {error}
                </div>
              )}

              {resetMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center justify-center gap-2 text-center">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{resetMessage}</span>
                </div>
              )}

              <div className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      placeholder="you@yourcompany.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none transition-colors text-sm text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Password
                    </label>
                    {!isRegistering && (
                      <button
                        type="button"
                        onClick={handlePasswordReset}
                        className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none transition-colors text-sm text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs hover:brightness-110 transition-all shadow-[0_0_28px_rgba(245,158,11,0.28)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {isRegistering ? "Create Client Account" : "Sign In to Portal"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-[10px] font-mono uppercase tracking-widest">
                  <span className="bg-[#0b0c10] px-3 text-slate-500">or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading || googleLoading}
                className="w-full py-3.5 rounded-xl bg-[#12141c] border border-white/10 text-white font-bold uppercase tracking-wider text-xs hover:bg-white/[0.06] hover:border-white/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
              >
                {googleLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Chrome className="w-4 h-4 text-amber-400" />
                    Sign In with Google
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 pt-6 border-t border-white/10 text-center space-y-3">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError(null);
                  setResetMessage(null);
                }}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider transition-colors cursor-pointer"
              >
                {isRegistering
                  ? "Already have a portal login? Sign In"
                  : "New Power Digital client? Create Account"}
              </button>

              <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                <Phone className="w-3 h-3 text-amber-400" />
                Need portal assistance? Call{" "}
                <a href="tel:6014462393" className="text-slate-300 hover:text-amber-300 font-semibold">
                  (601) 446-2393
                </a>
              </p>
            </div>

            {IS_DEV && (
              <div className="mt-6 pt-4 border-t border-dashed border-white/10">
                <button
                  type="button"
                  onClick={() => setShowDevTools((prev) => !prev)}
                  className="w-full flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  <span>Localhost Dev Sandbox (Hidden in Prod)</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${showDevTools ? "rotate-180" : ""}`}
                  />
                </button>
                {showDevTools && (
                  <div className="mt-3 space-y-2">
                    <button
                      type="button"
                      onClick={() => handleDemoLogin("admin_bypass")}
                      className="w-full py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-amber-500/20 cursor-pointer"
                    >
                      Admin Dashboard Preview →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="mt-6 text-xs text-slate-400 text-center">
            Looking for a website or Google Maps audit instead?{" "}
            <Link href="/free-audit" className="text-amber-400 font-bold hover:text-amber-300 underline">
              Get your free 5-minute rank check →
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
