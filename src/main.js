import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import { securedAxiosInstance, plainAxiosInstance } from './api/'
import './main.css'

Vue.config.productionTip = false

Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

new Vue({// eslint-disable-line no-new
  el: '#app',
  router,
  securedAxiosInstance,
  plainAxiosInstance,
  components: { App },
  template: '<App/>'
})
