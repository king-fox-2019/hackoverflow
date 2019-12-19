import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Loading from 'vue-loading-overlay'
import Toasted from 'vue-toasted'

import 'vue-loading-overlay/dist/vue-loading.css'
import '@/assets/scss/main.scss'

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import {
  faCaretUp,
  faCaretDown,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCaretUp, faCaretDown, faTrashAlt)
dom.watch()

Vue.component('font-awesome-icon', FontAwesomeIcon)

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
      if (to.matched.some(record => record.meta.requiresAuth)) next('/')
      else next()
    })
    .finally(() => loader.hide())
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
