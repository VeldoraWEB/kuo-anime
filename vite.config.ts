import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import fs from 'node:fs' 

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/kuo-anime/' : '/',
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'spa-404-hack',
      closeBundle() {
        const indexPath = path.resolve(import.meta.dirname, 'dist/index.html')
        const notFoundPath = path.resolve(import.meta.dirname, 'dist/404.html')
        
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath)
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: { open: true },
}))