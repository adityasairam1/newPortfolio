import Reveal from '../Reveal/Reveal'
import styles from './Contact.module.css'

function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <Reveal>
        <h2 id="contact-title" className={styles.title}>Contact</h2>
      </Reveal>
    </section>
  )
}

export default Contact
