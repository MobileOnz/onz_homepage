import type { IncomingMessage, ServerResponse } from 'node:http';
import { cocktails } from '../recommendation/data.ts';
import { validateAnswers, questions } from '../recommendation/questions.ts';
import { recommendCocktails } from '../recommendation/recommendCocktails.ts';
export default function recommendations(req: IncomingMessage, res: ServerResponse) {
  const json = (status: number, body: unknown) => {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify(body));
  };
  if (req.method !== 'GET') return json(405, { error: 'GET 요청만 지원합니다.' });
  const url = new URL(req.url ?? '/', 'http://localhost');
  const answers = Object.fromEntries(url.searchParams);
  if (url.searchParams.size !== questions.length || !validateAnswers(answers)) return json(400, { error: '여섯 가지 질문에 대한 응답을 확인해주세요.' });
  try {
    return json(200, { mode: 'csv', datasetCount: cocktails.length, data: recommendCocktails(cocktails, answers) });
  } catch {
    return json(500, { error: '추천을 계산하지 못했어요. 잠시 후 다시 시도해주세요.' });
  }
}
