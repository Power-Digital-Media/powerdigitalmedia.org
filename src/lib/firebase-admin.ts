import { initializeApp, getApps, cert, applicationDefault, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import { Firestore as GcpFirestore } from '@google-cloud/firestore';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import dotenv from 'dotenv';

// For standalone script executions, load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

const TARGET_FIREBASE_PROJECT_ID =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    'power-digital-media';

let cachedBrokerToken: { token: string; expiresAtMs: number } | null = null;

async function fetchKeylessBrokerAccessToken(): Promise<{
    access_token: string;
    expires_in: number;
}> {
    if (
        cachedBrokerToken &&
        Date.now() < cachedBrokerToken.expiresAtMs - 5 * 60 * 1000
    ) {
        return {
            access_token: cachedBrokerToken.token,
            expires_in: Math.max(
                60,
                Math.floor((cachedBrokerToken.expiresAtMs - Date.now()) / 1000)
            ),
        };
    }

    const brokerUrl = process.env.SI_TOKEN_BROKER_URL?.trim();
    const workerSecret = process.env.SI_WORKER_SECRET?.trim();
    if (!brokerUrl || !workerSecret) {
        throw new Error('Missing SI_TOKEN_BROKER_URL or SI_WORKER_SECRET');
    }

    const timestamp = String(Date.now());
    const nonce = crypto.randomBytes(16).toString('hex');
    const purpose = 'firestore-only';
    const signature = crypto
        .createHmac('sha256', workerSecret)
        .update(`${timestamp}:${nonce}:${purpose}`)
        .digest('hex');

    const res = await fetch(brokerUrl, {
        method: 'POST',
        headers: {
            'X-SI-Worker-Secret': workerSecret,
            'X-SI-Broker-Purpose': purpose,
            'X-SI-Broker-Timestamp': timestamp,
            'X-SI-Broker-Nonce': nonce,
            'X-SI-Broker-Signature': signature,
            Accept: 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error(`Keyless ADC token broker returned HTTP ${res.status}`);
    }

    const data = (await res.json()) as {
        access_token: string;
        expires_in?: number;
    };
    const expiresIn = data.expires_in || 3500;
    cachedBrokerToken = {
        token: data.access_token,
        expiresAtMs: Date.now() + expiresIn * 1000,
    };

    return {
        access_token: data.access_token,
        expires_in: expiresIn,
    };
}

function getLocalFirebaseCliAccessToken(): {
    access_token: string;
    expires_in: number;
} | null {
    if (process.env.NODE_ENV === 'production') return null;
    try {
        const cfgPath = path.join(
            os.homedir(),
            '.config',
            'configstore',
            'firebase-tools.json'
        );
        if (!fs.existsSync(cfgPath)) return null;
        const raw = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
        const accessToken = raw?.tokens?.access_token;
        const expiresAt = Number(raw?.tokens?.expires_at || 0);
        if (accessToken && expiresAt > Date.now() + 60_000) {
            return {
                access_token: String(accessToken),
                expires_in: Math.floor((expiresAt - Date.now()) / 1000),
            };
        }
    } catch {
        // Ignore in non-CLI environments
    }
    return null;
}

function createTokenProviderAuthClient(
    tokenSupplier: () => Promise<{ access_token: string; expires_in: number }>
): OAuth2Client {
    const client = new OAuth2Client();
    Object.assign(client, {
        getAccessToken: async () => {
            const { access_token } = await tokenSupplier();
            return { token: access_token, res: null };
        },
        getRequestHeaders: async () => {
            const { access_token } = await tokenSupplier();
            return { Authorization: `Bearer ${access_token}` };
        },
    });
    return client;
}

function getScopedFirebaseServiceAccount(): Record<string, string> | null {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw) as Record<string, string>;
        if (parsed.project_id === TARGET_FIREBASE_PROJECT_ID) {
            return parsed;
        }
    } catch {
        // Ignore malformed JSON
    }
    return null;
}

const scopedServiceAccount = getScopedFirebaseServiceAccount();
const hasBroker = Boolean(
    process.env.SI_TOKEN_BROKER_URL?.trim() &&
        process.env.SI_WORKER_SECRET?.trim()
);
const cliToken = getLocalFirebaseCliAccessToken();

let app: App;
let adminDb: Firestore;

if (!getApps().length) {
    if (scopedServiceAccount) {
        app = initializeApp({
            credential: cert(scopedServiceAccount),
            projectId: TARGET_FIREBASE_PROJECT_ID,
        });
    } else {
        app = initializeApp({
            credential: applicationDefault(),
            projectId: TARGET_FIREBASE_PROJECT_ID,
        });
    }
} else {
    app = getApps()[0];
}

if (scopedServiceAccount) {
    adminDb = getFirestore(app);
    try {
        adminDb.settings({ ignoreUndefinedProperties: true });
    } catch {
        // Settings already initialized
    }
} else if (hasBroker) {
    const authClient = createTokenProviderAuthClient(fetchKeylessBrokerAccessToken);
    adminDb = new GcpFirestore({
        projectId: TARGET_FIREBASE_PROJECT_ID,
        authClient,
        preferRest: true,
        ignoreUndefinedProperties: true,
    }) as unknown as Firestore;
} else if (cliToken) {
    const authClient = createTokenProviderAuthClient(async () => {
        const fresh = getLocalFirebaseCliAccessToken() || cliToken;
        return fresh;
    });
    adminDb = new GcpFirestore({
        projectId: TARGET_FIREBASE_PROJECT_ID,
        authClient,
        preferRest: true,
        ignoreUndefinedProperties: true,
    }) as unknown as Firestore;
} else {
    adminDb = getFirestore(app);
}

const adminAuth: Auth = getAuth(app);

export { adminDb, adminAuth, TARGET_FIREBASE_PROJECT_ID };
