'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Twitter,
    Linkedin,
    Link,
    Check,
    Facebook,
    Share2
} from 'lucide-react';

interface ShareButtonsProps {
    title: string;
    slug: string;
    category?: string;
}

export default function ShareButtons({ title, slug, category }: ShareButtonsProps) {
    const [baseUrl, setBaseUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setBaseUrl(window.location.origin);
    }, []);

    const url = `${baseUrl}/blog/${slug}`;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: 'Twitter',
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            color: 'hover:text-[#1DA1F2]'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
            color: 'hover:text-[#0A66C2]'
        },
        {
            name: 'Facebook',
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: 'hover:text-[#1877F2]'
        }
    ];

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="flex items-center gap-4 py-6 border-t border-b border-white/10 my-8">
            <span className="text-white/60 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Intel
            </span>

            <div className="flex items-center gap-2">
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 text-white/80 ${link.color}`}
                        aria-label={`Share on ${link.name}`}
                    >
                        <link.icon className="w-5 h-5" />
                    </a>
                ))}

                <button
                    onClick={handleCopy}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 text-white/80 hover:text-green-400 relative"
                    aria-label="Copy Link"
                >
                    <AnimatePresence mode='wait'>
                        {copied ? (
                            <motion.div
                                key="check"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Check className="w-5 h-5" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="link"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link className="w-5 h-5" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {copied && (
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-green-400 font-medium"
                >
                    Copied to clipboard
                </motion.span>
            )}
        </div>
    );
}
