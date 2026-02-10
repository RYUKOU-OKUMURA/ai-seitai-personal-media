import type { APIRoute } from 'astro';
import { applyRateLimitHeaders, checkRateLimit } from '../../server/security';

const YOUTUBE_API_KEY = import.meta.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = import.meta.env.YOUTUBE_CHANNEL_ID;

const YOUTUBE_RATE_LIMIT = {
	namespace: 'youtube',
	maxRequests: 60,
	windowMs: 10 * 60 * 1000,
} as const;

const YOUTUBE_CACHE_TTL_MS = 10 * 60 * 1000;
const YOUTUBE_TIMEOUT_MS = 10_000;

type YouTubeVideo = {
	id: string;
	title: string;
	description: string;
	thumbnail: string;
	publishedAt: string;
	viewCount: string;
	likeCount: string;
	url: string;
};

type PlaylistVideo = {
	id: string;
	title: string;
	description: string;
	thumbnail: string;
	publishedAt: string;
};

let cachedVideos: YouTubeVideo[] | null = null;
let cacheExpiresAt = 0;
let inFlightRefresh: Promise<YouTubeVideo[]> | null = null;

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const asString = (value: unknown): string => (typeof value === 'string' ? value : '');

const toSafeInt = (value: string): number => {
	const parsed = Number.parseInt(value, 10);
	return Number.isFinite(parsed) ? parsed : 0;
};

const buildJsonResponse = (body: unknown, status: number, baseHeaders: Headers): Response => {
	const headers = new Headers(baseHeaders);
	return new Response(JSON.stringify(body), { status, headers });
};

const fetchJsonWithTimeout = async (url: string): Promise<unknown> => {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), YOUTUBE_TIMEOUT_MS);
	try {
		const response = await fetch(url, { signal: controller.signal });
		if (!response.ok) throw new Error(`upstream ${response.status}`);
		return response.json();
	} finally {
		clearTimeout(timeoutId);
	}
};

const parseUploadsPlaylistId = (payload: unknown): string => {
	if (!isRecord(payload) || !Array.isArray(payload.items) || payload.items.length === 0) {
		throw new Error('invalid channel response');
	}
	const first = payload.items[0];
	if (!isRecord(first)) throw new Error('invalid channel response');

	const contentDetails = isRecord(first.contentDetails) ? first.contentDetails : null;
	const relatedPlaylists = contentDetails && isRecord(contentDetails.relatedPlaylists) ? contentDetails.relatedPlaylists : null;
	const uploads = relatedPlaylists ? asString(relatedPlaylists.uploads) : '';
	if (!uploads) throw new Error('uploads playlist not found');
	return uploads;
};

const parsePlaylistVideos = (payload: unknown): PlaylistVideo[] => {
	if (!isRecord(payload) || !Array.isArray(payload.items)) return [];

	const videos: PlaylistVideo[] = [];
	for (const item of payload.items) {
		if (!isRecord(item)) continue;
		const snippet = isRecord(item.snippet) ? item.snippet : null;
		if (!snippet) continue;

		const resourceId = isRecord(snippet.resourceId) ? snippet.resourceId : null;
		const videoId = resourceId ? asString(resourceId.videoId) : '';
		if (!videoId) continue;

		const thumbnails = isRecord(snippet.thumbnails) ? snippet.thumbnails : null;
		const high = thumbnails && isRecord(thumbnails.high) ? asString(thumbnails.high.url) : '';
		const medium = thumbnails && isRecord(thumbnails.medium) ? asString(thumbnails.medium.url) : '';

		videos.push({
			id: videoId,
			title: asString(snippet.title),
			description: asString(snippet.description),
			thumbnail: high || medium || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
			publishedAt: asString(snippet.publishedAt),
		});
	}

	return videos;
};

const parseStatsMap = (payload: unknown): Map<string, { viewCount: string; likeCount: string }> => {
	const stats = new Map<string, { viewCount: string; likeCount: string }>();
	if (!isRecord(payload) || !Array.isArray(payload.items)) return stats;

	for (const item of payload.items) {
		if (!isRecord(item)) continue;
		const id = asString(item.id);
		if (!id) continue;

		const statistics = isRecord(item.statistics) ? item.statistics : null;
		stats.set(id, {
			viewCount: statistics ? asString(statistics.viewCount) || '0' : '0',
			likeCount: statistics ? asString(statistics.likeCount) || '0' : '0',
		});
	}

	return stats;
};

const fetchLatestVideos = async (): Promise<YouTubeVideo[]> => {
	if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
		throw new Error('youtube credentials not configured');
	}

	const channelData = await fetchJsonWithTimeout(
		`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${encodeURIComponent(YOUTUBE_CHANNEL_ID)}&key=${encodeURIComponent(YOUTUBE_API_KEY)}`,
	);
	const uploadsPlaylistId = parseUploadsPlaylistId(channelData);

	const playlistData = await fetchJsonWithTimeout(
		`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${encodeURIComponent(uploadsPlaylistId)}&maxResults=50&key=${encodeURIComponent(YOUTUBE_API_KEY)}`,
	);
	const playlistVideos = parsePlaylistVideos(playlistData);
	if (playlistVideos.length === 0) return [];

	const videoIds = playlistVideos.map((video) => video.id).join(',');
	const statsData = await fetchJsonWithTimeout(
		`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${encodeURIComponent(videoIds)}&key=${encodeURIComponent(YOUTUBE_API_KEY)}`,
	);
	const statsMap = parseStatsMap(statsData);

	return playlistVideos.map((video) => {
		const stats = statsMap.get(video.id);
		return {
			id: video.id,
			title: video.title,
			description: video.description,
			thumbnail: video.thumbnail,
			publishedAt: video.publishedAt,
			viewCount: stats?.viewCount ?? '0',
			likeCount: stats?.likeCount ?? '0',
			url: `https://www.youtube.com/watch?v=${video.id}`,
		};
	});
};

const getCachedVideos = async (): Promise<YouTubeVideo[]> => {
	const now = Date.now();
	if (cachedVideos && now < cacheExpiresAt) return cachedVideos;
	if (inFlightRefresh) return inFlightRefresh;

	inFlightRefresh = (async () => {
		try {
			const latest = await fetchLatestVideos();
			cachedVideos = latest;
			cacheExpiresAt = Date.now() + YOUTUBE_CACHE_TTL_MS;
			return latest;
		} catch (error) {
			if (cachedVideos) return cachedVideos;
			throw error;
		} finally {
			inFlightRefresh = null;
		}
	})();

	return inFlightRefresh;
};

export const GET: APIRoute = async ({ request, url }) => {
	const baseHeaders = new Headers({
		'Content-Type': 'application/json; charset=utf-8',
		'Cache-Control': 'public, max-age=60, s-maxage=600, stale-while-revalidate=120',
	});

	const rateLimit = await checkRateLimit(request, YOUTUBE_RATE_LIMIT);
	applyRateLimitHeaders(baseHeaders, rateLimit);
	if (!rateLimit.allowed) {
		baseHeaders.set('Cache-Control', 'no-store');
		return buildJsonResponse({ error: 'アクセスが集中しています。しばらくして再度お試しください。' }, 429, baseHeaders);
	}

	const sortBy = url.searchParams.get('sort') === 'viewCount' ? 'viewCount' : 'date';
	const rawMax = Number.parseInt(url.searchParams.get('max') ?? '6', 10);
	const maxResults = Number.isFinite(rawMax) ? Math.min(12, Math.max(1, rawMax)) : 6;

	try {
		if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
			baseHeaders.set('Cache-Control', 'no-store');
			return buildJsonResponse({ error: '現在動画を取得できません。' }, 503, baseHeaders);
		}

		const videos = await getCachedVideos();
		const sorted = [...videos];
		if (sortBy === 'viewCount') {
			sorted.sort((a, b) => toSafeInt(b.viewCount) - toSafeInt(a.viewCount));
		}

		return buildJsonResponse({ videos: sorted.slice(0, maxResults) }, 200, baseHeaders);
	} catch (error) {
		console.error('YouTube API Error:', error);
		baseHeaders.set('Cache-Control', 'no-store');
		return buildJsonResponse({ error: '動画の取得に失敗しました。' }, 502, baseHeaders);
	}
};
