"use client";

import React, { useEffect, useState } from "react";
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
    Square
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AdminGuard from "@/components/auth/AdminGuard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

interface Client {
    id: string;
    name: string;
    companyName: string;
    phone: string;
    email: string;
    website: string;
    status: string; // Active, Paused, Past Client, Lost, Lead
    businessType: string;
    monthlyValue: number;
    setupFee: number;
    startDate: string;
    nextFollowUp: string;
    primaryNeed: string;
    notes: string;
}

interface Service {
    id: string;
    clientName: string;
    serviceName: string;
    category: string;
    price: number;
    billingType: string; // Monthly, One-Time, Yearly
    status: string; // Proposed, Active, In Progress, Paused, Completed, Cancelled
    startDate: string;
    endDate: string;
    notes: string;
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
}

interface Task {
    id: string;
    clientName: string;
    taskName: string;
    priority: string; // Low, Medium, High, Urgent
    status: string; // Not Started, In Progress, Waiting on Client, Waiting on Vendor, Completed
    dueDate: string;
    waitingOn: string;
    relatedService: string;
    notes: string;
}

interface Platform {
    id: string;
    clientName: string; // E.g., Power Digital (Overhead) or client name
    platformName: string;
    type: string; // CRM, Hosting, Domain, Email Marketing, Payment Processor, etc.
    loginEmail: string;
    plan: string;
    status: string; // Active, Paused, Cancelled
    monthlyCost: number;
    paidBy: string; // Power Digital, Client, Included
    renewalDate: string;
    accessLevel: string;
    notes: string;
}

interface DomainHosting {
    id: string;
    clientName: string;
    domain: string;
    registrar: string;
    hostingProvider: string;
    renewalDate: string;
    owner: string;
    autoRenew: string; // Yes, No
    cost: number;
    notes: string;
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

interface NexusDb {
    clients: Client[];
    services: Service[];
    payments: Payment[];
    tasks: Task[];
    platforms: Platform[];
    domainsHosting: DomainHosting[];
    salesPipeline: SalesLead[];
    notes: ClientNote[];
}

type TabType = 'clients' | 'services' | 'payments' | 'tasks' | 'platforms' | 'domainsHosting' | 'salesPipeline' | 'notes';

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
        notes: []
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('clients');

    // Modals
    const [openModal, setOpenModal] = useState<TabType | null>(null);
    const [sendingInvoiceId, setSendingInvoiceId] = useState<string | null>(null);

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
                    notes: payload.data.notes || []
                };
                setDb(normalized);
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

    // Financial calculations matching spreadsheet rules
    const activeClientsCount = db.clients.filter(c => c.status === "Active").length;
    
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
            plan: plPlan,
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
            domain: dDomain,
            registrar: dRegistrar,
            hostingProvider: dHost,
            renewalDate: dRenew || new Date().toISOString().split('T')[0],
            owner: dOwner,
            autoRenew: dAuto,
            cost: Number(dCost) || 0,
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
                            <button
                                onClick={() => setOpenModal(activeTab)}
                                className="px-5 py-3.5 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 self-start"
                            >
                                <Plus className="w-4 h-4" /> Add Record to {activeTab.replace(/([A-Z])/g, ' $1').trim()}
                            </button>
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

                        {/* TAX VAULT HUD & LEDGER PANEL (Only shows on Payments and Overview tabs) */}
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
                                { key: 'services', label: 'Services' },
                                { key: 'payments', label: 'Payments' },
                                { key: 'tasks', label: 'Tasks' },
                                { key: 'platforms', label: 'Platforms (Overhead)' },
                                { key: 'domainsHosting', label: 'Domains & Hosting' },
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
                                {activeTab === 'clients' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                    <th className="py-4 px-6">Client / Company Name</th>
                                                    <th className="py-4 px-6">Owner / Contact</th>
                                                    <th className="py-4 px-6">Email / Phone</th>
                                                    <th className="py-4 px-6">Status</th>
                                                    <th className="py-4 px-6">Monthly Value</th>
                                                    <th className="py-4 px-6">Next Follow-Up</th>
                                                    <th className="py-4 px-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {db.clients.map((c) => (
                                                    <tr key={c.id} className="border-b border-white/5 text-xs text-white hover:bg-white/[0.01]">
                                                        <td className="py-5 px-6 font-bold">{c.companyName}</td>
                                                        <td className="py-5 px-6">{c.name}</td>
                                                        <td className="py-5 px-6 font-mono text-white/60">
                                                            <div>{c.email}</div>
                                                            <div className="text-[10px] text-white/40">{c.phone}</div>
                                                        </td>
                                                        <td className="py-5 px-6">
                                                            <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${c.status === 'Active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/50'}`}>
                                                                {c.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-5 px-6 font-mono">${c.monthlyValue}/mo</td>
                                                        <td className="py-5 px-6 font-mono text-white/60">{c.nextFollowUp}</td>
                                                        <td className="py-5 px-6 text-right">
                                                            <button onClick={() => handleDeleteRecord('clients', c.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all">
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {db.clients.length === 0 && (
                                                    <tr><td colSpan={7} className="py-12 text-center text-white/20 italic">No client records found.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
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
                                                        <td className="py-5 px-6 font-mono text-[11px] text-white/40">{p.plan || "Standard"}</td>
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
                                                        <td className="py-5 px-6 font-mono text-accent">{d.domain}</td>
                                                        <td className="py-5 px-6 text-white/60">{d.registrar}</td>
                                                        <td className="py-5 px-6 text-white/60">{d.hostingProvider}</td>
                                                        <td className="py-5 px-6 font-mono text-white/40">{d.renewalDate}</td>
                                                        <td className="py-5 px-6 font-mono">${d.cost}</td>
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

                <Footer />
            </main>
        </AdminGuard>
    );
}
