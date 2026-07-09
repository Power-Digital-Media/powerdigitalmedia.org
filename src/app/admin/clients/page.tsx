"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Terminal,
    Users,
    DollarSign,
    Plus,
    Trash2,
    Calendar,
    ListTodo,
    Briefcase,
    CreditCard,
    ArrowLeft,
    TrendingUp,
    AlertTriangle,
    Loader2,
    Settings,
    FileText,
    Globe,
    Layers,
    X,
    Mail,
    CheckSquare,
    Square,
    MessageSquare,
    Send,
    Sparkles,
    Eye,
    Search
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AdminGuard from "@/components/auth/AdminGuard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

interface ApiKey {
    id: string;
    serviceName: string;
    apiKey: string;
    notes: string;
}

interface Client {
    id: string;
    name: string;
    companyName: string;
    phone: string;
    email: string;
    website: string;
    status: string;
    businessType: string;
    monthlyValue: number;
    setupFee: number;
    startDate: string;
    nextFollowUp: string;
    primaryNeed: string;
    notes: string;
    clientStatus?: 'active' | 'paused' | 'past_client' | 'lost' | 'lead';
    clientType?: string;
    priorityLevel?: 'low' | 'normal' | 'high' | 'VIP';
    paymentTerms?: string;
    billingMethod?: string;
    accountOwner?: string;
    nextFollowUpDate?: string;
    currentNeed?: string;
    internalNotes?: string;
    archived?: boolean;
    apiKeys?: ApiKey[];
}

interface Contact {
    id: string;
    clientId: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    preferredContactMethod: 'call' | 'text' | 'email' | 'Messenger';
    decisionMaker: 'yes' | 'no';
    billingContact: 'yes' | 'no';
    emergencyContact: 'yes' | 'no';
    notes?: string;
}

interface Service {
    id: string;
    clientName: string;
    serviceName: string;
    category: string;
    price: number;
    billingType: string; // Monthly, One-Time, Yearly, Hourly
    status: string; // Proposed, Active, In Progress, Paused, Completed, Cancelled
    startDate: string;
    endDate?: string;
    notes: string;
    costToYou?: number;
    profitEstimate?: number;
    renewalDate?: string;
    deliverables?: string;
    includedHours?: number;
    overageRate?: number;
}

interface Payment {
    id: string;
    clientName: string;
    invoiceNum: string;
    invoiceDate: string;
    amount: number;
    dueDate: string;
    status: string; // Paid, Unpaid, Overdue, Partial, Cancelled, Sent
    paymentDate: string;
    paymentMethod: string; // Card, Check, Bank Transfer, Stripe, Cash, Cash App, Other
    relatedService: string;
    notes: string;
    taxSettled?: boolean; // Tracks if 30% was transferred to tax vault
    amountBilled?: number;
    amountPaid?: number;
    balanceDue?: number;
    recurring?: boolean;
    periodStart?: string;
    periodEnd?: string;
}

interface Task {
    id: string;
    clientName: string;
    taskName: string;
    priority: string; // Low, Medium, High, Urgent
    status: string; // Not Started, In Progress, Waiting on Client, Waiting on Vendor, Completed
    dueDate: string;
    waitingOn?: string;
    blockerNotes?: string;
    relatedService: string;
    notes: string;
}

interface Project {
    id: string;
    clientId: string;
    projectName: string;
    projectType: string;
    status: 'planning' | 'active' | 'waiting' | 'completed' | 'cancelled';
    startDate: string;
    targetLaunchDate: string;
    actualLaunchDate?: string;
    budget: number;
    scopeSummary: string;
    outOfScope?: string;
    approvalStatus: 'not sent' | 'sent' | 'approved' | 'revision requested';
    waitingOn?: string;
    blockerNotes?: string;
    notes?: string;
}

interface Platform {
    id: string;
    clientName: string; // E.g., Power Digital (Overhead) or client name
    platformName: string;
    type: string; // CRM, Hosting, Domain, Email Marketing, Payment Processor, etc.
    loginEmail: string;
    planName: string;
    status: string; // Active, Paused, Cancelled
    monthlyCost: number;
    paidBy: string; // Power Digital, Client, Included
    renewalDate: string;
    accessLevel: string;
    notes: string;
    accessStatus?: 'active' | 'needs_access' | 'blocked_by_2fa' | 'revoked' | 'unknown';
    twoFactorEnabled?: 'yes' | 'no';
    twoFactorMethod?: string;
    twoFactorOwner?: string;
    recoveryEmail?: string;
    secretLocation?: string; // Reference to Bitwarden location
    apiKeyLocation?: string;
    lastVerifiedDate?: string;
}

interface DomainHosting {
    id: string;
    clientName: string;
    domainName: string;
    registrar: string;
    hostingProvider: string;
    renewalDate: string;
    annualCost: number;
    autoRenew: string; // Yes, No
    paidBy: string;
    ownerOfRecord: string;
    notes: string;
    productionUrl?: string;
    stagingUrl?: string;
    repoUrl?: string;
    framework?: string;
    deploymentProvider?: string;
    lastDeploymentDate?: string;
}

interface SalesLead {
    id: string;
    businessName: string;
    contactName: string;
    phone: string;
    email: string;
    source: string;
    opportunity: string;
    estValue: number;
    stage: string; // New Lead, Contacted, Meeting Set, Proposal Sent, Won, Lost, Follow Up Later
    lastContact: string;
    nextFollowUp: string;
    nextStep: string;
    notes: string;
}

interface ClientNote {
    id: string;
    clientName: string;
    date: string;
    noteType: string; // Call Log, Meeting, Email, Internal, Other
    title: string;
    body: string;
    followUpNeeded: string; // Yes, No
    followUpDate: string;
}

interface Campaign {
    id: string;
    clientId: string;
    campaignName: string;
    campaignType: string;
    platform: string;
    budget: number;
    startDate: string;
    endDate: string;
    objective: string;
    status: 'planning' | 'active' | 'paused' | 'completed';
    creativeLinks?: string;
    results?: string;
    notes?: string;
}

interface Deliverable {
    id: string;
    clientId: string;
    serviceId: string;
    deliverableName: string;
    quantity: number;
    frequency: 'weekly' | 'monthly' | 'one-time';
    dueDate: string;
    status: 'not_started' | 'in_progress' | 'delivered' | 'approved';
    deliveryUrl?: string;
    approvalStatus: 'pending' | 'approved' | 'revision requested';
    notes?: string;
}

interface Asset {
    id: string;
    clientId: string;
    assetType: 'logo' | 'photos' | 'video' | 'contract' | 'invoice' | 'report' | 'ad_creative' | 'other';
    assetName: string;
    fileUrl: string;
    usageRights: string;
    notes?: string;
}

interface TimeEntry {
    id: string;
    clientId: string;
    projectId?: string;
    date: string;
    hours: number;
    rate: number;
    billable: boolean;
    description: string;
    invoiced: boolean;
}

interface ComplianceItem {
    id: string;
    clientId: string;
    itemType: string;
    status: 'needed' | 'in_progress' | 'completed' | 'not_applicable';
    policyUrl?: string;
    optInLanguageAdded: boolean;
    optOutLanguageAdded: boolean;
    lastReviewedDate?: string;
    notes?: string;
}

interface NexusDb {
    clients: Client[];
    services: Service[];
    payments: Payment[];
    tasks: Task[];
    platforms: Platform[];
    domainsHosting: DomainHosting[];
    salesPipeline: SalesLead[];
    notes: ClientNote[];
    contacts: Contact[];
    projects: Project[];
    campaigns: Campaign[];
    deliverables: Deliverable[];
    assets: Asset[];
    timeEntries: TimeEntry[];
    complianceItems: ComplianceItem[];
    chatHistory?: ChatMessage[];
}

type TabType = 'clients' | 'services' | 'payments' | 'tasks' | 'platforms' | 'domainsHosting' | 'salesPipeline' | 'notes' | 'contacts' | 'projects' | 'campaigns' | 'deliverables' | 'assets' | 'timeEntries' | 'complianceItems';

interface ChatMessage {
    sender: "user" | "ai" | "system";
    text: string;
}

export default function ExcelAlignedNexusRegistry() {
    const { user } = useAuth();
    const [db, setDb] = useState<NexusDb>({
        clients: [],
        services: [],
        payments: [],
        tasks: [],
        platforms: [],
        domainsHosting: [],
        salesPipeline: [],
        notes: [],
        contacts: [],
        projects: [],
        campaigns: [],
        deliverables: [],
        assets: [],
        timeEntries: [],
        complianceItems: [],
        chatHistory: []
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    // Detail Drawer
    const [selectedDetailClient, setSelectedDetailClient] = useState<Client | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('clients');
    const [clientsViewMode, setClientsViewMode] = useState<'grid' | 'spreadsheet'>('grid');

    // Modals
    const [openModal, setOpenModal] = useState<TabType | null>(null);
    const [sendingInvoiceId, setSendingInvoiceId] = useState<string | null>(null);

    // AI Drawer States
    const [isAiOpen, setIsAiOpen] = useState(false);
    const [aiInput, setAiInput] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [aiMessages, setAiMessages] = useState<ChatMessage[]>([
        {
            sender: "ai",
            text: "Hello Damein! I am your PDM-Assistant. Tell me what you'd like to log (e.g. checks, cash, tasks, subscriptions) or ask me questions about your overhead and net profit!"
        }
    ]);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Form Hooks: API Keys
    const [newApiKeyService, setNewApiKeyService] = useState("");
    const [newApiKeyValue, setNewApiKeyValue] = useState("");
    const [newApiKeyNotes, setNewApiKeyNotes] = useState("");
    const [chatProjectContext, setChatProjectContext] = useState("");

    // Form Hooks: Client
    const [cName, setCName] = useState("");
    const [cCompany, setCCompany] = useState("");
    const [cPhone, setCPhone] = useState("");
    const [cEmail, setCEmail] = useState("");
    const [cWeb, setCWeb] = useState("");
    const [cStatus, setCStatus] = useState("Active");
    const [cType, setCType] = useState("B2B");
    const [cVal, setCVal] = useState(0);
    const [cSetup, setCSetup] = useState(0);
    const [cStart, setCStart] = useState("");
    const [cFollowUp, setCFollowUp] = useState("");
    const [cNeed, setCNeed] = useState("");
    const [cNotes, setCNotes] = useState("");

    // Form Hooks: Service
    const [sClient, setSClient] = useState("");
    const [sName, setSName] = useState("");
    const [sCat, setSCat] = useState("Website");
    const [sPrice, setSPrice] = useState(0);
    const [sBilling, setSBilling] = useState("Monthly");
    const [sStatus, setSStatus] = useState("Active");
    const [sStart, setSStart] = useState("");
    const [sEnd, setSEnd] = useState("");
    const [sNotes, setSNotes] = useState("");

    // Form Hooks: Payment
    const [pClient, setPClient] = useState("");
    const [pInvoice, setPInvoice] = useState("");
    const [pInvoiceDate, setPInvoiceDate] = useState("");
    const [pAmount, setPAmount] = useState(0);
    const [pDueDate, setPDueDate] = useState("");
    const [pStatus, setPStatus] = useState("Unpaid");
    const [pPayDate, setPPayDate] = useState("");
    const [pMethod, setPMethod] = useState("Stripe");
    const [pSvc, setPSvc] = useState("");
    const [pNotes, setPNotes] = useState("");

    // Form Hooks: Task
    const [tClient, setTClient] = useState("");
    const [tName, setTName] = useState("");
    const [tPriority, setTPriority] = useState("Medium");
    const [tStatus, setTStatus] = useState("Not Started");
    const [tDue, setTDue] = useState("");
    const [tWaiting, setTWaiting] = useState("");
    const [tSvc, setTSvc] = useState("");
    const [tNotes, setTNotes] = useState("");

    // Form Hooks: Platform (Overhead)
    const [plClient, setPlClient] = useState("Power Digital (Overhead)");
    const [plName, setPlName] = useState("");
    const [plType, setPlType] = useState("CRM");
    const [plEmail, setPlEmail] = useState("");
    const [plPlan, setPlPlan] = useState("");
    const [plStatus, setPlStatus] = useState("Active");
    const [plCost, setPlCost] = useState(0);
    const [plPaidBy, setPlPaidBy] = useState("Power Digital");
    const [plRenew, setPlRenew] = useState("");
    const [plAccess, setPlAccess] = useState("Admin");
    const [plNotes, setPlNotes] = useState("");

    // Form Hooks: Domain & Hosting
    const [dClient, setDClient] = useState("");
    const [dDomain, setDDomain] = useState("");
    const [dRegistrar, setDRegistrar] = useState("Namecheap");
    const [dHost, setDHost] = useState("Vercel Edge");
    const [dRenew, setDRenew] = useState("");
    const [dOwner, setDOwner] = useState("Client");
    const [dAuto, setDAuto] = useState("Yes");
    const [dCost, setDCost] = useState(0);
    const [dNotes, setDNotes] = useState("");

    // Form Hooks: Sales Lead
    const [slCompany, setSlCompany] = useState("");
    const [slContact, setSlContact] = useState("");
    const [slPhone, setSlPhone] = useState("");
    const [slEmail, setSlEmail] = useState("");
    const [slSource, setSlSource] = useState("");
    const [slOpp, setSlOpp] = useState("");
    const [slValue, setSlValue] = useState(0);
    const [slStage, setSlStage] = useState("New Lead");
    const [slLast, setSlLast] = useState("");
    const [slFollow, setSlFollow] = useState("");
    const [slNextStep, setSlNextStep] = useState("");
    const [slNotes, setSlNotes] = useState("");

    // Form Hooks: Client Note
    const [nClient, setNClient] = useState("");
    const [nDate, setNDate] = useState(new Date().toISOString().split('T')[0]);
    const [nType, setNType] = useState("Call Log");
    const [nTitle, setNTitle] = useState("");
    const [nBody, setNBody] = useState("");
    const [nFollowUpNeeded, setNFollowUpNeeded] = useState("No");
    const [nFollowUpDate, setNFollowUpDate] = useState("");

    const fetchDatabase = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const token = await user.getIdToken();
            const res = await fetch("/api/admin/nexus", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const payload = await res.json();
            if (res.ok && payload.success) {
                const normalized = {
                    clients: payload.data.clients || [],
                    services: payload.data.services || [],
                    payments: payload.data.payments || [],
                    tasks: payload.data.tasks || [],
                    platforms: payload.data.platforms || [],
                    domainsHosting: payload.data.domainsHosting || [],
                    salesPipeline: payload.data.salesPipeline || [],
                    notes: payload.data.notes || [],
                    contacts: payload.data.contacts || [],
                    projects: payload.data.projects || [],
                    campaigns: payload.data.campaigns || [],
                    deliverables: payload.data.deliverables || [],
                    assets: payload.data.assets || [],
                    timeEntries: payload.data.timeEntries || [],
                    complianceItems: payload.data.complianceItems || [],
                    chatHistory: payload.data.chatHistory || []
                };
                setDb(normalized);
                if (payload.data.chatHistory && payload.data.chatHistory.length > 0) {
                    setAiMessages(payload.data.chatHistory);
                }
            }
        } catch (err) {
            console.error("Failed to load registry database:", err);
        } finally {
            setLoading(false);
        }
    };

    const saveDatabase = async (updatedDb: NexusDb) => {
        if (!user) return;
        try {
            setSaving(true);
            const token = await user.getIdToken();
            const res = await fetch("/api/admin/nexus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedDb)
            });
            if (res.ok) {
                setDb(updatedDb);
            }
        } catch (err) {
            console.error("Failed to save registry database:", err);
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDatabase();
        }
    }, [user]);

    useEffect(() => {
        if (isAiOpen) {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [aiMessages, isAiOpen]);

    // Financial calculations matching spreadsheet rules
    const activeClientsCount = db.clients.filter(c => c.status === "Active").length;

    const getPaidThisMonth = (clientName: string) => {
        const currentMonth = new Date().toISOString().substring(0, 7);
        return db.payments
            .filter(p => p.clientName === clientName && p.status === "Paid" && p.paymentDate?.startsWith(currentMonth))
            .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    };

    const getOutstandingThisMonth = (clientName: string) => {
        const currentMonth = new Date().toISOString().substring(0, 7);
        return db.payments
            .filter(p => p.clientName === clientName && ["Unpaid", "Sent", "Overdue", "Partial"].includes(p.status) && p.dueDate?.startsWith(currentMonth))
            .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    };
    
    // MRR = Services that are Active and Monthly
    const monthlyRecurringValue = db.services
        .filter(s => s.status === "Active" && s.billingType === "Monthly")
        .reduce((sum, s) => sum + (Number(s.price) || 0), 0);

    // Monthly Overhead = Platform costs paid by "Power Digital"
    const monthlyOverheadValue = db.platforms
        .filter(p => p.status === "Active" && p.paidBy === "Power Digital")
        .reduce((sum, p) => sum + (Number(p.monthlyCost) || 0), 0);

    const netProfitMargin = monthlyRecurringValue - monthlyOverheadValue;

    // Total Amount Outstanding = Unpaid/Overdue/Sent/Partial Payments
    const totalAmountOutstanding = db.payments
        .filter(p => ["Unpaid", "Overdue", "Partial", "Sent"].includes(p.status))
        .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    // TAX VAULT CALCULATIONS (30% Rule)
    // Sum of all paid payments
    const totalInboundPaid = db.payments
        .filter(p => p.status === "Paid")
        .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    const estimatedTaxReserve = totalInboundPaid * 0.3;

    // Unsettled Tax = Paid payments where taxSettled is false (not yet transferred to savings)
    const unsettledTaxReserve = db.payments
        .filter(p => p.status === "Paid" && !p.taxSettled)
        .reduce((sum, p) => sum + (Number(p.amount) || 0), 0) * 0.3;

    const netOperatingCapital = totalInboundPaid - estimatedTaxReserve;

    // Form Submissions
    const handleAddClient = async (e: React.FormEvent) => {
        e.preventDefault();
        const item: Client = {
            id: `client-${Date.now()}`,
            name: cName,
            companyName: cCompany,
            phone: cPhone,
            email: cEmail,
            website: cWeb,
            status: cStatus,
            businessType: cType,
            monthlyValue: Number(cVal) || 0,
            setupFee: Number(cSetup) || 0,
            startDate: cStart || new Date().toISOString().split('T')[0],
            nextFollowUp: cFollowUp || new Date().toISOString().split('T')[0],
            primaryNeed: cNeed,
            notes: cNotes
        };
        const updated = { ...db, clients: [...db.clients, item] };
        await saveDatabase(updated);
        setOpenModal(null);
        setCName(""); setCCompany(""); setCPhone(""); setCEmail(""); setCWeb(""); setCVal(0); setCSetup(0); setCStart(""); setCFollowUp(""); setCNeed(""); setCNotes("");
    };

    const handleAddService = async (e: React.FormEvent) => {
        e.preventDefault();
        const item: Service = {
            id: `svc-${Date.now()}`,
            clientName: sClient,
            serviceName: sName,
            category: sCat,
            price: Number(sPrice) || 0,
            billingType: sBilling,
            status: sStatus,
            startDate: sStart || new Date().toISOString().split('T')[0],
            endDate: sEnd,
            notes: sNotes
        };
        const updated = { ...db, services: [...db.services, item] };
        await saveDatabase(updated);
        setOpenModal(null);
        setSClient(""); setSName(""); setSPrice(0); setSStart(""); setSEnd(""); setSNotes("");
    };

    const handleAddPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        const item: Payment = {
            id: `pay-${Date.now()}`,
            clientName: pClient,
            invoiceNum: pInvoice || `INV-${Date.now().toString().slice(-4)}`,
            invoiceDate: pInvoiceDate || new Date().toISOString().split('T')[0],
            amount: Number(pAmount) || 0,
            dueDate: pDueDate || new Date().toISOString().split('T')[0],
            status: pStatus,
            paymentDate: pPayDate,
            paymentMethod: pMethod,
            relatedService: pSvc,
            notes: pNotes,
            taxSettled: false
        };
        const updated = { ...db, payments: [...db.payments, item] };
        await saveDatabase(updated);
        setOpenModal(null);
        setPClient(""); setPInvoice(""); setPInvoiceDate(""); setPAmount(0); setPDueDate(""); setPPayDate(""); setPNotes("");
    };

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        const item: Task = {
            id: `task-${Date.now()}`,
            clientName: tClient,
            taskName: tName,
            priority: tPriority,
            status: tStatus,
            dueDate: tDue || new Date().toISOString().split('T')[0],
            waitingOn: tWaiting,
            relatedService: tSvc,
            notes: tNotes
        };
        const updated = { ...db, tasks: [...db.tasks, item] };
        await saveDatabase(updated);
        setOpenModal(null);
        setTClient(""); setTName(""); setTDue(""); setTWaiting(""); setTSvc(""); setTNotes("");
    };

    const handleAddPlatform = async (e: React.FormEvent) => {
        e.preventDefault();
        const item: Platform = {
            id: `plat-${Date.now()}`,
            clientName: plClient,
            platformName: plName,
            type: plType,
            loginEmail: plEmail,
            planName: plPlan,
            status: plStatus,
            monthlyCost: Number(plCost) || 0,
            paidBy: plPaidBy,
            renewalDate: plRenew || new Date().toISOString().split('T')[0],
            accessLevel: plAccess,
            notes: plNotes
        };
        const updated = { ...db, platforms: [...db.platforms, item] };
        await saveDatabase(updated);
        setOpenModal(null);
        setPlName(""); setPlEmail(""); setPlPlan(""); setPlCost(0); setPlRenew(""); setPlNotes("");
    };

    const handleAddDomain = async (e: React.FormEvent) => {
        e.preventDefault();
        const item: DomainHosting = {
            id: `dom-${Date.now()}`,
            clientName: dClient,
            domainName: dDomain,
            registrar: dRegistrar,
            hostingProvider: dHost,
            renewalDate: dRenew || new Date().toISOString().split('T')[0],
            ownerOfRecord: dOwner,
            autoRenew: dAuto,
            annualCost: Number(dCost) || 0,
            paidBy: "Client",
            notes: dNotes
        };
        const updated = { ...db, domainsHosting: [...db.domainsHosting, item] };
        await saveDatabase(updated);
        setOpenModal(null);
        setDClient(""); setDDomain(""); setDRenew(""); setDCost(0); setDNotes("");
    };

    const handleAddLead = async (e: React.FormEvent) => {
        e.preventDefault();
        const item: SalesLead = {
            id: `lead-${Date.now()}`,
            businessName: slCompany,
            contactName: slContact,
            phone: slPhone,
            email: slEmail,
            source: slSource,
            opportunity: slOpp,
            estValue: Number(slValue) || 0,
            stage: slStage,
            lastContact: slLast || new Date().toISOString().split('T')[0],
            nextFollowUp: slFollow || new Date().toISOString().split('T')[0],
            nextStep: slNextStep,
            notes: slNotes
        };
        const updated = { ...db, salesPipeline: [...db.salesPipeline, item] };
        await saveDatabase(updated);
        setOpenModal(null);
        setSlCompany(""); setSlContact(""); setSlPhone(""); setSlEmail(""); setSlSource(""); setSlOpp(""); setSlValue(0); setSlLast(""); setSlFollow(""); setSlNextStep(""); setSlNotes("");
    };

    const handleAddNote = async (e: React.FormEvent) => {
        e.preventDefault();
        const item: ClientNote = {
            id: `note-${Date.now()}`,
            clientName: nClient,
            date: nDate,
            noteType: nType,
            title: nTitle,
            body: nBody,
            followUpNeeded: nFollowUpNeeded,
            followUpDate: nFollowUpDate
        };
        const updated = { ...db, notes: [...db.notes, item] };
        await saveDatabase(updated);
        setOpenModal(null);
        setNClient(""); setNTitle(""); setNBody(""); setNFollowUpDate("");
    };

    const handleAddApiKey = async (clientId: string) => {
        if (!newApiKeyService || !newApiKeyValue) return;
        const newKey: ApiKey = {
            id: `key-${Date.now()}`,
            serviceName: newApiKeyService,
            apiKey: newApiKeyValue,
            notes: newApiKeyNotes
        };
        const updatedClients = db.clients.map(c => {
            if (c.id === clientId) {
                return {
                    ...c,
                    apiKeys: [...(c.apiKeys || []), newKey]
                };
            }
            return c;
        });
        const updatedDb = { ...db, clients: updatedClients };
        await saveDatabase(updatedDb);
        
        // Also update selectedDetailClient state so the UI stays in sync!
        const matchingClient = updatedClients.find(c => c.id === clientId);
        if (matchingClient) {
            setSelectedDetailClient(matchingClient);
        }

        setNewApiKeyService("");
        setNewApiKeyValue("");
        setNewApiKeyNotes("");
    };

    const handleDeleteApiKey = async (clientId: string, keyId: string) => {
        if (!confirm("Are you sure you want to delete this API Key?")) return;
        const updatedClients = db.clients.map(c => {
            if (c.id === clientId) {
                return {
                    ...c,
                    apiKeys: (c.apiKeys || []).filter(k => k.id !== keyId)
                };
            }
            return c;
        });
        const updatedDb = { ...db, clients: updatedClients };
        await saveDatabase(updatedDb);

        const matchingClient = updatedClients.find(c => c.id === clientId);
        if (matchingClient) {
            setSelectedDetailClient(matchingClient);
        }
    };

    // Global deletion
    const handleDeleteRecord = async (table: TabType, id: string) => {
        if (!confirm("Are you sure you want to delete this ledger entry?")) return;
        const updated = {
            ...db,
            [table]: db[table].filter((item: any) => item.id !== id)
        };
        await saveDatabase(updated);
    };

    // Toggle Tax Settled
    const handleToggleTaxSettled = async (paymentId: string) => {
        const updatedPayments = db.payments.map((p) => {
            if (p.id === paymentId) {
                return { ...p, taxSettled: !p.taxSettled };
            }
            return p;
        });
        await saveDatabase({ ...db, payments: updatedPayments });
    };

    // Email Invoice Dispatcher
    const handleSendInvoiceEmail = async (paymentId: string) => {
        if (!user) return;
        setSendingInvoiceId(paymentId);
        try {
            const token = await user.getIdToken();
            const res = await fetch("/api/admin/payments/invoice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ paymentId })
            });
            const data = await res.json();
            if (res.ok) {
                alert(data.message || "Invoice successfully emailed to client!");
                await fetchDatabase();
            } else {
                alert(`Error: ${data.error || 'Failed to dispatch invoice.'}`);
            }
        } catch (err) {
            console.error("Error emailing invoice:", err);
            alert("Network error occurred while emailing invoice.");
        } finally {
            setSendingInvoiceId(null);
        }
    };

    // AI Command Send Handler
    const handleSendAiMessage = async (overrideText?: string) => {
        const text = overrideText || aiInput;
        if (!text || !text.trim() || !user) return;

        setAiMessages((prev) => [...prev, { sender: "user", text }]);
        if (!overrideText) setAiInput("");
        setAiLoading(true);

        try {
            const token = await user.getIdToken();
            const res = await fetch("/api/admin/nexus/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ message: text, projectContext: chatProjectContext })
            });
            const payload = await res.json();
            if (res.ok && payload.success) {
                if (payload.data) {
                    const normalized = {
                        clients: payload.data.clients || [],
                        services: payload.data.services || [],
                        payments: payload.data.payments || [],
                        tasks: payload.data.tasks || [],
                        platforms: payload.data.platforms || [],
                        domainsHosting: payload.data.domainsHosting || [],
                        salesPipeline: payload.data.salesPipeline || [],
                        notes: payload.data.notes || [],
                        contacts: payload.data.contacts || [],
                        projects: payload.data.projects || [],
                        campaigns: payload.data.campaigns || [],
                        deliverables: payload.data.deliverables || [],
                        assets: payload.data.assets || [],
                        timeEntries: payload.data.timeEntries || [],
                        complianceItems: payload.data.complianceItems || [],
                        chatHistory: payload.data.chatHistory || []
                    };
                    setDb(normalized);
                    if (payload.data.chatHistory && payload.data.chatHistory.length > 0) {
                        setAiMessages(payload.data.chatHistory);
                    }
                } else {
                    setAiMessages((prev) => [...prev, { sender: "ai", text: payload.reply }]);
                }
            } else {
                setAiMessages((prev) => [...prev, { sender: "system", text: payload.error || "Failed to process AI command." }]);
            }
        } catch (err) {
            console.error("AI command failed:", err);
            setAiMessages((prev) => [...prev, { sender: "system", text: "A network error occurred." }]);
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <AdminGuard>
            <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
                <Navbar />

                {/* Sub-Nav / HUD Breadcrumbs */}
                <div className="absolute top-24 left-0 w-full border-b border-white/5 py-3 bg-black/40 backdrop-blur-md z-20">
                    <div className="container px-6 mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em]">
                            <Link href="/admin" className="text-white/20 hover:text-white transition-colors">Nexus HUD</Link>
                            <span className="text-white/20">/</span>
                            <span className="text-accent">Spreadsheet Registry</span>
                        </div>
                        <div className="flex items-center gap-3">
                            {saving ? (
                                <>
                                    <Loader2 className="w-3 h-3 text-accent animate-spin" />
                                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Committing Writes...</span>
                                </>
                            ) : (
                                <>
                                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Sync Active — PDM Aligned</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <section className="relative pt-48 pb-24">
                    <div className="container px-6 mx-auto space-y-12">
                        
                        {/* Title HUD */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                                        <Layers className="w-5 h-5 text-accent" />
                                    </div>
                                    <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
                                        Nexus <span className="text-accent">Registry</span>
                                    </h1>
                                </div>
                                <p className="text-white/40 font-medium italic text-sm">
                                    Aligned with `PDM_Client_Records_Template.xlsx`. Digital tracking for clients, finance, and overhead.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setIsAiOpen(true)}
                                    className="px-5 py-3.5 rounded-xl border border-accent/30 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-black transition-all flex items-center gap-2"
                                >
                                    <Sparkles className="w-4 h-4" /> Ask Nexus AI
                                </button>
                                <button
                                    onClick={() => setOpenModal(activeTab)}
                                    className="px-5 py-3.5 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" /> Add Record
                                </button>
                            </div>
                        </div>

                        {/* Top KPI Metrics HUD */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="p-8 rounded-[2rem] glass-card border-white/5 bg-white/[0.02]">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Active Clients</span>
                                    <Users className="w-4 h-4 text-accent" />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight">{activeClientsCount}</h3>
                                <p className="text-[9px] text-white/30 mt-2 font-bold uppercase tracking-widest">Ongoing Accounts</p>
                            </div>

                            <div className="p-8 rounded-[2rem] glass-card border-white/5 bg-white/[0.02]">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Monthly Value (MRR)</span>
                                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight">${monthlyRecurringValue.toLocaleString()}</h3>
                                <p className="text-[9px] text-emerald-400 mt-2 font-bold uppercase tracking-widest">Active Services Retainer</p>
                            </div>

                            <div className="p-8 rounded-[2rem] glass-card border-white/5 bg-white/[0.02]">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Monthly Overhead</span>
                                    <Settings className="w-4 h-4 text-red-400" />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight">${monthlyOverheadValue.toLocaleString()}</h3>
                                <p className="text-[9px] text-red-400 mt-2 font-bold uppercase tracking-widest">
                                    Net Profit Margin: ${netProfitMargin.toLocaleString()}
                                </p>
                            </div>

                            <div className="p-8 rounded-[2rem] glass-card border-white/5 bg-white/[0.02]">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Outstanding</span>
                                    <DollarSign className="w-4 h-4 text-blue-400" />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight">${totalAmountOutstanding.toLocaleString()}</h3>
                                <p className="text-[9px] text-blue-400 mt-2 font-bold uppercase tracking-widest">Open Invoice Balances</p>
                            </div>
                        </div>

                        {/* TAX VAULT HUD & LEDGER PANEL */}
                        {(activeTab === 'payments' || activeTab === 'clients') && (
                            <div className="p-8 rounded-[2rem] glass-card border-accent/20 bg-accent/[0.02] grid gap-6 md:grid-cols-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Total Inbound Payments</span>
                                    </div>
                                    <h4 className="text-2xl font-black">${totalInboundPaid.toLocaleString()}</h4>
                                    <p className="text-[9px] text-white/30 mt-1">Cleared Cash/Checks/Stripe</p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-4 h-4 text-accent" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-accent">Est. Tax Liability (30%)</span>
                                    </div>
                                    <h4 className="text-2xl font-black text-accent">${estimatedTaxReserve.toLocaleString()}</h4>
                                    <p className="text-[9px] text-white/30 mt-1">
                                        Unsettled Reserve: <span className="font-bold text-white/80">${unsettledTaxReserve.toLocaleString()}</span>
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <CreditCard className="w-4 h-4 text-blue-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Net Operating Capital</span>
                                    </div>
                                    <h4 className="text-2xl font-black text-blue-400">${netOperatingCapital.toLocaleString()}</h4>
                                    <p className="text-[9px] text-white/30 mt-1">Operational Safe Zone</p>
                                </div>
                            </div>
                        )}

                        {/* Navigation Tabs */}
                        <div className="flex overflow-x-auto border-b border-white/5 pb-2 gap-6 scrollbar-hide">
                            {([
                                { key: 'clients', label: 'Clients' },
                                { key: 'contacts', label: 'Contacts' },
                                { key: 'services', label: 'Services' },
                                { key: 'projects', label: 'Projects' },
                                { key: 'tasks', label: 'Tasks' },
                                { key: 'payments', label: 'Payments' },
                                { key: 'platforms', label: 'Platforms (Overhead)' },
                                { key: 'domainsHosting', label: 'Domains & Hosting' },
                                { key: 'campaigns', label: 'Campaigns' },
                                { key: 'deliverables', label: 'Deliverables' },
                                { key: 'assets', label: 'Brand Assets' },
                                { key: 'timeEntries', label: 'Time Tracking' },
                                { key: 'complianceItems', label: 'Compliance' },
                                { key: 'salesPipeline', label: 'Sales Pipeline' },
                                { key: 'notes', label: 'Notes' }
                            ] as { key: TabType, label: string }[]).map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`pb-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${activeTab === tab.key ? 'border-accent text-accent' : 'border-transparent text-white/40 hover:text-white'}`}
                                >
                                    {tab.label} ({db[tab.key]?.length || 0})
                                </button>
                            ))}
                        </div>

                        {/* Loading / Content Render */}
                        {loading ? (
                            <div className="py-24 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="w-8 h-8 text-accent animate-spin" />
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Loading Database Grid...</span>
                            </div>
                        ) : (
                            <div className="glass-card border-white/5 rounded-[2rem] bg-white/[0.01] overflow-hidden">
                                
                                {/* ─── 1. CLIENTS SHEET ─── */}
                                {/* ─── 1. CLIENTS GRID CARDS ─── */}
                                {activeTab === 'clients' && (
                                    <div className="p-8 space-y-6">
                                        {/* View Mode Toggle */}
                                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setClientsViewMode('grid')}
                                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${clientsViewMode === 'grid' ? 'bg-accent text-black' : 'bg-white/5 text-white/60 hover:text-white border border-white/5'}`}
                                                >
                                                    Bento Grid
                                                </button>
                                                <button
                                                    onClick={() => setClientsViewMode('spreadsheet')}
                                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${clientsViewMode === 'spreadsheet' ? 'bg-accent text-black' : 'bg-white/5 text-white/60 hover:text-white border border-white/5'}`}
                                                >
                                                    Spreadsheet List
                                                </button>
                                            </div>
                                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">
                                                Viewing {db.clients.length} Clients
                                            </span>
                                        </div>

                                        {clientsViewMode === 'grid' ? (
                                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                {db.clients.map((c) => {
                                                    const initials = c.companyName.split(" ").map((w: string) => w[0]).join("").substring(0, 2).toUpperCase();
                                                    const serviceCount = db.services.filter((s) => s.clientName === c.companyName).length;
                                                    const taskCount = db.tasks.filter((t) => t.clientName === c.companyName && t.status !== 'Completed').length;
                                                    
                                                    return (
                                                        <motion.div
                                                            key={c.id}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            whileHover={{ y: -4 }}
                                                            className="p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-accent/30 transition-all flex flex-col justify-between gap-6 cursor-pointer"
                                                            onClick={() => setSelectedDetailClient(c)}
                                                        >
                                                            {/* Card Header */}
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent/20 to-blue-500/20 border border-accent/20 flex items-center justify-center text-sm font-black text-accent">
                                                                        {initials}
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-bold text-white text-base leading-snug">{c.companyName}</h4>
                                                                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-0.5">{c.businessType}</p>
                                                                    </div>
                                                                </div>
                                                                <span className={`inline-block px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${c.status.toLowerCase().includes('active') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/50'}`}>
                                                                    {c.status}
                                                                </span>
                                                            </div>

                                                            {/* Primary Need */}
                                                            <p className="text-xs text-white/60 font-medium italic line-clamp-2 min-h-[2.5rem]">
                                                                "{c.primaryNeed || 'No primary need documented.'}"
                                                            </p>

                                                            {/* Card Stats */}
                                                            <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/5 text-center">
                                                                <div>
                                                                    <div className="text-[8px] font-black uppercase tracking-widest text-white/30">MRR</div>
                                                                    <div className="text-xs font-black text-white mt-1">${c.monthlyValue}</div>
                                                                </div>
                                                                <div>
                                                                    <div className="text-[8px] font-black uppercase tracking-widest text-white/30">Services</div>
                                                                    <div className="text-xs font-black text-accent mt-1">{serviceCount}</div>
                                                                </div>
                                                                <div>
                                                                    <div className="text-[8px] font-black uppercase tracking-widest text-white/30">Tasks</div>
                                                                    <div className="text-xs font-black text-blue-400 mt-1">{taskCount}</div>
                                                                </div>
                                                            </div>

                                                            {/* Card Footer Actions */}
                                                            <div className="flex items-center justify-between gap-3 pt-2" onClick={(e) => e.stopPropagation()}>
                                                                <div className="flex items-center gap-2 text-[10px] text-white/40">
                                                                    <Calendar className="w-3.5 h-3.5" />
                                                                    <span className="font-mono text-[9px]">{c.nextFollowUp}</span>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={() => setSelectedDetailClient(c)}
                                                                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center"
                                                                        title="View Consolidated Profile"
                                                                    >
                                                                        <Eye className="w-3.5 h-3.5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteRecord('clients', c.id)}
                                                                        className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all"
                                                                        title="Delete Client Record"
                                                                    >
                                                                        <Trash2 className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                                {db.clients.length === 0 && (
                                                    <div className="col-span-3 py-16 text-center text-white/20 italic">No client records found.</div>
                                                )}
                                            </div>
                                        ) : (
                                            /* SPREADSHEET LIST VIEW */
                                            <div className="overflow-x-auto border border-white/5 rounded-2xl bg-black/40">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-white/[0.02]">
                                                            <th className="py-4 px-6">Client / Company Name</th>
                                                            <th className="py-4 px-6">Contact Owner</th>
                                                            <th className="py-4 px-6">Status</th>
                                                            <th className="py-4 px-6 text-right">Monthly Retainer</th>
                                                            <th className="py-4 px-6 text-right text-emerald-400">Paid This Month</th>
                                                            <th className="py-4 px-6 text-right text-accent">Outstanding (Current Month)</th>
                                                            <th className="py-4 px-6 text-right">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {db.clients.map((c) => {
                                                            const paidVal = getPaidThisMonth(c.companyName);
                                                            const outstandingVal = getOutstandingThisMonth(c.companyName);
                                                            
                                                            return (
                                                                <tr key={c.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01] transition-all">
                                                                    <td className="py-4 px-6 font-bold cursor-pointer hover:text-accent" onClick={() => setSelectedDetailClient(c)}>
                                                                        {c.companyName}
                                                                    </td>
                                                                    <td className="py-4 px-6 text-white/60">{c.name}</td>
                                                                    <td className="py-4 px-6">
                                                                        <span className={`inline-block px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${c.status.toLowerCase().includes('active') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/40'}`}>
                                                                            {c.status}
                                                                        </span>
                                                                    </td>
                                                                    <td className="py-4 px-6 text-right font-mono font-bold">${c.monthlyValue}</td>
                                                                    <td className="py-4 px-6 text-right font-mono text-emerald-400 font-bold">${paidVal}</td>
                                                                    <td className="py-4 px-6 text-right font-mono text-accent font-bold">${outstandingVal}</td>
                                                                    <td className="py-4 px-6 text-right">
                                                                        <div className="flex gap-2 justify-end">
                                                                            <button
                                                                                onClick={() => setSelectedDetailClient(c)}
                                                                                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                                                                                title="View Profile Drawer"
                                                                            >
                                                                                <Eye className="w-3.5 h-3.5" />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDeleteRecord('clients', c.id)}
                                                                                className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all"
                                                                                title="Delete Client"
                                                                            >
                                                                                <Trash2 className="w-3.5 h-3.5" />
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                        {db.clients.length === 0 && (
                                                            <tr>
                                                                <td colSpan={7} className="py-12 text-center text-white/20 italic">No client records found.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* ─── 2. SERVICES SHEET ─── */}
                                {activeTab === 'services' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Client</th>
                                                    <th className="py-4 px-6">Service</th>
                                                    <th className="py-4 px-6">Category</th>
                                                    <th className="py-4 px-6">Price</th>
                                                    <th className="py-4 px-6">Cycle</th>
                                                    <th className="py-4 px-6">Status</th>
                                                    <th className="py-4 px-6">Renewal / End Date</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.services.map((s) => (
                                                    <tr key={s.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                        <td className="py-5 px-6 font-bold">{s.clientName}</td>
                                                        <td className="py-5 px-6">{s.serviceName}</td>
                                                        <td className="py-5 px-6 font-medium text-white/60">{s.category}</td>
                                                        <td className="py-5 px-6 font-mono">${s.price}</td>
                                                        <td className="py-5 px-6 text-white/60">{s.billingType}</td>
                                                        <td className="py-5 px-6">
                                                            <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${s.status === 'Active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/50'}`}>
                                                                {s.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-5 px-6 font-mono text-white/40">{s.endDate || "Ongoing"}</td>
                                                        <td className="py-5 px-6 text-right">
                                                            <button onClick={() => handleDeleteRecord('services', s.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {db.services.length === 0 && (
                                                    <tr><td colSpan={8} className="py-12 text-center text-white/20 italic">No services registered.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* ─── 3. PAYMENTS SHEET (INVOICING & TAX VAULT) ─── */}
                                {activeTab === 'payments' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Client Name</th>
                                                    <th className="py-4 px-6">Invoice #</th>
                                                    <th className="py-4 px-6">Amount</th>
                                                    <th className="py-4 px-6">Due Date</th>
                                                    <th className="py-4 px-6">Status</th>
                                                    <th className="py-4 px-6">Tax Moved?</th>
                                                    <th className="py-4 px-6">Remit Instructions / Details</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.payments.map((p) => {
                                                    const isSending = sendingInvoiceId === p.id;
                                                    const canSendInvoice = ["Unpaid", "Sent", "Overdue"].includes(p.status);
                                                    return (
                                                        <tr key={p.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                            <td className="py-5 px-6 font-bold">{p.clientName}</td>
                                                            <td className="py-5 px-6 font-mono text-white/60">#{p.invoiceNum}</td>
                                                            <td className="py-5 px-6 font-mono font-bold text-white/80">${p.amount}</td>
                                                            <td className="py-5 px-6 font-mono text-white/40">{p.dueDate}</td>
                                                            <td className="py-5 px-6">
                                                                <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${p.status === 'Paid' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : p.status === 'Sent' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                                                                    {p.status}
                                                                </span>
                                                            </td>
                                                            <td className="py-5 px-6">
                                                                {p.status === 'Paid' ? (
                                                                    <button
                                                                        onClick={() => handleToggleTaxSettled(p.id)}
                                                                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-colors hover:text-accent"
                                                                    >
                                                                        {p.taxSettled ? (
                                                                            <>
                                                                                <CheckSquare className="w-4 h-4 text-accent" />
                                                                                <span className="text-accent">Slipped to Vault</span>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Square className="w-4 h-4 text-white/20" />
                                                                                <span className="text-white/40">Unsettled (30%)</span>
                                                                            </>
                                                                        )}
                                                                    </button>
                                                                ) : (
                                                                    <span className="text-white/20 italic text-[10px]">-</span>
                                                                )}
                                                            </td>
                                                            <td className="py-5 px-6 text-white/60">
                                                                <div className="truncate max-w-[200px]" title={p.notes}>
                                                                    {p.notes || `${p.paymentMethod || 'Stripe'} remittance`}
                                                                </div>
                                                            </td>
                                                            <td className="py-5 px-6 text-right">
                                                                <div className="flex justify-end gap-2">
                                                                    {canSendInvoice && (
                                                                        <button
                                                                            disabled={isSending}
                                                                            onClick={() => handleSendInvoiceEmail(p.id)}
                                                                            className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/25 transition-all flex items-center justify-center"
                                                                            title="Send Invoice PDF Email"
                                                                        >
                                                                            {isSending ? (
                                                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                                            ) : (
                                                                                <Mail className="w-3.5 h-3.5" />
                                                                            )}
                                                                        </button>
                                                                    )}
                                                                    <button onClick={() => handleDeleteRecord('payments', p.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                        <Trash2 className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                {db.payments.length === 0 && (
                                                    <tr><td colSpan={8} className="py-12 text-center text-white/20 italic">No payments logged.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* ─── 4. TASKS SHEET ─── */}
                                {activeTab === 'tasks' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Client</th>
                                                    <th className="py-4 px-6">Task</th>
                                                    <th className="py-4 px-6">Priority</th>
                                                    <th className="py-4 px-6">Status</th>
                                                    <th className="py-4 px-6">Due Date</th>
                                                    <th className="py-4 px-6">Waiting On</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.tasks.map((t) => (
                                                    <tr key={t.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                        <td className="py-5 px-6 font-bold">{t.clientName}</td>
                                                        <td className="py-5 px-6">{t.taskName}</td>
                                                        <td className="py-5 px-6">
                                                            <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${t.priority === 'Urgent' || t.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white/60'}`}>
                                                                {t.priority}
                                                            </span>
                                                        </td>
                                                        <td className="py-5 px-6 text-white/80">{t.status}</td>
                                                        <td className="py-5 px-6 font-mono text-white/40">{t.dueDate}</td>
                                                        <td className="py-5 px-6 text-amber-400 italic text-[11px]">{t.waitingOn || "No Blockers"}</td>
                                                        <td className="py-5 px-6 text-right">
                                                            <button onClick={() => handleDeleteRecord('tasks', t.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {db.tasks.length === 0 && (
                                                    <tr><td colSpan={7} className="py-12 text-center text-white/20 italic">No tasks active.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* ─── 5. PLATFORMS SHEET (OVERHEAD) ─── */}
                                {activeTab === 'platforms' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Account Owner</th>
                                                    <th className="py-4 px-6">Platform Name</th>
                                                    <th className="py-4 px-6">Type</th>
                                                    <th className="py-4 px-6">Plan</th>
                                                    <th className="py-4 px-6">Cost</th>
                                                    <th className="py-4 px-6">Paid By</th>
                                                    <th className="py-4 px-6">Login / Email</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.platforms.map((p) => (
                                                    <tr key={p.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                        <td className="py-5 px-6 font-bold">{p.clientName}</td>
                                                        <td className="py-5 px-6 font-bold">{p.platformName}</td>
                                                        <td className="py-5 px-6 text-white/60">{p.type}</td>
                                                        <td className="py-5 px-6 font-mono text-[11px] text-white/40">{p.planName || "Standard"}</td>
                                                        <td className="py-5 px-6 font-mono">${p.monthlyCost}/mo</td>
                                                        <td className="py-5 px-6">
                                                            <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${p.paidBy === 'Power Digital' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                                                                {p.paidBy}
                                                            </span>
                                                        </td>
                                                        <td className="py-5 px-6 font-mono text-white/40">{p.loginEmail}</td>
                                                        <td className="py-5 px-6 text-right">
                                                            <button onClick={() => handleDeleteRecord('platforms', p.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {db.platforms.length === 0 && (
                                                    <tr><td colSpan={8} className="py-12 text-center text-white/20 italic">No platforms configured.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* ─── 6. DOMAINS HOSTING ─── */}
                                {activeTab === 'domainsHosting' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Client</th>
                                                    <th className="py-4 px-6">Domain</th>
                                                    <th className="py-4 px-6">Registrar</th>
                                                    <th className="py-4 px-6">Hosting Provider</th>
                                                    <th className="py-4 px-6">Renewal Date</th>
                                                    <th className="py-4 px-6">Cost</th>
                                                    <th className="py-4 px-6">Auto-Renew</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.domainsHosting.map((d) => (
                                                    <tr key={d.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                        <td className="py-5 px-6 font-bold">{d.clientName}</td>
                                                        <td className="py-5 px-6 font-mono text-accent">{d.domainName}</td>
                                                        <td className="py-5 px-6 text-white/60">{d.registrar}</td>
                                                        <td className="py-5 px-6 text-white/60">{d.hostingProvider}</td>
                                                        <td className="py-5 px-6 font-mono text-white/40">{d.renewalDate}</td>
                                                        <td className="py-5 px-6 font-mono">${d.annualCost}</td>
                                                        <td className="py-5 px-6 font-medium text-white/60">{d.autoRenew}</td>
                                                        <td className="py-5 px-6 text-right">
                                                            <button onClick={() => handleDeleteRecord('domainsHosting', d.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {db.domainsHosting.length === 0 && (
                                                    <tr><td colSpan={8} className="py-12 text-center text-white/20 italic">No domain listings registered.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* ─── 7. SALES PIPELINE ─── */}
                                {activeTab === 'salesPipeline' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Business / Contact</th>
                                                    <th className="py-4 px-6">Contact Info</th>
                                                    <th className="py-4 px-6">Opportunity</th>
                                                    <th className="py-4 px-6">Est. Value</th>
                                                    <th className="py-4 px-6">Lead Stage</th>
                                                    <th className="py-4 px-6">Next Follow-Up</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.salesPipeline.map((l) => (
                                                    <tr key={l.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                        <td className="py-5 px-6">
                                                            <div className="font-bold">{l.businessName}</div>
                                                            <div className="text-white/40 text-[11px]">{l.contactName}</div>
                                                        </td>
                                                        <td className="py-5 px-6 font-mono text-[11px] text-white/60">
                                                            <div>{l.email}</div>
                                                            <div>{l.phone}</div>
                                                        </td>
                                                        <td className="py-5 px-6 text-white/80">{l.opportunity}</td>
                                                        <td className="py-5 px-6 font-mono font-bold">${l.estValue}</td>
                                                        <td className="py-5 px-6">
                                                            <span className="inline-block px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-widest">
                                                                {l.stage}
                                                            </span>
                                                        </td>
                                                        <td className="py-5 px-6 font-mono text-white/40">{l.nextFollowUp}</td>
                                                        <td className="py-5 px-6 text-right">
                                                            <button onClick={() => handleDeleteRecord('salesPipeline', l.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {db.salesPipeline.length === 0 && (
                                                    <tr><td colSpan={7} className="py-12 text-center text-white/20 italic">Sales pipeline is empty.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* ─── 8. NOTES SHEET ─── */}
                                {activeTab === 'notes' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Client</th>
                                                    <th className="py-4 px-6">Date</th>
                                                    <th className="py-4 px-6">Type</th>
                                                    <th className="py-4 px-6">Title / Subject</th>
                                                    <th className="py-4 px-6">Details / Body</th>
                                                    <th className="py-4 px-6">Follow-Up?</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.notes.map((n) => (
                                                    <tr key={n.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                        <td className="py-5 px-6 font-bold">{n.clientName}</td>
                                                        <td className="py-5 px-6 font-mono text-white/40">{n.date}</td>
                                                        <td className="py-5 px-6">
                                                            <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-white/10 text-white/60">
                                                                {n.noteType}
                                                            </span>
                                                        </td>
                                                        <td className="py-5 px-6 font-semibold">{n.title}</td>
                                                        <td className="py-5 px-6 text-white/60 max-w-xs truncate">{n.body}</td>
                                                        <td className="py-5 px-6 text-[11px]">
                                                            {n.followUpNeeded === 'Yes' ? (
                                                                <span className="text-amber-400 font-bold">Due {n.followUpDate}</span>
                                                            ) : (
                                                                <span className="text-white/20">No</span>
                                                            )}
                                                        </td>
                                                        <td className="py-5 px-6 text-right">
                                                            <button onClick={() => handleDeleteRecord('notes', n.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {db.notes.length === 0 && (
                                                    <tr><td colSpan={7} className="py-12 text-center text-white/20 italic">No notes logged.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* ─── 9. CONTACTS SHEET ─── */}
                                {activeTab === 'contacts' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Client</th>
                                                    <th className="py-4 px-6">Name & Role</th>
                                                    <th className="py-4 px-6">Email</th>
                                                    <th className="py-4 px-6">Phone</th>
                                                    <th className="py-4 px-6">Pref. Method</th>
                                                    <th className="py-4 px-6">Decision Maker?</th>
                                                    <th className="py-4 px-6">Billing?</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.contacts.map((c) => {
                                                    const client = db.clients.find(cl => cl.id === c.clientId);
                                                    return (
                                                        <tr key={c.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                            <td className="py-5 px-6 font-bold">{client?.companyName || "Unknown Client"}</td>
                                                            <td className="py-5 px-6">
                                                                <div className="font-semibold">{c.name}</div>
                                                                <div className="text-[10px] text-white/40">{c.role}</div>
                                                            </td>
                                                            <td className="py-5 px-6 text-white/60 font-mono">{c.email}</td>
                                                            <td className="py-5 px-6 text-white/60 font-mono">{c.phone}</td>
                                                            <td className="py-5 px-6 uppercase tracking-wider text-[10px] text-white/40">{c.preferredContactMethod}</td>
                                                            <td className="py-5 px-6">{c.decisionMaker === 'yes' ? <span className="text-accent">✓</span> : <span className="text-white/20">-</span>}</td>
                                                            <td className="py-5 px-6">{c.billingContact === 'yes' ? <span className="text-blue-400">✓</span> : <span className="text-white/20">-</span>}</td>
                                                            <td className="py-5 px-6 text-right">
                                                                <button onClick={() => handleDeleteRecord('contacts', c.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                {db.contacts.length === 0 && (
                                                    <tr><td colSpan={8} className="py-12 text-center text-white/20 italic">No contacts registered.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* ─── 10. PROJECTS SHEET ─── */}
                                {activeTab === 'projects' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Project Name</th>
                                                    <th className="py-4 px-6">Status</th>
                                                    <th className="py-4 px-6">Timeline</th>
                                                    <th className="py-4 px-6">Budget</th>
                                                    <th className="py-4 px-6">Scope / Details</th>
                                                    <th className="py-4 px-6">Blocker / Waiting On</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.projects.map((p) => {
                                                    const client = db.clients.find(cl => cl.id === p.clientId);
                                                    return (
                                                        <tr key={p.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                            <td className="py-5 px-6">
                                                                <div className="font-bold">{p.projectName}</div>
                                                                <div className="text-[10px] text-white/40">{client?.companyName}</div>
                                                            </td>
                                                            <td className="py-5 px-6">
                                                                <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${p.status === 'active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : p.status === 'waiting' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-white/5 border-white/10 text-white/40'}`}>
                                                                    {p.status}
                                                                </span>
                                                            </td>
                                                            <td className="py-5 px-6 font-mono text-[10px] text-white/50">
                                                                <div>Start: {p.startDate}</div>
                                                                <div>Target: {p.targetLaunchDate}</div>
                                                            </td>
                                                            <td className="py-5 px-6 font-mono font-semibold">${p.budget}</td>
                                                            <td className="py-5 px-6 max-w-xs truncate" title={p.scopeSummary}>{p.scopeSummary}</td>
                                                            <td className="py-5 px-6">
                                                                {p.waitingOn ? (
                                                                    <div className="text-red-400 font-bold flex items-center gap-1.5" title={p.blockerNotes}>
                                                                        <AlertTriangle className="w-3.5 h-3.5" />
                                                                        <span>Waiting on {p.waitingOn}</span>
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-white/20">-</span>
                                                                )}
                                                            </td>
                                                            <td className="py-5 px-6 text-right">
                                                                <button onClick={() => handleDeleteRecord('projects', p.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                {db.projects.length === 0 && (
                                                    <tr><td colSpan={7} className="py-12 text-center text-white/20 italic">No projects active.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* ─── 11. CAMPAIGNS SHEET ─── */}
                                {activeTab === 'campaigns' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Campaign Name</th>
                                                    <th className="py-4 px-6">Platform / Channel</th>
                                                    <th className="py-4 px-6">Budget</th>
                                                    <th className="py-4 px-6">Objective</th>
                                                    <th className="py-4 px-6">Status</th>
                                                    <th className="py-4 px-6">Links</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.campaigns.map((c) => {
                                                    const client = db.clients.find(cl => cl.id === c.clientId);
                                                    return (
                                                        <tr key={c.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                            <td className="py-5 px-6">
                                                                <div className="font-bold">{c.campaignName}</div>
                                                                <div className="text-[10px] text-white/40">{client?.companyName}</div>
                                                            </td>
                                                            <td className="py-5 px-6 text-white/80">{c.platform}</td>
                                                            <td className="py-5 px-6 font-mono font-semibold">${c.budget}</td>
                                                            <td className="py-5 px-6 text-white/60">{c.objective}</td>
                                                            <td className="py-5 px-6">
                                                                <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                                    {c.status}
                                                                </span>
                                                            </td>
                                                            <td className="py-5 px-6">
                                                                {c.creativeLinks ? (
                                                                    <a href={c.creativeLinks} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-white transition-all">Creative Assets</a>
                                                                ) : (
                                                                    <span className="text-white/20">-</span>
                                                                )}
                                                            </td>
                                                            <td className="py-5 px-6 text-right">
                                                                <button onClick={() => handleDeleteRecord('campaigns', c.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                {db.campaigns.length === 0 && (
                                                    <tr><td colSpan={7} className="py-12 text-center text-white/20 italic">No campaigns logged.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* ─── 12. DELIVERABLES SHEET ─── */}
                                {activeTab === 'deliverables' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Deliverable Name</th>
                                                    <th className="py-4 px-6">Qty & Frequency</th>
                                                    <th className="py-4 px-6">Due Date</th>
                                                    <th className="py-4 px-6">Status</th>
                                                    <th className="py-4 px-6">Asset Link</th>
                                                    <th className="py-4 px-6">Approval Status</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.deliverables.map((d) => {
                                                    const client = db.clients.find(cl => cl.id === d.clientId);
                                                    return (
                                                        <tr key={d.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                            <td className="py-5 px-6">
                                                                <div className="font-bold">{d.deliverableName}</div>
                                                                <div className="text-[10px] text-white/40">{client?.companyName}</div>
                                                            </td>
                                                            <td className="py-5 px-6 capitalize">{d.quantity}x {d.frequency}</td>
                                                            <td className="py-5 px-6 font-mono text-white/40">{d.dueDate}</td>
                                                            <td className="py-5 px-6">
                                                                <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${d.status === 'delivered' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/40'}`}>
                                                                    {d.status.replace('_', ' ')}
                                                                </span>
                                                            </td>
                                                            <td className="py-5 px-6">
                                                                {d.deliveryUrl ? (
                                                                    <a href={d.deliveryUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-white">View File</a>
                                                                ) : (
                                                                    <span className="text-white/20">-</span>
                                                                )}
                                                            </td>
                                                            <td className="py-5 px-6">
                                                                <span className="text-[10px] font-bold uppercase tracking-wider">{d.approvalStatus}</span>
                                                            </td>
                                                            <td className="py-5 px-6 text-right">
                                                                <button onClick={() => handleDeleteRecord('deliverables', d.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                {db.deliverables.length === 0 && (
                                                    <tr><td colSpan={7} className="py-12 text-center text-white/20 italic">No deliverables active.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* ─── 13. ASSETS SHEET ─── */}
                                {activeTab === 'assets' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Asset Name</th>
                                                    <th className="py-4 px-6">Type</th>
                                                    <th className="py-4 px-6">Usage Rights</th>
                                                    <th className="py-4 px-6">File URL</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.assets.map((a) => {
                                                    const client = db.clients.find(cl => cl.id === a.clientId);
                                                    return (
                                                        <tr key={a.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                            <td className="py-5 px-6 font-bold">
                                                                <div>{a.assetName}</div>
                                                                <div className="text-[10px] text-white/40">{client?.companyName}</div>
                                                            </td>
                                                            <td className="py-5 px-6 uppercase text-[10px] text-white/60">{a.assetType}</td>
                                                            <td className="py-5 px-6 text-white/50">{a.usageRights}</td>
                                                            <td className="py-5 px-6">
                                                                <a href={a.fileUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-white">Access File</a>
                                                            </td>
                                                            <td className="py-5 px-6 text-right">
                                                                <button onClick={() => handleDeleteRecord('assets', a.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                {db.assets.length === 0 && (
                                                    <tr><td colSpan={5} className="py-12 text-center text-white/20 italic">No brand assets registered.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* ─── 14. TIME TRACKING SHEET ─── */}
                                {activeTab === 'timeEntries' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Date</th>
                                                    <th className="py-4 px-6">Client</th>
                                                    <th className="py-4 px-6">Hours</th>
                                                    <th className="py-4 px-6">Rate</th>
                                                    <th className="py-4 px-6">Billable?</th>
                                                    <th className="py-4 px-6">Description</th>
                                                    <th className="py-4 px-6">Invoiced?</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.timeEntries.map((t) => {
                                                    const client = db.clients.find(cl => cl.id === t.clientId);
                                                    return (
                                                        <tr key={t.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                            <td className="py-5 px-6 font-mono text-white/40">{t.date}</td>
                                                            <td className="py-5 px-6 font-bold">{client?.companyName}</td>
                                                            <td className="py-5 px-6 font-mono font-semibold">{t.hours} hrs</td>
                                                            <td className="py-5 px-6 font-mono">${t.rate}/hr</td>
                                                            <td className="py-5 px-6">{t.billable ? <span className="text-emerald-400">Yes</span> : <span className="text-white/20">No</span>}</td>
                                                            <td className="py-5 px-6 text-white/60 max-w-xs truncate" title={t.description}>{t.description}</td>
                                                            <td className="py-5 px-6">
                                                                {t.invoiced ? (
                                                                    <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-accent/10 text-accent border border-accent/20">Billed</span>
                                                                ) : (
                                                                    <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-white/5 text-white/30">Unbilled</span>
                                                                )}
                                                            </td>
                                                            <td className="py-5 px-6 text-right">
                                                                <button onClick={() => handleDeleteRecord('timeEntries', t.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                {db.timeEntries.length === 0 && (
                                                    <tr><td colSpan={8} className="py-12 text-center text-white/20 italic">No time entries recorded.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* ─── 15. COMPLIANCE SHEET ─── */}
                                {activeTab === 'complianceItems' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Client</th>
                                                    <th className="py-4 px-6">Compliance Check</th>
                                                    <th className="py-4 px-6">Status</th>
                                                    <th className="py-4 px-6">Opt-In Added?</th>
                                                    <th className="py-4 px-6">Opt-Out Added?</th>
                                                    <th className="py-4 px-6">Last Reviewed</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.complianceItems.map((c) => {
                                                    const client = db.clients.find(cl => cl.id === c.clientId);
                                                    return (
                                                        <tr key={c.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                            <td className="py-5 px-6 font-bold">{client?.companyName}</td>
                                                            <td className="py-5 px-6">
                                                                <div className="font-semibold">{c.itemType}</div>
                                                                {c.policyUrl && <a href={c.policyUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline text-[10px]">View Policy Link</a>}
                                                            </td>
                                                            <td className="py-5 px-6">
                                                                <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${c.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/40'}`}>
                                                                    {c.status.replace('_', ' ')}
                                                                </span>
                                                            </td>
                                                            <td className="py-5 px-6">{c.optInLanguageAdded ? <span className="text-accent">✓</span> : <span className="text-white/20">-</span>}</td>
                                                            <td className="py-5 px-6">{c.optOutLanguageAdded ? <span className="text-accent">✓</span> : <span className="text-white/20">-</span>}</td>
                                                            <td className="py-5 px-6 font-mono text-white/40">{c.lastReviewedDate || "Never"}</td>
                                                            <td className="py-5 px-6 text-right">
                                                                <button onClick={() => handleDeleteRecord('complianceItems', c.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                {db.complianceItems.length === 0 && (
                                                    <tr><td colSpan={7} className="py-12 text-center text-white/20 italic">No compliance entries recorded.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* MODAL: ADD CLIENT RECORD */}
                {openModal === 'clients' && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg glass-card bg-zinc-950 p-8 rounded-[2rem] space-y-6 relative max-h-[90vh] overflow-y-auto">
                            <button onClick={() => setOpenModal(null)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
                            <h3 className="text-xl font-black uppercase tracking-tighter">Add <span className="text-accent">Client</span></h3>
                            <form onSubmit={handleAddClient} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Company Name</label>
                                        <input required type="text" value={cCompany} onChange={e => setCCompany(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Contact / Owner</label>
                                        <input required type="text" value={cName} onChange={e => setCName(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Email</label>
                                        <input required type="email" value={cEmail} onChange={e => setCEmail(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Phone</label>
                                        <input required type="text" value={cPhone} onChange={e => setCPhone(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Status</label>
                                        <select value={cStatus} onChange={e => setCStatus(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                            <option value="Lead">Lead</option>
                                            <option value="Active">Active</option>
                                            <option value="Paused">Paused</option>
                                            <option value="Past Client">Past Client</option>
                                            <option value="Lost">Lost</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Monthly Val ($)</label>
                                        <input type="number" value={cVal} onChange={e => setCVal(Number(e.target.value))} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Setup Fee ($)</label>
                                        <input type="number" value={cSetup} onChange={e => setCSetup(Number(e.target.value))} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Start Date</label>
                                        <input type="date" value={cStart} onChange={e => setCStart(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Next Follow-Up</label>
                                        <input type="date" value={cFollowUp} onChange={e => setCFollowUp(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Website</label>
                                    <input type="text" placeholder="https://..." value={cWeb} onChange={e => setCWeb(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Primary Need</label>
                                    <input type="text" value={cNeed} onChange={e => setCNeed(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Notes</label>
                                    <textarea value={cNotes} onChange={e => setCNotes(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none h-20 resize-none" />
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest">Commit Client Record</button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* MODAL: ADD SERVICE */}
                {openModal === 'services' && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md glass-card bg-zinc-950 p-8 rounded-[2rem] space-y-6 relative">
                            <button onClick={() => setOpenModal(null)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
                            <h3 className="text-xl font-black uppercase tracking-tighter">Add Client <span className="text-accent">Service</span></h3>
                            <form onSubmit={handleAddService} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Client Business Name</label>
                                    <select required value={sClient} onChange={e => setSClient(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                        <option value="">-- Choose Client --</option>
                                        {db.clients.map(c => <option key={c.id} value={c.companyName}>{c.companyName}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Service Name</label>
                                    <input required type="text" placeholder="e.g. Web Design Retainer" value={sName} onChange={e => setSName(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Category</label>
                                        <select value={sCat} onChange={e => setSCat(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                            <option value="Website">Website</option>
                                            <option value="CRM">CRM</option>
                                            <option value="Phone">Phone</option>
                                            <option value="Hosting">Hosting</option>
                                            <option value="Domain">Domain</option>
                                            <option value="Ads">Ads</option>
                                            <option value="SEO">SEO</option>
                                            <option value="Consulting">Consulting</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Price ($)</label>
                                        <input required type="number" value={sPrice} onChange={e => setSPrice(Number(e.target.value))} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Billing Type</label>
                                        <select value={sBilling} onChange={e => setSBilling(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                            <option value="Monthly">Monthly</option>
                                            <option value="One-Time">One-Time</option>
                                            <option value="Yearly">Yearly</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Service Status</label>
                                        <select value={sStatus} onChange={e => setSStatus(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                            <option value="Proposed">Proposed</option>
                                            <option value="Active">Active</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Paused">Paused</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Start Date</label>
                                        <input type="date" value={sStart} onChange={e => setSStart(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">End Date</label>
                                        <input type="date" value={sEnd} onChange={e => setSEnd(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest">Commit Service Record</button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* MODAL: ADD PAYMENT */}
                {openModal === 'payments' && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md glass-card bg-zinc-950 p-8 rounded-[2rem] space-y-6 relative">
                            <button onClick={() => setOpenModal(null)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
                            <h3 className="text-xl font-black uppercase tracking-tighter">Add Invoice / <span className="text-accent">Payment</span></h3>
                            <form onSubmit={handleAddPayment} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Client Business Name</label>
                                    <select required value={pClient} onChange={e => setPClient(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                        <option value="">-- Choose Client --</option>
                                        {db.clients.map(c => <option key={c.id} value={c.companyName}>{c.companyName}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Invoice #</label>
                                        <input type="text" value={pInvoice} onChange={e => setPInvoice(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Invoice Date</label>
                                        <input type="date" value={pInvoiceDate} onChange={e => setPInvoiceDate(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Invoice Amount ($)</label>
                                        <input required type="number" value={pAmount} onChange={e => setPAmount(Number(e.target.value))} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Invoice Due Date</label>
                                        <input type="date" value={pDueDate} onChange={e => setPDueDate(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Invoice Status</label>
                                        <select value={pStatus} onChange={e => setPStatus(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                            <option value="Unpaid">Unpaid</option>
                                            <option value="Paid">Paid</option>
                                            <option value="Overdue">Overdue</option>
                                            <option value="Partial">Partial</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Payment Date</label>
                                        <input type="date" value={pPayDate} onChange={e => setPPayDate(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Payment Method</label>
                                        <select value={pMethod} onChange={e => setPMethod(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                            <option value="Stripe">Stripe</option>
                                            <option value="Card">Card</option>
                                            <option value="Bank Transfer">Bank Transfer</option>
                                            <option value="Check">Check</option>
                                            <option value="Cash App">Cash App</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Related Service</label>
                                        <input type="text" placeholder="e.g. Web Design" value={pSvc} onChange={e => setPSvc(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest">Commit Invoice Record</button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* MODAL: ADD TASK */}
                {openModal === 'tasks' && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md glass-card bg-zinc-950 p-8 rounded-[2rem] space-y-6 relative">
                            <button onClick={() => setOpenModal(null)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
                            <h3 className="text-xl font-black uppercase tracking-tighter">Add Operational <span className="text-accent">Task</span></h3>
                            <form onSubmit={handleAddTask} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Client Business Name</label>
                                    <select required value={tClient} onChange={e => setTClient(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                        <option value="">-- Choose Client --</option>
                                        {db.clients.map(c => <option key={c.id} value={c.companyName}>{c.companyName}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Task Description</label>
                                    <input required type="text" placeholder="e.g. Set up email lists" value={tName} onChange={e => setTName(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Priority</label>
                                        <select value={tPriority} onChange={e => setTPriority(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Urgent">Urgent</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Task Status</label>
                                        <select value={tStatus} onChange={e => setTStatus(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                            <option value="Not Started">Not Started</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Waiting on Client">Waiting on Client</option>
                                            <option value="Waiting on Vendor">Waiting on Vendor</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Task Due Date</label>
                                        <input type="date" value={tDue} onChange={e => setTDue(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Related Service</label>
                                        <input type="text" placeholder="e.g. Web Design" value={tSvc} onChange={e => setTSvc(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Waiting On (Blocker details if status is Waiting)</label>
                                    <input type="text" placeholder="e.g. Waiting on DNS login" value={tWaiting} onChange={e => setTWaiting(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest">Commit Task Record</button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* MODAL: ADD PLATFORM */}
                {openModal === 'platforms' && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md glass-card bg-zinc-950 p-8 rounded-[2rem] space-y-6 relative">
                            <button onClick={() => setOpenModal(null)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
                            <h3 className="text-xl font-black uppercase tracking-tighter">Add Platform / <span className="text-accent">Overhead</span></h3>
                            <form onSubmit={handleAddPlatform} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Account Owner (Use 'Power Digital (Overhead)' for your software costs)</label>
                                    <input required type="text" value={plClient} onChange={e => setPlClient(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Platform Name</label>
                                        <input required type="text" placeholder="e.g. Capsule CRM" value={plName} onChange={e => setPlName(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Type</label>
                                        <input required type="text" placeholder="e.g. CRM, Hosting" value={plType} onChange={e => setPlType(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Plan Details</label>
                                        <input type="text" placeholder="e.g. Growth Plan" value={plPlan} onChange={e => setPlPlan(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Monthly Cost ($)</label>
                                        <input required type="number" value={plCost} onChange={e => setPlCost(Number(e.target.value))} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Paid By</label>
                                        <select value={plPaidBy} onChange={e => setPlPaidBy(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                            <option value="Power Digital">Power Digital (Overhead)</option>
                                            <option value="Client">Client (Paid Directly)</option>
                                            <option value="Included">Included in Retainer</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Next Renewal Date</label>
                                        <input type="date" value={plRenew} onChange={e => setPlRenew(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Login Email</label>
                                        <input type="text" value={plEmail} onChange={e => setPlEmail(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Access Level</label>
                                        <input type="text" placeholder="e.g. Admin, Developer" value={plAccess} onChange={e => setPlAccess(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest">Commit Platform Record</button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* MODAL: ADD DOMAIN */}
                {openModal === 'domainsHosting' && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md glass-card bg-zinc-950 p-8 rounded-[2rem] space-y-6 relative">
                            <button onClick={() => setOpenModal(null)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
                            <h3 className="text-xl font-black uppercase tracking-tighter">Add Domain / <span className="text-accent">Hosting</span></h3>
                            <form onSubmit={handleAddDomain} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Client Business Name</label>
                                    <select required value={dClient} onChange={e => setDClient(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                        <option value="">-- Choose Client --</option>
                                        {db.clients.map(c => <option key={c.id} value={c.companyName}>{c.companyName}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Domain URL</label>
                                    <input required type="text" placeholder="e.g. acme.com" value={dDomain} onChange={e => setDDomain(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Registrar</label>
                                        <input type="text" value={dRegistrar} onChange={e => setDRegistrar(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Hosting Provider</label>
                                        <input type="text" value={dHost} onChange={e => setDHost(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Annual Cost ($)</label>
                                        <input required type="number" value={dCost} onChange={e => setDCost(Number(e.target.value))} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Auto-Renew?</label>
                                        <select value={dAuto} onChange={e => setDAuto(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Owner</label>
                                        <input type="text" value={dOwner} onChange={e => setDOwner(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Next Renewal Date</label>
                                    <input type="date" value={dRenew} onChange={e => setDRenew(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white" />
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest">Commit Domain Record</button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* MODAL: ADD SALES LEAD */}
                {openModal === 'salesPipeline' && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md glass-card bg-zinc-950 p-8 rounded-[2rem] space-y-6 relative">
                            <button onClick={() => setOpenModal(null)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
                            <h3 className="text-xl font-black uppercase tracking-tighter">Add Pipeline <span className="text-accent">Lead</span></h3>
                            <form onSubmit={handleAddLead} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Business Name</label>
                                        <input required type="text" value={slCompany} onChange={e => setSlCompany(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Contact Name</label>
                                        <input required type="text" value={slContact} onChange={e => setSlContact(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Email</label>
                                        <input required type="email" value={slEmail} onChange={e => setSlEmail(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Phone</label>
                                        <input required type="text" value={slPhone} onChange={e => setSlPhone(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Opportunity Value ($)</label>
                                        <input required type="number" value={slValue} onChange={e => setSlValue(Number(e.target.value))} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Lead Stage</label>
                                        <select value={slStage} onChange={e => setSlStage(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                            <option value="New Lead">New Lead</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Meeting Set">Meeting Set</option>
                                            <option value="Proposal Sent">Proposal Sent</option>
                                            <option value="Follow Up Later">Follow Up Later</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Opportunity Description</label>
                                    <input type="text" placeholder="e.g. Next.js Web App + CRM setup" value={slOpp} onChange={e => setSlOpp(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Next Follow-Up</label>
                                        <input type="date" value={slFollow} onChange={e => setSlFollow(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Next Step</label>
                                        <input type="text" placeholder="e.g. Call Wednesday" value={slNextStep} onChange={e => setSlNextStep(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest">Commit Pipeline Lead</button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* MODAL: ADD CLIENT NOTE */}
                {openModal === 'notes' && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md glass-card bg-zinc-950 p-8 rounded-[2rem] space-y-6 relative">
                            <button onClick={() => setOpenModal(null)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
                            <h3 className="text-xl font-black uppercase tracking-tighter">Log Client <span className="text-accent">Note</span></h3>
                            <form onSubmit={handleAddNote} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Client Business Name</label>
                                    <select required value={nClient} onChange={e => setNClient(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                        <option value="">-- Choose Client --</option>
                                        {db.clients.map(c => <option key={c.id} value={c.companyName}>{c.companyName}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Note Date</label>
                                        <input required type="date" value={nDate} onChange={e => setNDate(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Note Type</label>
                                        <select value={nType} onChange={e => setNType(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                            <option value="Call Log">Call Log</option>
                                            <option value="Meeting">Meeting</option>
                                            <option value="Email">Email</option>
                                            <option value="Internal">Internal</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Title / Subject</label>
                                    <input required type="text" placeholder="e.g. Call regarding layout feedback" value={nTitle} onChange={e => setNTitle(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Details / Body</label>
                                    <textarea required value={nBody} onChange={e => setNBody(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none h-24 resize-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Follow-Up Needed?</label>
                                        <select value={nFollowUpNeeded} onChange={e => setNFollowUpNeeded(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Follow-Up Date</label>
                                        <input type="date" disabled={nFollowUpNeeded === 'No'} value={nFollowUpDate} onChange={e => setNFollowUpDate(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white disabled:opacity-30" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest">Commit Note Record</button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* FLOATING CHAT BUBBLE TRIGGER */}
                <button
                    onClick={() => setIsAiOpen(true)}
                    className="fixed bottom-8 right-8 w-14 h-14 bg-accent text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 border border-accent/20"
                >
                    <MessageSquare className="w-6 h-6" />
                </button>

                {/* SLIDING AI ASSISTANT DRAWER */}
                <AnimatePresence>
                    {isAiOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsAiOpen(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-xs z-45"
                            />
                            
                            {/* Drawer Content */}
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-zinc-950 border-l border-white/5 shadow-2xl z-50 flex flex-col p-6 space-y-6"
                            >
                                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-md bg-accent/10 border border-accent/20">
                                            <Sparkles className="w-4 h-4 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black uppercase tracking-widest">PDM-Assistant</h3>
                                            <span className="text-[8px] font-bold text-accent uppercase tracking-widest">Online — Gemini backed</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsAiOpen(false)} className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Project Context Select */}
                                <div className="px-1 py-3 border-b border-white/5 flex flex-col gap-1.5">
                                    <label className="text-[8px] font-black uppercase tracking-widest text-white/40">Active Project / Client Focus</label>
                                    <select
                                        value={chatProjectContext}
                                        onChange={(e) => setChatProjectContext(e.target.value)}
                                        className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent/40"
                                    >
                                        <option value="">-- General / Multi-Client Context --</option>
                                        {db.clients.map((c) => (
                                            <option key={c.id} value={c.companyName}>
                                                {c.companyName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Chat Logs Viewport */}
                                <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
                                    {aiMessages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-accent text-black font-semibold' : msg.sender === 'system' ? 'bg-red-950/40 border border-red-500/20 text-red-300' : 'bg-white/[0.03] border border-white/5 text-white/90'}`}
                                            >
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {aiLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                                                <Loader2 className="w-4 h-4 text-accent animate-spin" />
                                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">AI is thinking...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef} />
                                </div>

                                {/* Quick Command Chips */}
                                <div className="space-y-2">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-white/30 block mb-1">Quick Ledger Actions:</span>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => handleSendAiMessage("Log $1,500 check from Acme Corporation")}
                                            className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-accent/40 text-[10px] text-white/60 hover:text-white transition-all text-left"
                                        >
                                            💵 Check $1,500
                                        </button>
                                        <button
                                            onClick={() => handleSendAiMessage("Add Platform Slack ($15/mo) overhead")}
                                            className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-accent/40 text-[10px] text-white/60 hover:text-white transition-all text-left"
                                        >
                                            ☁️ Add Slack Overhead
                                        </button>
                                        <button
                                            onClick={() => handleSendAiMessage("What is my current net profit margin?")}
                                            className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-accent/40 text-[10px] text-white/60 hover:text-white transition-all text-left"
                                        >
                                            📊 Query Margin
                                        </button>
                                    </div>
                                </div>

                                {/* Chat Input Bar */}
                                <div className="flex items-center gap-3 pt-2">
                                    <input
                                        type="text"
                                        placeholder="Type command (e.g. log check)..."
                                        value={aiInput}
                                        onChange={(e) => setAiInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSendAiMessage()}
                                        className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-accent/40"
                                    />
                                    <button
                                        onClick={() => handleSendAiMessage()}
                                        className="p-3.5 rounded-xl bg-accent text-black hover:scale-105 active:scale-95 transition-all"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* SLIDING CLIENT DETAIL DRAWER */}
                <AnimatePresence>
                    {selectedDetailClient && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedDetailClient(null)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[48]"
                            />
                            
                            {/* Drawer Content */}
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed right-0 top-0 h-full w-full sm:w-[550px] bg-zinc-950 border-l border-white/5 shadow-2xl z-[49] flex flex-col p-8 space-y-6 overflow-y-auto scrollbar-thin"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-accent/20 to-blue-500/20 border border-accent/20 flex items-center justify-center text-base font-black text-accent">
                                            {selectedDetailClient.companyName.split(" ").map((w: string) => w[0]).join("").substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black uppercase tracking-tighter text-white">{selectedDetailClient.companyName}</h3>
                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-0.5">Consolidated Profile</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedDetailClient(null)} className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Body Information */}
                                <div className="space-y-6">
                                    {/* Contact Information Cards */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Contact Owner</span>
                                            <p className="text-xs font-bold text-white/80 mt-1">{selectedDetailClient.name}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Primary Email</span>
                                            <p className="text-xs font-mono text-accent mt-1 truncate">{selectedDetailClient.email}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Phone Number</span>
                                            <p className="text-xs font-mono text-white/80 mt-1">{selectedDetailClient.phone}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Website Domain</span>
                                            <a href={selectedDetailClient.website} target="_blank" rel="noreferrer" className="text-xs font-mono text-blue-400 mt-1 truncate block hover:underline">{selectedDetailClient.website}</a>
                                        </div>
                                    </div>

                                    {/* Financial Summary */}
                                    <div className="p-5 rounded-2xl bg-accent/[0.02] border border-accent/20 flex justify-between items-center">
                                        <div>
                                            <span className="text-[8px] font-black uppercase tracking-widest text-accent">Monthly Value</span>
                                            <h4 className="text-2xl font-black text-white mt-1">${selectedDetailClient.monthlyValue}/mo</h4>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Setup Fee</span>
                                            <h4 className="text-lg font-black text-white/80 mt-1">${selectedDetailClient.setupFee}</h4>
                                        </div>
                                    </div>

                                    {/* Tabbed Profile Content */}
                                    
                                    {/* SECTION 1: ACTIVE SERVICES */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Active Services</h4>
                                        {db.services.filter(s => s.clientName === selectedDetailClient.companyName).map(s => (
                                            <div key={s.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex justify-between items-start gap-4">
                                                <div>
                                                    <h5 className="text-xs font-bold text-white">{s.serviceName}</h5>
                                                    <p className="text-[9px] text-white/40 mt-1 font-medium">{s.category} — {s.billingType}</p>
                                                    {s.notes && <p className="text-[9px] text-white/30 italic mt-2">"{s.notes}"</p>}
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xs font-mono font-black text-accent">${s.price}</span>
                                                    <span className={`block mt-2 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border text-center ${s.status === 'Active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/40'}`}>{s.status}</span>
                                                </div>
                                            </div>
                                        ))}
                                        {db.services.filter(s => s.clientName === selectedDetailClient.companyName).length === 0 && (
                                            <p className="text-xs text-white/20 italic">No services listed for this client.</p>
                                        )}
                                    </div>

                                    {/* SECTION 2: INVOICES & PAYMENTS */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Invoices & Payments</h4>
                                        {db.payments.filter(p => p.clientName === selectedDetailClient.companyName).map(p => {
                                            const isSending = sendingInvoiceId === p.id;
                                            const canSendInvoice = ["Unpaid", "Sent", "Overdue"].includes(p.status);
                                            return (
                                                <div key={p.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex justify-between items-center gap-4">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs font-mono text-white/60">#{p.invoiceNum}</span>
                                                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${p.status === 'Paid' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : p.status === 'Sent' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>{p.status}</span>
                                                        </div>
                                                        <span className="text-[10px] text-white/40 block mt-1">Due {p.dueDate}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-xs font-mono font-black text-white/80">${p.amount}</span>
                                                        
                                                        {p.status === 'Paid' ? (
                                                            <button
                                                                onClick={() => handleToggleTaxSettled(p.id)}
                                                                className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition-all text-white/60 hover:text-accent"
                                                                title="Toggle Tax Vault Transfer"
                                                            >
                                                                {p.taxSettled ? <CheckSquare className="w-4 h-4 text-accent" /> : <Square className="w-4 h-4" />}
                                                            </button>
                                                        ) : (
                                                            canSendInvoice && (
                                                                <button
                                                                    disabled={isSending}
                                                                    onClick={() => handleSendInvoiceEmail(p.id)}
                                                                    className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/25 transition-all flex items-center justify-center"
                                                                    title="Email Invoice Branded Receipt"
                                                                >
                                                                    {isSending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
                                                                </button>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {db.payments.filter(p => p.clientName === selectedDetailClient.companyName).length === 0 && (
                                            <p className="text-xs text-white/20 italic">No invoice ledger records found.</p>
                                        )}
                                    </div>

                                    {/* SECTION 3: PROJECT TASKS */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Active Tasks</h4>
                                        {db.tasks.filter(t => t.clientName === selectedDetailClient.companyName).map(t => (
                                            <div key={t.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
                                                <div className="flex justify-between items-start">
                                                    <h5 className="text-xs font-bold text-white">{t.taskName}</h5>
                                                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${t.priority === 'Urgent' || t.priority === 'High' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-white/5 border-white/10 text-white/40'}`}>{t.priority}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[10px] text-white/40 font-mono">
                                                    <span>Status: <span className="font-bold text-white/60">{t.status}</span></span>
                                                    <span>Due: {t.dueDate}</span>
                                                </div>
                                                {t.waitingOn && <p className="text-[9px] text-accent font-medium mt-1">⚠️ Blocker: {t.waitingOn}</p>}
                                            </div>
                                        ))}
                                        {db.tasks.filter(t => t.clientName === selectedDetailClient.companyName).length === 0 && (
                                            <p className="text-xs text-white/20 italic">No tasks assigned to this client.</p>
                                        )}
                                    </div>

                                    {/* SECTION 4: DOMAINS & HOSTING */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Domains & Hosting</h4>
                                        {db.domainsHosting.filter(d => d.clientName === selectedDetailClient.companyName).map(d => (
                                            <div key={d.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <a href={`https://${d.domainName}`} target="_blank" rel="noreferrer" className="text-xs font-black text-blue-400 hover:underline">{d.domainName}</a>
                                                    <span className="text-xs font-mono font-black text-white/80">${d.annualCost}/yr</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-[10px] text-white/40 font-mono">
                                                    <div>Registrar: <span className="text-white/60">{d.registrar}</span></div>
                                                    <div>Hosting: <span className="text-white/60">{d.hostingProvider}</span></div>
                                                    <div>Auto-Renew: <span className="text-white/60">{d.autoRenew}</span></div>
                                                    <div>Renewal: <span className="text-white/60">{d.renewalDate}</span></div>
                                                </div>
                                            </div>
                                        ))}
                                        {db.domainsHosting.filter(d => d.clientName === selectedDetailClient.companyName).length === 0 && (
                                            <p className="text-xs text-white/20 italic">No domains registered.</p>
                                        )}
                                    </div>

                                    {/* SECTION 5: NOTES HISTORY */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Client Notes</h4>
                                        {db.notes.filter(n => n.clientName === selectedDetailClient.companyName).map(n => (
                                            <div key={n.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-bold text-accent">{n.title}</span>
                                                    <span className="text-[10px] font-mono text-white/40">{n.date}</span>
                                                </div>
                                                <p className="text-xs text-white/60 leading-relaxed">"{n.body}"</p>
                                                {n.followUpNeeded === 'Yes' && <p className="text-[9px] text-blue-400 font-bold uppercase tracking-wider">🔔 Follow-up scheduled: {n.followUpDate}</p>}
                                            </div>
                                        ))}
                                        {db.notes.filter(n => n.clientName === selectedDetailClient.companyName).length === 0 && (
                                            <p className="text-xs text-white/20 italic">No notes logged yet.</p>
                                        )}
                                    </div>

                                    {/* SECTION 3B: CLIENT CONTACTS */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Contacts</h4>
                                        {db.contacts.filter(c => c.clientId === selectedDetailClient.id).map(c => (
                                            <div key={c.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-xs font-bold text-white">{c.name}</span>
                                                    <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-white/5 text-white/40">{c.role}</span>
                                                </div>
                                                <div className="text-[10px] text-white/40 font-mono">
                                                    <div>Email: <span className="text-white/60">{c.email}</span></div>
                                                    {c.phone && <div>Phone: <span className="text-white/60">{c.phone}</span></div>}
                                                    <div>Decision Maker: <span className="text-accent">{c.decisionMaker}</span> | Billing: <span className="text-blue-400">{c.billingContact}</span></div>
                                                </div>
                                            </div>
                                        ))}
                                        {db.contacts.filter(c => c.clientId === selectedDetailClient.id).length === 0 && (
                                            <p className="text-xs text-white/20 italic">No secondary contacts listed.</p>
                                        )}
                                    </div>

                                    {/* SECTION 3C: PROJECTS */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Projects</h4>
                                        {db.projects.filter(p => p.clientId === selectedDetailClient.id).map(p => (
                                            <div key={p.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-bold text-white">{p.projectName}</span>
                                                    <span className="text-[9px] uppercase font-black text-accent">{p.status}</span>
                                                </div>
                                                <p className="text-[10px] text-white/60 leading-relaxed">"{p.scopeSummary}"</p>
                                                {p.waitingOn && (
                                                    <div className="text-red-400 font-bold text-[9px] flex items-center gap-1.5 mt-1">
                                                        <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
                                                        <span>Waiting on {p.waitingOn}: {p.blockerNotes}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        {db.projects.filter(p => p.clientId === selectedDetailClient.id).length === 0 && (
                                            <p className="text-xs text-white/20 italic">No active projects.</p>
                                        )}
                                    </div>

                                    {/* SECTION 4B: SOFTWARE PLATFORMS & ACCESS */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Platforms & Access Credentials</h4>
                                        {db.platforms.filter(p => p.clientName === selectedDetailClient.companyName).map(p => (
                                            <div key={p.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-bold text-white">{p.platformName}</span>
                                                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${p.accessStatus === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{p.accessStatus || 'Active'}</span>
                                                </div>
                                                <div className="text-[10px] text-white/40 font-mono space-y-1">
                                                    <div>Login Email: <span className="text-white/60">{p.loginEmail}</span></div>
                                                    <div>2FA Status: <span className="text-white/60">{p.twoFactorEnabled === 'yes' ? `Yes (${p.twoFactorMethod || 'SMS'} to ${p.twoFactorOwner || 'Client'})` : 'No'}</span></div>
                                                    <div>Credential Vault Location: <span className="text-accent font-bold">{p.secretLocation || 'None registered'}</span></div>
                                                    {p.apiKeyLocation && <div>API Key Reference: <span className="text-blue-400 font-bold">{p.apiKeyLocation}</span></div>}
                                                </div>
                                            </div>
                                        ))}
                                        {db.platforms.filter(p => p.clientName === selectedDetailClient.companyName).length === 0 && (
                                            <p className="text-xs text-white/20 italic">No platform setups recorded.</p>
                                        )}
                                    </div>

                                    {/* SECTION 5B: MARKETING CAMPAIGNS */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Active Campaigns</h4>
                                        {db.campaigns.filter(c => c.clientId === selectedDetailClient.id).map(c => (
                                            <div key={c.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-bold text-white">{c.campaignName}</span>
                                                    <span className="text-[9px] uppercase font-black text-blue-400 bg-blue-500/10 px-2 py-0.5 border border-blue-500/20">{c.status}</span>
                                                </div>
                                                <div className="text-[10px] text-white/40 font-mono">
                                                    <div>Budget: <span className="text-white/80 font-bold">${c.budget}</span> | Channel: <span className="text-white/60">{c.platform}</span></div>
                                                    <div>Objective: <span className="text-white/60">{c.objective}</span></div>
                                                    {c.results && <div className="mt-2 text-accent font-bold">Results: {c.results}</div>}
                                                </div>
                                            </div>
                                        ))}
                                        {db.campaigns.filter(c => c.clientId === selectedDetailClient.id).length === 0 && (
                                            <p className="text-xs text-white/20 italic">No marketing campaigns registered.</p>
                                        )}
                                    </div>

                                    {/* SECTION 5C: DELIVERABLES */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Expectations & Deliverables</h4>
                                        {db.deliverables.filter(d => d.clientId === selectedDetailClient.id).map(d => (
                                            <div key={d.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex justify-between items-center gap-4">
                                                <div>
                                                    <span className="text-xs font-bold text-white">{d.deliverableName}</span>
                                                    <div className="text-[9px] text-white/40 mt-1 capitalize">{d.quantity}x {d.frequency} | Due: {d.dueDate}</div>
                                                </div>
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${d.status === 'delivered' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/40'}`}>{d.status}</span>
                                            </div>
                                        ))}
                                        {db.deliverables.filter(d => d.clientId === selectedDetailClient.id).length === 0 && (
                                            <p className="text-xs text-white/20 italic">No deliverables list registered.</p>
                                        )}
                                    </div>

                                    {/* SECTION 5D: TIME ENTRIES */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Consulting Time Ledger</h4>
                                        {db.timeEntries.filter(t => t.clientId === selectedDetailClient.id).map(t => (
                                            <div key={t.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex justify-between items-center">
                                                <div>
                                                    <span className="text-xs font-bold text-white">{t.description}</span>
                                                    <div className="text-[9px] text-white/40 mt-1 font-mono">{t.date} | Billed: {t.invoiced ? "Yes" : "No"}</div>
                                                </div>
                                                <span className="text-xs font-mono font-black text-white/80">{t.hours} hrs @ ${t.rate}/hr</span>
                                            </div>
                                        ))}
                                        {db.timeEntries.filter(t => t.clientId === selectedDetailClient.id).length === 0 && (
                                            <p className="text-xs text-white/20 italic">No time entries logged.</p>
                                        )}
                                    </div>

                                    {/* SECTION 5E: COMPLIANCE STATUS */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Compliance & Legal Checklists</h4>
                                        {db.complianceItems.filter(c => c.clientId === selectedDetailClient.id).map(c => (
                                            <div key={c.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-bold text-white">{c.itemType}</span>
                                                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${c.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{c.status}</span>
                                                </div>
                                                <div className="text-[10px] text-white/40 font-mono space-y-1">
                                                    <div>SMS Opt-in Added: <span className="text-white/60">{c.optInLanguageAdded ? "Yes" : "No"}</span></div>
                                                    <div>SMS Opt-out Added: <span className="text-white/60">{c.optOutLanguageAdded ? "Yes" : "No"}</span></div>
                                                    {c.lastReviewedDate && <div>Last Reviewed: <span className="text-white/60">{c.lastReviewedDate}</span></div>}
                                                </div>
                                            </div>
                                        ))}
                                        {db.complianceItems.filter(c => c.clientId === selectedDetailClient.id).length === 0 && (
                                            <p className="text-xs text-white/20 italic">No compliance checklists registered.</p>
                                        )}
                                    </div>

                                    {/* SECTION 6: API KEYS & INTEGRATIONS */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">API Keys & Integrations</h4>
                                        
                                        {/* Existing Keys List */}
                                        {(selectedDetailClient.apiKeys || []).map(k => (
                                            <div key={k.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex justify-between items-start gap-4 animate-fadeIn">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-white">{k.serviceName}</span>
                                                    </div>
                                                    <p className="text-xs font-mono text-accent mt-1 select-all break-all">{k.apiKey}</p>
                                                    {k.notes && <p className="text-[10px] text-white/40 mt-1 italic">"{k.notes}"</p>}
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteApiKey(selectedDetailClient.id, k.id)}
                                                    className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all"
                                                    title="Delete API Key"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}

                                        {(selectedDetailClient.apiKeys || []).length === 0 && (
                                            <p className="text-xs text-white/20 italic">No API keys registered for this client yet.</p>
                                        )}

                                        {/* Inline Add API Key form */}
                                        <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 border-dashed space-y-3 mt-4">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block">Register New API Key / Token</span>
                                            
                                            <div className="grid grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="Service Name (e.g. Stripe, SendGrid)"
                                                    value={newApiKeyService}
                                                    onChange={e => setNewApiKeyService(e.target.value)}
                                                    className="bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent/40"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Secret Token / Key Value"
                                                    value={newApiKeyValue}
                                                    onChange={e => setNewApiKeyValue(e.target.value)}
                                                    className="bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent/40 font-mono"
                                                />
                                            </div>
                                            
                                            <input
                                                type="text"
                                                placeholder="Brief notes/purpose (optional)"
                                                value={newApiKeyNotes}
                                                onChange={e => setNewApiKeyNotes(e.target.value)}
                                                className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent/40"
                                            />
                                            
                                            <button
                                                type="button"
                                                onClick={() => handleAddApiKey(selectedDetailClient.id)}
                                                className="w-full py-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent text-[9px] font-black uppercase tracking-widest hover:bg-accent hover:text-black transition-all flex items-center justify-center gap-1.5"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                                Register API Key
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <Footer />
            </main>
        </AdminGuard>
    );
}
