import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClientProfile, getClientProfile } from '@/lib/firestore-helpers';

/**
 * POST /api/onboard
 * Called after a new user registers via Firebase Auth.
 * Creates a Stripe customer and Firestore client profile.
 */
export async function POST(req: Request) {
    try {
        const { uid, email, displayName } = await req.json();

        if (!uid || !email) {
            return NextResponse.json({ error: 'Missing uid or email' }, { status: 400 });
        }

        // Check if client profile already exists (prevent duplicates)
        const existing = await getClientProfile(uid);
        if (existing) {
            return NextResponse.json({
                message: 'Client profile already exists',
                stripeCustomerId: existing.stripeCustomerId,
            });
        }

        // Create Stripe customer
        const customer = await stripe.customers.create({
            email,
            name: displayName || email.split('@')[0],
            metadata: {
                firebaseUid: uid,
                source: 'power-digital-media-portal',
            },
        });

        // Create Firestore client profile
        const profile = await createClientProfile(uid, {
            displayName: displayName || email.split('@')[0],
            email,
            stripeCustomerId: customer.id,
        });

        console.log(`✅ Onboarded client: ${email} → Stripe ${customer.id}`);

        return NextResponse.json({
            message: 'Client onboarded successfully',
            stripeCustomerId: customer.id,
            profile,
        });
    } catch (error: any) {
        console.error('❌ Onboarding Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
