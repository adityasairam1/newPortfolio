// POST /api/chat — answers visitor questions with AI and streams the reply.
// Runs on the server (a Vercel function), so the API key never reaches the browser.
// The AI provider is chosen in src/data/assistant.ts; it needs that provider's
// key as an environment variable (GROQ_API_KEY or ANTHROPIC_API_KEY).

import { assistant } from '../src/data/assistant.js'
import { provider, type ChatTurn } from './_lib/providers/index.js'
import { isRateLimited } from './_lib/rateLimit.js'
import { systemPrompt } from './_lib/systemPrompt.js'

export async function POST(request: Request): Promise<Response> {
  const visitor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const { requests, windowMinutes } = assistant.rateLimit
  if (isRateLimited(visitor, requests, windowMinutes * 60_000)) {
    return text(429, assistant.rateLimitMessage)
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return text(400, 'Invalid request.')
  }

  const messages = parseMessages(body)
  if (!messages) return text(400, 'Invalid request.')

  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        // forward the answer text as it's written
        for await (const chunk of provider.streamReply(systemPrompt, messages)) {
          controller.enqueue(encoder.encode(chunk))
        }
      } catch (error) {
        console.error('[api/chat]', provider.describeError(error))
        controller.enqueue(encoder.encode(assistant.errorMessage))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

// Accepts only { messages: [{ role: 'user' | 'assistant', content: string }, …] }
// ending with a visitor question, and trims it to the configured limits.
function parseMessages(body: unknown): ChatTurn[] | null {
  if (!body || typeof body !== 'object') return null
  const raw = (body as { messages?: unknown }).messages
  if (!Array.isArray(raw)) return null

  const messages: ChatTurn[] = []
  for (const item of raw.slice(-assistant.maxHistory)) {
    if (!item || typeof item !== 'object') return null
    const { role, content } = item as { role?: unknown; content?: unknown }
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null

    const message = content.trim()
    if (!message) continue
    if (role === 'user' && message.length > assistant.maxMessageLength) return null
    messages.push({ role, content: message.slice(0, 4000) })
  }

  // the conversation must start and end with the visitor
  while (messages.length > 0 && messages[0].role !== 'user') messages.shift()
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') return null

  return messages
}

function text(status: number, message: string): Response {
  return new Response(message, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}
