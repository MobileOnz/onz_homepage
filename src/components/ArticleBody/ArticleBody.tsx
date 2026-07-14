import type { ContentBlock } from '../../types/article'
import { Quote } from '../Quote/Quote'
import { CocktailSpecCard } from '../CocktailSpecCard/CocktailSpecCard'
import styles from './ArticleBody.module.css'

interface ArticleBodyProps {
  blocks: ContentBlock[]
}

/** 아티클 본문을 타입별 블록 배열로 받아 렌더링합니다(추후 CMS 콘텐츠로 교체하기 쉬운 구조). */
export function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className={styles.body}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={index}>{block.text}</p>
          case 'heading':
            return <h2 key={index}>{block.text}</h2>
          case 'quote':
            return <Quote key={index} text={block.text} cite={block.cite} />
          case 'spec':
            return <CocktailSpecCard key={index} spec={block.spec} />
          default:
            return null
        }
      })}
    </div>
  )
}
