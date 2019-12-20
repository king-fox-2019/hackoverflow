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
    component: () =>
      import(/* webpackChunkName: 'register' */ '../views/Register.vue'),
  },
  {
    path: '/question/:questionId',
    name: 'question',
    component: () =>
      import(/* webpackChunkName: 'question' */ '../views/Question.vue'),
  },
  {
    path: '/addQuestion',
    name: 'addQuestion',
    component: () =>
      import(/* webpackChunkName: 'add-question'*/ '../views/QuestionForm.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  switch (to.name) {
    case 'login':
    case 'register':
      if (localStorage.getItem('token')) next({path: '/'});
      else next();
      break;

    case 'addQuestion':
      if (localStorage.getItem('token')) next();
      else next({path: '/login'});

    default:
      next();
  }
});

export default router;
