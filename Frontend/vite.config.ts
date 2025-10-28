import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite(),
  ],
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      '.ngrok-free.app'
    ],
  }
})

