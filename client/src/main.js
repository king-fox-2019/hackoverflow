import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import VueCookies from 'vue-cookies'

Vue.use(VueCookies);
Vue.use(SuiVue);
Vue.config.productionTip = false;

// 7 day after, cookies expire time
Vue.$cookies.config('7d');

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
