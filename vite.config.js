import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    outDir: 'docs/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        'V1/form/index': resolve(__dirname, 'samples/V1/form/index.html'),
        'V1/table/index': resolve(__dirname, 'samples/V1/table/index.html'),
        'V2/form': resolve(__dirname, 'samples/V2/form.html'),
        'V2/table': resolve(__dirname, 'samples/V2/table.html'),
        'V5/form': resolve(__dirname, 'samples/v5/form.html'),
        'V6/form': resolve(__dirname, 'samples/v6/form.html')
      }
    }
  }
});
