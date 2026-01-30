import { NextResponse } from 'next/server';
import { getLatestVideosFromPlaylist, getLatestVideosFromChannel } from '@/lib/youtube';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'playlist' or 'channel'
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing ID protocol' }, { status: 400 });
    }

    try {
        let data;
        if (type === 'playlist') {
            data = await getLatestVideosFromPlaylist(id);
        } else {
            data = await getLatestVideosFromChannel(id);
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Ecosystem Bridge Failure' }, { status: 500 });
    }
}
