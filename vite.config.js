import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative paths for assets so that the built application runs correctly 
  // on subfolders like GitHub Pages (https://<username>.github.io/<repository-name>/)
  base: './',
  build: {
    outDir: 'dist'
  }
});
