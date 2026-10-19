import { about } from '../../data/about'
import { sections } from '../../data/sections'
import Reveal from '../Reveal/Reveal'
import styles from './About.module.css'

const { id, label } = sections.about

function About() {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal>
        <h2 id={`${id}-title`} className={styles.title}>{label}</h2>
      </Reveal>

      <div className={styles.content}>
        <Reveal delay={100}>
          <p className={styles.intro}>{about.intro}</p>
        </Reveal>

        {about.paragraphs.map((text, index) => (
          <Reveal key={index} delay={150}>
            <p className={styles.paragraph}>{text}</p>
          </Reveal>
        ))}

        <Reveal delay={150}>
          <p className={styles.closing}>{about.closing}</p>
        </Reveal>
      </div>
    </section>
  )
}

export default About
