import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  output: 'static',
  // slug-first 名前空間: ツールを runlocally.app/markdown-viewer/ 配下に「物理配置」する
  // （src/pages/markdown-viewer/ + public/markdown-viewer/）。base は使わない（base は URL に
  // prefix を付けるが dist を入れ子化せず、ルート配信の Pages と不整合になるため）。
  // バンドルアセットも /markdown-viewer/_assets/ に隔離し hub/他ツールと無衝突にする。
  build: {
    inlineStylesheets: 'auto',
    assets: 'markdown-viewer/_assets',
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['preact', 'preact/hooks'],
            // Markdown parsing (markdown-it, MIT) and HTML sanitization (DOMPurify,
            // Apache-2.0) are only needed once a file is opened; keep them in their
            // own chunk so they stay off the initial page-load path.
            'markdown-engine': ['markdown-it', 'dompurify']
          }
        }
      }
    }
  },
  compressHTML: true,
  scopedStyleStrategy: 'class'
});
