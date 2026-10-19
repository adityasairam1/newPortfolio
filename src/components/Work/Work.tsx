import { sections } from '../../data/sections'
import { projects } from '../../data/work'
import ProjectCard from '../ProjectCard/ProjectCard'
import Reveal from '../Reveal/Reveal'
import styles from './Work.module.css'

const { id, label } = sections.work

function Work() {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal>
        <h2 id={`${id}-title`} className={styles.title}>{label}</h2>
      </Reveal>

      <ul className={styles.grid}>
        {projects.map((project, index) => (
          <li key={project.title} className={styles.item}>
            {/* cards in the same row pop in one after another */}
            <Reveal delay={(index % 2) * 120}>
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Work
