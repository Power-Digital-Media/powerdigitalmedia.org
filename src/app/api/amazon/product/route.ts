import { NextResponse } from 'next/server';
import { fetchAmazonProduct } from '@/lib/amazon/paapi';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const asin = searchParams.get('asin');

    if (!asin) {
        return NextResponse.json({ error: 'ASIN is required' }, { status: 400 });
    }

    try {
        const product = await fetchAmazonProduct(asin);

        if (!product || !product.ItemsResult) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error: any) {
        console.error('API Route Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
