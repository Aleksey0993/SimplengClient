<template>
  <div>
    <v-btn primary @click="logout"> Выйти </v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("auth", ["logout"]),
  },
  // mounted() {
  //   document.title = "Личный кабинет";
  // },
  // updated() {
  //   console.log("update");
  // },
};
</script>

<style></style>
