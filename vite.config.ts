import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => ({
  base: mode === 'prod'
    ? "/Game.Level.Management.Portal/"
    : "/",
  plugins: [
    vue(),
    vueDevTools(),
  ],
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
}))