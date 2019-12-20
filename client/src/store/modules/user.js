import axios from '../../../apis/server'
import router from '../../router/index'

const namespaced = true

const state = {
   isLoggedIn: false
}

const mutations = {
   CHANGE_USER_LOGIN_STATUS(state, status) {
      state.isLoggedIn = status
   }
}

const actions = {
   checkLoggedIn({commit}) {
      if(localStorage.getItem('token') === null) {
         commit('CHANGE_USER_LOGIN_STATUS', false)
         router.push('/')
      }
      else {
         commit('CHANGE_USER_LOGIN_STATUS', true)
      }
   }
}

const getters = {}

export default {
   namespaced,
   state,
   mutations,
   actions,
   getters
}