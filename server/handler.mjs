import { recommend } from './recommendation.mjs';
import { validateAnswers } from '../recommend/questions.js';

export default async function handler(req, res, env = process.env) {
  const json = (status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify(body));
  };
  if (req.method !== 'GET') return json(405, { error: 'GET 요청만 지원합니다.' });
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/api/config') return json(200, { mode: env.API_BASE_URL ? 'api' : 'demo' });
  if (url.pathname !== '/api/recommendation') return json(404, { error: '페이지를 찾을 수 없습니다.' });
  const answers = Object.fromEntries(url.searchParams);
  if (url.searchParams.size !== 5 || !validateAnswers(answers)) return json(400, { error: '질문에 대한 응답이 올바르지 않아요.' });
  try {
    return json(200, await recommend(answers, { baseUrl: env.API_BASE_URL, authorization: env.API_AUTHORIZATION }));
  } catch (error) {
    return json(502, { error: error.name === 'TimeoutError' ? '응답 시간이 초과됐어요. 다시 시도해주세요.' : error.message === 'fetch failed' ? '추천 서버에 연결할 수 없어요.' : error.message });
  }
}
