import { useEffect, useState } from 'react'
import { navLinks } from '../../data/sections'
import styles from './SideNav.module.css'

function SideNav() {
  const [active, setActive] = useState(navLinks[0].id)

  // highlight the link of whichever section crosses the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )

    navLinks.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className={styles.nav} aria-label="Sections">
      <ul className={styles.list}>
        {navLinks.map(({ id, label }, index) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`${styles.link} ${active === id ? styles.active : ''}`}
              aria-current={active === id ? 'true' : undefined}
              aria-label={label}
            >
              <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
              {/* two stacked copies of the label: hover rolls the second one up */}
              <span className={styles.label}>
                <span className={styles.labelInner} data-text={label}>
                  {label}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SideNav
