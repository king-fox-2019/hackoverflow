import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../apis/server'
import Swal from 'sweetalert2'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    question: '',
    allUsersQuestions: [],
    allUsersAnswers: [],
    questionGonnaBeUpdated: null,
    answerGonnaBeUpdated: null,
    userData: {}
  },
  mutations: {
    setLogin (state, payload) {
      state.isLogin = payload
    },
    setQuestions (state, payload) {
      state.questions = payload
    },
    setQuestionData (state, payload) {
      state.question = payload
    },
    setAllUsersQuestions (state, payload) {
      state.allUsersQuestions = payload
    },
    setAllUsersAnswers (state, payload) {
      state.allUsersAnswers = payload
    },
    setQuestionGonnaBeUpdated (state, payload) {
      state.questionGonnaBeUpdated = payload
      router.push(`/main/update-question/${payload._id}`)
    },
    setAnswerGonnaBeUpdated (state, payload) {
      state.answerGonnaBeUpdated = payload
      router.push(`/main/update-answer/${payload._id}`)
    },
    setUserData (state, payload) {
      state.userData = payload
    }
  },
  actions: {
    getAllQuestions ({ commit }) {
      axios({
        url: `/questions`,
        method: 'GET'
      })
        .then(({ data }) => {
          commit('setQuestions', data)
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `${err.response.data.message}`, `error`)
        })
    },
    getQuestionDetails ({ commit }, payload) {
      axios({
        url: `/questions/${payload}`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setQuestionData', data)
          router.push(`/main/question-details/${data._id}`)
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `${err.response.data.message}`, `error`)
        })
    },
    getAllUsersQuestions ({ commit }) {
      axios({
        url: `/questions/allUsersQuestions`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setAllUsersQuestions', data)
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `${err.response.data.message}`, `error`)
        })
    },
    getAllUsersAnswers ({ commit }) {
      axios({
        url: `/answers/`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setAllUsersAnswers', data)
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `${err.response.data.message}`, `error`)
        })
    },
    fetchDataUpdateQuestion ({ commit }, questionId) {
      return new Promise(function (resolve, reject) {
        axios({
          url: `/questions/${questionId}`,
          method: 'GET'
        })
          .then(({ data }) => {
            commit('setQuestionGonnaBeUpdated', data)
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
            Swal.fire('Errors', `${err.response.data.message}`, `error`)
          })
      })
    },
    fetchDataUpdateAnswer ({ commit }, answerId) {
      return new Promise(function (resolve, reject) {
        axios({
          url: `/answers/${answerId}`,
          method: 'GET',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('setAnswerGonnaBeUpdated', data)
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
            Swal.fire('Errors', `${err.response.data.message}`, `error`)
          })
      })
    },
    fetchUserData ({ commit }) {
      axios({
        url: `/users`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data.tags)
          commit('setUserData', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getFilteredQuestions ({ commit }, payload) {
      axios({
        url: `/questions?tags=${payload}`,
        method: 'GET'
      })
        .then(({ data }) => {
          commit('setQuestions', data)
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `${err.response.data.message}`, `error`)
        })
    }
  },
  modules: {
  }
})
