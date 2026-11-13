"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const { ok } = await submitVerifiedLeadForm({
        formSource: "blog-newsletter",
        formData: data,
      });

      if (ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#12141c] border border-emerald-500/35 text-center">
        <p className="font-bold text-emerald-400 flex items-center justify-center gap-2 text-sm">
          <CheckCircle2 className="w-4 h-4" /> You&apos;re subscribed!
        </p>
        <p className="text-xs text-slate-300 mt-1">
          We&apos;ll send practical Local SEO, web speed, and contractor growth playbooks straight to your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
      <FormSecurityFields />
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          name="email"
          required
          disabled={status === "submitting"}
          placeholder="you@yourcompany.com"
          className="flex-1 px-5 py-3.5 rounded-xl bg-[#12141c] border border-white/15 focus:border-amber-400 outline-none text-white text-sm placeholder:text-slate-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="px-6 py-3.5 font-black text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl text-xs uppercase tracking-wider disabled:opacity-60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{status === "submitting" ? "Joining..." : "Subscribe"}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
      {status === "error" && (
        <p className="text-red-400 mt-2 text-xs text-center">
          Could not subscribe right now. Please try again.
        </p>
      )}
    </form>
  );
}
