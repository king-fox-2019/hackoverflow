import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('token')){
        next('/questions')
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('token')){
        next()
      } else {
        next('/')
      }
    },
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
        component: () => import(/* webpackChunkName: "question" */ '../views/Question.vue'),
        children: [
            {
              path: 'update',
              name: 'update',
              component: () => import(/* webpackChunkName: "questionupdated" */ '../components/Update.vue')
            }
        ]
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
