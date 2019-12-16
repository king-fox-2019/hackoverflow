import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/config/axios';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
  },
  mutations: {
    SET_ISLOGGED(state, payload) {
      state.isLogged = payload;
    },
  },
  actions: {
    // untuk proses async
    LOGIN_ATTEMPT({ commit }, payload) {
      const { email, password } = payload;
      axios
        .post('user/login', {
          email,
          password,
        })
        .then(({ data }) => {
          const { token } = data;
          localStorage.setItem('token', token);
          commit('SET_ISLOGGED', true);
          router.push({ name: 'questions' });
        })
        .catch((err) => {
          console.log(err, 'error');
        });
    },
    LOGOUT_ATTEMPT({ commit }) {
      localStorage.removeItem('token');
      commit('SET_ISLOGGED', false);
      router.push({ name: 'home' });
    },
  },
  modules: {
  },
});
