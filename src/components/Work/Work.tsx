import Reveal from '../Reveal/Reveal'
import styles from './Work.module.css'

function Work() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <Reveal>
        <h2 id="work-title" className={styles.title}>My Work</h2>
      </Reveal>
    </section>
  )
}

export default Work
