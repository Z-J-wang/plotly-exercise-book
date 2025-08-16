import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * 因为在使用 CommonJS 输出格式时，import.meta 不可用.
 * 故改为 process.env.VITE_BASE
 */
const base = process.env.VITE_BASE || '/'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: '/plotly-exercise-book/',
  base: base,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      dal: fileURLToPath(new URL('./dal', import.meta.url)),
      bll: fileURLToPath(new URL('./bll', import.meta.url)),
      entities: fileURLToPath(new URL('./entities', import.meta.url)),
      api: fileURLToPath(new URL('./api', import.meta.url))
    }
  },
  // devServer 配置
  server: {
    open: true, // 自动打开浏览器
    proxy: {} // 代理
  }
})
