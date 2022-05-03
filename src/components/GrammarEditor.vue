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
        :disabled="isGrammarLoading"
      >
        Сохранить
      </v-btn>
    </div>
    <v-divider></v-divider>

    <div v-if="grammarItemEdit">
      <v-text-field
        label="Название"
        outlined
        dense
        v-model.trim="title"
      ></v-text-field>

      <vue-editor
        v-show="title"
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
//import axios from "axios";
//import { ImageDrop } from "quill-image-drop-module";
//import ImageResize from "quill-image-resize-module";
import MyLoader from "@/components/MyLoader";
import { mapGetters, mapState, mapActions } from "vuex";
//import GrammarService from "../service/GrammarService";
//Quill.register("modules/imageDrop", ImageDrop);
//Quill.register("modules/imageResize", ImageResize);
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
      // customModulesForEditor: [
      //   { alias: "imageDrop", module: ImageDrop },
      //   { alias: "imageResize", module: ImageResize },
      // ],
      // editorSettings: {
      //   modules: {
      //     imageDrop: true,
      //     imageResize: {},
      //   },
      // },
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
      grammarItem: (state) => state.grammarItem,
    }),
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      try {
        console.log("add image");
        console.log("Editor111 - ", Editor);
        const formData = new FormData();
        formData.append("image", file);
        const response = await GrammarService.uploadImage(formData);
        // const response = await axios({
        //   method: "post",
        //   url: "http://localhost:5000/api/grammar/upload",
        //   data: formData,
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // });
        console.log(response);
        let url = response.data.url; // Get url from response
        Editor.insertEmbed(cursorLocation, "image", url);

        resetUploader();
        this.saveGrammar();
      } catch (error) {
        console.log(error.response);
      }
    },
    async handleImageRemoved(path, Editor, cursorLocation, resetUploader) {
      try {
        const url = new URL(path);
        let fileName = url.pathname.slice(1);
        console.log("Editor", Editor);
        console.log("cursorLocation", cursorLocation);
        console.log("resetUploader", resetUploader);
        await GrammarService.deleteImage(fileName);

        // await axios({
        //   method: "post",
        //   url: "http://localhost:5000/api/grammar/imageDelete",
        //   data: { fileName: fileName },
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // });
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions("grammar", ["changeGrammar", "fetchGrammarItem"]),
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
  async mounted() {
    this.grammarItemEdit = await this.getByIdGrammar(this.$route.params.id);
    if (!this.grammarItemEdit) {
      console.log("запрос при перезагрузки");
      await this.fetchGrammarItem(this.$route.params.id);
      console.log("ответ после перезагрузки - ", this.grammarItem);
      this.grammarItemEdit = this.grammarItem;
      console.log("получение ответа в переменную - ", this.grammarItemEdit);
    }
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
