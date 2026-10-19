import Reveal from '../Reveal/Reveal'
import styles from './About.module.css'

function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <Reveal>
        <h2 id="about-title" className={styles.title}>About Me</h2>
      </Reveal>
    </section>
  )
}

export default About
