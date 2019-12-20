import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/server'
import Swal from 'sweetalert2'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    answers: {}
  },
  mutations: {
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    FETCH_QUESTIONS (state, payload) {
      state.questions = payload
    },
    PUSH_ANSWERS (state, data) {
      state.answers = data
    }
  },
  actions: {
    register ({ commit }, user) {
      axios({
        method: 'post',
        url: '/account/register',
        data: user
      })
        .then(({ data }) => {
          commit('SET_ISLOGIN', true)
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('userId', data._id)
          router.push('/')
          Swal.fire({
            icon: 'success',
            text: 'Successfully registered!'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err
          })
        })
    },
    login ({ commit }, user) {
      axios({
        method: 'post',
        url: '/account/login',
        data: user
      })
        .then(({ data }) => {
          commit('SET_ISLOGIN', true)
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('userId', data._id)
          router.push('/')
          Swal.fire({
            icon: 'success',
            text: 'Successfully logged in!'
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            text: err
          })
        })
    },
    logout ({ commit }) {
      Swal.fire({
        title: 'Sign out',
        text: 'Are you sure that you want to sign out?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, sign me out'
      })
        .then((result) => {
          if (result.value) {
            localStorage.removeItem('access_token')
            commit('SET_ISLOGIN', false)
            router.push('/')
            Swal.fire({
              icon: 'success',
              text: 'You are now signed out'
            })
          }
        })
    },
    fetchQuestions ({ commit }) {
      return axios({
        method: 'get',
        url: '/questions',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('FETCH_QUESTIONS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    askQuestion ({ commmit }, { title, description }) {
      axios({
        method: 'post',
        url: '/questions',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title,
          description
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            text: 'Submitted!'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err
          })
        })
    },
    submitAnswer ({ commit, dispatch }, { questionId, content }) {
      return axios({
        method: 'post',
        url: '/answers',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          questionId,
          description: content.description
        }
      })
        .then(({ data }) => {
          dispatch('fetchAnswers', questionId)
          Swal.fire({
            icon: 'success',
            text: 'Submitted!'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err
          })
        })
    },
    voteQ ({ commit, dispatch }, { questionId, choice }) {
      return axios({
        method: 'patch',
        url: `/questions/${questionId}/vote`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          vote: choice
        }
      })
      .then(({ data }) => {
        dispatch('fetchQuestions')
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          text: err
        })
      })
    },
    voteA ({ commit, dispatch }, { answerId, questionId, choice }) {
      return axios({
        method: 'patch',
        url: `/answers/${answerId}/vote`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          vote: choice
        }
      })
      .then(({ data }) => {
        dispatch('fetchAnswers', questionId)
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          text: err
        })
      })
    },
    fetchAnswers ({commit}, questionId) {
      return axios({
        method: 'get',
        url: `/answers/${questionId}`
      })
        .then(({ data }) => {
          commit('PUSH_ANSWERS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteQuestion ({ commit, dispatch }, questionId) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            axios({
              method: 'delete',
              url: `/questions/${questionId}`,
              headers: {
                access_token: localStorage.getItem('access_token')
              }
            })
              .then(() => {
                Swal.fire({
                  icon: 'success',
                  text: 'Deleted!'
                })
                dispatch('fetchQuestions')
                router.push('/')
              })
              .catch(err => {
                Swal.fire({
                  icon: 'error',
                  text: err
                })
              })
          }
        })
    },
    submitEdit({ commit, dispatch }, { questionId, content }) {
      return axios({
        method: 'patch',
        url: `/questions/${questionId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          questionId,
          title: content.title,
          description: content.description
        }
      })
        .then(({ data }) => {
          dispatch('fetchAnswers')
          Swal.fire({
            icon: 'success',
            text: 'Saved!'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err
          })
        })
    },
    deleteAnswer ({ commit, dispatch }, { answerId, questionId }) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            axios({
              method: 'delete',
              url: `/answers/${answerId}`,
              headers: {
                access_token: localStorage.getItem('access_token')
              }
            })
              .then(() => {
                Swal.fire({
                  icon: 'success',
                  text: 'Deleted!'
                })
                dispatch('fetchAnswers', questionId)
              })
              .catch(err => {
                Swal.fire({
                  icon: 'error',
                  text: err
                })
              })
          }
        })
    },
    editAnswer ({ commit, dispatch }, { content, answerId, questionId }) {
      console.log(content, 'OoOoOoOoOoO')
      return axios({
        method: 'patch',
        url: `/answers/${answerId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          questionId,
          description: content
        }
      })
        .then(({ data }) => {
          dispatch('fetchAnswers', questionId)
          Swal.fire({
            icon: 'success',
            text: 'Saved!'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err
          })
        })
    }
  },
  modules: {
  }
})
