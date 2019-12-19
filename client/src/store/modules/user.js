import server from '@/../api/server'

const state = {
  isLogin: false
}

const mutations = {
  SET_IS_LOGIN (state, payload) {
    state.isLogin = payload
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
  checkLogin ({ commit }) {
    if (localStorage.getItem('token')) {
      commit('SET_IS_LOGIN', true)
    } else {
      commit('SET_IS_LOGIN', false)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
