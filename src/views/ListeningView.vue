<template>
  <v-container class="fill-height" fluid>
    <search-input @fetchTextData="fetchTextData" />
    <error-messages class="mx-auto my-0" v-if="!listListening.length"
      >Список пуст</error-messages
    >
    <listening-list v-else :listListening="listListening" :user="user" />
    <my-loader v-if="isListeningLoading" />

    <v-btn
      v-if="user.role === `ADMIN`"
      color="pink"
      dark
      fixed
      bottom
      right
      fab
      @click="$router.push({ name: 'listeningNew' })"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <div v-intersect="onIntersect" class="observer"></div>
  </v-container>
</template>

<script>
import MyLoader from "@/components/MyLoader";
import SearchInput from "@/components/SearchInput";
import ListeningList from "@/components/ListeningList";
import { mapActions, mapState } from "vuex";
import ErrorMessages from "../components/messages/ErrorMessages.vue";
//import GrammarList from "../components/GrammarList.vue";
//import MyLoader from "../components/MyLoader.vue";
export default {
  components: { MyLoader, ListeningList, SearchInput, ErrorMessages },

  data() {
    return {
      searchInput: "",
    };
  },
  computed: {
    ...mapState("listening", {
      listListening: (state) => state.listListening,
      isListeningLoading: (state) => state.isListeningLoading,
      totalPages: (state) => state.totalPages,
      page: (state) => state.page,
    }),

    ...mapState("auth", {
      user: (state) => state.user,
    }),
  },
  methods: {
    fetchTextData(searchText) {
      this.searchInput = searchText;
      this.fetchListening(this.searchInput);
    },
    ...mapActions("listening", ["fetchListening", "loadMoreListening"]),
    onIntersect(entries) {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        console.log("пересечение - ", entries[0].isIntersecting);
        this.loadMoreListening(this.searchInput);
      }
    },
  },
  mounted() {
    this.fetchListening(this.searchInput);
  },
};
</script>

<style>
.observer {
  width: 100%;
  height: 30px;
  background: green;
}
</style>
