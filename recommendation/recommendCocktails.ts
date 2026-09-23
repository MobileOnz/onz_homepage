import type { Answers, Cocktail, CocktailRecommendation } from './types.ts';
import { mapPreferences } from './preferenceMapper.ts';
import { getRanges } from './similarity.ts';
import { isExcluded, scoreCocktail } from './scoring.ts';
import { diversityRerank } from './diversityReranker.ts';
export function rankCocktails(cocktails: readonly Cocktail[], answers: Answers): CocktailRecommendation[] {
  const vector = mapPreferences(answers);
  if (!cocktails.length) return [];
  const ranges = getRanges(cocktails); // Dataset scale is fixed before hard exclusions.
  return cocktails.filter(cocktail => !isExcluded(cocktail, vector))
    .map(cocktail => scoreCocktail(cocktail, vector, ranges))
    .sort((a, b) => b.score - a.score || a.cocktail.id - b.cocktail.id);
}
export function recommendCocktails(cocktails: readonly Cocktail[], answers: Answers, count = 5): CocktailRecommendation[] {
  if (!Number.isInteger(count) || count < 1 || count > 30) throw new Error('결과 개수는 1–30 사이여야 합니다.');
  return diversityRerank(rankCocktails(cocktails, answers), count);
}
