import { createRouter, createWebHistory } from 'vue-router'

const files = import.meta.glob('../views/**/*.vue')
const routes = Object.entries(files).map(([key, value]) => {
  const name = key.replace(/^.*[\\\/]/, '').replace(/\.vue$/, '')
  return {
    path: `/${
      name === 'HomeView'
        ? ''
        : name
            .replace(/View$/, '') // 删除View
            .replace(/^[A-Z]/, (match) => match.toLowerCase()) // 首字母小写
            .replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`) // 驼峰转连字符
    }`,
    name: name,
    component: value
  }
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
