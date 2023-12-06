import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import pinia from './stores'
import createI18n from './utils/createI18n'
import { setUrlParamsStorage } from './utils'

import './assets/style/base.scss'

setUrlParamsStorage()

const app = createApp(App)

app.use(pinia).use(router).use(createI18n)

app.mount('#app')

console.log(import.meta.env)
