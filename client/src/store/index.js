import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'

Vue.use(Vuex)

import fetchApi from '../../apis/server'
import router from '../router/'

export default new Vuex.Store({
  state: {
    isLogin : false,
    questions:[],
    detailQuestion: {},
    allTags:[],
    userTags:[],
    allUsers: [],
    topThree:[],
    myQuestion :[]
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
    },
    GET_ALL_TAGS(state,payload){
      state.allTags = payload
    },
    GET_USER_TAGS(state,payload){
      state.userTags = payload
    },
    GET_ALL_USERS(state,payload){
      state.allUsers = payload
    },
    GET_TOP_THREE(state,payload){
      state.topThree = payload
    },
    GET_MY_QUESTION(state,payload){
      state.myQuestion = payload
    },

  },
  actions: {
    editQuestion({commit},payload){
      fetchApi({
        method : 'put',
        url:`questions/${payload.questionId}`,
        headers : {
          token : localStorage.getItem('token')
        },
        data :{
          title : payload.title,
          question : payload.question,
          tags: payload.tags
        }
      })
      .then(({data}) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your data has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        this.dispatch('fetchMyQuestion')
      })
      .catch(({message}) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Something wrong',
          showConfirmButton: false,
          timer: 1500
        })
      })
    },
    deleteQuestion({commit},payload){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't undo this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {

        fetchApi({
          method : 'delete',
          url:`questions/${payload}`,
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          console.log(data)
          this.dispatch('fetchMyQuestion')
        })
        .catch(({message}) => {
          console.log(message)
        })

        if (result.value) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successfully deleted',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })

    },
    fetchMyQuestion({commit}){
      
      fetchApi({
        method : 'get',
        url:`questions/myquestion`,
        // headers : localStorage.getItem('token')
      })
      .then(({data}) => {
        // console.log(data)
        commit('GET_MY_QUESTION',data)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    getTopThree({commit},payload){
      fetchApi({
        method : 'get',
        url:`questions/topthree`,
      })
      .then(({data}) => {
        console.log(data,'from top three')
        commit('GET_TOP_THREE',data.questionId)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    popular({commit},payload){
      fetchApi({
        method : 'get',
        url:`questions/popular`,
      })
      .then(({data}) => {
        // console.log(data)
        commit('FETCH_DATA',data)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    unansweredQuestion({commit}, payload){
      fetchApi({
        method : 'get',
        url:`questions/unanswered`,
      })
      .then(({data}) => {
        // console.log(data)
        commit('FETCH_DATA',data)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    filterData({commit},payload){
      fetchApi({
        method : 'post',
        url:`questions/${payload}`,
      })
      .then(({data}) => {
        console.log(data)
        commit('FETCH_DATA',data)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    getAllUser({commit}){
      fetchApi({
        method : 'get',
        url:'users',
      })
      .then(({data}) => {
        commit('GET_ALL_USERS',data)
        console.log(data)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    addUserTags({commit},payload){
      fetchApi({
        method : 'post',
        url:'users/tags',
        data : {
          tag : payload
        }
      })
      .then(({data}) => {
        
        let tags = []
        for(let i = 0 ; i < data.tags.length; i++){
              tags.push(data.tags[i]);
           
        }
        this.dispatch('getUserTags')
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    getUserTags({commit}){
      
      fetchApi({
        method : 'get',
        url:'users/info',
      })
      .then(({data}) => {
        let tags = []
        for(let i = 0 ; i < data.tags.length; i++){
              tags.push(data.tags[i]);
           
        }
        commit('GET_USER_TAGS',tags)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    getAllTags({commit}){
      fetchApi({
        method : 'get',
        url:'questions',
      })
      .then(({data}) => {
        
        let tags = []
        for(let i = 0 ; i < data.length; i++){
            for( let j = 0 ; j < data[i].tags.length; j++){
                if(tags.indexOf(data[i].tags[j]) === -1) {
                    tags.push(data[i].tags[j]);
                }
            }
        }
        commit('GET_ALL_TAGS',tags)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    addQuestion({commit},payload){
      fetchApi({
        method : 'post',
        url:`questions`,
        data: {
          title : payload.title,
          question : payload.question,
          tags: payload.tags
        }
      })
      .then(({data}) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your data has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        router.push('/')
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    downVoteAnswer({commit},payload){
      fetchApi({
        method : 'post',
        url:`answers/${payload.answerId}/downvotes`,
      })
      .then(({data}) => {
        this.dispatch('fetchQuestionById',payload.questionId)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
    upVoteAnswer({commit},payload){
      fetchApi({
        method : 'post',
        url:`answers/${payload.answerId}/upvotes`,
      })
      .then(({data}) => {
        this.dispatch('fetchQuestionById',payload.questionId)
      })
      .catch(({message}) => {
        console.log(message)
      })
    },
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
      console.log(payload.questionId,payload.text)
      fetchApi({
        method : 'post',
        url:`answers/${payload.questionId}`,
        data : {
          text : payload.text
        }
      })
      .then(({data}) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your answer has been posted',
          showConfirmButton: false,
          timer: 1500
        })
        this.dispatch('fetchQuestionById',payload.questionId)
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
        Swal.fire(
          'Success!',
          'Now you are signed in!',
          'success'
          )
        commit('CHANGE_ISLOGIN',true)
        localStorage.setItem('token',data.token)
        setTimeout(function() {
          router.push('/')
        },2000)
      })
      .catch((response) => {
        Swal.fire({
          icon: 'error',
          title: 'Register failed',
          text: 'Email already taken',
        })
        console.log(response)
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
        localStorage.setItem('token',data.token)
        Swal.fire(
          'Success!',
          'Now you are signed in!',
          'success'
        )
        setTimeout(function() {
          commit('CHANGE_ISLOGIN',true)
          router.push('/')
          this.dispatch('fetchQuestion')
        },2000)
      })
      .catch(({message}) => {
        Swal.fire({
          icon: 'error',
          title: 'Signin failed',
          text: 'Wrong username/password!',
        })
        console.log(message)
      })
    }
  },
  modules: {
  }
})
