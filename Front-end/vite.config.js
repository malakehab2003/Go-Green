import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  host: '192.168.31.22',
  plugins: [react()],
})
