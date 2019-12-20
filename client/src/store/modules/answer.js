import server from '../../../api/server'

const state = {
  currentAnswer: [],
  soleAnswer: {}
}

const mutations = {
  SET_CURRENT_ANSWER (state, payload) {
    state.currentAnswer = payload
  },
  ADD_ANSWER (state, payload) {
    state.currentAnswer.push(payload)
  },
  SET_SOLE_ANSWER (state, payload) {
    state.soleAnswer = payload
  }
}

const actions = {
  getQuestionAnswer ({ commit }, payload) {
    server({
      url: `/answer/question/${payload}`,
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        console.log(data)
        commit('SET_CURRENT_ANSWER', data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  createAnswer ({ commit }, payload) {
    return server({
      url: `/answer/question/${payload.questionId}`,
      method: 'POST',
      data: {
        desc: payload.desc
      },
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  },
  getAnswer ({ commit }, payload) {
    return server({
      url: `/answer/${payload}`,
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  },
  deleteAnswer ({ dispatch }, payload) {
    return server({
      url: `/answer/${payload}`,
      method: 'DELETE',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  },
  editAnswer ({ dispatch }, payload) {
    return server({
      url: `/answer/${payload.id}`,
      method: 'PUT',
      data: {
        desc: payload.desc
      },
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  },
  upvoteAnswer ({ dispatch }, payload) {
    server({
      url: `/answer/${payload.answerId}/upvote`,
      method: 'PUT',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        dispatch('getQuestionAnswer', payload.questionId)
      })
      .catch(err => {
        console.log(err)
      })
  },
  downvoteAnswer ({ dispatch }, payload) {
    server({
      url: `/answer/${payload.answerId}/downvote`,
      method: 'PUT',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        dispatch('getQuestionAnswer', payload.questionId)
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
