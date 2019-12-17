import Vue from 'vue';
import Vuex from 'vuex';
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
          router.push({ name: 'home' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    register(context, payload) {
      const { fullname, email, password } = payload;
      axios
        .post('/user', {
          fullname,
          email,
          password,
        })
        .then(() => {
          router.push({ name: 'login' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {
  },
});
