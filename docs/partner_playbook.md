# 📘 The Solutions Partner Integration Playbook
## Next.js + Capsule CRM + Transpond + Calendly Automations

This playbook is a standardized, step-by-step recipe designed for you to deploy this exact client acquisition and booking automation funnel for your clients in under 30 minutes.

---

## 🗺️ The Architecture (How It Works)

To explain this to clients or understand it yourself, here is the flow of data:

1. **The Lead Capture:** A user fills out a form on the website (Step 1).
2. **The Sync:** The website sends the data to **Transpond** (adding them to a Group and triggering the automated reminder email campaign) and **Capsule CRM** (creating the contact and logging the opportunity).
3. **The Booking:** The website transitions to **Calendly** (Step 2) prefilled with their details.
4. **The Stop Trigger:** When the lead books a time, Calendly fires a webhook back to the website, which tells Transpond to add the **`Call Scheduled`** tag, instantly stopping the campaign.
5. **The Calendar Sync:** Calendly adds the meeting to **Google Calendar**, which automatically syncs it onto the contact's timeline in **Capsule CRM**.

---

## 📋 Client Onboarding checklist (What to get from them)

Before starting the setup, collect these credentials and details from your client:
* [ ] **Capsule CRM:** API Key (Settings > API Access Tokens).
* [ ] **Transpond:** API Key (Account > API Keys).
* [ ] **Transpond Group ID:** The ID of the group they want leads added to (e.g. `187913`).
* [ ] **Calendly Username & Event Slug:** (e.g. `client-name/30min`).
* [ ] **Google Workspace Login:** (To link Google Calendar to Capsule and Calendly).

---

## 🛠️ Step-by-Step Implementation Recipe

### Step 1: Configure Capsule CRM
1. Go to **Account Settings > Integrations > Google Calendar** and click **Connect**.
2. Go to **Settings > Tags** and ensure the tag **`Call Scheduled`** is created.

### Step 2: Configure Transpond
1. Set up the **Group** (e.g., "Website Leads").
2. Connect Transpond to Capsule (Account > Integrations > Capsule CRM) and ensure **two-way sync** is enabled.
3. Build the **Automation Campaign** (e.g., Welcome Email -> Wait 1 Day -> Reminder Email).
4. **CRITICAL:** In the Automation settings, add an **Exit Condition**: 
   * *"Exit when contact has Tag: `Call Scheduled`"*.

### Step 3: Configure Calendly
1. Connect their Google Calendar under **Calendar Connections**.
2. Create/edit a **30 Minute Meeting** event type.
3. Add the desired locations (Google Meet, Phone Call, Zoom, or In-person).
4. Save the event type and copy the link (e.g. `https://calendly.com/damein-powerdigitalmedia/30min`).

### Step 4: Add Webhook Auto-Tagging to Website
To register the automated stop-trigger without using Zapier:
1. Ensure your Next.js project has the Calendly webhook route deployed (template code provided below).
2. Run this quick PowerShell script to register the webhook:

```powershell
$token = Read-Host -Prompt "Please paste the Client's Calendly Personal Access Token"
$clientDomain = Read-Host -Prompt "Please enter the Client's domain (e.g. clientdomain.com)"

$headers = @{ "Authorization" = "Bearer $token"; "Content-Type" = "application/json" }
$userResponse = Invoke-RestMethod -Uri "https://api.calendly.com/users/me" -Headers $headers -Method Get
$orgUri = $userResponse.resource.current_organization

$payload = @{
    url = "https://$clientDomain/api/webhooks/calendly"
    events = @("invitee.created")
    organization = $orgUri
    scope = "organization"
} | ConvertTo-Json

$webhookResponse = Invoke-RestMethod -Uri "https://api.calendly.com/webhook_subscriptions" -Headers $headers -Method Post -Body $payload
Write-Host "Success! Webhook successfully registered." -ForegroundColor Green
```

---

## 💻 Plug-and-Play Code Templates

### 1. Webhook Route (`/api/webhooks/calendly/route.ts`)
This is the serverless backend code that listens for Calendly bookings and tags them in Transpond:

```typescript
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (body.event !== 'invitee.created') {
            return NextResponse.json({ message: 'Ignored event' });
        }

        const email = body.payload?.email;
        if (!email) return NextResponse.json({ error: 'No email' }, { status: 400 });

        // Update subscriber in Transpond to apply the stop-tag
        const response = await fetch('https://api.transpond.io/subscriber', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.TRANSPOND_API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                emailAddress: email,
                tags: ['Call Scheduled']
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ success: false, error: errorText });
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 200 });
    }
}
```

### 2. Prefill Calendar URL Helper (Frontend)
To automatically pass lead info to the Calendly iframe:

```typescript
const getCalendarUrl = (email: string, firstName: string, phone: string) => {
  const username = "client-calendly-username";
  const slug = "30min";
  
  const baseUrl = `https://calendly.com/${username}/${slug}`;
  const params = new URLSearchParams({
    hide_landing_page_details: "1",
    hide_gdpr_banner: "1",
    email: email || "",
    name: firstName || "",
    phone: phone || ""
  });
  
  return `${baseUrl}?${params.toString()}`;
};
```
