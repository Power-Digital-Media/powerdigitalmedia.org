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

        // Transpond requires a groupId to update a contact's tags.
        // We update the contact in all four key groups to ensure the tag applies account-wide
        // regardless of which form/group the lead originally registered through.
        const groupIds = [187913, 187918, 186443, 187780];
        
        const updatePromises = groupIds.map(async (groupId) => {
            try {
                const response = await fetch('https://api.transpond.io/subscriber', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${process.env.TRANSPOND_API_KEY}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        emailAddress: email,
                        groupId: groupId,
                        tags: ['Call Scheduled']
                    })
                });

                if (!response.ok) {
                    const errText = await response.text();
                    console.error(`Transpond API error for group ${groupId}:`, errText);
                    return { groupId, success: false, error: errText };
                }

                console.log(`Successfully sent tag update for group ${groupId}`);
                return { groupId, success: true };
            } catch (err: any) {
                console.error(`Failed to connect to Transpond for group ${groupId}:`, err);
                return { groupId, success: false, error: err.message };
            }
        });

        const results = await Promise.all(updatePromises);
        console.log('Transpond Tagging Results:', results);

        return NextResponse.json({ success: true, results });
    } catch (error: any) {
        console.error('Calendly Webhook Handler error:', error);
        // Return 200 to keep the webhook active in Calendly even if internal code crashes
        return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 200 });
    }
}
