import { FEATURES } from './types.ts';
import type { Answers, Feature, PreferenceVector } from './types.ts';
import { ALCOHOL_TARGETS, FLAVOR_GROUPS, OCCASION_MAP, TASTE_TARGETS, TEXTURE_TARGETS } from './config.ts';
import { validateAnswers } from './questions.ts';
export function mapPreferences(answers: Answers): PreferenceVector {
  if (!validateAnswers(answers)) throw new Error('여섯 가지 질문에 모두 답해주세요.');
  const attributes = Object.fromEntries(FEATURES.map(key => [key, { state: 'UNKNOWN' }])) as PreferenceVector['attributes'];
  const like = (key: Feature, target: number) => { attributes[key] = { state: 'LIKE', target }; };
  for (const [key, value] of Object.entries(TASTE_TARGETS[answers.taste] ?? {})) like(key as Feature, value);
  // A flavor group is OR: herbal OR mint, not a requirement to contain both.
  for (const key of FLAVOR_GROUPS[answers.aroma] ?? []) like(key, 5);
  const alcohol = ALCOHOL_TARGETS[answers.alcohol];
  if (alcohol) { like('taste_boozy', alcohol[0]); like('v2_abv', alcohol[1]); }
  for (const [key, value] of Object.entries(TEXTURE_TARGETS[answers.texture] ?? {})) like(key as Feature, value);
  const occasion = OCCASION_MAP[answers.occasion];
  if (occasion) like(occasion, 3);
  return { attributes, adventure: Number(answers.adventure), almostNoAlcohol: answers.alcohol === 'BARELY' };
}
