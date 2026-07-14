import { Link } from 'react-router-dom'
import styles from './Logo.module.css'

export function Logo() {
  return (
    <Link to="/" className={styles.logo} aria-label="onz 홈으로 이동">
      <img src="/logo/onz-logo.png" alt="onz" />
    </Link>
  )
}
