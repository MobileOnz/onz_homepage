import type { Category, Feature } from './types.ts';
export const RECOMMENDATION_WEIGHTS: Record<Category, number> = {
  taste: .30, flavor: .25, alcohol: .20, texture: .10, occasion: .10, beginnerFit: .05,
};
export const ALCOHOL_WEIGHTS = { taste_boozy: .60, v2_abv: .40 };
export const BEGINNER_WEIGHTS = { approachability: .50, familiarity: .20, complexity: .15, polarizing: .15 };
export const RANKING = {
  candidateCount: 30, relevance: .85, diversity: .15, maxScoreDrop: .05, maxCoreSimilarityDrop: .20,
  // Only the explicit almost-no-alcohol answer excludes extremes, never taste/flavor.
  barelyMaxBoozy: 3, barelyMaxAbv: 24,
  reasonsCount: 3, reasonMinSimilarity: .70,
  familySimilarity: .60, baseSimilarity: .16, styleSimilarity: .06, flavorSimilarity: .12, serveSimilarity: .06,
};
// ABV targets follow the observed boozy-conditioned medians (0→6, 1→12, 3→21.5, 5→30).
export const ALCOHOL_TARGETS: Record<string, readonly [number, number]> = {
  BARELY: [0, 6], MILD: [1, 12], MEDIUM: [3, 21.5], STRONG: [5, 30],
};
export const TASTE_TARGETS: Record<string, Partial<Record<Feature, number>>> = {
  SWEET: { taste_sweet: 4 }, SOUR: { taste_sour: 4 }, BITTER: { taste_bitter: 4 }, BALANCED: { taste_sweet: 3, taste_sour: 3 },
};
export const FLAVOR_GROUPS: Record<string, readonly Feature[]> = {
  CITRUS: ['flavor_citrus'], FRUIT: ['flavor_tropical', 'flavor_stone_orchard'], BERRY: ['flavor_berry_red'],
  HERBAL: ['flavor_herbal', 'flavor_mint'], COFFEE: ['flavor_coffee_choco'], CREAMY: ['flavor_creamy_nutty'], DEEP: ['flavor_oak_caramel', 'flavor_spice'],
};
export const TEXTURE_TARGETS: Record<string, Partial<Record<Feature, number>>> = {
  FIZZY: { taste_fizz: 4 }, LIGHT: { taste_body: 1 }, BALANCED: { taste_body: 3 }, RICH: { taste_body: 5 },
};
export const OCCASION_MAP: Record<string, Feature> = {
  PARTY: 'occasion_party', MEAL: 'occasion_with_meal', DESSERT: 'occasion_dessert', SLOW: 'occasion_slow_sip',
  REFRESH: 'occasion_refresh', APERITIF: 'occasion_aperitif', BRUNCH: 'occasion_brunch',
};
