<template>
  <div>
    <div v-if="grammarItem">
      <h3>{{ grammarItem.title }}</h3>
      <p>{{ grammarItem.description }}</p>
    </div>
    <my-loader v-if="isGrammarLoading" />
  </div>
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
