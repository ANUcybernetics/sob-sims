import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteSingleFile } from 'vite-plugin-singlefile';

const simulation = process.env.SIMULATION || '1d-1d';

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    rollupOptions: {
      input: resolve(__dirname, simulation, 'index.html')
    },
    outDir: 'dist-single'
  }
});