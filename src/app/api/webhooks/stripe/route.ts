import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import {
    getClientByStripeId,
    updateClientProfile,
    upsertInvoice,
    logActivity,
    decrementFounders100,
} from '@/lib/firestore-helpers';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('Stripe-Signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.error(`Webhook Error: ${error.message}`);
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }

    try {
        switch (event.type) {
            // ── Checkout Completed ───────────────────────────────
            case 'checkout.session.completed': {
                const session = event.data.object as any;
                console.log(`✅ Payment successful for session: ${session.id}`);

                // Link the Stripe customer to our Firestore client profile
                if (session.customer && session.client_reference_id) {
                    await updateClientProfile(session.client_reference_id, {
                        stripeCustomerId: session.customer as string,
                    });
                }

                // ── Founder's 100 Auto-Decrement ────────────────
                const founders100PriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_FOUNDERS100;
                if (founders100PriceId) {
                    try {
                        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
                        const isFounders100 = lineItems.data.some(
                            (item: any) => item.price?.id === founders100PriceId
                        );
                        if (isFounders100) {
                            const result = await decrementFounders100();
                            console.log(`🔥 Founder's 100 claimed! Remaining: ${result.remaining}`);
                        }
                    } catch (promoErr: any) {
                        console.error('⚠️ Founders100 decrement error:', promoErr.message);
                    }
                }

                // Log activity
                const client = session.customer
                    ? await getClientByStripeId(session.customer as string)
                    : null;

                if (client) {
                    await logActivity({
                        clientId: client.uid,
                        type: 'payment',
                        title: `Checkout completed — $${(session.amount_total / 100).toFixed(2)}`,
                        metadata: { sessionId: session.id },
                    });
                }
                break;
            }

            // ── Invoice Paid ────────────────────────────────────
            case 'invoice.paid': {
                const invoice = event.data.object as any;
                const client = invoice.customer
                    ? await getClientByStripeId(invoice.customer as string)
                    : null;

                const clientId = client?.uid || '';

                await upsertInvoice(invoice.id, {
                    clientId,
                    stripeCustomerId: invoice.customer || '',
                    amount: (invoice.amount_paid || 0) / 100,
                    status: 'paid',
                    description: invoice.lines?.data?.[0]?.description || 'Payment',
                    paidAt: Timestamp.fromDate(new Date((invoice.status_transitions?.paid_at || Date.now() / 1000) * 1000)),
                    dueDate: invoice.due_date ? Timestamp.fromDate(new Date(invoice.due_date * 1000)) : null,
                    invoiceUrl: invoice.hosted_invoice_url || '',
                    invoicePdf: invoice.invoice_pdf || '',
                    createdAt: Timestamp.fromDate(new Date(invoice.created * 1000)),
                });

                if (client) {
                    await logActivity({
                        clientId: client.uid,
                        type: 'payment',
                        title: `Invoice paid — $${((invoice.amount_paid || 0) / 100).toFixed(2)}`,
                        metadata: { invoiceId: invoice.id },
                    });
                }

                console.log(`✅ Invoice ${invoice.id} paid → Firestore synced`);
                break;
            }

            // ── Invoice Payment Failed ──────────────────────────
            case 'invoice.payment_failed': {
                const invoice = event.data.object as any;
                const client = invoice.customer
                    ? await getClientByStripeId(invoice.customer as string)
                    : null;

                const clientId = client?.uid || '';

                await upsertInvoice(invoice.id, {
                    clientId,
                    stripeCustomerId: invoice.customer || '',
                    amount: (invoice.amount_due || 0) / 100,
                    status: 'past_due',
                    description: invoice.lines?.data?.[0]?.description || 'Payment',
                    paidAt: null,
                    dueDate: invoice.due_date ? Timestamp.fromDate(new Date(invoice.due_date * 1000)) : null,
                    invoiceUrl: invoice.hosted_invoice_url || '',
                    invoicePdf: invoice.invoice_pdf || '',
                    createdAt: Timestamp.fromDate(new Date(invoice.created * 1000)),
                });

                if (client) {
                    await updateClientProfile(client.uid, {
                        subscriptionStatus: 'past_due',
                    });
                    await logActivity({
                        clientId: client.uid,
                        type: 'payment',
                        title: `Payment failed — $${((invoice.amount_due || 0) / 100).toFixed(2)}`,
                        metadata: { invoiceId: invoice.id },
                    });
                }

                console.log(`⚠️ Invoice ${invoice.id} payment failed → status updated`);
                break;
            }

            // ── Subscription Created ────────────────────────────
            case 'customer.subscription.created': {
                const subscription = event.data.object as any;
                const client = await getClientByStripeId(subscription.customer as string);

                if (client) {
                    const priceAmount = subscription.items?.data?.[0]?.price?.unit_amount || 0;
                    await updateClientProfile(client.uid, {
                        subscriptionStatus: subscription.status === 'active' ? 'active' : 'none',
                        subscriptionTier: 'management',
                        monthlyRate: priceAmount / 100,
                        nextPaymentDate: subscription.current_period_end
                            ? Timestamp.fromDate(new Date(subscription.current_period_end * 1000))
                            : null,
                    });
                    await logActivity({
                        clientId: client.uid,
                        type: 'subscription',
                        title: `Subscription activated — $${(priceAmount / 100).toFixed(2)}/mo`,
                        metadata: { subscriptionId: subscription.id },
                    });
                }

                console.log(`✅ Subscription ${subscription.id} created → Firestore synced`);
                break;
            }

            // ── Subscription Updated ────────────────────────────
            case 'customer.subscription.updated': {
                const subscription = event.data.object as any;
                const client = await getClientByStripeId(subscription.customer as string);

                if (client) {
                    const priceAmount = subscription.items?.data?.[0]?.price?.unit_amount || 0;
                    const statusMap: Record<string, 'active' | 'past_due' | 'canceled' | 'none'> = {
                        active: 'active',
                        past_due: 'past_due',
                        canceled: 'canceled',
                        unpaid: 'past_due',
                    };

                    await updateClientProfile(client.uid, {
                        subscriptionStatus: statusMap[subscription.status] || 'none',
                        monthlyRate: priceAmount / 100,
                        nextPaymentDate: subscription.current_period_end
                            ? Timestamp.fromDate(new Date(subscription.current_period_end * 1000))
                            : null,
                    });
                }

                console.log(`🔄 Subscription ${subscription.id} updated → Firestore synced`);
                break;
            }

            // ── Subscription Deleted ────────────────────────────
            case 'customer.subscription.deleted': {
                const subscription = event.data.object as any;
                const client = await getClientByStripeId(subscription.customer as string);

                if (client) {
                    await updateClientProfile(client.uid, {
                        subscriptionStatus: 'canceled',
                        nextPaymentDate: null,
                    });
                    await logActivity({
                        clientId: client.uid,
                        type: 'subscription',
                        title: 'Subscription canceled',
                        metadata: { subscriptionId: subscription.id },
                    });
                }

                console.log(`❌ Subscription ${subscription.id} deleted → marked canceled`);
                break;
            }

            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (handlerError: any) {
        console.error(`Webhook handler error for ${event.type}:`, handlerError);
        // Return 200 anyway to prevent Stripe from retrying endlessly
        // The error is logged for investigation
    }

    return NextResponse.json({ received: true });
}
