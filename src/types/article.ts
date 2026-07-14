import type { ImageKey } from '../data/images'

export interface CocktailSpec {
  nameKo: string
  nameEn: string
  imageKey: ImageKey
  base: string
  abv: string
  style: string
  keyLiqueur: string
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; cite: string }
  | { type: 'spec'; spec: CocktailSpec }

export interface ArticleSummary {
  slug?: string
  category: string
  title: string
  meta: string
  imageKey: ImageKey
}

export interface Article extends ArticleSummary {
  slug: string
  dek: string
  author: string
  heroCaption: string
  content: ContentBlock[]
}

export interface HomeSection {
  id: string
  title: string
  subtitle: string
  moreHref: string
  items: ArticleSummary[]
}

export interface PopularItem {
  rank: number
  title: string
  category: string
}
