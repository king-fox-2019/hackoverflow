import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2';
import axios from '@/config/server';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: false,
  },
  mutations: {
    SET_LOGGED(state, payload) {
      state.logged = payload;
    },
  },
  actions: {
    logged({ commit }, payload) {
      commit('SET_LOGGED', payload);
    },
    loginAttempt({ commit }, payload) {
      const { email, password } = payload;
      axios
        .post('/user/login', {
          email,
          password,
        })
        .then(({ data }) => {
          const { token } = data;
          localStorage.setItem('token', token);
          commit('SET_LOGGED', true);
          Swal.fire(
            'Login success',
            'Welcome back!',
            'success',
          );
          router.push({ name: 'home' });
        })
        .catch((err) => {
          const fields = err.response.data.join(' | ');
          Swal.fire(fields);
        });
    },
    register(context, payload) {
      const { fullname, email, password } = payload;
      if (!fullname || !email || !password) {
        Swal.fire('Please fill all fields!');
      } else {
        axios
          .post('/user', {
            fullname,
            email,
            password,
          })
          .then(() => {
            router.push({ name: 'login' });
            Swal.fire('Registration success, please login!');
          })
          .catch((err) => {
            const fields = err.response.data.join(' | ');
            Swal.fire(fields);
          });
      }
    },
  },
  modules: {
  },
});
