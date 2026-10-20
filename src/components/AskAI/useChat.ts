import { useCallback, useRef, useState } from 'react'

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

// Sends the conversation to the API and fills in the reply as it streams back.
// The conversation lives here, so closing the chat panel keeps it; only reset() clears it.
export function useChat(endpoint: string, errorMessage: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const busy = useRef(false)
  const activeRequest = useRef<AbortController | null>(null)

  const send = useCallback(
    async (text: string) => {
      const question = text.trim()
      if (!question || busy.current) return
      busy.current = true
      setIsStreaming(true)

      const request = new AbortController()
      activeRequest.current = request

      const history: ChatMessage[] = [...messages, { role: 'user', content: question }]
      // empty assistant message = "typing…" until the first words arrive
      setMessages([...history, { role: 'assistant', content: '' }])

      const appendToReply = (chunk: string) => {
        if (request.signal.aborted) return  // chat was reset mid-reply
        setMessages((previous) => {
          const next = previous.slice()
          const last = next[next.length - 1]
          next[next.length - 1] = { ...last, content: last.content + chunk }
          return next
        })
      }

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
          signal: request.signal,
        })

        if (!response.ok || !response.body) {
          appendToReply((await response.text().catch(() => '')) || errorMessage)
          return
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          appendToReply(decoder.decode(value, { stream: true }))
        }
      } catch {
        appendToReply(errorMessage)  // ignored if the chat was reset
      } finally {
        if (activeRequest.current === request) {
          activeRequest.current = null
          busy.current = false
          setIsStreaming(false)
        }
      }
    },
    [endpoint, errorMessage, messages],
  )

  // start a new conversation: stop any reply in progress and clear the messages
  const reset = useCallback(() => {
    activeRequest.current?.abort()
    activeRequest.current = null
    busy.current = false
    setIsStreaming(false)
    setMessages([])
  }, [])

  return { messages, isStreaming, send, reset }
}
