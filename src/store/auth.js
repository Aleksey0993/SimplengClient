import AuthService from "@/service/AuthService";
import FingerPrint from "@/service/FingerPrint";
//import { jwtDecrypt } from '@/service/decodeToken'
import router from "@/router/index";
import jwt_decode from "jwt-decode";
const state = {
  fingerprint: "",
  isLoading: false,
  isAuth: false,
  user: null,
  err: "",
  success: "",
};
const getters = {};
const mutations = {
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  registerSuccess(state, payload) {
    state.success = payload;
  },
  registerError(state, payload) {
    state.err = payload;
  },
  activateSuccess(state, payload) {
    state.success = payload;
  },
  activateError(state, payload) {
    state.err = payload;
  },
  loginSuccess(state, payload) {
    localStorage.setItem("token", payload.accessToken);
    state.user = jwt_decode(localStorage.getItem("token")); //  jwtDecrypt(localStorage.getItem('token'))
    state.isAuth = true;
    router.push({ name: "profile" });
  },
  loginError(state, payload) {
    state.err = payload;
  },
  forgotPasswordSuccess(state, payload) {
    state.success = payload;
  },
  forgotPasswordError(state, payload) {
    state.err = payload;
  },
  resetPasswordSuccess(state, payload) {
    state.success = payload;
  },
  resetPasswordError(state, payload) {
    state.err = payload;
  },

  clearMessage(state) {
    state.success = "";
    state.err = "";
  },

  logoutSuccess(state) {
    localStorage.removeItem("token");
    state.isAuth = false;
    state.user = null;
    router.push({ name: "login" });
  },
  setFingerPrint(state, payload) {
    state.fingerprint = payload;
  },
};
const actions = {
  async registration({ commit }, { email, password }) {
    try {
      commit("setLoading", true);
      commit("clearMessage");
      const response = await AuthService.registration(email, password);
      commit("registerSuccess", response.data.msg);
    } catch (err) {
      commit("registerError", err.response.data.msg);
    } finally {
      commit("setLoading", false);
    }
  },

  async activation({ commit }, activation_token) {
    try {
      commit("setLoading", true);
      commit("clearMessage");
      const response = await AuthService.activation(activation_token);
      commit("activateSuccess", response.data.msg);
    } catch (err) {
      commit("activateError", err.response.data.msg);
    } finally {
      commit("setLoading", false);
    }
  },
  async login({ commit, state }, { email, password }) {
    try {
      commit("setLoading", true);
      commit("clearMessage");
      const response = await AuthService.login(
        email,
        password,
        state.fingerprint
      );
      commit("loginSuccess", response.data);
    } catch (err) {
      commit("loginError", err.response.data.msg);
    } finally {
      commit("setLoading", false);
    }
  },
  async forgotPassword({ commit }, email) {
    try {
      commit("setLoading", true);
      commit("clearMessage");
      const response = await AuthService.forgotPassword(email);
      commit("forgotPasswordSuccess", response.data.msg);
    } catch (err) {
      commit("forgotPasswordError", err.response.data.msg);
    } finally {
      commit("setLoading", false);
    }
  },
  async resetPassword({ commit }, { password, reset_password_token }) {
    try {
      commit("setLoading", true);
      commit("clearMessage");
      // localStorage.setItem('token', access_token)
      const response = await AuthService.resetPassword(
        password,
        reset_password_token
      );
      commit("resetPasswordSuccess", response.data.msg);
    } catch (err) {
      commit("resetPasswordError", err.response.data.msg);
    } finally {
      commit("setLoading", false);
      //  localStorage.removeItem('token')
    }
  },

  async logout({ commit }) {
    try {
      commit("setLoading", true);
      await AuthService.logout();
      commit("logoutSuccess");
    } catch (err) {
      console.log(err.message);
    } finally {
      commit("setLoading", false);
    }
  },

  async setFingerPrint({ commit }) {
    const fingerprint = await FingerPrint.getUserID();
    console.log("перезагрузка");
    console.log(fingerprint);
    commit("setFingerPrint", fingerprint);
  },

  // async checkAfterResetPage({ commit }) {
  //   try {
  //     commit("setLoading", true);
  //     await AuthService.logout();
  //     commit("logoutSuccess");
  //   } catch (err) {
  //     if(err.response.status === 401){

  //     }
  //   } finally {
  //     commit("setLoading", false);
  //   }
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
