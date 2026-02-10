"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function AnalyticsEngine() {
    const pathname = usePathname();
    const [analyticsLoaded, setAnalyticsLoaded] = useState(false);

    const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

    // Defer analytics loading until after page is interactive
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnalyticsLoaded(true);
        }, 2000); // Load analytics 2 seconds after page load

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (PIXEL_ID && window.fbq) {
            window.fbq('track', 'PageView');
        }
        if (analyticsLoaded && window.gtag) {
            window.gtag('event', 'page_view', {
                page_path: pathname,
            });
        }
    }, [pathname, PIXEL_ID, analyticsLoaded]);

    if (!analyticsLoaded) return null;

    return (
        <>
            {/* Google Analytics - Deferred */}
            {GA_ID && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                        strategy="lazyOnload"
                    />
                    <Script id="google-analytics" strategy="lazyOnload">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_ID}');
                        `}
                    </Script>
                </>
            )}

            {/* Google Tag Manager - Deferred */}
            {GTM_ID && (
                <>
                    <Script id="gtm-script" strategy="lazyOnload">
                        {`
                            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','${GTM_ID}');
                        `}
                    </Script>
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        />
                    </noscript>
                </>
            )}

            {/* Meta Pixel - Deferred */}
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
                        <img
                            height="1"
                            width="1"
                            style={{ display: "none" }}
                            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                        />
                    </noscript>
                </>
            )}
        </>
    );
}

// Add types for analytics
declare global {
    interface Window {
        fbq: any;
        gtag: any;
        dataLayer: any[];
    }
}
