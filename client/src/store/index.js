import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../utils/axios-instance';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    questions: [],
    question: null, // detail for singel question
  },
  mutations: {
    UPDATE_USERNAME(state, payload) {
      state.username = payload.username;
    },
    UPDATE_QUESTIONS(state, payload) {
      state.questions = payload.questions;
    },
    UPDATE_QUESTION(state, payload) {
      state.question = payload.question;
    },
  },
  actions: {
    fetchAllQuestions(context) {
      axios
        .get('/questions')
        .then(({data}) => {
          context.commit('UPDATE_QUESTIONS', {questions: data});
        })
        .catch(error => console.log(error.response.data.errors));
    },
    fetchSingelQuestion(context, questionId) {
      axios
        .get(`questions/${questionId}`)
        .then(({data}) => {
          context.commit('UPDATE_QUESTION', {question: data});
        })
        .catch(error => console.log(error.response.data.errors));
    },
  },
  modules: {},
});
