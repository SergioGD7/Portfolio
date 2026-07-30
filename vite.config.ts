import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the build works on GitHub Pages, a custom domain or any subpath.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // The hero canvas is imported lazily, so three.js already lands in its own
  // chunk and never blocks first paint — no manual chunking needed.
  build: { target: 'es2022' },
})
