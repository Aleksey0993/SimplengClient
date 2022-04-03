<template>
  <div>
    <div
     class='err'
     v-if='err'>
        {{err}}
    </div>
    <div
     class='success'
     v-if='success'>
        {{success}}
    </div>


  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
 computed:{
      ...mapState({
          isLoading: state => state.isLoading,
          err: state => state.err,
          success: state => state.success
      })
  },
  methods:{
      ...mapActions({
          activation: 'activation'
      }),
  },
  mounted(){
    this.activation(this.$route.params.activation_token)
  }
}
</script>

<style>
  .err{
      border: 1px solid red;
  }
  .success{
      border: 1px solid green;
  }
</style>