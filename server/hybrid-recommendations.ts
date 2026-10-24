import type { Answers, Cocktail } from '../recommendation/types.ts';

// Preference words, not invented measurements or inferred ingredient requirements.
const preferences: Record<string, Record<string, string>> = {
  taste: { SWEET: '달콤', SOUR: '상큼 새콤', BITTER: '쌉싸름', BALANCED: '달콤 상큼' },
  aroma: { CITRUS: '시트러스 레몬 라임 오렌지 향', FRUIT: '과일향 트로피컬', BERRY: '베리 향', HERBAL: '허브향 민트 상쾌함', COFFEE: '커피 초콜릿 향', CREAMY: '크리미 고소함', DEEP: '오크 캐러멜 향신료 향' },
  alcohol: { BARELY: '술맛이 약하고 가벼운', MILD: '가벼운 술맛', MEDIUM: '균형 잡힌 술맛', STRONG: '강한 술맛' },
  texture: { FIZZY: '탄산 청량', LIGHT: '가볍고 산뜻한', BALANCED: '균형 잡힌', RICH: '묵직하고 진한' },
  occasion: { PARTY: '파티', MEAL: '식사', DESSERT: '디저트', SLOW: '천천히 마시는', REFRESH: '청량 기분전환', APERITIF: '식전', BRUNCH: '브런치' },
  adventure: { '1': '편안한 익숙한', '2': '가볍게 새로운', '3': '특별한', '4': '색다른', '5': '개성 강한' },
};
export function hybridQuery(answers: Answers) {
  return Object.entries(preferences).map(([key, values]) => values[answers[key as keyof Answers]] ?? '').filter(Boolean).join(' ') + ' 칵테일';
}
interface SearchItem {
  cocktailId: number; nameKo: string; nameEn: string; base_raw: string;
  image_url: string | null; ingredients_raw: string; abv_min: number; abv_max: number;
  taste_tags: string[]; aroma_tags: string[]; matchReasons: string[];
}
function validItem(item: SearchItem) {
  return item && Number.isSafeInteger(item.cocktailId) && item.cocktailId > 0
    && [item.nameKo,item.nameEn,item.base_raw,item.ingredients_raw].every(v => typeof v === 'string')
    && Number.isFinite(item.abv_min) && Number.isFinite(item.abv_max)
    && 0 <= item.abv_min && item.abv_min <= item.abv_max && item.abv_max <= 100
    && [item.taste_tags,item.aroma_tags,item.matchReasons].every(v => Array.isArray(v) && v.every(t => typeof t === 'string'));
}
export async function hybridRecommendations(answers: Answers, catalog: readonly Cocktail[], baseUrl: string, fetcher = fetch) {
  const base = new URL(baseUrl);
  if (!['http:', 'https:'].includes(base.protocol) || base.search || base.hash || base.username || base.password) throw new Error('검색 서버 주소 설정을 확인해주세요.');
  const query = hybridQuery(answers);
  const params = new URLSearchParams({ query, limit: '5' });
  // Keep the existing explicit BARELY safety ceiling, using the source upper ABV bound.
  if (answers.alcohol === 'BARELY') params.set('abvMax', '24');
  const response = await fetcher(`${base.href.replace(/\/$/, '')}/api/v2/cocktails/search/hybrid?${params}`, {
    headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(12000), redirect: 'error',
  });
  if (!response.ok) throw new Error('검색 서버에 연결하지 못했어요. 잠시 후 다시 시도해주세요.');
  const body = await response.json() as { code: number; data?: { items: SearchItem[]; mode: string; degraded: boolean } };
  const result = body?.data;
  if (body?.code !== 1 || !result || !['hybrid','keyword'].includes(result.mode) || typeof result.degraded !== 'boolean'
      || !Array.isArray(result.items) || !result.items.every(validItem)) throw new Error('검색 서버의 응답 형식이 올바르지 않아요.');
  const byId = new Map(catalog.map(c => [c.id, c]));
  return {
    mode: result.mode, degraded: result.degraded, query,
    notice: result.degraded ? '일부 검색 기능이 지연되어 이름·재료·맛 키워드를 기준으로 찾았어요.' : '이름·재료와 맛·향의 유사성을 함께 살펴 골랐어요.',
    data: result.items.map((item: SearchItem, index: number) => {
      const original = byId.get(item.cocktailId);
      const sameIdentity = original?.korName === item.nameKo && original?.engName === item.nameEn;
      let imageUrl = '';
      let imageFallbackUrl = '';
      try {
        const url = new URL(item.image_url ?? '');
        if (url.protocol === 'http:' && url.hostname === 'onz-cocktail.kr') url.protocol = 'https:';
        if (url.protocol === 'https:') imageUrl = url.href;
        const match = url.hostname === 'onz-cocktail.kr' && url.pathname.match(/^\/uploads\/cocktails\/(onz_cocktail_[A-Za-z0-9_-]+)\.webp$/);
        if (match) {
          imageUrl = `https://raw.githubusercontent.com/rlaaudgjs2/onz-cocktail-images/main/cocktail_image_file/old/${match[1]}.webp`;
          imageFallbackUrl = `https://onz-cocktail-images.s3.ap-northeast-2.amazonaws.com/cocktails/${match[1]}.png`;
        }
      } catch { /* The existing card shows a missing-photo message. */ }
      const reasons = [...new Set([...item.taste_tags.map(t => `맛: ${t}`), ...item.aroma_tags.map(t => `향: ${t}`)])].slice(0, 4);
      return {
        rank: index + 1,
        cocktail: { id: item.cocktailId, korName: item.nameKo, engName: item.nameEn, base: item.base_raw,
          imageUrl, imageFallbackUrl, ingredients: item.ingredients_raw, originText: sameIdentity ? original.originText : '등록된 이야기가 없어요.',
          abvLabel: item.abv_min === item.abv_max ? String(item.abv_min) : `${item.abv_min}–${item.abv_max}` },
        // Source tags are facts, not a claim that every selected preference was satisfied.
        reasons: reasons.length ? reasons : ['등록된 재료와 맛·향 정보를 바탕으로 찾은 칵테일이에요.'],
      };
    }),
  };
}
