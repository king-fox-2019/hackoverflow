import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../helpers/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    email: '',
    photo: '',
    popular: 0,
    questions: [],
    question: {}
  },
  mutations: {
    SET_LOGIN(state,{ payload }){
      state.isLogin = true
      state.email = payload.email
      state.photo = payload.image
      state.popular = payload.popular
    },
    SET_LOGOUT(state){
      state.isLogin = false
      state.email = ''
      state.photo = ''
    },
    SET_DATA_QUESTIONS(state, payload){
      state.questions = payload
    },
    SET_DATA_QUESTION_ANSWER(state, payload){
      state.question = payload
    }
  },
  actions: {
    getUser({ commit }){
      axios({
        url: '/user/myaccount',
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        // console.log(data, '=> user vuex');
        let payload = {
          email: data.email,
          image: data.image[0],
          popular: data.popular
        }
        commit('SET_LOGIN', { payload })
      })
      .catch(error=>{
        console.log(error.response.data);
      })
    },
    getdataQuestion({ commit }){
      axios({
        url: '/question',
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        // console.log(data, '=> dari vuex');
        commit('SET_DATA_QUESTIONS', data)
      })
      .catch(error=>{
        console.log(error.response.data);
      })
    },
    getQuestionShow({ commit },{ id }){
      axios({
        url: '/question/'+id,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        // console.log(data, '=> dari vuex show question');
        commit('SET_DATA_QUESTION_ANSWER', data)
      })
      .catch(error=>{
        console.log(error.response.data);
      })
    },
    fatchSearch({ commit }, { search }){
      axios({
        url: '/question/search',
        method: 'POST',
        data: { search },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        console.log(data, '=> dari vuex show question');
        commit('SET_DATA_QUESTIONS', data)
      })
      .catch(error=>{
        console.log(error.response.data);
      })
    }
  },
  modules: {
  }
})
