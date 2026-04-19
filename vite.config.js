import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // bind to all interfaces so topazfabric.uap.infosys.com resolves
    port: 5173,
    allowedHosts: ['topazfabric.uap.infosys.com'],
    proxy: {
      // Route triage API calls to the Python FastAPI bridge
      '/api/triage': {
        target: 'http://localhost:8042',
        changeOrigin: true,
      },
    },
  },
})
