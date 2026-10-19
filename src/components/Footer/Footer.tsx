import { site } from '../../data/site'
import styles from './Footer.module.css'

const { owner, madeWith, symbol, symbolLabel, extra } = site.footer

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {year} {owner} · {madeWith}{' '}
        <span className={styles.heart} role="img" aria-label={symbolLabel}>{symbol}</span>{' '}
        {extra}
      </p>
    </footer>
  )
}

export default Footer
