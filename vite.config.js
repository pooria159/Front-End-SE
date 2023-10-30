import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

/// <reference types="vitest" />
/// <reference types="vite/client" />

dotenv.config();

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    testMatch: ['./src/tests/**/*.test.jsx'],
    setupFiles: './src/tests/setup.js',
  },
  
})
