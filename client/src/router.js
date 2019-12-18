import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)
Vue.use(store)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/session',
    name: 'session',
    component: () =>
      import(/* webpackChunkName: "session" */ '@/views/Session.vue'),
    meta: {
      guest: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   store
//     .dispatch('checkSession', localStorage.getItem('access_token'))
//     .then(() => {
//       if (!store.state.onSession) throw ''
//       if (to.matched.some(record => record.meta.guest)) next('/')
//       else next()
//     })
//     .catch(() => {
//       next()
//     })
// })

export default router
