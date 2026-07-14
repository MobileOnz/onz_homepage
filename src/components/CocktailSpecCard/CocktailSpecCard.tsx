import type { CocktailSpec } from '../../types/article'
import { getCocktailImageUrl } from '../../data/images'
import styles from './CocktailSpecCard.module.css'

interface CocktailSpecCardProps {
  spec: CocktailSpec
}

export function CocktailSpecCard({ spec }: CocktailSpecCardProps) {
  return (
    <div className={styles.spec}>
      <div className={styles.top}>
        <img src={getCocktailImageUrl(spec.imageKey)} alt={spec.nameKo} />
        <div>
          <div className={styles.name}>{spec.nameKo}</div>
          <div className={styles.nameEn}>{spec.nameEn}</div>
        </div>
      </div>
      <div className={styles.grid}>
        <div>
          <div className={styles.key}>베이스</div>
          <div className={styles.value}>{spec.base}</div>
        </div>
        <div>
          <div className={styles.key}>도수</div>
          <div className={styles.value}>{spec.abv}</div>
        </div>
        <div>
          <div className={styles.key}>스타일</div>
          <div className={styles.value}>{spec.style}</div>
        </div>
        <div>
          <div className={styles.key}>키 리큐어</div>
          <div className={styles.value}>{spec.keyLiqueur}</div>
        </div>
      </div>
    </div>
  )
}
