import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import GSignInButton from 'vue-google-signin-button'
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: `179640782565-mdjej11jj9j61s5hrqnj1qjcsti699i7.apps.googleusercontent.com`,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
