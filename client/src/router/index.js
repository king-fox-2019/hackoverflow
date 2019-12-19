import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import toast from '../mixins/toast'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "about" */ '../components/FormSignin')
  },
  {
    path: '/join',
    name: 'join',
    component: () => import(/* webpackChunkName: "about" */ '../components/FormJoin')
  },
  {
    path: '/ask',
    name: 'ask',
    component: () => import(/* webpackChunkName: "about" */ '../components/FormWYSIWYG')
  },
  {
    path: '/questions/:id',
    name: 'question-item',
    component: () => import(/* webpackChunkName: "about" */ '../components/QuestionItem')
  },
  {
    path: '/questions/:id/update',
    name: 'question-update',
    component: () => import(/* webpackChunkName: "about" */ '../components/FormWYSIWYGUpdateQ'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
