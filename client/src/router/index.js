import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to,from,next) => {
      if(!localStorage.getItem('token')){
        next('/login')
      }else{
        next()
      }
    }
  },
  {
    path: '/tags',
    name: 'tags',
    
    // route level code-splitting
    // this generates a separate chunk (tags.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tags" */ '../views/Tags.vue')
  },
  {
    path: '/users',
    name: 'users',
    // route level code-splitting
    // this generates a separate chunk (users.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue')
  },
  {
    path: '/ask',
    name: 'ask',
    // route level code-splitting
    // this generates a separate chunk (ask.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ask" */ '../views/Ask.vue')
  },
  {
    path: '/questions/:id',
    name: 'questions',
    // route level code-splitting
    // this generates a separate chunk (question.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "question" */ '../views/Question.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (question.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "question" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
