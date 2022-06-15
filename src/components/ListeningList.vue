<template>
  <v-row align="center" dense>
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
      v-for="listening in listListening"
      :key="listening.id"
    >
      <v-card elevation="2" class="ma-3">
        <v-card-title class="text-h5">
          {{ listening.title }}
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="readMore(listening.id)">
            Читать
          </v-btn>
          <v-btn
            class="secondary"
            v-if="user.role === `ADMIN`"
            @click="editorListening(listening.id)"
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
  props: ["listListening", "user"],
  computed: {
    // ...mapState("auth", {
    //   user: (state) => state.user,
    // }),
  },
  methods: {
    readMore(id) {
      this.$router.push({
        name: "listeningItem",
        params: { id: `${id}` },
      });
    },
    editorListening(id) {
      this.$router.push({
        name: "listeningEditor",
        params: { id: `${id}` },
      });
    },
  },
};
</script>

<style></style>
