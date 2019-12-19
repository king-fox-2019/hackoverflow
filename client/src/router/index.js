import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: 'register' */ '../views/Register.vue')
  }
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from ,next) => {
  switch (to.name) {
    case 'login':
    case 'register':
      if (localStorage.getItem('token')) next({ path: '/' })
      else next()
      break

    default:
      next()
  }
})

export default router;
