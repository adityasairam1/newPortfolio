import { useEffect, useRef, useState, type FormEvent } from 'react'
import { assistant } from '../../data/assistant'
import { useChat } from './useChat'
import styles from './AskAI.module.css'

const PANEL_ID = 'ask-ai-panel'
const TITLE_ID = 'ask-ai-title'

function AskAI() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, isStreaming, send, reset } = useChat(assistant.endpoint, assistant.errorMessage)

  const inputRef = useRef<HTMLInputElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const logRef = useRef<HTMLDivElement>(null)

  // focus the text box when the panel opens
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // keep the newest message in view while the reply streams in
  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [messages])

  // closes the panel and returns focus to the launcher button
  const close = () => {
    setOpen(false)
    launcherRef.current?.focus()
  }

  // Escape closes the panel
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  // clears the conversation and gets ready for a new question
  const startOver = () => {
    reset()
    setInput('')
    inputRef.current?.focus()
  }

  const ask = (question: string) => {
    if (!question.trim() || isStreaming) return
    send(question)
    setInput('')
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    ask(input)
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className={`${styles.launcher} ${open ? styles.launcherHidden : ''}`}
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={PANEL_ID}
      >
        <span className={styles.spark} aria-hidden="true">✦</span>
        {assistant.buttonLabel}
      </button>

      <section
        id={PANEL_ID}
        className={`${styles.panel} ${open ? styles.open : ''}`}
        role="dialog"
        aria-labelledby={TITLE_ID}
        inert={!open}
      >
        <header className={styles.header}>
          <div>
            <h2 id={TITLE_ID} className={styles.title}>
              <span className={styles.spark} aria-hidden="true">✦</span> {assistant.title}
            </h2>
            <p className={styles.subtitle}>{assistant.subtitle}</p>
          </div>
          <div className={styles.actions}>
            {/* only once there's a conversation to clear */}
            {messages.length > 0 && (
              <button type="button" className={styles.reset} onClick={startOver}>
                <span aria-hidden="true">↺</span> {assistant.resetLabel}
              </button>
            )}
            <button type="button" className={styles.close} onClick={close} aria-label="Close chat">
              ✕
            </button>
          </div>
        </header>

        <div ref={logRef} className={styles.log} role="log" aria-live="polite">
          <p className={`${styles.message} ${styles.assistant}`}>{assistant.greeting}</p>

          {messages.map((message, index) => (
            <p key={index} className={`${styles.message} ${styles[message.role]}`}>
              {message.content || (
                <span className={styles.typing} role="status" aria-label="Typing">
                  <span />
                  <span />
                  <span />
                </span>
              )}
            </p>
          ))}

          {/* starter questions, until the visitor asks their first one */}
          {messages.length === 0 && (
            <div className={styles.suggestions}>
              {assistant.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className={styles.chip}
                  onClick={() => ask(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <input
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={assistant.placeholder}
            maxLength={assistant.maxMessageLength}
            aria-label="Your question"
            autoComplete="off"
          />
          <button
            type="submit"
            className={styles.send}
            disabled={isStreaming || !input.trim()}
            aria-label="Send"
          >
            ↑
          </button>
        </form>

        <p className={styles.disclaimer}>{assistant.disclaimer}</p>
      </section>
    </>
  )
}

export default AskAI
