import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cloudflare Pages는 정적 자산을 배포하고, /functions 아래가 BFF로 동작
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 }
})
