import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { isAdmin } from "@/lib/auth-constants";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder_key_to_prevent_startup_crash");
const dbPath = path.join(process.cwd(), "src", "data", "nexus-db.json");

function getDbData() {
    if (!fs.existsSync(dbPath)) {
        return { clients: [], services: [], payments: [], tasks: [], platforms: [], domainsHosting: [], salesPipeline: [], notes: [] };
    }
    return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function writeDbData(data: any) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized access — missing token." }, { status: 401 });
        }

        const idToken = authHeader.split("Bearer ")[1];
        let decodedToken;
        try {
            decodedToken = await adminAuth.verifyIdToken(idToken);
        } catch (err) {
            return NextResponse.json({ error: "Invalid or expired session token." }, { status: 401 });
        }

        if (!isAdmin(decodedToken.email)) {
            return NextResponse.json({ error: "Forbidden — admin clearance required." }, { status: 403 });
        }

        const { paymentId } = await req.json();
        if (!paymentId) {
            return NextResponse.json({ error: "Missing invoice payment identifier." }, { status: 400 });
        }

        const db = getDbData();
        const paymentIdx = db.payments.findIndex((p: any) => p.id === paymentId);
        if (paymentIdx === -1) {
            return NextResponse.json({ error: "Invoice payment record not found." }, { status: 404 });
        }

        const payment = db.payments[paymentIdx];
        const client = db.clients.find((c: any) => c.companyName === payment.clientName);
        if (!client) {
            return NextResponse.json({ error: `Client profile for company '${payment.clientName}' not found.` }, { status: 404 });
        }

        // Generate HTML Invoice template
        const invoiceHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #222; background-color: #f7f9fc; padding: 20px; }
                .card { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #eef2f5; }
                .logo { font-size: 20px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase; color: #000; margin-bottom: 20px; }
                .logo span { color: #3b82f6; }
                .divider { height: 1px; background: #eaedf0; margin: 30px 0; }
                .header-meta { display: flex; justify-content: space-between; font-size: 12px; color: #7f8c8d; }
                .invoice-title { font-size: 28px; font-weight: 900; margin: 10px 0 20px 0; color: #1e293b; }
                .table { w-full; border-collapse: collapse; margin-top: 20px; }
                .table th { font-size: 10px; text-transform: uppercase; tracking: 1px; color: #94a3b8; padding: 12px 0; border-bottom: 2px solid #f1f5f9; text-align: left; }
                .table td { py: 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; }
                .amount-due { font-size: 24px; font-weight: 800; color: #3b82f6; margin-top: 30px; text-align: right; }
                .instructions { font-size: 12px; line-height: 1.6; color: #64748b; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px dashed #e2e8f0; margin-top: 30px; }
                .instructions strong { color: #334155; }
                .footer { text-align: center; margin-top: 40px; font-size: 11px; color: #94a3b8; }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="logo">Power Digital <span>Media</span></div>
                <div class="header-meta">
                    <div>
                        <strong>To:</strong><br>
                        ${client.name}<br>
                        ${client.companyName}<br>
                        ${client.phone}
                    </div>
                    <div style="text-align: right;">
                        <strong>Invoice Number:</strong> #${payment.invoiceNum}<br>
                        <strong>Issue Date:</strong> ${payment.invoiceDate}<br>
                        <strong>Due Date:</strong> ${payment.dueDate}
                    </div>
                </div>
                
                <div class="divider"></div>
                
                <div class="invoice-title">Invoice Details</div>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 2px solid #f1f5f9; text-align: left; font-size: 10px; color: #94a3b8; text-transform: uppercase;">
                            <th style="padding: 10px 0;">Description</th>
                            <th style="padding: 10px 0; text-align: right;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155;">
                            <td style="padding: 15px 0;">${payment.relatedService || 'B2B Design & Integration Retainer'}</td>
                            <td style="padding: 15px 0; text-align: right; font-weight: bold;">$${payment.amount}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="amount-due">Total Due: $${payment.amount}</div>
                
                <div class="instructions">
                    <strong>Payment Instructions:</strong><br>
                    Please remit payment via one of the following methods:
                    <ul style="margin: 10px 0 0 15px; padding: 0;">
                        <li><strong>Bank Transfer:</strong> Please reply to this email for routing & account numbers.</li>
                        <li><strong>Check:</strong> Make checks payable to <strong>Power Digital Media LLC</strong> and mail to: <em>39201 Jackson, MS</em>.</li>
                        <li><strong>Cash App / Card:</strong> Contact us directly to trigger an instant secure card payment link.</li>
                    </ul>
                </div>
                
                <div class="footer">
                    Power Digital Media LLC &bull; Jackson, MS &bull; (601) 300-2004<br>
                    You are receiving this B2B billing protocol request as a certified client partner.
                </div>
            </div>
        </body>
        </html>
        `;

        // Send Email via Resend
        const { error } = await resend.emails.send({
            from: "Power Digital Media <hello@powerdigitalmedia.org>",
            to: [client.email],
            subject: `[Invoice #${payment.invoiceNum}] Power Digital Media Billing Request`,
            html: invoiceHtml
        });

        if (error) {
            console.error("[Invoice API] Resend failed:", error);
            return NextResponse.json({ error: "Failed to dispatch email invoice via Resend." }, { status: 520 });
        }

        // Update payment record in database
        db.payments[paymentIdx] = {
            ...payment,
            status: "Sent",
            notes: `${payment.notes || ''} (Emailed to ${client.email} on ${new Date().toISOString().split('T')[0]})`.trim()
        };
        writeDbData(db);

        return NextResponse.json({ success: true, message: `Invoice #${payment.invoiceNum} successfully emailed to ${client.email}.` });
    } catch (error: any) {
        console.error("[Invoice API] POST failed:", error);
        return NextResponse.json({ error: error.message || "Failed to dispatch invoice." }, { status: 500 });
    }
}
