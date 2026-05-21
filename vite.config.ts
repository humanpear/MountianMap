import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const dataGoKrServiceKey = env.DATA_GO_KR_SERVICE_KEY;

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/forest-culture': {
          target: 'http://api.forest.go.kr/openapi/service/cultureInfoService',
          changeOrigin: true,
          rewrite: (path) => {
            const [pathname, query = ''] = path.replace(/^\/api\/forest-culture/, '').split('?');
            const params = new URLSearchParams(query);

            if (dataGoKrServiceKey) {
              params.set('serviceKey', dataGoKrServiceKey);
            }

            return `${pathname}?${params.toString()}`;
          }
        },
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
