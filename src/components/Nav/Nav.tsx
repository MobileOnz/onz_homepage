import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Logo } from '../Logo/Logo'
import styles from './Nav.module.css'

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('onz-theme', next) } catch { /* Theme still applies for this page. */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#0d0812' : '#ffffff')
    setTheme(next)
  }

  return (
    <button
      className={styles.themeToggle}
      type="button"
      onClick={toggle}
      aria-label={`${theme === 'dark' ? '라이트' : '다크'} 모드로 전환`}
      title={`${theme === 'dark' ? '라이트' : '다크'} 모드로 전환`}
    >
      {theme === 'dark' ? '라이트' : '다크'}
    </button>
  )
}

const CATEGORIES = [
  { href: '#story', label: '스토리' },
  { href: '#mood', label: '무드' },
  { href: '#base', label: '베이스' },
  { href: '#season', label: '계절' },
]

interface NavProps {
  /** home: 카테고리 메뉴 전체 노출 / article: 매거진으로 돌아가기 링크만 노출 */
  variant: 'home' | 'article'
}

export function Nav({ variant }: NavProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Logo />

        {variant === 'home' && (
          <>
            <div className={styles.categories}>
              {CATEGORIES.map((cat) => (
                <a key={cat.href} href={cat.href}>
                  {cat.label}
                </a>
              ))}
            </div>
            <div className={styles.right}>
              <a className={styles.appLink} href="/recommend/">맞춤추천</a>
              <svg className={styles.search} viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
              <a className={styles.appLink} href="#app">앱</a>
              <ThemeToggle />
            </div>
          </>
        )}

        {variant === 'article' && (
          <Link className={styles.back} to="/">
          ← 매거진
          </Link>
        )}
        {variant === 'article' && <ThemeToggle />}
      </div>
    </nav>
  )
}
