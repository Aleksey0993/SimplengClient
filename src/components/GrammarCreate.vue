<template>
  <v-container>
    <v-divider></v-divider>
    <div class="d-flex justify-space-between align-center">
      <v-switch v-model="preview" :label="`Preview`"></v-switch>
      <v-checkbox v-model="published" :label="`Опубликовать`"></v-checkbox>
      <v-btn
        depressed
        color="primary"
        @click="saveGrammar"
        :disabled="isGrammarLoading || !title.length"
      >
        Сохранить
      </v-btn>
    </div>
    <v-divider></v-divider>
    <success-messages v-if="success" class="mt-3">{{
      success
    }}</success-messages>
    <error-messages v-if="err" class="mt-3">{{ err }}</error-messages>
    <v-text-field
      class="mt-8"
      label="Название"
      outlined
      dense
      v-model.trim="title"
    ></v-text-field>

    <vue-editor
      v-show="!preview"
      v-model="content"
      use-custom-image-handler
      @imageAdded="handleImageAdded"
      @imageRemoved="handleImageRemoved"
    ></vue-editor>
    <div v-show="preview" v-html="content"></div>

    <my-loader v-if="isGrammarLoading" />
  </v-container>
</template>

<script>
import MyLoader from "@/components/MyLoader";
import SuccessMessages from "@/components/messages/SuccessMessages";
import ErrorMessages from "@/components/messages/ErrorMessages";
import { VueEditor } from "vue2-editor";
import { mapActions, mapState, mapMutations } from "vuex";
import GrammarService from "@/service/GrammarService";
export default {
  components: {
    VueEditor,
    MyLoader,
    SuccessMessages,
    ErrorMessages,
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
      err: (state) => state.err,
      success: (state) => state.success,
    }),
  },
  methods: {
    ...mapActions("grammar", ["createGrammar"]),
    ...mapMutations("grammar", ["clearMessage"]),
    saveGrammar() {
      const newGrammar = {
        title: this.title,
        description: this.content,
        published: this.published,
      };
      this.createGrammar(newGrammar);
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await GrammarService.uploadImage(formData);
        let url = response.data.url; // Get url from response
        Editor.insertEmbed(cursorLocation, "image", url);

        resetUploader();
        //  this.saveGrammar();
      } catch (error) {
        console.log(error.response);
      }
    },
    async handleImageRemoved(path) {
      try {
        const url = new URL(path);
        let fileName = url.pathname.slice(1);

        await GrammarService.deleteImage(fileName);
      } catch (error) {
        console.log(error);
      }
    },
  },
  beforeDestroy() {
    this.clearMessage();
  },
};
</script>

<style>
button.ql-video {
  display: none !important;
}
img {
  width: 90%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
