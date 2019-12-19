import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../helper/server'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoading: true,
    threads: [],
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
            // this.$router.push('/')
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
