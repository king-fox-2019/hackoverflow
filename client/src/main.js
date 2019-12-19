import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import axios from 'axios'
import App from './App.vue'
import store from './store'
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue'

Vue.use(CKEditor)
Vue.use(Vuetify)

Vue.prototype.axios = axios.create({
  baseURL: `http://localhost:3000`
})

export default axios.create({
  baseURL: `http://localhost:3000`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
