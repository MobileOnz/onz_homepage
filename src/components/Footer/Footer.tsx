import { Link } from 'react-router-dom'
import { Logo } from '../Logo/Logo'
import styles from './Footer.module.css'

const LINKS = [
  { hash: '#story', label: '스토리' },
  { hash: '#mood', label: '무드' },
  { hash: '#base', label: '베이스' },
  { hash: '#app', label: '앱' },
]

interface FooterProps {
  /** 홈 화면 전용 소개 문구. 넘기지 않으면 로고 + 링크만 노출됩니다. */
  description?: string
}

export function Footer({ description }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <Logo />
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.links}>
          {LINKS.map((link) => (
            <Link key={link.hash} to={{ pathname: '/', hash: link.hash }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <p className={styles.copy}>© onz. All rights reserved.</p>
    </footer>
  )
}
