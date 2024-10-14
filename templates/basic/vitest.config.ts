import { defineConfig, UserConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()] as UserConfig['plugins'],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@/app': path.resolve(__dirname, './app'),
      '@/app/_components': path.resolve(__dirname, './components'),
      '@/sanity': path.resolve(__dirname, './sanity'),
      '@/styles': path.resolve(__dirname, './styles'),
      '@/types': path.resolve(__dirname, './types'),
    },
  },
})
