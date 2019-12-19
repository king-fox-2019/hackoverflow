import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config/axios.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    unfilteredQuestions: [],
    isLoggedIn: localStorage.getItem('token'),
    success: '',
    error: '',
    userEmail: localStorage.getItem('email'),
    tags: [],
    userTags: []
  },
  mutations: {
    SET_QUESTIONS(state, payload) {
      state.questions = payload
      state.unfilteredQuestions = payload
    },
    SET_TAGS(state, payload) {
      let result = []
      payload.forEach( item => {
        for (let i = 0; i < item.tags.length; i++) {
          if (!result.includes(item.tags[i])) {
            result.push(item.tags[i])
          }
        }
      })
      state.tags = result;
    },
    SET_NEW_ANSWER(state, payload) {
      let filtered = state.questions.filter( item => {
        if (item._id == payload._id) {
          item = payload;
        }
      })
      state.questions = filtered;
    },
    SET_SUCCESS_MESSAGE(state, payload) {
      state.success = payload
      setTimeout(function(){ state.success = '' }, 3000);
    },
    SET_ERROR_MESSAGE(state, payload) {
      let errMess = payload.response.data.message
      if ( errMess == 'jwt malformed') {
        state.error = 'You have to log in first!'
      } else {
        state.error = payload.response.data.message
      }  
      setTimeout(function(){ state.error = '' }, 3000);
    },
    PUSH_NEW_QUESTION(state, payload) {
      state.questions.unshift(payload)
    },
    SET_SESSION(state, payload) {
      state.isLoggedIn = payload
    },
    SET_USER_EMAIL(state, payload) {
      state.userEmail = payload
    },
    SET_USER_TAGS(state, payload) {
      state.userTags = payload.tags
    },
    SET_QUERY(state, payload) {
      state.questions = state.unfilteredQuestions
      let filtered = state.questions.filter(item => {
        if (item.title.indexOf(payload) !== -1) {
          return item;
        }
      })
      state.questions = filtered
    }
  },
  actions: {
    fetchQuestions({ commit }) {
      axios({
        method: 'GET',
        url: '/questions'
      })
      .then(({ data }) => {
        commit('SET_QUESTIONS', data)
        commit('SET_TAGS', data)
      })
      .catch(err => {
        commit('SET_ERROR_MESSAGE', err)
      })
    },
    fetchQuestionDetail({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        let questions = state.questions;
        if (questions.length > 0) {
          let result = questions.filter( item => {
            if (item._id == payload) {
              return item;
            }
          })
          resolve(result[0])
        } else {
          axios({
            method: 'GET',
            url: `/questions/${payload}`
          })
          .then(({ data }) => {
            console.log(data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
        }
      })
    },
    fetchUserTags({ commit, state }, payload) {
      if( state.isLoggedIn ) {
        axios({
          method: 'GET',
          url: '/tags',
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          commit('SET_USER_TAGS', data)
        })
        .catch(err => {
          commit('SET_ERROR_MESSAGE', err)
        })
      }
    },
    addUserTag({ commit }, payload){
      axios({
        method: 'PUT',
        url: '/tags',
        data: payload,
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        commit('SET_USER_TAGS', data)
      })
      .catch(err => {
        commit('SET_ERROR_MESSAGE', err)
      })
    },
    removeUserTag({ commit }, payload){
      axios({
        method: 'PATCH',
        url: '/tags',
        data: payload,
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        commit('SET_USER_TAGS', data)
      })
      .catch(err => {
        commit('SET_ERROR_MESSAGE', err)
      })
    },
    register({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/register',
          data: {
            name: payload.name,
            email: payload.email,
            password: payload.password
          }
        })
        .then(({ data }) => {
          commit('SET_SUCCESS_MESSAGE', "Registration Succesful")
          commit('SET_USER_EMAIL', data.email)
          resolve(data)
        })
        .catch(err => {
          commit('SET_ERROR_MESSAGE', err)
          reject(err)
        })
      })
    },
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
        .then(({ data }) => {
          commit('SET_SESSION', true)
          commit('SET_USER_EMAIL', data.email)
          commit('SET_SUCCESS_MESSAGE', "Login Succesful")
          resolve(data)
        })
        .catch(err => {
          commit('SET_ERROR_MESSAGE', err)
          reject(err)
        })
      })
    },
    uploadImage({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          data: payload,
          url: '/imageUploader',
          headers: {
              authorization: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => {
          commit('SET_ERROR_MESSAGE', err)
          reject(err)
        })
      })
    },
    createQuestion({ commit }, payload){
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          data: payload,
          url: '/questions',
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          commit('PUSH_NEW_QUESTION', data)
          commit('SET_SUCCESS_MESSAGE', "Question submitted!")
          resolve(data)
        })
        .catch(err => {
          reject(err)
          commit('SET_ERROR_MESSAGE', err)
        })
      })
    },
    editQuestion({ commit }, payload, id){
      return new Promise((resolve, reject) => {
        axios({
          method: "PUT",
          data: payload,
          url: `/questions/${payload.id}`,
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          commit('PUSH_NEW_QUESTION', data)
          commit('SET_SUCCESS_MESSAGE', "Question edited!")
          resolve(data)
        })
        .catch(err => {
          reject(err)
          commit('SET_ERROR_MESSAGE', err)
        })
      })
    },
    submitAnswer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          data: payload,
          url: '/answers',
          headers: {
              authorization: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          commit('SET_NEW_ANSWER', data)
          commit('SET_SUCCESS_MESSAGE', 'Answer submitted!')
          resolve(data)
        })
        .catch(err => {
          commit('SET_ERROR_MESSAGE', err)
          reject(err)
        })
      })
    },
    logOut({ commit }) {
      commit('SET_SUCCESS_MESSAGE', "Logged out")
      commit('SET_SESSION', false)
    },
    upvoteQuestion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "PATCH",
          data: payload,
          url: `/questions/${payload}/upvote`,
          headers: {
              authorization: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          commit('SET_SUCCESS_MESSAGE', 'Upvoted!')
          resolve(data)
        })
        .catch(err => {
          commit('SET_ERROR_MESSAGE', err)
          reject(err)
        })
      })
    },
    downvoteQuestion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "PATCH",
          data: payload,
          url: `/questions/${payload}/downvote`,
          headers: {
              authorization: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          commit('SET_SUCCESS_MESSAGE', 'Downvoted!')
          resolve(data)
        })
        .catch(err => {
          commit('SET_ERROR_MESSAGE', err)
          reject(err)
        })
      })
    },
    upvoteAnswer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "PATCH",
          data: payload,
          url: `/answers/${payload}/upvote`,
          headers: {
              authorization: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          commit('SET_SUCCESS_MESSAGE', 'Upvoted!')
          resolve(data)
        })
        .catch(err => {
          commit('SET_ERROR_MESSAGE', err)
          reject(err)
        })
      })
    },
    downvoteAnswer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "PATCH",
          data: payload,
          url: `/answers/${payload}/downvote`,
          headers: {
              authorization: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          commit('SET_SUCCESS_MESSAGE', 'Downvoted!')
          resolve(data)
        })
        .catch(err => {
          commit('SET_ERROR_MESSAGE', err)
          reject(err)
        })
      })
    },
    deleteQuestion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "DELETE",
          data: payload,
          url: `/questions/${payload}`,
          headers: {
              authorization: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          commit('SET_SUCCESS_MESSAGE', 'Question deleted!')
          resolve(data)
        })
        .catch(err => {
          commit('SET_ERROR_MESSAGE', err)
          reject(err)
        })
      })
    },
    sendResetPasswordEmail({ commit }, payload) {
      axios({
        method: "POST",
        data: payload,
        url: '/forgot-password'
      })
      .then(({data}) => {
        commit('SET_SUCCESS_MESSAGE', "Please check your email")
        resolve(data)
      })
      .catch(err => {
        reject(err)
        commit('SET_ERROR_MESSAGE', err)
      })
    },
    resetPassword({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          data: payload,
          url: `/reset-password`
        })
        .then(({ data }) => {
          commit('SET_SUCCESS_MESSAGE', 'New password updated! Please log in with your new password.')
          resolve(data)
        })
        .catch(err => {
          commit('SET_ERROR_MESSAGE', err)
          reject(err)
        })
      })
    }
  },
  modules: {
  }
})
