/**
 * Firestore data helpers for the Client Portal.
 * All server-side reads/writes go through these functions.
 */

import { adminDb } from './firebase-admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';

// ─── Types ────────────────────────────────────────────────────

export interface ClientProfile {
    displayName: string;
    email: string;
    company: string;
    phone: string;
    stripeCustomerId: string;
    subscriptionStatus: 'active' | 'past_due' | 'canceled' | 'none';
    subscriptionTier: 'management' | 'custom' | 'none';
    monthlyRate: number;
    nextPaymentDate: FirebaseFirestore.Timestamp | null;
    createdAt: FirebaseFirestore.Timestamp;
    updatedAt: FirebaseFirestore.Timestamp;
    notes: string;
}

export interface InvoiceRecord {
    clientId: string;
    stripeCustomerId: string;
    amount: number;
    status: 'paid' | 'open' | 'past_due' | 'void';
    description: string;
    paidAt: FirebaseFirestore.Timestamp | null;
    dueDate: FirebaseFirestore.Timestamp | null;
    invoiceUrl: string;
    invoicePdf: string;
    createdAt: FirebaseFirestore.Timestamp;
}

export interface ProjectRecord {
    clientId: string;
    name: string;
    type: 'web-design' | 'branding' | 'seo' | 'podcasting' | 'management';
    status: 'discovery' | 'design' | 'engineering' | 'review' | 'deployed';
    progress: number;
    milestones: Array<{
        name: string;
        status: 'completed' | 'current' | 'pending';
        completedAt?: FirebaseFirestore.Timestamp;
    }>;
    startDate: FirebaseFirestore.Timestamp;
    estimatedCompletion: FirebaseFirestore.Timestamp | null;
    lastUpdated: FirebaseFirestore.Timestamp;
    archived: boolean;
}

export interface ActivityRecord {
    clientId: string;
    type: 'payment' | 'milestone' | 'file' | 'ticket' | 'login' | 'subscription';
    title: string;
    metadata: Record<string, string>;
    timestamp: FirebaseFirestore.Timestamp;
}

// ─── Client Profiles ──────────────────────────────────────────

export async function getClientProfile(uid: string): Promise<ClientProfile | null> {
    const doc = await adminDb.collection('clients').doc(uid).get();
    return doc.exists ? (doc.data() as ClientProfile) : null;
}

export async function createClientProfile(uid: string, data: Partial<ClientProfile>) {
    const now = Timestamp.now();
    const profile: ClientProfile = {
        displayName: data.displayName || '',
        email: data.email || '',
        company: data.company || '',
        phone: data.phone || '',
        stripeCustomerId: data.stripeCustomerId || '',
        subscriptionStatus: data.subscriptionStatus || 'none',
        subscriptionTier: data.subscriptionTier || 'none',
        monthlyRate: data.monthlyRate || 0,
        nextPaymentDate: null,
        createdAt: now,
        updatedAt: now,
        notes: '',
    };
    await adminDb.collection('clients').doc(uid).set(profile);
    return profile;
}

export async function updateClientProfile(uid: string, data: Partial<ClientProfile>) {
    await adminDb.collection('clients').doc(uid).update({
        ...data,
        updatedAt: Timestamp.now(),
    });
}

export async function getClientByStripeId(stripeCustomerId: string): Promise<{ uid: string; profile: ClientProfile } | null> {
    const snapshot = await adminDb
        .collection('clients')
        .where('stripeCustomerId', '==', stripeCustomerId)
        .limit(1)
        .get();

    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { uid: doc.id, profile: doc.data() as ClientProfile };
}

// ─── Invoices ─────────────────────────────────────────────────

export async function upsertInvoice(stripeInvoiceId: string, data: Partial<InvoiceRecord>) {
    await adminDb.collection('invoices').doc(stripeInvoiceId).set(data, { merge: true });
}

export async function getClientInvoices(clientId: string, limit = 20): Promise<Array<InvoiceRecord & { id: string }>> {
    const snapshot = await adminDb
        .collection('invoices')
        .where('clientId', '==', clientId)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as InvoiceRecord) }));
}

// ─── Projects ─────────────────────────────────────────────────

export async function getClientProjects(clientId: string): Promise<Array<ProjectRecord & { id: string }>> {
    const snapshot = await adminDb
        .collection('projects')
        .where('clientId', '==', clientId)
        .where('archived', '==', false)
        .orderBy('lastUpdated', 'desc')
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as ProjectRecord) }));
}

export async function getProject(projectId: string): Promise<(ProjectRecord & { id: string }) | null> {
    const doc = await adminDb.collection('projects').doc(projectId).get();
    return doc.exists ? { id: doc.id, ...(doc.data() as ProjectRecord) } : null;
}

// ─── Activity ─────────────────────────────────────────────────

export async function logActivity(data: Omit<ActivityRecord, 'timestamp'>) {
    await adminDb.collection('activity').add({
        ...data,
        timestamp: Timestamp.now(),
    });
}

export async function getClientActivity(clientId: string, limit = 30): Promise<Array<ActivityRecord & { id: string }>> {
    const snapshot = await adminDb
        .collection('activity')
        .where('clientId', '==', clientId)
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as ActivityRecord) }));
}

// ─── Founder's 100 Promo Counter ──────────────────────────────

const PROMO_DOC = 'promotions/founders100';

export async function decrementFounders100(): Promise<{ success: boolean; remaining: number }> {
    const docRef = adminDb.doc(PROMO_DOC);

    return adminDb.runTransaction(async (txn) => {
        const doc = await txn.get(docRef);
        if (!doc.exists) return { success: false, remaining: 0 };

        const data = doc.data()!;
        if (!data.active || data.remaining <= 0) {
            return { success: false, remaining: data.remaining };
        }

        txn.update(docRef, {
            claimed: FieldValue.increment(1),
            remaining: FieldValue.increment(-1),
            lastClaimedAt: Timestamp.now(),
        });

        return { success: true, remaining: data.remaining - 1 };
    });
}
