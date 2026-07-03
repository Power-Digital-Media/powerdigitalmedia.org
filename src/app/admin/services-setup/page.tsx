"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Terminal,
    Building2,
    User,
    Mail,
    Phone,
    Globe,
    Clock,
    Shield,
    Users,
    Volume2,
    Zap,
    Cpu,
    ArrowUpRight,
    Loader2,
    CheckCircle,
    XCircle,
    HelpCircle,
    Lock,
    Key,
    Plus,
    Check
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AdminGuard from "@/components/auth/AdminGuard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { ClientSetup } from "@/lib/client-setup";

export default function AdminServicesSetupDashboard() {
    const { user } = useAuth();
    const [requests, setRequests] = useState<ClientSetup[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<ClientSetup | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null); // 'capsule' | 'transpond' | 'ultatel'
    const [actionError, setActionError] = useState<string | null>(null);
    const [actionSuccess, setActionSuccess] = useState<string | null>(null);

    // Inputs for provisioning
    const [ultatelInputKey, setUltatelInputKey] = useState("");

    const fetchRequests = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const token = await user.getIdToken();
            const res = await fetch("/api/admin/client-setups", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                setRequests(data.requests || []);
                if (data.requests && data.requests.length > 0) {
                    // Retain selection if exists
                    if (selectedRequest) {
                        const updatedSelected = data.requests.find(
                            (r: ClientSetup) => r.id === selectedRequest.id
                        );
                        setSelectedRequest(updatedSelected || data.requests[0]);
                    } else {
                        setSelectedRequest(data.requests[0]);
                    }
                }
            } else {
                console.error("Failed to load setups:", data.error);
            }
        } catch (err) {
            console.error("Network error fetching setups:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchRequests();
        }
    }, [user]);

    // Format Timestamp
    const formatDate = (ts: any) => {
        if (!ts) return "Unknown";
        const date = ts._seconds ? new Date(ts._seconds * 1000) : new Date(ts);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    /* ─── Provisioning Actions ──────────────────────────────────────── */

    const handleProvisionCapsule = async () => {
        if (!selectedRequest || !user) return;
        setActionLoading("capsule");
        setActionError(null);
        setActionSuccess(null);

        try {
            const token = await user.getIdToken();
            const res = await fetch("/api/admin/onboard/capsule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ onboardingId: selectedRequest.id })
            });

            const data = await res.json();
            if (res.ok) {
                setActionSuccess("Capsule CRM client organization successfully provisioned!");
                await fetchRequests();
            } else {
                setActionError(data.error || "Failed to provision Capsule CRM.");
            }
        } catch (err: any) {
            setActionError(err.message || "A network error occurred.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleProvisionTranspond = async () => {
        if (!selectedRequest || !user) return;
        setActionLoading("transpond");
        setActionError(null);
        setActionSuccess(null);

        try {
            const token = await user.getIdToken();
            const res = await fetch("/api/admin/onboard/transpond", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ onboardingId: selectedRequest.id })
            });

            const data = await res.json();
            if (res.ok) {
                setActionSuccess("Transpond subscriber account successfully provisioned!");
                await fetchRequests();
            } else {
                setActionError(data.error || "Failed to register Transpond account.");
            }
        } catch (err: any) {
            setActionError(err.message || "A network error occurred.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleProvisionUltatel = async () => {
        if (!selectedRequest || !user || !ultatelInputKey.trim()) return;
        setActionLoading("ultatel");
        setActionError(null);
        setActionSuccess(null);

        try {
            const token = await user.getIdToken();
            const res = await fetch("/api/admin/onboard/ultatel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    onboardingId: selectedRequest.id,
                    ultatelApiKey: ultatelInputKey.trim()
                })
            });

            const data = await res.json();
            if (res.ok) {
                setActionSuccess(`Ultatel integration verified & webhook bound successfully! PBX ID: ${data.pbxId}`);
                setUltatelInputKey("");
                await fetchRequests();
            } else {
                setActionError(data.error || "Failed to verify PBX connection.");
            }
        } catch (err: any) {
            setActionError(err.message || "A network error occurred.");
        } finally {
            setActionLoading(null);
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
                            <span className="text-white/20">Nexus Admin</span>
                            <span className="text-white/20">/</span>
                            <span className="text-accent">Client Setups</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Admin Clearance Active</span>
                        </div>
                    </div>
                </div>

                <section className="relative pt-48 pb-24 min-h-[90vh]">
                    <div className="container px-6 mx-auto">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                                <Terminal className="w-5 h-5 text-accent" />
                            </div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
                                Client <span className="text-accent">Services Setup</span>
                            </h1>
                        </div>

                        {loading ? (
                            <div className="h-96 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="w-8 h-8 text-accent animate-spin" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent animate-pulse">
                                    Syncing Nexus DB...
                                </span>
                            </div>
                        ) : requests.length === 0 ? (
                            <div className="h-96 border border-white/5 rounded-3xl bg-white/[0.01] flex flex-col items-center justify-center text-center p-8">
                                <Building2 className="w-12 h-12 text-slate-500 mb-4" />
                                <h3 className="text-lg font-bold uppercase text-white mb-2">No Setup Requests</h3>
                                <p className="text-xs text-slate-500 max-w-sm">
                                    No client setup profiles have been submitted yet. Share the client setup link with your clients to populate this dashboard.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-8 lg:grid-cols-12 items-start">
                                {/* Left Side List */}
                                <div className="lg:col-span-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2 mb-2">
                                        Client Setup Submissions ({requests.length})
                                    </div>
                                    {requests.map((req) => {
                                        const isSelected = selectedRequest?.id === req.id;
                                        return (
                                            <div
                                                key={req.id}
                                                onClick={() => {
                                                    setSelectedRequest(req);
                                                    setActionError(null);
                                                    setActionSuccess(null);
                                                }}
                                                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                                                    isSelected
                                                        ? "bg-accent/10 border-accent shadow-[0_0_30px_rgba(34,211,238,0.1)]"
                                                        : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-3 mb-3">
                                                    <h4 className="font-bold text-sm text-white truncate max-w-[70%]">
                                                        {req.companyName}
                                                    </h4>
                                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                                                        req.status === "completed"
                                                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                                            : req.status === "failed"
                                                            ? "bg-red-500/10 border border-red-500/20 text-red-400"
                                                            : "bg-amber-500/10 border border-amber-500/20 text-amber-400 animate-pulse"
                                                    }`}>
                                                        {req.status}
                                                    </span>
                                                </div>
                                                <div className="text-[10px] text-slate-400 space-y-1 font-light">
                                                    <p className="truncate">Contact: {req.contactFirst} {req.contactLast}</p>
                                                    <p className="text-slate-600">Submitted: {formatDate(req.createdAt)}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Right Side Detail Pane */}
                                <div className="lg:col-span-8 space-y-6">
                                    {selectedRequest && (
                                        <div className="glass-card border border-white/5 bg-white/[0.01] rounded-[2rem] p-8 space-y-8 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />

                                            {/* Action Status Feedback */}
                                            {actionError && (
                                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                                                    <XCircle className="w-4 h-4 shrink-0" />
                                                    {actionError}
                                                </div>
                                            )}
                                            {actionSuccess && (
                                                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 shrink-0" />
                                                    {actionSuccess}
                                                </div>
                                            )}

                                            {/* Title Block */}
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
                                                <div>
                                                    <h2 className="text-2xl font-black uppercase text-white tracking-tight">
                                                        {selectedRequest.companyName}
                                                    </h2>
                                                    <p className="text-[10px] font-mono text-slate-500 mt-1">Setup ID: {selectedRequest.id}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] text-slate-500 font-mono">Status:</span>
                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                                        selectedRequest.status === "completed"
                                                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                                            : selectedRequest.status === "failed"
                                                            ? "bg-red-500/10 border border-red-500/20 text-red-400"
                                                            : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                                                    }`}>
                                                        {selectedRequest.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Info Grid */}
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div className="space-y-4">
                                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Client Profile</h3>
                                                    <div className="rounded-xl bg-[#0b0b0c] p-4 text-xs space-y-2 font-mono">
                                                        <div className="flex justify-between"><span className="text-slate-500">Website:</span> <a href={selectedRequest.website} target="_blank" className="text-accent underline truncate max-w-[70%]">{selectedRequest.website}</a></div>
                                                        <div className="flex justify-between"><span className="text-slate-500">Main Phone:</span> <span className="text-white">{selectedRequest.phone}</span></div>
                                                        <div className="flex justify-between"><span className="text-slate-500">Address:</span> <span className="text-white truncate max-w-[70%]">{selectedRequest.address}</span></div>
                                                        <div className="flex justify-between"><span className="text-slate-500">Operating Hours:</span> <span className="text-white">{selectedRequest.businessHours}</span></div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Contact</h3>
                                                    <div className="rounded-xl bg-[#0b0b0c] p-4 text-xs space-y-2 font-mono">
                                                        <div className="flex justify-between"><span className="text-slate-500">Name:</span> <span className="text-white">{selectedRequest.contactFirst} {selectedRequest.contactLast}</span></div>
                                                        <div className="flex justify-between"><span className="text-slate-500">Email:</span> <span className="text-white">{selectedRequest.contactEmail}</span></div>
                                                        <div className="flex justify-between"><span className="text-slate-500">Direct Phone:</span> <span className="text-white">{selectedRequest.contactPhone}</span></div>
                                                        <div className="flex justify-between"><span className="text-slate-500">Submitted:</span> <span className="text-white">{formatDate(selectedRequest.createdAt)}</span></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Provisioning HUD Steps */}
                                            <div className="space-y-6">
                                                <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-white/5 pb-2">
                                                    Service Provisioning Console
                                                </h3>

                                                {/* Capsule CRM step */}
                                                {selectedRequest.services?.capsule && (
                                                    <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                                                    <Users className="w-3.5 h-3.5" />
                                                                </div>
                                                                <span className="text-xs font-bold text-white uppercase tracking-tight">Capsule CRM Setup</span>
                                                            </div>
                                                            <div className="text-[10px] font-mono text-slate-500 space-y-1">
                                                                <p>Subdomain: <span className="text-white">{selectedRequest.capsuleSubdomain}.capsulecrm.com</span></p>
                                                                {selectedRequest.capsuleOrgId && (
                                                                    <p className="text-emerald-400 font-bold flex items-center gap-1">
                                                                        <Check className="w-3 h-3" /> Created in Capsule (Org ID: {selectedRequest.capsuleOrgId} | Contact ID: {selectedRequest.capsuleContactId})
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={handleProvisionCapsule}
                                                            disabled={actionLoading !== null || !!selectedRequest.capsuleOrgId}
                                                            className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                                                                selectedRequest.capsuleOrgId
                                                                    ? "border border-emerald-500/20 text-emerald-400 bg-emerald-500/5 cursor-not-allowed"
                                                                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg active:scale-95 disabled:opacity-50"
                                                            }`}
                                                        >
                                                            {actionLoading === "capsule" ? (
                                                                <>
                                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Provisioning...
                                                                </>
                                                            ) : selectedRequest.capsuleOrgId ? (
                                                                "CRM Synced"
                                                            ) : (
                                                                <>
                                                                    Setup Capsule <ArrowUpRight className="w-3 h-3" />
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Transpond step */}
                                                {selectedRequest.services?.transpond && (
                                                    <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                                                                    <Mail className="w-3.5 h-3.5" />
                                                                </div>
                                                                <span className="text-xs font-bold text-white uppercase tracking-tight">Transpond Marketing Setup</span>
                                                            </div>
                                                            <div className="text-[10px] font-mono text-slate-500 space-y-1">
                                                                <p>Admin Email: <span className="text-white">{selectedRequest.transpondEmail}</span></p>
                                                                {selectedRequest.transpondApiKey && (
                                                                    <p className="text-emerald-400 font-bold flex items-center gap-1">
                                                                        <Check className="w-3 h-3" /> Transpond Key: {selectedRequest.transpondApiKey.substring(0, 8)}... (Master ID: {selectedRequest.transpondAccountMasterId})
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={handleProvisionTranspond}
                                                            disabled={actionLoading !== null || !!selectedRequest.transpondApiKey}
                                                            className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                                                                selectedRequest.transpondApiKey
                                                                    ? "border border-emerald-500/20 text-emerald-400 bg-emerald-500/5 cursor-not-allowed"
                                                                    : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg active:scale-95 disabled:opacity-50"
                                                            }`}
                                                        >
                                                            {actionLoading === "transpond" ? (
                                                                <>
                                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Provisioning...
                                                                </>
                                                            ) : selectedRequest.transpondApiKey ? (
                                                                "Transpond Set Up"
                                                            ) : (
                                                                <>
                                                                    Provision Account <ArrowUpRight className="w-3 h-3" />
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Ultatel step */}
                                                {selectedRequest.services?.ultatel && (
                                                    <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-4">
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                                                        <Volume2 className="w-3.5 h-3.5" />
                                                                    </div>
                                                                    <span className="text-xs font-bold text-white uppercase tracking-tight">Ultatel Cloud PBX Node</span>
                                                                </div>
                                                                <div className="text-[10px] font-mono text-slate-500 space-y-1">
                                                                    <p>Users Seats: <span className="text-white">{(selectedRequest.ultatelUsers || []).length}</span></p>
                                                                    <p>Hardware Desk Phones: <span className="text-white">{selectedRequest.ultatelHardwareCount}</span></p>
                                                                    {selectedRequest.ultatelPortingDetails && (
                                                                        <p className="truncate max-w-sm">Port DIDs: <span className="text-slate-400 font-light">{selectedRequest.ultatelPortingDetails}</span></p>
                                                                    )}
                                                                    {selectedRequest.ultatelWebhookId && (
                                                                        <p className="text-emerald-400 font-bold flex items-center gap-1">
                                                                            <Check className="w-3 h-3" /> Webhook ID: {selectedRequest.ultatelWebhookId} (PBX ID: {selectedRequest.ultatelPbxId})
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {!selectedRequest.ultatelWebhookId && (
                                                                <div className="flex flex-col gap-2 items-end">
                                                                    <div className="flex items-center gap-2">
                                                                        <Key className="w-3.5 h-3.5 text-slate-500" />
                                                                        <input
                                                                            type="text"
                                                                            value={ultatelInputKey}
                                                                            onChange={(e) => setUltatelInputKey(e.target.value)}
                                                                            placeholder="ut-client-key..."
                                                                            className="px-3 py-1.5 rounded-lg bg-[#0b0b0c] border border-white/5 focus:border-accent text-white text-[10px] outline-none w-48 font-mono"
                                                                        />
                                                                    </div>
                                                                    <button
                                                                        onClick={handleProvisionUltatel}
                                                                        disabled={actionLoading !== null || !ultatelInputKey.trim()}
                                                                        className="px-5 py-2.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-40"
                                                                    >
                                                                        {actionLoading === "ultatel" ? (
                                                                            <>
                                                                                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Verifying...
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                Bind Webhook <ArrowUpRight className="w-3 h-3" />
                                                                            </>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Extension seat details */}
                                                        <div className="rounded-xl border border-white/5 bg-black/30 p-4 space-y-3">
                                                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Seat Configuration Details</div>
                                                            <div className="overflow-x-auto">
                                                                <table className="w-full text-[10px] font-mono text-left">
                                                                    <thead>
                                                                        <tr className="border-b border-white/5 text-slate-500">
                                                                            <th className="pb-1.5">Ext</th>
                                                                            <th className="pb-1.5">User</th>
                                                                            <th className="pb-1.5">Email</th>
                                                                            <th className="pb-1.5">E911 Address</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {(selectedRequest.ultatelUsers || []).map((user, idx) => (
                                                                            <tr key={idx} className="border-b border-white/[0.02] text-slate-400">
                                                                                <td className="py-1.5 font-bold text-accent">{user.extension}</td>
                                                                                <td className="py-1.5 text-white">{user.name}</td>
                                                                                <td className="py-1.5">{user.email}</td>
                                                                                <td className="py-1.5 truncate max-w-[150px]">{user.e911}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <Footer />
            </main>
        </AdminGuard>
    );
}
