import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 8080,
    allowedHosts: [
      'innovative-creation-production.up.railway.app'
      // Si luego tienes un dominio propio, agrégalo aquí también.
    ]
  }
});
