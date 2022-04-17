<template>
  <div>
    <button @click="getUser">list of users</button>
    <div v-for="user in users" :key="user.id">
      <p>{{ user.email }} ---- {{ user.role }}</p>
    </div>

    <button @click="addUser">Добавить пользователя</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      text: "",
    };
  },
  computed: {
    ...mapState("grammar", {
      users: (state) => state.users,
    }),
  },
  methods: {
    ...mapActions("grammar", ["getUser", "addUser"]),
  },
};
</script>

<style></style>
