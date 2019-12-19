import Vue from "vue";
import Vuex from "vuex";
import serverAPI from "../../config/serverAPI";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userLogin: false,
    questions: [],
    userQuestions: [],
    currentQuestion: {},
    userId: "",
    username: ""
  },
  mutations: {
    SET_USERNAME(state, payload) {
      state.username = payload;
    },
    SET_USER_ID(state, payload) {
      state.userId = payload;
    },
    SET_CURRENT_QUESTION(state, payload) {
      state.currentQuestion = payload;
    },
    SET_USER_LOGIN(state, payload) {
      state.userLogin = payload;
    },
    SET_QUESTIONS(state, payload) {
      state.questions = payload;
    },
    SET_USER_QUESTIONS(state, payload) {
      state.userQuestions = payload;
    }
  },
  actions: {
    searchQuestion({ commit }, payload) {
      const search = payload.search;
      serverAPI({
        method: "GET",
        url: `/questions/?search=${search}`
      })
        .then(({ data }) => {
          commit("SET_QUESTIONS", data.questions);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCurrentUser({ commit }) {
      const headers = {
        access_token: localStorage.getItem("access_token")
      };
      serverAPI({
        method: "GET",
        url: `/user/currentuser`,
        headers
      })
        .then(({ data }) => {
          commit("SET_USER_ID", data.id);
          commit("SET_USERNAME", data.username);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteQuestion({ dispatch }, payload) {
      const id = payload.id;
      const headers = {
        access_token: localStorage.getItem("access_token")
      };
      return serverAPI({
        method: "DELETE",
        url: `/questions/${id}`,
        headers
      });
    },
    editQuestion({ commit }, payload) {
      const id = payload.id;
      const headers = {
        access_token: localStorage.getItem("access_token")
      };
      const data = {
        title: payload.title,
        description: payload.description
      };
      return serverAPI({
        method: "PUT",
        url: `/questions/${id}`,
        data,
        headers
      });
    },
    upvoteQuestion(context, payload) {
      const id = payload.id;
      const headers = {
        access_token: localStorage.getItem("access_token")
      };
      return serverAPI({
        method: "PATCH",
        url: `/questions/${id}/upvote`,
        headers
      });
    },
    downvoteQuestion(context, payload) {
      const id = payload.id;
      const headers = {
        access_token: localStorage.getItem("access_token")
      };
      return serverAPI({
        method: "PATCH",
        url: `/questions/${id}/downvote`,
        headers
      });
    },
    upvoteAnswer(context, payload) {
      const id = payload.id;
      const headers = {
        access_token: localStorage.getItem("access_token")
      };
      return serverAPI({
        method: "PATCH",
        url: `/answers/${id}/upvote`,
        headers
      });
    },
    downvoteAnswer(context, payload) {
      const id = payload.id;
      const headers = {
        access_token: localStorage.getItem("access_token")
      };
      return serverAPI({
        method: "PATCH",
        url: `/answers/${id}/downvote`,
        headers
      });
    },
    fetchQuestionById({ commit }, payload) {
      const headers = {
        access_token: localStorage.getItem("access_token")
      };
      const id = payload.id;
      serverAPI({
        method: "GET",
        url: `/questions/${id}`,
        headers
      })
        .then(({ data }) => {
          commit("SET_CURRENT_QUESTION", data.question);
        })
        .catch(err => {
          console.log(err);
        });
    },
    askQuestion({ dispatch }, payload) {
      const headers = {
        access_token: localStorage.getItem("access_token")
      };
      const data = {
        title: payload.title,
        description: payload.description
      };
      return serverAPI({
        method: "POST",
        url: "/questions",
        data,
        headers
      }).then(({ data }) => {
        dispatch("fetchAllQuestion");
        return data;
      });
    },
    fetchAllQuestion({ commit }) {
      serverAPI({
        method: "GET",
        url: "/questions"
      })
        .then(({ data }) => {
          commit("SET_QUESTIONS", data.questions);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchUserQuestion({ commit }) {
      const headers = {
        access_token: localStorage.getItem("access_token")
      };
      serverAPI({
        method: "GET",
        url: "/user/questions",
        headers
      })
        .then(({ data }) => {
          console.log(data);
          commit("SET_USER_QUESTIONS", data.questions);
        })
        .catch(err => {
          console.log(err);
        });
    },
    signupUser({ commit }, payload) {
      const { name, username, email, password } = payload;
      const data = {
        name,
        username,
        email,
        password
      };
      return serverAPI({
        method: "POST",
        url: "/signup",
        data
      }).then(({ data }) => {
        localStorage.setItem("access_token", data.token);
        commit("SET_USER_LOGIN", true);
        commit("SET_USER_ID", data.id);
        return data;
      });
    },
    signinUser({ commit }, payload) {
      const { emailUsername, password } = payload;
      const data = {
        emailUsername,
        password
      };
      return serverAPI({
        method: "POST",
        url: "/signin",
        data
      }).then(({ data }) => {
        localStorage.setItem("access_token", data.token);
        commit("SET_USER_LOGIN", true);
        commit("SET_USER_ID", data.id);
        return data;
      });
    },
    postAnswer(context, payload) {
      const headers = {
        access_token: localStorage.getItem("access_token")
      };
      const data = {
        question: payload.question,
        title: payload.title,
        description: payload.description
      };
      return serverAPI({
        method: "POST",
        url: "/answers",
        data,
        headers
      });
    }
  },
  modules: {}
});
