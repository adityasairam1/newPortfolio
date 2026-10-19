import { Fragment, useEffect, useRef, type CSSProperties } from 'react'
import { sections } from '../../data/sections'
import { site } from '../../data/site'
import styles from './Hero.module.css'

const { greeting, photo } = site.hero

function Hero() {
  const rootRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  // scroll progress over the first screen: 0 at the top, 1 after one screen.
  // The CSS reads it as --scroll to blur the photo and fade the name away.
  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const progress = Math.min(window.scrollY / window.innerHeight, 1)
      rootRef.current?.style.setProperty('--scroll', progress.toString())
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // spotlight: a soft light that eases toward the mouse.
  // The CSS reads its position as --mx / --my.
  useEffect(() => {
    const backdrop = backdropRef.current
    if (!backdrop) return

    const target = { x: window.innerWidth * 0.55, y: window.innerHeight * 0.4 }
    const current = { ...target }
    let frame = 0

    const apply = () => {
      backdrop.style.setProperty('--mx', `${current.x}px`)
      backdrop.style.setProperty('--my', `${current.y}px`)
    }

    const tick = () => {
      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08
      apply()
      const settled =
        Math.abs(target.x - current.x) < 0.5 && Math.abs(target.y - current.y) < 0.5
      frame = settled ? 0 : requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY
      if (!frame) frame = requestAnimationFrame(tick)
    }

    apply()
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  // split the name into letters so each one can animate in turn
  let letterIndex = 0

  return (
    <div ref={rootRef} className={styles.root}>
      <div ref={backdropRef} className={styles.backdrop}>
        <div className={styles.photoWrap}>
          <img
            className={styles.photo}
            src={photo.src}
            alt={photo.alt}
          />
        </div>
        <div className={styles.spotlight} />
        <div className={styles.grain} />
      </div>

      <section id={sections.home.id} className={styles.hero}>
        <h1 className={styles.title} aria-label={greeting}>
          {greeting.split(' ').map((word, w) => (
            <Fragment key={w}>
              {w > 0 && ' '}
              <span className={styles.word} aria-hidden="true">
                {word.split('').map((letter, l) => (
                  <span
                    key={l}
                    className={styles.letter}
                    style={{ '--i': letterIndex++ } as CSSProperties}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </h1>
      </section>
    </div>
  )
}

export default Hero
