import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert2';
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allQuestion: [],
    oneQuestion: [],
    answerToOne: []
  },
  mutations: {
    FetchAllQuestion(state, payload) {
      state.allQuestion = payload
    },
    FetchOneQuestion(state, payload) {
      state.oneQuestion = payload
    },
    FetchOne(state, payload){
      state.answerToOne = payload
      console.log(payload, 'asdasdasd');
    }
  },
  actions: {
    FetchAllQuestion(context) {
      axios({
        url: "http://localhost:3000/questions",
        method: 'get'
      })
        .then(({ data }) => {
          // console.log(data);
          context.commit('FetchAllQuestion', data)
        })
        .catch((err) => {
          swal.fire(err.response.data.message)
        })
    },
    FetchOneQuestion({ commit }, payload) {
      axios({
        url: `http://localhost:3000/questions/${payload}`,
        method: 'get'
      })
        .then(({ data }) => {
          // console.log(data);
          commit('FetchOneQuestion', data)
        })
        .catch((err) => {
          swal.fire(err.response.data.message)
        })
    },
    FetchTheAnswer({commit}, payload){
      axios({
        url: `http://localhost:3000/answers/${payload}`,
        method: 'get'
      })
        .then(({ data }) => {
          
          commit('FetchOne', data)
        })
        .catch((err) => {
          swal.fire(err.response.data.message)
        })
    }
  },
  getters: {

  },
  modules: {
  }
})
