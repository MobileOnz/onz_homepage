import { Link } from 'react-router-dom'
import type { ArticleSummary } from '../../types/article'
import { getCocktailImageUrl } from '../../data/images'
import styles from './ArticleTile.module.css'

interface ArticleTileProps {
  article: ArticleSummary
  className?: string
}

/** 상세 페이지가 있는(slug 보유) 카드만 링크로, 없으면 비활성 카드로 렌더링합니다. */
export function ArticleTile({ article, className }: ArticleTileProps) {
  const content = (
    <>
      <img className={styles.image} src={getCocktailImageUrl(article.imageKey)} alt={article.title} />
      <div className={styles.category}>{article.category}</div>
      <h3 className={styles.title}>{article.title}</h3>
      <div className={styles.meta}>{article.meta}</div>
    </>
  )

  const combinedClassName = className ? `${styles.tile} ${className}` : styles.tile

  if (article.slug) {
    return (
      <Link className={combinedClassName} to={`/article/${article.slug}`}>
        {content}
      </Link>
    )
  }

  return (
    <div className={combinedClassName} aria-disabled="true">
      {content}
    </div>
  )
}
