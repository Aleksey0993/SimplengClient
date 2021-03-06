import GrammarService from "@/service/GrammarService";
//import FingerPrint from '@/service/FingerPrint'
//import { jwtDecrypt } from '@/service/decodeToken'
//import router from '@/router/index'

const state = {
  page: 1,
  size: 8,
  totalPages: 0,
  listGrammars: [],
  grammarItem: null,
  isGrammarLoading: false,
  err: "",
  success: "",
  id_newGrammar: 1,
};
const getters = {
  getByIdGrammar: (state) => (id) => {
    return state.listGrammars.filter((item) => item.id == id)[0];
  },
};

const mutations = {
  setListGrammars(state, payload) {
    state.totalPages = payload.totalPages;
    state.listGrammars = payload.grammars;
  },
  setLoading(state, payload) {
    state.isGrammarLoading = payload;
  },
  setPage(state, payload) {
    state.page = payload;
  },
  setGrammars(state, payload) {
    state.listGrammars = payload;
  },
  setIdGrammar(state, payload) {
    state.id_newGrammar = payload;
  },
  setGrammarItem(state, payload) {
    state.grammarItem = payload;
  },
  clearMessage(state) {
    state.success = "";
    state.err = "";
  },
  createGrammarSuccess(state, payload) {
    state.success = payload;
  },
  createGrammarError(state, payload) {
    state.err = payload;
  },
  deleteGrammarSuccess(state, payload) {
    state.success = payload;
  },
  deleteGrammarError(state, payload) {
    state.err = payload;
  },
  updateGrammarSuccess(state, payload) {
    state.success = payload;
  },
  updateGrammarError(state, payload) {
    state.err = payload;
  },
};
const actions = {
  async fetchGrammar({ state, commit }, searchText) {
    try {
      commit("setLoading", true);

      commit("setPage", 1);

      const response = await GrammarService.getList(
        state.page,
        state.size,
        searchText
      );
      // console.log("ответ от сервера - ", response);
      commit("setListGrammars", response.data);
    } catch (e) {
      console.log(e);
    } finally {
      commit("setLoading", false);
    }
  },
  async fetchGrammarItem({ commit }, id) {
    try {
      commit("setLoading", true);
      const response = await GrammarService.getOne(id);
      console.log("ответ от сервера - ", response);
      commit("setGrammarItem", response.data);
    } catch (e) {
      console.log(e);
    } finally {
      commit("setLoading", false);
    }
  },

  async loadMoreGrammar({ state, commit }, searchText) {
    try {
      //  console.log("state.page before - ", state.page);
      commit("setPage", state.page + 1);
      //  console.log("state.page after - ", state.page);

      const response = await GrammarService.getList(
        state.page,
        state.size,
        searchText
      );
      //  console.log("response", response);
      // commit(
      //   "setTotalPages",
      //   Math.ceil(response.headers["x-total-count"] / state.limit)
      // );
      commit("setGrammars", [...state.listGrammars, ...response.data.grammars]);
    } catch (e) {
      console.log(e);
    }
  },

  async createGrammar({ commit }, newGrammar) {
    try {
      commit("setLoading", true);
      commit("clearMessage");
      const response = await GrammarService.create(
        newGrammar.title,
        newGrammar.description,
        newGrammar.published
      );
      commit("createGrammarSuccess", response.data.msg);
      commit("setIdGrammar", response.data.id);
    } catch (err) {
      commit("createGrammarError", err.response.data.msg);
    } finally {
      commit("setLoading", false);
    }
  },
  async deleteGrammar({ commit }, id) {
    try {
      commit("setLoading", true);
      commit("clearMessage");
      const response = await GrammarService.delete(id);
      commit("deleteGrammarSuccess", response.data.msg);
    } catch (err) {
      commit("deleteGrammarError", err.response.data.msg);
    } finally {
      commit("setLoading", false);
    }
  },
  async changeGrammar({ commit }, newGrammar) {
    try {
      console.log("добавление");
      if (!newGrammar.flag_img) {
        await GrammarService.update(
          newGrammar.title,
          newGrammar.description,
          newGrammar.published,
          newGrammar.id
        );
      } else {
        // console.log("flag_img", newGrammar.flag_img);
        commit("setLoading", true);
        commit("clearMessage");
        const response = await GrammarService.update(
          newGrammar.title,
          newGrammar.description,
          newGrammar.published,
          newGrammar.id
        );
        commit("updateGrammarSuccess", response.data.msg);
      }
    } catch (err) {
      commit("updateGrammarError", err.response.data.msg);
    } finally {
      commit("setLoading", false);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
