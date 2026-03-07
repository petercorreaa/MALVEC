import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// ── Dev-server middleware: rewrite /services/<slug> → /services/<slug>.html
// so clean URLs work in development (no .html extension needed).
// On Netlify / Vercel, enable cleanUrls to achieve the same in production.
const servicePageRewrite = {
  name: 'service-page-rewrite' as const,
  configureServer(server: import('vite').ViteDevServer) {
    server.middlewares.use((req, _res, next) => {
      if (
        req.url &&
        /^\/services\/[^./?#]+$/.test(req.url)
      ) {
        req.url = req.url + '.html'
      }
      next()
    })
  },
}

const root = process.cwd()

export default defineConfig({
  plugins: [
    react(),
    servicePageRewrite,
  ],
  build: {
    rollupOptions: {
      input: {
        // Home page (existing)
        main: resolve(root, 'index.html'),
        // Service detail pages
        webExperience:  resolve(root, 'services/web-experience.html'),
        brandIdentity:  resolve(root, 'services/brand-identity.html'),
        ecommerce:      resolve(root, 'services/ecommerce.html'),
        marketing:      resolve(root, 'services/marketing.html'),
        content:        resolve(root, 'services/content.html'),
      },
    },
  },
})
