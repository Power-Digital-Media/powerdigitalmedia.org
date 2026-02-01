# Strategic Protocol: Agency Workflow & Dynamic Billing

Designed for Power Digital Media to handle bespoke engagements, varying service tiers, and custom client logic with 100% financial security.

## 🛡️ The "Bespoke" Workflow
For clients who don't fit into standard tiers (e.g., your $1,000 build + $250/mo deal), follow this 60-second protocol:

### 1. Create a "Bespoke" Product
In your Stripe Dashboard:
- Go to **Product Catalog** -> **+ Add Product**.
- **Name:** "Bespoke Architecture: [Client Name/Project]"
- **Pricing:** Set your custom amount (e.g., $250.00).
- **Type:** Recurring (Monthly).

### 2. Generate a "Payment Link"
Once the product is saved:
- Click **Create Payment Link**.
- **Quantity:** 1.
- **Advanced Options:** Set "End subscription after a specific number of cycles" to match your installment plan (e.g., 4 cycles for a $1,000 build paid over 4 months).
- **Tax:** Enable "Collect tax automatically" (requires Stripe Tax activation).

### 3. Deploy the Link
Send the generated `buy.stripe.com/...` link directly to your client via text, email, or a custom "Pay" button on their specific proposal.

## 🛡️ Protocol: Invoicing for High-Ticket Services
For one-off projects or custom adjustments to existing subscriptions:
1.  **Dashboard -> Billing -> Invoices.**
2.  **Create Invoice:** Add the client and the custom items.
3.  **Tax Sensitivity:** Stripe will automatically calculate the tax based on the client's billing address.
4.  **Send:** The client receives a professional PDF with a direct "Pay Now" button.

## 🛡️ Record-Keeping for Tax Resiliency
- **Categorization:** Every bespoke product should use a descriptive name for clean year-end reporting.
- **Reserve Rule:** Continue the 25% Tax Reserve Protocol (Move 25% of any inbound payment to your Tax Savings account immediately).
- **Automation:** Ensure "Invoice Creation" is enabled on all Checkout sessions to keep your audit trail 100% clean.

---
**🛡️ Agency Status:** CALIBRATED. 🛡️💼✨
