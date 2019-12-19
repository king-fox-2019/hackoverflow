import server from '../../../api/server'

const state = {
  listQuestion: [],
  currentQuestion: {}
}

const mutations = {
  SET_LIST_QUESTION (state, payload) {
    state.listQuestion = payload
  },
  CURRENT_QUESTION (state, payload) {
    state.currentQuestion = payload
  }

}

const actions = {
  createQuestion ({ dispatch }, payload) {
    return server({
      url: '/question',
      method: 'POST',
      data: payload,
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  },
  fetchQuestion ({ commit }) {
    server({
      url: '/question',
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        commit('SET_LIST_QUESTION', data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  detailQuestion ({ commit, dispatch }, payload) {
    server({
      url: `/question/${payload}`,
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        commit('CURRENT_QUESTION', data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  upvoteQuestion ({ dispatch }, payload) {
    server({
      url: `/question/${payload}/upvote`,
      method: 'PUT',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        dispatch('detailQuestion', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  downvoteQuestion ({ dispatch }, payload) {
    server({
      url: `/question/${payload}/downvote`,
      method: 'PUT',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        dispatch('detailQuestion', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  countView ({ commit }, payload) {
    server({
      url: `/question/${payload}/views`,
      method: 'PUT',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteQuestion ({ dispatch }, payload) {
    return server({
      url: `/question/${payload}`,
      method: 'DELETE',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  },
  editQuestion ({ dispatch }, payload) {
    return server({
      url: `/question/${payload.id}`,
      method: 'PUT',
      data: payload.data,
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  },
  searchQuestion ({ commit }, payload) {
    server({
      url: `/question?title=${payload}`,
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        commit('SET_LIST_QUESTION', data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  searchTag ({ commit }, payload) {
    server({
      url: `/question?tags=${payload}`,
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        commit('SET_LIST_QUESTION', data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
