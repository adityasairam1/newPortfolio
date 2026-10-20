// Claude (https://platform.claude.com) — needs the ANTHROPIC_API_KEY secret.

import Anthropic from '@anthropic-ai/sdk'
import { assistant } from '../../../src/data/assistant.js'
import type { Env } from '../env.js'
import type { ChatTurn } from './types.js'

let client: Anthropic | undefined

export async function* streamReply(system: string, messages: ChatTurn[], env: Env): AsyncGenerator<string> {
  if (!env.ANTHROPIC_API_KEY) throw new Error('Missing ANTHROPIC_API_KEY')
  client ??= new Anthropic({ apiKey: env.ANTHROPIC_API_KEY })

  const reply = client.beta.messages.stream({
    model: assistant.models.anthropic,
    max_tokens: assistant.maxTokens,
    output_config: { effort: assistant.effort },
    // if a safety check declines a (likely harmless) question,
    // Anthropic retries it on a recommended fallback model instead of failing
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    // the profile never changes between requests, so cache it
    system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
    messages,
  })

  for await (const event of reply) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      yield event.delta.text
    }
  }

  const final = await reply.finalMessage()
  if (final.stop_reason === 'refusal') yield assistant.refusalMessage
}

export function describeError(error: unknown): string {
  if (error instanceof Anthropic.AuthenticationError) return 'Invalid ANTHROPIC_API_KEY'
  if (error instanceof Anthropic.RateLimitError) return 'Rate limited by the Claude API'
  if (error instanceof Anthropic.APIError) return `Claude API error ${error.status}: ${error.message}`
  return error instanceof Error ? error.message : String(error)
}
