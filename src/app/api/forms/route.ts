import { NextResponse } from 'next/server';
import { UltatelClient } from "@/lib/ultatel";

export async function POST(req: Request) {
    try {
        // Parse incoming data (handle both JSON and FormData formats)
        const contentType = req.headers.get('content-type') || '';
        let body: any = {};
        
        if (contentType.includes('application/json')) {
            body = await req.json();
        } else {
            const formData = await req.formData();
            formData.forEach((value, key) => {
                // If it's a multi-select checkbox field, collect it as an array/comma-separated list
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

        const email = body.email || body.email_address || body.prospect_email;
        const name = body.name || body.prospect_name || 'Prospect';
        const formSource = body._form_source || 'general-contact';

        if (!email) {
            return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
        }

        // Split name into first and last
        const nameParts = name.trim().split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Formulate a beautiful markdown block with all the discovery question answers
        let summaryText = `### Form Submission Blueprint: ${formSource.toUpperCase().replace(/-/g, ' ')}\n\n`;
        summaryText += `* **Submitter Name:** ${name}\n`;
        summaryText += `* **Email:** ${email}\n`;
        if (body.phone) {
            summaryText += `* **Phone:** ${body.phone}\n`;
        }
        summaryText += `\n---\n\n### Questionnaire Responses:\n\n`;

        // Loop through all custom keys to build the note
        const excludeKeys = ['email', 'email_address', 'prospect_email', 'name', 'prospect_name', '_form_source', 'phone'];
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

        // Prepare the payload for Transpond API
        const customTags = Array.isArray(body.tags) ? body.tags : (body.tags ? [body.tags] : []);
        let groupId = parseInt(process.env.TRANSPOND_GROUP_ID || '186443', 10);
        if (formSource === 'community-event') {
            groupId = 187780; // Jackson Community Leads
        } else if (formSource === 'founders-100-reservation') {
            groupId = parseInt(process.env.TRANSPOND_FOUNDERS100_GROUP_ID || '187913', 10);
        } else if (formSource === 'unified-solutions-lead') {
            groupId = parseInt(process.env.TRANSPOND_SOLUTIONS_GROUP_ID || '187918', 10);
        }

        const transpondPayload = {
            emailAddress: email,
            firstName: firstName,
            lastName: lastName,
            groupId: groupId,
            notes: summaryText,
            tags: [formSource, 'website-lead', ...customTags],
            customFields: {
                '_capsule_firstName': firstName,
                '_capsule_lastName': lastName,
                '_capsule_name': name,
                '_capsule_person': true,
                '_capsule_phone': body.phone || body.prospect_phone || '',
                'BUSINESSNAME': body.business_name || body.company || body.organisation || body.prospect_company || '',
                'ROADBLOCK': body.roadblock || body.biggest_challenge || body.message || body.notes || '',
                'SERVICESINTERESTED': Array.isArray(body.services) ? body.services.join(', ') : (body.services || body.services_interested || '')
            }
        };

        console.log('Sending payload to Transpond:', JSON.stringify(transpondPayload, null, 2));

        // Submit to Transpond API
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
        console.log(`Transpond API Response Status: ${response.status}`, responseText);

        if (!response.ok) {
            // Check if user is already in group (400 bad request error or similar sometimes returned by Transpond)
            if (responseText.includes('already exists') || responseText.includes('already in group') || response.status === 409) {
                console.log('Subscriber already exists in group, continuing silently...');
            } else {
                return NextResponse.json(
                    { error: `Transpond integration error: ${responseText}` }, 
                    { status: response.status }
                );
            }
        }

        // Trigger automated SMS if the user opted in and provided a phone number
        const userPhone = body.phone || body.prospect_phone;
        const optedIn = body.sms_opt_in === 'on' || body.sms_opt_in === true || body.sms_opt_in === 'true' || body.sms_opt_in === '1';

        if (userPhone && optedIn) {
            try {
                const ultClient = new UltatelClient();
                const smsMessage = `Hi ${firstName || 'there'}, thanks for connecting with Power Digital Media! We've received your request and will reach out shortly. Reply STOP to opt out.`;
                console.log(`[Forms API] Triggering automated SMS for ${userPhone}...`);
                const smsResult = await ultClient.sendSMS({
                    to: userPhone,
                    text: smsMessage
                });
                console.log(`[Forms API] SMS trigger result:`, smsResult);
            } catch (smsErr) {
                console.error('[Forms API] Automated SMS failed:', smsErr);
            }
        }

        // Trigger the internal thank-you email as a backup/co-responder
        let templateType = 'contact';
        if (formSource === 'web-design-discovery') {
            templateType = 'web-design-discovery';
        } else if (formSource === 'podcasting-discovery') {
            templateType = 'client-discovery'; // Matches the 'client-discovery' template in thank-you route
        }

        try {
            const baseUrl = req.url.startsWith('http') ? new URL(req.url).origin : '';
            await fetch(`${baseUrl}/api/contact/thank-you`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    name: name,
                    template: templateType
                })
            });
            console.log('Backup thank-you autoresponder triggered successfully.');
        } catch (emailErr) {
            console.error('Backup autoresponder failed (continuing anyway):', emailErr);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Unified API Form Bridge error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
