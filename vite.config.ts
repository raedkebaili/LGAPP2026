import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API = 'http://127.0.0.1:8787'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // le preview Arena est servi derrière https://{port}-{sandbox}.e2b.app
    allowedHosts: true,
    cors: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
  build: { outDir: 'dist', chunkSizeWarningLimit: 1200 },
})
