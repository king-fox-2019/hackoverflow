import axios from "../../api/axios";

export default {
  state: {
    isLogin: false
  },
  getters: {
    isLogin: state => state.isLogin
  },
  mutations: {
    SET_USER_LOGIN(state, payload) {
      state.isLogin = payload;
    }
  },
  actions: {
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
