import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import sharedMutations from "vuex-shared-mutations";
import auth from "./auth";
import grammar from "./grammar";
import listening from "./listening";
Vue.use(Vuex);

const dataState = createPersistedState({
  paths: ["auth.isAuth", "auth.user"],
});

const sharedTab = sharedMutations({
  predicate: ["auth/loginSuccess", "auth/logoutSuccess"],
});

export default new Vuex.Store({
  modules: {
    auth,
    grammar,
    listening,
  },
  plugins: [dataState, sharedTab],
});
