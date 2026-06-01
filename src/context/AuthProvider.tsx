"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AuthContext, ClientProfileData, InvoiceData, ProjectData, ActivityItem } from './AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [clientProfile, setClientProfile] = useState<ClientProfileData | null>(null);
    const [invoices, setInvoices] = useState<InvoiceData[]>([]);
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [activity, setActivity] = useState<ActivityItem[]>([]);
    const [profileLoading, setProfileLoading] = useState(true);

    const fetchProfile = useCallback(async (uid: string) => {
        try {
            setProfileLoading(true);
            const res = await fetch(`/api/dashboard?uid=${uid}`);

            if (res.status === 404) {
                // Profile doesn't exist yet — trigger onboarding
                setClientProfile(null);
                setInvoices([]);
                setProjects([]);
                setActivity([]);
                setProfileLoading(false);
                return;
            }

            if (!res.ok) {
                console.warn('Failed to fetch client profile');
                setClientProfile(null);
                setInvoices([]);
                setProjects([]);
                setActivity([]);
                setProfileLoading(false);
                return;
            }

            const data = await res.json();
            setClientProfile(data.profile || null);
            setInvoices(data.invoices || []);
            setProjects(data.projects || []);
            setActivity(data.activity || []);
        } catch (error) {
            console.error('Profile fetch error:', error);
            setClientProfile(null);
            setInvoices([]);
            setProjects([]);
            setActivity([]);
        } finally {
            setProfileLoading(false);
        }
    }, []);

    const refreshProfile = useCallback(async () => {
        if (user?.uid) {
            await fetchProfile(user.uid);
        }
    }, [user, fetchProfile]);

    useEffect(() => {
        if (!auth) {
            console.warn("⚠️ Firebase Auth object is null. Skipping authentication state subscription.");
            setLoading(false);
            setProfileLoading(false);
            return () => {};
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);

            if (firebaseUser) {
                await fetchProfile(firebaseUser.uid);
            } else {
                setClientProfile(null);
                setInvoices([]);
                setProjects([]);
                setActivity([]);
                setProfileLoading(false);
            }
        });

        return () => unsubscribe();
    }, [fetchProfile]);

    return (
        <AuthContext.Provider value={{ user, loading, clientProfile, invoices, projects, activity, profileLoading, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
