import { test } from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import handler from './handler.mjs';
import { questions, toRequest } from '../recommend/questions.js';
import { recommend } from './recommendation.mjs';
const answers = { flavor: 'CITRUS', mood: 'CASUAL', season: 'SUMMER', style: 'LIGHT', abvBand: 'LOW' };
async function request(url, method = 'GET', env = {}) {
  let status, headers, body;
  await handler({ url, method }, {
    writeHead(code, values) { status = code; headers = values; },
    end(value) { body = JSON.parse(value); },
  }, env);
  return { status, headers, body };
}
test('question codes and assets survive migration', async () => {
  assert.deepEqual(questions.map(q => q.options.length), [7, 6, 5, 5, 3]);
  for (const q of questions) for (const [code, , icon] of q.options) {
    assert.ok(toRequest({ ...answers, [q.key]: code }));
    await access(new URL(`../public/recommend-assets/${icon}`, import.meta.url));
  }
});
test('API config, validation, demo and private response caching', async () => {
  assert.equal((await request('/api/config')).body.mode, 'demo');
  assert.equal((await request('/api/config', 'GET', { API_BASE_URL: 'https://example.com' })).body.mode, 'api');
  assert.equal((await request('/api/config', 'POST')).status, 405);
  assert.equal((await request('/api/unknown')).status, 404);
  assert.equal((await request('/api/recommendation?flavor=SWEET')).status, 400);
  const query = toRequest(answers);
  assert.equal((await request(`/api/recommendation?${query}&flavor=SWEET`)).status, 400);
  const result = await request(`/api/recommendation?${query}`);
  assert.equal(result.status, 200);
  assert.equal(result.body.mode, 'demo');
  assert.equal(result.headers['Cache-Control'], 'no-store');
});
test('existing backend contract, empty result and failures are preserved', async () => {
  const result = await recommend(answers, { baseUrl: 'https://example.com/onz', authorization: 'test', fetcher: async (url, options) => {
    assert.equal(new URL(url).pathname, '/onz/api/v2/cocktails/recommendation');
    assert.deepEqual(Object.fromEntries(new URL(url).searchParams), answers);
    assert.equal(options.headers.Authorization, 'test');
    return Response.json({ data: null });
  } });
  assert.equal(result.data, null);
  for (const status of [401, 403, 500]) await assert.rejects(recommend(answers, { baseUrl: 'https://example.com', fetcher: async () => new Response('', { status }) }));
  await assert.rejects(recommend(answers, { baseUrl: 'https://example.com', fetcher: async () => Response.json({}) }));
  const failure = await request(`/api/recommendation?${toRequest(answers)}`, 'GET', { API_BASE_URL: 'invalid' });
  assert.equal(failure.status, 502);
});
