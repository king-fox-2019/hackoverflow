import axios from "../../api/axios";

export default {
  state: {
    isLogin: false,
    userInfo: {},
    tag: [],
    filterTag: []
  },
  getters: {
    isLogin: state => state.isLogin
  },
  mutations: {
    SET_FILTER_TAG(state, payload) {
      state.filterTag = payload;
    },
    SET_USER_LOGIN(state, payload) {
      state.isLogin = payload;
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
    ADD_USER_TAG(state, payload) {
      state.tag = payload;
    }
  },
  actions: {
    filterTag({ commit }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "GET",
          url: `/user/filter/${payload}`,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    addTag({ commit, dispatch }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: "/user/addtag",
          data: {
            tag: payload
          },
          headers: {
            token
          }
        })
          .then(({ data }) => {
            dispatch("getUserInfo");
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getUserInfo({ commit }) {
      let token = localStorage.getItem("token");
      axios({
        method: "GET",
        url: "/user/info",
        headers: {
          token
        }
      }).then(({ data }) => {
        commit("SET_USER_INFO", data);
      });
    },
    register({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: "/user/register",
          data: payload
        })
          .then(({ data }) => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: "/user/login",
          data: payload
        })
          .then(({ data }) => {
            localStorage.setItem("token", data.token);
            commit("SET_USER_LOGIN", true);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("SET_USER_LOGIN", false);
    }
  }
};
