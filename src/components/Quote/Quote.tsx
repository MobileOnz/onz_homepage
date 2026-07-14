import styles from './Quote.module.css'

interface QuoteProps {
  text: string
  cite: string
}

export function Quote({ text, cite }: QuoteProps) {
  return (
    <blockquote className={styles.quote}>
      <p>“{text}”</p>
      <cite>{cite}</cite>
    </blockquote>
  )
}
