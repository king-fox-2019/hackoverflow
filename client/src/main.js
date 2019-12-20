import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import vueDebounce from 'vue-debounce';
import wysiwyg from 'vue-wysiwyg';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(vueDebounce, {
  listenTo: ['input', 'keyup'],
});
Vue.use(wysiwyg, {});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
