import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const AutoImport = (await import('unplugin-auto-import/vite')).default
  const Components = (await import('unplugin-vue-components/vite')).default
  const { ElementPlusResolver } = await import('unplugin-vue-components/resolvers')

  return {
    base: '/plotly-exercise-book/',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        dal: fileURLToPath(new URL('./dal', import.meta.url)),
        bll: fileURLToPath(new URL('./bll', import.meta.url)),
        entity: fileURLToPath(new URL('./entity', import.meta.url)),
        api: fileURLToPath(new URL('./api', import.meta.url))
      }
    },
    build: {
      minify: 'terser',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunks/[name]-[hash].js',
          chunkSizeWarningLimit: 500,
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      },
      terserOptions: {
        compress: {
          reduce_vars: true, // 优化变量使用（减少重复声明）
          drop_console: true, // 删除所有console
          drop_debugger: true // 删除所有debugger
        },
        format: {
          comments: false // 删除所有注释
        }
      }
    },
    // devServer 配置
    server: {
      open: true, // 自动打开浏览器
      proxy: {} // 代理
    }
  }
})
