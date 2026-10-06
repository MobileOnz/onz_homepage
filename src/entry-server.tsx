import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { articles, homeSections } from './data/articles'
import { BASE_URL, getArticleJsonLd, getSeoData } from './seo'

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]!)

export const prerenderRoutes = [
  { path: '/', expected: [homeSections[0].title] },
  ...articles.map((article) => ({
    path: `/article/${article.slug}`,
    expected: [article.title, article.content.find((block) => block.type === 'heading')?.text ?? article.dek],
  })),
]
export const sitemapPaths = [...prerenderRoutes.map(({ path }) => path), '/recommend/']
export { BASE_URL }

export function render(path: string) {
  return renderToString(<StaticRouter location={path}><App /></StaticRouter>)
}

export function renderHead(path: string) {
  const seo = getSeoData(path)
  const tags = [
    `<title data-page-seo>${escapeHtml(seo.title)}</title>`,
    `<meta data-page-seo name="description" content="${escapeHtml(seo.description)}">`,
    `<meta data-page-seo property="og:title" content="${escapeHtml(seo.title)}">`,
    `<meta data-page-seo property="og:description" content="${escapeHtml(seo.description)}">`,
    `<meta data-page-seo property="og:image" content="${escapeHtml(seo.image)}">`,
    `<meta data-page-seo property="og:url" content="${escapeHtml(seo.url)}">`,
    '<meta data-page-seo name="twitter:card" content="summary_large_image">',
    `<meta data-page-seo name="twitter:title" content="${escapeHtml(seo.title)}">`,
    `<meta data-page-seo name="twitter:description" content="${escapeHtml(seo.description)}">`,
    `<meta data-page-seo name="twitter:image" content="${escapeHtml(seo.image)}">`,
    `<link data-page-seo rel="canonical" href="${escapeHtml(seo.url)}">`,
  ]
  const jsonLd = getArticleJsonLd(path)
  if (jsonLd) tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`)
  return tags.join('\n    ')
}
