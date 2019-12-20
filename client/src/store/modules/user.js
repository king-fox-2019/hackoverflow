import axios from "../../api/axios";

export default {
  state: {
    isLogin: false,
    userInfo: {}
  },
  getters: {
    isLogin: state => state.isLogin
  },
  mutations: {
    SET_USER_LOGIN(state, payload) {
      state.isLogin = payload;
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    }
  },
  actions: {
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
