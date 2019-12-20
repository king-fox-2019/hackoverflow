import server from '@/../api/server'

const state = {
  isLogin: false,
  currentUserId: ''
}

const mutations = {
  SET_IS_LOGIN (state, payload) {
    state.isLogin = payload
  },
  SET_ID (state, payload) {
    state.currentUserId = payload
  }
}

const actions = {
  userLogin ({ commit }, payload) {
    return server({
      url: '/user/login',
      method: 'POST',
      data: payload
    })
  },
  userRegister ({ commit }, payload) {
    return server({
      url: '/user/register',
      method: 'POST',
      data: payload
    })
  },
  checkLogin ({ dispatch, commit }) {
    if (localStorage.getItem('token')) {
      commit('SET_IS_LOGIN', true)
      dispatch('getUserData')
    } else {
      commit('SET_IS_LOGIN', false)
    }
  },
  getUserData ({ commit }, payload) {
    server({
      url: '/user/info',
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        commit('SET_ID', data._id)
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
