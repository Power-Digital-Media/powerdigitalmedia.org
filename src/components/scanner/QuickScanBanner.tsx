"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Activity, Globe, Search, CheckCircle2 } from "lucide-react";

const CITIES = [
  "Jackson, MS",
  "Madison, MS",
  "Flora, MS",
  "Brandon, MS",
  "Ridgeland, MS",
  "Flowood, MS",
  "Pearl, MS",
  "Clinton, MS",
  "Canton, MS",
  "Byram, MS",
] as const;

export default function QuickScanBanner() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [city, setCity] = useState<string>("Jackson, MS");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanUrl = url.trim();
    const params = new URLSearchParams();
    if (cleanUrl) params.set("url", cleanUrl);
    if (city) params.set("city", city);
    const qs = params.toString();
    router.push(qs ? `/scanner?${qs}` : "/scanner");
  };

  return (
    <section className="relative py-6 sm:py-14 bg-[#070b14] border-y border-white/10 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.06] via-transparent to-cyan-500/[0.06] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="rounded-2xl sm:rounded-3xl bg-[#090d18] border border-amber-500/35 p-4 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
          <div className="grid lg:grid-cols-12 gap-3.5 sm:gap-6 items-center">
            <div className="lg:col-span-5 space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-cyan-500/10 border border-cyan-400/35 text-cyan-300 text-[10px] font-mono font-extrabold uppercase tracking-wider">
                <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
                Free Live Watchtower Diagnostic
              </div>
              <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                Test Your Site&apos;s{" "}
                <span className="text-amber-400">
                  Google Speed, Schema &amp; AI Search
                </span>{" "}
                Right Now.
              </h2>
              <div className="hidden sm:flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-300">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Mobile Lighthouse
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  /llms.txt &amp; ChatGPT
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  JSON-LD &amp; Map Pack
                </span>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="lg:col-span-7 flex flex-col sm:flex-row items-stretch gap-2 sm:gap-2.5"
            >
              <div className="relative flex-1">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your website (e.g. yourbusiness.com)"
                  aria-label="Website domain to scan"
                  className="w-full pl-10 pr-3.5 py-3 sm:py-3.5 rounded-xl bg-[#05070d] border border-white/15 focus:border-amber-400 outline-none text-sm font-medium text-white placeholder:text-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 sm:contents gap-2">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  aria-label="Target Mississippi market city"
                  className="sm:w-40 px-3 sm:px-3.5 py-3 sm:py-3.5 rounded-xl bg-[#05070d] border border-white/15 focus:border-amber-400 outline-none text-xs font-bold text-white"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-[0_0_24px_rgba(245,158,11,0.3)] cursor-pointer shrink-0"
                >
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Scan Live →</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
