"use client";

import { useState, useEffect } from "react";
import { Twitter, Linkedin, Link as LinkIcon, Check, Facebook, Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
  category?: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [baseUrl, setBaseUrl] = useState("https://powerdigitalmedia.org");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.origin) {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const url = `${baseUrl}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "X / Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 py-5 border-y border-white/10 my-6">
      <span className="text-slate-400 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
        <Share2 className="w-3.5 h-3.5 text-amber-400" />
        Share Article
      </span>

      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#12141c] border border-white/10 hover:border-amber-400/50 hover:text-amber-300 transition-colors text-slate-300"
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-4 h-4" />
          </a>
        ))}

        <button
          type="button"
          onClick={handleCopy}
          className="p-2.5 rounded-xl bg-[#12141c] border border-white/10 hover:border-amber-400/50 transition-colors text-slate-300 hover:text-emerald-400 cursor-pointer"
          aria-label="Copy Link"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <LinkIcon className="w-4 h-4" />}
        </button>
      </div>

      {copied && (
        <span className="text-xs text-emerald-400 font-semibold">Link copied to clipboard</span>
      )}
    </div>
  );
}
