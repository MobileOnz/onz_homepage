import { Link, useParams } from 'react-router-dom'
import { Nav } from '../../components/Nav/Nav'
import { Footer } from '../../components/Footer/Footer'
import { AppCTA } from '../../components/AppCTA/AppCTA'
import { ReadingProgressBar } from '../../components/ReadingProgressBar/ReadingProgressBar'
import { ArticleBody } from '../../components/ArticleBody/ArticleBody'
import { ArticleTile } from '../../components/ArticleTile/ArticleTile'
import { getArticleBySlug, relatedArticles } from '../../data/articles'
import { getCocktailImageUrl } from '../../data/images'
import styles from './ArticlePage.module.css'

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) {
    return (
      <>
        <Nav variant="article" />
        <div className={styles.notFound}>
          <p>글을 찾을 수 없어요.</p>
          <Link to="/">매거진으로 돌아가기</Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <ReadingProgressBar />
      <Nav variant="article" />

      <article>
        <div className={styles.head}>
          <div className={styles.category}>{article.category}</div>
          <h1>{article.title}</h1>
          <p className={styles.dek}>{article.dek}</p>
          <div className={styles.meta}>
            <span>{article.author}</span>
            <span className={styles.dot} />
            <span>{article.meta}</span>
          </div>
        </div>

        <div className={styles.hero}>
          <img src={getCocktailImageUrl(article.imageKey)} alt={article.title} />
          <div className={styles.caption}>{article.heroCaption}</div>
        </div>

        <ArticleBody blocks={article.content} />

        <div className={styles.signature}>
          <div className={styles.signatureLine}>
            <div className={styles.badge}>o</div>
            <div>
              <div className={styles.who}>{article.author}</div>
              <div className={styles.role}>마시기 전에 읽는 칵테일</div>
            </div>
          </div>
        </div>
      </article>

      <AppCTA
        variant="prominent"
        title="읽었다면, 이제 마셔볼 차례"
        description="취향으로 칵테일을 골라주는 앱 onz에서 두 잔 다 찾아볼 수 있어요."
      />

      <section className={styles.related}>
        <h2>이어서 읽어보세요</h2>
        <div className={styles.relatedGrid}>
          {relatedArticles.map((item, index) => (
            <ArticleTile key={`${item.title}-${index}`} article={item} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
