import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import BtnMore from '@/components/UI/BtnMore.vue'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('BtnMore', BtnMore)

app.mount('#app')
