import axios from "../../api/axios";

export default {
  state: {
    listAnswer: [],
    detailAnswer: {}
  },
  getters: {},
  mutations: {
    FETCH_ALL_ANSWER(state, payload) {
      state.listAnswer = payload;
    },
    FETCH_DETAIL_ANSWER(state, payload) {
      state.detailAnswer = payload;
    }
  },
  actions: {
    editAnswer({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "PUT",
          url: `/answer/${payload.id}`,
          data: {
            desc: payload.desc
          },
          headers: {
            token
          }
        })
          .then(({ data }) => {
            dispatch("fetchDetailAnwer", payload.id);
            dispatch("fetchAnswer", payload.id);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    deleteAnswer({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "DELETE",
          url: `/answer/${payload}`,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            dispatch("fetchAnswer", payload);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    postAnswer({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `/answer/question/${payload.id}`,
          data: {
            desc: payload.data
          },
          headers: {
            token
          }
        })
          .then(({ data }) => {
            dispatch("fetchAnswer", payload.id);
            resolve(data);
          })
          .reject(err => {
            reject(err);
          });
      });
    },
    fetchDetailAnswer({ commit }, payload) {
      let token = localStorage.getItem("token");
      axios({
        method: "GET",
        url: `/answer/${payload}`,
        headers: {
          token
        }
      })
        .then(data => {
          commit("FETCH_DETAIL_ANSWER", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchAnswer({ commit }, payload) {
      let token = localStorage.getItem("token");
      axios({
        method: "GET",
        url: `/answer/question/${payload}`,
        headers: {
          token
        }
      })
        .then(({ data }) => {
          commit("FETCH_ALL_ANSWER", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    upvote({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "PATCH",
          url: `/answer/${payload}/upvote`,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            dispatch("fetchAnswer", payload);
            resolve(data);
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      });
    },
    downvote({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      axios({
        method: "PATCH",
        url: `/answer/${payload}/downvote`,
        headers: {
          token
        }
      })
        .then(({ data }) => {
          dispatch("fetchAnswer", payload);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
