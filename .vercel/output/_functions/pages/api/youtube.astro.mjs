export { renderers } from '../../renderers.mjs';

const YOUTUBE_API_KEY = "your_api_key_here";
const YOUTUBE_CHANNEL_ID = "your_channel_id_here";
const GET = async ({ url }) => {
  try {
    const sortBy = url.searchParams.get("sort") || "date";
    const maxResults = url.searchParams.get("max") || "6";
    if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) ;
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    if (!channelResponse.ok) {
      throw new Error(`YouTube API error: ${channelResponse.statusText}`);
    }
    const channelData = await channelResponse.json();
    if (!channelData.items || channelData.items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Channel not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${YOUTUBE_API_KEY}`
    );
    if (!playlistResponse.ok) {
      throw new Error(`YouTube API error: ${playlistResponse.statusText}`);
    }
    const playlistData = await playlistResponse.json();
    const videoIds = playlistData.items.map((item) => item.snippet.resourceId.videoId).join(",");
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    if (!statsResponse.ok) {
      throw new Error(`YouTube API error: ${statsResponse.statusText}`);
    }
    const statsData = await statsResponse.json();
    const videos = playlistData.items.map((item) => {
      const videoId = item.snippet.resourceId.videoId;
      const stats = statsData.items.find((stat) => stat.id === videoId);
      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        publishedAt: item.snippet.publishedAt,
        viewCount: stats?.statistics.viewCount || "0",
        likeCount: stats?.statistics.likeCount || "0",
        url: `https://www.youtube.com/watch?v=${videoId}`
      };
    });
    if (sortBy === "viewCount") {
      videos.sort((a, b) => parseInt(b.viewCount) - parseInt(a.viewCount));
    }
    const limitedVideos = videos.slice(0, parseInt(maxResults));
    return new Response(JSON.stringify({ videos: limitedVideos }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600"
        // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error("YouTube API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch YouTube videos",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
