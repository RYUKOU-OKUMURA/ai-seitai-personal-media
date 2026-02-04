import type { APIRoute } from 'astro';

const YOUTUBE_API_KEY = import.meta.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = import.meta.env.YOUTUBE_CHANNEL_ID;

export const GET: APIRoute = async ({ url }) => {
  try {
    const sortBy = url.searchParams.get('sort') || 'date'; // 'date' or 'viewCount'
    const maxResults = url.searchParams.get('max') || '6';

    if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
      return new Response(
        JSON.stringify({
          error: 'YouTube API credentials not configured',
          message: 'Please set YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID in .env.local'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Step 1: Get channel's uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );

    if (!channelResponse.ok) {
      throw new Error(`YouTube API error: ${channelResponse.statusText}`);
    }

    const channelData = await channelResponse.json();

    if (!channelData.items || channelData.items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Channel not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Step 2: Get videos from uploads playlist
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${YOUTUBE_API_KEY}`
    );

    if (!playlistResponse.ok) {
      throw new Error(`YouTube API error: ${playlistResponse.statusText}`);
    }

    const playlistData = await playlistResponse.json();

    // Step 3: Get video statistics (views, likes, etc.)
    const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');

    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );

    if (!statsResponse.ok) {
      throw new Error(`YouTube API error: ${statsResponse.statusText}`);
    }

    const statsData = await statsResponse.json();

    // Step 4: Combine data and format response
    const videos = playlistData.items.map((item: any) => {
      const videoId = item.snippet.resourceId.videoId;
      const stats = statsData.items.find((stat: any) => stat.id === videoId);

      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        publishedAt: item.snippet.publishedAt,
        viewCount: stats?.statistics.viewCount || '0',
        likeCount: stats?.statistics.likeCount || '0',
        url: `https://www.youtube.com/watch?v=${videoId}`
      };
    });

    // Sort videos based on query parameter
    if (sortBy === 'viewCount') {
      videos.sort((a: any, b: any) => parseInt(b.viewCount) - parseInt(a.viewCount));
    }
    // 'date' sorting is already done by YouTube API (most recent first)

    // Limit results
    const limitedVideos = videos.slice(0, parseInt(maxResults));

    return new Response(JSON.stringify({ videos: limitedVideos }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('YouTube API Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch YouTube videos',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
