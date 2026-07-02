import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('Received Calendly Webhook Event:', JSON.stringify(body, null, 2));

        // Verify it's a new booking event
        if (body.event !== 'invitee.created') {
            return NextResponse.json({ message: `Ignored event: ${body.event}` }, { status: 200 });
        }

        const email = body.payload?.email;
        if (!email) {
            console.warn('Calendly webhook received but no invitee email found in payload.');
            return NextResponse.json({ error: 'No email found in payload' }, { status: 400 });
        }

        console.log(`Processing Calendly booking for: ${email}`);

        // Prepare the payload for Transpond API to add the "Call Scheduled" tag
        const transpondPayload = {
            emailAddress: email,
            tags: ['Call Scheduled']
        };

        // Submit to Transpond API to update the subscriber tags
        const response = await fetch('https://api.transpond.io/subscriber', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.TRANSPOND_API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(transpondPayload)
        });

        const responseText = await response.text();
        console.log(`Transpond API Webhook Tagging Response Status: ${response.status}`, responseText);

        if (!response.ok) {
            console.error(`Transpond API error during tagging: ${responseText}`);
            // Return 200 anyway to prevent Calendly from disabling the webhook due to retries
            return NextResponse.json({ success: false, error: responseText }, { status: 200 });
        }

        console.log(`Successfully tagged contact ${email} with "Call Scheduled" in Transpond.`);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Calendly Webhook Handler error:', error);
        // Return 200 to keep the webhook active, logging the error internally
        return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 200 });
    }
}
