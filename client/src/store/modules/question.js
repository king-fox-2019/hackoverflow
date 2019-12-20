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
    editQuestion({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "PUT",
          url: `/question/${payload.id}`,
          data: payload.data,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            dispatch("fetchDetailQuestion", payload.id);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    deleteQuestion({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "DELETE",
          url: `/question/${payload}`,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            dispatch("fetchAllQuestion");
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    fetchDetailQuestion({ commit, dispatch }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "GET",
          url: `/question/${payload}`,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            commit("FETCH_DETAIL_QUESTION", data);
            dispatch("fetchViewsQuestion", payload);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
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
    },
    upvote({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      axios({
        method: "PATCH",
        url: `/question/${payload}/upvote`,
        headers: {
          token
        }
      }).then(({ data }) => {
        dispatch("fetchDetailQuestion", payload);
        dispatch("fetchAllQuestion");
      });
    },
    downvote({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      axios({
        method: "PATCH",
        url: `/question/${payload}/downvote`,
        headers: {
          token
        }
      }).then(({ data }) => {
        dispatch("fetchDetailQuestion", payload);
        dispatch("fetchAllQuestion");
      });
    },
    fetchViewsQuestion({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      axios({
        method: "PATCH",
        url: `/question/${payload}/views`,
        headers: {
          token
        }
      }).then(({ data }) => {
        dispatch("fetchAllQuestion");
      });
    }
  }
};
