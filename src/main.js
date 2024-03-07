import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import '@/utils/veevalidate'

axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:8090' : 'http://your.domain.com'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
