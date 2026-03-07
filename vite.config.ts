import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 4174
  },
  base: 'http://localhost:4174/',
  plugins: [
    react(),
    vanillaExtractPlugin(),
    federation({
      name: 'mfe-tasks',
      filename: 'remoteEntry.js',
      exposes: {
        './Tasks': './src/bootstrap.tsx',
      },
      shared: ['react', 'react-dom'],
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  optimizeDeps: {
    exclude: [
      '@formkit/drag-and-drop',
      '@formkit/drag-and-drop/solid'
  ],
  }
});
