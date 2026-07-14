import { ArticleTile } from '../ArticleTile/ArticleTile'
import type { HomeSection } from '../../types/article'
import styles from './ContentRow.module.css'

export function ContentRow({ id, title, subtitle, moreHref, items }: HomeSection) {
  return (
    <section className={styles.strip} id={id}>
      <div className={styles.head}>
        <div>
          <h2>{title}</h2>
          <div className={styles.subtitle}>{subtitle}</div>
        </div>
        <a className={styles.more} href={moreHref}>
          전체 보기 →
        </a>
      </div>
      <div className={styles.row}>
        {items.map((item, index) => (
          <ArticleTile key={`${item.title}-${index}`} article={item} className={styles.rowTile} />
        ))}
      </div>
    </section>
  )
}
