import { NextResponse } from 'next/server';

interface CreatorsConfig {
    clientId: string;
    clientSecret: string;
    partnerTag: string;
}

// In-memory token cache
let tokenCache: { token: string; expiresAt: number } | null = null;

async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
    // Check cache first
    if (tokenCache && Date.now() < tokenCache.expiresAt) {
        return tokenCache.token;
    }

    const tokenUrl = 'https://api.amazon.com/auth/o2/token';
    const params = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'advertising::campaign_management' // Standard scope for Creators/Advertising
    });

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: params
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Creators API Token Error:', errorText);
            throw new Error(`Token exchange failed: ${response.status}`);
        }

        const data = await response.json();
        const expiresIn = data.expires_in || 3600;

        // Cache token (subtract 60s for safety)
        tokenCache = {
            token: data.access_token,
            expiresAt: Date.now() + (expiresIn * 1000) - 60000
        };

        return data.access_token;
    } catch (error) {
        console.error('Auth Error:', error);
        throw error;
    }
}

export async function fetchAmazonProduct(asin: string) {
    const config: CreatorsConfig = {
        clientId: '333hmld7a435j7h666an5hcvao', // User Provided
        clientSecret: '1l22915mokvel7fk5hj8v6s6fnbl5d4roj8vrjckk7b6gt1dpap9', // User Provided
        partnerTag: 'powerdigital1-20'
    };

    try {
        // 1. Get OAuth Token
        const accessToken = await getAccessToken(config.clientId, config.clientSecret);

        // 2. Fetch Product Data
        // Note: Using the v2/GetItems endpoint for Creators
        const endpoint = 'https://api.amazon.com/product-advertising-api/v1/getitems';

        const payload = {
            ItemIds: [asin],
            Resources: [
                'Offers.Listings.Price',
                'Images.Primary.Large',
                'ItemInfo.Title',
                'ItemInfo.ProductInfo',
                'ItemInfo.ExternalIds'
            ],
            PartnerTag: config.partnerTag,
            PartnerType: 'Associates',
            Marketplace: 'www.amazon.com'
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Host': 'api.amazon.com'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.warn(`Creators API Fetch Failed [${response.status}]:`, await response.text());
            return null;
        }

        const data = await response.json();

        if (data.ItemsResult?.Items?.length > 0) {
            const item = data.ItemsResult.Items[0];
            return {
                asin: item.ASIN,
                title: item.ItemInfo?.Title?.DisplayValue,
                price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || 'N/A',
                image: item.Images?.Primary?.Large?.URL,
                liveLink: item.DetailPageURL
            };
        }

        return null;

    } catch (error) {
        console.error('Creators API Error:', error);
        return null;
    }
}
