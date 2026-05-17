import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { email, scannedUrl, schemaScore, schemaTypes, aiReadiness, seoScore } = await request.json();

        if (!email || !scannedUrl) {
            return NextResponse.json({ error: 'Email and scannedUrl are required' }, { status: 400 });
        }

        const schemaColor = schemaScore >= 80 ? '#4ade80' : schemaScore >= 50 ? '#facc15' : '#ef4444';
        const seoColor = seoScore >= 80 ? '#4ade80' : seoScore >= 50 ? '#facc15' : '#ef4444';
        const aiColor = aiReadiness === 'Pass' ? '#4ade80' : '#ef4444';

        const { data, error } = await resend.emails.send({
            from: 'Power Digital Media <scanner@powerdigitalmedia.org>',
            to: [email],
            subject: `🔬 Your Site Diagnostic Report — ${scannedUrl}`,
            html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:40px;">
      <p style="color:#22d3ee;font-size:10px;letter-spacing:4px;text-transform:uppercase;margin:0 0 12px;">Power Digital Media</p>
      <h1 style="color:#ffffff;font-size:24px;font-weight:900;text-transform:uppercase;margin:0 0 8px;">Site Diagnostic Report</h1>
      <p style="color:#ffffff80;font-size:14px;margin:0;">Target: <span style="color:#22d3ee;">${scannedUrl}</span></p>
    </div>

    <!-- Score Cards -->
    <div style="margin-bottom:32px;">

      <!-- Schema Score -->
      <div style="background:#ffffff08;border:1px solid #ffffff1a;border-radius:12px;padding:24px;margin-bottom:16px;">
        <p style="color:#ffffff80;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">Structured Data (JSON-LD)</p>
        <p style="color:${schemaColor};font-size:48px;font-weight:900;margin:0;">${schemaScore}<span style="font-size:16px;opacity:0.5;">/100</span></p>
        <p style="color:#ffffff60;font-size:12px;margin:8px 0 0;">Types Found: ${schemaTypes || 'None Detected'}</p>
        ${schemaScore < 80 ? '<p style="color:#facc15;font-size:11px;margin:6px 0 0;">⚠️ Your structured data needs improvement. Search engines and AI agents rely on JSON-LD schema to understand your business.</p>' : '<p style="color:#4ade80;font-size:11px;margin:6px 0 0;">✅ Strong structured data implementation detected.</p>'}
      </div>

      <!-- AI Readiness -->
      <div style="background:#ffffff08;border:1px solid #ffffff1a;border-radius:12px;padding:24px;margin-bottom:16px;">
        <p style="color:#ffffff80;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">AI Agent Readiness (llms.txt)</p>
        <p style="color:${aiColor};font-size:48px;font-weight:900;margin:0;">${aiReadiness === 'Pass' ? '100' : '0'}<span style="font-size:16px;opacity:0.5;">/100</span></p>
        ${aiReadiness !== 'Pass' ? '<p style="color:#ef4444;font-size:11px;margin:8px 0 0;">🚨 Your site has no llms.txt file. AI agents like ChatGPT, Claude, and Perplexity cannot read your business information. You are invisible to the next generation of search.</p>' : '<p style="color:#4ade80;font-size:11px;margin:8px 0 0;">✅ llms.txt detected — your site is visible to AI search agents.</p>'}
      </div>

      <!-- SEO Score -->
      <div style="background:#ffffff08;border:1px solid #ffffff1a;border-radius:12px;padding:24px;">
        <p style="color:#ffffff80;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">Technical SEO</p>
        <p style="color:${seoColor};font-size:48px;font-weight:900;margin:0;">${seoScore}<span style="font-size:16px;opacity:0.5;">/100</span></p>
        ${seoScore < 80 ? '<p style="color:#facc15;font-size:11px;margin:8px 0 0;">⚠️ Missing critical SEO elements (title tags, meta descriptions, H1 structure, or viewport/canonical tags).</p>' : '<p style="color:#4ade80;font-size:11px;margin:8px 0 0;">✅ Core technical SEO signals are properly configured.</p>'}
      </div>
    </div>

    <!-- CTA -->
    <div style="text-align:center;background:linear-gradient(135deg,#22d3ee15,#06b6d415);border:1px solid #22d3ee30;border-radius:12px;padding:32px;margin-bottom:32px;">
      <h2 style="color:#ffffff;font-size:18px;font-weight:800;text-transform:uppercase;margin:0 0 12px;">Ready to Fix These Issues?</h2>
      <p style="color:#ffffff80;font-size:13px;margin:0 0 20px;">Our team specializes in building high-performance web architectures engineered for both traditional search and the AI-driven future.</p>
      <a href="https://powerdigitalmedia.org/web-design/discovery" style="display:inline-block;background:#22d3ee;color:#000000;font-weight:800;text-transform:uppercase;letter-spacing:2px;font-size:12px;padding:14px 32px;border-radius:8px;text-decoration:none;">Start Your Build →</a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;border-top:1px solid #ffffff10;padding-top:24px;">
      <p style="color:#ffffff30;font-size:10px;letter-spacing:2px;text-transform:uppercase;margin:0;">Power Digital Media — High-Velocity Digital Engineering</p>
      <p style="color:#ffffff20;font-size:10px;margin:8px 0 0;">This report was generated by our automated site scanner.</p>
    </div>
  </div>
</body>
</html>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: 'Failed to send report email' }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (error) {
        console.error('Report API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
