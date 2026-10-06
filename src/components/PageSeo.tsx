import { useEffect } from 'react'
import { getSeoData } from '../seo'

export function PageSeo({ path }: { path: string }) {
  useEffect(() => {
    const seo = getSeoData(path)
    document.querySelectorAll('[data-page-seo]').forEach((node) => node.remove())
    document.title = seo.title
    document.querySelector('title')?.setAttribute('data-page-seo', '')
    const tags = [
      ['meta', { name: 'description', content: seo.description }],
      ['meta', { property: 'og:title', content: seo.title }],
      ['meta', { property: 'og:description', content: seo.description }],
      ['meta', { property: 'og:image', content: seo.image }],
      ['meta', { property: 'og:url', content: seo.url }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: seo.title }],
      ['meta', { name: 'twitter:description', content: seo.description }],
      ['meta', { name: 'twitter:image', content: seo.image }],
      ['link', { rel: 'canonical', href: seo.url }],
    ] as const
    for (const [tag, attributes] of tags) {
      const element = document.createElement(tag)
      element.setAttribute('data-page-seo', '')
      for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value)
      document.head.append(element)
    }
  }, [path])
  return null
}
