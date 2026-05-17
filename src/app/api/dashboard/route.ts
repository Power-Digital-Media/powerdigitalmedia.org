import { NextResponse } from 'next/server';
import { getClientProfile } from '@/lib/firestore-helpers';
import { getClientInvoices } from '@/lib/firestore-helpers';
import { getClientProjects } from '@/lib/firestore-helpers';
import { getClientActivity } from '@/lib/firestore-helpers';

/**
 * GET /api/dashboard?uid=xxx
 * Returns all dashboard data for a client in a single request.
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const uid = searchParams.get('uid');

        if (!uid) {
            return NextResponse.json({ error: 'Missing uid parameter' }, { status: 400 });
        }

        // Fetch all data in parallel
        const [profile, invoices, projects, activity] = await Promise.all([
            getClientProfile(uid),
            getClientInvoices(uid, 10),
            getClientProjects(uid),
            getClientActivity(uid, 15),
        ]);

        if (!profile) {
            return NextResponse.json({ error: 'Client not found' }, { status: 404 });
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
