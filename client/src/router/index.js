import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

function guard (to, from, next) {
  if (store.state.isLoggedIn) {
    next()
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import(/* webpackChunkName: "tags" */ '../views/Tag.vue')
  },
  {
    path: '/watched',
    name: 'watched',
    component: () => import(/* webpackChunkName: "watched" */ '../views/Watched.vue'),
    beforeEnter: guard
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import(/* webpackChunkName: "forgot-password" */ '../views/ForgotPassword.vue')
  },
  {
    path: '/reset/:token',
    name: 'reset-password',
    component: () => import(/* webpackChunkName: "reset-password" */ '../views/ResetPassword.vue')
  },
  {
    path: '/questions/editor',
    name: 'questionsEditor',
    component: () => import(/* webpackChunkName: "questionsEditor" */ '../views/QuestionEditor.vue'),
    beforeEnter: guard
  },
  {
    path: '/questions/:id',
    name: 'questions',
    component: () => import(/* webpackChunkName: "questions" */ '../views/Question.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
