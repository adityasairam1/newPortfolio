import styles from './Footer.module.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {year} Aditya Sairam · Made with{' '}
        <span className={styles.heart} role="img" aria-label="love">♥</span>{' '}
        and lots of tea
      </p>
    </footer>
  )
}

export default Footer
