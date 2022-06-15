<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
      <v-text-field
        class="mt-8"
        label="Название"
        outlined
        dense
        v-model.trim="title"
      ></v-text-field>
      <v-btn
        depressed
        color="primary"
        @click="saveGrammar"
        :disabled="isGrammarLoading || !title.length"
      >
        Создать
      </v-btn>
    </div>

    <success-messages v-if="success" class="mt-3">{{
      success
    }}</success-messages>
    <v-btn
      depressed
      color="primary"
      @click="editorGrammar(id_newGrammar)"
      v-if="success"
    >
      Перейти к редактированию
    </v-btn>
    <error-messages v-if="err" class="mt-3">{{ err }}</error-messages>

    <my-loader v-if="isGrammarLoading" />
  </v-container>
</template>

<script>
import MyLoader from "@/components/MyLoader";
import SuccessMessages from "@/components/messages/SuccessMessages";
import ErrorMessages from "@/components/messages/ErrorMessages";

import { mapActions, mapState, mapMutations } from "vuex";

export default {
  components: {
    MyLoader,
    SuccessMessages,
    ErrorMessages,
  },
  data() {
    return {
      title: "",
      content: "<p>Начните вашу новую тему!</p>",
      published: false,
    };
  },
  computed: {
    ...mapState("grammar", {
      isGrammarLoading: (state) => state.isGrammarLoading,
      err: (state) => state.err,
      success: (state) => state.success,
      id_newGrammar: (state) => state.id_newGrammar,
    }),
  },
  methods: {
    ...mapActions("grammar", ["createGrammar"]),
    ...mapMutations("grammar", ["clearMessage"]),
    editorGrammar(id) {
      this.$router.push({
        name: "grammarEditor",
        params: { id: `${id}` },
      });
    },
    saveGrammar() {
      const newGrammar = {
        title: this.title,
        description: this.content,
        published: this.published,
      };
      this.createGrammar(newGrammar);
    },
  },
  beforeDestroy() {
    this.clearMessage();
  },
};
</script>

<style></style>
