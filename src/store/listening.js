//import GrammarService from "@/service/GrammarService";
import ListeningService from "@/service/ListeningService";
//import FingerPrint from '@/service/FingerPrint'
//import { jwtDecrypt } from '@/service/decodeToken'
//import router from '@/router/index'

const state = {
  page: 1,
  size: 8,
  totalPages: 0,
  listListening: [],
  listeningItem: null,
  isListeningLoading: false,
  err: "",
  success: "",
  id_newListening: 1,
  listQuestions: [],
};
const getters = {
  getByIdListening: (state) => (id) => {
    return state.listListening.filter((item) => item.id == id)[0];
  },
};

const mutations = {
  setListListening(state, payload) {
    state.totalPages = payload.totalPages;
    state.listListening = payload.listening;
  },
  setLoading(state, payload) {
    state.isListeningLoading = payload;
  },
  setPage(state, payload) {
    state.page = payload;
  },
  setListening(state, payload) {
    state.listListening = payload;
  },
  setIdListening(state, payload) {
    state.id_newListening = payload;
  },
  setListeningItem(state, payload) {
    state.listeningItem = payload;
  },
  clearMessage(state) {
    state.success = "";
    state.err = "";
  },
  clearListQuestions(state) {
    state.listQuestions = [];
  },
  createListeningSuccess(state, payload) {
    state.success = payload;
  },
  createListeningError(state, payload) {
    state.err = payload;
  },
  deleteListeningSuccess(state, payload) {
    state.success = payload;
  },
  deleteListeningError(state, payload) {
    state.err = payload;
  },
  updateListeningSuccess(state, payload) {
    state.success = payload;
  },
  updateListeningError(state, payload) {
    state.err = payload;
  },
  setListQuestion(state, payload) {
    state.listQuestions = payload;
  },
  addListQuestion(state, payload) {
    state.listQuestions.push(payload);
  },
  deleteListQuestion(state, id) {
    state.listQuestions = state.listQuestions.filter((item) => item.id !== id);
  },
};
const actions = {
  async fetchListening({ state, commit }, searchText) {
    try {
      commit("setLoading", true);

      commit("setPage", 1);

      const response = await ListeningService.getList(
        state.page,
        state.size,
        searchText
      );
      // console.log("ответ от сервера - ", response);
      commit("setListListening", response.data);
    } catch (e) {
      console.log(e);
    } finally {
      commit("setLoading", false);
    }
  },
  async fetchListeningItem({ commit }, id) {
    try {
      commit("setLoading", true);
      const response = await ListeningService.getOne(id);
      console.log("ответ от сервера - ", response);
      commit("setListeningItem", response.data);
    } catch (e) {
      console.log(e);
    } finally {
      commit("setLoading", false);
    }
  },

  async loadMoreListening({ state, commit }, searchText) {
    try {
      //  console.log("state.page before - ", state.page);
      commit("setPage", state.page + 1);
      //  console.log("state.page after - ", state.page);

      const response = await ListeningService.getList(
        state.page,
        state.size,
        searchText
      );
      //  console.log("response", response);
      // commit(
      //   "setTotalPages",
      //   Math.ceil(response.headers["x-total-count"] / state.limit)
      // );
      commit("setListening", [
        ...state.listListening,
        ...response.data.listening,
      ]);
    } catch (e) {
      console.log(e);
    }
  },

  async createListening({ commit }, newListening) {
    try {
      commit("setLoading", true);
      commit("clearMessage");
      const response = await ListeningService.create(newListening);
      commit("createListeningSuccess", response.data.msg);
      commit("setIdListening", response.data.id);
    } catch (err) {
      commit("createListeningError", err.response.data.msg);
    } finally {
      commit("setLoading", false);
    }
  },
  async deleteListening({ commit }, id) {
    try {
      commit("setLoading", true);
      commit("clearMessage");
      const response = await ListeningService.delete(id);
      commit("deleteListeningSuccess", response.data.msg);
    } catch (err) {
      commit("deleteListeningError", err.response.data.msg);
    } finally {
      commit("setLoading", false);
    }
  },
  async changeListening({ commit }, newListening) {
    try {
      commit("setLoading", true);
      commit("clearMessage");
      const response = await ListeningService.update(
        newListening.title,
        newListening.published,
        newListening.fullAccess,
        newListening.id
      );
      commit("updateListeningSuccess", response.data.msg);
    } catch (err) {
      commit("updateListeningError", err.response.data.msg);
    } finally {
      commit("setLoading", false);
    }
  },

  async fetchTest({ commit }, id) {
    try {
      commit("setLoading", true);
      const response = await ListeningService.getAllTest(id);
      console.log("ответ от сервера - ", response);
      commit("setListQuestion", response.data);
    } catch (e) {
      console.log(e);
    } finally {
      commit("setLoading", false);
    }
  },
  async addQuestion({ commit }, newQuestion) {
    try {
      commit("setLoading", true);
      const response = await ListeningService.createTest(newQuestion);
      console.log("ответ от сервера - ", response);
      commit("addListQuestion", response.data);
    } catch (e) {
      console.log(e);
    } finally {
      commit("setLoading", false);
    }
  },
  async deleteQuestion({ commit }, id) {
    try {
      commit("setLoading", true);
      const response = await ListeningService.deleteTest(id);
      console.log("ответ от сервера - ", response);
      commit("deleteListQuestion", id);
    } catch (e) {
      console.log(e);
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
