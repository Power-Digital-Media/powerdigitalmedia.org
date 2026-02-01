import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
    try {
        const { items, successUrl, cancelUrl, mode = 'payment', customerEmail } = await req.json();

        if (!items || !items.length) {
            return NextResponse.json({ error: 'Missing line items' }, { status: 400 });
        }

        // Automatically determine mode if not explicitly provided
        // In a real app, you'd check price IDs against Stripe API to see if they are recurring
        // For now, we'll allow the frontend to hint, but we'll add a safety check
        const sessionMode = mode || (items.some((item: any) => item.price?.includes('recurring') || item.quantity === 1 && item.priceId?.includes('sub')) ? 'subscription' : 'payment');

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items,
            mode: sessionMode as any,
            customer_email: customerEmail,
            success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/billing?success=true`,
            cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/billing?canceled=true`,
            automatic_tax: { enabled: true },
            billing_address_collection: 'required',
            invoice_creation: sessionMode === 'payment' ? { enabled: true } : undefined,
            metadata: {
                payment_type: sessionMode,
                source: 'web-design-gateway'
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
