import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load .env.version file
  const env = loadEnv(mode, process.cwd(), ['VITE_'])
  
  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true,
    },
    envPrefix: 'VITE_',
  }
})
