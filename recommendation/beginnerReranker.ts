import { BEGINNER_WEIGHTS } from './config.ts';
import { normalize } from './similarity.ts';
import type { Ranges } from './similarity.ts';
import type { Cocktail } from './types.ts';
export function beginnerFit(cocktail: Cocktail, adventure: number, ranges: Ranges): number {
  const openness = (adventure - 1) / 4;
  const n = (key: keyof typeof BEGINNER_WEIGHTS) => normalize(cocktail.features[key], ranges[key]);
  // Openness relaxes penalties toward neutral/full credit, never rewards difficulty over taste.
  return BEGINNER_WEIGHTS.approachability * n('approachability')
    + BEGINNER_WEIGHTS.familiarity * (openness + (1 - openness) * n('familiarity'))
    + BEGINNER_WEIGHTS.complexity * (1 - (1 - openness) * n('complexity'))
    + BEGINNER_WEIGHTS.polarizing * (1 - (1 - openness) * n('polarizing'));
}
