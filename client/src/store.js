import Vue from 'vue'
import Vuex from 'vuex'
import axios from './configs/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {},
    questions: [],
    myQuestions: [],
    question: {},
    tags: []
    // answers: []
  },
  mutations: {
    SET_AUTH (state, data) {
      state.auth = data
    },

    SIGNUP (state, data) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('_id', data.payload._id)
      localStorage.setItem('name', data.payload.name)
      localStorage.setItem('email', data.payload.email)
      state.auth = data
    },
    SIGNIN (state, data) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('_id', data.payload._id)
      localStorage.setItem('name', data.payload.name)
      localStorage.setItem('email', data.payload.email)
      state.auth = data
    },
    SIGNOUT (state) {
      localStorage.clear()
      state.auth = {}
    },
    FETCH_QUESTIONS (state, questions) {
      state.questions = questions
    },
    FETCH_MY_QUESTIONS (state, myQuestions) {
      state.myQuestions = myQuestions
    },
    ADD_QUESTION (state, payload) {
      state.questions.push(payload)
    },
    GET_QUESTION (state, question) {
      state.question = question
    },
    FETCH_MY_TAGS(state, payload) {
      state.tags = payload
    },
    // FETCH_ANSWERS (state, answers) {
    //   state.answers = answers
    // }
  },
  actions: {
    fetchTagQuestions({dispatch, commit, state}, payload) {
      axios({
        url: `/questions/tag/${payload.tag}`,
        method: 'GET',
        headers: {
          token: state.auth.token
        }
      })
      .then(({ data }) => {
        commit('FETCH_QUESTIONS', data)
        res()
      })
      .catch(err => {
        // console.log(err)
        if (err.response) {
          console.log(err.response)
          rej(err.response.data.errors)
        }    
      })
    },
    fetchTags ({dispatch, commit, state}) {
      return axios({
        url: `/users/tag`,
        method: 'GET',
        headers: {
          token: state.auth.token
        }
      })
      .then(({ data }) => {
        console.log('dari fetch tags', data)
        commit('FETCH_MY_TAGS', data)
        res('Fetch tag success!')
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response)
          rej(err.response.data.errors)
        }      
      })
    },
    addTag ({dispatch, commit, state}, payload) {
      axios({
        url: `/users/tag`,
        method: 'PUT',
        data: payload,
        headers: {
          token: state.auth.token
        }
      })
      .then(({ data }) => {
        console.log('dari add Tag action')
        dispatch('fetchTags')
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response)
          rej(err.response.data.errors)
        }      
      })
    },
    checkLogin ({dispatch, commit}) {
      let data = {
        token: localStorage.getItem('token'),
        payload:{
          name: localStorage.getItem('name'),
          email: localStorage.getItem('email'),
          _id: localStorage.getItem('_id')
        }
      }
      commit ('SET_AUTH', data)
    },
    signup ({dispatch, commit}, payload) {
      return new Promise((res, rej) => {
        axios({
          url: '/users/signup',
          method: 'POST',
          data: payload
        })
        .then(({ data }) => {
          console.log(data)
          commit('SIGNUP', data)
          res('Signup success!')
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }      
        })
      })
    },
    signin ({dispatch, commit}, payload) {
      return new Promise ((res, rej) => {
        axios({
          url: '/users/signin',
          method: 'POST',
          data: payload
        })
        .then(({ data }) => {
          console.log(data)
          commit ('SIGNIN', data)
          res ('Signin success!')
        })
        .catch (err => {
          if (err.response) {
            rej (err.response.data.errors)
          }
        })
      })
    },
    signout ({dispatch, commit}) {
      return new Promise((res, rej) => {
        commit('SIGNOUT')
        res('Signout success!')
      })
    },
    fetchQuestions ({dispatch, commit, state}) {
      return new Promise ((res, rej) => {
        axios({
          url: '/questions',
          method: 'GET'
        })
        .then(({ data }) => {
          commit('FETCH_QUESTIONS', data)
          res()
        })
        .catch(err => {
          // console.log(err)
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }    
        })
      })
    },

    fetchMyQuestions ({dispatch, commit, state}) {
      return new Promise ((res, rej) => {
        axios({
          url: '/questions/my',
          method: 'GET',
          headers: {
            token: state.auth.token
          }
        })
        .then(({ data }) => {
          commit('FETCH_MY_QUESTIONS', data)
          res()
        })
        .catch(err => {
          // console.log(err)
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }    
        })
      })
    },

    addQuestion ({dispatch, commit, state}, payload) {
      console.log(payload)
      return new Promise ((res, rej) => {
        axios({
          url: '/questions',
          method: 'POST',
          headers: {
            token: state.auth.token
          },
          data: payload
        })
        .then(({ data }) => {
          console.log(data)
          res('Question added successfully!')
        })
        .catch(err => {
          console.log(err)
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }      
        })
      })
    },

    getQuestion ({dispatch, commit, state}, id){
      return new Promise ((res, rej) => {
        axios({
          url: `/questions/${id}`,
          method: 'GET'
        })
        .then(({ data }) => {
          commit('GET_QUESTION', data)
          res(data)
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }    
        })
      })
    },

    addAnswer ({dispatch, commit, state}, payload) {
      // console.log(data.payload)
      return new Promise ((res, rej) => {
        axios({
          url: `/answers/${payload.questionId}`,
          method: 'POST',
          headers: {
            token: state.auth.token
          },
          data: payload.data
        })
        .then(({ data }) => {
          console.log(data)
          dispatch('getQuestion', payload.questionId)
          res('Answer added successfully!')
        })
        .catch(err => {
          console.log(err)
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }      
        })
      })
    },

    editAnswer ({dispatch, commit, state}, payload) {
      // console.log(data.payload)
      console.log('masuk edit answer >>>>>>>>>>>>>>>>>>.')
      return new Promise ((res, rej) => {
        axios({
          url: `/answers/${payload.answerId}`,
          method: 'PATCH',
          headers: {
            token: state.auth.token
          },
          data: payload.data
        })
        .then(({ data }) => {
          console.log(data)
          dispatch('getQuestion', payload.questionId)
          res('Answer updated successfully!')
        })
        .catch(err => {
          console.log(err)
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }      
        })
      })
    },

    deleteAnswer ({dispatch, commit, state}, payload) {
      return new Promise ((res, rej) => {
        axios({
          url: `/answers/${payload.answerId}`,
          method: 'DELETE',
          headers: {
            token: state.auth.token
          }
        })
        .then(({ data }) => {
          console.log(data)
          dispatch('getQuestion', payload.questionId)
          res('Answer deleted successfully!')
        })
        .catch(err => {
          console.log(err)
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }      
        })
      })
    },

    upvoteQuestion ({dispatch, commit, state}, questionId) {
      return new Promise ((res, rej) => {
        axios({
          url: `/questions/${questionId}/upvote`,
          method: 'POST',
          headers: {
            token: state.auth.token
          }
        })
        .then(({ data }) => {
          console.log(data)
          dispatch('getQuestion', questionId)
          res('You upvoted this question')
        })
        .catch(err => {
          console.log(err)
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }      
        })
      })
    },

    downvoteQuestion ({dispatch, commit, state}, questionId) {
      return new Promise ((res, rej) => {
        axios({
          url: `/questions/${questionId}/downvote`,
          method: 'POST',
          headers: {
            token: state.auth.token
          }
        })
        .then(({ data }) => {
          console.log(data)
          dispatch('getQuestion', questionId)
          res('You downvoted this question')
        })
        .catch(err => {
          console.log(err)
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }      
        })
      })
    },

    upvoteAnswer ({dispatch, commit, state}, payload) {
      return new Promise ((res, rej) => {
        axios({
          url: `/answers/${payload.answerId}/upvote`,
          method: 'POST',
          headers: {
            token: state.auth.token
          }
        })
        .then(({ data }) => {
          console.log(data)
          dispatch('getQuestion', payload.questionId)
          res('You upvoted this answer')
        })
        .catch(err => {
          console.log(err)
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }      
        })
      })
    },

    downvoteAnswer ({dispatch, commit, state}, payload) {
      return new Promise ((res, rej) => {
        axios({
          url: `/answers/${payload.answerId}/downvote`,
          method: 'POST',
          headers: {
            token: state.auth.token
          }
        })
        .then(({ data }) => {
          console.log(data)
          dispatch('getQuestion', payload.questionId)
          res('You downvoted this answer')
        })
        .catch(err => {
          console.log(err)
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }      
        })
      })
    },

    deleteQuestion ({dispatch, commit, state}, questionId) {
      return new Promise ((res, rej) => {
        axios({
          url: `/questions/${questionId}`,
          method: 'DELETE',
          headers: {
            token: state.auth.token
          }
        })
        .then(({ data }) => {
          console.log(data)
          // dispatch('fetchQuestion')
          res('Question deleted successfully!')
        })
        .catch(err => {
          // console.log(err)
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }      
        })
      })
    },

    editQuestion ({dispatch, commit, state}, payload) {
      return new Promise ((res, rej) => {
        axios({
          url: `/questions/${payload.questionId}` ,
          method: 'PUT',
          headers: {
            token: state.auth.token
          },
          data: payload.data
        })
        .then(({ data }) => {
          console.log(data)
          res('Question updated successfully!')
        })
        .catch(err => {
          console.log(err)
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }      
        })
      })
    }
  }
})
