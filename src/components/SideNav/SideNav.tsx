import { useEffect, useState } from 'react'
import styles from './SideNav.module.css'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'work', label: 'My Work' },
  { id: 'contact', label: 'Contact' },
]

function SideNav() {
  const [active, setActive] = useState('home')

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

    links.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className={styles.nav} aria-label="Sections">
      <ul className={styles.list}>
        {links.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`${styles.link} ${active === id ? styles.active : ''}`}
              aria-current={active === id ? 'true' : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SideNav
