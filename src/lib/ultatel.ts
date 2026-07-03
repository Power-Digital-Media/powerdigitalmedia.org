import fetch from "node-fetch";

export interface UltatelCallEvent {
    eventId: string;
    eventType: "call.start" | "call.end" | "call.recording" | "ai.analysis_complete";
    timestamp: string;
    pbxId: string;
    data: {
        callId: string;
        callerId: string; // The phone number calling (e.g. +16015550192)
        destination: string; // The extension or number dialed
        direction: "inbound" | "outbound";
        duration?: number; // Present on call.end (seconds)
        recordingFilename?: string; // Present on call.recording
    };
}

export class UltatelClient {
    private apiKey: string;
    private baseUrl: string = "https://platform.ultatel.com";

    constructor() {
        this.apiKey = process.env.ULTATEL_API_KEY || "";
    }

    private getHeaders(extraHeaders: Record<string, string> = {}) {
        return {
            "Authorization": `Bearer ${this.apiKey}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
            ...extraHeaders
        };
    }

    /**
     * Verify connectivity and authentication with Ultatel
     */
    async testConnection(): Promise<{ success: boolean; pbxId?: string; message: string }> {
        if (!this.apiKey) {
            return { success: false, message: "ULTATEL_API_KEY is not set in environment variables." };
        }

        try {
            const response = await fetch(`${this.baseUrl}/v1/echo`, {
                method: "GET",
                headers: this.getHeaders()
            });

            if (!response.ok) {
                const errData: any = await response.json().catch(() => ({}));
                return { 
                    success: false, 
                    message: `HTTP Error ${response.status}: ${errData?.error?.message || response.statusText}` 
                };
            }

            const data: any = await response.json();
            return { 
                success: true, 
                pbxId: data.data?.pbxId,
                message: data.message || "Connected successfully." 
            };
        } catch (error: any) {
            return { success: false, message: `Network error: ${error.message}` };
        }
    }

    /**
     * Subscribe to call and AI webhook events
     */
    async registerWebhook(targetUrl: string, events: string[] = ["call.start", "call.end", "ai.analysis_complete"]): Promise<string> {
        try {
            const response = await fetch(`${this.baseUrl}/v1/webhooks`, {
                method: "POST",
                headers: this.getHeaders(),
                body: JSON.stringify({
                    url: targetUrl,
                    events: events
                })
            });

            if (!response.ok) {
                const err: any = await response.json().catch(() => ({}));
                throw new Error(err?.error?.message || `Status ${response.status}`);
            }

            const data: any = await response.json();
            return data.data?.id || "Registered";
        } catch (error: any) {
            throw new Error(`Failed to register webhook: ${error.message}`);
        }
    }

    /**
     * Fetch call AI Summary and Transcript
     */
    async getCallAISummary(callId: string): Promise<{ summary: string; transcript: string; sentiment: string }> {
        try {
            // 1. Get Summary
            const summaryRes = await fetch(`${this.baseUrl}/v1/ai-calls/${callId}/summary`, {
                method: "GET",
                headers: this.getHeaders()
            });
            const summaryData: any = summaryRes.ok ? await summaryRes.json() : null;
            const summaryText = summaryData?.data?.summary || "No call summary generated.";

            // 2. Get Transcript
            const transcriptRes = await fetch(`${this.baseUrl}/v1/ai-calls/${callId}/transcript`, {
                method: "GET",
                headers: this.getHeaders()
            });
            const transcriptData: any = transcriptRes.ok ? await transcriptRes.json() : null;
            const transcriptText = transcriptData?.data?.transcript || "No transcript available.";

            // 3. Get Sentiment
            const sentimentRes = await fetch(`${this.baseUrl}/v1/ai-calls/${callId}/sentiment`, {
                method: "GET",
                headers: this.getHeaders()
            });
            const sentimentData: any = sentimentRes.ok ? await sentimentRes.json() : null;
            const sentimentText = sentimentData?.data?.sentiment || "NEUTRAL";

            return {
                summary: summaryText,
                transcript: transcriptText,
                sentiment: sentimentText
            };
        } catch (error) {
            console.error(`Error fetching AI analysis for call ${callId}:`, error);
            return {
                summary: "AI summary lookup failed.",
                transcript: "Transcript lookup failed.",
                sentiment: "UNKNOWN"
            };
        }
    }

    /**
     * Search Transpond subscribers to match the caller ID phone number
     */
    async findSubscriberByPhone(phone: string): Promise<{ emailAddress: string; firstName: string; lastName: string; id: number } | null> {
        const transpondKey = process.env.TRANSPOND_API_KEY;
        if (!transpondKey) return null;

        try {
            const response = await fetch("https://api.transpond.io/subscriber", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${transpondKey}`,
                    "Accept": "application/json"
                }
            });

            if (!response.ok) return null;

            const data: any = await response.json();
            const subscribers = data.Subscribers || [];

            // Clean phone string for robust matching (digits only)
            const cleanTarget = phone.replace(/\D/g, "");

            for (const sub of subscribers) {
                // Find phone field inside custom fields
                const customFields = sub.customFields || sub.CustomFields || [];
                const phoneField = customFields.find((cf: any) => cf.fieldName === "_capsule_phone" || cf.fieldName === "PHONE");
                const phoneVal = phoneField?.value || "";
                const cleanVal = phoneVal.replace(/\D/g, "");

                if (cleanVal && cleanTarget && (cleanVal.includes(cleanTarget) || cleanTarget.includes(cleanVal))) {
                    return {
                        emailAddress: sub.emailAddress,
                        firstName: sub.firstName || "",
                        lastName: sub.lastName || "",
                        id: sub.id
                    };
                }
            }

            return null;
        } catch (error) {
            console.error("Error searching Transpond subscribers:", error);
            return null;
        }
    }

    /**
     * Log call logs to Transpond (which automatically appends to Capsule CRM feed)
     */
    async logCallToCRM(params: {
        phone: string;
        direction: string;
        duration: number;
        summary: string;
        transcript: string;
        sentiment: string;
    }) {
        const transpondKey = process.env.TRANSPOND_API_KEY;
        if (!transpondKey) return;

        // Search for existing subscriber
        const match = await this.findSubscriberByPhone(params.phone);
        const email = match?.emailAddress || `phone-lead-${params.phone.replace(/\D/g, "")}@powerdigitalmedia.org`;
        const firstName = match?.firstName || "VoIP Phone";
        const lastName = match?.lastName || "Lead";

        const minutes = Math.floor(params.duration / 60);
        const seconds = params.duration % 60;

        // Format a beautiful markdown note
        let noteText = `### VoIP Call Log: ${params.direction.toUpperCase()}\n\n`;
        noteText += `* **Phone Number:** ${params.phone}\n`;
        noteText += `* **Direction:** ${params.direction}\n`;
        noteText += `* **Duration:** ${minutes}m ${seconds}s\n`;
        noteText += `* **Sentiment:** ${params.sentiment}\n\n`;
        noteText += `---\n\n### AI Call Summary:\n${params.summary}\n\n`;
        noteText += `---\n\n### Call Transcript Snippet:\n*${params.transcript.substring(0, 500)}...*\n`;

        const payload = {
            emailAddress: email,
            firstName: firstName,
            lastName: lastName,
            groupId: 187780, // General Jackson Leads Sync group
            notes: noteText,
            tags: ["voip-call", `call-${params.direction}`],
            customFields: {
                "_capsule_firstName": firstName,
                "_capsule_lastName": lastName,
                "_capsule_name": `${firstName} ${lastName}`,
                "_capsule_person": true,
                "_capsule_phone": params.phone
            }
        };

        try {
            const res = await fetch("https://api.transpond.io/subscriber", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${transpondKey}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            console.log(`Call log written to Transpond. Status: ${res.status}`);
        } catch (error) {
            console.error("Failed to post call log to Transpond:", error);
        }
    }

    /**
     * Sends an outbound SMS message via Ultatel API
     */
    async sendSMS(params: { to: string; text: string }): Promise<{ success: boolean; messageId?: string; message: string }> {
        if (!this.apiKey) {
            console.log(`[Ultatel Client] Mock SMS sent (API Key not set) to ${params.to}: "${params.text}"`);
            return { success: true, messageId: "mock_sms_id_pending_key", message: "Mock SMS triggered successfully." };
        }

        try {
            const cleanPhone = params.to.replace(/\D/g, "");
            // Format phone to standard e.164 if needed (adding +1 for US if missing)
            const formattedPhone = cleanPhone.length === 10 ? `+1${cleanPhone}` : `+${cleanPhone}`;

            const response = await fetch(`${this.baseUrl}/v1/sms/send`, {
                method: "POST",
                headers: this.getHeaders(),
                body: JSON.stringify({
                    to: formattedPhone,
                    text: params.text
                })
            });

            if (!response.ok) {
                const errData: any = await response.json().catch(() => ({}));
                return { 
                    success: false, 
                    message: `HTTP Error ${response.status}: ${errData?.error?.message || response.statusText}` 
                };
            }

            const data: any = await response.json();
            return { 
                success: true, 
                messageId: data.data?.messageId,
                message: data.message || "SMS sent successfully." 
            };
        } catch (error: any) {
            console.error("Error sending SMS:", error);
            return { success: false, message: `Network error: ${error.message}` };
        }
    }
}
