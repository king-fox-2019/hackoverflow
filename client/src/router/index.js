import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Authscreen from  '../views/Authscreen'
import QuestionDetail from '../views/QuestionDetail'
import CreateQuestion from '../views/CreateQuestion'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Authscreen
  },
  {
    path: '/login',
    name: 'login',
    component: Authscreen
  },
  {
    path: '/question/:questionId',
    name: 'questionDetail',
    component: QuestionDetail
  },
  {
    path: '/ask',
    name: 'CreateQuestion',
    component: CreateQuestion
  },
  // {
  //   path: '/answer',
  //   name:
  // },
  {
    path: '/',
    name: 'home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
