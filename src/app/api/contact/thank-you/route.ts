import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(
    process.env.RESEND_API_KEY || 're_placeholder_key_to_prevent_startup_crash'
);

/* ─── Template Types ──────────────────────────────────────────── */
type TemplateType =
    | 'newsletter'
    | 'contact'
    | 'hook-generator'
    | 'web-design-discovery'
    | 'client-discovery';

interface MinimizedLeadSummaryPayload {
    phone?: string;
    company?: string;
    website?: string;
    servicesInterested?: string;
    roadblockSummary?: string;
    pagePath?: string;
}

interface ThankYouRequest {
    email: string;
    name?: string;
    template: TemplateType;
    submissionId?: string;
    leadEventId?: string;
    formSource?: string;
    internalFallbackRequired?: boolean;
    minimizedLeadSummary?: MinimizedLeadSummaryPayload;
}

/* ─── Template Config ─────────────────────────────────────────── */
interface EmailTemplate {
    subject: string;
    headline: string;
    body: string;
    ctaText: string;
    ctaUrl: string;
}

function escapeHtml(value: string | undefined): string {
    if (!value) return '';
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getTemplate(template: TemplateType, name?: string): EmailTemplate {
    const firstName = escapeHtml(name?.split(' ')[0] || 'there');

    switch (template) {
        case 'newsletter':
            return {
                subject: '⚡ Welcome to the Power Digital Intel Feed',
                headline: "You're In.",
                body: "You've just joined the most aggressive digital growth intelligence list in Mississippi. We drop high-value strategies on SEO, AI-readiness, content architecture, and revenue engineering — no fluff, no filler.",
                ctaText: 'Explore Our Services →',
                ctaUrl: 'https://powerdigitalmedia.org/#services',
            };

        case 'contact':
        default:
            return {
                subject: `📬 We Got Your Message, ${name?.split(' ')[0] || 'there'}`,
                headline: `Hey ${firstName}, Message Received.`,
                body: "Thank you for reaching out to Power Digital Media. Our team has received your inquiry and we're already reviewing it. Expect a response within 24 hours — we move fast.",
                ctaText: 'Book a Strategy Call →',
                ctaUrl: 'https://powerdigitalmedia.org/book',
            };

        case 'hook-generator':
            return {
                subject: '🧠 Your Strategy Notes Are Ready — Power Digital Media',
                headline: `Notes Delivered, ${firstName}.`,
                body: 'Your growth strategy request has been compiled by our engineering team in Jackson, MS.',
                ctaText: 'Unlock Full Strategy →',
                ctaUrl: 'https://powerdigitalmedia.org/book',
            };

        case 'web-design-discovery':
            return {
                subject: `🚀 Discovery Received — Let's Build, ${name?.split(' ')[0] || 'there'}`,
                headline: `Discovery Locked In, ${firstName}.`,
                body: "Your Web Design Discovery form has been received and our engineering team is reviewing your project scope. We'll be in touch shortly to schedule your architecture deep-dive and present a tailored build strategy.",
                ctaText: 'View Our Web Design Work →',
                ctaUrl: 'https://powerdigitalmedia.org/web-design',
            };

        case 'client-discovery':
            return {
                subject: `🎯 Client Discovery Received — ${name?.split(' ')[0] || 'there'}`,
                headline: `Welcome Aboard, ${firstName}.`,
                body: "Your Client Discovery form has been submitted successfully. Our team is reviewing your brand, goals, and growth needs. We'll reach out within 24 hours with a tailored engagement plan built to scale your presence.",
                ctaText: 'See What We Build →',
                ctaUrl: 'https://powerdigitalmedia.org/#services',
            };
    }
}

/* ─── HTML Builder ────────────────────────────────────────────── */
function buildEmail(t: EmailTemplate): string {
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:40px;">
      <p style="color:#f59e0b;font-size:10px;letter-spacing:4px;text-transform:uppercase;margin:0 0 12px;">Power Digital Media</p>
      <h1 style="color:#ffffff;font-size:28px;font-weight:900;margin:0 0 8px;">${t.headline}</h1>
    </div>

    <!-- Body -->
    <div style="background:#ffffff08;border:1px solid #ffffff1a;border-radius:16px;padding:32px;margin-bottom:32px;">
      <p style="color:#ffffffcc;font-size:15px;line-height:1.7;margin:0;">${t.body}</p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;background:#f59e0b14;border:1px solid #f59e0b40;border-radius:12px;padding:32px;margin-bottom:32px;">
      <p style="color:#ffffff80;font-size:13px;margin:0 0 20px;">Ready to accelerate?</p>
      <a href="${t.ctaUrl}" style="display:inline-block;background:#f59e0b;color:#06080f;font-weight:800;text-transform:uppercase;letter-spacing:2px;font-size:12px;padding:14px 32px;border-radius:8px;text-decoration:none;">${t.ctaText}</a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;border-top:1px solid #ffffff10;padding-top:24px;">
      <p style="color:#ffffff30;font-size:10px;letter-spacing:2px;text-transform:uppercase;margin:0;">Power Digital Media LLC — Jackson, MS</p>
      <p style="color:#ffffff20;font-size:10px;margin:8px 0 0;">2914 Cynthia Rd, Jackson, MS 39209 · (601) 446-2393 · powerdigitalmedia.org</p>
    </div>
  </div>
</body>
</html>`;
}

function buildFailoverInternalLeadEmail(req: ThankYouRequest): string {
    const s = req.minimizedLeadSummary || {};
    const rows: Array<[string, string]> = [
        ['Name', escapeHtml(req.name || 'Prospect')],
        ['Email', escapeHtml(req.email)],
        ['Phone', escapeHtml(s.phone || '—')],
        ['Company', escapeHtml(s.company || '—')],
        ['Website', escapeHtml(s.website || '—')],
        ['Form Source', escapeHtml(req.formSource || 'general-contact')],
        ['Page Path', escapeHtml(s.pagePath || '/')],
        ['Services Interested', escapeHtml(s.servicesInterested || '—')],
        ['Submission ID', escapeHtml(req.submissionId || '—')],
    ];

    const tableRows = rows
        .map(
            ([label, val]) =>
                `<tr><td style="padding:8px 12px;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:12px;font-weight:700;width:160px;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #1e293b;color:#f8fafc;font-size:13px;">${val}</td></tr>`
        )
        .join('');

    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;background:#06080f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#f8fafc;">
  <div style="max-width:640px;margin:0 auto;background:#0b0f19;border:1px solid #f59e0b55;border-radius:16px;padding:28px;">
    <p style="margin:0 0 6px;color:#f59e0b;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Failover Lead Notification (Resend Backup Channel)</p>
    <h2 style="margin:0 0 18px;color:#ffffff;font-size:20px;">New Lead Captured: ${escapeHtml(req.name || req.email)}</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">${tableRows}</table>
    <div style="background:#111827;border:1px solid #1f2937;border-radius:12px;padding:16px;">
      <p style="margin:0 0 8px;color:#fbbf24;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Message / Questionnaire Summary</p>
      <p style="margin:0;color:#e2e8f0;font-size:13px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(s.roadblockSummary || 'No additional notes provided.')}</p>
    </div>
  </div>
</body>
</html>`;
}

/* ─── POST Handler ────────────────────────────────────────────── */
export async function POST(request: Request) {
    try {
        const body = (await request.json()) as ThankYouRequest;
        const {
            email,
            name,
            template,
            submissionId,
            formSource,
            internalFallbackRequired,
        } = body;

        if (!email || !template) {
            return NextResponse.json(
                { error: 'email and template are required' },
                { status: 400 }
            );
        }

        const t = getTemplate(template, name);
        const internalRecipient =
            process.env.ALERT_RECIPIENT_EMAIL ||
            process.env.PDM_INTERNAL_LEAD_FALLBACK_EMAIL ||
            'damein@powerdigitalmedia.org';

        const { data, error } = await resend.emails.send({
            from: 'Power Digital Media <hello@powerdigitalmedia.org>',
            to: [email],
            subject: t.subject,
            html: buildEmail(t),
        });

        // When Transpond primary channel failed, also dispatch full lead summary to internal recipient via Resend
        if (internalFallbackRequired) {
            await resend.emails
                .send({
                    from: 'Power Digital Media Leads <hello@powerdigitalmedia.org>',
                    to: [internalRecipient],
                    replyTo: email,
                    subject: `🚨 [Failover Lead] ${name || email} (${formSource || 'website'})`,
                    html: buildFailoverInternalLeadEmail(body),
                })
                .catch(() => {
                    // Tracked by primary resend response below
                });
        }

        if (error) {
            console.error(
                JSON.stringify({
                    event: 'RESEND_THANK_YOU_ERROR',
                    submissionId: submissionId || null,
                    errorName: error.name || 'resend_error',
                })
            );
            return NextResponse.json(
                { error: 'Failed to send thank-you email' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch {
        console.error(
            JSON.stringify({
                event: 'THANK_YOU_API_EXCEPTION',
            })
        );
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
