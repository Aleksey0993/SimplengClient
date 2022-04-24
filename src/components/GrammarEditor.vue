<template>
  <v-container>
    <div v-if="grammarItemEdit">
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
    </div>
  </v-container>
</template>

<script>
import { VueEditor } from "vue2-editor";
import MyLoader from "@/components/MyLoader";
import { mapGetters, mapState, mapActions } from "vuex";
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
      grammarItemEdit: null,
      id: "",
    };
  },
  watch: {
    grammarItemEdit() {
      this.title = this.grammarItemEdit.title;
      this.content = this.grammarItemEdit.description;
      this.published = this.grammarItemEdit.published;
      this.id = this.grammarItemEdit.id;
    },
  },
  computed: {
    ...mapGetters("grammar", ["getByIdGrammar"]),
    ...mapState("grammar", {
      isGrammarLoading: (state) => state.isGrammarLoading,
    }),
  },
  methods: {
    ...mapActions("grammar", ["changeGrammar"]),
    saveGrammar() {
      const newGrammar = {
        title: this.title,
        description: this.content,
        published: this.published,
        id: this.id,
      };
      this.changeGrammar(newGrammar);
    },
  },
  mounted() {
    console.log(
      (this.grammarItemEdit = this.getByIdGrammar(this.$route.params.id))
    );
  },
};
</script>

<style></style>
