<template>
  <v-container>
    <div v-if="listeningItem">
      <div class="text-h3 font-weight-medium text-center">
        {{ listeningItem.title }}
      </div>

      <audio
        controls
        :src="`http://localhost:5000/audio/${listeningItem.fileName}`"
      ></audio>
    </div>
    <my-loader v-if="isListeningLoading" />
  </v-container>
</template>

<script>
import MyLoader from "@/components/MyLoader";
import { mapActions, mapState } from "vuex";
export default {
  components: { MyLoader },
  computed: {
    ...mapState("listening", {
      listeningItem: (state) => state.listeningItem,
      isListeningLoading: (state) => state.isListeningLoading,
    }),
  },
  methods: {
    ...mapActions("listening", ["fetchListeningItem"]),
  },
  mounted() {
    this.fetchListeningItem(this.$route.params.id);
  },
};
</script>

<style></style>
