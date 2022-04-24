<template>
  <v-container>
    <v-text-field
      label="Название"
      outlined
      dense
      v-model.trim="title"
    ></v-text-field>

    <vue-editor v-model="content"></vue-editor>
    <div v-html="content"></div>
    <v-switch v-model="preview" :label="`Preview`"></v-switch>
    <v-checkbox v-model="published" :label="`Опубликовать`"></v-checkbox>
    <v-btn depressed color="primary" @click="saveGrammar"> Сохранить </v-btn>
    <my-loader v-if="isGrammarLoading" />
  </v-container>
</template>

<script>
import MyLoader from "@/components/MyLoader";
import { VueEditor } from "vue2-editor";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    VueEditor,
    MyLoader,
  },
  data() {
    return {
      title: "",
      content: "Начните вашу новую тему!",
      published: false,
      preview: false,
    };
  },
  computed: {
    ...mapState("grammar", {
      isGrammarLoading: (state) => state.isGrammarLoading,
    }),
  },
  methods: {
    ...mapActions("grammar", ["createGrammar"]),
    saveGrammar() {
      const newGrammar = {
        title: this.title,
        description: this.content,
        published: this.published,
      };
      this.createGrammar(newGrammar);
    },
  },
};
</script>

<style></style>
