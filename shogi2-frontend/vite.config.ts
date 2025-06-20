import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/room': {
        target: 'http://localhost:3000',
        ws: true, // ← WebSocket対応！
      },
    },
  },
  plugins: [react()]
})
