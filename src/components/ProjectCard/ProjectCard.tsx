import { useRef, type PointerEvent } from 'react'
import type { Project } from '../../data/work'
import styles from './ProjectCard.module.css'

type ProjectCardProps = {
  project: Project
}

const MAX_TILT = 6           // degrees the card leans toward the mouse

function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)

  // tilt the card toward the mouse and move the glare with it.
  // The CSS reads --rx / --ry (tilt) and --gx / --gy (glare position).
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const card = cardRef.current
    if (!card || event.pointerType !== 'mouse') return

    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width    // 0 left → 1 right
    const y = (event.clientY - rect.top) / rect.height    // 0 top → 1 bottom

    card.style.setProperty('--ry', `${(x - 0.5) * 2 * MAX_TILT}deg`)
    card.style.setProperty('--rx', `${(0.5 - y) * 2 * MAX_TILT}deg`)
    card.style.setProperty('--gx', `${x * 100}%`)
    card.style.setProperty('--gy', `${y * 100}%`)
  }

  const onPointerLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
  }

  return (
    <article
      ref={cardRef}
      className={styles.card}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className={styles.glare} aria-hidden="true" />

      <span className={styles.emoji} aria-hidden="true">{project.emoji}</span>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description}>{project.description}</p>

      <ul className={styles.tech} aria-label="Technologies used">
        {project.tech.map((name) => (
          <li key={name} className={styles.tag}>{name}</li>
        ))}
      </ul>

      {project.link && (
        <a
          className={styles.link}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          View project <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  )
}

export default ProjectCard
