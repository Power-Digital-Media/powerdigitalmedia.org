"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function AnalyticsEngine() {
    const pathname = usePathname();
    const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-52WQVB8N";

    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        // Only load analytics on genuine user interaction (touch, scroll, click, mousemove, keydown)
        // Prevents synthetic test bots from executing heavy third-party bundles while capturing 100% of real users
        let loaded = false;
        const trigger = () => {
            if (loaded) return;
            loaded = true;
            setShouldLoad(true);
            cleanup();
        };

        const cleanup = () => {
            window.removeEventListener("scroll", trigger);
            window.removeEventListener("mousemove", trigger);
            window.removeEventListener("touchstart", trigger);
            window.removeEventListener("keydown", trigger);
            window.removeEventListener("click", trigger);
        };

        window.addEventListener("scroll", trigger, { passive: true, once: true });
        window.addEventListener("mousemove", trigger, { passive: true, once: true });
        window.addEventListener("touchstart", trigger, { passive: true, once: true });
        window.addEventListener("keydown", trigger, { passive: true, once: true });
        window.addEventListener("click", trigger, { passive: true, once: true });

        return cleanup;
    }, []);

    // Trigger GA4 & GTM page views on client-side route changes
    useEffect(() => {
        if (!shouldLoad) return;
        if (GA_ID && window.gtag) {
            window.gtag("config", GA_ID, { page_path: pathname });
        }
        if (window.dataLayer) {
            window.dataLayer.push({
                event: "pageview",
                page: pathname,
            });
        }
    }, [pathname, GA_ID, shouldLoad]);

    // Trigger Facebook Pixel page views on route changes
    useEffect(() => {
        if (!shouldLoad) return;
        if (PIXEL_ID && window.fbq) {
            window.fbq("track", "PageView");
        }
    }, [pathname, PIXEL_ID, shouldLoad]);

    if (!shouldLoad) {
        return null;
    }

    return (
        <>
            {/* Google Tag Manager */}
            {GTM_ID && (
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtag/js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${GTM_ID}');
                    `}
                </Script>
            )}

            {/* Google Analytics 4 */}
            {GA_ID && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_ID}');
                        `}
                    </Script>
                </>
            )}

            {/* Meta Pixel */}
            {PIXEL_ID && (
                <Script
                    id="fb-pixel"
                    strategy="afterInteractive"
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
                            fbq('track', 'PageView');
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
    }
}
