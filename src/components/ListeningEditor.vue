<template>
  <v-container>
    <v-divider></v-divider>
    <div class="d-flex justify-space-between align-center">
      <v-checkbox v-model="published" :label="`Опубликовать`"></v-checkbox>
      <v-checkbox v-model="fullAccess" :label="`Платно`"></v-checkbox>
      <v-btn
        depressed
        color="primary"
        @click="saveListening"
        :disabled="isListeningLoading"
      >
        Сохранить
      </v-btn>
    </div>
    <v-divider></v-divider>
    <success-messages v-if="success" class="mt-3">{{
      success
    }}</success-messages>

    <error-messages v-if="err" class="mt-3">{{ err }}</error-messages>
    <div v-if="listeningItemEdit">
      <v-text-field
        class="mt-8"
        label="Название"
        outlined
        dense
        v-model.trim="title"
      ></v-text-field>

      <my-loader v-if="isListeningLoading" />

      <v-btn
        depressed
        color="primary"
        @click="fetchTest($route.params.id)"
        :disabled="isListeningLoading"
      >
        Редактировать вопросы
      </v-btn>
      <div>
        <div class="d-flex justify-space-between align-center">
          <v-text-field
            class="ma-2"
            label="Введите вопрос"
            outlined
            dense
            v-model.trim="questions"
          ></v-text-field>
          <v-checkbox v-model="answer" :label="`Да/Нет`"></v-checkbox>
          <v-btn
            color="primary"
            @click="saveQuestion"
            :disabled="isListeningLoading"
          >
            Добавить
          </v-btn>
        </div>
      </div>
      <div v-if="listQuestions.length">
        <div
          class="d-flex justify-space-between align-center"
          v-for="itemQuestion in listQuestions"
          :key="itemQuestion.id"
        >
          <p>{{ itemQuestion.questions }} - {{ itemQuestion.answer }}</p>
          <v-btn
            color="red"
            @click="deleteQuestion(itemQuestion.id)"
            :disabled="isListeningLoading"
          >
            Удалить
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
//import GrammarService from "@/service/GrammarService";
import SuccessMessages from "@/components/messages/SuccessMessages";
import ErrorMessages from "@/components/messages/ErrorMessages";
import MyLoader from "@/components/MyLoader";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    MyLoader,
    SuccessMessages,
    ErrorMessages,
  },
  data() {
    return {
      title: "",
      published: false,
      fullAccess: false,
      listeningItemEdit: null,
      id: "",
      questions: "",
      answer: false,
    };
  },
  watch: {
    listeningItemEdit() {
      if (!this.listeningItemEdit) return;
      this.title = this.listeningItemEdit.title;
      this.published = this.listeningItemEdit.published;
      this.fullAccess = this.listeningItemEdit.fullAccess;
      this.id = this.listeningItemEdit.id;
    },
  },
  computed: {
    ...mapGetters("listening", ["getByIdListening"]),
    ...mapState("listening", {
      isListeningLoading: (state) => state.isListeningLoading,
      err: (state) => state.err,
      success: (state) => state.success,
      listeningItem: (state) => state.listeningItem,
      listQuestions: (state) => state.listQuestions,
    }),
  },
  methods: {
    ...mapActions("listening", [
      "changeListening",
      "fetchListeningItem",
      "fetchTest",
      "addQuestion",
      "deleteQuestion",
    ]),
    ...mapMutations("listening", ["clearMessage", "clearListQuestions"]),
    saveQuestion() {
      const newQuestion = {
        questions: this.questions,
        answer: this.answer,
        id: this.$route.params.id,
      };
      this.addQuestion(newQuestion);
    },
    saveListening() {
      const newListening = {
        title: this.title,
        published: this.published,
        fullAccess: this.fullAccess,
        id: this.id,
      };
      this.changeListening(newListening);
    },
  },
  async mounted() {
    this.listeningItemEdit = await this.getByIdListening(this.$route.params.id);
    if (!this.listeningItemEdit) {
      await this.fetchListeningItem(this.$route.params.id);

      this.listeningItemEdit = this.listeningItem;
    }
  },
  beforeDestroy() {
    this.clearMessage();
    this.clearListQuestions();
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
