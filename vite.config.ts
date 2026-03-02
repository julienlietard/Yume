import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // Workaround: accès direct à index.css
      'ju-library/index.css': resolve(__dirname, './node_modules/ju-library/dist/index.css'),
    },
  },
});