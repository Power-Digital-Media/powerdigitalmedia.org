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
        const demoCompany = typeof window !== 'undefined' ? localStorage.getItem('pdm_demo_company') : null;
        if (demoCompany) {
            console.log("⚡ Sandbox Active: Loading mock credentials for", demoCompany);
            
            const companyName = demoCompany === 'tbeauxs' ? "Tbeaux's Crawfish" 
                : demoCompany === 'ms-dirt' ? "Geaux Pro Outdoors" 
                : "Powered By Peptides";

            const monthlyRate = demoCompany === 'tbeauxs' ? 1200 
                : demoCompany === 'ms-dirt' ? 2500 
                : 3000;

            const subscriptionTier = demoCompany === 'tbeauxs' ? "management" : "custom";

            const mockUser = {
                uid: "demo-client-uid",
                email: `${demoCompany}@powerdigitalmedia.org`,
                displayName: companyName,
                getIdToken: async () => "demo-bypass-token"
            } as unknown as User;

            setUser(mockUser);
            
            setClientProfile({
                displayName: companyName,
                email: `${demoCompany}@powerdigitalmedia.org`,
                company: companyName,
                phone: "(601) 555-0199",
                stripeCustomerId: `cus_demo_${demoCompany}`,
                subscriptionStatus: 'active',
                subscriptionTier: subscriptionTier as any,
                monthlyRate: monthlyRate,
                nextPaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                notes: "Express Sandbox Access Bypass."
            });

            setInvoices([
                {
                    id: "inv_demo_1",
                    stripeInvoiceId: "in_demo_001",
                    amountPaid: monthlyRate,
                    amountDue: 0,
                    currency: "usd",
                    status: "paid",
                    description: `${companyName} - Monthly Retainer`,
                    invoicePdf: "#",
                    periodStart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    periodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
                    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                },
                {
                    id: "inv_demo_2",
                    stripeInvoiceId: "in_demo_002",
                    amountPaid: monthlyRate,
                    amountDue: 0,
                    currency: "usd",
                    status: "paid",
                    description: `${companyName} - Monthly Retainer`,
                    invoicePdf: "#",
                    periodStart: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
                    periodEnd: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
                }
            ]);

            setProjects([
                {
                    id: "proj_demo_1",
                    name: demoCompany === 'tbeauxs' ? "Tbeaux's Crawfish Showcase" : demoCompany === 'ms-dirt' ? "Geaux Pro Excavation Platform" : "Supplements E-Commerce Hub",
                    type: "web-design",
                    status: "deployed",
                    progress: 100,
                    milestones: [
                        { name: "Discovery Call", status: "completed" },
                        { name: "Interface Architecture", status: "completed" },
                        { name: "Production Deployment", status: "completed" }
                    ],
                    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: "proj_demo_2",
                    name: "Local SEO Blitz Campaign",
                    type: "seo",
                    status: "engineering",
                    progress: 75,
                    milestones: [
                        { name: "Entity Auditing", status: "completed" },
                        { name: "Local GSC Setup", status: "completed" },
                        { name: "First-Page Dominance Sprint", status: "current" }
                    ],
                    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString(),
                }
            ]);

            setActivity([
                {
                    id: "act_1",
                    type: "milestone",
                    message: "Local SEO Blitz Campaign transitioned to Engineering phase.",
                    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                },
                {
                    id: "act_2",
                    type: "payment",
                    message: `Stripe Payment received for Invoice #in_demo_001 ($${monthlyRate}.00 USD)`,
                    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                },
                {
                    id: "act_3",
                    type: "login",
                    message: "Bypass access handshake authenticated via Express sandbox.",
                    createdAt: new Date().toISOString(),
                }
            ]);

            setLoading(false);
            setProfileLoading(false);
            return;
        }

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
