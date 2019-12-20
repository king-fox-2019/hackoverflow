import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Thread from '../views/Thread.vue'
import SingleThread from '../views/SingleThread.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/thread',
    name: 'thread',
    component: Thread,
    // children: [
    //   {
    //     path: '/:threadId',
    //     name: 'SingleThread',
    //     component: SingleThread
    //   }
    // ]
  },
  {
    path: '/view/:id',
    name: 'SingleThread',
    component: SingleThread
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
