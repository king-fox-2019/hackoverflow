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
    path: '/questions',
    name: 'questions',
    component: () => import(/* webpackChunkName: "listquestions" */ '../views/ListQuestion.vue'),
    children: [
      {
        path: 'ask',
        name: 'ask',
        component: () => import(/* webpackChunkName: "ask" */ '../views/Ask.vue')
      }, {
        path: ':id',
        name: 'question',
        component: () => import(/* webpackChunkName: "question" */ '../views/Question.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
