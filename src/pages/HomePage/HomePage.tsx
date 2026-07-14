import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Nav } from '../../components/Nav/Nav'
import { Footer } from '../../components/Footer/Footer'
import { AppCTA } from '../../components/AppCTA/AppCTA'
import { ContentRow } from '../../components/ContentRow/ContentRow'
import { PopularList } from '../../components/PopularList/PopularList'
import { homeSections, popularItems, articles } from '../../data/articles'
import { getCocktailImageUrl } from '../../data/images'
import styles from './HomePage.module.css'

const featured = articles[0]

export function HomePage() {
  const location = useLocation()

  // 다른 페이지(Footer 등)에서 /#story 같은 해시 링크로 들어왔을 때 해당 섹션으로 스크롤합니다.
  useEffect(() => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  return (
    <>
      <Nav variant="home" />

      <header className={styles.cover}>
        <div className={styles.coverInner}>
          <div className={styles.coverText}>
            <div className={styles.coverLabel}>
              오늘의 이야기 · <b>스토리</b>
            </div>
            <h1>
              전쟁이 이름을 준
              <br />
              위스키 클래식 두 잔
            </h1>
            <p className={styles.dek}>{featured.dek}</p>
            <div className={styles.coverFoot}>
              <Link className={styles.coverRead} to={`/article/${featured.slug}`}>
                읽어보기
              </Link>
              <span className={styles.coverMeta}>{featured.meta}</span>
            </div>
          </div>
          <div className={styles.coverImage}>
            <img src={getCocktailImageUrl(featured.imageKey)} alt={featured.title} />
          </div>
        </div>
      </header>

      {homeSections.map((section) => (
        <ContentRow key={section.id} {...section} />
      ))}

      <PopularList items={popularItems} />

      <AppCTA
        variant="quiet"
        title="읽었다면, 이제 마셔볼 차례"
        description="취향으로 칵테일을 골라주는 앱 onz. 오늘 무엇을 마실지 더는 고민하지 않아도 돼요."
      />

      <Footer description="마시기 전에 읽는 칵테일. 취향으로 고르는 칵테일 추천 & 가이드 앱 onz의 매거진." />
    </>
  )
}
