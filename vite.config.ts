import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/mtweather': {
          target: 'https://mtweather.nifos.go.kr',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/mtweather/, '/famous/mountainOne')
        }
      }
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts']
    }
  };
});
