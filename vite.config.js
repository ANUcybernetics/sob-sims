import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';

const simulations = readdirSync('.', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name.includes('-'))
  .reduce((acc, dirent) => {
    acc[dirent.name] = resolve(__dirname, dirent.name, 'index.html');
    return acc;
  }, {});

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...simulations
      }
    }
  }
});