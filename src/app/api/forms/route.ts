import { NextResponse } from 'next/server';
import { sendMetaCAPILeadEvent } from '@/lib/meta-capi';
import { syncVerifiedLeadToCapsule } from '@/lib/capsule-lead-sync';
import {
    buildMinimizedLeadData,
    executeDurableLeadWorkflow,
    redactPiiFromText,
    type BoundedRetryOptions,
    type LeadPersistenceAdapter,
} from '@/lib/durable-lead-delivery';

const DISPOSABLE_SPAM_DOMAINS = new Set([
    'mailinator.com',
    '10minutemail.com',
    'guerrillamail.com',
    'tempmail.com',
    'yopmail.com',
    'sharklasers.com',
    'trashmail.com',
]);

// Conclusive non-browser CLI/scraper libraries (never used by human assistive tools or browsers)
const CLI_SCRAPER_UA_REGEX =
    /Scrapy|python-requests|Python-urllib|Go-http-client|curl\/|wget\/|libwww-perl/i;

// Explicit headless browser automation signatures — soft risk signal (+45)
const HEADLESS_AUTOMATION_UA_REGEX =
    /HeadlessChrome|PhantomJS|SlimerJS|Playwright|Puppeteer|Cypress/i;

// Unusual / legacy / assistive browser signatures — soft risk signal (+30), never blocks even with fast autofill (+35 -> 65 < 80)
const UNUSUAL_BROWSER_UA_REGEX =
    /MSIE\s|Trident\/|Camino\/|Links\s*\(|Lynx\/|w3m\//i;

export function evaluateSubmissionSpamRisk(params: {
    honeypotValue: string;
    userAgent: string;
    elapsedMs: number | null;
    emailDomain: string;
    name: string;
    freeTextContent: string;
    isPartialCapture: boolean;
}): {
    blocked: boolean;
    riskScore: number;
    riskSignals: string[];
    blockReason: string | null;
} {
    const riskSignals: string[] = [];
    let riskScore = 0;

    // 1. Conclusive Proof: Off-screen Honeypot populated (+100)
    if (params.honeypotValue.length > 0) {
        riskScore += 100;
        riskSignals.push('honeypot_triggered');
        return {
            blocked: true,
            riskScore,
            riskSignals,
            blockReason: 'Honeypot field populated',
        };
    }

    // 2. Conclusive Proof: Disposable email domain or script tag injection (+100)
    if (
        DISPOSABLE_SPAM_DOMAINS.has(params.emailDomain) ||
        /<script\b|javascript:/i.test(params.name) ||
        /<script\b|javascript:/i.test(params.freeTextContent)
    ) {
        riskScore += 100;
        riskSignals.push('disposable_domain_or_script_injection');
        return {
            blocked: true,
            riskScore,
            riskSignals,
            blockReason: 'Disposable email domain or script injection',
        };
    }

    // 3. Conclusive Proof: Explicit CLI HTTP scraper library User-Agent (+100)
    const ua = (params.userAgent || '').trim();
    if (CLI_SCRAPER_UA_REGEX.test(ua)) {
        riskScore += 100;
        riskSignals.push('cli_scraper_user_agent');
        return {
            blocked: true,
            riskScore,
            riskSignals,
            blockReason: 'CLI scraper User-Agent',
        };
    }

    // 4. Soft Risk Signal A: Browser signature evaluation
    // - Explicit headless automation framework: +45
    // - Unusual, missing, or legacy/assistive browser: +30 (never blocks even when combined with fast autofill +35 = 65 < 80)
    const isSafariOnNonApple =
        /Safari\//i.test(ua) &&
        !/Chrome\/|Chromium\/|CriOS\/|Edg\/|OPR\/|Firefox\/|FxiOS\//i.test(ua) &&
        /Linux|X11|Windows NT|Win64|Win32/i.test(ua);

    if (HEADLESS_AUTOMATION_UA_REGEX.test(ua)) {
        riskScore += 45;
        riskSignals.push('headless_automation_signature');
    } else if (!ua || ua.length < 8 || UNUSUAL_BROWSER_UA_REGEX.test(ua) || isSafariOnNonApple) {
        riskScore += 30;
        riskSignals.push('unusual_browser_signature');
    }

    // 5. Soft Risk Signal B: Sub-500ms submission timing (+35)
    // Never blocks fast browser autofill or assistive tools on its own or with an unusual browser (30 + 35 = 65 < 80).
    if (
        !params.isPartialCapture &&
        params.elapsedMs !== null &&
        params.elapsedMs >= 0 &&
        params.elapsedMs < 500
    ) {
        riskScore += 35;
        riskSignals.push(`sub_500ms_submission_timing:${params.elapsedMs}ms`);
    }

    // 6. URL link spam density in free-text fields
    const urlMatches = params.freeTextContent.match(/https?:\/\/[^\s]+/gi) || [];
    if (urlMatches.length >= 4) {
        riskScore += 100;
        riskSignals.push(`excessive_url_spam:${urlMatches.length}`);
    } else if (urlMatches.length >= 2) {
        riskScore += 50;
        riskSignals.push(`multiple_urls_in_message:${urlMatches.length}`);
    }

    const blocked = riskScore >= 80;
    return {
        blocked,
        riskScore,
        riskSignals,
        blockReason: blocked
            ? `Compound spam risk threshold exceeded (score=${riskScore}: ${riskSignals.join(', ')})`
            : null,
    };
}

async function verifyTurnstileTokenIfConfigured(
    token: string | undefined,
    clientIp: string,
    fetchImpl: typeof fetch = fetch
): Promise<{ passed: boolean; reason?: string }> {
    const secretKey = (process.env.TURNSTILE_SECRET_KEY || '').trim();
    const siteKey = (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '').trim();

    // Only enforce Turnstile challenge when both site key and secret key are active
    if (!secretKey || !siteKey) {
        return { passed: true };
    }
    if (!token || !token.trim()) {
        return { passed: false, reason: 'Missing Turnstile verification token' };
    }

    try {
        const params = new URLSearchParams({
            secret: secretKey,
            response: token.trim(),
        });
        if (clientIp) {
            params.set('remoteip', clientIp);
        }

        const verifyRes = await fetchImpl(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params.toString(),
            }
        );
        if (!verifyRes.ok) {
            // Fail open on Cloudflare network outage so legitimate customers are not blocked
            console.warn('[Forms API] Turnstile endpoint returned non-200; failing open.');
            return { passed: true };
        }
        const outcome = await verifyRes.json();
        if (outcome.success === true) {
            return { passed: true };
        }
        return {
            passed: false,
            reason: `Turnstile verification failed: ${(outcome['error-codes'] || []).join(', ')}`,
        };
    } catch {
        console.warn('[Forms API] Turnstile network error; failing open.');
        return { passed: true };
    }
}

export interface FormsRouteDependencies {
    persistenceAdapter?: LeadPersistenceAdapter;
    fetchImpl?: typeof fetch;
    retryOptions?: BoundedRetryOptions;
    nowMs?: number;
}

export async function handleFormsPostRequest(
    req: Request,
    deps?: FormsRouteDependencies
): Promise<Response> {
    const fetcher = deps?.fetchImpl ?? fetch;

    try {
        // Parse incoming data (handle both JSON and FormData formats)
        const contentType = req.headers.get('content-type') || '';
        let body: Record<string, any> = {};

        if (contentType.includes('application/json')) {
            body = await req.json();
        } else {
            const formData = await req.formData();
            formData.forEach((value, key) => {
                if (body[key]) {
                    if (Array.isArray(body[key])) {
                        body[key].push(value);
                    } else {
                        body[key] = [body[key], value];
                    }
                } else {
                    body[key] = value;
                }
            });
        }

        // Enforce server-exclusive verification flags: strip any client-supplied verification flags
        delete body.leadVerified;
        delete body.leadEventId;
        delete body.spamFiltered;
        delete body.partialCapture;
        delete body.submissionId;
        delete body.idempotentReplay;

        const explicitIdempotencyKey =
            String(
                body._idempotency_key ||
                    body.idempotencyKey ||
                    req.headers.get('x-idempotency-key') ||
                    ''
            ).trim() || null;

        const rawEmail = String(
            body.email || body.email_address || body.prospect_email || ''
        ).trim();
        const name = String(body.name || body.prospect_name || 'Prospect').trim();
        const formSource = String(body._form_source || 'general-contact').trim();
        const isPartialCapture = formSource.startsWith('incomplete-');

        const clientIp =
            req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
            req.headers.get('x-real-ip') ||
            '';
        const clientUserAgent = req.headers.get('user-agent') || '';

        // 1. Validate required email syntax before spam scoring
        if (!rawEmail) {
            return NextResponse.json(
                { error: 'Email address is required', leadVerified: false },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(rawEmail)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address', leadVerified: false },
                { status: 400 }
            );
        }

        // 2. Multi-Signal Server-Side Spam Risk Evaluation
        const honeypotValue = String(
            body._hp_company_fax ||
                body._pdm_bot_trap_token ||
                body._gotcha ||
                body.website_honeypot ||
                ''
        ).trim();

        const loadedAtRaw = Number(body._form_loaded_at || 0);
        const elapsedMs = loadedAtRaw > 0 ? Date.now() - loadedAtRaw : null;
        const emailDomain = rawEmail.split('@')[1]?.toLowerCase() || '';
        const freeTextContent = [
            body.message,
            body.notes,
            body.roadblock,
            body.biggest_challenge,
            body.project_details,
            body.goals,
        ]
            .filter(Boolean)
            .map(String)
            .join(' ');

        const riskEvaluation = evaluateSubmissionSpamRisk({
            honeypotValue,
            userAgent: clientUserAgent,
            elapsedMs,
            emailDomain,
            name,
            freeTextContent,
            isPartialCapture,
        });

        if (riskEvaluation.blocked) {
            console.warn(
                JSON.stringify({
                    event: 'FORM_SPAM_FILTERED',
                    formSource,
                    riskScore: riskEvaluation.riskScore,
                    riskSignals: riskEvaluation.riskSignals,
                })
            );
            return NextResponse.json({
                success: true,
                spamFiltered: true,
                leadVerified: false,
                riskScore: riskEvaluation.riskScore,
                riskSignals: riskEvaluation.riskSignals,
                formSource,
            });
        }

        // 3. Optional Cloudflare Turnstile Verification (when configured)
        if (!isPartialCapture) {
            const turnstileCheck = await verifyTurnstileTokenIfConfigured(
                body['cf-turnstile-response'],
                clientIp,
                fetcher
            );
            if (!turnstileCheck.passed) {
                console.warn(
                    JSON.stringify({
                        event: 'FORM_TURNSTILE_REJECTED',
                        formSource,
                        reason: turnstileCheck.reason,
                    })
                );
                return NextResponse.json(
                    {
                        error: 'Security verification failed. Please refresh and try again.',
                        leadVerified: false,
                    },
                    { status: 400 }
                );
            }
        }

        // If this was an incomplete Step 1 discovery capture, persist abandoned Step-1 lead to Transpond first, then return partialCapture: true and leadVerified: false
        if (isPartialCapture) {
            const isQaPartial = emailDomain === 'powerdigitalmedia.test';
            const transpondKey = (process.env.TRANSPOND_API_KEY || '').trim();
            if (!isQaPartial && transpondKey) {
                const partialParts = name.split(/\s+/);
                const partialFirst = partialParts[0] || '';
                const partialLast = partialParts.slice(1).join(' ') || '';
                const partialCompany = String(
                    body.business_name ||
                        body.company ||
                        body.organisation ||
                        body.prospect_company ||
                        ''
                ).trim();
                const partialWebsite = String(
                    body.website ||
                        body.website_url ||
                        body.current_url ||
                        body.current_website ||
                        ''
                ).trim();
                const partialPhone = String(
                    body.phone || body.prospect_phone || ''
                ).trim();
                const partialGroupId = parseInt(
                    process.env.TRANSPOND_GROUP_ID || '186443',
                    10
                );
                const partialNotes = [
                    `### Abandoned Step-1 Discovery Capture (${formSource})`,
                    `* **Name:** ${name}`,
                    `* **Email:** ${rawEmail}`,
                    partialPhone ? `* **Phone:** ${partialPhone}` : '',
                    partialCompany ? `* **Business:** ${partialCompany}` : '',
                    partialWebsite ? `* **Website:** ${partialWebsite}` : '',
                ]
                    .filter(Boolean)
                    .join('\n');

                try {
                    await fetcher('https://api.transpond.io/subscriber', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${transpondKey}`,
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify({
                            emailAddress: rawEmail,
                            firstName: partialFirst,
                            lastName: partialLast,
                            groupId: partialGroupId,
                            notes: partialNotes,
                            tags: ['abandoned-web-discovery', formSource],
                            customFields: {
                                _capsule_firstName: partialFirst,
                                _capsule_lastName: partialLast,
                                _capsule_name: name,
                                _capsule_person: true,
                                _capsule_phone: partialPhone,
                                BUSINESSNAME: partialCompany,
                            },
                        }),
                        signal: AbortSignal.timeout(4000),
                    });
                } catch {
                    console.warn(
                        JSON.stringify({
                            event: 'PARTIAL_DISCOVERY_TRANSPOND_WARNING',
                            formSource,
                        })
                    );
                }
            }

            return NextResponse.json({
                success: true,
                leadVerified: false,
                partialCapture: true,
                spamFiltered: false,
                riskScore: riskEvaluation.riskScore,
                riskSignals: riskEvaluation.riskSignals,
                formSource,
            });
        }

        const email = rawEmail;
        const nameParts = name.split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Formulate a markdown block with all the discovery question answers for CRM delivery
        let summaryText = `### Form Submission Blueprint: ${formSource.toUpperCase().replace(/-/g, ' ')}\n\n`;
        summaryText += `* **Submitter Name:** ${name}\n`;
        summaryText += `* **Email:** ${email}\n`;
        if (body.phone) {
            summaryText += `* **Phone:** ${body.phone}\n`;
        }
        summaryText += `\n---\n\n### Questionnaire Responses:\n\n`;

        const excludeKeys = [
            'email',
            'email_address',
            'prospect_email',
            'name',
            'prospect_name',
            '_form_source',
            '_idempotency_key',
            'idempotencyKey',
            'phone',
            '_hp_company_fax',
            '_pdm_bot_trap_token',
            '_gotcha',
            'website_honeypot',
            '_form_loaded_at',
            'cf-turnstile-response',
        ];
        Object.entries(body).forEach(([key, value]) => {
            if (!excludeKeys.includes(key)) {
                const formattedKey = key
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (char) => char.toUpperCase());

                const formattedValue = Array.isArray(value)
                    ? value.join(', ')
                    : value;

                summaryText += `* **${formattedKey}:** ${formattedValue}\n`;
            }
        });

        const customTags = Array.isArray(body.tags)
            ? body.tags
            : body.tags
            ? [body.tags]
            : [];
        let groupId = parseInt(process.env.TRANSPOND_GROUP_ID || '186443', 10);
        if (formSource === 'community-event') {
            groupId = 187780;
        } else if (formSource === 'founders-100-reservation') {
            groupId = parseInt(
                process.env.TRANSPOND_FOUNDERS100_GROUP_ID || '187913',
                10
            );
        } else if (formSource === 'unified-solutions-lead') {
            groupId = parseInt(
                process.env.TRANSPOND_SOLUTIONS_GROUP_ID || '187918',
                10
            );
        } else if (formSource === 'lead-leak-check') {
            groupId = parseInt(
                process.env.TRANSPOND_LEAD_LEAK_CHECK_GROUP_ID || '187977',
                10
            );
        }

        const softRiskTags =
            riskEvaluation.riskSignals.length > 0 ? ['soft-risk-review'] : [];
        if (riskEvaluation.riskSignals.length > 0) {
            summaryText += `\n* **Soft Risk Signals (Accepted):** ${riskEvaluation.riskSignals.join(', ')} (score=${riskEvaluation.riskScore})\n`;
        }

        const companyValue = String(
            body.business_name ||
                body.company ||
                body.organisation ||
                body.prospect_company ||
                ''
        );
        const roadblockValue = String(
            body.roadblock ||
                body.biggest_challenge ||
                body.message ||
                body.notes ||
                freeTextContent ||
                ''
        );
        const servicesValue = Array.isArray(body.services)
            ? body.services.join(', ')
            : String(body.services || body.services_interested || '');
        const phoneValue = String(body.phone || body.prospect_phone || '');
        const websiteValue = String(
            body.website_url ||
                body.website ||
                body.current_url ||
                body.current_website ||
                ''
        );
        const pagePathValue = String(body.page_path || '/');

        const transpondPayload = {
            emailAddress: email,
            firstName: firstName,
            lastName: lastName,
            groupId: groupId,
            notes: summaryText,
            tags: [formSource, 'website-lead', ...softRiskTags, ...customTags],
            customFields: {
                '_capsule_firstName': firstName,
                '_capsule_lastName': lastName,
                '_capsule_name': name,
                '_capsule_person': true,
                '_capsule_phone': phoneValue,
                'BUSINESSNAME': companyValue,
                'ROADBLOCK': roadblockValue,
                'SERVICESINTERESTED': servicesValue,
            },
        };

        const minimizedLead = buildMinimizedLeadData({
            firstName,
            lastName,
            email,
            phone: phoneValue,
            company: companyValue,
            website: websiteValue,
            servicesInterested: servicesValue,
            roadblockSummary: roadblockValue,
            pagePath: pagePathValue,
        });

        // Build deterministic user-entered field fingerprint (excluding ephemeral timestamps/tokens)
        // so identical double-clicks within 10m deduplicate while repeat inquiries with different URLs,
        // budgets, services, or fields are always accepted as distinct leads.
        const ephemeralFingerprintExclude = new Set([
            '_idempotency_key',
            'idempotencyKey',
            '_hp_company_fax',
            '_pdm_bot_trap_token',
            '_gotcha',
            'website_honeypot',
            '_form_loaded_at',
            'cf-turnstile-response',
        ]);
        const payloadContentFingerprint = Object.keys(body)
            .filter((k) => !ephemeralFingerprintExclude.has(k))
            .sort()
            .map((k) => {
                const v = body[k];
                const serialized = Array.isArray(v)
                    ? v.map(String).join(',')
                    : String(v ?? '');
                return `${k}=${serialized.trim().toLowerCase()}`;
            })
            .join('&');

        const isQaTestSubmission = emailDomain === 'powerdigitalmedia.test';
        const bypassBackupAutoresponder = [
            'lead-leak-check',
            'unified-solutions-lead',
            'founders-100-reservation',
            'community-event',
        ].includes(formSource);

        let templateType = 'contact';
        if (formSource === 'web-design-discovery') {
            templateType = 'web-design-discovery';
        } else if (formSource === 'podcasting-discovery') {
            templateType = 'client-discovery';
        }

        const baseUrl = req.url.startsWith('http')
            ? new URL(req.url).origin
            : 'https://powerdigitalmedia.org';

        // 4. Execute Durable Lead-Delivery Workflow (Requirements B.1–B.8)
        const workflowResult = await executeDurableLeadWorkflow({
            explicitIdempotencyKey,
            formSource,
            minimizedLead,
            fullSummaryText: summaryText,
            payloadContentFingerprint,
            clientIp,
            riskScore: riskEvaluation.riskScore,
            riskSignals: riskEvaluation.riskSignals,
            isQaTestSubmission,
            bypassBackupAutoresponderWhenPrimarySucceeds: bypassBackupAutoresponder,
            transpondPayload,
            thankYouTemplate: templateType,
            baseUrl,
            persistenceAdapter: deps?.persistenceAdapter,
            fetchImpl: fetcher,
            retryOptions: deps?.retryOptions,
            nowMs: deps?.nowMs,
        });

        // Requirement B.8: Prevent a submission from being reported as accepted if durable persistence fails
        if (!workflowResult.ok || workflowResult.persistenceFailed || !workflowResult.leadEventId) {
            return NextResponse.json(
                {
                    success: false,
                    leadVerified: false,
                    persistenceFailed: true,
                    submissionId: workflowResult.submissionId,
                    formSource,
                    error:
                        workflowResult.clientSafeError ||
                        'We could not durably save your submission right now. Please try again in a moment.',
                },
                { status: workflowResult.httpStatus || 503 }
            );
        }

        // Only trigger non-blocking Capsule CRM sync & Meta CAPI on first non-replay live acceptance
        if (!isQaTestSubmission && !workflowResult.idempotentReplay) {
            if (formSource !== 'blog-newsletter') {
                syncVerifiedLeadToCapsule({
                    submissionId: workflowResult.submissionId,
                    formSource,
                    email,
                    firstName,
                    lastName,
                    phone: phoneValue,
                    company: companyValue,
                    website: websiteValue,
                    summaryText,
                    roadblockSummary: roadblockValue,
                    servicesInterested: servicesValue,
                    pagePath: pagePathValue,
                    extraTags: customTags.map(String),
                    fetchImpl: fetcher,
                }).catch(() =>
                    console.warn(
                        JSON.stringify({
                            event: 'CAPSULE_SYNC_NON_FATAL_WARNING',
                            submissionId: workflowResult.submissionId,
                            formSource,
                        })
                    )
                );
            }

            const cookieHeader = req.headers.get('cookie') || '';
            const fbc =
                cookieHeader
                    .split(';')
                    .find((c) => c.trim().startsWith('_fbc='))
                    ?.split('=')[1] ||
                String(body._fbc || '').trim();
            const fbp =
                cookieHeader
                    .split(';')
                    .find((c) => c.trim().startsWith('_fbp='))
                    ?.split('=')[1] ||
                String(body._fbp || '').trim();

            const referer = req.headers.get('referer') || '';
            const sourceUrl = body.page_path
                ? `https://powerdigitalmedia.org${body.page_path}`
                : referer || 'https://powerdigitalmedia.org/lead-leak-check';

            sendMetaCAPILeadEvent({
                email,
                phone: phoneValue,
                firstName,
                lastName,
                sourceUrl,
                clientIp,
                clientUserAgent,
                fbc,
                fbp,
                formSource,
                leadEventId: workflowResult.leadEventId,
            }).catch(() =>
                console.warn(
                    JSON.stringify({
                        event: 'META_CAPI_NON_FATAL_WARNING',
                        submissionId: workflowResult.submissionId,
                        formSource,
                    })
                )
            );
        }

        // Requirement B.6: Client response contains ZERO sensitive lead PII
        return NextResponse.json({
            success: true,
            leadVerified: true,
            spamFiltered: false,
            partialCapture: false,
            submissionId: workflowResult.submissionId,
            leadEventId: workflowResult.leadEventId,
            idempotentReplay: workflowResult.idempotentReplay,
            formSource,
            riskScore: riskEvaluation.riskScore,
            riskSignals: riskEvaluation.riskSignals,
            deliveryStatus: isQaTestSubmission
                ? 'verified_preview_dry_run'
                : workflowResult.overallDeliveryState,
            channels: {
                transpond: {
                    status: workflowResult.transpondDelivery.status,
                    attempts: workflowResult.transpondDelivery.attempts,
                },
                resend: {
                    status: workflowResult.resendDelivery.status,
                    attempts: workflowResult.resendDelivery.attempts,
                },
            },
            internalAlertTriggered: workflowResult.internalAlert.triggered,
        });
    } catch (error: unknown) {
        const safeErr = redactPiiFromText(
            error instanceof Error ? error.message : 'Internal server error'
        );
        console.error(
            JSON.stringify({
                event: 'FORMS_API_UNHANDLED_EXCEPTION',
                reason: safeErr,
            })
        );
        return NextResponse.json(
            { error: 'Internal server error', leadVerified: false },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    return handleFormsPostRequest(req);
}
