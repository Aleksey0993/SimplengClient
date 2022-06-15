<template>
  <v-container class="fill-height" fluid>
    <search-input @fetchTextData="fetchTextData" />
    <error-messages class="mx-auto my-0" v-if="!listGrammars.length"
      >Список пуст</error-messages
    >
    <grammar-list v-else :listGrammars="listGrammars" :user="user" />
    <my-loader v-if="isGrammarLoading" />

    <v-btn
      v-if="user.role === `ADMIN`"
      color="pink"
      dark
      fixed
      bottom
      right
      fab
      @click="$router.push({ name: 'grammarNew' })"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <div v-intersect="onIntersect" class="observer"></div>
  </v-container>
</template>

<script>
import MyLoader from "@/components/MyLoader";
import SearchInput from "@/components/SearchInput";
import GrammarList from "@/components/GrammarList";
import { mapActions, mapState } from "vuex";
import ErrorMessages from "../components/messages/ErrorMessages.vue";
//import GrammarList from "../components/GrammarList.vue";
//import MyLoader from "../components/MyLoader.vue";
export default {
  components: { MyLoader, GrammarList, SearchInput, ErrorMessages },

  data() {
    return {
      searchInput: "",
    };
  },
  computed: {
    ...mapState("grammar", {
      listGrammars: (state) => state.listGrammars,
      isGrammarLoading: (state) => state.isGrammarLoading,
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
      this.fetchGrammar(this.searchInput);
    },
    ...mapActions("grammar", ["fetchGrammar", "loadMoreGrammar"]),
    onIntersect(entries) {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        console.log("пересечение - ", entries[0].isIntersecting);
        this.loadMoreGrammar(this.searchInput);
      }
    },
  },
  mounted() {
    this.fetchGrammar(this.searchInput);
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
