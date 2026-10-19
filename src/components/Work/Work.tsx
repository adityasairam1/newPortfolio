import { sections } from '../../data/sections'
import Reveal from '../Reveal/Reveal'
import styles from './Work.module.css'

const { id, label } = sections.work

function Work() {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal>
        <h2 id={`${id}-title`} className={styles.title}>{label}</h2>
      </Reveal>
    </section>
  )
}

export default Work
