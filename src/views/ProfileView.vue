<template>
  <div>
      <v-btn
       primary
       @click='logout'
      >
        Выйти
      </v-btn>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  methods:{
      ...mapActions('auth',['logout'])
  }
}
</script>

<style>

</style>