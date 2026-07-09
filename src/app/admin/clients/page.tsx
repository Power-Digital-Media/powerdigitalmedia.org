"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Terminal,
    Users,
    DollarSign,
    Plus,
    Check,
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
    CheckCircle2,
    Clock,
    X
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
    email: string;
    phone: string;
    services: string[];
    monthlyFee: number;
    totalPaid: number;
    paymentStatus: 'paid' | 'unpaid' | 'past_due' | 'waived';
    deliverablesOwed: string[];
    waitingOn: string[];
    nextFollowUpDate: string;
    followUpReason: string;
    notes?: string;
}

interface Overhead {
    id: string;
    name: string;
    cost: number;
    billingCycle: 'monthly' | 'yearly';
    category: string;
    renewalDate: string;
}

interface Payment {
    id: string;
    clientId: string;
    clientName?: string;
    amount: number;
    date: string;
    description: string;
}

interface NexusDb {
    clients: Client[];
    overhead: Overhead[];
    payments: Payment[];
}

export default function NexusRegistryDashboard() {
    const { user } = useAuth();
    const [db, setDb] = useState<NexusDb>({ clients: [], overhead: [], payments: [] });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'clients' | 'overhead' | 'payments'>('clients');

    // Selections
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    // Form Modals
    const [showAddClient, setShowAddClient] = useState(false);
    const [showAddOverhead, setShowAddOverhead] = useState(false);
    const [showLogPayment, setShowLogPayment] = useState(false);

    // Form inputs: Client
    const [cName, setCName] = useState("");
    const [cCompany, setCCompany] = useState("");
    const [cEmail, setCEmail] = useState("");
    const [cPhone, setCPhone] = useState("");
    const [cServices, setCServices] = useState("");
    const [cMonthlyFee, setCMonthlyFee] = useState(0);
    const [cFollowUpDate, setCFollowUpDate] = useState("");
    const [cFollowUpReason, setCFollowUpReason] = useState("");
    const [cNotes, setCNotes] = useState("");

    // Form inputs: Overhead
    const [oName, setOName] = useState("");
    const [oCost, setOCost] = useState(0);
    const [oCycle, setOCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [oCategory, setOCategory] = useState("Software/SaaS");
    const [oRenewal, setORenewal] = useState("");

    // Form inputs: Payment
    const [pClientId, setPClientId] = useState("");
    const [pAmount, setPAmount] = useState(0);
    const [pDate, setPDate] = useState(new Date().toISOString().split('T')[0]);
    const [pDesc, setPDesc] = useState("Monthly Web & Integration Retainer");

    // Form inputs: Checklist edits
    const [newOwedItem, setNewOwedItem] = useState("");
    const [newWaitingItem, setNewWaitingItem] = useState("");

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
                setDb(payload.data);
                if (payload.data.clients && payload.data.clients.length > 0) {
                    setSelectedClient(payload.data.clients[0]);
                }
            }
        } catch (err) {
            console.error("Failed to load database:", err);
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
                // Resync selection
                if (selectedClient) {
                    const matched = updatedDb.clients.find(c => c.id === selectedClient.id);
                    setSelectedClient(matched || null);
                }
            }
        } catch (err) {
            console.error("Failed to save database:", err);
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDatabase();
        }
    }, [user]);

    // Financial aggregation stats
    const totalMRR = db.clients.reduce((sum, c) => sum + (Number(c.monthlyFee) || 0), 0);
    const totalOverhead = db.overhead.reduce((sum, o) => {
        const cost = Number(o.cost) || 0;
        return sum + (o.billingCycle === 'yearly' ? cost / 12 : cost);
    }, 0);
    const netProfit = totalMRR - totalOverhead;
    const totalLifetimeGross = db.payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    const handleCreateClient = async (e: React.FormEvent) => {
        e.preventDefault();
        const servicesArray = cServices.split(',').map(s => s.trim()).filter(Boolean);
        const newClient: Client = {
            id: `client-${Date.now()}`,
            name: cName,
            companyName: cCompany,
            email: cEmail,
            phone: cPhone,
            services: servicesArray,
            monthlyFee: Number(cMonthlyFee) || 0,
            totalPaid: 0,
            paymentStatus: 'unpaid',
            deliverablesOwed: [],
            waitingOn: [],
            nextFollowUpDate: cFollowUpDate || new Date().toISOString().split('T')[0],
            followUpReason: cFollowUpReason || "Initial Setup",
            notes: cNotes
        };

        const updatedDb = {
            ...db,
            clients: [...db.clients, newClient]
        };

        await saveDatabase(updatedDb);
        setShowAddClient(false);
        setSelectedClient(newClient);

        // Reset fields
        setCName("");
        setCCompany("");
        setCEmail("");
        setCPhone("");
        setCServices("");
        setCMonthlyFee(0);
        setCFollowUpDate("");
        setCFollowUpReason("");
        setCNotes("");
    };

    const handleAddOverhead = async (e: React.FormEvent) => {
        e.preventDefault();
        const newExpense: Overhead = {
            id: `exp-${Date.now()}`,
            name: oName,
            cost: Number(oCost) || 0,
            billingCycle: oCycle,
            category: oCategory,
            renewalDate: oRenewal || new Date().toISOString().split('T')[0]
        };

        const updatedDb = {
            ...db,
            overhead: [...db.overhead, newExpense]
        };

        await saveDatabase(updatedDb);
        setShowAddOverhead(false);

        setOName("");
        setOCost(0);
        setOCycle("monthly");
        setOCategory("Software/SaaS");
        setORenewal("");
    };

    const handleLogPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pClientId) return;

        const matchedClient = db.clients.find(c => c.id === pClientId);
        const newPayment: Payment = {
            id: `pay-${Date.now()}`,
            clientId: pClientId,
            amount: Number(pAmount) || 0,
            date: pDate,
            description: pDesc
        };

        // Update totalPaid and paymentStatus on Client
        const updatedClients = db.clients.map(c => {
            if (c.id === pClientId) {
                return {
                    ...c,
                    totalPaid: (c.totalPaid || 0) + Number(pAmount),
                    paymentStatus: 'paid' as const
                };
            }
            return c;
        });

        const updatedDb = {
            ...db,
            clients: updatedClients,
            payments: [...db.payments, newPayment]
        };

        await saveDatabase(updatedDb);
        setShowLogPayment(false);

        setPClientId("");
        setPAmount(0);
        setPDate(new Date().toISOString().split('T')[0]);
        setPDesc("Monthly Web & Integration Retainer");
    };

    const handleDeleteClient = async (clientId: string) => {
        if (!confirm("Are you sure you want to delete this client? All metrics will adjust accordingly.")) return;
        const updatedClients = db.clients.filter(c => c.id !== clientId);
        const updatedPayments = db.payments.filter(p => p.clientId !== clientId);
        const updatedDb = {
            ...db,
            clients: updatedClients,
            payments: updatedPayments
        };
        await saveDatabase(updatedDb);
        if (selectedClient?.id === clientId) {
            setSelectedClient(updatedClients[0] || null);
        }
    };

    const handleDeleteOverhead = async (id: string) => {
        if (!confirm("Are you sure you want to delete this overhead expense?")) return;
        const updatedDb = {
            ...db,
            overhead: db.overhead.filter(o => o.id !== id)
        };
        await saveDatabase(updatedDb);
    };

    // Checklist toggles
    const handleAddOwed = async () => {
        if (!selectedClient || !newOwedItem.trim()) return;
        const updatedClients = db.clients.map(c => {
            if (c.id === selectedClient.id) {
                return {
                    ...c,
                    deliverablesOwed: [...(c.deliverablesOwed || []), newOwedItem.trim()]
                };
            }
            return c;
        });
        await saveDatabase({ ...db, clients: updatedClients });
        setNewOwedItem("");
    };

    const handleRemoveOwed = async (index: number) => {
        if (!selectedClient) return;
        const updatedClients = db.clients.map(c => {
            if (c.id === selectedClient.id) {
                const list = [...c.deliverablesOwed];
                list.splice(index, 1);
                return { ...c, deliverablesOwed: list };
            }
            return c;
        });
        await saveDatabase({ ...db, clients: updatedClients });
    };

    const handleAddWaiting = async () => {
        if (!selectedClient || !newWaitingItem.trim()) return;
        const updatedClients = db.clients.map(c => {
            if (c.id === selectedClient.id) {
                return {
                    ...c,
                    waitingOn: [...(c.waitingOn || []), newWaitingItem.trim()]
                };
            }
            return c;
        });
        await saveDatabase({ ...db, clients: updatedClients });
        setNewWaitingItem("");
    };

    const handleRemoveWaiting = async (index: number) => {
        if (!selectedClient) return;
        const updatedClients = db.clients.map(c => {
            if (c.id === selectedClient.id) {
                const list = [...c.waitingOn];
                list.splice(index, 1);
                return { ...c, waitingOn: list };
            }
            return c;
        });
        await saveDatabase({ ...db, clients: updatedClients });
    };

    // Update Client Follow-up
    const handleUpdateFollowUp = async (date: string, reason: string) => {
        if (!selectedClient) return;
        const updatedClients = db.clients.map(c => {
            if (c.id === selectedClient.id) {
                return {
                    ...c,
                    nextFollowUpDate: date,
                    followUpReason: reason
                };
            }
            return c;
        });
        await saveDatabase({ ...db, clients: updatedClients });
    };

    // Update Client Payment Status
    const handleUpdatePaymentStatus = async (status: 'paid' | 'unpaid' | 'past_due' | 'waived') => {
        if (!selectedClient) return;
        const updatedClients = db.clients.map(c => {
            if (c.id === selectedClient.id) {
                return {
                    ...c,
                    paymentStatus: status
                };
            }
            return c;
        });
        await saveDatabase({ ...db, clients: updatedClients });
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
                            <span className="text-accent">Registry Console</span>
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
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Shared Agent Registry Active</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <section className="relative pt-48 pb-24">
                    <div className="container px-6 mx-auto space-y-12">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                                        <Terminal className="w-5 h-5 text-accent" />
                                    </div>
                                    <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
                                        Registry <span className="text-accent">Console</span>
                                    </h1>
                                </div>
                                <p className="text-white/40 font-medium italic text-sm">
                                    Track clients, deliverables, blockers, overhead, and financial health in a shared local-first engine.
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <button
                                    onClick={() => setShowAddClient(true)}
                                    className="px-5 py-3 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" /> Add Client
                                </button>
                                <button
                                    onClick={() => setShowAddOverhead(true)}
                                    className="px-5 py-3 rounded-xl glass-card border-white/5 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" /> Add Overhead
                                </button>
                                <button
                                    onClick={() => setShowLogPayment(true)}
                                    className="px-5 py-3 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                                >
                                    <CreditCard className="w-4 h-4" /> Log Payment
                                </button>
                            </div>
                        </div>

                        {/* Financial stats HUD */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="p-8 rounded-[2rem] glass-card border-white/5 bg-white/[0.02] flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Monthly Revenue (MRR)</span>
                                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight">${totalMRR.toLocaleString()}</h3>
                                <p className="text-[10px] text-emerald-400 font-bold mt-2">Aggregate B2B Retainers</p>
                            </div>

                            <div className="p-8 rounded-[2rem] glass-card border-white/5 bg-white/[0.02] flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Monthly Overhead</span>
                                    <Settings className="w-4 h-4 text-red-400" />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight">${Math.round(totalOverhead).toLocaleString()}</h3>
                                <p className="text-[10px] text-red-400 font-bold mt-2">Active Infrastructure Cost</p>
                            </div>

                            <div className="p-8 rounded-[2rem] glass-card border-white/5 bg-white/[0.02] flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Net Profit Margin</span>
                                    <DollarSign className="w-4 h-4 text-accent" />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight">${Math.round(netProfit).toLocaleString()}</h3>
                                <p className="text-[10px] text-accent font-bold mt-2">
                                    {totalMRR > 0 ? `${Math.round((netProfit / totalMRR) * 100)}% Profit Margin` : "0% Margin"}
                                </p>
                            </div>

                            <div className="p-8 rounded-[2rem] glass-card border-white/5 bg-white/[0.02] flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Lifetime Earnings</span>
                                    <FileText className="w-4 h-4 text-blue-400" />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight">${totalLifetimeGross.toLocaleString()}</h3>
                                <p className="text-[10px] text-blue-400 font-bold mt-2">Total Gross Invoiced</p>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex border-b border-white/5 gap-6">
                            <button
                                onClick={() => setActiveTab('clients')}
                                className={`pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'clients' ? 'border-accent text-accent' : 'border-transparent text-white/40 hover:text-white'}`}
                            >
                                Client Registry ({db.clients.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('overhead')}
                                className={`pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'overhead' ? 'border-accent text-accent' : 'border-transparent text-white/40 hover:text-white'}`}
                            >
                                Overhead & Subscriptions ({db.overhead.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('payments')}
                                className={`pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'payments' ? 'border-accent text-accent' : 'border-transparent text-white/40 hover:text-white'}`}
                            >
                                Payments History ({db.payments.length})
                            </button>
                        </div>

                        {/* Tab Content */}
                        {loading ? (
                            <div className="py-24 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="w-8 h-8 text-accent animate-spin" />
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Loading Ledger...</span>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {/* TAB 1: CLIENTS */}
                                {activeTab === 'clients' && (
                                    <div className="flex flex-col lg:flex-row gap-8">
                                        {/* Client List Table */}
                                        <div className="flex-1 glass-card border-white/5 rounded-[2rem] overflow-hidden bg-white/[0.01]">
                                            <div className="p-6 border-b border-white/5">
                                                <h3 className="text-xs font-black uppercase tracking-widest text-white/40">Active Clients</h3>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                            <th className="py-4 px-6">Client / Company</th>
                                                            <th className="py-4 px-6">Fee (MRR)</th>
                                                            <th className="py-4 px-6">Status</th>
                                                            <th className="py-4 px-6">Next Follow-Up</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {db.clients.map((client) => {
                                                            const isSelected = selectedClient?.id === client.id;
                                                            const followUpOverdue = new Date(client.nextFollowUpDate) < new Date();
                                                            return (
                                                                <tr
                                                                    key={client.id}
                                                                    onClick={() => setSelectedClient(client)}
                                                                    className={`border-b border-white/5 cursor-pointer transition-all hover:bg-white/[0.02] ${isSelected ? 'bg-accent/[0.04] border-l-2 border-l-accent' : ''}`}
                                                                >
                                                                    <td className="py-5 px-6">
                                                                        <div className="font-bold text-sm text-white">{client.name}</div>
                                                                        <div className="text-xs text-white/40">{client.companyName}</div>
                                                                    </td>
                                                                    <td className="py-5 px-6 font-mono text-sm">${client.monthlyFee}/mo</td>
                                                                    <td className="py-5 px-6">
                                                                        <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${client.paymentStatus === 'paid' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : client.paymentStatus === 'unpaid' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
                                                                            {client.paymentStatus}
                                                                        </span>
                                                                    </td>
                                                                    <td className="py-5 px-6 text-xs font-mono">
                                                                        <div className="flex items-center gap-2">
                                                                            <Calendar className={`w-3.5 h-3.5 ${followUpOverdue ? 'text-red-400' : 'text-white/40'}`} />
                                                                            <span className={followUpOverdue ? 'text-red-400 font-bold' : 'text-white/60'}>
                                                                                {client.nextFollowUpDate}
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                        {db.clients.length === 0 && (
                                                            <tr>
                                                                <td colSpan={4} className="py-12 text-center text-xs text-white/20 italic">No clients registered. Click "Add Client" to start.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Client Details Slide-out/Panel */}
                                        <div className="w-full lg:w-[450px] space-y-6">
                                            {selectedClient ? (
                                                <div className="p-8 rounded-[2rem] glass-card border-white/5 bg-white/[0.02] space-y-8 relative">
                                                    <button
                                                        onClick={() => handleDeleteClient(selectedClient.id)}
                                                        className="absolute top-6 right-6 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all"
                                                        title="Delete Client"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>

                                                    {/* Company Identity */}
                                                    <div className="space-y-2">
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-accent">Active Protocol</span>
                                                        <h2 className="text-2xl font-black uppercase tracking-tighter">{selectedClient.companyName}</h2>
                                                        <div className="text-white/60 font-bold text-sm">{selectedClient.name}</div>
                                                        <div className="text-xs text-white/40 space-y-1 pt-2">
                                                            <div>Email: {selectedClient.email}</div>
                                                            <div>Phone: {selectedClient.phone}</div>
                                                        </div>
                                                    </div>

                                                    {/* Services */}
                                                    <div className="space-y-3">
                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                                                            <Briefcase className="w-3.5 h-3.5" /> What are they paying for?
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedClient.services.map((svc, i) => (
                                                                <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80">
                                                                    {svc}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Deliverables Checklist */}
                                                    <div className="space-y-4">
                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                                                            <ListTodo className="w-3.5 h-3.5 text-accent" /> What do I owe them?
                                                        </h4>
                                                        <div className="space-y-2.5">
                                                            {(selectedClient.deliverablesOwed || []).map((item, idx) => (
                                                                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-white/80 group">
                                                                    <span>{item}</span>
                                                                    <button
                                                                        onClick={() => handleRemoveOwed(idx)}
                                                                        className="p-1 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                    >
                                                                        <Trash2 className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            <div className="flex gap-2 pt-1">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Add task owed..."
                                                                    value={newOwedItem}
                                                                    onChange={(e) => setNewOwedItem(e.target.value)}
                                                                    className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-accent/40"
                                                                />
                                                                <button
                                                                    onClick={handleAddOwed}
                                                                    className="p-2.5 rounded-xl bg-accent text-black hover:scale-105 transition-transform"
                                                                >
                                                                    <Plus className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Blockers Checklist */}
                                                    <div className="space-y-4">
                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                                                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> What am I waiting on?
                                                        </h4>
                                                        <div className="space-y-2.5">
                                                            {(selectedClient.waitingOn || []).map((item, idx) => (
                                                                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-white/80 group">
                                                                    <span>{item}</span>
                                                                    <button
                                                                        onClick={() => handleRemoveWaiting(idx)}
                                                                        className="p-1 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                    >
                                                                        <Trash2 className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            <div className="flex gap-2 pt-1">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Add dependency waiting on..."
                                                                    value={newWaitingItem}
                                                                    onChange={(e) => setNewWaitingItem(e.target.value)}
                                                                    className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-accent/40"
                                                                />
                                                                <button
                                                                    onClick={handleAddWaiting}
                                                                    className="p-2.5 rounded-xl bg-accent text-black hover:scale-105 transition-transform"
                                                                >
                                                                    <Plus className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Follow-up scheduler */}
                                                    <div className="space-y-4 pt-4 border-t border-white/5">
                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                                                            <Calendar className="w-3.5 h-3.5 text-blue-400" /> When to follow up?
                                                        </h4>
                                                        <div className="grid gap-3">
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="date"
                                                                    value={selectedClient.nextFollowUpDate}
                                                                    onChange={(e) => handleUpdateFollowUp(e.target.value, selectedClient.followUpReason)}
                                                                    className="bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-accent/40"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Follow-up reason"
                                                                    value={selectedClient.followUpReason}
                                                                    onChange={(e) => handleUpdateFollowUp(selectedClient.nextFollowUpDate, e.target.value)}
                                                                    className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-accent/40"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Manual Payment status toggles */}
                                                    <div className="space-y-3 pt-4 border-t border-white/5">
                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Manual Payment Status Override</h4>
                                                        <div className="grid grid-cols-4 gap-2">
                                                            {(['paid', 'unpaid', 'past_due', 'waived'] as const).map((status) => (
                                                                <button
                                                                    key={status}
                                                                    onClick={() => handleUpdatePaymentStatus(status)}
                                                                    className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider border transition-all ${selectedClient.paymentStatus === status ? 'bg-accent/15 border-accent text-accent' : 'bg-black/20 border-white/5 text-white/40 hover:text-white'}`}
                                                                >
                                                                    {status}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* General Notes */}
                                                    {selectedClient.notes && (
                                                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/50 italic">
                                                            Notes: {selectedClient.notes}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="py-24 text-center glass-card border-white/5 rounded-[2rem] bg-white/[0.01] text-xs text-white/20 italic">
                                                    Select a client to view details.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* TAB 2: OVERHEAD */}
                                {activeTab === 'overhead' && (
                                    <div className="glass-card border-white/5 rounded-[2rem] overflow-hidden bg-white/[0.01]">
                                        <div className="p-6 border-b border-white/5">
                                            <h3 className="text-xs font-black uppercase tracking-widest text-white/40">Subscriptions & Overhead Costs</h3>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                        <th className="py-4 px-6">Service Name</th>
                                                        <th className="py-4 px-6">Cost</th>
                                                        <th className="py-4 px-6">Category</th>
                                                        <th className="py-4 px-6">Renewal Date</th>
                                                        <th className="py-4 px-6">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {db.overhead.map((item) => (
                                                        <tr key={item.id} className="border-b border-white/5 text-sm text-white hover:bg-white/[0.01]">
                                                            <td className="py-5 px-6 font-bold">{item.name}</td>
                                                            <td className="py-5 px-6 font-mono">${item.cost} / {item.billingCycle}</td>
                                                            <td className="py-5 px-6 text-xs text-white/60">{item.category}</td>
                                                            <td className="py-5 px-6 font-mono text-xs text-white/40">{item.renewalDate}</td>
                                                            <td className="py-5 px-6">
                                                                <button
                                                                    onClick={() => handleDeleteOverhead(item.id)}
                                                                    className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all"
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {db.overhead.length === 0 && (
                                                        <tr>
                                                            <td colSpan={5} className="py-12 text-center text-xs text-white/20 italic">No overhead expenses documented. Click "Add Overhead" to start.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 3: PAYMENTS */}
                                {activeTab === 'payments' && (
                                    <div className="glass-card border-white/5 rounded-[2rem] overflow-hidden bg-white/[0.01]">
                                        <div className="p-6 border-b border-white/5">
                                            <h3 className="text-xs font-black uppercase tracking-widest text-white/40">Invoiced Payments Received</h3>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/20">
                                                        <th className="py-4 px-6">Client</th>
                                                        <th className="py-4 px-6">Amount</th>
                                                        <th className="py-4 px-6">Payment Date</th>
                                                        <th className="py-4 px-6">Memo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {db.payments.map((item) => {
                                                        const client = db.clients.find(c => c.id === item.clientId);
                                                        return (
                                                            <tr key={item.id} className="border-b border-white/5 text-sm text-white hover:bg-white/[0.01]">
                                                                <td className="py-5 px-6">
                                                                    <div className="font-bold">{client?.companyName || "External Client"}</div>
                                                                    <div className="text-xs text-white/40">{client?.name || ""}</div>
                                                                </td>
                                                                <td className="py-5 px-6 font-mono font-bold text-emerald-400">+${item.amount}</td>
                                                                <td className="py-5 px-6 font-mono text-xs text-white/40">{item.date}</td>
                                                                <td className="py-5 px-6 text-xs text-white/60">{item.description}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                    {db.payments.length === 0 && (
                                                        <tr>
                                                            <td colSpan={4} className="py-12 text-center text-xs text-white/20 italic">No payments logged yet. Click "Log Payment" to start.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* MODAL: ADD CLIENT */}
                {showAddClient && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-lg glass-card border-white/5 bg-zinc-950 p-8 rounded-[2rem] space-y-6 relative max-h-[90vh] overflow-y-auto"
                        >
                            <button onClick={() => setShowAddClient(false)} className="absolute top-6 right-6 text-white/40 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-xl font-black uppercase tracking-tighter">Add New <span className="text-accent">Client</span></h3>
                            <form onSubmit={handleCreateClient} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Contact Name</label>
                                        <input required type="text" value={cName} onChange={e => setCName(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent/40" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Company Name</label>
                                        <input required type="text" value={cCompany} onChange={e => setCCompany(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent/40" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Email</label>
                                        <input required type="email" value={cEmail} onChange={e => setCEmail(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent/40" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Phone</label>
                                        <input required type="text" value={cPhone} onChange={e => setCPhone(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent/40" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Services (Comma Separated)</label>
                                    <input required type="text" placeholder="e.g. Web Design, Marketing Retainer" value={cServices} onChange={e => setCServices(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent/40" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Monthly Retainer Fee ($)</label>
                                        <input required type="number" value={cMonthlyFee} onChange={e => setCMonthlyFee(Number(e.target.value))} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent/40" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Next Follow-Up Date</label>
                                        <input type="date" value={cFollowUpDate} onChange={e => setCFollowUpDate(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent/40" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Follow-Up Reason</label>
                                    <input type="text" placeholder="e.g., Deliver landing page mockup" value={cFollowUpReason} onChange={e => setCFollowUpReason(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent/40" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Additional Notes</label>
                                    <textarea value={cNotes} onChange={e => setCNotes(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent/40 h-20 resize-none" />
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                                    Commit Client Record
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* MODAL: ADD OVERHEAD */}
                {showAddOverhead && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-md glass-card border-white/5 bg-zinc-950 p-8 rounded-[2rem] space-y-6 relative"
                        >
                            <button onClick={() => setShowAddOverhead(false)} className="absolute top-6 right-6 text-white/40 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-xl font-black uppercase tracking-tighter">Add <span className="text-accent">Overhead Cost</span></h3>
                            <form onSubmit={handleAddOverhead} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Service/Subscription Name</label>
                                    <input required type="text" placeholder="e.g. Capsule CRM" value={oName} onChange={e => setOName(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent/40" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Cost ($)</label>
                                        <input required type="number" value={oCost} onChange={e => setOCost(Number(e.target.value))} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent/40" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Billing Cycle</label>
                                        <select value={oCycle} onChange={e => setOCycle(e.target.value as any)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none">
                                            <option value="monthly">Monthly</option>
                                            <option value="yearly">Yearly</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Category</label>
                                        <input type="text" placeholder="e.g. Software/SaaS" value={oCategory} onChange={e => setOCategory(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Next Renewal Date</label>
                                        <input type="date" value={oRenewal} onChange={e => setORenewal(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                                    Add Subscription
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* MODAL: LOG PAYMENT */}
                {showLogPayment && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-md glass-card border-white/5 bg-zinc-950 p-8 rounded-[2rem] space-y-6 relative"
                        >
                            <button onClick={() => setShowLogPayment(false)} className="absolute top-6 right-6 text-white/40 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-xl font-black uppercase tracking-tighter">Log Client <span className="text-accent">Payment</span></h3>
                            <form onSubmit={handleLogPayment} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Select Client</label>
                                    <select required value={pClientId} onChange={e => setPClientId(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none">
                                        <option value="">-- Choose Client --</option>
                                        {db.clients.map(c => (
                                            <option key={c.id} value={c.id}>{c.companyName} ({c.name})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Amount Paid ($)</label>
                                        <input required type="number" value={pAmount} onChange={e => setPAmount(Number(e.target.value))} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Payment Date</label>
                                        <input required type="date" value={pDate} onChange={e => setPDate(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Payment Description / Memo</label>
                                    <input type="text" value={pDesc} onChange={e => setPDesc(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                                    Log Received Payment
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}

                <Footer />
            </main>
        </AdminGuard>
    );
}
