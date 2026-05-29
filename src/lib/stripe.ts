import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY || 'mock_secret_key_for_builds';

if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("⚠️ STRIPE_SECRET_KEY not set — Stripe calls will fail at runtime. Add it to .env.local");
}

export const stripe = new Stripe(secretKey, {
    typescript: true,
});
