"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { classifyBrowserSignature } from "@/lib/lead-submission";

export default function AnalyticsEngine() {
    const pathname = usePathname();
    const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "781583678297161";
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-DSZ3N77EHQ";
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-52WQVB8N";

    const [allowAnalyticsScripts, setAllowAnalyticsScripts] = useState(false);
    const lastTrackedPathRef = useRef<string | null>(null);
    const lastTrackedPixelPathRef = useRef<string | null>(null);

    // Synchronously ensure the standard gtag queue and single-init config are queued on mount
    // for standard browsers while dropping defunct/impossible scraper signatures (MSIE, Camino,
    // bare Mozilla, Safari-on-Linux/Windows, webdriver) so headless bots cannot pollute GA4.
    useEffect(() => {
        if (typeof window === "undefined") return;
        const signatureClass = classifyBrowserSignature();
        if (signatureClass === "suspected_automated_signature") {
            setAllowAnalyticsScripts(false);
            return;
        }

        setAllowAnalyticsScripts(true);
        window.dataLayer = window.dataLayer || [];
        if (typeof window.gtag !== "function") {
            window.gtag = function gtag() {
                // eslint-disable-next-line prefer-rest-params
                window.dataLayer!.push(arguments);
            };
        }

        if (GA_ID && !window.__pdmGa4Initialized) {
            window.__pdmGa4Initialized = true;
            window.gtag("js", new Date());
            window.gtag("config", GA_ID, { send_page_view: false });
        }
    }, [GA_ID]);

    // Trigger exactly ONE deduplicated GA4 page_view per route navigation for standard browsers
    useEffect(() => {
        if (typeof window === "undefined" || !pathname || !GA_ID) return;
        const signatureClass = classifyBrowserSignature();
        if (signatureClass === "suspected_automated_signature") return;

        if (lastTrackedPathRef.current === pathname) return;
        lastTrackedPathRef.current = pathname;

        window.dataLayer = window.dataLayer || [];
        if (typeof window.gtag !== "function") {
            window.gtag = function gtag() {
                // eslint-disable-next-line prefer-rest-params
                window.dataLayer!.push(arguments);
            };
        }

        if (!window.__pdmGa4Initialized) {
            window.__pdmGa4Initialized = true;
            window.gtag("js", new Date());
            window.gtag("config", GA_ID, { send_page_view: false });
        }

        const pageViewPayload = {
            page_path: pathname,
            page_location: window.location.href,
            page_title: document.title,
            browser_signature_class: signatureClass,
            send_to: GA_ID,
        };

        window.gtag("event", "page_view", pageViewPayload);
        window.__pdmEmittedPageViews = window.__pdmEmittedPageViews || [];
        window.__pdmEmittedPageViews.push({
            event: "page_view",
            ...pageViewPayload,
            emittedAt: new Date().toISOString(),
        });
    }, [pathname, GA_ID]);

    // Trigger deduplicated Facebook Pixel page views on route changes
    useEffect(() => {
        if (typeof window === "undefined" || !pathname || !PIXEL_ID) return;
        if (classifyBrowserSignature() === "suspected_automated_signature") return;
        if (lastTrackedPixelPathRef.current === pathname) return;
        if (typeof window.fbq === "function") {
            lastTrackedPixelPathRef.current = pathname;
            window.fbq("track", "PageView");
        }
    }, [pathname, PIXEL_ID]);

    // Global delegated click tracking for `tel:` and `sms:` links (GA4 + Meta Pixel Contact event)
    useEffect(() => {
        if (typeof document === "undefined" || typeof window === "undefined") return;

        const handleContactLinkClick = (event: MouseEvent) => {
            if (classifyBrowserSignature() === "suspected_automated_signature") return;
            const target = event.target as Element | null;
            const anchor = target?.closest?.('a[href^="tel:"], a[href^="sms:"]') as HTMLAnchorElement | null;
            if (!anchor) return;

            const href = anchor.getAttribute("href") || "";
            const currentPath = window.location.pathname || "/";

            if (href.startsWith("tel:")) {
                window.gtag?.("event", "click_to_call", {
                    page_path: currentPath,
                    link_url: href,
                });
                window.fbq?.("track", "Contact", {
                    content_name: "click_to_call",
                    content_category: currentPath,
                });
            } else if (href.startsWith("sms:")) {
                window.gtag?.("event", "click_to_text", {
                    page_path: currentPath,
                    link_url: href,
                });
                window.fbq?.("track", "Contact", {
                    content_name: "click_to_text",
                    content_category: currentPath,
                });
            }
        };

        document.addEventListener("click", handleContactLinkClick, { passive: true });
        return () => {
            document.removeEventListener("click", handleContactLinkClick);
        };
    }, []);

    if (!allowAnalyticsScripts) {
        return null;
    }

    return (
        <>
            {/* Google Tag Manager (lazyOnload drains pre-queued window.dataLayer without blocking mobile TBT) */}
            {GTM_ID && (
                <Script id="google-tag-manager" strategy="lazyOnload">
                    {`
                        if (!window.__pdmGtmInitialized) {
                            window.__pdmGtmInitialized = true;
                            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','${GTM_ID}');
                        }
                    `}
                </Script>
            )}

            {/* Google Analytics 4 (lazyOnload drains pre-initialized window.dataLayer queue with send_page_view: false) */}
            {GA_ID && (
                <Script
                    id="google-analytics-gtag"
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                    strategy="lazyOnload"
                />
            )}

            {/* Meta Pixel */}
            {PIXEL_ID && (
                <Script
                    id="fb-pixel"
                    strategy="lazyOnload"
                    onReady={() => {
                        if (
                            pathname &&
                            lastTrackedPixelPathRef.current !== pathname &&
                            typeof window.fbq === "function"
                        ) {
                            lastTrackedPixelPathRef.current = pathname;
                            window.fbq("track", "PageView");
                        }
                    }}
                    dangerouslySetInnerHTML={{
                        __html: `
                            !function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                            fbq('init', '${PIXEL_ID}');
                        `,
                    }}
                />
            )}
        </>
    );
}

// Global types for fbq, gtag and dataLayer
declare global {
    interface Window {
        fbq?: any;
        gtag?: (...args: any[]) => void;
        dataLayer?: any[];
        __pdmGtmInitialized?: boolean;
        __pdmGa4Initialized?: boolean;
        __pdmEmittedLeadEvents?: Array<Record<string, unknown>>;
        __pdmEmittedPageViews?: Array<Record<string, unknown>>;
    }
}
