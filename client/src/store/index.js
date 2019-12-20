import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    user: null
  },
  mutations: {
    LOGIN (state) {
      state.isLogin = true
    },
    LOGOUT (state) {
      state.isLogin = false
      state.user = null
      localStorage.clear()
    },
    FETCH_DATA (state, payload) {
      state.questions = payload
    },
    FETCH_USER (state, payload) {
      state.user = payload
    }
  },
  actions: {
    fetchUser (context) {
      axios({
        method: 'get',
        url: `/user`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('FETCH_USER', data)
        })
        .catch(err => {
          this.$swal.fire(
            'sumting wong',
            err.message,
            'error'
          )
        })
    },
    addAnswer (context, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'POST',
          url: `/answer`,
          data: payload,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            context.dispatch('fetchData')
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    checkLogin (context) {
      if (localStorage.getItem('token')) {
        context.dispatch('fetchUser')
        context.commit('LOGIN')
      }
    },
    addQuestion (context, payload) {
      console.log(payload)
      axios({
        method: 'POST',
        url: `/question`,
        data: {
          content: payload.question,
          title: payload.title
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchData')
        })
        .catch(err => {
          this.$swal.fire(
            'sumting wong',
            err,
            'error'
          )
        })
    },
    fetchData (context) {
      axios({
        method: 'GET',
        url: `/question`
      })
        .then(({ data }) => {
          data.sort((a, b) => (a.votes) < (b.votes))
          context.commit('FETCH_DATA', data)
        })
        .catch(err => {
          this.$swal.fire(
            'sumting wong',
            err,
            'error'
          )
        })
    },
    login (context, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'POST',
          url: `/user/login`,
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            context.dispatch('fetchUser')
            context.commit('LOGIN')
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {
  }
})
