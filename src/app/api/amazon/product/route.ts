import { NextResponse } from 'next/server';
import { fetchAmazonProduct } from '@/lib/amazon/paapi';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const asin = searchParams.get('asin');

    if (!asin) {
        return NextResponse.json({ error: 'ASIN is required' }, { status: 400 });
    }

    try {
        const data = await fetchAmazonProduct(asin);

        // Extract relevant info from PA-API response
        const item = data.ItemsResult?.Items?.[0];

        if (!item) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const price = item.Offers?.Listings?.[0]?.Price?.DisplayAmount || 'N/A';
        const title = item.ItemInfo?.Title?.DisplayValue || '';
        const isAvailable = !!item.Offers?.Listings?.[0]?.Price;
        const liveLink = item.DetailPageURL || '';

        return NextResponse.json({
            asin,
            price,
            title,
            isAvailable,
            liveLink
        });
    } catch (error: any) {
        console.error('API Route Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
