import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { isAdmin, isLocalDevBypassAllowed } from '@/lib/auth-constants';
import {
    getClientProfile,
    getClientInvoices,
    getClientProjects,
    getClientActivity,
} from '@/lib/firestore-helpers';

/**
 * GET /api/dashboard?uid=xxx
 * Returns all dashboard data for the authenticated client in a single request.
 */
export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Unauthorized — missing Bearer token' },
                { status: 401 }
            );
        }

        const idToken = authHeader.slice('Bearer '.length).trim();
        let decodedToken: { uid: string; email?: string };

        if (
            (idToken === 'demo-bypass-token' ||
                idToken === 'local-admin-bypass-token') &&
            isLocalDevBypassAllowed(req)
        ) {
            decodedToken = {
                uid:
                    idToken === 'local-admin-bypass-token'
                        ? 'admin-bypass-uid'
                        : 'demo-client-uid',
                email:
                    idToken === 'local-admin-bypass-token'
                        ? 'damein@powerdigitalmedia.org'
                        : 'info@powerdigitalmedia.org',
            };
        } else {
            try {
                decodedToken = await adminAuth.verifyIdToken(idToken);
            } catch {
                return NextResponse.json(
                    { error: 'Unauthorized — invalid or expired token' },
                    { status: 401 }
                );
            }
        }

        const { searchParams } = new URL(req.url);
        const requestedUid = searchParams.get('uid') || decodedToken.uid;

        if (
            requestedUid !== decodedToken.uid &&
            !isAdmin(decodedToken.email)
        ) {
            return NextResponse.json(
                { error: 'Forbidden — cannot access another client profile' },
                { status: 403 }
            );
        }

        // Fetch all data in parallel
        const [profile, invoices, projects, activity] = await Promise.all([
            getClientProfile(requestedUid),
            getClientInvoices(requestedUid, 10),
            getClientProjects(requestedUid),
            getClientActivity(requestedUid, 15),
        ]);

        if (!profile) {
            return NextResponse.json(
                { error: 'Client not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            profile,
            invoices,
            projects,
            activity,
        });
    } catch (error: any) {
        console.error('Dashboard data error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
