import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Loading from 'vue-loading-overlay'
import Toasted from 'vue-toasted'

import 'vue-loading-overlay/dist/vue-loading.css'
import '@/assets/scss/main.scss'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Loading, {
  color: '#7871aa'
})
Vue.use(Toasted, {
  position: 'bottom-center',
  duration: 3000,
  theme: 'bubble',
  className: 'mx-auto',
  type: 'success'
})

router.beforeEach((to, from, next) => {
  const loader = Vue.$loading.show()
  store
    .dispatch('checkSession', localStorage.getItem('access_token'))
    .then(() => {
      if (!store.state.onSession) throw ''
      if (to.matched.some(record => record.meta.guest)) next('/')
      else next()
    })
    .catch(() => {
      next()
    })
    .finally(() => loader.hide())
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
