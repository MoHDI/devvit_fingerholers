import { defineConfig } from 'vite';

export default defineConfig({
  root: 'phaser',
  base: '', // Use relative paths
  // publicDir: 'phaser/public/',
  server: {
    port: 3000
  },
  build: {
    copyPublicDir: true, 
    outDir: '../webroot/', // devvit webview
  // emptyOutDir: true, 
  
    // sourcemap: true
    // assetsDir: 'assets', // Prevent Vite from creating an "assets" subfolder
    rollupOptions: {
      output: {
      //   manualChunks: {
      //     phaser: ['phaser'],
      // },
        entryFileNames: 'main.js', // Single output JS file
        assetFileNames: '[name].[ext]', // Keep original file names
      },
    },
    
  }

});