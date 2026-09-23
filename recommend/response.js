export async function readRecommendationResponse(response) {
  let body;
  try { body = await response.json(); }
  catch {
    throw new Error(response.ok
      ? '추천 서버의 응답 형식이 올바르지 않아요. 다시 시도해주세요.'
      : `추천 서버에서 오류가 발생했어요 (${response.status}). 잠시 후 다시 시도해주세요.`);
  }
  if (!response.ok) throw new Error(typeof body?.error === 'string' ? body.error : `추천을 불러오지 못했어요 (${response.status}). 다시 시도해주세요.`);
  return body;
}
