import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../configs/axios'
import createPersistedState from 'vuex-persistedstate'
import toast from '../mixins/toast'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: {},
    questions: [],
    question: {}
  },
  mutations: {
    TOGGLE_LOGIN_STATUS (state, payload) {
      state.isLoggedIn = payload
    },
    FETCH_QUESTIONS (state, payload) {
      state.questions = payload
    },
    FETCH_A_QUESTION (state, payload) {
      state.question = payload
    },
    FILL_USER (state, payload) {
      state.user = payload
    }
  },
  actions: {
    checkToken ({ commit }) {
      if (localStorage.getItem('access_token')) {
        commit('TOGGLE_LOGIN_STATUS', true)
      } else {
        commit('TOGGLE_LOGIN_STATUS', false)
      }
    },

    fetchQuestions ({ commit }, payload) {
      let url = '/questions'
      if (payload && payload.q) url += '/search?q=' + payload.q
     
      axios({
        method: 'get', url
      })
        .then(({ data }) => {
          commit('FETCH_QUESTIONS', data.questions)
        })
        .catch(err => {
          const errMessages = err.response.data.messages;
          if (errMessages) {
            this.danger(errMessages[0])
          } else {
            this.danger("Couldn't connect to server.");
          }
        })
    },

    fetchAQuestion ({ commit }, payload) {
      axios({
        method: 'get',
        url: '/questions/' + payload.id
      })
        .then(({ data }) => {
          commit('FETCH_A_QUESTION', data.question)
        })
        .catch(err => {
          const errMessages = err.response.data.messages;
          if (errMessages) {
            this.danger(errMessages[0])
          } else {
            this.danger("Couldn't connect to server.");
          }
        })
    },

    fetchCurrentUser ({ commit }, payload) {
      axios({
        method: 'get',
        url: '/users/user',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          commit('FILL_USER', data.user)
        })
        .catch(err => {
          const errMessages = err.response.data.messages;
          if (errMessages) {
            this.danger(errMessages[0])
          } else {
            this.danger("Couldn't connect to server.");
          }
        })
    }
  },

  modules: {
  },

  plugins: [createPersistedState()],

  mixins: [toast]
})
