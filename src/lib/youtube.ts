import { google } from 'googleapis';

const youtube = google.youtube('v3');

/**
 * Protocol: YouTube Discovery
 * This library handles the synchronized retrieval of high-velocity 
 * production content directly from the YouTube Data API v3.
 */

export async function getLatestVideosFromPlaylist(playlistId: string, limit = 5) {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
        console.warn("YouTube API Protocol: Missing API Key. Check environment variables.");
        return [];
    }

    try {
        const response = await youtube.playlistItems.list({
            key: apiKey,
            playlistId: playlistId,
            part: ['snippet', 'contentDetails'],
            maxResults: limit,
        });

        return response.data.items?.map(item => ({
            id: item.contentDetails?.videoId,
            title: item.snippet?.title,
            description: item.snippet?.description,
            thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url,
            publishedAt: item.snippet?.publishedAt,
        })) || [];
    } catch (error) {
        console.error("YouTube Protocol Breach:", error);
        return [];
    }
}

export async function getLatestVideosFromChannel(channelId: string, limit = 5) {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) return [];

    try {
        const response = await youtube.search.list({
            key: apiKey,
            channelId: channelId,
            part: ['snippet'],
            order: 'date',
            maxResults: limit,
            type: ['video'],
        });

        return response.data.items?.map(item => ({
            id: item.id?.videoId,
            title: item.snippet?.title,
            thumbnail: item.snippet?.thumbnails?.high?.url,
            publishedAt: item.snippet?.publishedAt,
        })) || [];
    } catch (error) {
        console.error("YouTube Channel Protocol Breach:", error);
        return [];
    }
}
