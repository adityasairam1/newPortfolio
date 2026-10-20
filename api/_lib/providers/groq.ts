// Groq (https://console.groq.com) — needs the GROQ_API_KEY environment variable.

import Groq from 'groq-sdk'
import { assistant } from '../../../src/data/assistant.js'
import type { ChatTurn } from './types.js'

let client: Groq | undefined

export async function* streamReply(system: string, messages: ChatTurn[]): AsyncGenerator<string> {
  client ??= new Groq()  // reads GROQ_API_KEY

  const stream = await client.chat.completions.create({
    model: assistant.models.groq,
    max_completion_tokens: assistant.maxTokens,
    temperature: 0.5,      // a little variety, but stays factual
    reasoning_effort: assistant.effort,  // short thinking = fast replies
    include_reasoning: false,            // send visitors only the final answer
    stream: true,
    messages: [{ role: 'system', content: system }, ...messages],
  })

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content
    if (text) yield text
  }
}

export function describeError(error: unknown): string {
  if (error instanceof Groq.AuthenticationError) return 'Invalid or missing GROQ_API_KEY'
  if (error instanceof Groq.RateLimitError) return 'Rate limited by the Groq API'
  if (error instanceof Groq.APIError) return `Groq API error ${error.status}: ${error.message}`
  return error instanceof Error ? error.message : String(error)
}
