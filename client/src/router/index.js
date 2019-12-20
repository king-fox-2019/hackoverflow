import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/ask',
    name: 'ask',
    component: () => import(/* webpackChunkName: "ask" */ '../views/Ask.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue'),
    children: [
      {
        path: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../components/LoginBox.vue')
      },
      {
        path: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../components/RegisterBox.vue')
      },
      {
        path: 'myquestions',
        component: () => import(/* webpackChunkName: "myquestions" */ '../components/MyQuestions.vue')
      }
    ]
  },
  {
    path: '/questions/:questionId',
    name: 'question',
    component: () => import(/* webpackChunkName: "question" */ '../views/Question.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
