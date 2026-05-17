import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
    if (process.env.NODE_ENV === "production") {
        throw new Error("❌ CRITICAL: STRIPE_SECRET_KEY is missing in production environment.");
    }
    console.warn("⚠️ STRIPE_SECRET_KEY not set — Stripe calls will fail. Add it to .env.local");
}

export const stripe = new Stripe(secretKey!, {
    typescript: true,
});
