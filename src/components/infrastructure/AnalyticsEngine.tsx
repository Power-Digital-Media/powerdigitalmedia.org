"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { classifyBrowserSignature } from "@/lib/lead-submission";

export default function AnalyticsEngine() {
    const pathname = usePathname();
    const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-DSZ3N77EHQ";
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-52WQVB8N";

    const lastTrackedPathRef = useRef<string | null>(null);
    const lastTrackedPixelPathRef = useRef<string | null>(null);

    // Synchronously ensure the standard gtag queue and single-init config are queued on mount
    // so visitors who never scroll or interact before leaving (or who convert rapidly) are 100% captured.
    useEffect(() => {
        if (typeof window === "undefined") return;

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

    // Trigger exactly ONE deduplicated GA4 page_view per route navigation (queued immediately even before gtag/js finishes downloading)
    useEffect(() => {
        if (typeof window === "undefined" || !pathname || !GA_ID) return;
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
            browser_signature_class: classifyBrowserSignature(),
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
        if (lastTrackedPixelPathRef.current === pathname) return;
        if (typeof window.fbq === "function") {
            lastTrackedPixelPathRef.current = pathname;
            window.fbq("track", "PageView");
        }
    }, [pathname, PIXEL_ID]);

    return (
        <>
            {/* Google Tag Manager (canonical gtm.js endpoint, single-init guarded, loaded afterInteractive without interaction gate) */}
            {GTM_ID && (
                <Script id="google-tag-manager" strategy="afterInteractive">
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

            {/* Google Analytics 4 (direct gtag/js loader; drains the pre-initialized window.dataLayer queue with send_page_view: false) */}
            {GA_ID && (
                <Script
                    id="google-analytics-gtag"
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                    strategy="afterInteractive"
                />
            )}

            {/* Meta Pixel */}
            {PIXEL_ID && (
                <Script
                    id="fb-pixel"
                    strategy="afterInteractive"
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
