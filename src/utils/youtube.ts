// YouTube API utility functions

interface YouTubeVideoStats {
    viewCount: string;
    likeCount: string;
    isLive: boolean;
    concurrentViewers?: string;
}

export interface YouTubeLiveVideo {
    videoId: string;
    title: string;
    thumbnailUrl: string;
    concurrentViewers: string;
}

export interface YouTubeChannelDetails {
    channelId: string;
    title: string;
    thumbnailUrl: string;
    subscriberCount: string;
}

/**
 * Fetches video statistics from YouTube Data API
 * Note: Requires VITE_YOUTUBE_API_KEY environment variable
 */
export async function fetchYouTubeVideoStats(videoId: string): Promise<YouTubeVideoStats | null> {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    if (!apiKey) {
        console.warn('YouTube API key not configured. Using mock data.');
        return null;
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics,liveStreamingDetails&id=${videoId}&key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch YouTube data');
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return null;
        }

        const video = data.items[0];
        const stats = video.statistics;
        const liveDetails = video.liveStreamingDetails;

        return {
            viewCount: stats.viewCount || '0',
            likeCount: stats.likeCount || '0',
            isLive: !!liveDetails?.concurrentViewers,
            concurrentViewers: liveDetails?.concurrentViewers
        };
    } catch (error) {
        console.error('Error fetching YouTube stats:', error);
        return null;
    }
}

/**
 * Fetches statistics for multiple videos in a single API call (Batch/Multi-get)
 * @param videoIds - Array of video IDs
 * @returns Map of videoId to stats
 */
export async function fetchBatchVideoStats(videoIds: string[]): Promise<Map<string, YouTubeVideoStats>> {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const statsMap = new Map<string, YouTubeVideoStats>();

    if (!apiKey || videoIds.length === 0) {
        return statsMap;
    }

    try {
        // YouTube API supports up to 50 IDs per request
        // For simplicity, assuming we aren't sending >50 at once, or we slice it if needed.
        const ids = videoIds.slice(0, 50).join(',');

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics,liveStreamingDetails&id=${ids}&key=${apiKey}`
        );

        if (!response.ok) return statsMap;

        const data = await response.json();

        if (data.items) {
            data.items.forEach((video: any) => {
                const stats = video.statistics;
                const liveDetails = video.liveStreamingDetails;
                statsMap.set(video.id, {
                    viewCount: stats.viewCount || '0',
                    likeCount: stats.likeCount || '0',
                    isLive: !!liveDetails?.concurrentViewers,
                    concurrentViewers: liveDetails?.concurrentViewers
                });
            });
        }
    } catch (error) {
        console.error('Error fetching batch video stats:', error);
    }

    return statsMap;
}


/**
 * Fetches current live streams from a YouTube channel
 * @param channelId - The YouTube channel ID (starts with UC...)
 * @returns Array of live videos currently streaming
 */
export async function fetchChannelLiveStreams(channelId: string): Promise<YouTubeLiveVideo[]> {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    if (!apiKey) {
        return [];
    }

    try {
        // Search for live broadcasts from this channel
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch channel live streams');
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return [];
        }

        // Fetch detailed stats for each live video
        const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
        const statsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoIds}&key=${apiKey}`
        );

        const statsData = await statsResponse.json();

        return statsData.items.map((video: any) => ({
            videoId: video.id,
            title: video.snippet.title,
            thumbnailUrl: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium.url,
            concurrentViewers: video.liveStreamingDetails?.concurrentViewers || '0'
        }));

    } catch (error) {
        console.error('Error fetching channel live streams:', error);
        return [];
    }
}

/**
 * Fetches channel details including profile picture
 * @param channelId - The YouTube channel ID
 * @returns Channel details with thumbnail URL
 */
export async function fetchChannelDetails(channelId: string): Promise<YouTubeChannelDetails | null> {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    if (!apiKey) {
        return null;
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch channel details');
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return null;
        }

        const channel = data.items[0];

        return {
            channelId: channel.id,
            title: channel.snippet.title,
            thumbnailUrl: channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.medium?.url || channel.snippet.thumbnails.default.url,
            subscriberCount: channel.statistics.subscriberCount || '0'
        };
    } catch (error) {
        console.error('Error fetching channel details:', error);
        return null;
    }
}


/**
 * Fetches popular/recent videos for a channel
 * @param channelId - The YouTube channel ID
 * @param maxResults - Number of videos to fetch (default: 5)
 */
export async function fetchChannelPopularVideos(channelId: string, maxResults: number = 5): Promise<Array<YouTubeLiveVideo>> {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    if (!apiKey) return [];

    try {
        // Fetch recent videos from channel
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=${maxResults}&key=${apiKey}`
        );

        if (!response.ok) throw new Error('Failed to fetch channel videos');

        const data = await response.json();

        if (!data.items || data.items.length === 0) return [];

        // Batch fetch stats
        const statsMap = await fetchBatchVideoStats(data.items.map((item: any) => item.id.videoId));

        return data.items.map((item: any) => {
            const stats = statsMap.get(item.id.videoId);
            return {
                videoId: item.id.videoId,
                title: item.snippet.title,
                thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium.url,
                concurrentViewers: stats?.viewCount || '0' // Using viewCount for non-live videos
            };
        });

    } catch (error) {
        console.error('Error fetching popular videos:', error);
        return [];
    }
}

/**
 * Formats a view count number (e.g. 1500 -> 1.5K)
 * @param countString - The view count as a string
 * @returns Formatted string
 */
export function formatViewCount(countString: string): string {
    const count = parseInt(countString.replace(/,/g, ''), 10);

    if (isNaN(count)) return '0';

    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
    } else {
        return count.toString();
    }
}
