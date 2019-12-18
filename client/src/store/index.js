import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2';
import axios from '@/config/server';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: false,
    questions: [],
    currentQuestion: {},
    currentComment: [],
    myQuestions: [],
  },
  mutations: {
    SET_LOGGED(state, payload) {
      state.logged = payload;
    },
    SET_QUESTIONS(state, payload) {
      state.questions = payload;
    },
    SET_CURRENT(state, payload) {
      state.currentQuestion = payload;
    },
    SET_CURRENT_COMMENT(state, payload) {
      state.currentComment = payload;
    },
    CLEAR_COMMENT(state) {
      state.currentComment = '';
    },
    SET_MYQUESTIONS(state, payload) {
      state.myQuestions = payload;
    },
  },
  actions: {
    votes({ dispatch }, payload) {
      const { id, action, data } = payload;
      const url = `/${data}/${action}/${id}`;
      console.log(url);
      axios
        .patch(url)
        .then((result) => {
          Swal.fire(result.data.message);
          dispatch('myQuestions');
          dispatch('fetchQuestions');
        })
        .catch((err) => {
          const fields = err.response.data.join(' | ');
          Swal.fire(fields);
        });
    },
    updateComments({ commit }) {
      axios
        .get(`/answer/${router.currentRoute.params.id}`)
        .then(({ data }) => {
          commit('SET_CURRENT_COMMENT', data);
        })
        .catch((err) => {
          commit('CLEAR_COMMENT');
          const fields = err.response.data.join(' | ');
          Swal.fire(fields);
        });
    },
    getComments({ commit }, payload) {
      const { _id } = payload;
      axios
        .get(`/answer/${_id}`)
        .then(({ data }) => {
          commit('SET_CURRENT_COMMENT', data);
        })
        .catch((err) => {
          commit('CLEAR_COMMENT');
          const fields = err.response.data.join(' | ');
          Swal.fire(fields);
        });
    },
    current({ dispatch, commit }, payload) {
      dispatch('getComments', payload);
      commit('SET_CURRENT', payload);
    },
    fetchQuestions({ commit }) {
      axios
        .get('/questions')
        .then(({ data }) => {
          commit('SET_QUESTIONS', data);
        })
        .catch((err) => {
          const fields = err.response.data.join(' | ');
          Swal.fire(fields);
        });
    },
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
    myQuestions({ commit }) {
      axios
        .get('/questions/my')
        .then(({ data }) => {
          commit('SET_MYQUESTIONS', data);
        })
        .catch((err) => {
          const fields = err.response.data.join(' | ');
          Swal.fire(fields);
        });
    },
    remove({ dispatch }, payload) {
      axios
        .delete(`/questions/${payload}`)
        .then(() => {
          Swal.fire('Questions deleted!');
          dispatch('myQuestions');
          dispatch('fetchQuestions');
        })
        .catch((err) => {
          const fields = err.response.data.join(' | ');
          Swal.fire(fields);
        });
    },
    post({ dispatch }, payload) {
      const { title, comment, action } = payload;
      const url = `${action}/${router.currentRoute.params.id}`;
      axios
        .post(url, {
          title,
          description: comment,
        })
        .then(() => {
          dispatch('myQuestions');
          dispatch('fetchQuestions');
          dispatch('updateComments');
        })
        .catch((err) => {
          const fields = err.response.data.join(' | ');
          Swal.fire(fields);
        });
    },
  },
  modules: {
  },
});
