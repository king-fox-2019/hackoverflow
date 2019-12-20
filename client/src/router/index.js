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
    path: '/detail/:id',
    name: 'detail',
    component: () => import(/* webpackChunkName: "showDetail" */ '../components/ShowDetail.vue'),
    children: [
      {
        path: ':answerId',
        name: 'answer',
        components: () => import(/* webpackChunkName: "editAnswer" */ '../components/ShowDetail.vue')
      }
    ]
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import(/* webpackChunkName: "edit" */ '../components/EditQuestion.vue')
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
