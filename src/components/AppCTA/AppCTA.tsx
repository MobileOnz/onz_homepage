import styles from './AppCTA.module.css'

const APP_STORE_URL = 'https://apps.apple.com/kr/app/onz/id6744957084'
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.cocktail_front'

interface AppCTAProps {
  title: string
  description: string
  /** quiet: 홈 하단의 조용한 보조 띠 / prominent: 아티클 본문 안의 플럼 박스 */
  variant: 'quiet' | 'prominent'
}

export function AppCTA({ title, description, variant }: AppCTAProps) {
  return (
    <section className={variant === 'quiet' ? styles.quiet : styles.prominent}>
      <div className={styles.inner}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.stores}>
          <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
            <img className={styles.badge} src="/badges/app-store-badge.svg" alt="App Store에서 다운로드" />
          </a>
          <a href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer">
            <img className={styles.badge} src="/badges/google-play-badge.png" alt="Google Play에서 다운로드" />
          </a>
        </div>
      </div>
    </section>
  )
}
