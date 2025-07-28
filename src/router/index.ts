import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { h } from 'vue'

const files = import.meta.glob('../views/example/**/*.vue')
const exampleRoutes = Object.entries(files).map(([key, value]) => {
  const name = key.replace(/^.*[\\\/]/, '').replace(/\.vue$/, '')
  return {
    path: `${
      name
        .replace(/View$/, '') // 删除View
        .replace(/^[A-Z]/, (match) => match.toLowerCase()) // 首字母小写
        .replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`) // 驼峰转连字符
    }/`,
    name: name,
    component: value
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/docs',
      name: 'Documents',
      component: { render: () => h(RouterView) },
      children: [
        {
          path: 'options/',
          name: 'Options',
          component: () => import('../views/options/IndexView.vue')
        },
        {
          path: 'api/',
          name: 'Api',
          component: () => import('../views/ApiView.vue')
        }
      ]
    },
    {
      path: '/examples',
      name: 'Examples',
      // 简化写法，直接使用h函数创建RouterView组件
      component: { render: () => h(RouterView) },
      children: [...exampleRoutes]
    }
  ]
})

export default router
