"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "@/components/providers/MotionProvider";
import { ShieldCheck, ArrowRight, Loader2, Mail, Lock, Chrome, UserPlus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        if (!auth) {
            setError("Security Protocol Offline: Configuration missing.");
            return;
        }
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Auth Error:", err);
            if (err.code === 'auth/email-already-in-use') {
                setError("Protocol Conflict: Email already registered.");
            } else if (err.code === 'auth/weak-password') {
                setError("Security Breach: Password too weak (Min 6 chars).");
            } else {
                setError("Authentication failed. Check your credentials.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        if (!auth) {
            setError("Security Protocol Offline: Configuration missing.");
            return;
        }
        setGoogleLoading(true);
        setError(null);
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Google Login Error:", err);
            setError("Google Sync failed. Internal handshake interrupted.");
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
            <Navbar />

            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

            <section className="relative pt-40 pb-24 flex items-center justify-center">
                <div className="container px-6 mx-auto flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-md p-10 rounded-[3rem] glass-card border-white/5 bg-white/[0.01] relative"
                    >
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-accent/20 mb-6">
                                {isRegistering ? <UserPlus className="w-4 h-4 text-accent" /> : <ShieldCheck className="w-4 h-4 text-accent" />}
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    {isRegistering ? "Access Creation" : "Secure Entry"}
                                </span>
                            </div>
                            <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">
                                {isRegistering ? "Create" : "Client"} <span className="text-accent">{isRegistering ? "Account" : "Auth."}</span>
                            </h1>
                            <p className="text-foreground/40 text-xs italic">
                                {isRegistering ? "Initialize your project credentials." : "Access your high-authority project dashboard."}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-accent transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="CLIENT EMAIL ADDRESS"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/[0.02] border border-white/5 focus:border-accent focus:bg-white/[0.05] outline-none transition-all text-xs font-bold uppercase tracking-widest placeholder:text-white/10"
                                    />
                                </div>

                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-accent transition-colors" />
                                    <input
                                        type="password"
                                        placeholder="SECURE PROTOCOL PASSWORD"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/[0.02] border border-white/5 focus:border-accent focus:bg-white/[0.05] outline-none transition-all text-xs font-bold uppercase tracking-widest placeholder:text-white/10"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || googleLoading}
                                className="w-full py-5 rounded-2xl bg-accent text-slate-950 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all shadow-[0_0_40px_rgba(34,211,238,0.2)] flex items-center justify-center gap-2 group"
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        {isRegistering ? "Create Account" : "Initiate Auth"}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/5"></div>
                                </div>
                                <div className="relative flex justify-center text-[8px] font-black uppercase tracking-[0.4em]">
                                    <span className="bg-[#0A0A0A] px-4 text-white/20">OR EXPRESS SYNC</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={loading || googleLoading}
                                className="w-full py-5 rounded-2xl bg-white/[0.02] border border-white/5 text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white/[0.05] hover:border-white/20 transition-all flex items-center justify-center gap-3"
                            >
                                {googleLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <Chrome className="w-4 h-4 text-accent" />
                                        Auth via Google
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center flex flex-col gap-4">
                            <button
                                onClick={() => setIsRegistering(!isRegistering)}
                                className="text-[10px] font-bold text-accent hover:text-white uppercase tracking-widest transition-colors"
                            >
                                {isRegistering ? "Already have an account? Log In" : "Need access? Create Project Account"}
                            </button>
                            {!isRegistering && (
                                <button className="text-[10px] font-bold text-foreground/20 hover:text-accent uppercase tracking-widest transition-colors">
                                    Reset Access Credentials
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
