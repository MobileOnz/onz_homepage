import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cocktails } from '../recommendation/data.ts';
import { FEATURES, FLAVOR_FEATURES } from '../recommendation/types.ts';
import { cases } from '../recommendation/cases.ts';
import { questions, toRequest, validateAnswers } from '../recommendation/questions.ts';
import { mapPreferences } from '../recommendation/preferenceMapper.ts';
import { getRanges, similarity } from '../recommendation/similarity.ts';
import { beginnerFit } from '../recommendation/beginnerReranker.ts';
import { scoreCocktail, isExcluded } from '../recommendation/scoring.ts';
import { rankCocktails, recommendCocktails } from '../recommendation/recommendCocktails.ts';
import { cocktailFamily, diversityRerank } from '../recommendation/diversityReranker.ts';
import handler from './recommendations.ts';
const ranges = getRanges(cocktails);
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-10, `${a} != ${b}`);
function request(query, method = 'GET') {
  let status, headers, body;
  handler({ method, url: `/api/recommendations?${query}` }, {
    writeHead(code, values) { status = code; headers = values; },
    end(value) { body = JSON.parse(value); },
  });
  return { status, headers, body };
}
test('complete source attributes, sparse flavors, HTTPS images, observed scales', () => {
  assert.equal(cocktails.length, 530);
  assert.equal(new Set(cocktails.map(c => c.id)).size, 530);
  for (const c of cocktails) {
    assert.equal(Object.keys(c.features).length, FEATURES.length);
    assert.ok(FEATURES.every(key => Number.isFinite(c.features[key])));
    assert.ok(c.imageUrl.startsWith('https://'));
  }
  assert.deepEqual(ranges.polarizing, [0, 1]);
  assert.deepEqual(ranges.occasion_party, [0, 3]);
  assert.deepEqual(ranges.v2_abv, [0, 45]);
  for (const key of ['flavor_smoky', 'flavor_anise', 'flavor_savory', 'flavor_floral']) {
    assert.ok(cocktails.some(c => c.features[key] > 0));
  }
});
test('unknown is omitted, not dislike; distance and explicit dislike behave oppositely', () => {
  const vector = mapPreferences(cases.A);
  assert.deepEqual(vector.attributes.taste_sour, { state: 'UNKNOWN' });
  assert.deepEqual(vector.attributes.taste_bitter, { state: 'UNKNOWN' });
  assert.equal(similarity({ state: 'UNKNOWN' }, 4, [0, 5]), null);
  assert.equal(similarity({ state: 'LIKE', target: 5 }, 5, [0, 5]), 1);
  assert.equal(similarity({ state: 'DISLIKE', target: 5 }, 5, [0, 5]), 0);
  assert.equal(similarity({ state: 'DISLIKE', target: 5 }, 0, [0, 5]), 1);
  const drink = cocktails[0];
  const changed = { ...drink, features: { ...drink.features, taste_sour: 4, taste_bitter: 5 } };
  close(scoreCocktail(drink, vector, ranges).score, scoreCocktail(changed, vector, ranges).score);
  const d = scoreCocktail(drink, mapPreferences(cases.D), ranges);
  assert.equal(d.scoreBreakdown.taste, null);
  assert.equal(d.scoreBreakdown.flavor, null);
  close(d.normalizedWeights.alcohol, .2 / .45);
  close(d.score, (d.scoreBreakdown.alcohol * .2 + d.scoreBreakdown.texture * .1 + d.scoreBreakdown.occasion * .1 + d.scoreBreakdown.beginnerFit * .05) / .45);
  assert.ok(d.evidence.every(entry => entry.category !== 'flavor' && entry.category !== 'taste'));
});
test('flavor alternatives use OR; rare flavors remain scoreable; fizz is texture only', () => {
  const vector = mapPreferences(cases.C);
  const drink = { ...cocktails[0], features: { ...cocktails[0].features, flavor_herbal: 5, flavor_mint: 0 } };
  assert.equal(scoreCocktail(drink, vector, ranges).scoreBreakdown.flavor, 1);
  for (const key of FLAVOR_FEATURES) vector.attributes[key] = { state: 'UNKNOWN' };
  vector.attributes.flavor_smoky = { state: 'LIKE', target: 5 };
  drink.features.flavor_smoky = 5;
  assert.equal(scoreCocktail(drink, vector, ranges).scoreBreakdown.flavor, 1);
  const a = mapPreferences(cases.A);
  assert.equal(a.attributes.taste_fizz.state, 'LIKE');
  assert.equal(mapPreferences({ ...cases.A, aroma: 'UNKNOWN' }).attributes.flavor_citrus.state, 'UNKNOWN');
});
test('alcohol uses both signals and only explicit almost-none excludes extreme strength', () => {
  const v = mapPreferences({ ...cases.A, alcohol: 'BARELY' });
  const drink = { ...cocktails[0], features: { ...cocktails[0].features, taste_boozy: 0, v2_abv: 6 } };
  assert.equal(scoreCocktail(drink, v, ranges).scoreBreakdown.alcohol, 1);
  const stronger = { ...drink, features: { ...drink.features, v2_abv: 30 } };
  assert.ok(scoreCocktail(stronger, v, ranges).scoreBreakdown.alcohol < 1);
  assert.equal(isExcluded(stronger, v), true);
  assert.equal(isExcluded(stronger, mapPreferences(cases.A)), false);
  assert.equal(isExcluded({ ...drink, features: { ...drink.features, taste_boozy: 5 } }, v), true);
  for (const r of recommendCocktails(cocktails, { ...cases.A, alcohol: 'BARELY' }, 10)) {
    assert.ok(r.cocktail.features.taste_boozy <= 3 && r.cocktail.features.v2_abv <= 24);
  }
});
test('beginner penalties relax with openness and cannot reverse large sensory differences', () => {
  const v = mapPreferences(cases.A);
  for (const c of cocktails) {
    assert.ok(beginnerFit(c, 5, ranges) >= beginnerFit(c, 1, ranges));
    const score = scoreCocktail(c, v, ranges);
    assert.ok(score.normalizedWeights.beginnerFit <= .05 + 1e-10);
  }
  const ranked = rankCocktails(cocktails, cases.B);
  const sensory = r => r.score - r.normalizedWeights.beginnerFit * r.scoreBreakdown.beginnerFit;
  assert.ok(Math.max(...ranked.map(sensory)) - sensory(ranked[0]) <= .05);
});
test('A–D run on all 530 rows: evidence, top 1, diversity, score accounting and determinism', () => {
  for (const answers of Object.values(cases)) {
    const ranked = rankCocktails(cocktails, answers);
    const results = recommendCocktails(cocktails, answers, 10);
    assert.equal(ranked.length, 530);
    assert.equal(results.length, 10);
    assert.equal(results[0].cocktail.id, ranked[0].cocktail.id);
    assert.deepEqual(results, recommendCocktails(cocktails, answers, 10));
    assert.equal(new Set(results.map(r => r.cocktail.id)).size, 10);
    const families = results.slice(0, 5).map(r => cocktailFamily(r.cocktail));
    assert.ok(Math.max(...families.map(f => families.filter(other => other === f).length)) <= 2);
    for (const [index, r] of results.entries()) {
      assert.equal(r.rank, index + 1);
      close(Object.values(r.normalizedWeights).reduce((a, b) => a + b), 1);
      close(r.score, Object.entries(r.scoreBreakdown).reduce((sum, [key, value]) => sum + (value ?? 0) * r.normalizedWeights[key], 0));
      close(r.score, r.evidence.reduce((sum, e) => sum + e.contribution, 0) + r.normalizedWeights.beginnerFit * r.scoreBreakdown.beginnerFit);
      assert.ok(r.reasons.length > 0 && Number.isFinite(r.score) && r.score >= 0 && r.score <= 1);
      for (const e of r.evidence) assert.equal(e.actual, r.cocktail.features[e.feature]);
    }
  }
  const top = name => recommendCocktails(cocktails, cases[name]).map(r => r.cocktail.features);
  const topA = top('A');
  const topA10 = recommendCocktails(cocktails, cases.A, 10).map(r => r.cocktail.features);
  assert.ok(topA.slice(0, 5).every(f => f.taste_sweet >= 4 && Math.max(f.flavor_tropical, f.flavor_stone_orchard) >= 4 && f.taste_fizz === 4 && f.taste_boozy <= 2));
  assert.ok(topA10.every(f => f.taste_sweet >= 4 && f.taste_fizz === 4 && f.taste_boozy <= 2));
  assert.ok(topA10.filter(f => Math.max(f.flavor_tropical, f.flavor_stone_orchard) >= 4).length >= 8);
  assert.ok(top('B').every(f => f.taste_sour === 4 && f.flavor_citrus >= 4));
  assert.ok(recommendCocktails(cocktails, cases.B, 10).filter(r => r.cocktail.features.taste_boozy >= 2).length >= 8);
  assert.ok(top('C').every(f => f.taste_bitter >= 3 && f.flavor_herbal >= 3 && f.taste_boozy >= 4));
  assert.ok(top('D').every(f => f.taste_fizz === 4 && f.taste_boozy <= 2 && f.occasion_brunch === 3));
});
test('MMR preserves winner and breaks a synthetic family monopoly without poor matches', () => {
  const sample = rankCocktails(cocktails, cases.A)[0];
  const ranked = ['Margarita', "Tommy's Margarita", 'Strawberry Margarita', 'Frozen Margarita', 'Mezcal Margarita', 'Daiquiri', 'Mojito', 'Manhattan', 'Negroni'].map((engName, i) => ({ ...sample, score: .99 - i * .001, cocktail: { ...sample.cocktail, id: i, engName } }));
  const results = diversityRerank(ranked);
  assert.equal(results[0].cocktail.engName, 'Margarita');
  assert.equal(new Set(results.map(r => cocktailFamily(r.cocktail))).size, 5);
});
test('boundary validation, six-question API, no duplicates or unknown keys', () => {
  assert.equal(questions.length, 6);
  for (const q of questions) for (const [code] of q.options) assert.equal(validateAnswers({ ...cases.A, [q.key]: code }), true);
  assert.equal(validateAnswers({ ...cases.A, taste: 'BAD' }), false);
  assert.equal(validateAnswers(null), false);
  assert.throws(() => toRequest({ taste: 'SWEET' }));
  const query = toRequest(cases.A);
  const result = request(query);
  assert.equal(result.status, 200);
  assert.equal(result.body.data.length, 5);
  assert.equal(result.body.mode, 'csv');
  assert.equal(result.body.datasetCount, 530);
  assert.equal(result.headers['Cache-Control'], 'no-store');
  assert.equal(request(`${query}&taste=SOUR`).status, 400);
  assert.equal(request(`${query}&extra=1`).status, 400);
  assert.equal(request('taste=SWEET').status, 400);
  assert.equal(request(query, 'POST').status, 405);
});
test('all unknown sensory categories stay finite, deterministic, and explicit', () => {
  const answers = { taste: 'UNKNOWN', aroma: 'UNKNOWN', alcohol: 'UNKNOWN', texture: 'UNKNOWN', occasion: 'UNKNOWN', adventure: '1' };
  const results = recommendCocktails(cocktails, answers);
  assert.equal(results.length, 5);
  for (const r of results) {
    assert.equal(r.normalizedWeights.beginnerFit, 1);
    assert.equal(r.evidence.length, 0);
    assert.ok(r.reasons[0].includes('구체적인 취향을 고르지 않아'));
    assert.equal(r.score, r.scoreBreakdown.beginnerFit);
  }
});
