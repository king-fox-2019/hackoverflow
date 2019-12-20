import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../helpers/axios.js'
import Swal from 'sweetalert2'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    questionList: [],
    questionDetail: {
      description: '', 
      UserId: {
        username: ''
      }
    },
    answers: []
  },
  mutations: {
    currentUser(state, username){
      this.state.username = username
    },
    storeQuestionList(state, questionList){
      this.state.questionList = questionList
    },
    storeQuestionDetail(state, questionDetail){
      this.state.questionDetail = questionDetail
    },
    storeAnswer(state, answers){
      this.state.answers = answers
    },
    logout(){
      this.state.username = ''
    },
  },
  actions: {
    login({commit}, loginData){
      axios
        .post(
          '/users/login',
          loginData
        )
        .then(({data}) => {
          commit('currentUser', data.username)
          localStorage.setItem('access_token', data.token)
        })
        .catch((err) => {
          Swal.fire(err.response.data.message)
        })
    },
    register({commit}, loginData){
      axios
        .post(
          '/users/register',
          loginData
        )
        .then(({data}) => {
          Swal.fire('Success register')
        })
        .catch((err) => {
          Swal.fire(err.response.data.message)
        })
    },
    getAllQuestion({commit}){
      axios
        .get(
          '/questions'
        )
        .then(({data}) => {
          commit('storeQuestionList', data)
        })
        .catch((err) => {
          Swal.fire(err.response.data.message)
        })
    },
    getQuestionDetail({commit}, id){
      axios
        .get(
          '/questions/' + id
        )
        .then(({data}) => {
          commit('storeQuestionDetail', data)
        })
        .catch((err) => {
          Swal.fire(err.response.data.message)
        })
    },
    getAnswers({commit}, id){
      axios
        .get(
          '/answers/' + id
        )
        .then(({data}) => {
          commit('storeAnswer', data)
        })
        .catch((err) => {
          Swal.fire(err.response.data.message)
        })
    }
  },
  modules: {
  },
  getters: {
    voteCount: state => {
      if (state.questionDetail.upvotes){
        return state.questionDetail.upvotes.length - state.questionDetail.downvotes.length
      }
      else {
        return 0
      }
    },
    questionData: state => {
      if (state.questionDetail.UserId){
        return state.questionDetail
      }
      else {
        return {description: '', UserId: {username: ''}}
      }
    }
  }
})
