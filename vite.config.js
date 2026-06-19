import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Use relative paths for assets so that the built application runs correctly 
  // on subfolders like GitHub Pages (https://<username>.github.io/<repository-name>/)
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        checklist: resolve(__dirname, 'checklist.html'),
        popup: resolve(__dirname, 'popup.html'),
        settings: resolve(__dirname, 'settings.html'),
      }
    }
  }
});

