import { useScrollProgress } from '../../hooks/useScrollProgress'
import styles from './ReadingProgressBar.module.css'

export function ReadingProgressBar() {
  const progress = useScrollProgress()
  return <div className={styles.bar} style={{ width: `${progress}%` }} />
}
