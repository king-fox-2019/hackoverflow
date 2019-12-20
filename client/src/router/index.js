import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import defaultProduct from '../views/default.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/questions',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Questions" */ '../views/Questions.vue'),
    children: [
      {
        path: '',
        name: 'question',
        component: defaultProduct,
      },
      {
        path: ':id',
        name: 'detail',
        component: () => import(/* webpackChunkName: "detail" */ '../views/detail.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
  },
  {
    path: '/ask',
    name: 'ask',
    component: () => import(/* webpackChunkName: "ask" */ '../views/postQuestions.vue'),
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import(/* webpackChunkName: "edit" */ '../views/editQuestion.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
