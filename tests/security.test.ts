import assert from 'node:assert/strict';
import test from 'node:test';
import { buildIpEmailIdentifier, isAllowedOrigin, reserveIdempotencyKey } from '../src/server/security.ts';
import { isSafeEventLink, normalizeSafeEventUrl } from '../src/utils/url-safety.ts';

test('origin header is required', () => {
  const allowed = new Set(['https://example.com']);
  assert.equal(isAllowedOrigin(null, allowed), false);
  assert.equal(isAllowedOrigin('https://example.com', allowed), true);
});

test('unsafe URL schemes are rejected', () => {
  assert.equal(isSafeEventLink('javascript:alert(1)'), false);
  assert.equal(normalizeSafeEventUrl('javascript:alert(1)'), null);
  assert.equal(isSafeEventLink('https://example.com/path'), true);
  assert.equal(normalizeSafeEventUrl('#'), '#');
});

test('ip+email identifier is deterministic and unique per pair', () => {
  const a = buildIpEmailIdentifier('203.0.113.10', 'foo@example.com');
  const b = buildIpEmailIdentifier('203.0.113.10', 'foo@example.com');
  const c = buildIpEmailIdentifier('203.0.113.10', 'bar@example.com');
  assert.equal(a, b);
  assert.notEqual(a, c);
});

test('idempotency key is accepted once within ttl window', async () => {
  const ns = `test-idempotency-${Date.now()}`;
  const key = 'contact-submit-001';
  const first = await reserveIdempotencyKey(ns, key, 2_000);
  const second = await reserveIdempotencyKey(ns, key, 2_000);
  assert.equal(first, true);
  assert.equal(second, false);
});
