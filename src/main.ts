import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createSSRApp } from 'vue'

import App from './App.vue'
import './main.css'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()

  // 持久化状态
  pinia.use(piniaPluginPersistedstate)

  // 使用 pinia
  app.use(pinia)

  return {
    app
  }
}
