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
      <v-file-input truncate-length="50" @change="selectFile"></v-file-input>
      <v-btn
        depressed
        color="primary"
        @click="saveListening"
        :disabled="isListeningLoading || !title.length"
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
      @click="editorListening(id_newListening)"
      v-if="success"
    >
      Перейти к редактированию
    </v-btn>
    <error-messages v-if="err" class="mt-3">{{ err }}</error-messages>

    <my-loader v-if="isListeningLoading" />
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
      file: "",
    };
  },
  computed: {
    ...mapState("listening", {
      isListeningLoading: (state) => state.isListeningLoading,
      err: (state) => state.err,
      success: (state) => state.success,
      id_newListening: (state) => state.id_newListening,
    }),
  },
  methods: {
    selectFile(file) {
      //this.file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
    ...mapActions("listening", ["createListening"]),
    ...mapMutations("listening", ["clearMessage"]),
    editorListening(id) {
      this.$router.push({
        name: "grammarEditor",
        params: { id: `${id}` },
      });
    },
    saveListening() {
      let formData = new FormData();
      formData.append("audio", this.file);
      formData.append("title", this.title);
      //   const newGrammar = {
      //     title: this.title,
      //     description: this.content,
      //     published: this.published,
      //   };
      this.createListening(formData);
    },
  },
  beforeDestroy() {
    this.clearMessage();
  },
};
</script>

<style></style>
