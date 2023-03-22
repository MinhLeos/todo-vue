import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './routes/router'
import todoLengthPlugin from './plugins/todo-plugin.js'

const app = createApp(App)

app.use(todoLengthPlugin)
app.use(router)

app.mount('#app')
