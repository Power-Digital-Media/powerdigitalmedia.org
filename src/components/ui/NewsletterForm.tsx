"use client";

import { useState } from "react";

export default function NewsletterForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mdazlovb", {
                method: "POST",
                body: data,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="max-w-md mx-auto p-4 rounded-2xl glass-card border-accent/20 bg-accent/5 text-center">
                <p className="font-bold text-accent">You're on the list!</p>
                <p className="text-sm text-muted-foreground mt-1">Keep an eye on your inbox for the latest intel.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4 relative">
            <input
                type="email"
                name="email"
                required
                disabled={status === "submitting"}
                placeholder="email@example.com"
                className="flex-1 px-6 py-4 rounded-2xl glass-card border-white/10 outline-none focus:border-accent/40 disabled:opacity-50"
            />
            <button
                type="submit"
                disabled={status === "submitting"}
                className="px-8 py-4 font-bold text-white bg-accent rounded-2xl border-glow hover:bg-accent/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
                {status === "submitting" ? "..." : "Join"}
            </button>
            {status === "error" && (
                <p className="text-red-400 absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm w-full text-center">
                    Error joining. Please try again.
                </p>
            )}
        </form>
    );
}
