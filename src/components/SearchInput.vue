<template>
  <v-row align="center" justify="center" dense>
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-text-field
        v-model.trim="searchInput"
        :append-icon="'mdi-magnify'"
        type="text"
        label="Поиск"
        @click:append="fetchData"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      searchInput: "",
    };
  },
  methods: {
    fetchData() {
      this.$emit("fetchTextData", this.searchInput);
    },
  },
};
</script>

<style></style>
