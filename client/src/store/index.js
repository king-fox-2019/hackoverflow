import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../helper/server'
import Swal from 'sweetalert2'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoading: true,
    threads: [],
    currentThread: {},
    user: {}
  },
  mutations: {
    FETCH_THREAD(state, dataThread) {
      state.threads = dataThread
    },
    SET_USER(state, dataUser) {
      state.user = dataUser
      state.isLogin = true
      localStorage.setItem('token', dataUser.token)
      localStorage.setItem('name', dataUser.name)
    },
    CHECK_LOGIN(state) {
      if (localStorage.getItem('token')) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
      router.push('/#')
    },
    SET_CURRENT_THREAD(state, dataThread) {
      state.currentThread = dataThread
    }
  },
  actions: {
    fetchThread(context) {
      axios({
        method: 'GET',
        url: '/thread'
      })
        .then(({data}) => {
          context.commit('FETCH_THREAD', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        })
    },
    login(context, formData) {
        axios({
          url: '/login',
          method: 'POST',
          data: formData
        })
          .then(({data}) => {
            Swal.fire({
              icon: 'success',
              title: 'You are successfully login'
            })
            context.commit('SET_USER', data)
            router.push('/')
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.message
            })
          })
    },
    register(context, formData) {
      axios({
        url: '/register',
        method: 'POST',
        data: formData
      })
        .then(({data}) => {
          Swal.fire({
            icon: 'success',
            title: 'You are successfully registered'
          })
          context.commit('SET_USER', data)
          router.push('/')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    },
    addThread(context, dataThread) {
      axios({
        url: '/thread/',
        method: 'POST',
        data: dataThread
      })
        .then(({data}) => {
          console.log(data)
          Swal.fire({
            icon: 'success',
            title: 'You question has been posted'
          })
          context.commit('FETCH_THREAD')
          router.push('/')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    },
    viewThread(context, id) {
      axios({
        url: `/thread/${id}`,
        method: 'GET'
      })
        .then(({data}) => {
          context.commit('SET_CURRENT_THREAD', data)
          if (router.currentRoute.path !== `/view/${id}`) {
            router.push(`/view/${id}`)
          }
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    },
    replyThread(context, payload) {
      const overrideToken = localStorage.getItem('token')
      axios({
        url: `/reply/${payload.id}`,
        method: 'POST',
        data: payload.data,
        headers: {
          token: overrideToken
        }
      })
        .then(({data}) => {
          context.dispatch('viewThread', payload.id)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    },
    upvote(context, payload) {
      const overrideToken = localStorage.getItem('token')
      axios({
        url: `/${payload.url}/${payload.id}/upvote`,
        method: 'PATCH',
        headers: {
          token: overrideToken
        }
      })
        .then(({data}) => {
          if (payload.thread) {
            context.dispatch('viewThread', payload.thread)
          } else {
            context.dispatch('viewThread', payload.id)
          }
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    },
    downvote(context, payload) {
      const overrideToken = localStorage.getItem('token')
      axios({
        url: `/${payload.url}/${payload.id}/downvote`,
        method: 'PATCH',
        headers: {
          token: overrideToken
        }
      })
        .then(({data}) => {
          if (payload.thread) {
            context.dispatch('viewThread', payload.thread)
          } else {
            context.dispatch('viewThread', payload.id)
          }
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    }
  },
  modules: {
  }
})
