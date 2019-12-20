import Vue from 'vue'
import VueRouter from 'vue-router'
import Question from '@/views/question.vue'
import userQuestion from '@/views/userQuestion.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'question',
    component: Question
  },
  {
    path: '/user-question',
    name: 'user-question',
    component: userQuestion
  },
  {
    path: '/question/:id',
    name: 'detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "detail" */ '../views/detail.vue')
  },
  {
    path: '/tag/:tag',
    name: 'tag',
    component: () => import(/* webpackChunkName: "tag" */ '../views/tag.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
