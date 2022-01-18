import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios'
import api from './service/api.js'
Vue.prototype.axios = axios
Vue.prototype.$api = api
const app = createApp(App)

app.use(axios)
   .use(api)
   .mount('#app')

