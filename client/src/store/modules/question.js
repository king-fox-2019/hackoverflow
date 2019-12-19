import axios from "../../api/axios";

export default {
  state: {
    listQuestion: [],
    detailQuestion: {}
  },
  getters: {},
  mutations: {
    FETCH_ALL_QUESTION(state, payload) {
      state.listQuestion = payload;
    },
    FETCH_DETAIL_QUESTION(state, payload) {
      state.detailQuestion = payload;
    }
  },
  actions: {
    fetchDetailQuestion({ commit }, payload) {
      let token = localStorage.getItem("token");
      axios({
        method: "GET",
        url: `/question/${payload}`,
        headers: {
          token
        }
      })
        .then(({ data }) => {
          commit("FETCH_DETAIL_QUESTION", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchAllQuestion({ commit }) {
      axios({
        method: "GET",
        url: "/question/"
      })
        .then(({ data }) => {
          commit("FETCH_ALL_QUESTION", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    createQuestion({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: "/question/",
          data: payload,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            dispatch("FETCH_ALL_QUESTION");
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
