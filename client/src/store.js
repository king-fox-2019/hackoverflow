import Vue from 'vue'
import Vuex from 'vuex'
import server from './api/server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    onSession: null,
    id: '',
    email: '',
    watchedTags: [],
    questions: []
  },
  mutations: {
    SET_SESSION(state, session) {
      state.onSession = session
    },
    SET_ID(state, id) {
      state.id = id
    },
    SET_EMAIL(state, email) {
      state.email = email
    },
    SET_WATCHED_TAGS(state, tags) {
      state.watchedTags = tags
    },
    SET_QUESTIONS(state, questions) {
      state.questions = questions
    }
  },
  actions: {
    onSignUp({ commit }, payload) {
      return server.post('signup', payload).then(response => {
        localStorage.setItem('access_token', response.data.data.access_token)
        commit('SET_SESSION', true)
        commit('SET_EMAIL', response.data.data.email)
        commit('SET_ID', response.data.data._id)
        commit('SET_WATCHED_TAGS', response.data.data.watchedTags)
        return response
      })
    },
    onSignIn({ commit }, payload) {
      return server.post('signin', payload).then(response => {
        localStorage.setItem('access_token', response.data.data.access_token)
        commit('SET_SESSION', true)
        commit('SET_EMAIL', response.data.data.email)
        commit('SET_ID', response.data.data._id)
        commit('SET_WATCHED_TAGS', response.data.data.watchedTags)
        return response
      })
    },
    checkSession({ commit }, access_token) {
      return server
        .get('/user/checksession', { headers: { access_token } })
        .then(response => {
          commit('SET_SESSION', true)
          commit('SET_EMAIL', response.data.data.email)
          commit('SET_ID', response.data.data._id)
          commit('SET_WATCHED_TAGS', response.data.data.watchedTags)
          return response
        })
        .catch(response => {
          commit('SET_SESSION', false)
          commit('SET_EMAIL', '')
          commit('SET_ID', '')
          commit('SET_WATCHED_TAGS', [])
          return response
        })
    },
    onUpdateWatchedTags({ commit }, watchedTags) {
      const access_token = localStorage.getItem('access_token')
      return server
        .patch('user/watchedtags', watchedTags, { headers: { access_token } })
        .then(response => {
          commit('SET_WATCHED_TAGS', response.data.data.watchedTags)
          return response
        })
    },
    onSignOut({ commit }) {
      localStorage.clear()
      commit('SET_SESSION', false)
      commit('SET_EMAIL', '')
      commit('SET_ID', '')
      commit('SET_WATCHED_TAGS', [])
    },
    getAllQuestions({ commit }, searchQuery) {
      return server
        .get(`questions${searchQuery ? '?search=' + searchQuery : ''}`)
        .then(({ data }) => {
          commit('SET_QUESTIONS', data.data)
        })
    },
    getQuestionDetail(context, id) {
      return server.get(`questions/${id}`)
    },
    onVoteQuestion(context, payload) {
      const access_token = localStorage.getItem('access_token')
      return server.patch(`questions/${payload.id}/${payload.side}vote`, null, {
        headers: { access_token }
      })
    },
    onVoteAnswer(context, payload) {
      const access_token = localStorage.getItem('access_token')
      return server.patch(`answers/${payload.id}/${payload.side}vote`, null, {
        headers: { access_token }
      })
    },
    postQuestion(context, payload) {
      const access_token = localStorage.getItem('access_token')
      return server.post('questions', payload, { headers: { access_token } })
    },
    editQuestion(context, payload) {
      const access_token = localStorage.getItem('access_token')
      return server.patch(`questions/${payload.id}`, payload, {
        headers: { access_token }
      })
    },
    postAnswer(context, payload) {
      const access_token = localStorage.getItem('access_token')
      return server.post(
        `questions/${payload.id}/answers`,
        { content: payload.content },
        { headers: { access_token } }
      )
    },
    editAnswer(context, payload) {
      const access_token = localStorage.getItem('access_token')
      return server.patch(
        `answers/${payload.answerId}`,
        { content: payload.content },
        { headers: { access_token } }
      )
    },
    onRemoveQuestion(context, id) {
      const access_token = localStorage.getItem('access_token')
      return server.delete(`questions/${id}`, { headers: { access_token } })
    },
    onRemoveAnswer(context, id) {
      const access_token = localStorage.getItem('access_token')
      return server.delete(`answers/${id}`, { headers: { access_token } })
    }
  },
  modules: {}
})
