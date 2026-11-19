import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { isAdmin, isLocalDevBypassAllowed } from "@/lib/auth-constants";
import fs from "fs";
import path from "path";
import { syncActiveClientsToTranspond } from "@/lib/crm-sync";

const dbPath = path.join(process.cwd(), "src", "data", "nexus-db.json");

const EMPTY_DB = {
    clients: [],
    services: [],
    payments: [],
    tasks: [],
    platforms: [],
    domainsHosting: [],
    salesPipeline: [],
    notes: [],
};

async function getDbData() {
    // Prefer Firestore cloud registry first when local file does not exist (e.g. serverless / untracked)
    if (!fs.existsSync(dbPath)) {
        try {
            const doc = await adminDb.collection("nexus_registry").doc("database").get();
            if (doc.exists) {
                const data = doc.data();
                try {
                    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
                } catch {
                    // Read-only serverless filesystem — skip local cache file write
                }
                return data;
            }
        } catch (err) {
            console.error("❌ Failed to restore database from Firestore:", err);
        }
        return { ...EMPTY_DB };
    }

    const raw = fs.readFileSync(dbPath, "utf-8");
    try {
        return JSON.parse(raw);
    } catch (err) {
        console.error("❌ Failed to parse local JSON. Falling back to Firestore:", err);
        try {
            const doc = await adminDb.collection("nexus_registry").doc("database").get();
            if (doc.exists) {
                return doc.data();
            }
        } catch (cErr) {
            console.error("❌ Cloud fallback recovery failed:", cErr);
        }
        return { ...EMPTY_DB };
    }
}

async function writeDbData(data: any) {
    // 1. Write locally when writable (dev), without crashing read-only serverless runtimes
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
    } catch {
        // Ignore read-only filesystem error in serverless deployments
    }

    // 2. Persist to Firestore cloud registry
    try {
        await adminDb.collection("nexus_registry").doc("database").set(data);
        console.log("☁️ Firestore cloud backup committed successfully.");
    } catch (err) {
        console.error("❌ Firestore cloud backup write failed:", err);
    }
}

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized access — missing token." }, { status: 401 });
        }

        const idToken = authHeader.split("Bearer ")[1];
        let decodedToken: { email?: string };
        if (idToken === "local-admin-bypass-token" && isLocalDevBypassAllowed(req)) {
            decodedToken = { email: "damein@powerdigitalmedia.org" };
        } else {
            try {
                decodedToken = await adminAuth.verifyIdToken(idToken);
            } catch {
                return NextResponse.json({ error: "Invalid or expired session token." }, { status: 401 });
            }
        }

        if (!isAdmin(decodedToken.email)) {
            return NextResponse.json({ error: "Forbidden — admin clearance required." }, { status: 403 });
        }

        const data = await getDbData();
        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error("[Admin Nexus API] GET failed:", error);
        return NextResponse.json({ error: error.message || "Failed to read database." }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized access — missing token." }, { status: 401 });
        }

        const idToken = authHeader.split("Bearer ")[1];
        let decodedToken: { email?: string };
        if (idToken === "local-admin-bypass-token" && isLocalDevBypassAllowed(req)) {
            decodedToken = { email: "damein@powerdigitalmedia.org" };
        } else {
            try {
                decodedToken = await adminAuth.verifyIdToken(idToken);
            } catch {
                return NextResponse.json({ error: "Invalid or expired session token." }, { status: 401 });
            }
        }

        if (!isAdmin(decodedToken.email)) {
            return NextResponse.json({ error: "Forbidden — admin clearance required." }, { status: 403 });
        }

        const body = await req.json();
        if (!body || typeof body !== "object") {
            return NextResponse.json({ error: "Invalid payload body." }, { status: 400 });
        }

        // Write the data to local file and Firestore cloud
        await writeDbData(body);

        // Sync active clients to Transpond in the background
        syncActiveClientsToTranspond(body).catch(err => {
            console.error("CRM sync failed:", err);
        });

        return NextResponse.json({ success: true, message: "Database saved and backed up to cloud." });
    } catch (error: any) {
        console.error("[Admin Nexus API] POST failed:", error);
        return NextResponse.json({ error: error.message || "Failed to write database." }, { status: 500 });
    }
}
