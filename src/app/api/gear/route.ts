import { NextResponse } from 'next/server';
import { GEAR_COLLECTION } from '@/data/gear';

export async function GET() {
    return NextResponse.json(GEAR_COLLECTION);
}
