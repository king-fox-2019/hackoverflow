import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomePage.vue'
import MainLandingPage from '../views/MainLandingPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/users/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/users/register',
    name: 'register',
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/questions/ask',
    name: 'ask',
    component: () => import('../views/AskQuestPage.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/users/register')
      }
    }
  },
  {
    path: '/users',
    name: 'users-profile',
    component: () => import('../views/UserPage.vue'),
    children: [
      {
        path: '/users/edit/question/:id',
        name: 'updateQuestion',
        component: () => import('../components/UpdateQuest.vue')
      },
      {
        path: '/users/edit/answer/:id',
        name: 'updateAnswer',
        component: () => import('../components/UpdateAns.vue')
      }
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/users/register')
      }
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'questions',
        name: 'questions',
        component: () => import('../views/QuestPage.vue')
      },
      {
        path: '/questions/:id',
        name: 'questionDetail',
        component: () => import('../views/QuestDetailPage.vue')
      },
      {
        path: '/questions/tag/:tag',
        name: 'questions-tag',
        component: () => import('../views/QuestPage.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'main',
    component: MainLandingPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
