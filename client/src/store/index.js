import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/config/server';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: false,
  },
  mutations: {
  },
  actions: {
    loginAttempt(context, payload) {
      // console.log(payload);
      const { email, password } = payload;
      console.log(password);
      console.log(email);
      axios
        .post('/user/login', {
          email: payload.email,
          password: payload.password,
          // password: 'hello',
        })
        .then(({ data }) => {
          const { token } = data;
          console.log(token);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {
  },
});
