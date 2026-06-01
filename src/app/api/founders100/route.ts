/**
 * Founder's 100 Promo — Counter API
 * GET  → returns { remaining, total, claimed }
 * POST → admin seed (protected, dev-only)
 */

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

const PROMO_DOC = 'promotions/founders100';
const TOTAL_SPOTS = 100;
const INITIAL_CLAIMED = 4; // Already delivered 4 builds (including Tbeaux's)

export async function GET() {
    try {
        const doc = await adminDb.doc(PROMO_DOC).get();

        if (!doc.exists) {
            // Auto-seed if document doesn't exist yet
            const data = {
                total: TOTAL_SPOTS,
                claimed: INITIAL_CLAIMED,
                remaining: TOTAL_SPOTS - INITIAL_CLAIMED,
                active: true,
                createdAt: new Date().toISOString(),
            };
            await adminDb.doc(PROMO_DOC).set(data);
            return NextResponse.json(data);
        }

        const data = doc.data()!;
        return NextResponse.json({
            total: data.total,
            claimed: data.claimed,
            remaining: data.remaining,
            active: data.active,
        });
    } catch (error: any) {
        console.error('❌ Founders100 GET Error:', error.message);
        // Return fallback data so the UI never breaks
        return NextResponse.json({
            total: TOTAL_SPOTS,
            claimed: INITIAL_CLAIMED,
            remaining: TOTAL_SPOTS - INITIAL_CLAIMED,
            active: true,
        });
    }
}

// POST — Seed or reset the counter (dev only)
export async function POST(req: Request) {
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const { claimed = INITIAL_CLAIMED, active = true } = await req.json();

        const data = {
            total: TOTAL_SPOTS,
            claimed,
            remaining: TOTAL_SPOTS - claimed,
            active,
            updatedAt: new Date().toISOString(),
        };

        await adminDb.doc(PROMO_DOC).set(data, { merge: true });
        return NextResponse.json({ success: true, ...data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
