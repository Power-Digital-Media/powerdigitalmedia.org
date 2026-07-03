import { adminDb } from './firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

export interface ClientSetup {
    id?: string;
    companyName: string;
    website: string;
    phone: string;
    address: string;
    businessHours: string;
    
    contactFirst: string;
    contactLast: string;
    contactEmail: string;
    contactPhone: string;
    
    services: {
        capsule: boolean;
        transpond: boolean;
        ultatel: boolean;
    };
    
    // Details for provisioning
    capsuleSubdomain?: string;
    transpondEmail?: string;
    transpondPassword?: string;
    
    ultatelUsers?: Array<{
        name: string;
        email: string;
        extension: string;
        e911: string;
    }>;
    ultatelHardwareCount?: number;
    ultatelPortingDetails?: string;
    ultatelNetworkChecked?: boolean;
    
    // Status tracking
    status: 'pending' | 'syncing' | 'completed' | 'failed';
    errorMessage?: string;
    
    // Provisioned credentials/outcomes
    capsuleOrgId?: string;
    capsuleContactId?: string;
    transpondAccountMasterId?: string;
    transpondAccountUserId?: string;
    transpondApiKey?: string;
    ultatelWebhookId?: string;
    ultatelApiKey?: string;
    ultatelPbxId?: string;
    
    createdAt: FirebaseFirestore.Timestamp;
    updatedAt: FirebaseFirestore.Timestamp;
}

const COLLECTION_NAME = 'client_setups';

export async function createClientSetup(data: Omit<ClientSetup, 'createdAt' | 'updatedAt' | 'status'>): Promise<ClientSetup> {
    const now = Timestamp.now();
    const docRef = adminDb.collection(COLLECTION_NAME).doc();
    const setup: ClientSetup = {
        ...data,
        id: docRef.id,
        status: 'pending',
        createdAt: now,
        updatedAt: now,
    };
    await docRef.set(setup);
    return setup;
}

export async function getClientSetup(id: string): Promise<ClientSetup | null> {
    const doc = await adminDb.collection(COLLECTION_NAME).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...(doc.data() as Omit<ClientSetup, 'id'>) };
}

export async function listClientSetups(): Promise<ClientSetup[]> {
    const snapshot = await adminDb
        .collection(COLLECTION_NAME)
        .orderBy('createdAt', 'desc')
        .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<ClientSetup, 'id'>) }));
}

export async function updateClientSetup(id: string, data: Partial<ClientSetup>): Promise<void> {
    await adminDb.collection(COLLECTION_NAME).doc(id).update({
        ...data,
        updatedAt: Timestamp.now(),
    });
}
