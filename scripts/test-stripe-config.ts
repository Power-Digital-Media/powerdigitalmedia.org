import { stripe } from '../src/lib/stripe';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function validateStripe() {
    console.log('🚀 Initiating Stripe Configuration Validation...\n');

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
        console.error('❌ Error: STRIPE_SECRET_KEY is missing from environment.');
        return;
    }

    try {
        const account = await stripe.accounts.retrieve();
        console.log(`✅ Connection Successful: Linked to account ${account.id} (${account.email || 'No email'})\n`);
    } catch (error: any) {
        console.error('❌ Connection Failed: Invalid STRIPE_SECRET_KEY.');
        console.error(`   Stripe says: ${error.message}\n`);
        return;
    }

    const priceIds = [
        process.env.NEXT_PUBLIC_STRIPE_PRICE_POD_BROADCASTER,
        process.env.NEXT_PUBLIC_STRIPE_PRICE_POD_GROWTH,
        process.env.NEXT_PUBLIC_STRIPE_PRICE_POD_SYNDICATION,
        process.env.NEXT_PUBLIC_STRIPE_PRICE_WEB_IDENTITY,
        process.env.NEXT_PUBLIC_STRIPE_PRICE_WEB_GROWTH,
        process.env.NEXT_PUBLIC_STRIPE_PRICE_WEB_ENTERPRISE,
        process.env.NEXT_PUBLIC_STRIPE_PRICE_MANAGEMENT,
        process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_FIELD,
        process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_LIVE,
        process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_PROTOCOL,
        process.env.NEXT_PUBLIC_STRIPE_PRICE_PROD_AUTHORITY,
        process.env.NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_MICRO,
        process.env.NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_VELOCITY,
        process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH_STRATEGY
    ];

    console.log('--- Price ID Validation ---');
    for (const id of priceIds) {
        if (!id || id.includes('placeholder')) {
            console.warn(`⚠️ Warning: A required Price ID is missing or using a placeholder.`);
            continue;
        }

        try {
            const price = await stripe.prices.retrieve(id);
            console.log(`✅ Valid: ${id} (${price.nickname || 'Unnamed'} - $${(price.unit_amount || 0) / 100})`);
        } catch (error: any) {
            console.error(`❌ Invalid: ${id}`);
            console.error(`   Stripe says: ${error.message}`);
        }
    }

    console.log('\n🏁 Validation Complete.');
}

validateStripe();
