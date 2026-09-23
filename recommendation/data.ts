import data from './data/cocktails.json' with { type: 'json' };
import type { Cocktail } from './types.ts';
export const cocktails: readonly Cocktail[] = data;
