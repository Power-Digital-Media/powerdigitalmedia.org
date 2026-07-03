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
            
            let companyName = "Power Digital Media";
            let monthlyRate = 1500;
            let subscriptionTier = "custom";
            let defaultEmail = "info@powerdigitalmedia.org";
            let primaryPhone = "(601) 300-2004";

            if (demoCompany === 'tbeauxs') {
                companyName = "Tbeaux's Crawfish";
                monthlyRate = 1200;
                subscriptionTier = "management";
                defaultEmail = "crawfish@tbeauxs.com";
                primaryPhone = "(601) 720-4574";
            } else if (demoCompany === 'ms-dirt') {
                companyName = "Geaux Pro Outdoors";
                monthlyRate = 550;
                subscriptionTier = "management";
                defaultEmail = "office@msdirt.com";
                primaryPhone = "(601) 896-2664";
            } else if (demoCompany === 'powered-by-peptides') {
                companyName = "Powered By Peptides";
                monthlyRate = 3000;
                subscriptionTier = "custom";
                defaultEmail = "info@poweredbypeptides.com";
                primaryPhone = "(601) 555-0199";
            } else if (demoCompany === 'pastors-provision') {
                companyName = "Pastor's Provision";
                monthlyRate = 1500;
                subscriptionTier = "custom";
                defaultEmail = "director@pastorsprovision.com";
                primaryPhone = "(601) 555-0211";
            } else if (demoCompany === 'church-244') {
                companyName = "Church 244";
                monthlyRate = 1000;
                subscriptionTier = "management";
                defaultEmail = "josh@church244.com";
                primaryPhone = "(601) 555-0244";
            } else if (demoCompany === 'blacksheep-recovery') {
                companyName = "Black Sheep Recovery";
                monthlyRate = 1800;
                subscriptionTier = "custom";
                defaultEmail = "danny@blacksheeprecoverywarfare.com";
                primaryPhone = "(601) 555-0312";
            } else if (demoCompany === 'simmons-memorial') {
                companyName = "Simmons Memorial";
                monthlyRate = 800;
                subscriptionTier = "management";
                defaultEmail = "contact@simmonsmemorial.org";
                primaryPhone = "(601) 555-0450";
            } else if (demoCompany === 'tew-and-company') {
                companyName = "Tew & Company";
                monthlyRate = 2000;
                subscriptionTier = "custom";
                defaultEmail = "tew@tewandcompany.com";
                primaryPhone = "(601) 555-0580";
            }

            const mockUser = {
                uid: "demo-client-uid",
                email: defaultEmail,
                displayName: companyName,
                getIdToken: async () => "demo-bypass-token"
            } as unknown as User;

            setUser(mockUser);
            
            setClientProfile({
                displayName: companyName,
                email: defaultEmail,
                company: companyName,
                phone: primaryPhone,
                stripeCustomerId: `cus_demo_${demoCompany}`,
                subscriptionStatus: 'active',
                subscriptionTier: subscriptionTier as any,
                monthlyRate: monthlyRate,
                nextPaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                notes: "Express Sandbox Access Bypass."
            });

            let mockInvoices: InvoiceData[] = [
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
            ];

            if (demoCompany === 'ms-dirt') {
                mockInvoices = [
                    {
                        id: "inv_demo_gp_1",
                        stripeInvoiceId: "in_demo_gp001",
                        amountPaid: 550,
                        amountDue: 0,
                        currency: "usd",
                        status: "paid",
                        description: `${companyName} - Management & Hosting Retainer`,
                        invoicePdf: "#",
                        periodStart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                        periodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
                        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    },
                    {
                        id: "inv_demo_gp_2",
                        stripeInvoiceId: "in_demo_gp002",
                        amountPaid: 550,
                        amountDue: 0,
                        currency: "usd",
                        status: "paid",
                        description: `${companyName} - Management & Hosting Retainer`,
                        invoicePdf: "#",
                        periodStart: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
                        periodEnd: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
                    },
                    {
                        id: "inv_demo_gp_3",
                        stripeInvoiceId: "in_demo_gp003",
                        amountPaid: 1500,
                        amountDue: 0,
                        currency: "usd",
                        status: "paid",
                        description: `${companyName} - Premium Website Design Production`,
                        invoicePdf: "#",
                        periodStart: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
                        periodEnd: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
                        createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
                    }
                ];
            }

            setInvoices(mockInvoices);

            let project1Name = "Supplements E-Commerce Hub";
            let project2Name = "Local SEO Blitz Campaign";
            let project2Progress = 75;
            let currentMilestone = "First-Page Dominance Sprint";

            if (demoCompany === 'tbeauxs') {
                project1Name = "Tbeaux's Crawfish Showcase";
            } else if (demoCompany === 'ms-dirt') {
                project1Name = "Geaux Pro Excavation Platform";
            } else if (demoCompany === 'pastors-provision') {
                project1Name = "Pastors Provision Care Portal";
                project2Name = "Organic B2B SEO Campaign";
                project2Progress = 65;
            } else if (demoCompany === 'church-244') {
                project1Name = "Church 244 Mobilization App";
                project2Name = "Google Maps Map Pack Domination";
                project2Progress = 80;
                currentMilestone = "Map Pack Rank Blitz";
            } else if (demoCompany === 'blacksheep-recovery') {
                project1Name = "Recovery Crisis Landing App";
                project2Name = "B2B Video Podcast Streaming Hub";
                project2Progress = 50;
                currentMilestone = "Video Layout Deployment";
            } else if (demoCompany === 'simmons-memorial') {
                project1Name = "Simmons Memorial Legacy Site";
                project2Name = "A11y Accessibility Audit & Compliance";
                project2Progress = 90;
                currentMilestone = "ARIA Audit Pass";
            } else if (demoCompany === 'tew-and-company') {
                project1Name = "Tew B2B Consultancy Hub";
                project2Name = "Stripe Payments & Visual Opportunity Pipeline";
                project2Progress = 70;
                currentMilestone = "Stripe Sync Gateway Webhook";
            }

            setProjects([
                {
                    id: "proj_demo_1",
                    name: project1Name,
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
                    name: project2Name,
                    type: "seo",
                    status: "engineering",
                    progress: project2Progress,
                    milestones: [
                        { name: "Entity Auditing", status: "completed" },
                        { name: "Local GSC Setup", status: "completed" },
                        { name: currentMilestone, status: "current" }
                    ],
                    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString(),
                }
            ]);


            let mockActivity = [
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
            ];

            if (demoCompany === 'ms-dirt') {
                mockActivity = [
                    {
                        id: "act_1",
                        type: "milestone",
                        message: "Geaux Pro Excavation Platform launched on Netlify Edge CDN.",
                        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
                    },
                    {
                        id: "act_2",
                        type: "payment",
                        message: `Stripe Payment received for Invoice #in_demo_gp001 ($550.00 USD)`,
                        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    },
                    {
                        id: "act_3",
                        type: "payment",
                        message: `Stripe Payment received for Invoice #in_demo_gp003 ($1,500.00 USD)`,
                        createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
                    },
                    {
                        id: "act_4",
                        type: "login",
                        message: "Bypass access handshake authenticated via Express sandbox.",
                        createdAt: new Date().toISOString(),
                    }
                ];
            }

            setActivity(mockActivity);

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
