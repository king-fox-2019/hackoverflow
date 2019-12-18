import Vue from 'vue'
import Vuex from 'vuex'
import server from './api/server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    onSession: null,
    email: ''
  },
  mutations: {
    SET_SESSION(state, session) {
      state.onSession = session
    },
    SET_EMAIL(state, email) {
      state.email = email
    }
  },
  actions: {
    onSignUp({ commit }, payload) {
      return server.post('signup', payload).then(response => {
        localStorage.setItem('access_token', response.data.data.access_token)
        commit('SET_SESSION', true)
        commit('SET_EMAIL', response.data.data.email)
        return response
      })
    },
    onSignIn({ commit }, payload) {
      return server.post('signin', payload).then(response => {
        localStorage.setItem('access_token', response.data.data.access_token)
        commit('SET_SESSION', true)
        commit('SET_EMAIL', response.data.data.email)
        return response
      })
    },
    checkSession({ commit }, access_token) {
      return server
        .get('/user/checksession', { headers: { access_token } })
        .then(response => {
          commit('SET_SESSION', true)
          commit('SET_EMAIL', response.data.data.email)
          return response
        })
        .catch(response => {
          commit('SET_SESSION', false)
          commit('SET_EMAIL', '')
          return response
        })
    }
  },
  modules: {}
})
