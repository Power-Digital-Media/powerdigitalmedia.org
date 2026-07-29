// Re-exporting the main CRM sync
export async function syncActiveClients(db: any) {
    const transpondKey = process.env.TRANSPOND_API_KEY;
    const transpondGroupId = Number(process.env.TRANSPOND_SOLUTIONS_GROUP_ID || 187918);
    const capsuleToken = process.env.CAPSULE_API_TOKEN;
    const capsuleBaseUrl = process.env.CAPSULE_BASE_URL || "https://api.capsulecrm.com";

    if (!transpondKey) {
        console.warn("⚠️ TRANSPOND_API_KEY is not set.");
    }
    if (!capsuleToken) {
        console.warn("⚠️ CAPSULE_API_TOKEN is not set.");
    }

    try {
        const activeClients = (db.clients || []).filter(
            (c: any) => c.status === 'Active' && c.companyName !== "Pastor's Provision"
        );
        
        for (const client of activeClients) {
            const company = client.companyName;
            const clientId = client.id;

            // Find matching contacts
            const matchingContacts = (db.contacts || []).filter((con: any) => con.clientId === clientId);
            const contactsToSync = [];

            if (matchingContacts.length === 0) {
                const fullName = (client.name || "").trim();
                const parts = fullName.split(' ');
                const firstName = parts[0] || "Contact";
                const lastName = parts.slice(1).join(' ') || "Contact";
                contactsToSync.push({
                    first: firstName,
                    last: lastName,
                    email: client.email,
                    phone: client.phone
                });
            } else {
                for (const con of matchingContacts) {
                    const fullName = (con.name || "").trim();
                    const parts = fullName.split(' ');
                    const firstName = parts[0] || "Contact";
                    const lastName = parts.slice(1).join(' ') || "Contact";
                    contactsToSync.push({
                        first: firstName,
                        last: lastName,
                        email: con.email,
                        phone: con.phone
                    });
                }
            }

            // Gather all text related to this client's active services and projects to deduce tags
            const clientServices = (db.services || []).filter(
                (s: any) => s.clientId === client.id || (s.clientName && s.clientName.toLowerCase() === company.toLowerCase())
            );
            const clientProjects = (db.projects || []).filter(
                (p: any) => p.clientId === client.id
            );

            let textCorpus = (
                (client.businessType || "") + " " + 
                (client.primaryNeed || "") + " " + 
                (client.notes || "")
            ).toLowerCase();

            clientServices.forEach((s: any) => {
                textCorpus += " " + (s.serviceName || "").toLowerCase() + " " + (s.category || "").toLowerCase();
            });

            clientProjects.forEach((p: any) => {
                textCorpus += " " + (p.projectName || "").toLowerCase() + " " + (p.projectType || "").toLowerCase() + " " + (p.scopeSummary || "").toLowerCase();
            });

            for (const con of contactsToSync) {
                if (!con.email) continue;
                
                // Determine tags dynamically
                const tags = ["client", "active client"];

                if (textCorpus.includes("web") || textCorpus.includes("site") || textCorpus.includes("design")) {
                    tags.push("web-design");
                }
                if (textCorpus.includes("seo") || textCorpus.includes("marketing") || textCorpus.includes("funnel") || textCorpus.includes("citations")) {
                    tags.push("seo");
                }
                if (textCorpus.includes("video") || textCorpus.includes("promo")) {
                    tags.push("video-production");
                }
                if (textCorpus.includes("podcast") || textCorpus.includes("podbean")) {
                    tags.push("podcasting");
                }
                if (textCorpus.includes("consulting") || textCorpus.includes("hourly")) {
                    tags.push("consulting");
                }

                // Add CRM and VOIP integration tags
                if (client.capsuleStatus === 'Active') {
                    tags.push("crm-integration", "has-capsule");
                } else {
                    tags.push("no-capsule", "needs-crm");
                }

                if (client.transpondStatus === 'Active') {
                    if (!tags.includes("crm-integration")) tags.push("crm-integration");
                    tags.push("has-transpond");
                } else {
                    tags.push("no-transpond", "needs-transpond");
                }

                if (client.ultatelStatus === 'Active') {
                    tags.push("voip-integration", "has-voip", "has-ultatel");
                } else {
                    tags.push("no-voip", "no-ultatel", "needs-voip");
                }

                // 1. Sync to Transpond
                if (transpondKey) {
                    const transpondPayload = {
                        emailAddress: con.email,
                        firstName: con.first,
                        lastName: con.last,
                        groupId: transpondGroupId,
                        tags: tags,
                        customFields: {
                            "_capsule_firstName": con.first,
                            "_capsule_lastName": con.last,
                            "_capsule_name": `${con.first} ${con.last}`,
                            "_capsule_companyName": company,
                            "_capsule_person": true,
                            "_capsule_phone": con.phone
                        }
                    };

                    try {
                        const res = await fetch("https://api.transpond.io/subscriber", {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${transpondKey}`,
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify(transpondPayload)
                        });
                        if (res.ok) {
                            console.log(`✅ [Transpond API Sync] Synced contact ${con.first} ${con.last} with tags: ${tags.join(", ")}`);
                        } else {
                            const errText = await res.text();
                            console.error(`❌ [Transpond API Sync Error] Status ${res.status}: ${errText}`);
                        }
                    } catch (fetchErr) {
                        console.error("❌ [Transpond API Sync Error] Fetch failed:", fetchErr);
                    }
                }

                // 2. Sync to Capsule CRM
                if (capsuleToken) {
                    try {
                        // Check if party already exists in Capsule
                        const searchRes = await fetch(`${capsuleBaseUrl}/api/v2/parties/search?q=${encodeURIComponent(con.email)}`, {
                            headers: {
                                "Authorization": `Bearer ${capsuleToken}`,
                                "Accept": "application/json"
                            }
                        });

                        let partyId: number | null = null;
                        if (searchRes.ok) {
                            const searchData = await searchRes.json();
                            if (searchData.parties && searchData.parties.length > 0) {
                                partyId = searchData.parties[0].id;
                            }
                        }

                        if (partyId) {
                            // Update existing party tags via PUT /parties/{id}
                            const tagRes = await fetch(`${capsuleBaseUrl}/api/v2/parties/${partyId}`, {
                                method: "PUT",
                                headers: {
                                    "Authorization": `Bearer ${capsuleToken}`,
                                    "Content-Type": "application/json",
                                    "Accept": "application/json"
                                },
                                body: JSON.stringify({
                                    party: {
                                        id: partyId,
                                        tags: tags.map(t => ({ name: t }))
                                    }
                                })
                            });
                            if (tagRes.ok) {
                                console.log(`✅ [Capsule API Tags Sync] Updated tags for ${con.first} ${con.last} (${company}) to: ${tags.join(", ")}`);
                            } else {
                                const errText = await tagRes.text();
                                console.error(`❌ [Capsule API Tags Sync Error] Failed for party ${partyId}: ${errText}`);
                            }
                        } else {
                            // Create new Capsule contact
                            const capsulePayload = {
                                party: {
                                    type: "person",
                                    firstName: con.first,
                                    lastName: con.last,
                                    organisation: {
                                        name: company
                                    },
                                    emailAddresses: [
                                        {
                                            address: con.email
                                        }
                                    ],
                                    phoneNumbers: con.phone ? [
                                        {
                                            number: con.phone
                                        }
                                    ] : [],
                                    tags: tags.map(t => ({ name: t }))
                                }
                            };

                            const createRes = await fetch(`${capsuleBaseUrl}/api/v2/parties`, {
                                method: "POST",
                                headers: {
                                    "Authorization": `Bearer ${capsuleToken}`,
                                    "Content-Type": "application/json",
                                    "Accept": "application/json"
                                },
                                body: JSON.stringify(capsulePayload)
                            });

                            if (createRes.ok) {
                                console.log(`✅ [Capsule API Sync] Created new contact ${con.first} ${con.last} for ${company} with tags: ${tags.join(", ")}`);
                            } else {
                                const errText = await createRes.text();
                                console.error(`❌ [Capsule API Create Error] Status ${createRes.status}: ${errText}`);
                            }
                        }
                    } catch (capsuleErr) {
                        console.error("❌ [Capsule API Sync Error] Process failed:", capsuleErr);
                    }
                }
            }
        }
    } catch (err) {
        console.error("❌ Error running active client CRM sync:", err);
    }
}

// Keep the old export name to avoid breaking import statements
export async function syncActiveClientsToTranspond(db: any) {
    return syncActiveClients(db);
}
