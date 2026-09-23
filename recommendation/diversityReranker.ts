import { FLAVOR_FEATURES } from './types.ts';
import type { Category, Cocktail, CocktailRecommendation } from './types.ts';
import { RANKING } from './config.ts';

export function cocktailFamily(cocktail: Cocktail): string {
  // ponytail: name heuristic misses unnamed relatives; replace with curated family IDs when the CSV provides them.
  const name = cocktail.engName.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const family = name.match(/\b(margarita|daiquiri|mojito|martini|negroni|manhattan|old fashioned|collins|mule|sour|fizz|spritz|julep|smash|colada|alexander|sidecar|punch|sangria)\b/);
  return family?.[1] ?? `id:${cocktail.id}`;
}
export function dominantFlavors(cocktail: Cocktail): string[] {
  const max = Math.max(...FLAVOR_FEATURES.map(key => cocktail.features[key]));
  return max === 0 ? [] : FLAVOR_FEATURES.filter(key => cocktail.features[key] === max);
}
function jaccard(a: readonly string[], b: readonly string[]): number {
  const union = new Set([...a, ...b]);
  return union.size ? new Set(a.filter(value => b.includes(value))).size / union.size : 0;
}
export function candidateSimilarity(a: Cocktail, b: Cocktail): number {
  return RANKING.familySimilarity * Number(cocktailFamily(a) === cocktailFamily(b))
    + RANKING.baseSimilarity * jaccard(a.bases, b.bases)
    + RANKING.styleSimilarity * Number(a.style === b.style)
    + RANKING.flavorSimilarity * jaccard(dominantFlavors(a), dominantFlavors(b))
    + RANKING.serveSimilarity * Number(a.serve === b.serve);
}
export function diversityRerank(ranked: readonly CocktailRecommendation[], count = 5): CocktailRecommendation[] {
  if (!ranked.length || count < 1) return [];
  const candidates = ranked.slice(0, RANKING.candidateCount);
  const selected = [candidates.shift()!]; // Preserve the highest pure recommendation score.
  while (selected.length < count && candidates.length) {
    const bestRemaining = candidates.reduce((best, entry) => entry.score > best.score ? entry : best);
    // Diversity may reorder nearby matches, not promote a weak alcohol/flavor match over a strong one.
    // This is a temporary reranking guard: candidates stay in the pool, not a hard exclusion.
    const core: Category[] = ['taste', 'flavor', 'alcohol'];
    const eligible = candidates.filter(c => c.score >= bestRemaining.score - RANKING.maxScoreDrop && core.every(key => {
      const best = bestRemaining.scoreBreakdown[key];
      const match = c.scoreBreakdown[key];
      return best === null || match === null || match >= best - RANKING.maxCoreSimilarityDrop;
    }));
    const mmr = (entry: CocktailRecommendation) => RANKING.relevance * entry.score + RANKING.diversity *
      (1 - Math.max(...selected.map(other => candidateSimilarity(entry.cocktail, other.cocktail))));
    eligible.sort((a, b) => mmr(b) - mmr(a) || b.score - a.score || a.cocktail.id - b.cocktail.id);
    const next = eligible[0];
    selected.push(next);
    candidates.splice(candidates.indexOf(next), 1);
  }
  return selected.map((entry, index) => ({ ...entry, rank: index + 1 }));
}
