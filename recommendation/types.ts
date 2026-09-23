export const TASTE_FEATURES = ['taste_sweet', 'taste_sour', 'taste_bitter'] as const;
export const FLAVOR_FEATURES = ['flavor_citrus', 'flavor_tropical', 'flavor_berry_red', 'flavor_stone_orchard', 'flavor_herbal', 'flavor_mint', 'flavor_floral', 'flavor_spice', 'flavor_coffee_choco', 'flavor_creamy_nutty', 'flavor_oak_caramel', 'flavor_smoky', 'flavor_anise', 'flavor_savory'] as const;
export const OCCASION_FEATURES = ['occasion_aperitif', 'occasion_with_meal', 'occasion_dessert', 'occasion_party', 'occasion_refresh', 'occasion_slow_sip', 'occasion_brunch'] as const;
export const FEATURES = [...TASTE_FEATURES, ...FLAVOR_FEATURES, ...OCCASION_FEATURES, 'taste_boozy', 'v2_abv', 'taste_fizz', 'taste_body', 'approachability', 'familiarity', 'complexity', 'polarizing'] as const;
export type Feature = typeof FEATURES[number];
export type Category = 'taste' | 'flavor' | 'alcohol' | 'texture' | 'occasion' | 'beginnerFit';
export type QuestionKey = 'taste' | 'aroma' | 'alcohol' | 'texture' | 'occasion' | 'adventure';
export type Answers = Record<QuestionKey, string>;
export type Preference = { state: 'UNKNOWN' } | { state: 'LIKE' | 'DISLIKE'; target: number };
export interface PreferenceVector {
  attributes: Record<Feature, Preference>;
  adventure: number;
  almostNoAlcohol: boolean;
}
export interface Cocktail {
  id: number; korName: string; engName: string; imageUrl: string;
  base: string; bases: string[]; style: string; serve: string;
  ingredients: string; originText: string; recipeStatus: string; allergens: string[];
  features: Record<Feature, number>;
}
export interface Evidence {
  category: Category; feature: Feature; actual: number; target: number;
  similarity: number; contribution: number; preference: 'LIKE' | 'DISLIKE';
}
export interface CocktailRecommendation {
  cocktail: Cocktail; score: number; rank: number;
  // null means omitted, not a zero match. Consumers must not display UNKNOWN as failure.
  scoreBreakdown: Record<Category, number | null>;
  normalizedWeights: Record<Category, number>;
  reasons: string[]; evidence: Evidence[];
}
export interface Question {
  key: QuestionKey; label: string; title: string;
  options: readonly (readonly [code: string, label: string, emoji: string, description?: string])[];
}
