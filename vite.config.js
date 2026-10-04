import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* Pipeline real de Vite. Sin pipeline paralelo.
   - base:'./' para que el build funcione servido desde cualquier ruta
   - server.host true + allowedHosts para el preview del sandbox */
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    // el preview del sandbox sirve la app bajo un host proxeado (*.e2b.app)
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
    // conserva los -webkit-* del sistema cromado (R3 del informe de riesgos)
    cssMinify: 'esbuild',
  },
  css: {
    devSourcemap: true,
  },
});
