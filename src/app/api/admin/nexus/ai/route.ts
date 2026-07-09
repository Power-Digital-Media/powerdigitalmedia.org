import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { isAdmin } from "@/lib/auth-constants";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "data", "nexus-db.json");

async function getDbData() {
    if (!fs.existsSync(dbPath)) {
        try {
            const doc = await adminDb.collection("nexus_registry").doc("database").get();
            if (doc.exists) {
                const data = doc.data();
                fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
                return data;
            }
        } catch (err) {
            console.error("❌ Failed to restore database from Firestore:", err);
        }
        return { clients: [], services: [], payments: [], tasks: [], platforms: [], domainsHosting: [], salesPipeline: [], notes: [] };
    }
    const raw = fs.readFileSync(dbPath, "utf-8");
    try {
        return JSON.parse(raw);
    } catch {
        return { clients: [], services: [], payments: [], tasks: [], platforms: [], domainsHosting: [], salesPipeline: [], notes: [] };
    }
}

async function writeDbData(data: any) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
    try {
        await adminDb.collection("nexus_registry").doc("database").set(data);
    } catch (err) {
        console.error("❌ Firestore backup failed:", err);
    }
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

        const { message } = await req.json();
        if (!message) {
            return NextResponse.json({ error: "Missing query message prompt." }, { status: 400 });
        }

        const apiKey = process.env.GOOGLE_AI_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Gemini API key is not configured. Define GOOGLE_AI_KEY in .env.local to activate the AI Agent." }, { status: 503 });
        }

        const db = await getDbData();
        const todayStr = new Date().toISOString().split("T")[0];

        const systemPrompt = `You are "Nexus AI", the bespoke financial and operations command agent for Power Digital Media.
You are directly integrated into the client registry database. 
Your goal is to parse the user's natural language command, determine if it requires writing or modifying the registry database, and formulate a response.

CURRENT DATABASE STATE:
${JSON.stringify(db, null, 2)}

TODAY'S DATE: ${todayStr}

YOUR INSTRUCTIONS:
1. Determine if the user is asking to add a payment, log cash/check, add a task, add an overhead subscription/platform, add a client, or toggle a tax checkmark.
2. If so, structure a database mutation matching one of the schemas below.
3. If they are just asking a question (e.g., "how much overhead do I have?" or "who has not paid?"), do not run a mutation ("mutation": null) and just reply with the answer in the "reply" field.
4. If you log a payment (e.g., "I just got a check for $1,200 from Acme"), make sure to match the clientName with their official company name from the clients table (e.g., "Acme Corporation" instead of just "Acme"). If the client does not exist, use the name they typed.
5. In your "reply" field, always explain exactly what you did, and mention any key metrics (like how much should go to the tax reserve). Keep it friendly, direct, and professional.

RESPONSE JSON FORMAT:
You MUST respond with a single, valid JSON object matching this structure:
{
  "mutation": {
    "type": "add_payment" | "add_client" | "add_service" | "add_platform" | "add_task",
    "data": { ... }
  } | null,
  "reply": "Conversational confirmation string here."
}

MUTATION DATA SCHEMAS:
- "add_payment": {
    "clientName": string (match existing client companyName if possible, e.g. "Acme Corporation")
    "invoiceNum": string (auto-generate if not specified, e.g. "INV-1002")
    "invoiceDate": string (default today: "${todayStr}")
    "amount": number
    "dueDate": string (default today + 10 days)
    "status": "Paid" | "Unpaid" | "Overdue" (usually "Paid" if they got cash/check, or "Unpaid" if creating invoice)
    "paymentDate": string (today: "${todayStr}" if status is "Paid")
    "paymentMethod": "Check" | "Cash" | "Stripe" | "Bank Transfer" | "Cash App" | "Other"
    "relatedService": string (optional service name description)
    "notes": string
    "taxSettled": boolean (default false)
  }
- "add_platform" (Overhead): {
    "clientName": "Power Digital (Overhead)" (for your subscriptions)
    "platformName": string (e.g., "Figma", "Slack")
    "type": string (e.g., "Design Tool", "Chat")
    "loginEmail": string (optional)
    "plan": string (optional)
    "status": "Active"
    "monthlyCost": number
    "paidBy": "Power Digital"
    "renewalDate": string (default today + 30 days)
    "accessLevel": "Admin"
    "notes": string
  }
- "add_task": {
    "clientName": string
    "taskName": string
    "priority": "Low" | "Medium" | "High" | "Urgent"
    "status": "Not Started" | "In Progress" | "Waiting on Client" | "Completed"
    "dueDate": string (default today + 7 days)
    "waitingOn": string (blocker reason if status is Waiting)
    "relatedService": string
    "notes": string
  }
- "add_client": {
    "name": string (contact owner)
    "companyName": string
    "phone": string
    "email": string
    "website": string
    "status": "Active"
    "businessType": string
    "monthlyValue": number
    "setupFee": number
    "startDate": "${todayStr}"
    "nextFollowUp": "${todayStr}"
    "primaryNeed": string
    "notes": string
  }
`;

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [{ text: `${systemPrompt}\n\nUser Command: "${message}"` }]
                }
            ],
            config: {
                temperature: 0.2,
                responseMimeType: "application/json"
            }
        });

        const rawText = response.text || "{}";
        const parsed = JSON.parse(rawText.trim());

        if (parsed.mutation) {
            const { type, data } = parsed.mutation;
            
            // Execute the mutation in the database
            if (type === "add_payment") {
                const item = {
                    id: `pay-${Date.now()}`,
                    taxSettled: false,
                    ...data
                };
                db.payments.push(item);
            } else if (type === "add_platform") {
                const item = {
                    id: `plat-${Date.now()}`,
                    ...data
                };
                db.platforms.push(item);
            } else if (type === "add_task") {
                const item = {
                    id: `task-${Date.now()}`,
                    ...data
                };
                db.tasks.push(item);
            } else if (type === "add_client") {
                const item = {
                    id: `client-${Date.now()}`,
                    ...data
                };
                db.clients.push(item);
            }

            // Write back to disk and Firestore cloud
            await writeDbData(db);
        }

        return NextResponse.json({
            success: true,
            reply: parsed.reply || "I've processed your command.",
            data: db
        });
    } catch (error: any) {
        console.error("[Nexus AI API] POST failed:", error);
        return NextResponse.json({ error: error.message || "Failed to process AI command." }, { status: 500 });
    }
}
