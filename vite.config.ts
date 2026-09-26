import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// Fonts are otherwise discovered only after the JS has rendered the headline. Preloading the two
// Latin files the first slide needs lets them download in parallel with the bundle.
function preloadCriticalFonts(): Plugin {
  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        return Object.keys(ctx.bundle ?? {})
          .filter((file) => /(zen-maru-gothic-latin-700|inter-latin-wght)-normal-[\w-]+\.woff2$/.test(file))
          .map((file) => ({
            tag: 'link',
            attrs: { rel: 'preload', href: `/${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
            injectTo: 'head' as const,
          }))
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), imagetools(), preloadCriticalFonts()],
})
