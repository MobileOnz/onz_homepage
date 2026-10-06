import { articles, getArticleBySlug } from './data/articles'
import { getCocktailImageUrl } from './data/images'

export const BASE_URL = 'https://onz-homepage.vercel.app'

export interface SeoData {
  title: string
  description: string
  image: string
  url: string
}

export function getSeoData(path: string): SeoData {
  const normalized = path !== '/' ? path.replace(/\/$/, '') : path
  if (normalized === '/recommend') return {
    title: 'ONZ · 나를 위한 한 잔',
    description: '여섯 가지 취향을 골라 나에게 어울리는 칵테일을 찾아보세요.',
    image: `${BASE_URL}/logo/onz-logo.png`,
    url: `${BASE_URL}/recommend/`,
  }

  const article = normalized.startsWith('/article/')
    ? getArticleBySlug(decodeURIComponent(normalized.slice('/article/'.length)))
    : undefined
  if (article) return {
    title: `${article.title} | Onz 매거진`,
    description: article.dek,
    image: getCocktailImageUrl(article.imageKey),
    url: `${BASE_URL}/article/${article.slug}`,
  }

  return {
    title: 'onz 매거진 — 마시기 전에 읽는 칵테일',
    description: '칵테일의 이야기와 취향에 맞는 한 잔을 쉽고 재미있게 알아보세요.',
    image: getCocktailImageUrl(articles[0].imageKey),
    url: `${BASE_URL}/`,
  }
}

export function getArticleJsonLd(path: string): Record<string, unknown> | undefined {
  const normalized = path.replace(/\/$/, '')
  if (!normalized.startsWith('/article/')) return undefined
  const article = getArticleBySlug(decodeURIComponent(normalized.slice('/article/'.length)))
  if (!article) return undefined
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.dek,
    image: getCocktailImageUrl(article.imageKey),
    ...(article.datePublished ? { datePublished: article.datePublished } : {}),
    ...(article.dateModified ? { dateModified: article.dateModified } : {}),
    author: { '@type': 'Organization', name: 'Onz' },
    publisher: { '@type': 'Organization', name: 'Onz' },
  }
}
