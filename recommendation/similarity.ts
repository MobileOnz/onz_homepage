import { FEATURES } from './types.ts';
import type { Cocktail, Feature, Preference } from './types.ts';
export type Ranges = Record<Feature, readonly [number, number]>;
export const clamp = (value: number) => Math.max(0, Math.min(1, value));
export function getRanges(cocktails: readonly Cocktail[]): Ranges {
  if (!cocktails.length) throw new Error('칵테일 데이터가 비어 있습니다.');
  const ranges = {} as Ranges;
  for (const key of FEATURES) {
    const values = cocktails.map(c => c.features[key]);
    if (values.some(value => !Number.isFinite(value))) throw new Error(`Invalid feature: ${key}`);
    ranges[key] = [Math.min(...values), Math.max(...values)];
  }
  return ranges;
}
export function normalize(value: number, [min, max]: readonly [number, number]): number {
  return max === min ? 0 : clamp((value - min) / (max - min));
}
export function similarity(preference: Preference, value: number, [min, max]: readonly [number, number]): number | null {
  if (preference.state === 'UNKNOWN') return null;
  const distance = max === min ? Number(value !== preference.target) : clamp(Math.abs(preference.target - value) / (max - min));
  return preference.state === 'LIKE' ? 1 - distance : distance;
}
