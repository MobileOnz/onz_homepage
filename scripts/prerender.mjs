import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const serverOutput = resolve(root, 'dist-ssr/entry-server.js')
const { BASE_URL, prerenderRoutes, sitemapPaths, render, renderHead } = await import(pathToFileURL(serverOutput))
const template = await readFile(resolve(dist, 'index.html'), 'utf8')
const seoBlock = /<!--seo:start-->[\s\S]*?<!--seo:end-->/

for (const { path, expected } of prerenderRoutes) {
  const output = path === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${path}/index.html`)
  const html = template
    .replace(seoBlock, renderHead(path))
    .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`)
  if (!expected.every((text) => html.includes(text))) throw new Error(`${path}: pre-rendered content missing`)
  if (!html.includes('rel="canonical"') || !html.includes('property="og:title"')) throw new Error(`${path}: SEO metadata missing`)
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}

const recommendFile = resolve(dist, 'recommend/index.html')
const recommendHtml = await readFile(recommendFile, 'utf8')
if (!recommendHtml.includes('<h1>오늘은 어떤 맛이 끌리세요?</h1>')) throw new Error('/recommend/: static content missing')
const recommendWithSeo = recommendHtml.replace(seoBlock, renderHead('/recommend/'))
if (!recommendWithSeo.includes('rel="canonical"') || !recommendWithSeo.includes('property="og:title"')) throw new Error('/recommend/: SEO metadata missing')
await writeFile(recommendFile, recommendWithSeo)
const urls = sitemapPaths.map((path) => `  <url><loc>${BASE_URL}${path}</loc></url>`).join('\n')
await writeFile(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await writeFile(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`)
await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true })
