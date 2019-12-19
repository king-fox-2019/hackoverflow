import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../../config/server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loggedId: '',
    questions: [],
    trendingTags: [],
    userQuestion: {
      status: false,
      data: []
    },
    userAnswer: [],
    isAnswer: false,
    search: '',
    userData: {
      tags: []
    },
    left: true
  },
  mutations: {
    LOGIN(state, payload) {
      state.isLogin = payload;
    },
    LOGOUT(state) {
      state.user = null;
      state.isLogin = false
      localStorage.removeItem("token");
    },
    SETSEARCH(state, payload) {
      state.search = payload
    },
    FETCHQ(state, payload) {
      state.userQuestion.data = [],
        state.userQuestion.status = false
      state.isAnswer = false
      state.search = ''
    },
    FETCHQUESTION(state, payload) {
      state.questions = payload
    },
    FETCHTRENDINGTAG(state, data) {
      state.trendingTags = data
    },
    FETCHUSERQUESTION(state, data) {
      state.questions = data
      state.userQuestion.data = state.questions;
      state.userQuestion.status = true;
      state.isAnswer = false
    },
    FETCHANSWERUSER(state, data) {
      state.userAnswer = data
      state.isAnswer = true
    },
    setQuestions(state, payload) {
      state.questions = payload
    },
    setUserData(state, payload) {
      state.userData = payload
    }
  },
  actions: {
    auth(context, payload) {
      if (localStorage.getItem("token")) {
        context.commit("LOGIN", true)
      } else {
        context.commit("LOGIN", false)
      }
    },
    login(context, user) {
      return Axios({
        method: "post",
        url: "/user/login",
        data: user
      });
    },
    register(context, user) {
      // console.log(user);
      return Axios({
        method: "post",
        url: "/user/register",
        data: user
      });
    },
    postQuestion(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'post',
          url: '/question/',
          data: payload,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    patchQuestion(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'patch',
          url: `/question/${payload.id}`,
          data: payload.question,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            context.dispatch('fetchQuestion')
            context.dispatch('fetchUserQuestion')
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    fetchQuestion(context, payload) {
      let title, tag;
      if (payload) {
        payload.title ? title = payload.title : title = ''
        payload.tag ? tag = payload.tag : tag = ''
      } else {
        title = ''
        tag = ''
      }
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'get',
          url: `/question/?title=${title}&tag=${tag}`,
        })
          .then(({ data }) => {
            context.commit('FETCHQUESTION', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchTrendingTag(context, payload) {
      Axios({
        method: 'get',
        url: `/question/tag`
      })
        .then(({ data }) => {
          context.commit('FETCHTRENDINGTAG', data)
        })
        .catch(err => {
          // console.log(response)
        })
    },
    fetchUserQuestion(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'get',
          url: `/question/user`,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            // console.log(data);

            context.commit('FETCHUSERQUESTION', data)
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    upvoteQuestion(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'patch',
          url: `/question/upvote/${payload}`,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            context.dispatch('fetchQuestion')
            if (context.state.userQuestion.status) {
              context.dispatch('fetchUserQuestion')
            }
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    downvoteQuestion(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'patch',
          url: `/question/downvote/${payload}`,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            context.dispatch('fetchQuestion')
            if (context.state.userQuestion.status) {
              context.dispatch('fetchUserQuestion')
            }
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    answer(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'post',
          url: `/answer/${payload.questionId}`,
          data: {
            answer: payload.answer
          },
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    upvoteAnswer(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'patch',
          url: `/answer/upvote/${payload}`,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    downvoteAnswer(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'patch',
          url: `/answer/downvote/${payload}`,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    deleteQuestion(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'delete',
          url: `/question/${payload}`,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            context.dispatch('fetchUserQuestion')
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    fetchAnswerUser(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: "get",
          url: '/answer',
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            context.commit('FETCHANSWERUSER', data)
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    patchAnswer(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'patch',
          url: `/answer/${payload.id}`,
          data: { answer: payload.answer },
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            context.dispatch('fetchAnswerUser')
            resolve(data)
          })
          .catch(({ response }) => {
            reject(data)
          })
      })
    },
    fetchUserData({ commit }) {
      Axios({
        url: `/user`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setUserData', data)
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Internal server error`, `error`)
        })
    },
    getFilteredQuestions({ commit }, payload) {
      Axios({
        url: `/question?tag=${payload}`,
        method: 'GET'
      })
        .then(({ data }) => {
          commit('setQuestions', data)
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Internal server error`, `error`)
        })
    }

  },
  modules: {
  }
})
