import crypto from 'crypto';

function hashData(data: string | undefined): string | null {
    if (!data) return null;
    const clean = data.trim().toLowerCase();
    return crypto.createHash('sha256').update(clean).digest('hex');
}

function hashPhone(phone: string | undefined): string | null {
    if (!phone) return null;
    // Remove all non-digit characters
    const clean = phone.replace(/\D/g, '');
    let formatted = clean;
    // Fallback: If 10 digits (US number), prefix with country code '1'
    if (clean.length === 10) {
        formatted = '1' + clean;
    }
    return crypto.createHash('sha256').update(formatted).digest('hex');
}

export interface MetaLeadData {
    email: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    sourceUrl?: string;
    clientIp?: string;
    clientUserAgent?: string;
    fbc?: string;
    fbp?: string;
    formSource?: string;
}

export async function sendMetaCAPILeadEvent(data: MetaLeadData) {
    const pixelId = process.env.META_PIXEL_ID || '781583678297161';
    const accessToken = process.env.META_ACCESS_TOKEN;

    if (!accessToken) {
        console.warn('[Meta CAPI] Missing META_ACCESS_TOKEN env variable. Skipping Conversions API event.');
        return;
    }

    try {
        const hashedEmail = hashData(data.email);
        const hashedPhone = hashPhone(data.phone);
        const hashedFirstName = hashData(data.firstName);
        const hashedLastName = hashData(data.lastName);

        const userData: Record<string, any> = {
            em: hashedEmail ? [hashedEmail] : []
        };

        if (hashedPhone) userData.ph = [hashedPhone];
        if (hashedFirstName) userData.fn = [hashedFirstName];
        if (hashedLastName) userData.ln = [hashedLastName];
        if (data.clientIp) userData.client_ip_address = data.clientIp;
        if (data.clientUserAgent) userData.client_user_agent = data.clientUserAgent;
        if (data.fbc) userData.fbc = data.fbc;
        if (data.fbp) userData.fbp = data.fbp;

        const payload = {
            data: [
                {
                    event_name: 'Lead',
                    event_time: Math.floor(Date.now() / 1000),
                    event_source_url: data.sourceUrl || 'https://powerdigitalmedia.org/lead-leak-check',
                    action_source: 'website',
                    user_data: userData,
                    custom_data: {
                        currency: 'USD',
                        value: 0.00,
                        content_name: data.formSource || 'lead-leak-check'
                    }
                }
            ]
        };

        console.log('[Meta CAPI] Sending server event to Meta payload:', JSON.stringify({
            event_name: 'Lead',
            event_source_url: payload.data[0].event_source_url,
            user_data_keys: Object.keys(userData)
        }));

        const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const resJson = await response.json();
        console.log(`[Meta CAPI] Meta Conversions API Response Status: ${response.status}`, resJson);
        return resJson;
    } catch (err) {
        console.error('[Meta CAPI] Error sending Conversions API event:', err);
    }
}
