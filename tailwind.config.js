/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false // 禁用全局样式重置，以避免样式冲突。开启此选项会取消基础样式的引入。本项目仅使用工具类样式和组件类样式，故而禁用全局样式重置。
  },
  prefix: '',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // tailwind CSS 生效路劲
  theme: {
    extend: {
      colors: {
        primary: '#409EFF'
      }
    }
  },
  plugins: []
}
