"use client";

/**
 * PDM Lead Submission & Verified GA4 Conversion Helper
 *
 * Guarantees:
 * 1. Single-Transmission (`generate_lead`): Calls ONLY `window.gtag("event", "generate_lead", ...)`
 *    (which queues a single standard gtag command in `window.dataLayer`) and NEVER pushes a
 *    duplicate `{ event: "generate_lead" }` GTM dataLayer object.
 * 2. Server-Exclusive `leadVerified`: Strips any client-supplied verification flags before POSTing
 *    and fires `generate_lead` strictly when `/api/forms` returns HTTP 200 with server-generated
 *    `leadVerified === true` and a valid server `leadEventId`.
 * 3. Non-Blocking Browser Signature Classification: Treats unusual browser signatures as a telemetry
 *    signal (`browser_signature_class`) rather than blocking legitimate visitors or assistive tools.
 */

const emittedLeadEventIds = new Set<string>();
const SERVER_LEAD_EVENT_ID_REGEX = /^lead_\d{10,}_[a-f0-9]{12,}$/;

export interface VerifiedLeadApiResponse {
    success?: boolean;
    leadVerified?: boolean;
    spamFiltered?: boolean;
    partialCapture?: boolean;
    persistenceFailed?: boolean;
    submissionId?: string;
    leadEventId?: string;
    idempotentReplay?: boolean;
    formSource?: string;
    riskScore?: number;
    riskSignals?: string[];
    deliveryStatus?: string;
    channels?: {
        transpond?: { status: string; attempts: number };
        resend?: { status: string; attempts: number };
    };
    internalAlertTriggered?: boolean;
    error?: string;
}

export function classifyBrowserSignature(): "standard_signature" | "suspected_automated_signature" {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
        return "standard_signature";
    }
    const ua = navigator.userAgent || "";
    const platform = navigator.platform || "";

    if (navigator.webdriver === true) {
        return "suspected_automated_signature";
    }

    if (
        /MSIE\s|Trident\/|Camino\/|HeadlessChrome|PhantomJS|SlimerJS|Playwright|Puppeteer|Cypress|Scrapy|python-requests|Python-urllib|Go-http-client|curl\/|wget\//i.test(
            ua
        )
    ) {
        return "suspected_automated_signature";
    }

    const isSafariOnly =
        /Safari\//i.test(ua) &&
        !/Chrome\/|Chromium\/|CriOS\/|Edg\/|OPR\/|Firefox\/|FxiOS\//i.test(ua);
    if (
        isSafariOnly &&
        (/Linux|X11|Win32|Win64|Windows NT/i.test(ua) || /Linux|Win/i.test(platform))
    ) {
        return "suspected_automated_signature";
    }

    return "standard_signature";
}

/**
 * Kept for backwards compatibility with callers; returns true only for explicit non-interactive
 * scraper UAs while never blocking unusual browsers or assistive technologies.
 */
export function isSuspectedAutomatedBrowserClient(): boolean {
    return classifyBrowserSignature() === "suspected_automated_signature";
}

export function emitVerifiedGenerateLeadEvent(params: {
    formSource: string;
    leadEventId: string;
    pagePath?: string;
}): boolean {
    if (typeof window === "undefined") return false;
    if (!params.leadEventId || !SERVER_LEAD_EVENT_ID_REGEX.test(params.leadEventId)) {
        return false;
    }
    if (!params.formSource || params.formSource.startsWith("incomplete-")) {
        return false;
    }

    if (emittedLeadEventIds.has(params.leadEventId)) {
        return false;
    }
    emittedLeadEventIds.add(params.leadEventId);

    const pagePath = params.pagePath || window.location.pathname || "/";
    const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-DSZ3N77EHQ";
    const signatureClass = classifyBrowserSignature();

    // Ensure the standard gtag queue exists even if the script tag is still downloading
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
        window.gtag = function gtag() {
            // eslint-disable-next-line prefer-rest-params
            window.dataLayer!.push(arguments);
        };
    }

    const eventPayload = {
        form_source: params.formSource,
        lead_event_id: params.leadEventId,
        page_path: pagePath,
        browser_signature_class: signatureClass,
        send_to: gaId,
    };

    // Transmit EXACTLY ONCE via gtag('event', 'generate_lead', ...).
    // Do NOT also call window.dataLayer.push({ event: 'generate_lead' }) to prevent duplicate GTM/GA4 triggers.
    window.gtag("event", "generate_lead", eventPayload);

    window.__pdmEmittedLeadEvents = window.__pdmEmittedLeadEvents || [];
    window.__pdmEmittedLeadEvents.push({
        event: "generate_lead",
        ...eventPayload,
        emittedAt: new Date().toISOString(),
    });

    return true;
}

export async function submitVerifiedLeadForm(options: {
    formSource: string;
    formData?: FormData;
    jsonPayload?: Record<string, unknown>;
}): Promise<{
    ok: boolean;
    status: number;
    result: VerifiedLeadApiResponse;
    leadEventEmitted: boolean;
}> {
    const { formSource, formData, jsonPayload } = options;
    const pagePath =
        typeof window !== "undefined" ? window.location.pathname || "/" : "/";

    let response: Response;

    if (formData) {
        // Strip any client-side verification keys so `leadVerified` is exclusively server-issued
        formData.delete("leadVerified");
        formData.delete("leadEventId");
        formData.delete("spamFiltered");
        formData.delete("partialCapture");

        if (!formData.get("_form_source")) {
            formData.append("_form_source", formSource);
        }
        if (!formData.get("page_path")) {
            formData.append("page_path", pagePath);
        }
        response = await fetch("/api/forms", {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" },
        });
    } else if (jsonPayload) {
        const sanitizedPayload: Record<string, unknown> = { ...jsonPayload };
        delete sanitizedPayload.leadVerified;
        delete sanitizedPayload.leadEventId;
        delete sanitizedPayload.spamFiltered;
        delete sanitizedPayload.partialCapture;

        const enrichedPayload = {
            ...sanitizedPayload,
            _form_source: sanitizedPayload._form_source || formSource,
            page_path: sanitizedPayload.page_path || pagePath,
        };
        response = await fetch("/api/forms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(enrichedPayload),
        });
    } else {
        throw new Error("Either formData or jsonPayload must be provided");
    }

    let result: VerifiedLeadApiResponse = {};
    try {
        result = await response.json();
    } catch {
        result = { success: false, error: "Invalid server response" };
    }

    const effectiveSource = String(result.formSource || formSource);
    const isVerifiedLead =
        response.ok &&
        result.success === true &&
        result.leadVerified === true &&
        result.spamFiltered !== true &&
        result.partialCapture !== true &&
        typeof result.leadEventId === "string" &&
        SERVER_LEAD_EVENT_ID_REGEX.test(result.leadEventId) &&
        !effectiveSource.startsWith("incomplete-");

    let leadEventEmitted = false;
    if (isVerifiedLead && result.leadEventId) {
        leadEventEmitted = emitVerifiedGenerateLeadEvent({
            formSource: effectiveSource,
            leadEventId: result.leadEventId,
            pagePath,
        });
    }

    return {
        ok: response.ok && result.success !== false,
        status: response.status,
        result,
        leadEventEmitted,
    };
}
