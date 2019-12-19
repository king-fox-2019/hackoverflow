import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions : [],
    userQuestions : [],
    userTag : []
  },
  mutations: {
    FETCH_QUESTION(state, payload){
      let newPayload = []
      payload.forEach(element => {
        if (element.tags.some(item => state.userTag.includes(item))) {
          element.bgcolor = '#ffefbd'
        } else {
          element.bgcolor = '#ffffff'
        }
        newPayload.push(element)
      });
      state.questions = newPayload
    },
    FETCH_USER_QUESTION(state, payload){
      let newPayload = []
      payload.forEach(element => {
        if (element.tags.some(item => state.userTag.includes(item))) {
          element.bgcolor = '#ffefbd'
        } else {
          element.bgcolor = '#ffffff'
        }
        newPayload.push(element)
      });
      state.userQuestions = newPayload
    },
    FETCH_USER_TAG(state, payload){
      state.userTag = payload
    }
  },
  actions: {
    fetchAllQuestion({state, commit}, payload){
      axios({
        url:'http://localhost:3002/question',
        method:'get',
      })
        .then(({data})=> {
          commit('FETCH_QUESTION', data)
        })
        .catch(console.log)
    },
    fetchUserQuestion({state, commit}, payload){
      axios({
        url:`http://localhost:3002/question/user`,
        method:'get',
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(({data})=> {
          commit('FETCH_USER_QUESTION', data)
        })
        .catch(console.log)
    },
    fetchUserTag({state, commit}, payload){
      axios({
        url : 'http://localhost:3002/user',
        method: 'get',
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(({data}) => {
          commit('FETCH_USER_TAG', data.watchedTag)
        })
        .catch(console.log)
    }
  },
  modules: {
  }
})
