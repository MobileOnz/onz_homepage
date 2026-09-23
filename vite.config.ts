import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import handler from './server/handler.mjs'
import recommendations from './server/recommendations.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  return {
    plugins: [react(), {
      name: 'recommendation-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url?.startsWith('/api/')) return next()
          if (new URL(req.url, 'http://localhost').pathname === '/api/recommendations') recommendations(req, res)
          else void handler(req, res, env)
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url?.startsWith('/api/')) return next()
          if (new URL(req.url, 'http://localhost').pathname === '/api/recommendations') recommendations(req, res)
          else void handler(req, res, env)
        })
      },
    }],
    build: {
      rolldownOptions: {
        input: {
          homepage: fileURLToPath(new URL('./index.html', import.meta.url)),
          recommendation: fileURLToPath(new URL('./recommend/index.html', import.meta.url)),
        },
      },
    },
  }
})
