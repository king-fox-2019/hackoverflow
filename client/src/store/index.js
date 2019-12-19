import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import question from './modules/question.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    form:'',
    username:'',
    email:'',
    password:'',
    isSuccess:null,
    isFail:null,
    isLogin:false
  },
  mutations: {
    CHANGE_TO_LOGIN_FORM(state){
      state.form='login'
    },
    CHANGE_TO_REGISTER_FORM(state){
      state.form='register'
    },
    UPDATE_USERNAME(state, username){
      state.username = username
    },
    UPDATE_PASSWORD(state, password){
      state.password = password
    },
    UPDATE_EMAIL(state, email){
      state.email = email
    },
    CLEAR_FIELD(state){
      state.username=''
      state.email=''
      state.password=''
    },
    LOGOUT(state){
      state.isLogin=false
      state.isSuccess=true
      state.isFail=false
      localStorage.removeItem('token')
    },
    IS_LOGIN_TRUE(state){
      state.isLogin=true
    }
  },
  actions: {
    changeForm({commit},payload){
      if(payload==='login') commit('CHANGE_TO_LOGIN_FORM')
      else commit('CHANGE_TO_REGISTER_FORM')
    },
    register({state,commit}){
      axios({
        method:'post',
        url:'http://localhost:34.66.242.14/register',
        data:{
          name:state.username,
          email:state.email,
          password:state.password
        }
      })
      .then(({data})=>{
        state.isSuccess=true
        state.isFail=false
        state.isLogin=true
        localStorage.setItem('token',data.token)
        commit('CLEAR_FIELD')
      })
      .catch(()=>{
        state.isFail=true
        state.isSuccess=false
        commit('CLEAR_FIELD')
      })
    },
    login({state}){
      axios({
        method:'post',
        url:'http://localhost:34.66.242.14/login',
        data:{
          email: state.email,
          password: state.password
        }
      })
      .then(({data})=>{
        state.isSuccess=true
        state.isFail=false
        state.isLogin=true
        localStorage.setItem('token',data.token)
        localStorage.setItem('username',data.name)
        this.commit('CLEAR_FIELD')
      })
      .catch(()=>{
        state.isFail=true
        state.isSuccess=false
        commit('CLEAR_FIELD')
      })
    }
  },
  modules: {
    question
  },
  getters: {
    getForm: state => {
      return state.form
    },
    getSuccess: state => {
      return state.isSuccess
    },
    getFail: state => {
      return state.isFail
    }
  }
})
