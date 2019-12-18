import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import fetchApi from '../../apis/server'
import router from '../router/index'

export default new Vuex.Store({
  state: {
    isLogin : false,
    questions:[],
    detailQuestion: {}
  },
  mutations: {
    CHANGE_ISLOGIN(state,payload){
      state.isLogin = payload
    },
    FETCH_DATA(state,payload){
      state.questions=payload
    },
    DETAIL_QUESTION(state,payload){
      state.detailQuestion=payload
    }
  },
  actions: {
    upVoteQuestion({commit}, payload){
      fetchApi({
        method : 'post',
        url:`questions/${payload}/upvotes`,
      })
      .then(({data}) => {
        this.dispatch('fetchQuestionById',payload)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    downVoteQuestion({commit}, payload){
      fetchApi({
        method : 'post',
        url:`questions/${payload}/downvotes`,
      })
      .then(({data}) => {
        this.dispatch('fetchQuestionById',payload)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    addAnswer({commit},payload){
      fetchApi({
        method : 'post',
        url:`answers/${payload.questionId}`,
        data : {
          text : payload.text
        }
      })
      .then(({data}) => {
        // console.log(data)
        commit('DETAIL_QUESTION',data)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    fetchQuestionById({commit},payload){
      fetchApi({
        method : 'get',
        url:`questions/${payload}`,
        data : payload
      })
      .then(({data}) => {
        console.log(data)
        commit('DETAIL_QUESTION',data)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    fetchQuestion({commit},payload){
      fetchApi({
        method : 'get',
        url:'questions',
        data : payload
      })
      .then(({data}) => {
        commit('FETCH_DATA',data)
        // console.log(data)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    register({commit},payload){
      fetchApi({
        method : 'post',
        url:'users/register',
        data : payload
      })
      .then(({data}) => {
        commit('CHANGE_ISLOGIN',true)
        router.push('/')
        localStorage.setItem('token',data.token)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },

    login({commit},payload){
      fetchApi({
        method : 'post',
        url : 'users/login',
        data : {
          email : payload.email,
          password : payload.password
        }
      })
      .then(({data}) => {
        commit('CHANGE_ISLOGIN',true)
        router.push('/')
        localStorage.setItem('token',data.token)
      })
      .catch(({message}) => {
        console.log(message)
      })
    }
  },
  modules: {
  }
})
