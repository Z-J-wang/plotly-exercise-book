import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './css/main.css'
import App from './App.vue'
import router from './router'
import LenisVue from 'lenis/vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(LenisVue)
app.mount('#app')
