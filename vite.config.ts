import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/kuo-anime/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: { open: true },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'react-vendor', test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: 'supabase', test: /[\\/]node_modules[\\/]@supabase[\\/]/ },
            { name: 'hls', test: /[\\/]node_modules[\\/]hls\.js[\\/]/ },
            { name: 'query', test: /[\\/]node_modules[\\/]@tanstack[\\/]/ },
          ],
        },
      },
    },
  },
}))