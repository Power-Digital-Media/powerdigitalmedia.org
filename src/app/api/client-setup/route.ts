import { NextResponse } from "next/server";
import { createClientSetup } from "@/lib/client-setup";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Basic Validations
        const {
            companyName,
            website,
            phone,
            address,
            businessHours,
            contactFirst,
            contactLast,
            contactEmail,
            contactPhone,
            services
        } = body;

        if (!companyName || !website || !phone || !address || !businessHours) {
            return NextResponse.json({ error: "Missing company profile details." }, { status: 400 });
        }

        if (!contactFirst || !contactLast || !contactEmail || !contactPhone) {
            return NextResponse.json({ error: "Missing contact information." }, { status: 400 });
        }

        if (!services || (!services.capsule && !services.transpond && !services.ultatel)) {
            return NextResponse.json({ error: "Please select at least one service." }, { status: 400 });
        }

        // Additional Service Validations
        if (services.capsule && !body.capsuleSubdomain) {
            return NextResponse.json({ error: "Capsule subdomain is required." }, { status: 400 });
        }

        if (services.transpond) {
            if (!body.transpondEmail || !body.transpondPassword) {
                return NextResponse.json({ error: "Transpond credentials are required." }, { status: 400 });
            }
            if (body.transpondPassword.length < 8 || !/[^A-Za-z0-9]/.test(body.transpondPassword)) {
                return NextResponse.json({ error: "Transpond password does not meet complexity rules." }, { status: 400 });
            }
        }

        if (services.ultatel) {
            if (!body.ultatelUsers || body.ultatelUsers.length === 0) {
                return NextResponse.json({ error: "Extension allocation mapping is required." }, { status: 400 });
            }
            if (!body.ultatelNetworkChecked) {
                return NextResponse.json({ error: "Network pre-requisites approval is required." }, { status: 400 });
            }
        }

        // Save intake form to Firestore
        const requestData = {
            companyName,
            website,
            phone,
            address,
            businessHours,
            contactFirst,
            contactLast,
            contactEmail,
            contactPhone,
            services,
            capsuleSubdomain: body.capsuleSubdomain || null,
            transpondEmail: body.transpondEmail || null,
            transpondPassword: body.transpondPassword || null,
            ultatelUsers: body.ultatelUsers || null,
            ultatelHardwareCount: body.ultatelHardwareCount || 0,
            ultatelPortingDetails: body.ultatelPortingDetails || "",
            ultatelNetworkChecked: body.ultatelNetworkChecked || false,
        };

        const doc = await createClientSetup(requestData);

        return NextResponse.json({
            success: true,
            message: "Client setup details registered successfully.",
            setupId: doc.id,
        });

    } catch (error: any) {
        console.error("[Client Setup API] Registration failed:", error);
        return NextResponse.json({ error: error.message || "Failed to register setup details." }, { status: 500 });
    }
}
