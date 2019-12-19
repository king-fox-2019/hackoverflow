import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../main'
import router from '../router'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(Vuex)
Vue.use(VueSweetalert2)

export default new Vuex.Store({
  state: {
    userId: localStorage.getItem('id'),
    userTags: [],
    isLogin: false,
    listQuestions: [],
    myQuestionsList: [],
    oneQuestionDetails: '',
    answersOnThisQuestion: []
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = true
      localStorage.setItem('id', payload._id)
      localStorage.setItem('email', payload.email)
      localStorage.setItem('token', payload.token)
      router.push('/dashboard')
    },
    SET_LOGOUT (state) {
      state.isLogin = false
      localStorage.clear()
      router.push('/')
    },
    SET_LOGIN_TRUE (state) {
      state.isLogin = true
    },
    SET_QUESTIONSLIST (state, questions) {
      state.listQuestions = questions
    },
    SET_MYQUESTIONSLIST (state, questions) {
      state.myQuestionsList = questions
    },
    SET_QUESTIONDETAILS (state, details) {
      state.oneQuestionDetails = details
    },
    SET_ANSWERSLIST (state, details) {
      state.answersOnThisQuestion = details
    }
  },
  actions: {
    login (context, payload) {
      let email = payload.email
      let password = payload.password

      console.log('email ', email)
      console.log('password ', password)
      axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email, password
        }
      })
        .then(({ data }) => {
          console.log('data ', data)
          context.commit('SET_LOGIN', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getQuestions ({ commit }) {
      console.log('ini gQ store')
      axios({
        method: 'GET',
        url: '/question',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_QUESTIONSLIST', data)
        })
        .catch(err => {
          console.log(err, 'err di get ALL question')
        })
    },
    getMyQuestions ({ commit }) {
      console.log(localStorage.getItem('id'), '????')

      axios({
        method: 'GET',
        url: `/questions/user/${localStorage.getItem('id')}`
      })
        .then(({ data }) => {
          commit('SET_MYQUESTIONSLIST', data)
        })
        .catch(err => {
          console.log(err, 'err di get MY question')
        })
    },
    getDetailsOnThisQuestion ({ commit, dispatch }, id) {
      console.log(id, 'dari storeee')

      axios({
        method: 'GET',
        url: `/questions/${id}`
      })
        .then(({ data }) => {
          commit('SET_QUESTIONDETAILS', data)
        })
        .catch(err => {
          console.log(err.response, 'apa erooor?????')
        })
    },
    getListAnswersOnThisQuestion ({ commit, dispatch }, id) {
      axios({
        method: 'GET',
        url: `/answers/question/${id}`
      })
        .then(({ data }) => {
          commit('SET_ANSWERSLIST', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
})
