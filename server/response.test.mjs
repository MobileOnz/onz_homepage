import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readRecommendationResponse } from '../recommend/response.js';
test('platform plaintext/HTML errors do not leak JSON parser failures', async () => {
  for (const text of ['A server error has occurred', '<html>Bad Gateway</html>']) {
    await assert.rejects(readRecommendationResponse(new Response(text, { status: 500 })), /추천 서버에서 오류가 발생했어요 \(500\)/);
  }
  await assert.rejects(readRecommendationResponse(new Response('not json')), /응답 형식/);
  await assert.rejects(readRecommendationResponse(Response.json({ error: '답변을 확인해주세요.' }, { status: 400 })), /답변을 확인해주세요/);
  assert.deepEqual(await readRecommendationResponse(Response.json({ data: [] })), { data: [] });
});
