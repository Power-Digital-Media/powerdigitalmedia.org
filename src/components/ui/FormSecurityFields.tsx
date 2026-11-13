"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

/**
 * Accessibility-Safe & Autofill-Safe Anti-Spam Fields embedded inside PDM lead forms:
 * 1. `_hp_company_fax`: Off-screen honeypot trap with password-manager/autofill ignore attributes
 *    (`data-1p-ignore`, `data-lpignore`, `data-bwignore`, `data-form-type="other"`, `autoComplete="new-password"`,
 *    `tabIndex={-1}`, `aria-hidden="true"`, `role="presentation"`) so screen readers, keyboard navigation,
 *    and browser autofill never interact with it.
 * 2. `_form_loaded_at`: Client mount timestamp used only as a soft risk signal (never blocks fast autofill
 *    or assistive tools on its own).
 * 3. Optional Cloudflare Turnstile widget (`cf-turnstile`) rendered automatically when
 *    `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is configured in environment variables.
 */
export default function FormSecurityFields() {
    const [loadedAt, setLoadedAt] = useState<string>("");
    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

    useEffect(() => {
        setLoadedAt(String(Date.now()));
    }, []);

    return (
        <>
            <div
                aria-hidden="true"
                role="presentation"
                style={{
                    position: "absolute",
                    left: "-9999px",
                    top: "auto",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                    opacity: 0,
                    pointerEvents: "none",
                }}
            >
                <label htmlFor="_hp_company_fax" aria-hidden="true">
                    Verification token (leave blank)
                </label>
                <input
                    id="_hp_company_fax"
                    type="text"
                    name="_hp_company_fax"
                    defaultValue=""
                    tabIndex={-1}
                    autoComplete="new-password"
                    data-1p-ignore="true"
                    data-lpignore="true"
                    data-bwignore="true"
                    data-form-type="other"
                    aria-hidden="true"
                />
            </div>

            <input type="hidden" name="_form_loaded_at" value={loadedAt} />

            {turnstileSiteKey && (
                <>
                    <Script
                        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                        strategy="lazyOnload"
                    />
                    <div
                        className="cf-turnstile mt-2"
                        data-sitekey={turnstileSiteKey}
                        data-theme="dark"
                        data-size="flexible"
                    />
                </>
            )}
        </>
    );
}
