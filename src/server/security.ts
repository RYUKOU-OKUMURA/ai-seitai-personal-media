type RateLimitOptions = {
	namespace: string;
	maxRequests: number;
	windowMs: number;
};

type RateLimitBucket = {
	count: number;
	resetAt: number;
};

export type RateLimitResult = {
	allowed: boolean;
	limit: number;
	remaining: number;
	resetAt: number;
	retryAfterSec: number;
};

const buckets = new Map<string, RateLimitBucket>();
let nextCleanupAt = 0;

const cleanupExpiredBuckets = (now: number) => {
	if (now < nextCleanupAt) return;
	nextCleanupAt = now + 60_000;

	for (const [key, value] of buckets.entries()) {
		if (value.resetAt <= now) buckets.delete(key);
	}

	if (buckets.size > 20_000) {
		buckets.clear();
	}
};

export const getClientIp = (request: Request): string => {
	const cfConnectingIp = request.headers.get('cf-connecting-ip')?.trim();
	if (cfConnectingIp) return cfConnectingIp;

	const xForwardedFor = request.headers.get('x-forwarded-for');
	if (xForwardedFor) {
		const firstIp = xForwardedFor.split(',')[0]?.trim();
		if (firstIp) return firstIp;
	}

	const xRealIp = request.headers.get('x-real-ip')?.trim();
	if (xRealIp) return xRealIp;

	return 'unknown';
};

export const checkRateLimit = (request: Request, options: RateLimitOptions): RateLimitResult => {
	const now = Date.now();
	cleanupExpiredBuckets(now);

	const ip = getClientIp(request);
	const key = `${options.namespace}:${ip}`;
	const existing = buckets.get(key);

	let bucket: RateLimitBucket;
	if (!existing || existing.resetAt <= now) {
		bucket = { count: 1, resetAt: now + options.windowMs };
		buckets.set(key, bucket);
	} else {
		existing.count += 1;
		bucket = existing;
	}

	const allowed = bucket.count <= options.maxRequests;
	const remaining = Math.max(0, options.maxRequests - bucket.count);
	const retryAfterSec = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));

	return {
		allowed,
		limit: options.maxRequests,
		remaining,
		resetAt: bucket.resetAt,
		retryAfterSec,
	};
};

export const applyRateLimitHeaders = (headers: Headers, result: RateLimitResult) => {
	headers.set('X-RateLimit-Limit', String(result.limit));
	headers.set('X-RateLimit-Remaining', String(result.remaining));
	headers.set('X-RateLimit-Reset', String(Math.floor(result.resetAt / 1000)));
	if (!result.allowed) {
		headers.set('Retry-After', String(result.retryAfterSec));
	}
};

export const isSameOrigin = (originHeader: string | null, requestUrl: URL): boolean => {
	if (!originHeader) return true;
	try {
		return new URL(originHeader).origin === requestUrl.origin;
	} catch {
		return false;
	}
};
