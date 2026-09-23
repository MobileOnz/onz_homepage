import { writeFileSync } from 'node:fs';
import { cocktails } from '../recommendation/data.ts';
import { cases } from '../recommendation/cases.ts';
import { rankCocktails, recommendCocktails } from '../recommendation/recommendCocktails.ts';
import { cocktailFamily, dominantFlavors } from '../recommendation/diversityReranker.ts';
const lines = ['# Recommendation evaluation — all 530 CSV records', '', 'Scores are model similarities, not probabilities. Rank 1 is preserved; ranks 2 onward use diversity, so scores can be non-monotonic.', ''];
for (const [name, answers] of Object.entries(cases)) {
  const ranked = rankCocktails(cocktails, answers);
  const results = recommendCocktails(cocktails, answers, 10);
  lines.push(`## Case ${name}`, '', `Answers: ${JSON.stringify(answers)}`, '',
    '| Rank | Cocktail | Score | Taste | Flavor | Alcohol | Texture | Occasion | Beginner | ABV | Boozy | Sweet/Sour/Bitter | Body/Fizz | Family | Dominant flavor |',
    '|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|');
  for (const r of results) {
    const f = r.cocktail.features;
    lines.push(`| ${r.rank} | ${r.cocktail.engName} | ${r.score.toFixed(4)} | ${Object.values(r.scoreBreakdown).map(v => v === null ? 'UNKNOWN' : v.toFixed(3)).join(' | ')} | ${f.v2_abv} | ${f.taste_boozy} | ${f.taste_sweet}/${f.taste_sour}/${f.taste_bitter} | ${f.taste_body}/${f.taste_fizz} | ${cocktailFamily(r.cocktail)} | ${dominantFlavors(r.cocktail).join(', ')} |`);
  }
  lines.push('', `Pure-score top 5: ${ranked.slice(0, 5).map(r => r.cocktail.engName).join(', ')}`, '',
    `Normalized weights: ${JSON.stringify(results[0].normalizedWeights)}`, '', 'Top 5 reasons:', '');
  for (const r of results.slice(0, 5)) lines.push(`- ${r.cocktail.engName}: ${r.reasons.join(' ')}`);
  const withoutBeginner = [...ranked].sort((a, b) => (b.score - b.normalizedWeights.beginnerFit * b.scoreBreakdown.beginnerFit!) - (a.score - a.normalizedWeights.beginnerFit * a.scoreBreakdown.beginnerFit!) || a.cocktail.id - b.cocktail.id);
  lines.push('', `Top without beginner contribution: ${withoutBeginner[0].cocktail.engName}; with it: ${ranked[0].cocktail.engName}. Beginner contribution ceiling: ${results[0].normalizedWeights.beginnerFit.toFixed(4)}.`, '');
}
writeFileSync(new URL('../reports/recommendation-cases.md', import.meta.url), lines.join('\n') + '\n');
console.log(lines.join('\n'));
