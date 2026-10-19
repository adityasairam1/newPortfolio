import { contact } from '../../data/contact'
import { sections } from '../../data/sections'
import Reveal from '../Reveal/Reveal'
import styles from './Contact.module.css'

const { id, label } = sections.contact

function Contact() {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal>
        <h2 id={`${id}-title`} className={styles.title}>{label}</h2>
      </Reveal>

      <ul className={styles.list}>
        {contact.map((item, index) => (
          <li key={item.label}>
            <Reveal delay={index * 100}>
              <a
                className={styles.link}
                href={item.href}
                {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>
                  {item.value}
                  <span className={styles.arrow} aria-hidden="true">↗</span>
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Contact
