import { cloudflare } from '@cloudflare/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The Cloudflare plugin runs the Worker in worker/ alongside the site during
// `npm run dev` (in Cloudflare's real runtime), and builds both for deployment.
// https://developers.cloudflare.com/workers/vite-plugin/
export default defineConfig({
  plugins: [react(), cloudflare({ viteEnvironment: { name: 'worker' } })],
  environments: {
    worker: { build: { sourcemap: true } },
  },
})
