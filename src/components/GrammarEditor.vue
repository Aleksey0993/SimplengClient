<template>
  <v-container>
    <v-divider></v-divider>
    <div class="d-flex justify-space-between align-center">
      <v-btn
        depressed
        color="red"
        @click="deleteGrammar(id)"
        :disabled="isGrammarLoading"
      >
        Удалить
      </v-btn>
      <v-switch v-model="preview" :label="`Preview`"></v-switch>
      <v-checkbox v-model="published" :label="`Опубликовать`"></v-checkbox>
      <v-btn
        depressed
        color="primary"
        @click="saveGrammar(true)"
        :disabled="isGrammarLoading"
      >
        Сохранить
      </v-btn>
    </div>
    <v-divider></v-divider>
    <success-messages v-if="success" class="mt-3">{{
      success
    }}</success-messages>

    <error-messages v-if="err" class="mt-3">{{ err }}</error-messages>
    <div v-if="grammarItemEdit">
      <v-text-field
        class="mt-8"
        label="Название"
        outlined
        dense
        v-model.trim="title"
      ></v-text-field>

      <vue-editor
        v-show="!preview"
        id="editor"
        v-model="content"
        use-custom-image-handler
        @imageAdded="handleImageAdded"
        @imageRemoved="handleImageRemoved"
      ></vue-editor>
      <!-- <vue-editor v-show="!preview" v-model="content"></vue-editor> -->
      <div class="ql-editor" v-show="preview" v-html="content"></div>

      <my-loader v-if="isGrammarLoading" />
    </div>
  </v-container>
</template>

<script>
import { VueEditor } from "vue2-editor";
import GrammarService from "@/service/GrammarService";
import SuccessMessages from "@/components/messages/SuccessMessages";
import ErrorMessages from "@/components/messages/ErrorMessages";
import MyLoader from "@/components/MyLoader";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

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
      grammarItemEdit: null,
      id: "",
    };
  },
  watch: {
    grammarItemEdit() {
      if (!this.grammarItemEdit) return;
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
      err: (state) => state.err,
      success: (state) => state.success,
      grammarItem: (state) => state.grammarItem,
    }),
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await GrammarService.uploadImage(formData);
        let url = response.data.url; // Get url from response
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
        this.saveGrammar(false);
      } catch (error) {
        console.log(error.response);
      }
    },
    async handleImageRemoved(path) {
      try {
        console.log("удаление");
        const url = new URL(path);
        let fileName = url.pathname.slice(1);

        await GrammarService.deleteImage(fileName);
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions("grammar", [
      "changeGrammar",
      "fetchGrammarItem",
      "deleteGrammar",
    ]),
    ...mapMutations("grammar", ["clearMessage"]),
    saveGrammar(flag_img) {
      const newGrammar = {
        title: this.title,
        description: this.content,
        published: this.published,
        id: this.id,
        flag_img: flag_img,
      };
      this.changeGrammar(newGrammar);
    },
  },
  async mounted() {
    this.grammarItemEdit = await this.getByIdGrammar(this.$route.params.id);
    if (!this.grammarItemEdit) {
      await this.fetchGrammarItem(this.$route.params.id);

      this.grammarItemEdit = this.grammarItem;
    }
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
