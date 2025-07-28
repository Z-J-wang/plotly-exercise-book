import { createRouter, createWebHistory } from 'vue-router'
import { h, resolveComponent } from 'vue'
import HomeView from '../views/HomeView.vue'

const RouterView = resolveComponent('RouterView')

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
      component: () => h(RouterView),
      children: [
        {
          path: 'options/',
          name: 'Options',
          component: () => import('../views/OptionsView.vue')
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
      component: () => h(RouterView),
      children: [...exampleRoutes]
    }
  ]
})

export default router
