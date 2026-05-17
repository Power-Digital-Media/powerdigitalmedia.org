"use client";

import { useState } from "react";
import Founders100Banner from "./Founders100Banner";

/**
 * Self-contained wrapper for Founders100Banner that manages its own
 * Stripe checkout lifecycle. Drop this anywhere without passing props.
 */
export default function Founders100Standalone() {
    const [loading, setLoading] = useState<string | null>(null);

    const handleCheckout = async (priceId: string) => {
        if (!priceId || priceId.includes("placeholder")) {
            alert(
                "⚠️ Stripe Not Configured\n\nThe Founders 100 Price ID is missing. Please add NEXT_PUBLIC_STRIPE_PRICE_FOUNDERS100 to your environment variables."
            );
            return;
        }

        setLoading(priceId);

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: [{ price: priceId, quantity: 1 }],
                    successUrl: window.location.origin + "/web-design?success=founders100",
                    cancelUrl: window.location.origin + "/web-design?canceled=true",
                    mode: "payment",
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Stripe Error Details:", data);
                alert(
                    `❌ Checkout Failed: ${data.error || "Unknown error"}\n\nCheck that the Founders 100 Price ID is correct in your Stripe dashboard.`
                );
            }
        } catch (error) {
            console.error("Founders 100 Checkout Failed:", error);
            alert("Technical handshake failed. Secure pipe connection interrupted.");
        } finally {
            setLoading(null);
        }
    };

    return <Founders100Banner onCheckout={handleCheckout} loading={loading} />;
}
