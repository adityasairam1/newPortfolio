// Cloudflare Worker: the site's server side, used by the "Ask my AI" chat.
// The website itself is served by Cloudflare as static files (see wrangler.jsonc);
// only requests to /api/* reach this code.

import { handleChat } from './chat.js'
import type { Env } from './lib/env.js'

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)

    if (pathname === '/api/chat') {
      if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } })
      }
      return handleChat(request, env)
    }

    return new Response('Not found', { status: 404 })
  },
} satisfies ExportedHandler<Env>
