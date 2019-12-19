import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/add',
    name: 'addQuestion',
    component: () => import(/* webpackChunkName: "addQuestion" */ '../views/AddQuestion.vue')
  },
  {
    path: '/',
    name: 'mainpage',
    component: () => import(/* webpackChunkName: "mainpage" */ '@/views/MainPage.vue'),
    children: [
      {
        path: ':form',
        name: 'form',
        component: () => import(/* webpackChunkName: "mainpage" */ '../components/Form.vue')
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
