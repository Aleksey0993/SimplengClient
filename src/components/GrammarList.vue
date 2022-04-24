<template>
  <v-row align="center" dense>
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
      v-for="grammar in listGrammars"
      :key="grammar.id"
    >
      <v-card elevation="2" class="ma-3">
        <v-card-title class="text-h5">
          {{ grammar.title }}
        </v-card-title>
        <v-card-subtitle>{{ grammar.description }}</v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="readMore(grammar.id)"> Читать </v-btn>
          <v-btn
            class="secondary"
            v-if="user.role === `ADMIN`"
            @click="editorGrammar(grammar.id)"
          >
            Редактировать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
//import { mapState } from "vuex";
export default {
  props: ["listGrammars", "user"],
  computed: {
    // ...mapState("auth", {
    //   user: (state) => state.user,
    // }),
  },
  methods: {
    readMore(id) {
      this.$router.push({
        name: "grammarItem",
        params: { id: `${id}` },
      });
    },
    editorGrammar(id) {
      this.$router.push({
        name: "grammarEditor",
        params: { id: `${id}` },
      });
    },
  },
};
</script>

<style></style>
