import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
    try {
        const { items, successUrl, cancelUrl, mode = 'payment', customerEmail } = await req.json();

        if (!items || !items.length) {
            return NextResponse.json({ error: 'Missing line items' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items,
            mode: mode as any,
            customer_email: customerEmail,
            success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/billing?success=true`,
            cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/billing?canceled=true`,
            automatic_tax: { enabled: true },
            billing_address_collection: 'required',
            invoice_creation: mode === 'payment' ? { enabled: true } : undefined,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
