"use client";

import React, { createContext, useContext } from 'react';
import type { User } from 'firebase/auth';
import type { ClientProfile } from '@/lib/firestore-helpers';

// Serializable version of ClientProfile for the client-side
export interface ClientProfileData {
    displayName: string;
    email: string;
    company: string;
    phone: string;
    stripeCustomerId: string;
    subscriptionStatus: 'active' | 'past_due' | 'canceled' | 'none';
    subscriptionTier: 'management' | 'custom' | 'none';
    monthlyRate: number;
    nextPaymentDate: string | null; // ISO string on client
    createdAt: string;
    updatedAt: string;
    notes: string;
}

export interface InvoiceData {
    id: string;
    stripeInvoiceId: string;
    amountPaid: number;
    amountDue: number;
    currency: string;
    status: 'paid' | 'open' | 'void' | 'uncollectible' | 'draft';
    description: string;
    invoicePdf: string | null;
    periodStart: string;
    periodEnd: string;
    createdAt: string;
}

export interface ProjectData {
    id: string;
    name: string;
    type: string;
    status: string;
    progress: number;
    milestones: { name: string; status: string }[];
    createdAt: string;
    updatedAt: string;
}

export interface ActivityItem {
    id: string;
    type: string;
    message: string;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    clientProfile: ClientProfileData | null;
    invoices: InvoiceData[];
    projects: ProjectData[];
    activity: ActivityItem[];
    profileLoading: boolean;
    refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    clientProfile: null,
    invoices: [],
    projects: [],
    activity: [],
    profileLoading: true,
    refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

