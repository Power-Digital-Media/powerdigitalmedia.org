"use client";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsEngine() {
    const pathname = usePathname();
    const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false);

    const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

    useEffect(() => {
        // High-velocity deferral: Wait for 2s to clear the critical rendering path on mobile
        const timer = setTimeout(() => {
            setShouldLoadAnalytics(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (shouldLoadAnalytics && PIXEL_ID && window.fbq) {
            window.fbq('track', 'PageView');
        }
    }, [pathname, PIXEL_ID, shouldLoadAnalytics]);

    if (!shouldLoadAnalytics) return null;

    return (
        <>
            {/* 
              OFFLOAD TO WEB WORKERS (Partytown):
              We move the heavy JS execution off the main thread to prevent 
              interference with the Hero rendering and animations.
            */}
            {GA_ID && (
                <Script
                    id="ga-main"
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                />
            )}
            {GTM_ID && (
                <Script
                    id="gtm-worker"
                    strategy="worker"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','${GTM_ID}');
                        `,
                    }}
                />
            )}

            {/* Meta Pixel */}
            {PIXEL_ID && (
                <>
                    <Script
                        id="fb-pixel"
                        strategy="lazyOnload"
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
                    <noscript>
                        {/* The original pixel tracking image, kept for its intended purpose */}
                        <img
                            height="1"
                            width="1"
                            style={{ display: "none" }}
                            alt=""
                            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                        />
                    </noscript>
                </>
            )}
        </>
    );
}

// Add types for fbq
declare global {
    interface Window {
        fbq: any;
    }
}
