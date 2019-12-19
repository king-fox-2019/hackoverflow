import Vue from 'vue'
import Vuex from 'vuex'
import { ToastProgrammatic as Toast } from 'buefy'
import router from '../router'
import axios from '../helpers/axios'
import alert from '../helpers/alert'
// import cron from 'node-cron'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loggedUser: {},
    isLoading: false,
    // errMessages: '',
    question: {
      title: '',
      description: '',
      upVotes: [],
      downVotes: [],
      answers: [],
      user: {
        email: ''
      }
    },
    questions: [],
    userQuestions: [],
    userAnswers: [],
    tags: []
  },
  mutations: {
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_LOGGED_USER (state, payload) {
      state.loggedUser = payload
    },
    SET_IS_LOADING (state, payload) {
      state.isLoading = payload
    },
    SET_QUESTION (state, payload) {
      state.question = payload
    },
    SET_QUESTIONS (state, payload) {
      state.questions = payload
    },
    SET_USER_QUESTIONS (state, payload) {
      state.userQuestions = payload
    },
    SET_USER_ANSWERS (state, payload) {
      state.userAnswers = payload
    },
    SET_TAGS (state, payload) {
      state.tags = payload
    }
  },
  actions: {
    register ({ commit }, payload) {
      commit('SET_IS_LOADING', true)
      axios.post('users/register', payload)
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          commit('SET_IS_LOGIN', true)
          const userId = data.user._id
          const { username, email } = data
          commit('SET_LOGGED_USER', { userId, username, email })
          localStorage.setItem('userId', data.user.id)
          localStorage.setItem('username', data.user.username)
          localStorage.setItem('email', data.user.email)
          localStorage.setItem('token', data.token)
          router.push('/')
        })
        .catch(err => {
          console.log(err.response.data.message.join('<br>'), 'joinmnnnnnn')
          let str = ''
          for (let i = 0; i < err.response.data.message.length; i++) {
            str += err.response.data.message[i] + '<br>'
            console.log(str, '<<<<<<<<')
          }
          Toast.open(str)
        })
    },
    login ({ commit }, payload) {
      commit('SET_IS_LOADING', true)
      axios.post('users/login', payload)
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          const userId = data.id
          const { email } = data
          commit('SET_LOGGED_USER', { userId, email })
          localStorage.setItem('userId', data.id)
          localStorage.setItem('email', data.email)
          localStorage.setItem('token', data.token)
          commit('SET_IS_LOGIN', true)
          router.push('/')
        })
        .catch(alert)
    },
    logout ({ commit }) {
      commit('SET_LOGGED_USER', {})
      commit('SET_IS_LOGIN', false)
      localStorage.clear()
      router.push('/')
    },
    getQuestions ({ commit, dispatch }, payload) {
      let query = ''
      if (payload) {
        query = `?tag=${payload}`
      }
      commit('SET_IS_LOADING', true)
      axios.get(`/questions${query}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          commit('SET_QUESTIONS', data)
        })
        .catch(alert)
    },
    getQuestion ({ commit, dispatch }, payload) {
      commit('SET_IS_LOADING', true)
      axios.get(`questions/${payload}`)
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          commit('SET_QUESTION', data)
        })
        .catch(alert)
    },
    createQuestion ({ dispatch, commit }, payload) {
      console.log(payload, 'bawa body ga siiiiiiiiiiiiiiiiiii')
      commit('SET_IS_LOADING', true)
      axios.post('/questions', payload, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          dispatch('getQuestions')
          router.push('/home/questions')
        })
        .catch(alert)
    },
    updateQuestion ({ dispatch, commit }, payload) {
      commit('SET_IS_LOADING', true)
      axios.patch(`/questions/${payload.id}`, payload, { // id question
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          dispatch('getQuestions')
          dispatch('getUserQuestions')
          router.push(`/questions/${payload.id}`)
        })
        .catch(alert)
    },
    removeQuestion ({dispatch, commit}, payload) {
      axios.delete(`/questions/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('getUserQuestions')
          dispatch('getQuestions')
          router.push('/users')
        })
        .catch(alert)
    },
    removeAnswer ({ dispatch, commit}, payload) {
      axios.delete(`/answers/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('getUserAnswers')
          dispatch('getAnswers')
          router.push('/users')
        })
        .catch(alert)
    },
    createAnswer ({ dispatch, commit }, payload) {
      console.log('masuk post answer')
      commit('SET_IS_LOADING', true)
      axios.post('/answers', payload, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('then dong???????????')
          commit('SET_IS_LOADING', false)
          dispatch('getQuestion', payload.questionId)
          dispatch('getQuestions')
        })
        .catch(alert)
    },
    updateAnswer ({ dispatch, commit }, payload) {
      commit('SET_IS_LOADING', true)
      axios.patch(`/answers/${payload.id}`, payload, { // id answer
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          dispatch('getQuestions')
          dispatch('getAnswers')
          router.push(`/questions/${data.question}`)
        })
        .catch(alert)
    },
    vote ({ dispatch, commit }, payload) {
      commit('SET_IS_LOADING', true)
      axios.patch(`${payload.group}/${payload.type}/${payload.id}`, null, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          dispatch('getQuestions')
          dispatch('getQuestion', payload.questionId)
        })
        .catch(alert)
    },
    getUserById({ commit }) {
      commit('SET_IS_LOADING', true)
      axios.get(`/users/specific`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data, "user by id found")
          commit('SET_IS_LOADING', false)
          commit('SET_LOGGED_USER', data)
        })
        .catch(alert)
    },
    getUserQuestions ({ commit }) {
      commit('SET_IS_LOADING', true)
      axios.get(`/questions?user=${localStorage.getItem('userId')}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          commit('SET_USER_QUESTIONS', data)
        })
        .catch(alert)
    },
    getUserAnswers ({ commit }) {
      commit('SET_IS_LOADING', true)
      axios.get(`/answers?user=${localStorage.getItem('userId')}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          commit('SET_USER_ANSWERS', data)
        })
        .catch(alert)
    },
    getTags ({ commit }, payload) {
      axios.get('/users/tag', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_TAGS', data)
        })
        .catch(alert)
    },
    createTag ({ dispatch }, payload) {
      console.log(payload, "tag dr client plis");
      
      axios.patch('/users/tag', payload, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data, "hasil axios data tags dr clinet")
          dispatch('getTags')
        })
        .catch(alert)
    },
    removeTag ({ dispatch }, payload) {
      axios.patch('/users/tag/remove', payload, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('getTags')
        })
        .catch(alert)
    }
  }
})
