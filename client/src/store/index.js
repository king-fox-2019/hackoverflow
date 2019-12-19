import Vue from 'vue'
import Vuex from 'vuex'
import question from './module/question'
import myQuestion from './module/myQuestion'
import myAnswer from './module/myAnswer'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
    question,
    myQuestion,
    myAnswer
  }
})
