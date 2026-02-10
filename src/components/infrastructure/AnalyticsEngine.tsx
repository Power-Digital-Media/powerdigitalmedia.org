"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsEngine() {
    const pathname = usePathname();

    const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

    useEffect(() => {
        if (PIXEL_ID && window.fbq) {
            window.fbq('track', 'PageView');
        }
    }, [pathname, PIXEL_ID]);

    return (
        <>
            {/* Google Stack - Deferred for performance */}
            {GA_ID && (
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                />
            )}
            {GA_ID && (
                <Script id="ga-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_ID}');
                    `}
                </Script>
            )}
            {GTM_ID && (
                <Script id="gtm-init" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${GTM_ID}');
                    `}
                </Script>
            )}

            {/* Meta Pixel */}
            {PIXEL_ID && (
                <>
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

// Add types for fbq
declare global {
    interface Window {
        fbq: any;
    }
}
