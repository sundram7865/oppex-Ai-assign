import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Requirement 5: Setup the browser-like environment for React tests
    environment: 'jsdom', 
    globals: true,
    setupFiles: './src/test/setup.js', // We will create this next
  },
})
