import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { JWT } from 'google-auth-library';

export type ChannelDeliveryStatus =
    | 'pending'
    | 'delivered'
    | 'failed'
    | 'skipped_dry_run'
    | 'skipped_by_form_policy';

export interface ChannelDeliveryState {
    status: ChannelDeliveryStatus;
    attempts: number;
    lastHttpStatus: number | null;
    lastErrorCategory: string | null;
    updatedAt: string;
}

export interface InternalAlertState {
    triggered: boolean;
    alertId: string | null;
    mechanism: 'firestore_si_alerts_and_dead_letter' | 'firestore_and_webhook' | null;
    triggeredAt: string | null;
}

export type OverallLeadDeliveryState =
    | 'persisted_pending_delivery'
    | 'delivered_primary'
    | 'delivered_both'
    | 'delivered_fallback'
    | 'verified_preview_dry_run'
    | 'failed_both_channels_alerted';

export interface MinimizedLeadData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    website?: string;
    servicesInterested: string;
    roadblockSummary: string;
    pagePath: string;
}

export interface DurableLeadSubmissionRecord {
    submissionId: string;
    leadEventId: string;
    idempotencyKeyHash: string;
    organizationId: string;
    websiteId: string;
    formSource: string;
    minimizedLead: MinimizedLeadData;
    clientIpHash: string | null;
    spamEvaluation: {
        riskScore: number;
        riskSignals: string[];
        spamFiltered: false;
    };
    retentionPolicy: {
        ttlDays: number;
        createdAtIso: string;
        expiresAtIso: string;
        expireAt?: Date | string;
        dataMinimizationApplied: true;
    };
    transpondDelivery: ChannelDeliveryState;
    resendDelivery: ChannelDeliveryState;
    internalAlert: InternalAlertState;
    overallDeliveryState: OverallLeadDeliveryState;
    createdAt: string;
    updatedAt: string;
}

export interface IndependentAlertRecord {
    alertId: string;
    submissionId: string;
    leadEventId: string;
    organizationId: string;
    websiteId: string;
    formSource: string;
    severity: 'critical';
    category: 'form_integrity';
    title: string;
    summary: string;
    transpondAttempts: number;
    transpondLastStatus: number | null;
    transpondErrorCategory: string | null;
    resendAttempts: number;
    resendLastStatus: number | null;
    resendErrorCategory: string | null;
    createdAt: string;
}

export interface LeadPersistenceAdapter {
    getLeadById(submissionId: string): Promise<DurableLeadSubmissionRecord | null>;
    createLeadBeforeDelivery(
        record: DurableLeadSubmissionRecord
    ): Promise<{ created: boolean; existingRecord?: DurableLeadSubmissionRecord }>;
    updateLeadDeliveryState(
        submissionId: string,
        patch: Partial<
            Pick<
                DurableLeadSubmissionRecord,
                | 'transpondDelivery'
                | 'resendDelivery'
                | 'internalAlert'
                | 'overallDeliveryState'
                | 'updatedAt'
            >
        >
    ): Promise<void>;
    writeIndependentDualFailureAlert(alert: IndependentAlertRecord): Promise<void>;
}

const LEAD_RETENTION_TTL_DAYS = 90;
const IDEMPOTENCY_WINDOW_MS = 10 * 60 * 1000; // 10-minute deduplication window when no explicit key is provided
const MAX_SUMMARY_LENGTH = 2000;
const MAX_FIELD_LENGTH = 250;

/**
 * Resolves the canonical Transpond subscriber group ID for a given website form source.
 */
export function resolveTranspondGroupIdForFormSource(formSource: string): number {
    const defaultGroupId = parseInt(process.env.TRANSPOND_GROUP_ID || '186443', 10);
    if (formSource === 'community-event') {
        return 187780;
    }
    if (formSource === 'founders-100-reservation') {
        return parseInt(
            process.env.TRANSPOND_FOUNDERS100_GROUP_ID || '187913',
            10
        );
    }
    if (
        formSource === 'unified-solutions-lead' ||
        formSource === 'interactive-growth-estimator'
    ) {
        return parseInt(
            process.env.TRANSPOND_SOLUTIONS_GROUP_ID ||
                process.env.TRANSPOND_GROUP_ID ||
                '187918',
            10
        );
    }
    if (formSource === 'lead-leak-check') {
        return parseInt(
            process.env.TRANSPOND_LEAD_LEAK_CHECK_GROUP_ID || '187977',
            10
        );
    }
    return defaultGroupId;
}

/**
 * Scrubs any email address, phone number, or bearer token from strings before logging or storing in alerts.
 */
export function redactPiiFromText(input: string): string {
    if (!input) return '';
    return input
        .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]')
        .replace(/(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '[REDACTED_PHONE]')
        .replace(/Bearer\s+[A-Za-z0-9._~+/-]+=*/gi, 'Bearer [REDACTED_TOKEN]')
        .slice(0, 300);
}

/**
 * Computes a one-way salted SHA-256 hash of a client IP so raw IPs are never stored in Firestore.
 */
export function hashClientIpForMinimizedStorage(clientIp: string): string | null {
    const trimmed = (clientIp || '').trim();
    if (!trimmed) return null;
    const salt = process.env.PDM_LEAD_IP_HASH_SALT || 'pdm_lead_privacy_salt_v1';
    return crypto
        .createHash('sha256')
        .update(`${salt}:${trimmed}`)
        .digest('hex')
        .slice(0, 24);
}

/**
 *Applies strict data minimization to validated form inputs prior to Firestore storage.
 */
export function buildMinimizedLeadData(params: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    website?: string;
    servicesInterested: string;
    roadblockSummary: string;
    pagePath: string;
}): MinimizedLeadData {
    return {
        firstName: (params.firstName || '').trim().slice(0, MAX_FIELD_LENGTH),
        lastName: (params.lastName || '').trim().slice(0, MAX_FIELD_LENGTH),
        email: (params.email || '').trim().toLowerCase().slice(0, MAX_FIELD_LENGTH),
        phone: (params.phone || '').trim().slice(0, 40),
        company: (params.company || '').trim().slice(0, MAX_FIELD_LENGTH),
        website: (params.website || '').trim().slice(0, MAX_FIELD_LENGTH),
        servicesInterested: (params.servicesInterested || '').trim().slice(0, MAX_FIELD_LENGTH),
        roadblockSummary: (params.roadblockSummary || '').trim().slice(0, MAX_SUMMARY_LENGTH),
        pagePath: (params.pagePath || '/').trim().slice(0, MAX_FIELD_LENGTH),
    };
}

/**
 * Generates a deterministic idempotency key hash and `submissionId` (`sub_<24hex>`)
 * to prevent duplicate lead creation or repeated notifications across double-clicks or network retries,
 * while ensuring legitimate repeat inquiries within 10 minutes with different service selections,
 * website URLs, company names, phone numbers, pages, or questionnaire fields are NEVER suppressed.
 */
export function computeDeterministicSubmissionIdentity(params: {
    explicitIdempotencyKey?: string | null;
    email: string;
    formSource: string;
    roadblockSummary: string;
    company?: string;
    phone?: string;
    servicesInterested?: string;
    pagePath?: string;
    payloadContentFingerprint?: string;
    nowMs?: number;
}): { submissionId: string; idempotencyKeyHash: string } {
    const normalizedEmail = (params.email || '').trim().toLowerCase();
    const normalizedSource = (params.formSource || 'general-contact').trim().toLowerCase();
    const normalizedText = (params.roadblockSummary || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .slice(0, 500);
    const normalizedCompany = (params.company || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .slice(0, 150);
    const normalizedPhone = (params.phone || '').replace(/\D+/g, '').slice(0, 20);
    const normalizedServices = (params.servicesInterested || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .slice(0, 250);
    const normalizedPage = (params.pagePath || '/')
        .trim()
        .toLowerCase()
        .slice(0, 150);
    const normalizedPayloadFp = (params.payloadContentFingerprint || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .slice(0, 1000);

    const explicitKey = (params.explicitIdempotencyKey || '').trim();
    const bucket = Math.floor((params.nowMs ?? Date.now()) / IDEMPOTENCY_WINDOW_MS);

    const rawSeed = explicitKey
        ? `explicit:${normalizedSource}:${normalizedEmail}:${explicitKey}`
        : `window:${normalizedSource}:${normalizedEmail}:${normalizedPage}:${normalizedCompany}:${normalizedPhone}:${normalizedServices}:${normalizedText}:${normalizedPayloadFp}:${bucket}`;

    const fullHash = crypto.createHash('sha256').update(rawSeed).digest('hex');
    return {
        submissionId: `sub_${fullHash.slice(0, 24)}`,
        idempotencyKeyHash: fullHash,
    };
}

export function isTransientHttpFailure(status: number): boolean {
    return (
        status === 408 ||
        status === 425 ||
        status === 429 ||
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504
    );
}

export interface BoundedRetryOptions {
    maxAttempts?: number;
    baseDelayMs?: number;
    sleepImpl?: (ms: number) => Promise<void>;
}

const defaultSleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Executes an external provider HTTP call with bounded retries and exponential backoff
 * exclusively for transient failures (network exceptions or HTTP 408/425/429/5xx).
 */
export async function executeProviderCallWithBoundedRetry(
    operation: (attempt: number) => Promise<{
        delivered: boolean;
        httpStatus: number | null;
        errorCategory: string | null;
        retryable: boolean;
    }>,
    options?: BoundedRetryOptions
): Promise<{
    delivered: boolean;
    attempts: number;
    lastHttpStatus: number | null;
    lastErrorCategory: string | null;
}> {
    const maxAttempts = Math.max(1, options?.maxAttempts ?? 3);
    const baseDelayMs = options?.baseDelayMs ?? 250;
    const sleep = options?.sleepImpl ?? defaultSleep;

    let attempts = 0;
    let lastHttpStatus: number | null = null;
    let lastErrorCategory: string | null = null;

    while (attempts < maxAttempts) {
        attempts += 1;
        try {
            const outcome = await operation(attempts);
            lastHttpStatus = outcome.httpStatus;
            lastErrorCategory = outcome.errorCategory;

            if (outcome.delivered) {
                return {
                    delivered: true,
                    attempts,
                    lastHttpStatus,
                    lastErrorCategory: null,
                };
            }

            if (!outcome.retryable || attempts >= maxAttempts) {
                return {
                    delivered: false,
                    attempts,
                    lastHttpStatus,
                    lastErrorCategory: lastErrorCategory || `http_${lastHttpStatus || 'unknown'}`,
                };
            }
        } catch (err: unknown) {
            const rawMessage = err instanceof Error ? err.message : String(err);
            lastHttpStatus = null;
            lastErrorCategory = `network_error:${redactPiiFromText(rawMessage).slice(0, 80)}`;
            if (attempts >= maxAttempts) {
                return {
                    delivered: false,
                    attempts,
                    lastHttpStatus: null,
                    lastErrorCategory,
                };
            }
        }

        const backoffMs = baseDelayMs * Math.pow(2, attempts - 1);
        await sleep(backoffMs);
    }

    return {
        delivered: false,
        attempts,
        lastHttpStatus,
        lastErrorCategory: lastErrorCategory || 'exhausted_retries',
    };
}

const FIRESTORE_PROJECT_ID =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    'power-digital-media';

const FIRESTORE_REST_BASE = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT_ID}/databases/(default)/documents`;

let cachedFirestoreToken: { token: string; expiresAtMs: number } | null = null;

async function getFirestoreRestAccessToken(): Promise<string> {
    if (
        cachedFirestoreToken &&
        Date.now() < cachedFirestoreToken.expiresAtMs - 5 * 60 * 1000
    ) {
        return cachedFirestoreToken.token;
    }

    const brokerUrl = process.env.SI_TOKEN_BROKER_URL?.trim();
    const workerSecret = process.env.SI_WORKER_SECRET?.trim();

    if (brokerUrl && workerSecret) {
        const timestamp = String(Date.now());
        const nonce = crypto.randomBytes(16).toString('hex');
        const purpose = 'firestore-only';
        const signature = crypto
            .createHmac('sha256', workerSecret)
            .update(`${timestamp}:${nonce}:${purpose}`)
            .digest('hex');

        const res = await fetch(brokerUrl, {
            method: 'POST',
            headers: {
                'X-SI-Worker-Secret': workerSecret,
                'X-SI-Broker-Purpose': purpose,
                'X-SI-Broker-Timestamp': timestamp,
                'X-SI-Broker-Nonce': nonce,
                'X-SI-Broker-Signature': signature,
                Accept: 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(
                `Keyless ADC token broker returned HTTP ${res.status}`
            );
        }

        const data = (await res.json()) as {
            access_token: string;
            expires_in?: number;
        };
        const expiresIn = data.expires_in || 3500;
        cachedFirestoreToken = {
            token: data.access_token,
            expiresAtMs: Date.now() + expiresIn * 1000,
        };
        return data.access_token;
    }

    // Scoped service-account fallback (only when project_id matches FIRESTORE_PROJECT_ID)
    for (const rawKey of [
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
        process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
    ]) {
        if (!rawKey) continue;
        try {
            const parsed = JSON.parse(rawKey) as Record<string, string>;
            if (
                parsed &&
                parsed.project_id === FIRESTORE_PROJECT_ID &&
                parsed.client_email &&
                parsed.private_key
            ) {
                const jwt = new JWT({
                    email: parsed.client_email,
                    key: parsed.private_key,
                    scopes: ['https://www.googleapis.com/auth/datastore'],
                });
                const tokenRes = await jwt.authorize();
                if (tokenRes.access_token) {
                    cachedFirestoreToken = {
                        token: tokenRes.access_token,
                        expiresAtMs:
                            tokenRes.expiry_date || Date.now() + 3300 * 1000,
                    };
                    return tokenRes.access_token;
                }
            }
        } catch {
            // Continue to next credential fallback
        }
    }

    // Local development fallback: Firebase CLI OAuth token
    if (process.env.NODE_ENV !== 'production') {
        const cfgPath = path.join(
            os.homedir(),
            '.config',
            'configstore',
            'firebase-tools.json'
        );
        if (fs.existsSync(cfgPath)) {
            const raw = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
            const accessToken = raw?.tokens?.access_token;
            const expiresAt = Number(raw?.tokens?.expires_at || 0);
            if (accessToken && expiresAt > Date.now() + 60_000) {
                cachedFirestoreToken = {
                    token: String(accessToken),
                    expiresAtMs: expiresAt,
                };
                return String(accessToken);
            }
        }
    }

    throw new Error(
        'Missing SI_TOKEN_BROKER_URL / SI_WORKER_SECRET for Cloud Firestore REST persistence'
    );
}

function encodeLeadRecordToFirestoreDoc(record: DurableLeadSubmissionRecord) {
    return {
        fields: {
            submissionId: { stringValue: record.submissionId },
            leadEventId: { stringValue: record.leadEventId },
            idempotencyKeyHash: { stringValue: record.idempotencyKeyHash },
            organizationId: { stringValue: record.organizationId },
            websiteId: { stringValue: record.websiteId },
            formSource: { stringValue: record.formSource },
            overallDeliveryState: { stringValue: record.overallDeliveryState },
            transpondStatus: { stringValue: record.transpondDelivery.status },
            transpondAttempts: {
                integerValue: String(record.transpondDelivery.attempts),
            },
            resendStatus: { stringValue: record.resendDelivery.status },
            resendAttempts: {
                integerValue: String(record.resendDelivery.attempts),
            },
            internalAlertTriggered: {
                booleanValue: record.internalAlert.triggered,
            },
            ttlDays: { integerValue: String(record.retentionPolicy.ttlDays) },
            dataMinimizationApplied: {
                booleanValue: record.retentionPolicy.dataMinimizationApplied,
            },
            expireAt: { timestampValue: record.retentionPolicy.expiresAtIso },
            createdAt: { stringValue: record.createdAt },
            updatedAt: { stringValue: record.updatedAt },
            recordJson: { stringValue: JSON.stringify(record) },
        },
    };
}

function decodeLeadRecordFromFirestoreDoc(
    doc: Record<string, any>
): DurableLeadSubmissionRecord | null {
    const rawJson = doc?.fields?.recordJson?.stringValue;
    if (!rawJson) return null;
    return JSON.parse(rawJson) as DurableLeadSubmissionRecord;
}

/**
 * Default Firestore-backed persistence adapter using the official Cloud Firestore v1 REST API
 * and the hardened `siWorkerTokenBroker` (`SI_TOKEN_BROKER_URL` + `SI_WORKER_SECRET`).
 * Eliminates gRPC/protobuf binary bundling issues in Next.js Turbopack serverless functions.
 */
export function createFirestoreLeadPersistenceAdapter(): LeadPersistenceAdapter & {
    deleteLeadById(submissionId: string): Promise<void>;
} {
    return {
        async getLeadById(submissionId: string) {
            const token = await getFirestoreRestAccessToken();
            const res = await fetch(
                `${FIRESTORE_REST_BASE}/pdm_lead_submissions/${encodeURIComponent(submissionId)}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                }
            );
            if (res.status === 404) return null;
            if (!res.ok) {
                throw new Error(`Firestore GET failed with HTTP ${res.status}`);
            }
            const doc = await res.json();
            return decodeLeadRecordFromFirestoreDoc(doc);
        },

        async createLeadBeforeDelivery(record: DurableLeadSubmissionRecord) {
            const token = await getFirestoreRestAccessToken();
            const createUrl = `${FIRESTORE_REST_BASE}/pdm_lead_submissions?documentId=${encodeURIComponent(
                record.submissionId
            )}`;
            const res = await fetch(createUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(encodeLeadRecordToFirestoreDoc(record)),
            });

            if (res.ok) {
                return { created: true };
            }

            if (res.status === 409) {
                const existing = await this.getLeadById(record.submissionId);
                if (existing) {
                    return { created: false, existingRecord: existing };
                }
            }

            const errText = await res.text().catch(() => '');
            throw new Error(
                `Firestore atomic create failed (HTTP ${res.status}): ${redactPiiFromText(errText)}`
            );
        },

        async updateLeadDeliveryState(submissionId, patch) {
            const existing = await this.getLeadById(submissionId);
            if (!existing) {
                throw new Error(`Missing durable lead record ${submissionId}`);
            }
            const updated: DurableLeadSubmissionRecord = {
                ...existing,
                ...patch,
            };
            const token = await getFirestoreRestAccessToken();
            const res = await fetch(
                `${FIRESTORE_REST_BASE}/pdm_lead_submissions/${encodeURIComponent(submissionId)}`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify(encodeLeadRecordToFirestoreDoc(updated)),
                }
            );
            if (!res.ok) {
                throw new Error(`Firestore PATCH failed with HTTP ${res.status}`);
            }
        },

        async writeIndependentDualFailureAlert(alert: IndependentAlertRecord) {
            const token = await getFirestoreRestAccessToken();
            const expiresIso = new Date(
                Date.now() + LEAD_RETENTION_TTL_DAYS * 86_400_000
            ).toISOString();

            const deadLetterBody = {
                fields: {
                    alertId: { stringValue: alert.alertId },
                    submissionId: { stringValue: alert.submissionId },
                    leadEventId: { stringValue: alert.leadEventId },
                    organizationId: { stringValue: alert.organizationId },
                    websiteId: { stringValue: alert.websiteId },
                    formSource: { stringValue: alert.formSource },
                    severity: { stringValue: alert.severity },
                    category: { stringValue: alert.category },
                    title: { stringValue: alert.title },
                    summary: { stringValue: alert.summary },
                    createdAt: { stringValue: alert.createdAt },
                    expireAt: { timestampValue: expiresIso },
                    alertJson: { stringValue: JSON.stringify(alert) },
                },
            };

            const siAlertBody = {
                fields: {
                    id: { stringValue: alert.alertId },
                    organizationId: { stringValue: alert.organizationId },
                    websiteId: { stringValue: alert.websiteId },
                    severity: { stringValue: alert.severity },
                    category: { stringValue: alert.category },
                    status: { stringValue: 'open' },
                    title: { stringValue: alert.title },
                    message: { stringValue: alert.summary },
                    submissionId: { stringValue: alert.submissionId },
                    leadEventId: { stringValue: alert.leadEventId },
                    formSource: { stringValue: alert.formSource },
                    createdAt: { stringValue: alert.createdAt },
                    updatedAt: { stringValue: alert.createdAt },
                },
            };

            await Promise.all([
                fetch(
                    `${FIRESTORE_REST_BASE}/pdm_lead_delivery_alerts/${encodeURIComponent(alert.alertId)}`,
                    {
                        method: 'PATCH',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(deadLetterBody),
                    }
                ),
                fetch(
                    `${FIRESTORE_REST_BASE}/si_alerts/${encodeURIComponent(alert.alertId)}`,
                    {
                        method: 'PATCH',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(siAlertBody),
                    }
                ),
            ]);
        },

        async deleteLeadById(submissionId: string) {
            const token = await getFirestoreRestAccessToken();
            await fetch(
                `${FIRESTORE_REST_BASE}/pdm_lead_submissions/${encodeURIComponent(submissionId)}`,
                {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        },
    };
}

export interface ExecuteDurableLeadWorkflowInput {
    explicitIdempotencyKey?: string | null;
    formSource: string;
    minimizedLead: MinimizedLeadData;
    fullSummaryText?: string;
    payloadContentFingerprint?: string;
    clientIp: string;
    riskScore: number;
    riskSignals: string[];
    isQaTestSubmission: boolean;
    bypassBackupAutoresponderWhenPrimarySucceeds: boolean;
    transpondPayload: Record<string, unknown>;
    thankYouTemplate: string;
    baseUrl: string;
    persistenceAdapter?: LeadPersistenceAdapter;
    fetchImpl?: typeof fetch;
    retryOptions?: BoundedRetryOptions;
    nowMs?: number;
}

function escapeHtmlForLeadAlert(raw: string | undefined): string {
    if (!raw) return '';
    return raw
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

async function dispatchTranspondInternalLeadSummary(params: {
    submissionId: string;
    leadEventId: string;
    formSource: string;
    lead: MinimizedLeadData;
    fullSummaryText?: string;
    fetcher: typeof fetch;
}): Promise<void> {
    const transpondKey = (process.env.TRANSPOND_API_KEY || '').trim();
    if (!transpondKey) return;

    const toAddress =
        (process.env.ALERT_RECIPIENT_EMAIL || '').trim() ||
        'damein@powerdigitalmedia.org';
    const fromAddress =
        (process.env.TRANSPOND_FROM_EMAIL || '').trim() ||
        'hello@powerdigitalmedia.org';
    const fullName =
        `${params.lead.firstName} ${params.lead.lastName}`.trim() || 'Prospect';

    const rows: Array<[string, string]> = [
        ['Name', escapeHtmlForLeadAlert(fullName)],
        ['Email', escapeHtmlForLeadAlert(params.lead.email)],
        ['Phone', escapeHtmlForLeadAlert(params.lead.phone || '—')],
        ['Company', escapeHtmlForLeadAlert(params.lead.company || '—')],
        ['Website', escapeHtmlForLeadAlert(params.lead.website || '—')],
        ['Form Source', escapeHtmlForLeadAlert(params.formSource)],
        ['Services Interested', escapeHtmlForLeadAlert(params.lead.servicesInterested || '—')],
        ['Page Path', escapeHtmlForLeadAlert(params.lead.pagePath || '/')],
        ['Submission ID', escapeHtmlForLeadAlert(params.submissionId)],
    ];

    const tableHtml = rows
        .map(
            ([label, val]) =>
                `<tr><td style="padding:8px 12px;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:12px;font-weight:700;width:165px;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #1e293b;color:#f8fafc;font-size:13px;">${val}</td></tr>`
        )
        .join('');

    const notesBody =
        params.fullSummaryText ||
        params.lead.roadblockSummary ||
        'No additional notes provided.';

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;background:#06080f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#f8fafc;">
  <div style="max-width:640px;margin:0 auto;background:#0b0f19;border:1px solid #f59e0b44;border-radius:16px;padding:28px;">
    <p style="margin:0 0 6px;color:#f59e0b;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Power Digital Media — Verified Inbound Lead</p>
    <h2 style="margin:0 0 18px;color:#ffffff;font-size:20px;">${escapeHtmlForLeadAlert(fullName)}${params.lead.company ? ` — ${escapeHtmlForLeadAlert(params.lead.company)}` : ''}</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">${tableHtml}</table>
    <div style="background:#111827;border:1px solid #1f2937;border-radius:12px;padding:16px;">
      <p style="margin:0 0 8px;color:#fbbf24;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Message &amp; Questionnaire Details</p>
      <pre style="margin:0;color:#e2e8f0;font-family:inherit;font-size:13px;line-height:1.6;white-space:pre-wrap;">${escapeHtmlForLeadAlert(notesBody)}</pre>
    </div>
  </div>
</body>
</html>`;

    try {
        const res = await params.fetcher('https://api.transpond.io/transaction', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${transpondKey}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                fromAddress,
                fromName: 'Power Digital Media Leads',
                replyAddress: params.lead.email || fromAddress,
                toAddress,
                subject: `🔔 New Lead (${params.formSource}): ${fullName}${params.lead.company ? ` — ${params.lead.company}` : ''}`,
                html,
            }),
        });

        if (!res.ok) {
            const errText = await res.text().catch(() => '');
            console.warn(
                JSON.stringify({
                    event: 'TRANSPOND_INTERNAL_ALERT_TX_WARNING',
                    submissionId: params.submissionId,
                    formSource: params.formSource,
                    status: res.status,
                    reason: redactPiiFromText(errText),
                })
            );
        }
    } catch (err: unknown) {
        console.warn(
            JSON.stringify({
                event: 'TRANSPOND_INTERNAL_ALERT_TX_NETWORK_WARNING',
                submissionId: params.submissionId,
                formSource: params.formSource,
                reason: redactPiiFromText(
                    err instanceof Error ? err.message : String(err)
                ),
            })
        );
    }
}

export interface ExecuteDurableLeadWorkflowResult {
    ok: boolean;
    httpStatus: number;
    submissionId: string;
    leadEventId: string | null;
    idempotentReplay: boolean;
    persistenceFailed: boolean;
    overallDeliveryState: OverallLeadDeliveryState | 'persistence_failed';
    transpondDelivery: ChannelDeliveryState;
    resendDelivery: ChannelDeliveryState;
    internalAlert: InternalAlertState;
    clientSafeError?: string;
}

/**
 * Executes the complete Part B Durable Lead-Delivery Workflow:
 * 1. Computes deterministic `submissionId` and checks idempotency.
 * 2. Persists validated, minimized lead to Firestore BEFORE any external provider call.
 *    If durable persistence fails, immediately aborts and returns HTTP 503 (`leadVerified: false`).
 * 3. Executes Transpond delivery with bounded exponential-backoff retries on transient failures.
 * 4. Executes Resend delivery (or failover notification when Transpond fails) with bounded retries,
 *    tracking status separately from Transpond.
 * 5. Triggers an independent internal PDM alert (Firestore `pdm_lead_delivery_alerts` + `si_alerts` +
 *    optional independent webhook) when both Transpond and Resend fail.
 * 6. Never logs or returns raw PII.
 */
export async function executeDurableLeadWorkflow(
    input: ExecuteDurableLeadWorkflowInput
): Promise<ExecuteDurableLeadWorkflowResult> {
    const nowMs = input.nowMs ?? Date.now();
    const nowIso = new Date(nowMs).toISOString();
    const expiresAtIso = new Date(
        nowMs + LEAD_RETENTION_TTL_DAYS * 86_400_000
    ).toISOString();

    const adapter =
        input.persistenceAdapter ?? createFirestoreLeadPersistenceAdapter();
    const fetcher = input.fetchImpl ?? fetch;

    const { submissionId, idempotencyKeyHash } =
        computeDeterministicSubmissionIdentity({
            explicitIdempotencyKey: input.explicitIdempotencyKey,
            email: input.minimizedLead.email,
            formSource: input.formSource,
            roadblockSummary: input.minimizedLead.roadblockSummary,
            company: input.minimizedLead.company,
            phone: input.minimizedLead.phone,
            servicesInterested: input.minimizedLead.servicesInterested,
            pagePath: input.minimizedLead.pagePath,
            payloadContentFingerprint: input.payloadContentFingerprint,
            nowMs,
        });

    const generatedLeadEventId = `lead_${nowMs}_${crypto
        .randomBytes(8)
        .toString('hex')}`;

    const initialTranspondState: ChannelDeliveryState = {
        status: input.isQaTestSubmission ? 'skipped_dry_run' : 'pending',
        attempts: 0,
        lastHttpStatus: null,
        lastErrorCategory: null,
        updatedAt: nowIso,
    };

    const initialResendState: ChannelDeliveryState = {
        status: input.isQaTestSubmission ? 'skipped_dry_run' : 'pending',
        attempts: 0,
        lastHttpStatus: null,
        lastErrorCategory: null,
        updatedAt: nowIso,
    };

    const initialAlertState: InternalAlertState = {
        triggered: false,
        alertId: null,
        mechanism: null,
        triggeredAt: null,
    };

    const initialRecord: DurableLeadSubmissionRecord = {
        submissionId,
        leadEventId: generatedLeadEventId,
        idempotencyKeyHash,
        organizationId: 'org_power_digital_media',
        websiteId: 'site_pdm_agency',
        formSource: input.formSource,
        minimizedLead: input.minimizedLead,
        clientIpHash: hashClientIpForMinimizedStorage(input.clientIp),
        spamEvaluation: {
            riskScore: input.riskScore,
            riskSignals: input.riskSignals,
            spamFiltered: false,
        },
        retentionPolicy: {
            ttlDays: LEAD_RETENTION_TTL_DAYS,
            createdAtIso: nowIso,
            expiresAtIso,
            dataMinimizationApplied: true,
        },
        transpondDelivery: initialTranspondState,
        resendDelivery: initialResendState,
        internalAlert: initialAlertState,
        overallDeliveryState: input.isQaTestSubmission
            ? 'verified_preview_dry_run'
            : 'persisted_pending_delivery',
        createdAt: nowIso,
        updatedAt: nowIso,
    };

    // STEP 1: Persist to Firestore BEFORE any external provider call (Requirements B.1, B.2, B.8)
    let createResult: {
        created: boolean;
        existingRecord?: DurableLeadSubmissionRecord;
    };
    try {
        createResult = await adapter.createLeadBeforeDelivery(initialRecord);
    } catch (persistErr: unknown) {
        const safeReason = redactPiiFromText(
            persistErr instanceof Error ? persistErr.message : String(persistErr)
        );
        console.error(
            JSON.stringify({
                event: 'CRITICAL_LEAD_PERSISTENCE_FAILURE',
                severity: 'ERROR',
                submissionId,
                formSource: input.formSource,
                reason: safeReason,
                timestamp: nowIso,
            })
        );
        return {
            ok: false,
            httpStatus: 503,
            submissionId,
            leadEventId: null,
            idempotentReplay: false,
            persistenceFailed: true,
            overallDeliveryState: 'persistence_failed',
            transpondDelivery: initialTranspondState,
            resendDelivery: initialResendState,
            internalAlert: initialAlertState,
            clientSafeError:
                'We could not durably save your submission right now. Please try again in a moment.',
        };
    }

    // STEP 2: Idempotency check — if already created and not in a failed-both state, return existing without duplicate notifications
    if (!createResult.created && createResult.existingRecord) {
        const existing = createResult.existingRecord;
        if (existing.overallDeliveryState !== 'failed_both_channels_alerted') {
            console.log(
                JSON.stringify({
                    event: 'LEAD_IDEMPOTENT_REPLAY_SUPPRESSED',
                    submissionId: existing.submissionId,
                    leadEventId: existing.leadEventId,
                    formSource: existing.formSource,
                    overallDeliveryState: existing.overallDeliveryState,
                })
            );
            return {
                ok: true,
                httpStatus: 200,
                submissionId: existing.submissionId,
                leadEventId: existing.leadEventId,
                idempotentReplay: true,
                persistenceFailed: false,
                overallDeliveryState: existing.overallDeliveryState,
                transpondDelivery: existing.transpondDelivery,
                resendDelivery: existing.resendDelivery,
                internalAlert: existing.internalAlert,
            };
        }
    }

    const activeLeadEventId =
        createResult.existingRecord?.leadEventId || generatedLeadEventId;

    // If this is a QA dry-run domain (`@powerdigitalmedia.test`), persistence succeeded and external calls are skipped
    if (input.isQaTestSubmission) {
        return {
            ok: true,
            httpStatus: 200,
            submissionId,
            leadEventId: activeLeadEventId,
            idempotentReplay: false,
            persistenceFailed: false,
            overallDeliveryState: 'verified_preview_dry_run',
            transpondDelivery: initialTranspondState,
            resendDelivery: initialResendState,
            internalAlert: initialAlertState,
        };
    }

    // STEP 3: Deliver to Transpond CRM with bounded exponential-backoff retries (Requirements B.3, B.4, B.6)
    const transpondOutcome = await executeProviderCallWithBoundedRetry(
        async () => {
            const response = await fetcher('https://api.transpond.io/subscriber', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.TRANSPOND_API_KEY || ''}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(input.transpondPayload),
            });

            const responseText = await response.text().catch(() => '');
            if (
                response.ok ||
                response.status === 409 ||
                responseText.includes('already exists') ||
                responseText.includes('already in group')
            ) {
                return {
                    delivered: true,
                    httpStatus: response.status,
                    errorCategory: null,
                    retryable: false,
                };
            }

            return {
                delivered: false,
                httpStatus: response.status,
                errorCategory: `transpond_http_${response.status}`,
                retryable: isTransientHttpFailure(response.status),
            };
        },
        input.retryOptions
    );

    const transpondState: ChannelDeliveryState = {
        status: transpondOutcome.delivered ? 'delivered' : 'failed',
        attempts: transpondOutcome.attempts,
        lastHttpStatus: transpondOutcome.lastHttpStatus,
        lastErrorCategory: transpondOutcome.lastErrorCategory,
        updatedAt: new Date().toISOString(),
    };

    // STEP 3B: Dispatch internal lead summary alert to ALERT_RECIPIENT_EMAIL via Transpond Transactional API
    if (input.formSource !== 'blog-newsletter') {
        await dispatchTranspondInternalLeadSummary({
            submissionId,
            leadEventId: activeLeadEventId,
            formSource: input.formSource,
            lead: input.minimizedLead,
            fullSummaryText: input.fullSummaryText,
            fetcher,
        });
    }

    // STEP 4: Deliver via Resend backup/co-responder channel (Requirements B.3, B.4)
    // Note: Even if `bypassBackupAutoresponderWhenPrimarySucceeds` is true for a specialized funnel,
    // we NEVER bypass Resend when Transpond fails!
    const shouldRunResend =
        !transpondOutcome.delivered ||
        !input.bypassBackupAutoresponderWhenPrimarySucceeds;

    let resendState: ChannelDeliveryState;

    if (!shouldRunResend) {
        resendState = {
            status: 'skipped_by_form_policy',
            attempts: 0,
            lastHttpStatus: null,
            lastErrorCategory: null,
            updatedAt: new Date().toISOString(),
        };
    } else {
        const resendOutcome = await executeProviderCallWithBoundedRetry(
            async () => {
                const res = await fetcher(`${input.baseUrl}/api/contact/thank-you`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: input.minimizedLead.email,
                        name: `${input.minimizedLead.firstName} ${input.minimizedLead.lastName}`.trim(),
                        template: input.thankYouTemplate,
                        submissionId,
                        leadEventId: activeLeadEventId,
                        formSource: input.formSource,
                        internalFallbackRequired: !transpondOutcome.delivered,
                        minimizedLeadSummary: !transpondOutcome.delivered
                            ? {
                                  phone: input.minimizedLead.phone,
                                  company: input.minimizedLead.company,
                                  website: input.minimizedLead.website,
                                  servicesInterested:
                                      input.minimizedLead.servicesInterested,
                                  roadblockSummary:
                                      input.minimizedLead.roadblockSummary,
                                  pagePath: input.minimizedLead.pagePath,
                              }
                            : undefined,
                    }),
                });

                if (res.ok) {
                    return {
                        delivered: true,
                        httpStatus: res.status,
                        errorCategory: null,
                        retryable: false,
                    };
                }

                return {
                    delivered: false,
                    httpStatus: res.status,
                    errorCategory: `resend_http_${res.status}`,
                    retryable: isTransientHttpFailure(res.status),
                };
            },
            input.retryOptions
        );

        resendState = {
            status: resendOutcome.delivered ? 'delivered' : 'failed',
            attempts: resendOutcome.attempts,
            lastHttpStatus: resendOutcome.lastHttpStatus,
            lastErrorCategory: resendOutcome.lastErrorCategory,
            updatedAt: new Date().toISOString(),
        };
    }

    // STEP 5: Evaluate overall state & trigger independent internal alert if BOTH channels failed (Requirement B.5)
    let overallDeliveryState: OverallLeadDeliveryState;
    let internalAlert: InternalAlertState = initialAlertState;

    if (transpondState.status === 'delivered' && resendState.status === 'delivered') {
        overallDeliveryState = 'delivered_both';
    } else if (transpondState.status === 'delivered') {
        overallDeliveryState = 'delivered_primary';
    } else if (resendState.status === 'delivered') {
        overallDeliveryState = 'delivered_fallback';
    } else {
        overallDeliveryState = 'failed_both_channels_alerted';
        const alertId = `alert_lead_dual_fail_${submissionId}`;
        const alertCreatedAt = new Date().toISOString();

        const alertRecord: IndependentAlertRecord = {
            alertId,
            submissionId,
            leadEventId: activeLeadEventId,
            organizationId: 'org_power_digital_media',
            websiteId: 'site_pdm_agency',
            formSource: input.formSource,
            severity: 'critical',
            category: 'form_integrity',
            title: `Dual Lead Notification Outage on ${input.formSource}`,
            summary: `Lead ${submissionId} (${activeLeadEventId}) was durably saved in Firestore (pdm_lead_submissions/${submissionId}), but both Transpond (${transpondState.lastErrorCategory || 'failed'} after ${transpondState.attempts} attempts) and Resend (${resendState.lastErrorCategory || 'failed'} after ${resendState.attempts} attempts) failed.`,
            transpondAttempts: transpondState.attempts,
            transpondLastStatus: transpondState.lastHttpStatus,
            transpondErrorCategory: transpondState.lastErrorCategory,
            resendAttempts: resendState.attempts,
            resendLastStatus: resendState.lastHttpStatus,
            resendErrorCategory: resendState.lastErrorCategory,
            createdAt: alertCreatedAt,
        };

        let webhookDispatched = false;
        const webhookUrl = (process.env.PDM_INTERNAL_ALERT_WEBHOOK_URL || '').trim();
        if (webhookUrl) {
            try {
                const whRes = await fetcher(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(alertRecord),
                });
                webhookDispatched = whRes.ok;
            } catch {
                // Continue to Firestore dead-letter alert
            }
        }

        try {
            await adapter.writeIndependentDualFailureAlert(alertRecord);
        } catch (alertErr: unknown) {
            console.error(
                JSON.stringify({
                    event: 'INDEPENDENT_ALERT_PERSIST_WARNING',
                    submissionId,
                    alertId,
                    reason: redactPiiFromText(
                        alertErr instanceof Error ? alertErr.message : String(alertErr)
                    ),
                })
            );
        }

        // Structured Cloud Error log (zero PII)
        console.error(
            JSON.stringify({
                event: 'CRITICAL_LEAD_DELIVERY_DUAL_FAILURE',
                severity: 'CRITICAL',
                alertId,
                submissionId,
                leadEventId: activeLeadEventId,
                formSource: input.formSource,
                transpondAttempts: transpondState.attempts,
                transpondLastStatus: transpondState.lastHttpStatus,
                resendAttempts: resendState.attempts,
                resendLastStatus: resendState.lastHttpStatus,
                durableFirestorePath: `pdm_lead_submissions/${submissionId}`,
            })
        );

        internalAlert = {
            triggered: true,
            alertId,
            mechanism: webhookDispatched
                ? 'firestore_and_webhook'
                : 'firestore_si_alerts_and_dead_letter',
            triggeredAt: alertCreatedAt,
        };
    }

    // STEP 6: Persist final per-channel delivery states to Firestore
    try {
        await adapter.updateLeadDeliveryState(submissionId, {
            transpondDelivery: transpondState,
            resendDelivery: resendState,
            internalAlert,
            overallDeliveryState,
            updatedAt: new Date().toISOString(),
        });
    } catch (updateErr: unknown) {
        console.warn(
            JSON.stringify({
                event: 'LEAD_DELIVERY_STATUS_UPDATE_WARNING',
                submissionId,
                reason: redactPiiFromText(
                    updateErr instanceof Error ? updateErr.message : String(updateErr)
                ),
            })
        );
    }

    console.log(
        JSON.stringify({
            event: 'LEAD_WORKFLOW_COMPLETED',
            submissionId,
            leadEventId: activeLeadEventId,
            formSource: input.formSource,
            overallDeliveryState,
            transpondStatus: transpondState.status,
            transpondAttempts: transpondState.attempts,
            resendStatus: resendState.status,
            resendAttempts: resendState.attempts,
            internalAlertTriggered: internalAlert.triggered,
        })
    );

    return {
        ok: true,
        httpStatus: 200,
        submissionId,
        leadEventId: activeLeadEventId,
        idempotentReplay: false,
        persistenceFailed: false,
        overallDeliveryState,
        transpondDelivery: transpondState,
        resendDelivery: resendState,
        internalAlert,
    };
}
