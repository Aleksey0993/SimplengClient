<template>
  <v-container>
    <div v-if="grammarItem">
      <div class="text-h3 font-weight-medium text-center">
        {{ grammarItem.title }}
      </div>
      <div class="ql-editor" v-html="grammarItem.description"></div>
    </div>
    <my-loader v-if="isGrammarLoading" />
  </v-container>
</template>

<script>
import MyLoader from "@/components/MyLoader";
import { mapActions, mapState } from "vuex";
export default {
  components: { MyLoader },
  computed: {
    ...mapState("grammar", {
      grammarItem: (state) => state.grammarItem,
      isGrammarLoading: (state) => state.isGrammarLoading,
    }),
  },
  methods: {
    ...mapActions("grammar", ["fetchGrammarItem"]),
  },
  mounted() {
    this.fetchGrammarItem(this.$route.params.id);
  },
};
</script>

<style></style>
