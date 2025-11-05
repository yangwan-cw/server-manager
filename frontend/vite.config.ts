import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  // Load standard .env files
  const env = loadEnv(mode, process.cwd(), ['VITE_'])
  
  // Load .env.version file manually
  try {
    const versionEnvPath = resolve(process.cwd(), '.env.version')
    const versionEnvContent = readFileSync(versionEnvPath, 'utf-8')
    versionEnvContent.split('\n').forEach(line => {
      const match = line.match(/^(VITE_\w+)=(.*)$/)
      if (match) {
        env[match[1]] = match[2]
      }
    })
  } catch (e) {
    console.warn('Could not load .env.version file')
  }
  
  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true,
      allowedHosts: ['.gitpod.dev', '.gitpod.io'],
    },
    envPrefix: 'VITE_',
    define: {
      'import.meta.env.VITE_GIT_HASH': JSON.stringify(env.VITE_GIT_HASH || 'N/A'),
      'import.meta.env.VITE_COMMIT_DATE': JSON.stringify(env.VITE_COMMIT_DATE || 'N/A'),
      'import.meta.env.VITE_COMMIT_AUTHOR': JSON.stringify(env.VITE_COMMIT_AUTHOR || 'N/A'),
      'import.meta.env.VITE_VERSION': JSON.stringify(env.VITE_VERSION || 'N/A'),
    },
  }
})
