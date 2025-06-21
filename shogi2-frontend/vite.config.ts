import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    host:"0.0.0.0",
    port: 5173,
    strictPort: true,
    cors: true,
    proxy: {
      '/room': {
        target: 'http://localhost:3000',
        ws: true,
      },
    },
  },
  plugins: [react()],
})
