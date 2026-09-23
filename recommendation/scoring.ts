import { TASTE_FEATURES, FLAVOR_FEATURES, OCCASION_FEATURES } from './types.ts';
import type { Category, Cocktail, CocktailRecommendation, Evidence, Feature, PreferenceVector } from './types.ts';
import { RECOMMENDATION_WEIGHTS, ALCOHOL_WEIGHTS, RANKING } from './config.ts';
import { beginnerFit } from './beginnerReranker.ts';
import { similarity } from './similarity.ts';
import type { Ranges } from './similarity.ts';
const LABELS: Record<Feature, string> = {
  taste_sweet: '단맛', taste_sour: '새콤한 맛', taste_bitter: '쌉싸름한 맛', taste_boozy: '체감 술맛', v2_abv: '도수', taste_fizz: '탄산감', taste_body: '무게감',
  flavor_citrus: '시트러스 향', flavor_tropical: '열대과일 향', flavor_berry_red: '베리 향', flavor_stone_orchard: '복숭아·사과 계열 향',
  flavor_herbal: '허브 향', flavor_mint: '민트 향', flavor_floral: '꽃 향', flavor_spice: '향신료 향', flavor_coffee_choco: '커피·초콜릿 향',
  flavor_creamy_nutty: '크리미·견과 향', flavor_oak_caramel: '오크·캐러멜 향', flavor_smoky: '스모키 향', flavor_anise: '아니스 향', flavor_savory: '감칠맛 계열 향',
  occasion_aperitif: '식전 적합도', occasion_with_meal: '음식과의 적합도', occasion_dessert: '디저트 적합도', occasion_party: '파티 적합도',
  occasion_refresh: '기분전환 적합도', occasion_slow_sip: '천천히 마시기 적합도', occasion_brunch: '브런치 적합도',
  approachability: '접근성', familiarity: '친숙함', complexity: '복잡성', polarizing: '호불호',
};
export function isExcluded(cocktail: Cocktail, vector: PreferenceVector): boolean {
  return vector.almostNoAlcohol && (cocktail.features.taste_boozy > RANKING.barelyMaxBoozy || cocktail.features.v2_abv > RANKING.barelyMaxAbv);
}
export function scoreCocktail(cocktail: Cocktail, vector: PreferenceVector, ranges: Ranges): CocktailRecommendation {
  const evidence: Evidence[] = [];
  function group(category: Category, keys: readonly Feature[], mode: 'mean' | 'any' = 'mean'): number | null {
    let active = keys.flatMap(feature => {
      const preference = vector.attributes[feature];
      const match = similarity(preference, cocktail.features[feature], ranges[feature]);
      if (match === null || preference.state === 'UNKNOWN') return [];
      return [{ category, feature, actual: cocktail.features[feature], target: preference.target, similarity: match, contribution: 0, preference: preference.state } satisfies Evidence];
    });
    if (!active.length) return null;
    if (mode === 'any') {
      // LIKE alternatives use their strongest match; every explicit DISLIKE remains a constraint.
      const likes = active.filter(e => e.preference === 'LIKE').sort((a, b) => b.similarity - a.similarity);
      active = [...likes.slice(0, 1), ...active.filter(e => e.preference === 'DISLIKE')];
    }
    const weights = active.map(e => category === 'alcohol' ? ALCOHOL_WEIGHTS[e.feature as keyof typeof ALCOHOL_WEIGHTS] : 1);
    const total = weights.reduce((a, b) => a + b, 0);
    active.forEach((entry, index) => { entry.contribution = entry.similarity * weights[index] / total; });
    evidence.push(...active);
    return active.reduce((sum, entry) => sum + entry.contribution, 0);
  }
  const scoreBreakdown: CocktailRecommendation['scoreBreakdown'] = {
    taste: group('taste', TASTE_FEATURES), flavor: group('flavor', FLAVOR_FEATURES, 'any'),
    alcohol: group('alcohol', ['taste_boozy', 'v2_abv']), texture: group('texture', ['taste_body', 'taste_fizz']),
    occasion: group('occasion', OCCASION_FEATURES), beginnerFit: beginnerFit(cocktail, vector.adventure, ranges),
  };
  const categories = Object.keys(RECOMMENDATION_WEIGHTS) as Category[];
  const totalWeight = categories.reduce((sum, category) => sum + (scoreBreakdown[category] === null ? 0 : RECOMMENDATION_WEIGHTS[category]), 0);
  const normalizedWeights = Object.fromEntries(categories.map(category => [category, scoreBreakdown[category] === null ? 0 : RECOMMENDATION_WEIGHTS[category] / totalWeight])) as Record<Category, number>;
  const score = categories.reduce((sum, category) => sum + (scoreBreakdown[category] ?? 0) * normalizedWeights[category], 0);
  evidence.forEach(entry => { entry.contribution *= normalizedWeights[entry.category]; });
  evidence.sort((a, b) => b.contribution - a.contribution || a.feature.localeCompare(b.feature));
  const reasonEvidence = evidence.filter(entry => entry.similarity >= RANKING.reasonMinSimilarity).slice(0, RANKING.reasonsCount);
  const reasons = reasonEvidence.map(entry => {
    const unit = entry.feature === 'v2_abv' ? '%' : `/${ranges[entry.feature][1]}`;
    return `${LABELS[entry.feature]} ${entry.actual}${unit}로, ${entry.preference === 'DISLIKE' ? '피하고 싶은 강도와 거리가 있어요' : '선택한 취향과 가까워요'}.`;
  });
  if (!reasons.length && evidence.length) {
    const best = evidence[0];
    reasons.push(`${LABELS[best.feature]} ${best.actual} (선택 기준 ${best.target})가 점수에 가장 크게 반영됐어요. 모든 조건이 잘 맞는 결과는 아니에요.`);
  }
  if (!evidence.length) reasons.push(`구체적인 취향을 고르지 않아 접근성 ${cocktail.features.approachability}/5, 친숙함 ${cocktail.features.familiarity}/5와 도전 수준을 기준으로 골랐어요.`);
  return { cocktail, score, rank: 0, scoreBreakdown, normalizedWeights, reasons, evidence };
}
