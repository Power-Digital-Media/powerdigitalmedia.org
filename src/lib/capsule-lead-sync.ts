import { redactPiiFromText } from '@/lib/durable-lead-delivery';

const CAPSULE_TIMEOUT_MS = 4500;
const MILESTONE_CACHE_TTL_MS = 10 * 60 * 1000;

export const HIGH_INTENT_CAPSULE_OPPORTUNITY_SOURCES = new Set([
    'website-audit-request',
    'lead-leak-check',
    'g-business-booking',
    'founders-100-reservation',
    'unified-solutions-lead',
    'web-design-discovery',
    'marketing-discovery',
    'contact-page',
    'homepage-contact',
    'general-contact',
]);

let cachedInitialMilestone: { id: number; expiresAtMs: number } | null = null;

function getCapsuleConfig() {
    const token = (process.env.CAPSULE_API_TOKEN || '').trim();
    const baseUrl = (
        process.env.CAPSULE_BASE_URL || 'https://api.capsulecrm.com'
    ).replace(/\/+$/, '');
    return { token, baseUrl };
}

async function capsuleFetch(
    url: string,
    token: string,
    init?: RequestInit,
    fetchImpl: typeof fetch = fetch
): Promise<Response> {
    return fetchImpl(url, {
        ...init,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
            ...(init?.headers || {}),
        },
        signal: AbortSignal.timeout(CAPSULE_TIMEOUT_MS),
    });
}

async function resolveInitialOpenMilestoneId(
    baseUrl: string,
    token: string,
    fetchImpl: typeof fetch = fetch
): Promise<number | null> {
    if (
        cachedInitialMilestone &&
        Date.now() < cachedInitialMilestone.expiresAtMs
    ) {
        return cachedInitialMilestone.id;
    }

    let primaryPipelineId: number | null = null;
    try {
        const pipeRes = await capsuleFetch(
            `${baseUrl}/api/v2/pipelines`,
            token,
            { method: 'GET' },
            fetchImpl
        );
        if (pipeRes.ok) {
            const pipeData = await pipeRes.json();
            if (Array.isArray(pipeData?.pipelines) && pipeData.pipelines.length > 0) {
                primaryPipelineId = Number(pipeData.pipelines[0].id) || null;
            }
        }
    } catch {
        // Fallback to /api/v2/milestones below
    }

    const milestoneEndpoints = primaryPipelineId
        ? [
              `${baseUrl}/api/v2/pipelines/${primaryPipelineId}/milestones`,
              `${baseUrl}/api/v2/milestones`,
          ]
        : [`${baseUrl}/api/v2/milestones`];

    for (const endpoint of milestoneEndpoints) {
        try {
            const msRes = await capsuleFetch(
                endpoint,
                token,
                { method: 'GET' },
                fetchImpl
            );
            if (!msRes.ok) continue;
            const msData = await msRes.json();
            const milestones: any[] = Array.isArray(msData?.milestones)
                ? msData.milestones
                : [];
            const openMilestones = milestones
                .filter((m) => m && m.complete === false && typeof m.id === 'number')
                .sort(
                    (a, b) =>
                        Number(a.probability ?? 100) - Number(b.probability ?? 100) ||
                        Number(a.id) - Number(b.id)
                );

            if (openMilestones.length > 0) {
                const chosenId = Number(openMilestones[0].id);
                cachedInitialMilestone = {
                    id: chosenId,
                    expiresAtMs: Date.now() + MILESTONE_CACHE_TTL_MS,
                };
                return chosenId;
            }
        } catch {
            // Try next fallback endpoint
        }
    }

    return null;
}

export interface CapsuleLeadSyncInput {
    submissionId?: string;
    formSource: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    company?: string;
    website?: string;
    summaryText: string;
    roadblockSummary?: string;
    servicesInterested?: string;
    pagePath?: string;
    extraTags?: string[];
    fetchImpl?: typeof fetch;
}

export interface CapsuleLeadSyncResult {
    synced: boolean;
    partyId: number | null;
    noteEntryCreated: boolean;
    opportunityId: number | null;
    skippedReason?: string;
}

/**
 * Non-blocking direct Capsule CRM lead sync for verified website inquiries:
 * 1. Skips newsletter signups or missing `CAPSULE_API_TOKEN`.
 * 2. Searches & upserts the Person (and Organisation when `company` is provided), merging existing tags.
 * 3. Attaches a Note Entry (`POST /api/v2/entries`) with the full questionnaire/message summary.
 * 4. Creates a Sales Opportunity on the dynamically discovered initial open milestone for high-intent forms.
 */
export async function syncVerifiedLeadToCapsule(
    input: CapsuleLeadSyncInput
): Promise<CapsuleLeadSyncResult> {
    if (input.formSource === 'blog-newsletter') {
        return {
            synced: false,
            partyId: null,
            noteEntryCreated: false,
            opportunityId: null,
            skippedReason: 'newsletter_excluded',
        };
    }

    const { token, baseUrl } = getCapsuleConfig();
    if (!token) {
        return {
            synced: false,
            partyId: null,
            noteEntryCreated: false,
            opportunityId: null,
            skippedReason: 'missing_capsule_api_token',
        };
    }

    const fetcher = input.fetchImpl ?? fetch;
    const email = (input.email || '').trim().toLowerCase();
    if (!email) {
        return {
            synced: false,
            partyId: null,
            noteEntryCreated: false,
            opportunityId: null,
            skippedReason: 'missing_email',
        };
    }

    try {
        const cleanCompany = (input.company || '').trim();
        const cleanPhone = (input.phone || '').trim();
        const cleanWebsite = (input.website || '').trim();
        const firstName = (input.firstName || '').trim() || 'Website';
        const lastName = (input.lastName || '').trim() || 'Lead';

        const desiredTags = [
            'website-lead',
            input.formSource,
            ...(input.extraTags || []),
        ].filter(Boolean);

        // 1. Search for existing Person by email (with tags embedded)
        let partyId: number | null = null;
        let existingTags: string[] = [];
        let existingHasOrg = false;

        const searchRes = await capsuleFetch(
            `${baseUrl}/api/v2/parties/search?q=${encodeURIComponent(email)}&embed=tags`,
            token,
            { method: 'GET' },
            fetcher
        );

        if (searchRes.ok) {
            const searchData = await searchRes.json();
            const parties: any[] = Array.isArray(searchData?.parties)
                ? searchData.parties
                : [];
            const personMatch =
                parties.find((p) => p?.type === 'person') || parties[0];
            if (personMatch && typeof personMatch.id === 'number') {
                partyId = personMatch.id;
                existingHasOrg = Boolean(personMatch.organisation);
                if (Array.isArray(personMatch.tags)) {
                    existingTags = personMatch.tags
                        .map((t: any) => t?.name)
                        .filter(Boolean);
                }
            }
        }

        // If party exists but search didn't return embedded tags, fetch party tags directly so none are wiped
        if (partyId && existingTags.length === 0) {
            try {
                const detailRes = await capsuleFetch(
                    `${baseUrl}/api/v2/parties/${partyId}?embed=tags`,
                    token,
                    { method: 'GET' },
                    fetcher
                );
                if (detailRes.ok) {
                    const detailData = await detailRes.json();
                    if (Array.isArray(detailData?.party?.tags)) {
                        existingTags = detailData.party.tags
                            .map((t: any) => t?.name)
                            .filter(Boolean);
                    }
                    existingHasOrg = Boolean(detailData?.party?.organisation);
                }
            } catch {
                // Proceed safely
            }
        }

        const mergedTags = Array.from(new Set([...existingTags, ...desiredTags]));

        if (partyId) {
            // Update existing Person party (merge tags + attach organisation if newly provided)
            const updatePartyBody: Record<string, any> = {
                id: partyId,
                tags: mergedTags.map((name) => ({ name })),
            };
            if (cleanCompany && !existingHasOrg) {
                updatePartyBody.organisation = { name: cleanCompany };
            }

            await capsuleFetch(
                `${baseUrl}/api/v2/parties/${partyId}`,
                token,
                {
                    method: 'PUT',
                    body: JSON.stringify({ party: updatePartyBody }),
                },
                fetcher
            );
        } else {
            // Create new Person (Capsule automatically creates/links the Organisation when `organisation: { name }` is supplied)
            const createPartyBody: Record<string, any> = {
                type: 'person',
                firstName,
                lastName,
                emailAddresses: [{ address: email }],
                tags: mergedTags.map((name) => ({ name })),
            };
            if (cleanCompany) {
                createPartyBody.organisation = { name: cleanCompany };
            }
            if (cleanPhone) {
                createPartyBody.phoneNumbers = [{ number: cleanPhone }];
            }
            if (cleanWebsite) {
                const normalizedUrl = /^https?:\/\//i.test(cleanWebsite)
                    ? cleanWebsite
                    : `https://${cleanWebsite}`;
                createPartyBody.websites = [{ address: normalizedUrl }];
            }

            const createRes = await capsuleFetch(
                `${baseUrl}/api/v2/parties`,
                token,
                {
                    method: 'POST',
                    body: JSON.stringify({ party: createPartyBody }),
                },
                fetcher
            );

            if (createRes.ok) {
                const createData = await createRes.json();
                partyId = Number(createData?.party?.id) || null;
            } else {
                const errText = await createRes.text().catch(() => '');
                console.warn(
                    JSON.stringify({
                        event: 'CAPSULE_PARTY_CREATE_WARNING',
                        submissionId: input.submissionId || null,
                        formSource: input.formSource,
                        status: createRes.status,
                        reason: redactPiiFromText(errText),
                    })
                );
            }
        }

        if (!partyId) {
            return {
                synced: false,
                partyId: null,
                noteEntryCreated: false,
                opportunityId: null,
                skippedReason: 'party_upsert_failed',
            };
        }

        // 2. Attach Note Entry containing full formatted questionnaire/message
        let noteEntryCreated = false;
        try {
            const noteRes = await capsuleFetch(
                `${baseUrl}/api/v2/entries`,
                token,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        entry: {
                            type: 'note',
                            content: input.summaryText,
                            party: { id: partyId },
                        },
                    }),
                },
                fetcher
            );
            noteEntryCreated = noteRes.ok;
        } catch (noteErr: unknown) {
            console.warn(
                JSON.stringify({
                    event: 'CAPSULE_NOTE_ENTRY_WARNING',
                    submissionId: input.submissionId || null,
                    formSource: input.formSource,
                    reason: redactPiiFromText(
                        noteErr instanceof Error ? noteErr.message : String(noteErr)
                    ),
                })
            );
        }

        // 3. Create Capsule Opportunity on high-intent forms using dynamic milestone discovery
        let opportunityId: number | null = null;
        if (HIGH_INTENT_CAPSULE_OPPORTUNITY_SOURCES.has(input.formSource)) {
            const milestoneId = await resolveInitialOpenMilestoneId(
                baseUrl,
                token,
                fetcher
            );
            if (milestoneId) {
                const formattedSource = input.formSource
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase());
                const leadLabel =
                    cleanCompany || `${firstName} ${lastName}`.trim();
                const oppDescriptionParts = [
                    input.servicesInterested
                        ? `Services: ${input.servicesInterested}`
                        : '',
                    cleanWebsite ? `Website: ${cleanWebsite}` : '',
                    input.roadblockSummary
                        ? `Notes: ${input.roadblockSummary.slice(0, 500)}`
                        : '',
                ].filter(Boolean);

                try {
                    const oppRes = await capsuleFetch(
                        `${baseUrl}/api/v2/opportunities`,
                        token,
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                opportunity: {
                                    name: `${leadLabel} — ${formattedSource}`,
                                    description:
                                        oppDescriptionParts.join(' | ') ||
                                        `Inbound ${formattedSource} inquiry from ${input.pagePath || '/'}`,
                                    party: { id: partyId },
                                    milestone: { id: milestoneId },
                                },
                            }),
                        },
                        fetcher
                    );
                    if (oppRes.ok) {
                        const oppData = await oppRes.json();
                        opportunityId = Number(oppData?.opportunity?.id) || null;
                    }
                } catch (oppErr: unknown) {
                    console.warn(
                        JSON.stringify({
                            event: 'CAPSULE_OPPORTUNITY_CREATE_WARNING',
                            submissionId: input.submissionId || null,
                            formSource: input.formSource,
                            reason: redactPiiFromText(
                                oppErr instanceof Error
                                    ? oppErr.message
                                    : String(oppErr)
                            ),
                        })
                    );
                }
            }
        }

        console.log(
            JSON.stringify({
                event: 'CAPSULE_LEAD_SYNC_COMPLETED',
                submissionId: input.submissionId || null,
                formSource: input.formSource,
                partyId,
                noteEntryCreated,
                opportunityId,
            })
        );

        return {
            synced: true,
            partyId,
            noteEntryCreated,
            opportunityId,
        };
    } catch (err: unknown) {
        console.warn(
            JSON.stringify({
                event: 'CAPSULE_LEAD_SYNC_NON_FATAL_ERROR',
                submissionId: input.submissionId || null,
                formSource: input.formSource,
                reason: redactPiiFromText(
                    err instanceof Error ? err.message : String(err)
                ),
            })
        );
        return {
            synced: false,
            partyId: null,
            noteEntryCreated: false,
            opportunityId: null,
            skippedReason: 'exception',
        };
    }
}

/**
 * Logs a `"Strategy Call Scheduled"` tag and Note Entry on the matching Capsule contact
 * when a Calendly `invitee.created` webhook arrives.
 */
export async function logCalendlyBookingToCapsule(params: {
    email: string;
    name?: string;
    eventName?: string;
    startTime?: string;
    fetchImpl?: typeof fetch;
}): Promise<{ synced: boolean; partyId: number | null }> {
    const { token, baseUrl } = getCapsuleConfig();
    if (!token || !params.email) {
        return { synced: false, partyId: null };
    }

    const fetcher = params.fetchImpl ?? fetch;
    const email = params.email.trim().toLowerCase();
    const nameParts = (params.name || '').trim().split(/\s+/);
    const firstName = nameParts[0] || 'Calendly';
    const lastName = nameParts.slice(1).join(' ') || 'Invitee';

    try {
        let partyId: number | null = null;
        let existingTags: string[] = [];

        const searchRes = await capsuleFetch(
            `${baseUrl}/api/v2/parties/search?q=${encodeURIComponent(email)}&embed=tags`,
            token,
            { method: 'GET' },
            fetcher
        );

        if (searchRes.ok) {
            const searchData = await searchRes.json();
            const parties: any[] = Array.isArray(searchData?.parties)
                ? searchData.parties
                : [];
            const personMatch =
                parties.find((p) => p?.type === 'person') || parties[0];
            if (personMatch && typeof personMatch.id === 'number') {
                partyId = personMatch.id;
                if (Array.isArray(personMatch.tags)) {
                    existingTags = personMatch.tags
                        .map((t: any) => t?.name)
                        .filter(Boolean);
                }
            }
        }

        const mergedTags = Array.from(
            new Set([
                ...existingTags,
                'Strategy Call Scheduled',
                'Call Scheduled',
            ])
        );

        if (partyId) {
            await capsuleFetch(
                `${baseUrl}/api/v2/parties/${partyId}`,
                token,
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        party: {
                            id: partyId,
                            tags: mergedTags.map((name) => ({ name })),
                        },
                    }),
                },
                fetcher
            );
        } else {
            const createRes = await capsuleFetch(
                `${baseUrl}/api/v2/parties`,
                token,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        party: {
                            type: 'person',
                            firstName,
                            lastName,
                            emailAddresses: [{ address: email }],
                            tags: mergedTags.map((name) => ({ name })),
                        },
                    }),
                },
                fetcher
            );
            if (createRes.ok) {
                const createData = await createRes.json();
                partyId = Number(createData?.party?.id) || null;
            }
        }

        if (partyId) {
            const noteLines = [
                '📅 Strategy Call Scheduled via Calendly',
                params.eventName ? `Event: ${params.eventName}` : '',
                params.startTime ? `Scheduled Start: ${params.startTime}` : '',
            ]
                .filter(Boolean)
                .join('\n');

            await capsuleFetch(
                `${baseUrl}/api/v2/entries`,
                token,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        entry: {
                            type: 'note',
                            content: noteLines,
                            party: { id: partyId },
                        },
                    }),
                },
                fetcher
            );
        }

        return { synced: Boolean(partyId), partyId };
    } catch (err: unknown) {
        console.warn(
            '[Calendly Capsule Sync] Non-fatal error:',
            redactPiiFromText(err instanceof Error ? err.message : String(err))
        );
        return { synced: false, partyId: null };
    }
}
