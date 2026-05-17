import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

let app: App;
let adminDb: Firestore;
let adminAuth: Auth;

if (!getApps().length) {
    // Use GOOGLE_APPLICATION_CREDENTIALS env var or service account JSON
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (serviceAccount) {
        try {
            const parsed = JSON.parse(serviceAccount);
            app = initializeApp({
                credential: cert(parsed),
                projectId: parsed.project_id,
            });
        } catch {
            console.error('❌ Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY');
            app = initializeApp({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            });
        }
    } else {
        // Fallback: Application Default Credentials (works in GCP, Firebase Hosting, etc.)
        app = initializeApp({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
        console.warn('⚠️ No FIREBASE_SERVICE_ACCOUNT_KEY found — using Application Default Credentials.');
    }
} else {
    app = getApps()[0];
}

adminDb = getFirestore(app);
adminAuth = getAuth(app);

export { adminDb, adminAuth };
