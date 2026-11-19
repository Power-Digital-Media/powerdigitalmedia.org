import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { adminAuth } from '@/lib/firebase-admin';
import { isAdmin } from '@/lib/auth-constants';
import { getClientProfile } from '@/lib/firestore-helpers';

export async function POST(req: Request) {
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
        try {
            decodedToken = await adminAuth.verifyIdToken(idToken);
        } catch {
            return NextResponse.json(
                { error: 'Unauthorized — invalid or expired token' },
                { status: 401 }
            );
        }

        const { customerId, returnUrl } = await req.json();

        if (!customerId) {
            return NextResponse.json(
                { error: 'Missing customerId' },
                { status: 400 }
            );
        }

        const profile = await getClientProfile(decodedToken.uid);
        if (
            !isAdmin(decodedToken.email) &&
            profile?.stripeCustomerId !== customerId
        ) {
            return NextResponse.json(
                { error: 'Forbidden — Stripe customer mismatch' },
                { status: 403 }
            );
        }

        const siteBase =
            process.env.NEXT_PUBLIC_SITE_URL || 'https://powerdigitalmedia.org';

        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: returnUrl || `${siteBase}/dashboard/billing`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Portal Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
