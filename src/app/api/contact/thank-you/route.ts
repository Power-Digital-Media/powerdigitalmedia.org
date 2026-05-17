import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/* ─── Template Types ──────────────────────────────────────────── */
type TemplateType =
    | 'newsletter'
    | 'contact'
    | 'hook-generator'
    | 'web-design-discovery'
    | 'client-discovery';

interface ThankYouRequest {
    email: string;
    name?: string;
    template: TemplateType;
}

/* ─── Template Config ─────────────────────────────────────────── */
interface EmailTemplate {
    subject: string;
    headline: string;
    body: string;
    ctaText: string;
    ctaUrl: string;
}

function getTemplate(template: TemplateType, name?: string): EmailTemplate {
    const firstName = name?.split(' ')[0] || 'there';

    switch (template) {
        case 'newsletter':
            return {
                subject: '⚡ Welcome to the Power Digital Intel Feed',
                headline: 'You\'re In.',
                body: 'You\'ve just joined the most aggressive digital growth intelligence list in Mississippi. We drop high-value strategies on SEO, AI-readiness, content architecture, and revenue engineering — no fluff, no filler.',
                ctaText: 'Explore Our Services →',
                ctaUrl: 'https://powerdigitalmedia.org/#services',
            };

        case 'contact':
            return {
                subject: `📬 We Got Your Message, ${firstName}`,
                headline: `Hey ${firstName}, Message Received.`,
                body: 'Thank you for reaching out to Power Digital Media. Our team has received your inquiry and we\'re already reviewing it. Expect a response within 24 hours — we move fast.',
                ctaText: 'Book a Strategy Call →',
                ctaUrl: 'https://powerdigitalmedia.org/book',
            };

        case 'hook-generator':
            return {
                subject: '🧠 Your AI Hooks Are Ready — Power Digital Media',
                headline: `Hooks Delivered, ${firstName}.`,
                body: 'Your AI-generated growth hooks have been compiled. This is just a taste of what our content intelligence engine can do. Imagine this level of strategic thinking applied to your entire content pipeline.',
                ctaText: 'Unlock Full Strategy →',
                ctaUrl: 'https://powerdigitalmedia.org/book',
            };

        case 'web-design-discovery':
            return {
                subject: `🚀 Discovery Received — Let's Build, ${firstName}`,
                headline: `Discovery Locked In, ${firstName}.`,
                body: 'Your Web Design Discovery form has been received and our engineering team is reviewing your project scope. We\'ll be in touch shortly to schedule your architecture deep-dive and present a tailored build strategy.',
                ctaText: 'View Our Web Design Work →',
                ctaUrl: 'https://powerdigitalmedia.org/web-design',
            };

        case 'client-discovery':
            return {
                subject: `🎯 Client Discovery Received — ${firstName}`,
                headline: `Welcome Aboard, ${firstName}.`,
                body: 'Your Client Discovery form has been submitted successfully. Our team is reviewing your brand, goals, and content needs. We\'ll reach out within 24 hours with a tailored engagement plan built to scale your presence.',
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
      <p style="color:#22d3ee;font-size:10px;letter-spacing:4px;text-transform:uppercase;margin:0 0 12px;">Power Digital Media</p>
      <h1 style="color:#ffffff;font-size:28px;font-weight:900;margin:0 0 8px;">${t.headline}</h1>
    </div>

    <!-- Body -->
    <div style="background:#ffffff08;border:1px solid #ffffff1a;border-radius:16px;padding:32px;margin-bottom:32px;">
      <p style="color:#ffffffcc;font-size:15px;line-height:1.7;margin:0;">${t.body}</p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;background:linear-gradient(135deg,#22d3ee15,#06b6d415);border:1px solid #22d3ee30;border-radius:12px;padding:32px;margin-bottom:32px;">
      <p style="color:#ffffff80;font-size:13px;margin:0 0 20px;">Ready to accelerate?</p>
      <a href="${t.ctaUrl}" style="display:inline-block;background:#22d3ee;color:#000000;font-weight:800;text-transform:uppercase;letter-spacing:2px;font-size:12px;padding:14px 32px;border-radius:8px;text-decoration:none;">${t.ctaText}</a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;border-top:1px solid #ffffff10;padding-top:24px;">
      <p style="color:#ffffff30;font-size:10px;letter-spacing:2px;text-transform:uppercase;margin:0;">Power Digital Media — High-Velocity Digital Engineering</p>
      <p style="color:#ffffff20;font-size:10px;margin:8px 0 0;">Jackson, MS · 601-446-2393 · powerdigitalmedia.org</p>
    </div>
  </div>
</body>
</html>`;
}

/* ─── POST Handler ────────────────────────────────────────────── */
export async function POST(request: Request) {
    try {
        const { email, name, template } = (await request.json()) as ThankYouRequest;

        if (!email || !template) {
            return NextResponse.json(
                { error: 'email and template are required' },
                { status: 400 }
            );
        }

        const t = getTemplate(template, name);

        const { data, error } = await resend.emails.send({
            from: 'Power Digital Media <hello@powerdigitalmedia.org>',
            to: [email],
            subject: t.subject,
            html: buildEmail(t),
        });

        if (error) {
            console.error('Resend thank-you error:', error);
            return NextResponse.json(
                { error: 'Failed to send thank-you email' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (error) {
        console.error('Thank-you API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
