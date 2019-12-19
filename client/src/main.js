import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PortalVue from 'portal-vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import wysiwyg from "vue-wysiwyg";


Vue.use(wysiwyg, {});
Vue.use(BootstrapVue)
Vue.use(PortalVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
