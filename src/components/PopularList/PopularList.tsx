import type { PopularItem } from '../../types/article'
import styles from './PopularList.module.css'

interface PopularListProps {
  items: PopularItem[]
}

export function PopularList({ items }: PopularListProps) {
  return (
    <section className={styles.popular}>
      <div className={styles.wrap}>
        <div className={styles.head}>지금 인기 있는 글</div>
        <div className={styles.subtitle}>이번 주 가장 많이 읽힌 이야기</div>
        <div className={styles.grid}>
          {items.map((item) => (
            <div className={styles.item} key={item.rank}>
              <span className={styles.num}>{item.rank}</span>
              <div>
                <h4>{item.title}</h4>
                <div className={styles.category}>{item.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
