import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { logCalendlyBookingToCapsule } from '@/lib/capsule-lead-sync';

function verifyCalendlySignature(
    rawBody: string,
    signatureHeader: string | null,
    signingKey: string
): boolean {
    if (!signatureHeader) return false;
    const parts = signatureHeader.split(',').reduce<Record<string, string>>((acc, part) => {
        const [k, v] = part.trim().split('=');
        if (k && v) acc[k] = v;
        return acc;
    }, {});

    const timestamp = parts.t;
    const receivedSig = parts.v1;
    if (!timestamp || !receivedSig) return false;

    const expectedSig = crypto
        .createHmac('sha256', signingKey)
        .update(`${timestamp}.${rawBody}`)
        .digest('hex');

    const a = Buffer.from(receivedSig, 'hex');
    const b = Buffer.from(expectedSig, 'hex');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
}

export async function POST(req: Request) {
    try {
        const rawBody = await req.text();
        const signingKey = (process.env.CALENDLY_WEBHOOK_SIGNING_KEY || '').trim();

        if (signingKey) {
            const sigHeader = req.headers.get('Calendly-Webhook-Signature');
            if (!verifyCalendlySignature(rawBody, sigHeader, signingKey)) {
                console.warn('[Calendly Webhook] Invalid HMAC signature rejected.');
                return NextResponse.json(
                    { error: 'Invalid webhook signature' },
                    { status: 401 }
                );
            }
        }

        const body = JSON.parse(rawBody);

        // Verify it's a new booking event
        if (body.event !== 'invitee.created') {
            return NextResponse.json(
                { message: `Ignored event: ${body.event}` },
                { status: 200 }
            );
        }

        const email = body.payload?.email;
        if (!email) {
            console.warn(
                'Calendly webhook received but no invitee email found in payload.'
            );
            return NextResponse.json(
                { error: 'No email found in payload' },
                { status: 400 }
            );
        }

        const inviteeName = body.payload?.name || '';
        const eventName =
            body.payload?.scheduled_event?.name || 'Strategy Call';
        const startTime =
            body.payload?.scheduled_event?.start_time || '';

        // Transpond requires a groupId to update a contact's tags.
        // Includes all 5 active funnel groups (including 187977 lead-leak-check).
        const groupIds = [187913, 187918, 186443, 187780, 187977];

        const updatePromises = groupIds.map(async (groupId) => {
            try {
                const response = await fetch(
                    'https://api.transpond.io/subscriber',
                    {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${process.env.TRANSPOND_API_KEY}`,
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify({
                            emailAddress: email,
                            groupId: groupId,
                            tags: ['Call Scheduled', 'Strategy Call Scheduled'],
                        }),
                    }
                );

                if (!response.ok) {
                    const errText = await response.text();
                    console.error(
                        `Transpond API error for group ${groupId}:`,
                        errText
                    );
                    return { groupId, success: false, error: errText };
                }

                return { groupId, success: true };
            } catch (err: any) {
                console.error(
                    `Failed to connect to Transpond for group ${groupId}:`,
                    err
                );
                return { groupId, success: false, error: err.message };
            }
        });

        const [results, capsuleSync] = await Promise.all([
            Promise.all(updatePromises),
            logCalendlyBookingToCapsule({
                email,
                name: inviteeName,
                eventName,
                startTime,
            }),
        ]);

        return NextResponse.json({ success: true, results, capsuleSync });
    } catch (error: any) {
        console.error('Calendly Webhook Handler error:', error);
        // Return 200 to keep the webhook active in Calendly even if internal code crashes
        return NextResponse.json(
            { success: false, error: error.message || 'Internal server error' },
            { status: 200 }
        );
    }
}
