import { createHash } from 'node:crypto';

type RateLimitOptions = {
	namespace: string;
	maxRequests: number;
	windowMs: number;
	identifier?: string;
};

type RateLimitBucket = {
	count: number;
	resetAt: number;
};

type RedisPipelineResult = {
	result?: unknown;
	error?: string;
};

type SecurityLog = {
	level: 'info' | 'warn' | 'error';
	event: string;
	message: string;
	meta?: Record<string, unknown>;
};

export type RateLimitResult = {
	allowed: boolean;
	limit: number;
	remaining: number;
	resetAt: number;
	retryAfterSec: number;
};

const runtimeEnv = (((import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? process.env) as Record<
	string,
	string | undefined
>);

const UPSTASH_REDIS_REST_URL = runtimeEnv.UPSTASH_REDIS_REST_URL?.trim() ?? '';
const UPSTASH_REDIS_REST_TOKEN = runtimeEnv.UPSTASH_REDIS_REST_TOKEN?.trim() ?? '';
const REDIS_READY = Boolean(UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN);

const MEMORY_BUCKET_LIMIT = 20_000;
const memoryBuckets = new Map<string, RateLimitBucket>();
const memoryTokens = new Map<string, number>();
let nextCleanupAt = 0;

const cleanupMemoryState = (now: number) => {
	if (now < nextCleanupAt) return;
	nextCleanupAt = now + 60_000;

	for (const [key, value] of memoryBuckets.entries()) {
		if (value.resetAt <= now) memoryBuckets.delete(key);
	}
	for (const [key, expiresAt] of memoryTokens.entries()) {
		if (expiresAt <= now) memoryTokens.delete(key);
	}

	if (memoryBuckets.size > MEMORY_BUCKET_LIMIT) memoryBuckets.clear();
	if (memoryTokens.size > MEMORY_BUCKET_LIMIT) memoryTokens.clear();
};

const parseRedisNumber = (value: unknown, fallback: number): number => {
	if (typeof value === 'number' && Number.isFinite(value)) return value;
	if (typeof value === 'string') {
		const parsed = Number.parseInt(value, 10);
		if (Number.isFinite(parsed)) return parsed;
	}
	return fallback;
};

const runRedisPipeline = async (commands: Array<Array<string | number>>): Promise<RedisPipelineResult[]> => {
	const response = await fetch(`${UPSTASH_REDIS_REST_URL}/pipeline`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(commands),
	});

	if (!response.ok) {
		throw new Error(`redis_http_${response.status}`);
	}

	const payload = (await response.json()) as unknown;
	if (!Array.isArray(payload)) {
		throw new Error('redis_invalid_pipeline_response');
	}
	return payload as RedisPipelineResult[];
};

const runRedisCommand = async (command: Array<string | number>): Promise<unknown> => {
	const [entry] = await runRedisPipeline([command]);
	if (entry?.error) {
		throw new Error(`redis_command_error:${entry.error}`);
	}
	return entry?.result;
};

const checkRateLimitInMemory = (key: string, maxRequests: number, windowMs: number): RateLimitResult => {
	const now = Date.now();
	cleanupMemoryState(now);

	const existing = memoryBuckets.get(key);
	let bucket: RateLimitBucket;
	if (!existing || existing.resetAt <= now) {
		bucket = { count: 1, resetAt: now + windowMs };
		memoryBuckets.set(key, bucket);
	} else {
		existing.count += 1;
		bucket = existing;
	}

	const remaining = Math.max(0, maxRequests - bucket.count);
	const retryAfterSec = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
	return {
		allowed: bucket.count <= maxRequests,
		limit: maxRequests,
		remaining,
		resetAt: bucket.resetAt,
		retryAfterSec,
	};
};

const checkRateLimitInRedis = async (key: string, maxRequests: number, windowMs: number): Promise<RateLimitResult> => {
	const ttlSec = Math.max(1, Math.ceil(windowMs / 1000));
	const now = Date.now();

	const results = await runRedisPipeline([
		['INCR', key],
		['EXPIRE', key, ttlSec, 'NX'],
		['PTTL', key],
	]);

	if (results[0]?.error || results[1]?.error || results[2]?.error) {
		throw new Error('redis_rate_limit_error');
	}

	const count = parseRedisNumber(results[0]?.result, 1);
	const pttl = parseRedisNumber(results[2]?.result, windowMs);
	const resetAt = now + (pttl > 0 ? pttl : windowMs);
	const remaining = Math.max(0, maxRequests - count);
	const retryAfterSec = Math.max(1, Math.ceil((resetAt - now) / 1000));

	return {
		allowed: count <= maxRequests,
		limit: maxRequests,
		remaining,
		resetAt,
		retryAfterSec,
	};
};

const normalizeOrigin = (origin: string | null): string | null => {
	if (!origin) return null;
	try {
		return new URL(origin).origin;
	} catch {
		return null;
	}
};

export const getAllowedOrigins = (requestUrl: URL): Set<string> => {
	const origins = new Set<string>([requestUrl.origin]);
	const envCandidates = [runtimeEnv.SITE_URL, runtimeEnv.PUBLIC_SITE_URL];

	for (const candidate of envCandidates) {
		if (!candidate) continue;
		const normalized = normalizeOrigin(candidate);
		if (normalized) origins.add(normalized);
	}

	return origins;
};

export const isAllowedOrigin = (originHeader: string | null, allowedOrigins: Set<string>): boolean => {
	const normalized = normalizeOrigin(originHeader);
	if (!normalized) return false;
	return allowedOrigins.has(normalized);
};

export const getClientIp = (request: Request): string => {
	const xRealIp = request.headers.get('x-real-ip')?.trim();
	if (xRealIp) return xRealIp;

	const forwardedFor = request.headers.get('x-forwarded-for');
	if (forwardedFor) {
		const first = forwardedFor.split(',')[0]?.trim();
		if (first) return first;
	}

	const cfConnectingIp = request.headers.get('cf-connecting-ip')?.trim();
	if (cfConnectingIp) return cfConnectingIp;

	return 'unknown';
};

export const hashSha256 = (value: string): string => createHash('sha256').update(value).digest('hex');

export const buildIpEmailIdentifier = (ip: string, email: string): string =>
	`${hashSha256(ip).slice(0, 24)}:${hashSha256(email).slice(0, 24)}`;

export const maskEmail = (email: string): string => {
	const [local, domain] = email.split('@');
	if (!local || !domain) return '***';
	const head = local.slice(0, 1);
	return `${head}***@${domain}`;
};

export const maskIp = (ip: string): string => {
	if (ip.includes(':')) return `${ip.split(':').slice(0, 3).join(':')}:***`;
	const segments = ip.split('.');
	if (segments.length !== 4) return '***';
	return `${segments[0]}.${segments[1]}.${segments[2]}.***`;
};

export const logSecurityEvent = (entry: SecurityLog): void => {
	const payload = {
		timestamp: new Date().toISOString(),
		...entry,
	};
	const serialized = JSON.stringify(payload);
	if (entry.level === 'error') {
		console.error(serialized);
		return;
	}
	if (entry.level === 'warn') {
		console.warn(serialized);
		return;
	}
	console.log(serialized);
};

export const checkRateLimit = async (request: Request, options: RateLimitOptions): Promise<RateLimitResult> => {
	const id = options.identifier?.trim() || getClientIp(request);
	const key = `${options.namespace}:${id}`;

	if (!REDIS_READY) {
		return checkRateLimitInMemory(key, options.maxRequests, options.windowMs);
	}

	try {
		return await checkRateLimitInRedis(key, options.maxRequests, options.windowMs);
	} catch (error) {
		logSecurityEvent({
			level: 'warn',
			event: 'rate_limit.redis_fallback',
			message: 'Redis failed. Falling back to in-memory limiter.',
			meta: { key, error: String(error) },
		});
		return checkRateLimitInMemory(key, options.maxRequests, options.windowMs);
	}
};

export const reserveIdempotencyKey = async (namespace: string, key: string, ttlMs: number): Promise<boolean> => {
	const now = Date.now();
	const storageKey = `${namespace}:${key}`;

	if (!REDIS_READY) {
		cleanupMemoryState(now);
		const existing = memoryTokens.get(storageKey);
		if (existing && existing > now) return false;
		memoryTokens.set(storageKey, now + ttlMs);
		return true;
	}

	try {
		const ttlSec = Math.max(1, Math.ceil(ttlMs / 1000));
		const result = await runRedisCommand(['SET', storageKey, '1', 'NX', 'EX', ttlSec]);
		return result === 'OK';
	} catch (error) {
		logSecurityEvent({
			level: 'warn',
			event: 'idempotency.redis_fallback',
			message: 'Redis idempotency check failed. Falling back to memory.',
			meta: { storageKey, error: String(error) },
		});
		cleanupMemoryState(now);
		const existing = memoryTokens.get(storageKey);
		if (existing && existing > now) return false;
		memoryTokens.set(storageKey, now + ttlMs);
		return true;
	}
};

export const enqueueJsonPayload = async (queueName: string, payload: Record<string, unknown>): Promise<boolean> => {
	if (!REDIS_READY) return false;
	try {
		await runRedisCommand(['LPUSH', queueName, JSON.stringify(payload)]);
		return true;
	} catch (error) {
		logSecurityEvent({
			level: 'error',
			event: 'queue.enqueue_failed',
			message: 'Failed to enqueue payload.',
			meta: { queueName, error: String(error) },
		});
		return false;
	}
};

export const dequeueJsonPayloads = async (queueName: string, count: number): Promise<string[]> => {
	if (!REDIS_READY || count <= 0) return [];

	try {
		const commands: Array<Array<string | number>> = [];
		for (let i = 0; i < count; i += 1) {
			commands.push(['RPOP', queueName]);
		}
		const rows = await runRedisPipeline(commands);
		const payloads: string[] = [];
		for (const row of rows) {
			if (row?.error) continue;
			if (typeof row?.result === 'string' && row.result) payloads.push(row.result);
		}
		return payloads;
	} catch (error) {
		logSecurityEvent({
			level: 'error',
			event: 'queue.dequeue_failed',
			message: 'Failed to dequeue payloads.',
			meta: { queueName, error: String(error) },
		});
		return [];
	}
};

export const applyRateLimitHeaders = (headers: Headers, result: RateLimitResult) => {
	headers.set('X-RateLimit-Limit', String(result.limit));
	headers.set('X-RateLimit-Remaining', String(result.remaining));
	headers.set('X-RateLimit-Reset', String(Math.floor(result.resetAt / 1000)));
	if (!result.allowed) headers.set('Retry-After', String(result.retryAfterSec));
};
