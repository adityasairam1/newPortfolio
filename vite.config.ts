import type { IncomingMessage } from 'node:http'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

// Runs the API in api/ during `npm run dev`, so the chat works locally.
// On Vercel the same file runs as a real serverless function instead.
function localApi(): Plugin {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }

        try {
          const { POST } = (await server.ssrLoadModule('/api/chat.ts')) as typeof import('./api/chat.ts')

          const request = new Request('http://localhost/api/chat', {
            method: 'POST',
            headers: {
              'content-type': req.headers['content-type'] ?? 'application/json',
              'x-forwarded-for': req.socket.remoteAddress ?? 'local',
            },
            body: await readBody(req),
          })

          const response = await POST(request)
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))

          // pass the streamed reply through chunk by chunk
          if (response.body) {
            const reader = response.body.getReader()
            for (;;) {
              const { done, value } = await reader.read()
              if (done) break
              res.write(value)
            }
          }
          res.end()
        } catch (error) {
          console.error('[local-api]', error)
          res.statusCode = 500
          res.end('Local API error — check the terminal.')
        }
      })
    },
  }
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // make the AI keys from .env.local available to the local API.
  // Always overwrite, so editing .env.local takes effect on Vite's automatic restart.
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of ['GROQ_API_KEY', 'ANTHROPIC_API_KEY']) {
    if (env[key]) process.env[key] = env[key]
    else delete process.env[key]
  }

  return {
    plugins: [react(), localApi()],
  }
})
